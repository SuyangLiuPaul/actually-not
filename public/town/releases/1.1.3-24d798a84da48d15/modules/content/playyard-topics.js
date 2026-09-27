const checked = { reviewedAt: '2026-09-19', reviewType: '开发时核对原始教材；未做独立专家审核', contentStatus: 'source-checked-prototype' };
export const playyardTopics = {
    buoyancy: { id: 'buoyancy', place: '浮沉船坞', title: '重的东西就一定沉下去？', commonClaim: '只要更重，就一定沉下去。', verdict: 'incorrect', verdictNote: '浮沉取决于总质量、可排水体积和液体密度，不是只比较重量。',
        simpleExplanation: '同样重的密封物体，可以有不同的排水体积。把体积改变，再看看它们在同一种水里停在哪里。',
        deepExplanation: '阿基米德原理给出浮力 Fᵦ=ρ液gV排。完全浸没时的最大排水体积与物体体积相等。漂浮平衡时 Fᵦ=mg；本模型比较 m 与 ρ液V。密度相等时允许理想悬浮，不将它判成下沉。',
        conditionsAndExceptions: ['密封物体不进水，忽略水流、表面张力和空气浮力；装饰不进入参数。', '代表液体密度为 1000 或 1030 kg/m³，不是现场测量。浮沉动画是教学过渡，不是求解阻力或真实沉降时间。', '到达槽底的物体还有槽底支持力。小船的稳定性、倾覆、渗漏和人员安全均不在模型中。'],
        sources: [{ name: 'OpenStax', title: 'University Physics Volume 1 §14.4 — Archimedes’ Principle and Buoyancy', url: 'https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy', date: '2016-09-19', dateNote: '书籍出版日，不是章节更新日。', supports: '浮力等于排开液体的重量；平均密度、漂浮、下沉与中性浮力。' }],
        simulationNotes: 'A：阿基米德原理。B：密封体积与总质量的理想模型；读数是参数计算。C：玩具船、彩色刻线、开槽剖面和慢动作；不是现实测量或安全教程。', ...checked },
    shadow: { id: 'shadow', place: '光影小剧场', title: '影子变大，物体也变大了吗？', commonClaim: '影子大小只由物体大小决定。', verdict: 'incorrect', verdictNote: '光源、物体和接收面的相对位置同样重要。',
        simpleExplanation: '猫头鹰物偶没变，只是换了站的位置。把它推近灯，再把幕布往后移，看看哪个距离在改变。',
        deepExplanation: '在点光源和相互平行的物偶、幕布模型中，相似三角形给出线性放大率 M=光源到幕布距离÷光源到物偶距离。边界射线在均匀介质中按直线传播。',
        conditionsAndExceptions: ['只模拟一个理想点光源；没有面积光源的半影、多个光源、衍射或散射。', '灯、物偶和幕布的标称尺度用于模型计算，木台外观不是可量测的尺。', '阴影由保存的投影参数构建，不是现场摄影；光线示意不是现实可见的光束。'],
        sources: [{ name: 'OpenStax', title: 'University Physics Volume 3 §1.1 — The Propagation of Light', url: 'https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light', date: '2016-09-29', dateNote: '书籍出版日；比例关系由本模型的相似三角形推导。', supports: '几何光学中的光线与直线传播近似；据此构造投影几何。' }],
        simulationNotes: 'A：几何光学近似。B：相似三角形计算投影大小。C：猫头鹰木偶、叶片、舞台帷幕与可视边界射线。没有照度和眼部暴露估计，不需要在现实中直视强光。', ...checked },
    pulley: { id: 'pulley', place: '绳轮花棚', title: '用滑轮省了力，也省了功？', commonClaim: '用滑轮既省力，又能用更短的拉绳距离完成同样提升。', verdict: 'incorrect', verdictNote: '理想省力以更长的输入距离换取；实际装置还存在损耗。',
        simpleExplanation: '慢慢拉绳，看看花篮升了多高。多几段绳一起托住花篮，手可以少用力，却要拉更长。',
        deepExplanation: '在轻绳、轻滑轮、无摩擦、各承重绳段竖直的准静态模型中，nT=mg，拉绳距离 s=n h。输入功 Ts 与重力势能增加 mgh 相同。一个定滑轮只改变力的方向，机械利益为 1。',
        conditionsAndExceptions: ['绳段数量指直接向上托住移动载荷的绳段，不是滑轮总数。', '不计滑轮质量、绳伸长与摩擦，忽略加速度。真实装置不能据此确定吊装安全。', '花篮、花盆、花的总质量统一由载荷参数代表。动画速度和绳端标记是教学表现。'],
        sources: [{ name: 'OpenStax', title: 'College Physics 2e §9.5 — Simple Machines', url: 'https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines', date: null, dateNote: '未将访问日期当作出版日。', supports: '机械利益、承重绳段、定滑轮改变方向及能量守恒。' }],
        simulationNotes: 'A：力平衡和能量守恒。B：1、2、4 承重绳段的理想模型。C：木棚、花篮与缓动播放。所有牛顿、米、焦耳均标为模型计算，不是真实测力。', ...checked }
};