export const MATERIAL = { wood: 3, cloth: 4, ceramic: 5, diagram: 6, inlay: 7 };
export const CRAFT = { timber: '#ad8261', endgrain: '#cfb18a', ivory: '#fff1d7', ink: '#435d58', sage: '#76a899', rose: '#e2a6a3', brass: '#d0aa6c', petal: '#efd3cd' };
export function strut(b, a, z, w, c, flag = 0) {
    const dx = z[0] - a[0], dy = z[1] - a[1], dz = z[2] - a[2], l = Math.hypot(dx, dy, dz);
    if (l < 1e-7)
        return;
    b.add('cylinder', (a[0] + z[0]) / 2, (a[1] + z[1]) / 2, (a[2] + z[2]) / 2, w, l, w, c, Math.acos(dy / l), Math.atan2(dx, dz), 0, flag);
}
export function curve(b, pts, w, col, flag = 0) {
    for (let i = 1; i < pts.length; i++)
        strut(b, pts[i - 1], pts[i], w, col, flag);
}
/** Round-topped architectural moulding, in the x/y plane. */
export function arch(b, x, y, z, rx, ry, w, col) {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
        const a = Math.PI - i * Math.PI / 24;
        pts.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry, z]);
    }
    curve(b, pts, w, col, 3);
}
export function stitch(b, x, y, z, w, h, col) {
    for (const side of [-1, 1])
        for (let i = 0; i < 8; i++)
            b.add('box', x + (i / 7 - .5) * w, y + side * h / 2, z, .035, .012, .008, col);
    for (const side of [-1, 1])
        for (let i = 1; i < 5; i++)
            b.add('box', x + side * w / 2, y + (i / 5 - .5) * h, z, .012, .035, .008, col);
}
export function rosette(b, x, y, z, s, col) {
    for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        b.add('soft', x + Math.cos(a) * s * .25, y + Math.sin(a) * s * .25, z, s * .35, s * .35, s * .10, col);
    }
    b.add('soft', x, y, z + s * .065, s * .20, s * .20, s * .15, CRAFT.brass, 0, 0, 0, 5);
}
export function lantern(b, x, y, z, s = .35) {
    b.add('bevel', x, y, z, s * .74, s * 1.1, s * .65, CRAFT.ivory, 0, 0, 0, 7);
    for (const side of [-1, 1])
        for (const back of [-1, 1])
            b.add('cylinder', x + side * s * .37, y, z + back * s * .33, s * .06, s * 1.18, s * .06, CRAFT.ink);
    for (const v of [-1, 1])
        b.add('bevel', x, y + v * s * .56, z, s * .9, s * .12, s * .84, CRAFT.sage, 0, 0, 0, 5);
    b.add('roof', x, y + s * .76, z, s * 1.05, s * .28, s * .96, CRAFT.sage);
    b.add('torus', x, y + s * 1.0, z, s * .16, s * .16, s * .16, CRAFT.brass, Math.PI / 2);
}
export function book(b, x, y, z, w, angle = 0) {
    b.add('bevel', x, y, z, w, .09, w * .72, '#c6d6cb', 0, angle, 0, 4);
    b.add('bevel', x, y + .055, z, w * .92, .04, w * .64, '#f3e9d2', 0, angle);
    b.add('box', x, y + .079, z, .025, .009, w * .6, '#b59066', 0, angle);
}
export function toyDuck(b, x, y, z, s = .5) {
    b.add('soft', x, y, z, s * .87, s * .53, s, CRAFT.ivory, 0, 0, 0, 5);
    b.add('soft', x, y + s * .33, z + s * .25, s * .47, s * .50, s * .46, CRAFT.ivory, 0, 0, 0, 5);
    b.add('bevel', x, y + s * .28, z + s * .52, s * .31, s * .13, s * .22, '#d6aa72', 0, 0, 0, 5);
    for (const sign of [-1, 1]) {
        b.add('soft', x + sign * s * .19, y + s * .38, z + s * .34, s * .046, s * .062, s * .045, CRAFT.ink);
        b.add('soft', x + sign * s * .35, y + s * .04, z - s * .03, s * .22, s * .25, s * .56, '#e4c99a', 0, 0, sign * .15, 5);
    }
    b.add('soft', x, y + s * .14, z - s * .41, s * .27, s * .25, s * .30, '#e8d4b0', -.45);
}
export function toySquirrel(b, x, y, z, s = .8) {
    b.add('soft', x + s * .33, y + s * .50, z - s * .23, s * .55, s * .98, s * .38, '#b78b69', 0, 0, -.22, 3);
    b.add('torus', x + s * .33, y + s * .78, z - s * .025, s * .18, s * .18, s * .18, '#dec49b', Math.PI / 2);
    b.add('soft', x, y + s * .29, z, s * .46, s * .62, s * .40, CRAFT.timber, 0, 0, 0, 3);
    b.add('soft', x, y + s * .60, z + s * .08, s * .43, s * .42, s * .39, CRAFT.endgrain, 0, 0, 0, 3);
    for (const side of [-1, 1]) {
        b.add('soft', x + side * s * .13, y + s * .84, z + s * .06, s * .13, s * .27, s * .13, CRAFT.timber, 0, 0, side * .18);
        b.add('soft', x + side * s * .10, y + s * .64, z + s * .25, s * .052, s * .058, s * .035, CRAFT.ink);
        b.add('soft', x + side * s * .15, y + s * .035, z + s * .12, s * .18, s * .10, s * .27, CRAFT.timber);
    }
    b.add('soft', x, y + s * .52, z + s * .27, s * .18, s * .13, s * .17, CRAFT.ivory);
    b.add('soft', x, y + s * .57, z + s * .36, s * .055, s * .045, s * .04, CRAFT.ink);
    b.add('soft', x, y + s * .26, z + s * .27, s * .24, s * .28, s * .24, '#8a6f55', 0, 0, 0, 3);
    b.add('soft', x, y + s * .37, z + s * .27, s * .28, s * .12, s * .28, '#d3bb94');
}
export function dressTheatre(b, x, y, z) {
    // Kept within the existing rear frame/colliders. The entrance and projector rail stay open.
    for (const side of [-1, 1]) {
        const xx = x + side * 2.33;
        b.add('bevel', xx, y + 1.83, z - 1.92, .34, 3.43, .4, CRAFT.sage, 0, 0, 0, 3);
        b.add('bevel', xx, y + .32, z - 1.92, .49, .38, .50, CRAFT.ivory, 0, 0, 0, 3);
        b.add('bevel', xx, y + 3.35, z - 1.92, .47, .18, .51, CRAFT.ivory, 0, 0, 0, 3);
        b.add('curtain', x + side * 2.01, y + 1.97, z - 1.60, .70, 2.98, 1.35, side > 0 ? '#dca2aa' : '#e8b2b3', 0, 0, 0, 4);
        b.add('soft', x + side * 2.02, y + 1.55, z - 1.43, .63, .10, .15, CRAFT.brass);
        b.add('torus', x + side * 2.02, y + 1.51, z - 1.32, .095, .095, .095, CRAFT.ivory, Math.PI / 2);
        strut(b, [xx, y + 1.45, z - 1.38], [xx, y + 1.15, z - 1.38], .035, CRAFT.brass);
        b.add('cone', xx, y + 1.06, z - 1.38, .095, .20, .095, CRAFT.brass);
        lantern(b, xx, y + 3.68, z - 1.85, .27);
        // Framed story tiles and cushions on the old seating footprint.
        b.add('bevel', x + side * 1.8, y + .43, z + 1.8, .92, .16, .57, '#e4b9af', 0, 0, 0, 4);
        b.add('bevel', x + side * 1.8, y + .74, z + 2.03, .94, .42, .09, CRAFT.sage, 0, 0, 0, 3);
        rosette(b, x + side * 1.8, y + .75, z + 2.089, .18, CRAFT.ivory);
    }
    // Three concentric mouldings make the proscenium readable at a glance.
    arch(b, x, y + 3.24, z - 1.63, 2.34, .78, .18, CRAFT.sage);
    arch(b, x, y + 3.24, z - 1.49, 2.16, .59, .065, CRAFT.ivory);
    arch(b, x, y + 3.24, z - 1.44, 2.08, .50, .025, CRAFT.brass);
    for (let i = 0; i <= 16; i++) {
        const a = i * Math.PI / 16;
        b.add('soft', x + Math.cos(a) * 2.2, y + 3.24 + Math.sin(a) * .65, z - 1.39, .07, .07, .05, CRAFT.ivory, 0, 0, 0, 5);
    }
    for (let i = 0; i < 10; i++)
        b.add('soft', x + (i - 4.5) * .45, y + 3.32, z - 1.54, .5, .4, .18, i % 2 ? '#e6b4b2' : '#f0ccc1', 0, 0, 0, 4);
    b.add('bevel', x, y + 3.73, z - 1.37, 1.15, .45, .12, '#48685e', 0, 0, 0, 3);
    b.add('torus', x, y + 3.76, z - 1.27, .15, .15, .15, CRAFT.brass, Math.PI / 2);
    rosette(b, x - .40, y + 3.76, z - 1.28, .16, CRAFT.ivory);
    rosette(b, x + .40, y + 3.76, z - 1.28, .16, CRAFT.ivory);
    for (const side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
            const xx = x + side * (.96 + i * .43);
            b.add('bevel', xx, y + .23, z + 2.3, .17, .16, .15, CRAFT.sage, 0, 0, 0, 5);
            b.add('soft', xx, y + .29, z + 2.3, .09, .08, .1, CRAFT.ivory, 0, 0, 0, 7);
        }
    }
    book(b, x - 1.78, y + .57, z + 1.75, .46, -.14);
}
export function dressDock(b, x, y, z) {
    // Layered enamel top rim, bolted frame and slatted cabinet base.
    for (const side of [-1, 1]) {
        b.add('bevel', x + side * 2.02, y + 2.01, z, .24, .18, 2.62, CRAFT.ivory, 0, 0, 0, 5);
        b.add('bevel', x, y + 2.01, z + side * 1.24, 4.24, .18, .20, CRAFT.ivory, 0, 0, 0, 5);
        for (let j = 0; j < 7; j++)
            b.add('bevel', x + side * 1.5, y + .60, z + (j - 3) * .28, .4, .41, .24, j % 2 ? '#8daeb0' : '#a4bfc0', 0, 0, 0, 3);
        for (const dz of [-1, 1]) {
            b.add('bevel', x + side * 1.92, y + .53, z + dz, .14, .49, .14, CRAFT.sage, 0, 0, 0, 3);
            b.add('soft', x + side * 2.02, y + 1.84, z + dz * 1.33, .09, .09, .03, CRAFT.brass);
        }
    }
    b.add('bevel', x, y + .88, z + 1.28, 1.62, .37, .12, CRAFT.sage, 0, 0, 0, 5);
    for (let i = 0; i < 3; i++) {
        const xx = x + (i - 1) * .24;
        b.add('soft', xx, y + .89, z + 1.365, .14, .14, .035, CRAFT.ivory);
    }
    // Rolled towel, a labelled-in-UI hydrometer stand and a quiet duck carving on the cabinet.
    b.add('bevel', x + 2.48, y + .48, z - .72, .56, .70, .76, CRAFT.sage, 0, 0, 0, 3);
    toyDuck(b, x + 2.48, y + .98, z - .67, .55);
    for (let i = 0; i < 3; i++)
        b.add('soft', x - 2.43, y + .40 + i * .095, z - .9, .58, .1, .65, ['#f0e6d2', '#c1d0c4', '#dcb8a7'][i], 0, 0, 0, 4);
    b.add('torus', x - 2.56, y + 1.65, z + 1.94, .43, .43, .43, CRAFT.ivory, Math.PI / 2);
    for (const side of [-1, 1]) {
        b.add('bevel', x - 2.56 + side * .33, y + 1.65, z + 1.96, .12, .19, .07, CRAFT.rose, 0, 0, 0, 4);
    }
    for (const side of [-1, 1])
        lantern(b, x + side * 2.5, y + 3.59, z + 1.8, .22);
}
export function dressShed(b, x, y, z) {
    for (const sx of [-2.15, 1.8]) {
        for (const yy of [.38, 3.72])
            b.add('bevel', x + sx, y + yy, z + .18, .35, .18, .07, CRAFT.sage, 0, 0, 0, 5);
        for (const yy of [.38, 3.72])
            for (const d of [-.11, .11])
                b.add('soft', x + sx + d, y + yy, z + .23, .055, .055, .045, CRAFT.brass);
    }
    b.add('bevel', x - .18, y + 4.24, z + .28, 4.82, .35, .13, '#6d9685', 0, 0, 0, 3);
    b.add('bevel', x - .18, y + 4.21, z + .36, 1.65, .22, .07, CRAFT.ivory, 0, 0, 0, 3);
    for (const xx of [-.7, -.18, .34])
        b.add('torus', x + xx, y + 4.22, z + .4, .065, .065, .065, CRAFT.brass, Math.PI / 2);
    toySquirrel(b, x + 1.40, y + 2.11, z - 1.7, .72);
    book(b, x + 1.49, y + 2.13, z - 1.16, .46, .12);
    for (let i = 0; i < 5; i++)
        b.add('bevel', x + 1.0 + i * .20, y + 2.16, z - 1.9, .11, .16 + i * .03, .17, ['#d2b18a', '#c6d8c7', '#e0b6ad'][i % 3], 0, 0, 0, 4);
    // Pegboard and safe, non-operable stylised tools behind the experiment.
    b.add('bevel', x + 1.38, y + 2.77, z - 2.21, 1.78, 1.04, .12, '#ceaf87', 0, 0, 0, 3);
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 3; j++)
            b.add('soft', x + .68 + i * .27, y + 2.47 + j * .26, z - 2.13, .038, .038, .018, '#94795f');
    for (let i = 0; i < 3; i++) {
        const xx = x + .9 + i * .45;
        strut(b, [xx, y + 2.45, z - 2.03], [xx, y + 2.87, z - 2.03], .065, CRAFT.sage);
        b.add('torus', xx, y + 2.90, z - 2.04, .083, .083, .083, CRAFT.ivory, Math.PI / 2);
    }
    lantern(b, x - 2.16, y + 3.34, z + .45, .27);
}
/** Added within the existing facade footprint; no changes to walkable/collision areas. */
export function dressCottage(b, x, z, w, d) {
    const face = z + d / 2 + .12;
    for (const side of [-1, 1]) {
        const xx = x + side * (w / 2 - .21);
        for (let row = 0; row < 8; row++)
            b.add('bevel', xx, .63 + row * .26, face, .33, .16, .06, row % 2 ? '#e6d7b9' : '#d2c2a2', 0, 0, 0, 3);
    }
    // Door moulding, inset panels, arch and wreath all attach to the existing closed facade.
    for (const side of [-1, 1])
        b.add('bevel', x + side * .53, 1.29, face + .1, .13, 2.12, .16, CRAFT.ivory, 0, 0, 0, 3);
    b.add('bevel', x, 2.32, face + .08, 1.22, .17, .15, CRAFT.ivory, 0, 0, 0, 3);
    for (const yy of [.73, 1.28])
        b.add('bevel', x, yy, face + .105, .63, .40, .06, '#a8bba3', 0, 0, 0, 3);
    b.add('torus', x, 1.85, face + .17, .23, .23, .23, '#8eab80', Math.PI / 2);
    for (let i = 0; i < 7; i++) {
        const a = i * Math.PI * 2 / 7;
        b.add('soft', x + Math.cos(a) * .21, 1.85 + Math.sin(a) * .21, face + .22, .095, .10, .06, i % 2 ? '#d8c197' : '#e2c3b4');
    }
    arch(b, x, 2.34, face + .08, .62, .31, .07, CRAFT.endgrain);
    lantern(b, x - .90, 2.15, face + .28, .24);
    const windows = w > 4 ? [-w * .32, w * .32] : [w * .28];
    for (const dx of windows) {
        for (const side of [-1, 1]) {
            const xx = x + dx + side * .67;
            b.add('bevel', xx, 1.82, face + .05, .23, 1.16, .09, CRAFT.sage, 0, 0, 0, 3);
            for (let i = 0; i < 7; i++)
                b.add('bevel', xx, 1.37 + i * .145, face + .107, .19, .045, .03, '#a9bcaa', .2, 0, 0, 3);
        }
        b.add('bevel', x + dx, 2.45, face + .08, 1.25, .12, .22, CRAFT.ivory, 0, 0, 0, 3);
        b.add('box', x + dx - .22, 2.13, face + .175, .04, .40, .012, '#eef1df', 0, 0, -.4, 7);
        b.add('bevel', x + dx, 1.04, face + .17, 1.10, .08, .35, CRAFT.ivory, 0, 0, 0, 5);
    }
}