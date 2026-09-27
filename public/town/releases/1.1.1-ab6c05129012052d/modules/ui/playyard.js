import { buoyancy, shadow, pulley, isPlay } from '../experiments/playyard.js';
const button = (action, label, value = '', on = false) => `<button type="button" data-action="${action}" data-value="${value}" ${on ? 'aria-pressed="true" class="selected"' : ''}>${label}</button>`;
const group = (label, body) => `<div class="control-group"><span class="field-label">${label}</span><div class="segments">${body}</div></div>`;
const range = (name, label, value, min, max, step, unit) => `<label class="play-range"><span>${label}<output>${value.toFixed(step < .1 ? 2 : 1)} ${unit}</output></span><input type="range" data-play-control="${name}" aria-label="${label}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
export function playControls(s, deep) {
    if (s.topic === 'buoyancy') {
        const p = s.buoyancy, r = buoyancy.evaluate(p);
        return `<p class="play-instruction">点水槽里的密封小箱，把它轻轻放入水中。改变体积时，箱子和配重也会跟着变化。</p>${range('float-mass', '总质量', p.mass, .5, 4, .5, 'kg')}${range('float-volume', '物体密封体积', p.volume, 1, 6, .5, 'L')}${group('同一种物体，换一种液体', button('float-liquid', '淡水', 'fresh', p.liquid === 'fresh') + button('float-liquid', '盐水预设', 'salt', p.liquid === 'salt'))}<div class="button-row">${button('observe', '放入水槽')}${button('float-neutral', '试试恰好悬浮')}</div>${deep ? `<div class="model-readout"><small>模型计算 · 不是实测</small><dl><div><dt>重量</dt><dd>${r.weight.toFixed(1)} N</dd></div><div><dt>完全浸没时浮力</dt><dd>${r.maxBuoyancy.toFixed(1)} N</dd></div><div><dt>平均密度</dt><dd>${r.averageDensity.toFixed(0)} kg/m³</dd></div></dl></div>` : ''}<p class="microcopy">“完全浸没时浮力”不是漂浮时的实际浮力。开剖面后看水线；下沉不表示浮力为零。</p>`;
    }
    if (s.topic === 'shadow') {
        const p = s.shadow, r = shadow.evaluate(p);
        return `<p class="play-instruction">按住轨道上的小物偶，向灯或幕布移动。物偶和它在幕布上的影子会同时响应。</p>${range('shadow-object', '灯到物偶', p.objectDistance, .8, 2, .1, 'm')}${range('shadow-screen', '灯到幕布', p.screenDistance, 2.5, 4, .1, 'm')}${group('换一张可爱的轮廓', button('shadow-puppet', '小猫头鹰', 'owl', p.puppet === 'owl') + button('shadow-puppet', '一片叶子', 'leaf', p.puppet === 'leaf'))}<div class="button-row">${button('observe', '留下这束光的观察')}</div>${deep ? `<div class="model-readout"><small>模型计算 · 理想点光源</small><dl><div><dt>线性放大率</dt><dd>${r.magnification.toFixed(2)} 倍</dd></div><div><dt>标称影子高度</dt><dd>${r.height.toFixed(2)} m</dd></div></dl></div>` : ''}<p class="microcopy">射线只是原理示意。真实面积光源会产生半影，本模型不模拟半影或照度。</p>`;
    }
    const p = s.pulley, r = pulley.evaluate(p);
    return `<p class="play-instruction">直接向下拖动绳柄，让花篮升起来。也可以设置一段拉绳距离，再播放这次提升。</p>${group('真正托住载荷的绳段', [1, 2, 4].map(n => button('pulley-strands', `${n} 段`, String(n), p.strands === n)).join(''))}${range('pulley-mass', '花篮总质量', p.mass, 1, 4, .5, 'kg')}${range('pulley-distance', '拉出绳长', p.pull, .25, 2, .25, 'm')}<div class="button-row">${button('observe', '拉动这一段绳')}</div><div class="model-readout"><small>模型计算 · 无摩擦、准静态</small><dl><div><dt>理想拉力</dt><dd>${r.force.toFixed(1)} N</dd></div><div><dt>载荷上升</dt><dd>${r.rise.toFixed(2)} m</dd></div>${deep ? `<div><dt>输入功 / 势能增加</dt><dd>${r.workIn.toFixed(2)} / ${r.workOut.toFixed(2)} J</dd></div>` : ''}</dl></div><p class="microcopy">数的是承重绳段，不是轮子个数。现实起重需要专业安全措施，这不是操作培训。</p>`;
}
export function playPreview(o) {
    if (!isPlay(o.topic))
        return '';
    let svg = '';
    if (o.topic === 'buoyancy') {
        const p = o.params, r = buoyancy.evaluate(p), size = Math.cbrt(p.volume) * 19, yy = r.state === 'float' ? 44 + size * (r.fraction - .5) : r.state === 'neutral' ? 70 : 99 - size / 2;
        svg = `<rect x="21" y="24" width="188" height="77" rx="10" fill="#d8ebea" stroke="#94b6b4"/><path d="M22 44H208" stroke="#769fa5" stroke-width="2"/><rect x="${115 - size / 2}" y="${yy - size / 2}" width="${size}" height="${size}" rx="3" fill="#e3b6a4" stroke="#9b7d69"/><text x="115" y="119" text-anchor="middle" font-size="11" fill="#36564d">${r.state === 'float' ? '漂浮' : r.state === 'neutral' ? '理想悬浮' : '到达槽底'} · ${p.mass} kg / ${p.volume} L</text>`;
    }
    else if (o.topic === 'shadow') {
        const p = o.params, r = shadow.evaluate(p), x = 30 + p.objectDistance * 36, screen = 30 + p.screenDistance * 36, h = 8 * r.magnification;
        svg = `<rect x="${screen}" y="12" width="4" height="100" fill="#aa9786"/><path d="M30 61L${screen} ${61 - h} M30 61L${screen} ${61 + h}" stroke="#bbaa70" fill="none"/><rect x="${x - 2}" y="53" width="4" height="16" rx="2" fill="#be907b"/><rect x="${screen - 3}" y="${61 - h}" width="6" height="${2 * h}" fill="#53666a"/><circle cx="30" cy="61" r="7" fill="#dfbe78"/><text x="115" y="127" text-anchor="middle" font-size="11" fill="#36564d">影子线性尺寸 ${r.magnification.toFixed(2)} 倍</text>`;
    }
    else {
        const p = o.params, r = pulley.evaluate(p);
        svg = `<path d="M35 19H195" stroke="#87a59b" stroke-width="8"/>${Array.from({ length: p.strands }, (_, i) => `<path d="M${70 + i * 18} 23V${85 - r.rise * 20}" stroke="#bb9f6b" stroke-width="3"/>`).join('')}<rect x="52" y="${85 - r.rise * 20}" width="95" height="24" rx="4" fill="#b8916f"/><path d="M186 23V${48 + p.pull * 20}" stroke="#bb9f6b" stroke-width="3"/><rect x="178" y="${48 + p.pull * 20}" width="16" height="7" rx="2" fill="#d99e8d"/><text x="115" y="127" text-anchor="middle" font-size="11" fill="#36564d">拉绳 ${p.pull.toFixed(2)} m → 上升 ${r.rise.toFixed(2)} m</text>`;
    }
    return `<figure class="condition-preview"><svg viewBox="0 0 230 138" role="img" aria-label="按已保存条件绘制的原理对照图">${svg}</svg><figcaption>保存参数的示意重建 · 非实测</figcaption></figure>`;
}