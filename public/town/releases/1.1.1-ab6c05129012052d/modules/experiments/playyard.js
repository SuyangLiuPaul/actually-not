/** Three deterministic teaching models. Motion duration is visual staging, not measured dynamics. */
export const PLAY_TOPICS = ['buoyancy', 'shadow', 'pulley'];
export const isPlay = (id) => PLAY_TOPICS.includes(id);
export const G = 9.8;
const finiteRange = (n, a, b) => typeof n === 'number' && Number.isFinite(n) && n >= a && n <= b;
export function canonicalPlay(id, value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    const p = value;
    if (id === 'buoyancy')
        return finiteRange(p.mass, .5, 4) && finiteRange(p.volume, 1, 6) && typeof p.liquid === 'string' && ['fresh', 'salt'].includes(p.liquid) ? { mass: p.mass, volume: p.volume, liquid: p.liquid } : null;
    if (id === 'shadow')
        return finiteRange(p.objectDistance, .8, 2) && finiteRange(p.screenDistance, 2.5, 4) && typeof p.puppet === 'string' && ['owl', 'leaf'].includes(p.puppet) ? { objectDistance: p.objectDistance, screenDistance: p.screenDistance, puppet: p.puppet } : null;
    return [1, 2, 4].includes(Number(p.strands)) && typeof p.strands === 'number' && finiteRange(p.mass, 1, 4) && finiteRange(p.pull, .25, 2) ? { strands: p.strands, mass: p.mass, pull: p.pull } : null;
}
export const buoyancy = {
    defaults: () => ({ mass: 2, volume: 3, liquid: 'fresh' }),
    evaluate(p) {
        if (!canonicalPlay('buoyancy', p))
            throw new RangeError('Invalid buoyancy parameters');
        const density = p.liquid === 'fresh' ? 1000 : 1030;
        const capacity = density * p.volume / 1000;
        const ratio = p.mass / capacity;
        const state = Math.abs(ratio - 1) < 1e-9 ? 'neutral' : ratio < 1 ? 'float' : 'sink';
        return { density, averageDensity: p.mass / (p.volume / 1000), weight: p.mass * G, maxBuoyancy: capacity * G,
            fraction: Math.min(1, ratio), displaced: Math.min(p.mass / density * 1000, p.volume), state,
            summary: state === 'float' ? '漂浮时，浮力与重量相等。只看重不重不够，还要比较总质量、排水体积和液体密度。' : state === 'neutral' ? '在这个理想预设中，完全浸没时浮力恰好等于重量，可以悬浮。真实材料、气泡和水流可能改变条件。' : '它沉下去了，但浮力没有消失；完全浸没时的浮力仍不足以抵消重量。到达槽底后，还会受到槽底支持力。' };
    },
    describe: (p) => ({ '总质量': `${p.mass} kg`, '物体密封体积': `${p.volume} L`, '液体预设': p.liquid === 'fresh' ? '淡水 1000 kg/m³' : '盐水 1030 kg/m³', '固定假设': '密封、不吸水、无表面张力；忽略装饰质量；非船舶安全设计' })
};
export const shadow = {
    defaults: () => ({ objectDistance: 1.6, screenDistance: 3.2, puppet: 'owl' }),
    evaluate(p) {
        if (!canonicalPlay('shadow', p))
            throw new RangeError('Invalid shadow parameters');
        const magnification = p.screenDistance / p.objectDistance;
        return { magnification, height: .45 * magnification,
            summary: '物偶没有长大。点光源到物偶和幕布的距离比例改变，投影大小就会改变。这里计算的是几何影子，不是现实灯具的照度或半影。' };
    },
    describe: (p) => ({ '光源到物偶': `${p.objectDistance} m`, '光源到幕布': `${p.screenDistance} m`, '物偶轮廓': p.puppet === 'owl' ? '小猫头鹰' : '叶片', '固定假设': '理想点光源；平行物偶与幕布；直线传播；物偶标称高 0.45 m' })
};
export const pulley = {
    defaults: () => ({ strands: 1, mass: 2, pull: 1 }),
    evaluate(p) {
        if (!canonicalPlay('pulley', p))
            throw new RangeError('Invalid pulley parameters');
        const force = p.mass * G / p.strands, rise = p.pull / p.strands;
        return { force, rise, workIn: force * p.pull, workOut: p.mass * G * rise,
            summary: p.strands === 1 ? '这个定滑轮改变拉力方向，不减小理想拉力。接下来只增加承重绳段，再比较同样的拉绳距离。' : '承重绳段增加，理想拉力减小；同样拉一段绳，重物上升得更少。省力不等于省功，真实装置还会有摩擦损失。' };
    },
    describe: (p) => ({ '承重绳段': `${p.strands} 段`, '载荷总质量': `${p.mass} kg`, '拉出绳长': `${p.pull} m`, '固定假设': '不可伸长轻绳、无摩擦轻滑轮、准静态提升；不模拟现实起重操作' })
};
export function playResult(id, p) {
    return id === 'buoyancy' ? buoyancy.evaluate(p).summary : id === 'shadow' ? shadow.evaluate(p).summary : pulley.evaluate(p).summary;
}
export function playDescribe(id, p) {
    return id === 'buoyancy' ? buoyancy.describe(p) : id === 'shadow' ? shadow.describe(p) : pulley.describe(p);
}
/** Time-based, bounded visual easing. No physical settling or propagation time is asserted. */
export function staging(elapsed, ready = false) {
    if (ready || !Number.isFinite(elapsed))
        return 0;
    const t = Math.min(1, Math.max(0, elapsed / 3.2));
    return t * t * (3 - 2 * t);
}