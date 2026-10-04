export function guideFor(c) {
    if (!c.active) {
        if (c.travelling)
            return { stage: 'walking', title: '路上也可以停下来', body: '角色正在沿路前往装置。按方向键可接管移动；F 或“找回角色”可以重新定位。', action: 'locate-player', label: '找回角色' };
        if (c.returning)
            return { stage: 'free', title: '欢迎回来，接着你的好奇', body: '记录只保存在本机。可继续上次装置，也可以从地图选择新的角落。', action: 'map', label: '打开小镇地图' };
        return { stage: c.moved ? 'walking' : 'welcome', title: c.moved ? '已经会走了，去碰一碰装置' : '戴浅色帽子的，就是你', body: c.moved ? '点花园里的观察装置，角色会走过去。也可以直接进入，不必先学会移动。' : '点一段小路，或按 WASD／方向键。头顶定位标记会跟着角色，不会被屋顶挡住。', action: 'guide-garden', label: c.moved ? '走去观察花园' : '直接试试花园' };
    }
    if (c.compared)
        return { stage: 'free', title: '对照已记下，继续自由尝试', body: '发现簿保存的是观察条件，不是知识掌握等级。可随时换装置或进一步看来源。', action: 'journal', label: '回看发现簿' };
    if (c.running)
        return { stage: 'observing', title: '留意刚才改变的地方', body: '可以打开原理层、暂停，或重播。这里看到的是示意，不是新的科学证据。', action: 'layer', label: '切换原理层' };
    if (c.observed && !c.savedCurrent)
        return { stage: 'save', title: '先留住这次的条件', body: '保存快照不会修改模型。随后只改一个条件，再运行一次。', action: 'save', label: '保存这次观察' };
    if (c.records >= 2)
        return { stage: 'compare', title: '把两次条件放在一起', body: '对照会列出改变项与不变项。一次改了多项，也可以取回参考条件重新试。', action: 'compare', label: '打开前后对照' };
    if (c.records === 1)
        return { stage: 'change', title: '这次，只改变一个条件', body: '可以换天气、移位置或换方法。最近一次观察会作为参考，不用记住数字。', action: 'layer', label: '切换原理层' };
    return { stage: 'prepare', title: '先亲手动一下', body: '拖动有文字提示的物件，或用下方按钮改变条件。猜想可以跳过，没有正确答案门槛。', action: 'layer', label: '打开原理层看看' };
}