import { isRegion, REGION_IDS } from './atlas.js';
export const TRAVEL_KEY = 'actually-not-voyage-v1';
export const TRAVEL_BACKUP_KEY = TRAVEL_KEY + '-backup';
export const TRAVEL_RECOVERY_KEY = TRAVEL_KEY + '-recovery';
export function emptyPassport() { return { version: 2, last: null, visited: [], postcards: [], language: 'system' }; }
const cleanIds = (value) => REGION_IDS.filter(id => Array.isArray(value) && value.includes(id));
const obj = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const languages = ['system', 'zh-CN', 'zh-TW', 'en-AU'];
const isLanguage = (value) => typeof value === 'string' && languages.includes(value);
function inspectPassport(raw) {
    if (raw === null)
        return { data: emptyPassport(), valid: true, future: false };
    try {
        const value = JSON.parse(raw);
        if (!obj(value))
            return { data: emptyPassport(), valid: false, future: false };
        if (typeof value.version === 'number' && value.version > 2)
            return { data: emptyPassport(), valid: false, future: true };
        if (![1, 2].includes(value.version))
            return { data: emptyPassport(), valid: false, future: false };
        return { data: parsePassportBackup(value), valid: true, future: false };
    }
    catch {
        return { data: emptyPassport(), valid: false, future: false };
    }
}
function mergePassport(local, external) {
    return { version: 2, last: local.last, visited: cleanIds([...local.visited, ...external.visited]), postcards: cleanIds([...local.postcards, ...external.postcards]), language: local.language };
}
export function parsePassport(raw) {
    try {
        const o = JSON.parse(raw ?? 'null');
        if (!obj(o) || typeof o.version !== 'number' || ![1, 2].includes(o.version))
            return emptyPassport();
        return { version: 2, last: isRegion(o.last) ? o.last : null, visited: cleanIds(o.visited), postcards: o.version === 2 ? cleanIds(o.postcards) : [], language: isLanguage(o.language) ? o.language : 'system' };
    }
    catch {
        return emptyPassport();
    }
}
export function parsePassportBackup(value) {
    if (!obj(value) || typeof value.version !== 'number' || ![1, 2].includes(value.version))
        throw Error('旅行护照文件格式无效，未覆盖本机记录。');
    if (value.last !== undefined && value.last !== null && !isRegion(value.last))
        throw Error('旅行护照位置无效，未覆盖本机记录。');
    const validIds = (ids) => Array.isArray(ids) && ids.length <= REGION_IDS.length && ids.every(isRegion);
    if (value.visited !== undefined && !validIds(value.visited))
        throw Error('旅行足迹格式无效，未覆盖本机记录。');
    if (value.version === 2 && value.postcards !== undefined && !validIds(value.postcards))
        throw Error('明信片记录格式无效，未覆盖本机记录。');
    if (value.language !== undefined && !isLanguage(value.language))
        throw Error('旅行护照语言无效，未覆盖本机记录。');
    return parsePassport(JSON.stringify(value));
}
export class TravelSave {
    store;
    data;
    notice = '';
    readonly = false;
    conflict = false;
    lastRaw = null;
    corruptRaw = null;
    constructor(store) {
        this.store = store;
        this.data = emptyPassport();
        try {
            this.lastRaw = store?.getItem(TRAVEL_KEY) ?? null;
            const primary = inspectPassport(this.lastRaw);
            if (primary.future) {
                this.readonly = true;
                this.notice = '旅行记录来自较新版本，本版不会覆盖。';
                this.data = primary.data;
            }
            else if (!primary.valid) {
                this.corruptRaw = this.lastRaw;
                const backupRaw = store?.getItem(TRAVEL_BACKUP_KEY) ?? null, backup = inspectPassport(backupRaw);
                if (backupRaw && backup.valid) {
                    this.data = backup.data;
                    this.notice = '旅行护照损坏，已从上一份有效备份恢复；损坏原文会保留。';
                }
                else
                    this.notice = '旅行护照损坏；本次仍可旅行，原文会在保存前保留。';
            }
            else
                this.data = primary.data;
            if (!store)
                this.notice = '浏览器本地存储不可用；旅行足迹只保留在本次会话。';
        }
        catch {
            this.notice = '旅行记录暂不能读取；本次仍可旅行。';
        }
    }
    checkExternal() {
        if (!this.store || this.conflict || this.readonly)
            return this.conflict;
        try {
            const raw = this.store.getItem(TRAVEL_KEY) ?? null;
            if (raw !== this.lastRaw) {
                this.conflict = true;
                this.readonly = true;
                this.notice = '另一个页面已更改旅行护照。本页暂停写入以避免覆盖；请导出本页存档，再重新载入。';
            }
        }
        catch {
            this.readonly = true;
            this.notice = '无法检查旅行护照存储；本页足迹仍可导出。';
        }
        return this.conflict;
    }
    visit(id) { if (id !== null && !isRegion(id))
        return; this.data.last = id; if (id && !this.data.visited.includes(id))
        this.data.visited.push(id); this.save(); }
    postcard(id) { if (!isRegion(id))
        return false; const fresh = !this.data.postcards.includes(id); if (fresh)
        this.data.postcards.push(id); this.save(); return fresh; }
    hasPostcard(id) { return this.data.postcards.includes(id); }
    exportData() {
        let data = this.data;
        try {
            const raw = this.store?.getItem(TRAVEL_KEY) ?? null, latest = inspectPassport(raw);
            if (latest.valid)
                data = mergePassport(data, latest.data);
            else if (!latest.future) {
                const backup = inspectPassport(this.store?.getItem(TRAVEL_BACKUP_KEY) ?? null);
                if (backup.valid)
                    data = mergePassport(data, backup.data);
            }
        }
        catch { }
        return { ...data, visited: [...data.visited], postcards: [...data.postcards] };
    }
    import(value) {
        const next = parsePassportBackup(value);
        if (this.readonly || this.checkExternal())
            throw Error(this.notice || '旅行护照当前为只读状态。');
        if (!this.store) {
            this.data = next;
            this.notice = '已导入本次会话；浏览器存储不可用，请保留导入文件。';
            return;
        }
        const previous = this.data;
        this.data = next;
        if (!this.save()) {
            this.data = previous;
            throw Error(this.notice);
        }
    }
    clear() {
        this.data = emptyPassport();
        this.readonly = false;
        this.conflict = false;
        this.corruptRaw = null;
        this.notice = '';
        try {
            this.store?.removeItem(TRAVEL_KEY);
            this.store?.removeItem(TRAVEL_BACKUP_KEY);
            this.store?.removeItem(TRAVEL_RECOVERY_KEY);
            this.lastRaw = null;
            if (this.store && !this.save())
                this.notice = '本次旅行足迹已清空，但浏览器阻止了持久保存。';
        }
        catch {
            this.notice = '本次旅行足迹已清空，但浏览器阻止了删除持久记录。';
        }
    }
    save() {
        if (this.readonly || this.checkExternal())
            return false;
        try {
            if (!this.store)
                throw Error('Unavailable');
            const raw = JSON.stringify(this.data);
            if (raw === this.lastRaw) {
                this.notice = '';
                return true;
            }
            if (this.corruptRaw !== null && !this.store.getItem(TRAVEL_RECOVERY_KEY))
                this.store.setItem(TRAVEL_RECOVERY_KEY, this.corruptRaw);
            if (this.lastRaw && inspectPassport(this.lastRaw).valid)
                this.store.setItem(TRAVEL_BACKUP_KEY, this.lastRaw);
            this.store.setItem(TRAVEL_KEY, raw);
            if ((this.store.getItem(TRAVEL_KEY) ?? null) !== raw) {
                this.conflict = true;
                this.readonly = true;
                this.notice = '旅行护照与另一个页面同时更改；本页暂停写入，本页足迹仍可导出。';
                return false;
            }
            this.lastRaw = raw;
            this.corruptRaw = null;
            this.notice = '';
            return true;
        }
        catch {
            this.notice = '旅行足迹暂存内存，刷新后可能丢失；可导出存档保留。';
            return false;
        }
    }
}