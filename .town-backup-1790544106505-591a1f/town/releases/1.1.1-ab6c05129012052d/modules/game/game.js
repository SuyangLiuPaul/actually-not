import { Atlas } from '../travel/globe.js';
import { regionLocale, translate } from '../ui/locale.js';
import { REGIONS, isRegion, regionPostcard } from '../travel/atlas.js';
import { TravelSave, TRAVEL_KEY, parsePassportBackup } from '../travel/passport.js';
import { InspectionState } from './inspection.js';
import { PLAY_SITES, floatPosition, shadowObject, pulleyGrip } from './playyard-scene.js';
import { isPlay, staging } from '../experiments/playyard.js';
import { Soundscape, CUES } from './soundscape.js';
import { guideFor } from './onboarding.js';
import { honeyDock, jarPosition } from './honey-scene.js';
import { StringVoice } from './audio.js';
import { SCIENCE_SITES, lampPosition, weightPosition, bridgePosition } from './science-scenes.js';
import { isPhysics } from '../experiments/physics.js';
import { scenarios as SCENARIOS, loadScenario } from '../content/scenarios.js';
import { EnvironmentSession } from '../experiments/environment.js';
import { PLACE_IDS, places, VIEW_TARGETS } from '../content/places.js';
import { drawExploration } from './exploration-scene.js';
import { riverX, isBridge } from './landscape.js';
import { Renderer } from './renderer.js';
import { World, STATIONS, handAnchors, probePosition, shadePosition } from './world.js';
import { topics } from '../content/topics.js';
import { Session } from '../experiments/session.js';
import { TOPICS, clamp, cloneObservation } from '../experiments/models.js';
import { Storage, parseBackup } from '../persistence/storage.js';
import { Interface } from '../ui/interface.js';
export class Game {
    region = null;
    atlas = null;
    travelSave;
    townWorld;
    townPosition = [0, 1.8];
    atlasWasPaused = false;
    atlasBackgrounded = false;
    session = null;
    inspection = new InspectionState();
    inspectReturn = null;
    environment;
    pendingPlace = null;
    scenicReturn = null;
    data;
    store;
    ui;
    renderer;
    world;
    player = [0, 1.8];
    heading = 0;
    walking = false;
    path = [];
    pending = null;
    frame = 0;
    last = 0;
    time = 0;
    labelClock = 0;
    saveClock = 0;
    frames = [];
    keys = new Set();
    pointers = new Map();
    pinchDistance = 0;
    labelTouchEnds = new WeakMap();
    abort = new AbortController();
    disposed = false;
    soundscape = new Soundscape();
    movedDistance = 0;
    savedKey = '';
    guideStage = 'welcome';
    voice = new StringVoice();
    sessionNonce = Math.random().toString(36).slice(2, 10);
    statusNotice = '';
    labelElements = [];
    failure;
    renders = 0;
    observedId = 0;
    audioTimer = 0;
    autoQualityUsed = false;
    vista = 0;
    postcardMode = false;
    postcardReturn = null;
    constructor(root, onFailure) {
        this.failure = onFailure;
        let local = null;
        try {
            local = window.localStorage;
        }
        catch { /* Accessible session without persistence. */ }
        this.travelSave = new TravelSave(local);
        this.store = new Storage(local);
        this.data = this.store.data;
        this.syncAudio();
        this.environment = new EnvironmentSession(this.data.environment);
        if (!this.store.notice && matchMedia('(prefers-reduced-motion: reduce)').matches)
            this.data.settings.reducedMotion = true;
        this.ui = new Interface(root, this);
        let allocated;
        try {
            this.renderer = allocated = new Renderer(this.ui.canvas, () => this.fail());
            this.world = this.townWorld = new World();
            this.renderer.setLandscape(this.world.landscape);
            this.player = this.world.navigation.nearest(...this.data.position) ?? [0, 1.8];
            this.townPosition = [...this.player];
            this.renderer.quality = this.data.settings.quality;
            this.renderer.resize();
            this.renderer.setStatic(this.world.static);
            this.arrivalView();
            this.renderer.camera.update(0, true);
            this.buildLabels();
            this.events();
            this.ui.canvas.addEventListener('webglcontextrestored', () => this.ui.toast('图形上下文已恢复，请重新载入小镇。'), { signal: this.abort.signal });
            if (this.store.notice)
                this.ui.toast(this.store.notice);
            window.__town = {
                state: () => ({
                    region: this.region, atlas: this.atlas?.state ?? null, visited: [...this.travelSave.data.visited], postcards: [...this.travelSave.data.postcards], postcardMode: this.postcardMode, inspecting: this.inspection.active, observations: structuredClone(this.data.observations),
                    place: this.environment.current, environment: structuredClone(this.data.environment), pendingPlace: this.pendingPlace, avatarHeight: this.world.heightAt(...this.player), wheelAngle: this.environment.wheelAngle, ventAngle: this.environment.ventAngle, gateLift: this.environment.gateLift,
                    elapsed: this.session?.elapsed ?? null, draft: structuredClone(this.data.draft), saveReadOnly: this.store.readOnly, saveConflict: this.store.conflict, guide: this.guideStage, audio: this.soundscape.info(), topic: this.session?.topic ?? null, phase: this.session?.phase ?? null, params: this.session ? structuredClone(this.session.params()) : null, player: [...this.player], records: this.data.observations.length, paused: this.session?.paused, layer: this.session?.layer, pathLength: this.path.length, camera: {
                        height: this.renderer.camera.halfHeight, yaw: this.renderer.camera.yaw, target: [...this.renderer.camera.target]
                    }, compared: [...this.data.compared], storageNotice: this.store.notice, travelReadOnly: this.travelSave.readonly, travelConflict: this.travelSave.conflict, travelNotice: this.travelSave.notice, settings: { ...this.data.settings }
                }), project: p => { const r = this.ui.canvas.getBoundingClientRect(), point = this.renderer.camera.project(p); return [point[0] + r.left, point[1] + r.top]; }, info: () => ({
                    version: '1.1.1', build: document.querySelector('meta[name=town-build]')?.getAttribute('content'), ...this.renderer.info(), renderFrames: this.renders, frameIntervals: this.frames.slice(-120)
                })
            };
            this.frame = requestAnimationFrame(this.loop);
        }
        catch (error) {
            this.abort.abort();
            this.ui.dispose();
            allocated?.dispose();
            throw error;
        }
    }
    availableTopics() { return this.region ? REGIONS[this.region].topics : TOPICS; }
    openEarth() {
        if (this.atlas)
            return;
        if (this.ui.isDialogOpen())
            this.ui.closeDialog();
        if (this.inspection.active)
            this.setInspection(false);
        this.clearInput();
        this.path = [];
        this.pending = null;
        this.pendingPlace = null;
        this.voice.stop();
        this.soundscape.backgrounded();
        this.atlasWasPaused = this.session?.paused ?? false;
        this.atlasBackgrounded = false;
        if (this.session)
            this.session.paused = true;
        this.persistPosition();
        this.ui.root.querySelector('.town-shell').inert = true;
        try {
            this.atlas = new Atlas(this.ui.root, this.travelSave, this.data.settings.reducedMotion, this.ui.locale(), id => { this.closeEarth(false); this.setRegion(id); }, () => this.closeEarth(true));
        }
        catch {
            this.ui.root.querySelector('.town-shell').inert = false;
            this.ui.toast('地球未能打开；原来的场景和记录仍然保留。');
            if (this.session)
                this.session.paused = this.atlasWasPaused;
        }
    }
    closeEarth(resume) {
        this.ui.root.querySelector('.town-shell').inert = false;
        this.atlas?.dispose();
        this.atlas = null;
        this.clearInput();
        this.last = 0;
        if (resume && this.session)
            this.session.paused = this.atlasBackgrounded ? true : this.atlasWasPaused;
        if (this.session)
            this.ui.renderExperiment();
        this.ui.canvas.focus({ preventScroll: true });
    }
    setRegion(id) {
        if (id !== null && !isRegion(id))
            return;
        let next;
        try {
            next = id ? new World(id) : this.townWorld;
            this.renderer.setLandscape(next.landscape);
        }
        catch {
            if (this.session) {
                this.session.paused = true;
                this.ui.renderExperiment();
            }
            this.ui.toast('目的地加载未完成；当前场景和记录仍保留，可以重试。');
            return;
        }
        if (this.ui.isDialogOpen())
            this.ui.closeDialog();
        if (this.postcardMode)
            this.setPostcard(false);
        if (this.region === null)
            this.townPosition = [...this.player];
        this.setInspection(false);
        this.captureDraft();
        this.voice.stop();
        if (this.environment.current)
            this.environment.exit();
        this.session = null;
        this.path = [];
        this.pending = null;
        this.pendingPlace = null;
        this.clearInput();
        this.world = next;
        this.region = id;
        const spawn = id ? REGIONS[id].spawn : this.townPosition;
        this.player = this.world.navigation.nearest(...spawn) ?? [...spawn];
        this.renderer.setStatic(next.static);
        this.ui.exit();
        this.homeView();
        this.syncRegionUI();
        this.buildLabels();
        this.renderer.camera.update(0, true);
        this.travelSave.visit(id);
        if (this.travelSave.notice)
            this.ui.toast(this.travelSave.notice);
        this.ui.updateRegionUI();
        if (id)
            this.ui.showDestinationArrival(id);
        this.last = 0;
        this.persistPosition();
        this.cue('arrive');
        if (id) {
            const r = regionLocale(id, REGIONS[id], this.ui.locale());
            this.ui.setHint(r.country + ' · ' + r.name, r.subtitle + (this.ui.locale() === 'en' ? '. Click a path to walk there, or use the quick-travel buttons below.' : '。点道路走过去，或用下方入口直接操作。'));
        }
        else
            this.ui.setHint(translate('回到熟悉的小镇', this.ui.locale()), translate('十个科学体验与已保存的观察仍在这里。随时打开地球继续旅行。', this.ui.locale()));
    }
    syncRegionUI() {
        this.ui.root.classList.toggle('in-destination', Boolean(this.region));
        this.ui.root.dataset.destination = this.region ?? '';
        const label = this.ui.root.querySelector('[data-region]');
        if (label && !this.session) {
            if (this.region) {
                const r = regionLocale(this.region, REGIONS[this.region], this.ui.locale());
                label.textContent = r.country + ' · ' + r.name;
            }
            else
                label.textContent = translate('自由探索', this.ui.locale());
        }
        for (const e of this.ui.root.querySelectorAll('.travel-bar [data-travel]'))
            e.hidden = Boolean(this.region && !this.availableTopics().includes(e.dataset.travel));
        const map = this.ui.root.querySelector('.travel-bar [data-action=map]');
        if (map)
            map.hidden = Boolean(this.region);
        const back = this.ui.root.querySelector('.travel-bar [data-action=return-town]');
        if (back)
            back.hidden = !this.region;
    }
    events() {
        const opt = { signal: this.abort.signal };
        const c = this.ui.canvas;
        const gesture = () => { if (this.atlas)
            return; this.soundscape.foregrounded(); void this.soundscape.unlock(); };
        this.ui.root.addEventListener('pointerdown', gesture, { ...opt, capture: true });
        this.ui.root.addEventListener('keydown', gesture, { ...opt, capture: true });
        c.addEventListener('pointerdown', this.down, opt);
        // World labels are part of the exploration surface, not pinch dead zones.
        // Route touch gestures through the same camera input; an unmoved tap retains its button action.
        this.ui.labels.addEventListener('pointerdown', e => {
            if (e.pointerType !== 'touch' || this.session || this.environment.current || this.ui.isDialogOpen())
                return;
            const label = e.target.closest('button.station-label');
            if (!label)
                return;
            e.preventDefault();
            this.down(e);
            const pointer = this.pointers.get(e.pointerId);
            if (pointer)
                pointer.label = label;
        }, opt);
        this.ui.labels.addEventListener('click', e => {
            const label = e.target.closest('button.station-label');
            // Suppress only a native duplicate click, never keyboard/programmatic activation.
            if (label && e.detail > 0 && performance.now() - (this.labelTouchEnds.get(label) ?? -1000) < 700) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, { ...opt, capture: true });
        c.addEventListener('pointermove', this.move, opt);
        c.addEventListener('pointerup', this.up, opt);
        c.addEventListener('pointercancel', this.cancel, opt);
        c.addEventListener('wheel', this.wheel, { ...opt, passive: false });
        c.addEventListener('contextmenu', e => e.preventDefault(), opt);
        window.addEventListener('keydown', this.keydown, opt);
        window.addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()), opt);
        window.addEventListener('blur', () => this.pauseForBackground(), opt);
        document.addEventListener('visibilitychange', () => { if (document.hidden)
            this.pauseForBackground(); this.last = 0; }, opt);
        window.addEventListener('storage', e => {
            if (e.key === null || e.key === 'actually-not-town-v2') {
                if (this.store.checkExternal())
                    this.ui.toast(this.store.notice);
            }
            if (e.key === null || e.key === TRAVEL_KEY) {
                if (this.travelSave.checkExternal())
                    this.ui.toast(this.travelSave.notice);
            }
        }, opt);
        window.addEventListener('resize', () => this.cameraLayout(), opt);
        window.addEventListener('pagehide', () => this.persistPosition(), opt);
    }
    pauseForBackground() {
        if (this.atlas)
            this.atlasBackgrounded = true;
        this.inspection.hold();
        this.clearInput();
        this.last = 0;
        this.voice.stop();
        this.soundscape.backgrounded();
        const s = this.session;
        if (s && s.phase !== 'ready' && s.phase !== 'observed') {
            s.paused = true;
            this.ui.renderExperiment();
        }
        if (this.environment.current) {
            this.environment.paused = true;
            this.ui.renderExploration();
        }
    }
    clearInput() {
        this.keys.clear();
        this.pointers.clear();
        if (this.session)
            this.session.rubZone = -1;
    }
    point(e) { const r = this.ui.canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    distance(p, x, y) { const s = this.renderer.camera.project(p); return Math.hypot(s[0] - x, s[1] - y); }
    nearestZone(x, y) {
        if (this.session?.flip && this.distance([8.7, 1.7, 6.08], x, y) < 35)
            return 5;
        let nearest = -1, dist = 70;
        handAnchors.forEach((p, i) => {
            const d = this.distance(p, x, y);
            if (d < dist) {
                dist = d;
                nearest = i;
            }
        });
        return nearest;
    }
    methodAt(x, y) {
        const objects = [[[6.08, 1.61, 5.1], 'soap'], [[10, 2.1, 5.18], 'sanitiser'], [[8, 2.1, 5.04], 'water']];
        let nearest = null, distance = 30;
        for (const [position, method] of objects) {
            const d = this.distance(position, x, y);
            if (d < distance) {
                nearest = method;
                distance = d;
            }
        }
        return nearest;
    }
    down = (e) => {
        if (e.button !== 0 || this.ui.isDialogOpen() || this.atlas)
            return;
        const [x, y] = this.point(e);
        const s = this.inspection.active ? null : this.session;
        let mode = 'camera';
        if (s?.topic === 'buoyancy' && this.distance(floatPosition(s.buoyancy, staging(s.elapsed, s.phase === 'ready')), x, y) < 65)
            mode = 'float-box';
        if (s?.topic === 'shadow' && this.distance(shadowObject(s.shadow), x, y) < 62)
            mode = 'shadow-object';
        if (s?.topic === 'pulley' && this.distance(pulleyGrip(s.pulley, staging(s.elapsed, s.phase === 'ready')), x, y) < 62)
            mode = 'pulley-grip';
        if (s?.topic === 'uv') {
            if (this.distance(probePosition(s.uv.probe), x, y) < 47)
                mode = 'probe';
            else if (this.distance(shadePosition(s.uv.shade), x, y) < 70)
                mode = 'shade';
        }
        if (s?.topic === 'hands' && !this.methodAt(x, y) && this.nearestZone(x, y) >= 0) {
            mode = 'hands';
            s.rubZone = this.nearestZone(x, y);
            s.rub(s.rubZone, .04);
        }
        if (s?.topic === 'food' && this.distance([8, .54 + s.foodHeight(), -1], x, y) < 80)
            mode = 'food';
        if (s?.topic === 'optics' && this.distance(lampPosition(s.optics), x, y) < 58)
            mode = 'incident';
        if (s?.topic === 'balance') {
            const progress = s.phase === 'ready' ? 0 : Math.min(1, s.elapsed / 1.7);
            const left = this.distance(weightPosition(s.balance, 'left', progress), x, y), right = this.distance(weightPosition(s.balance, 'right', progress), x, y);
            if (Math.min(left, right) < 60)
                mode = left <= right ? 'left-weight' : 'right-weight';
        }
        if (s?.topic === 'honey' && this.distance(jarPosition(s.honey), x, y) < 60)
            mode = 'honey-jar';
        if (s?.topic === 'sound') {
            const c = SCIENCE_SITES.sound, bridge = bridgePosition(s.sound), b = this.distance([bridge[0], c.y + 1.31, c.z + .6], x, y), v = this.distance([(c.x - 1.45 + bridge[0]) / 2, c.y + 1.48, c.z], x, y);
            if (Math.min(b, v) < 60)
                mode = b <= v ? 'bridge' : 'pluck';
        }
        this.pointers.set(e.pointerId, {
            x, y, startX: x, startY: y, mode, moved: false
        });
        this.ui.canvas.setPointerCapture(e.pointerId);
        this.ui.canvas.focus({ preventScroll: true });
        if (this.pointers.size === 2) {
            const p = [...this.pointers.values()];
            this.pinchDistance = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
            for (const a of p) {
                a.moved = true;
                a.mode = 'camera';
            }
            if (s)
                s.rubZone = -1;
        }
    };
    move = (e) => {
        const p = this.pointers.get(e.pointerId);
        if (!p)
            return;
        const [x, y] = this.point(e), dx = x - p.x, dy = y - p.y;
        p.x = x;
        p.y = y;
        if (Math.hypot(x - p.startX, y - p.startY) > 7)
            p.moved = true;
        if (this.pointers.size === 2) {
            const pointers = [...this.pointers.values()], d = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
            if (d > 10 && this.pinchDistance > 10)
                this.zoom(this.pinchDistance / d);
            this.pinchDistance = d;
            return;
        }
        const s = this.session;
        if (p.moved && s?.topic === 'shadow' && p.mode === 'shadow-object') {
            const c = PLAY_SITES.shadow, q = this.renderer.camera.ground(x, y, c.y + 1.95);
            s.shadow.objectDistance = clamp(Math.round((c.z + 1.7 - q[2]) / .85 * 10) / 10, .8, 2);
            s.changed();
            this.savedKey = '';
            return;
        }
        if (p.moved && s?.topic === 'pulley' && p.mode === 'pulley-grip') {
            const cam = this.renderer.camera, a = cam.project(pulleyGrip({ ...s.pulley, pull: 2 }, 0)), d = cam.project(pulleyGrip({ ...s.pulley, pull: 2 }, 1)), vx = d[0] - a[0], vy = d[1] - a[1];
            s.pulley.pull = clamp(Math.round(((x - a[0]) * vx + (y - a[1]) * vy) / (vx * vx + vy * vy) * 200) / 100, .25, 2);
            s.elapsed = 3.2;
            s.phase = 'observed';
            s.paused = false;
            this.savedKey = '';
            return;
        }
        if (p.moved && s?.topic === 'honey' && p.mode === 'honey-jar') {
            const a = honeyDock('shelf'), b = honeyDock('bath');
            s.honey.place = this.distance([a[0], a[1] + .65, a[2]], x, y) < this.distance([b[0], b[1] + .65, b[2]], x, y) ? 'shelf' : 'bath';
            s.changed();
            this.savedKey = '';
            return;
        }
        if (p.moved && s && (p.mode === 'incident' || p.mode === 'left-weight' || p.mode === 'right-weight' || p.mode === 'bridge')) {
            if (p.mode === 'incident') {
                const c = SCIENCE_SITES.optics, q = this.renderer.camera.ground(x, y, c.y + 1.37);
                s.optics.angle = clamp(Math.round(Math.atan2(Math.max(0, c.x - q[0]), Math.max(.001, c.z - q[2])) * 180 / Math.PI / 5) * 5, 0, 70);
            }
            if (p.mode === 'left-weight' || p.mode === 'right-weight') {
                const c = SCIENCE_SITES.balance, q = this.renderer.camera.ground(x, y, c.y + 1.65), side = p.mode === 'left-weight' ? 'left' : 'right';
                s.balance[`${side}Distance`] = clamp(Math.round(Math.abs(q[0] - c.x) / .65), 1, 3);
            }
            if (p.mode === 'bridge') {
                const c = SCIENCE_SITES.sound, q = this.renderer.camera.ground(x, y, c.y + 1.28);
                s.sound.length = clamp(Math.round((q[0] - (c.x - 1.45)) / 3.1 * 10) / 10, .3, .9);
            }
            this.voice.stop();
            s.changed();
            return;
        }
        if (p.mode === 'hands' && s) {
            s.rubZone = this.nearestZone(x, y);
            if (s.rubZone >= 0)
                s.rub(s.rubZone, .012);
            return;
        }
        if (p.moved && (p.mode === 'probe' || p.mode === 'shade') && s) {
            const q = this.renderer.camera.ground(x, y, p.mode === 'probe' ? 1.4 : 3.4);
            const slot = clamp(Math.round((q[0] + 10.8) / 1.8), 0, 2);
            if (p.mode === 'probe')
                s.uv.probe = slot;
            else
                s.uv.shade = q[2] < -2.5 ? -1 : slot;
            s.changed();
            this.ui.tick();
            return;
        }
        if (p.mode === 'camera' && p.moved) {
            const cam = this.renderer.camera, scale = cam.halfHeight * 2 / Math.max(cam.height, 1);
            cam.desired[0] = clamp(cam.desired[0] - cam.right[0] * dx * scale + cam.back[0] * dy * scale, -18, 18);
            cam.desired[2] = clamp(cam.desired[2] - cam.right[2] * dx * scale + cam.back[2] * dy * scale, -12, 23);
        }
    };
    up = (e) => {
        const p = this.pointers.get(e.pointerId);
        if (!p)
            return;
        const hadPinch = this.pointers.size > 1;
        if (p.label)
            this.labelTouchEnds.set(p.label, performance.now());
        this.pointers.delete(e.pointerId);
        if (this.ui.canvas.hasPointerCapture(e.pointerId))
            this.ui.canvas.releasePointerCapture(e.pointerId);
        if (this.session)
            this.session.rubZone = -1;
        if (hadPinch || this.inspection.active)
            return;
        if (p.label) {
            if (!p.moved && p.label.isConnected)
                p.label.click();
            return;
        }
        if (p.mode === 'probe' || p.mode === 'shade' || p.mode === 'hands' || (p.moved && ['incident', 'left-weight', 'right-weight', 'bridge', 'honey-jar', 'shadow-object', 'pulley-grip'].includes(p.mode))) {
            this.captureDraft();
            this.ui.renderExperiment();
            this.buildLabels();
            this.cue(p.mode === 'honey-jar' ? 'glass' : ['shadow-object', 'pulley-grip'].includes(p.mode) ? 'wood' : 'touch');
            return;
        }
        if (!p.moved) {
            if (this.session) {
                this.interactObject(p.x, p.y, p.mode);
            }
            else if (this.environment.current) {
                const place = places[this.environment.current];
                if (this.distance(place.handle, p.x, p.y) < 100)
                    this.act('env-' + ({ greenhouse: 'vent', waterwheel: 'gate', lookout: 'view' }[place.id]), place.id === 'greenhouse' ? 'toggle' : 'cycle');
            }
            else
                this.clickWorld(p.x, p.y);
        }
    };
    cancel = (e) => {
        this.pointers.delete(e.pointerId);
        if (this.session)
            this.session.rubZone = -1;
    };
    interactObject(x, y, mode) {
        const s = this.session;
        if (!s)
            return;
        if (isPlay(s.topic) && ['float-box', 'shadow-object', 'pulley-grip'].includes(mode)) {
            this.act('observe');
            return;
        }
        if (s.topic === 'honey' && mode === 'honey-jar') {
            this.act('honey-place', s.honey.place === 'shelf' ? 'bath' : 'shelf');
            return;
        }
        if (s.topic === 'sound' && mode === 'pluck') {
            this.act('pluck');
            return;
        }
        if (s.topic === 'optics' && mode === 'incident') {
            this.act('observe');
            return;
        }
        if (s.topic === 'balance' && (mode === 'left-weight' || mode === 'right-weight')) {
            this.act('observe');
            return;
        }
        if (s.topic === 'food' && mode === 'food') {
            this.act(s.phase === 'contact' ? 'pickup' : 'drop');
            return;
        }
        if (s.topic === 'uv') {
            let slot = 0, dist = Infinity;
            for (let i = 0; i < 3; i++) {
                const d = this.distance(probePosition(i), x, y);
                if (d < dist) {
                    dist = d;
                    slot = i;
                }
            }
            if (dist < 80)
                this.act('probe', String(slot));
        }
        if (s.topic === 'hands') {
            const method = this.methodAt(x, y);
            if (method)
                this.act('method', method);
        }
    }
    clickWorld(x, y) {
        for (const t of this.availableTopics()) {
            if (this.distance(STATIONS[t].center, x, y) < 80) {
                this.travel(t, false);
                return;
            }
        }
        if (!this.region && this.distance([.1, 2, -4.7], x, y) < 60) {
            this.ui.journal();
            return;
        }
        if (!this.region)
            for (const id of PLACE_IDS) {
                if (this.distance(places[id].handle, x, y) < 35) {
                    this.explore(id, false);
                    return;
                }
            }
        const p = this.renderer.camera.surface(x, y, (x, z) => this.world.heightAt(x, z));
        this.pending = null;
        this.pendingPlace = null;
        this.path = this.world.navigation.path(this.player, [p[0], p[2]]);
        if (!this.path.length)
            this.ui.toast('这里被水面或物件挡住了。试着点小路。');
    }
    wheel = (e) => { e.preventDefault(); this.zoom(Math.exp(clamp(e.deltaY, -160, 160) * .0015)); };
    zoom(factor) { const cam = this.renderer.camera; cam.desiredHeight = clamp(cam.desiredHeight * factor, (this.session || this.environment.current) ? 2.8 : 7, (this.session || this.environment.current) ? 12 : 31); }
    keydown = (e) => {
        if (this.atlas)
            return;
        const k = e.key.toLowerCase(), target = e.target;
        if (k === 'escape') {
            if (this.postcardMode) {
                this.setPostcard(false);
                return;
            }
            if (this.ui.isDialogOpen())
                this.ui.closeDialog();
            else if (this.inspection.active)
                this.setInspection(false);
            else if (this.environment.current)
                this.exitExploration();
            else if (this.session)
                this.act('exit');
            return;
        }
        if (k === 'i' && !this.ui.isDialogOpen() && !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) && this.session) {
            e.preventDefault();
            this.setInspection(!this.inspection.active);
            return;
        }
        if (this.inspection.active && k === ' ') {
            e.preventDefault();
            return;
        }
        if (k === 'f' && !this.ui.isDialogOpen() && !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
            e.preventDefault();
            this.act('locate-player');
            return;
        }
        if (this.ui.isDialogOpen() || ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'SUMMARY'].includes(target.tagName))
            return;
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
            e.preventDefault();
            this.keys.add(k);
            this.path = [];
            this.pending = null;
            this.pendingPlace = null;
        }
        if (k === 'e' && !this.region && !this.session && !this.environment.current) {
            const p = PLACE_IDS.find(id => Math.hypot(this.player[0] - places[id].approach[0], this.player[1] - places[id].approach[1]) < 1.8);
            if (p) {
                this.explore(p, false);
                return;
            }
        }
        if (k === 'e' && !this.session && !this.environment.current) {
            const closest = this.availableTopics().find(t => Math.hypot(this.player[0] - STATIONS[t].approach[0], this.player[1] - STATIONS[t].approach[1]) < 2.5);
            if (closest) {
                this.travel(closest, false);
                return;
            }
        }
        if (k === 'q' || k === 'e')
            this.act(k === 'q' ? 'rotate-left' : 'rotate-right');
        if (k === '+' || k === '=')
            this.zoom(.86);
        if (k === '-')
            this.zoom(1.16);
        if (k === ' ' && this.environment.current === 'waterwheel') {
            e.preventDefault();
            this.act('env-pause');
            return;
        }
        if (k === ' ' && this.session) {
            e.preventDefault();
            this.act('pause');
        }
    };
    cameraLayout() {
        this.renderer.resize();
        const c = this.renderer.camera;
        if (this.postcardMode) {
            c.offset = [0, 0, 0];
            return;
        }
        if (this.inspection.active) {
            c.offset = [0, 0, 0];
            c.desiredHeight = Math.max(4.0, 3.65 / (c.width / Math.max(c.height, 1)));
            return;
        }
        if (this.session || this.environment.current) {
            const mobile = innerWidth <= 960;
            c.offset = [mobile ? 0 : -.29, mobile ? -.04 : 0, 0];
            c.desiredHeight = mobile ? Math.max(3.6, 3.9 / (c.width / Math.max(c.height, 1))) : 4.6;
        }
        else {
            c.offset = [0, 0, 0];
            c.desiredHeight = this.region ? (innerWidth <= 960 ? Math.max(14.4, 12.8 / (c.width / Math.max(c.height, 1))) : 12.9) : innerWidth <= 960 ? 19.5 : 21.8;
        }
    }
    /** Authored camera bookmarks only. They never move the avatar or edit experiments. */
    arrivalView() {
        const c = this.renderer.camera;
        c.offset = [0, 0, 0];
        c.desired = [-.5, .7, -1.9];
        c.yaw = .66;
        c.elevation = .73;
        c.desiredHeight = innerWidth <= 600 ? 8.9 : innerWidth <= 960 ? 10.0 : 9.5;
    }
    nextVista() {
        if (this.region) {
            this.homeView();
            return;
        }
        if (this.session || this.environment.current)
            return;
        this.vista = (this.vista + 1) % 3;
        const views = [[[-.5, .7, -1.9], 10.8, .66, '科普小屋与庭院'], [[-7.2, .75, 1.5], 9.3, .55, '花园与溪岸'], [[1.4, 1.1, 16.9], 10.6, .57, '河岸小剧场']];
        const [target, height, yaw, name] = views[this.vista], c = this.renderer.camera;
        c.desired = [...target];
        c.yaw = yaw;
        c.elevation = .73;
        c.desiredHeight = innerWidth <= 600 ? height * .92 : height;
        this.ui.toast(name + ' · 只是移动镜头，角色留在原位');
    }
    homeView() { this.renderer.camera.desired = this.region ? [...REGIONS[this.region].focus] : [1.2, .65, 4]; this.renderer.camera.yaw = .67; this.renderer.camera.elevation = .84; this.cameraLayout(); }
    postcardState() { return { region: this.region, saved: Boolean(this.region && this.travelSave.hasPostcard(this.region)), visited: this.travelSave.data.visited.length, postcards: this.travelSave.data.postcards.length }; }
    setPostcard(active) {
        if (active) {
            if (!this.region || this.session || this.environment.current || this.postcardMode)
                return;
            const c = this.renderer.camera, p = regionPostcard(this.region);
            this.postcardMode = true;
            this.postcardReturn = { target: [...c.desired], height: c.desiredHeight, yaw: c.yaw, elevation: c.elevation };
            this.path = [];
            this.pending = null;
            this.pendingPlace = null;
            this.clearInput();
            c.offset = [0, 0, 0];
            c.desired = [...p.target];
            c.desiredHeight = innerWidth <= 600 ? p.height * 1.08 : p.height;
            c.yaw = p.yaw;
            c.elevation = .73;
            this.ui.showPostcard(this.region, this.travelSave.hasPostcard(this.region));
            this.cue('paper');
            return;
        }
        if (!this.postcardMode)
            return;
        this.postcardMode = false;
        this.ui.hidePostcard();
        const c = this.renderer.camera, r = this.postcardReturn;
        this.postcardReturn = null;
        if (r) {
            c.desired = [...r.target];
            c.desiredHeight = r.height;
            c.yaw = r.yaw;
            c.elevation = r.elevation;
        }
        this.cameraLayout();
        this.ui.canvas.focus({ preventScroll: true });
    }
    explore(id, direct) {
        if (!PLACE_IDS.includes(id))
            return;
        if (this.region)
            this.setRegion(null);
        if (this.ui.isDialogOpen())
            this.ui.closeDialog();
        if (this.session)
            this.exit();
        if (this.environment.current)
            this.exitExploration();
        this.pending = null;
        this.pendingPlace = null;
        this.clearInput();
        const target = this.world.navigation.nearest(...places[id].approach);
        if (!target) {
            this.ui.toast('无法找到安全的落脚处。');
            return;
        }
        if (direct) {
            this.player = target;
            this.enterExploration(id);
            return;
        }
        this.path = this.world.navigation.path(this.player, target);
        if (!this.path.length && Math.hypot(this.player[0] - target[0], this.player[1] - target[1]) > 1) {
            this.ui.toast('这条路线暂时不通，可以从地图直接前往。');
            return;
        }
        this.pendingPlace = id;
        this.ui.setHint('沿着步道，走一小段', places[id].title + ' · 到达后就能操作。按方向键可以取消自动行走。');
    }
    enterExploration(id) {
        this.path = [];
        this.pendingPlace = null;
        this.clearInput();
        const c = this.renderer.camera;
        this.scenicReturn = { target: [...c.desired], height: c.desiredHeight, yaw: c.yaw };
        this.environment.enter(id);
        this.ui.enterExploration();
        c.desired = [...places[id].center];
        this.cameraLayout();
        if (id === 'greenhouse')
            c.yaw = .56;
        if (id === 'lookout')
            c.desiredHeight = innerWidth <= 960 ? 4.5 : 5.5;
        this.buildLabels();
        this.persistPosition();
        this.sound();
    }
    exitExploration() {
        this.environment.exit();
        this.path = [];
        this.pendingPlace = null;
        this.clearInput();
        this.ui.exit();
        this.homeView();
        if (this.scenicReturn) {
            const c = this.renderer.camera;
            c.desired = [...this.scenicReturn.target];
            c.desiredHeight = this.scenicReturn.height;
            c.yaw = this.scenicReturn.yaw;
        }
        this.scenicReturn = null;
        this.buildLabels();
        this.persistPosition();
        this.ui.setHint('小镇里，还有一些安静的角落', '继续沿着步道走，或打开小镇地图。散步记录和科普观察都在发现簿中。');
    }
    travel(t, direct) {
        if (!TOPICS.includes(t) || topics[t].contentStatus !== 'source-checked-prototype')
            return;
        if (this.region && !this.availableTopics().includes(t))
            this.setRegion(null);
        if (this.ui.isDialogOpen())
            this.ui.closeDialog();
        if (this.environment.current)
            this.exitExploration();
        this.pendingPlace = null;
        if (this.session)
            this.exit();
        const target = this.world.navigation.nearest(...STATIONS[t].approach);
        if (!target) {
            this.ui.toast('暂时找不到装置前的安全位置。');
            return;
        }
        if (direct) {
            this.player = target;
            this.enter(t);
        }
        else {
            this.path = this.world.navigation.path(this.player, target);
            if (!this.path.length && Math.hypot(this.player[0] - target[0], this.player[1] - target[1]) > 1) {
                this.ui.toast('这条路线暂时不通；可以使用“直接前往”。');
                return;
            }
            this.pending = t;
            this.ui.setHint('沿着小路走过去', STATIONS[t].name + '就在前面，抵达后会自动进入。');
        }
    }
    enter(t) { this.setInspection(false); this.savedKey = ''; this.path = []; this.pending = null; this.clearInput(); this.session = new Session(t); this.renderer.setStatic(this.world.static, t); this.renderer.camera.desired = [...STATIONS[t].center]; this.ui.enter(); this.cameraLayout(); this.persistPosition(); this.buildLabels(); this.cue('arrive'); }
    exit() { this.setInspection(false); this.captureDraft(); this.voice.stop(); this.session = null; this.path = []; this.pending = null; this.clearInput(); this.renderer.setStatic(this.world.static); this.ui.exit(); this.homeView(); this.persistPosition(); this.buildLabels(); this.syncRegionUI(); this.ui.setHint('继续把日常看清楚', '沿着小路去下一个体验点，或打开发现簿回看刚才的条件。'); }
    setInspection(active) {
        if (active === this.inspection.active || active && !this.session)
            return;
        const c = this.renderer.camera;
        this.clearInput();
        if (active) {
            this.inspectReturn = { target: [...c.desired], height: c.desiredHeight, yaw: c.yaw };
            this.inspection.enter(this.session);
        }
        else
            this.inspection.exit(this.session);
        this.ui.root.classList.toggle('inspection-mode', active);
        this.ui.panel.inert = active;
        const button = this.ui.root.querySelector('[data-action="inspect"]');
        button.textContent = active ? '返回操作' : '细看装置';
        button.setAttribute('aria-pressed', String(active));
        const note = this.ui.root.querySelector('.inspect-caption');
        note.querySelector('strong').textContent = this.session ? STATIONS[this.session.topic].name : '细看装置';
        this.cameraLayout();
        if (!active && this.inspectReturn) {
            c.desired = [...this.inspectReturn.target];
            c.desiredHeight = this.inspectReturn.height;
            c.yaw = this.inspectReturn.yaw;
            this.inspectReturn = null;
        }
        this.ui.renderExperiment();
        button.focus({ preventScroll: true });
    }
    act(action, value = '') {
        if (action === 'earth') {
            this.openEarth();
            return;
        }
        if (action === 'return-town') {
            this.setRegion(null);
            return;
        }
        if (this.atlas)
            return;
        const s = this.session;
        if (action === 'postcard') {
            this.setPostcard(true);
            return;
        }
        if (action === 'postcard-exit') {
            this.setPostcard(false);
            return;
        }
        if (action === 'postcard-save') {
            if (!this.region || !this.postcardMode)
                return;
            const fresh = this.travelSave.postcard(this.region);
            this.ui.updatePostcardSaved(true);
            this.ui.toast(this.travelSave.notice || (fresh ? '明信片已放进旅行护照。只记录到访与风景，不代表完成科普。' : '这张明信片已经在旅行护照里。'));
            this.cue('paper');
            return;
        }
        if (this.postcardMode)
            return;
        if (action === 'vista') {
            this.nextVista();
            return;
        }
        if (action === 'inspect') {
            this.setInspection(!this.inspection.active);
            return;
        }
        if (this.inspection.active && !['zoom-in', 'zoom-out', 'rotate-left', 'rotate-right', 'home-view', 'exit'].includes(action))
            return;
        if (action === 'locate-player') {
            if (s || this.environment.current) {
                this.ui.toast('先回到小镇，再定位角色。');
                return;
            }
            this.renderer.camera.desired = [this.player[0], this.world.heightAt(...this.player) + .7, this.player[1]];
            this.renderer.camera.desiredHeight = innerWidth <= 960 ? 6.5 : 8.5;
            return;
        }
        if (action === 'guide-dismiss') {
            this.updateSettings({ guideDismissed: true });
            return;
        }
        if (action === 'guide-restart') {
            this.updateSettings({ guideDismissed: false, playerMarker: true });
            this.ui.closeDialog();
            return;
        }
        if (action === 'guide-garden') {
            this.travel(this.availableTopics()[0], this.movedDistance < .6);
            return;
        }
        if (action === 'guide-controls') {
            this.ui.showControls();
            return;
        }
        if (action === 'audio-enable') {
            this.updateSettings({ muted: false });
            void this.soundscape.unlock().then(ok => { if (ok)
                this.cue('water');
            else
                this.ui.toast('浏览器暂未启用声音。文字和所有操作仍可使用。'); });
            return;
        }
        if (action === 'audio-preview') {
            if (this.data.settings.muted) {
                this.ui.toast('当前为静音；取消静音后可试听。');
                return;
            }
            void this.soundscape.unlock().then(ok => { if (ok)
                this.cue('glass');
            else
                this.ui.toast('声音暂不可用；不影响探索。'); });
            return;
        }
        if (action === 'resume-draft') {
            const d = structuredClone(this.data.draft);
            if (!d)
                return;
            this.travel(d.topic, true);
            this.loadConditions(d.params);
            this.session.autoPick = d.autoPick;
            this.session.layer = d.layer;
            this.ui.renderExperiment();
            this.buildLabels();
            return;
        }
        if (action === 'restore-backup') {
            try {
                this.store.restoreBackup();
                this.adoptStore();
                this.ui.toast('已恢复自动备份。');
            }
            catch (e) {
                this.ui.toast(e.message);
            }
            return;
        }
        if (action === 'apply-scenario') {
            const c = SCENARIOS.find(c => c.id === value);
            if (!c)
                return;
            if (!s || s.topic !== c.topic)
                this.travel(c.topic, true);
            this.voice.stop();
            loadScenario(this.session, value);
            this.captureDraft();
            this.ui.renderExperiment();
            this.buildLabels();
            this.ui.toast(c.prompt);
            return;
        }
        if (action === 'restore-conditions') {
            const o = this.data.observations.find(o => o.id === value);
            if (o && s?.topic === o.topic) {
                this.loadConditions(o.params);
                this.captureDraft();
                this.ui.renderExperiment();
                this.buildLabels();
                this.ui.toast('已取回参考条件；只改变一项，再观察。已保存记录不会改变。');
            }
            return;
        }
        if (action.startsWith('env-')) {
            if (!this.environment.current)
                return;
            const a = action.slice(4), id = this.environment.current;
            if (a === 'exit') {
                this.exitExploration();
                return;
            }
            if (a === 'save') {
                this.environment.note(new Date().toISOString());
                const saved = this.store.save();
                this.ui.toast(saved ? '这段散步已记下。它与科普观察分开保存。' : '散步记录保留在本次会话；浏览器不允许持久存储。');
            }
            else if (a === 'platform') {
                this.renderer.camera.desired = [...places[id].center];
                this.cameraLayout();
            }
            else if (this.environment.act(a, value)) {
                if (id === 'lookout' && a === 'view') {
                    this.renderer.camera.desired = [...VIEW_TARGETS[this.data.environment.view]];
                    this.renderer.camera.desiredHeight = innerWidth <= 960 ? 7 : 8;
                }
                if (a === 'reset') {
                    this.renderer.camera.desired = [...places[id].center];
                    this.cameraLayout();
                }
                this.store.save();
            }
            this.ui.renderExploration();
            this.buildLabels();
            this.cue(a === 'save' ? 'paper' : id === 'waterwheel' ? 'water' : 'wood');
            return;
        }
        if (action === 'exit') {
            this.exit();
            return;
        }
        if (action === 'persist') {
            this.store.save();
            return;
        }
        if (action === 'refresh') {
            this.savedKey = '';
            this.ui.renderExperiment();
            this.buildLabels();
            return;
        }
        if (action === 'zoom-in') {
            this.zoom(.84);
            return;
        }
        if (action === 'zoom-out') {
            this.zoom(1.19);
            return;
        }
        if (action === 'rotate-left' || action === 'rotate-right') {
            this.renderer.camera.yaw = clamp(this.renderer.camera.yaw + (action === 'rotate-left' ? -.12 : .12), .24, 1.14);
            return;
        }
        if (action === 'home-view') {
            if (this.environment.current) {
                this.renderer.camera.desired = [...places[this.environment.current].center];
                this.cameraLayout();
                return;
            }
            if (s) {
                this.renderer.camera.desired = [...STATIONS[s.topic].center];
                this.cameraLayout();
            }
            else
                this.homeView();
            return;
        }
        if (!s)
            return;
        let changed = false;
        if (s.topic === 'buoyancy' && action === 'float-mass' && Number.isFinite(Number(value))) {
            s.buoyancy.mass = clamp(Number(value), .5, 4);
            changed = true;
        }
        else if (s.topic === 'buoyancy' && action === 'float-volume' && Number.isFinite(Number(value))) {
            s.buoyancy.volume = clamp(Number(value), 1, 6);
            changed = true;
        }
        else if (s.topic === 'buoyancy' && action === 'float-liquid' && ['fresh', 'salt'].includes(value)) {
            s.buoyancy.liquid = value;
            changed = true;
        }
        else if (s.topic === 'buoyancy' && action === 'float-neutral') {
            s.buoyancy = { mass: 2, volume: 2, liquid: 'fresh' };
            changed = true;
        }
        else if (s.topic === 'shadow' && action === 'shadow-object' && Number.isFinite(Number(value))) {
            s.shadow.objectDistance = clamp(Number(value), .8, 2);
            changed = true;
        }
        else if (s.topic === 'shadow' && action === 'shadow-screen' && Number.isFinite(Number(value))) {
            s.shadow.screenDistance = clamp(Number(value), 2.5, 4);
            changed = true;
        }
        else if (s.topic === 'shadow' && action === 'shadow-puppet' && ['owl', 'leaf'].includes(value)) {
            s.shadow.puppet = value;
            changed = true;
        }
        else if (s.topic === 'pulley' && action === 'pulley-strands' && ['1', '2', '4'].includes(value)) {
            s.pulley.strands = Number(value);
            changed = true;
        }
        else if (s.topic === 'pulley' && action === 'pulley-mass' && Number.isFinite(Number(value))) {
            s.pulley.mass = clamp(Number(value), 1, 4);
            changed = true;
        }
        else if (s.topic === 'pulley' && action === 'pulley-distance' && Number.isFinite(Number(value))) {
            s.pulley.pull = clamp(Number(value), .25, 2);
            changed = true;
        }
        else if (s.topic === 'honey' && action === 'honey-place' && ['shelf', 'bath'].includes(value)) {
            s.honey.place = value;
            changed = true;
        }
        else if (s.topic === 'honey' && action === 'honey-profile' && ['glucose-rich', 'fructose-rich'].includes(value)) {
            s.honey.profile = value;
            changed = true;
        }
        else if (s.topic === 'honey' && action === 'honey-initial' && ['seeded', 'clear'].includes(value)) {
            s.honey.initial = value;
            changed = true;
        }
        else if (action === 'honey-cutaway' && s.topic === 'honey') {
            s.flip = !s.flip;
            s.layer = true;
        }
        else if (s.topic === 'optics' && action === 'medium' && ['air', 'water', 'glass'].includes(value)) {
            s.optics.medium = value;
            changed = true;
        }
        else if (s.topic === 'optics' && (action === 'incident' || action === 'incident-step') && Number.isFinite(Number(value))) {
            s.optics.angle = clamp(action === 'incident' ? Number(value) : s.optics.angle + Number(value), 0, 70);
            changed = true;
        }
        else if (s.topic === 'balance' && ['left-mass', 'right-mass', 'left-distance', 'right-distance'].includes(action) && Number.isInteger(Number(value))) {
            const key = { 'left-mass': 'leftMass', 'right-mass': 'rightMass', 'left-distance': 'leftDistance', 'right-distance': 'rightDistance' }[action];
            s.balance[key] = clamp(Number(value), 1, action.endsWith('mass') ? 4 : 3);
            changed = true;
        }
        else if (s.topic === 'sound' && (action === 'string-length' || action === 'length-step') && Number.isFinite(Number(value))) {
            s.sound.length = clamp(Math.round((action === 'string-length' ? Number(value) : s.sound.length + Number(value)) * 10) / 10, .3, .9);
            changed = true;
        }
        else if (s.topic === 'sound' && action === 'tension' && ['40', '80'].includes(value)) {
            s.sound.tension = Number(value);
            changed = true;
        }
        else if (s.topic === 'sound' && action === 'amplitude' && ['1', '2'].includes(value)) {
            s.sound.amplitude = Number(value);
            changed = true;
        }
        else if (action === 'support-layer') {
            s.layer = true;
            s.deepLayer = s.deepLayer === 'sky' ? 'all' : 'sky';
        }
        else if (s.topic === 'sound' && action === 'pluck') {
            s.layer = true;
            s.start();
            this.playString();
        }
        else if (action === 'weather' && ['sunny', 'cloudy'].includes(value)) {
            s.uv.weather = value;
            changed = true;
        }
        else if (action === 'probe') {
            s.uv.probe = clamp(Number(value), 0, 2);
            changed = true;
        }
        else if (action === 'shade') {
            s.uv.shade = clamp(Number(value), -1, 2);
            changed = true;
        }
        else if (action === 'food' && ['bread', 'watermelon'].includes(value)) {
            s.food.food = value;
            changed = true;
        }
        else if (action === 'surface' && ['tile', 'carpet'].includes(value)) {
            s.food.surface = value;
            changed = true;
        }
        else if (action === 'pick-time') {
            s.autoPick = value === 'manual' ? null : clamp(Number(value), .1, 300);
            changed = true;
        }
        else if (action === 'scenario' && ['ordinary', 'greasy'].includes(value)) {
            s.hands.scenario = value;
            changed = true;
        }
        else if (action === 'method' && ['water', 'soap', 'sanitiser'].includes(value)) {
            s.hands.method = value;
            changed = true;
        }
        else if (action === 'layer')
            s.layer = !s.layer;
        else if (action === 'path-layer' && ['all', 'direct', 'sky'].includes(value))
            s.deepLayer = value;
        else if (action === 'flip')
            s.flip = !s.flip;
        else if (action === 'speed')
            s.speed = value === '5' ? 5 : 1;
        else if (action === 'observe' || action === 'drop') {
            if (s.phase === 'ready' || s.phase === 'observed') {
                this.savedKey = '';
                if (isPhysics(s.topic))
                    s.layer = true;
                s.start();
            }
        }
        else if (action === 'pickup')
            s.pickup();
        else if (action === 'rub') {
            s.rub(Number(value), 1 / 3);
            if (Number(value) === 5)
                s.flip = true;
        }
        else if (action === 'finish')
            s.finishHands();
        else if (action === 'pause')
            s.paused = !s.paused;
        else if (action === 'reset')
            s.reset();
        else if (action === 'replay') {
            this.savedKey = '';
            const last = this.data.observations.filter(o => o.topic === s.topic).at(-1);
            s.replay(last?.params);
        }
        if (changed) {
            this.voice.stop();
            s.changed();
            this.savedKey = '';
        }
        if (action === 'pause' || action === 'reset')
            this.voice.stop();
        if (action === 'replay' && s.topic === 'sound')
            this.playString();
        this.captureDraft();
        if (action !== 'pluck')
            this.cue(action === 'observe' && s.topic === 'buoyancy' ? 'water' : action.startsWith('honey-') ? 'glass' : ['method', 'finish', 'pickup'].includes(action) ? 'water' : action.endsWith('distance') || action.endsWith('mass') ? 'wood' : 'touch');
        this.ui.renderExperiment();
        this.buildLabels();
    }
    saveObservation() {
        const s = this.session;
        if (!s || s.phase !== 'observed')
            return;
        const key = JSON.stringify([s.topic, s.params(), s.elapsed]);
        if (this.savedKey === key) {
            this.ui.toast('这次条件已保存；改变一项后再观察。');
            return;
        }
        this.savedKey = key;
        const observation = cloneObservation(s.topic, s.params(), `${Date.now()}-${this.sessionNonce}-${++this.observedId}`, new Date().toISOString());
        this.data.observations.push(observation);
        if (this.data.observations.length > 120)
            this.data.observations.shift();
        const saved = this.store.save();
        this.ui.toast(saved ? '这次观察已记入发现簿。改变一项条件，再保存一次。' : '观察已记在本次会话中；浏览器没有允许持久保存。');
        this.cue('paper');
    }
    updateSettings(settings) {
        if (settings.muted || settings.volume !== undefined)
            this.voice.stop();
        Object.assign(this.data.settings, settings);
        this.syncAudio();
        if (settings.quality)
            this.autoQualityUsed = true;
        this.renderer.quality = this.data.settings.quality;
        this.renderer.resize();
        this.store.save();
        this.ui.updateHeader();
        if (settings.depth)
            this.ui.renderExperiment();
    }
    clearProgress() { this.setInspection(false); this.voice.stop(); this.session = null; this.environment.exit(); this.store.clear(); this.travelSave.clear(); this.adoptStore(); if (this.travelSave.notice)
        this.ui.toast(this.travelSave.notice); }
    loadConditions(params) {
        const s = this.session;
        if (!s)
            return;
        this.voice.stop();
        s.replay(params);
        if (s.topic === 'hands')
            s.hands = structuredClone(params);
        s.phase = 'ready';
        s.elapsed = 0;
        s.paused = false;
        s.route = null;
        s.rubZone = -1;
        if (s.topic === 'food')
            s.food.seconds = 0;
    }
    captureDraft() { const s = this.session; if (s)
        this.data.draft = { topic: s.topic, params: structuredClone(s.params()), autoPick: s.autoPick, layer: s.layer }; }
    exportSave() { this.captureDraft(); return JSON.stringify({ ...this.data, travelPassport: this.travelSave.exportData() }, null, 2); }
    importSave(raw) {
        const decoded = parseBackup(raw);
        const envelope = JSON.parse(raw);
        const hasTravel = typeof envelope === 'object' && envelope !== null && !Array.isArray(envelope) && Object.prototype.hasOwnProperty.call(envelope, 'travelPassport');
        const passport = hasTravel ? parsePassportBackup(envelope.travelPassport) : null;
        if (this.store.readOnly || this.store.checkExternal())
            throw Error(this.store.notice || '本地科普存档当前为只读状态。');
        const oldPassport = this.travelSave.exportData();
        if (passport)
            this.travelSave.import(passport);
        try {
            this.setInspection(false);
            this.store.import(JSON.stringify(decoded.data));
        }
        catch (error) {
            if (passport)
                try {
                    this.travelSave.import(oldPassport);
                }
                catch { }
            throw error;
        }
        this.adoptStore();
    }
    recoverSession(raw) { this.store.recoverSession(raw); this.adoptStore(); }
    adoptStore() {
        if (this.ui.isDialogOpen())
            this.ui.closeDialog();
        this.voice.stop();
        this.session = null;
        this.path = [];
        this.pending = null;
        this.pendingPlace = null;
        this.scenicReturn = null;
        this.clearInput();
        this.data = this.store.data;
        this.syncAudio();
        this.savedKey = '';
        this.environment = new EnvironmentSession(this.data.environment);
        if (this.region) {
            this.world = this.townWorld;
            this.region = null;
            this.renderer.setLandscape(this.world.landscape);
        }
        this.player = this.world.navigation.nearest(...this.data.position) ?? [0, 1.8];
        this.townPosition = [...this.player];
        this.syncRegionUI();
        this.renderer.quality = this.data.settings.quality;
        this.renderer.setStatic(this.world.static);
        this.ui.exit();
        this.homeView();
        this.ui.updateHeader();
        this.buildLabels();
    }
    storageStatus() { return this.travelSave.notice || (this.store.readOnly ? this.store.notice : this.store.notice.includes('失败') || this.store.notice.includes('不可用') || this.store.notice.includes('限制') ? this.store.notice : '本机自动保存已启用；重要记录建议另行导出。'); }
    diagnostics() { return JSON.stringify({ app: 'Actually, Not!', version: '1.1.1', saveVersion: this.data.version, graphics: this.renderer.info(), audio: this.soundscape.info(), build: document.querySelector('meta[name=town-build]')?.getAttribute('content'), records: this.data.observations.length, readOnly: this.store.readOnly, conflict: this.store.conflict, travelReadOnly: this.travelSave.readonly, travelConflict: this.travelSave.conflict, viewport: [innerWidth, innerHeight], devicePixelRatio, online: navigator.onLine, userAgent: navigator.userAgent, limitations: 'Local diagnostic snapshot, not a performance benchmark or uploaded telemetry.' }, null, 2); }
    playString() {
        if (this.data.settings.muted || this.data.settings.volume <= 0)
            return;
        void this.voice.play(this.session.sound, this.data.settings.volume).then(ok => { if (!ok && !this.disposed)
            this.ui.toast('浏览器未启用声音，仍可通过弦的变化与基频读数完成探索。'); });
        if (this.data.settings.captions) {
            this.ui.root.setAttribute('data-sound-caption', '理想弦基频合成音 · 非真实乐器录音');
            clearTimeout(this.audioTimer);
            this.audioTimer = window.setTimeout(() => this.ui.root.removeAttribute('data-sound-caption'), 2000);
        }
    }
    syncAudio() { const s = this.data.settings; this.soundscape.configure(s.muted, s.volume, s.ambience); }
    cue(kind) {
        if (this.data.settings.muted)
            return;
        this.soundscape.cue(kind);
        if (this.data.settings.captions) {
            clearTimeout(this.audioTimer);
            this.ui.root.setAttribute('data-sound-caption', CUES[kind].caption);
            this.audioTimer = window.setTimeout(() => this.ui.root.removeAttribute('data-sound-caption'), 1500);
        }
    }
    sound() { this.cue('touch'); }
    persistPosition() { this.captureDraft(); this.data.position = this.region ? [...this.townPosition] : [...this.player]; const ok = this.store.save(); if (!ok && this.store.notice !== this.statusNotice) {
        this.statusNotice = this.store.notice;
        this.ui.toast(this.store.notice);
    } }
    buildLabels() {
        this.ui.labels.innerHTML = '';
        const s = this.session;
        const add = (text, action, value, kind = 'object-label') => { const b = document.createElement('button'); b.style.visibility = 'hidden'; b.className = kind; b.textContent = text; b.dataset.action = action; b.dataset.value = value; this.ui.labels.append(b); return b; };
        this.labelElements = [];
        if (this.environment.current) {
            const id = this.environment.current;
            this.labelElements.push(add(id === 'greenhouse' ? '天窗 · 点按开合' : id === 'waterwheel' ? '手轮 · 点按转动' : '望远镜 · 转向地标', 'env-' + ({ greenhouse: 'vent', waterwheel: 'gate', lookout: 'view' }[id]), id === 'greenhouse' ? 'toggle' : 'cycle'));
        }
        else if (!s) {
            for (const t of this.availableTopics()) {
                const b = add(STATIONS[t].name, '', '', 'station-label');
                b.addEventListener('click', () => this.travel(t, false));
                this.labelElements.push(b);
            }
            if (!this.region) {
                const home = add('中央科普小屋 · 发现簿', 'journal', '', 'station-label home-label');
                this.labelElements.push(home);
                for (const id of PLACE_IDS) {
                    const p = places[id], el = add(p.title, 'walk-place', id, 'station-label scenic-label');
                    this.labelElements.push(el);
                }
            }
        }
        else if (isPlay(s.topic)) {
            this.labelElements.push(add(s.topic === 'buoyancy' ? '密封小箱 · 点击入水' : s.topic === 'shadow' ? '小物偶 · 沿轨道拖动' : '绳柄 · 向下拖动', 'observe', ''));
        }
        else if (s.topic === 'honey') {
            this.labelElements.push(add('蜜罐 · 拖动到另一侧', 'honey-place', s.honey.place === 'shelf' ? 'bath' : 'shelf'));
        }
        else if (isPhysics(s.topic)) {
            if (s.topic === 'sound') {
                this.labelElements.push(add('琴码 · 拖动或切换', 'string-length', String(s.sound.length < .6 ? .6 : s.sound.length < .9 ? .9 : .3)), add('琴弦 · 点击拨动', 'pluck', ''));
            }
            else {
                const labels = s.topic === 'optics' ? ['投光器 · 拖动角度'] : ['左配重 · 沿杆拖动', '右配重 · 沿杆拖动'];
                for (const label of labels)
                    this.labelElements.push(add(label, 'observe', ''));
            }
        }
        else if (s.topic === 'uv') {
            this.labelElements.push(add('探头 · 按住拖动', 'probe', String(s.uv.probe)));
            this.labelElements.push(add('遮阳棚 · 按住拖动', 'shade', String(s.uv.shade)));
        }
        else if (s.topic === 'food') {
            this.labelElements.push(add(s.phase === 'contact' ? '接触中 · 点击拾起' : '食物 · 点击放开', s.phase === 'contact' ? 'pickup' : 'drop', ''));
        }
        else {
            const text = s.flip ? '手背观察 · 拖动搓擦' : '手部模型 · 按住搓擦';
            this.labelElements.push(add(text, 'flip', ''));
        }
    }
    positionLabels() {
        const s = this.session;
        let positions = [];
        if (this.environment.current)
            positions = [places[this.environment.current].handle];
        else if (!s)
            positions = this.region ? this.availableTopics().map(t => STATIONS[t].label) : [...TOPICS.map(t => STATIONS[t].label), [.1, 5, -6.2], ...PLACE_IDS.map(id => places[id].label)];
        else if (s.topic === 'buoyancy')
            positions = [floatPosition(s.buoyancy, staging(s.elapsed, s.phase === 'ready'))];
        else if (s.topic === 'shadow')
            positions = [shadowObject(s.shadow)];
        else if (s.topic === 'pulley')
            positions = [pulleyGrip(s.pulley, staging(s.elapsed, s.phase === 'ready'))];
        else if (s.topic === 'honey')
            positions = [jarPosition(s.honey)];
        else if (s.topic === 'optics')
            positions = [lampPosition(s.optics)];
        else if (s.topic === 'balance')
            positions = [weightPosition(s.balance, 'left', s.phase === 'ready' ? 0 : Math.min(1, s.elapsed / 1.7)), weightPosition(s.balance, 'right', s.phase === 'ready' ? 0 : Math.min(1, s.elapsed / 1.7))];
        else if (s.topic === 'sound') {
            const c = SCIENCE_SITES.sound, b = bridgePosition(s.sound);
            positions = [[b[0], c.y + 1.31, c.z + .6], [(c.x - 1.45 + b[0]) / 2, c.y + 1.55, c.z]];
        }
        else if (s.topic === 'uv')
            positions = [probePosition(s.uv.probe), shadePosition(s.uv.shade)];
        else if (s.topic === 'food')
            positions = [[8, .7 + s.foodHeight(), -1]];
        else
            positions = [[8, 2.8, 5.9]];
        const camera = this.renderer.camera;
        const compactActive = innerWidth <= 960 && Boolean(s || this.environment.current);
        const stageRect = this.ui.canvas.getBoundingClientRect();
        const controls = compactActive ? this.ui.root.querySelector('.view-controls')?.getBoundingClientRect() : null;
        this.labelElements.forEach((el, i) => {
            const point = positions[i];
            if (!point)
                return;
            const xy = camera.project(point);
            el.hidden = false;
            const width = el.offsetWidth, height = el.offsetHeight;
            let left = xy[0] - width / 2, top = xy[1] - 22 - height;
            if (compactActive) {
                left = clamp(left, 8, Math.max(8, camera.width - width - 8));
                top = Math.max(64, top);
                if (controls) {
                    const right = controls.right - stageRect.left, bottom = controls.bottom - stageRect.top;
                    const occluderLeft = controls.left - stageRect.left, occluderTop = controls.top - stageRect.top;
                    if (left < right + 8 && left + width > occluderLeft - 8 && top < bottom + 8 && top + height > occluderTop - 8) {
                        if (right + width + 16 < camera.width)
                            left = right + 8;
                        else
                            top = bottom + 8;
                    }
                }
            }
            el.style.transform = `translate(${left}px,${top}px)`;
            el.style.visibility = 'visible';
            if (!this.region && !s && !this.environment.current && i >= TOPICS.length + 1) {
                const id = PLACE_IDS[i - TOPICS.length - 1];
                el.style.visibility = Math.hypot(this.player[0] - places[id].approach[0], this.player[1] - places[id].approach[1]) < 4 || camera.halfHeight < 11 ? 'visible' : 'hidden';
            }
            if (!this.region && !s && !this.environment.current && i < TOPICS.length) {
                const t = TOPICS[i], d = Math.hypot(this.player[0] - STATIONS[t].approach[0], this.player[1] - STATIONS[t].approach[1]);
                el.style.visibility = d < 6 || this.pending === t || t === 'uv' && !this.data.observations.length ? 'visible' : 'hidden';
            }
            if (!this.region && !s && !this.environment.current && i === TOPICS.length)
                el.style.visibility = Math.hypot(this.player[0], this.player[1] + 4.7) < 5 ? 'visible' : 'hidden';
            el.hidden = xy[0] < -30 || xy[0] > camera.width + 30 || xy[1] < 0 || xy[1] > camera.height;
        });
    }
    positionPlayerMarker() {
        const e = this.ui.playerMarker, c = this.renderer.camera;
        e.hidden = Boolean(this.session || this.environment.current) || !this.data.settings.playerMarker;
        if (e.hidden)
            return;
        const xy = c.project([this.player[0], this.world.heightAt(...this.player) + 1.85, this.player[1]]);
        let x = clamp(xy[0], 64, c.width - 64);
        const y = clamp(xy[1] - 28, 96, c.height - 120);
        const edge = Math.abs(x - xy[0]) > 25 || Math.abs(y - (xy[1] - 28)) > 25;
        const text = e.querySelector('span');
        const label = edge ? '角色在画面外 · 用定位' : '你在这里';
        if (text.textContent !== label)
            text.textContent = label;
        x = clamp(xy[0], text.clientWidth / 2 + 8, c.width - text.clientWidth / 2 - 8);
        e.style.transform = `translate(${x}px,${y}px)`;
        e.classList.toggle('offscreen', edge);
    }
    updateGuide() {
        if (this.region && !this.session)
            return;
        const s = this.session, records = s ? this.data.observations.filter(o => o.topic === s.topic).length : 0;
        const g = guideFor({ moved: this.movedDistance > .6, travelling: this.path.length > 0, active: Boolean(s), observed: s?.phase === 'observed', savedCurrent: s ? this.savedKey === JSON.stringify([s.topic, s.params(), s.elapsed]) : false, running: Boolean(s && s.phase !== 'ready' && s.phase !== 'observed'), records, compared: Boolean(s && this.data.compared.includes(s.topic)), returning: this.data.observations.length > 0 });
        this.guideStage = g.stage;
        this.ui.renderGuide(g);
    }
    loop = (now) => {
        if (this.disposed)
            return;
        try {
            if (this.atlas) {
                this.last = now;
                this.frame = requestAnimationFrame(this.loop);
                return;
            }
            const delta = this.last ? (now - this.last) / 1000 : 0;
            this.last = now;
            const dt = document.hidden ? 0 : Math.min(delta, 2);
            if (delta > 0)
                this.frames.push(delta * 1000);
            if (this.frames.length > 240)
                this.frames.shift();
            this.time += dt;
            const oldPlayer = [...this.player];
            this.walking = false;
            if (!this.session && !this.environment.current && !this.ui.isDialogOpen()) {
                const c = this.renderer.camera;
                let ax = (this.keys.has('d') || this.keys.has('arrowright') ? 1 : 0) - (this.keys.has('a') || this.keys.has('arrowleft') ? 1 : 0), az = (this.keys.has('s') || this.keys.has('arrowdown') ? 1 : 0) - (this.keys.has('w') || this.keys.has('arrowup') ? 1 : 0);
                if (ax || az) {
                    const l = Math.hypot(ax, az);
                    ax /= l;
                    az /= l;
                    const dx = (c.right[0] * ax + Math.sin(c.yaw) * az) * 3.6 * dt, dz = (c.right[2] * ax + Math.cos(c.yaw) * az) * 3.6 * dt;
                    this.player = this.world.navigation.move(this.player, dx, dz);
                    this.heading = Math.atan2(dx, dz);
                    this.walking = true;
                }
                else if (this.path.length) {
                    const movement = this.world.navigation.follow(this.player, this.path, dt);
                    this.player = movement.position;
                    this.walking = movement.walking;
                    if (this.walking)
                        this.heading = movement.heading;
                    if (movement.blocked)
                        this.ui.toast('前面有物件挡住了，换一条步道试试。');
                }
                if (this.pendingPlace && !this.path.length) {
                    const id = this.pendingPlace;
                    this.pendingPlace = null;
                    if (Math.hypot(this.player[0] - places[id].approach[0], this.player[1] - places[id].approach[1]) < 1.2)
                        this.enterExploration(id);
                    else
                        this.ui.toast('停在了可达位置，可以从地图直接前往。');
                }
                if (this.walking && !this.environment.current && !this.session) {
                    const xy = c.project([this.player[0], this.world.heightAt(...this.player) + .8, this.player[1]]);
                    if (xy[0] < c.width * .16 || xy[0] > c.width * .83 || xy[1] < c.height * .23 || xy[1] > c.height * .72) {
                        c.desired = [this.player[0] * .65 + c.desired[0] * .35, .5, this.player[1] * .65 + c.desired[2] * .35];
                    }
                }
                if (this.pending && !this.path.length) {
                    const t = this.pending;
                    if (Math.hypot(this.player[0] - STATIONS[t].approach[0], this.player[1] - STATIONS[t].approach[1]) < 1.2)
                        this.enter(t);
                    else {
                        this.pending = null;
                        this.ui.toast('已停在可达位置。可以用直接前往进入装置。');
                    }
                }
            }
            const travelled = Math.hypot(this.player[0] - oldPlayer[0], this.player[1] - oldPlayer[1]);
            if (travelled < 4 && !this.session && !this.environment.current) {
                this.movedDistance += travelled;
                this.soundscape.walk(travelled, isBridge(this.player[1]) && Math.abs(this.player[0] - riverX(this.player[1])) < 1.6);
            }
            this.soundscape.location(this.player[0] - riverX(this.player[1]), Boolean(this.session || this.environment.current));
            const s = this.session, phase = s?.phase;
            if (s && !this.ui.isDialogOpen() && !this.inspection.active) {
                s.tick(dt);
                if (phase !== s.phase) {
                    this.ui.renderExperiment();
                    this.buildLabels();
                }
            }
            const visualTime = window.__TOWN_TEST__?.fixedTime ?? (this.data.settings.reducedMotion ? 0 : this.time);
            this.renderer.camera.update(dt, this.data.settings.reducedMotion);
            this.world.update(s, this.player, this.heading, this.walking ? 1 : 0, visualTime, this.data.settings.reducedMotion);
            if (!this.ui.isDialogOpen())
                this.environment.tick(dt, this.data.settings.reducedMotion);
            if (!this.region)
                drawExploration(this.world.dynamic, this.environment, window.__TOWN_TEST__?.fixedTime);
            this.renderer.render(this.world.dynamic, visualTime, s?.topic === 'uv' && s.uv.weather === 'cloudy' ? 1 : 0);
            this.renders++;
            this.positionLabels();
            this.positionPlayerMarker();
            this.labelClock += dt;
            if (this.labelClock > .09) {
                this.ui.tick();
                this.updateGuide();
                this.labelClock = 0;
            }
            this.saveClock += dt;
            if (this.saveClock > 12) {
                this.persistPosition();
                this.saveClock = 0;
            }
            if (!this.autoQualityUsed && this.time > 5 && this.frames.length > 15 && this.renderer.quality === 'high') {
                const recent = this.frames.slice(-15).sort((a, b) => a - b);
                if (recent[7] > 70) {
                    this.autoQualityUsed = true;
                    this.data.settings.quality = 'low';
                    this.renderer.quality = 'low';
                    this.renderer.resize();
                    this.ui.toast('检测到渲染较慢，已切到轻量画质；可在设置中改回。');
                }
            }
            this.frame = requestAnimationFrame(this.loop);
        }
        catch (error) {
            console.error('Town runtime error', error);
            this.fail();
        }
    };
    fail() {
        if (this.disposed)
            return;
        const backup = this.exportSave();
        this.dispose();
        this.failure(backup);
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        this.atlas?.dispose();
        this.atlas = null;
        clearTimeout(this.audioTimer);
        cancelAnimationFrame(this.frame);
        this.abort.abort();
        this.ui.dispose();
        this.renderer.dispose();
        this.voice.dispose();
        this.soundscape.dispose();
        delete window.__town;
    }
}