export const honey = {
    id: 'honey',
    defaults: () => ({ profile: 'glucose-rich', place: 'shelf', initial: 'seeded' }),
    evaluate(p) {
        const initialMarkers = p.initial === 'seeded' ? 8 : 0;
        // Marker counts and interpolation times are authored diagram choices, never measured quantities.
        const finalMarkers = p.place === 'bath' ? 0 : p.profile === 'glucose-rich' ? 28 : 12;
        return { initialMarkers, finalMarkers, summary: p.place === 'bath' ?
                (p.initial === 'clear' ? '这罐起初没有画出晶体，温水情境也没有把它变成真假鉴定。' : '温水情境中，原有晶体逐渐回溶。状态改变，不是添加或移除了“真假”属性。') :
                '蜜罐里出现了晶体。天然蜂蜜也会结晶；只凭结晶或清澈，都不足以判断真伪。' };
    },
    describe: (p) => ({
        '组成情境': p.profile === 'glucose-rich' ? '相对富葡萄糖预设' : '相对富果糖预设',
        '放置位置': p.place === 'shelf' ? '适于结晶的储放情境' : '温水回溶情境',
        '起始状态': p.initial === 'seeded' ? '已有少量晶体' : '未画出晶体',
        '固定假设': '同一示意时窗；含水条件不变；非真实性或食用安全检测'
    })
};
export function honeyMarkers(p, progress) {
    const r = honey.evaluate(p), t = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
    return Math.round(r.initialMarkers + (r.finalMarkers - r.initialMarkers) * (t * t * (3 - 2 * t)));
}