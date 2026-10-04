import { balance, optics, soundModel, stringDisplacement } from '../experiments/physics.js';
export const SCIENCE_SITES = {
    balance: { x: 15.5, z: -7.3, y: .32, title: '平衡工坊' },
    sound: { x: 16, z: 2.6, y: .32, title: '弦音花亭' },
    optics: { x: 13.7, z: 10.4, y: .32, title: '光路水庭' }
};
export function nearScience(x, z) {
    return Object.values(SCIENCE_SITES).some(p => Math.abs(p.x - x) < 3.8 && Math.abs(p.z - z) < 3.4);
}
export function rod(b, a, c, width, colour) {
    const dx = c[0] - a[0], dy = c[1] - a[1], dz = c[2] - a[2], length = Math.hypot(dx, dy, dz);
    if (length < 1e-6)
        return;
    b.add('cylinder', (a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2, width, length, width, colour, Math.acos(dy / length), Math.atan2(dx, dz));
}
const wood = '#b39069', cream = '#eee3c7', metal = '#617f82', ink = '#5b7274';
export const opticsOrigin = () => { const p = SCIENCE_SITES.optics; return [p.x, p.y + 1.19, p.z]; };
export function lampPosition(p) {
    const c = opticsOrigin(), a = p.angle * Math.PI / 180;
    return [c[0] - Math.sin(a) * 1.7, c[1] + .18, c[2] - Math.cos(a) * 1.7];
}
export function weightPosition(p, side, progress = 0) {
    const c = SCIENCE_SITES.balance, angle = balance.evaluate(p).visualTilt * progress;
    const dx = (side === 'left' ? -1 : 1) * p[`${side}Distance`] * .65;
    return [c.x + dx * Math.cos(angle), c.y + 1.65 + dx * Math.sin(angle), c.z];
}
export function bridgePosition(p) { const c = SCIENCE_SITES.sound; return [c.x - 1.45 + p.length * 3.1, c.y + 1.28, c.z]; }
export function scienceStatic(b, nav) {
    for (const [id, c] of Object.entries(SCIENCE_SITES)) {
        // Low deck with a generous open front, repeatable step height, and actual table collision.
        b.add('cylinder', c.x, c.y - .05, c.z, 6.0, .19, 5.0, '#d9cfaf');
        b.add('cylinder', c.x, c.y + .06, c.z, 5.68, .08, 4.7, '#e6dbc0');
        for (let i = -3; i <= 3; i++)
            b.add('box', c.x + i * .63, c.y + .11, c.z + 1.9, .58, .025, .65, i % 2 ? '#cbb493' : '#d6c09e');
        for (const side of [-1, 1]) {
            const x = c.x + side * 2.4, z = c.z - 1.7;
            b.add('box', x, c.y + 1.63, z, .16, 3.15, .16, wood);
            b.add('box', x, c.y + .35, z, .29, .48, .29, cream);
            nav.obstacles.push({ x, z, w: .22, d: .22 });
            b.add('box', x, c.y + .32, c.z + 1.45, .83, .5, .75, wood);
            b.add('box', x, c.y + .6, c.z + 1.45, .76, .04, .67, '#787c58');
            for (let f = 0; f < 5; f++) {
                const xx = x + .24 * Math.sin(f * 2), zz = c.z + 1.45 + .2 * Math.cos(f * 2);
                b.add('cylinder', xx, c.y + .8, zz, .04, .45, .04, '#78936d');
                b.add('sphere', xx, c.y + 1.02, zz, .22, .16, .22, id === 'optics' ? '#bbd8d5' : id === 'balance' ? '#efdca3' : '#d5b6c8');
            }
        }
        b.add('box', c.x, c.y + 3.13, c.z - 1.7, 5.0, .22, .2, wood);
        // Cutaway roofs lift out of the active experiment, not an opaque wall in front of it.
        if (id === 'balance') {
            b.add('roof', c.x, c.y + 3.49, c.z - .8, 5.5, .72, 3.1, '#c29673', 0, 0, 0, 0, id);
            for (let i = -3; i <= 3; i++)
                b.add('box', c.x + i * .7, c.y + 2.8, c.z - 1.7, .07, .6, .09, cream);
        }
        else if (id === 'sound') {
            for (let i = 0; i < 8; i++)
                b.add('box', c.x - 2.45 + i * .7, c.y + 3.17, c.z - .65, .16, .14, 2.85, wood, 0, 0, 0, 0, id);
            for (let i = -3; i <= 3; i++)
                b.add('sphere', c.x + i * .69, c.y + 3.27, c.z - 1.85, .91, .34, .62, '#90a887', 0, 0, 0, 1, id);
        }
        else {
            b.add('box', c.x, c.y + 2.58, c.z - 1.7, 1.75, .62, .11, cream);
            for (let i = 0; i < 6; i++)
                b.add('box', c.x - .7 + i * .28, c.y + 2.59, c.z - 1.62, .14, .27 + i * .035, .06, ['#d9ab8e', '#e6c986', '#bad0ac', '#9fc4c3', '#96b5c7', '#bbacc8'][i]);
        }
        // Different tabletop shapes make the machines recognisable even without labels.
        b.add('box', c.x, c.y + 1.05, c.z, 4.75, .16, id === 'optics' ? 3.7 : 1.55, id === 'sound' ? '#bba17a' : cream);
        for (const x of [-1.9, 1.9])
            for (const z of [-.55, .55])
                b.add('box', c.x + x, c.y + .53, c.z + z, .17, 1.0, .17, wood);
        nav.obstacles.push({ x: c.x, z: c.z, w: 4.7, d: id === 'optics' ? 3.7 : 1.55 });
        b.add('box', c.x, c.y + .56, c.z - 1.3, 2.7, .12, .4, '#baa07c');
        for (let i = 0; i < 4; i++)
            b.add('box', c.x - .95 + i * .63, c.y + .76, c.z - 1.3, .37, .28, .3, i % 2 ? '#96b6af' : '#d6bc95');
    }
}
export function drawScience(b, s, reduced, allowedOrOmit = false) {
    const op = s?.topic === 'optics' ? s.optics : optics.defaults(), bo = s?.topic === 'balance' ? s.balance : balance.defaults(), sp = s?.topic === 'sound' ? s.sound : soundModel.defaults();
    const allowed = Array.isArray(allowedOrOmit) ? new Set(allowedOrOmit) : null, omitOptics = typeof allowedOrOmit === 'boolean' ? allowedOrOmit : false;
    if ((!allowed && !omitOptics) || allowed?.has('optics')) {
        const oc = opticsOrigin(), lamp = lampPosition(op), active = s?.topic === 'optics';
        // A top-down ray bench: upper half is air, lower half is a removable medium cassette.
        b.add('box', oc[0], oc[1] - .025, oc[2] - .9, 4.25, .06, 1.77, '#e5dfcb');
        b.add('box', oc[0], oc[1], oc[2] + .83, 4.25, .12, 1.65, op.medium === 'water' ? '#a4c8cd' : op.medium === 'glass' ? '#bbcac7' : '#e5dfcb');
        b.add('box', oc[0], oc[1] + .075, oc[2], 4.25, .055, .045, metal);
        for (const x of [-2.2, 2.2])
            b.add('box', oc[0] + x, oc[1] + .075, oc[2] + .86, .06, .15, 1.75, wood);
        for (let i = 0; i <= 14; i++) {
            const a = i / 14 * Math.PI / 2;
            b.add('sphere', oc[0] - Math.sin(a) * 1.73, oc[1] + .075, oc[2] - Math.cos(a) * 1.73, .075, .03, .075, ink);
        }
        b.add('cylinder', lamp[0], lamp[1] - .05, lamp[2], .48, .15, .48, wood);
        rod(b, [lamp[0], lamp[1], lamp[2]], [lamp[0] + Math.sin(op.angle * Math.PI / 180) * .4, lamp[1], lamp[2] + Math.cos(op.angle * Math.PI / 180) * .4], .23, metal);
        if (active && s.layer) {
            const result = optics.evaluate(op), a = result.refractedAngle * Math.PI / 180;
            const running = s.phase !== 'ready', t = running ? Math.min(1, s.elapsed / 1.5) : 1;
            for (let i = -8; i <= 8; i++)
                b.add('box', oc[0], oc[1] + .13, oc[2] + i * .19, .035, .025, .09, '#567579');
            rod(b, [lamp[0], oc[1] + .14, lamp[2]], [oc[0], oc[1] + .14, oc[2]], .045, '#ac8050');
            rod(b, [oc[0], oc[1] + .14, oc[2]], [oc[0] + Math.sin(a) * 1.6 * t, oc[1] + .14, oc[2] + Math.cos(a) * 1.6 * t], .048, '#587f94');
            b.add('sphere', oc[0], oc[1] + .15, oc[2], .13, .055, .13, '#f2ebca');
        }
    }
    if (!allowed || allowed.has('balance')) {
        const bc = SCIENCE_SITES.balance, progress = s?.topic === 'balance' && s.phase !== 'ready' ? Math.min(1, s.elapsed / 1.7) : 0;
        const tilt = balance.evaluate(bo).visualTilt * progress, pivot = [bc.x, bc.y + 1.65, bc.z];
        b.add('roof', bc.x, bc.y + 1.4, bc.z, .8, .56, .64, metal);
        b.add('box', ...pivot, 4.9, .13, .36, wood, 0, 0, tilt);
        b.add('cylinder', bc.x, pivot[1], bc.z + .21, .22, .53, .22, '#d1b276', Math.PI / 2);
        for (const side of ['left', 'right']) {
            const w = weightPosition(bo, side, progress), mass = bo[`${side}Mass`];
            for (let i = 0; i < mass; i++)
                b.add('cylinder', w[0], w[1] + .18 + i * .13, w[2], .56, .12, .56, side === 'left' ? '#9baea0' : '#cbb28d');
            b.add('ring', w[0], w[1] + .28 + mass * .13, w[2], .19, .19, .19, ink, Math.PI / 2);
            for (let d = 1; d <= 3; d++) {
                const dx = d * .65 * (side === 'left' ? -1 : 1);
                b.add('sphere', bc.x + dx * Math.cos(tilt), pivot[1] + dx * Math.sin(tilt) + .09, bc.z + .17, .09, .04, .075, ink);
            }
            if (s?.topic === 'balance' && s.layer) {
                rod(b, [w[0], w[1] + 1.15, w[2]], [w[0], w[1] + .68, w[2]], .045, ink);
                b.add('cone', w[0], w[1] + .61, w[2], .17, .22, .17, ink, Math.PI);
            }
        }
        if (s?.topic === 'balance' && s.layer && s.deepLayer === 'sky') {
            rod(b, [bc.x, bc.y + .45, bc.z + .45], [bc.x, bc.y + 1.4, bc.z + .45], .055, '#739585');
            b.add('cone', bc.x, bc.y + 1.43, bc.z + .45, .2, .28, .2, '#739585');
        }
    }
    if (!allowed || allowed.has('sound')) {
        const sc = SCIENCE_SITES.sound, bridge = bridgePosition(sp), startX = sc.x - 1.45, activeSound = s?.topic === 'sound';
        b.add('box', sc.x, sc.y + 1.18, sc.z, 3.7, .2, .92, '#c5a777');
        b.add('cylinder', sc.x, sc.y + 1.289, sc.z, .58, .024, .58, '#776a57');
        for (const x of [startX, bridge[0]])
            b.add('roof', x, sc.y + 1.37, sc.z, .14, .18, .75, '#e2d4ab');
        b.add('box', bridge[0], sc.y + 1.24, sc.z, .16, .19, 1.16, metal);
        b.add('sphere', bridge[0], sc.y + 1.31, sc.z + .6, .28, .16, .22, metal);
        b.add('cylinder', sc.x - 1.63, sc.y + 1.37, sc.z, .19, .27, .19, ink);
        b.add('box', sc.x - 1.63, sc.y + 1.53, sc.z, .4, .07, .15, ink, 0, sp.tension === 80 ? Math.PI / 3 : 0);
        const vibrating = activeSound && s.phase !== 'ready', elapsed = activeSound ? s.elapsed : 0;
        let previous = [startX, sc.y + 1.48, sc.z];
        for (let i = 1; i <= 36; i++) {
            const x = i / 36, offset = vibrating ? stringDisplacement(sp, x, elapsed, reduced) : 0;
            const next = [startX + (bridge[0] - startX) * x, sc.y + 1.48 + offset, sc.z];
            rod(b, previous, next, .028, '#647e81');
            previous = next;
        }
        rod(b, [bridge[0], sc.y + 1.48, sc.z], [sc.x + 1.65, sc.y + 1.48, sc.z], .012, '#8e8d78');
        if (activeSound && s.layer) {
            for (let i = 0; i <= 8; i++)
                b.add('box', startX + sp.length * 3.1 * i / 8, sc.y + 1.33, sc.z - .59, .025, .04, .14, ink);
            for (const x of [startX, bridge[0]])
                b.add('sphere', x, sc.y + 1.51, sc.z, .11, .11, .11, '#e4bc72');
        }
    }
}