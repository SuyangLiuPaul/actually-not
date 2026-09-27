import { isRegion, REGION_IDS } from './atlas.js';
export const TRAVEL_KEY = 'actually-not-voyage-v1';
export function emptyPassport() { return { version: 2, last: null, visited: [], postcards: [], language: 'system' }; }
const cleanIds = (value) => REGION_IDS.filter(id => Array.isArray(value) && value.includes(id));
export function parsePassport(raw) {
    try {
        const o = JSON.parse(raw ?? 'null');
        if (!o || ![1, 2].includes(o.version))
            return emptyPassport();
        return { version: 2, last: isRegion(o.last) ? o.last : null, visited: cleanIds(o.visited), postcards: o.version === 2 ? cleanIds(o.postcards) : [], language: ['system', 'zh-CN', 'zh-TW', 'en-AU'].includes(o.language) ? o.language : 'system' };
    }
    catch {
        return emptyPassport();
    }
}
export class TravelSave {
    store;
    data;
    notice = '';
    readonly = false;
    constructor(store) {
        this.store = store;
        let raw = null;
        try {
            raw = store?.getItem(TRAVEL_KEY) ?? null;
            const o = JSON.parse(raw ?? 'null');
            if (o && typeof o.version === 'number' && o.version > 2) {
                this.readonly = true;
                this.notice = '旅行记录来自较新版本，本版不会覆盖。';
            }
        }
        catch {
            this.notice = '旅行记录暂不能读取；本次仍可旅行。';
        }
        this.data = parsePassport(raw);
    }
    visit(id) { if (id !== null && !isRegion(id))
        return; this.data.last = id; if (id && !this.data.visited.includes(id))
        this.data.visited.push(id); this.save(); }
    postcard(id) { if (!isRegion(id))
        return false; const fresh = !this.data.postcards.includes(id); if (fresh)
        this.data.postcards.push(id); this.save(); return fresh; }
    hasPostcard(id) { return this.data.postcards.includes(id); }
    clear() { this.data = emptyPassport(); this.readonly = false; this.notice = ''; this.save(); }
    save() { if (this.readonly)
        return; try {
        if (!this.store)
            throw Error('Unavailable');
        this.store.setItem(TRAVEL_KEY, JSON.stringify(this.data));
        this.notice = '';
    }
    catch {
        this.notice = '旅行足迹暂存内存，刷新后可能丢失。科普记录仍由原发现簿管理。';
    } }
}