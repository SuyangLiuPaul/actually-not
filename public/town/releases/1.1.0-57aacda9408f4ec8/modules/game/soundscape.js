export const CUES = {
    touch: { frequency: 510, end: 460, duration: .09, level: .035, type: 'sine', caption: '轻触装置' },
    wood: { frequency: 185, end: 90, duration: .12, level: .055, type: 'triangle', caption: '木制机关轻响' },
    water: { frequency: 650, end: 250, duration: .2, level: .035, type: 'sine', caption: '水面轻响' },
    glass: { frequency: 1080, end: 980, duration: .26, level: .025, type: 'sine', caption: '蜜罐轻放在台面' },
    paper: { frequency: 330, end: 240, duration: .1, level: .025, type: 'triangle', caption: '观察写入发现簿' },
    arrive: { frequency: 430, end: 530, duration: .22, level: .025, type: 'sine', caption: '抵达新的观察角落' },
    'step-grass': { frequency: 105, end: 65, duration: .065, level: .024, type: 'triangle', caption: '草地脚步' },
    'step-wood': { frequency: 170, end: 85, duration: .085, level: .03, type: 'triangle', caption: '木桥脚步' }
};
export class Soundscape {
    factory;
    c = null;
    master = null;
    background = null;
    noise = null;
    filter = null;
    voices = new Set();
    enabled = false;
    ambience = true;
    volume = .55;
    foreground = true;
    generation = 0;
    disposed = false;
    lastCue = -Infinity;
    stepDistance = 0;
    failed = false;
    started = 0;
    peakVoices = 0;
    constructor(factory = () => new AudioContext()) {
        this.factory = factory;
    }
    configure(muted, volume, ambience) {
        this.enabled = !muted;
        this.volume = Number.isFinite(volume) ? Math.max(0, Math.min(1, volume)) : .55;
        this.ambience = ambience;
        this.applyGain();
        if (this.volume === 0)
            this.stopVoices();
        if (muted) {
            this.stopVoices();
            this.generation++;
            void this.c?.suspend().catch(() => { });
        }
    }
    async unlock() {
        if (!this.enabled || this.disposed || !this.foreground)
            return false;
        const ticket = this.generation;
        try {
            if (!this.c) {
                this.c = this.factory();
                this.master = this.c.createGain();
                this.master.gain.value = 0;
                this.master.connect(this.c.destination);
                this.background = this.c.createGain();
                this.background.gain.value = 0;
                this.background.connect(this.master);
                // Deterministic filtered noise. Created once, not on each frame or location change.
                const buffer = this.c.createBuffer(1, this.c.sampleRate * 2, this.c.sampleRate), a = buffer.getChannelData(0);
                let seed = 221;
                for (let i = 0; i < a.length; i++) {
                    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
                    a[i] = (seed / 4294967296 - .5) * .6;
                }
                this.filter = this.c.createBiquadFilter();
                this.filter.type = 'lowpass';
                this.filter.frequency.value = 680;
                this.noise = this.c.createBufferSource();
                this.noise.buffer = buffer;
                this.noise.loop = true;
                this.noise.connect(this.filter);
                this.filter.connect(this.background);
                this.noise.start();
            }
            if (this.c.state === 'suspended')
                await this.c.resume();
            if (ticket !== this.generation || !this.enabled || !this.foreground || this.disposed)
                return false;
            this.failed = false;
            this.applyGain();
            return true;
        }
        catch {
            this.failed = true;
            this.generation++;
            this.releaseGraph();
            return false;
        }
    }
    applyGain() { if (this.c && this.master) {
        const t = this.c.currentTime;
        this.master.gain.cancelScheduledValues(t);
        this.master.gain.setTargetAtTime(this.enabled && this.foreground && !this.failed ? this.volume : 0, t, .025);
        if (!this.ambience)
            this.background?.gain.setTargetAtTime(0, t, .05);
    } }
    cue(kind) {
        const c = this.c;
        if (!c || c.state !== 'running' || !this.enabled || !this.foreground || this.disposed || this.volume <= 0 || this.voices.size >= 6)
            return false;
        const t = c.currentTime;
        if (t - this.lastCue < .045)
            return false;
        this.lastCue = t;
        const q = CUES[kind];
        let o, g;
        try {
            o = c.createOscillator();
            g = c.createGain();
            o.type = q.type;
            o.frequency.setValueAtTime(q.frequency, t);
            o.frequency.exponentialRampToValueAtTime(q.end, t + q.duration);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(q.level, t + .008);
            g.gain.exponentialRampToValueAtTime(.0001, t + q.duration);
            o.connect(g);
            g.connect(this.master);
            const v = { o, g };
            this.voices.add(v);
            o.onended = () => { v.o.disconnect(); v.g.disconnect(); this.voices.delete(v); };
            o.start();
            o.stop(t + q.duration + .02);
            this.started++;
            this.peakVoices = Math.max(this.peakVoices, this.voices.size);
            return true;
        }
        catch {
            for (const v of this.voices)
                if (v.o === o) {
                    this.voices.delete(v);
                    break;
                }
            try {
                o?.stop();
            }
            catch { }
            try {
                o?.disconnect();
                g?.disconnect();
            }
            catch { }
            return false;
        }
    }
    walk(distance, wood) { if (!Number.isFinite(distance) || distance <= 0)
        return; this.stepDistance += Math.min(2, distance); if (this.stepDistance >= .62) {
        this.stepDistance %= .62;
        this.cue(wood ? 'step-wood' : 'step-grass');
    } }
    location(creekDistance, indoor) { if (this.c && this.background) {
        const near = Math.max(0, 1 - Math.abs(creekDistance) / 6);
        const level = this.ambience && !indoor ? .018 + near * .07 : 0;
        this.background.gain.setTargetAtTime(level, this.c.currentTime, .35);
    } }
    backgrounded() { this.foreground = false; this.generation++; this.stopVoices(); this.applyGain(); void this.c?.suspend().catch(() => { }); }
    foregrounded() { this.foreground = true; /* Next user gesture resumes sound; never autoplay after a tab switch. */ }
    stopVoices() { for (const v of this.voices) {
        try {
            v.o.stop();
        }
        catch { }
        v.o.disconnect();
        v.g.disconnect();
    } this.voices.clear(); }
    info() { return { state: this.c?.state ?? 'not-created', voices: this.voices.size, peakVoices: this.peakVoices, started: this.started, failed: this.failed, enabled: this.enabled, volume: this.volume }; }
    releaseGraph() { this.stopVoices(); try {
        this.noise?.stop();
    }
    catch { } this.noise?.disconnect(); this.filter?.disconnect(); this.background?.disconnect(); this.master?.disconnect(); void this.c?.close().catch(() => { }); this.c = null; this.noise = null; this.filter = null; this.background = null; this.master = null; }
    dispose() { if (this.disposed)
        return; this.disposed = true; this.generation++; this.releaseGraph(); }
}