export const vec = (x = 0, y = 0, z = 0) => [x, y, z];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => { const n = Math.hypot(...a) || 1; return [a[0] / n, a[1] / n, a[2] / n]; };
export function multiply(out, a, b) {
    for (let c = 0; c < 4; c++)
        for (let r = 0; r < 4; r++)
            out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    return out;
}
export function ortho(out, l, r, b, t, n, f) { out.fill(0); out[0] = 2 / (r - l); out[5] = 2 / (t - b); out[10] = -2 / (f - n); out[12] = -(r + l) / (r - l); out[13] = -(t + b) / (t - b); out[14] = -(f + n) / (f - n); out[15] = 1; }
export function lookAt(out, eye, target) { const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]), x = norm(cross([0, 1, 0], z)), y = cross(z, x); out.set([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, eye), -dot(y, eye), -dot(z, eye), 1]); }
export function compose(out, p, s, r) { const sx = Math.sin(r[0]), cx = Math.cos(r[0]), sy = Math.sin(r[1]), cy = Math.cos(r[1]), sz = Math.sin(r[2]), cz = Math.cos(r[2]); out.set([(cy * cz + sy * sx * sz) * s[0], cx * sz * s[0], (-sy * cz + cy * sx * sz) * s[0], 0, (-cy * sz + sy * sx * cz) * s[1], cx * cz * s[1], (sy * sz + cy * sx * cz) * s[1], 0, sy * cx * s[2], -sx * s[2], cy * cx * s[2], 0, p[0], p[1], p[2], 1]); }
export class Camera {
    target = [0, 0, 0];
    desired = [0, 0, 0];
    yaw = .67;
    elevation = .84;
    halfHeight = 15;
    desiredHeight = 15;
    offset = [0, 0, 0];
    width = 1;
    height = 1;
    right = [1, 0, 0];
    up = [0, 1, 0];
    back = [0, 0, 1];
    eye = [0, 0, 0];
    matrix = new Float32Array(16);
    view = new Float32Array(16);
    projection = new Float32Array(16);
    update(dt, instant = false) {
        const ease = instant ? 1 : 1 - Math.exp(-dt * 5.5);
        for (let i = 0; i < 3; i++)
            this.target[i] += (this.desired[i] - this.target[i]) * ease;
        this.halfHeight += (this.desiredHeight - this.halfHeight) * ease;
        this.back = [Math.sin(this.yaw) * Math.cos(this.elevation), Math.sin(this.elevation), Math.cos(this.yaw) * Math.cos(this.elevation)];
        this.right = norm(cross([0, 1, 0], this.back));
        this.up = cross(this.back, this.right);
        this.eye = [this.target[0] + this.back[0] * 50, this.target[1] + this.back[1] * 50, this.target[2] + this.back[2] * 50];
        lookAt(this.view, this.eye, this.target);
        const w = this.halfHeight * this.width / this.height;
        ortho(this.projection, -w, w, -this.halfHeight, this.halfHeight, .1, 150);
        multiply(this.matrix, this.projection, this.view);
    }
    project(p) { const v = [p[0] - this.target[0], p[1] - this.target[1], p[2] - this.target[2]], x = dot(v, this.right) / (this.halfHeight * this.width / this.height) + this.offset[0], y = dot(v, this.up) / this.halfHeight + this.offset[1]; return [(x + 1) * this.width / 2, (1 - y) * this.height / 2]; }
    ground(x, y, level = .14) { const u = (2 * x / this.width - 1 - this.offset[0]) * this.halfHeight * this.width / this.height, v = (1 - 2 * y / this.height - this.offset[1]) * this.halfHeight; const p = [this.target[0] + this.right[0] * u + this.up[0] * v, this.target[1] + this.up[1] * v, this.target[2] + this.right[2] * u + this.up[2] * v]; const t = (level - p[1]) / this.back[1]; return [p[0] + this.back[0] * t, level, p[2] + this.back[2] * t]; }
    surface(x, y, height) {
        let top = 8, previous = this.ground(x, y, top);
        for (let level = top - .125; level >= -2; level -= .125) {
            const point = this.ground(x, y, level);
            if (level <= height(point[0], point[2])) {
                let bottom = level;
                for (let i = 0; i < 14; i++) {
                    const mid = (top + bottom) / 2, p = this.ground(x, y, mid);
                    if (mid > height(p[0], p[2]))
                        top = mid;
                    else
                        bottom = mid;
                }
                return this.ground(x, y, (top + bottom) / 2);
            }
            top = level;
            previous = point;
        }
        return previous;
    }
}