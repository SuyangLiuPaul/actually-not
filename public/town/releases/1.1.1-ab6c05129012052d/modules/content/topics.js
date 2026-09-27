import { playyardTopics } from './playyard-topics.js';
import { honeyTopic } from './honey-topic.js';
import { physicsTopics } from './physics-topics.js';
const review = {
    reviewedAt: '2026-09-18', contentStatus: 'source-checked-prototype', reviewType: '开发时资料核对；未做独立科学专家审核'
};
export const topics = {
    ...playyardTopics,
    ...physicsTopics,
    honey: honeyTopic,
    uv: {
        id: 'uv', title: '阴天，阳光就不用在意了吗？', place: '户外观察花园', commonClaim: '阴天没有紫外线，不用在意防护。', verdict: 'incorrect', verdictNote: '“阴天没有 UV”错误；具体防护要结合当地 UV 指数等条件。', simpleExplanation: '云能改变天空的明暗，却不会保证挡住所有紫外线。树荫和遮阳棚也不是完整屏障。', deepExplanation: '可见光与紫外线是不同波段。到达地面的紫外线受太阳高度、云的性质、臭氧、海拔和地表反射等因素共同影响。云的影响不能用“云量 × 固定折扣”表达。遮挡上方的部分路径后，周围天空的散射和周边反射仍可能到达；本场景只画出前两类路径。', conditionsAndExceptions: ['没有真实地点、日期、仪器校准或 UV 指数；此处两种天空只是情境预设，不构成天气预报。', '现实中应查看当地 UV 指数及官方建议，而不是凭凉快、明暗或游戏画面决定。', '遮阳效果取决于材质、覆盖、太阳角度与周边环境；此模型不计算衣物、防晒霜或个体剂量。'], sources: [{
                name: 'ARPANSA', title: 'Ultraviolet radiation in Australia', url: 'https://www.arpansa.gov.au/understanding-radiation/radmap-aus/ultraviolet-radiation-in-australia', date: null, dateNote: '页面未明确标注发布日期；2026-09-18 访问核对。', supports: '阴冷多云天气仍有 UV 到达地面；不能凭体感判断。'
            }, {
                name: 'ARPANSA', title: 'Sun exposure and health', url: 'https://www.arpansa.gov.au/understanding-radiation/radiation-sources/more-radiation-sources/sun-exposure', date: null, dateNote: '页面日期未确认。', supports: 'UV 暴露受多因素影响，遮阳需要结合其他防护措施。'
            }, {
                name: 'ARPANSA', title: 'Sun protection using shade', url: 'https://www.arpansa.gov.au/understanding-radiation/radiation-sources/more-radiation-sources/sun-protection-shade', date: null, dateNote: '页面未明确标注发布日期；2026-09-18 访问核对。', supports: '直达、天空散射与环境反射路径；遮阳位置、覆盖范围和材质影响防护，不能只依靠遮阳。'
            }, {
                name: 'ARPANSA', title: 'Exposure from ultraviolet radiation frequently asked questions', url: 'https://www.arpansa.gov.au/understanding-radiation/radiation-sources/more-radiation-sources/sun-exposure/frequently-asked-questions', date: null, dateNote: '页面未明确标注发布日期；2026-09-18 访问核对。', supports: '可见光、热与 UV 不同；太阳高度、云、臭氧、散射、反射及海拔会影响 UV。'
            }], simulationNotes: 'A：指南知识。B：两种定性情境和三处探头位置。C：带标签的线、探头刻纹、光照和云动画。线条数量、亮度、速度都不是 UV 测量，不作线性预测。', ...review
    },
    food: {
        id: 'food', title: '食物落地，五秒内就没事？', place: '生活厨房与庭院', commonClaim: '五秒内捡起来，食物一定安全。', verdict: 'incorrect', verdictNote: '五秒不是可靠的安全分界；接触时间只是影响因素之一。', simpleExplanation: '有些转移可以发生得很快。食物、表面和接触条件也很重要；转移不等于某个人一定会生病。', deepExplanation: 'Miranda 与 Schaffner 在受控条件下研究了细菌由接触表面向食物转移。研究改变了食物、表面、接触时间和细菌制备条件；部分转移在不足一秒时就发生。实验使用已接种并干燥的表面与一种非致病的食品级替代菌，不是对每一种家庭地面的风险调查，也没有测量人吃下食物后的感染概率。', conditionsAndExceptions: ['游戏只选择研究中的西瓜、面包、瓷砖和地毯作为题材；粒子的具体转移阈值为教学动画编排，并未拟合论文数据。', '研究中的转移并非在每个食品/表面组合都随时间显著增加。这个动画只演示一个可重复的预设，不复现所有实验结果。不同家庭表面的污染水平未知。此处地毯与瓷砖的差异不构成日常安全排名。', '不要在现实中吃掉落地食物来验证。本游戏不作食物可食用性判断。'], sources: [{
                name: 'Miranda, R. C. & Schaffner, D. W. / ASM', title: 'Longer Contact Times Increase Cross-Contamination of Enterobacter aerogenes from Surfaces to Food', url: 'https://journals.asm.org/doi/10.1128/AEM.01838-16', date: '2016-10-14', dateNote: '出版方页面日期；PMC 链接为同一篇论文。', supports: '接触时间、食物和表面会影响转移；不足一秒也可发生转移。'
            }, {
                name: 'PubMed Central', title: '同一研究的开放存档（PMC5066366）', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5066366/', date: null, dateNote: '此入口在本环境有访问验证；正文通过出版方核对。', supports: '同一研究的开放存档链接，不算独立证据。'
            }], simulationNotes: 'A：研究发现与条件。B：固定种子、已污染表面、接触转移示意。C：非写实的圆点和抬升动画。36 个图形单位不是 CFU，不是感染概率；没有“安全/危险”灯和疾病结果。', ...review
    },
    hands: {
        id: 'hands', title: '看起来干净，就清洁到位了吗？', place: '清洁工作坊', commonClaim: '看不到污物，就不需要再考虑清洁方式和覆盖。', verdict: 'incorrect', verdictNote: '外观不足以判断；不同方式的适用性有条件，不能一概而论。', simpleExplanation: '看得见的污物和看不见的因素不是一回事。选合适的方法，也别漏掉指缝、拇指、指尖和手背。', deepExplanation: 'CDC 建议多数情况下用肥皂和流水清洗。肥皂与搓擦、冲洗共同帮助带走污物和微生物。没有肥皂和水时，可用含至少 60% 酒精的免洗洗手液；明显脏污或油腻时它可能不如洗手有效，也不能去除所有类型的微生物或化学物质。需要按产品用量覆盖所有手部并搓至干燥。', conditionsAndExceptions: ['现实洗手按 CDC 的湿润、起泡、搓洗至少 20 秒、冲洗、擦干步骤；游戏压缩时间，不训练真实操作时长。', '免洗洗手液不是任何情境都等同于洗手，也不是任何情境都无效。儿童使用需成人协助，不能入口。', '各区域标记只记录游戏操作覆盖。残留示意点不是实测菌量；本模型不比较不同产品的真实除菌率。'], sources: [{
                name: 'CDC', title: 'Hand Sanitizer Facts', url: 'https://www.cdc.gov/clean-hands/data-research/facts-stats/hand-sanitizer-facts.html', date: '2024-04-17', supports: '至少 60% 酒精；脏污和油腻情境限制；不能去除所有微生物和某些化学物质。'
            }, {
                name: 'CDC', title: 'About Handwashing', url: 'https://www.cdc.gov/clean-hands/about/index.html', date: '2024-02-16', supports: '肥皂加水、至少 20 秒搓洗、手背/指缝/指甲下方，以及冲洗擦干。'
            }], simulationNotes: 'A：CDC 一般卫生建议。B：情境、方法和六区操作覆盖。C：污物片、泡沫和小圆点。圆点残留是教学提醒，不是微生物去除率，也不代表保证全部清除。', ...review
    }
};
export const text = { zhCN: {
        journal: '发现簿', settings: '设置', compare: '前后对照', easy: '轻松看懂', deep: '深入探索', disclaimer: '情境模拟 · 不是测量工具'
    }, enAU: {
        journal: 'Discovery journal', settings: 'Settings', compare: 'Compare observations', easy: 'Everyday explanation', deep: 'Explore further', disclaimer: 'Illustrative simulation · not a measuring tool'
    } };