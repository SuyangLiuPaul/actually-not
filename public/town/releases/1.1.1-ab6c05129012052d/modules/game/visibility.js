/** Conservative CPU frustum test for instanced props; visual culling is not game collision. */
export function visibleInCamera(item, camera, margin = 1) {
    const m = item.matrix, dx = m[12] - camera.target[0], dy = m[13] - camera.target[1], dz = m[14] - camera.target[2];
    const scaleSquared = m[0] ** 2 + m[1] ** 2 + m[2] ** 2 + m[4] ** 2 + m[5] ** 2 + m[6] ** 2 + m[8] ** 2 + m[9] ** 2 + m[10] ** 2;
    const factor = item.shape === 'ring' || item.shape === 'torus' ? 1 : item.shape === 'parasol' ? .68 : .55;
    const radius = Math.sqrt(scaleSquared) * factor + margin;
    const hh = camera.halfHeight, hw = hh * camera.width / Math.max(camera.height, 1);
    const px = dx * camera.right[0] + dy * camera.right[1] + dz * camera.right[2] + camera.offset[0] * hw;
    const py = dx * camera.up[0] + dy * camera.up[1] + dz * camera.up[2] + camera.offset[1] * hh;
    return Math.abs(px) <= hw + radius && Math.abs(py) <= hh + radius;
}