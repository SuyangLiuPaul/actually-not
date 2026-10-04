import { honey, honeyMarkers } from '../experiments/honey.js';
export const HONEY_SITE = { x: -11, z: 10.2, y: .55 };
export const nearHoney = (x, z) => Math.abs(x + 11) < 2.8 && Math.abs(z - 10.2) < 2.3;
export const honeyDock = (place) => [HONEY_SITE.x + (place === 'shelf' ? -1 : 1), HONEY_SITE.y + 1.15, HONEY_SITE.z];
export const jarPosition = (p) => { const a = honeyDock(p.place); return [a[0], a[1] + .65, a[2]]; };
export function honeyStatic(b, nav) {
    const { x, z, y } = HONEY_SITE, wood = '#b79468', cream = '#eadbc0';
    b.add('cylinder', x, y + .025, z, 5.4, .15, 4.1, '#d1c49f');
    for (let i = 0; i < 12; i++)
        b.add('box', x - 2.25 + i * .41, y + .13, z, .39, .09, 3.8, i % 2 ? '#d8c8a5' : '#dfd0af');
    // Light, open-sided honey room: canopy, end wall, shelves, counter, posts and tool details.
    for (const dx of [-2.3, 2.3]) {
        b.add('box', x + dx, y + 1.62, z - 1.25, .15, 3.0, .15, wood);
        b.add('box', x + dx, y + .56, z + .96, .66, .74, .62, wood);
        b.add('sphere', x + dx, y + 1.09, z + .96, .7, .46, .64, '#9aaf79');
        nav.obstacles.push({ x: x + dx, z: z - 1.25, w: .18, d: .18 });
        nav.obstacles.push({ x: x + dx, z: z + .96, w: .66, d: .62 });
    }
    b.add('roof', x, y + 3.35, z - .6, 5.3, .66, 2.9, '#b79569', 0, 0, 0, 0, 'honey');
    b.add('box', x, y + 2.97, z - 1.25, 4.8, .2, .18, cream);
    b.add('box', x, y + 1.36, z - 1.38, 4.65, 1.78, .13, '#d4c8a7');
    nav.obstacles.push({ x, z: z - 1.38, w: 4.65, d: .13 });
    for (const yy of [.73, 1.35, 1.99]) {
        b.add('box', x, y + yy, z - 1.04, 3.2, .08, .4, wood);
        for (let j = 0; j < 5; j++) {
            b.add('cylinder', x - 1.24 + j * .61, y + yy + .21, z - 1.04, .32, .34, .31, j % 2 ? '#e1c081' : '#d7c79d');
            b.add('cylinder', x - 1.24 + j * .61, y + yy + .4, z - 1.04, .34, .06, .34, '#899c83');
        }
    }
    b.add('box', x, y + 1.08, z, 4.4, .18, 1.45, cream);
    for (const dx of [-1.95, 1.95])
        for (const dz of [-.5, .5])
            b.add('box', x + dx, y + .6, z + dz, .14, 1.0, .14, wood);
    nav.obstacles.push({ x, z, w: 4.4, d: 1.45 });
    b.add('box', x - 1, y + 1.2, z, 1.72, .08, 1.26, '#c4ad83');
    // Basin with a visible rim, tiny side handles and a side-on water band.
    b.add('cylinder', x + 1, y + 1.27, z, 1.55, .3, 1.38, '#91aba8');
    b.add('cylinder', x + 1, y + 1.43, z, 1.39, .018, 1.23, '#b0d1ca');
    for (const dx of [-.79, .79])
        b.add('box', x + 1 + dx, y + 1.36, z, .21, .08, .26, '#d9e2cf');
    // Non-interactive sketch pad and honey dipper make this a working place, not a lone primitive.
    b.add('box', x, y + 1.2, z + .47, .38, .03, .42, '#f8eed5', 0, .1);
    b.add('cylinder', x - .02, y + 1.25, z - .33, .055, .65, .055, wood, Math.PI / 2, Math.PI / 4);
    for (let j = 0; j < 4; j++)
        b.add('cylinder', x + .16, y + 1.25, z - .14 + j * .045, .18, .027, .18, '#b28e5e', Math.PI / 2);
}
export function drawHoney(b, s) {
    const active = s?.topic === 'honey', p = active ? s.honey : honey.defaults(), [x, y, z] = jarPosition(p);
    const progress = active && s.phase !== 'ready' ? s.elapsed / 5 : 0, n = honeyMarkers(p, progress);
    // Open front is a labelled diagram cutaway, never an actual transparent-material simulation.
    const exploded = Boolean(active && s.flip), cutaway = Boolean(active && (s.layer || s.flip));
    b.add('cylinder', x, y - .24, z - (exploded ? .2 : 0), .91, .81, exploded ? .36 : .91, p.place === 'bath' ? '#dfca97' : '#d3b478');
    b.add('cylinder', x, y + .21 + (exploded ? .55 : 0), z, .78, .13, .78, '#97aa94');
    b.add('cylinder', x, y - .67, z, .92, .055, .92, '#93b6b1');
    for (const side of [-1, 1])
        b.add('box', x + side * .46, y - .2, z, .027, .77, .72, '#c1d1bd');
    if (!cutaway)
        b.add('box', x, y - .2, z + .454, .57, .34, .021, '#f3e7c5');
    if (exploded) {
        // Pull out a larger ordering sketch, not a real molecular lattice or microscope image.
        b.add('box', x, y - .18, z + .88, 1.46, 1.11, .05, '#edddba');
        for (let i = 0; i < 20; i++) {
            const ordered = i < Math.min(20, n), xx = x - .55 + (i % 5) * .27 + (ordered ? 0 : Math.sin(i * 7) * .065);
            const yy = y - .58 + Math.floor(i / 5) * .25 + (ordered ? 0 : Math.cos(i * 5) * .05);
            b.add(ordered ? 'box' : 'sphere', xx, yy, z + .93, ordered ? .17 : .073, ordered ? .17 : .073, .08, ordered ? '#fff3d8' : '#b08b58');
        }
    }
    if (cutaway) {
        b.add('box', x, y - .26, z + .462, .8, .77, .025, '#f0daa2');
        for (let i = 0; i < n; i++) {
            const xx = x - .31 + i % 5 * .155, yy = y - .56 + Math.floor(i / 5) * .115;
            b.add('box', xx, yy, z + .494, .106, .084, .06, '#fff0d0', 0, 0, (i % 3 - 1) * .13);
        }
        // Diffuse dots vs ordered blocks are two labelled visual conventions, not literal molecules.
        for (let i = 0; i < 12; i++)
            b.add('sphere', x - .3 + (i % 4) * .2, y + .02 - Math.floor(i / 4) * .11, z + .496, .044, .044, .03, '#bc904f');
    }
    else {
        for (let i = 0; i < Math.ceil(n / 4); i++)
            b.add('sphere', x - .29 + i % 3 * .27, y - .48 + Math.floor(i / 3) * .12, z + .455, .19, .13, .06, '#f1e2b7');
    }
}