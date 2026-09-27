import { cross, norm, dot } from './math.js';
export function geometry(shape, detail = 'high') {
    const a = [];
    function tri(p, q, r, normal) {
        let n = normal ?? norm(cross([q[0] - p[0], q[1] - p[1], q[2] - p[2]], [r[0] - p[0], r[1] - p[1], r[2] - p[2]]));
        if (!normal && dot(n, [(p[0] + q[0] + r[0]) / 3, (p[1] + q[1] + r[1]) / 3, (p[2] + q[2] + r[2]) / 3]) < 0) {
            n = [-n[0], -n[1], -n[2]];
            [q, r] = [r, q];
        }
        for (const v of [p, q, r])
            a.push(...v, ...n);
    }
    const quad = (p, q, r, s) => { tri(p, q, r); tri(p, r, s); };
    if (shape === 'box') {
        const v = [[-.5, -.5, -.5], [.5, -.5, -.5], [.5, .5, -.5], [-.5, .5, -.5], [-.5, -.5, .5], [.5, -.5, .5], [.5, .5, .5], [-.5, .5, .5]];
        for (const f of [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [3, 2, 6, 7], [0, 3, 7, 4], [1, 5, 6, 2]])
            quad(v[f[0]], v[f[1]], v[f[2]], v[f[3]]);
    }
    if (shape === 'roof') {
        const p = [-.5, -.5, -.5], q = [.5, -.5, -.5], r = [0, .5, -.5], s = [-.5, -.5, .5], t = [.5, -.5, .5], u = [0, .5, .5];
        tri(p, q, r);
        tri(s, u, t);
        quad(p, r, u, s);
        quad(r, q, t, u);
        quad(p, s, t, q);
    }
    if (shape === 'cylinder' || shape === 'cone') {
        const n = 10;
        for (let i = 0; i < n; i++) {
            const t = i * 2 * Math.PI / n, k = (i + 1) * 2 * Math.PI / n, b = [.5 * Math.cos(t), -.5, .5 * Math.sin(t)], c = [.5 * Math.cos(k), -.5, .5 * Math.sin(k)];
            tri([0, -.5, 0], c, b);
            if (shape === 'cone')
                tri(b, c, [0, .5, 0]);
            else {
                const d = [b[0], .5, b[2]], e = [c[0], .5, c[2]];
                quad(b, c, e, d);
                tri([0, .5, 0], d, e);
            }
        }
    }
    if (shape === 'sphere') {
        const n = 8, m = 4;
        const p = (i, j) => { const t = i * 2 * Math.PI / n, l = j * Math.PI / m - Math.PI / 2; return [.5 * Math.cos(l) * Math.cos(t), .5 * Math.sin(l), .5 * Math.cos(l) * Math.sin(t)]; };
        for (let i = 0; i < n; i++)
            for (let j = 0; j < m; j++)
                if (j === 0)
                    tri(p(i, j), p(i + 1, j + 1), p(i, j + 1));
                else if (j === m - 1)
                    tri(p(i, j), p(i + 1, j), p(i, j + 1));
                else
                    quad(p(i, j), p(i + 1, j), p(i + 1, j + 1), p(i, j + 1));
    }
    if (shape === 'ring') {
        for (let i = 0; i < 32; i++) {
            const t = i * Math.PI / 16, k = (i + 1) * Math.PI / 16, p = [Math.cos(t), 0, Math.sin(t)], q = [Math.cos(k), 0, Math.sin(k)], r = [Math.cos(k) * .82, 0, Math.sin(k) * .82], s = [Math.cos(t) * .82, 0, Math.sin(t) * .82];
            tri(p, q, r, [0, 1, 0]);
            tri(p, r, s, [0, 1, 0]);
        }
    }
    // Small, reusable hero meshes; authored canopy meshes keep a restrained faceted silhouette.
    // Bounds: bevel/soft = unit cube; torus radius = 1; curtain = unit height.
    if (shape === 'bevel') {
        const levels = [-.5, -.42, .42, .5], radius = .08;
        const rounded = (p) => {
            const core = p.map(x => Math.max(-.42, Math.min(.42, x)));
            const n = norm([p[0] - core[0], p[1] - core[1], p[2] - core[2]]);
            return [[core[0] + radius * n[0], core[1] + radius * n[1], core[2] + radius * n[2]], n];
        };
        for (let axis = 0; axis < 3; axis++)
            for (const sign of [-1, 1]) {
                const u = (axis + 1) % 3, v = (axis + 2) % 3;
                for (let i = 0; i < 3; i++)
                    for (let j = 0; j < 3; j++) {
                        const corners = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([x, y]) => {
                            const p = [0, 0, 0];
                            p[axis] = sign * .5;
                            p[u] = levels[x];
                            p[v] = levels[y];
                            return rounded(p);
                        });
                        for (const index of sign > 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2])
                            a.push(...corners[index][0], ...corners[index][1]);
                    }
            }
    }
    if (shape === 'soft') {
        const segments = detail === 'low' ? 10 : 16, rings = detail === 'low' ? 6 : 10;
        const point = (i, j) => {
            const phi = j * Math.PI / rings - Math.PI / 2, theta = i * 2 * Math.PI / segments;
            const n = [Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)];
            return [[n[0] * .5, n[1] * .5, n[2] * .5], n];
        };
        for (let i = 0; i < segments; i++)
            for (let j = 0; j < rings; j++) {
                const c = [point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1)];
                const order = j === 0 ? [0, 2, 3] : j === rings - 1 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3];
                for (const k of order)
                    a.push(...c[k][0], ...c[k][1]);
            }
    }
    if (shape === 'torus') {
        const point = (i, j) => {
            const t = i * Math.PI / 12, k = j * Math.PI / 4, n = [Math.cos(t) * Math.cos(k), Math.sin(k), Math.sin(t) * Math.cos(k)];
            return [[Math.cos(t) * (.90 + .10 * Math.cos(k)), .10 * Math.sin(k), Math.sin(t) * (.90 + .10 * Math.cos(k))], n];
        };
        for (let i = 0; i < 24; i++)
            for (let j = 0; j < 8; j++) {
                const c = [point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1)];
                for (const k of [0, 1, 2, 0, 2, 3])
                    a.push(...c[k][0], ...c[k][1]);
            }
    }
    if (shape === 'curtain') {
        const point = (i, j) => {
            const u = i / 24, t = j / 6, fold = Math.cos(u * Math.PI * 10);
            return [u - .5, .5 - t + .035 * Math.sin(u * Math.PI * 5) * t, .09 * fold * (.45 + .55 * t)];
        };
        for (let i = 0; i < 24; i++)
            for (let j = 0; j < 6; j++)
                quad(point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1));
    }
    if (shape === 'parasol') {
        const slices = 64, rings = 5;
        const p = (i, j) => {
            const angle = i * Math.PI * 2 / slices, r = j / rings;
            const rim = .5 * (1 - .055 * (1 - Math.cos(angle * 8)) * .5 * r * r);
            return [Math.cos(angle) * rim * r, .5 - .98 * Math.pow(r, .76), Math.sin(angle) * rim * r];
        };
        for (let i = 0; i < slices; i++)
            for (let j = 0; j < rings; j++) {
                if (j === 0)
                    tri(p(i, 0), p(i + 1, 1), p(i, 1));
                else
                    quad(p(i, j), p(i + 1, j), p(i + 1, j + 1), p(i, j + 1));
                if (j === rings - 1) {
                    const a = p(i, rings), b = p(i + 1, rings);
                    quad(a, b, [b[0], b[1] - .14, b[2]], [a[0], a[1] - .14, a[2]]);
                }
            }
    }
    if (shape === 'decal') {
        const vertices = [[-.5, 0, -.5], [.5, 0, -.5], [.5, 0, .5], [-.5, 0, .5]];
        for (const i of [0, 1, 2, 0, 2, 3])
            a.push(...vertices[i], 0, 1, 0);
    }
    if (shape === 'crown') {
        const segments = 12, rings = 7;
        const point = (i, j) => {
            const t = i * Math.PI * 2 / segments, phi = j * Math.PI / rings - Math.PI / 2;
            const rad = .5 * (1 + .055 * Math.sin(t * 3 + phi * 2) + .026 * Math.cos(t * 5 - phi));
            return [rad * Math.cos(phi) * Math.cos(t), .5 * Math.sin(phi), rad * Math.cos(phi) * Math.sin(t)];
        };
        for (let i = 0; i < segments; i++)
            for (let j = 0; j < rings; j++) {
                const ps = [point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1)];
                const ids = j === 0 ? [0, 2, 3] : j === rings - 1 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3];
                for (let k = 0; k < ids.length; k += 3) {
                    const p = ps[ids[k]], q = ps[ids[k + 1]], r = ps[ids[k + 2]];
                    let n = norm(cross([q[0] - p[0], q[1] - p[1], q[2] - p[2]], [r[0] - p[0], r[1] - p[1], r[2] - p[2]]));
                    if (dot(n, p) < 0)
                        n = [-n[0], -n[1], -n[2]];
                    for (const ix of ids.slice(k, k + 3)) {
                        const v = ps[ix], smooth = norm(v), mix = norm([n[0] * .62 + smooth[0] * .38, n[1] * .62 + smooth[1] * .38, n[2] * .62 + smooth[2] * .38]);
                        a.push(...v, ...mix);
                    }
                }
            }
    }
    if (shape === 'spruce') {
        const count = 12;
        const ring = (i, level) => {
            const t = i * Math.PI * 2 / count, rad = level === 0 ? .5 * (1 + .045 * Math.sin(i * 2.4)) : level === 1 ? .34 : .12;
            return [Math.cos(t) * rad, (level === 0 ? -.5 : level === 1 ? -.03 : .34) + (level === 0 ? .025 * Math.sin(i * 3.5) : 0), Math.sin(t) * rad];
        };
        for (let i = 0; i < count; i++) {
            tri([0, -.46, 0], ring(i + 1, 0), ring(i, 0));
            for (let j = 0; j < 2; j++)
                quad(ring(i, j), ring(i + 1, j), ring(i + 1, j + 1), ring(i, j + 1));
            tri(ring(i, 2), ring(i + 1, 2), [.03, .5, 0]);
        }
    }
    return new Float32Array(a);
}