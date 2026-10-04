import { buoyancy, shadow, pulley, isPlay, playResult } from './playyard.js';
import { honey } from './honey.js';
import { optics, balance, soundModel, isPhysics } from './physics.js';
import { uv, food, hands, clamp } from './models.js';
/** State advancement uses elapsed seconds, not rendered frames. */
export class Session {
    topic;
    buoyancy = buoyancy.defaults();
    shadow = shadow.defaults();
    pulley = pulley.defaults();
    honey = honey.defaults();
    optics = optics.defaults();
    balance = balance.defaults();
    sound = soundModel.defaults();
    uv = uv.defaults();
    food = food.defaults();
    hands = hands.defaults();
    phase = 'ready';
    paused = false;
    layer = false;
    deepLayer = 'all';
    flip = false;
    elapsed = 0;
    autoPick = .5;
    speed = 1;
    guess = '';
    rubZone = -1;
    route = null;
    constructor(topic) { this.topic = topic; }
    params() { if (isPlay(this.topic))
        return this[this.topic]; if (this.topic === 'honey')
        return this.honey; if (isPhysics(this.topic))
        return this[this.topic]; return this.topic === 'uv' ? this.uv : this.topic === 'food' ? this.food : this.hands; }
    result() { if (isPlay(this.topic))
        return playResult(this.topic, this.params()); if (this.topic === 'honey')
        return honey.evaluate(this.honey).summary; if (this.topic === 'optics')
        return optics.evaluate(this.optics).summary; if (this.topic === 'balance')
        return balance.evaluate(this.balance).summary; if (this.topic === 'sound')
        return soundModel.evaluate(this.sound).summary; return this.topic === 'uv' ? uv.evaluate(this.uv).summary : this.topic === 'food' ? food.evaluate(this.food).summary : hands.evaluate(this.hands).summary; }
    reset() { this.buoyancy = buoyancy.defaults(); this.shadow = shadow.defaults(); this.pulley = pulley.defaults(); this.honey = honey.defaults(); this.optics = optics.defaults(); this.balance = balance.defaults(); this.sound = soundModel.defaults(); this.uv = uv.defaults(); this.food = food.defaults(); this.hands = hands.defaults(); this.phase = 'ready'; this.elapsed = 0; this.paused = false; this.route = null; this.rubZone = -1; this.flip = false; this.autoPick = .5; this.speed = 1; this.guess = ''; this.layer = false; this.deepLayer = 'all'; }
    changed() { this.phase = 'ready'; this.elapsed = 0; this.paused = false; this.food.seconds = 0; this.route = null; }
    start() {
        this.paused = false;
        this.elapsed = 0;
        this.phase = 'running';
        if (this.topic === 'food')
            this.food.seconds = 0;
    }
    pickup() {
        if (this.topic === 'food' && this.phase === 'contact') {
            this.phase = 'finishing';
            this.elapsed = 0;
        }
    }
    finishHands() {
        if (this.hands.coverage.some(x => x > 0)) {
            this.phase = 'finishing';
            this.elapsed = 0;
            this.paused = false;
            this.rubZone = -1;
        }
    }
    rub(i, amount) {
        if (i < 0 || i > 5 || this.paused || this.phase === 'finishing')
            return;
        this.hands.coverage[i] = clamp(this.hands.coverage[i] + amount, 0, 1);
        this.phase = 'running';
    }
    replay(p) {
        if (p) {
            if (this.topic === 'buoyancy')
                this.buoyancy = structuredClone(p);
            else if (this.topic === 'shadow')
                this.shadow = structuredClone(p);
            else if (this.topic === 'pulley')
                this.pulley = structuredClone(p);
            else if (this.topic === 'honey')
                this.honey = structuredClone(p);
            else if (this.topic === 'optics')
                this.optics = structuredClone(p);
            else if (this.topic === 'balance')
                this.balance = structuredClone(p);
            else if (this.topic === 'sound')
                this.sound = structuredClone(p);
            else if (this.topic === 'uv')
                this.uv = structuredClone(p);
            else if (this.topic === 'food') {
                this.food = structuredClone(p);
                this.autoPick = this.food.seconds;
            }
            else
                this.hands = structuredClone(p);
        }
        if (this.topic === 'hands') {
            this.route = [...this.hands.coverage];
            this.hands.coverage.fill(0);
        }
        this.start();
    }
    tick(dt) {
        if (this.paused || this.phase === 'ready' || this.phase === 'observed')
            return false;
        // A large dt is processed consistently by this pure state machine; caller caps hidden-tab time.
        if (!Number.isFinite(dt) || dt <= 0)
            return false;
        if (isPlay(this.topic)) {
            this.elapsed = Math.min(3.2, this.elapsed + dt);
            if (this.elapsed >= 3.2)
                this.phase = 'observed';
            return true;
        }
        if (this.topic === 'honey') {
            this.elapsed = Math.min(5, this.elapsed + dt);
            if (this.elapsed >= 5)
                this.phase = 'observed';
            return true;
        }
        if (isPhysics(this.topic)) {
            this.elapsed = Math.min(this.elapsed + dt, this.topic === 'sound' ? 3.6 : 2.6);
            if (this.elapsed >= (this.topic === 'sound' ? 3.6 : 2.6))
                this.phase = 'observed';
            return true;
        }
        let remaining = Math.min(600, dt);
        while (remaining > 0 && this.phase !== 'observed') {
            const d = Math.min(remaining, 1 / 60);
            remaining -= d;
            this.elapsed += d;
            if (this.topic === 'uv') {
                if (this.elapsed >= 2.4)
                    this.phase = 'observed';
            }
            else if (this.topic === 'food') {
                if (this.phase === 'running' && this.elapsed >= .6) {
                    this.phase = 'contact';
                    this.elapsed = 0;
                }
                else if (this.phase === 'contact') {
                    this.food.seconds = clamp(this.food.seconds + d * this.speed, 0, 300);
                    if (this.autoPick !== null && this.food.seconds >= this.autoPick) {
                        this.food.seconds = this.autoPick;
                        this.pickup();
                    }
                    else if (this.food.seconds >= 300)
                        this.pickup();
                }
                else if (this.phase === 'finishing' && this.elapsed >= .65)
                    this.phase = 'observed';
            }
            else {
                if (this.route && this.phase === 'running') {
                    const step = Math.min(5, Math.floor(this.elapsed / .55));
                    for (let i = 0; i < 6; i++)
                        this.hands.coverage[i] = this.route[i] * clamp((this.elapsed - i * .55) / .55, 0, 1);
                    if (step === 5 && this.elapsed >= 3.3) {
                        this.route = null;
                        this.finishHands();
                    }
                }
                else if (this.phase === 'running' && this.rubZone >= 0)
                    this.rub(this.rubZone, d / 1.5);
                else if (this.phase === 'finishing' && this.elapsed >= 1.4)
                    this.phase = 'observed';
            }
        }
        return true;
    }
    foodHeight() {
        if (this.phase === 'running')
            return 1.5 * (1 - clamp(this.elapsed / .6, 0, 1) ** 2);
        if (this.phase === 'contact')
            return 0;
        if (this.phase === 'finishing')
            return 1.5 * clamp(this.elapsed / .65, 0, 1);
        return 1.5;
    }
}