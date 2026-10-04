import { optics, balance, soundModel, MEDIUM_NAMES, isPhysics } from '../experiments/physics.js';
const button = (a, l, v = '', selected = false) => `<button data-action="${a}" data-value="${v}" aria-pressed="${selected}" class="${selected ? 'selected' : ''}">${l}</button>`;
const row = (title, html) => `<fieldset class="segment"><legend>${title}</legend><div class="button-row">${html}</div></fieldset>`;
export const scienceBadge = (s) => s.topic === 'optics' ? '原理示意 · 光路线不是现场测量' : s.topic === 'balance' ? '理想杠杆 · 倾角是艺术表现' : '理想弦 · 动画慢放 120 倍，位移放大';
export function scienceControls(s, deep) {
    if (s.topic === 'optics') {
        const p = s.optics, r = optics.evaluate(p);
        return `<p class="microcopy">按住桌上的投光器，沿刻度弧拖动；换介质盒后再观察同一个角度。入射角从法线量起，不是从桌面量起。</p>` +
            row('更换下方介质盒', Object.entries(MEDIUM_NAMES).map(([id, label]) => button('medium', label, id, p.medium === id)).join('')) +
            row('转动投光器', [0, 30, 45, 60].map(a => button('incident', `${a}°`, String(a), p.angle === a)).join('') + button('incident-step', '减 5°', '-5') + button('incident-step', '加 5°', '5')) +
            `<div class="readout" data-physics-reading>入射角 ${p.angle}° · 折射角 ${r.refractedAngle.toFixed(1)}°<small>模型计算 · 不是实测读数</small></div>` +
            button('observe', '追踪这条光路') + (deep ? `<p class="microcopy">上方空气 n₁=1；下方 n₂=${p.medium === 'air' ? '1' : p.medium === 'water' ? '1.33' : '1.52'}。n₁ sin θ₁ = n₂ sin θ₂。这里只追踪折射路径，不计算反射强度。</p>` : '');
    }
    if (s.topic === 'balance') {
        const p = s.balance, r = balance.evaluate(p);
        return `<p class="microcopy">左右配重可以沿横杆拖到三个槽位。也可以逐一选择质量、位置，再松开锁扣。</p>` +
            ['left', 'right'].map(side => row(`${side === 'left' ? '左' : '右'}侧配重`, [1, 2, 3, 4].map(m => button(`${side}-mass`, `${m} kg`, String(m), p[`${side}Mass`] === m)).join('')) + row(`${side === 'left' ? '左' : '右'}侧离支点的距离`, [1, 2, 3].map(d => button(`${side}-distance`, `${d} m`, String(d), p[`${side}Distance`] === d)).join(''))).join('') +
            `<div class="readout">左 ${r.leftTorque.toFixed(1)} N·m · 右 ${r.rightTorque.toFixed(1)} N·m<small>理想模型计算；质量刻度与距离为模型尺度</small></div>` + button('observe', '松开锁扣 · 看平衡') +
            (deep ? button('support-layer', s.deepLayer === 'sky' ? '收起支点支持力' : '另看支点支持力', '', s.deepLayer === 'sky') + '<p class="microcopy">静止平衡还需要合力为零；支点提供支持力。图中箭头用于指出方向，不是按力值缩放的矢量图。</p>' : '');
    }
    const p = s.sound, r = soundModel.evaluate(p);
    return `<p class="microcopy">拖动弦末端的蓝绿琴码来改变有效弦长，再点弦或“拨动琴弦”。黄色端点是固定点，不表示整根弦一起上下移动。</p>` +
        row('移动琴码', [.3, .6, .9].map(l => button('string-length', `${l.toFixed(1)} m`, String(l), Math.abs(p.length - l) < .001)).join('') + button('length-step', '缩短 0.1 m', '-.1') + button('length-step', '延长 0.1 m', '.1')) +
        row('转动张力旋钮', [40, 80].map(t => button('tension', `${t} N`, String(t), p.tension === t)).join('')) +
        row('拨弦幅度', button('amplitude', '轻拨', '1', p.amplitude === 1) + button('amplitude', '较大幅度', '2', p.amplitude === 2)) +
        `<div class="readout">基频 ${r.frequency.toFixed(1)} Hz<small>理想弦计算；只合成这一频率。不是录音或设备声压测量</small></div>` + button('pluck', '拨动琴弦') +
        `<p class="microcopy">静音也能完成探索。画面慢放 120 倍并放大位移；声音按模型基频合成，音量不代表真实响度。</p>` + (deep ? `<p class="microcopy">f = (1 / 2L) √(T / μ)，这里 μ=0.001 kg/m。大振幅、刚度、实际乐器与泛音不在当前模型中。</p>` : '');
}
export function scienceLegend(s) {
    return s.topic === 'optics' ? '<span>棕色入射路径 · 蓝色折射路径 · 虚线法线</span><small>同时用位置和标签区分。画线是观察工具，不是肉眼看见光线的保证。</small>' : s.topic === 'balance' ? '<span>配重圆盘：每片 1 kg 模型质量 · 槽位：每格 1 m 模型距离</span><small>只模拟初始转向与平衡条件。限位倾角不是随时间求解的真实运动。</small>' : '<span>固定端点 · 有效弦长 · 振幅随拨动变化</span><small>只表现基频，慢放与放大位移是视觉工具。声压、真实听力与音高感知不在模型中。</small>';
}
export function sciencePreview(o) {
    if (!isPhysics(o.topic))
        return '';
    const s = { topic: o.topic, [o.topic]: o.params };
    if (o.topic === 'optics') {
        const r = optics.evaluate(s.optics);
        return `<div class="physics-snapshot">${scienceDiagram(o)}<span>入射 ${s.optics.angle}° → 折射 ${r.refractedAngle.toFixed(1)}°</span><strong>${MEDIUM_NAMES[s.optics.medium]}</strong><small>由保存参数重新计算 · 非实测</small></div>`;
    }
    if (o.topic === 'balance') {
        const r = balance.evaluate(s.balance);
        return `<div class="physics-snapshot">${scienceDiagram(o)}<span>左 ${r.leftTorque.toFixed(1)} / 右 ${r.rightTorque.toFixed(1)} N·m</span><strong>${r.balanced ? '理想平衡' : r.net > 0 ? '左侧下转' : '右侧下转'}</strong><small>初始力矩 · 倾角非数值解</small></div>`;
    }
    return `<div class="physics-snapshot">${scienceDiagram(o)}<span>${soundModel.evaluate(s.sound).frequency.toFixed(1)} Hz</span><strong>${s.sound.amplitude === 1 ? '轻拨' : '较大幅度'} · ${s.sound.length.toFixed(1)} m</strong><small>理想弦基频 · 非录音分析</small></div>`;
}
/** Accessible, deterministic diagrams regenerated from the immutable snapshot only.
 * They are condition diagrams, not photographs or extra measurements. */
export function scienceDiagram(o) {
    const svg = (label, body) => `<svg class="condition-diagram" viewBox="0 0 240 130" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>`;
    const point = (x) => x.toFixed(2);
    if (o.topic === 'optics') {
        const p = o.params, r = optics.evaluate(p), a = p.angle * Math.PI / 180, b = r.refractedAngle * Math.PI / 180;
        return svg('保存的入射与折射路径；虚线是法线', `<rect x="0" y="64" width="240" height="66" fill="${p.medium === 'water' ? '#d1e5e6' : p.medium === 'glass' ? '#e0e8df' : '#f5f4e9'}"/><path d="M10 64H230M120 5V123" stroke="#657d76" stroke-dasharray="4 4"/><path d="M${point(120 - 57 * Math.sin(a))} ${point(64 - 57 * Math.cos(a))}L120 64" stroke="#977749" stroke-width="3"/><path d="M120 64L${point(120 + 57 * Math.sin(b))} ${point(64 + 57 * Math.cos(b))}" stroke="#507f8c" stroke-width="3"/><text x="8" y="18">入射 ${p.angle}°</text><text x="8" y="113">折射 ${r.refractedAngle.toFixed(1)}°</text><text x="205" y="58">界面</text>`);
    }
    if (o.topic === 'balance') {
        const p = o.params, r = balance.evaluate(p), s = r.balanced ? 0 : r.net > 0 ? -7 : 7;
        const y = (x) => 65 + (x - 120) / 26 * s, left = 120 - p.leftDistance * 26, right = 120 + p.rightDistance * 26;
        return svg('保存的两侧配重、力臂与初始转动方向；倾角是示意', `<path d="M106 116L120 65L134 116Z" fill="#b9c9bc"/><path d="M20 ${point(y(20))}L220 ${point(y(220))}" stroke="#886c49" stroke-width="5"/>${['left', 'right'].map(side => { const x = side === 'left' ? left : right, m = p[`${side}Mass`]; return Array.from({ length: m }, (_, i) => `<rect x="${x - 12}" y="${point(y(x) - 9 - i * 7)}" width="24" height="6" rx="2" fill="${side === 'left' ? '#8ca7aa' : '#c7a17a'}"/>`).join('') + `<text x="${x}" y="${point(y(x) + 20)}" text-anchor="middle">${m} kg</text>`; }).join('')}<text x="8" y="16">左 ${p.leftDistance} m</text><text x="175" y="16">右 ${p.rightDistance} m</text><text x="120" y="129" text-anchor="middle">支点</text>`);
    }
    if (o.topic === 'sound') {
        const p = o.params, L = p.length / .9 * 200, amp = p.amplitude === 1 ? 17 : 33;
        const points = Array.from({ length: 41 }, (_, i) => `${point(20 + L * i / 40)},${point(76 - amp * Math.sin(Math.PI * i / 40))}`).join(' ');
        return svg('保存的有效弦长与振幅包络；两端固定，位移已放大', `<path d="M20 76H220" stroke="#c0c9b9" stroke-dasharray="4 4"/><polyline points="${points}" stroke="#527f84" stroke-width="3" fill="none"/><circle cx="20" cy="76" r="4" fill="#987a51"/><circle cx="${point(20 + L)}" cy="76" r="4" fill="#987a51"/><path d="M20 94V106M20 100H${point(20 + L)}M${point(20 + L)} 94V106" stroke="#738174"/><text x="20" y="21">${p.amplitude === 1 ? '轻拨' : '较大幅度'} · 固定端点</text><text x="${point(20 + L / 2)}" y="122" text-anchor="middle">${p.length.toFixed(1)} m</text>`);
    }
    return '';
}