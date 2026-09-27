import { buoyancy, shadow, pulley } from '../experiments/playyard.js';
/** Optional starting conditions, not answers, achievements or artificial unlock gates. */
import { honey } from '../experiments/honey.js';
import { uv, food, hands } from '../experiments/models.js';
import { optics, balance, soundModel } from '../experiments/physics.js';
export const scenarios = [
    { id: 'float-baseline', topic: 'buoyancy', title: '给小箱一次下水机会', prompt: '先保留 2 kg 与 3 L，观察再保存。接着只缩小体积。', params: buoyancy.defaults },
    { id: 'float-small', topic: 'buoyancy', title: '同样重，身体更小', prompt: '保持质量和淡水不变，将密封体积变为 1 L。它还能漂浮吗？', params: () => ({ ...buoyancy.defaults(), volume: 1 }) },
    { id: 'float-neutral', topic: 'buoyancy', title: '不升也不沉的边界', prompt: '比较 2 kg / 2 L 淡水预设。中性浮力不是没有力。', params: () => ({ ...buoyancy.defaults(), volume: 2 }) },
    { id: 'float-salt', topic: 'buoyancy', title: '不换小箱，只换水', prompt: '接着仅换为盐水代表密度，观察完全浸没时的浮力。', params: () => ({ ...buoyancy.defaults(), volume: 2, liquid: 'salt' }) },
    { id: 'shadow-intro', topic: 'shadow', title: '猫头鹰的第一场戏', prompt: '先在轨道中段观察。小物偶本身保持同样大小。', params: shadow.defaults },
    { id: 'shadow-near', topic: 'shadow', title: '没有长大的大猫头鹰', prompt: '幕布位置不变，只把物偶移近灯，比较影子。', params: () => ({ ...shadow.defaults(), objectDistance: .8 }) },
    { id: 'shadow-screen', topic: 'shadow', title: '往后退一步的幕布', prompt: '物偶位置不变，只把幕布移动得更远。', params: () => ({ ...shadow.defaults(), screenDistance: 4 }) },
    { id: 'shadow-same', topic: 'shadow', title: '位置不同，比例相同', prompt: '与初始情境比较：两个距离都缩成同一比例。两项同时变动时要明确记录。', params: () => ({ ...shadow.defaults(), objectDistance: 1.3, screenDistance: 2.6 }) },
    { id: 'pulley-single', topic: 'pulley', title: '先认识一个定滑轮', prompt: '拉出 1 m 绳，观察花篮升高多少。', params: pulley.defaults },
    { id: 'pulley-two', topic: 'pulley', title: '一起托住花篮', prompt: '只换成两段承重绳，仍拉 1 m，比较拉力与上升距离。', params: () => ({ ...pulley.defaults(), strands: 2 }) },
    { id: 'pulley-four', topic: 'pulley', title: '四段绳的慢提升', prompt: '保持质量和拉绳距离，仅增加承重绳段。', params: () => ({ ...pulley.defaults(), strands: 4 }) },
    { id: 'pulley-same-height', topic: 'pulley', title: '回到同样的高度', prompt: '两段承重绳拉 2 m，与一段绳拉 1 m 比较。参数不同，输入功相同。', params: () => ({ ...pulley.defaults(), strands: 2, pull: 2 }) },
    { id: 'honey-grow', topic: 'honey', title: '蜜罐里的细小晶体', prompt: '先在储放台观察，再仅把同样起始状态的蜜罐移入温水盆。', params: honey.defaults },
    { id: 'honey-bath', topic: 'honey', title: '同样的蜜，换个条件', prompt: '不改组成与起始晶体，只改放置位置。回溶也不是真假鉴定。', params: () => ({ ...honey.defaults(), place: 'bath' }) },
    { id: 'honey-profile', topic: 'honey', title: '蜜源会影响吗？', prompt: '与储放基准比较，只换组成预设。标记数量不是测量结果。', params: () => ({ ...honey.defaults(), profile: 'fructose-rich' }) },
    { id: 'honey-clear', topic: 'honey', title: '起初没有画出晶体', prompt: '温水能让原本清澈的蜜罐变成真假检测器吗？', params: () => ({ ...honey.defaults(), place: 'bath', initial: 'clear' }) },
    { id: 'uv-open', topic: 'uv', title: '晴天的花圃', prompt: '先留下一次开阔位置的观察。之后只改变天气。', params: uv.defaults },
    { id: 'uv-cloud', topic: 'uv', title: '云来了', prompt: '画面变暗，路径也全没了吗？与晴天、同一探头位置对照。', params: () => ({ ...uv.defaults(), weather: 'cloudy' }) },
    { id: 'uv-shelter', topic: 'uv', title: '同一个位置加遮阳', prompt: '天气和探头不变，只把遮阳棚移过来。', params: () => ({ ...uv.defaults(), shade: 1 }) },
    { id: 'food-quick', topic: 'food', title: '很快捡起来', prompt: '在有污染的表面预设上，观察 0.5 秒接触。', params: food.defaults, autoPick: .5 },
    { id: 'food-five', topic: 'food', title: '把五秒放大看', prompt: '食物和表面不变，只延长接触时间。', params: food.defaults, autoPick: 5 },
    { id: 'food-bread', topic: 'food', title: '换一种食物', prompt: '与 0.5 秒西瓜接触比较；表面和时间都不变。', params: () => ({ ...food.defaults(), food: 'bread' }), autoPick: .5 },
    { id: 'hands-usual', topic: 'hands', title: '日常接触之后', prompt: '从没有搓擦的手部开始，亲手覆盖六个部位。', params: hands.defaults },
    { id: 'hands-oil', topic: 'hands', title: '料理后的油污', prompt: '观察可见污物与操作覆盖。现实操作仍按官方指南。', params: () => ({ ...hands.defaults(), scenario: 'greasy' }) },
    { id: 'hands-away', topic: 'hands', title: '暂时没有水槽', prompt: '普通接触、没有明显脏污时，探索免洗方式的适用条件。', params: () => ({ ...hands.defaults(), method: 'sanitiser' }) },
    { id: 'optics-oblique', topic: 'optics', title: '斜着进入水中', prompt: '先观察 45° 的入射方向，再试正对界面。', params: optics.defaults },
    { id: 'optics-normal', topic: 'optics', title: '正对界面', prompt: '保持水体不变，只把灯头转到 0°。', params: () => ({ ...optics.defaults(), angle: 0 }) },
    { id: 'optics-air', topic: 'optics', title: '两边都是空气', prompt: '保持入射角不变，只替换下方介质。', params: () => ({ ...optics.defaults(), medium: 'air' }) },
    { id: 'balance-equal', topic: 'balance', title: '等臂先试一次', prompt: '左边 2 kg、右边 1 kg，两边都离支点 1 m。', params: balance.defaults },
    { id: 'balance-distance', topic: 'balance', title: '轻配重向外移', prompt: '不增加配重，只把右侧距离改到 2 m。', params: () => ({ ...balance.defaults(), rightDistance: 2 }) },
    { id: 'balance-further', topic: 'balance', title: '再远一格呢', prompt: '保持两边质量不变，把右配重再移远一格。', params: () => ({ ...balance.defaults(), rightDistance: 3 }) },
    { id: 'sound-gentle', topic: 'sound', title: '先轻轻拨弦', prompt: '弦长 0.6 m、张力 40 N；留下一次基准观察。', params: soundModel.defaults },
    { id: 'sound-strong', topic: 'sound', title: '只拨大一点', prompt: '弦长和张力不变，观察振幅与计算基频。', params: () => ({ ...soundModel.defaults(), amplitude: 2 }) },
    { id: 'sound-short', topic: 'sound', title: '把弦缩短一半', prompt: '回到轻拨，把有效弦长改为 0.3 m。', params: () => ({ ...soundModel.defaults(), length: .3 }) }
];
export function loadScenario(s, id) {
    const entry = scenarios.find(p => p.id === id && p.topic === s.topic);
    if (!entry)
        return false;
    s.reset();
    // Replay centralises typed assignments; immediately return to a ready, unobserved setup.
    s.replay(entry.params());
    s.changed();
    if (entry.autoPick !== undefined)
        s.autoPick = entry.autoPick;
    return true;
}