import { strut, lantern } from './craft.js';
export const GARDEN = {
    plaster: '#fff0cf', cream: '#fff7df', wood: '#c28a56', woodLight: '#e9bc78', woodDark: '#754f35',
    teal: '#54a894', tealDark: '#36786e', clay: '#d96f55', clayLight: '#ef9c75',
    leaf: '#5fa366', leafLight: '#8ac06e', leafDark: '#3f7f5c', rose: '#e8889a', ink: '#2f5c51', brass: '#d4a149'
};
export function contact(b, x, y, z, w, d, materialFlag = 8) {
    b.add('decal', x, y, z, w, 1, d, '#365b4b', 0, 0, 0, materialFlag);
}
/** Tree silhouette has authored lobes/branches, not a stack of identical spheres. */
export function gardenTree(b, x, z, s, pine) {
    const first = b.count, floral = !pine && ((x > 2 && z < -8) || (x < -13 && z > 6));
    const trunk = GARDEN.woodDark;
    b.add('cylinder', x, 1.16 * s, z, .25 * s, 2.26 * s, .26 * s, trunk);
    for (const a of [.35, 2.6, 4.35])
        strut(b, [x, .21, z], [x + Math.cos(a) * .26 * s, .18, z + Math.sin(a) * .26 * s], .12 * s, trunk);
    if (pine) {
        const hues = [GARDEN.leafDark, '#689b70', '#83b075'];
        for (let tier = 0; tier < 3; tier++) {
            const yy = (1.7 + tier * .75) * s, ww = (2.32 - tier * .51) * s;
            b.add('spruce', x + Math.sin(tier * 2 + x) * s * .055, yy, z, ww, 1.85 * s, ww, hues[tier], 0, tier * .51 + x * .17, 0, 1);
        }
    }
    else {
        for (const side of [-1, 1])
            strut(b, [x, 1.30 * s, z], [x + side * .66 * s, 2.1 * s, z + .1 * s], .13 * s, trunk);
        const clusters = [[-.65, 2.11, .11, 1.74, 1.48], [.63, 2.39, -.16, 1.72, 1.63], [-.19, 2.73, -.28, 1.98, 1.76], [.26, 2.04, .54, 1.66, 1.48], [-.47, 2.65, .63, 1.50, 1.48]];
        const palette = floral ? ['#dca3a3', '#eab9b3', '#edc6bd', '#e1b0a9', '#f0c7bf'] : [GARDEN.leaf, '#83b27b', '#9cc582', '#74a872', '#a3c987'];
        clusters.forEach(([dx, yy, dz, w, h], i) => b.add('crown', x + dx * s, yy * s, z + dz * s, w * s, h * s, w * .91 * s, palette[i], 0, (x + z) * .41 + i * .8, 0, 1));
        if (floral)
            for (let i = 0; i < 13; i++) {
                const a = i * 2.4, r = .48 + (i % 3) * .24;
                b.add('soft', x + Math.cos(a) * r * s, (2.6 + Math.sin(a) * .35) * s, z + Math.sin(a) * r * s, .13 * s, .09 * s, .12 * s, '#fff0dc');
            }
    }
    // Gentle contact tint is rendered separately with alpha blending; no dark opaque discs.
    contact(b, x, .178, z, 2.7 * s, 2.35 * s);
    for (let i = 0; i < 3; i++) {
        const a = i * 2.1 + x, xx = x + Math.cos(a) * s * .48, zz = z + Math.sin(a) * s * .46;
        b.add('crown', xx, .22 * s, zz, .43 * s, .37 * s, .37 * s, i % 2 ? '#8bbb7d' : '#6f9f73');
    }
    for (let i = first; i < b.count; i++)
        if (b.items[i].flag === 0 && b.items[i].shape === 'cylinder')
            b.items[i].flag = 3;
}
/** Facade window with a recessed reveal, real layered trim, shutters, curtain and flowerbox. */
function casement(b, x, y, z, side = false) {
    const ry = side ? Math.PI / 2 : 0;
    const put = (shape, dx, dy, dz, w, h, d, c, flag = 0) => b.add(shape, x + (side ? dz : dx), y + dy, z + (side ? -dx : dz), w, h, d, c, 0, ry, 0, flag);
    put('bevel', 0, 0, 0, 1.19, 1.34, .17, GARDEN.woodDark, 3);
    put('bevel', 0, 0, .07, 1.03, 1.18, .10, GARDEN.cream, 3);
    put('bevel', 0, 0, .13, .83, .98, .04, '#8dbbb5', 5);
    // The curtains sit behind the mullions, rather than replacing the glass with a flat colour.
    for (const sign of [-1, 1]) {
        put('curtain', sign * .31, .03, .17, .19, .84, .34, '#f5e7c5', 4);
        put('bevel', sign * .74, 0, .015, .28, 1.19, .11, GARDEN.teal, 3);
        for (let row = 0; row < 7; row++)
            put('bevel', sign * .74, -.43 + row * .145, .081, .23, .085, .034, row % 2 ? '#82b3a0' : '#75a793', 3);
        put('bevel', sign * .74, -.33, .109, .31, .055, .024, GARDEN.tealDark);
        put('bevel', sign * .74, .34, .109, .31, .055, .024, GARDEN.tealDark);
    }
    put('bevel', 0, 0, .203, .052, 1.05, .065, GARDEN.cream, 3);
    put('bevel', 0, 0, .203, .87, .054, .065, GARDEN.cream, 3);
    put('bevel', 0, .66, .025, 1.31, .10, .27, GARDEN.cream, 3);
    put('bevel', 0, -.71, .09, 1.28, .12, .38, GARDEN.cream, 3);
    put('bevel', 0, -.87, .18, 1.16, .27, .38, GARDEN.teal, 3);
    put('bevel', 0, -.728, .18, 1.21, .065, .42, GARDEN.cream, 3);
    for (let i = -2; i <= 2; i++) {
        put('crown', i * .215, -.62, .23, .30, .26, .31, i % 2 ? '#70a878' : '#8cba7b');
        put('soft', i * .215, -.49, .28, .17, .13, .17, i % 2 ? '#e6a2a0' : '#ffe7b0', 5);
        put('soft', i * .215, -.43, .28, .05, .03, .05, '#d4ad60');
    }
}
/** Footprint is identical to the original collider. Hide tags are attached by the caller. */
export function cottage(b, x, z, w, d, tealRoof = false, roofHide = '') {
    const put = (shape, xx, y, zz, sx, sy, sz, c, rx = 0, ry = 0, rz = 0, flag = 0, hide = '') => b.add(shape, x + xx, y, z + zz, sx, sy, sz, c, rx, ry, rz, flag, hide);
    const zf = d / 2, eave = 2.94, ridge = 4.51, half = (w + .6) / 2, pitch = Math.atan2(ridge - eave, half), slope = Math.hypot(half, ridge - eave);
    const roofCols = tealRoof ? ['#6b9b8e', '#73a495', '#7eaa9c', '#7ba599'] : ['#cf7a61', '#d68569', '#d48a72', '#df987a'];
    // Cream masonry plinth: regular courses, varied stone lengths, no random noise.
    put('bevel', 0, .33, 0, w + .24, .38, d + .22, '#b8b79e');
    for (const zz of [-1, 1])
        for (let row = 0; row < 2; row++) {
            const count = Math.ceil(w / .56), step = w / count;
            for (let j = 0; j < count; j++)
                put('bevel', -w / 2 + (j + .5) * step, .28 + row * .19, zz * (d / 2 + .06), step * .96, .16, .12, (j + row) % 3 ? '#d9cfb2' : '#c7c3a9');
        }
    put('bevel', 0, 1.71, 0, w, 2.36, d, tealRoof ? '#e9edda' : GARDEN.plaster);
    for (const sign of [-1, 1])
        for (const zz of [-1, 1])
            put('bevel', sign * (w / 2 - .075), 1.73, zz * (d / 2 + .02), .15, 2.41, .15, GARDEN.wood, 0, 0, 0, 3);
    for (const yy of [.57, 2.82]) {
        put('bevel', 0, yy, zf + .04, w, .15, .15, GARDEN.wood, 0, 0, 0, 3);
        put('bevel', w / 2 + .04, yy, 0, .15, .15, d, GARDEN.wood, 0, 0, 0, 3);
    }
    // Subtle horizontal plaster / timber separation, kept below windows.
    for (let row = 0; row < 2; row++)
        put('bevel', w / 2 + .02, .72 + row * .2, 0, .045, .025, d - .12, '#dbdec5');
    // Door frame and raised panel door.
    put('bevel', 0, 1.46, zf + .09, 1.14, 2.06, .17, GARDEN.woodDark, 0, 0, 0, 3);
    put('bevel', 0, 1.45, zf + .19, .87, 1.92, .11, GARDEN.tealDark, 0, 0, 0, 3);
    for (const sign of [-1, 1])
        put('bevel', sign * .54, 1.48, zf + .23, .115, 2.09, .14, GARDEN.cream, 0, 0, 0, 3);
    put('bevel', 0, 2.51, zf + .20, 1.22, .15, .27, GARDEN.cream, 0, 0, 0, 3);
    for (const y of [.87, 1.39])
        put('bevel', 0, y, zf + .263, .67, .39, .05, '#80ac96', 0, 0, 0, 3);
    put('bevel', 0, 2.05, zf + .268, .55, .42, .055, '#bcd7c9', 0, 0, 0, 5);
    put('bevel', 0, 2.05, zf + .31, .036, .40, .018, GARDEN.cream);
    put('bevel', 0, 2.05, zf + .31, .54, .036, .018, GARDEN.cream);
    put('bevel', .29, 1.38, zf + .286, .07, .25, .028, GARDEN.brass);
    put('soft', .29, 1.41, zf + .346, .095, .095, .086, GARDEN.brass, 0, 0, 0, 5);
    put('bevel', 0, .59, zf + .41, 1.51, .18, .61, '#dbcca8');
    put('bevel', 0, .42, zf + .68, 1.85, .15, .59, '#e8d7b5');
    put('bevel', 0, .29, zf + .88, 2.14, .14, .53, '#e9dbc0');
    put('bevel', 0, .512, zf + .71, .76, .022, .35, '#a99b78', 0, 0, 0, 4);
    // Twin windows when space allows. Side window turns around its own frame.
    if (w > 4.2) {
        casement(b, x - w * .315, 1.89, z + zf + .08);
        casement(b, x + w * .315, 1.89, z + zf + .08);
    }
    else
        casement(b, x + w * .275, 1.92, z + zf + .08);
    casement(b, x + w / 2 + .04, 1.93, z - .32, true);
    // Continuous gabled roof, with a cream soffit below clearly separated clay tile courses.
    put('roof', 0, (eave + ridge) / 2 - .07, 0, w + .72, ridge - eave + .06, d + .76, GARDEN.cream, 0, 0, 0, 0, roofHide);
    put('roof', 0, (eave + ridge) / 2, 0, w + .60, ridge - eave, d + .62, roofCols[0], 0, 0, 0, 0, roofHide);
    for (const sign of [-1, 1]) {
        for (let row = 0; row < 7; row++) {
            const t = (row + .53) / 7, xx = sign * half * t, yy = ridge - (ridge - eave) * t + .055;
            const n = Math.ceil((d + .62) / .43), step = (d + .62) / n;
            for (let j = 0; j < n; j++) {
                const zz = -(d + .62) / 2 + (j + .5) * step;
                put('bevel', xx, yy, zz, slope / 7 * 1.1, .084, step * .965, roofCols[(row * 3 + j) % 4], 0, 0, -sign * pitch, 0, roofHide);
            }
        }
        for (const face of [-1, 1]) {
            const zz = face * (d / 2 + .39);
            put('bevel', sign * half / 2, (eave + ridge) / 2 - .025, zz, slope + .12, .145, .145, GARDEN.cream, 0, 0, -sign * pitch, 3, roofHide);
            put('bevel', sign * half / 2, (eave + ridge) / 2 + .067, zz + .014, slope + .12, .044, .159, roofCols[0], 0, 0, -sign * pitch, 0, roofHide);
        }
        put('bevel', sign * (half + .025), eave - .065, 0, .14, .11, d + .81, tealRoof ? '#547f78' : '#a35e4f', 0, 0, 0, 0, roofHide);
        // Rafter ends visible in the eave shadow.
        for (let j = 0; j < 5; j++)
            put('bevel', sign * (half - .12), eave - .21, -d / 2 + j * d / 4, .32, .12, .10, GARDEN.woodDark, 0, 0, sign * .13, 3, roofHide);
    }
    for (let i = 0; i < Math.ceil((d + .8) / .31); i++)
        put('soft', 0, ridge + .07, -(d + .65) / 2 + i * .31, .25, .17, .34, roofCols[2], 0, 0, 0, 0, roofHide);
    // Front gable clock / oculus, readable from the default approach.
    put('cylinder', 0, 3.48, zf + .333, .76, .13, .76, GARDEN.woodDark, Math.PI / 2, 0, 0, 3, roofHide);
    put('cylinder', 0, 3.48, zf + .414, .64, .05, .64, GARDEN.cream, Math.PI / 2, 0, 0, 5, roofHide);
    put('torus', 0, 3.48, zf + .455, .33, .33, .33, GARDEN.brass, Math.PI / 2, 0, 0, 0, roofHide);
    if (tealRoof) {
        // Workshop medallion: a water-drop, not a duplicate cottage clock.
        put('soft', 0, 3.43, zf + .495, .24, .24, .035, GARDEN.tealDark, 0, 0, 0, 0, roofHide);
        put('cone', 0, 3.57, zf + .495, .23, .29, .036, GARDEN.tealDark, 0, 0, 0, 0, roofHide);
        put('soft', -.055, 3.48, zf + .519, .042, .080, .011, '#c6dfd0', 0, 0, 0, 0, roofHide);
        // A slim glazed rooflight gives this building its own roof silhouette.
        const xx = half * .53, yy = ridge - (ridge - eave) * .53 + .12;
        put('bevel', xx, yy, -.43, .88, .11, .84, GARDEN.cream, 0, 0, -pitch, 0, roofHide);
        put('bevel', xx, yy + .065, -.43, .70, .045, .66, '#a8cfc8', 0, 0, -pitch, 5, roofHide);
        put('bevel', xx, yy + .093, -.43, .045, .045, .68, GARDEN.cream, 0, 0, -pitch, 0, roofHide);
    }
    else if (w < 4.2) {
        // Kitchen medallion: a ceramic cup, handle and saucer.
        put('bevel', -.035, 3.47, zf + .495, .29, .26, .037, GARDEN.tealDark, 0, 0, 0, 0, roofHide);
        put('torus', .145, 3.49, zf + .51, .079, .079, .079, GARDEN.tealDark, Math.PI / 2, 0, 0, 0, roofHide);
        put('bevel', 0, 3.32, zf + .52, .41, .033, .023, GARDEN.tealDark, 0, 0, 0, 0, roofHide);
        for (const dx of [-.10, .045])
            put('bevel', dx, 3.69, zf + .50, .022, .12, .018, GARDEN.brass, 0, 0, .18, 0, roofHide);
    }
    else {
        put('bevel', .066, 3.52, zf + .49, .23, .025, .016, GARDEN.tealDark, 0, 0, .56, 0, roofHide);
        put('bevel', -.013, 3.61, zf + .49, .025, .26, .016, GARDEN.tealDark, 0, 0, 0, 0, roofHide);
        for (let i = 0; i < 4; i++) {
            const a = i * Math.PI / 2;
            put('soft', Math.cos(a) * .24, 3.48 + Math.sin(a) * .24, zf + .48, .04, .04, .02, GARDEN.brass, 0, 0, 0, 0, roofHide);
        }
    }
    // Brick chimney with a dark flue and four distinct terracotta pots.
    const cx = -w * .28, cz = -d * .18;
    put('bevel', cx, 3.88, cz, .66, 1.24, .63, '#d5bea0', 0, 0, 0, 0, roofHide);
    for (let i = 0; i < 6; i++)
        for (const sign of [-1, 1])
            put('bevel', cx + sign * .334, 3.37 + i * .19, cz, .025, .018, .61, '#b5a588', 0, 0, 0, 0, roofHide);
    put('bevel', cx, 4.51, cz, .81, .15, .80, GARDEN.cream, 0, 0, 0, 0, roofHide);
    put('bevel', cx, 4.60, cz, .47, .055, .45, '#656559', 0, 0, 0, 0, roofHide);
    for (const sign of [-1, 1]) {
        put('cylinder', cx + sign * .19, 4.74, cz, .23, .29, .25, '#c48d6b', 0, 0, 0, 0, roofHide);
        put('cylinder', cx + sign * .19, 4.897, cz, .27, .04, .27, '#e1b58a', 0, 0, 0, 0, roofHide);
        put('cylinder', cx + sign * .19, 4.92, cz, .17, .01, .17, '#727060', 0, 0, 0, 0, roofHide);
    }
    lantern(b, x - .77, 2.31, z + zf + .28, .28);
    // Low ivy, flowers and a welcome wreath; no new navigation footprint.
    put('torus', 0, 1.92, zf + .348, .205, .205, .205, '#67996b', Math.PI / 2);
    for (let j = 0; j < 8; j++) {
        const a = j * Math.PI / 4;
        put('crown', Math.cos(a) * .205, 1.92 + Math.sin(a) * .205, zf + .363, .15, .14, .10, j % 2 ? '#88b579' : '#73a475');
    }
    put('bevel', 0, 1.75, zf + .44, .18, .105, .045, GARDEN.rose, 0, 0, 0, 4);
    contact(b, x, .18, z, w + 1.7, d + 1.5);
}
/** Border plants are clustered around existing props, not spread over movement corridors. */
export function hydrangea(b, x, y, z, s = 1, pink = true) {
    for (const dx of [-.3, .24])
        b.add('crown', x + dx * s, y + .24 * s, z, .8 * s, .56 * s, .65 * s, '#69986c');
    for (let j = 0; j < 5; j++) {
        const a = j * 2.4, xx = x + Math.cos(a) * s * .28, zz = z + Math.sin(a) * s * .27, yy = y + s * (.46 + (j % 2) * .14);
        b.add('crown', xx, yy, zz, s * .46, s * .39, s * .45, pink ? (j % 2 ? '#e9b7b3' : '#edc6bc') : (j % 2 ? '#bacadb' : '#9dbed1'));
        for (let k = 0; k < 4; k++) {
            const q = k * Math.PI / 2;
            b.add('soft', xx + Math.cos(q) * s * .16, yy + s * .10, zz + Math.sin(q) * s * .16, .10 * s, .06 * s, .10 * s, pink ? '#ffdfd0' : '#dbe4e8');
        }
    }
}