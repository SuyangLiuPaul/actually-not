import { PLAY_TOPICS, isPlay, playDescribe } from './playyard.js';
import { honey } from './honey.js';
import { optics, balance, soundModel } from './physics.js';
export const TOPICS = ['uv', 'food', 'hands', 'optics', 'balance', 'sound', 'honey', ...PLAY_TOPICS];
export const ZONES = ['左掌', '右掌', '指缝', '拇指', '指尖', '手背'];
export const LOCATIONS = ['树边', '开阔花圃', '花圃右侧'];
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export function seeded(seed) { let a = seed | 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const uv = {
    id: 'uv', defaults: () => ({
        weather: 'sunny', probe: 1, shade: 2
    }), evaluate(p) {
        const sheltered = p.probe === 0 || p.probe === p.shade;
        return {
            visible: p.weather === 'sunny' ? '肉眼：明亮、阴影清晰' : '肉眼：变暗、阴影柔和', direct: sheltered ? '上方部分路径被遮挡' : p.weather === 'cloudy' ? '云下仍有到达路径' : '上方到达路径保留', diffuse: '周围天空的散射路径仍在', sheltered, summary: (p.weather === 'cloudy' ? '画面变暗了，但 UV 没有因此消失。' : '可见的明暗不能直接告诉我们 UV 强弱。') + (sheltered ? '遮挡减少部分到达路径，却不代表完全防护。' : '试着移动探头或遮阳棚，分开看上方与天空的路径。')
        };
    }, describe: p => ({
        '天气情境': p.weather === 'sunny' ? '晴天预设' : '多云预设', '探头位置': LOCATIONS[p.probe], '遮阳棚位置': p.shade < 0 ? '停靠位' : LOCATIONS[p.shade], '固定假设': '白天；不计算真实 UV 指数'
    })
};
export const food = {
    id: 'food', defaults: () => ({
        food: 'watermelon', surface: 'tile', seconds: 0, seed: 221
    }), evaluate(p) {
        const rand = seeded(p.seed), moist = p.food === 'watermelon' ? .45 : .24, contact = p.surface === 'tile' ? 1 : .64;
        return { tokens: Array.from({ length: 36 }, () => {
                const x = (rand() - .5) * 1.25, z = (rand() - .5) * .95, q = rand();
                const threshold = q < moist * contact ? .06 + rand() * .16 : 1.2 + rand() * (p.food === 'watermelon' ? 48 : 95) / contact;
                return {
                    x, z, threshold, transferred: p.seconds >= threshold
                };
            }), summary: p.seconds <= 0 ? '尚未接触。' : '预设中，短时间接触也可以发生转移。五秒不是安全开关；发生转移也不等于某个人一定生病。' };
    }, describe: p => ({
        '食物': p.food === 'watermelon' ? '西瓜' : '面包', '接触表面': p.surface === 'tile' ? '瓷砖预设' : '地毯预设', '接触时间': `${p.seconds.toFixed(1)} 秒`, '可复现种子': String(p.seed), '固定假设': '表面已有微生物；点数不是菌落测量'
    })
};
export const hands = {
    id: 'hands', defaults: () => ({
        scenario: 'ordinary', method: 'soap', coverage: [0, 0, 0, 0, 0, 0]
    }), evaluate(p) {
        const c = p.coverage.map(v => clamp(v, 0, 1)), greasy = p.scenario === 'greasy';
        return {
            dirt: c.map(v => greasy ? Math.max(0, Math.ceil(5 * (1 - v * (p.method === 'soap' ? .96 : .2)))) : 0), factors: c.map(v => Math.max(1, Math.ceil(7 * (1 - v * (p.method === 'water' ? .27 : greasy && p.method === 'sanitiser' ? .31 : .82))))), reached: c.filter(v => v > 0).length, thorough: c.filter(v => v >= .99).length, summary: greasy ? (p.method === 'soap' ? '明显油污情境下，肥皂加流水更适合；还要留意遗漏区域。' : '明显油污会影响清洁：免洗洗手液不能替代此时的肥皂加流水，清水也不善于带走油污。') : (p.method === 'sanitiser' ? '手没有明显脏污、又不方便用肥皂和水时，合规格免洗洗手液可用；仍需覆盖所有手部并搓至干燥。' : p.method === 'soap' ? '肥皂与流水帮助带走污物和微生物；外观干净仍不等于没有不可见因素。' : '清水与肥皂加流水不等同；覆盖不到的区域更容易被忽略。')
        };
    }, describe: p => ({
        '手部情境': p.scenario === 'greasy' ? '明显油污' : '普通接触', '方法': {
            water: '清水', soap: '肥皂＋流水', sanitiser: '免洗洗手液（酒精至少 60%）'
        }[p.method], '搓擦路线': p.coverage.map((v, i) => `${ZONES[i]} ${Math.round(v * 3)}/3`).join('、'), '固定假设': '标记表示操作覆盖，不是除菌率'
    })
};
export function describe(topic, p) {
    if (isPlay(topic))
        return playDescribe(topic, p);
    if (topic === 'honey')
        return honey.describe(p);
    if (topic === 'optics')
        return optics.describe(p);
    if (topic === 'balance')
        return balance.describe(p);
    if (topic === 'sound')
        return soundModel.describe(p);
    if (topic === 'uv')
        return uv.describe(p);
    if (topic === 'food')
        return food.describe(p);
    return hands.describe(p);
}
export function compare(a, b) {
    if (a.topic !== b.topic)
        throw Error('Cannot compare different experiments');
    const x = describe(a.topic, a.params), y = describe(b.topic, b.params), changed = [], unchanged = [];
    for (const k of Object.keys(x)) {
        if (x[k] === y[k])
            unchanged.push(`${k}：${x[k]}`);
        else
            changed.push(`${k}：${x[k]} → ${y[k]}`);
    }
    return { changed, unchanged };
}
export function cloneObservation(topic, params, id, at) {
    return {
        id, topic, recordedAt: at, params: structuredClone(params), modelVersion: 1
    };
}