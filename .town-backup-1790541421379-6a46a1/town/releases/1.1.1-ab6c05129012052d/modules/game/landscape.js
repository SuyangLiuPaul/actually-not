const clamp01 = (n) => Math.min(1, Math.max(0, n));
const smooth = (a, b, n) => { const t = clamp01((n - a) / (b - a)); return t * t * (3 - 2 * t); };
export const BASE = .165;
export const riverX = (z) => -3.25 + .48 * Math.sin(z * .29) + .18 * Math.sin(z * .71 + .8);
export const riverHalfWidth = (z) => .86 + .14 * Math.sin(z * .53 + 1.1) + .06 * Math.sin(z * 1.17) + .55 * Math.exp(-(((z - 9.25) / 1.2) ** 2));
export const bridgeAt = (z) => Math.abs(z - 1) <= .67 ? 1 : Math.abs(z - 7) <= .6 ? 7 : null;
export const isBridge = (z) => bridgeAt(z) !== null;
export function mapBoundary(angle) {
    const c = Math.cos(angle), s = Math.sin(angle), radius = (1 + .034 * Math.sin(angle * 5 + .6) + .028 * Math.cos(angle * 3 - .8));
    return [(c >= 0 ? 20.4 : 17.25) * Math.sign(c) * Math.sqrt(Math.abs(c)) * radius, (s >= 0 ? 23.5 : 12.45) * Math.sign(s) * Math.sqrt(Math.abs(s)) * radius];
}
export function insideMap(x, z, margin = 0) {
    const sx = x / (x >= 0 ? 20.4 : 17.25), sz = z / (z >= 0 ? 23.5 : 12.45), angle = Math.atan2(Math.sign(sz) * sz * sz, Math.sign(sx) * sx * sx);
    const [bx, bz] = mapBoundary(angle), radius = Math.hypot(bx, bz);
    return Math.hypot(x, z) + margin < radius;
}
const pads = [
    [-11, 16.8, 6.8, 6.1, .32], [1.4, 18.2, 6.8, 6.1, .32], [13.2, 17.3, 6.8, 6.1, .32],
    [-11, 10.2, 5.9, 4.8, .55],
    [15.5, -7.3, 6.3, 5.5, .32], [16, 2.6, 6.3, 5.5, .32], [13.7, 10.4, 6.3, 5.5, .32],
    [0, -5.5, 7, 7.3, BASE], [-9.3, -.1, 8.8, 8.2, BASE],
    [8.6, -4.1, 8.4, 9, BASE], [8.6, 4.4, 8.3, 8, BASE],
    [-10.1, -6, 4.5, 3.3, .64], [-4.8, 8.6, 4.1, 3.4, BASE],
    [2, 8.3, 2.8, 2.5, BASE], [6, 9, 5.2, 4.1, BASE],
];
/** Rounded flattening pads preserve the three existing experiment work surfaces. */
export function terrainHeight(x, z) {
    const hill = (cx, cz, w, d, h) => h * Math.exp(-(((x - cx) / w) ** 2) - ((z - cz) / d) ** 2);
    let h = BASE + .04 * Math.sin(x * .49 + z * .25) * Math.sin(z * .61)
        + hill(-6.4, -9, 4.2, 3.1, 1.9) + hill(-13.1, 8.3, 4.5, 3.8, 1.15)
        + hill(14.4, .2, 2.8, 6.2, 1.05) + hill(6, -11.7, 6, 2.1, 1.05)
        + hill(11.4, 10.8, 4, 2.2, .72);
    for (const [cx, cz, w, d, height] of pads) {
        const dx = Math.max(0, Math.abs(x - cx) - w / 2), dz = Math.max(0, Math.abs(z - cz) - d / 2);
        const blend = 1 - smooth(0, .8, Math.hypot(dx, dz));
        h = h * (1 - blend) + height * blend;
    }
    const bankDistance = Math.abs(x - riverX(z)) - riverHalfWidth(z);
    // A carved creek, not water rectangles placed on top of grass.
    const bank = smooth(-.16, .48, bankDistance);
    h = -.15 * (1 - bank) + h * bank;
    const lake = Math.hypot((x - 6) / 2.2, (z - 9) / 1.6);
    h = -.11 * (1 - smooth(.85, 1.18, lake)) + h * smooth(.85, 1.18, lake);
    return h;
}
export const onPondDeck = (x, z) => x > 3.4 && x < 6.65 && z > 9.75 && z < 10.67;
export function isWater(x, z, r = 0) {
    const creek = Math.abs(x - riverX(z)) < riverHalfWidth(z) + r;
    const crossing = bridgeAt(z) !== null && Math.abs(x - riverX(z)) < 1.54;
    const pond = Math.hypot((x - 6) / (2.2 + r), (z - 9) / (1.6 + r)) < 1;
    return creek && !crossing || pond && !onPondDeck(x, z);
}
export function walkHeight(x, z) {
    if (x > -7.78 && x < -5.52 && z > -9.1 && z < -7.46)
        return terrainHeight(-6.65, -8.3) + .10;
    if (Math.hypot(x + 4.8, z - 8.6) < 1.25)
        return .39;
    const bridge = bridgeAt(z), dx = Math.abs(x - riverX(bridge ?? z));
    if (bridge !== null && dx <= 1.52) {
        const t = clamp01(1 - dx / 1.42);
        return bridge === 1 ? .375 + .11 * t : .47 + .14 * t;
    }
    if (onPondDeck(x, z))
        return .4;
    return terrainHeight(x, z);
}
export const TRAILS = [
    { id: 'dock-walk', width: 1.15, forest: true, points: [[-7.9, 11.3], [-7.6, 13.1], [-7.2, 15.8], [-7.5, 18.4], [-9.1, 19.7], [-11, 19.7]] },
    { id: 'theatre-walk', width: 1.15, points: [[3.5, 9.75], [2.5, 11.7], [.1, 13], [.2, 15], [.1, 18.1], [1.4, 21.1], [5.7, 21.7], [9, 21], [13.2, 20.2]] },
    { id: 'pulley-walk', width: 1.1, points: [[10.7, 11.9], [10.1, 13.8], [10, 16.7], [10.2, 19.1], [13.2, 20.2]] },
    { id: 'honey-walk', width: .95, forest: true, points: [[-7.65, 6.2], [-8.2, 7.2], [-8.1, 8.5], [-8.2, 9.6], [-7.9, 11.3]] },
    { id: 'science-garden', width: 1.15, points: [[5.75, -3.5], [5.1, -7.8], [7.5, -9.5], [11.9, -9.8], [13, -7.4], [13, -4.7], [15.5, -4.7], [17.8, -2.8], [18.9, .2], [19.1, 3.7], [17.5, 5.1], [16, 5.1], [14.8, 7.1], [12.2, 7.7], [10.6, 9], [10.5, 11.7], [10.7, 11.9]] },
    { id: 'east-connector', width: 1.05, points: [[7.6, 8], [10, 8.5], [12.2, 7.7]] },
    { id: 'village', width: 1.55, points: [[0, -3.5], [.15, -1], [0, 1], [2.5, 1], [4.8, 1.4], [4.55, 4.5], [4.8, 6.6], [7.6, 8]] },
    { id: 'kitchen', width: 1.25, points: [[4.8, 1.4], [5.05, -.3], [5.15, -2.2], [5.75, -3.5], [7.9, -3.6]] },
    { id: 'garden', width: 1.45, points: [[0, 1], [-1.6, 1], [-3.3, 1], [-5.1, 1], [-6.65, 1.2], [-6.7, 2.2]] },
    { id: 'south-loop', width: 1.25, points: [[4.8, 6.6], [2.9, 7.35], [.2, 7], [-3.4, 7], [-5.3, 7], [-7.65, 6.2], [-9.1, 5.15]] },
    { id: 'greenhouse', width: .96, forest: true, points: [[-6.65, 1.2], [-5.05, -.1], [-5.25, -2.5], [-6.2, -4.15], [-8.4, -4.1], [-10.1, -4.1]] },
    { id: 'ridge', width: .88, forest: true, points: [[-6.2, -4.15], [-6.0, -5.3], [-6.15, -6.55], [-6.6, -7.6], [-6.65, -8.3], [-8.3, -8.4], [-10.1, -8.5], [-12.3, -8.0], [-13.1, -6.5], [-13.45, -3.6]] },
    { id: 'woodland', width: .84, forest: true, points: [[-13.45, -3.6], [-14.35, -1.8], [-14.5, 1], [-13.25, 3.2], [-12.9, 4.7], [-11.7, 6.7], [-10.1, 7.25], [-8.1, 6.4], [-7.65, 6.2]] },
    { id: 'wheel', width: .96, forest: true, points: [[0, 1], [.7, 2.8], [.45, 4.15], [-.5, 4.65]] },
    { id: 'pond', width: .86, forest: true, points: [[4.8, 6.6], [3.75, 7.6], [3.35, 8.9], [3.5, 9.75], [4.35, 10.1]] },
];
export function sampleTrail(points, spacing = .28) {
    const out = [];
    for (let i = 0; i < points.length - 1; i++) {
        const a = points[Math.max(0, i - 1)], b = points[i], c = points[i + 1], d = points[Math.min(points.length - 1, i + 2)];
        const n = Math.max(2, Math.ceil(Math.hypot(c[0] - b[0], c[1] - b[1]) / spacing));
        for (let j = 0; j < n; j++) {
            const t = j / n;
            out.push([0, 1].map(k => .5 * (2 * b[k] + (c[k] - a[k]) * t + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t * t + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * t * t * t)));
        }
    }
    out.push(points.at(-1));
    return out;
}
export const SAMPLED_TRAILS = TRAILS.map(t => ({ ...t, samples: sampleTrail(t.points) }));
export function trailDistance(x, z) {
    let distance = Infinity;
    for (const trail of SAMPLED_TRAILS)
        for (const p of trail.samples)
            distance = Math.min(distance, Math.hypot(x - p[0], z - p[1]) - trail.width / 2);
    return distance;
}
class Mesh {
    data = [];
    tri(a, b, c, colour) {
        const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
        let n = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
        const l = Math.hypot(...n);
        if (l < 1e-7)
            return;
        n = n.map(v => v / l);
        if (n[1] < 0) {
            n = n.map(v => -v);
            [b, c] = [c, b];
        }
        for (const v of [a, b, c])
            this.data.push(...v, ...n, ...colour);
    }
    quad(a, b, c, d, colour) { this.tri(a, b, c, colour); this.tri(a, c, d, colour); }
    finish(name, water = false) { return { name, vertices: new Float32Array(this.data), water }; }
}
export function buildLandscape() {
    const land = new Mesh(), shore = new Mesh(), water = new Mesh(), roads = new Mesh(), outer = new Mesh();
    const slices = 144, rings = 56;
    const ringPoint = (i, j) => {
        const [x, z] = mapBoundary(i / slices * Math.PI * 2), radius = j / rings;
        return [x * radius, terrainHeight(x * radius, z * radius), z * radius];
    };
    for (let j = 0; j < rings; j++)
        for (let i = 0; i < slices; i++) {
            const a = ringPoint(i, j), b = ringPoint(i + 1, j), c = ringPoint(i + 1, j + 1), d = ringPoint(i, j + 1);
            const x = (a[0] + c[0]) / 2, z = (a[2] + c[2]) / 2;
            const n = (Math.sin(x * 1.2 + z * 2.1) * Math.sin(z * 1.8 - x) + Math.sin(x * .7 - z * .4)) * .006;
            const dark = smooth(.55, 1.8, terrainHeight(x, z)) * .09;
            const base = [.66 + n - dark, .785 + n - dark * .65, .537 + n - dark * .45];
            for (const p of [a, b, c, a, c, d]) {
                const e = .06, dx = (terrainHeight(p[0] + e, p[2]) - terrainHeight(p[0] - e, p[2])) / (2 * e), dz = (terrainHeight(p[0], p[2] + e) - terrainHeight(p[0], p[2] - e)) / (2 * e), l = Math.hypot(dx, 1, dz);
                land.data.push(...p, -dx / l, 1 / l, -dz / l, ...base);
            }
        }
    // A varied two-layer rock skirt follows the same outline, with no rectangular backing plate.
    for (let i = 0; i < slices; i++) {
        const a = ringPoint(i, rings), b = ringPoint(i + 1, rings);
        const depth = -.65 - .12 * Math.sin(i * .49);
        const c = [b[0] * .978, depth, b[2] * .978], d = [a[0] * .978, depth, a[2] * .978];
        shore.quad(a, b, c, d, [.66 + .02 * Math.sin(i), .68, .55]);
        shore.quad(d, c, [c[0] * .94, -1.15, c[2] * .94], [d[0] * .94, -1.15, d[2] * .94], [.57, .6, .5]);
    }
    for (let z = -15; z < 25; z += .18) {
        const za = z, zb = z + .18, xa = riverX(za), xb = riverX(zb), wa = riverHalfWidth(za), wb = riverHalfWidth(zb);
        if (!insideMap(xa, za, .02) || !insideMap(xb, zb, .02))
            continue;
        water.quad([xa - wa, .075, za], [xa + wa, .075, za], [xb + wb, .075, zb], [xb - wb, .075, zb], [.42, .73, .78]);
        for (const side of [-1, 1]) {
            shore.quad([xa + side * wa, .07, za], [xb + side * wb, .07, zb], [xb + side * (wb + .38), terrainHeight(xb + side * (wb + .38), zb) + .018, zb], [xa + side * (wa + .38), terrainHeight(xa + side * (wa + .38), za) + .018, za], [.84, .80, .66]);
            water.quad([xa + side * wa, .079, za], [xb + side * wb, .079, zb], [xb + side * wb * .8, .079, zb], [xa + side * wa * .8, .079, za], [.65, .83, .81]);
        }
    }
    for (let i = 0; i < 44; i++) {
        const a = i * Math.PI / 22, b = (i + 1) * Math.PI / 22;
        water.tri([6, .074, 9], [6 + Math.cos(a) * 2.2, .074, 9 + Math.sin(a) * 1.6], [6 + Math.cos(b) * 2.2, .074, 9 + Math.sin(b) * 1.6], [.44, .75, .78]);
    }
    for (const trail of SAMPLED_TRAILS) {
        const pts = trail.samples;
        const sides = (i, w) => {
            const before = pts[Math.max(0, i - 1)], after = pts[Math.min(pts.length - 1, i + 1)], p = pts[i];
            const dx = after[0] - before[0], dz = after[1] - before[1], l = Math.hypot(dx, dz) || 1;
            return [-1, 1].map(side => { const x = p[0] + dz / l * w * side / 2, z = p[1] - dx / l * w * side / 2; return [x, terrainHeight(x, z) + .023, z]; });
        };
        for (let i = 1; i < pts.length; i++) {
            const [x, z] = pts[i];
            if (isWater(x, z) || Math.abs(x - riverX(z)) < riverHalfWidth(z) + .2 || onPondDeck(x, z))
                continue;
            const [a, b] = sides(i - 1, trail.width), [d, c] = sides(i, trail.width);
            roads.quad(a, b, c, d, trail.forest ? [.83, .78, .63] : [.89, .84, .71]);
        }
    }
    // Continuous backdrop rather than a visible square/board perimeter. Outside-map ground is scenic only.
    for (let i = 0; i < 144; i++)
        for (let ring = 0; ring < 5; ring++) {
            const p = (a, k) => { const [xx, zz] = mapBoundary(a / 144 * Math.PI * 2), f = 1 + k * .12, x = xx * f, z = zz * f; return [x, terrainHeight(x, z) + k * .24, z]; };
            const a = p(i, ring), b = p(i + 1, ring), c = p(i + 1, ring + 1), d = p(i, ring + 1);
            outer.quad(a, b, c, d, [.659 - ring * .009, .781 - ring * .007, .536 - ring * .004]);
        }
    return [outer.finish('woodland-backdrop'), land.finish('terrain'), shore.finish('banks-and-skirt'), water.finish('water', true), roads.finish('paths')];
}