import { terrainHeight, BASE, riverX } from './landscape.js';
import { VIEW_TARGETS } from '../content/places.js';
/** Geometry responds to the same state shown by the optional scenic controls. */
export function drawExploration(b, s, fixedTime) {
    // Two hinged glass-like roof panels. Framed panes stay attached during opening.
    const gx = -10.1, gz = -6, gy = .64 - BASE;
    for (const side of [-1, 1]) {
        const a = -side * (.52 - s.ventAngle * .85), c = Math.cos(a), sn = Math.sin(a);
        const point = (u, y, z, w, h, d, col) => b.add('box', gx + u * c - y * sn, gy + 3.02 + u * sn + y * c, gz + z, w, h, d, col, 0, 0, a);
        const u = side * .92;
        point(u, 0, 0, 2.05, .07, 2.72, s.data.vent ? '#bed6ce' : '#a9c7c4');
        for (const z of [-1.35, -.68, 0, .68, 1.35])
            point(u, .055, z, 2.06, .07, .06, '#e1e2ce');
        for (const k of [0, side * .92, side * 1.88])
            point(k, .055, 0, .07, .08, 2.78, '#dbe0cc');
        // The front latch rotates with its roof panel, rather than hovering above it.
        point(side * 1.45, .08, 1.42, .36, .08, .08, '#788e81');
    }
    // Small handwheel and sliding demonstration sluice on the near bank.
    const z = 4.65, x = riverX(z) + .62, cy = .96, angle = fixedTime === undefined ? s.wheelAngle : fixedTime * s.data.gate * .48, elapsed = fixedTime ?? s.elapsed;
    for (const dx of [-.95, .95])
        b.add('cylinder', x + dx, .46, z + .17, .11, 1, .11, '#a28260');
    b.add('cylinder', x, cy, z, .18, .7, .18, '#6e8582', Math.PI / 2);
    b.add('ring', x, cy, z - .16, .86, .86, .86, '#a48765', Math.PI / 2);
    b.add('ring', x, cy, z + .16, .86, .86, .86, '#b99c75', Math.PI / 2);
    for (let i = 0; i < 10; i++) {
        const a = i * Math.PI / 5 + angle;
        b.add('box', x + Math.sin(a) * .73, cy + Math.cos(a) * .73, z, .39, .13, .53, i % 2 ? '#be9e74' : '#d0b284', 0, 0, -a);
        b.add('box', x + Math.sin(a) * .43, cy + Math.cos(a) * .43, z, .065, .85, .08, '#8c7051', 0, 0, -a);
    }
    // Channel, gate frame and the visible gate itself. Water strip narrows with the gate setting.
    for (const xx of [x - .36, x + .36])
        b.add('box', xx, .42, z - 1.05, .1, .24, 1.2, '#b89a76');
    b.add('box', x, .39, z - 1.05, .68, .08, 1.2, '#a78c6e');
    if (s.data.gate > 0)
        b.add('box', x, .45, z - .93, .28 + s.data.gate * .15, .045, 1.27, '#8abdbc', 0, 0, 0, 2);
    for (const xx of [x - .35, x + .35])
        b.add('box', xx, .8, z - 1.35, .09, 1, .1, '#a88d69');
    b.add('box', x, .52 + s.gateLift * .6, z - 1.35, .62, .52, .075, '#819c93');
    b.add('cylinder', x, 1.22, z - 1.35, .055, .48, .055, '#6b827d');
    b.add('ring', -.68, 1.15, 4.2, .26, .26, .26, '#657f7a', Math.PI / 2);
    for (let i = 0; i < 4; i++)
        b.add('box', -.68, 1.15, 4.2, .065, .48, .045, '#7f9890', 0, 0, i * Math.PI / 4 + s.gateLift * 2);
    b.add('cylinder', -.68, .72, 4.2, .07, .87, .07, '#a48964');
    if (s.data.gate > 0) {
        for (let i = 0; i < 4; i++) {
            const t = (elapsed * .8 + i / 4) % 1;
            b.add('sphere', x, .44 - t * .24, z - .36 + t * .38, .045, .1, .06, '#c1dbd3');
        }
    }
    // Ridge-mounted telescope, with a real rotating tube and three legs.
    const tx = -6.65, tz = -8.7, ground = terrainHeight(-6.65, -8.3), target = VIEW_TARGETS[s.data.view], yaw = Math.atan2(target[0] - tx, target[2] - tz);
    for (let i = 0; i < 3; i++) {
        const a = i * Math.PI * 2 / 3;
        b.add('cylinder', tx + Math.cos(a) * .2, ground + .54, tz + Math.sin(a) * .2, .07, .91, .07, '#bc9b74', .23, a);
    }
    b.add('cylinder', tx, ground + 1.06, tz, .14, .46, .14, '#779187');
    b.add('cylinder', tx + Math.sin(yaw) * .1, ground + 1.44, tz + Math.cos(yaw) * .1, .25, .98, .25, '#8ca8a1', Math.PI / 2, yaw);
    b.add('cylinder', tx + Math.sin(yaw) * .57, ground + 1.44, tz + Math.cos(yaw) * .57, .3, .075, .3, '#4d7379', Math.PI / 2, yaw);
    b.add('cylinder', tx - Math.sin(yaw) * .43, ground + 1.44, tz - Math.cos(yaw) * .43, .16, .16, .16, '#6d8276', Math.PI / 2, yaw);
    // A direction marker on the deck uses shape as well as colour.
    b.add('roof', tx + Math.sin(yaw) * .75, ground + .125, tz + Math.cos(yaw) * .75, .24, .15, .36, '#e4d2a7', Math.PI / 2, yaw);
}