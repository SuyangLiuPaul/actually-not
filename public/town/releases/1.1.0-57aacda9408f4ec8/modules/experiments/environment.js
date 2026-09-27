/** Deterministic scenic mechanisms, separate from the source-checked science models. */
import { PLACE_IDS } from '../content/places.js';
export const environmentDefaults = () => ({ vent: false, gate: 1, view: 0, notes: [] });
export function decodeEnvironment(input) {
    const d = environmentDefaults();
    if (!input || typeof input !== 'object' || Array.isArray(input))
        return d;
    const o = input;
    if (typeof o.vent === 'boolean')
        d.vent = o.vent;
    if (o.gate === 0 || o.gate === 1 || o.gate === 2)
        d.gate = o.gate;
    if (o.view === 0 || o.view === 1 || o.view === 2)
        d.view = o.view;
    if (Array.isArray(o.notes))
        d.notes = o.notes.slice(-24).filter((n) => {
            if (!n || typeof n !== 'object')
                return false;
            const p = n;
            return PLACE_IDS.includes(p.id) && typeof p.value === 'number' && Number.isInteger(p.value) && p.value >= 0 && p.value <= (p.id === 'greenhouse' ? 1 : 2) && typeof p.recordedAt === 'string' && Number.isFinite(Date.parse(p.recordedAt));
        }).map(n => ({ id: n.id, value: n.value, recordedAt: n.recordedAt }));
    return d;
}
export class EnvironmentSession {
    data;
    current = null;
    paused = false;
    ventAngle;
    gateLift;
    wheelAngle = 0;
    elapsed = 0;
    constructor(data) {
        this.data = data;
        this.ventAngle = data.vent ? 1 : 0;
        this.gateLift = data.gate / 2;
    }
    enter(id) { this.current = id; this.paused = false; }
    exit() { this.current = null; this.paused = false; }
    act(action, value = '') {
        if (action === 'pause') {
            this.paused = !this.paused;
            return true;
        }
        if (action === 'vent' && this.current === 'greenhouse') {
            this.data.vent = value === 'toggle' ? !this.data.vent : value === 'open';
            return true;
        }
        if (action === 'gate' && this.current === 'waterwheel') {
            const n = value === 'cycle' ? (this.data.gate + 1) % 3 : Number(value);
            if (n === 0 || n === 1 || n === 2) {
                this.data.gate = n;
                return true;
            }
        }
        if (action === 'view' && this.current === 'lookout') {
            const n = value === 'cycle' ? (this.data.view + 1) % 3 : Number(value);
            if (n === 0 || n === 1 || n === 2) {
                this.data.view = n;
                return true;
            }
        }
        if (action === 'reset') {
            if (this.current === 'greenhouse')
                this.data.vent = false;
            if (this.current === 'waterwheel') {
                this.data.gate = 1;
                this.wheelAngle = 0;
                this.elapsed = 0;
            }
            if (this.current === 'lookout')
                this.data.view = 0;
            this.paused = false;
            return true;
        }
        return false;
    }
    tick(dt, reduced = false) {
        if (this.paused || !Number.isFinite(dt) || dt < 0)
            return;
        const ease = reduced ? 1 : 1 - Math.exp(-dt * 5);
        this.ventAngle += ((this.data.vent ? 1 : 0) - this.ventAngle) * ease;
        this.gateLift += (this.data.gate / 2 - this.gateLift) * ease;
        // Time integration depends on seconds, not frames. Angles have no scientific units.
        if (!reduced) {
            this.wheelAngle = (this.wheelAngle + this.data.gate * .48 * dt) % (Math.PI * 2);
            this.elapsed += dt;
        }
    }
    note(recordedAt) {
        if (!this.current || !Number.isFinite(Date.parse(recordedAt)))
            return null;
        const n = { id: this.current, value: this.current === 'greenhouse' ? Number(this.data.vent) : this.current === 'waterwheel' ? this.data.gate : this.data.view, recordedAt };
        this.data.notes.push(n);
        if (this.data.notes.length > 24)
            this.data.notes.shift();
        return { ...n };
    }
}