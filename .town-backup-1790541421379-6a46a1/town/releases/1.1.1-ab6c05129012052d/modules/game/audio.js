import { soundModel } from '../experiments/physics.js';
export class StringVoice {
    context = null;
    oscillator = null;
    gain = null;
    generation = 0;
    async play(p, volume = 1) {
        this.stop();
        const request = ++this.generation;
        try {
            this.context ??= new AudioContext();
            if (this.context.state === 'suspended')
                await this.context.resume();
            if (request !== this.generation)
                return false;
            const c = this.context, oscillator = c.createOscillator(), gain = c.createGain(), now = c.currentTime;
            this.oscillator = oscillator;
            this.gain = gain;
            oscillator.type = 'sine';
            oscillator.frequency.value = soundModel.evaluate(p).frequency;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime((p.amplitude === 1 ? .012 : .024) * Math.max(0, Math.min(1, volume)), now + .025);
            gain.gain.exponentialRampToValueAtTime(.0001, now + 1.8);
            oscillator.connect(gain);
            gain.connect(c.destination);
            oscillator.start();
            oscillator.stop(now + 1.85);
            oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); if (this.oscillator === oscillator) {
                this.oscillator = null;
                this.gain = null;
            } };
            return true;
        }
        catch {
            this.stop();
            return false;
        }
    }
    stop() { this.generation++; try {
        this.oscillator?.stop();
    }
    catch { /* Already ended. */ } this.oscillator?.disconnect(); this.gain?.disconnect(); this.oscillator = null; this.gain = null; }
    dispose() { this.stop(); void this.context?.close(); this.context = null; }
}