const review = { reviewedAt: '2026-09-19', contentStatus: 'source-checked-prototype', reviewType: '本轮开发时读取来源并核对公式；未做独立科学专家审核' };
export const physicsTopics = {
    optics: {
        id: 'optics', title: '光进入水中，一定会转弯吗？', place: '光路水庭',
        commonClaim: '光只要进入另一种透明物质，就一定改变方向。', verdict: 'conditional',
        verdictNote: '斜入射且两侧折射率不同时会转向；垂直入射是方向不变的例外。',
        simpleExplanation: '要一起看入射方向和两边的物质。正对界面进入时，路径仍是直的。',
        deepExplanation: '这个模型用 n₁ sin θ₁ = n₂ sin θ₂ 计算透射路径，角度从垂直界面的法线量起。上方固定为空气；下方可以替换为空气、水或玻璃。垂直入射 θ₁=0 时，θ₂ 也为 0，即使传播速度发生变化。',
        conditionsAndExceptions: ['折射率取空气 1、水 1.33、玻璃 1.52 的代表值；实际数值与材料、波长和条件有关。', '这里只处理空气向等高或更高折射率介质的入射，不演示全反射；也不求解反射强度、色散或真实水面波纹。', '这不是激光使用教程。不要在现实中把光束对着眼睛，游戏内没有实际发射装置。'],
        sources: [{ name: 'OpenStax · Rice University', title: 'University Physics Volume 3, §1.3 Refraction', url: 'https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction', date: '2016-09-29', dateNote: '书籍出版日期；章节未提供独立更新日期。', supports: '斯涅尔定律、法线角度定义，以及不同折射率的方向变化。' }, { name: 'OpenStax · Rice University', title: 'University Physics Volume 3, §1.1 The Propagation of Light', url: 'https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light', date: '2016-09-29', supports: '折射率及代表性介质参数；光速与折射率的关系。' }],
        simulationNotes: 'A：教材的几何光学关系。B：平界面和固定代表值计算。C：彩色路径、光点、机械灯头、透明槽剖视。路径不是肉眼可见的光，播放时间不是传播耗时；角度数值是模型计算，不是测量。', ...review
    },
    balance: {
        id: 'balance', title: '较重的一边，总会压下去吗？', place: '平衡工坊',
        commonClaim: '天平哪一边重，哪一边就一定下沉。', verdict: 'conditional',
        verdictNote: '等臂且其他条件相同才可只比质量；不等臂装置还要比较力臂。',
        simpleExplanation: '小一点的配重，放远一点，也能和大配重平衡。距离同样重要。',
        deepExplanation: '横杆初始水平，竖直重力的力矩大小是 m g d。两侧力矩相等时，没有净转动力矩；支点还需提供支持力来平衡总重力。本装置忽略横杆自重和支点摩擦。',
        conditionsAndExceptions: ['只研究一个支点、竖直重力和固定配重的位置；标为米的距离属于理想模型尺度。', '平衡条件不意味着摩擦、横杆质量、结构强度和真实装置阻力都可以忽略。', '动画中的止挡限制了倾斜。倾斜方向来自力矩符号；最终倾角和运动速度是美术编排，不是动力学解。'],
        sources: [{ name: 'OpenStax · Rice University', title: 'University Physics Volume 1, §12.1 Conditions for Static Equilibrium', url: 'https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium', date: '2016-09-19', dateNote: '书籍出版日期。', supports: '静力平衡需满足合力及合力矩为零；力矩与作用点距离和角度有关。' }],
        simulationNotes: 'A：力与力矩的平衡条件。B：忽略杆重的水平起始杠杆，g=9.8 m/s²。C：缓慢倾斜、止挡和配重外观。N·m 是由预设参数计算的力矩，不是传感器读数。', ...review
    },
    sound: {
        id: 'sound', title: '拨得更用力，音调就更高吗？', place: '弦音花亭',
        commonClaim: '把同一根弦拨得更响，音调就一定变高。', verdict: 'incorrect',
        verdictNote: '“一定变高”不成立。理想小振幅模型中，基频由弦长、张力和线密度决定。',
        simpleExplanation: '响一点和高一点不是同一件事。试着只改变拨弦幅度，再只缩短弦长。',
        deepExplanation: '均匀理想弦两端固定，基频 f = (1 / 2L) √(T / μ)。本装置固定线密度，改变有效长度、张力或拨弦幅度；前两者会改变计算基频，幅度改变则不进入这个线性公式。',
        conditionsAndExceptions: ['现实乐器的大幅度振动可能改变张力；材料、刚度、边界条件和高次谐波也会影响声音。本模型不保证真实乐器绝不偏音。', '声音是按模型频率合成的单音，不是真实琴弦录音；不显示未经校准的分贝或声压。', '弦形按 120 倍慢放并放大振幅，方便观察。即使静音，也能用数字与波形完成所有对照。'],
        sources: [{ name: 'UNSW Physics · Music Acoustics', title: 'Strings, standing waves and harmonics', url: 'https://www.phys.unsw.edu.au/jw/strings.html', date: null, dateNote: '页面未提供明确发布日期。', supports: '弦长、张力、线密度与波速、振动频率的关系。' }, { name: 'OpenStax · Rice University', title: 'University Physics Volume 1, §16.6 Standing Waves and Resonance', url: 'https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance', date: '2016-09-19', supports: '两端固定弦的基频 f=v/(2L)，及波速与张力、线密度的关系。' }],
        simulationNotes: 'A：理想弦的基频公式。B：长度 0.3–0.9 m、张力 40/80 N、线密度 0.001 kg/m 的教学预设。C：慢放弦形、衰减包络和合成音色。标注的 Hz 是计算值；不是设备声音实测或人耳听力测试。', ...review
    }
};