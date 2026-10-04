import { Camera } from '../game/math.js';
import { LAND_MASK } from './land-mask.js';
import { REGION_IDS, REGIONS, clampLatitude, wrapLongitude, projectGeo } from './atlas.js';
import { LiveLocale, regionLocale, translate } from '../ui/locale.js';
const vertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 position;layout(location=1) in vec2 uv;
uniform mat4 matrix;out vec3 world;out vec2 tex;
void main(){world=position;tex=uv;gl_Position=matrix*vec4(position,1.);}`;
const fragment = `#version 300 es
precision highp float;
in vec3 world;in vec2 tex;uniform sampler2D mask;uniform vec3 view;uniform bool grid;out vec4 colour;
void main(){
 float land=texture(mask,tex).r;vec2 px=vec2(1./2048.,1./1024.);
 float edge=max(max(texture(mask,tex+vec2(px.x,0.)).r,texture(mask,tex-vec2(px.x,0.)).r),max(texture(mask,tex+vec2(0.,px.y)).r,texture(mask,tex-vec2(0.,px.y)).r));
 vec3 n=normalize(world);float facing=max(dot(n,view),0.);vec3 right=normalize(cross(vec3(0.,1.,0.),view));vec3 up=cross(view,right);
 float key=max(dot(n,normalize(view*.55+up*.7-right*.55)),0.);
 vec3 sea=mix(vec3(.20,.58,.76),vec3(.38,.78,.84),.5+.5*n.y);
 sea=mix(sea,vec3(.86,.91,.80),clamp((edge-land)*.8,0.,.55));
 vec3 green=mix(vec3(.39,.70,.43),vec3(.78,.86,.49),.55+.25*n.y);
 vec3 base=mix(sea,green,land);
 if(grid){vec2 a=abs(sin(tex*vec2(24.,12.)*3.14159265));vec2 thin=fwidth(a)*1.0;float g=1.-smoothstep(0.,thin.x,a.x)*smoothstep(0.,thin.y,a.y);base=mix(base,vec3(.91,.96,.86),g*.13);}
 base*=.80+.30*key;base=mix(base,vec3(.60,.88,.94),pow(1.-facing,3.5)*.32);float l=dot(base,vec3(.299,.587,.114));base=mix(vec3(l),base,1.14);
 colour=vec4(base,1.);
}`;
function sphere() {
    const data = [];
    const point = (u, v) => { const a = u * Math.PI * 2 - Math.PI, b = Math.PI / 2 - v * Math.PI; return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a), u, v]; };
    for (let j = 0; j < 64; j++)
        for (let i = 0; i < 128; i++) {
            const a = point(i / 128, j / 64), b = point((i + 1) / 128, j / 64), c = point(i / 128, (j + 1) / 64), d = point((i + 1) / 128, (j + 1) / 64);
            data.push(...a, ...c, ...b, ...b, ...c, ...d);
        }
    return new Float32Array(data);
}
/** Temporary renderer: one globe context, destroyed on close. Main-world RAF is suspended. */
export class GlobeRenderer {
    canvas;
    failed;
    gl;
    program;
    buffer;
    vao;
    texture;
    matrix;
    view;
    gridLocation;
    camera = new Camera();
    lat = 8;
    lon = 102;
    zoom = 1.35;
    grid = true;
    frames = 0;
    ready = false;
    disposed = false;
    image;
    constructor(canvas, failed) {
        this.canvas = canvas;
        this.failed = failed;
        const gl = canvas.getContext('webgl2', { antialias: true, alpha: true });
        if (!gl)
            throw Error('地球图形不可用');
        this.gl = gl;
        const shaders = [];
        let program = null, buffer = null, vao = null, texture = null;
        try {
            for (const [type, code] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]]) {
                const s = gl.createShader(type);
                if (!s)
                    throw Error('Shader allocation failed');
                shaders.push(s);
                gl.shaderSource(s, code);
                gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
                    throw Error(gl.getShaderInfoLog(s) ?? 'Shader failed');
            }
            program = gl.createProgram();
            if (!program)
                throw Error('Program failed');
            for (const s of shaders)
                gl.attachShader(program, s);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS))
                throw Error('Globe link failed');
            this.program = program;
            buffer = gl.createBuffer();
            vao = gl.createVertexArray();
            texture = gl.createTexture();
            if (!buffer || !vao || !texture)
                throw Error('Globe allocation failed');
            this.buffer = buffer;
            this.vao = vao;
            this.texture = texture;
            gl.bindVertexArray(vao);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, sphere(), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);
            gl.enableVertexAttribArray(1);
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            this.matrix = gl.getUniformLocation(program, 'matrix');
            this.view = gl.getUniformLocation(program, 'view');
            this.gridLocation = gl.getUniformLocation(program, 'grid');
            this.image = new Image();
            this.image.onload = () => { if (this.disposed)
                return; try {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
                this.ready = true;
            }
            catch {
                this.failed();
            } };
            this.image.onerror = () => this.failed();
            this.image.src = LAND_MASK;
            gl.enable(gl.DEPTH_TEST);
            this.canvas.addEventListener('webglcontextlost', this.lost);
        }
        catch (e) {
            if (buffer)
                gl.deleteBuffer(buffer);
            if (vao)
                gl.deleteVertexArray(vao);
            if (texture)
                gl.deleteTexture(texture);
            if (program)
                gl.deleteProgram(program);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            throw e;
        }
        finally {
            for (const s of shaders)
                gl.deleteShader(s);
        }
    }
    lost = (e) => { e.preventDefault(); if (!this.disposed)
        this.failed(); };
    draw() {
        if (this.disposed)
            return;
        const c = this.camera, g = this.gl, rect = this.canvas.getBoundingClientRect();
        c.width = Math.max(1, rect.width);
        c.height = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 1.6), w = Math.round(c.width * dpr), h = Math.round(c.height * dpr);
        if (this.canvas.width !== w || this.canvas.height !== h) {
            this.canvas.width = w;
            this.canvas.height = h;
        }
        c.yaw = this.lon * Math.PI / 180;
        c.elevation = this.lat * Math.PI / 180;
        c.desiredHeight = this.zoom * Math.max(1, c.height / c.width);
        c.update(0, true);
        g.viewport(0, 0, w, h);
        g.clearColor(0, 0, 0, 0);
        g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
        g.useProgram(this.program);
        g.bindVertexArray(this.vao);
        g.activeTexture(g.TEXTURE0);
        g.bindTexture(g.TEXTURE_2D, this.texture);
        g.uniformMatrix4fv(this.matrix, false, c.matrix);
        g.uniform3fv(this.view, c.back);
        g.uniform1i(this.gridLocation, this.grid ? 1 : 0);
        g.drawArrays(g.TRIANGLES, 0, 64 * 128 * 6);
        this.frames++;
    }
    project(id) { const r = REGIONS[id], p = projectGeo(r.lat, r.lon, this.lat, this.lon), c = this.camera, rr = c.height / (2 * c.halfHeight); return { x: c.width / 2 + p[0] * rr, y: c.height / 2 - p[1] * rr, front: p[2] > .10 }; }
    dispose() { if (this.disposed)
        return; this.disposed = true; this.image.onload = null; this.image.onerror = null; this.canvas.removeEventListener('webglcontextlost', this.lost); const g = this.gl; g.deleteBuffer(this.buffer); g.deleteVertexArray(this.vao); g.deleteTexture(this.texture); g.deleteProgram(this.program); g.getExtension('WEBGL_lose_context')?.loseContext(); }
}
const mini = (id) => { const r = REGIONS[id], c = r.colour, a = r.accent; return `<svg viewBox="0 0 100 64" aria-hidden="true"><path d="M0 52 Q18 45 35 52 T70 52 T100 50 V64 H0Z" fill="${a}" opacity=".45"/><path d="M14 50V27l16-12 15 12v23" fill="${c}"/><path d="M10 28l20-16 20 16" fill="${a}"/><path d="M56 50V31l13-9 14 9v19" fill="${r.theme === 'oasis' || r.theme === 'stepwell' || r.theme === 'riad' ? '#ead6ac' : '#f3e7ce'}"/><path d="M53 32l16-12 18 12" fill="${r.theme === 'jiangnan' || r.theme === 'hanok' ? '#5f7775' : a}"/><circle cx="86" cy="19" r="7" fill="#f2d68f"/><circle cx="12" cy="18" r="8" fill="#8fb184"/></svg>`; };
export class Atlas {
    save;
    reduced;
    locale;
    choose;
    cancel;
    element;
    canvas;
    renderer = null;
    abort = new AbortController();
    raf = 0;
    disposed = false;
    selected = 'au';
    localizer;
    target = null;
    last = 0;
    pointers = new Map();
    ignorePinClickUntil = 0;
    pinch = 0;
    pins = new Map();
    previous;
    continent = 'all';
    query = '';
    visible = new Set(REGION_IDS);
    constructor(root, save, reduced, locale, choose, cancel) {
        this.save = save;
        this.reduced = reduced;
        this.locale = locale;
        this.choose = choose;
        this.cancel = cancel;
        this.previous = document.activeElement;
        this.element = document.createElement('dialog');
        this.element.className = 'atlas-dialog';
        this.element.setAttribute('aria-labelledby', 'atlas-heading');
        this.element.innerHTML = `<div class="atlas-shell"><header class="atlas-header"><div><span class="atlas-kicker">ACTUALLY, NOT! · LITTLE WORLD</span><h1 id="atlas-heading">世界这么大，好奇心出发。</h1></div><button type="button" data-atlas="close">返回当前场景</button></header><div class="atlas-layout"><section class="atlas-earth" aria-label="3D 地球旅行地图"><div class="atlas-orbit"></div><canvas tabindex="0" aria-label="可旋转地球。方向键旋转，加减号缩放；也可用右侧国家列表。"></canvas><div class="atlas-pins"></div><div class="atlas-earth-note"><span>一颗地球 · ${REGION_IDS.length} 个微缩目的地</span><p>拖动旋转 · 双指或滚轮缩放 · 搜索或按洲筛选</p></div><div class="atlas-controls"><button data-atlas="left" aria-label="地球向左旋转">左转</button><button data-atlas="right" aria-label="地球向右旋转">右转</button><button data-atlas="zoom-in">放大</button><button data-atlas="zoom-out">缩小</button><button data-atlas="grid" aria-pressed="true">经纬线</button><button data-atlas="surprise">随便看看</button></div><p class="atlas-error" role="status" hidden>地球暂时无法显示。下方地点列表仍可直接出发，不会丢失发现簿。</p></section><aside class="atlas-itinerary" aria-label="选择目的地"><div class="atlas-selection-label">选择一个地方，慢慢看懂一件事</div><div class="atlas-passport-progress" role="status"><strong>${save.data.visited.length}</strong> ${this.locale === 'en' ? `/ ${REGION_IDS.length} destinations visited` : `/ ${REGION_IDS.length} ${translate('个目的地已到访', this.locale)}`} <span>${this.locale === 'en' ? '· Postcards' : `· ${translate('明信片', this.locale)}`} ${save.data.postcards.length} / ${REGION_IDS.length}</span></div><div class="atlas-tools"><label><span>搜索目的地</span><input type="search" data-atlas-search placeholder="国家 / 场景" autocomplete="off"></label><div class="atlas-filters">${['all', 'Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'].map(c => `<button type="button" data-continent="${c}" aria-pressed="${c === 'all'}">${c === 'all' ? '全部' : c}</button>`).join('')}</div></div><div class="atlas-destinations">${REGION_IDS.map(id => { const rr = regionLocale(id, REGIONS[id], this.locale); return `<button class="atlas-destination" type="button" data-select-region="${id}" aria-pressed="false"><span class="atlas-mini">${mini(id)}</span><span><strong>${rr.country}</strong><small>${rr.name}</small></span><span class="atlas-visited">${save.data.postcards.includes(id) ? translate('明信片', this.locale) : save.data.visited.includes(id) ? translate('去过', this.locale) : translate('出发', this.locale)}</span></button>`; }).join('')}</div><article class="atlas-card"></article><div class="atlas-footer"><button type="button" data-atlas="town">回到原来的科普小镇</button><p>地点为原创主题布景，不是实际城市复刻；科学规律也不属于任何国家。海陆轮廓经简化，标记为大致旅行位置。</p><details><summary>地图与模型说明</summary><p>Made with Natural Earth · 公共领域海陆资料。小岛可能省略；配色不是气候或植被实测。${REGION_IDS.length} 个国别场景只复用原有十套教学模型，不把换布景算成新研究。旅行足迹只记到访，不代表学会。</p><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth 数据许可</a></details>${save.notice ? `<p role="status">${save.notice}</p>` : ''}</div></aside></div></div>`;
        root.append(this.element);
        this.localizer = new LiveLocale(this.element, () => this.locale);
        this.canvas = this.element.querySelector('canvas');
        const signal = this.abort.signal;
        try {
            this.renderer = new GlobeRenderer(this.canvas, () => this.showFailure());
        }
        catch {
            this.showFailure();
        }
        for (const id of REGION_IDS) {
            const e = document.createElement('button');
            const rr = regionLocale(id, REGIONS[id], this.locale);
            e.className = 'atlas-pin';
            e.dataset.selectRegion = id;
            e.type = 'button';
            e.innerHTML = `<i></i><span>${rr.country}</span>`;
            e.setAttribute('aria-label', translate(`选择${rr.country}`, this.locale));
            this.pins.set(id, e);
            this.element.querySelector('.atlas-pins').append(e);
        }
        this.element.querySelector('.atlas-pins').addEventListener('pointerdown', event => { const e = event; if (e.pointerType === 'touch')
            this.down(e); }, { signal });
        this.element.addEventListener('click', this.click, { signal });
        this.element.querySelector('[data-atlas-search]')?.addEventListener('input', e => { this.query = e.target.value.trim().toLowerCase(); this.applyFilter(); }, { signal });
        this.element.addEventListener('cancel', e => { e.preventDefault(); this.cancel(); }, { signal });
        this.canvas.addEventListener('pointerdown', this.down, { signal });
        this.canvas.addEventListener('pointermove', this.move, { signal });
        this.canvas.addEventListener('pointerup', this.up, { signal });
        this.canvas.addEventListener('pointercancel', this.up, { signal });
        this.canvas.addEventListener('wheel', e => { e.preventDefault(); this.zoomBy(Math.exp(Math.max(-160, Math.min(160, e.deltaY)) * .0015)); }, { signal, passive: false });
        this.canvas.addEventListener('keydown', e => { if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', '='].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            this.target = null;
            const r = this.renderer;
            if (!r)
                return;
            if (e.key === 'ArrowLeft')
                r.lon = wrapLongitude(r.lon - 8);
            if (e.key === 'ArrowRight')
                r.lon = wrapLongitude(r.lon + 8);
            if (e.key === 'ArrowUp')
                r.lat = clampLatitude(r.lat + 8);
            if (e.key === 'ArrowDown')
                r.lat = clampLatitude(r.lat - 8);
            if (e.key === '+' || e.key === '=')
                this.zoomBy(.9);
            if (e.key === '-')
                this.zoomBy(1.1);
        } }, { signal });
        this.element.showModal();
        this.selected = save.data.last ?? 'au';
        this.select(this.selected, false);
        this.canvas.focus();
        this.raf = requestAnimationFrame(this.loop);
    }
    get state() { return { selected: this.selected, frames: this.renderer?.frames ?? 0, ready: this.renderer?.ready ?? false, lat: this.renderer?.lat, lon: this.renderer?.lon, zoom: this.renderer?.zoom, pins: Object.fromEntries([...this.pins].map(([id, p]) => [id, !p.hidden])) }; }
    showFailure() { this.element.querySelector('.atlas-error').hidden = false; this.canvas.style.visibility = 'hidden'; this.renderer?.dispose(); this.renderer = null; for (const p of this.pins.values())
        p.hidden = true; }
    select(id, turn = true) {
        this.selected = id;
        const base = REGIONS[id], r = regionLocale(id, base, this.locale);
        for (const e of this.element.querySelectorAll('[data-select-region]')) {
            const active = e.dataset.selectRegion === id;
            e.setAttribute('aria-pressed', String(active));
            e.classList.toggle('chosen', active);
        }
        this.element.querySelector('.atlas-card').innerHTML = `<span class="atlas-country">${r.english}</span><h2>${r.name}</h2><p>${r.description}</p><div class="atlas-features">${r.features.map(s => `<span>${s}</span>`).join('')}</div><div class="atlas-experiment-note">这里可以亲手玩 ${base.topics.length} 个既有科学体验<br><small>自由探索 · 无解锁 · 与原小镇共用发现簿</small></div><div class="atlas-postcard-note">${this.save.data.postcards.includes(id) ? '这张风景明信片已经收进旅行护照' : '到达后可以选一个镜头，保存一张风景明信片'}</div><button type="button" data-atlas="depart" class="atlas-depart">前往${r.name} <span aria-hidden="true">→</span></button>`;
        if (turn)
            this.target = { lat: base.lat, lon: base.lon };
    }
    applyFilter() {
        this.visible.clear();
        for (const id of REGION_IDS) {
            const r = REGIONS[id], lr = regionLocale(id, r, this.locale), hay = (r.country + ' ' + r.name + ' ' + r.english + ' ' + r.subtitle + ' ' + lr.country + ' ' + lr.name + ' ' + lr.subtitle).toLowerCase(), okContinent = this.continent === 'all' || r.continent === this.continent, okQuery = !this.query || hay.includes(this.query);
            if (okContinent && okQuery)
                this.visible.add(id);
            const card = this.element.querySelector(`.atlas-destination[data-select-region="${id}"]`);
            if (card)
                card.hidden = !(okContinent && okQuery);
            const pin = this.pins.get(id);
            if (pin && !this.visible.has(id))
                pin.hidden = true;
        }
        if (!this.visible.has(this.selected)) {
            const first = [...this.visible][0];
            if (first)
                this.select(first, false);
        }
    }
    click = (e) => { const b = e.target.closest('[data-select-region],[data-atlas],[data-continent]'); if (!b)
        return; if (b.classList.contains('atlas-pin') && e.detail > 0 && performance.now() < this.ignorePinClickUntil)
        return; const id = b.dataset.selectRegion; if (REGION_IDS.includes(id)) {
        this.select(id);
        return;
    } if (b.dataset.continent !== undefined) {
        this.continent = b.dataset.continent;
        for (const f of this.element.querySelectorAll('[data-continent]'))
            f.setAttribute('aria-pressed', String(f.dataset.continent === this.continent));
        this.applyFilter();
        return;
    } const a = b.dataset.atlas; if (a === 'close') {
        this.cancel();
        return;
    } if (a === 'depart') {
        this.choose(this.selected);
        return;
    } if (a === 'town') {
        this.choose(null);
        return;
    } const r = this.renderer; if (!r)
        return; if (a === 'grid') {
        r.grid = !r.grid;
        b.setAttribute('aria-pressed', String(r.grid));
    } if (a === 'surprise') {
        const choices = [...this.visible].filter(id => !this.save.data.visited.includes(id));
        const pool = choices.length ? choices : [...this.visible];
        const index = Math.max(0, pool.indexOf(this.selected));
        const next = pool[(index + 1) % Math.max(1, pool.length)];
        if (next)
            this.select(next);
        return;
    } if (a === 'zoom-in')
        this.zoomBy(.85); if (a === 'zoom-out')
        this.zoomBy(1.15); if (a === 'left' || a === 'right') {
        this.target = null;
        r.lon = wrapLongitude(r.lon + (a === 'left' ? -20 : 20));
    } };
    down = (e) => { if (e.button !== 0 || !this.renderer)
        return; e.preventDefault(); this.canvas.focus(); this.canvas.setPointerCapture(e.pointerId); this.target = null; const pin = e.target.closest('.atlas-pin')?.dataset.selectRegion; this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false, pin }); if (this.pointers.size === 2) {
        const p = [...this.pointers.values()];
        for (const v of p)
            v.moved = true;
        this.pinch = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
    } };
    move = (e) => { const p = this.pointers.get(e.pointerId), r = this.renderer; if (!p || !r)
        return; const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; if (Math.hypot(p.x - p.sx, p.y - p.sy) > 6)
        p.moved = true; if (this.pointers.size === 2) {
        const p = [...this.pointers.values()], d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
        if (d > 10 && this.pinch > 10)
            this.zoomBy(this.pinch / d);
        this.pinch = d;
        return;
    } r.lon = wrapLongitude(r.lon - dx * .32); r.lat = clampLatitude(r.lat + dy * .27); };
    up = (e) => { const p = this.pointers.get(e.pointerId); if (p?.pin) {
        this.ignorePinClickUntil = performance.now() + 650;
        if (!p.moved && e.type !== 'pointercancel')
            this.select(p.pin);
    } this.pointers.delete(e.pointerId); if (this.canvas.hasPointerCapture(e.pointerId))
        this.canvas.releasePointerCapture(e.pointerId); };
    zoomBy(f) { if (this.renderer)
        this.renderer.zoom = Math.max(1.03, Math.min(1.95, this.renderer.zoom * f)); }
    ;
    loop = (time) => {
        if (this.disposed)
            return;
        const dt = this.last ? Math.min(.08, (time - this.last) / 1000) : 0;
        this.last = time;
        if (this.renderer && !document.hidden) {
            const r = this.renderer;
            if (this.target) {
                const factor = this.reduced ? 1 : 1 - Math.exp(-dt * 5);
                r.lat += (this.target.lat - r.lat) * factor;
                r.lon = wrapLongitude(r.lon + wrapLongitude(this.target.lon - r.lon) * factor);
                if (Math.abs(r.lat - this.target.lat) < .02 && Math.abs(wrapLongitude(this.target.lon - r.lon)) < .02)
                    this.target = null;
            }
            r.draw();
            const placed = [];
            for (const id of REGION_IDS) {
                const e = this.pins.get(id);
                if (!this.visible.has(id)) {
                    e.hidden = true;
                    continue;
                }
                const p = r.project(id);
                e.hidden = !r.ready || !p.front;
                if (e.hidden)
                    continue;
                let y = p.y;
                for (let tries = 0; tries < 5 && placed.some(q => Math.abs(q.x - p.x) < 78 && Math.abs(q.y - y) < 42); tries++)
                    y += tries % 2 === 0 ? 26 : -52;
                placed.push({ x: p.x, y });
                e.style.transform = `translate(${p.x}px,${y}px)`;
            }
        }
        this.raf = requestAnimationFrame(this.loop);
    };
    dispose() { if (this.disposed)
        return; this.disposed = true; cancelAnimationFrame(this.raf); this.abort.abort(); this.localizer.dispose(); this.renderer?.dispose(); this.renderer = null; this.element.close(); this.element.remove(); this.previous?.focus({ preventScroll: true }); }
}