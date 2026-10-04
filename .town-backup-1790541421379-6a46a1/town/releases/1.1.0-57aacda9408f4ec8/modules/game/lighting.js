/** Art-direction parameters, not photometric measurements or science-model inputs. */
import { cross, dot, norm } from './math.js';
export const LIGHTING = Object.freeze({
    mapSize: 2048,
    near: 1,
    far: 100,
    lightOffset: [-20, 40, 28],
    minimumRadius: 10,
    maximumRadius: 37,
    // Fixed world-space radius keeps close-up shadows from turning into sharp cut-outs.
    minimumPenumbra: 0.025,
    maximumPenumbra: 0.16,
    contactOpacityLow: 0.07,
    contactOpacityHigh: 0,
});
export const LIGHT_DIRECTION = norm(LIGHTING.lightOffset);
const right = norm(cross([0, 1, 0], LIGHT_DIRECTION));
const up = cross(LIGHT_DIRECTION, right);
/**
 * Stable orthographic shadow camera. The centre is snapped in LIGHT space, not world XZ.
 * The radius uses half-unit bands so subpixel camera easing does not rescale the map.
 * Zooming can change bands; this is not a cascaded or temporally accumulated solution.
 */
export function shadowFrustum(target, halfHeight, aspect) {
    const valid = target.map(v => Number.isFinite(v) ? v : 0);
    const h = Number.isFinite(halfHeight) ? Math.max(1, halfHeight) : 15;
    const a = Number.isFinite(aspect) ? Math.max(.1, aspect) : 1;
    const desired = h * Math.hypot(1, a) * .9 + 2;
    const radius = Math.min(LIGHTING.maximumRadius, Math.max(LIGHTING.minimumRadius, Math.ceil(desired * 2) / 2));
    const texelWorld = 2 * radius / LIGHTING.mapSize;
    const snap = (v) => Math.round(v / texelWorld) * texelWorld;
    const x = snap(dot(valid, right)), y = snap(dot(valid, up)), z = snap(dot(valid, LIGHT_DIRECTION));
    const centre = [0, 1, 2].map(i => right[i] * x + up[i] * y + LIGHT_DIRECTION[i] * z);
    const eye = centre.map((v, i) => v + LIGHTING.lightOffset[i]);
    return { radius, texelWorld, centre, eye, key: [radius, x, y, z].map(v => v.toFixed(6)).join(':') };
}
/** CPU equivalents used to test colour conversion and documented shadow bounds. */
export function srgbToLinear(v) {
    const c = Math.max(0, Math.min(1, v));
    return c <= .04045 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4);
}
export function linearToSrgb(v) {
    const c = Math.max(0, v);
    return c <= .0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - .055;
}
export function penumbraWorld(gap) {
    const g = Number.isFinite(gap) ? Math.max(0, gap) : 0;
    return Math.min(LIGHTING.maximumPenumbra, LIGHTING.minimumPenumbra + g * .032);
}
export function castsSceneShadow(flag) {
    return ![2, 6, 7, 8].includes(flag);
}