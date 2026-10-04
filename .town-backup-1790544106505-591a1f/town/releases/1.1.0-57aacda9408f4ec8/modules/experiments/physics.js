export const PHYSICS_IDS = ['optics', 'balance', 'sound'];
export const REFRACTIVE_INDEX = { air: 1, water: 1.33, glass: 1.52 };
export const MEDIUM_NAMES = { air: '空气对照', water: '水体预设', glass: '玻璃预设' };
const radians = (degrees) => degrees * Math.PI / 180;
export const isPhysics = (id) => PHYSICS_IDS.includes(id);
export const optics = {
    id: 'optics', defaults: () => ({ medium: 'water', angle: 45 }),
    evaluate(p) {
        const refractedAngle = Math.asin(Math.sin(radians(p.angle)) / REFRACTIVE_INDEX[p.medium]) * 180 / Math.PI;
        return { refractedAngle, deviation: p.angle - refractedAngle,
            summary: p.angle === 0 ? '正对界面进入时，方向没有转弯。换介质仍可改变光速；不转向不等于什么都没变。' : p.medium === 'air' ? '两边都是同一空气预设，方向没有改变。换成水或玻璃，再比较。' : '斜着进入较高折射率的介质，路径靠近法线。转向取决于入射角和两边介质，不是“遇水就一定转弯”。' };
    },
    describe: p => ({ '下方介质': MEDIUM_NAMES[p.medium], '入射角（与法线）': `${p.angle}°`, '固定假设': '上方空气 n=1；平界面、单色几何光学；不计算反射强度' })
};
export const balance = {
    id: 'balance', defaults: () => ({ leftMass: 2, rightMass: 1, leftDistance: 1, rightDistance: 1 }),
    evaluate(p) {
        const leftTorque = p.leftMass * 9.8 * p.leftDistance, rightTorque = p.rightMass * 9.8 * p.rightDistance, net = leftTorque - rightTorque;
        const balanced = Math.abs(net) < 1e-8;
        return { leftTorque, rightTorque, net, balanced, visualTilt: balanced ? 0 : .23 * Math.sign(net),
            summary: balanced ? '两侧的质量可以不同；质量 × 到支点的距离相同，理想横杆也能平衡。支点同时提供向上的支持力。' : `${net > 0 ? '左' : '右'}侧的转动作用更大。只看质量不够，还要看它离支点有多远。倾角只是转动方向示意，不是动力学测量。` };
    },
    describe: p => ({ '左侧质量': `${p.leftMass} kg`, '右侧质量': `${p.rightMass} kg`, '左侧距离': `${p.leftDistance} m（模型尺度）`, '右侧距离': `${p.rightDistance} m（模型尺度）`, '固定假设': '无摩擦支点、横杆质量忽略；初始水平；g=9.8 m/s²' })
};
export const STRING_DENSITY = .001;
export const SOUND_SLOWDOWN = 120;
export const soundModel = {
    id: 'sound', defaults: () => ({ length: .6, tension: 40, amplitude: 1 }),
    evaluate(p) {
        const waveSpeed = Math.sqrt(p.tension / STRING_DENSITY), frequency = waveSpeed / (2 * p.length);
        return { frequency, period: 1 / frequency, waveSpeed,
            summary: '在小振幅、张力不变的理想弦模型中，拨得更大主要改变振幅，不自动提高基频。缩短有效弦长或增加张力，才会提高这个模型的基频。' };
    },
    describe: p => ({ '有效弦长': `${p.length.toFixed(1)} m`, '张力预设': `${p.tension} N`, '拨弦幅度': p.amplitude === 1 ? '轻拨' : '较大幅度', '固定假设': '均匀理想弦、两端固定、小振幅；线密度 0.001 kg/m；只示意基频' })
};
/** View-only slow motion. Same elapsed seconds always produce the same displacement. */
export function stringDisplacement(p, x, elapsed, frozen = false) {
    if (x <= 0 || x >= 1)
        return 0;
    const amplitude = (p.amplitude === 1 ? .10 : .22) * Math.exp(-elapsed * .23);
    return amplitude * Math.sin(Math.PI * x) * (frozen ? 1 : Math.sin(2 * Math.PI * soundModel.evaluate(p).frequency * elapsed / SOUND_SLOWDOWN));
}