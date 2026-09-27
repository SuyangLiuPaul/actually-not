import { REGIONS, regionPostcard } from '../travel/atlas.js';
import { LiveLocale, detectLocale, topicLocale, regionLocale, translate } from './locale.js';
import { playControls, playPreview } from './playyard.js';
import { isPlay } from '../experiments/playyard.js';
import { honeyControls, honeyPreview } from './honey.js';
import { scienceControls, scienceBadge, scienceLegend, sciencePreview } from './science.js';
import { isPhysics } from '../experiments/physics.js';
import { scenarios as SCENARIOS } from '../content/scenarios.js';
import { parseBackup, MAX_IMPORT_BYTES } from '../persistence/storage.js';
import { parsePassportBackup } from '../travel/passport.js';
import { explorationPanel, mapPanel, noteText } from './exploration.js';
import { places } from '../content/places.js';
import { topics } from '../content/topics.js';
import { TOPICS, ZONES, LOCATIONS, describe, compare, uv, hands } from '../experiments/models.js';
export const escape = (value) => String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const btn = (action, label, value = '', active = false, extra = '') => `<button type="button" data-action="${action}" data-value="${escape(value)}" ${active ? 'aria-pressed="true" class="selected"' : ''} ${extra}>${label}</button>`;
const segments = (title, body) => `<div class="control-group"><span class="field-label">${title}</span><div class="segments">${body}</div></div>`;
const parameters = (o, locale) => Object.entries(describe(o.topic, o.params)).map(([k, v]) => `<div><dt>${escape(translate(k, locale))}</dt><dd>${escape(translate(v, locale))}</dd></div>`).join('');
const date = (s, locale = 'zh-Hans') => new Date(s).toLocaleString(locale === 'en' ? 'en-AU' : locale === 'zh-Hant' ? 'zh-TW' : 'zh-CN', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
});
export class Interface {
    root;
    host;
    panel;
    labels;
    stage;
    canvas;
    hint;
    toastEl;
    dialog;
    focusBefore = null;
    toastTimer = 0;
    showExplanation = false;
    guideKey = '';
    playerMarker;
    comparisonIds = ['', ''];
    dialogKind = '';
    previousCoverage = '';
    pendingImport = null;
    localizer;
    locale() { return detectLocale(this.host.data.settings.language); }
    applyLanguage() { this.localizer.apply(); }
    constructor(root, host) {
        this.root = root;
        this.host = host;
        root.innerHTML = `<main class="town-shell" aria-label="生活探索小镇">
      <div class="stage"><canvas tabindex="0" aria-label="3D 小镇。方向键或 WASD 移动；Tab 可访问全部实验操作；E 进入附近体验。"></canvas><div class="world-labels"></div><div class="player-marker" aria-label="角色定位" hidden><span>你在这里</span><i></i></div><div class="principle-badge" role="note" hidden></div></div>
      <header class="top-bar"><div class="brand"><span class="wordmark">Actually, <i>Not!</i></span><span class="brand-sub">其实不是 · 生活探索小镇</span></div><nav aria-label="小镇工具">${btn('earth', '地球旅行', '', false, 'class="earth-entry"')}${btn('depth', '轻松看懂', '', false, 'title="切换解释深度"').replace("class=\"selected\"", '')}${btn('journal', '发现簿')}${btn('settings', '设置')}</nav></header>
      <div class="region-badge"><span class="small-dot"></span><span data-region>欢迎来到小镇</span></div>
      <aside class="hint-card" aria-label="当前提示"><span class="eyebrow">戴帽子的是你</span><p>点路移动，或直接试试花园。</p></aside>
      <div class="view-controls" aria-label="镜头控制">${btn('camera-tools', '镜头', '', false, 'aria-expanded="false"')}${btn('zoom-in', '放大')}${btn('zoom-out', '缩小')}${btn('rotate-left', '左转')}${btn('rotate-right', '右转')}${btn('home-view', '全景')}${btn('vista', '漫游视角', '', false, 'title="在庭院、溪岸与小剧场之间切换镜头；不移动角色"')}${btn('inspect', '细看装置', '', false, 'title="I：暂时收起工具，细看装置。Esc 返回" aria-pressed="false"')}${btn('locate-player', '找回角色', '', false, 'title="F：将镜头移回角色"')}</div>
      <aside class="inspect-caption" aria-label="细看模式"><span class="eyebrow">把好奇，放大一点</span><strong>细看装置</strong><p>实验已暂停 · 拖动镜头查看细节<br>按 I 或 Esc 返回操作；原理示意，不是实测</p></aside>
      <nav class="travel-bar" aria-label="直接前往体验点">${btn('return-town', '回原小镇', '', false, 'hidden')}${btn('postcard', '旅行明信片', '', false, 'hidden class="postcard-entry"')}${btn('map', '小镇地图', '', false, 'class="map-entry"')}${TOPICS.map((t, i) => `<button data-travel="${t}" type="button" class="${i < 2 ? 'dock-featured' : 'dock-extra'}${i === 1 ? ' dock-secondary' : ''}${i === 2 || i === 3 ? ' dock-desktop' : ''}">${topics[t].place}</button>`).join('')}</nav>
      <aside class="destination-arrival" role="status" hidden></aside>
      <aside class="postcard-mode" aria-label="旅行明信片" hidden><span class="postcard-kicker">ACTUALLY, NOT! · POSTCARD</span><strong data-postcard-title></strong><p data-postcard-caption></p><div class="postcard-actions">${btn('postcard-save', '保存到旅行护照', '', false, 'class="primary"')}${btn('postcard-exit', '返回探索')}</div><small>只保存风景到访，不表示完成或掌握任何科学内容。</small></aside>
      <section class="experiment-panel" aria-label="观察工具" hidden></section>
      <div class="world-footer"><span>点击移动 · WASD / 方向键</span><span>无需账号 · 记录只存本机</span></div>
      <div class="toast" role="status" aria-live="polite" hidden></div>
      <dialog class="sheet-dialog" aria-labelledby="dialog-heading"><div class="dialog-content"></div></dialog>
    </main>`;
        this.playerMarker = root.querySelector('.player-marker');
        this.stage = root.querySelector('.stage');
        this.canvas = root.querySelector('canvas');
        this.labels = root.querySelector('.world-labels');
        this.panel = root.querySelector('.experiment-panel');
        this.hint = root.querySelector('.hint-card');
        this.toastEl = root.querySelector('.toast');
        this.dialog = root.querySelector('dialog');
        root.addEventListener('click', this.click);
        root.addEventListener('change', this.change);
        this.dialog.addEventListener('cancel', e => { e.preventDefault(); this.closeDialog(); });
        this.localizer = new LiveLocale(root, () => this.locale());
        this.updateHeader();
    }
    click = (event) => {
        const el = event.target.closest('[data-action],[data-travel]');
        if (!el || el.hasAttribute('disabled'))
            return;
        if (el.dataset.travel) {
            this.host.travel(el.dataset.travel, true);
            return;
        }
        const a = el.dataset.action, v = el.dataset.value ?? '';
        if (a === 'export-save')
            this.download('actually-not-save-v7.json', this.host.exportSave());
        else if (a === 'export-diagnostics')
            this.download('actually-not-diagnostics.json', this.host.diagnostics());
        else if (a === 'import-confirm') {
            if (this.pendingImport)
                try {
                    this.host.importSave(this.pendingImport);
                    this.pendingImport = null;
                    this.settings();
                    this.toast('导入完成；文件中的记录已恢复。');
                }
                catch (error) {
                    this.toast(String(error.message));
                }
        }
        else if (a === 'restore-backup-request')
            this.open('恢复自动备份', `<p>这会用上一份有效备份替换当前本机记录。建议先导出当前记录。</p><div class="button-row">${btn('export-save', '先导出当前记录')}${btn('restore-backup', '确认恢复')}${btn('settings', '取消')}</div>`);
        else if (a === 'walk-science')
            this.host.travel(v, false);
        else if (a === 'scenario-library')
            this.scenarioLibrary();
        else if (a === 'apply-scenario') {
            this.closeDialog();
            this.host.act(a, v);
        }
        else if (a === 'map')
            this.open('小镇地图', mapPanel(this.host.player, this.locale()), 'map');
        else if (a === 'walk-place' || a === 'explore-place')
            this.host.explore(v, a === 'explore-place');
        else if (a === 'journal')
            this.journal();
        else if (a === 'settings')
            this.settings();
        else if (a === 'dialog-close')
            this.closeDialog();
        else if (a === 'clear-confirm') {
            this.host.clearProgress();
            this.settings();
            this.toast('本机探索记录已清除。');
        }
        else if (a === 'clear-request') {
            this.open('清除本地进度', `<p>这只会清除本机的观察、对照和设置，不影响任何网站账号。清除后无法恢复。</p><div class="button-row">${btn('clear-confirm', '确认清除', '', false, 'class="danger"')}${btn('settings', '取消')}</div>`);
        }
        else if (a === 'camera-tools') {
            const expanded = this.root.classList.toggle('camera-open');
            el.setAttribute('aria-expanded', String(expanded));
        }
        else if (a === 'depth') {
            this.host.updateSettings({ depth: this.host.data.settings.depth === 'easy' ? 'deep' : 'easy' });
            this.updateHeader();
            this.renderExperiment();
        }
        else if (a === 'compare')
            this.comparison();
        else if (a === 'explain') {
            this.showExplanation = !this.showExplanation;
            this.renderExperiment();
        }
        else if (a === 'save') {
            this.host.saveObservation();
            this.updateHeader();
            this.renderExperiment();
        }
        else if (a === 'source-topic') {
            this.sources(v);
        }
        else if (a === 'replay-record') {
            const o = this.host.data.observations.find(o => o.id === v);
            if (o) {
                this.closeDialog();
                if (this.host.session?.topic !== o.topic)
                    this.host.travel(o.topic, true);
                this.host.session?.replay(o.params);
                this.host.act('refresh');
            }
        }
        else
            this.host.act(a, v);
    };
    change = (event) => {
        const el = event.target;
        if (el.dataset.playControl) {
            this.host.act(el.dataset.playControl, el.value);
            return;
        }
        if (el.name === 'import-file') {
            const file = el.files?.[0];
            if (file)
                void this.prepareImport(file);
            return;
        }
        if (el.dataset.setting) {
            const key = el.dataset.setting;
            this.host.updateSettings({ [key]: el.type === 'checkbox' ? el.checked : el.type === 'range' ? Number(el.value) : el.value });
            this.updateHeader();
            this.renderExperiment();
        }
        if (el.name === 'comparison-a' || el.name === 'comparison-b') {
            this.comparisonIds[el.name === 'comparison-a' ? 0 : 1] = el.value;
            this.comparison(false);
        }
        if (el.name === 'guess' && this.host.session)
            this.host.session.guess = el.value;
    };
    showPostcard(id, saved) { const p = regionPostcard(id), locale = this.locale(), r = regionLocale(id, REGIONS[id], locale), e = this.root.querySelector('.postcard-mode'); const title = locale === 'en' ? `${r.country} · ${r.name}` : translate(p.title, locale), caption = locale === 'en' ? `A quiet moment from ${r.name}. This is a travel memory; science observations are saved separately.` : translate(p.caption, locale); this.root.classList.add('in-postcard'); e.hidden = false; e.querySelector('[data-postcard-title]').textContent = title; e.querySelector('[data-postcard-caption]').textContent = caption; this.updatePostcardSaved(saved); e.querySelector('[data-action=postcard-save]')?.focus({ preventScroll: true }); this.root.querySelector('[data-region]').textContent = r.country + ' · ' + r.name; }
    hidePostcard() { this.root.classList.remove('in-postcard'); this.root.querySelector('.postcard-mode').hidden = true; this.updateRegionUI(); }
    updatePostcardSaved(saved) { const b = this.root.querySelector('.postcard-mode [data-action=postcard-save]'); if (!b)
        return; b.textContent = saved ? '已保存到旅行护照' : '保存到旅行护照'; b.setAttribute('aria-pressed', String(saved)); }
    showDestinationArrival(id) { const locale = this.locale(), r = regionLocale(id, REGIONS[id], locale), p = regionPostcard(id), e = this.root.querySelector('.destination-arrival'), title = locale === 'en' ? `Welcome to ${r.name}` : translate(p.title, locale); e.innerHTML = `<span>${escape(r.country)} · ${escape(r.name)}</span><strong>${escape(title)}</strong><small>${REGIONS[id].topics.length} 个可操作科普入口 · 先散步，也可以拍一张旅行明信片</small>`; e.hidden = false; window.setTimeout(() => { if (!this.host.session && !this.host.environment.current)
        e.hidden = true; }, this.host.data.settings.reducedMotion ? 2500 : 6500); }
    updateRegionUI() { const state = this.host.postcardState(), r = state.region ? regionLocale(state.region, REGIONS[state.region], this.locale()) : null; const b = this.root.querySelector('.travel-bar [data-action=postcard]'); if (b)
        b.hidden = !r; const arrival = this.root.querySelector('.destination-arrival'); if (r)
        this.root.querySelector('[data-region]').textContent = r.country + ' · ' + r.name;
    else if (arrival)
        arrival.hidden = true; }
    updateHeader() { const depth = this.host.data.settings.depth === 'easy' ? '轻松看懂' : '深入探索'; this.root.querySelector('[data-action="depth"]').textContent = depth; for (const e of this.root.querySelectorAll('[data-travel]')) {
        const id = e.dataset.travel;
        if (id && TOPICS.includes(id))
            e.textContent = e.classList.contains('dock-featured') ? translate(id === TOPICS[0] ? '观察花园' : '厨房庭院', this.locale()) : topicLocale(topics[id], this.locale()).place;
    } this.root.classList.toggle('guide-off', this.host.data.settings.guideDismissed); this.root.classList.toggle('reduce-motion', this.host.data.settings.reducedMotion); this.updateRegionUI(); this.localizer.apply(); }
    enterExploration() { this.closeCameraMenu(); this.root.querySelector('.destination-arrival').hidden = true; this.root.classList.add('in-experiment', 'in-exploration'); this.panel.classList.remove('awaiting-observation'); this.panel.hidden = false; this.renderExploration(); this.panel.querySelector('[data-action="env-exit"]')?.focus({ preventScroll: true }); }
    renderExploration() { if (!this.host.environment.current)
        return; const focused = document.activeElement; const a = focused?.dataset.action, v = focused?.dataset.value; this.panel.innerHTML = explorationPanel(this.host.environment); this.root.querySelector('[data-region]').textContent = translate(places[this.host.environment.current].title, this.locale()); if (a)
        Array.from(this.panel.querySelectorAll('[data-action]')).find(e => e.dataset.action === a && e.dataset.value === v)?.focus({ preventScroll: true }); }
    enter() { this.closeCameraMenu(); this.root.querySelector('.destination-arrival').hidden = true; this.showExplanation = false; this.root.classList.add('in-experiment'); this.panel.hidden = false; this.labels.innerHTML = ''; this.renderExperiment(); this.panel.querySelector('[data-action="exit"]')?.focus({ preventScroll: true }); }
    closeCameraMenu() { this.root.classList.remove('camera-open'); this.root.querySelector('[data-action="camera-tools"]')?.setAttribute('aria-expanded', 'false'); }
    exit() { this.root.querySelector('.principle-badge').hidden = true; this.root.classList.remove('in-experiment', 'in-exploration'); this.panel.classList.remove('awaiting-observation'); this.panel.hidden = true; this.panel.innerHTML = ''; this.labels.innerHTML = ''; this.root.querySelector('[data-region]').textContent = '自由探索'; this.canvas.focus({ preventScroll: true }); }
    renderExperiment() {
        const s = this.host.session;
        if (!s) {
            this.renderExploration();
            return;
        }
        const t = topicLocale(topics[s.topic], this.locale()), records = this.host.data.observations.filter(o => o.topic === s.topic), observed = s.phase === 'observed', deep = this.host.data.settings.depth === 'deep';
        const badge = this.root.querySelector('.principle-badge');
        badge.hidden = !s.layer;
        badge.textContent = isPlay(s.topic) ? '原理示意 · 参数计算不是现实测量' : s.topic === 'honey' ? '原理示意 · 不是显微测量或真假检测' : isPhysics(s.topic) ? scienceBadge(s) : s.topic === 'uv' ? '原理示意 · 虚线不是肉眼可见的光' : s.topic === 'food' ? '原理示意 · 圆点不是实测菌落' : '原理示意 · 覆盖不是除菌率';
        const active = document.activeElement, focusControl = active?.dataset.playControl, focusAction = active?.dataset.action, focusValue = active?.dataset.value;
        let controls = '';
        if (isPlay(s.topic))
            controls = playControls(s, deep);
        else if (s.topic === 'honey')
            controls = honeyControls(s, deep);
        else if (isPhysics(s.topic))
            controls = scienceControls(s, deep);
        else if (s.topic === 'uv') {
            const p = s.uv;
            controls = segments('天气情境', btn('weather', '晴天', 'sunny', p.weather === 'sunny') + btn('weather', '多云', 'cloudy', p.weather === 'cloudy')) +
                `<p class="microcopy">拖动场景中的探头或遮阳棚；也可用下面的定位按钮。</p>` +
                segments('移动观察探头', LOCATIONS.map((label, i) => btn('probe', translate(label, this.locale()), String(i), p.probe === i)).join('')) +
                segments('移动遮阳棚', btn('shade', '停靠位', '-1', p.shade === -1) + LOCATIONS.map((label, i) => btn('shade', translate(label, this.locale()), String(i), p.shade === i)).join('')) +
                `<div class="readout" data-live-reading>${escape(uv.evaluate(p).visible)}<br><span>UV：不显示未经校准的指数</span></div>` +
                `<div class="button-row">${btn('observe', '观察这个情境', '', false, `class="primary" ${s.phase === 'running' ? 'disabled' : ''}`)}</div>`;
            if (deep && s.layer)
                controls += segments('分开看两类路径', btn('path-layer', '全部', 'all', s.deepLayer === 'all') + btn('path-layer', '上方路径', 'direct', s.deepLayer === 'direct') + btn('path-layer', '周围天空', 'sky', s.deepLayer === 'sky'));
        }
        else if (s.topic === 'food') {
            controls = segments('选择食物', btn('food', '西瓜', 'watermelon', s.food.food === 'watermelon') + btn('food', '面包', 'bread', s.food.food === 'bread')) +
                segments('接触表面', btn('surface', '瓷砖预设', 'tile', s.food.surface === 'tile') + btn('surface', '地毯预设', 'carpet', s.food.surface === 'carpet')) +
                `<p class="microcopy">两种表面都预设存在污染。不是家居材质的安全排名。</p>` +
                segments('拾起时机', btn('pick-time', '0.5 秒', '0.5', s.autoPick === .5) + btn('pick-time', '5 秒', '5', s.autoPick === 5) + btn('pick-time', '30 秒', '30', s.autoPick === 30) + btn('pick-time', '亲手拾起', 'manual', s.autoPick === null)) +
                `<div class="timer"><span>接触时间</span><output data-timer>0.0</output><small>秒 · 情境时钟</small></div>` +
                `<div class="button-row">${btn('drop', '放开食物', '', false, `class="primary" ${['running', 'contact', 'finishing'].includes(s.phase) ? 'disabled' : ''}`)}${btn('pickup', '现在拾起', '', false, s.phase === 'contact' ? '' : 'disabled')}</div>` +
                `<p class="microcopy">也可以点场景中的食物：第一次放下，接触后再次点它拾起。</p>` +
                segments('播放速度', btn('speed', '正常', '1', s.speed === 1) + btn('speed', '5 倍速', '5', s.speed === 5));
            if (deep)
                controls += btn('flip', s.flip ? '返回上表面' : '翻看食物接触面', '', s.flip);
        }
        else {
            controls = segments('手部情境', btn('scenario', '普通接触', 'ordinary', s.hands.scenario === 'ordinary') + btn('scenario', '明显油污', 'greasy', s.hands.scenario === 'greasy')) +
                segments('选择方式', btn('method', '清水', 'water', s.hands.method === 'water') + btn('method', '肥皂＋流水', 'soap', s.hands.method === 'soap') + btn('method', '免洗洗手液', 'sanitiser', s.hands.method === 'sanitiser')) +
                `<p class="microcopy">${s.hands.method === 'sanitiser' ? '预设为含至少 60% 酒精的合规产品；按产品说明使用。' : ''}在手部模型上按住并拖动搓擦；键盘/触屏也可点分区，每点一次推进一小段。</p>` +
                `<div class="zone-grid" aria-label="分区搓擦">${ZONES.map((z, i) => btn('rub', `${translate(z, this.locale())}<span data-zone="${i}">${Math.round(s.hands.coverage[i] * 3)} / 3</span>`, String(i), false, `aria-label="${translate('搓擦' + z, this.locale())}"`)).join('')}</div>` +
                `<div class="coverage-caption" data-coverage></div><div class="button-row">${btn('finish', s.hands.method === 'sanitiser' ? '搓至干燥并观察' : '冲洗并观察', '', false, `class="primary" ${!s.hands.coverage.some(x => x > 0) || s.phase === 'finishing' ? 'disabled' : ''}`)}${btn('flip', s.flip ? '看掌面' : '翻看手背', '', s.flip)}</div>` +
                `<p class="microcopy">分区数字是操作记录，不是除菌率。游戏压缩了过程；现实用肥皂搓洗至少 20 秒，再冲净并擦干。</p>`;
        }
        this.panel.innerHTML = `<div class="panel-top"><span class="eyebrow">跟着好奇，亲手观察</span>${btn('exit', this.host.region ? '回到本地场景' : '回到小镇')}</div>
      <h1>${escape(t.title)}</h1><p class="claim">生活里的说法：“${escape(t.commonClaim)}”</p>
      <aside class="inline-guide" aria-label="动态操作提示" hidden></aside><details class="guess"><summary>先留一个猜想（可跳过）</summary><label>我觉得可能会……<input name="guess" maxlength="120" autocomplete="off" value="${escape(s.guess)}" placeholder="不评分，也不影响探索"></label></details>
      <div class="step-line"><span class="step ${observed ? '' : 'current'}">操作与观察</span><span class="step ${records.length ? 'current' : ''}">保存</span><span class="step ${records.length > 1 ? 'current' : ''}">改变一项 · 对照</span></div>
      <div class="controls-body">${controls}<div class="scenario-tools">${btn('scenario-library', '换一个生活情境')}<span>可选起点 · 不解锁、不评分</span></div>
      <div class="observation-tool">${btn('layer', s.layer ? '关闭原理观察层' : '打开原理观察层', '', s.layer)}<span>情境模拟 · 非实测</span></div>
      ${s.layer ? `<div class="legend">${isPlay(s.topic) ? (s.topic === 'buoyancy' ? '<span>↑ 浮力方向 · ↓ 重力方向</span><small>箭头长度不表示力的大小。这里只画两种力的方向；停在槽底时还有未画出的槽底支持力。</small>' : s.topic === 'pulley' ? '<span>↑ 承重绳段的拉力方向</span><small>绳与载荷按固定比例运动。箭头只示方向；速度、配色和装饰不是测量值。</small>' : '<span>边界射线 · 点光源几何模型</span><small>示意线不是现实可见光；不计算照度、半影或衍射。</small>') : s.topic === 'honey' ? '<span>方块：有序晶体；小点：溶液中的示意单位</span><small>原理示意，不是真实分子结构、浓度或真假检测。</small>' : isPhysics(s.topic) ? scienceLegend(s) : s.topic === 'uv' ? '<span class="legend-line gold">上方到达路径</span><span class="legend-line blue">周围天空路径</span><small>示意线不是可见光，数量不代表 UV 强度。遮阳棚剖视是为了观察，不代表材质透明。</small>' : s.topic === 'food' ? '<span class="legend-dot">示意点：接触转移</span><small>点数不是菌落测量，也不表示感染概率。</small>' : '<span class="legend-dot">示意点：肉眼不可见因素</span><small>环形标记：本次操作覆盖；不是完全清洁保证。</small>'}</div>` : ''}
      <p class="live-state" data-state role="status"></p>
      ${observed ? `<div class="observation-result"><span class="eyebrow">这次看到了什么</span><p>${escape(translate(s.result(), this.locale()))}</p>${btn('explain', this.showExplanation ? '收起解释' : '为什么会这样？')}</div>` : ''}
      ${observed && this.showExplanation ? `<section class="short-explanation"><p>${escape(t.simpleExplanation)}</p><p class="microcopy">动画表达的是预设模型，不是你刚刚完成的一项科学证明。</p>${btn('source-topic', deep ? '机制、边界与证据' : '进一步了解', s.topic)}</section>` : ''}
      ${records.length ? `<section class="comparison-assistant"><span class="eyebrow">以最近观察为参考</span><p>${escape(translate(this.liveDifference(), this.locale()))}</p>${btn('restore-conditions', '取回参考条件 · 再改一项', records.at(-1).id)}</section>` : ''}
      ${records.length === 1 ? '<p class="next-cue">已有观察 A。只改一个条件，再保存为 B，比较更清楚。</p>' : ''}
      </div><div class="panel-actions"><div class="button-row">${btn('save', '保存这次观察', '', false, `class="primary" ${observed ? '' : 'disabled'}`)}${btn('compare', `对照 (${records.length})`, '', false, records.length > 1 ? '' : 'disabled')}</div><div class="sub-actions">${btn('pause', s.paused ? '继续' : '暂停', '', s.paused, s.phase === 'ready' || observed ? 'disabled' : '')}${btn('replay', '重播')}${btn('reset', '重置')}</div></div>`;
        this.panel.classList.toggle('awaiting-observation', !observed);
        this.root.querySelector('[data-region]').textContent = (this.host.region ? (regionLocale(this.host.region, REGIONS[this.host.region], this.locale()).country + ' · ') : '') + t.place;
        this.previousCoverage = '';
        if (focusControl)
            this.panel.querySelector(`[data-play-control="${focusControl}"]`)?.focus({ preventScroll: true });
        this.tick();
        if (focusAction) {
            const replacement = Array.from(this.panel.querySelectorAll('[data-action]')).find(e => e.dataset.action === focusAction && e.dataset.value === focusValue);
            replacement?.focus({ preventScroll: true });
        }
    }
    tick() {
        const s = this.host.session;
        if (!s)
            return;
        const state = this.panel.querySelector('[data-state]');
        if (state) {
            const text = s.paused ? '已暂停，可以继续、重播或重置。' : s.phase === 'observed' ? '观察已就绪。保存后改变一个条件，开始对照。' : s.topic === 'honey' ? (s.phase === 'ready' ? '移动蜜罐或改变起始条件，再观察状态变化。' : '正在演示状态变化；动画时钟不是实际结晶时间。') : (isPhysics(s.topic) || isPlay(s.topic)) ? (s.phase === 'ready' ? '可以拖动装置，或用按钮改变条件，再开始观察。' : '装置正在演示模型；可以随时暂停。') : s.topic === 'uv' ? (s.phase === 'ready' ? '移动探头、切换天气，再开始观察。' : '正在观察同一探头位置的到达路径…') : s.topic === 'food' ? (s.phase === 'ready' ? '准备好后放开食物。' : s.phase === 'contact' ? '正在接触；可以现在拾起。' : s.phase === 'finishing' ? '食物正在离开接触面…' : '正在落下…') : (s.phase === 'finishing' ? '过程示意中；现实操作请按产品说明与指南。' : '试着搓擦各个部位，再观察。');
            if (state.textContent !== text)
                state.textContent = text;
        }
        const timer = this.panel.querySelector('[data-timer]');
        if (timer)
            timer.textContent = s.food.seconds.toFixed(1);
        const pickup = this.panel.querySelector('[data-action="pickup"]');
        if (pickup)
            pickup.disabled = s.phase !== 'contact';
        if (s.topic === 'hands') {
            const c = s.hands.coverage.map(n => Math.round(n * 3)).join();
            if (c !== this.previousCoverage) {
                this.previousCoverage = c;
                for (let i = 0; i < 6; i++) {
                    const el = this.panel.querySelector(`[data-zone="${i}"]`);
                    if (el) {
                        el.textContent = `${Math.round(s.hands.coverage[i] * 3)} / 3`;
                        el.parentElement?.classList.toggle('covered', s.hands.coverage[i] >= .95);
                    }
                }
                const d = hands.evaluate(s.hands);
                const caption = this.panel.querySelector('[data-coverage]');
                if (caption)
                    caption.textContent = `已触及 ${d.reached} / 6 个部位 · 操作充分 ${d.thorough} / 6`;
                const finish = this.panel.querySelector('[data-action="finish"]');
                if (finish)
                    finish.disabled = !s.hands.coverage.some(n => n > 0) || s.phase === 'finishing';
            }
        }
    }
    toast(message) { clearTimeout(this.toastTimer); this.toastEl.textContent = message; this.toastEl.hidden = false; this.toastTimer = window.setTimeout(() => { this.toastEl.hidden = true; }, 6500); }
    showControls() {
        const first = this.panel.querySelector('.controls-body .control-group button, .controls-body [data-play-control]');
        first?.scrollIntoView({ block: 'center', behavior: 'auto' });
        first?.focus({ preventScroll: true });
    }
    renderGuide(g) {
        const target = this.host.session ? this.panel.querySelector('.inline-guide') : this.hint;
        if (!target)
            return;
        const hidden = !g || Boolean(this.host.environment.current) || this.host.data.settings.guideDismissed;
        target.hidden = hidden;
        if (hidden)
            return;
        const compact = window.matchMedia('(max-width:1100px)').matches;
        const shortPanel = compact || window.innerHeight <= 620;
        const jumpToControls = Boolean(this.host.session && g.stage === 'prepare' && shortPanel);
        const welcome = !this.host.session && g.stage === 'welcome';
        const prepare = shortPanel && Boolean(this.host.session) && g.stage === 'prepare';
        const title = welcome ? '戴帽子的是你' : prepare ? '先试一试' : g.title;
        const body = welcome ? '点路移动，或直接试试花园。' : prepare ? '拖动物件，或点下方按钮改变条件。然后观察。' : g.body;
        const html = `<span class="eyebrow">${escape(title)}</span><p>${escape(body)}</p><div class="guide-actions">${btn(jumpToControls ? 'guide-controls' : g.action, jumpToControls ? '去操作' : g.label)}${btn('guide-dismiss', '收起引导')}</div>${!this.host.session && this.host.data.settings.muted ? btn('audio-enable', '开启轻柔音效') : ''}`;
        const key = g.stage + html;
        if (key !== this.guideKey || target.dataset.guide !== g.stage) {
            target.innerHTML = html;
            target.dataset.guide = g.stage;
            this.guideKey = key;
        }
    }
    setHint(title, body) { this.hint.innerHTML = `<span class="eyebrow">${escape(title)}</span><p>${escape(body)}</p>`; }
    open(title, body, kind = '') {
        const resetScroll = !this.dialog.open || this.dialogKind !== kind;
        if (!this.dialog.open)
            this.focusBefore = document.activeElement;
        this.dialogKind = kind;
        const content = this.dialog.querySelector('.dialog-content');
        const scrollHint = ['settings', 'map', 'scenarios', 'journal', 'sources', 'compare'].includes(kind) ? '<p class="dialog-scroll-hint">向下滑动查看更多</p>' : '';
        content.innerHTML = `<div class="dialog-heading"><h2 id="dialog-heading">${escape(title)}</h2>${btn('dialog-close', '关闭')}</div>${scrollHint}${body}`;
        if (!this.dialog.open)
            this.dialog.showModal();
        // New sheets start with their title and controls visible, not at the previous
        // sheet's scroll offset. Updating a comparison selection keeps its position.
        if (resetScroll) {
            this.dialog.scrollTop = 0;
            content.scrollTop = 0;
            content.querySelector('[data-action="dialog-close"]')?.focus({ preventScroll: true });
        }
        if (scrollHint)
            requestAnimationFrame(() => {
                const hint = content.querySelector('.dialog-scroll-hint');
                if (hint)
                    hint.hidden = this.dialog.scrollHeight <= this.dialog.clientHeight + 3;
            });
    }
    closeDialog() { this.dialog.close(); this.dialogKind = ''; this.focusBefore?.focus({ preventScroll: true }); }
    isDialogOpen() { return this.dialog.open; }
    comparison(reset = true) {
        const s = this.host.session;
        if (!s)
            return;
        const obs = this.host.data.observations.filter(o => o.topic === s.topic);
        if (obs.length < 2) {
            this.toast('先保存两次观察，再查看对照。');
            return;
        }
        if (reset || !obs.find(o => o.id === this.comparisonIds[0]))
            this.comparisonIds = [obs[obs.length - 2].id, obs[obs.length - 1].id];
        const a = obs.find(o => o.id === this.comparisonIds[0]), b = obs.find(o => o.id === this.comparisonIds[1]);
        const c = compare(a, b);
        const options = (selected) => obs.map((o, i) => `<option value="${escape(o.id)}" ${selected === o.id ? 'selected' : ''}>观察 ${i + 1} · ${date(o.recordedAt, this.locale())}</option>`).join('');
        if (a.id !== b.id && !this.host.data.compared.includes(s.topic)) {
            this.host.data.compared.push(s.topic);
            this.host.act('persist');
        }
        this.open('把两次观察放在一起', `<p class="dialog-intro">对照的是两个已保存的模型情境，不是实际测量。记录不会随当前操作改变。</p><div class="compare-columns">${[[a, 'A', 'comparison-a'], [b, 'B', 'comparison-b']].map(([o, label, name]) => { const record = o; return `<article class="comparison-record"><label><b>观察 ${label}</b><select name="${name}">${options(record.id)}</select></label><div class="record-preview">${this.preview(record)}</div><dl>${parameters(record, this.locale())}</dl>${btn('replay-record', `在装置重播 ${label}`, record.id)}</article>`; }).join('')}</div>${a.id === b.id ? '<p class="caution">A 和 B 是同一条记录，请选择两次不同的观察。</p>' : ''}<section class="comparison-diff"><h3>这次改变了什么</h3><p>${c.changed.length ? c.changed.map(escape).join('<br>') : '没有改变参数。可再试一个不同条件。'}</p>${c.changed.length > 1 ? '<p class="caution">这次同时改变了多项条件，不能把差异只归因于其中一项。</p>' : ''}<details open><summary>保持不变</summary><p>${c.unchanged.length ? c.unchanged.map(escape).join('<br>') : '没有可比较的相同条件。'}</p></details></section><section class="explanation"><h3>原来如此</h3><p>${escape(topicLocale(topics[s.topic], this.locale()).simpleExplanation)}</p><p class="microcopy">${escape(topicLocale(topics[s.topic], this.locale()).verdictNote)}</p>${btn('source-topic', '机制、条件、模型限制与资料', s.topic)}</section>`, 'comparison');
    }
    preview(o) {
        if (isPlay(o.topic))
            return playPreview(o);
        if (o.topic === 'honey')
            return honeyPreview(o);
        if (isPhysics(o.topic))
            return sciencePreview(o);
        if (o.topic === 'uv') {
            const p = o.params, r = uv.evaluate(p);
            return `<span class="preview-sun">${p.weather === 'cloudy' ? '多云情境' : '晴天情境'}</span><div class="path-diagram"><span>上方</span><i class="${r.sheltered ? 'sheltered' : ''}"></i><strong>探头</strong><i class="sky-path"></i><span>周围天空</span></div><small>路径示意 · 非 UV 指数</small>`;
        }
        if (o.topic === 'food') {
            const p = o.params;
            return `<div class="food-diagram"><span class="${p.food}"></span><div class="contact-line ${p.surface}"></div></div><strong>${p.seconds.toFixed(1)} 秒接触</strong><small>有污染的表面预设 · 非疾病结果</small>`;
        }
        const p = o.params;
        return `<div class="coverage-diagram">${p.coverage.map((v, i) => `<span class="${v >= .95 ? 'done' : ''}">${translate(ZONES[i], this.locale())}<b>${Math.round(v * 3)} / 3</b></span>`).join('')}</div><small>搓擦操作记录 · 不表示清洁功效百分比</small>`;
    }
    journal() { const obs = this.host.data.observations; this.open('我的发现簿', `<p class="dialog-intro">记下体验过的情境，不给知识掌握打分。所有记录只保存在当前浏览器。</p>${TOPICS.map((id, i) => { const records = obs.filter(o => o.topic === id); return `<section class="journal-topic"><div class="journal-title"><span class="topic-number">${String(i + 1).padStart(2, '0')}</span><div><h3>${escape(topicLocale(topics[id], this.locale()).place)}</h3><p>${records.length} 次观察${this.host.data.compared.includes(id) ? ' · 已查看对照' : ''}</p></div><button data-travel="${id}">前往体验</button></div>${records.length ? `<details><summary>查看观察条件</summary>${records.slice().reverse().map(o => `<article class="journal-record"><time>${date(o.recordedAt, this.locale())}</time><dl>${parameters(o, this.locale())}</dl>${btn('replay-record', '重播这次观察', o.id)}</article>`).join('')}</details>` : '<p class="microcopy">这里还没有记录。去亲手试试看。</p>'}</section>`; }).join('')}<section class="walk-notes"><h3>散步小记</h3><p class="microcopy">这里只记装置状态与去过的角落，不算科普实验，也不代表掌握了知识。</p>${this.host.data.environment.notes.length ? this.host.data.environment.notes.slice().reverse().map(n => `<article><span>${places[n.id].title}</span><strong>${noteText(n)}</strong><time>${date(n.recordedAt, this.locale())}</time></article>`).join('') : '<p>还没有散步记录。温室、溪边水轮和林间平台都可以去看看。</p>'}${btn('map', '打开散步地图')}</section>`, 'journal'); }
    settings() { const s = this.host.data.settings; this.open('设置', `<div class="settings-grid"><label>语言 / Language<select data-setting="language"><option value="auto" ${s.language === 'auto' ? 'selected' : ''}>跟随系统 / Auto</option><option value="en" ${s.language === 'en' ? 'selected' : ''}>English</option><option value="zh-Hant" ${s.language === 'zh-Hant' ? 'selected' : ''}>繁體中文</option><option value="zh-Hans" ${s.language === 'zh-Hans' ? 'selected' : ''}>简体中文</option></select></label><label>解释深度<select data-setting="depth"><option value="easy" ${s.depth === 'easy' ? 'selected' : ''}>轻松看懂</option><option value="deep" ${s.depth === 'deep' ? 'selected' : ''}>深入探索</option></select></label><label>画面质量<select data-setting="quality"><option value="high" ${s.quality === 'high' ? 'selected' : ''}>精细 · 柔和阴影</option><option value="low" ${s.quality === 'low' ? 'selected' : ''}>轻量 · 无实时阴影</option></select></label><label class="check"><input type="checkbox" data-setting="muted" ${s.muted ? 'checked' : ''}>静音</label><label class="check"><input type="checkbox" data-setting="captions" ${s.captions ? 'checked' : ''}>显示音效文字提示</label><label class="check"><input type="checkbox" data-setting="reducedMotion" ${s.reducedMotion ? 'checked' : ''}>减少环境动态与镜头过渡</label></div><h3>声音与引导</h3><label class="volume-control">音量<input type="range" data-setting="volume" min="0" max="1" step="0.05" value="${s.volume}"></label><div class="settings-grid"><label class="check"><input type="checkbox" data-setting="ambience" ${s.ambience ? 'checked' : ''}>环境底声（溪水与微风示意）</label><label class="check"><input type="checkbox" data-setting="playerMarker" ${s.playerMarker ? 'checked' : ''}>显示角色定位标记</label><label class="check"><input type="checkbox" data-setting="guideDismissed" ${s.guideDismissed ? 'checked' : ''}>收起动态引导</label></div><div class="button-row">${btn('audio-preview', '试听当前音量')}${btn('guide-restart', '重新查看引导')}</div><p class="microcopy">声音需操作后启用；离开标签页自动停止。试听无声时，先取消静音。F 或“找回角色”可重新定位，镜头不会重置角色位置。</p><h3>怎样操作</h3><p>点小路移动，点体验点后会先走过去。WASD / 方向键移动，E 进入附近体验；Q / E 可在远离装置时微调镜头，＋ / －缩放。按 Esc 返回，Tab 和 Enter 可访问所有按钮。</p><p>触屏单指点地面移动，拖动空白位置轻移镜头，双指缩放。实验中可拖动探头、遮阳棚，或在手部模型上搓擦；相同操作都有文字按钮。</p><p class="microcopy">音效不携带独有信息；不含旁白。环境动画可以减少，必要的过程动画仍保留。</p><hr><p>存档格式 v7 · 当前 ${this.host.data.observations.length} 次观察。不使用广告、账号、追踪或付费 API。</p><p class="storage-state" role="status">${escape(this.host.storageStatus())}</p><div class="button-row">${btn('export-save', '导出存档文件')}${btn('restore-backup-request', '恢复自动备份')}</div><label class="file-import">导入存档（会先预览再确认）<input type="file" name="import-file" accept=".json,application/json"></label><p class="microcopy">最多 256 KB；导出文件包含科普记录、散步小记与旅行护照。只读取本地 JSON，不上传服务器；自动备份不是云备份。另一页面修改记录时，本页会暂停写入。</p>${this.host.data.draft ? btn('resume-draft', '继续上次装置（从准备状态开始）') : ''}<details><summary>运行诊断（只在本机查看）</summary><pre class="diagnostics">${escape(this.host.diagnostics())}</pre>${btn('export-diagnostics', '导出诊断报告')}</details><hr>${btn('clear-request', '清除本机进度', '', false, 'class="danger"')}`, 'settings'); }
    sources(topic) { const t = topicLocale(topics[topic], this.locale()); this.open('继续深入：' + t.place, `<section class="source-content"><p class="eyebrow">知识、模型与艺术表现，分开说明</p><h3>来自资料的解释</h3><p>${escape(t.deepExplanation)}</p><h3>条件与例外</h3>${t.conditionsAndExceptions.map(s => `<p>${escape(s)}</p>`).join('')}<h3>本游戏模型的限制</h3><p>${escape(t.simulationNotes)}</p><h3>资料与具体支持范围</h3>${t.sources.map(s => `<article class="source-record"><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.name)} · ${escape(s.title)}</a><p>${escape(s.supports)}</p><small>${s.date ? '来源日期：' + escape(s.date) : '来源页面未提供明确发布日期'}${s.dateNote ? ' · ' + escape(s.dateNote) : ''}</small></article>`).join('')}<p class="review-note">资料核对：${t.reviewedAt}。${escape(t.reviewType)}。状态：公开原型，未获机构背书。一般科普，不提供个人医疗判断。</p></section>`, 'sources'); }
    download(filename, content) {
        const url = URL.createObjectURL(new Blob([content], { type: 'application/json;charset=utf-8' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.append(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
    async prepareImport(file) {
        try {
            this.pendingImport = null;
            if (file.size > MAX_IMPORT_BYTES)
                throw Error('文件超过 256 KB，未读取或覆盖存档。');
            const raw = await file.text(), parsed = parseBackup(raw);
            const envelope = JSON.parse(raw);
            const hasTravel = typeof envelope === 'object' && envelope !== null && !Array.isArray(envelope) && Object.prototype.hasOwnProperty.call(envelope, 'travelPassport');
            const passport = hasTravel ? parsePassportBackup(envelope.travelPassport) : null;
            this.pendingImport = raw;
            const travelSummary = passport ? `、${passport.visited.length} 个旅行足迹、${passport.postcards.length} 张明信片` : '';
            this.open('核对这份存档', `<p>文件：${escape(file.name)}</p><p>包含 ${parsed.data.observations.length} 次观察、${parsed.data.environment.notes.length} 条散步小记${travelSummary}。导入后会替换当前记录；不上传任何数据。</p><div class="button-row">${btn('export-save', '先导出当前记录')}${btn('import-confirm', '确认替换并导入')}${btn('settings', '取消')}</div>`, 'import');
        }
        catch (error) {
            this.toast(error.message);
        }
    }
    liveDifference() {
        const s = this.host.session;
        if (!s)
            return '';
        const a = this.host.data.observations.filter(o => o.topic === s.topic).at(-1);
        if (!a)
            return '';
        if (s.topic === 'food' && s.phase === 'ready' && s.autoPick === null)
            return '本次选择亲手拾起；完成后才能比较实际接触时间。';
        const p = structuredClone(s.params());
        if (s.topic === 'food' && s.phase === 'ready' && 'seconds' in p)
            p.seconds = s.autoPick ?? 0;
        const b = { ...a, params: p }, d = compare(a, b);
        return d.changed.length === 0 ? '目前与参考记录条件相同。只改变一项，再观察。' : d.changed.length === 1 ? '只改变了一项：' + d.changed[0] : '已改变 ' + d.changed.length + ' 项：' + d.changed.join('；') + '。不要只归因于其中一项。';
    }
    scenarioLibrary() {
        const s = this.host.session;
        if (!s)
            return;
        this.open('选一个观察起点', `<p class="dialog-intro">选一个起点，先观察，再只改一个条件。已保存的记录会保留；情境只是演示。</p><div class="scenario-list">${SCENARIOS.filter(c => c.topic === s.topic).map(c => `<article><h3>${escape(translate(c.title, this.locale()))}</h3><p>${escape(translate(c.prompt, this.locale()))}</p>${btn('apply-scenario', '摆好这个情境', c.id)}</article>`).join('')}</div>`, 'scenarios');
    }
    refreshOpenDialog() {
        if (this.dialogKind === 'journal')
            this.journal();
    }
    dispose() { this.localizer.dispose(); clearTimeout(this.toastTimer); this.root.removeEventListener('click', this.click); this.root.removeEventListener('change', this.change); this.dialog.close(); }
}