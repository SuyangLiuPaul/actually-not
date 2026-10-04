import { insideMap, isWater, terrainHeight, trailDistance } from './landscape.js';
export { riverX, isBridge } from './landscape.js';
export class Navigation {
    surface = null;
    obstacles = [];
    cell = .4;
    nx = 111;
    nz = 106;
    costs = new Map();
    free(x, z, r = .23) {
        if (!Number.isFinite(x) || !Number.isFinite(z) || !(this.surface?.inside ?? insideMap)(x, z, r + .2))
            return false;
        if ((this.surface?.water ?? isWater)(x, z, r + .04))
            return false;
        if (Math.hypot((this.surface?.height ?? terrainHeight)(x + .12, z) - (this.surface?.height ?? terrainHeight)(x - .12, z), (this.surface?.height ?? terrainHeight)(x, z + .12) - (this.surface?.height ?? terrainHeight)(x, z - .12)) / .24 > 1.65)
            return false;
        for (const o of this.obstacles) {
            if (o.round) {
                if (Math.hypot(x - o.x, z - o.z) < o.w / 2 + r)
                    return false;
            }
            else if (Math.abs(x - o.x) < o.w / 2 + r && Math.abs(z - o.z) < o.d / 2 + r)
                return false;
        }
        return true;
    }
    nearest(x, z) {
        if (this.free(x, z))
            return [x, z];
        for (let r = .4; r <= 2.4; r += .4)
            for (let i = 0; i < 16; i++) {
                const a = i * Math.PI / 8, nx = x + Math.cos(a) * r, nz = z + Math.sin(a) * r;
                if (this.free(nx, nz))
                    return [nx, nz];
            }
        return null;
    }
    index(x, z) { const i = Math.max(0, Math.min(this.nx - 1, Math.round((x + 22) / this.cell))), j = Math.max(0, Math.min(this.nz - 1, Math.round((z + 16) / this.cell))); return j * this.nx + i; }
    point(i) { return [i % this.nx * this.cell - 22, Math.floor(i / this.nx) * this.cell - 16]; }
    path(start, goal) {
        const target = this.nearest(...goal);
        if (!target)
            return [];
        const source = this.nearest(...start);
        if (!source)
            return [];
        const s = this.index(...source), g = this.index(...target), n = this.nx * this.nz, cost = new Float64Array(n).fill(Infinity), parent = new Int32Array(n).fill(-1), closed = new Uint8Array(n), open = [s];
        cost[s] = 0;
        const h = (id) => { const [x, z] = this.point(id); return Math.hypot(x - target[0], z - target[1]); };
        let end = -1;
        for (let attempts = 0; open.length && attempts < n; attempts++) {
            let best = 0;
            for (let i = 1; i < open.length; i++)
                if (cost[open[i]] + h(open[i]) < cost[open[best]] + h(open[best]))
                    best = i;
            const id = open.splice(best, 1)[0];
            if (closed[id])
                continue;
            closed[id] = 1;
            if (id === g || h(id) < .32) {
                end = id;
                break;
            }
            const ix = id % this.nx, iz = Math.floor(id / this.nx);
            for (let dz = -1; dz <= 1; dz++)
                for (let dx = -1; dx <= 1; dx++) {
                    if (!dx && !dz || ix + dx < 0 || ix + dx >= this.nx || iz + dz < 0 || iz + dz >= this.nz)
                        continue;
                    const k = (iz + dz) * this.nx + ix + dx;
                    if (closed[k])
                        continue;
                    const [x, z] = this.point(k);
                    if (!this.free(x, z))
                        continue;
                    const [cx, cz] = this.point(id);
                    if (dx && dz && (!this.free(x, cz) || !this.free(cx, z)))
                        continue;
                    let preference = this.costs.get(k);
                    if (preference === undefined) {
                        preference = (this.surface?.trail ?? trailDistance)(x, z) < .15 ? 1 : 1.32;
                        this.costs.set(k, preference);
                    }
                    const c = cost[id] + Math.hypot(dx, dz) * this.cell * preference;
                    if (c < cost[k]) {
                        cost[k] = c;
                        parent[k] = id;
                        open.push(k);
                    }
                }
        }
        if (end < 0)
            return [];
        const result = [];
        for (let p = end; p !== s && p >= 0; p = parent[p])
            result.push(this.point(p));
        result.reverse();
        result.push(target);
        return result;
    }
    move(p, dx, dz) {
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / .15));
        let [x, z] = p;
        for (let i = 0; i < steps; i++) {
            const nx = x + dx / steps, nz = z + dz / steps;
            if (this.free(nx, nz)) {
                x = nx;
                z = nz;
            }
            else {
                if (this.free(nx, z))
                    x = nx;
                if (this.free(x, nz))
                    z = nz;
            }
        }
        return [x, z];
    }
    follow(position, path, dt, speed = 3.6) {
        let p = [...position], budget = Math.max(0, dt) * speed, heading = 0, walking = false, blocked = false;
        for (let count = 0; path.length && budget > 1e-7 && count < 256; count++) {
            const target = path[0], dx = target[0] - p[0], dz = target[1] - p[1], distance = Math.hypot(dx, dz);
            if (distance < .035) {
                path.shift();
                continue;
            }
            const step = Math.min(budget, distance), next = this.move(p, dx / distance * step, dz / distance * step);
            if (Math.hypot(next[0] - p[0], next[1] - p[1]) < 1e-6) {
                blocked = true;
                path.length = 0;
                break;
            }
            p = next;
            heading = Math.atan2(dx, dz);
            walking = true;
            budget -= step;
            if (Math.hypot(target[0] - p[0], target[1] - p[1]) < .035)
                path.shift();
        }
        return { position: p, heading, walking, blocked };
    }
}