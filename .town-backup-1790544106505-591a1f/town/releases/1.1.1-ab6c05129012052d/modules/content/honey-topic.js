export const honeyTopic = {
    id: 'honey', place: '蜜晶小院', title: '蜂蜜结晶了，就是假的吗？',
    commonClaim: '蜂蜜结晶就说明掺了糖；清澈才是真的。', verdict: 'incorrect',
    verdictNote: '“结晶必是假”的通则错误；仅凭外观判断某罐真伪，证据不足。',
    simpleExplanation: '天然蜂蜜也会结晶。把它想成溶液里一些糖分子排起队；晶体可以形成，也可以回溶。清澈或结晶都不是真假标签。',
    deepExplanation: '蜂蜜中的主要糖包括葡萄糖和果糖。结晶涉及葡萄糖与部分水形成晶体。蜜源相关的糖组成、含水量、温度、已有晶体等都会影响过程；相对较高的葡萄糖／果糖比通常更易结晶。温水可帮助晶体回溶。但温度与结晶速度不是简单的“越冷越快”，外观也不能代替鉴别掺假的检测。',
    conditionsAndExceptions: [
        '这里比较的是两个定性组成预设，不给出品种鉴定、糖比例或真实结晶速度。不能把示意时间换算成现实的分钟或天数。',
        '同一罐在温水中的状态变化不意味着其成分真实性改变。不结晶也不能证明是假或真。游戏没有真假检测器。',
        '仅在游戏中操作。不要求品尝、加热或自行鉴定食物；没有食品安全结论，也不是家庭加热教程。',
        '观察层的格点代表排列概念；不是真实分子尺寸、晶格结构或显微镜图像。'
    ],
    sources: [{
            name: 'extensionAUS · Professional Beekeepers', title: 'Cream and candied honey',
            url: 'https://extensionaus.com.au/professionalbeekeepers/cream-and-candied-honey/', date: '2019-11-22',
            supports: '结晶是蜂蜜的自然变化；葡萄糖、果糖、蜜源及起始晶体影响过程；不是温度线性模型。'
        }, {
            name: 'Purdue University Extension · FoodLink', title: 'Honey',
            url: 'https://extension.purdue.edu/foodlink/food.php?food=honey', date: null,
            supports: '天然结晶蜂蜜及其温水回溶；只采用物理状态相关段落，不引入该页烹饪或健康建议。'
        }],
    reviewedAt: '2026-09-19', reviewType: '开发时实际阅读资料；未做独立专家审核。选题来自原站 honey-crystal，未照抄其全部表述。',
    simulationNotes: 'A：蜂蜜可自然结晶、受组成等条件影响、温水可帮助回溶。B：预设的定性情境。C：8／12／28 个绘图标记及 5 秒动画由美术编排，不是浓度、动力学、真实性或安全性测量。',
    contentStatus: 'source-checked-prototype'
};