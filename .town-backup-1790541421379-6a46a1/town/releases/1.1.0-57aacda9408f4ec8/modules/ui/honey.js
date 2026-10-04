import { honey } from '../experiments/honey.js';
const button = (action, label, value = '', active = false) => `<button type="button" data-action="${action}" data-value="${value}" ${active ? 'class="selected" aria-pressed="true"' : ''}>${label}</button>`;
export function honeyControls(s, deep) {
    const p = s.honey;
    return `<p class="microcopy">拖动桌上的蜜罐，在储放台与温水盆之间移动。所有操作也可用下方按钮完成。</p>
	<div class="control-group"><span class="field-label">同一蜜罐，放到哪里？</span><div class="segments">${button('honey-place', '放到储放台', 'shelf', p.place === 'shelf')}${button('honey-place', '移入温水盆', 'bath', p.place === 'bath')}</div></div>
	<div class="control-group"><span class="field-label">组成情境（不是蜜种鉴定）</span><div class="segments">${button('honey-profile', '相对富葡萄糖', 'glucose-rich', p.profile === 'glucose-rich')}${button('honey-profile', '相对富果糖', 'fructose-rich', p.profile === 'fructose-rich')}</div></div>
	<div class="control-group"><span class="field-label">起始状态</span><div class="segments">${button('honey-initial', '少量晶体', 'seeded', p.initial === 'seeded')}${button('honey-initial', '未画出晶体', 'clear', p.initial === 'clear')}</div></div>
	<div class="honey-note">储放情境不是“越冷越快”。动画时长与晶体标记数量都是编排，不是实际测量。</div>
	<div class="button-row">${button('observe', '观察状态变化')}</div>
	${deep ? button('honey-cutaway', s.flip ? '收回排列放大片' : '剖开蜜罐看排列', '', s.flip) + (s.flip ? '<p class="microcopy">放大片：方块表示有序排列，小点表示未加入晶体的部分。只是概念，不是真实分子或晶格。</p>' : '') : ''}`;
}
export function honeyPreview(o) {
    if (o.topic !== 'honey')
        return '';
    const p = o.params, r = honey.evaluate(p), n = r.finalMarkers;
    return `<figure class="condition-preview"><svg viewBox="0 0 230 118" role="img" aria-label="保存条件对应的蜜罐状态示意，不是显微照片"><rect x="75" y="19" width="80" height="90" rx="17" fill="#edd7a6" stroke="#728d80" stroke-width="3"/><rect x="81" y="11" width="68" height="14" rx="4" fill="#8ba79a"/>${Array.from({ length: n }, (_, i) => `<rect x="${88 + i % 5 * 11}" y="${94 - Math.floor(i / 5) * 11}" width="8" height="8" rx="2" fill="#fff4d5" stroke="#ae9565"/>`).join('')}<text x="115" y="63" text-anchor="middle" fill="#36564d" font-size="13">${p.place === 'bath' ? '回溶情境' : '储放情境'}</text></svg><figcaption>原理示意 · 按保存的条件重建</figcaption></figure>`;
}