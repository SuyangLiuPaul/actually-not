import type { Myth } from '../types'

/**
 * 每条都尽量做到：结论有出处、承认不确定的地方、说明这个说法当初是怎么来的。
 * 凡是「证据不足」而不是「已被证伪」的，正文里都会讲清楚区别。
 */
export const MYTHS: Myth[] = [
  // ─────────────────────────── 吃 ───────────────────────────
  {
    id: 'breakfast',
    category: 'eat',
    belief: '早上不吃饭对身体不好，会变胖、会伤胃',
    truth: '「不吃早饭会变胖」是反的：对照试验里，不吃早饭的人反而略轻一点。',
    detail:
      '多项随机对照试验的汇总分析发现，让原本不吃早饭的人开始吃，体重并不会下降；让原本吃早饭的人停下来，体重也不会上升——平均反而轻了约 0.44 公斤，因为吃早饭的那组一天总共多摄入了约 260 千卡。所谓「不吃早饭会让代谢变慢、身体进入饥荒模式」，在实验里没有出现。\n\n不过有一点要老实说：同一批研究里，不吃早饭的人低密度脂蛋白胆固醇（LDL-C）偏高一些。所以准确的结论不是「早饭没用」，而是「早饭跟胖瘦没有因果关系」。',
    origin:
      '几十年的观察性研究确实发现吃早饭的人普遍更瘦，于是被反复引用成「早饭减肥」。但吃早饭的人往往同时也睡得好、抽烟少、运动多——早饭更像是健康生活方式的一个标记，而不是原因。这个结论后来又被麦片广告推了一把。',
    instead:
      '按你自己的饥饿感来。真正影响体重的是一天总共吃了多少，不是分几顿吃。如果不吃早饭让你中午暴食，那就吃；如果不吃也很舒服，不用逼自己。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Sievert et al., BMJ 2019 —— 早餐与体重的随机试验汇总',
        url: 'https://www.bmj.com/content/364/bmj.l42',
      },
      {
        label: 'Bonnet et al., Obesity 2020 —— 不吃早餐与体成分的系统综述',
        url: 'https://onlinelibrary.wiley.com/doi/full/10.1002/oby.22791',
      },
    ],
    related: ['late-eating'],
  },
  {
    id: 'bone-soup',
    category: 'eat',
    belief: '骨头汤补钙，煮得越久越白越补',
    truth: '骨头汤里的钙少得可怜，那锅奶白色主要是脂肪。',
    detail:
      '钙以羟基磷灰石的形式牢牢锁在骨头的矿物结构里，普通炖煮温度根本溶不出来。实测下来，一碗骨头汤的钙含量通常只有每 100 毫升几毫克，和自来水差不多；要靠它补足一天所需的钙，得喝掉几十碗。\n\n汤熬成奶白色也不是「精华出来了」，那是脂肪被乳化成小液滴散射光线的结果——越白，往往意味着脂肪越多。加醋确实能溶出一点钙，但要溶出有意义的量，那个酸度已经没法喝了。',
    origin:
      '「以形补形」的老思路：骨头是钙做的，那喝骨头汤自然补钙。听上去顺理成章，只是没考虑钙到底溶不溶得出来。',
    instead:
      '要补钙，牛奶、酸奶、豆腐（石膏点的）、深绿色叶菜、带骨小鱼都比骨头汤高出一两个数量级。一杯牛奶约 250 毫克钙。汤可以喝，就当它是汤。',
    stakes: 'wasteful',
    sources: [
      {
        label: '中国营养学会《中国居民膳食指南》—— 钙的食物来源',
        url: 'https://www.cnsoc.org/',
      },
    ],
    related: ['soup-nutrition', 'cramp-calcium'],
  },
  {
    id: 'leftovers',
    category: 'eat',
    belief: '隔夜菜有亚硝酸盐，吃了会致癌',
    truth: '及时冷藏的隔夜菜，亚硝酸盐远低于国家标准。真正的风险是细菌，不是癌。',
    detail:
      '多家机构做过实测：4°C 冷藏 24–48 小时的剩菜，亚硝酸盐增长非常缓慢，蔬菜类通常远低于腌渍蔬菜 20 mg/kg 的国标限量。而且亚硝酸盐本身不致癌，它需要在特定条件下与蛋白质分解产物结合成亚硝胺才有致癌性，日常饮食很难凑齐这些条件。\n\n关键变量不是「过了一夜」，而是「在什么温度下过的夜」。同样的菜放在 25°C 室温下 12 小时，亚硝酸盐就明显上升，有的会超标——但那时候更该担心的是细菌繁殖。',
    origin:
      '亚硝酸盐、亚硝胺、致癌，这三个词被压缩成了一句口号，中间的剂量和条件被省掉了。剂量决定毒性，这一步一省，结论就变形了。',
    instead:
      '菜做好后尽快分装、盖好、放冰箱（别等凉透，两小时内进冰箱）。绿叶菜尽量当顿吃完，剩的肉菜彻底加热再吃。凭味道和外观判断，别凭「隔了几夜」。',
    stakes: 'wasteful',
    sources: [
      {
        label: '澎湃新闻 —— 隔夜菜亚硝酸盐实测',
        url: 'https://www.thepaper.cn/newsDetail_forward_13273228',
      },
      {
        label: '浙江在线 —— 隔夜菜实验报道',
        url: 'https://zjnews.zjol.com.cn/zjnews/tznews/201603/t20160316_607651.shtml',
      },
    ],
    related: ['moldy-fruit'],
  },
  {
    id: 'msg',
    category: 'eat',
    belief: '味精吃多了对身体不好，会掉头发、口渴',
    truth: '几十年双盲试验没能重复出「味精敏感」，谷氨酸钠和番茄、奶酪里的谷氨酸是同一种东西。',
    detail:
      '在双盲对照条件下——受试者不知道自己吃的是味精还是安慰剂——所谓的头痛、潮红、心悸等症状无法被稳定重复出来。多国食品安全机构（包括 FDA、欧盟 EFSA、联合国粮农组织／世卫组织联合专家委员会）复审后都把味精列为一般认为安全。\n\n谷氨酸本身广泛存在于番茄、海带、帕玛森奶酪、母乳里。你的身体分不出这个谷氨酸是从海带来的还是从发酵罐来的。',
    origin:
      '1968 年《新英格兰医学杂志》登过一封读者来信，作者描述自己在中餐馆吃完饭后不适，猜测可能与味精有关。这封信催生了「中餐馆综合征」这个说法，媒体广泛传播，之后半个世纪的对照试验都没能支持它。这个标签本身也带着当年对华人餐馆的偏见。',
    instead:
      '正常用就行。味精的钠含量约为食盐的三分之一，用它替代一部分盐反而能降低总钠摄入。真要控制的是总钠，不是味精。',
    stakes: 'harmless',
    sources: [
      {
        label: 'FDA —— Questions and Answers on MSG',
        url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg',
      },
    ],
    related: ['detox'],
  },
  {
    id: 'collagen',
    category: 'eat',
    belief: '吃猪蹄、燕窝、银耳补胶原蛋白，皮肤会变好',
    truth: '胶原蛋白进了胃就被拆成氨基酸，身体不会把它原样送到你脸上。',
    detail:
      '胶原蛋白是大分子蛋白质，无法整块穿过肠壁。它会被消化酶切成氨基酸和小肽，进入身体的公共氨基酸池，然后按照身体自己的优先级去合成需要的东西——可能是肌肉，可能是酶，轮不到你指定「请送到法令纹」。\n\n近年确实有一些关于水解胶原肽的试验报告了皮肤含水量和弹性的小幅改善，机制可能和特定小肽的信号作用有关。但那是特定剂量的补充剂，不等于炖猪蹄；而且这类研究不少由厂商资助，样本小，结论还谈不上稳固。',
    origin:
      '还是「以形补形」：皮肤里有胶原蛋白，那就吃胶原蛋白。名字对上了，代谢过程被跳过了。',
    instead:
      '皮肤最怕的是紫外线。防晒霜、帽子、不抽烟、睡够觉，这几样的证据强度远超任何口服胶原。猪蹄好吃就吃，但它主要给你的是脂肪。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Harvard Health —— Considering collagen drinks and supplements?',
        url: 'https://www.health.harvard.edu/blog/considering-collagen-drinks-and-supplements-202304122911',
      },
    ],
  },
  {
    id: 'eight-glasses',
    category: 'eat',
    belief: '每天必须喝够八杯水',
    truth: '「八杯」这个数字没有实验依据，而且它漏算了食物里的水。',
    detail:
      '这个建议常被追溯到 1945 年美国国家研究委员会的一份文件，原文建议成人每天约 2.5 升水——但紧接着有一句话：「其中大部分包含在预制食品中。」后半句在传播中被弄丢了，剩下一个赤裸裸的数字。\n\n人体有相当精密的渗透压调节系统，口渴就是它的输出信号。除非你在高温下劳作、发烧、腹泻，或者有医生特别叮嘱，跟着渴感喝就够了。反过来，短时间内灌下大量水稀释血钠，是有致命风险的（运动性低钠血症）。',
    origin:
      '一句被截断的引用，加上瓶装水行业几十年的顺水推舟。',
    instead:
      '渴了就喝。想要一个粗略的自查指标，看尿色：淡黄色说明水分充足，深黄说明该喝了。汤、粥、水果、茶、咖啡都算数。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Valtin, Am J Physiol 2002 —— "Drink at least eight glasses of water a day." Really?',
        url: 'https://journals.physiology.org/doi/full/10.1152/ajpregu.00365.2002',
      },
    ],
    related: ['coffee-dehydrate'],
  },
  {
    id: 'coffee-dehydrate',
    category: 'eat',
    belief: '咖啡和茶利尿，越喝越缺水，不能算进喝水量',
    truth: '适量咖啡是净补水的——它带进来的水比多排掉的那点多得多。',
    detail:
      '咖啡因确实有轻微利尿作用，但一杯咖啡里 98% 以上是水。对照试验直接比较过喝咖啡和喝等量白水的人，全天体液状态没有显著差别。日常习惯喝咖啡的人还会对咖啡因的利尿作用产生耐受。',
    origin:
      '把「有利尿作用」直接等同于「会让你脱水」，跳过了净收支这一步。',
    instead:
      '咖啡和茶可以正常计入每天的液体摄入。真需要注意的是别喝太晚影响睡眠——咖啡因半衰期约 5 小时。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Killer et al., PLoS ONE 2014 —— 咖啡与白水的补水效果对照试验',
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0084154',
      },
    ],
    related: ['eight-glasses'],
  },
  {
    id: 'spicy-ulcer',
    category: 'eat',
    belief: '吃辣会吃出胃溃疡',
    truth: '绝大多数胃溃疡是幽门螺杆菌感染或止痛药引起的，不是辣椒。',
    detail:
      '1980 年代，澳大利亚的 Barry Marshall 和 Robin Warren 提出胃溃疡由幽门螺杆菌引起。当时主流观点认为是压力和辛辣饮食，没人信，Marshall 索性自己喝下一培养皿细菌，把自己搞出了胃炎。两人在 2005 年拿到诺贝尔生理学或医学奖。\n\n今天已知的两大主因是幽门螺杆菌感染和长期服用非甾体抗炎药（布洛芬、阿司匹林这类）。辣椒素可能刺激已经存在的溃疡让你难受，但它不制造溃疡。',
    origin:
      '「吃辣以后胃疼」是真实体验，但那是刺激症状，不等于造成了损伤。相关被读成了因果。',
    instead:
      '反复上腹痛、饱胀、黑便，去查幽门螺杆菌（呼气试验很方便），别自己戒辣了事。长期吃止痛药的人尤其要警惕。',
    stakes: 'risky',
    sources: [
      {
        label: '诺贝尔奖官网 —— 2005 年生理学或医学奖',
        url: 'https://www.nobelprize.org/prizes/medicine/2005/summary/',
      },
    ],
    related: ['porridge-stomach'],
  },
  {
    id: 'moldy-fruit',
    category: 'eat',
    belief: '水果烂了一小块，把坏的地方切掉就能吃',
    truth: '这条是反的——霉菌毒素早就扩散到你看不见的地方了。',
    detail:
      '你看到的那块霉斑只是霉菌的「果实」，菌丝已经在柔软多汁的果肉里蔓延开，展青霉素这类毒素也随之扩散。研究测过，在肉眼可见霉斑之外的「好」果肉里，仍能检出毒素。展青霉素耐热，煮了也不管用。\n\n有个例外：硬质食物。硬奶酪、胡萝卜、卷心菜这类水分低、结构致密的东西，霉菌不易深入，切掉霉斑周围 2–3 厘米可以继续吃。软的（水果、面包、软奶酪、果酱）整个扔掉。',
    origin:
      '这条不是老人言，是「看不见就等于没有」的直觉，加上不舍得扔。',
    instead:
      '软质食物长霉了整个丢掉。硬质食物切掉霉斑及周围 2–3 厘米，刀不要碰到霉斑。',
    stakes: 'risky',
    sources: [
      {
        label: 'USDA —— Molds on Food: Are They Dangerous?',
        url: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/molds-food-are-they-dangerous',
      },
    ],
    related: ['leftovers'],
  },
  {
    id: 'honey-crystal',
    category: 'eat',
    belief: '蜂蜜结晶了说明掺了糖，是假蜂蜜',
    truth: '结晶恰恰是天然蜂蜜的正常物理现象，和真假无关。',
    detail:
      '蜂蜜是葡萄糖和果糖的过饱和溶液。葡萄糖溶解度较低，温度降低时会自然析出成晶体。结晶快慢取决于蜜源——油菜蜜、椴树蜜葡萄糖比例高，很容易结晶；洋槐蜜、枣花蜜果糖多，常年不结晶。\n\n所以「不结晶」也不代表是假的。想恢复液态，把蜜罐坐在 40°C 左右的温水里慢慢化开就行，别直接加热或微波。',
    origin: '「纯天然 = 永远清澈透亮」的想象，正好和事实反过来。',
    instead: '看蜜种，别看结晶。真假蜂蜜要靠检测，肉眼判断基本不可靠。',
    stakes: 'harmless',
    sources: [
      {
        label: 'National Honey Board —— Honey crystallization',
        url: 'https://honey.com/',
      },
    ],
  },
  {
    id: 'microwave',
    category: 'eat',
    belief: '微波炉有辐射，加热的东西致癌、营养全被破坏',
    truth: '微波是非电离辐射，只能让水分子转动生热，改变不了食物的化学结构。',
    detail:
      '「辐射」这个词涵盖了从无线电波到伽马射线的一大片光谱。能打断化学键、损伤 DNA 的是电离辐射（X 射线、伽马射线）。微波的能量比可见光还低几个数量级，它做的事就是让水分子快速振动、互相摩擦生热——和火烤、水煮的本质区别只在加热方式。\n\n营养方面，微波往往还占优：加热时间短、用水少，水溶性维生素（维生素 C、部分 B 族）的流失通常比长时间水煮更少。',
    origin:
      '「辐射」一词在中文语境里几乎等同于核辐射，一个词把两类完全不同的物理现象绑在了一起。',
    instead:
      '正常用。要注意的是容器——用标注「微波炉适用」的器皿，避免普通塑料盒和保鲜膜直接接触高温食物。',
    stakes: 'harmless',
    sources: [
      {
        label: 'FDA —— Microwave Ovens: 辐射类型与安全性',
        url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens',
      },
    ],
    related: ['phone-radiation'],
  },
  {
    id: 'soup-nutrition',
    category: 'eat',
    belief: '汤熬久了精华都在汤里，喝汤比吃肉有营养',
    truth: '蛋白质基本还在肉里。汤里溶出来的主要是水、脂肪、嘌呤和游离氨基酸。',
    detail:
      '实测显示，长时间炖煮后，肉中的蛋白质只有很小一部分溶入汤中——大头仍留在肉块里。汤好喝，是因为溶出了游离氨基酸、核苷酸和脂肪，这些负责风味，不负责营养密度。\n\n另外，肉汤嘌呤含量不低，痛风或高尿酸的人要特别注意；浓汤的钠含量往往也很高。',
    origin:
      '「汤浓味鲜 = 营养都出来了」的直觉。味道浓度和营养密度是两回事。',
    instead: '汤和肉一起吃。真觉得肉柴，那也是口感问题，不是营养跑了。',
    stakes: 'wasteful',
    sources: [
      {
        label: '中国营养学会 —— 膳食指南科学研究报告',
        url: 'https://www.cnsoc.org/',
      },
    ],
    related: ['bone-soup'],
  },
  {
    id: 'egg-yolk',
    category: 'eat',
    belief: '蛋黄胆固醇高，一天不能超过一个鸡蛋',
    truth: '对大多数人来说，吃进去的胆固醇对血液胆固醇影响有限。',
    detail:
      '肝脏每天自己合成的胆固醇，远超一般饮食摄入量，而且会根据吃进来的量自动调节产量。基于这些证据，美国 2015–2020 版膳食指南取消了「每日胆固醇摄入不超过 300 毫克」的硬性上限。\n\n要留一句余地：约 15–25% 的人属于「高反应者」，饮食胆固醇对他们血脂的影响更明显；糖尿病患者的相关研究结论也更复杂。真正对血液 LDL 影响更大的，一般是饱和脂肪和反式脂肪——也就是煎蛋时那块黄油，而不是蛋黄本身。',
    origin:
      '早年研究发现血胆固醇高与心血管病相关，就顺推「少吃含胆固醇的食物」。中间那一步——吃进去的会不会变成血里的——当时没验证。',
    instead:
      '健康人每天一到两个全蛋没有问题。已有心血管疾病或血脂异常的，按医生的建议来。别为了躲胆固醇只吃蛋白——蛋黄里有胆碱、叶黄素和大部分维生素。',
    stakes: 'wasteful',
    sources: [
      {
        label: '美国膳食指南 2015–2020 —— 取消胆固醇摄入上限',
        url: 'https://health.gov/our-work/nutrition-physical-activity/dietary-guidelines/previous-dietary-guidelines/2015',
      },
    ],
  },
  {
    id: 'five-second',
    category: 'eat',
    belief: '掉地上五秒内捡起来还能吃',
    truth: '细菌转移在接触的瞬间就发生了，不看秒表。',
    detail:
      '罗格斯大学做过一项系统实验，用四种表面（不锈钢、瓷砖、木头、地毯）和四种食物，测试 1 秒到 300 秒的接触时间。结论是：时间确实有影响——放得越久转移越多——但转移在接触的第一瞬间就已经开始，不存在「五秒安全窗」。\n\n影响更大的其实是食物的含水量和地面材质。西瓜片沾到的细菌最多，软糖最少；地毯的转移率反而低于瓷砖。',
    origin:
      '这是个人人都想相信的规则，所以没人愿意去验证它。它的功能是给「我要吃掉它」提供一个体面的理由。',
    instead: '看掉在哪儿。自家刚拖过的地板上掉块饼干，风险很低；公共场所的地面，扔了吧。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Miranda & Schaffner, Appl Environ Microbiol 2016 —— 五秒规则实验',
        url: 'https://journals.asm.org/doi/10.1128/AEM.01838-16',
      },
    ],
    related: ['swallowed-gum'],
  },
  {
    id: 'late-eating',
    category: 'eat',
    belief: '过了八点吃东西一定会胖，睡前吃的全变成脂肪',
    truth: '决定胖瘦的是一天的总热量，不是时钟。',
    detail:
      '脂肪不会因为天黑了就换一套代谢规则。在总热量相同的对照研究里，把同样的食物分配到不同时间，体重变化差异很小。\n\n不过这条要给昼夜节律留个位置：确实有研究发现，同样的热量在晚上吃，餐后血糖反应更差、饱腹感更低，而且深夜进食的人往往一天吃得更多。所以准确的说法是——晚吃本身不直接变脂肪，但它容易让你吃得更多、睡得更差。',
    origin:
      '「晚上不消耗热量，所以会囤起来」——但基础代谢在睡觉时也一直在运转，占了一天消耗的大头。',
    instead:
      '关注一天总量。真的饿了就吃点，蛋白质加纤维，别吃到撑影响睡眠。反流的人睡前 2–3 小时别吃。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Vujović et al., Cell Metabolism 2022 —— 晚进食对能量消耗与食欲调节的影响',
      },
    ],
    related: ['breakfast'],
  },
  {
    id: 'porridge-stomach',
    category: 'eat',
    belief: '胃不好就喝粥养胃',
    truth: '粥好消化，但它不修胃；对反流的人还可能帮倒忙。',
    detail:
      '「养胃」这个说法本身就很模糊。粥的确容易消化、对急性期的胃减轻了负担，短期喝没问题。但它是高升糖、低蛋白的流质，长期以粥为主食容易蛋白质摄入不足。\n\n对胃食管反流的人，大量流质会让胃内容物体积增大、更容易反上来；粥不需要充分咀嚼，也少了唾液和咀嚼带来的那部分消化准备。',
    origin: '把「好消化」直接等同于「有治疗作用」。前者是真的，后者没有依据。',
    instead:
      '胃病要找原因——幽门螺杆菌、药物刺激、反流，各有各的处理方式。日常规律吃饭、别过烫过辣、戒烟限酒，比换成粥有用。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Mayo Clinic —— GERD 生活方式管理',
        url: 'https://www.mayoclinic.org/diseases-conditions/gerd/diagnosis-treatment/drc-20361959',
      },
    ],
    related: ['spicy-ulcer'],
  },
  {
    id: 'detox',
    category: 'eat',
    belief: '要定期排毒、清宿便，喝果汁断食排出体内垃圾',
    truth: '肝和肾一天 24 小时都在做这件事，它们不需要果汁的帮助。',
    detail:
      '「毒素」在这类宣传里从来不指名道姓——问是哪一种毒素、用什么指标衡量排出了多少，一般得不到答案。人体的解毒系统（肝脏的两相代谢、肾脏滤过、肠道排泄、肺、皮肤）是持续运转的。\n\n「宿便」在解剖学上不存在这个东西；结肠不会累积一层几公斤重的陈年残渣。灌肠和大剂量泻药反而可能造成电解质紊乱、脱水，严重的会损伤肠道菌群和黏膜。',
    origin:
      '19 世纪流行过一种「自体中毒」理论，认为肠道内容物腐败会毒害全身，当时甚至有医生为此切除结肠。理论早已被推翻，但「体内有毒需要清」这个意象留了下来，成了极好的营销框架。',
    instead:
      '想帮肝肾减负，就是老三样：少喝酒、别乱吃来路不明的补剂、吃够纤维和水。真的怀疑中毒（重金属、药物），去医院做检测。',
    stakes: 'risky',
    sources: [
      {
        label: 'NIH NCCIH —— "Detoxes" and "Cleanses": What You Need To Know',
        url: 'https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know',
      },
    ],
    related: ['msg'],
  },
  {
    id: 'swallowed-gum',
    category: 'eat',
    belief: '吞下去的口香糖会粘在肠子里，七年才排得出来',
    truth: '胶基确实消化不了，但消化道对付它的办法是推出去——几天内随粪便排出。',
    detail:
      '口香糖的胶基抗酸抗酶，这正是它能越嚼越久的原因。但「消化不了」不等于「出不来」：消化道处理一切咽得下又消化不了的东西都用同一个办法——靠蠕动推着走，和食物残渣一起排出。这个过程通常以天计，谈不上年。\n\n真正需要留意的例外：短时间内吞下大量口香糖，尤其是小孩，有过极罕见的个案报告——它和其他不易消化的东西缠在一起形成粪石造成梗阻。也就是说，偶尔吞一次完全没事，把口香糖当糖吞不行。',
    origin:
      '一句标准的「吓唬小孩别乱吞东西」的说辞，精确到「七年」显得格外有依据。它大概把「胶基不可消化」这个真实事实，和「会在体内待很久」的想象拼在了一起。',
    instead:
      '嚼完吐到纸巾里包好扔掉。孩子偶尔吞了一次不用慌，更不用催吐——真到要担心的量，你会先看到他拿口香糖当饭吃。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Nemours KidsHealth —— What If I Swallow Gum?',
        url: 'https://kidshealth.org/en/kids/swallowed-gum.html',
      },
      {
        label: 'Mayo Clinic —— Swallowing gum: Is it harmful?（专家问答）',
      },
    ],
    related: ['five-second'],
  },
  {
    id: 'sugar-hyper',
    category: 'eat',
    belief: '孩子吃了糖会亢奋、坐不住、管不住',
    truth: '双盲试验里糖和行为兴奋没有因果关系——变的往往不是孩子，是大人的眼光。',
    detail:
      '1995 年《美国医学会杂志》（JAMA）汇总了当时所有设计合格的对照试验：一组孩子吃糖，另一组吃尝不出区别的安慰剂，在双盲条件下测量行为。结论是糖没有可检测到的兴奋或多动效应。\n\n更说明问题的是「期望实验」：研究者告诉妈妈「孩子刚吃了糖」（实际吃的是安慰剂），妈妈们随即评价孩子更亢奋，录像里也能看到她们管得更紧、靠得更近。糖没变，变的是观察者。',
    origin:
      '生日聚会、甜饮料、兴奋的小孩总是一起出现，归因落在了最显眼的糖上——但聚会本身就够兴奋了。这个因果又恰好迎合「天然好、精制坏」的直觉。',
    instead:
      '限制糖的理由是龋齿和总热量，不是「怕亢奋」。孩子吃完糖真的很闹，先看看场合、睡眠和他到底多兴奋——再决定下次还带不带去生日会。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Wolraich et al., JAMA 1995 —— 糖与儿童行为认知的汇总分析',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7474248/',
      },
      {
        label: 'Hoover & Milich, J Abnorm Child Psychol 1994 —— 母亲期望效应实验',
      },
    ],
  },
  {
    id: 'carrot-vision',
    category: 'eat',
    belief: '多吃胡萝卜视力好，晚上也看得清',
    truth: '维生素 A 缺乏确实会导致夜盲，但你不缺的话，吃再多也吃不出「夜视仪」。',
    detail:
      '胡萝卜富含 β-胡萝卜素，是维生素 A 的原料，而维生素 A 是视网膜感光物质的必需成分。严重缺乏维生素 A 会造成夜盲甚至失明——这部分是真的。但逻辑到此为止：对摄入正常的人来说，额外补充并不能提升视力，就像油箱加满油不会让车跑得更快。\n\nβ-胡萝卜素吃太多的真实后果是胡萝卜素血症：皮肤发黄，手掌脚掌最明显。无害，停吃就退——只是你得到的不是「看得更清」，而是「看起来更黄」。',
    origin:
      '二战时英国皇家空军装备了机载雷达，夜间拦截成功率大增。为了掩盖雷达的存在，英军对外宣称飞行员靠大量吃胡萝卜获得了夜间视力，还专门做了宣传海报。这场宣传太成功，战后几十年全世界的家长都在用它劝孩子吃胡萝卜。',
    instead:
      '胡萝卜是好蔬菜，正常吃就行。看东西模糊去验光——真正常见的夜间视力问题是度数不准、散光没矫正、白内障早期，这些胡萝卜都帮不上。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Smithsonian Magazine 2013 —— A WWII Propaganda Campaign Popularized the Myth That Carrots Help You See in the Dark',
        url: 'https://www.smithsonianmag.com/arts-culture/a-wwii-propaganda-campaign-popularized-the-myth-that-carrots-help-you-see-in-the-dark-28812484/',
      },
    ],
    related: ['glasses-worse'],
  },

  // ─────────────────────────── 身体 ───────────────────────────
  {
    id: 'wet-hair',
    category: 'body',
    belief: '洗完头不吹干会有湿气，会头疼、会感冒',
    truth: '感冒由病毒引起。头发湿着会让你难受，但不会凭空变出病毒。',
    detail:
      '英国的普通感冒研究单位做过经典实验：让志愿者受冷、淋湿，再和保暖组比较感冒发生率，两组没有差别——除非他们体内本来就带着病毒。也就是说，受凉可能让已经潜伏的感染更快表现出症状，但它不制造感染。\n\n至于「湿气」，这是中医的一套理论概念，和现代医学里的病因学不是同一个体系，也没有对应的可测量指标。头发湿着睡觉真实存在的问题是别的：头皮长时间潮湿容易滋生马拉色菌、加重脂溢性皮炎，湿发摩擦枕头也更容易断。',
    origin:
      '冬天感冒确实多，而冬天也正是头发不容易干、容易受凉的季节。两件事同时发生，被读成了一件导致另一件。真正的原因更可能是室内聚集、通风差和空气干燥让病毒更易传播。',
    instead:
      '想吹就吹，主要是为了舒服和护发，不是为了防感冒。防感冒最有效的还是洗手、通风、少摸脸、该打疫苗打疫苗。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Mayo Clinic Health System —— Can wet hair make you sick?',
        url: 'https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/can-wet-hair-make-you-sick',
      },
      {
        label: 'Eccles, Common cold 综述（PMC）',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10324571/',
      },
    ],
    related: ['vitamin-c'],
  },
  {
    id: 'knuckle-crack',
    category: 'body',
    belief: '掰手指会得关节炎，手指会变粗',
    truth: '声音来自关节液里气泡的形成，和关节炎没有已知联系。',
    detail:
      '那声「咔」是关节腔内压力骤降时溶解气体形成气泡的声音（2015 年有研究用实时核磁共振拍到了这个过程）。\n\n加州有位医生 Donald Unger 用六十年时间做了一个单人对照实验：只掰左手，右手不掰。六十年后两只手都没有关节炎。他因此获得 2009 年搞笑诺贝尔奖。更正式的人群研究也没有发现掰手指与骨关节炎的关联。\n\n一项较早的研究提到长期掰手指的人可能握力略低、手部软组织肿胀稍多，但样本小，后续研究未能稳定重复。',
    origin: '关节响听起来就像有什么东西在磨损，直觉上很有说服力。',
    instead: '想掰就掰。如果关节响的同时伴有疼痛、肿胀或卡住，那才需要看医生——那不是这回事。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Kawchuk et al., PLoS ONE 2015 —— 实时核磁下的关节弹响',
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0119470',
      },
      {
        label: 'Unger, Arthritis & Rheumatism 1998 —— 六十年单人实验',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9588755/',
      },
    ],
  },
  {
    id: 'gray-hair',
    category: 'body',
    belief: '拔一根白头发会长出十根',
    truth: '一个毛囊只能长一根头发。拔掉它，最多还是长回一根。',
    detail:
      '毛囊的数量在出生时就基本定了，拔掉一根头发不会激活周围的毛囊，也不会让它们改变颜色。反复拔同一个位置倒是可能损伤毛囊，导致那里以后长不出来——效果和传说正好相反。\n\n白头发看起来「越来越多」是真的，但那是色素干细胞随年龄自然耗竭的过程，和你拔不拔没关系。',
    origin:
      '人在发现第一根白发时才开始留意头发，于是接下来注意到的每一根都像是「新长的」。典型的注意力偏差。',
    instead: '想去掉就剪掉，别拔。染发是另一个选择，接受也是。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Scientific American —— Why does hair turn gray?',
        url: 'https://www.scientificamerican.com/article/why-does-hair-turn-gray/',
      },
    ],
    related: ['shaving'],
  },
  {
    id: 'shaving',
    category: 'body',
    belief: '剃了以后毛会长得更粗、更黑、更快',
    truth: '刀片只切断露在外面的部分，碰不到决定粗细颜色的毛囊。',
    detail:
      '天然的毛发末端是细而渐尖的，被剃刀切断后留下的是平整的横截面，摸起来扎手、看起来钝粗。加上新长出来的一小截还没被阳光和空气氧化褪色，显得更深。\n\n1928 年就有对照实验测量过剃毛前后的毛发直径和生长速度，没有发现差别，后续研究结论一致。',
    origin: '触感和视觉的变化是真实的，只是原因被归错了——变的是切口形状，不是毛本身。',
    instead: '按喜好来。想让重新长出来时不那么扎，可以试试蜡脱或激光——它们作用在毛囊层面。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Mayo Clinic —— Hair removal: Does shaved hair grow back thicker?',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/adult-health/expert-answers/hair-removal/faq-20058427',
      },
    ],
    related: ['gray-hair'],
  },
  {
    id: 'glasses-worse',
    category: 'body',
    belief: '近视戴眼镜会越戴越深，能不戴就别戴',
    truth: '恰恰相反——度数配得不足，近视进展可能更快。',
    detail:
      '有随机对照试验专门比较过「足矫」和「欠矫」两组儿童的近视进展，结果是欠矫组进展更快，试验因此被提前终止。故意配低度数不是保护，是放任。\n\n近视加深的主因是眼轴变长，这由遗传和环境（近距离用眼时间、户外光照不足）共同驱动，和你戴不戴眼镜无关。',
    origin:
      '孩子开始戴眼镜的年龄，正好也是近视自然进展最快的年龄段。同时发生，被读成了因果。',
    instead:
      '按验光结果足矫。控制进展有证据支持的手段：每天户外活动 2 小时、低浓度阿托品滴眼液、角膜塑形镜（OK 镜）、离焦框架镜——找眼科医生评估。',
    stakes: 'risky',
    sources: [
      {
        label: 'Chung, Mohidin & O’Leary, Vision Research 2002 —— 欠矫加快近视进展的随机试验',
      },
    ],
    related: ['blue-light', 'reading-dark', 'carrot-vision'],
  },
  {
    id: 'blue-light',
    category: 'body',
    belief: '防蓝光眼镜能缓解眼疲劳、保护视力',
    truth: '2023 年 Cochrane 系统综述汇总 17 项随机试验：证据不支持这个说法。',
    detail:
      'Cochrane 综述纳入了六个国家的 17 项随机对照试验，结论是防蓝光镜片可能不会减轻用电脑时的眼疲劳症状，对睡眠质量大概也没有影响。至于对比敏感度、色觉辨别、黄斑健康这些指标，没有一项研究做了评估，所以完全无法判断。\n\n注意这是「证据不足以支持」，不是「已证明有害」。屏幕发出的蓝光强度，也远低于自然日光。',
    origin:
      '蓝光在高强度下确实能损伤视网膜细胞（体外实验和动物实验里），这部分是真的。营销把它平移到了日常屏幕的强度上，中间跳过了剂量。',
    instead:
      '眼疲劳主要来自持续近距离聚焦和眨眼减少。用 20-20-20 法则：每 20 分钟看 20 英尺（约 6 米）外 20 秒。调低屏幕亮度到和环境接近，必要时用人工泪液。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Singh et al., Cochrane Database Syst Rev 2023',
        url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013244.pub2/full',
      },
    ],
    related: ['glasses-worse'],
  },
  {
    id: 'reading-dark',
    category: 'body',
    belief: '在暗处看书、躺着看手机会把眼睛看坏',
    truth: '光线暗会让眼睛累，但不会造成永久损伤。真正影响近视的是户外时间太少。',
    detail:
      '昏暗环境下阅读会让人眯眼、眨眼减少、调节肌持续紧张，结果是酸胀、干涩、头痛——这些都是可逆的疲劳，休息后消退，没有证据显示它们会造成结构性损伤。\n\n近视这件事上，被反复验证的关键因素是户外光照。多项随机试验发现，增加学生每天户外活动时间能显著降低近视发生率。机制可能与高强度自然光刺激视网膜多巴胺释放、抑制眼轴增长有关。',
    origin:
      '「用眼过度伤眼睛」听起来天经地义，而且暗处看书之后眼睛确实难受，体验支持了这个结论。',
    instead:
      '开灯看书是为了舒服。真想保护孩子的视力，让他们每天在户外待够两小时——这比任何护眼灯、护眼贴的证据都硬。',
    stakes: 'harmless',
    sources: [
      {
        label: 'He et al., JAMA 2015 —— 增加户外活动降低儿童近视发生率的整群随机试验',
      },
    ],
    related: ['glasses-worse'],
  },
  {
    id: 'ten-percent-brain',
    category: 'body',
    belief: '人只用了大脑的 10%，开发剩下的就能变天才',
    truth: '功能成像显示大脑几乎所有区域都有活动，没有大片闲置的区域。',
    detail:
      'fMRI 和 PET 扫描能看到，即使在睡眠中，大脑各区域也保持着活动；一天之内，几乎所有脑区都会被用到。从演化角度也说不通：大脑只占体重 2%，却消耗约 20% 的能量，如果 90% 是闲置的，这种代价高昂的器官早就被自然选择裁掉了。\n\n更直接的反证是脑损伤——如果 90% 的脑组织没用，那么大部分中风和外伤应该不产生任何后果。事实显然不是这样。',
    origin:
      '来源已经很难考证，常被错误地归到爱因斯坦头上。可能源于早期神经科学对胶质细胞功能的误解，也可能来自「人的潜能远未发挥」这类励志说法的字面化。自我提升产业让它一直活着。',
    instead: '想提升认知能力，睡眠、有氧运动、学新技能的证据都比「开发潜能」的课程扎实得多。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Scientific American —— Do people only use 10 percent of their brains?',
        url: 'https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/',
      },
    ],
    related: ['left-right-brain'],
  },
  {
    id: 'antibiotics-cold',
    category: 'body',
    belief: '感冒了吃点消炎药（抗生素）好得快',
    truth: '普通感冒是病毒引起的，抗生素对病毒完全无效。',
    detail:
      '抗生素攻击的是细菌特有的结构——细胞壁、核糖体、代谢通路。病毒没有这些东西，所以抗生素找不到靶点。吃了不会缩短病程，只会带来腹泻、过敏等副作用，并推动耐药菌产生。\n\n黄绿色鼻涕也不代表细菌感染。那个颜色来自中性粒细胞里的髓过氧化物酶，是免疫反应本身的颜色，病毒感染中后期很常见。',
    origin:
      '「消炎药」这个中文俗称本身就是个大坑——它把抗生素和真正的抗炎药（布洛芬这类）混为一谈，让人以为凡是有炎症就该吃它。感冒本来 7–10 天自愈，吃药后好转的时间正好对上，强化了错觉。',
    instead:
      '对症处理：休息、补水、需要时用退烧止痛药。症状超过 10 天不见好、或先好转又突然加重伴高热，再去看医生评估是否继发细菌感染。抗生素处方交给医生。',
    stakes: 'risky',
    sources: [
      {
        label: 'CDC —— Antibiotic Prescribing and Use: Common Cold',
        url: 'https://www.cdc.gov/antibiotic-use/colds.html',
      },
    ],
  },
  {
    id: 'vitamin-c',
    category: 'body',
    belief: '感冒了赶紧补维生素 C，能好得快',
    truth: '对普通人群，维生素 C 既不能预防感冒，症状出现后再补也基本没用。',
    detail:
      'Cochrane 系统综述汇总了几十项试验：在一般人群中，常规补充维生素 C 不能降低感冒发生率。长期规律服用的人，病程平均缩短约 8%（成人）——大概就是十天的感冒变九天多一点。\n\n关键在于「长期规律服用」。症状已经出现后才开始吃，多数试验没有观察到效果。有一个例外人群：马拉松运动员、极寒环境作业者这类承受极端体力应激的人，补充维 C 确实显著降低了感冒风险。',
    origin:
      '诺贝尔奖得主莱纳斯·鲍林在 1970 年出版《维生素 C 与普通感冒》，大力推广大剂量疗法。他的声望让这个说法迅速普及，但后续的对照试验没有支持他的结论。',
    instead:
      '正常饮食就能满足需要，一个猕猴桃或半个甜椒就够一天的量。感冒了主要还是休息和补水。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Hemilä & Chalker, Cochrane Database Syst Rev —— Vitamin C for preventing and treating the common cold',
        url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000980.pub4/full',
      },
    ],
    related: ['wet-hair', 'flu-shot'],
  },
  {
    id: 'flu-shot',
    category: 'body',
    belief: '打了流感疫苗反而会得流感',
    truth: '灭活疫苗里的病毒已经没有活性，不可能引起流感。',
    detail:
      '注射用的流感疫苗是灭活疫苗或重组蛋白疫苗，里面没有能复制的病毒。接种后一两天的低热、乏力、注射部位酸痛，是免疫系统正在建立防护的正常反应，不是流感。\n\n人们产生这个印象通常有几个原因：疫苗需要约两周才能产生足够抗体，这期间感染了；或者得的是其他呼吸道病毒引起的感冒；或者当季流行株与疫苗株匹配不佳——疫苗有效性本来就不是 100%，通常在 40–60% 之间，但即使突破感染，重症和住院风险也显著降低。',
    origin: '时间上的巧合。接种季正好是呼吸道病毒高发季，「打完就病了」的经历非常容易发生。',
    instead:
      '每年流行季前接种，尤其是老人、慢性病患者、孕妇和小孩。它的价值不只是不得病，更是不得重症。',
    stakes: 'risky',
    sources: [
      {
        label: 'CDC —— Misconceptions about Seasonal Flu and Flu Vaccines',
        url: 'https://www.cdc.gov/flu/prevent/misconceptions.htm',
      },
    ],
    related: ['vitamin-c', 'mmr-autism'],
  },
  {
    id: 'cramp-calcium',
    category: 'body',
    belief: '腿抽筋就是缺钙，赶紧补钙',
    truth: '成年人夜间腿抽筋绝大多数与血钙无关，补钙通常没有效果。',
    detail:
      '血钙浓度受甲状旁腺激素严密调控，真正低到引发手足搐搦的低钙血症是明确的病理状态，通常还伴有口周麻木、手足痉挛等表现，不是「偶尔小腿抽一下」。\n\n常见的夜间腿抽筋，目前认为更多与肌肉疲劳、神经末梢异常放电有关，也可能与脱水、电解质紊乱、某些药物（利尿剂、他汀）、下肢血管或神经问题相关。多数情况找不到明确原因。',
    origin:
      '钙离子确实参与肌肉收缩和舒张，这是真的。但「参与这个过程」被推成了「缺它就会抽筋」，跳过了体内血钙其实非常稳定这一层。',
    instead:
      '抽筋当下：反方向拉伸（小腿抽筋就勾脚背、伸直膝盖）。预防：睡前拉伸小腿、注意补水、检查在用的药。频繁发作或伴随麻木无力，去查一下原因。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Mayo Clinic —— Muscle cramp',
        url: 'https://www.mayoclinic.org/diseases-conditions/muscle-cramp/symptoms-causes/syc-20350820',
      },
    ],
    related: ['bone-soup'],
  },
  {
    id: 'tongue-map',
    category: 'body',
    belief: '舌头分区：舌尖尝甜、两侧尝酸、舌根尝苦',
    truth: '舌头上几乎每一处都能尝出全部基本味道。',
    detail:
      '这张图是彻底的误会。舌头各区域对不同味道的敏感度确实有极其轻微的差异，但差别小到没有实用意义——舌尖同样能尝出苦味，舌根同样能尝出甜味。\n\n味觉受体细胞分布在整个舌面乃至软腭和咽部的味蕾中，每个味蕾都包含能感受多种味道的受体细胞。',
    origin:
      '1901 年德国研究者 D. P. Hänig 测量了舌头不同区域的味觉阈值，发现了微小差异。1942 年哈佛心理学家 Edwin Boring 把这些数据翻译并绘成图表时，坐标处理不当，把「略微更敏感」画成了「只在这里敏感」。这张图进了教科书，流传了大半个世纪。',
    instead: '不用做什么。下次看到这张图，可以拿舌尖蘸一点苦的东西自己验证。',
    stakes: 'harmless',
    sources: [
      {
        label: 'ScienceAlert —— How a mistranslation made you think your tongue had taste zones',
        url: 'https://www.sciencealert.com/how-a-mistranslation-made-you-think-your-tongue-had-taste-zones',
      },
    ],
  },
  {
    id: 'left-right-brain',
    category: 'body',
    belief: '左脑管逻辑、右脑管艺术，开发右脑能让孩子更聪明',
    truth: '「左脑人／右脑人」在脑成像研究里找不到；稍复杂的任务，两侧半球都在协同。',
    detail:
      '某些功能确实有偏侧化：多数人的语言功能偏左半球，空间注意偏右半球——这是功能层面的统计倾向。但「一个人整体是左脑型还是右脑型」是另一回事。2013 年一项研究分析了上千人的静息态脑成像，没有找到任何人整体偏向使用某一侧半球的证据；说话、算数、画画、弹琴，样样都是两侧一起干。\n\n由此推出的「右脑开发班」「蒙眼识字」「全脑速读」就站不住了：它们承诺几天训练唤醒某一侧大脑，收费不菲，效果经不起对照检验，有的干脆靠小把戏（比如从眼罩缝里看）制造效果。',
    origin:
      '上世纪 60 年代对「裂脑人」（切断胼胝体的癫痫病人）的研究拿了诺贝尔奖：这些病人身上两侧半球表现出明确分工。这套严谨发现进入大众文化后被简化成「左脑逻辑、右脑艺术」的人格标签，然后被培训市场接手，变成一门生意。',
    instead:
      '想让大脑发育好，方法朴素得没什么可卖的：睡够、运动、阅读、丰富的玩耍和对话。没有任何短期课程能给大脑「扩容」。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Nielsen et al., PLoS ONE 2013 —— 上千人静息态脑成像检验左右脑假说',
        url: 'https://pubmed.ncbi.nlm.nih.gov/23967180/',
      },
    ],
    related: ['ten-percent-brain'],
  },
  {
    id: 'mmr-autism',
    category: 'body',
    belief: '疫苗会导致自闭症，尤其是麻腮风三联疫苗',
    truth: '这个说法源自一篇因造假被撤稿的论文；此后覆盖上千万儿童的研究都没发现关联。',
    detail:
      '1998 年《柳叶刀》刊登了 Andrew Wakefield 的论文，声称麻腮风疫苗与自闭症有关。后来的调查揭出：数据被篡改，研究由起诉疫苗厂商的律师出资，Wakefield 本人还持有竞争疫苗的专利——利益冲突一样没披露。2010 年《柳叶刀》正式撤稿，英国医学总会吊销了他的行医资格，BMJ 的系列调查把这篇论文定性为「精心策划的骗局」。\n\n另一边是证据：丹麦一项覆盖五十多万儿童的研究直接比较了打过和没打过麻腮风疫苗的孩子，自闭症发生率没有差别；Cochrane 系统综述汇总了上千万儿童的数十项研究，结论相同。\n\n要说明的是：自闭症诊断率这些年确实在升高，但那是诊断标准放宽、识别能力提高的结果。它需要一个解释，而「疫苗」恰好有个听起来可信的叙事——打疫苗的年龄和确诊的年龄差不多大。',
    origin:
      '一篇造假论文，加上家长真实的无助，再加上媒体「两面各打一板」的报道方式。Wakefield 后来去了美国，至今仍活跃在反疫苗集会里。',
    instead:
      '按国家免疫规划接种。对疫苗成分、禁忌症有疑问，问接种门诊的医生，别问家长群。',
    stakes: 'risky',
    sources: [
      {
        label: 'Deer, BMJ 2011 —— 麻腮风疫苗骗局调查',
        url: 'https://www.bmj.com/content/342/bmj.c7452',
      },
      {
        label: 'Cochrane 系统综述 2020 —— 麻腮风疫苗与自闭症（上千万儿童）',
        url: 'https://pubmed.ncbi.nlm.nih.gov/32309885/',
      },
    ],
    related: ['flu-shot'],
  },

  // ─────────────────────────── 睡 ───────────────────────────
  {
    id: 'nightcap',
    category: 'sleep',
    belief: '睡前喝一杯酒助眠，睡得更沉',
    truth: '酒精让你更快睡着，但会毁掉后半夜的睡眠结构。',
    detail:
      '酒精有镇静作用，入睡潜伏期确实缩短。但它同时抑制快速眼动睡眠（REM），并且在肝脏代谢完之后产生反弹效应——通常在后半夜，导致频繁觉醒、浅睡增多。多导睡眠图记录显示，喝酒那晚的睡眠质量指标全面变差。\n\n酒精还会松弛上呼吸道肌肉，加重打鼾和睡眠呼吸暂停；利尿作用让你半夜起来上厕所。所以「睡得沉」是入睡阶段的主观感受，整晚的客观质量是下降的。',
    origin: '「更快睡着」的体验非常直接，而后半夜的碎片化睡眠你自己往往察觉不到。',
    instead:
      '睡不着先查原因：咖啡因、屏幕、作息不规律、焦虑。失眠的一线治疗是认知行为疗法（CBT-I），效果比任何助眠饮品都可靠。',
    stakes: 'risky',
    sources: [
      {
        label: 'Ebrahim et al., Alcohol Clin Exp Res 2013 —— 酒精对睡眠的影响综述',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/acer.12006',
      },
    ],
    related: ['snoring'],
  },
  {
    id: 'weekend-catchup',
    category: 'sleep',
    belief: '平时少睡点没事，周末补回来就行',
    truth: '能补回一部分，但不是全部——认知损伤和代谢影响不会一起被抹掉。',
    detail:
      '一项对照研究让受试者连续限制睡眠，然后给予周末恢复性睡眠。结果是：主观困倦感确实改善了，但胰岛素敏感性没有恢复，而且恢复期后重新进入工作日限制睡眠时，代谢指标反而更差。\n\n这里要留余地：也有大规模队列研究发现，周末补觉的人死亡风险低于长期睡眠不足且不补的人。所以补觉不是没用，它只是不能完全对冲欠下的账。而且周末大幅晚起会造成「社会性时差」，让周一更难受。',
    origin:
      '睡眠债这个比喻太好用了——欠了还上就行。但生理系统不是账本，有些影响不是补回时长就能逆转的。',
    instead:
      '尽量让工作日和周末的起床时间差控制在一小时以内。真的欠了觉，补觉比不补好，但别把它当成常规方案。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Depner et al., Current Biology 2019 —— 周末恢复性睡眠对代谢的影响',
      },
    ],
    related: ['eight-hours'],
  },
  {
    id: 'eight-hours',
    category: 'sleep',
    belief: '每个人都必须睡够八小时',
    truth: '八小时是人群平均值，个体需求分布在一个范围里。',
    detail:
      '美国睡眠医学会和睡眠研究会给成年人的建议是每晚 7 小时以上，多数指南给出的范围是 7–9 小时。这是一个区间，不是一个必须命中的数字。有人 7 小时就精神饱满，有人需要 9 小时。\n\n更值得担心的是把「必须八小时」变成焦虑本身——躺在床上盯着时钟计算「我只剩五小时了」，这种睡眠焦虑（有个专门的说法叫 orthosomnia，源于对睡眠追踪数据的过度关注）反而会让入睡更难。',
    origin:
      '八小时最初来自工业时代的劳工运动口号：「八小时工作、八小时休息、八小时自由支配」。它是一个社会时间分配方案，不是一个医学处方。',
    instead:
      '判断标准看白天：如果白天不需要靠咖啡硬撑、注意力正常、周末不需要大幅补觉，那你的睡眠时长大概是够的。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Watson et al., SLEEP 2015 —— AASM 与 SRS 成人睡眠时长共识声明',
      },
    ],
    related: ['weekend-catchup'],
  },
  {
    id: 'snoring',
    category: 'sleep',
    belief: '打呼噜说明睡得香、睡得沉',
    truth: '响亮的鼾声往往是气道受阻的信号，可能是睡眠呼吸暂停。',
    detail:
      '打鼾是气流通过狭窄的上呼吸道时软组织振动产生的。轻微的鼾声可能无关紧要，但如果鼾声响亮、时断时续、伴有呼吸暂停后的喘息或憋醒，那很可能是阻塞性睡眠呼吸暂停（OSA）。\n\nOSA 患者一整夜可能经历几十甚至上百次微觉醒，睡眠结构被反复打断——恰恰是睡得最不好的状态。长期未治疗的 OSA 与高血压、心律失常、卒中、糖尿病风险升高相关，白天嗜睡也显著增加交通事故风险。',
    origin: '「睡着了才会打呼」这个观察是对的，然后被顺推成「打呼说明睡得深」。',
    instead:
      '这几个信号要当回事：鼾声很响、旁人观察到呼吸停顿、夜间憋醒、晨起头痛口干、白天怎么睡都困。有这些就去做睡眠监测。',
    stakes: 'risky',
    sources: [
      {
        label: 'Mayo Clinic —— Obstructive sleep apnea',
        url: 'https://www.mayoclinic.org/diseases-conditions/obstructive-sleep-apnea/symptoms-causes/syc-20352090',
      },
    ],
    related: ['nightcap', 'sleepwalk-wake'],
  },
  {
    id: 'sleepwalk-wake',
    category: 'sleep',
    belief: '梦游的人不能叫醒，会把人吓疯、吓出病来',
    truth: '叫醒梦游者不会造成伤害，顶多是对方迷糊几秒——不叫醒反而可能让他受伤。',
    detail:
      '梦游（睡行症）发生在深睡眠期。这时候被唤醒，人会短暂意识模糊、发蒙，有的会有点烦躁——这叫「意识混浊性觉醒」，几分钟内自行缓解，不会留下任何伤害。「吓疯」「吓丢魂」没有任何医学依据。\n\n真正的风险在另一边：梦游者可能开门走出去、爬窗、碰倒热水、下楼梯踩空。英国国民保健署（NHS）的建议是：可以温和地把他引导回床上；不好引导的话，轻轻唤醒是安全的做法。',
    origin:
      '梦游者被叫醒时那一脸茫然很有冲击力，看起来像「魂还没回来」。各地民俗都给这个画面配了解释。',
    instead:
      '别围观、别摇晃、别大声喊。牵着他慢慢走回床上；叫得醒就叫，叫不醒就在旁边守着。频繁发作或有危险动作的，去看睡眠门诊。',
    stakes: 'harmless',
    sources: [
      {
        label: 'NHS —— Sleepwalking',
        url: 'https://www.nhs.uk/conditions/sleepwalking/',
      },
    ],
    related: ['snoring'],
  },

  // ─────────────────────────── 运动 ───────────────────────────
  {
    id: 'spot-reduction',
    category: 'move',
    belief: '练腹肌能减肚子，练手臂能瘦胳膊',
    truth: '局部减脂不成立。脂肪从哪里先掉，由基因和激素决定，你点不了菜。',
    detail:
      '经典实验：让受试者只训练一侧手臂，数周后测量两侧的皮下脂肪厚度。结果是训练侧肌肉变强了，但两侧脂肪减少的幅度没有差别。类似设计的仰卧起坐试验也得到同样结论——腹部训练增强了腹肌，但腹部皮下脂肪厚度并未特别下降。\n\n脂肪是通过全身性的脂解作用动员的，脂肪酸进入血液循环后供全身使用，不存在「就近取材」。',
    origin:
      '训练后局部会充血、发热、有紧绷感，感觉「那里在燃烧」。这个体感非常具体，很难不相信。健身器材广告则一直在强化它。',
    instead:
      '想减脂就制造热量缺口（饮食为主）+ 保持力量训练（保住肌肉）。腹肌训练照做，它让肌肉更明显——只是要等脂肪层整体变薄才看得见。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Ramírez-Campillo et al., J Strength Cond Res 2013 —— 单侧腿部训练后的区域脂肪变化',
      },
    ],
    related: ['sweat-fat'],
  },
  {
    id: 'sweat-fat',
    category: 'move',
    belief: '出汗越多说明脂肪烧得越多，穿暴汗服效果好',
    truth: '汗是体温调节的手段，不是脂肪的排放口。称重掉的是水。',
    detail:
      '出汗量取决于环境温度、湿度、个人汗腺密度和适应程度，和脂肪消耗没有对应关系。桑拿房里坐半小时能出一身汗，消耗的热量却很少。\n\n脂肪的代谢产物是二氧化碳和水，其中大部分（按质量算约 84%）通过呼吸以二氧化碳形式排出。所以真要说「排」，主要是呼出去的。\n\n穿不透气的暴汗服会阻碍散热，核心体温上升，在高强度运动中有中暑风险。',
    origin: '「大汗淋漓 = 练得狠」的直觉，加上运动后称重确实轻了几斤（喝水就回来了）。',
    instead:
      '用运动强度和时长衡量效果，不看汗量。运动中和运动后及时补水；夏天户外运动注意补充电解质。',
    stakes: 'risky',
    sources: [
      {
        label: 'Meerman & Brown, BMJ 2014 —— When somebody loses weight, where does the fat go?',
        url: 'https://www.bmj.com/content/349/bmj.g7257',
      },
    ],
    related: ['spot-reduction'],
  },
  {
    id: 'lactic-acid',
    category: 'move',
    belief: '第二天肌肉酸痛是乳酸堆积，要按摩把乳酸揉散',
    truth: '乳酸在运动结束后一小时内就基本清干净了。延迟性酸痛是肌纤维的微损伤。',
    detail:
      '血乳酸在剧烈运动后 30–60 分钟内就回到基线水平，而延迟性肌肉酸痛（DOMS）通常在 24–72 小时后达到高峰。时间对不上。\n\nDOMS 的机制目前认为是离心收缩造成的肌纤维和结缔组织微损伤，以及随之而来的炎症反应和痛觉敏化。这也解释了为什么下坡跑、放慢下放杠铃这类离心动作特别容易引起酸痛。\n\n顺带一提，乳酸本身也不是废物——它可以被心肌、其他肌纤维和肝脏重新利用为能量底物。',
    origin:
      '1920 年代的经典研究把肌肉疲劳和乳酸联系起来，这在「运动中的急性疲劳」层面有一定道理。后来被外推到了「运动后第二天的酸痛」，两件事被混为一谈。',
    instead:
      '酸痛期做低强度活动（散步、轻松骑车）促进血流，通常比完全静止舒服。按摩和拉伸能缓解主观不适，但不是在「揉散乳酸」。逐步增加训练量能明显减少 DOMS。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Cheung et al., Sports Medicine 2003 —— DOMS 的机制与处理综述',
        url: 'https://link.springer.com/article/10.2165/00007256-200333020-00005',
      },
    ],
  },
  {
    id: 'static-stretch',
    category: 'move',
    belief: '运动前要好好静态拉伸，不然容易受伤',
    truth: '运动前长时间静态拉伸不减少受伤率，还会暂时削弱力量和爆发力。',
    detail:
      '多项系统综述发现，运动前静态拉伸对降低总体运动损伤率没有明确效果（对减少肌肉拉伤可能有一点作用，但证据不强）。同时，持续 60 秒以上的静态拉伸会短暂降低肌肉的最大力量和爆发力输出，这个影响能持续一段时间。\n\n真正被证据支持的是热身本身——提高肌肉温度、逐步激活神经肌肉系统。像 FIFA 11+ 这样包含动态动作和力量控制的结构化热身方案，在足球运动员中确实显著降低了损伤率。',
    origin:
      '体育课几十年的标准流程，加上「肌肉拉长了就不容易撕裂」的直觉类比。这个流程比支持它的证据出现得早。',
    instead:
      '运动前做动态热身：高抬腿、开合跳、弓步走、专项动作的低强度版本，让心率和肌温上来。静态拉伸留到运动后，用来改善柔韧性。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Behm et al., Appl Physiol Nutr Metab 2016 —— 热身中静态与动态拉伸的系统综述',
        url: 'https://cdnsciencepub.com/doi/10.1139/apnm-2015-0235',
      },
    ],
  },
  {
    id: 'ten-thousand-steps',
    category: 'move',
    belief: '每天必须走满一万步才算达标',
    truth: '这个数字来自 1965 年的计步器商品名，不是研究结论。',
    detail:
      '1965 年，日本山佐时计计器公司推出一款计步器，取名「万歩計」——「万」「歩」「計」，一万步计。选这个数字一部分是因为汉字「万」看起来像个走路的人，一部分是因为好记好卖。产品上市时，并没有针对「一万步」的研究。\n\n后来的队列研究给出了更细的图景：以老年女性为例，与每天约 2,700 步相比，走到约 4,400 步时死亡风险已明显下降，收益持续增加到约 7,500 步后趋于平台。也就是说，从久坐到稍微多走一点，收益最大；一万步不是门槛。',
    origin: '一个好记的商品名，被当成了健康标准，然后被计步 App 和手环写进了默认设置。',
    instead:
      '别纠结那个整数。从现在的步数往上加一两千步，收益就很实在。走路速度（每分钟约 100 步以上算中等强度）比总步数更值得关注。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Lee et al., JAMA Internal Medicine 2019 —— 步数、步频与老年女性全因死亡率',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6547157/',
      },
      {
        label: 'Popular Science —— 一万步的由来',
        url: 'https://www.popsci.com/health/10000-steps-debunk-science/',
      },
    ],
    related: ['women-lifting'],
  },
  {
    id: 'women-lifting',
    category: 'move',
    belief: '女生撸铁会练成金刚芭比，还是有氧安全',
    truth: '女性睾酮水平大约是男性的十五分之一，自然训练下不会意外长成那样。',
    detail:
      '肌肉肥大高度依赖雄激素水平。女性的睾酮浓度通常只有男性的 5–10%，这从生理上限制了肌肉增长的速度和上限。那些极度肌肉化的形象，几乎都涉及多年专项训练加上药物。\n\n反过来，力量训练对女性的好处证据很硬：增加骨密度（对绝经后骨质疏松尤其重要）、提高静息代谢率、改善胰岛素敏感性、降低跌倒风险。',
    origin:
      '健美比赛照片作为视觉参照物太强烈了，一张图抵过一堆解释。健身房里「女生练线条、男生练力量」的分区文化也在强化它。',
    instead:
      '该练就练。想要「线条」，需要的恰恰是肌肉量加上适度的体脂——而肌肉正是力量训练给的。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'ACSM —— Resistance Training for Health',
        url: 'https://www.acsm.org/',
      },
    ],
    related: ['ten-thousand-steps'],
  },

  // ─────────────────────────── 生活 ───────────────────────────
  {
    id: 'alcohol-warm',
    category: 'life',
    belief: '冷天喝口酒暖身子',
    truth: '酒让你觉得暖，实际上加速了核心体温流失——在真冷的环境里很危险。',
    detail:
      '酒精扩张皮肤血管，大量温热的血液涌向体表，皮肤温度感受器传回「暖和」的信号。但这些热量正在通过皮肤散失到环境中，核心体温实际在下降。\n\n更糟的是酒精还会削弱寒战反应——寒战是身体产热的重要机制——并损害判断力。这就是为什么严寒地区的失温死亡案例中，饮酒是一个常见因素：人感觉暖和，于是脱衣服、在户外坐下，然后失温。',
    origin: '主观体感和客观生理状态在这件事上正好相反，而人只能感知到前者。',
    instead: '真冷就穿够、进屋、喝热的非酒精饮品。已经出现失温迹象的人绝对不能给酒。',
    stakes: 'risky',
    sources: [
      {
        label: 'NHS —— Hypothermia',
        url: 'https://www.nhs.uk/conditions/hypothermia/',
      },
    ],
    related: ['baijiu-disinfect'],
  },
  {
    id: 'baijiu-disinfect',
    category: 'life',
    belief: '伤口用高度白酒消毒',
    truth: '消毒需要 70–75% 的酒精浓度，白酒最高也就 60% 左右，达不到。',
    detail:
      '有意思的是，酒精杀菌不是浓度越高越好。95% 的酒精会让细菌表面蛋白迅速凝固，形成一层保护壳，反而阻止酒精继续渗入。75% 左右是渗透与变性之间的最佳平衡点。\n\n52 度的白酒只有 52% 的乙醇，达不到有效浓度；而且白酒里含糖分和其他有机物，理论上还可能为细菌提供养分。往开放伤口上倒酒还会造成剧痛和组织刺激。',
    origin: '「酒精能消毒」这句话是对的，「白酒是酒精」也是对的，但中间那个浓度门槛被跳过了。',
    instead:
      '小伤口：清水或生理盐水冲洗干净是第一位的，然后可以用碘伏（比酒精温和，不刺激创面）。医用酒精用于完好皮肤的消毒，不往开放伤口里倒。伤口深、有异物、动物咬伤、出血不止，去医院。',
    stakes: 'risky',
    sources: [
      {
        label: 'CDC —— Chemical Disinfectants: Alcohol（有效浓度 60–90%）',
        url: 'https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html',
      },
    ],
    related: ['alcohol-warm'],
  },
  {
    id: 'phone-radiation',
    category: 'life',
    belief: '手机、Wi-Fi 辐射致癌，睡觉要把手机放远点',
    truth: '手机和 Wi-Fi 发的是非电离辐射，能量不足以打断化学键或损伤 DNA。',
    detail:
      '电离辐射（X 射线、伽马射线、紫外线的高能部分）能把电子从原子上打掉，这是它损伤 DNA 的原理。手机用的射频电磁波，光子能量比可见光还低几个数量级，物理上做不到这件事，它唯一确认的生物效应是轻微加热。\n\n世卫组织下属的国际癌症研究机构（IARC）在 2011 年把射频电磁场列为 2B 类「可能致癌」，这个分类经常被误读——2B 意思是「证据有限、不能排除」，同组还有芦荟提取物和腌菜。此后规模最大的几项队列研究（如涵盖数十万人的 COSMOS 研究）没有发现手机使用与脑瘤的关联，而在手机普及的几十年里，脑瘤发病率也没有相应上升。',
    origin:
      '还是「辐射」一词的歧义，加上 2B 分类被媒体简化成「世卫组织认定手机可能致癌」。',
    instead:
      '不用为辐射调整生活。手机影响睡眠是真的，但原因是内容让人兴奋和光照抑制褪黑素——所以睡前放远点还是有道理的，只不过理由不是辐射。',
    stakes: 'harmless',
    sources: [
      {
        label: '美国国家癌症研究所（NCI）—— Cell Phones and Cancer Risk',
        url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/radiation/cell-phones-fact-sheet',
      },
    ],
    related: ['microwave'],
  },
  {
    id: 'battery-charge',
    category: 'life',
    belief: '手机要用到没电再充满，充一整夜会把电池充坏',
    truth: '那是几十年前镍镉电池的规矩。锂电池反而讨厌深度放电。',
    detail:
      '「记忆效应」是镍镉电池的特性，锂离子电池没有这个问题。锂电池的损耗主要取决于充放电循环次数、以及在高电量和高温下停留的时间。深度放电到 0% 反而会加速老化。\n\n现代手机都有电池管理系统，充满后会自动断开充电回路，转为直接用电源供电，不存在「充一夜一直在充」。很多系统还有优化充电功能，会先充到 80% 停住，等到你平时起床前再补满。',
    origin:
      '镍镉电池时代的正确经验，在电池化学早已换代之后被完整继承了下来。',
    instead:
      '随用随充，日常保持在 20–80% 之间对寿命最友好。真正伤电池的是高温——别在暴晒的车里充电，别盖着被子充。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Apple —— 电池与性能',
        url: 'https://support.apple.com/zh-cn/HT208387',
      },
    ],
  },
  {
    id: 'more-detergent',
    category: 'life',
    belief: '洗衣液多放点洗得更干净',
    truth: '超过临界浓度后清洁力不再提升，多出来的只会残留在衣服和机器里。',
    detail:
      '表面活性剂要达到一定浓度（临界胶束浓度）才能形成胶束、包裹油污，但一旦超过这个点，再加就不会提升去污能力了。多余的洗涤剂需要更多次漂洗才能带走，实际上常常是被留在织物纤维里。\n\n后果很具体：衣物发硬、颜色发暗、贴身衣物可能刺激皮肤；洗衣机内筒和管道里积累的洗涤剂残留会成为霉菌的养料，那股洗衣机异味就是这么来的。',
    origin:
      '「多放点更干净」在很多场景里成立（比如擦地时多用点水），被泛化到了有饱和点的化学过程上。',
    instead:
      '按包装刻度放，水软的地区可以再少一点。衣服少的时候按比例减量。定期用高温筒自洁程序清洗洗衣机。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'ACI —— Laundry detergent dosing guidance',
        url: 'https://www.cleaninginstitute.org/',
      },
    ],
  },
  {
    id: 'sponge-microwave',
    category: 'life',
    belief: '洗碗海绵微波一下就消毒了，可以接着用',
    truth: '能杀掉一部分细菌，但幸存下来的往往是更难对付的那批。',
    detail:
      '一项德国研究检测了使用过的厨房海绵，发现细菌密度极高（可达每立方厘米数百亿）。更值得注意的是，经过定期「清洁」（微波、煮沸）的海绵，其菌群中耐受性强的种类占比反而更高——弱的被杀掉了，腾出的生态位被强的填满。\n\n海绵的多孔结构、常年潮湿、附着食物残渣，本身就是近乎完美的细菌培养基。',
    origin: '「加热能杀菌」是对的，但「杀掉大部分」不等于「回到干净状态」，剩下的那部分会重新长满。',
    instead:
      '把海绵当消耗品，一到两周换一块。每次用完拧干、摊开放在通风处。切生肉的区域用可以高温洗的抹布或刷子，刷子比海绵更容易保持干燥。',
    stakes: 'harmless',
    sources: [
      {
        label: 'Cardinale et al., Scientific Reports 2017 —— 厨房海绵微生物组研究',
        url: 'https://www.nature.com/articles/s41598-017-06055-9',
      },
    ],
  },
  {
    id: 'sunscreen-cloudy',
    category: 'life',
    belief: '阴天、冬天、在室内不用防晒',
    truth: 'UVA 能穿透云层和普通玻璃，一年四季都在。',
    detail:
      '云层对紫外线的阻挡有限，多云天气仍有相当比例的紫外线到达地面（具体比例随云的类型和厚度变化，薄云时甚至可能因散射而增强）。\n\nUVA 波长更长，穿透力更强，能透过普通窗玻璃（UVB 大部分被玻璃挡住，UVA 不能）。UVA 深入真皮层，是光老化——皱纹、松弛、色斑——的主要推手。有一张著名的临床照片：一位卡车司机三十年来左脸长期靠窗，两侧面部的老化程度差异极其明显。',
    origin: '把「晒黑」和「紫外线伤害」画了等号。晒黑主要是 UVB 的即时效应，而 UVA 的伤害是无声累积的。',
    instead:
      '日常防晒选广谱（标注 PA+++ 或 broad spectrum）产品。长时间在窗边工作、开车通勤的人尤其值得涂。物理遮挡——帽子、长袖、防晒膜——同样有效。',
    stakes: 'wasteful',
    sources: [
      {
        label: 'Gordon & Brieva, NEJM 2012 —— Unilateral Dermatoheliosis',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJMicm1104059',
      },
    ],
  },
  {
    id: 'thunder-phone',
    category: 'life',
    belief: '打雷时在室内不能用手机，会引雷',
    truth: '手机是电池供电的无线设备，不会把雷电引进来。',
    detail:
      '雷电击中的是高处、导电、接地良好的物体。手机体积小、不接地、发射功率极低（不到 1 瓦），不构成引雷条件。\n\n室内真正需要注意的是有线连接：接着电源线充电时使用、有线固定电话、连着网线的设备——雷击可能通过电力线或通信线路传导过来。金属水管也是路径之一，所以雷暴时不建议洗澡。',
    origin:
      '「金属引雷」这个印象加上早年确实有雷暴中使用有线电话触电的案例，两者合并后被套到了手机上。',
    instead:
      '雷暴时室内用手机没问题，但拔掉充电线。避免使用有线电话、别洗澡、远离窗户和金属管道。在户外则要尽快进入建筑物或汽车内。',
    stakes: 'harmless',
    sources: [
      {
        label: 'NOAA —— Lightning Safety Myths',
        url: 'https://www.weather.gov/safety/lightning-myths',
      },
    ],
  },

  // ─────────────────────────── 关键时刻 ───────────────────────────
  {
    id: 'nosebleed',
    category: 'urgent',
    belief: '流鼻血要仰头，或者举起对侧手臂',
    truth: '仰头会让血流进咽喉——该做的是身体前倾。',
    detail:
      '仰头并不能止血，它只是让血从后鼻孔流进咽部，你看不见了而已。血咽下去会刺激胃黏膜引起恶心呕吐，量大时还有误吸的风险，对小孩和意识不清的人尤其危险。\n\n绝大多数鼻出血来自鼻中隔前下方的一片血管丛（利特尔区），位置很浅，直接压迫就能止住。「举对侧手臂」则完全没有生理依据。',
    origin:
      '仰头之后确实「看不到血了」，这个即时反馈让人以为止住了。一个靠错误反馈自我强化的动作。',
    instead:
      '坐下，身体略微前倾，用拇指和食指捏住鼻翼柔软的部分（不是鼻梁骨），持续按压 10–15 分钟不要中途松手查看。可以在鼻梁上敷冰袋。压满 20 分钟仍不止、出血量大、或是外伤导致的，去急诊。',
    stakes: 'risky',
    sources: [
      {
        label: 'NHS —— Nosebleed',
        url: 'https://www.nhs.uk/conditions/nosebleed/',
      },
    ],
    related: ['burn-toothpaste'],
  },
  {
    id: 'fever-sweat',
    category: 'urgent',
    belief: '发烧要捂汗，捂出一身汗就退烧了',
    truth: '捂着会阻碍散热，把体温推得更高。婴幼儿捂热可能致命。',
    detail:
      '发烧时体温调定点被上调，身体主动产热并减少散热，所以你会觉得冷、会寒战。这时候裹紧被子进一步阻断散热，核心体温只会继续上升。\n\n婴幼儿的体温调节能力和汗腺功能都不成熟，过度包裹可能导致「捂热综合征」——高热、大汗、脱水、抽搐，严重的会造成多器官损伤甚至死亡。中国儿科文献对此有明确警示。\n\n退烧时出汗是体温下降的结果，不是原因。因果顺序反了。',
    origin: '退烧的时候确实会出汗，这个先后顺序被读反了：不是出汗让烧退了，是烧退了所以出汗。',
    instead:
      '穿着透气、盖薄一点，保持室内通风。多喝水。需要时按体重用对乙酰氨基酚或布洛芬。三个月以下婴儿发热、高热不退、精神差、抽搐、皮疹，立刻就医。',
    stakes: 'risky',
    sources: [
      {
        label: 'NHS —— Fever in children',
        url: 'https://www.nhs.uk/conditions/fever-in-children/',
      },
    ],
    related: ['alcohol-rub-fever'],
  },
  {
    id: 'alcohol-rub-fever',
    category: 'urgent',
    belief: '孩子发烧用酒精擦身降温',
    truth: '酒精可经皮肤和呼吸道吸收，儿童有中毒风险，各国指南都不推荐。',
    detail:
      '儿童体表面积与体重之比大、皮肤屏障较薄，酒精擦浴可能经皮吸收，挥发的酒精蒸气也会被吸入，有导致低血糖、意识障碍甚至昏迷的报告。\n\n另外，酒精快速蒸发会引起皮肤血管收缩和寒战，寒战本身产热，反而可能推高核心体温——降温效果也未必达到预期。基于这些原因，主流儿科指南已明确不推荐酒精擦浴。',
    origin: '「酒精挥发吸热」这个物理事实是对的，但没考虑到皮肤吸收和寒战反应这两个生理层面的问题。',
    instead:
      '按体重用对乙酰氨基酚或布洛芬（三个月以下婴儿先就医，不要自行用药）。温水（约 32–34°C）擦浴可以作为辅助，让孩子舒服一点。核心是补水和观察精神状态。',
    stakes: 'risky',
    sources: [
      {
        label: 'NICE 指南 NG143 —— Fever in under 5s',
        url: 'https://www.nice.org.uk/guidance/ng143',
      },
    ],
    related: ['fever-sweat'],
  },
  {
    id: 'burn-toothpaste',
    category: 'urgent',
    belief: '烫伤了抹牙膏、酱油、香油、冰敷',
    truth: '这些都会加重损伤或妨碍后续处理。正确做法是流动的凉水。',
    detail:
      '牙膏、酱油这类东西会在创面形成覆盖层，把热量捂在组织里，还会污染伤口、增加感染风险；深色的酱油和香油覆盖创面后，医生难以判断烫伤深度。清创时把它们弄掉，会造成额外的痛苦和损伤。\n\n冰块直接接触也不行——低温会使局部血管强烈收缩，加重组织缺血，还可能造成冻伤，让原本二度的烫伤变得更深。',
    origin:
      '「凉的东西能降温」和「抹点什么隔绝空气」两个直觉的组合。前半句方向对，后半句坏事。',
    instead:
      '「冲、脱、泡、盖、送」：立即用流动凉水（不是冰水）冲 20 分钟；小心脱掉伤处衣物，粘住就别硬撕；继续浸泡凉水缓解疼痛；用干净纱布或保鲜膜松松盖住；面积大、起大水疱、伤及面部手部会阴或深度烫伤的，尽快送医。',
    stakes: 'risky',
    sources: [
      {
        label: 'NHS —— Burns and scalds: first aid',
        url: 'https://www.nhs.uk/conditions/burns-and-scalds/treatment/',
      },
    ],
    related: ['nosebleed'],
  },
  {
    id: 'seizure-mouth',
    category: 'urgent',
    belief: '癫痫发作要掐人中，往嘴里塞东西防止咬到舌头',
    truth: '往嘴里塞东西会造成牙齿断裂、下颌损伤和窒息。人不会咬断自己的舌头。',
    detail:
      '发作时咬伤舌头通常只是舌侧边缘的表浅伤口，会自行愈合。而强行撬开牙关塞东西，风险要大得多：牙齿断裂、颞下颌关节脱位、施救者手指被咬伤，塞入物碎裂或滑入气道会造成窒息。\n\n掐人中同样没有终止发作的作用，只会在患者脸上留下伤痕。强行按住抽搐的肢体也可能造成骨折或肌肉损伤。\n\n大多数全面性强直阵挛发作会在 1–3 分钟内自行终止。',
    origin:
      '「咬断舌头」这个恐怖意象太有画面感了，在影视作品里被反复呈现，于是「必须塞点什么」成了本能反应。',
    instead:
      '移开周围硬物和尖锐物品；在头下垫软的东西；解开领口；不要按住肢体、不要往嘴里放任何东西；发作停止后帮助侧卧（恢复体位）以保持气道通畅；记录发作时长。超过 5 分钟、连续发作、首次发作、发作后长时间不恢复意识、或伴有受伤，立即叫救护车。',
    stakes: 'risky',
    sources: [
      {
        label: 'Epilepsy Foundation —— Seizure First Aid',
        url: 'https://www.epilepsy.com/recognition/seizure-first-aid',
      },
      {
        label: 'CDC —— First Aid for Seizures',
        url: 'https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html',
      },
    ],
    related: ['heimlich-baby', 'drowning-silent'],
  },
  {
    id: 'drowning-silent',
    category: 'urgent',
    belief: '有人溺水会大声呼救、拼命扑腾，肯定能发现',
    truth: '真实的溺水几乎是安静的。旁边就有人，也常常没被注意到。',
    detail:
      '溺水者的呼吸系统正在全力应付进水，说话需要的气流被优先让给了呼吸——所以喊不出来。手臂会本能地向侧下方压水试图把口鼻抬出水面，因而无法挥手求救。整个过程中身体多呈直立状态，没有明显的踢腿动作。\n\n美国海岸警卫队的 Frank Pia 把这一系列表现总结为「本能性溺水反应」，通常只持续 20–60 秒，之后人就会没入水下。有相当比例的儿童溺水事件，发生时成年人就在附近。',
    origin: '影视作品里溺水永远伴随着大喊和剧烈扑腾——这是为了让观众看懂，不是现实。',
    instead:
      '看这些信号：头后仰嘴张开、眼神空洞或紧闭、直立在水中但没有踢腿、试图游向某个方向却没有移动、头发盖住眼睛也不去拨、看起来像在「爬一架看不见的梯子」。看到有人在水里安静地不对劲，直接开口问他——答不上来就是需要救援。带孩子游泳时保持视线不离开。',
    stakes: 'risky',
    sources: [
      {
        label: 'Pia, On Scene —— Instinctive Drowning Response',
        url: 'https://www.uscg.mil/',
      },
      {
        label: 'CDC —— Drowning Prevention',
        url: 'https://www.cdc.gov/drowning/prevention/index.html',
      },
    ],
    related: ['seizure-mouth'],
  },
  {
    id: 'heimlich-baby',
    category: 'urgent',
    belief: '有人噎住了，先给他喝口水顺一顺',
    truth: '喂水会让本就阻塞的气道更危险。气道和食道是两条路。',
    detail:
      '异物卡在气道里，喝水不会把它冲下去——水本身也要经过咽部，可能引发呛咳误吸，让情况更糟。也不要用手指盲目地在嘴里掏，那常常把异物推得更深。\n\n判断是否完全梗阻很关键：还能咳嗽、能发出声音，说明气道还有通气，应鼓励用力咳嗽；如果咳不出声、说不出话、双手掐住脖子、面色青紫，那是完全梗阻，必须立刻行动。',
    origin: '「顺一顺」是处理食物噎在食道里的经验（那种情况确实喝水会舒服），被误用到了气道梗阻上。',
    instead:
      '成人和一岁以上儿童完全梗阻：站到身后，交替进行 5 次背部拍击（掌根拍两肩胛骨之间）和 5 次腹部冲击（海姆立克法），直到异物排出。一岁以下婴儿改为 5 次拍背加 5 次胸部按压，不做腹部冲击。患者失去意识就开始心肺复苏。同时叫救护车。这些动作值得找机会实际练一次。',
    stakes: 'risky',
    sources: [
      {
        label: 'American Red Cross —— Adult & Child Choking: Symptoms and First Aid',
        url: 'https://www.redcross.org/take-a-class/resources/learn-first-aid/adult-child-choking',
      },
      {
        label: 'St John Ambulance —— Choking（含婴儿处理流程）',
        url: 'https://www.sja.org.uk/first-aid-advice/choking/',
      },
    ],
    related: ['seizure-mouth'],
  },
]
