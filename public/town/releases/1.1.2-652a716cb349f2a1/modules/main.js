import { Game } from './game/game.js';
import { topics } from './content/topics.js';
import { TOPICS } from './experiments/models.js';
import { escape } from './ui/interface.js';
import { detectLocale, topicLocale, translate } from './ui/locale.js';
import { decode, SAVE_KEY } from './persistence/storage.js';
/** Each mount owns its own runtime, RAF and recovery data. No cross-route singleton. */
export function mountTown(root) {
    const storedLanguage = (() => { try {
        return decode(localStorage.getItem(SAVE_KEY)).data.settings.language;
    }
    catch {
        return 'auto';
    } })();
    const locale = () => detectLocale(storedLanguage);
    let alive = true, game = null, pendingFrame = 0, recovery = null;
    function downloadRecovery() {
        if (!recovery)
            return;
        const url = URL.createObjectURL(new Blob([recovery], { type: 'application/json;charset=utf-8' })), a = document.createElement('a');
        a.href = url;
        a.download = 'actually-not-recovery-v7.json';
        document.body.append(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
    function fallback(backup) {
        if (!alive)
            return;
        if (backup)
            recovery = backup;
        delete root.dataset.ready;
        root.innerHTML = `<main class="fallback"><p class="wordmark">Actually, <i>Not!</i></p><h1>${escape(translate('这个浏览器暂时无法启动 3D 小镇', locale()))}</h1><p>${escape(translate('可能是 WebGL2 不可用、图形上下文中断或资源加载失败。可以重新尝试，或先阅读下面的科普入口。不会主动清除已保存的记录。', locale()))}</p>${recovery ? `<p class="storage-state">${escape(translate('本次会话的记录已保留在内存中。重新启动将尝试恢复；也可先导出文件。', locale()))}</p>` : ''}<div class="button-row"><button id="retry">${escape(translate('重新尝试启动', locale()))}</button>${recovery ? `<button id="recovery-export">${escape(translate('导出本次记录', locale()))}</button>` : ''}</div><p class="microcopy">${escape(translate('以下是可访问的文字科普入口，不假装成可玩的 3D 场景。完整的模型限制和来源同时保留。', locale()))}</p>${TOPICS.map(id => { const t = topicLocale(topics[id], locale()); return `<details><summary>${escape(t.title)}</summary><p>${escape(t.simpleExplanation)}</p><p>${escape(t.deepExplanation)}</p><p>${escape(t.simulationNotes)}</p>${t.sources.map(s => `<p><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.name)} · ${escape(s.title)}</a></p>`).join('')}</details>`; }).join('')}</main>`;
        root.querySelector('#retry')?.addEventListener('click', start, { once: true });
        root.querySelector('#recovery-export')?.addEventListener('click', downloadRecovery);
    }
    function start() {
        game?.dispose();
        game = null;
        cancelAnimationFrame(pendingFrame);
        delete root.dataset.ready;
        root.innerHTML = `<div class="boot" role="status"><span>${escape(translate('正在准备小镇…', locale()))}</span><progress max="3" value="1"></progress><small>1 / 3 · 创建图形场景与本机记录</small></div>`;
        pendingFrame = requestAnimationFrame(() => {
            if (!alive)
                return;
            try {
                game = new Game(root, fallback);
                if (recovery) {
                    try {
                        game.recoverSession(recovery);
                        recovery = null;
                    }
                    catch {
                        game.ui.toast('小镇已重新打开；恢复记录仍保留，请导出后在设置中导入。');
                    }
                }
                root.dataset.ready = 'true';
            }
            catch (error) {
                console.warn('3D startup unavailable:', error);
                fallback();
            }
        });
    }
    start();
    return () => { alive = false; cancelAnimationFrame(pendingFrame); game?.dispose(); root.innerHTML = ''; };
}
const root = document.getElementById('app');
if (root)
    mountTown(root);