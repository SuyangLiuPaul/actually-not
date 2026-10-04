import { TOPICS } from '../experiments/models.js';
import { topics } from '../content/topics.js';
import { STATIONS } from '../game/world.js';
import { PLACE_IDS, places, VIEW_NAMES } from '../content/places.js';
import { mapBoundary, riverX, riverHalfWidth, SAMPLED_TRAILS } from '../game/landscape.js';
const button = (action, text, value = '', active = false) => `<button type="button" data-action="${action}" data-value="${value}" ${active ? 'aria-pressed="true" class="selected"' : ''}>${text}</button>`;
export const noteText = (n) => n.id === 'greenhouse' ? (n.value ? '打开了温室天窗' : '合上了温室天窗') : n.id === 'waterwheel' ? `闸板${['关闭', '半开', '全开'][n.value]}` : `望向${VIEW_NAMES[n.value]}`;
export function explorationPanel(s) {
    const p = places[s.current];
    let controls = '';
    if (p.id === 'greenhouse')
        controls = `<div class="scenic-state"><span>天窗状态</span><strong>${s.data.vent ? '已经打开' : '现在合拢'}</strong></div><div class="button-row">${button('env-vent', '打开天窗', 'open', s.data.vent)}${button('env-vent', '合上天窗', 'closed', !s.data.vent)}</div><p class="microcopy">也可以直接点 3D 屋顶。窗框会随窗扇一起转动；打开后能看见温室内部。</p>`;
    if (p.id === 'waterwheel')
        controls = `<div class="scenic-state"><span>闸板位置</span><strong>${['关闭', '半开', '全开'][s.data.gate]}</strong></div><div class="segments">${[0, 1, 2].map(n => button('env-gate', ['关上闸板', '开到一半', '完全打开'][n], String(n), s.data.gate === n)).join('')}</div><p class="microcopy">点岸边手轮也能循环切换。看闸板的高度、槽内水带和轮子的转动，不显示虚构流量。</p>${button('env-pause', s.paused ? '继续装置' : '暂停装置', '', s.paused)}`;
    if (p.id === 'lookout')
        controls = `<div class="scenic-state"><span>当前取景</span><strong>${VIEW_NAMES[s.data.view]}</strong></div><div class="scenic-views">${VIEW_NAMES.map((name, n) => button('env-view', `0${n + 1} · ${name}`, String(n), s.data.view === n)).join('')}</div><p class="microcopy">选择一个地标，望远镜会转向它，镜头也会靠近。不是寻物考试，不必看遍所有方向。</p>${button('env-platform', '返回观景平台')}`;
    const notes = s.data.notes.filter(n => n.id === p.id).length;
    return `<div class="panel-top"><span class="eyebrow">散步支线 ${p.number} · 自由停留</span>${button('env-exit', '回到小镇')}</div><h1>${p.title}</h1><p class="scenic-subtitle">${p.subtitle}</p><p class="scenic-instruction">${p.instruction}</p>${controls}<div class="scenic-limits"><span class="eyebrow">场景互动 · 艺术化演示</span><p>${p.note}</p></div><div class="panel-actions"><div class="button-row">${button('env-save', '记下这段散步')}${button('env-reset', '重置装置')}</div><p class="microcopy">${notes ? `这里已有 ${notes} 条散步记录。` : '记录可以跳过，不影响探索。'}散步记录与科普观察分开保存。</p></div>`;
}
export function mapPanel(player) {
    const outline = Array.from({ length: 72 }, (_, i) => mapBoundary(i * Math.PI / 36).map(n => n.toFixed(2)).join(',')).join(' ');
    const riverLeft = [], riverRight = [];
    for (let z = -12.3; z <= 22.6; z += .3) {
        riverLeft.push([riverX(z) - riverHalfWidth(z), z]);
        riverRight.push([riverX(z) + riverHalfWidth(z), z]);
    }
    const river = [...riverLeft, ...riverRight.reverse()].map(p => p.join(',')).join(' ');
    return `<p class="dialog-intro">${TOPICS.length} 个科普体验之外，还可以绕到温室、溪边和山坡上慢慢看。不设完成率，也不要求走完。</p><div class="town-map"><svg viewBox="-22 -16 44 41" role="img" aria-label="小镇俯视地图。左侧是花园和林间小路，中间是溪流与两座桥，右侧是厨房、工作坊与光路、平衡、弦音三座科学庭院。"><polygon points="${outline}" fill="#c4d2ae"/><polygon points="${river}" fill="#83b5b7"/><ellipse cx="6" cy="9" rx="2.2" ry="1.6" fill="#83b5b7"/>${SAMPLED_TRAILS.map(t => `<polyline points="${t.samples.map(p => p.join(',')).join(' ')}" fill="none" stroke="${t.forest ? '#e9debb' : '#f3edda'}" stroke-width="${t.width * .6}" stroke-linecap="round"/>`).join('')}${[1, 7].map(z => `<rect x="${riverX(z) - 1.54}" y="${z - .6}" width="3.08" height="1.2" rx=".12" fill="${z === 1 ? '#ceb68c' : '#c9cbbd'}" stroke="#9b9d80" stroke-width=".09"/>`).join('')}<g fill="#bc9073" stroke="#9f8166" stroke-width=".1"><rect x="-2.5" y="-8.1" width="4.8" height="3.5" rx=".3"/><rect x="6.1" y="-7.7" width="3.7" height="3.2" rx=".3"/><rect x="6.1" y="1.25" width="3.7" height="2.5" rx=".3"/></g>${TOPICS.map((id, i) => { const p = STATIONS[id]; return `<g transform="translate(${p.approach.join(' ')})"><circle r=".83" fill="#e8eedc" stroke="#6e9586" stroke-width=".08"/><text y=".3" text-anchor="middle" font-size=".9" fill="#3d5f55">${i + 1}</text></g>`; }).join('')}${PLACE_IDS.map(id => { const p = places[id]; return `<g transform="translate(${p.approach.join(' ')})"><circle r=".86" fill="#faf4de" stroke="#a9926f" stroke-width=".07"/><text y=".31" text-anchor="middle" font-size=".9" fill="#665c40">${p.number}</text></g>`; }).join('')}<g fill="#365c50"><circle cx="${player[0]}" cy="${player[1]}" r=".32"/><circle cx="${player[0]}" cy="${player[1]}" r=".65" fill="none" stroke="#365c50" stroke-width=".09"/></g></svg><span class="map-key">双圆点：你的位置　浅色线：步道　蓝绿色：水面（从桥上通过）</span></div><h3>${TOPICS.length} 个科普体验 · 独立操作与模型</h3><div class="science-destinations">${TOPICS.map((id, i) => `<section><h3>0${i + 1} · ${topics[id].place}</h3><p>${topics[id].title}</p><div class="button-row">${button('walk-science', '沿小路过去', id)}<button data-travel="${id}">直接前往</button></div></section>`).join('')}</div><h3>三个安静的散步角落 · 艺术化互动</h3><div class="scenic-destinations">${PLACE_IDS.map(id => { const p = places[id]; return `<section><div class="scenic-place-title"><span>${p.number}</span><div><h3>${p.title}</h3><p>${p.subtitle}</p></div></div><div class="button-row">${button('walk-place', '沿小路过去', id)}${button('explore-place', '直接前往', id)}</div></section>`; }).join('')}</div><p class="microcopy">${TOPICS.length} 个科普体验均可从地图和底部入口前往。地图显示的是本游戏空间，不是现实地点。</p>`;
}