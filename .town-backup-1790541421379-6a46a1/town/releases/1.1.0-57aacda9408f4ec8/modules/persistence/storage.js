import { isPlay, canonicalPlay } from '../experiments/playyard.js';
import { environmentDefaults, decodeEnvironment } from '../experiments/environment.js';
import { TOPICS, clamp } from '../experiments/models.js';
export const SAVE_KEY = 'actually-not-town-v2';
export const BACKUP_KEY = SAVE_KEY + '-backup';
export const RECOVERY_KEY = SAVE_KEY + '-recovery';
export const SAVE_VERSION = 7;
export const MAX_IMPORT_BYTES = 262144;
export const defaults = () => ({ version: 7, environment: environmentDefaults(), settings: { depth: 'easy', muted: true, reducedMotion: false, captions: true, quality: 'high', guideDismissed: false, playerMarker: true, volume: .55, ambience: true, language: 'auto' }, observations: [], compared: [], position: [0, 1.8], draft: null });
const obj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const finite = (v) => typeof v === 'number' && Number.isFinite(v);
const range = (v, min, max) => finite(v) && v >= min && v <= max;
/** Only known fields survive decoding. Never retain imported objects/prototypes verbatim. */
export function canonicalParams(t, p) {
    if (!obj(p))
        return null;
    if (isPlay(t))
        return canonicalPlay(t, p);
    if (t === 'honey')
        return typeof p.profile === 'string' && ['glucose-rich', 'fructose-rich'].includes(p.profile) && typeof p.place === 'string' && ['shelf', 'bath'].includes(p.place) && typeof p.initial === 'string' && ['clear', 'seeded'].includes(p.initial) ? { profile: p.profile, place: p.place, initial: p.initial } : null;
    if (t === 'optics')
        return typeof p.medium === 'string' && ['air', 'water', 'glass'].includes(p.medium) && range(p.angle, 0, 70) ? { medium: p.medium, angle: p.angle } : null;
    if (t === 'balance')
        return ['leftMass', 'rightMass'].every(k => Number.isInteger(p[k]) && range(p[k], 1, 4)) && ['leftDistance', 'rightDistance'].every(k => Number.isInteger(p[k]) && range(p[k], 1, 3)) ? { leftMass: p.leftMass, rightMass: p.rightMass, leftDistance: p.leftDistance, rightDistance: p.rightDistance } : null;
    if (t === 'sound')
        return range(p.length, .3, .9) && [40, 80].includes(p.tension) && [1, 2].includes(p.amplitude) ? { length: p.length, tension: p.tension, amplitude: p.amplitude } : null;
    if (t === 'uv')
        return typeof p.weather === 'string' && ['sunny', 'cloudy'].includes(p.weather) && Number.isInteger(p.probe) && range(p.probe, 0, 2) && Number.isInteger(p.shade) && range(p.shade, -1, 2) ? { weather: p.weather, probe: p.probe, shade: p.shade } : null;
    if (t === 'food')
        return typeof p.food === 'string' && ['watermelon', 'bread'].includes(p.food) && typeof p.surface === 'string' && ['tile', 'carpet'].includes(p.surface) && range(p.seconds, 0, 300) && Number.isSafeInteger(p.seed) ? { food: p.food, surface: p.surface, seconds: p.seconds, seed: p.seed } : null;
    if (t === 'hands')
        return typeof p.scenario === 'string' && ['ordinary', 'greasy'].includes(p.scenario) && typeof p.method === 'string' && ['water', 'soap', 'sanitiser'].includes(p.method) && Array.isArray(p.coverage) && p.coverage.length === 6 && p.coverage.every(v => range(v, 0, 1)) ? { scenario: p.scenario, method: p.method, coverage: [...p.coverage] } : null;
    return null;
}
export function decode(raw) {
    const data = defaults();
    if (!raw)
        return { data, notice: '', readOnly: false, valid: true, dropped: 0 };
    try {
        if (raw.length > MAX_IMPORT_BYTES)
            throw Error('size');
        const v = JSON.parse(raw);
        if (!obj(v))
            throw Error('shape');
        if (typeof v.version === 'number' && v.version > SAVE_VERSION)
            return { data, notice: '存档来自更新版本，已保留原文；本次暂不覆盖。请先导出当前记录或使用原版本打开。', readOnly: true, valid: false, dropped: 0 };
        if (![1, 2, 3, 4, 5, 6, 7].includes(v.version))
            throw Error('version');
        data.environment = decodeEnvironment(v.environment);
        if (obj(v.settings)) {
            for (const k of ['muted', 'reducedMotion', 'captions', 'guideDismissed', 'playerMarker', 'ambience'])
                if (typeof v.settings[k] === 'boolean')
                    data.settings[k] = v.settings[k];
            if (range(v.settings.volume, 0, 1))
                data.settings.volume = v.settings.volume;
            if (v.settings.depth === 'easy' || v.settings.depth === 'deep')
                data.settings.depth = v.settings.depth;
            if (v.settings.quality === 'high' || v.settings.quality === 'low')
                data.settings.quality = v.settings.quality;
            if (['auto', 'en', 'zh-Hans', 'zh-Hant'].includes(String(v.settings.language)))
                data.settings.language = v.settings.language;
        }
        let dropped = Array.isArray(v.observations) ? Math.max(0, v.observations.length - 120) : 0;
        const unique = new Map();
        if (Array.isArray(v.observations))
            for (const r of v.observations.slice(-120)) {
                if (!obj(r) || !TOPICS.includes(r.topic) || r.modelVersion !== 1 || typeof r.id !== 'string' || !r.id.length || r.id.length > 99 || typeof r.recordedAt !== 'string' || !Number.isFinite(Date.parse(r.recordedAt))) {
                    dropped++;
                    continue;
                }
                const params = canonicalParams(r.topic, r.params);
                if (!params) {
                    dropped++;
                    continue;
                }
                unique.set(r.id, { id: r.id, topic: r.topic, params, recordedAt: r.recordedAt, modelVersion: 1 });
            }
        data.observations = [...unique.values()];
        if (Array.isArray(v.compared))
            data.compared = TOPICS.filter(t => v.compared.includes(t));
        if (Array.isArray(v.position) && v.position.length === 2 && v.position.every(finite))
            data.position = [clamp(v.position[0], -21, 21), clamp(v.position[1], -15, 23)];
        if (obj(v.draft) && TOPICS.includes(v.draft.topic)) {
            const p = canonicalParams(v.draft.topic, v.draft.params);
            if (p)
                data.draft = { topic: v.draft.topic, params: p, autoPick: v.draft.autoPick === null ? null : range(v.draft.autoPick, 0, 300) ? v.draft.autoPick : .5, layer: v.draft.layer === true };
        }
        return { data, notice: dropped ? `已恢复可用记录；隔离了 ${dropped} 条无效观察，未将它们当成有效结果。` : Number(v.version) < 7 ? '旧版设置与观察已迁移到格式 v7；原有观察和散步记录保留。' : '已恢复本地探索记录。', readOnly: false, valid: true, dropped };
    }
    catch {
        return { data, notice: '本地存档损坏或过大，已用安全默认值进入；原文保留供恢复，不会导致白屏。', readOnly: false, valid: false, dropped: 0 };
    }
}
export function parseBackup(raw) {
    const d = decode(raw);
    if (d.valid && raw.trim()) {
        const v = JSON.parse(raw);
        for (const k of ['observations', 'compared'])
            if (v[k] !== undefined && !Array.isArray(v[k]))
                throw Error('存档字段格式无效，未覆盖本机记录。');
        for (const k of ['settings', 'environment'])
            if (v[k] !== undefined && !obj(v[k]))
                throw Error('存档字段格式无效，未覆盖本机记录。');
        if (v.position !== undefined && (!Array.isArray(v.position) || v.position.length !== 2 || !v.position.every(finite)))
            throw Error('存档位置格式无效，未覆盖本机记录。');
        if (obj(v.environment) && v.environment.notes !== undefined && (!Array.isArray(v.environment.notes) || v.environment.notes.length !== d.data.environment.notes.length))
            throw Error('散步记录不完整，未覆盖本机记录。');
        if (v.draft !== undefined && v.draft !== null && !d.data.draft)
            throw Error('装置草稿格式无效，未覆盖本机记录。');
    }
    if (!raw.trim() || !d.valid || d.readOnly || d.dropped)
        throw Error(d.dropped ? '导入文件包含无效观察，未覆盖本机记录。' : '不是兼容且完整的游戏存档，未覆盖本机记录。');
    return d;
}
export class Storage {
    data;
    notice = '';
    readOnly = false;
    conflict = false;
    backend;
    lastRaw = null;
    corruptRaw = null;
    constructor(backend) {
        this.backend = backend;
        this.data = defaults();
        try {
            this.lastRaw = backend?.getItem(SAVE_KEY) ?? null;
            let d = decode(this.lastRaw);
            if (!d.valid && !d.readOnly) {
                this.corruptRaw = this.lastRaw;
                const raw = backend?.getItem(BACKUP_KEY) ?? null, backup = decode(raw);
                if (raw && backup.valid && !backup.readOnly) {
                    d = backup;
                    d.notice = '主存档损坏，已从上一份有效备份恢复；损坏原文保留供恢复。';
                }
            }
            this.data = d.data;
            this.notice = d.notice;
            this.readOnly = d.readOnly;
            if (!backend)
                this.notice = '本地存储不可用；可继续玩，请在设置中导出文件以保留记录。';
        }
        catch {
            this.notice = '浏览器限制了本地存储；本次仍可探索并导出记录。';
            this.backend = null;
        }
    }
    checkExternal() {
        if (!this.backend || this.conflict)
            return this.conflict;
        try {
            if (this.backend.getItem(SAVE_KEY) !== this.lastRaw) {
                this.conflict = true;
                this.readOnly = true;
                this.notice = '另一个页面已更改存档。本页暂停写入以避免覆盖；请导出本页记录，再重新载入。';
            }
        }
        catch {
            this.notice = '无法检查本地存储；本页记录仍可导出。';
            this.readOnly = true;
        }
        return this.conflict;
    }
    save() {
        if (!this.backend || this.readOnly || this.checkExternal())
            return false;
        try {
            const raw = JSON.stringify(this.data);
            if (raw === this.lastRaw)
                return true;
            if (raw.length > MAX_IMPORT_BYTES)
                throw Error('size');
            // Recovery writes must succeed first. On quota failure, the old primary is left intact.
            if (this.corruptRaw) {
                this.backend.setItem(RECOVERY_KEY, this.corruptRaw);
                this.corruptRaw = null;
            }
            if (this.lastRaw && decode(this.lastRaw).valid)
                this.backend.setItem(BACKUP_KEY, this.lastRaw);
            this.backend.setItem(SAVE_KEY, raw);
            this.lastRaw = raw;
            return true;
        }
        catch {
            this.notice = '保存失败：可能是存储空间或浏览器限制。本次记录仍在内存中，请导出备份。';
            return false;
        }
    }
    export() { return JSON.stringify(this.data, null, 2); }
    import(raw) {
        const next = parseBackup(raw).data;
        if (this.checkExternal() || this.readOnly)
            throw Error(this.notice);
        const previous = this.data;
        this.data = next;
        if (this.backend && !this.save()) {
            this.data = previous;
            throw Error(this.notice);
        }
        this.notice = this.backend ? '已导入并保存；覆盖前的本机存档保存在自动备份。' : '已导入本次会话；浏览器存储不可用，请保留导入文件。';
        return true;
    }
    recoverSession(raw) { this.data = parseBackup(raw).data; if (!this.save())
        this.notice = '画面已恢复；本次记录仍在内存中，请导出文件保留。'; }
    restoreBackup() {
        const raw = this.backend?.getItem(BACKUP_KEY);
        if (!raw)
            throw Error('还没有自动备份。');
        return this.import(raw);
    }
    clear() {
        this.data = defaults();
        this.readOnly = false;
        this.conflict = false;
        this.corruptRaw = null;
        try {
            for (const key of [SAVE_KEY, BACKUP_KEY, RECOVERY_KEY])
                this.backend?.removeItem(key);
            this.lastRaw = null;
            this.save();
        }
        catch {
            this.notice = '本次会话已清空，但浏览器阻止了删除持久存储。';
        }
    }
}