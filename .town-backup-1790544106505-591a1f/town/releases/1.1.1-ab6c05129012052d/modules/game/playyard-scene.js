import { dressDock, dressTheatre, dressShed, toyDuck, CRAFT } from './craft.js';
import { buoyancy, shadow, pulley, staging } from '../experiments/playyard.js';
export const PLAY_SITES = {
    buoyancy: { x: -11, z: 16.8, y: .32 }, shadow: { x: 1.4, z: 18.2, y: .32 }, pulley: { x: 13.2, z: 17.3, y: .32 }
};
const P = { wood: '#bb936e', light: '#e2caa1', cream: '#f6ebd3', teal: '#83aaa1', blue: '#a8cbd3', rose: '#dca798', dark: '#586d64', rope: '#d5b57b', petal: '#edc2b1' };
export function nearPlay(x, z) { return Object.values(PLAY_SITES).some(c => Math.abs(x - c.x) < 3.6 && Math.abs(z - c.z) < 3.5); }
export function rod(b, a, d, thickness, colour) {
    const v = [d[0] - a[0], d[1] - a[1], d[2] - a[2]], length = Math.hypot(...v);
    if (length < 1e-6)
        return;
    b.add('cylinder', (a[0] + d[0]) / 2, (a[1] + d[1]) / 2, (a[2] + d[2]) / 2, thickness, length, thickness, colour, Math.acos(v[1] / length), Math.atan2(v[0], v[2]));
}
export function blossom(b, x, y, z, size = .3, col = P.petal) {
    b.add('cylinder', x, y - size * .4, z, .035, size * .8, .035, '#6f9674');
    for (let j = 0; j < 5; j++) {
        const a = j * Math.PI * .4;
        b.add('soft', x + Math.cos(a) * size * .29, y, z + Math.sin(a) * size * .29, size * .44, size * .2, size * .44, col, 0, a, 0, 1);
    }
    b.add('soft', x, y + .035, z, size * .27, size * .2, size * .27, '#e7c27b');
    b.add('soft', x + size * .14, y - size * .35, z, .08, .03, size * .5, '#90ab79', 0, .6);
}
function pot(b, x, y, z, col = P.rose) {
    b.add('cylinder', x, y + .17, z, .43, .34, .43, col);
    b.add('torus', x, y + .35, z, .23, 1, .23, P.cream);
    for (let i = 0; i < 3; i++)
        blossom(b, x + (i - 1) * .13, y + .55 + (i % 2) * .1, z + Math.sin(i * 3) * .1, .3, i % 2 ? '#e7d1ab' : P.petal);
}
function rivets(b, x, y, z, w) { for (const d of [-1, 1])
    b.add('sphere', x + d * w, y, z, .055, .055, .045, '#846f59'); }
function deck(b, c, colour) {
    for (let i = 0; i < 19; i++) {
        const x = c.x + (i - 9) * .32;
        b.add('box', x, c.y + .06, c.z, .303, .12, 5.2, i % 3 === 0 ? '#d6ba92' : P.light);
        rivets(b, x, c.y + .125, c.z + 2.35, .045);
    }
    for (const side of [-1, 1]) {
        b.add('box', c.x + side * 2.75, c.y - .12, c.z, .18, .5, 5.05, P.wood);
        pot(b, c.x + side * 2.5, c.y + .12, c.z + 2.15, colour);
    }
    for (let i = 0; i < 3; i++)
        b.add('box', c.x, c.y - .03 - i * .08, c.z + 2.7 + i * .22, 1.7, .16, .44, P.light);
}
function bunting(b, a, d) {
    const pts = [];
    for (let i = 0; i <= 14; i++) {
        const t = i / 14;
        pts.push([a[0] + (d[0] - a[0]) * t, a[1] + (d[1] - a[1]) * t - .23 * Math.sin(Math.PI * t), a[2] + (d[2] - a[2]) * t]);
        if (i)
            rod(b, pts[i - 1], pts[i], .025, P.rope);
    }
    for (let i = 1; i < 14; i += 2) {
        const p = pts[i];
        b.add('roof', p[0], p[1] - .13, p[2], .22, .27, .035, [P.rose, P.teal, P.cream][i % 3], Math.PI);
    }
}
export function playStatic(b, nav) {
    for (const [id, c] of Object.entries(PLAY_SITES)) {
        deck(b, c, id === 'shadow' ? P.rose : P.teal);
        for (const sx of [-2.5, 2.5])
            for (const dz of [-2.25, 1.8]) {
                if (id === 'shadow' && dz === 1.8)
                    continue;
                b.add('box', c.x + sx, c.y + 1.8, c.z + dz, .15, 3.4, .15, P.light);
                b.add('sphere', c.x + sx, c.y + 3.57, c.z + dz, .25, .25, .25, P.cream);
                nav.obstacles.push({ x: c.x + sx, z: c.z + dz, w: .2, d: .2 });
            }
        bunting(b, [c.x - 2.5, c.y + 3.3, c.z - 2.25], [c.x + 2.5, c.y + 3.3, c.z - 2.25]);
        b.add('box', c.x, c.y + 3.25, c.z - 2.3, 5.35, .14, .15, P.wood);
        for (let i = 0; i < 5; i++) {
            b.add('box', c.x - 2.1 + i * 1.05, c.y + .5, c.z - 2.4, .94, .7, .08, i % 2 ? P.cream : P.teal);
        }
    }
    const c = PLAY_SITES.buoyancy;
    // Curved-edge nautical canopy. Individual slats, hems and small bolts, not a solid placeholder cube.
    for (let i = 0; i < 10; i++) {
        const x = c.x + (i - 4.5) * .5;
        b.add('box', x, c.y + 3.45, c.z - .25, .51, .065, 4.4, i % 2 ? P.cream : P.blue, .035, 0, 0, 0, 'buoyancy');
        b.add('sphere', x, c.y + 3.4, c.z + 1.95, .5, .28, .1, i % 2 ? P.cream : P.blue, 0, 0, 0, 0, 'buoyancy');
    }
    b.add('box', c.x, c.y + .43, c.z, 4.25, .5, 2.5, P.blue);
    b.add('box', c.x, c.y + .7, c.z, 3.95, .12, 2.22, '#88aeb6');
    for (const side of [-1, 1]) {
        b.add('box', c.x + side * 2.02, c.y + 1.3, c.z, .13, 1.3, 2.5, P.teal);
        b.add('box', c.x + side * 2.1, c.y + 1.97, c.z, .12, .12, 2.5, P.cream);
    }
    b.add('box', c.x, c.y + 1.3, c.z - 1.22, 4.1, 1.32, .12, P.blue);
    for (const side of [-1, 1]) {
        b.add('box', c.x, c.y + .79, c.z + side * 1.22, 4.2, .14, .13, P.cream);
        b.add('box', c.x, c.y + 1.97, c.z + side * 1.22, 4.2, .1, .12, P.cream);
    }
    for (let i = 0; i < 8; i++)
        b.add('box', c.x + 1.95, c.y + .91 + i * .13, c.z + 1.3, .16, .025, .04, P.dark);
    b.add('ring', c.x - 2.56, c.y + 1.65, c.z + 1.9, .42, .42, .42, P.cream, Math.PI / 2);
    b.add('ring', c.x - 2.56, c.y + 1.65, c.z + 1.92, .32, .32, .32, P.rose, Math.PI / 2);
    pot(b, c.x + 2.5, c.y + .1, c.z - .6);
    nav.obstacles.push({ x: c.x, z: c.z, w: 4.35, d: 2.6 });
    const sh = PLAY_SITES.shadow;
    // The new curved frame and curtains share the original footprint.
    for (const dx of [-1.8, 1.8]) {
        b.add('box', sh.x + dx, sh.y + .3, sh.z + 1.8, .9, .16, .55, P.rose);
        for (const sx of [-.3, .3])
            b.add('box', sh.x + dx + sx, sh.y + .13, sh.z + 1.8, .1, .3, .44, P.wood);
    }
    nav.obstacles.push({ x: sh.x, z: sh.z - 1.9, w: 4.9, d: .55 }, { x: sh.x, z: sh.z + .5, w: 1.5, d: 2.6 });
    const p = PLAY_SITES.pulley;
    for (const x of [-2.15, 1.8]) {
        b.add('box', p.x + x, p.y + 2.2, p.z, .24, 4.2, .32, P.wood);
        rod(b, [p.x + x, p.y + 2.8, p.z], [p.x + x * .65, p.y + 3.9, p.z], .1, P.light);
    }
    b.add('box', p.x - .18, p.y + 4.18, p.z, 4.8, .25, .44, P.teal);
    for (let i = 0; i < 10; i++)
        b.add('box', p.x - 2.45 + i * .5, p.y + 4.45, p.z, .48, .12, 2.2, i % 2 ? P.teal : '#96b8aa', .10, 0, 0, 0, 'pulley');
    b.add('box', p.x + 1.45, p.y + 1.15, p.z - 1.75, 1.5, 1.9, .6, P.cream);
    for (let y = 0; y < 3; y++) {
        b.add('box', p.x + 1.45, p.y + .55 + y * .52, p.z - 1.4, 1.34, .44, .07, P.teal);
        b.add('sphere', p.x + 1.45, p.y + .55 + y * .52, p.z - 1.34, .08, .08, .09, P.wood);
    }
    for (let i = 0; i < 3; i++)
        b.add('ring', p.x + 2.3, p.y + .26 + i * .04, p.z - .3, .35, 1, .35, P.rope);
    nav.obstacles.push({ x: p.x - .7, z: p.z, w: 3.2, d: 1.45 }, { x: p.x + 1.45, z: p.z - 1.75, w: 1.55, d: .68 });
    dressDock(b, c.x, c.y, c.z);
    dressTheatre(b, sh.x, sh.y, sh.z);
    dressShed(b, p.x, p.y, p.z);
}
export function floatPosition(p, progress) {
    const c = PLAY_SITES.buoyancy, r = buoyancy.evaluate(p), h = Math.cbrt(p.volume) * .45;
    const surface = c.y + 1.73, finalY = r.state === 'float' ? surface + h * (.5 - r.fraction) : r.state === 'neutral' ? surface - .48 : c.y + .79 + h / 2;
    return [c.x, c.y + 2.65 + (finalY - c.y - 2.65) * progress, c.z];
}
export function shadowObject(p) { const c = PLAY_SITES.shadow; return [c.x, c.y + 1.95, c.z + 1.7 - p.objectDistance * .85]; }
export function pulleyGrip(p, progress) { const c = PLAY_SITES.pulley; return [c.x + (p.strands === 1 ? .4 : p.strands === 2 ? -.2 : .2), c.y + 2.9 - p.pull * .75 * progress, c.z + .18]; }
function puppet(b, p, s, kind, shade = false) {
    const first = b.count;
    const col = shade ? '#5e6169' : P.wood;
    if (kind === 'leaf') {
        b.add('soft', p[0], p[1], p[2], s * .45, s, s * .065, col, 0, 0, -.25);
        if (!shade)
            rod(b, [p[0] - .12 * s, p[1] - .4 * s, p[2] + .055], [p[0] + .11 * s, p[1] + .4 * s, p[2] + .055], .018, P.cream);
        if (shade)
            for (let i = first; i < b.count; i++)
                b.items[i].flag = 6;
        return;
    }
    b.add('soft', p[0], p[1] - .12 * s, p[2], .58 * s, .7 * s, .075 * s, col);
    b.add('soft', p[0], p[1] + .19 * s, p[2], .64 * s, .54 * s, .075 * s, col);
    for (const sign of [-1, 1]) {
        b.add('cone', p[0] + sign * .22 * s, p[1] + .41 * s, p[2], .2 * s, .24 * s, .08 * s, col, 0, 0, -sign * .15);
        if (!shade) {
            b.add('soft', p[0] + sign * .14 * s, p[1] + .22 * s, p[2] + .04, .23 * s, .25 * s, .04, P.cream);
            b.add('soft', p[0] + sign * .13 * s, p[1] + .22 * s, p[2] + .075, .075 * s, .1 * s, .03, P.dark);
        }
    }
    for (const side of [-1, 1]) {
        b.add('soft', p[0] + side * .25 * s, p[1] - .1 * s, p[2] + .012 * s, .17 * s, .43 * s, .05 * s, col, 0, 0, -side * .12);
        if (!shade) {
            b.add('soft', p[0] + side * .13 * s, p[1] + .235 * s, p[2] + .1, .022 * s, .025 * s, .018 * s, '#f8f0d9');
        }
    }
    if (shade)
        for (let i = first; i < b.count; i++)
            b.items[i].flag = 6;
    if (!shade)
        b.add('cone', p[0], p[1] + .08 * s, p[2] + .05, .1 * s, .13 * s, .035, P.rose, 0, 0, Math.PI);
}
function wheel(b, x, y, z, r, angle) {
    b.add('cylinder', x, y, z, r * 2, .10, r * 2, P.wood, Math.PI / 2);
    b.add('torus', x, y, z + .07, r, r, r, P.light, Math.PI / 2);
    b.add('soft', x, y, z + .11, .12, .12, .08, P.teal);
    b.add('torus', x, y, z - .035, r * .94, r * .6, r * .94, CRAFT.brass, Math.PI / 2);
    for (let i = 0; i < 6; i++) {
        const a = angle + i * Math.PI / 3;
        rod(b, [x, y, z + .085], [x + Math.cos(a) * r * .82, y + Math.sin(a) * r * .82, z + .085], .035, P.cream);
    }
}
function arc(b, x, y, z, r, lower) {
    for (let i = 0; i < 16; i++) {
        const a = Math.PI + (lower ? 1 : -1) * Math.PI * i / 16, d = Math.PI + (lower ? 1 : -1) * Math.PI * (i + 1) / 16;
        rod(b, [x + Math.cos(a) * r, y + Math.sin(a) * r, z], [x + Math.cos(d) * r, y + Math.sin(d) * r, z], .047, P.rope);
    }
}
function drawBuoyancy(b, s, time) {
    const c = PLAY_SITES.buoyancy, p = s?.topic === 'buoyancy' ? s.buoyancy : buoyancy.defaults(), q = s?.topic === 'buoyancy' ? staging(s.elapsed, s.phase === 'ready') : 1;
    const o = floatPosition(p, q), sz = Math.cbrt(p.volume) * .45;
    if (s?.topic === 'buoyancy' && s.layer) {
        for (const x of [-1.85, 1.85])
            b.add('box', c.x + x, c.y + 1.73, c.z, .15, .025, 2.18, P.blue, 0, 0, 0, 2);
        for (let i = 0; i < 6; i++)
            b.add('box', c.x, c.y + 1.73, c.z - 1 + i * .14, 3.8, .018, .065, '#a4cbd0', 0, 0, 0, 2);
    }
    else
        b.add('box', c.x, c.y + 1.73, c.z, 3.82, .03, 2.15, '#a3cbd1', 0, 0, 0, 2);
    b.add('bevel', o[0], o[1], o[2], sz, sz, sz, P.rose, 0, 0, 0, 5);
    b.add('bevel', o[0], o[1] + sz * .43, o[2], sz * 1.03, sz * .14, sz * 1.03, P.cream);
    b.add('box', o[0], o[1] + sz * .2, o[2] + sz * .5, sz * .55, sz * .18, .025, P.teal);
    for (const side of [-1, 1])
        b.add('bevel', o[0] + side * sz * .31, o[1], o[2] + sz * .493, sz * .075, sz * .92, .025, CRAFT.ivory);
    b.add('bevel', o[0], o[1] + sz * .18, o[2] + sz * .53, sz * .12, sz * .17, .03, CRAFT.brass);
    for (let i = 0; i < Math.ceil(p.mass * 2); i++) {
        const x = o[0] + (i % 2 - .5) * sz * .27, z = o[2] + (Math.floor(i / 2) - 1.5) * sz * .15;
        b.add('cylinder', x, o[1] + sz * .54, z, sz * .17, sz * .08, sz * .17, '#9aa9ab');
    }
    if (s?.topic === 'buoyancy' && s.layer) {
        const yy = c.y + 1.8;
        rod(b, [c.x - 1.1, yy - .45, c.z], [c.x - 1.1, yy + .2, c.z], .06, '#779d9b');
        b.add('cone', c.x - 1.1, yy + .32, c.z, .2, .26, .2, P.teal);
        rod(b, [c.x + 1.1, yy + .1, c.z], [c.x + 1.1, yy - .45, c.z], .06, P.rose);
        b.add('cone', c.x + 1.1, yy - .56, c.z, .2, .26, .2, P.rose, Math.PI);
    }
    // The toy ornaments are art, not additional objects in the buoyancy model.
    for (let i = 0; i < 2; i++)
        toyDuck(b, c.x + 1.27 + i * .39, c.y + 1.86 + Math.sin(time * .9 + i) * .022, c.z - .65 + i * .36, .32);
}
function drawShadow(b, s) {
    const sh = PLAY_SITES.shadow, a = s?.topic === 'shadow' ? s.shadow : shadow.defaults(), object = shadowObject(a), m = shadow.evaluate(a).magnification, screenZ = sh.z + 1.7 - a.screenDistance * .85;
    b.add('bevel', sh.x, sh.y + 1.96, screenZ, 4.2, 2.78, .1, P.cream, 0, 0, 0, 6);
    for (const dy of [-1.34, 1.34])
        b.add('bevel', sh.x, sh.y + 1.96 + dy, screenZ + .07, 4.12, .045, .055, CRAFT.endgrain, 0, 0, 0, 3);
    for (const x of [-2.05, 2.05])
        b.add('box', sh.x + x, sh.y + 1.96, screenZ + .07, .055, 2.78, .05, P.light);
    puppet(b, [sh.x, sh.y + 1.95, screenZ + .077], .5 * m, a.puppet, true);
    b.add('box', sh.x, sh.y + .8, sh.z + .65, .14, .1, 3.6, P.wood);
    for (let i = 0; i < 17; i++)
        b.add('box', sh.x + .1, sh.y + .86, sh.z + 1.7 - i * .18, .10, .02, .035, P.cream);
    rod(b, [object[0], sh.y + .81, object[2]], [object[0], object[1] - .2, object[2]], .055, P.teal);
    puppet(b, object, .5, a.puppet);
    const lamp = [sh.x, sh.y + 1.95, sh.z + 1.7];
    b.add('cylinder', lamp[0], lamp[1], lamp[2] + .22, .38, .4, .38, P.teal, Math.PI / 2);
    b.add('cylinder', lamp[0], lamp[1], lamp[2] + .015, .29, .04, .29, '#f6d994', Math.PI / 2);
    b.add('torus', lamp[0], lamp[1], lamp[2] + .008, .185, .185, .185, CRAFT.brass, Math.PI / 2);
    b.add('bevel', lamp[0], lamp[1] + .27, lamp[2] + .24, .25, .05, .07, CRAFT.brass);
    rod(b, [lamp[0], sh.y + .3, lamp[2]], [lamp[0], lamp[1], lamp[2]], .09, P.wood);
    for (const x of [-.42, .42])
        rod(b, [lamp[0], sh.y + .7, lamp[2]], [lamp[0] + x, sh.y + .12, lamp[2] + .2], .07, P.wood);
    if (s?.topic === 'shadow' && s.layer)
        for (const sign of [-1, 1])
            rod(b, [lamp[0], lamp[1], lamp[2]], [sh.x + sign * .16 * m, sh.y + 1.95 + sign * .2 * m, screenZ + .09], .018, '#c0a770');
}
function drawPulley(b, s) {
    const pc = PLAY_SITES.pulley, pa = s?.topic === 'pulley' ? s.pulley : pulley.defaults(), t = s?.topic === 'pulley' ? staging(s.elapsed, s.phase === 'ready') : 0, r = pulley.evaluate(pa), rise = r.rise * t * .75, top = pc.y + 3.82, z = pc.z + .18, lower = pc.y + 1.23 + rise;
    const grip = pulleyGrip(pa, t);
    const loadX = pc.x + (pa.strands === 1 ? -.4 : pa.strands === 2 ? -1.1 : -1.05), loadY = pa.strands === 1 ? pc.y + .76 + rise : lower - .59;
    if (pa.strands === 1) {
        wheel(b, pc.x, top, z, .4, t * pa.pull * 2);
        arc(b, pc.x, top, z, .4, false);
        rod(b, [loadX, loadY + .38, z], [pc.x - .4, top, z], .047, P.rope);
        rod(b, [pc.x + .4, top, z], grip, .047, P.rope);
    }
    else {
        const moving = pa.strands === 2 ? [-1.1] : [-1.55, -.55], fixed = pa.strands === 2 ? [-.5] : [-1.05, -.05], radius = pa.strands === 2 ? .3 : .25;
        for (let i = 0; i < moving.length; i++) {
            const x = pc.x + moving[i], fx = pc.x + fixed[i];
            wheel(b, x, lower, z, radius, -rise / radius);
            arc(b, x, lower, z, radius, true);
            wheel(b, fx, top, z, radius, t * pa.pull);
            arc(b, fx, top, z, radius, false);
            rod(b, [x - radius, top, z], [x - radius, lower, z], .047, P.rope);
            rod(b, [x + radius, lower, z], [x + radius, top, z], .047, P.rope);
            rod(b, [x, lower - .12, z], [x, loadY + .35, z], .06, P.teal);
        }
        rod(b, [grip[0], top, z], grip, .047, P.rope);
        b.add('box', loadX, loadY + .32, z, pa.strands === 2 ? .65 : 1.4, .1, .17, P.teal);
    }
    b.add('box', grip[0], grip[1], grip[2], .44, .15, .17, P.rose);
    rivets(b, grip[0], grip[1], grip[2] + .1, .13);
    b.add('bevel', loadX, loadY, z, 1.2, .48, .7, '#b9986e', 0, 0, 0, 3);
    for (let row = 0; row < 6; row++)
        b.add('torus', loadX, loadY - .2 + row * .078, z, .64, .33, .40, row % 2 ? '#dab98a' : '#c9a678');
    for (let i = 0; i < 9; i++)
        b.add('bevel', loadX + (i - 4) * .12, loadY, z + .369, .043, .47, .024, '#b7966b', 0, 0, 0, 3);
    for (const y of [-.13, .12])
        b.add('box', loadX, loadY + y, z + .37, 1.28, .13, .07, P.light);
    for (let i = 0; i < 3; i++) {
        pot(b, loadX + (i - 1) * .32, loadY + .17, z, .5 * i % 1 ? P.rose : P.teal);
    }
    for (let i = 0; i < pa.mass; i++)
        b.add('cylinder', loadX + (i - 1.5) * .2, loadY + .31, z + .21, .16, .1, .16, '#889e9d');
    if (s?.topic === 'pulley' && s.layer) {
        for (let i = 0; i < pa.strands; i++) {
            const x = loadX + (i - (pa.strands - 1) / 2) * .26;
            rod(b, [x, lower + .2, z + .16], [x, lower + .72, z + .16], .035, P.teal);
            b.add('cone', x, lower + .8, z + .16, .12, .2, .12, P.teal);
        }
    }
}
/** Parked apparatus uses static GPU buffers. Only the active model is rebuilt each frame. */
export function parkPlayyard(b) {
    for (const id of ['buoyancy', 'shadow', 'pulley']) {
        const first = b.count;
        if (id === 'buoyancy')
            drawBuoyancy(b, null, 0);
        else if (id === 'shadow')
            drawShadow(b, null);
        else
            drawPulley(b, null);
        for (let i = first; i < b.count; i++)
            b.items[i].hide = id;
    }
}
export function drawPlayyard(b, s, time) {
    if (s?.topic === 'buoyancy')
        drawBuoyancy(b, s, time);
    else if (s?.topic === 'shadow')
        drawShadow(b, s);
    else if (s?.topic === 'pulley')
        drawPulley(b, s);
}