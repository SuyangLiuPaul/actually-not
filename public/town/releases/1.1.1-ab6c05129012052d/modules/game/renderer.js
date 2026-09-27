import { LIGHTING, shadowFrustum } from './lighting.js';
import { visibleInCamera } from './visibility.js';
import { Camera, compose, lookAt, ortho, multiply } from './math.js';
import { geometry } from './geometry.js';
const colours = new Map();
export function colour(hex) {
    let c = colours.get(hex);
    if (!c) {
        const n = parseInt(hex.replace('#', ''), 16);
        c = [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
        colours.set(hex, c);
    }
    return c;
}
/** Reusable CPU item pool. Static props upload once; moving items are reused. */
export class Builder {
    items = [];
    count = 0;
    reset() { this.count = 0; }
    add(shape, x, y, z, sx, sy, sz, c, rx = 0, ry = 0, rz = 0, flag = 0, hide = '') {
        let o = this.items[this.count];
        if (!o) {
            o = {
                shape, matrix: new Float32Array(16), color: colour(c), flag, hide
            };
            this.items.push(o);
        }
        o.shape = shape;
        o.color = colour(c);
        o.flag = flag;
        o.hide = hide;
        compose(o.matrix, [x, y, z], [sx, sy, sz], [rx, ry, rz]);
        this.count++;
        return o;
    }
}
const shapes = ['box', 'cylinder', 'cone', 'sphere', 'roof', 'ring', 'bevel', 'soft', 'torus', 'curtain', 'crown', 'spruce', 'decal', 'parasol'];
const vertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 position;layout(location=1) in vec3 normal;layout(location=2) in mat4 model;layout(location=6) in vec4 tint;
uniform mat4 viewProjection;uniform mat4 lightProjection;uniform vec2 offset;uniform float time;
out vec3 vNormal;out vec3 vWorld;out vec3 vColor;out vec4 vShadow;flat out float vFlag;out vec3 vLocal;
void main(){vec4 p=model*vec4(position,1.);if(tint.a==1.)p.x+=sin(time*.8+p.z)*.055*max(position.y+.5,0.);vWorld=p.xyz;vec3 s=vec3(dot(model[0].xyz,model[0].xyz),dot(model[1].xyz,model[1].xyz),dot(model[2].xyz,model[2].xyz));vNormal=normalize(mat3(model)*(normal/max(s,vec3(.00001))));vLocal=position;vColor=tint.rgb;vFlag=tint.a;vShadow=lightProjection*p;gl_Position=viewProjection*p;gl_Position.xy+=offset*gl_Position.w;}`;
// Authored studio lighting/materials; no scientific measurement is inferred from these colours.
const fragment = `#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DShadow;
in vec3 vNormal;in vec3 vWorld;in vec3 vColor;in vec4 vShadow;flat in float vFlag;in vec3 vLocal;
uniform sampler2D shadowMap;uniform sampler2DShadow shadowCompare;
uniform bool shadows;uniform float cloud;uniform float time;uniform float shadowDiameter;out vec4 outputColor;
// Fixed Poisson disk: no time-varying noise or screen-space dithering.
const vec2 disk[16]=vec2[16](
 vec2(-.942016,-.399062),vec2(.945586,-.768907),vec2(-.094184,-.929389),vec2(.344959,.293878),
 vec2(-.915886,.457714),vec2(-.815442,-.879125),vec2(-.382775,.276768),vec2(.974844,.756484),
 vec2(.443233,-.975116),vec2(.537430,-.473734),vec2(-.264969,-.418930),vec2(.791975,.190901),
 vec2(-.241888,.997065),vec2(-.814100,.914376),vec2(.199841,.786414),vec2(.143832,-.141008));
vec3 toLinear(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(vec3(.04045),c));}
vec3 toSrgb(vec3 c){c=max(c,vec3(0));return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(vec3(.0031308),c));}
float sceneVisibility(vec3 sp,float facing){
    if(!shadows)return 1.;
    // Derivatives are evaluated before branch-dependent sampling. Receiver-plane correction
    // prevents the wider filter from mistaking a sloping roof for a separate blocker.
    vec3 dx=dFdx(sp),dy=dFdy(sp);float det=dx.x*dy.y-dx.y*dy.x;
    vec2 slope=abs(det)>1e-9?vec2(dy.y*dx.z-dx.y*dy.z,dx.x*dy.z-dy.x*dx.z)/det:vec2(0.);
    slope=clamp(slope,vec2(-2.),vec2(2.));
    if(sp.x<.006||sp.x>.994||sp.y<.006||sp.y>.994||sp.z<=0.||sp.z>=1.||facing<=0.)return 1.;
    float texelWorld=shadowDiameter/2048.;
    float bias=(.009+texelWorld*.20*(1.-facing))/99.;
    float sum=0.,count=0.;
    for(int i=0;i<8;i++){
        vec2 delta=disk[i]*.12/shadowDiameter;
        float d=texture(shadowMap,sp.xy+delta).r;
        float receiver=sp.z+dot(slope,delta)-bias;
        if(d<receiver){sum+=max(0.,receiver-d);count+=1.;}
    }
    float gap=count>0.?sum/count*99.:0.;
    // Contact remains defined; distant tree shadows broaden rather than using one hard edge.
    float spread=clamp(.025+gap*.032,.025,.16)/shadowDiameter;
    float visibility=0.;
    for(int i=0;i<16;i++){
        vec2 delta=disk[i]*spread;
        visibility+=texture(shadowCompare,vec3(sp.xy+delta,sp.z-bias+dot(slope,delta)));
    }
    float border=min(min(sp.x,1.-sp.x),min(sp.y,1.-sp.y));
    return mix(1.,visibility/16.,smoothstep(.006,.035,border));
}
void main(){
    if(vFlag==8.){
        // Low-quality fallback only, not a second shadow layer over a real shadow map.
        float r=length(vLocal.xz)*2.;float alpha=.07*exp(-r*r*7.)*(1.-smoothstep(.6,1.,r));
        outputColor=vec4(vColor,alpha);return;
    }
    vec3 n=normalize(vNormal),sun=normalize(vec3(-.5,1.,.7));
    float facing=max(dot(n,sun),0.);
    vec3 sp=vShadow.xyz/vShadow.w*.5+.5;
    float visibility=sceneVisibility(sp,facing);
    vec3 base=vColor;
    if(vFlag==2.){
        float flow=sin(vWorld.z*4.+time*.55+sin(vWorld.x*3.))*sin(vWorld.x*6.-time*.35);
        base=mix(base,vec3(.77,.92,.93),smoothstep(.66,1.,flow)*.17);
    }
    if(vFlag==9.){float sector=floor((atan(vLocal.z,vLocal.x)+3.141593)*4./3.141593);base=mix(base,vec3(.99,.95,.83),mod(sector,2.));}
    // Detail is filtered by its projected footprint to avoid shimmering grain at a distance.
    if(vFlag==3.){float u=vLocal.x*103.+sin(vLocal.z*12.)*1.8;float a=1.-smoothstep(.4,2.,fwidth(u));base*=1.+.012*sin(u)*a;}
    if(vFlag==4.){vec2 u=vLocal.xy*170.;float a=1.-smoothstep(.4,2.,max(fwidth(u.x),fwidth(u.y)));base*=1.+.008*sin(u.x)*sin(u.y)*a;}
    vec3 albedo=toLinear(clamp(base,0.,1.));
    float sky=clamp(n.y*.5+.5,0.,1.);
    // Linear-light computation followed by one display encoding. Shade keeps coloured fill;
    // no multiply-on-sRGB black patches and no global saturation/whitewashing filter.
    vec3 ambient=mix(vec3(.30,.34,.39),vec3(.62,.70,.78),sky);
    vec3 direct=vec3(1.,.90,.76)*facing*.83*mix(visibility,1.,cloud*.48);
    vec3 bounce=vec3(.11,.095,.065)*max(0.,dot(n,normalize(vec3(.45,-.2,.85))));
    vec3 rgb=toSrgb(albedo*(ambient+direct+bounce)*(1.-cloud*.11));
    if(vFlag==5.)rgb+=pow(max(dot(n,normalize(vec3(-.2,.7,.65))),0.),28.)*.025;
    // Educational rays, projection silhouettes and markers are authored overlays.
    if(vFlag==6.)rgb=base*.97;
    if(vFlag==7.)rgb=mix(base,rgb,.22);
    float mist=clamp((length(vWorld.xz)-32.)*.0015,0.,.06);
    rgb=mix(rgb,vec3(.80,.89,.88),mist);
    outputColor=vec4(clamp(rgb,0.,1.),1.);
}`;
const shadowFragment = `#version 300 es
precision highp float;
flat in float vFlag;
void main(){
 // Water, teaching overlays and glow markers must not paint fake solid shadows on scenery.
 if(vFlag==2.||vFlag==6.||vFlag==7.||vFlag==8.)discard;
}`;
const landscapeVertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 position;layout(location=1) in vec3 normal;layout(location=2) in vec3 vertexColour;
uniform mat4 viewProjection;uniform mat4 lightProjection;uniform vec2 offset;uniform float landscapeFlag;
out vec3 vNormal;out vec3 vWorld;out vec3 vColor;out vec4 vShadow;flat out float vFlag;out vec3 vLocal;
void main(){vLocal=position;vWorld=position;vNormal=normal;vColor=vertexColour;vFlag=landscapeFlag;vShadow=lightProjection*vec4(position,1.);gl_Position=viewProjection*vec4(position,1.);gl_Position.xy+=offset*gl_Position.w;}`;
export class Renderer {
    canvas;
    gl;
    camera = new Camera();
    program;
    landscapeProgram;
    landscapeShadow;
    landscapeB = [];
    landscapeUniforms = {};
    landscapeShadowUniforms = {};
    shadowProgram;
    staticB;
    dynamicB;
    light = new Float32Array(16);
    lightView = new Float32Array(16);
    lightProjection = new Float32Array(16);
    lightKey = "";
    depth;
    depthCompare;
    depthRaw;
    shadowDiameter = 50;
    framebuffer;
    uniforms = {};
    shadowUniforms = {};
    qualityValue = 'high';
    staticSource = null;
    staticMode = '';
    staticView = '';
    culledCount = 0;
    get quality() { return this.qualityValue; }
    set quality(value) {
        if (value === this.qualityValue)
            return;
        this.qualityValue = value;
        this.staticView = '';
        if (!this.staticB)
            return;
        const gl = this.gl;
        for (const map of [this.staticB, this.dynamicB])
            for (const [shape, batch] of map) {
                const mesh = geometry(shape, value);
                gl.bindBuffer(gl.ARRAY_BUFFER, batch.vertex);
                gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
                batch.vertices = mesh.length / 6;
            }
    }
    drawCalls = 0;
    instances = 0;
    observer;
    contextLoss;
    resources = [];
    disposed = false;
    own(value, release) {
        if (value === null)
            throw Error('Graphics resource allocation failed');
        this.resources.push(() => release(value));
        return value;
    }
    constructor(canvas, onFailure) {
        this.canvas = canvas;
        const gl = canvas.getContext('webgl2', {
            antialias: true, alpha: false, powerPreference: 'high-performance'
        });
        if (!gl)
            throw Error('WebGL2 unavailable');
        this.gl = gl;
        try {
            this.program = this.link(vertex, fragment);
            this.shadowProgram = this.link(vertex, shadowFragment);
            this.landscapeProgram = this.link(landscapeVertex, fragment);
            this.landscapeShadow = this.link(landscapeVertex, shadowFragment);
            for (const name of ['viewProjection', 'lightProjection', 'offset', 'time', 'shadowMap', 'shadowCompare', 'shadowDiameter', 'shadows', 'cloud', 'landscapeFlag']) {
                this.landscapeUniforms[name] = gl.getUniformLocation(this.landscapeProgram, name);
                this.landscapeShadowUniforms[name] = gl.getUniformLocation(this.landscapeShadow, name);
            }
            this.staticB = this.batches();
            this.dynamicB = this.batches();
            for (const name of ['viewProjection', 'lightProjection', 'offset', 'time', 'shadowMap', 'shadowCompare', 'shadowDiameter', 'shadows', 'cloud']) {
                this.uniforms[name] = gl.getUniformLocation(this.program, name);
                this.shadowUniforms[name] = gl.getUniformLocation(this.shadowProgram, name);
            }
            const v = new Float32Array(16), p = new Float32Array(16);
            lookAt(v, [-20, 40, 28], [0, 0, 0]);
            ortho(p, -25, 25, -25, 25, 1, 95);
            multiply(this.light, p, v);
            this.depth = this.own(gl.createTexture(), v => gl.deleteTexture(v));
            gl.bindTexture(gl.TEXTURE_2D, this.depth);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, 2048, 2048, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            this.depthRaw = this.own(gl.createSampler(), v => gl.deleteSampler(v));
            this.depthCompare = this.own(gl.createSampler(), v => gl.deleteSampler(v));
            for (const sampler of [this.depthRaw, this.depthCompare]) {
                gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.samplerParameteri(sampler, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
            gl.samplerParameteri(this.depthRaw, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.samplerParameteri(this.depthRaw, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.samplerParameteri(this.depthRaw, gl.TEXTURE_COMPARE_MODE, gl.NONE);
            gl.samplerParameteri(this.depthCompare, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.samplerParameteri(this.depthCompare, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.samplerParameteri(this.depthCompare, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
            gl.samplerParameteri(this.depthCompare, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
            this.framebuffer = this.own(gl.createFramebuffer(), v => gl.deleteFramebuffer(v));
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth, 0);
            gl.drawBuffers([gl.NONE]);
            gl.readBuffer(gl.NONE);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
                throw Error('Shadow framebuffer unavailable');
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.enable(gl.DEPTH_TEST);
            this.contextLoss = e => { e.preventDefault(); onFailure(); };
            canvas.addEventListener('webglcontextlost', this.contextLoss);
            this.observer = new ResizeObserver(() => this.resize());
            this.observer.observe(canvas);
            this.resize();
        }
        catch (error) {
            this.dispose();
            throw error;
        }
    }
    link(vs, fs) {
        const gl = this.gl, shaders = [];
        const compile = (type, source) => {
            const shader = gl.createShader(type);
            if (!shader)
                throw Error('Shader allocation failed');
            shaders.push(shader);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                throw Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed');
            return shader;
        };
        const program = this.own(gl.createProgram(), p => gl.deleteProgram(p));
        try {
            gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
            gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS))
                throw Error(gl.getProgramInfoLog(program) ?? 'Shader link failed');
            return program;
        }
        finally {
            for (const shader of shaders)
                gl.deleteShader(shader);
        }
    }
    batches() {
        const gl = this.gl, m = new Map();
        for (const s of shapes) {
            const a = geometry(s), vao = this.own(gl.createVertexArray(), v => gl.deleteVertexArray(v)), vertex = this.own(gl.createBuffer(), v => gl.deleteBuffer(v)), instance = this.own(gl.createBuffer(), v => gl.deleteBuffer(v));
            gl.bindVertexArray(vao);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertex);
            gl.bufferData(gl.ARRAY_BUFFER, a, gl.STATIC_DRAW);
            for (let i = 0; i < 2; i++) {
                gl.enableVertexAttribArray(i);
                gl.vertexAttribPointer(i, 3, gl.FLOAT, false, 24, i * 12);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, instance);
            gl.bufferData(gl.ARRAY_BUFFER, 8192 * 20 * 4, gl.DYNAMIC_DRAW);
            for (let i = 0; i < 5; i++) {
                gl.enableVertexAttribArray(2 + i);
                gl.vertexAttribPointer(2 + i, 4, gl.FLOAT, false, 80, i * 16);
                gl.vertexAttribDivisor(2 + i, 1);
            }
            m.set(s, {
                vao, vertex, instance, count: 0, vertices: a.length / 6, data: new Float32Array(8192 * 20)
            });
        }
        gl.bindVertexArray(null);
        return m;
    }
    upload(batches, builder, mode = '', cull = false) {
        for (const b of batches.values())
            b.count = 0;
        for (let i = 0; i < builder.count; i++) {
            const o = builder.items[i];
            if (mode && o.hide.split('|').includes(mode))
                continue;
            if (cull && !visibleInCamera(o, this.camera, this.quality === 'high' ? 10 : 1)) {
                this.culledCount++;
                continue;
            }
            const b = batches.get(o.shape);
            if (b.count >= 8192)
                throw Error('Instance capacity exceeded');
            const j = b.count++ * 20;
            b.data.set(o.matrix, j);
            b.data.set(o.color, j + 16);
            b.data[j + 19] = o.flag;
        }
        for (const b of batches.values()) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, b.instance);
            this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, b.data, 0, b.count * 20);
        }
    }
    setLandscape(meshes) {
        const gl = this.gl, next = [];
        // Transactional replacement: neither retained closures nor deleted old buffers accumulate.
        // Keep the old landscape live until every new allocation has succeeded.
        try {
            for (const mesh of meshes) {
                const vao = gl.createVertexArray();
                if (!vao)
                    throw Error('Landscape VAO allocation failed');
                const buffer = gl.createBuffer();
                if (!buffer) {
                    gl.deleteVertexArray(vao);
                    throw Error('Landscape buffer allocation failed');
                }
                next.push({ vao, buffer, count: mesh.vertices.length / 9, water: mesh.water });
                gl.bindVertexArray(vao);
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);
                for (let i = 0; i < 3; i++) {
                    gl.enableVertexAttribArray(i);
                    gl.vertexAttribPointer(i, 3, gl.FLOAT, false, 36, i * 12);
                }
            }
        }
        catch (error) {
            for (const b of next) {
                gl.deleteVertexArray(b.vao);
                gl.deleteBuffer(b.buffer);
            }
            throw error;
        }
        finally {
            gl.bindVertexArray(null);
        }
        for (const b of this.landscapeB) {
            gl.deleteVertexArray(b.vao);
            gl.deleteBuffer(b.buffer);
        }
        this.landscapeB = next;
    }
    drawLandscape(shadow, time, cloud) {
        const gl = this.gl, u = shadow ? this.landscapeShadowUniforms : this.landscapeUniforms;
        gl.useProgram(shadow ? this.landscapeShadow : this.landscapeProgram);
        gl.uniformMatrix4fv(u.viewProjection, false, shadow ? this.light : this.camera.matrix);
        gl.uniformMatrix4fv(u.lightProjection, false, this.light);
        gl.uniform2f(u.offset, shadow ? 0 : this.camera.offset[0], shadow ? 0 : this.camera.offset[1]);
        gl.uniform1f(u.time, time);
        gl.uniform1f(u.cloud, cloud);
        gl.uniform1i(u.shadows, !shadow && this.quality === 'high' ? 1 : 0);
        gl.uniform1i(u.shadowMap, 0);
        gl.uniform1i(u.shadowCompare, 1);
        gl.uniform1f(u.shadowDiameter, this.shadowDiameter);
        for (const b of this.landscapeB) {
            if (shadow && b.water)
                continue;
            gl.uniform1f(u.landscapeFlag, b.water ? 2 : 0);
            gl.bindVertexArray(b.vao);
            gl.drawArrays(gl.TRIANGLES, 0, b.count);
            this.drawCalls++;
        }
    }
    setStatic(b, mode = '') {
        this.staticSource = b;
        this.staticMode = mode;
        this.staticView = '';
        this.upload(this.staticB, b, mode);
    }
    refreshVisible() {
        if (!this.staticSource)
            return;
        const c = this.camera;
        // Quantisation avoids static GPU uploads for imperceptible tails of camera easing.
        const key = [...c.target, c.halfHeight, c.yaw, c.elevation, c.width, c.height, ...c.offset].map(v => Math.round(v * 200)).join(':') + this.quality;
        if (key === this.staticView)
            return;
        this.staticView = key;
        this.culledCount = 0;
        this.upload(this.staticB, this.staticSource, this.staticMode, true);
    }
    resize() { const r = this.canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, this.quality === 'low' ? 1 : 1.5); const w = Math.max(1, Math.round(r.width * d)), h = Math.max(1, Math.round(r.height * d)); if (this.canvas.width !== w)
        this.canvas.width = w; if (this.canvas.height !== h)
        this.canvas.height = h; this.camera.width = r.width; this.camera.height = r.height; }
    render(dynamic, time, cloud) {
        const gl = this.gl;
        this.refreshVisible();
        const cam = this.camera;
        const fit = shadowFrustum(cam.target, cam.halfHeight, cam.width / Math.max(cam.height, 1));
        this.shadowDiameter = 2 * fit.radius;
        if (fit.key !== this.lightKey) {
            this.lightKey = fit.key;
            lookAt(this.lightView, fit.eye, fit.centre);
            ortho(this.lightProjection, -fit.radius, fit.radius, -fit.radius, fit.radius, LIGHTING.near, LIGHTING.far);
            multiply(this.light, this.lightProjection, this.lightView);
        }
        this.upload(this.dynamicB, dynamic);
        this.drawCalls = 0;
        this.instances = 0;
        const draw = () => {
            for (const m of [this.staticB, this.dynamicB])
                for (const [shape, b] of m)
                    if (b.count && shape !== 'decal') {
                        gl.bindVertexArray(b.vao);
                        gl.drawArraysInstanced(gl.TRIANGLES, 0, b.vertices, b.count);
                        this.drawCalls++;
                        this.instances += b.count;
                    }
        };
        if (this.quality === 'high') {
            for (let unit = 0; unit < 2; unit++) {
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.bindSampler(unit, null);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.viewport(0, 0, 2048, 2048);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.useProgram(this.shadowProgram);
            const u = this.shadowUniforms;
            gl.uniformMatrix4fv(u.viewProjection, false, this.light);
            gl.uniformMatrix4fv(u.lightProjection, false, this.light);
            gl.uniform2f(u.offset, 0, 0);
            gl.uniform1f(u.time, time);
            draw();
            this.drawLandscape(true, time, cloud);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(.69, .87, .91, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.program);
        const u = this.uniforms;
        gl.uniformMatrix4fv(u.viewProjection, false, this.camera.matrix);
        gl.uniformMatrix4fv(u.lightProjection, false, this.light);
        gl.uniform2f(u.offset, this.camera.offset[0], this.camera.offset[1]);
        gl.uniform1f(u.time, time);
        gl.uniform1f(u.cloud, cloud);
        gl.uniform1i(u.shadows, this.quality === 'high' ? 1 : 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.depth);
        gl.bindSampler(0, this.depthRaw);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.depth);
        gl.bindSampler(1, this.depthCompare);
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(u.shadowMap, 0);
        gl.uniform1i(u.shadowCompare, 1);
        gl.uniform1f(u.shadowDiameter, this.shadowDiameter);
        this.drawLandscape(false, time, cloud);
        gl.useProgram(this.program);
        draw();
        // Contact decals are a separate translucent pass with depth writes disabled.
        // They never cast shadows, cover UI, or obscure later geometry.
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.depthMask(false);
        if (this.quality === 'low')
            for (const m of [this.staticB, this.dynamicB]) {
                const b = m.get('decal');
                if (b?.count) {
                    gl.bindVertexArray(b.vao);
                    gl.drawArraysInstanced(gl.TRIANGLES, 0, b.vertices, b.count);
                    this.drawCalls++;
                    this.instances += b.count;
                }
            }
        gl.depthMask(true);
        gl.disable(gl.BLEND);
        gl.bindVertexArray(null);
    }
    info() {
        const gl = this.gl, d = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            api: 'WebGL2', lighting: 'linear-light + stable filtered shadows', contactPass: this.quality === 'low', shadowMapSize: LIGHTING.mapSize, shadowDiameter: this.shadowDiameter, ownedResources: this.resources.length, landscapeBuffers: this.landscapeB.length, culledStatic: this.culledCount, staticSourceCount: this.staticSource?.count ?? 0, renderer: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), drawCalls: this.drawCalls, instances: this.instances, buffer: [this.canvas.width, this.canvas.height], quality: this.quality
        };
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        this.observer?.disconnect();
        if (this.contextLoss)
            this.canvas.removeEventListener('webglcontextlost', this.contextLoss);
        for (const b of this.landscapeB) {
            this.gl.deleteVertexArray(b.vao);
            this.gl.deleteBuffer(b.buffer);
        }
        for (const release of this.resources.reverse())
            release();
        this.resources.length = 0;
        this.landscapeB.length = 0;
    }
}