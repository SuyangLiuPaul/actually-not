/**
 * 新板块（名言没说过 / 电影骗了你 / 起源是编的）的中文条目。
 * 由 scripts/merge-staging.mjs 从 content-staging/approved/ 生成，别手改；改源 JSON 后重跑。
 */
import type { Myth } from '../types'

export const MYTHS_EXTRA: Myth[] = [
  {
    "id": "film-silencer",
    "category": "film",
    "belief": "枪装上消音器，开火就只剩一声轻轻的「噗」，旁人什么也听不见",
    "truth": "消音器只是降低枪声，并不能让它变安静；射击者自己的耳朵仍然处在有损伤风险的响度里。",
    "detail": "一项发表在《国际听力学杂志》的实测研究（Campbell 等，2018）把枪口装上消音器后测量：在射击者耳边，噪声降低了约 17–24 分贝；在射击者身后一米的位置降低约 20–28 分贝；整体声功率降低 2–23 分贝。这是实实在在的下降，但离「听不见」差得很远。\n\n研究还发现，低速（亚音速）弹药的降噪效果更好，因为没有超音速弹丸带来的那一下尖锐爆裂声。作者的结论很克制：即使装了消音器，累积的暴露仍可能带来明显的听力风险，射击或狩猎时应当始终佩戴听力防护。",
    "origin": "影视里为了表现「悄无声息」，常用一个很轻的拟音来代替消音后的声音，观众看多了，就把这个音效当成了现实。这里只能说是一种合理推断：我们没有查到某一部电影是这个画面的源头。",
    "instead": "看到电影里的「噗」，把它当成音效设计就好。现实中，消音器是降噪装置，不是静音装置；任何射击场合都应当戴好听力防护。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Campbell AR 等，International Journal of Audiology 2018;57(Suppl 1):S28–S41 —— 使用消音器与低速弹药降低枪声噪声和听觉风险",
        "url": "https://stacks.cdc.gov/view/cdc/211059"
      }
    ],
    "related": [
      "film-bullet-knockback"
    ]
  },
  {
    "id": "film-cpr-always-works",
    "category": "film",
    "belief": "电视里心肺复苏（CPR）按几下，人就醒过来了，大多数都能救活",
    "truth": "屏幕上的 CPR 成功率远高于现实：美国院外心脏骤停出院存活率长期只有约十分之一。",
    "detail": "1996 年，Diem 等人在《新英格兰医学杂志》上统计了《急诊室的故事》《芝加哥希望》和《救援 911》共 97 集里的 60 次 CPR：75% 的病人当场被救回，约 67% 看上去活到了出院。作者的结论是，这比医学文献中最乐观的存活率还要高得多，可能让观众对 CPR 产生不切实际的印象。\n\n现实的数字是：美国 2024 年 CARES 登记数据显示，院外心脏骤停成人出院存活率中位数约 10.4%，30 年来几乎没变；有旁观者做 CPR 的约占 41.7%，做了 CPR 的存活率约 13.0%，没做的约 7.6%（数据经美国心脏协会 2025 年统计更新引用）。也就是说，CPR 不是「魔法」，但它是在救护车到达之前能为对方多争取机会的少数办法之一。",
    "origin": "医疗剧需要一个紧凑、有希望的情节，抢救成功的镜头最多，抢救失败的很少拍；同时剧里的病人又以年轻人和外伤居多，与现实中以老年心脏病为主的人群不同。这些都抬高了观众对成功率的预期。",
    "instead": "不要因为现实成功率不高就不去做：遇到有人突然倒下、没有反应、没有正常呼吸，先打急救电话（中国 120 / 澳洲 000 / 美国 911），并按调度员的指引做 CPR、找 AED。CDC 的建议也是这个顺序。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "Diem SJ, Lantos JD, Tulsky JA, NEJM 1996 —— Cardiopulmonary resuscitation on television: miracles and misinformation"
      },
      {
        "label": "Sudden Cardiac Arrest Foundation —— 最新统计（引用 AHA 2025 Heart and Stroke Statistics 与 2024 CARES 年报）",
        "url": "https://sca-aware.org/about-sudden-cardiac-arrest/latest-statistics"
      },
      {
        "label": "CDC —— 院外心脏骤停与应对步骤",
        "url": "https://www.cdc.gov/heart-disease/about/cardiac-arrest.html"
      }
    ],
    "related": [
      "film-flatline-shock",
      "cpr-hard",
      "film-heart-attack-collapse"
    ]
  },
  {
    "id": "film-quicksand",
    "category": "film",
    "belief": "流沙会把人一点点整个吞没，越挣扎陷得越深",
    "truth": "实验显示，人不可能被流沙完全吞没，最多陷到一半左右；难的是拔出来，不是被吞掉。",
    "detail": "2005 年，Khaldoun 等人在《自然》上研究了流沙的流变性质。《自然》新闻的报道指出：流沙比人体密度大，实验中与人体密度相当的铝珠从没有沉过一半以上，因此「整个人被吸进去」的概率为零。\n\n真正的麻烦在于脱身。报道提到，把一只脚从流沙里拔出来所需的力，相当于举起一辆中型轿车；但只要等待足够久，沙粒会沉降，浮力会让人慢慢浮回表面。",
    "origin": "探险片和冒险片里，流沙是一种方便的「慢速致命陷阱」，让主角有时间说台词、等人来救。这类画面传播多年，被很多人当成了常识。",
    "instead": "把流沙理解为「很难拔腿的泥潭」，而不是「会吞人的怪物」。至于现实中陷入后如何脱身，请参考当地救援机构的指南，这里不提供个人行动建议。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Nature News, 2005-09-28 —— 报道 Khaldoun 等人对流沙的研究（Nature 2005, 'Liquefaction of quicksand under stress'）",
        "url": "https://www.nature.com/news/2005/050926/full/news050926-9.html"
      }
    ],
    "related": [
      "film-water-breaking"
    ]
  },
  {
    "id": "film-coma-wakeup",
    "category": "film",
    "belief": "电影里昏迷多年的人，一睁眼就醒了，头发整齐、肌肉不萎缩，很快恢复如初",
    "truth": "神经科医生评估了 30 部有长期昏迷情节的电影，只有 2 部描绘得大体准确。",
    "detail": "梅奥诊所的神经科医生 Eelco Wijdicks 和 Coen Wijdicks 在 2006 年 5 月的《神经病学》杂志上回顾了 30 部影片。常见的失真包括：昏迷多年的人突然醒来、身体和认知都没有任何问题；病人像「睡美人」，没有喂食管、没有肌肉萎缩，还打扮得干干净净；几乎所有影片里病人都闭着眼睛，而现实中长期昏迷者眼睛往往是睁着或可以睁开的。\n\n研究者还让 72 位非医学背景的人观看其中的片段：超过三分之一的时候，观众看不出重要的错误；31% 的人认为昏迷者可以用手指敲出摩尔斯电码，39% 的人说这些场景会影响他们对家人的决定。作者担心的正是这个。",
    "origin": "「沉睡后奇迹般醒来」是个现成的、温情又戏剧化的情节，写起来简单，观众也爱看。真实的昏迷恢复过程漫长、不确定，也不上镜，所以很少被拍出来。",
    "instead": "家人遇到真实的昏迷病例时，应当向主治医生和护理团队了解具体病情和预期，而不要拿电影里的情节当参考。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "美国神经病学会 (AAN) 新闻稿 —— Wijdicks E, Wijdicks C, Neurology 2006-05-09：电影对昏迷的描绘",
        "url": "https://www.aan.com/pressroom/home/pressrelease/391"
      },
      {
        "label": "HealthDay —— 对该研究的报道",
        "url": "https://www.healthday.com/health-news/neurology/it-s-not-a-real-coma-it-just-looks-like-one-532556.html"
      }
    ],
    "related": [
      "film-amnesia-second-blow"
    ]
  },
  {
    "id": "film-amnesia-second-blow",
    "category": "film",
    "belief": "失忆的人再被撞一下头就恢复记忆了；失忆者除了不记得过去，生活照常",
    "truth": "神经心理学家分析了影片里的失忆情节，发现大多与现实几乎没有关系，「再撞一下治好失忆」更是在神经学上说不通。",
    "detail": "伦敦国立神经病学和神经外科医院的 Sallie Baxendale 在 2004 年《英国医学杂志》上分析了影视里的失忆。据该文的报道，片中失忆者常常像「一张白纸」一样生活，没有太多日常困难，现实里失忆者却很难记住新信息，许多日常事务变得非常困难。\n\n其他常见的错误包括：失忆会让人性格大变（例如坏人变好人），而现实中性格和自我认同往往不受影响；以及「第二次头部重击能逆转第一次的失忆」，作者称其为影片中神经学上最离奇的情节之一。催眠或看到熟悉的东西就能治好失忆，在现实中也很少奏效。",
    "origin": "失忆是个好用的戏剧装置：主角可以重新开始，也可以有悬念和身份之谜。编剧并不需要照顾神经科学，观众又没有机会对照真实病例。",
    "instead": "看电影时把失忆当作剧情道具。如果身边的人真的出现记忆问题或头部受伤后意识模糊，请让医生评估，不要靠「再撞一下」或类似的说法。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Baxendale S, BMJ 2004;329(7480):1480–1483 —— Memories aren't made of this: amnesia at the movies"
      },
      {
        "label": "ScienceDaily, 2004-12 —— 对 Baxendale 论文的报道",
        "url": "https://www.sciencedaily.com/releases/2004/12/041219161255.htm"
      }
    ],
    "related": [
      "film-concussion-knockout",
      "film-coma-wakeup"
    ]
  },
  {
    "id": "film-vacuum-explode",
    "category": "film",
    "belief": "人暴露在太空真空中会瞬间爆炸或者瞬间冻成冰",
    "truth": "身体不会爆炸，也不会瞬间冻僵；真正的危险是缺氧，大约十几秒内就会失去意识。",
    "detail": "哈佛大学的科普文章指出：太空本身没有「温度」，热量在真空中只能靠辐射散失，速度很慢，所以不会瞬间冻僵。真正的危险是肺里的空气膨胀可能造成损伤、体液在低压下形成气泡（ebullism），以及缺氧：缺氧的血液大约 15 秒内就会送到大脑，导致意识丧失。\n\n另一份航空航天科普资料总结了 20 世纪 50–60 年代美国宇航局和空军的动物实验，以及 1965 年宇航局一次压力服泄漏事故等案例：人在真空中大约能保持 10–15 秒的清醒，而在约 90 秒内重新加压、恢复的话，后果还可能相对轻微、可逆；约 2–4 分钟后死亡几乎无法避免。",
    "origin": "科幻片需要一个醒目的视觉效果，「爆体」和「瞬间冰冻」最直观。再加上「真空」听起来像是极端的力量，很容易让人以为身体会被撕开。",
    "instead": "遇到科幻片里的类似场景，可以把它当作视觉效果。现实中的太空服和舱压设计，针对的是缺氧和压力变化，而不是「爆炸」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "哈佛大学 Science in the News —— The human body in space: Distinguishing fact from fiction（2013）",
        "url": "https://sites.harvard.edu/sitn/flash/2013/space-human-body"
      },
      {
        "label": "Aerospaceweb.org —— Human Exposure to the Vacuum of Space",
        "url": "https://aerospaceweb.org/question/atmosphere/q0291.shtml"
      }
    ],
    "related": [
      "film-space-sound"
    ]
  },
  {
    "id": "film-concussion-knockout",
    "category": "film",
    "belief": "电影里头部挨一下，要么当场晕倒要么没事；没晕倒就说明没伤到脑子",
    "truth": "多数运动相关的脑震荡并不伴随失去意识，有没有昏过去也不是判断严重程度的可靠指标。",
    "detail": "2012 年苏黎世第四届运动脑震荡国际会议的共识声明（McCrory 等，2013）指出，运动相关的脑震荡大多不伴随意识丧失，而且意识丧失本身并不能可靠地预测损伤的轻重；该声明还提到，80%–90% 的脑震荡会在 7–10 天内缓解。\n\n美国疾控中心的头部损伤页面则把「意识丧失，并且越来越困、叫不醒或没法保持清醒」列为需要急救的危险信号。也就是说，是否昏倒并不是唯一该看的东西，而身体出现危险信号时应当立即求助。",
    "origin": "影视里的「一击即倒」简洁好用：晕过去就是受伤，没晕就是没事。这种二分法既省镜头，也容易被当作医学常识。",
    "instead": "头部受击后出现意识混乱、越来越困、叫不醒等 CDC 列出的危险信号时，立刻拨打急救电话（中国 120 / 澳洲 000 / 美国 911）。其他情况请让医护人员评估，不要凭「有没有昏倒」自己判断。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "McCrory P 等，Journal of Athletic Training 2013 —— Consensus Statement on Concussion in Sport: the 4th International Conference, Zurich, 2012",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3715021/"
      },
      {
        "label": "CDC HEADS UP —— 脑震荡的症状与危险信号",
        "url": "https://www.cdc.gov/heads-up/signs-symptoms/index.html"
      }
    ],
    "related": [
      "film-amnesia-second-blow"
    ]
  },
  {
    "id": "film-csi-effect",
    "category": "film",
    "belief": "看了刑侦剧的陪审员都指望案子有高科技证据，没有就判无罪（所谓「CSI 效应」）",
    "truth": "美国司法部下属研究机构资助的一项调查发现，所谓 CSI 效应的证据很薄弱。",
    "detail": "2008 年，法官 Donald Shelton 和两位犯罪学教授在美国国家司法研究所 (NIJ) 的支持下，调查了密歇根州安娜堡 1027 名被随机传唤的潜在陪审员。结果：确实有 46% 的人期待每个刑事案件都有某种科学证据，强奸案中对 DNA 的期望尤其高（73%）。\n\n但研究发现几乎没有证据表明爱看 CSI 的人更愿意在缺乏科学证据时判无罪：13 种情景中只有 4 种看剧者与不看者有差别，而且结果并不一致；更高的期待并没有变成「没有这类证据就不能定罪」的要求，多数情景下陪审员仍愿意依据目击证词定罪。作者认为更像是 30 年技术进步带来的普遍「技术效应」，而不是某部剧的影响。",
    "origin": "21 世纪初，媒体和检察官圈子里流传「CSI 效应让检方更难赢」的说法，后来才有人做实证检验。这个说法本身也成了一个流行的、没怎么被验证的故事。",
    "instead": "可以说：影视确实可能抬高人们对科学证据的期待，但至今并没有可靠证据证明它会让陪审员轻易放走罪犯。这类说法最好分开看「期待」和「判决」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "美国国家司法研究所 (NIJ), 2008 —— 'The CSI effect': does it really exist?（Shelton, Barak, Kim）",
        "url": "https://nij.ojp.gov/topics/articles/csi-effect-does-it-really-exist"
      }
    ],
    "related": [
      "film-truth-serum",
      "film-fingerprint-zero-error",
      "film-time-of-death-to-the-minute"
    ]
  },
  {
    "id": "film-bullet-knockback",
    "category": "film",
    "belief": "中弹的人会被子弹的冲击力向后抛飞、撞破窗户或门",
    "truth": "按动量守恒，子弹能传给人体的速度只有每秒几厘米到十几厘米，根本推不倒人。",
    "detail": "1996 年，法医学研究所的 Karger 和瑞士国防采购署弹药测试中心的 Kneubuehl 在《国际法医学杂志》上计算了这个问题。把子弹的动量传给一个 80 公斤的目标，最坏的情形（子弹留在体内）也只会让身体获得 0.01–0.18 米/秒的向后速度，而正常步行就有 1–2 米/秒。论文表格里从 .22 步枪弹到 .375 大口径步枪弹和 12 号霰弹枪都在这个范围内。\n\n论文还给出一个简明的论证：开枪时枪的后坐动量不小于子弹的动量，如果子弹能把对方掀飞，射手自己也会被同样推开。经验证据方面，作者提到猎人的经验，以及一部纪录片里一名穿防弹衣的人被步枪弹击中两次而没有明显位移。至于人为什么会倒下，通常是伤情或心理反应，而不是动量。",
    "origin": "电影需要「命中」的视觉冲击，把中弹人物抛飞比让他们倒下更有戏剧性。作者还指出，这个观念之所以难改，一个原因是有些医学鉴定人也这么讲，在法庭上差点造成误判。",
    "instead": "把「中弹后飞出去」当作特效。若在科普或写作中需要描写，更接近现实的是人受伤后因为伤势或惊吓而倒下，而不是被推着飞出去。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Karger B, Kneubuehl BP, Int J Legal Med 1996;109:147–149 —— On the physics of momentum in ballistics: can the human body be displaced or knocked down by a small arms projectile?（全文的网络副本）",
        "url": "https://www.jfk-assassination.net/pdf/fisicamomento.pdf"
      }
    ],
    "related": [
      "film-silencer"
    ]
  },
  {
    "id": "film-flatline-shock",
    "category": "film",
    "belief": "监护仪上心跳变成一条直线，医生用除颤器一电就能让心脏重新跳起来",
    "truth": "按急救指南，心电图呈直线（心搏停止）属于「不可电击」节律，除颤器并不用来给它「重启」。",
    "detail": "英国复苏委员会 2025 年的成人高级生命支持流程图把心脏骤停的心律分成两类：可电击的（室颤、无脉性室速）和不可电击的（无脉电活动 PEA、心搏停止）。对后者，流程是给肾上腺素，然后立即继续做 2 分钟 CPR，而不是电击。\n\n影视的影响并非只停留在观感上：Alismail 等人 2018 年在《医学教育与实践进展》上调查了 170 名非医学专业的大学生，发现看医疗剧越多的人，越倾向于对心搏停止的病人选择电击，超过一半的参与者认为这种节律需要除颤。需要说明的是，这个研究规模不大，只调查了学生。\n\n另有急救医学评论提醒：监护仪上看起来「是直线」，有时其实是电极脱落、振幅太小，或是很细的室颤，所以真实抢救中会先核对导联和节律；这是临床判断问题，不改变「真正的心搏停止不可电击」这一指南结论。",
    "origin": "「直线→电击→重新起搏」是影视里最经典的抢救镜头：画面明确、有节奏，还有「zap」的动作。真实的流程则是不断做 CPR、用药、查找可逆原因，看起来平淡得多。",
    "instead": "看剧时把这类镜头当作戏剧化处理。现实中遇到有人倒下且没有反应、没有正常呼吸，先打急救电话（中国 120 / 澳洲 000 / 美国 911）；如果现场有 AED，按语音提示使用，机器会自己判断是否需要电击。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "Resuscitation Council UK, Guidelines 2025 —— Adult advanced life support 流程图",
        "url": "https://www.resus.org.uk/sites/default/files/2025-10/Adult%20ALS%20algorithm%202025.pdf"
      },
      {
        "label": "Alismail A, Meyer NC, Almutairi W, Daher NS, Advances in Medical Education and Practice 2018 —— CPR in medical TV shows: non-health care student perspective",
        "url": "https://www.dovepress.com/cpr-in-medical-tv-shows-non-health-care-student-perspective-peer-reviewed-fulltext-article-AMEP"
      },
      {
        "label": "resus.com.au —— Should cardiac arrest patients in asystole be shocked?（对「看起来是直线」的临床讨论）",
        "url": "https://resus.com.au/shock-patients-asystole/"
      }
    ],
    "related": [
      "film-cpr-always-works",
      "film-adrenaline-heart-needle"
    ]
  },
  {
    "id": "film-space-sound",
    "category": "film",
    "belief": "太空中飞船爆炸、激光炮开火，都能听到震耳欲聋的声音",
    "truth": "声音需要介质传播，太空基本是真空，所以爆炸在真空中是听不到的。",
    "detail": "声音是在空气等介质里传播的压力波。NASA 的科学页面解释说，「太空里没有声音」这个流行说法的来源就在于：太空的大部分基本上是真空，没有介质可以让声波传播。\n\n电磁波（光、无线电）不需要介质，所以我们能看到爆炸的光，也能接收无线电，但这并不等于能听到。NASA 制作的「数据声音化」项目是把天文数据转换成人能听到的声音，这是科学家的转换，而不是太空本身发出的声音。",
    "origin": "有声音的爆炸更有冲击力，音效设计也更容易让观众投入。个别影片（如有意保持静默的科幻片）则是少数例外。",
    "instead": "看科幻片时，爆炸声可以当作艺术手法。想「听到」太空，可以去听 NASA 的数据声音化作品，它们是把数据换成声音的。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "史密森尼国家航空航天博物馆 —— How Things Fly：声音在太空里怎么传播",
        "url": "https://howthingsfly.si.edu/ask-an-explainer/how-does-sound-travel-space"
      },
      {
        "label": "NASA Science —— Data Sonifications: Black Holes",
        "url": "https://science.nasa.gov/learners/highlights/data-sonifications"
      }
    ],
    "related": [
      "film-vacuum-explode"
    ]
  },
  {
    "id": "film-water-breaking",
    "category": "film",
    "belief": "电影里孕妇「羊水破了」，是分娩开始时哗地一大股，随后立刻要赶去医院",
    "truth": "足月时在宫缩开始之前就破水的只占约 8% 的妊娠；英国 NHS 描述的破水可以是缓缓渗出，也可以是一股涌出。",
    "detail": "美国妇产科医师学会（ACOG）第 217 号实践简报指出，足月的胎膜早破（即在临产之前破水）约发生在 8% 的妊娠中；早产的胎膜早破约占 2–3%。也就是说，影视里「破水是分娩的第一个信号」只代表了少数情形。\n\n英国 NHS 的说明里，破水可以是「缓慢的渗漏，也可以是一下子涌出、无法控制」，它既可能发生在临产前，也可能发生在临产中。NHS 的建议是：破水后应尽快联系助产士或产科；若胎膜破裂后 24 小时内仍未临产，因为感染风险略增，通常会建议引产。",
    "origin": "破水是一个视觉化的、能立刻让人明白「要生了」的戏剧信号，在喜剧里尤其好用，于是被反复使用并默认为标准开场。",
    "instead": "影片当作戏剧即可。真实情况下，如果怀疑自己破水，不管是涌出还是只是渗出，请按当地产科机构的指引，尽快联系助产士或产科（NHS 的做法是紧急联系），必要时拨打当地急救电话（中国 120 / 澳洲 000 / 美国 911）。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "ACOG Practice Bulletin No. 217 —— Prelabor Rupture of Membranes, Obstet Gynecol 2020（摘要页，引用足月约 8%、早产 2–3%）",
        "url": "https://opqic.org/?p=11100"
      },
      {
        "label": "NHS —— 分娩的迹象（Signs of labour）",
        "url": "https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/"
      }
    ],
    "related": [
      "film-quicksand"
    ]
  },
  {
    "id": "film-truth-serum",
    "category": "film",
    "belief": "给间谍或嫌疑人打一针「吐真剂」，他就会老老实实说出真话",
    "truth": "没有任何药物能稳定可靠地让人说真话；被药物放松后说出的内容可能真假难辨。",
    "detail": "美国中央情报局历史审查项目公开的《审讯中的「吐真剂」》一文（Bimmerle）写道：「吐真血清」这个词用错了两次，这些药物既不是血清，也不一定带来可作为证据的真话。文中回顾了二十世纪早期的东莨菪碱实验：1922 年一位产科医生让两名嫌疑人在药物下受审，他们都否认了指控，之后在审判中也被判无罪，但「吐真药」的名号却由此传开。\n\n《发现》杂志的一篇文章总结说，近一个世纪的科学文献都没有证实任何化合物能毫无疑问地让人吐出真话：受试者可能回忆起事实，也可能想象或受暗示，而且往往难以区分。",
    "origin": "间谍片和悬疑片需要一个「撬开嘴」的快捷办法，而 20 世纪 20 年代起媒体对「吐真血清」的报道，给了它一个科学外衣。",
    "instead": "把这类药物看作影视道具。真实的访谈和审讯，可靠性来自核对证据，而不是某种药物。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Bimmerle G, CIA Studies in Intelligence —— 'Truth' Drugs in Interrogation（CIA 历史审查项目公开版）",
        "url": "https://cia.gov/resources/csi/static/Truth-Drugs-in-Interrogation.pdf"
      },
      {
        "label": "Discover Magazine —— The Truth About Truth Serum",
        "url": "https://www.discovermagazine.com/the-truth-about-truth-serum-42882"
      }
    ],
    "related": [
      "film-csi-effect",
      "film-polygraph-lie-detector"
    ]
  },
  {
    "id": "film-cyanide-almond-smell",
    "category": "film",
    "belief": "电影里侦探一闻到苦杏仁味，就断定是氰化物中毒——因为人人都闻得出来",
    "truth": "并不是人人都闻得到：相当一部分人闻不出氰化氢的气味，所以它的气味不能当作警报。",
    "detail": "美国国家职业安全卫生研究所（NIOSH）的应急响应卡写道：氰化氢气体确实有一种独特的苦杏仁味（也有人形容为「旧球鞋味」），但「相当大比例的人闻不到它」，因此气味不能为危险浓度提供足够的预警。\n\n同一份资料还给出了时间尺度：吸入后，症状在数秒到数分钟内出现，严重时数分钟内可致死；经皮肤接触则可能立即出现症状，也可能延迟 30–60 分钟。早期表现是头晕、呼吸急促、恶心、意识混乱，而不是影视里那种「一口下去、当场倒地」的单一画面。",
    "origin": "「苦杏仁味＝氰化物」在侦探小说和影视里反复出现，久而久之成了一个现成的破案记号。这一段是合理推断：我们没有查到某一部作品是它的最早源头。",
    "instead": "把「杏仁味」当作文学符号，别当检测手段。现实中如果怀疑有有毒气体或化学品泄漏，不要靠闻来判断：立刻离开现场、到空气流通处，并拨打急救电话（中国 120 / 澳洲 000 / 美国 911）。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "NIOSH —— Emergency Response Card: Hydrogen Cyanide (AC)",
        "url": "https://www.cdc.gov/niosh/ershdb/emergencyresponsecard_29750038.html"
      }
    ]
  },
  {
    "id": "film-polygraph-lie-detector",
    "category": "film",
    "belief": "人一接上测谎仪，只要说谎，仪器就会准确地把谎言揭穿",
    "truth": "测谎仪测的是紧张等生理反应而不是「谎言」：准确率高于乱猜、但远谈不上完美，也可被刻意干扰。",
    "detail": "美国国家科学院 2003 年的专门报告《The Polygraph and Lie Detection》回顾了大量研究，结论很克制：针对某一具体事件的调查，测谎在研究文献所代表的人群里区分说谎与说真话的能力「远高于随机，但远低于完美」。\n\n报告同时指出：测谎仪记录的所有生理指标，都可以通过有意识的认知或身体手段改变，因此有人可能在测试中显得「没说谎」而逃过；用于联邦机构的雇员安全筛查时，其准确度不足以支撑依赖，因为真正的违规者极少，哪怕准确率不低，也会产生大量被错判为说谎的忠诚员工，和被漏掉的真正威胁——报告称这是一个「不可接受的选择」。",
    "origin": "影视常把一台同时记录心率、呼吸、皮肤电的仪器，演成「有罪就报警」的机器，剧情因此变得干净利落。这一点是推断，我们没有查到某一部作品是源头。",
    "instead": "看到「测谎结果」时，把它理解为一个有误差的线索，而不是证据本身；真实的审讯和筛查里，结论更依赖其他可核对的事实。",
    "stakes": "wasteful",
    "confidence": "strong",
    "sources": [
      {
        "label": "National Research Council, 2003 —— The Polygraph and Lie Detection（全书在线阅读）",
        "url": "https://www.nationalacademies.org/read/10420/chapter/2"
      }
    ],
    "related": [
      "film-truth-serum"
    ]
  },
  {
    "id": "film-cold-water-minutes",
    "category": "film",
    "belief": "一掉进冰冷的水里，几分钟人就冻僵、冻死了",
    "truth": "冰水里最先要命的是前几分钟的「冷休克」和随后的手脚失灵，而不是几分钟内「冻死」；体温低到昏迷通常要半小时到一小时。",
    "detail": "加拿大安全划船委员会（CSBC）介绍了由曼尼托巴大学 Giesbrecht 提出的「1-10-1」口诀：第 1 分钟是冷休克——突然猛吸一口气，接着过度换气，呼吸量可达正常的 600%–1000%，关键是不要呛水、稳住呼吸；约 10 分钟内，手指、手臂和腿会失去有效活动能力，游泳能力丧失，没有救生衣就可能溺水；而即使在冰水里，因低体温而失去意识也大约要 1 小时。\n\n2020 年一篇关于冷水游泳的综述（Knechtle 等，IJERPH）也把浸入冷水分成三段：最初约 3 分钟是冷休克（皮肤降温、过度换气、心率加快、吸气反射）；3 分钟后是肌肉神经冷却；约 30 分钟后才进入低体温阶段。综述说，没有适应的人死亡风险来自最初的冷休克、游泳能力逐渐下降，或低体温；各阶段的时长随水温等因素差别很大。所以真实的危险时间表，比电影里的「冻僵」更早、也更细。",
    "origin": "影视常把冰水中的死亡压缩成几分钟里「慢慢冻僵、沉下去」的画面，戏剧上很有效。这一点是推断，我们没有查到某一部作品是它的源头。",
    "instead": "这是人群层面的一般规律，不是个人医疗建议。要点是：冷水的危险在最初几分钟，所以水边活动时要穿救生衣；看到有人落入冰水，先大声呼救并拨打急救电话（中国 120 / 澳洲 000 / 美国 911），不要贸然下水去救。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "Canadian Safe Boating Council —— 1-10-1 Principle",
        "url": "https://csbc.ca/1-10-1-principle/"
      },
      {
        "label": "Knechtle B 等，Int J Environ Res Public Health 2020 —— Cold Water Swimming: Benefits and Risks, A Narrative Review",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7730683/"
      }
    ],
    "related": [
      "drowning-silent"
    ]
  },
  {
    "id": "film-fingerprint-zero-error",
    "category": "film",
    "belief": "电影里指纹一比对就是铁证——百分之百准确，从来不会出错",
    "truth": "指纹比对是有价值的线索，但美国国家科学院认为「零错误率」的说法在科学上不可信，通用的 ACE-V 流程也还算不上经过验证的方法。",
    "detail": "美国国家科学院下属委员会 2009 年的报告《Strengthening Forensic Science in the United States: A Path Forward》在指纹（摩擦嵴）一节的「总结评估」里写道：这项技术历史上既帮助找出有罪者、也帮助排除无辜者；指纹包含大量细节，认真比对确实「看上去合理」能判断两枚印痕是否同源；但关于它的准确性和可靠性，已有的信息有限，而「零错误率」的说法在科学上并不可信。\n\n报告还指出，业内通行的 ACE-V（分析、比对、评估、验证）只是一个宽泛的框架，具体程度不足以称为经过验证的方法：它不能防止偏见，不足以保证可重复和透明，也不能保证两位分析员得出相同结论；所以仅仅按 ACE-V 的步骤做，并不等于过程科学、结果可靠。报告承认「每个人的指纹独一无二、终生不变」有一定科学证据，但强调这并不等于任何人都能可靠地分辨两枚印痕是否来自同一手指——同一根手指每次留下的印痕也会因按压力度而不同。注意：这份报告写于 2009 年，此后相关研究仍在继续，本条只反映该报告的结论。",
    "origin": "报告回顾说，美国法院长期把指纹视为「头号识别科学」，却并未引用支持其可靠性的研究；DNA 技术刚出现时甚至被称作「DNA 指纹」，暗示它像指纹一样可靠。直到为 DNA 证据做验证时，人们才发现对指纹的这些假设从未经过同等的科学审视。报告还提到 2004 年的 Mayfield 案重新引发了围绕指纹证据的争论。",
    "instead": "看到「指纹匹配」，把它读作「受过训练的专家判断两枚印痕可能同源」，而不是数学意义上的确证；真实案件里，指纹最好有其他独立证据一起佐证。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "National Research Council, 2009 —— Strengthening Forensic Science in the United States: A Path Forward（第 5 章 friction ridge analysis 一节及其「Summary Assessment」；美国司法部 NIJ 托管的 PDF）",
        "url": "https://www.ojp.gov/pdffiles1/nij/grants/228091.pdf"
      }
    ],
    "related": [
      "film-csi-effect"
    ]
  },
  {
    "id": "film-electric-shock-thrown-back",
    "category": "film",
    "belief": "电影里人一触电就被「砰」地弹飞，所以触电了总能自己甩开",
    "truth": "更常见也更危险的情形是肌肉被电流「锁住」、松不开手；被弹开只是可能性之一，而且弹开本身也可能带来致命的坠落。",
    "detail": "美国职业安全与健康管理局（OSHA）建筑业电气事故页面（这里引用的是 UAH 托管的存档副本）给了一张电流与人体反应的对照表：约 5 毫安，感觉到轻微电击，一般人还能松手；6–16 毫安，疼痛并开始失去肌肉控制，称为「冻结电流」或「摆脱电流」范围；17–99 毫安，极度疼痛、呼吸停止、严重肌肉收缩，人无法松手，可能致死；100–2000 毫安，可引起心室颤动。\n\n同一页也写到「被弹开」的情形：如果电击刺激了伸肌，人可能被抛离电路，常导致从高处坠落，即使没被电死也可能致命；而当肌肉收缩让受害者无法脱离电路时，即使相对较低的电压也极其危险，因为伤害随接触时间增加——页面特别强调「低电压不等于低危险」。皮肤潮湿会使人体电阻大幅下降：页面的算例是 120 伏在干燥条件下约 1 毫安，在潮湿条件下可达 120 毫安。",
    "origin": "「被电弹飞」的画面干净利落，能一帧交代发生了什么，所以影视里很常见。这是推断：我们没有查到某一部作品是它的源头。",
    "instead": "现实中看到有人触电，先拨打急救电话（中国 120 / 澳洲 000 / 美国 911）并听从调度员的指引，不要徒手去拉一个可能仍与电路接触的人。平时也别指望「碰到了就能自己甩开」：潮湿环境里尤其要远离破损的电线和电器。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "OSHA Construction eTool —— Electrical Incidents: How Electrical Current Affects the Human Body（UAH 托管的 PDF 存档，页面打印于 2013 年）",
        "url": "https://www.uah.edu/images/administrative/facilities/oehs/how_electrical_current_affects_the_human_body.pdf"
      }
    ],
    "related": [
      "electric-shock-pull"
    ]
  },
  {
    "id": "film-adrenaline-heart-needle",
    "category": "film",
    "belief": "电影里往昏迷者胸口直接扎一针肾上腺素，人就猛地惊醒了",
    "truth": "现行复苏指南用的是静脉或骨内给药，直接向心脏注射的做法已被弃用；而阿片类药物过量的解药是纳洛酮，不是肾上腺素。",
    "detail": "2025 年发表在《Journal of Clinical Medicine》的一篇系统综述与荟萃分析（Zagalioti 等，开放获取）写道：现行复苏指南把静脉通路作为首选给药途径，静脉延迟或不可行时用骨内通路作为替代；并说「向心脏内注射肾上腺素曾被尝试，但因实际限制和风险已被放弃」。\n\n《低俗小说》里那一幕——用心内注射肾上腺素抢救海洛因过量——被维基百科的相关词条评价为远离常规做法；词条称心内注射「被认为已过时」「在现代实践中很少使用」，自 1970 年代起，随着静脉注射同样有效而且风险更小，它就逐渐衰落了。至于阿片类药物过量，美国 MedlinePlus 对纳洛酮的说明是：它通过阻断阿片类药物的作用，缓解高浓度阿片类药物引起的危险症状（如呼吸停止、意识丧失），用药后要立即拨打 911 并留在原地密切观察。",
    "origin": "这个桥段在电影里很有戏剧效果：一针下去，起死回生。我们没有查到它在现实医学中的明确源头；维基百科词条的说法是，这一做法确曾在医学史上存在，后来才被淘汰。",
    "instead": "遇到疑似药物过量或有人倒下，不要自己动手注射任何东西：立刻拨打急救电话（中国 120 / 澳洲 000 / 美国 911），按调度员指引做 CPR 等；如果现场备有纳洛酮，也应在打急救电话的同时按说明使用。",
    "stakes": "risky",
    "confidence": "limited",
    "sources": [
      {
        "label": "Zagalioti SC 等，J Clin Med 2025 —— Does the Injection Site Matter During CPR? A Systematic Review and Meta-Analysis of Drug Pharmacokinetics and Pharmacodynamics",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12609464/"
      },
      {
        "label": "MedlinePlus —— Naloxone Injection",
        "url": "https://medlineplus.gov/druginfo/meds/a612022.html"
      },
      {
        "label": "Wikipedia —— Intracardiac injection",
        "url": "https://en.wikipedia.org/wiki/Intracardiac_injection"
      }
    ],
    "related": [
      "film-flatline-shock"
    ]
  },
  {
    "id": "film-time-of-death-to-the-minute",
    "category": "film",
    "belief": "电影里法医一量体温，就能报出「死亡时间是昨晚十点十七分」",
    "truth": "死亡时间只能估算成一个区间：在一项 76 例已知死亡时间的验证研究里，常用 Henssge 方法给出的 95% 预测区间，只有约 37% 真正包含了死亡时间。",
    "detail": "Heinrich 等人 2025 年发表在《国际法医学杂志》的研究，用汉堡大学法医学研究所 76 例已知确切死亡时间的遗体，检验了常用的 Henssge 复合法（把体温与其他死后征象结合起来推算）。结果：95% 预测区间与真实死亡时间吻合的比例是 36.8%（95% 置信区间 26.1%–48.7%）；存放在温暖环境的遗体吻合 61.9%，冷藏的仅 27.3%；体重指数和体表面积也会影响结果。作者的结论是吻合度「低到中等」，需要更大样本的外部验证。这是单中心、便利样本的研究，它说明这类方法有明显误差，并不意味着法医推断没有价值。\n\n一位副法医官在实验室医学博客里也写道：死亡时间「只会是估计」；体温受体型、衣着、风等多种因素影响；尸斑一旦固定，只能区分「短于」还是「长于」大约 8–12 小时；最可靠的办法往往是认真调查现场线索，比如信件日期、日历上的标记。",
    "origin": "一个精确到分钟的数字，能让侦探剧情一下子推进，所以影视爱用。这是推断：我们没有查到某一部作品是它的源头。",
    "instead": "读到或看到「推定死亡时间」时，把它理解成一个带误差的区间，需要和现场线索、监控、手机记录等其他证据互相印证，而不是一个读数。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Heinrich F 等，Int J Legal Med 2025 —— An assessment of the Henssge method for forensic death time estimation in the early post-mortem interval",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11732859/"
      },
      {
        "label": "Krywanczyk A, Lab Medicine Blog 2023 —— Determining Time of Death: Separating Science from Pseudoscience",
        "url": "https://labmedicineblog.com/2023/01/25/determining-time-of-death-separating-science-from-pseudoscience/"
      }
    ],
    "related": [
      "film-csi-effect"
    ]
  },
  {
    "id": "film-heart-attack-collapse",
    "category": "film",
    "belief": "电影里心脏病发作，就是突然捂住胸口、大叫一声倒地",
    "truth": "银幕上的心脏病发作多是摔倒和昏迷，而真实的症状更常是胸口压迫或紧缩感、气短、恶心出汗，有时并不剧烈——尤其在女性身上。",
    "detail": "2024 年发表在《美国心脏协会杂志》（JAHA）上的一项研究（Shaw 等）分析了 100 个流行影片中的心肌梗死场景。银幕上最常出现的两个表现是摔倒和失去意识：10 名女性角色全部摔倒，男性角色中 88% 摔倒；68% 的男性角色失去意识。胸痛反而没那么常画出来：男性 67%、女性 50%；还有 29% 的男性和 40% 的女性角色会尖叫或大喊。作者的结论是，影片更多展示严重、甚至不典型的表现，这可能强化对典型症状的错误想象，而真实症状可能更含蓄，尤其是女性。\n\n英国 NHS 的描述更平实：胸痛可能像「压榨感或紧缩感」，也可能向手臂、颈部和下颌放射；还可能伴有气短、恶心或呕吐、出汗、皮肤发白发青发灰。NHS 的指引是：胸口发紧或像被挤压的疼痛，或疼痛向手臂、颈部、下颌扩散，就应拨打急救电话，并且不要自己开车去急诊。",
    "origin": "银幕上需要让观众一眼看懂「出事了」，所以捂胸、倒地是最省事的视觉符号。这是推断；上面的研究说明了银幕上的画法有多集中，但没有追溯这个套路的起点。",
    "instead": "别等症状「像电影里那样」才当真。出现胸口压迫或紧缩感、疼痛扩散到手臂颈部下颌、气短、恶心出汗，即使不剧烈，也应立即拨打急救电话（中国 120 / 澳洲 000 / 美国 911 / 英国 999），不要自己开车去医院。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "Shaw KE 等，J Am Heart Assoc 2024 —— Portrayal of Acute Myocardial Infarction in Popular Film: A Review of Gender, Race, and Ethnicity",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11963949/"
      },
      {
        "label": "NHS —— Heart attack: Symptoms",
        "url": "https://www.nhs.uk/conditions/heart-attack/symptoms/"
      }
    ],
    "related": [
      "film-cpr-always-works"
    ]
  },
  {
    "id": "film-shark-smell-blood-miles",
    "category": "film",
    "belief": "鲨鱼能闻到几公里外的一滴血——电影里血一入海，鲨鱼就循味从远处赶来",
    "truth": "鲨鱼嗅觉不错，但实验测得的灵敏度与普通硬骨鱼相当；没有证据支持「几公里外嗅到一滴血」。",
    "detail": "Meredith 和 Kajiura 2010 年发表在《实验生物学杂志》的研究，比较了五种亲缘较远的软骨鱼（包括鲨鱼）的嗅觉器官：它们的嗅板数量和表面积各不相同，但都与嗅觉灵敏度（阈值）无关；对氨基酸气味（鱼类嗅觉的主要刺激物）的阈值在约 10 的负 9.0 次方到负 6.9 次方摩尔每升之间，与硬骨鱼相当。此前人们常以为，鲨鱼嗅觉器官表面积大，所以嗅觉特别灵，但这一点缺乏直接证据。\n\n美国物理联合会的 Inside Science 报道了这项研究，并引用第一作者的话：目前所知，它们「连奥运会泳池里的一滴东西都闻不出来」。需要说明的是，这项研究测的是对氨基酸的阈值，并没有直接测量血在真实海水里能被嗅到多远；气味靠水流扩散，距离取决于洋流，并不是一个固定的「几英里」。",
    "origin": "「一滴血引来鲨鱼」是鲨鱼片和恐怖片里的常见套路，它让危险有了一个可见的开关。这是推断：我们没有查到某一部作品是它的最早源头。",
    "instead": "把它当成「鲨鱼嗅觉不错，但并不神」。真实的海边安全，以当地救生员和海滩告示的提示为准。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Meredith TL, Kajiura SM, J Exp Biol 2010 —— Olfactory morphology and physiology of elasmobranchs",
        "url": "https://europepmc.org/article/MED/20889825"
      },
      {
        "label": "AIP Inside Science, 2010 —— Shark Smell Myth Found Fishy",
        "url": "https://www.aip.org/inside-science/shark-smell-myth-found-fishy"
      }
    ]
  },
  {
    "id": "origin-railway-gauge",
    "category": "origin",
    "belief": "铁轨的宽度是两千年前罗马战车的轮距，连航天飞机的火箭助推器宽度都被它决定了",
    "truth": "标准轨距（1435 毫米）能查到的直接来源是英国煤矿的马拉轨道和斯蒂芬森的铁路；「罗马战车」这一环查不到任何文献链条。",
    "detail": "史料能追到的链条是这样的：英国东北部煤矿用马拉的矿车在木轨、铁轨上运煤，乔治·斯蒂芬森在这些煤矿工作时，沿用了当地常见的约 4 英尺 8 英寸的轨距，后来在利物浦—曼彻斯特铁路（1830 年通车）上定为 4 英尺 8.5 英寸。多出来的半英寸据说是为了让车辆过弯时不容易卡住。\n\n至于「罗马战车」：马车的轮距大致取决于一匹驮马并排站在两根车辕之间需要多宽，所以世界各地的马车轮距都在五英尺上下——这是一个实用上的巧合，而不是一条代代相传的传承。有历史学者还指出，英国的马拉轨道其实从来没有过统一轨距，宽窄不一。\n\n所谓「航天飞机助推器受制于铁轨宽度」，被后来的评论者指出，真正限制运输的更可能是隧道和桥梁的净空（装载限界），而不是轨距本身。这个故事自称的「环环相扣」，在每一环上都缺少文献。",
    "origin": "这个故事以「马屁股决定航天飞机」的段子形式流传，据维基百科的说法至少从 1937 年起就有类似版本，后来在互联网上被反复转发。段子的魅力在于把毫不相干的东西用一条因果链串起来。",
    "instead": "可以说：「标准轨距主要来自英国早期煤矿马拉轨道的尺寸，经斯蒂芬森推广；马车轮距大致相近是因为都要容下一匹马。」不要说它「就是罗马战车的轮距」，除非有人拿出文献。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— Standard-gauge railway（历史部分：斯蒂芬森与煤矿马拉轨道；罗马战车说法的流传）",
        "url": "https://en.wikipedia.org/wiki/Standard-gauge_railway"
      },
      {
        "label": "Tastes of History —— Dispelling some myths: Romans, railways and NASA rockets（2023；引用 Baxter 1966 对马拉轨道无统一轨距的研究）",
        "url": "https://www.tastesofhistory.co.uk/post/dispelling-some-myths-romans-railways-and-nasa-rockets"
      },
      {
        "label": "Network Rail —— George Stephenson（1781–1848）：马车轮距与早期轨道约 4 英尺 8 英寸",
        "url": "https://www.networkrail.co.uk/who-we-are/our-history/eminent-engineers/george-stephenson/"
      }
    ]
  },
  {
    "id": "origin-coca-cola-santa",
    "category": "origin",
    "belief": "圣诞老人的红衣服是可口可乐为了推广品牌发明的",
    "truth": "红衣圣诞老人在可口可乐1931年的广告之前就有了；可口可乐把这个形象推广得更广，但没有发明它。",
    "detail": "可口可乐公司自己的历史页面就写明：圣诞老人在画家桑德布罗姆（Haddon Sundblom）动笔之前就已经穿着红外套出现过。该页面还说，漫画家托马斯·纳斯特（Thomas Nast）从 1862 年起为《哈珀周刊》画了约三十年的圣诞老人，外套的颜色从褐黄逐渐变成了今天的红色。\n\n维基百科的「圣诞老人」条目也提到，20 世纪初的《Puck》杂志封面上，圣诞老人已经是红白装扮、基本是今天的样子；白石饮料（White Rock）在 1915 年做过黑白广告，1923—1925 年做过彩色广告，都早于可口可乐的大规模系列。\n\n所以准确的说法是：可口可乐 1931 年请桑德布罗姆画了一个和蔼、圆润、更像普通人的圣诞老人，并在此后几十年的广告里反复出现，让这个形象深入人心。「发明红衣」这一点，不成立。",
    "origin": "这个说法大概源于可口可乐那组广告确实太有名、太长寿，人们倒推：「既然最出名的红衣圣诞老人是它画的，那红色一定是它定的。」维基百科记录这类说法属于流传的都市传说。",
    "instead": "可以说：「可口可乐的广告在 20 世纪中叶让红衣圣诞老人家喻户晓，但红外套在 19 世纪的插画里就有了。」想看更早的红衣形象，可以找纳斯特的圣诞老人插画。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "The Coca-Cola Company —— Haddon Sundblom and the Coca-Cola Santas（官方历史页面）",
        "url": "https://www.coca-colacompany.com/about-us/history/haddon-sundblom-and-the-coca-cola-santas"
      },
      {
        "label": "Wikipedia —— Santa Claus（可口可乐都市传说；Puck 封面；White Rock 广告）",
        "url": "https://en.wikipedia.org/wiki/Santa_Claus"
      },
      {
        "label": "The Ferret —— No, Santa Claus was not first dressed in red by Coca-Cola（列举 1868、1881 等更早的红衣形象）",
        "url": "https://theferret.scot/fact-check-coca-cola-red-santa-claus-christmas/"
      }
    ],
    "related": [
      "origin-forbidden-fruit-apple"
    ]
  },
  {
    "id": "origin-napoleon-short",
    "category": "origin",
    "belief": "拿破仑是个矮子，只有一米五几",
    "truth": "拿破仑身高约 1.68–1.70 米，在当时的法国男性里属于平均甚至略高；「矮」主要来自法制英寸的换算误会和英国漫画。",
    "detail": "拿破仑基金会（Fondation Napoléon）的文章引用了他去世时的测量：安托马尔奇记录为「5 法尺 2 法寸 4 法分」，折合约 1.686 米；英国室内装潢匠安德鲁·达林当年的测量是 5 英尺 7 英寸，约 1.70 米。1802 年还有英国访客估计这位第一执政约 5 英尺 7 英寸。\n\n误会出在单位：法国旧制的「寸」比英制的「寸」长。如果把「5 英尺 2 英寸」按英制直接理解，就成了约 1.57 米——于是「矮子拿破仑」就诞生了。维基百科「拿破仑情结」条目也写到，他的身高折合英制略低于 5 英尺 6 英寸到 5 英尺 7 英寸，属当时平均水平。\n\n另一半原因是宣传：基金会的文章认为，1802 年《亚眠和约》之后，英国讽刺漫画（如 1803 年的吉尔雷、1814 年的克鲁克香克）故意把他画成迷你的「小波尼」。他身边的军官高大、服饰华丽，更衬得他朴素瘦小。",
    "origin": "英国漫画把一个政治对手画成小个子，法制单位被误读成英制，两件事叠加，再加上后来心理学上的「拿破仑情结」一词，让这个印象越来越深。",
    "instead": "可以说：「拿破仑身高大约 1.68 米，在当时算正常偏高；说他矮，是英国漫画和单位换算的功劳。」引用具体数字时，请注明是法制还是英制。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Fondation Napoléon —— La taille de Napoléon（测量记录、单位换算与英国漫画的作用）",
        "url": "https://www.napoleon.org/histoire-des-2-empires/articles/la-taille-de-napoleon"
      },
      {
        "label": "Wikipedia —— Napoleon complex（身高折合与吉尔雷漫画的影响）",
        "url": "https://en.wikipedia.org/wiki/Napoleon_complex"
      }
    ],
    "related": [
      "world-napoleon-china-sleeping"
    ]
  },
  {
    "id": "origin-viking-horned-helmets",
    "category": "origin",
    "belief": "维京战士都戴着带牛角的头盔",
    "truth": "迄今没有发现过带角的维京时代头盔；这个形象大体来自 19 世纪的舞台和插画，尤其是 1876 年瓦格纳歌剧的服装。",
    "detail": "丹麦国家博物馆说得很明确：维京时代只保存下来一顶头盔（挪威的耶尔蒙德布头盔，约公元 950—975 年），它没有角，带有护目框；同时没有任何同时代的文字提到维京人戴角盔。挪威科学网站引用考古学家的话：从未发现过带角的维京时代头盔。\n\n真正带角的头盔是青铜器时代的，比如 1942 年在丹麦沼泽中出土的维克瑟头盔，距维京时代约两千年，更可能用于仪式。需要留余地的是：丹麦国家博物馆提到，在铁器时代和维京时代的一些图像（如金角和奥塞贝格挂毯）上确实有带角头饰的人物，推测这类装束若真有，也更可能属于仪式或特殊人物，而不是普通战士的日常战斗装备。\n\n大众形象的来源，据多方介绍，是 1876 年拜罗伊特首演瓦格纳《尼伯龙根的指环》时，服装设计师卡尔·埃米尔·德普勒为角色设计了带角盔，此后通过插画、儿童读物和影视被反复使用。",
    "origin": "19 世纪的北欧浪漫主义热潮需要一个一眼能认出的「野蛮人」形象；舞台服装给了它一对牛角，后来的插画家和电影人照搬。",
    "instead": "可以说：「维京时代没发现过带角头盔；有角的头盔是更早的青铜时代，或是后世舞台造型。」不用说「绝对没有人在仪式上戴过角饰」——只能说没有证据表明维京战士日常这样作战。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "National Museum of Denmark —— Viking Age helmets（Helmets 页面）",
        "url": "https://en.natmus.dk/historical-knowledge/denmark/prehistoric-period-until-1050-ad/the-viking-age/weapons/helmets/"
      },
      {
        "label": "ScienceNorway —— No, the Vikings didn't wear helmets with horns（采访考古学家 Ingrid Ystgaard）",
        "url": "https://sciencenorway.no/bronze-age-viking-age/no-the-vikings-didnt-wear-helmets-with-horns/1995364"
      },
      {
        "label": "Wikipedia —— Horned helmet（维京形象的由来；维克瑟青铜头盔）",
        "url": "https://en.wikipedia.org/wiki/Horned_helmet"
      },
      {
        "label": "Wikipedia —— Carl Emil Doepler（1876 年拜罗伊特《指环》服装设计）",
        "url": "https://en.wikipedia.org/wiki/Carl_Emil_Doepler"
      }
    ],
    "related": [
      "origin-medieval-no-bathing"
    ]
  },
  {
    "id": "origin-flat-earth-columbus",
    "category": "origin",
    "belief": "哥伦布时代的人都以为地球是平的，哥伦布是为了证明地球是圆的才出海",
    "truth": "中世纪的学者普遍知道地球是球形；哥伦布当年被质疑的是地球有多大，而不是形状。",
    "detail": "据维基百科「平坦地球神话」条目，中世纪的欧洲学者（包括哥伦布读过的那些）大多认为地球是球形，球形说出现在当时大学的标准教科书里；从奥古斯丁到阿奎那的基督教思想家都接受球形。史学家杰弗里·伯顿·拉塞尔（Jeffrey Burton Russell）的概括是：从公元前三世纪起，西方没有受过教育的人相信地球是平的。\n\n1490 年代西班牙的真正争论是距离：哥伦布把地球的周长低估了，认为向西到亚洲很近；西班牙的学者则认为亚洲远得多——他们在这一点上反而是对的。美洲的存在，才让这趟航行没有以灾难告终。\n\n这个故事的流行，主要归功于华盛顿·欧文 1828 年出版的《哥伦布的生平与航行》，书里虚构了哥伦布与教会人士就地球形状争论的场面；后来德雷珀和怀特在 19 世纪后期写「科学与宗教的冲突」时又拿它当典型例子。",
    "origin": "欧文 1828 年的畅销传记添油加醋，随后被「科学与宗教必然对立」的叙事采用，进入教科书，再被反复转述。",
    "instead": "可以说：「当时受过教育的人都知道地球是圆的；争论的是地球多大、亚洲多远。」讲哥伦布的故事时，把「证明地球是圆的」换成「押注地球比专家算的小」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Myth of the flat Earth（欧文 1828；德雷珀与怀特；1490 年代争论的是尺寸）",
        "url": "https://en.wikipedia.org/wiki/Myth_of_the_flat_Earth"
      },
      {
        "label": "HISTORY.com —— Christopher Columbus never set out to prove the Earth was round（引用 Jeffrey Burton Russell）",
        "url": "https://www.history.com/news/christopher-columbus-never-set-out-to-prove-the-earth-was-round"
      }
    ],
    "related": [
      "origin-newton-apple-head"
    ]
  },
  {
    "id": "origin-newton-apple-head",
    "category": "origin",
    "belief": "牛顿被苹果砸中脑袋，当场想到了万有引力",
    "truth": "苹果的故事出自牛顿晚年的口述，经友人斯蒂克利记录；我们读到的记载里是「看着苹果落下」引发思考，没有「砸中脑袋」，更不是一下子顿悟。",
    "detail": "牛顿计划（Newton Project）的介绍写道：斯蒂克利（William Stukeley）是第一个记录这则轶事的人，他在《艾萨克·牛顿爵士生平回忆录》中写到，牛顿曾向他讲起：引力的念头是由一个苹果的坠落引发的。斯蒂克利的手稿在牛顿去世后才写成，1752 年才出版。\n\n《科学美国人》转载的斯蒂克利原文中，牛顿是在花园里、苹果树下喝茶时，看到苹果落下，开始思索为什么苹果总是垂直落向地面。文中没有提到苹果砸到头。\n\n需要留余地的是：这是牛顿多年后的回忆，经他人转述；牛顿的引力理论是经过多年的数学工作才成形的，不可能由一个苹果一下子完成。我们没有查遍所有同时代的记载（如孔杜伊特的版本），所以只能说「在我们读到的这则最早记载里没有砸头」。",
    "origin": "斯蒂克利的记载传开后，逐渐家喻户晓；「砸中脑袋」这一更戏剧化的细节，我们没有在读到的最早记载里找到，推测是后来流行转述加上去的。",
    "instead": "可以说：「牛顿晚年说过，看到苹果落地让他开始思考引力；他的理论是多年计算的结果。」不要说「被苹果砸中后发现了万有引力」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "The Newton Project, University of Oxford —— Introduction（斯蒂克利首次记录苹果轶事）",
        "url": "https://newtonproject.ox.ac.uk/view/texts/normalized/OTHE00017"
      },
      {
        "label": "Scientific American —— What's the real story with Newton and the apple? See for yourself（斯蒂克利手稿原文）",
        "url": "https://www.scientificamerican.com/blog/observations/whats-the-real-story-with-newton-and-the-apple-see-for-yourself/"
      }
    ],
    "related": [
      "origin-flat-earth-columbus",
      "origin-edison-invented-lightbulb",
      "origin-archimedes-eureka-bath",
      "world-newton-shoulders-of-giants"
    ]
  },
  {
    "id": "origin-great-wall-from-space",
    "category": "origin",
    "belief": "万里长城是唯一能从太空用肉眼看到的人造建筑",
    "truth": "从月球上看不到长城；在近地轨道上，不借助长焦镜头也很难甚至不可能看到它。",
    "detail": "美国国家航空航天局（NASA）的说明写道：长城从月球上是看不见的，在地球轨道上也「很难甚至不可能」在不借助高倍镜头的情况下看到；那张著名的从国际空间站拍到的长城照片，是用了长焦镜头才拍到的。欧洲航天局（ESA）的宇航员托马斯·佩斯凯在回答时同样说，用肉眼是看不到的，要拍到它需要特别的方法和约 1150 毫米的镜头。\n\n原因在于：NASA 与 ESA 的说明都强调，要拍到它需要长焦镜头和专门的方法，而不是靠肉眼。\n\n本条只引用 NASA 和 ESA 的正式说法，不讨论个别人声称的目击。",
    "origin": "这条说法在载人航天出现以前就在流传，并在中文世界的教科书和课外读物中长期被引用。本条没有核实它最早见于何处，所以不下结论。",
    "instead": "可以说：「NASA 和 ESA 都说用肉眼很难甚至不可能在轨道上看到它。」若有人说「我看到了」，请问他用的是什么镜头、什么高度。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "NASA —— Great Wall（图片说明：月球上不可见；地球轨道上很难或不可能不借助高倍镜头看到）",
        "url": "https://www.nasa.gov/image-article/great-wall/"
      },
      {
        "label": "ESA —— Great Wall of China from space（宇航员 Thomas Pesquet：肉眼不可见；需特殊方法与约 1150 毫米镜头）",
        "url": "https://www.esa.int/ESA_Multimedia/Images/2021/05/Great_Wall_of_China_from_space"
      }
    ]
  },
  {
    "id": "origin-sos-save-our-souls",
    "category": "origin",
    "belief": "SOS 是「Save Our Souls（拯救我们的灵魂）」的缩写",
    "truth": "SOS 起初不是任何词的缩写，只是一串好认的摩尔斯电码；「Save Our Souls」是后来才编出来帮助记忆的说法。",
    "detail": "维基百科的「SOS」条目指出：1906 年国际无线电报公约确定 SOS 时，它只是一个独特的摩尔斯信号（三点、三划、三点，连在一起发送），最初并不是缩写。德国早在 1905 年就规定使用这个信号，1906 年的柏林会议把它定为国际遇险信号，1908 年 7 月 1 日起生效。\n\nMental Floss 网站也介绍说：这个信号被选中是因为发送快、辨识度高、不易与别的信号混淆；当时竞争的方案里还有意大利提出的 SSSDDD。「S」是三个点、「O」是三划，人们为了记住这串节奏，才把它读作 SOS，之后才有人为这三个字母配上「Save Our Souls」「Save Our Ship」。\n\n泰坦尼克号在 1912 年起初用的是马可尼公司的旧信号 CQD，之后才改发 SOS。",
    "origin": "事后补出来的解释（逆向缩写，backronym）更好记、更有戏剧性，于是比真实的技术原因传得更远。",
    "instead": "可以说：「SOS 是一种信号模式，三点三划三点，不是缩写；『Save Our Souls』是后人编的助记语。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— SOS（1905 德国规定；1906 柏林公约；最初不是缩写）",
        "url": "https://en.wikipedia.org/wiki/SOS"
      },
      {
        "label": "Mental Floss —— What SOS stands for（德国 1905；柏林会议 1906；意大利 SSSDDD 方案；泰坦尼克与 CQD）",
        "url": "https://www.mentalfloss.com/history/what-sos-stands-for"
      }
    ],
    "related": [
      "origin-ok-zero-killed",
      "origin-posh-port-out-starboard-home"
    ]
  },
  {
    "id": "origin-marco-polo-pasta",
    "category": "origin",
    "belief": "意大利面是马可·波罗从中国带回意大利的",
    "truth": "马可·波罗1295年回到威尼斯之前，意大利（西西里）就已经有成规模的面食生产了。",
    "detail": "维基百科「意面史」条目记录了更早的证据：1154 年，阿拉伯地理学家伊德里西为诺曼西西里宫廷写的地理著作里，就提到当地生产并出口一种叫 itriyya 的面食；1279 年热那亚的一份遗嘱提到面食，比马可·波罗返回早约 16 年。《科学美国人》的文章也引用伊德里西，说西西里的特拉比亚镇把面粉做成条状，晒干后用船运往意大利其他地区和外国。\n\n维基百科还提到，面食很可能是沿丝绸之路和阿拉伯世界的传播逐步到达西西里的，而不是由某一个人「带回」。马可·波罗的游记（由鲁斯蒂凯洛记录）里确实提到过类似「拉加纳」的食物，但那只是他在旅途中的见闻，不是把面食引入意大利。\n\n关于这个传说的来源，作家简·格里格森（Jane Grigson）认为它出自 20 世纪二三十年代一则加拿大意大利面公司的广告——这是维基百科转述的说法，我们没有查到原始广告。",
    "origin": "据说是 20 世纪早期的商业宣传：把意面和马可·波罗的名人故事绑在一起，既浪漫又好卖。",
    "instead": "可以说：「面食在马可·波罗之前就已存在于西西里，可能是经阿拉伯世界传入；马可·波罗带回面条是 20 世纪的传说。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— History of pasta（1154 伊德里西；1279 热那亚遗嘱；Grigson 谈传说的来源）",
        "url": "https://en.wikipedia.org/wiki/History_of_pasta"
      },
      {
        "label": "Scientific American —— Noodling the Noodles（伊德里西 1154 对特拉比亚面食工业的描述）",
        "url": "https://www.scientificamerican.com/article/noodling-the-noodles"
      }
    ],
    "related": [
      "origin-gunpowder-fireworks-only"
    ]
  },
  {
    "id": "origin-forbidden-fruit-apple",
    "category": "origin",
    "belief": "亚当夏娃偷吃的禁果是苹果",
    "truth": "《创世记》只说「树上的果子」，没有指明是什么果；把它说成苹果，是后来艺术和语言演变的结果。",
    "detail": "《创世记》3 章 3 节和 6 节都只写「果子」（英文 NIV 译作 fruit），没有给出种类。早期的评论者提出过无花果、葡萄、石榴、香橼等多种说法。\n\n罗格斯大学古典学与犹太研究教授阿赞·亚丁-以色列（Azzan Yadin-Israel）研究认为：把禁果画成苹果，最早出现在 12 世纪的法国艺术里。语言上，拉丁语「pomum」本来泛指「水果」，传入古法语后演变为 pom，逐渐专指「苹果」。\n\n常被提到的「malum 谐音」说法（拉丁文 mālum 指恶，mâlum 指苹果）则缺乏支持：他检查了中世纪拉丁文评注，几乎没有人用过这个双关；直到 14 世纪，评注者还在说无花果和葡萄。\n\n这条只讲文本与历史事实，不涉及对经文的信仰解读。",
    "origin": "12 世纪起的法国艺术与语言演变，让「果子」在欧洲人的想象里逐渐固定成了「苹果」。",
    "instead": "可以说：「《创世记》没有说是什么果子；苹果的形象来自中世纪以后的艺术和语言演变。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Rutgers University —— How the Forbidden Fruit Became an Apple（Azzan Yadin-Israel）",
        "url": "https://www.rutgers.edu/news/how-forbidden-fruit-became-apple"
      },
      {
        "label": "Wikipedia —— Forbidden fruit（《创世记》未指明果子；苹果最早见于 12 世纪法国艺术）",
        "url": "https://en.wikipedia.org/wiki/Forbidden_fruit"
      },
      {
        "label": "BibleGateway —— Genesis 3:1-6（NIV 经文，只称 fruit）",
        "url": "https://www.biblegateway.com/passage/?search=Genesis+3%3A1-6&version=NIV"
      }
    ],
    "related": [
      "origin-coca-cola-santa"
    ]
  },
  {
    "id": "origin-iron-maiden",
    "category": "origin",
    "belief": "「铁处女」是中世纪常用的酷刑工具",
    "truth": "目前查不到 19 世纪以前有铁处女的记载；最早的描述出现在 1793 年，实物多是 19 世纪的展品。",
    "detail": "维基百科「铁处女」条目写道：在 19 世纪以前没有关于铁处女存在的证据。最早的记载来自纽伦堡一本导游手册，作者是约翰·菲利普·西本克斯（1759–1796），他在 1793 年声称一名伪造硬币者在 1515 年被用此刑处死。英国 History 网站指出，历史学家没有找到这次处决的其他同时代记录，也没有找到当时纽伦堡有铁处女的证据。\n\nMedievalists.net 的文章同样认为，西本克斯「很可能只是编造了这个故事」，而到了 19 世纪初，铁处女已作为展品出现在博物馆，后来还在 1893 年芝加哥世博会上展出。维基百科还提到，沃尔夫冈·席尔德（Wolfgang Schild）教授推测，这些展品是 19 世纪的展览经营者用各种旧物拼凑而成，用来吸引观众。\n\n需要留余地的是：这些资料对「西本克斯是故意编造还是真的相信」看法不一，但对「中世纪没有这种东西的记载」是一致的。",
    "origin": "一本 1793 年的导游册、一批 19 世纪的博物馆展品，加上「黑暗的中世纪」这个现成的想象框架，让它成了中世纪酷刑的代表。",
    "instead": "可以说：「铁处女是 18 世纪末才出现在文字里的东西，没有证据表明中世纪使用过；博物馆里的多是后世制品。」遇到「中世纪酷刑」展，可以问展品的出处。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Iron maiden (torture device)（19 世纪前无记载；西本克斯 1793；席尔德教授的推测）",
        "url": "https://en.wikipedia.org/wiki/Iron_maiden_(torture_device)"
      },
      {
        "label": "History.co.uk —— The Iron Maiden: medieval torture device or modern myth?（西本克斯的记载与缺乏旁证）",
        "url": "https://www.history.co.uk/articles/the-iron-maiden-medieval-torture-device-or-modern-myth"
      },
      {
        "label": "Medievalists.net —— Medieval torture devices（铁处女是后世产物；1893 年芝加哥世博会）",
        "url": "https://www.medievalists.net/2023/12/medieval-torture-devices/"
      }
    ],
    "related": [
      "origin-medieval-no-bathing"
    ]
  },
  {
    "id": "origin-medieval-no-bathing",
    "category": "origin",
    "belief": "中世纪的欧洲人一千年不洗澡，满身臭气",
    "truth": "中世纪欧洲城市有大量公共浴场，人们经常洗漱；洗澡减少主要发生在中世纪之后。",
    "detail": "Medievalists.net 汇总的资料显示：13 世纪的巴黎有 32 家以上的浴场，伦敦南华克有 18 个热水浴池；爱德华三世 1351 年在威斯敏斯特宫装了冷热水龙头。弗吉尼亚·史密斯（Virginia Smith）的《干净：个人卫生与洁净史》被引用说，到 15 世纪，在城镇浴场里「泡澡聚餐」像下馆子一样平常。\n\nTastes of History 的文章补充：完整的泡澡因为成本较少见，但用盆、桶洗漱很普遍，几乎每个家庭的账本里都有付给洗衣女工的钱。黑死病（1346—1353）之后，人们因为害怕传染而回避公共浴场；维基百科「Bathing」条目则提到，16 世纪梅毒的出现、「洗澡打开毛孔会招病」的错误观念以及对裸体的宗教限制，都使公共浴场衰落。\n\n留余地：当然，修道院、地区和阶层之间差别很大，穷人的洗澡条件肯定不如城里富人；这条只反驳「整个中世纪一千年都不洗澡」这一说法。",
    "origin": "本条没有核实这个说法最早由谁提出。可以确认的是，史料显示公共浴场的衰落主要发生在黑死病之后和 16 世纪，而不是整个中世纪。",
    "instead": "可以说：「中世纪城市里有浴场，人们会洗漱；公共浴场的衰落主要在黑死病之后和 16 世纪。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Medievalists.net —— People in the Middle Ages and baths（巴黎、伦敦浴场数量；Virginia Smith 的研究）",
        "url": "https://www.medievalists.net/2023/11/people-middle-ages-baths/"
      },
      {
        "label": "Tastes of History —— Dispelling some myths: medieval bathing（日常洗漱；浴场；黑死病的影响）",
        "url": "https://www.tastesofhistory.co.uk/post/dispelling-some-myths-medieval-bathing"
      },
      {
        "label": "Wikipedia —— Bathing（公共浴场在 16 世纪前后的衰落）",
        "url": "https://en.wikipedia.org/wiki/Bathing"
      }
    ],
    "related": [
      "origin-viking-horned-helmets",
      "origin-iron-maiden"
    ]
  },
  {
    "id": "origin-gunpowder-fireworks-only",
    "category": "origin",
    "belief": "中国人发明了火药，却只拿来做烟花爆竹，是西方人用它造了枪炮",
    "truth": "中国很早就把火药用于战争：10 世纪就有火药箭，11 世纪的军事典籍记载了配方，12 世纪出现了火药武器。",
    "detail": "维基百科「火药」条目说，火药在中国发明，最早的可确认记载出现在唐代 9 世纪，源自炼丹实验；10 世纪已有使用火药的火箭，1044 年的《武经总要》记录了最早的火药配方，12 世纪炸弹和「火枪」成为重要武器，13 世纪出现金属管的手持火炮。\n\nMedievalists.net 的文章也写道：火药虽发明于中国，但一旦其性质清楚就被用于战争；火枪最早的记载是 1132 年德安之围，现存确切年代最早的金属火器是 1298 年（元代）的「Xanadu 铳」。明朝早期规定步兵部队里火器手要占约十分之一。\n\n留余地：这不是说中国在火炮技术上「领先西方」，两边的发展路径不同——Medievalists.net 提到，欧洲更侧重用大炮攻城墙，中国则发展了更适合步兵的便携火器。",
    "origin": "这个说法大概是把「烟花」这种后来最常见的和平用途倒推成了火药的最初用途，也受到「中国发明、西方发展」叙事的影响。本条没有核实具体是谁最先这样说的。",
    "instead": "可以说：「火药在中国诞生后很快就被用于战争，宋代已有火药箭和火枪；烟花是它的用途之一，而不是唯一用途。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Gunpowder（9 世纪起源；10 世纪火药箭；1044 年《武经总要》；12 世纪火枪与炸弹）",
        "url": "https://en.wikipedia.org/wiki/Gunpowder"
      },
      {
        "label": "Medievalists.net —— The origins of the gunpowder age（军事应用时间线；1132；1298）",
        "url": "https://www.medievalists.net/2022/11/origins-gunpowder-age/"
      }
    ],
    "related": [
      "origin-marco-polo-pasta"
    ]
  },
  {
    "id": "origin-ok-zero-killed",
    "category": "origin",
    "belief": "OK 来自美国内战：打了没有伤亡的仗就写「0 Killed」",
    "truth": "OK 最早的印刷用例是 1839 年波士顿的报纸，比美国内战（1861 年）早二十多年。",
    "detail": "语言学家艾伦·沃克·里德（Allen Walker Read）在 1963—1964 年发表的研究确认：OK 最早出现在 1839 年 3 月 23 日的《波士顿晨邮报》，编辑查尔斯·戈登·格林用它作为 oll korrect（all correct 的故意拼错）的缩写——这是当时报界流行的一股玩笑缩写风。1840 年大选中，支持马丁·范布伦的人组织了以他的绰号「Old Kinderhook」命名的 OK 俱乐部，让它传遍全国。\n\n既然 1839 年就有了，内战（1861—1865）时才产生的说法在时间上就站不住。词源网站 wordorigins.org 把各种没有可靠证据的民间说法一并列出，包括杰克逊总统不识字、乔克托语、德语 Ober Kommando 等。\n\n需要留余地的是：维基百科指出里德本人并不绝对排除其他影响，西非语言（如沃洛夫语）的影响是个有人提出但没有文献证明的假设。",
    "origin": "「0 Killed」之类的说法听起来像是军事故事，容易记。而真正的来源是一个已经过时的报界玩笑，没那么戏剧化。",
    "instead": "可以说：「OK 在 1839 年的美国报纸里就有了，原是『all correct』的搞怪拼写缩写；内战说法时间对不上。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— OK（词源：1839；Allen Walker Read；其他假说）",
        "url": "https://en.wikipedia.org/wiki/OK"
      },
      {
        "label": "Word Origins —— OK / okay / A-OK（1839 年 3 月 23 日；民间词源列表）",
        "url": "https://wordorigins.org/big-list-entries/ok-okay"
      }
    ],
    "related": [
      "origin-sos-save-our-souls"
    ]
  },
  {
    "id": "origin-li-bai-moon-drowning",
    "category": "origin",
    "belief": "李白醉酒后跳进江里捞月亮，淹死了",
    "truth": "「捉月而死」是后世的传说：与李白同时代和较早的文献没有这个说法，目前能查到的最早明确记载是北宋梅尧臣的诗。",
    "detail": "李白去世在公元 762 年，地点在当涂。据爱思想网上一篇考证文章，李阳冰（762 年）的序、范传正（817 年）的碑文以及新旧《唐书》中，都没有「捉月」的情节，只记他死在当涂；文章认为这个传说是在李白死后一百多年里逐渐形成的。\n\n目前能查到的最早明确材料，文章认为是北宋梅尧臣（1002—1060）的一首诗，诗里写到了醉酒追月落水的情节。五代王定保《唐摭言》被清代王琦引过「因醉入水捉月而死」一语，但文章指出现存《唐摭言》各本中找不到这一条。中文维基百科也说，「捉月」说是从宋代开始流传的。苏富比的一篇文章把它称为「apocryphal（真实性存疑）」的故事。\n\n因此，我们只能说：没有可靠的早期史料支持这一说法。不能反过来说「李白一定不是这么死的」——我们没有他死因的可靠详细记录。",
    "origin": "李白爱酒、爱月，诗里反复写到，后人把诗人形象和结局合成一个浪漫的故事，从宋代起逐渐流传，经文人诗作固定下来。",
    "instead": "可以说：「李白死在当涂，死因史料没有细说；『醉酒捉月而死』最早可见于北宋诗文，是传说。」背诵这个故事时，加一句「相传」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "爱思想 —— 关于李白「捉月而死」传说形成过程的考证文章（李阳冰序、范传正碑文、新旧《唐书》、梅尧臣诗、《唐摭言》）",
        "url": "https://www.aisixiang.com/data/85828.html"
      },
      {
        "label": "中文维基百科 —— 李白（「自宋代起」有捉月传说）",
        "url": "https://zh.wikipedia.org/wiki/李白"
      },
      {
        "label": "Sotheby's —— Reaching for the Moon: Reimagining the Death of a Legendary Poet（称之为 apocryphal story）",
        "url": "https://www.sothebys.com/en/articles/reaching-for-the-moon-reimaging-the-death-of-a-legendary-poet"
      }
    ]
  },
  {
    "id": "origin-dragon-boat-qu-yuan",
    "category": "origin",
    "belief": "端午节吃粽子、赛龙舟，是为了纪念投江的屈原",
    "truth": "屈原的故事是后来叠加到端午上的一层说法；五月初五的驱邪、祭龙等习俗，史料和学者的研究都指向它早于屈原的纪念。",
    "detail": "屈原生活在战国时期（约公元前 340—前 278 年）。今天最流行的说法是：楚人为了打捞他或喂饱江里的鱼，划船赛渡、往江里投米团，于是有了龙舟与粽子。但英文维基对该节日的综述就指出，一些现代研究认为屈原、伍子胥的故事，可能是后来才叠加到既有节日习俗之上的。\n\n历史上其实有好几位「被纪念的人」：除屈原外，东汉的《曹娥碑》记有「五月五日，时迎伍君」，说的是吴地祭祀伍子胥；东汉孝女曹娥的故事也与这一天相连。同时，更早的文献里，五月本身就被视为需要驱疫避邪的时节——中文维基整理的材料提到《夏小正》里五月有蓄兰草沐浴的记载，《风俗通》把五月称作「恶月」。\n\n闻一多在《端午考》等文中提出另一种解释：端午最初是长江下游吴越民族祭龙的节日，龙舟竞渡是图腾祭祀的遗存。这一「祭龙说」影响很大，但后来的学者认为它并不能完全令人信服。把屈原与五月五日、投粽联系起来的最早明确文字，各资料说法不一（有的追到汉代，有的指向南朝梁吴均的《续齐谐记》），无论哪种，都已在屈原身后很久。所以较稳妥的说法是：端午的起源本身尚无定论，屈原是其中最动人的一层，而不是唯一或最早的一层。",
    "origin": "屈原的忠诚与悲剧在后世深入人心，司马迁的《史记》也为他立传；后人把一个早已存在的、与驱邪、水与龙有关的节日，与这位诗人的结局联系起来，逐渐成为官方和民间最通行的解释，成为教材和节日宣传里最常见的解释。",
    "instead": "可以说：「端午的起源有多种说法，屈原是最广为人知的一种；这个节日的驱邪、祭龙等习俗很可能比屈原更早。」纪念屈原本身并无不妥——只是不必把它说成唯一的来历。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Wikipedia —— Duanwu Festival（起源部分：屈原、伍子胥、曹娥与更早的节日说）",
        "url": "https://en.wikipedia.org/wiki/Duanwu_Festival"
      },
      {
        "label": "中文维基百科 —— 端午节（起源多元说；《夏小正》《风俗通》与屈原说的文献）",
        "url": "https://zh.wikipedia.org/wiki/端午节"
      },
      {
        "label": "清华大学 —— 闻一多《端午考》与「祭龙说」的介绍",
        "url": "https://www.tsinghua.edu.cn/info/1365/81394.htm"
      }
    ],
    "related": [
      "origin-hanshi-jie-zitui",
      "origin-nian-beast"
    ]
  },
  {
    "id": "origin-vena-amoris-ring-finger",
    "category": "origin",
    "belief": "婚戒戴在左手无名指，是因为这根手指有一条「爱之血管」直通心脏",
    "truth": "没有哪根手指有直通心脏的专属血管；这个解释是古代作家留下的说法，「vena amoris」这个拉丁词本身要到 1686 年才在英文文献里出现。",
    "detail": "古罗马作家马克罗比乌斯（约公元 400 年，《农神节》）记录了一位医生的说法：有一条神经从心脏出发，通到左手无名指的指端。他说的是神经而不是血管。到了 7 世纪，塞维利亚的伊西多尔在讲礼仪的著作里写道：人们开始把戒指戴在从拇指数起的第四指上，因为那里有一条血管通向心脏。12 世纪的《格拉蒂安教令集》和索尔兹伯里的约翰也有类似说法——可见这是一个反复被转抄的解剖学想象。\n\n「vena amoris」（爱之静脉）这个词，据英文维基整理，目前所知最早见于英国教会法学者亨利·斯温伯恩 1686 年出版的婚约专著，他引用的是未点名的古代典籍，并把来源归到埃及，多半指的是马克罗比乌斯。威廉·哈维后来对血液循环的研究，使这种「某根手指有专线通向心脏」的想法站不住脚。\n\n需要留余地的是：这个传说被用来解释戒指的位置，但为什么西方传统最终选了这根手指，并没有可靠的单一答案；现有史料只能证明「古人和中世纪作家这样解释过」，不能证明这就是习俗的真正起因。",
    "origin": "这一说法在古代晚期到中世纪的著作里反复出现，由神经变成血管，又在近现代的婚戒文化里被改名为「爱之静脉」，成为珠宝广告和婚礼文章里的常客。",
    "instead": "可以说：「古代和中世纪有人这样解释过戴戒指的位置，这是一个浪漫的传说，不是解剖学事实。」想戴在哪根手指都行，婚戒的意义在于两个人。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Vena amoris（马克罗比乌斯、伊西多尔、斯温伯恩 1686）",
        "url": "https://en.wikipedia.org/wiki/Vena_amoris"
      },
      {
        "label": "Word Histories —— origin of 'the ring finger' and of French 'l'annulaire'（马克罗比乌斯、伊西多尔、索尔兹伯里的约翰、《格拉蒂安教令集》）",
        "url": "https://wordhistories.net/2016/12/07/annulaire/"
      }
    ],
    "related": [
      "origin-valentine-lupercalia"
    ]
  },
  {
    "id": "origin-valentine-lupercalia",
    "category": "origin",
    "belief": "情人节源自古罗马牧神节，或是为了纪念为恋人秘密证婚而殉道的圣瓦伦丁",
    "truth": "圣瓦伦丁生平几乎无考，牧神节的联系缺乏证据；有记录可查的「瓦伦丁节与爱情」的联系，最早出自乔叟 14 世纪 80 年代前后的诗。",
    "detail": "二月十四日作为纪念名叫瓦伦丁的殉道者的日子，在 8 世纪的《格拉修圣礼书》里已有记载。但维基百科引用学者的话说，除了名字和葬在弗拉米尼亚大道、日期为 2 月 14 日之外，我们对瓦伦丁几乎一无所知；History.com 引用的研究者也说，早期殉道记载里「没有一个字」谈到浪漫。\n\n牧神节（Lupercalia，约 2 月 13—15 日）的说法也站不住：布鲁斯·福布斯等学者指出，把圣瓦伦丁节与牧神节的洁净仪式联系起来「没有证据」。学者 Jack Oruch 和 Henry Ansgar Kelly 的研究显示，这类推测大多出自 18 世纪古物学家（如 Alban Butler），后来被当成了事实。History.com 也说，早期记载并不支持牧神节有浪漫色彩的现代说法。\n\n目前能查到的第一次把「圣瓦伦丁节」与恋爱联系起来的，是乔叟的《百鸟会议》（约 1382 年），诗里说鸟儿在这一天挑选配偶。Kelly 还提出，乔叟指的可能是另一位瓦伦丁的纪念日（5 月 3 日），但 2 月 14 日更为人熟悉，才成了浪漫节日的日期——这一点学界仍有讨论。",
    "origin": "18 世纪的古物学者把圣瓦伦丁节与罗马牧神节拉到一起，此后这类说法在通俗读物里反复出现，近现代商业化的情人节又把它们当成现成的来历。",
    "instead": "可以说：「情人节与爱情的联系，目前最早见于 14 世纪的乔叟；牧神节和殉道恋爱故事都没有可靠的史料支持。」说「传说中」比说「事实上」更贴近证据。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Valentine's Day（圣瓦伦丁、乔叟《百鸟会议》、牧神节说的学术评价）",
        "url": "https://en.wikipedia.org/wiki/Valentine%27s_Day"
      },
      {
        "label": "History.com —— Livia Gershon, The Real St. Valentine and the medieval romance of the holiday",
        "url": "https://www.history.com/articles/real-st-valentine-medieval"
      }
    ],
    "related": [
      "origin-vena-amoris-ring-finger"
    ]
  },
  {
    "id": "origin-watt-kettle",
    "category": "origin",
    "belief": "瓦特看到水壶盖被蒸汽顶起来，于是发明了蒸汽机",
    "truth": "蒸汽机在瓦特之前就已有纽可门机；瓦特的贡献是 1765 年的分离冷凝器等改进，水壶灵感的故事来源不明，更像后人添上的。",
    "detail": "英文维基说得很明确：瓦特并没有发明蒸汽机，而是大幅提高了既有的纽可门蒸汽机的效率。1763 年他在修理一台纽可门机模型时发现，每一个循环里大约四分之三的蒸汽热量都耗在了重新加热汽缸上；1765 年 5 月他在格拉斯哥草地散步时想到了分离冷凝器，让汽缸保持高温，燃料效率最高可达纽可门机的约五倍。\n\n至于水壶的故事：维基说这个故事可能是瓦特的儿子为美化父亲而编的；Science Museum 的文章则提到，馆里确实收藏一件被称为瓦特「philosophising steam kettle」（用于思考的蒸汽壶）的物件，并转述了「瓦特的蒸汽计划来自观察烧水壶」这一说法。能说的只有：「看到壶盖跳动就发明了蒸汽机」找不到可靠的当时记录。",
    "origin": "19 世纪人们热衷于为大发明家配上一个顿悟的瞬间（与牛顿的苹果是同类故事）；水壶的故事至今流传，连博物馆也收藏了一件被称为「瓦特蒸汽壶」的物件。",
    "instead": "可以说：「瓦特没有发明蒸汽机，他把已有的纽可门机改进得高效实用，关键是分离冷凝器。」水壶故事可以当作后人的传说来讲，并注明出处不明。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— James Watt（水壶传说；纽可门机；分离冷凝器 1765）",
        "url": "https://en.wikipedia.org/wiki/James_Watt"
      },
      {
        "label": "Science Museum Group blog —— Remembering James Watt（「philosophising steam kettle」与水壶故事）",
        "url": "https://blog.sciencemuseum.org.uk/remembering-james-watt/"
      }
    ],
    "related": [
      "origin-edison-invented-lightbulb"
    ]
  },
  {
    "id": "origin-edison-invented-lightbulb",
    "category": "origin",
    "belief": "灯泡是爱迪生发明的",
    "truth": "爱迪生之前已有多人做出白炽灯，斯旺 1878—1879 年就演示了碳丝灯；爱迪生的贡献是让它耐用、实用并配上整套供电系统。",
    "detail": "Edison Papers 项目（罗格斯大学）的介绍写道，爱迪生 1878 年开始研究之前，实验者已摸索了约四十年，难点是让灯丝既发光又不熔化、不氧化、不耗电过多。更早的有：1802 年戴维用铂条通电发光，1840 年德拉鲁把铂丝封进真空管；英国的约瑟夫·斯旺 1878 年 12 月演示了碳棒灯，1879 年初重复演示。\n\n爱迪生做的是把它变成能用的产品：他判断灯需要高电阻以省下昂贵的铜导线；1879 年 3 月起把灯丝封进真空泡中；1879 年 10 月 21—22 日用碳化的棉线在真空里点亮了灯（维基记作持续约 13.5 小时），后来发现碳化竹丝可以亮 1200 小时以上；灯泡还被接成并联电路，使一盏灯熄灭不影响其他灯。\n\n专利上也不是一边倒：英国的两家公司后来合并成 Edison and Swan United Electric Company；在美国，专利局 1883 年曾以在先技术为由裁定爱迪生的专利无效，1889 年法官才对「高电阻碳丝」这一权利要求给予支持。另外有一个常见的先驱说法，海因里希·戈贝尔 1854 年的灯，据 2007 年的研究结论是虚构的。",
    "origin": "爱迪生善于把一项技术包装、量产并讲成故事，门洛帕克实验室和随后建成的电力系统让他成了「发明电灯的人」，教科书和媒体把一个团队、多国发明者接力的过程，缩成了一个人的名字。",
    "instead": "可以说：「爱迪生没有发明白炽灯，他和团队把它做成了耐用、可商用、能接入电网的产品。」同时可以提到斯旺——他们的英国公司后来合并。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Thomas A. Edison Papers (Rutgers) —— Electric Lamp（此前四十年的实验者；高电阻、真空、碳化棉线 1879 年 10 月、并联）",
        "url": "https://edison.rutgers.edu/life-of-edison/inventions?catid=91&id=531%3Aelectric-lamp&view=article"
      },
      {
        "label": "Wikipedia —— Incandescent light bulb（戴维、德拉鲁、斯旺、戈贝尔、专利之争）",
        "url": "https://en.wikipedia.org/wiki/Incandescent_light_bulb"
      }
    ],
    "related": [
      "origin-watt-kettle",
      "origin-newton-apple-head"
    ]
  },
  {
    "id": "origin-archimedes-eureka-bath",
    "category": "origin",
    "belief": "阿基米德在澡盆里发现浮力原理，光着身子冲出去大喊「尤里卡」",
    "truth": "这个故事最早见于阿基米德身后约两个世纪的维特鲁威，不见于他自己的著作；故事里的测量方法是否可行，学界一直有争论。",
    "detail": "维特鲁威在《建筑十书》第九卷序言里讲了这个故事：叙拉古的国王希罗委托金匠做一顶金冠，怀疑金匠掺了银，让阿基米德查验；阿基米德入浴时看到水溢出，悟到办法，光着身子跑回家，一遍遍喊着希腊语「εὑρηκα」（我找到了）。英文维基指出，这则轶事并不出现在阿基米德任何一部留存下来的数学著作里，讲述者维特鲁威比他晚了大约两个世纪。\n\n伽利略博物馆的展览介绍说，维特鲁威记述的方法「自古以来就引发激烈的学术争论」。维基百科引述的批评之一是：金冠若只掺了少量银，排水的差别很小，当时的测量手段很难分辨。另一份古代材料（匿名的《称重之诗》，约 5 世纪）描述的是用天平把物体浸入水里比较，这种做法更接近阿基米德在《论浮体》里讲的原理。\n\n因此比较稳妥的看法是：浮力原理确实属于阿基米德，但「澡盆顿悟、大喊尤里卡」的具体场景是后来的传说，真假和细节无法从当时的记录里证实。",
    "origin": "这则故事经维特鲁威和后来的普鲁塔克等人转述，成了「灵光一现」的经典范例；到近现代，它被写进教科书和科普读物，细节日益统一。",
    "instead": "可以说：「阿基米德的浮力原理有他自己的著作为证；澡盆与金冠的故事出自两个世纪后的维特鲁威，更像一个流传的传说。」",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Vitruvius, De Architectura, Book IX 序言（Penelope / University of Chicago 的 Thayer 版）",
        "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Vitruvius/9*.html"
      },
      {
        "label": "Wikipedia —— Archimedes（金冠故事的来源与不见于其著作；《论浮体》；《称重之诗》）",
        "url": "https://en.wikipedia.org/wiki/Archimedes"
      },
      {
        "label": "Museo Galileo —— Vitruvius and Archimedes（维特鲁威记述方法的学术争论）",
        "url": "https://exhibits.museogalileo.it/archimedes/section/VitruviusArchimedes.html"
      },
      {
        "label": "Wikipedia —— Eureka (word)（金冠排水差异难以测量的批评；维特鲁威与普鲁塔克的转述）",
        "url": "https://en.wikipedia.org/wiki/Eureka_(word)"
      }
    ],
    "related": [
      "origin-newton-apple-head"
    ]
  },
  {
    "id": "origin-nian-beast",
    "category": "origin",
    "belief": "春节放鞭炮、贴红对联，是因为古时候有凶猛的「年兽」，人们用红色和响声把它吓跑",
    "truth": "「年兽」故事在古籍里查不到；目前能查到的最早文字记录出现在 20 世纪 30 年代，通行版本要到 1980 年的报纸文章才定型。",
    "detail": "民俗研究者祝淳翔的考察（澎湃新闻刊载）梳理了目前可见的文字线索：1933 年 1 月，孙玉声（海上漱石生）在《金刚钻》报上的《沪壖话旧录》里，提到一个与紫微星年画有关、「似狗非狗」被锁在石柱上的怪物；1939 年 12 月 31 日《申报》刊出署名「申」的《过年的传说》；1980 年 2 月 16 日《人民日报》刊出赵慈风、康新民的《过年的传说和风俗》，确立了今天人人熟悉的版本——年兽怕响声、怕红色、怕火。\n\n中国作家网转述的研究也说，年兽故事最早大约只能追溯到 20 世纪 30 年代，此前长期只在民间口头流传，没有权威的文字记录，所以各地版本不一；是 80 年代以后通过报刊和通俗读物，才逐渐统一并流行起来。\n\n要留余地的是：「查不到古籍记载」不等于「古时候绝对没有人这样讲过」，口头传说本来就难留痕迹。研究者的推测是，它可能由紫微星年画里的神兽，加上「年关」（年底逼债）的说法演变而来。可以确定的是，把它说成「几千年前就有」的古老起源，目前没有文字证据。",
    "origin": "这个故事经 20 世纪的报刊、连环画和后来的动画反复讲述，逐渐成为解释春节习俗（放鞭炮、贴红、守岁）的「标准答案」。",
    "instead": "可以说：「年兽是一个流传很广的故事，但目前最早的文字记录只到 20 世纪 30 年代。」讲给孩子听时当故事讲就好。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "澎湃新闻 —— 祝淳翔对「年兽」传说文献来源的考察（《金刚钻》1933、《申报》1939、《人民日报》1980）",
        "url": "https://www.thepaper.cn/newsDetail_forward_2778438"
      },
      {
        "label": "中国作家网 —— 关于年兽传说来源与最早记载的文章（2025）",
        "url": "https://www.chinawriter.com.cn/n1/2025/0209/c442005-40415244.html"
      }
    ],
    "related": [
      "origin-dragon-boat-qu-yuan"
    ]
  },
  {
    "id": "origin-posh-port-out-starboard-home",
    "category": "origin",
    "belief": "「posh」（高档）是「Port Out, Starboard Home」的缩写，指富人坐船去印度时订的阴凉舱位",
    "truth": "没有任何带 POSH 字样的船票或船公司记录被找到，这个解释到 1932 年才出现，而这个词早已在英语里存在。",
    "detail": "这个故事说，英国与印度之间的邮轮上，富人为了避开太阳，去程订左舷（port）、回程订右舷（starboard），船票上因此盖着 POSH。词源网站 World Wide Words 的作者概括得很干脆：这是个很棒的故事，但从来没有找到过盖着 posh 的船票，公司记录里也没有这个说法。他还指出，这个解释直到 1932 年才出现，而这个词那时已在英语里存在多年。\n\nWordOrigins 的看法是：posh 有两个相关的意思。一是钱——来自罗姆语（Angloromani 的 posh，意为「一半」，指半便士），1830 年的法庭记录里已有用作「钱」的例子；二是「时髦、讲究」，可能与乌尔都语 safed-pōš（「穿白衣的人」，指体面人）有关，1914 年已有军队俚语里指好衣服的记载。更早，1801 年的一出戏里 Posh 还只是个人名。维基百科的「常见错误词源」条目也说：posh 大概源自 19 世纪指花花公子的俚语，最初是地下世界里指钱的词。\n\n同类的「缩写词源」还有两个：golf 并不是「Gentlemen Only, Ladies Forbidden」——这个词在中古苏格兰语里就已出现；tip 也不是「To Insure Promptness」——该词 17 世纪就有，而英语里首字母缩略词要到 20 世纪中叶才流行起来。上面这些词的真正来源，各家说法并不完全一致，只能说「不是缩写」是有证据的。",
    "origin": "这类「每个字母代表一个词」的故事听起来聪明、画面感强，又不涉及任何人，因此很容易在旅游书和闲谈中代代相传；英语里首字母缩略词本身要到 20 世纪才多起来，把它套到更早的词上，就是事后的「倒推」。",
    "instead": "可以说：「posh 的来源不确定，比较有依据的说法是它从指钱和讲究衣着的俚语演变而来；『Port Out, Starboard Home』没有任何文献支持。」遇到「X 其实是某某几个词的缩写」时，先问最早什么时候出现、有没有实物。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "WordOrigins.org —— Posh（无 POSH 船票、1932 年才出现的说法、罗姆语与乌尔都语来源）",
        "url": "https://www.wordorigins.org/big-list-entries/posh"
      },
      {
        "label": "Wikipedia —— List of common false etymologies of English words（posh、golf、tip）",
        "url": "https://en.wikipedia.org/wiki/List_of_common_false_etymologies_of_English_words"
      }
    ],
    "related": [
      "origin-sos-save-our-souls"
    ]
  },
  {
    "id": "origin-cocktail-word-legends",
    "category": "origin",
    "belief": "「鸡尾酒」这个词来自独立战争时酒馆老板娘贝特西·弗拉纳根用鸡尾羽毛装饰酒杯（或法语蛋杯 coquetier）",
    "truth": "老板娘贝特西是小说里的虚构人物，蛋杯说在时间上对不上；这个词到底从哪来仍无定论，较有依据的猜测与「竖着尾巴的马」有关。",
    "detail": "「cocktail」最早的印刷记录是 1798 年伦敦《晨邮报》，1803 年又见于美国的一份农业报纸；1806 年 5 月 13 日，《平衡与哥伦比亚储藏库》杂志的编辑回答读者提问，给出了已知最早的定义：一种由烈酒、糖、水和苦精调成的「刺激性的酒」。\n\n贝特西·弗拉纳根的故事（约 1779 年的弗吉尼亚酒馆，用羽毛搅酒）：据 VinePair 引用历史学家威廉·格莱姆斯的考证，她其实是詹姆斯·菲尼莫尔·库珀小说《间谍》里的人物。蛋杯说（法语 coquetier，据说是佩肖用蛋杯调酒、被顾客读成 cocktail）：佩肖的药房 1834 年才开，而这个词在 1806 年已有定义。\n\n较有依据的说法见于 Difford's Guide 和 VinePair 的综述：牛津英语词典的思路是，cocktail 原指被截短尾巴、尾巴向上翘的马，通常是杂种马，「混合」的意思后来转到掺了东西的饮料上；调酒史学者大卫·翁德里奇则认为可能来自英国赛马圈的说法，指用土办法给疲马「提神」。需要强调的是，这仍是猜测，两篇综述都说真正的来源没有定论；有的传说（如墨西哥 cola de gallo）只有 1936 年的一条出处。",
    "origin": "贝特西的故事源自库珀的小说《间谍》，却被后来的传说当成历史事实反复引用；蛋杯说则是在「cocktail」已经流行很久之后才被编出来的解释。",
    "instead": "可以说：「鸡尾酒一词至少可追溯到 1798 年，来源没有定论；常听到的贝特西和蛋杯故事都有明显漏洞。」",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Difford's Guide —— Origins of the word cocktail（1798、1803、1806；牛津英语词典的马尾说；各种说法的评估）",
        "url": "https://www.diffordsguide.com/encyclopedia/2292/cocktails/origins-of-the-word-cocktail"
      },
      {
        "label": "VinePair —— The term \"cocktail\" and its disputed origins（贝特西·弗拉纳根为小说人物；佩肖 1834 年；翁德里奇的看法）",
        "url": "https://vinepair.com/articles/term-cocktail-disputed-origins/"
      },
      {
        "label": "Wikipedia —— Cocktail（词源：争议；「cock-tail」与「刺激」的早期用例）",
        "url": "https://en.wikipedia.org/wiki/Cocktail"
      }
    ],
    "related": [
      "origin-toast-clink-poison"
    ]
  },
  {
    "id": "origin-sandwich-gambling-earl",
    "category": "origin",
    "belief": "三明治是桑威奇伯爵为了赌牌时不离开牌桌而发明的",
    "truth": "「赌桌」这个说法只来自一位法国游记作家的一则传闻，传记作者认为它没有证据；夹肉面包本身并非他首创，不过这种食物的名字很可能确实来自他。",
    "detail": "常见的版本说，第四代桑威奇伯爵约翰·蒙塔古赌博一整天，只吃夹在烤面包片中间的牛肉，后来别人也要「和桑威奇一样的」。这个说法的出处是法国作家格罗斯利（Pierre-Jean Grosley）关于 1765 年在伦敦见闻的游记，18 世纪 70 年代出版；他写的是一位大臣赌了 24 小时，并未点名。\n\n海军史学家罗杰（N. A. M. Rodger）在伯爵的传记里评论说，这则闲话没有旁证，似乎也没什么依据，尤其是它说的 1765 年，桑威奇正是内阁大臣、公务繁忙；罗杰认为更可能是他在办公桌前为了边工作边吃饭而用上了这种吃法。Word Histories 指出，「sandwich」一词最早见于吉本 1762 年的日记，也没有提到伯爵；但这个词几乎可以肯定是以他命名的，没有别的可信解释。\n\nHistory.com 的文章也强调，伯爵并不是想出这个主意的第一人；类似「面包夹馅」的食物在许多地方存在了很久。所以较稳妥的说法是：他的名字留在了这种食物上，而具体是怎么来的，现有史料不足以确定。",
    "origin": "格罗斯利的游记只写了一位未点名的大臣赌了 24 小时；后来的转述把它安到桑威奇伯爵头上，赌博、24 小时、「和桑威奇一样」逐渐成了固定情节，也成了这位本来在海军和政治上更为人知的伯爵最出名的事。",
    "instead": "可以说：「三明治以桑威奇伯爵命名，但他并没有发明夹肉面包；赌桌的故事来自一则 18 世纪的传闻，他的传记作者并不相信。」",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Word Histories —— history of the word 'sandwich'（吉本 1762、格罗斯利《伦敦》、罗杰的评论）",
        "url": "https://wordhistories.net/2017/03/23/sandwich/"
      },
      {
        "label": "History.com —— Who Invented the Sandwich?（伯爵并非第一人；格罗斯利的轶事可能是编的）",
        "url": "https://www.history.com/.amp/news/sandwich-inventor-john-montagu-earl-of-sandwich"
      },
      {
        "label": "Wikipedia —— John Montagu, 4th Earl of Sandwich（格罗斯利的记述；罗杰的办公桌说）",
        "url": "https://en.wikipedia.org/wiki/John_Montagu,_4th_Earl_of_Sandwich"
      }
    ],
    "related": [
      "origin-thomas-crapper-flush-toilet"
    ]
  },
  {
    "id": "origin-toast-clink-poison",
    "category": "origin",
    "belief": "干杯时碰杯，是因为古人要让酒溅到对方杯里，防止被下毒",
    "truth": "没有证据支持这个说法；碰杯的习俗只有约三百年历史，比祝酒晚得多，祝酒本身可以追溯到古代的祭酒仪式。",
    "detail": "英文维基说，这个故事（碰杯会让酒溅进对方杯里）「没有真正的证据」；Mental Floss 的文章则指出，人们碰杯的历史不过约 300 年，而祝酒的习俗早就存在，所以「防毒」不太可能是起因。同一篇文章也说，「碰杯是为了用响声驱赶恶灵」之类的解释同样没有可靠证据。\n\n比较有依据的解释有两条：一是祝酒本身可能是古代祭酒仪式的世俗残余——维基百科引用《酒与文化国际手册》，认为向神灵献酒的神圣仪式是它的祖先；二是 toast 这个词在 17 世纪与「往酒里放调味的烤面包」有关，因为人们把一位女士的名字比作给酒添味的作料。至于碰杯，Mental Floss 引用的看法是：大家从共用一只「爱之杯」转向各人用自己的杯子后，把杯子碰在一起，是在象征性地重新把酒合在一起，表示亲近。这是一个解释，不是定论。",
    "origin": "「防止下毒」这个解释听起来合情合理，又有一点宫廷阴谋的戏剧性，因此成为酒席上最常被讲的谈资；它反映的是后人替习俗找理由的倾向，而不是文献里有记载的起因。",
    "instead": "可以说：「碰杯的起源没有定论；『防下毒』这个说法没有证据，而且碰杯的出现比祝酒晚得多。」",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— Toast (honor)（碰杯防毒说「没有真正的证据」；祭酒仪式说；toast 一词与烤面包）",
        "url": "https://en.wikipedia.org/wiki/Toast_(honor)"
      },
      {
        "label": "Mental Floss —— Why do we toast and clink glasses?（碰杯约 300 年；防毒与驱邪说无证据）",
        "url": "https://www.mentalfloss.com/culture/why-do-we-toast-celebrate"
      }
    ],
    "related": [
      "origin-cocktail-word-legends"
    ]
  },
  {
    "id": "origin-hanshi-jie-zitui",
    "category": "origin",
    "belief": "寒食节禁火吃冷食，是为了纪念被晋文公放火烧山逼出来、最终抱树而死的介子推",
    "truth": "介子推「被烧死」的故事在早期史料里并没有，最早的寒食纪念记载出现在他身后约六百年；禁火习俗是否另有更古老的来源，学界有不同看法。",
    "detail": "英文维基整理的材料显示：最早的寒食节记载见于桓谭《新论》（约公元 1 世纪），说太原郡的人们在隆冬前后五天不生火，以纪念介子推——距离他生活的春秋时期已有约六百年。更早的《左传》里，介子推是在自己觉得未被赏识后主动归隐，并没有被火烧死的情节。东汉时，周举曾批评当地因禁火而伤人性命的做法，可见这一习俗当时已经相当严格。\n\n另一些学者主张，寒食的根子是更古老的「改火」习俗：学者 Du Gongzhan 把它联系到《周礼》里仲春用木铎令国中禁火的规定；中国新闻网等介绍也提到，早春干燥易起火，古人要熄旧火、钻木取新火，其间吃冷食。他们认为介子推的传说是后来叠加上去的。也有学者（据英文维基）认为这些替代理论「不太可能成立」，因为早期史料一致把寒食与介子推联系，且这些理论依赖的春季时间并不是寒食最初的季节（最初在隆冬）。\n\n因此这是一个「学界有分歧」的题目：可以确定的是烧山的情节比较晚；至于禁火习俗是先有、后来才附会到介子推身上，还是一开始就与他相关，目前没有定论。",
    "origin": "介子推从春秋时期一位自觉不受重视而隐居的人，在后世的叙述里逐渐成了割股奉君、不言禄、被火烧死的忠义典范；清明与寒食在时间上相近后又合并，这个故事就跟着进入了清明的由来。",
    "instead": "可以说：「寒食节的由来有两种主要解释：纪念介子推，或来自更古老的禁火改火习俗；『烧山逼出』的情节在早期史料里并没有。」",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Wikipedia —— Cold Food Festival（桓谭《新论》；《左传》中的介子推；周举；Du Gongzhan、de Groot、Frazer 的替代理论）",
        "url": "https://en.wikipedia.org/wiki/Hanshi_Festival"
      },
      {
        "label": "中国新闻网 —— 寒食节的两种起源说法（介子推与古老的改火习俗）",
        "url": "https://www.chinanews.com.cn/life/2022/04-02/9718038.shtml"
      },
      {
        "label": "The World of Chinese —— China's ancient Cold Food Festival（介子推传说的通行版本）",
        "url": "https://www.theworldofchinese.com/2018/04/chinas-ancient-cold-food-festival-is-not-too-hot/"
      }
    ],
    "related": [
      "origin-dragon-boat-qu-yuan"
    ]
  },
  {
    "id": "origin-thomas-crapper-flush-toilet",
    "category": "origin",
    "belief": "抽水马桶是托马斯·克拉珀发明的，英语里的「crap」（粪便、废话）就来自他的名字",
    "truth": "克拉珀没有发明冲水马桶，「crap」这个词比他出生还早；他确有真实的发明，如浮球阀和 U 形弯管。",
    "detail": "英文维基说，克拉珀持有九项专利，其中三项与抽水马桶的改进有关（如浮球阀），但没有一项是冲水马桶本身；他的广告还曾暗示自己发明了虹吸冲水，其中一则广告里的专利号其实属于 1898 年的阿尔伯特·吉布林。他确实改良了存水弯（1880 年的 U 形弯），在国王路开了世界上第一间浴室展厅，并多次获得皇家供货认证。\n\n「crap」的故事（第一次世界大战中美国士兵看到抽水箱上的名字，才说「去 crapper」）也站不住：该词在他之前很久就有。WordOrigins 的条目显示，在 1425 年之前抄写的一份手稿里，crappys 就指磨坊里的谷壳，更早的盎格鲁—诺曼文献里还有 chrape、crappe 等形式，最初指的是碎屑、废料；用来指排泄物则见于 19 世纪（牛津英语词典称最早把它用于排泄物是 1846 年，那时克拉珀才出生约十年）。词的真正来源仍有不确定之处，可能与法语、荷兰语有关。\n\nWordOrigins 的看法是：他的名字（Crapper）与职业太贴切，可能帮这个词流行起来，但不是它的来源。",
    "origin": "姓氏与职业的巧合，加上他确有真实的卫生设备事业，使「克拉珀发明了马桶」成了流传很广的谈资，并常和「crap」一词的来源合在一起讲。",
    "instead": "可以说：「克拉珀是真实的卫生设备商，改进了马桶的部件，但没有发明冲水马桶；crap 这个词在他之前就有。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— Thomas Crapper（九项专利、无冲水马桶专利、U 形弯、广告误导；crap 一词早于他）",
        "url": "https://en.wikipedia.org/wiki/Thomas_Crapper"
      },
      {
        "label": "WordOrigins.org —— Crap（1425 年前手稿；盎格鲁—诺曼与荷兰语来源；19 世纪的排泄物用法）",
        "url": "https://www.wordorigins.org/big-list-entries/crap"
      }
    ],
    "related": [
      "origin-sandwich-gambling-earl"
    ]
  },
  {
    "id": "world-einstein-compound-interest",
    "category": "quote",
    "belief": "「复利是世界第八大奇迹。」——爱因斯坦",
    "truth": "目前查不到爱因斯坦说过这句话；能查到的最早版本，是 1925 年美国一家储蓄贷款公司的广告词。",
    "detail": "Quote Investigator 追查到的最早近似句，出现在 1925 年俄亥俄州《克利夫兰老实人报》（Cleveland Plain Dealer）上 Equity Savings & Loan 公司的广告里，句子是「世界第八大奇迹——就是复利」，没有署名。此后 1929 年的另一则银行广告、1965 年《华尔街日报》上的广告（归给罗斯柴尔德男爵）、1981 年一份报纸（归给洛克菲勒）都出现过类似说法。\n\n把它归到爱因斯坦头上的最早记录是 1988 年的一份报纸。普林斯顿大学出版社的《The Ultimate Quotable Einstein》把它放在「大概不是爱因斯坦所说」（Probably Not By Einstein）一节。Quote Investigator 的判断是：没有实质证据表明爱因斯坦、罗斯柴尔德或洛克菲勒用过这句话，它更像是某位不知名的广告文案的作品。\n\n需要说明的是：这只是「查无出处」，不等于证明爱因斯坦一辈子没讲过。但在目前公开的记录里，找不到他说这话的任何文献。",
    "origin": "金融广告需要权威背书，于是一句无名文案被一次次改署成罗斯柴尔德、洛克菲勒，最后落到名气最大的爱因斯坦身上（有记录的最早爱因斯坦署名在 1988 年），在理财文章里被反复转载。",
    "instead": "想引用就写「据传爱因斯坦所说，但查无出处；最早见于 1925 年的一则储蓄广告」。如果只是想说明复利的威力，直接讲复利公式和具体数字，比借名人的嘴更有说服力。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2019 —— The Eighth Wonder of the World Is Compound Interest",
        "url": "https://quoteinvestigator.com/2019/09/09/interest/"
      }
    ],
    "related": [
      "world-einstein-insanity-definition"
    ]
  },
  {
    "id": "world-einstein-insanity-definition",
    "category": "quote",
    "belief": "「疯狂，就是重复做同样的事，却期待不同的结果。」——爱因斯坦",
    "truth": "没有证据表明爱因斯坦说过；能查到的最早版本出现在 1981 年的戒瘾互助会语境里。",
    "detail": "Quote Investigator 找到的最早近似记录有两条，都在 1981 年：10 月，田纳西州诺克斯维尔一份报纸转述一位 Al-Anon（家属互助会）参加者说「疯狂就是一遍遍做同样的事，期待不同的结果」；11 月，匿名戒毒会（Narcotics Anonymous）的一本小册子里有「疯狂是重复同样的错误，却期待不同的结果」。1983 年，Rita Mae Brown 的小说《Sudden Death》里也让一个角色说了这句话。\n\n把它归给爱因斯坦的说法大约在 1990 年前后才开始出现在报纸上，那时他已去世三十多年。普林斯顿版《The Ultimate Quotable Einstein》把它放在「被误署为爱因斯坦」（Misattributed）一节。\n\n互助会的传统是匿名，所以谁最先说出这句话无从考证；能确定的只是它在 1981 年已在戒瘾互助圈子里流传，早于任何爱因斯坦署名。",
    "origin": "这句话很可能先在十二步戒瘾互助圈里口耳相传，后来进入畅销书和励志文章；大约 1990 年起被配上爱因斯坦的名字，因为「聪明人说的」更有分量。",
    "instead": "可以写「出自戒瘾互助圈的流行说法（1981 年已有记录）」，或者干脆不署名。顺带一提，它也不是严格意义上的临床定义：很多时候重复尝试正是科学和学习的方式。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2017 —— Insanity Is Doing the Same Thing Over and Over Again and Expecting Different Results",
        "url": "https://quoteinvestigator.com/2017/03/23/same/"
      }
    ],
    "related": [
      "world-einstein-compound-interest",
      "world-einstein-simple-as-possible"
    ]
  },
  {
    "id": "world-einstein-bees",
    "category": "quote",
    "belief": "「如果蜜蜂从地球上消失，人类只能再活四年。」——爱因斯坦",
    "truth": "找不到爱因斯坦说过这话的任何文献；最早的爱因斯坦署名出现在他去世十年后的 1965 年法国刊物上。",
    "detail": "Quote Investigator 梳理的时间线是：1941 年，加拿大的《Canadian Bee Journal》上有人写下「把蜜蜂从地球上拿走，至少十万种植物就活不下去」，这里还没有「四年」，也没有说是爱因斯坦。1965 年 5 月，法国刊物《La Vie des Bêtes et l'Ami des Bêtes》才第一次把「人类四年内消失」的计算说成是爱因斯坦的；6 月另一本蜂业刊物转载。1994 年 1 月，苏格兰《The Scotsman》报道法国养蜂人全国联盟的一份传单，用的就是爱因斯坦的署名。\n\n《The Ultimate Quotable Einstein》的编者把它放在「大概不是爱因斯坦所说」一节。另外，一些网页说这句话出自梅特林克（Maeterlinck）1901 年的《蜜蜂的生活》，但 Quote Investigator 并没有把「四年」归给他，他只是写过很多植物依赖蜜蜂。\n\n还要补一句：蜜蜂等传粉昆虫确实对许多作物很重要，但「四年灭绝」这个具体数字并无科学推算支撑。这条只说署名，不否定保护传粉昆虫的意义。",
    "origin": "养蜂界和环保团体需要一句有力的话，爱因斯坦的名字让它显得有科学背书。1960 年代起在法国的蜂业刊物里出现，1990 年代被养蜂人联盟的传单带向英语世界。",
    "instead": "可以说「据传爱因斯坦所说，最早见于 1965 年的法国蜂业刊物，无文献佐证」。想讲传粉的重要性，直接引用粮农组织或研究文献里关于传粉依赖作物的数据。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2013 —— If the Bee Disappeared Off the Face of the Earth, Man Would Only Have Four Years Left To Live",
        "url": "https://quoteinvestigator.com/2013/08/27/einstein-bees/"
      }
    ],
    "related": [
      "world-einstein-fish-climb-tree"
    ]
  },
  {
    "id": "world-voltaire-defend-to-death",
    "category": "quote",
    "belief": "「我不同意你的观点，但我誓死捍卫你说话的权利。」——伏尔泰",
    "truth": "这句话是英国作家 Evelyn Beatrice Hall 在 1906 年写的，她本人后来承认这是自己的措辞，不是伏尔泰的原话。",
    "detail": "1906 年，Evelyn Beatrice Hall 用笔名 S. G. Tallentyre 出版了《The Friends of Voltaire》。书里讲到爱尔维修（Helvétius）的《论精神》在 1758 年被焚，她写下这句话，用来概括伏尔泰的态度，却把它放进了引号。伏尔泰的著作和书信里并没有找到这句话，也没有找到同样意思的原文。\n\n1939 年，Hall 写信给学者 Burdette Kinne，信中说这句话是她自己的表述，不该放进引号，并为误导对方道歉。\n\n所以准确的说法是：这是对伏尔泰立场的一种概括，思想上与他主张的宽容和言论自由相通，但措辞是 Hall 的。",
    "origin": "一个作者给历史人物的态度写了一句精炼的转述，因为太好用，被引号一包，一代代人当成原话抄下去，署名自然落到了伏尔泰头上。",
    "instead": "最诚实的引法是：「Evelyn Beatrice Hall 对伏尔泰态度的概括（1906）」。也可以写「常被归于伏尔泰，实为 Hall 的措辞」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator, 2015 —— I Disapprove of What You Say, But I Will Defend to the Death Your Right to Say It",
        "url": "https://quoteinvestigator.com/2015/06/01/defend-say/"
      }
    ],
    "related": [
      "world-burke-evil-triumph"
    ]
  },
  {
    "id": "world-marie-antoinette-brioche",
    "category": "quote",
    "belief": "「何不食肉糜？（让他们吃蛋糕吧。）」——玛丽·安托瓦内特",
    "truth": "没有证据表明她说过。卢梭在 1760 年代写过一位「大公主」说类似的话，而且早于她的时代；把话安到她头上，是她死后约五十年的事。",
    "detail": "卢梭的《忏悔录》前六卷写于 1765 年，1782 年出版。书里回忆，一位不具名的「大公主」听说农民没有面包，便说「那就让他们吃布里欧修吧」（Qu'ils mangent de la brioche）。他从未说明这位公主是谁，甚至可能是他杜撰的轶事。当时玛丽·安托瓦内特还是远在奥地利的孩子。\n\n据维基百科对这一条的梳理，把这句话和她联系起来的最早记录是 Alphonse Karr 在 1843 年的文字，距她被处死已约五十年；大革命期间反对王室的人也没有拿这句话攻击过她。另据芙雷泽（Antonia Fraser）的传记所述，路易十八的家人则认为这个故事更老，是路易十四之妻玛丽-泰蕾兹的故事。\n\n中文里常见的对应说法是「何不食肉糜」，出自《晋书》，说的是晋惠帝（259–307）听说百姓饿死，反问为什么不吃肉粥。这是另一个朝代、另一位当事人的传闻，两个故事讲的是同一类「不知民间疾苦」的老套。",
    "origin": "「权贵不知民间疾苦」是各国都流传的老故事，每个社会都把它安在最容易被讨厌的统治者身上。法国人在 19 世纪中叶把它固定在了安托瓦内特身上。",
    "instead": "可以说「相传她说过，但无同时代证据；卢梭《忏悔录》里有一位不具名公主的类似轶事」。想用来说明脱离民众，用「何不食肉糜」的晋惠帝或直接用史实更稳妥。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— Let them eat cake（卢梭《忏悔录》、1843 年 Karr、晋惠帝条目）",
        "url": "https://en.wikipedia.org/wiki/Let_them_eat_cake"
      },
      {
        "label": "Professor Buzzkill —— Quote or No Quote: \"Let Them Eat Cake\", 2019",
        "url": "https://professorbuzzkill.com/2019/07/09/quote-or-no-quote-let-them-eat-cake/"
      }
    ],
    "related": [
      "world-goebbels-repeat-lie"
    ]
  },
  {
    "id": "world-burke-evil-triumph",
    "category": "quote",
    "belief": "「恶要得胜，只需要好人什么都不做。」——埃德蒙·伯克",
    "truth": "伯克的著作里查不到这句话；最早的近似句出现在 1916 年的一场演讲里。",
    "detail": "Quote Investigator 的追查显示：伯克在 1770 年的《对当前不满情绪之根源的思考》里写过相近的意思——「恶人结盟时，善人必须联合，否则他们将一个个倒下，成为一场不值一提的斗争里无人怜惜的牺牲品」，但并非流行的这句话。约翰·斯图亚特·密尔 1867 年在圣安德鲁斯大学的演讲里写过「坏人要达到目的，只需好人袖手旁观」，措辞更接近。\n\n与流行说法最像的最早记录，是 1916 年 10 月 Charles F. Aked 牧师谈禁酒时说的：「据说，恶人要达到目的，只需好人什么都不做。」1920 年，Sir R. Murray Hyslop 最早把这个现代说法归给伯克；1961 年肯尼迪在加拿大议会演讲时也说是伯克所说。\n\nQuote Investigator 的结论很克制：记录不完整，不能强断是谁造的句，Aked 也许是在伯克或密尔的基础上改写的。",
    "origin": "类似的思想在伯克和密尔笔下都有，一句更精炼的版本在 20 世纪初成形，因为伯克名气大，又是保守主义思想的象征，署名就落在他身上；1961 年肯尼迪引用后更广为人知。",
    "instead": "可以写「常被归于伯克，实为后人的概括；最早近似句见于 1916 年 Aked 的演讲」。想引伯克本人，用他 1770 年那句。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2010 —— The Only Thing Necessary for the Triumph of Evil is that Good Men Do Nothing",
        "url": "https://quoteinvestigator.com/2010/12/04/good-men-do/"
      }
    ],
    "related": [
      "world-churchill-liberal-at-twenty",
      "world-voltaire-defend-to-death"
    ]
  },
  {
    "id": "world-well-behaved-women",
    "category": "quote",
    "belief": "「循规蹈矩的女人很少创造历史。」——玛丽莲·梦露",
    "truth": "这是历史学家劳雷尔·撒切尔·乌尔里克 1976 年在一篇学术论文里写的话，和梦露无关。",
    "detail": "Quote Investigator 找到的最早出处，是 Laurel Thatcher Ulrich 1976 年发表在《American Quarterly》第 28 卷第 1 期（1976 年春）的论文「Vertuous Women Found: New England Ministerial Literature, 1668-1735」，原句是「Well-behaved women seldom make history」（「seldom」，不是后来流传的「rarely」或「never」）。论文讲的是殖民地时期新英格兰牧师悼文中的「贤淑女性」，这句话原本是一个学术判断：被悼文称赞的好女人通常不会留下历史记录。\n\n后来这句话被改写成「rarely」，并被贴上了梦露、埃莉诺·罗斯福、格洛丽亚·斯泰纳姆等许多名字。Quote Investigator 找到的把它归给梦露的最早记录，是 2002 年 Hazel Dixon-Cooper 的书《Born on a Rotten Day》。\n\n乌尔里克后来成为普利策奖得主、哈佛教授。她曾说，话一写出来就不再完全属于作者，别人有权按自己的方式去理解。",
    "origin": "一句学术论文里的短句，脱离上下文后成了励志标语，在 T 恤、海报上流行；因为谁说的不重要，它就被配上了最有名的女性的名字。",
    "instead": "引用时写「Laurel Thatcher Ulrich，1976」。也别忘了原句的语境：它讲的是历史记录会遗漏谁，而不是在鼓励人破坏规矩。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator, 2012 —— Well-Behaved Women Seldom Make History",
        "url": "https://quoteinvestigator.com/2012/11/03/well-behaved-women/"
      }
    ],
    "related": [
      "world-aristotle-we-are-what-we-repeatedly-do"
    ]
  },
  {
    "id": "world-aristotle-we-are-what-we-repeatedly-do",
    "category": "quote",
    "belief": "「我们是由自己反复做的事塑造的，因此卓越不是一种行为，而是一种习惯。」——亚里士多德",
    "truth": "这是威尔·杜兰特 1926 年在《哲学的故事》里对亚里士多德思想的概括，不是亚里士多德的原话。",
    "detail": "杜兰特在《The Story of Philosophy》（1926）讲亚里士多德的伦理学时写道：卓越是通过训练和习惯养成的，我们不是因为有德行才做正确的事，而是因为做了正确的事才有德行；「we are what we repeatedly do」，所以「卓越不是一种行为，而是一种习惯」。这是杜兰特对亚里士多德德性观的概括，措辞出自杜兰特，不是亚里士多德的原话。\n\n亚里士多德本人在《尼各马可伦理学》第二卷确实主张：德性（卓越）来自习惯和习俗。所以这句话在精神上是亚里士多德式的，只是措辞不是他的。",
    "origin": "杜兰特是畅销的哲学普及作家，他的概括比译文更好记；传播中「杜兰特总结亚里士多德」逐渐被简化成「亚里士多德说」。",
    "instead": "可以写「威尔·杜兰特对亚里士多德伦理学的概括（《哲学的故事》，1926）」。想引亚里士多德，直接引《尼各马可伦理学》第二卷关于德性来自习惯的段落。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Wikipedia —— The Story of Philosophy（该句的出处说明）",
        "url": "https://en.wikipedia.org/wiki/The_Story_of_Philosophy"
      },
      {
        "label": "Wikiquote —— Will Durant（《The Story of Philosophy》相关段落）",
        "url": "https://en.wikiquote.org/wiki/Will_Durant"
      }
    ],
    "related": [
      "world-well-behaved-women",
      "world-socrates-know-nothing"
    ]
  },
  {
    "id": "world-napoleon-china-sleeping",
    "category": "quote",
    "belief": "「中国是一头沉睡的狮子，让她睡吧；她一旦醒来，世界都会为之震动。」——拿破仑",
    "truth": "拿破仑专家找不到他说过这话的证据；能查到的最早英文版本是 1888 年的一份报纸，没有提拿破仑。",
    "detail": "据维基百科整理，拿破仑基金会（Fondation Napoléon）的 Peter Hicks 表示，拿破仑从未说过「让中国沉睡吧，她醒来时世界会颤抖」；他在拿破仑的讲话和著作里没有找到「沉睡的龙」之类的说法。澳大利亚国立大学的历史学家 John Fitzgerald 则说，拿破仑「很可能」从未说过后来传说里归给他的那些话。\n\n已知最早的英文「China is a sleeping giant」出现在 1888 年的《New York Journal of Commerce》，没有提到拿破仑；「沉睡的狮子」版本最早见于 1890 年的《悉尼先驱晨报》，通过昆士兰政客一场演讲间接提到拿破仑。\n\n这条属于「查无出处」：不能证明他一辈子没这样想过，但在拿破仑的记录里找不到，而且最早的说法比他晚了几十年。",
    "origin": "19 世纪末西方人热衷讨论「沉睡的中国」，把一句漂亮话安在拿破仑头上，既有权威感，又带着对「一个世纪前的预言」的戏剧性。后来经 20 世纪的报刊和演讲反复引用。",
    "instead": "可写作「相传拿破仑所说，但专家未在其著作中找到；最早的相近英文句见于 1888 年的纽约报纸」。如果想谈中国的崛起，直接引用具体的史实和数据。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— China is a sleeping giant（Hicks、Fitzgerald 的判断及 1888/1890 年最早记录）",
        "url": "https://en.wikipedia.org/wiki/China_is_a_sleeping_giant"
      }
    ],
    "related": [
      "origin-napoleon-short"
    ]
  },
  {
    "id": "world-gandhi-be-the-change",
    "category": "quote",
    "belief": "「成为你希望在世界上看到的改变。」——甘地",
    "truth": "甘地的文字里查不到这句话；最早的近似句出现在 1974 年美国教育家 Arleen Lorrance 的书里。",
    "detail": "Quote Investigator 找到的最早近似句，是教育家 Arleen Lorrance 1974 年在「The Love Project」一章里发表的；1975 年牧师 Ernest Troutner、1976 年 Diane Kennedy Pike 都引用过这一原则。第一次把它归给甘地的记录出现在 1987 年。2006 年，甘地研究机构表示在甘地的著作里没有找到可靠的文献证据。\n\n甘地写过意思相近的话。1913 年他写道：「如果我们能改变自己，世界的趋势也会改变；一个人改变自己的本性，世界对他的态度也会随之改变。」这是同一个想法的另一种表述，但并不是流行的那句简短有力的口号。\n\n所以这条是「查无出处」加「相关思想确有来源」：思想上有甘地的影子，措辞则属于 Lorrance。",
    "origin": "1970 年代的美国社会运动文化把这类口号印上贴纸和海报；甘地是「非暴力自我改变」的象征，署名自然会向他靠拢，1987 年之后才逐渐固定。",
    "instead": "可以引甘地 1913 年的原话，或者写「Arleen Lorrance，1974」。如果只是想用这句话，写成「常被归于甘地，实为 1970 年代教育家 Lorrance 的原则」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2017 —— Be the Change You Wish to See in the World",
        "url": "https://quoteinvestigator.com/2017/10/23/be-change/"
      }
    ],
    "related": [
      "world-gandhi-first-they-ignore-you"
    ]
  },
  {
    "id": "world-gandhi-first-they-ignore-you",
    "category": "quote",
    "belief": "「起初他们无视你，然后嘲笑你，然后攻击你，然后你赢了。」——甘地",
    "truth": "甘地的著作里找不到；能查到的最早近似句，出自 1918 年一位工会代表 Nicholas Klein 的演讲。",
    "detail": "Quote Investigator 查到，这句话在 1982 年才被归给甘地，那时甘地已去世三十多年；多位研究者在他的著作里也没找到。最早的实质性近似句，出自 1918 年 Nicholas Klein 在美国联合服装工人联盟大会上的发言：「起初他们无视你，然后嘲笑你，然后攻击你，想把你烧死，然后他们给你建纪念碑。」\n\n这类「新观点必经几个阶段」的说法历史很长：叔本华在 1819 年描述过真理先被当作悖论、最后被视为理所当然的过程；1917 年 Earl B. Morgan 谈过嘲笑、争论、接受三个阶段。甘地 1921 年的文字里提到的是嘲笑、镇压、尊重，措辞与流行版本有明显差别。\n\n也就是说，思想可以追溯很久，但「甘地」这个署名是 1982 年才贴上去的。",
    "origin": "这类句子一直在社会运动和工会圈子里流传，每一代人改一点；非暴力运动的象征是甘地，署名就被「吸」了过去。",
    "instead": "可以写「Nicholas Klein，1918」，或者「常被归于甘地，查无出处」。想引甘地，可用他 1921 年关于嘲笑、镇压、尊重的论述，但要核对原文。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2017 —— First They Ignore You, Then They Laugh at You, Then They Attack You, Then You Win",
        "url": "https://quoteinvestigator.com/2017/08/13/stages/"
      }
    ],
    "related": [
      "world-gandhi-be-the-change"
    ]
  },
  {
    "id": "world-god-helps-those-who-help-themselves",
    "category": "quote",
    "belief": "「天助自助者。」——《圣经》",
    "truth": "这句话不在《圣经》里。现代英文措辞最早见于西德尼，富兰克林 1736 年的《穷理查年鉴》让它广为人知。",
    "detail": "据维基百科整理：这句话并不见于圣经，但英美民调显示相当多的人以为它出自圣经（文中给出的比例在 53% 到 82% 之间）。类似的意思在古希腊就有：索福克勒斯和欧里庇得斯的剧作、伊索寓言（如「赫拉克勒斯与车夫」）都有相近的想法。1651 年，乔治·赫伯特在谚语集里收录了「Help thyself, and God will help thee」。\n\n现代的确切措辞「God helps those who help themselves」最早与英国政治思想家 Algernon Sidney 的《Discourses Concerning Government》联系在一起；1736 年本杰明·富兰克林在《穷理查年鉴》里用了它，因此很多人把它当作富兰克林的话。\n\n需要如实说明：一些基督徒认为这句话与圣经强调的恩典不合，因为圣经更常说神帮助那些无力自助的人。另外，不同宗教传统里有自己的相近教导，这里只谈出处，不评价任何信仰。",
    "origin": "这句话作为谚语已流传了两千多年，经 17—18 世纪的英语作家和富兰克林的年鉴定型，因为听起来像格言，被误认为经文。",
    "instead": "可以说「英语谚语，常被误以为出自圣经；现代措辞见于 Algernon Sidney，富兰克林 1736 年的年鉴使之流行」。引圣经时请直接核对经文。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— God helps those who help themselves",
        "url": "https://en.wikipedia.org/wiki/God_helps_those_who_help_themselves"
      }
    ]
  },
  {
    "id": "world-churchill-liberal-at-twenty",
    "category": "quote",
    "belief": "「二十岁时不是自由派的人没有心；四十岁时还不是保守派的人没有脑。」——丘吉尔",
    "truth": "没有记录表明丘吉尔说过；能查到的最早强匹配是 1872 年法国学者 Anselme Batbie 的一封公开信。",
    "detail": "Quote Investigator 找到的最早强匹配，是 1872 年 Anselme Batbie 在公开信中的用法，他把这句话归给「伯克」（可能指埃德蒙·伯克），但 QI 在伯克的著作里没有找到。更早的相关说法：1799 年归于约翰·亚当斯的「十五岁不是民主派的男孩一无是处」（还没有心和脑的对比），以及 1861 年归于基佐（Guizot）的关于共和派的说法。\n\n「心与脑」的格式在 1870 年代就已成形，随后在法英两种语言里出现了各种年龄和各种党派的版本（共和派、社会主义者、自由派）。丘吉尔的署名到 1986 年前后才出现，此外迪斯雷利（1977 年起）、雨果（1916 年）、萧伯纳等人也都被当作作者。",
    "origin": "这句话原本是欧洲政治圈的老俏皮话，在法语和英语间不断换主语、换年龄；因为讲政治成长的段子最适合挂在雄辩的政治家名下，丘吉尔成了最方便的作者。",
    "instead": "可以说「流行俏皮话，最早强匹配见于 1872 年法国（Batbie 把它归给「伯克」）；丘吉尔署名约 1986 年才出现」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2014 —— If You Are Not a Liberal at 25, You Have No Heart. If You Are Not a Conservative at 35 You Have No Brain",
        "url": "https://quoteinvestigator.com/2014/02/24/heart-head/"
      }
    ],
    "related": [
      "world-burke-evil-triumph"
    ]
  },
  {
    "id": "world-goebbels-repeat-lie",
    "category": "quote",
    "belief": "「谎言重复一千遍就会变成真理。」——戈培尔",
    "truth": "没有找到这句话的原始出处；与此相关的真实文献，是希特勒《我的奋斗》（1925）里的「大谎言」和戈培尔 1941 年指责英国的一篇文章。",
    "detail": "据维基百科引用 Randall Bytwerk 的研究，流行的戈培尔版本被无数书籍和网页引用，却没有一处给出原始出处，对戈培尔来说也「不太可能」会这样说。\n\n真实的文献有两份。一是《我的奋斗》（1925）第十章，希特勒提出「大谎言」（große Lüge）的说法，意思是人们更容易相信弥天大谎，因为他们想不到别人会厚颜无耻到这样歪曲事实；而他是在指责别人这样做。二是戈培尔 1941 年 1 月 12 日发表在《Die Zeit ohne Beispiel》的文章「Aus Churchills Lügenfabrik」（出自丘吉尔的谎言工厂），他在文中说英国人奉行的原则是「撒谎就要撒大谎，并且坚持到底」，也是在指责对方。1943 年前后美国战略情报局的报告（后以《The Mind of Adolf Hitler》出版）也把「人们宁可相信大谎言」的原则归给希特勒。\n\n所以准确地说，是「查无出处」：不是证明他没有说过类似的话，而是找不到他说这句话的文献。",
    "origin": "战后，人们需要一句话来概括纳粹宣传的手法，一句简洁的「戈培尔名言」比分散的文献更好用，于是被反复引用，并成了广告和评论文章中的标准例证。",
    "instead": "要谈宣传手法，可以引《我的奋斗》里「大谎言」那一段，或戈培尔 1941 年那篇文章，并说明两者都是在指责对手。若引流行版本，请标注「常被归于戈培尔，无原始出处」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Wikipedia —— Big lie（Bytwerk 的研究、1941 年戈培尔文章、《我的奋斗》第十章、OSS 报告）",
        "url": "https://en.wikipedia.org/wiki/Big_lie"
      }
    ],
    "related": [
      "world-marie-antoinette-brioche"
    ]
  },
  {
    "id": "world-einstein-fish-climb-tree",
    "category": "quote",
    "belief": "「人人都是天才。但如果你用爬树的能力来评判一条鱼，它会终生以为自己很蠢。」——爱因斯坦",
    "truth": "这句话不在爱因斯坦的著作里；能查到的最早署名爱因斯坦的出处是 2004 年的一本励志书，而它的思想源头是 1898 年的一篇教育寓言。",
    "detail": "Quote Investigator 说，这句话没有收入普林斯顿版《The Ultimate Quotable Einstein》，最早的近似记录是 Matthew Kelly 2004 年的励志书《The Rhythm of Life》，其中一章题为「Everybody is a Genius」，把这句话归给了爱因斯坦。\n\n这一思想的老源头，是 1898 年发表在《Journal of Education》上的寓言「An Educational Allegory」，署名「Aesop, Jr.」，作者后来被确认是塔夫茨学院的物理学家 Amos E. Dolbear。寓言里的动物上学，每只动物都要被拿去和自己并不擅长的技能比较，意思是：不要用一个物种没有的技能去评判它。这篇文章在 20 世纪初被教育界反复转载。\n\nQuote Investigator 认为，「人人都是天才」一类说法（1970 年代起以各种形式出现）与 Dolbear 的寓言后来合并成了现在这句话；2004 年之后，社交媒体放大了爱因斯坦的署名。",
    "origin": "一则老教育寓言和一类励志套话拼接在一起，被一本畅销励志书挂上了爱因斯坦的名字，再靠社交媒体图片广泛传播。",
    "instead": "想引这个意思，可以写「出自 1898 年的教育寓言（Amos E. Dolbear 笔名 Aesop, Jr.）」，或者「常被误署为爱因斯坦」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator, 2013 —— Everybody is a Genius. But If You Judge a Fish by Its Ability to Climb a Tree, It Will Live Its Whole Life Believing that It is Stupid",
        "url": "https://quoteinvestigator.com/2013/04/06/fish-climb/"
      }
    ],
    "related": [
      "world-einstein-bees",
      "world-einstein-simple-as-possible"
    ]
  },
  {
    "id": "world-einstein-simple-as-possible",
    "category": "quote",
    "belief": "「一切都应该尽可能简单，但不能过于简单。」——爱因斯坦",
    "truth": "思想确是爱因斯坦的，但这句话的现成措辞查不到他的原文；最早的记录是 1950 年作曲家罗杰·塞欣斯的转述。",
    "detail": "Quote Investigator 查到，1950 年 1 月 8 日《纽约时报》上，作曲家 Roger Sessions 在一篇谈「难懂」作曲家的文章里，写到爱因斯坦「大意是」说一切应该尽可能简单，但不能更简单。「in effect」（大意）这个措辞提示这可能是转述而不是原话。1950 年 6 月，诗人 Louis Zukofsky 在《Poetry》杂志上把它加了引号并署名爱因斯坦，对后来的引用影响很大。1977 年 7 月的《读者文摘》也刊登过这句话，且没有出处。\n\n爱因斯坦 1933 年 6 月 10 日在牛津作《论理论物理学的方法》演讲，说过一句相关的话：理论的最高目标，是在不放弃对任何一个经验数据的充分描述的前提下，让不可约的基本要素尽可能简单、尽可能少。这是 Alice Calaprice 引用的前身。\n\nQuote Investigator 的结论是：爱因斯坦可能自己说过类似的话，但没有直接证据；塞欣斯也可能是自己概括了爱因斯坦的思想。这条属于「有分歧」。",
    "origin": "爱因斯坦在牛津的原话冗长学术，塞欣斯 1950 年的简洁转述更好记；经杂志和《读者文摘》转载，被越来越多人当成原话。",
    "instead": "写「爱因斯坦思想的概括，最早见于罗杰·塞欣斯 1950 年的转述；原话可见 1933 年牛津演讲」。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Quote Investigator, 2011 —— Everything Should Be Made as Simple as Possible, But Not Simpler",
        "url": "https://quoteinvestigator.com/2011/05/13/einstein-simple/"
      }
    ],
    "related": [
      "world-einstein-insanity-definition",
      "world-einstein-fish-climb-tree"
    ]
  },
  {
    "id": "luxun-no-road",
    "category": "quote",
    "belief": "「世上本没有路，走的人多了，也便成了路。」——鲁迅",
    "truth": "鲁迅写的是「其实地上本没有路，走的人多了，也便成了路」，而且这句话在原文里是用来比喻「希望」的。",
    "detail": "这句话在小说《故乡》的最后一段（篇末署一九二一年一月）。原文是：「我想：希望本是无所谓有，无所谓无的。这正如地上的路；其实地上本没有路，走的人多了，也便成了路。」\n\n所以有两处和流传版不同：一是「地上」常被顺口说成「世上」「世界上」，二是前面那半句被整个丢掉了。鲁迅在这里不是在讲「走路」，而是在讲「希望」：说不上有，也说不上无，是走的人多了才有的。这个比喻放回原来的位置，意思比「人多了就有路」更谨慎一点。\n\n这里的改动是无害的口误式改写，不是伪造：意思基本保留。值得提醒的只是，用引号写出来的话应当是原话。",
    "origin": "《故乡》最初发表于一九二一年五月的《新青年》，后收入《呐喊》，是长期的语文课文。口耳相传里，「地上」被换成更顺口的「世上」，引文就这样慢慢变形。本站没有查到「世上」这一说法最早出现在何时何处。",
    "instead": "需要加引号时照原文引：「其实地上本没有路，走的人多了，也便成了路」。要保留语境，就连前一句「希望本是无所谓有，无所谓无的」一起引。如果只是转述意思，不加引号也可以。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "鲁迅，《故乡》（《呐喊》，篇末署1921年1月）—— 中文马克思主义文库收录的《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/03/002.htm"
      }
    ],
    "related": [
      "luxun-awakened"
    ]
  },
  {
    "id": "luxun-herd",
    "category": "quote",
    "belief": "「猛兽总是独行，牛羊才成群结队。」——鲁迅",
    "truth": "原文是「猛兽是单独的，牛羊则结队」，但后面紧跟的半句讲的恰恰是成群的力量：野牛结成大队，可以排角成城抵御强敌。",
    "detail": "这句话出自杂文《春末闲谈》（一九二五年四月二十四日发表于《莽原》周刊第一期，署名冥昭）。原文是：「猛兽是单独的，牛羊则结队；野牛的大队，就会排角成城以御强敌了，但拉开一匹，定只能牟牟地叫。」\n\n流传版只留下前半截，并改成「总是独行」「才成群结队」，读起来像是在说「合群的都是弱者、强者必孤独」的人生格言。可是原句的重心在后面：成群的牛能抵御强敌，拆散以后单独一头只能哞哞叫。上下文是一段讽刺——他接着写的是统治者如何想办法「禁止集合」「防说话」，也就是说，这几句是在解释为什么当权者害怕人聚在一起。\n\n因此把它当成「独行者更强」的出处，几乎是把原意反过来用。",
    "origin": "杂文原文里这几句本来夹在一大段反讽的议论中间，脱离上下文后，前半句因为对仗而好记，被单独摘出，又被换成更像格言的措辞，在社交平台上以「鲁迅说」的名义流传。具体最早是谁摘出的，本站没有查到。",
    "instead": "想引原话，就把整句引完：「猛兽是单独的，牛羊则结队；野牛的大队，就会排角成城以御强敌了，但拉开一匹，定只能牟牟地叫。」想表达「强者孤独」这个意思，最好别署鲁迅的名字。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "鲁迅，《春末闲谈》（《坟》，1925年4月24日《莽原》周刊第1期，署名冥昭）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/01/013.htm"
      }
    ],
    "related": [
      "luxun-village-dogs"
    ]
  },
  {
    "id": "luxun-time-life",
    "category": "quote",
    "belief": "「生命是以时间为单位的，浪费别人的时间等于谋财害命，浪费自己的时间等于慢性自杀。」——鲁迅",
    "truth": "鲁迅确实写过「时间就是性命。无端的空耗别人的时间，其实是无异于谋财害命的」，但「生命是以时间为单位」和「慢性自杀」这两截在他的文集里找不到。",
    "detail": "真句子出自《门外文谈》（一九三四年八月至九月在《申报·自由谈》连载，署名华圉）。上下文是在谈拉丁化字母书写快：「美国人说，时间就是金钱；但我想：时间就是性命。无端的空耗别人的时间，其实是无异于谋财害命的。」\n\n流传的长版本是把这两句扩写、拼接，再添上「浪费自己的时间等于慢性自杀」。本站把中文马克思主义文库上的《鲁迅全集》电子文本（含杂文集、小说集等30个部分）全文检索，没有找到「生命是以时间为单位」「慢性自杀」「浪费自己的时间」。需要说明的是，这个文本库不含日记和书信，所以只能说：在他公开发表的文集里没有，而不能说他任何场合都没说过。\n\n还有一点值得注意：原文那句是在说「别人的时间」，而且紧接着自嘲一句「像我们这样坐着乘风凉，谈闲天的人们，可又是例外」，语气比网上版轻松得多。",
    "origin": "前两句是真的，所以整段读起来「很像鲁迅」。后面扩写的部分可能是转发时有人顺手加的，没有查到最早出处。",
    "instead": "引原话时只引真的那两句：「时间就是性命。无端的空耗别人的时间，其实是无异于谋财害命的。」并注明《门外文谈》。「慢性自杀」那句不要署名鲁迅。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "鲁迅，《门外文谈》（《且介亭杂文》，1934年8月24日—9月10日《申报·自由谈》，署名华圉）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/18/008.htm"
      },
      {
        "label": "虎嗅，整理文章（列举被篡改、杜撰的「鲁迅名言」及其真实出处）",
        "url": "https://www.huxiu.com/article/4373413.html"
      }
    ],
    "related": [
      "luxun-sponge-time",
      "luxun-coffee-genius"
    ]
  },
  {
    "id": "luxun-awakened",
    "category": "quote",
    "belief": "「人生最大的痛苦，是梦醒了无路可走。」——鲁迅",
    "truth": "原句是「人生最苦痛的是梦醒了无路可以走」，出自一场关于娜拉出走以后的演讲，而且他紧接着的结论并不是绝望。",
    "detail": "这句话出自鲁迅一九二三年十二月二十六日在北京女子高等师范学校的演讲《娜拉走后怎样》。原文：「人生最苦痛的是梦醒了无路可以走。」措辞和流传版略有差别（「最大的痛苦」「无路可走」），意思没有变。\n\n变形的是语境。演讲的问题很具体：易卜生笔下的娜拉离家出走以后会怎样？鲁迅的回答是，没有经济权的话，她只有两条路，「不是堕落，就是回来」。他接着说，假使寻不出路，「我们所要的倒是梦」，又说要有钱：「梦是好的；否则，钱是要紧的。」\n\n所以它是一句关于女性经济独立的冷静判断里的一句，而不是一句泛泛的人生哲理。把它单拿出来当成「人生最大的痛苦」的定义，是把一个具体论证当成了格言。",
    "origin": "原文因为对仗短促而容易记，在教材和励志文章里被反复摘用，措辞逐渐变得更口语。这类改写很常见，并不是造假，只是离原文远了一点。",
    "instead": "引用时用原话「人生最苦痛的是梦醒了无路可以走」，并说明这是在谈娜拉出走。想谈经济独立这个主题，更贴切的是同一演讲里的「梦是好的；否则，钱是要紧的」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "鲁迅，《娜拉走后怎样》（1923年12月26日北京女子高等师范学校演讲，收入《坟》）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/01/018.htm"
      }
    ],
    "related": [
      "luxun-no-road",
      "luxun-medicine"
    ]
  },
  {
    "id": "zh-shameless-sanguo",
    "category": "quote",
    "belief": "「我从未见过有如此厚颜无耻之人！」——《三国演义》里诸葛亮骂王朗",
    "truth": "罗贯中的小说里没有这句话。它是1994年央视电视剧《三国演义》为「骂死王朗」加的台词。",
    "detail": "小说第九十三回《武乡侯骂死王朗》里，诸葛亮这一段的结尾是：「老贼速退！可教反臣与吾共决胜负！」王朗听完，「气满胸膛，大叫一声，撞死于马下」。整回原文里没有「厚颜无耻」这几个字。\n\n这句台词出现在1994年版电视剧（中国电视剧制作中心、中央电视台出品，唐国强饰演诸葛亮）第69集。维基百科对该剧的条目把它称作「原创台词」：编剧在小说的基础上把两军阵前的对骂扩成了更长的一段，结尾加上了这一句。二十多年后它被做成大量B站「鬼畜」视频，才成了网络名句。\n\n顺带一提，「骂死王朗」这件事本身也是小说虚构：史载王朗卒于公元228年，并没有在阵前与诸葛亮对话。",
    "origin": "电视剧播出后，这一段表演流传很广；到了视频网站时代被反复剪辑、变调，台词随之脱离出处。很多人因为听着像古人的口吻，以为是原著里的话。",
    "instead": "说「电视剧《三国演义》（1994年版）里诸葛亮的台词」最稳妥；引原著则用「老贼速退！可教反臣与吾共决胜负！」。别写成「《三国演义》原文」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "罗贯中，《三国演义》第九十三回（原文）—— 维基文库",
        "url": "https://zh.wikisource.org/wiki/三國演義/第093回"
      },
      {
        "label": "三国演义（1994年电视剧）—— 维基百科条目（首播信息、第69集及该台词）",
        "url": "https://zh.wikipedia.org/wiki/三国演义_(电视剧)"
      },
      {
        "label": "骂死王朗 —— 维基百科条目（小说回目、史实与电视剧第69集）",
        "url": "https://zh.wikipedia.org/zh-hans/%E9%AA%82%E6%AD%BB%E7%8E%8B%E6%9C%97"
      }
    ],
    "related": [
      "luxun-village-dogs"
    ]
  },
  {
    "id": "zh-repay-virtue",
    "category": "quote",
    "belief": "「以德报怨」是孔子的教诲",
    "truth": "《论语》里有人问孔子「以德报怨，何如？」，孔子没有赞成；「报怨以德」是《老子》第六十三章的话。",
    "detail": "《论语·宪问》里，「或曰」（有人）问：「以德报怨，何如？」孔子反问并回答：「何以报德？以直报怨，以德报德。」意思是：你用恩德去回报怨恨，那拿什么去回报恩德呢？所以对怨恨用「直」（公正、坦率），对恩德才用恩德。他是在婉拒这个提法。\n\n「报怨以德」则在《老子》第六十三章：「大小多少，报怨以德。」所以这个主张更接近道家。\n\n有一点要如实说明：这一章里「以直报怨」的「直」，有现代学者据战国楚简的用字现象，主张应读作「德」（维基文库在该章附了这条学者意见）。这是少数意见；通行的、古今注家主要采用的读法仍是「以直报怨」。",
    "origin": "「以德报怨」四个字太好记，又很像儒家宣扬宽厚的口吻，于是被当作孔子的话传开。其实这四个字在《论语》里是别人提的问题。",
    "instead": "想引孔子，就说「孔子主张『以直报怨，以德报德』」。想说「以德报怨」的出处，可以说它是《老子》「报怨以德」的意思，在《论语》中则是孔子并未采纳的一个说法。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《论语·宪问》（十四之三六）—— 维基文库（含「一作直」及学者意见的按语）",
        "url": "https://zh.wikisource.org/wiki/論語/憲問第十四"
      },
      {
        "label": "《道德经》第六十三章「大小多少，报怨以德」—— 维基文库（王弼本）",
        "url": "https://zh.wikisource.org/wiki/道德經_(王弼本)"
      },
      {
        "label": "澎湃新闻，《老祖宗：快别说了，这些所谓的古代名言都是错的！》（含「以德报怨」一条）",
        "url": "https://m.thepaper.cn/newsDetail_forward_29191107"
      }
    ],
    "related": [
      "zh-read-ten-thousand-books"
    ]
  },
  {
    "id": "zh-fortress-besieged",
    "category": "quote",
    "belief": "「围在城里的人想逃出来，城外的人想冲进去」是钱钟书的独创妙喻",
    "truth": "这个比喻在《围城》里就被点明是舶来品：书中人物说「法国也有这末一句话」，前面还有一句英国古话作铺垫。",
    "detail": "《围城》里，褚慎明先说：「他引一句英国古话，说结婚仿佛金漆的鸟笼，笼子外面的鸟想住进去，笼内的鸟想飞出来。」苏小姐接着说：「法国也有这末一句话。不过，不说是鸟笼，说是被围困的城堡，城外的人想冲进去，城里的人想逃出来。」书名「围城」就从这句话来。\n\n也就是说，钱钟书本人并没有把它当成自己的发明，而是借人物之口交代了来源。《新文学史料》上一篇题为《谁把「围城」带来中国？》的文章（中国作家网转载，作者郭帅）进一步追溯，认为鸟笼的说法可以上溯到英国剧作家约翰·韦伯斯特的作品。本站没有独立核对这一追溯，只能转述。\n\n钱钟书的功劳是把它写成了一本小说，并让它成了中文里的常用比喻——这和「他发明了这个比喻」是两回事。",
    "origin": "小说流行以后，「围城」成了婚姻、职业的代名词；读者记住了比喻，却容易忘了书里交代过出处，于是这句话常被当作钱钟书的原创名言。",
    "instead": "可以说「钱钟书在《围城》里借苏文纨之口引用的法国说法」。夸他的话，应当夸他把它写进小说、用得好，而不是夸他发明了它。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "郭帅，《谁把「围城」带来中国？》，《新文学史料》；中国作家网 2023-05-30 转载（引述《围城》褚慎明、苏小姐对话）",
        "url": "https://www.chinawriter.com.cn/n1/2023/0530/c404063-40001759.html"
      }
    ],
    "related": [
      "zh-zhuangzi-moisten-foam"
    ]
  },
  {
    "id": "zh-read-ten-thousand-books",
    "category": "quote",
    "belief": "「读万卷书，行万里路」是孔子（或先秦古训）说的",
    "truth": "目前可查到的明确文献出处是明代董其昌谈画论的文字，并不是孔子；不过也有人主张更早，这一点本站没能核实。",
    "detail": "董其昌《画禅室随笔》里谈画家的「气韵」：「气韵不可学，此生而知之，自有天授。然亦有学得处，读万卷书，行万里路，胸中脱去尘浊，自然丘壑内营。」京报网等媒体即据此把这句话的出处指向董其昌。原意是画家怎样培养胸中格局，后来才被推广成泛指「多读书、多游历」的成语。\n\n《论语》和先秦典籍里没有这句话。需要老实交代的是：有人说它还有更早的来源（搜索结果里出现过宋代刘彝、清代《两般秋雨庵随笔》提到的《眼镜铭》等说法），本站没能打开可靠的原始文献核对，所以这里只能说「董其昌是目前最常被引用、也最容易核实的出处」，不排除更早的用例。\n\n此外各处对董其昌这部书的称呼并不统一（《画禅室随笔》《画旨》《画诀》），引用时以所见版本为准。",
    "origin": "这句话对仗工整、意思正面，又很符合「古人智慧」的口吻，于是常被笼统地说成「古人云」甚至孔子云。从画论变成通用格言，大约是在明清以后。具体什么时候开始被安到孔子名下，本站没有查到。",
    "instead": "如果要标出处，稳妥的说法是「明代董其昌在《画禅室随笔》中说过」；不确定时写「古语」。别写成「孔子说」。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "京报网，《清风丨读万卷书 行万里路》（引董其昌《画禅室随笔》原文） 2023-09-16",
        "url": "https://news.bjd.com.cn/2023/09/16/10565086.shtml"
      },
      {
        "label": "古文岛（原古诗文网）,「读万卷书，行万里路」出处页（称最早出自董其昌）",
        "url": "https://m.gushiwen.cn/mingju/juv_7360eb6518d5.aspx"
      }
    ],
    "related": [
      "zh-repay-virtue"
    ]
  },
  {
    "id": "zh-tagore-farthest-distance",
    "category": "quote",
    "belief": "「世界上最遥远的距离，不是生与死的距离……」——泰戈尔《飞鸟集》",
    "truth": "泰戈尔的诗集里查不到这首诗；作者通常被追到张小娴，但归属说法并不统一。",
    "detail": "这段「最遥远的距离」常被说成泰戈尔的情诗，可是翻遍泰戈尔作品也没有对应的句子。中国互联网联合辟谣平台（2018年12月转自今日头条的一篇文章）的说法是：它其实是作家张小娴早年所作，出自1997年的小说《荷包里的单人床》。\n\n另一篇讨论作者错位的文章（南方艺术网）则强调：这篇东西在网上有很多个扩写版本，不同来源说法不一，作者归属至今并无公认定论。也就是说，「不是泰戈尔」比较有把握，「就是张小娴」则只能说「有这种说法」。\n\n本站没能找到1997年原书原文来核对，所以这里不把「张小娴」写成确证。",
    "origin": "泰戈尔的译本诗句（如《飞鸟集》）在中文世界地位很高，而这段文字意象和节奏与其译诗相近，便在网络转发中被安到他名下。网络上还陆续出现了加上「飞鸟与鱼」等内容的多个扩写版。",
    "instead": "想引用这段话，标「网络流传的诗，作者有争议（常被追溯到张小娴）」。不要写「泰戈尔《飞鸟集》」；《飞鸟集》里真正的句子，请对照具体译本引用。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "中国互联网联合辟谣平台，《世界上最遥远的距离不是生与死，而是假语录在我面前，我却当了真》（转自今日头条，2018-12-19）",
        "url": "https://www.piyao.org.cn/2019-02/02/c_1210054152.htm"
      },
      {
        "label": "南方艺术网，《作品作者错位 《世界上最遥远的距离》谁写的？》",
        "url": "https://www.zgnfys.com/m/a/nfrw-5892.shtml"
      }
    ],
    "related": [
      "zh-linhuiyin-safe-sunny",
      "zh-hushi-dirty-country"
    ]
  },
  {
    "id": "zh-linhuiyin-safe-sunny",
    "category": "quote",
    "belief": "「你若安好，便是晴天。」——林徽因",
    "truth": "人民文学出版社的「林徽因语录打假」把它列为林徽因没说过的话；最容易查到的出处是一本林徽因传记的书名。",
    "detail": "人民文学出版社在2025年6月发布的《林徽因语录打假！》一文里，列出11句「没说过的话」，「你若安好，便是晴天」排在第一位，归类为「伪鸡汤，杜撰」。\n\n能核实到的是：白落梅所著的林徽因传记，书名就叫《你若安好，便是晴天》（中国华侨出版社，豆瓣标注的版本为2013年2月）。这本书是传记性质的散文，豆瓣上也有读者批评它想象多于史实。书名用了这句话，但句子并不是林徽因的原文；至于这句话最早是谁写的，本站没有查到。\n\n林徽因留下的诗是真实存在的，例如《你是人间的四月天》，和这句话没有关系。",
    "origin": "一本以林徽因为主角的畅销传记，把这句话印成大字书名，读者很容易把「书名」当成「她的话」。之后在社交平台上被配上她的照片和「林徽因」署名反复转发。",
    "instead": "想引林徽因，选她真正写过的诗文（如《你是人间的四月天》）。要用这句话，标「网络流传」或「白落梅书名」，别署林徽因。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "人民文学出版社，《林徽因语录打假！「你若安好 便是晴天」位列榜首！》（澎湃号，2025-06-10）",
        "url": "https://m.thepaper.cn/newsDetail_forward_30959316"
      },
      {
        "label": "白落梅，《你若安好，便是晴天》—— 豆瓣读书（中国华侨出版社）",
        "url": "https://book.douban.com/subject/20506611/"
      }
    ],
    "related": [
      "zh-tagore-farthest-distance"
    ]
  },
  {
    "id": "zh-hushi-dirty-country",
    "category": "quote",
    "belief": "「一个肮脏的国家，如果人人讲规则而不是空谈道德，最终会变成一个有人味儿的正常国家。」——胡适",
    "truth": "作者羽戈查了标注的出处（《介绍我自己的思想》）和《胡适文集》，都没有找到这段话；迄今查不到可靠出处。",
    "detail": "这段话在微博和微信上长期署名胡适，伪造者还标了出处：《介绍我自己的思想》（1930年）。专栏作家羽戈在2016年10月的文章里说，他逐篇查了这篇文章，里面并没有关于「规则与道德」的论述；又翻了北大版十二卷《胡适文集》，也未发现类似言论。维基语录的胡适条目把这一句单独放进「误植」栏目。\n\n羽戈还从语言上提出一个佐证：文中的「人味儿」「没事儿」之类儿化音，与胡适的语言习惯不合。这属于推断，不能当作定论；真正站得住的是前面那一点——标注的出处里查无此语。\n\n这里只能证明「查无出处」，而不是「证明胡适一辈子没有说过类似意思的话」。",
    "origin": "这类「某名人说某句金句」的帖子常在转发中给名言配上一个像模像样的出处（书名、年份），让人以为可靠。这一段至少在2016年前就已在微博、微信流传。最早在何处出现，本站没有查到。",
    "instead": "如果想引胡适谈规则、谈秩序，请去读《胡适文集》里实际的文字，并写明篇名。这一句本身，最稳妥是标成「网传，查无出处」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "羽戈，《从一段伪造的胡适名言说起》，新浪新闻专栏，2016-10-18",
        "url": "https://news.sina.cn/zl/2016-10-18/zl-ifxwvpar8378190.d.html?from=wap"
      },
      {
        "label": "胡适 —— 维基语录（「误植」栏目）",
        "url": "https://zh.wikiquote.org/zh-cn/%E8%83%A1%E9%81%A9"
      }
    ],
    "related": [
      "zh-tagore-farthest-distance"
    ]
  },
  {
    "id": "zh-zhuangzi-moisten-foam",
    "category": "quote",
    "belief": "「相濡以沫」是庄子对患难相守、不离不弃的赞美",
    "truth": "庄子的原话是「相濡以沫，不如相忘于江湖」——他的重心在后半句。",
    "detail": "出自《庄子·大宗师》：「泉涸，鱼相与处于陆，相呴以湿，相濡以沫，不如相忘于江湖。」意思是泉水干了，鱼困在陆地上，互相吐气湿润对方、用唾沫湿润对方，可是这不如各自回到江湖里，彼此相忘。接下来一句是「与其誉尧而非桀也，不如两忘而化其道」，也是同一类对照：与其赞美一个、责备另一个，不如两边都忘掉。\n\n也就是说，庄子是拿它来对比：在困境里互相救助固然可贵，但更好的状态是不需要救助、各自自在。后世把前半句单独摘出来，当成「夫妻或朋友患难与共」的成语，是一次很成功的再创造，意思已经和原文不同。\n\n另一点：不同注家对庄子是否在「贬低」这种情谊有不同理解，有人读作对儒家「仁义」式温情的批评，有人读作对更自在的相处方式的向往。可以确定的只是原文的字面顺序。",
    "origin": "成语流传的过程中，「不如相忘于江湖」这半句渐渐被省去，「相濡以沫」独立成为褒义词，用在夫妻和朋友身上，而且常被当作庄子的赞美来引用。",
    "instead": "当作成语用没有问题，它在现代汉语里就是褒义。但说「庄子称赞」就不对了；要引出处，可以连后半句一起引：「相濡以沫，不如相忘于江湖」，再说明庄子的重点在后半句。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《庄子·大宗师》（原文）—— 维基文库",
        "url": "https://zh.wikisource.org/wiki/莊子/大宗師"
      },
      {
        "label": "澎湃新闻，《老祖宗：快别说了，这些所谓的古代名言都是错的！》（含「相濡以沫」一条）",
        "url": "https://m.thepaper.cn/newsDetail_forward_29191107"
      }
    ],
    "related": [
      "zh-fortress-besieged"
    ]
  },
  {
    "id": "luxun-coffee-genius",
    "category": "quote",
    "belief": "「哪里有天才，我是把别人喝咖啡的工夫都用在工作上的。」——鲁迅",
    "truth": "在鲁迅公开发表的文集里查不到这句话；能找到的最早形态，是一篇没有注明来源的小学课文式短文《鲁迅先生珍惜时间》。",
    "detail": "本站把中文马克思主义文库上的《鲁迅全集》电子文本（30个部分，含杂文集、小说集、序跋）全文检索，没有「哪里有天才」「喝咖啡的工夫」「喝咖啡的时间」这些字样。需要说明的是，这个文本库不含日记和书信，所以只能说「在他公开发表的文集里没有」，不能说「他任何场合都没说过」。\n\n这句话常见的出处是一篇题为《鲁迅先生珍惜时间》的短文（课文类阅读，作者未标注，网上可见2016年的转载版本），文中写「有人说鲁迅是天才，可他自己说」，然后直接引出这句，既没有交代时间场合，也没有注明依据。\n\n另有两点可以参照：一，鲁迅的日记里确实有喝咖啡的记录（如1913年5月28日「饮加非」、1930年2月16日「饮加非」等，据腾讯新闻整理）；二，他在1928年写过《革命咖啡店》，是对报上一则「咖啡店」广告的讽刺，里面说那家乐园「我没有去，也不想去」。这些都说明他与咖啡并非水火不容，但也都不是这句话的来源。",
    "origin": "这句话在教学短文和励志文章里长期流传，「咖啡」又带有现代感，很容易被当作他的名言。本站没有查到它的最早出处，也不知道是否来自某位亲友的回忆转述，只能说迄今查不到可靠出处。",
    "instead": "如果要谈鲁迅与勤奋，可以引他确实写过的文字，例如「时间就是性命。无端的空耗别人的时间，其实是无异于谋财害命的」（《门外文谈》）。「喝咖啡」这句，最稳妥的标注是「相传为鲁迅所说，未见于其公开著作」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "鲁迅，《革命咖啡店》（《三闲集》，1928年）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/12/007.htm"
      },
      {
        "label": "腾讯新闻，《鲁迅说的这句话，有可能是骗你的》（整理鲁迅日记中的喝咖啡记录）",
        "url": "https://news.qq.com/rain/a/20220727A02X2J00"
      }
    ],
    "related": [
      "luxun-sponge-time",
      "luxun-time-life",
      "luxun-one-confidant"
    ]
  },
  {
    "id": "luxun-medicine",
    "category": "quote",
    "belief": "「学医救不了中国人。」——鲁迅",
    "truth": "这不是鲁迅的原话；《呐喊·自序》里他讲的是自己为什么弃医从文，措辞和语气都更具体。",
    "detail": "北京鲁迅博物馆的「鲁迅说过的话」检索系统上线时，媒体做过测试，搜「学医救不了中国人」得到的结果是找不到（搜狐转载的报道）。这句话是后人对一段经历的概括。\n\n真正的出处是《呐喊·自序》（1922年12月3日记于北京）。他回忆在仙台学医时看到幻灯片里的围观场面，说：「我便觉得医学并非一件紧要事，凡是愚弱的国民，即使体格如何健全，如何茁壮，也只能做毫无意义的示众的材料和看客」，所以「第一要著，是在改变他们的精神」，而他当时以为善于改变精神的是文艺。\n\n两处差别在于：原文是「医学并非一件紧要事」，是他当时的想法，并不是在下一个对所有医生的判断；而且他提出的是「改变精神」的主张。他此后并未否定医学本身，把它读成「医生没用」是过度解读。",
    "origin": "把一段两千字的回忆压缩成一句口号，是传播里常见的做法。「学医救不了中国人」短、有力、有对象，比原文好记，于是被当作他的名言，课堂讲述和励志文章里反复出现。",
    "instead": "引用时用原文：「我便觉得医学并非一件紧要事」，并说明这是他对自己为何放弃学医的解释。若要概括，写成「鲁迅在《呐喊·自序》中说，他当时认为改变国民精神比医治身体更要紧」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "鲁迅，《呐喊·自序》（1922年12月3日）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/03/001.htm"
      },
      {
        "label": "搜狐，《「鲁迅说过的话」检索系统上线！》（测试结果含「学医救不了中国人」未找到）",
        "url": "https://www.sohu.com/a/312984295_563929"
      },
      {
        "label": "虎嗅，整理文章（列举被概括、杜撰的「鲁迅名言」及真实出处）",
        "url": "https://www.huxiu.com/article/4373413.html"
      }
    ],
    "related": [
      "luxun-child-ox",
      "luxun-awakened"
    ]
  },
  {
    "id": "luxun-village-dogs",
    "category": "quote",
    "belief": "「村里的狗叫了，其他的狗也跟着叫，但它们不知道为什么叫；当浑浊成为常态，清白就是一种罪。」——鲁迅",
    "truth": "在鲁迅的文集里查不到这段话；有文章指出它的前半句与一部韩剧的台词相似，但本站没能核对剧集，所以只能说查无出处。",
    "detail": "本站把中文马克思主义文库上的《鲁迅全集》电子文本（30个部分，1260页）全文检索，没有「村里的狗」这样的字样；含「狗叫」的三处都与此无关（一处是小说里孩子逗人学狗叫，一处是形容汽笛声，一处是讽刺刊物里骂主张废汉字者「外国狗叫」）。同样，这个文本库不含日记和书信，所以只能说「公开发表的文集里没有」。\n\n虎嗅整理的一篇文章把它归入「应为杜撰」，并说在韩剧《匹诺曹》里能找到类似的前半句。这一条是转述，本站没有去查剧集原文，请当作线索而不是定论。\n\n这段话的文风也是网络「鲁迅体」的典型：用动物比喻群体盲从，再配一句对仗的警句。鲁迅确实写过群体盲从，但不是这几句话。",
    "origin": "「署名鲁迅」往往能让一句话显得深刻。这段话借用了「群体盲从」这个常见主题，最早出现的时间、地点本站没有查到。",
    "instead": "如果你想引用，可以标成「网传句子，查无出处」。要谈群体心理，可以直接引鲁迅确实写过的话，例如《杂感》里的「勇者愤怒，抽刃向更强者；怯者愤怒，却抽刃向更弱者」（华盖集）。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "虎嗅，整理文章（列举被篡改、杜撰的「鲁迅名言」，含此句及韩剧《匹诺曹》线索）",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "鲁迅，《杂感》（《华盖集》）—— 中文马克思主义文库《鲁迅全集》电子文本（真实原文对照）",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/08/011.htm"
      }
    ],
    "related": [
      "luxun-herd",
      "luxun-mask",
      "zh-shameless-sanguo"
    ]
  },
  {
    "id": "luxun-mask",
    "category": "quote",
    "belief": "「面具戴太久，就会长到脸上，再想揭下来，除非伤筋动骨扒皮。」——鲁迅",
    "truth": "全集里查不到这句话；鲁迅确实反复写过「假面具」，但没有这个「长到脸上」的说法。",
    "detail": "本站在《鲁迅全集》电子文本（中文马克思主义文库，30个部分）里检索「面具戴」「长到脸上」，没有命中。含「假面具」的文章有：《忽然想到》《通讯》《我还不能「带住」》《「论语一年」》《论「第三种人」》《真假堂吉诃德》等，写的是对虚伪和装腔作势的批评，比如把某些人比作「戴着假面具的买办」（《真假堂吉诃德》）。这与「面具戴久了会长在脸上」的心理格言是两回事。\n\n虎嗅整理的文章把这句列为「伪作」，同时指出鲁迅在上述文章里谈过「假面具」。文本库不含日记和书信，所以只能证明「公开发表的文集里没有」。\n\n这种「戴久了摘不下来」的说法，在中文网络上很常见，出自谁之手，本站没有查到。",
    "origin": "「假面具」确实是鲁迅的常用意象，这让这句话显得可信；再配上「伤筋动骨扒皮」这样的狠话，很有「鲁迅味」。它的最早出处本站没有查到。",
    "instead": "如果要引鲁迅谈假面，可以去读《忽然想到》《「论语一年」》里的具体文字并写明篇名。这一句只能标成「网传，查无出处」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "虎嗅，整理文章（列举被篡改、杜撰的「鲁迅名言」，含此句）",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "鲁迅，《忽然想到》（《华盖集》，含「假面具」）—— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/08/020.htm"
      }
    ],
    "related": [
      "luxun-village-dogs"
    ]
  },
  {
    "id": "luxun-sponge-time",
    "category": "quote",
    "belief": "「时间就像海绵里的水，只要愿挤，总还是有的。」——鲁迅",
    "truth": "在鲁迅的文集里查不到这句话；迄今查不到可靠出处。",
    "detail": "本站在《鲁迅全集》电子文本（中文马克思主义文库，30个部分，含《热风》《坟》《华盖集》等全部杂文集）里检索「海绵」「愿挤」，零命中。虎嗅整理的文章也说，查鲁迅全集和鲁迅博物馆的文献检索，均找不到出处，将它归为「杜撰或张冠李戴」。\n\n同样要老实说明：这个文本库不含日记和书信，所以只能证明它不在公开发表的文集里，而不能证明他从未说过类似的话。知乎上也有人在问这句话到底是不是鲁迅所说，但本站没有找到有人给出过确切的原始文献。\n\n这句话与他真正写过的关于时间的话（「时间就是性命」）主题相同，可能就是这样被联想到他名下的。",
    "origin": "时间管理类文章常引用名人名言。这句话比喻形象、口语化，也契合励志语境，很容易被安上鲁迅的名字。本站没有查到最早是谁、在哪里这样写的。",
    "instead": "想谈挤时间，可以直接说「时间像海绵里的水，挤一挤总会有」这句俗话式的比喻，不署名；或者引鲁迅确实写过的「时间就是性命」（《门外文谈》）。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "虎嗅，整理文章（列举被篡改、杜撰的「鲁迅名言」，含此句，称查全集与鲁迅博物馆文献均无）",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "鲁迅，《门外文谈》（《且介亭杂文》）—— 他确实写过的关于时间的话",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/18/008.htm"
      }
    ],
    "related": [
      "luxun-time-life",
      "luxun-coffee-genius"
    ]
  },
  {
    "id": "luxun-child-ox",
    "category": "quote",
    "belief": "「俯首甘为孺子牛」是鲁迅表示甘愿为人民大众服务",
    "truth": "鲁迅这句诗本身只有字面典故，全集注释指向的是《左传》里给孩子当牛的故事；「孺子」是否指人民大众，是后来的解读。",
    "detail": "诗是《自嘲》（1932年10月12日的日记说，他为柳亚子写条幅，「偷得半联，凑成一律」）：「横眉冷对千夫指，俯首甘为孺子牛。」《鲁迅全集》的注释在「孺子牛」下引了《左传》哀公六年的典故：齐景公曾经口衔绳子扮牛，让儿子荼牵着走。又引清代洪亮吉《北江诗话》：一位钱秀才溺爱三个儿子，门联写着「酒酣或化庄生蝶，饭饱甘为孺子牛」，并说鲁迅条幅里所谓「偷得半联」，指的就是这一联。\n\n也就是说，这句诗的原型是「父亲愿意为孩子俯首当牛」。把「孺子」直接读作「人民大众」，是后来的引申，并不是注释里给出的本义。有文章引用鲁迅书信，说他谈到自己为孩子「加倍服务，为孺子牛耳」，所以「孺子」本义可能就是他的儿子海婴，但本站没有核对那封信的原文。\n\n这样的引申读法流传很广，也未必是错的——诗可以有多重读法。需要记住的只是：这是读法，不是他的明确声明。",
    "origin": "这两句诗因为气势对仗，被反复引用，在教学和宣传中逐渐固定为「爱憎分明、为民服务」的解释。「偷得半联」的出处和《左传》典故很少被连带提及。",
    "instead": "想引用，就连同注释说明：「出自《自嘲》(1932),『孺子牛』用《左传》典故，字面是为孩子当牛。」想表达「为人民服务」的读法时，写成「后人常这样解读」。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "鲁迅，《自嘲》（《集外集》，1932年10月12日）及全集注释 —— 中文马克思主义文库《鲁迅全集》电子文本",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/22/038.htm"
      },
      {
        "label": "鲁迅，《自嘲》（诗词集版本，含日记按语）—— 中文马克思主义文库",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/30/024.htm"
      }
    ],
    "related": [
      "luxun-medicine"
    ]
  },
  {
    "id": "world-twain-lie-halfway",
    "category": "quote",
    "belief": "「谎言走遍半个地球的时候，真相还在穿鞋。」——马克·吐温",
    "truth": "吐温生前没留下这句话；类似的说法至少早到 1710 年，而「吐温说过」的最早记录出现在他去世九年之后。",
    "detail": "这句话常被署名马克·吐温或丘吉尔。Quote Investigator 追查的结果是：两人都没有可靠出处。丘吉尔研究者朗沃思(Richard Langworth)2009 年明确说这不是丘吉尔的话；吐温方面，最早的归属见于 1919 年《Standard Player Monthly》，而吐温 1910 年已去世，这条记录本身缺少他亲口说过的证据。\n\n更早的相近说法一路可追：1710 年斯威夫特在《The Examiner》里写「谎言飞着走，真相一瘸一拐地跟在后面」；1820 年的《Portland Gazette》出现了真相「还在穿靴子」的说法；1834 年《The New-England Magazine》写「谬误能跑半个世界，真相才刚穿上靴子」。1821 年另有文献把类似说法记在费雪·艾姆斯(Fisher Ames)名下。\n\n所以这是一句在英语世界流传三个世纪的格言，「靴子」后来变成「鞋」，作者则被换成了最有名的幽默家。这里的结论是「查无吐温出处」，不是证明他绝不可能说过；但没有证据，就不该用引号替他背书。",
    "origin": "这个说法从 18 世纪的讽刺文章和布道辞里长出来，19 世纪初已有「穿靴子」的版本在报刊流传。20 世纪起被安到吐温、丘吉尔等以妙语著称的人名下——越是会说俏皮话的人，越容易被当作「失主」。",
    "instead": "想引用就写「有句老话说，谎言走遍半个地球的时候，真相还在穿鞋」，不署名；要署名可以写斯威夫特 1710 年的原句（「谎言飞着走，真相一瘸一拐地跟在后面」）并注明出处。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator —— A Lie Can Travel Halfway Around the World While the Truth Is Putting On Its Shoes",
        "url": "https://quoteinvestigator.com/2014/07/13/truth/"
      }
    ],
    "related": [
      "world-twain-quit-smoking",
      "world-twain-death-exaggerated"
    ]
  },
  {
    "id": "world-twain-quit-smoking",
    "category": "quote",
    "belief": "「戒烟很容易，我戒过上千次了。」——马克·吐温",
    "truth": "吐温确实写过戒烟，但这个笑话的模板比他早：1905 年的小说里已有「我戒了不止一千次」，W. C. 菲尔兹 1938 年前用它讲戒酒。",
    "detail": "Quote Investigator 没有找到吐温说过这句话的实质证据。能找到的最早同类句子，是 1905 年哈里斯·迪克森(Harris Dickson)小说《Duke of Devil-May-Care》里的「我戒了不止一千次」，那里说的是赌博，不是烟。\n\n喜剧演员 W. C. 菲尔兹在广播里表演的《The Temperance Lecture》（1938 年前已播出）里有这样的台词：别说你戒不了酒，很容易，我戒过上千次。可见这个笑话的套路适用于酒、烟、赌，谁都可以套。\n\n吐温自己写过的相关文字是：有人劝他戒烟，他戒了两三天，但「太寂寞了」（见 1913 年出版的传记资料）。这也是为什么人们觉得「像他说的」——风格确实像，只是没有记录。",
    "origin": "「我戒过上千次」是一个可套用的幽默模板，先在小说和喜剧台词里流行，后来被安到抽烟最出名的幽默作家身上。吐温嗜烟、爱自嘲，所以特别「像」。",
    "instead": "可以说「有个老笑话：戒烟很容易，我戒过上千次」，不署名；若要写吐温，引他真正写过的那句：戒了两三天，但太寂寞了。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator —— It's Easy to Quit Smoking. I've Done It a Thousand Times",
        "url": "https://quoteinvestigator.com/2012/09/19/easy-quit-smoking/"
      }
    ],
    "related": [
      "world-twain-lie-halfway",
      "world-twain-coldest-winter-sf",
      "world-lincoln-silent-fool"
    ]
  },
  {
    "id": "world-twain-coldest-winter-sf",
    "category": "quote",
    "belief": "「我度过的最冷的冬天，是旧金山的夏天。」——马克·吐温",
    "truth": "吐温的文字里没有这句关于旧金山的话；这个玩笑原是 18 世纪英国演员昆(James Quin)的，吐温 1880 年只是转述它，而且说的是巴黎。",
    "detail": "Quote Investigator 查遍吐温的文章和演讲，没有找到他谈旧金山的这句话。最早的同类笑话见于 1789 年 7 月 29 日贺拉斯·沃波尔致玛丽·贝瑞的信：有人问演员昆见过这么糟的冬天没有，他答「见过，去年夏天就是这样」。\n\n吐温 1880 年 4 月 28 日给卢修斯·费尔柴尔德的信里，确实提到了这个笑话——但他是引用昆，挖苦的是巴黎的天气。QI 能找到的、把这句话与旧金山联系起来的最早记录，是 1963 年的一本心理学教科书；在此之前它还流转过明尼苏达州的德卢斯。\n\n所以「吐温说旧金山」是链条最末端的版本；旧金山夏天确实又凉又有雾，这是玩笑能黏上这座城市的原因，但与吐温无关。",
    "origin": "昆的玩笑先靠沃波尔的书信传开；吐温读到并转述；20 世纪这个玩笑被套到不同城市（德卢斯、旧金山），1960 年代起开始署名吐温。城市的雾和凉夏让它显得贴切。",
    "instead": "可以说「有个关于旧金山夏天的老玩笑」。想写出处，就引沃波尔 1789 年记下的昆那句，并说明吐温 1880 年转述时说的是巴黎。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator —— The Coldest Winter I Ever Spent Was a Summer in San Francisco",
        "url": "https://quoteinvestigator.com/2011/11/30/coldest-winter/"
      }
    ],
    "related": [
      "world-twain-quit-smoking"
    ]
  },
  {
    "id": "world-lincoln-silent-fool",
    "category": "quote",
    "belief": "「宁可闭嘴被人当傻瓜，也不要开口把疑虑一扫而光。」——林肯（或马克·吐温）",
    "truth": "林肯和吐温都没有这方面的记录；最早能查到的是 1907 年莫里斯·斯威策的一本书，更早的影子则是《箴言》17:28。",
    "detail": "Quote Investigator 找到的最早出处，是莫里斯·斯威策(Maurice Switzer)1907 年的《Mrs. Goose, Her Book》：「宁可沉默，冒被当作傻瓜的风险，也不要开口，把这件事的疑虑一扫而光。」\n\n把它记到林肯名下的最早记录是 1931 年 11 月的《Golden Book》杂志，距林肯去世已 66 年；记到吐温名下的最早记录是 1953 年 5 月萨斯喀彻温省的一家报纸。两处都没有给出同时代文献。\n\n更古老的思想则在《箴言》17:28:愚昧人若静默不言，也可算为智慧。不过那里说的是「被当作聪明」，现代版本只是说「免得被当作傻」，意思不完全一样。",
    "origin": "一句 1907 年的小书格言，流传中失去了作者，20 世纪 30 年代起被配给林肯，50 年代起又配给吐温——这两位都是「名言收容所」里最常见的名字。",
    "instead": "可以写「有句话说，宁可沉默被当作傻瓜，也不要开口证实它」；要署名，写斯威策 1907;若想引古老出处，可引《箴言》17:28。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator —— Better to Remain Silent and Be Thought a Fool than to Speak and Remove All Doubt",
        "url": "https://quoteinvestigator.com/2010/05/17/remain-silent/"
      }
    ],
    "related": [
      "world-lincoln-fool-all-the-people",
      "world-twain-quit-smoking"
    ]
  },
  {
    "id": "world-lincoln-fool-all-the-people",
    "category": "quote",
    "belief": "「你能一时骗过所有人，也能永远骗过一部分人，但不能永远骗过所有人。」——林肯",
    "truth": "目前没有林肯同时代的文献显示他说过；最早的林肯署名是 1885 年的一封信，而相近的思想 1684 年法国人阿巴迪已写过。",
    "detail": "Quote Investigator 的结论是：林肯很可能没用过这句格言，《林肯全集》里也没有它。把它记在林肯名下的最早材料，是 H. 克莱·巴斯科姆(Bascom)1885 年发表在纽约《The Voice》上的一封信——那时林肯已去世 20 年，信里写的是「你可以一时骗过人民，也可以永远骗过一部分人，但不能永远骗过所有人」。\n\n更早的思想是：1684 年雅克·阿巴迪(Jacques Abbadie)在《基督教真理论》里写，可以骗一些人，或在某些时间地点骗所有人，但不可能在所有地方、所有时代骗所有人。\n\nQI 推测是 1880 年代禁酒运动里有人读到阿巴迪或狄德罗，开始使用这句话，并归给备受尊敬的林肯。这是推测，不是定论。",
    "origin": "先是 17 世纪法国护教学著作里的一个想法，后在 19 世纪 80 年代的禁酒宣传里以口语化形式出现，并被归给林肯；20 世纪后成为林肯名言的「经典款」。",
    "instead": "如果要引用，写「据传林肯所说，但没有同时代文献」，或者引阿巴迪 1684 年那句并注明是转述。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator —— You Cannot Fool All the People All the Time",
        "url": "https://quoteinvestigator.com/2013/12/11/cannot-fool/"
      }
    ],
    "related": [
      "world-lincoln-silent-fool"
    ]
  },
  {
    "id": "world-hemingway-write-drunk",
    "category": "quote",
    "belief": "「喝醉了写，清醒了改。」——海明威",
    "truth": "海明威的文字和言论里查不到这句话；最早的吻合出现在 1964 年彼得·德·弗里斯的小说里，是小说人物的台词。",
    "detail": "Quote Investigator 的结论是海明威从未说过或写过这句话。最早的强匹配，是彼得·德·弗里斯 1964 年的小说《Reuben, Reuben》第 21 章里人物高恩·麦格兰德（以狄兰·托马斯为原型）的话：「我有时喝醉了写、清醒了改，有时清醒了写、喝醉了改。」\n\n这句话在小说里是描述一个人的创作方式——在「自发」和「克制」之间切换——不是写作建议。QI 推测，它后来被「改派」给更有名、且以酒量闻名的海明威。\n\n海明威自己说过的工作习惯与此相反：他强调早晨写作、下午才去玩。「海明威酒鬼作家」的形象让这个误署特别顺理成章。",
    "origin": "一句 1964 年小说里的台词，被剥去语境、改成祈使句「Write drunk, edit sober」，再配上最容易让人相信的作者。",
    "instead": "想用这句话就不署海明威；若要写出处，写德·弗里斯《Reuben, Reuben》(1964)里的原句，并说明那是人物的台词。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator —— Write Drunk, Revise Sober",
        "url": "https://quoteinvestigator.com/2016/09/21/write-drunk/"
      }
    ],
    "related": [
      "world-picasso-good-artists-copy"
    ]
  },
  {
    "id": "world-newton-shoulders-of-giants",
    "category": "quote",
    "belief": "「如果我看得更远，那是因为我站在巨人的肩膀上。」——牛顿（他独创的谦辞）",
    "truth": "这句话确实是牛顿 1675 年写给胡克的信里的原话，但比喻不是他发明的：12 世纪的学者已在用，而且那封信还有被解读为暗讽对手的争议。",
    "detail": "牛顿在 1675 年（也有写作 1676 年）2 月 5 日给罗伯特·胡克的信里写下：「如果我看得更远，那是站在巨人肩上。」这句话是真的，不是误传。\n\n误会在于「谁的创意」。12 世纪神学家索尔兹伯里的约翰在 1159 年《Metalogicon》里，把这个比喻归于更早的沙特尔的贝尔纳，说他把后人比作坐在巨人肩上的侏儒；1123 年孔什的威廉也已有类似说法。到 17 世纪，梅森、帕斯卡、赫伯特等人也用过，它在牛顿之前已是学界的常用比喻。\n\n另一个常被忽略的点：牛顿写信时正与胡克争论光学发现的优先权，而胡克背部严重弯曲。近年有学者认为这句话可能含有暗讽，也有人不同意，历史学家至今没有定论。把它当作单纯的谦虚，是一种常见但不一定完整的读法。",
    "origin": "牛顿的信在 1855 年出版后，这句话成为他最有名的「谦辞」，与苹果的故事一样被反复讲述，中世纪的来历则渐渐被遗忘。",
    "instead": "可以写：「牛顿 1675 年致胡克信中说，如果他看得更远，是站在巨人肩上——这个比喻中世纪就有了。」如果谈他的『谦虚』，最好顺带提一句背景：当时他正与胡克争优先权。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "维基百科 —— Standing on the shoulders of giants",
        "url": "https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants"
      }
    ],
    "related": [
      "world-einstein-god-dice",
      "origin-newton-apple-head"
    ]
  },
  {
    "id": "world-socrates-know-nothing",
    "category": "quote",
    "belief": "「我唯一知道的就是我一无所知。」——苏格拉底",
    "truth": "柏拉图笔下的苏格拉底没有这样说；他说的是：我不知道的事，我也不认为自己知道。",
    "detail": "《申辩篇》21d 里，苏格拉底讲到他去访问一位自以为聪明的政治家，得出的结论（Perseus 所载英译）：他不知道的东西，他也不认为自己知道(what I do not know I do not think I know)。\n\n两种说法有微妙差别。「我知道自己一无所知」是一个断言，说自己什么都不知道；而《申辩篇》里的苏格拉底只是说：在不懂的问题上，我不假装懂。他并不是说自己完全无知，实际上他对不少事情（如什么是不义、人应该怎样生活）有明确的看法。\n\n搜索到的二手说法普遍指出：「我知道自己一无所知」是后人的概括，并不见于柏拉图的对话。这个概括不算荒谬，但加上引号、署上苏格拉底时，就把一个更克制的主张说成了更夸张的口号。",
    "origin": "后世对《申辩篇》的概括和格言化，把「不自以为知道」压缩成「知道自己一无所知」，再被印成名言卡片。",
    "instead": "需要引用时用《申辩篇》21d 的意思：「我不知道的事，我也不认为自己知道」；若只是概括，写「苏格拉底认为自己的智慧在于不假装懂」。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "柏拉图，《申辩篇》21d（Perseus 数字图书馆英译）",
        "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=21d"
      }
    ],
    "related": [
      "world-aristotle-we-are-what-we-repeatedly-do"
    ]
  },
  {
    "id": "world-picasso-good-artists-copy",
    "category": "quote",
    "belief": "「好的艺术家复制，伟大的艺术家偷。」——毕加索",
    "truth": "没有证据显示毕加索说过；早到 1892 年已有类似句子，T. S. 艾略特 1920 年写过更接近的版本，乔布斯 1996 年才把它说成毕加索的话。",
    "detail": "Quote Investigator 找不到毕加索说这话的证据。该说法的演变大致是：1892 年 W. H. 达文波特·亚当斯在《The Gentleman's Magazine》写道：伟大的诗人模仿并改进，渺小的诗人偷窃并糟蹋。\n\n1920 年 T. S. 艾略特在《The Sacred Wood》里把褒贬倒过来：「不成熟的诗人模仿，成熟的诗人偷；糟糕的诗人把拿来的东西糟蹋，好的诗人把它变成更好的东西。」1967 年彼得·耶茨声称听斯特拉文斯基说过「好作曲家不模仿，他偷」；1974 年一本舞台设计的书则把「不成熟的艺术家复制，伟大的艺术家偷」记在福克纳名下。\n\n乔布斯在 1996 年 PBS《Triumph of the Nerds》里把「好艺术家复制，伟大的艺术家偷」说成毕加索的话，使这个版本广泛流传。QI 认为这个格言经过多人重塑，毕加索一栏找不到支撑。",
    "origin": "从 19 世纪末的文学评论，到艾略特的箴言，再到音乐和舞台设计圈的口头传说，最后经乔布斯 1996 年的电视访谈，与毕加索绑定。",
    "instead": "想用就写「有句话说，好艺术家复制，伟大的艺术家偷」，不署名；或者直接引艾略特 1920 年的原话，并说明他讲的是诗人。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Quote Investigator —— Good Artists Copy; Great Artists Steal",
        "url": "https://quoteinvestigator.com/2013/03/06/artists-steal/"
      }
    ],
    "related": [
      "world-hemingway-write-drunk"
    ]
  },
  {
    "id": "world-twain-death-exaggerated",
    "category": "quote",
    "belief": "「关于我死亡的报道被大大夸大了。」——马克·吐温",
    "truth": "是吐温的话，但不是这个措辞：1897 年报纸记下的是「我死亡的报道有些夸大」，「大大夸大」是后来的演变。",
    "detail": "1897 年 6 月 2 日的《New York Journal》记者弗兰克·马歇尔·怀特报道：吐温的表亲 J. 罗斯·克莱门斯博士在伦敦病重，谣言演变成了吐温去世。吐温回应的最早发表版本是：「我死亡的报道有些夸大(The report of my death was an exaggeration)。」\n\nQuote Investigator 梳理的后续版本：吐温 1906 年在《North American Review》回忆时写的是对记者说「就说这个报道被大大夸大了」；1912 年传记作者阿尔伯特·比奇洛·佩恩记的是「就说我死亡的报道被严重夸大」；再往后，「大大」「我的讣告」等措辞在报刊里不断添加。\n\n所以这是一句真有其事的话，只是我们熟悉的那一版是经几次转述打磨出来的。引用它时，「最早有记录的措辞」和「流行措辞」是两回事。",
    "origin": "事件发生于 1897 年，措辞随着吐温自己的回忆、传记作者的转述和报刊的重印不断变化，最后固定成那句顺口的「greatly exaggerated」。",
    "instead": "可以写：「1897 年报纸记下吐温的回应是『我死亡的报道有些夸大』；流行的『大大夸大』是后来的版本。」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Quote Investigator —— Reports of My Death Are Greatly Exaggerated",
        "url": "https://quoteinvestigator.com/2024/06/07/report-death/"
      }
    ],
    "related": [
      "world-twain-lie-halfway"
    ]
  },
  {
    "id": "world-einstein-god-dice",
    "category": "quote",
    "belief": "「上帝不掷骰子。」——爱因斯坦",
    "truth": "爱因斯坦确实写过，但 1926 年致玻恩的信里说的是「我坚信那位（旧神）不掷骰子」，这是对量子力学随机性的哲学保留，不是神学宣言。",
    "detail": "1926 年 12 月，爱因斯坦回复马克斯·玻恩的信。Aeon 刊文引的译文是：「这个理论成果不少，但并没有让我们更接近那位老者的秘密。我无论如何确信，他不掷骰子。」玻恩当时在论证量子力学的核心是概率与随机，不再是经典物理那样的决定论。\n\n所以这句话是真的，但要注意两点：一是原话里的主语是「那位老者(the Old One)」和「他」，「上帝不掷骰子」是后来的概括；二是爱因斯坦所说的「上帝」不是人格神，文章引他的话说，他信的是斯宾诺莎的上帝，即显现于万物有序和谐中的那个，不是关心人类命运的神。\n\n这也是为什么「爱因斯坦信上帝所以拒绝量子力学」的说法过于简单：他表达的是对自然应当可理解、有规律的信念。他的立场后来被实验和主流物理学证明站不住，但那是另一个话题。",
    "origin": "1926 年的私人信件，后来成为物理史上最广为引用的一句；在流行文化里被缩成「上帝不掷骰子」，再被拿去支持各种宗教或反宗教的结论。",
    "instead": "引用时可以写：「1926 年爱因斯坦致玻恩信：『我无论如何确信，他不掷骰子』（此处『他』指自然的『老者』）。」不要用来说明他信不信某个宗教。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "Aeon —— What Einstein meant by 'God does not play dice'",
        "url": "https://aeon.co/ideas/what-einstein-meant-by-god-does-not-play-dice"
      }
    ],
    "related": [
      "world-newton-shoulders-of-giants"
    ]
  },
  {
    "id": "luxun-some-live-dead",
    "category": "quote",
    "belief": "「有的人活着，他已经死了；有的人死了，他还活着。」——鲁迅",
    "truth": "这是诗人臧克家 1949 年写的诗《有的人》的开头，副题是「纪念鲁迅有感」，写的是鲁迅，不是鲁迅写的。",
    "detail": "《有的人》是臧克家 1949 年写的诗，副题为「纪念鲁迅有感」。中国作家网《走进臧克家故居》记述其创作时间为 1949 年 10 月，并引述了这两句开头。\n\n诗歌纪念的是鲁迅，作者却是臧克家。引用时应同时注明作者和作品名称，避免把纪念对象当作作者。",
    "origin": "诗歌的纪念对象与作者是两个人；摘录脱离作品标题后，容易混淆这两层关系。",
    "instead": "引用时写：「臧克家《有的人》（1949,副题『纪念鲁迅有感』）：『有的人活着，他已经死了；有的人死了，他还活着。』」",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "中国作家网 —— 《走进臧克家故居》（提及《有的人》1949 年 10 月创作，副题「纪念鲁迅有感」）",
        "url": "https://www.chinawriter.com.cn/n1/2023/0728/c404063-40045334.html"
      }
    ],
    "related": [
      "luxun-one-confidant"
    ]
  },
  {
    "id": "luxun-one-confidant",
    "category": "quote",
    "belief": "「人生得一知己足矣，斯世当以同怀视之。」——鲁迅",
    "truth": "这副联被记为清人何瓦琴的句子；鲁迅在 1933 年春抄写成联语赠给瞿秋白，不宜仅署名为鲁迅原创。",
    "detail": "人民政协网《瞿秋白绘制阿Q漫画》记述：1933 年春，鲁迅将清代何瓦琴的这副联句书写成联语，赠给瞿秋白。\n\n书写者不等于原作者。现有出处支持「鲁迅抄写并赠送这副联」，并不支持把它当作鲁迅原创。",
    "origin": "鲁迅书赠瞿秋白的联语，容易在转引时被简化成「鲁迅说」。",
    "instead": "可以写：「清人何瓦琴句，鲁迅 1933 年书赠瞿秋白。」若只想表达鲁迅与瞿秋白的友谊，引用时附上这一层关系比单独署名更准确。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "人民政协网 —— 《瞿秋白绘制阿Q漫画》（记 1933 年春鲁迅将清代何瓦琴名句书写成联语赠瞿秋白）",
        "url": "https://www.rmzxw.com.cn/c/2024-07-17/3579048.shtml"
      }
    ],
    "related": [
      "luxun-some-live-dead",
      "luxun-coffee-genius"
    ]
  },
  {
    "id": "zh-fools-trouble-themselves",
    "category": "quote",
    "belief": "「世上本无事，庸人自扰之。」——俗语",
    "truth": "源头是《新唐书·陆象先传》里陆象先的话：「天下本无事，庸人扰之为烦耳」，流行版本是后人顺口改写的。",
    "detail": "《新唐书·陆象先传》记述陆象先任蒲州刺史、兼河东按察使时，以仁恕为政。传中这段话讨论的是施政应当简省，避免无谓地扰民生事。\n\n流行版本把「天下」改为「世上」，把「扰之为烦耳」改为「自扰之」，也把施政语境转成了「个人别自寻烦恼」的劝慰。它可以作为今天的俗语使用，但不是史书原文。",
    "origin": "史书里一位地方官的施政心得，经民间改写成四字一顿的俗语，后来在心灵鸡汤里意思从「官府少扰民」滑向「个人别自寻烦恼」。",
    "instead": "需要准确时，引《新唐书》原话「天下本无事，庸人扰之为烦耳」，并交代它说的是治理；日常用「世上本无事，庸人自扰之」作俗语也行，只是别当成史书原文。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "欧阳修、宋祁，《新唐书·陆象先传》（中文维基文库）",
        "url": "https://zh.wikisource.org/wiki/新唐書/卷116"
      }
    ],
    "related": [
      "zh-liang-qichao-drink-ice"
    ]
  },
  {
    "id": "zh-liang-qichao-drink-ice",
    "category": "quote",
    "belief": "「十年饮冰，难凉热血。」——梁启超",
    "truth": "这句话尚缺可核实的梁启超原文出处。「饮冰」典故可以追溯到《庄子·人间世》，但不能据此认定整句出自梁启超。",
    "detail": "中文维基语录将此句标为伪托，但这一二手标注本身不足以证明它是谁创作的，也不能代替梁启超作品的具体出处。\n\n《庄子·人间世》的「饮冰」描写受命后的内心焦灼；梁启超的「饮冰室主人」之号与这个典故有关。典故的来源和「十年饮冰，难凉热血」整句的作者，是两个需要分别核实的问题。现有出处尚不能确认梁启超写过这句话，也不能据此证明他绝未写过。",
    "origin": "「饮冰」典故及「饮冰室主人」之号容易让人把整句与梁启超联系起来；整句的创作时间和作者仍待可靠出处确认。",
    "instead": "可以写：「梁启超自号『饮冰室主人』，典出《庄子·人间世》『朝受命而夕饮冰』」。至于『十年饮冰，难凉热血』，可标为『网传，未见梁启超原文』。",
    "stakes": "harmless",
    "confidence": "limited",
    "sources": [
      {
        "label": "中文维基语录 —— 梁啟超（「十年饮冰，难凉热血」条标注「伪托梁启超的语录」）",
        "url": "https://zh.wikiquote.org/wiki/梁啟超"
      },
      {
        "label": "《庄子·人间世》（中文维基文库）:「今吾朝受命而夕飲冰，我其內熱與」",
        "url": "https://zh.wikisource.org/wiki/莊子/人間世"
      }
    ],
    "related": [
      "zh-fools-trouble-themselves"
    ]
  },
  {
    "id": "why-manhole-round",
    "category": "why",
    "belief": "井盖是圆的，因为只有圆形的盖子才不会掉进自己的洞里",
    "truth": "圆形确实掉不下去，但并不是唯一选择：任何「等宽」曲线（比如勒洛三角形）都不会掉；圆形胜在好做、省料。",
    "detail": "盖子会不会掉进洞里，取决于它在各个方向上的宽度。圆形在任何方向的宽度都一样，所以无论怎么斜着放，都比洞口的直径大，掉不下去。方形盖子沿对角线的长度比边长大，斜着就能滑进方形的洞。\n\n但这条性质并不是圆形独有。数学上叫「等宽曲线」的形状都有它，最简单的是勒洛三角形——在正三角形的三个顶点之间画圆弧得到的弧边三角形；还有勒洛五边形、七边形。《科学新闻》（Science News）2003 年的一篇科普文章就是这样讲的，并提到有些国家的硬币也用等宽的七边形。\n\n那为什么街上几乎都是圆的？常被提到的原因是：圆形最容易铸造和车削，同样的口径用料也比方形少；圆形井筒承受土压的受力也更均匀；圆盖不用对准方向就能盖上，还可以滚着搬。这些实际理由各自的分量，不同地区、不同厂家的说法并不一样，所以更稳妥的说法是「掉不下去」是一条硬道理，「好做」是让圆形胜出的现实原因。",
    "origin": "这道题在流行文化里出名，是因为它被当作「考察思维方式的面试题」——作家 William Poundstone 2003 年谈科技公司招聘谜题的书里写过（据维基百科「Manhole cover」词条引述）。题目被简化成「为什么是圆的？答：因为不会掉下去」，「只有圆的才行」这层意思就是在转述中悄悄加上的。",
    "instead": "下次看到井盖，可以留意：不是所有的盖子都是圆的，方形、长方形的盖子通常搭在比洞口更大的框或台阶上，不是靠形状防掉落。「不会掉进去」是圆形的优点之一，不是它存在的唯一理由。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Ivars Peterson, Science News 2003 —— Why manhole covers are round（科普文章，讲等宽曲线与勒洛三角形）",
        "url": "https://www.sciencenews.org/?p=26010"
      },
      {
        "label": "Wikipedia —— Manhole cover（列出圆形井盖的几项常见理由，并引用 Poundstone 2003）",
        "url": "https://en.wikipedia.org/wiki/Manhole_cover"
      }
    ],
    "related": [
      "why-coin-ridged-edge"
    ]
  },
  {
    "id": "why-comet-round-windows",
    "category": "why",
    "belief": "飞机舷窗是圆角的，因为早年彗星客机的方形窗户把飞机撕裂了",
    "truth": "教训是对的——带尖角的开口会产生应力集中——但事故里最先断裂的是近似方形的天线窗和应急舱门窗，不是客舱窗户本身。",
    "detail": "1954 年，英国海外航空和南非航空的两架「彗星」1 型客机在地中海上空空中解体。调查人员把一整节机身泡进水箱反复加压，模拟成千上万次飞行，结果机身在近似方形的前部应急舱门窗角上因金属疲劳开裂。随后在厄尔巴岛附近打捞到的残骸中，起点被确认在机顶两个自动测向仪（ADF）天线窗一带——这些开口同样近似方形，位于机身最顶部。\n\n美国联邦航空局（FAA）的事故经验库写得很清楚：这些「近似方形」的开口让局部应力比设计时估计的高得多，每次增压—减压都在拐角处累积疲劳，最后撕开机身。圆形、椭圆形的开口让应力沿着弧线平滑流过，不会在角上堆起来，所以此后的喷气客机都用圆角窗户。\n\n不过，航空安全咨询机构 Aerossurance 专门梳理过「彗星」的常见误解：失事的起点是天线开口和应急舱门，不能简单说成「客舱方窗把飞机撕裂了」；调查带来的另一个大变化是「失效—安全」设计思想，以及对机身疲劳试验的重视。FAA 还提到一个关键失误：厂家做疲劳试验的那节机身事先已经加压到两倍工作压力，造成材料冷作硬化，反而掩盖了真实的疲劳寿命。",
    "origin": "「彗星」事故是航空史上被讲得最多的案例之一，而「方窗—应力集中—改圆窗」是最容易画图、也最容易记住的一条线索，于是被压缩成「方窗害死人」。严格说，这个简化版并不算错，只是把几处近似方形的开口都算到了客舱窗户头上。",
    "instead": "下次从圆角舷窗往外看，可以想到：圆角是应力沿弧线平滑流动的结果。更准确的说法是「飞机上任何带尖角的开口，都是疲劳裂纹最爱的起点」，所以舱门、天线口、检修口的拐角也都是圆的。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "美国联邦航空局（FAA）事故经验库 —— De Havilland DH-106 Comet 1",
        "url": "https://www.faa.gov/lessons_learned/transport_airplane/accidents/G-ALYV"
      },
      {
        "label": "Aerossurance —— Common Comet Misconceptions and Collaborative Contribution to Safety",
        "url": "https://aerossurance.com/safety-management/comet-misconceptions/"
      }
    ],
    "related": [
      "why-black-box-orange"
    ]
  },
  {
    "id": "why-pen-cap-hole",
    "category": "why",
    "belief": "笔帽顶上的小孔是为了平衡气压，免得墨水干掉或漏出来",
    "truth": "它主要是一项安全设计：万一孩子把笔帽吸进气管，小孔能留一条通气的路。ISO 11540 就是为此而设的标准。",
    "detail": "ISO 11540 的名称是「书写和标记工具——降低窒息风险的笔帽规范」。按加拿大标准委员会数据库里的条目，它规定了为降低窒息风险对笔帽的要求，适用于在正常或可预见情况下可能被 14 岁以下儿童使用的书写、标记工具；专供成人使用的（如珠宝笔、昂贵的钢笔、专业绘图笔）不在适用范围内。1993 年版已被作废，2014 年版为现行版本。\n\n通气孔的思路很直接：笔帽是个大小刚好能卡住气管的小物件，如果它被吸进去，带通气孔的笔帽至少不会把空气彻底堵死，给救援争取时间。有科普报道提到标准对通气量有数值要求（每分钟 8 升左右），但本站没能打开标准全文核实具体数字，所以这里不当作定论。\n\n需要说清楚的是：这个标准关心的是防窒息，不是墨水。至于孔在别处是否还有其他作用，这里没有权威来源可以引用，所以不下断言。",
    "origin": "把笔帽小孔解释成「平衡气压」「防墨水干」，是顺着「小孔=透气」的直觉想出来的功能解释。本站没有查到这种说法最早出自哪里。真正的规范性来源是 1993 年发布、2014 年修订的 ISO 11540。",
    "instead": "下次看到笔帽上的小孔，可以留意它是不是在笔帽的顶端或侧面：它是给孩子准备的安全设计。给小孩的文具，笔帽上有没有通气孔，是个值得顺手看一眼的细节。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "加拿大标准委员会（SCC）标准数据库 —— ISO 11540:2014 书写和标记工具：降低窒息风险的笔帽规范",
        "url": "https://ccn-scc.ca/standardsdb/standards/8154463"
      },
      {
        "label": "加拿大标准委员会（SCC）标准数据库 —— ISO 11540:1993（已作废）",
        "url": "https://ccn-scc.ca/standardsdb/standards/8109284"
      },
      {
        "label": "Mental Floss —— The surprising reason why pen caps have tiny holes in the top（科普报道，提到通气量数值）",
        "url": "https://www.mentalfloss.com/article/545682/surprising-reason-why-pen-caps-have-tiny-holes-top"
      }
    ],
    "related": [
      "why-pill-score-line"
    ]
  },
  {
    "id": "why-a4-ratio",
    "category": "why",
    "belief": "A4 纸 210×297 毫米这个别扭的尺寸，是随便定的",
    "truth": "它不是随便定的：长边与短边之比是 √2，所以沿长边对折，得到的纸比例不变；整套尺寸从面积 1 平方米的 A0 一路对折而来。",
    "detail": "ISO 216 定义的 A 系列纸张有两条规则：每一张纸的长宽比都是 √2（约 1.4142）；A0 的面积是 1 平方米。因为 √2 这个比例，一张纸沿长边对半裁开，得到的两张还是同样的比例，A4 对折就是 A5，A3 对折就是 A4，一路通到底。\n\nA0 的实际尺寸是 841×1189 毫米，面积约 1 平方米；每对折一次得到下一档。A4 理论上不是整数毫米，标准把它凑整成 210×297，所以才看起来别扭。\n\n这个想法并不新。剑桥大学 Markus Kuhn 的整理里提到，哥廷根大学物理教授利希滕贝格 1786 年写给友人的一封信就讨论过 √2 比例的好处；法国在 1798 年的一项纸张税法里定义过与今天 ISO 尺寸一一对应的几种纸；后来德国人 Walter Porstmann 在一百多年后独立重新发明，1922 年成为德国标准 DIN 476，之后被许多国家采用，最终在 1975 年成为国际标准 ISO 216，也成为联合国官方文件的尺寸。北美（美国、加拿大）是主要例外。",
    "origin": "「A4 尺寸很怪」这个印象来自毫米数不整。人们看到 210 和 297，自然觉得是随便取的；而 √2 这层设计逻辑不会写在纸上，只有对折时才能感觉到。",
    "instead": "下次拿一张 A4 纸对折，叠上去看看：折出来的 A5 和原来的 A4 是同样的形状。需要缩印、放大复印时，A4 缩成 A5、A3 放大成 A4，页面都刚好铺满，是这个比例的实惠之处。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Markus Kuhn（剑桥大学计算机实验室）—— International standard paper sizes（ISO 216 的设计原理与历史）",
        "url": "https://www.cl.cam.ac.uk/~mgk25/iso-paper.html"
      }
    ],
    "related": [
      "why-golf-ball-dimples"
    ]
  },
  {
    "id": "why-qwerty-slow-down",
    "category": "why",
    "belief": "QWERTY 键盘故意把字母排得乱七八糟，好让打字员慢下来，免得卡键",
    "truth": "「为了防卡键而减速」流传最广，但并非定论：京都大学的研究者通过电报机史料提出，这个排列是在演变中为莫尔斯电码接收员等需求逐步形成的。",
    "detail": "最常见的说法是：早期打字机的字杆会卡在一起，发明者克里斯托弗·肖尔斯就把常用字母拆开放，让打字员慢下来。这是一个流行了几十年的故事，甚至出现在不少学术论文里。\n\n2011 年，京都大学的安冈孝一和安冈素子发表了《QWERTY 的前史》。他们认为：最早的打字机键盘源自电报用的印字电报机，是为莫尔斯电码的接收员设计的；排列在研制过程中反复变动，先后经过肖尔斯等人、其他合作者和制造商之手，最后「偶然」变成了 QWERTY——一会儿为了接收电报，一会儿为了在发明者与厂商之间折中，最后又为了避开旧专利。他们明确不同意「肖尔斯意图让打字员变慢」，并逐一驳斥了「TYPE WRITER 能在一行里打出」这类流传的说法。\n\n另一边的说法也有来头：他们在论文中引述了东京大学教授山田尚勇 1980 年的论文，该文认为排列是为了让常用的字母组合的字杆错开、减少卡键。安冈夫妇对这个说法并不认同，但机械卡键确实是早期打字机要解决的问题。所以更稳妥的理解是：来历复杂，没有一个干净的单一原因。",
    "origin": "「为防卡键而减速」的说法在上世纪八十年代起，通过技术史、经济学（如关于「路径依赖」的论文）和科普读物反复被引用，越传越确定。安冈夫妇在论文里点名了这条引用链，指出其中的细节（比如「ed 必须由同一根手指敲」）在历史材料里站不住。",
    "instead": "遇到「某某设计是故意的」这类说法时，可以问一句：谁最早这么说的、依据什么？QWERTY 的例子说明，一个键盘排列背后可能是电报、专利、厂商妥协的叠加，而不是某个人的巧妙计划。更稳妥的说法是「来历有争议，但至少不是简单的『故意拖慢』」。",
    "stakes": "harmless",
    "confidence": "debated",
    "sources": [
      {
        "label": "Koichi Yasuoka & Motoko Yasuoka, ZINBUN No.42, 京都大学人文科学研究所 2011 —— On the Prehistory of QWERTY",
        "url": "https://repository.kulib.kyoto-u.ac.jp/server/api/core/bitstreams/dc434be9-80cd-499b-a984-f9fa35954c3b/content"
      }
    ]
  },
  {
    "id": "why-pill-score-line",
    "category": "why",
    "belief": "药片中间那道刻痕只是装饰，有没有刻痕，掰开来吃都差不多",
    "truth": "刻痕是专门为分割设计的：美国 FDA 的指南要求带刻痕的药片要有数据支持，而缓释药片因为掰开可能破坏释药控制，不应有刻痕。",
    "detail": "美国 FDA 药品评价和研究中心（CDER）2013 年 3 月发布的指南《药片刻痕：命名、标签和评价数据》里，把「刻痕」定义为压在药片平面上的一条凹线，目的是便于把较高剂量的药片分成小份。指南建议申请者提供数据，证明带刻痕的药片能被可靠地分开；对分开后的药片，还要看稳定性等项目。\n\n指南还写明：对于掰开后药物释放的控制可能被破坏的缓释类药片，不应带有刻痕。FDA 的内部研究认为，掰开药片在某些情况下存在安全问题，尤其是当药片没有刻痕、也没有评估过能否分割时：药物含量、重量、崩解或溶出的差异，都可能影响分开后每一份里有多少药物能被吸收。\n\n需要说明的边界：指南同时写到，没有专门规定要求药片必须有刻痕，也并不讨论在什么医疗条件下可以考虑分割药片。所以刻痕说明「设计上可以分」，不等于「你的情况下应该分」。是否掰开，应以说明书、医生或药师的意见为准。",
    "origin": "刻痕看上去像一道随手压的装饰线，而很多药片上又确实印着字、标志，于是人们很容易把它当作装饰，或者反过来认为「没刻痕的也一样能掰」。这种直觉来自「药片都是一块压实的粉」，但不同剂型的内部结构差别很大。",
    "instead": "可以留意药片上有没有刻痕，以及药盒说明书里有没有写「可掰开服用」。拿不准时，把药盒带给药师问一句，比自己判断可靠。本条只讲药片设计的一般规律，不构成用药建议。",
    "stakes": "risky",
    "confidence": "strong",
    "sources": [
      {
        "label": "US FDA / CDER, Guidance for Industry 2013 —— Tablet Scoring: Nomenclature, Labeling, and Data for Evaluation",
        "url": "https://www.fda.gov/media/81626/download"
      }
    ],
    "related": [
      "why-pen-cap-hole"
    ]
  },
  {
    "id": "why-runway-numbers",
    "category": "why",
    "belief": "机场跑道上那两个大数字，只是随手编的序号",
    "truth": "数字是跑道中线的磁方位角除以 10 后取整；所以同一条跑道两端的数字相差 18，而且磁极漂移够多时，跑道还会改名。",
    "detail": "美国联邦航空局《航空情报手册》（AIM）写得很明确：跑道号是最接近「跑道中线磁方位角的十分之一」的整数，方位角从磁北起顺时针量，并且从进近方向来确定。比如朝向磁方位约 092 度的跑道叫 09，另一头的方位约 272 度，就叫 27。同一条跑道两端的朝向相差 180 度，所以数字相差 18。平行跑道再用 L、R、C（左、右、中）区分。\n\n因为用的是磁北而不是真北，而地球磁场在缓慢变化，跑道有时需要改名。美国国家海洋和大气管理局（NOAA）的国家环境信息中心说，阿拉斯加费尔班克斯国际机场 2009 年把 1L-19R 改成了 2L-20R，并且预计 2033 年前后可能再改一次。图森机场管理局在一则公告里也说，这种改名在几乎每个机场都会发生，大约每 30 年一次——这是该机场的说法，不是统一规定。",
    "origin": "跑道号看上去像编号，是因为它们是两位数字、涂在跑道头上，旁边没有任何解释。没有查到这个误解的具体来源；它更像是「看到数字就当成序号」的自然想法。",
    "instead": "下次在机场看到跑道号，可以估一下：09 大概朝东，18 朝南，27 朝西，36 朝北。航班降落时，窗外看到的数字就是飞机对着的那一头的方向。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "US FAA, Aeronautical Information Manual 2-3 —— Airport Marking Aids and Signs（跑道标识）",
        "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap2_section_3.html"
      },
      {
        "label": "NOAA 国家环境信息中心（NCEI）—— Airport Runway Names Shift with Magnetic Field",
        "url": "https://www.ncei.noaa.gov/node/253"
      },
      {
        "label": "FAASafety.gov 公告 —— 图森国际机场跑道关闭与改号说明",
        "url": "https://www.faasafety.gov/SPANS/noticeView.aspx?nid=13246"
      }
    ],
    "related": [
      "why-black-box-orange",
      "why-wire-marker-balls"
    ]
  },
  {
    "id": "why-black-box-orange",
    "category": "why",
    "belief": "飞机的「黑匣子」是黑色的，所以才叫黑匣子",
    "truth": "它们其实是醒目的橙色，为的是事故后在残骸里容易被找到；「黑匣子」这个叫法的来历没有定论。",
    "detail": "澳大利亚运输安全局（ATSB）的说明写得很直接：通常被称作「黑匣子」的飞行记录器，实际上是漆成橙色的，目的是帮助事故后的找回。飞行记录器一般有两个：驾驶舱话音记录器和飞行数据记录器。\n\n名字的来历没有定论。维基百科的「飞行记录器」词条说，「黑匣子」本是二战期间英国对雷达、导航等电子设备的一种叫法，这类设备常装在不反光的黑色外壳里；最早查到的相关文字出现在 1946 年《Flight》杂志的一篇文章里；到 1967 年各国普遍强制安装飞行记录器时，这个称呼已经进入大众用语，当时有报道特意说明这些所谓的「黑匣子」其实是荧光橙色。不过该词条自己也标注说，这一部分的论证可能含有原创研究，所以这只是一种说法，不是定论。",
    "origin": "名称早于记录器本身的外观设计：「黑匣子」在工程里原本就可以指「只知道输入输出、不知道内部」的系统，在航空里又沿用了早年电子设备的叫法。因此，叫黑匣子的东西不必是黑的，这个名字与颜色其实没有关系。",
    "instead": "看到新闻里说「黑匣子找到了」，可以想象那是一个醒目橙色的坚固金属盒。至于它为什么叫这个名字，不妨记住：叫法和颜色无关。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "澳大利亚运输安全局（ATSB）—— Black box flight recorders（事实说明，经 SKYbrary 转载）",
        "url": "https://skybrary.aero/sites/default/files/bookshelf/3679.pdf"
      },
      {
        "label": "Wikipedia —— Flight recorder（术语与名称来历一节；该节自带「可能含原创研究」标注）",
        "url": "https://en.wikipedia.org/wiki/Flight_recorder"
      }
    ],
    "related": [
      "why-comet-round-windows",
      "why-runway-numbers"
    ]
  },
  {
    "id": "why-golf-ball-dimples",
    "category": "why",
    "belief": "高尔夫球表面的小坑只是为了好握、防滑；光滑的球应该飞得更远",
    "truth": "凹坑是空气动力学设计：它们让紧贴球面的气流变成湍流、在球后更晚分离，使阻力比光滑球显著降低。",
    "detail": "物体在空气中飞行时，前后压力差造成的「压差阻力」是主要的阻力来源。光滑球的气流会在球的中部较早脱离表面，后面拖出一大片低压的尾流，阻力很大。\n\n2006 年发表在《流体物理》（Physics of Fluids）上的一篇研究（Choi、Jeon 和 Choi）测量了凹坑表面上方的气流速度，解释了机制：凹坑引起局部分离，并触发分离剪切层的不稳定，产生很强的湍流；有了这股湍流，气流带着较高的动量重新附着到球面上，能够克服球后部的强逆压梯度，使主分离点向后推迟，阻力因此大幅下降。论文引言写到，凹坑可使球的阻力比光滑表面降低多达约 50%。",
    "origin": "没有查到「凹坑是为了好握」这一说法的具体出处。它更像是外行从手感出发的直觉：球身有纹路，就想到防滑。这种直觉忽略了球飞行时，表面形状会改变空气怎么绕过它。",
    "instead": "下次看高尔夫球，可以想到：那几百个小坑是在给空气「制造小漩涡」，让气流贴着球走得更远。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "Choi, Jeon & Choi, Physics of Fluids 18, 041702 (2006) —— Mechanism of drag reduction by dimples on a sphere",
        "url": "https://research.engineering.ucdavis.edu/biosport/wp-content/uploads/sites/24/2014/06/Choi-et-al-2006-Mechanism-of-drag-reduction-by-dimples-on-a-sphere.pdf"
      }
    ],
    "related": [
      "why-a4-ratio"
    ]
  },
  {
    "id": "why-coin-ridged-edge",
    "category": "why",
    "belief": "硬币边上的一圈竖纹，是为了防滑或者好看",
    "truth": "这圈纹路最初是为防「剪边」：人们会削下贵金属币边缘的一点金属，齿纹让这种动作一眼就能被看出来。",
    "detail": "过去的金币、银币，价值就来自它所含的贵金属。如果币边是光滑的，有人把边缘削掉一点，币看上去还差不多，仍能按面值花出去，削下来的金属却可以熔掉卖钱，这叫「剪边」。英国皇家铸币局（Royal Mint）的介绍说，英国在 17 世纪中叶引进了能铸造更厚的硬币、并在边缘压出竖纹（milled edge）的机器；该局的另一篇介绍说，这种带纹边缘在英国币上始于 1660 年代，用来对付剪边。有的 17 世纪币的边缘还刻着拉丁文「Decus et Tutamen」，意思是「装饰与保护」。\n\n所以这圈纹路原本是一种防伪、防损的设计，而不是为了手感。今天大多数硬币已经不含贵金属，边缘的纹路是否仍有其他用途，因国家和币种而异，这里没有权威来源可以统一说明，所以不下断言。",
    "origin": "当币的价值不再取决于金属，「防止剪边」这一层需求消失了，齿纹却因为传统被保留下来；人们看到它，自然从当下的功能（握感、辨识）去想它的用处。具体是谁第一次这样解释的，没有查到。",
    "instead": "下次摸硬币的边，可以想到它原本是一圈「防篡改封条」：任何削过的痕迹都会在纹路上露出来。你也可以比较一下手边几种面额的硬币，看哪些边缘有纹、哪些光滑。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "The Royal Mint —— The Milled Edge Motif（期刊文章，讲带纹币边的由来与时间）",
        "url": "https://886.royalmint.com/blogs/the-journal/the-milled-edge-motif"
      },
      {
        "label": "The Royal Mint —— Clippers and Counterfeiters: Notes for Teachers（教师资料，讲剪边与 17 世纪中叶引进压纹机器）",
        "url": "https://www.royalmint.com/globalassets/the-royal-mint/pdf/clippers-and-counterfeiters-notes-for-teachers.pdf"
      }
    ],
    "related": [
      "why-manhole-round"
    ]
  },
  {
    "id": "why-wire-marker-balls",
    "category": "why",
    "belief": "高压电线上挂的彩色大球是装饰，或者是配重、给鸟看的",
    "truth": "它们是给低空飞行的航空器看的：把本来很难看见的细电线标出来。美国联邦航空局的标准对球的大小、颜色和间距都有规定。",
    "detail": "美国联邦航空局的咨询通告 AC 70/7460-1（障碍物标识与照明）第 3.5.1 条「球形标志」写道，球形标志主要用于标识不到 69 千伏的架空线和悬链线，也可以用投影面积不小于球的其他形状，例如圆柱。球径方面：跨越峡谷、湖泊、河流等的大跨度线路，直径不应小于 36 英寸（约 91 厘米）；较小的 20 英寸（约 51 厘米）球可以用在跨度较小的线路上，或距地面不到 50 英尺、距跑道端 1500 英尺以内的电力线。每个标志应为单一颜色，即航空橙、白或黄。\n\n安装上，无灯标志一般沿线约每 200 英尺一个，跑道端等关键区域更密，为 30 至 50 英尺；颜色宜交替安装橙、白、黄，因为交替的颜色在各种背景下最容易看见。\n\n这是美国的标准；其他国家有自己的规定，这里没有逐一核实。本条也没有评价「给鸟看」之类的说法：本站查到的 FAA 文件只说明了面向航空器的用途，没有谈鸟。",
    "origin": "球挂在远离道路的高处，看起来没有实用功能，旁边又没有标牌解释，人们只好从「好看」或「物理上有用」去猜。没有找到这些猜测最早出处。",
    "instead": "下次在山口、河谷或机场附近看到电线上的彩球，可以想到：那是给直升机、农用飞机的驾驶员看的路标。如果你在这些地方做低空飞行，球就是你需要避让电线的信号。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "US FAA, Advisory Circular 70/7460-1M —— Obstruction Marking and Lighting（第 3.5.1 条 Spherical Markers）",
        "url": "https://www.faa.gov/documentLibrary/media/Advisory_Circular/Advisory_Circular_70_7460_1M.pdf"
      }
    ],
    "related": [
      "why-runway-numbers"
    ]
  },
  {
    "id": "word-kongxue-laifeng",
    "category": "word",
    "belief": "「空穴来风」就是毫无根据、凭空捏造",
    "truth": "「空穴来风」原本说的是：有了孔洞，风自然会进来——引申为传闻的出现不是完全没有原因；今天「毫无根据」的用法已被辞书并收。",
    "detail": "这个词出自《文选》里宋玉的《风赋》。楚襄王说风是天下人共享的，宋玉答：「臣闻于师：枳句来巢，空穴来风，其所托者然，则风气殊焉。」意思是：枳树枝杈弯曲，鸟才来筑巢；门户有孔穴，风才会钻进来——什么样的处所，招来什么样的风。《六臣注文选》的注文也是按「门户孔穴，风善从之」来解释「空穴」的。所以「空穴」是风有处可入的条件，不是「空无一物」。\n\n因此，按本义，「空穴来风」讲的是「事出有因」：有了可乘之隙，传闻才会进来。教育部《重编国语辞典修订本》的释义仍保留这层意思：「有空穴，就有风吹来……后比喻流言乘隙而入」。不过它给的例句「那些空穴来风的传闻，不足以采信」，用的已经是后起的「无根据」语感。\n\n语言在这里确实走到了另一边。据《现代语文》2020年一篇讨论词典释义的文章，《现代汉语词典》2002年增补本只写「比喻消息和传说不是完全没有原因的」，第5版则改为「……现多用来比喻消息和传说毫无根据」，即把新旧两义都收了进去（该文作者认为第5版仍未充分反映新义已占优势的实际）。所以与其说「大家都用错了」，不如说它是一个旧义与新义正在换班的词。",
    "origin": "词义反转大概源于「空」字：现代人望文生义，把「空穴」读成「空的洞、什么都没有」，于是「空穴来风」被理解成「凭空来的风」，也就是没有根据。这种读法在口语和新闻里越来越常见，辞书于是先加注「现多用来」，再逐步承认新义。",
    "instead": "想表达「传闻不是毫无缘由」时，用「空穴来风」本义，最好配一句上下文，如「空穴来风，未必无因」；想说「毫无根据」时，用「无稽之谈」「捕风捉影」「子虚乌有」就不会被误会，也不必纠结。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "宋玉《风赋》，《六臣注文选》卷十三（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E5%85%AD%E8%87%A3%E8%A8%BB%E6%96%87%E9%81%B8_(%E5%9B%9B%E9%83%A8%E5%8F%A2%E5%88%8A%E6%9C%AC)/%E5%8D%B7%E7%AC%AC%E5%8D%81%E4%B8%89"
      },
      {
        "label": "教育部《重编国语辞典修订本》——空穴来风",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%A9%BA%E7%A9%B4%E4%BE%86%E9%A2%A8"
      },
      {
        "label": "宋奇霞，《现代语文》2020年第8期 —— 《现代汉语词典》“空穴来风”释义商榷",
        "url": "https://m.fx361.com/news/2020/1215/7342152.html"
      }
    ],
    "related": [
      "word-shoudang-qichong"
    ]
  },
  {
    "id": "word-chaqiang-renyi",
    "category": "word",
    "belief": "「差强人意」就是不太令人满意、差劲",
    "truth": "「差强人意」原是夸奖：「差」是「略、稍」，「强」是「振奋」，本指很能振奋人心；后来才演变成「大体上还算令人满意」。",
    "detail": "典故在《后汉书·吴汉传》：光武帝派人去看大司马吴汉在做什么，回报说他正在修整战争器具，光武帝感叹道：「吴公差强人意，隐若一敌国矣。」这里的「差」读 chā，意思是「略微、尚」；「强人意」是「使人意气振奋」。可见这是皇帝对一位将领的称许，不是挑剔。\n\n后世用这个词，逐渐滑向「还算能让人满意」，并常被理解成「不太满意」。教育部《重编国语辞典修订本》对此的处理很直接：「本指非常振奋人心。后来指大体上尚能令人勉强满意。」——也就是承认了词义的流变，而没有把「不满意」当作词义。因此「勉强合格」的用法已经是辞书认可的，而「差劲、令人失望」则不在其中。\n\n语言学界也把它当作一个正在发生的变化来观察：朱庆之在2011年的论文《从「差强人意」到「强差人意」》中，用语料和网络材料记录了这一短时间内的词义与词形变异。",
    "origin": "「差」字最常见的意思是「差劲、不好」（chà），读者一看到「差强」，自然联想成「差、不强」，于是把整个词读成「不太行」。读音 chā 与「略」的古义渐渐不为人知，词义就这样被重新解释了。",
    "instead": "想说「还算过得去」，用「差强人意」是辞书认可的；想说「很不理想」，用「不尽如人意」「差点意思」「不及预期」更稳妥，避免被只懂古义的读者看成夸奖。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《后汉书·吴汉传》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E5%BE%8C%E6%BC%A2%E6%9B%B8/%E5%8D%B718"
      },
      {
        "label": "教育部《重编国语辞典修订本》——差强人意",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%B7%AE%E5%BC%B7%E4%BA%BA%E6%84%8F"
      },
      {
        "label": "朱庆之，《从「差强人意」到「强差人意」：对一个正在发生的语言变异实例的初步观察》，《澳门语言文化研究2011》，澳门理工学院 2012",
        "url": "https://repository.eduhk.hk/en/publications/%E5%BE%9E%E5%B7%AE%E5%BC%B7%E4%BA%BA%E6%84%8F%E5%88%B0%E5%BC%B7%E5%B7%AE%E4%BA%BA%E6%84%8F%E5%B0%8D%E4%B8%80%E5%80%8B%E6%AD%A3%E5%9C%A8%E7%99%BC%E7%94%9F%E7%9A%84%E8%AA%9E%E8%A8%80%E8%AE%8A%E7%95%B0%E5%AF%A6%E4%BE%8B%E7%9A%84%E5%88%9D%E6%AD%A5%E8%A7%80%E5%AF%9F/"
      }
    ],
    "related": [
      "word-zhishou-kere"
    ]
  },
  {
    "id": "word-shoudang-qichong",
    "category": "word",
    "belief": "「首当其冲」就是冲在最前面、带头冲锋",
    "truth": "「首当其冲」指处在要冲的位置、最先承受冲击或灾难，是被动的，不是主动带头。",
    "detail": "「冲」（衝）指交通要道、四面受敌的位置，「当其冲」就是正对着冲击而来的方向。早期用例见于《汉书·五行志》引刘向的话：「郑以小国摄乎晋楚之间，重以彊吴，郑当其冲，不能修德，将斗三国，以自危亡。」——郑国夹在大国之间，正处在要冲，首当其冲的是它。\n\n教育部《重编国语辞典修订本》的释义是：「最先受到攻击，或首先遭遇灾难」，例句是「夹在中间的城镇首当其冲，遭受双方炮火猛烈轰击」。可见辞书目前并没有收入「第一个冲上去」这个新义项，用在「他首当其冲，带头完成任务」这类主动场景里，仍会被读者看成用错。\n\n不过这个误读很好理解：「冲」字今天最常见的意思就是「向前冲」，「首」是「第一」，字面拼起来就是「第一个冲」。至于辞书将来是否会收新义，目前本站没有查到官方说法，不好预判。",
    "origin": "「冲」由名词「要冲」变成现代人熟悉的动词「冲刺、冲锋」后，成语里的意思被重新理解为「带头冲」。新闻和口语里这种用法不少，所以它成了常被点名的易错词之一。",
    "instead": "表示「最先受到影响」时放心用：「物价上涨，低收入家庭首当其冲」。要表达主动带头，可以说「冲锋在前」「率先垂范」「一马当先」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《汉书·五行志》刘向语（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E6%BC%A2%E6%9B%B8/%E5%8D%B7027%E4%B8%8B%E4%B9%8B%E4%B8%8B"
      },
      {
        "label": "教育部《重编国语辞典修订本》——首当其冲",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E9%A6%96%E7%95%B6%E5%85%B6%E8%A1%9D"
      }
    ],
    "related": [
      "word-kongxue-laifeng"
    ]
  },
  {
    "id": "word-qiyue-liuhuo",
    "category": "word",
    "belief": "「七月流火」是说七月天气像火一样炎热",
    "truth": "「七月流火」的「火」是一颗星（大火），「流」是向西下落——原是说暑热将退、天气转凉。",
    "detail": "出处是《诗经·豳风·七月》开篇：「七月流火，九月授衣。」按王力先生在《为什么学习古代汉语要学点天文学》里的说法，这里的「火」指心宿，也叫大火；「流」是它向西下行。他指出这一句过去一直没有得到准确解释，直到戴震用岁差原理推算，才讲清楚：周代的大火星在夏历六月黄昏位居正南天空最高处，到了七月就向西偏下了。\n\n所以这句诗的意思是：看到大火星西沉，知道暑热将退，再过两个月（九月）就要发冬衣了。诗里的节候是秋天将至，而不是盛夏。\n\n至于今天很多人把它写成「七月流火，酷暑难耐」，这是望文生义的结果。教育部《重编国语辞典修订本》里查「七月流火」，检索结果是0条，也就是该辞典并没有收这个词条；本站没有查到《现代汉语词典》对它的处理，不下结论。可以确定的是：就诗的原意而言，它说的是转凉。",
    "origin": "「流火」二字单独拿出来，很容易被理解成「像流动的火一样热」；每年夏天，「七月流火」又恰好在公历七月、天气最热的时候被用来形容酷暑，于是望文生义的用法年年重演。",
    "instead": "想写酷暑，用「酷暑难耐」「流金铄石」「暑气蒸腾」；想引《诗经》，可以说「七月流火」来表示「暑热将尽、秋意将至」，注意农历七月（多在公历8月中后）。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《诗经·豳风·七月》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E8%A9%A9%E7%B6%93/%E4%B8%83%E6%9C%88"
      },
      {
        "label": "王力，《为什么学习古代汉语要学点天文学》，《中国古代文化史讲座》，中央电大出版社 1984（爱思想转载）",
        "url": "https://www.aisixiang.com/data/164341.html"
      }
    ],
    "related": [
      "word-doukou-nianhua"
    ]
  },
  {
    "id": "word-bukan-zhilun",
    "category": "word",
    "belief": "「不刊之论」是不能刊登、见不得光的言论",
    "truth": "「刊」在这里是「削改」，不刊之论是指无可改易、不可磨灭的精当之论，是极高的赞誉。",
    "detail": "古人把字写在竹简上，错了就用刀削去再改，这个动作叫「刊」。「不刊」就是「不可削改」。教育部《重编国语辞典修订本》收了「不刊」，释义为「不可刊削。指无可改易、不可磨灭」，并列出两处古例：杜预《春秋左氏传序》说经是「不刊之书也」，刘勰《文心雕龙·宗经》说经是「恒久之至道，不刊之鸿教也」。「不刊之论」一条的释义则是「确凿不移、识见超拔不可磨灭的言论」。\n\n现代人最熟悉的「刊」是「刊登、刊物」，所以看到「不刊」很容易理解成「不予刊登」，把一句夸奖读成了封杀。这是一种望文生义的误读，对「刊」字的古义陌生就会如此，并不是什么不学无术。\n\n本站没有查到辞书为这一误读增设义项，目前各处释义仍是「不可磨灭」的褒义。另外也不宜把它说成「绝对正确」：古人用它形容的是经典那种不容随意改动的地位，今天用来称赞一个观点时，留几分余地更稳妥。",
    "origin": "「刊」字今天的主流义项是「出版、刊登」，古义「削除、修改」已经很少在日常中出现，成语里这层意思就被「隔」住了。报刊、刊物这些词又强化了「刊＝发表」的联想。",
    "instead": "夸一个观点说得透、改不动，可以用「不刊之论」；若想表达「不能发表」，说「不宜刊登」「不予刊发」就行。写作时若担心读者误解，也可换成「不易之论」「定论」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "教育部《重编国语辞典修订本》——不刊",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=20780"
      },
      {
        "label": "教育部《重编国语辞典修订本》——不刊之论",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=20782"
      },
      {
        "label": "刘勰，《文心雕龙·宗经》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E6%96%87%E5%BF%83%E9%9B%95%E9%BE%8D/%E5%AE%97%E7%B6%93"
      }
    ],
    "related": [
      "word-wen-bu-jiadian"
    ]
  },
  {
    "id": "word-zhishou-kere",
    "category": "word",
    "belief": "「炙手可热」是形容东西或人气很旺、很受欢迎",
    "truth": "「炙手可热」原指权势大到让人不敢靠近，是讽刺权贵的话；后来才被用来形容很受欢迎。",
    "detail": "出处是杜甫的《丽人行》，诗写长安春游的权贵之家，结尾几句是：「炙手可热势绝伦，慎莫近前丞相嗔。」手靠近就被烫着，说的是那份气焰灼人，劝人别走近，免得惹恼丞相。这里的「热」是气焰，是带着讥讽的。\n\n教育部《重编国语辞典修订本》的释义是：「手一靠近就觉得很热。比喻地位尊贵，势焰炽盛。」并引了杜甫和明代高明的例子，没有收「很受欢迎」这一义。本站没有查到《现代汉语词典》在这条上的处理，不作断言。\n\n不过，今天媒体上说「炙手可热的新股」「炙手可热的新星」十分常见，意思是「抢手、热门」。语言在这里已经走了很远：贬义的「势焰」成了中性、甚至偏褒的「热门」。用它的人多数没有恶意，只是没见过诗里的上下文。",
    "origin": "「热」在现代汉语里最容易联想到「热门、火热」，「炙手」又给人「抢着要」的画面，于是「炙手可热」被读成「手都烫了还想要」，也就是特别抢手。这一读法在财经、娱乐报道里反复出现，逐渐盖过了原来的讽刺义。",
    "instead": "想形容受追捧，用「备受追捧」「供不应求」「抢手」；想形容权势逼人，用「炙手可热」「权倾一时」。在较正式的文章里，带「势焰」之意用它最稳妥。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "杜甫，《丽人行》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E9%BA%97%E4%BA%BA%E8%A1%8C"
      },
      {
        "label": "教育部《重编国语辞典修订本》——炙手可热",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%82%99%E6%89%8B%E5%8F%AF%E7%86%B1"
      }
    ],
    "related": [
      "word-chaqiang-renyi"
    ]
  },
  {
    "id": "word-meilun-meihuan",
    "category": "word",
    "belief": "「美轮美奂」可以形容任何壮丽的东西——风景、演出、音乐都行",
    "truth": "「美轮美奂」本来专指房屋高大华美，用来夸风景、演出是后来的扩展；辞书目前的释义仍只写房屋。",
    "detail": "出处是《礼记·檀弓下》：晋国的献文子新居落成，晋国的大夫们前去祝贺，张老说：「美哉轮焉，美哉奂焉，歌于斯，哭于斯，聚国族于斯。」夸的是新屋，并说在这里可以歌、可以哭、可以会聚宗族。\n\n教育部《重编国语辞典修订本》的释义是「形容房屋装饰得极为华美」，例句也是新落成的大楼。可见辞书目前给的是「房屋」这一特指，并没有把「风景」「舞台」「音乐」算进去。\n\n但在现实用法里，「美轮美奂的舞台」「美轮美奂的灯光秀」已经非常普遍，多数人是在表达「华美」，未必知道它原本是个盖房子的词。从语言演变的角度，这是常见的「泛化」：一个特指的词，被借去指一切美好的事物。是不是要承认这一义，各家辞书会有各自的节奏，这里只说明：本义确实是房屋，辞书（MOE）目前仍如此记录。",
    "origin": "「轮」「奂」两个字离开了成语后日常很少单用，读者只能从整体印象去理解——「听起来很华丽」。于是这个词从「美哉轮焉，美哉奂焉」的建筑赞语，滑成了一个通用的「华丽」形容词。",
    "instead": "夸建筑、居所，「美轮美奂」最贴合本义；夸演出、风景，可以用「绚丽多彩」「瑰丽」「如梦如幻」。想保留古雅感又不怕被挑，写成「如宫殿般美轮美奂」也会让指向清楚些。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《礼记·檀弓下》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E6%AA%80%E5%BC%93%E4%B8%8B"
      },
      {
        "label": "教育部《重编国语辞典修订本》——美轮美奂",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%BE%8E%E8%BC%AA%E7%BE%8E%E5%A5%90"
      }
    ],
    "related": [
      "word-doukou-nianhua"
    ]
  },
  {
    "id": "word-xiaoshi-liaoliao",
    "category": "word",
    "belief": "「小时了了，大未必佳」是说聪明的孩子长大后多半没出息",
    "truth": "这句话最早是一个大人当面讥讽十岁的孔融，被孔融一句话当场顶了回去；它是一句酸话，不是一条规律。",
    "detail": "《世说新语·言语》记载：孔融（字文举）十岁时随父亲到洛阳，去拜访名士李元礼。在场的陈韪后到，听人转述了孔融的机灵话，便说：「小时了了，大未必佳！」文举立刻回敬：「想君小时，必当了了！」——想来您小时候一定很聪明吧。陈韪听了「大踧踖」，很不自在。\n\n教育部《重编国语辞典修订本》收录这个词条，释义为：「人在幼年时聪明敏捷，表现优良，长大之后未必能有所成就」，语出同一处。也就是说，辞书记录的就是后世常用的意思，这一用法并没有「错」；只是原文的语境是一个大人对孩子说的挖苦，而孔融的反击恰恰指出了这句话的逻辑：照此说来，说话的人自己小时候也该是聪明的，那他现在如何？\n\n至于「聪明孩子长大是否会平庸」，这是另一个问题，这个成语不能当证据——它来自一个故事里的一句话，不来自观察或统计。",
    "origin": "这一句因为朗朗上口，又带点「别太早夸孩子」的世故，被后世截取出来单独流传。人们记住了陈韪的半句，忘了孔融的下半场，于是它从一次斗嘴变成了一条像模像样的「常理」。",
    "instead": "引用时可以连上孔融的回应，一句话讲清楚来龙去脉；想谈「早慧不等于成就」，用「早慧」「后劲」这类词比这句成语更中性。别用它当作对孩子的预言。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "刘义庆，《世说新语·言语》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E4%B8%96%E8%AA%AA%E6%96%B0%E8%AA%9E/%E8%A8%80%E8%AA%9E"
      },
      {
        "label": "教育部《重编国语辞典修订本》——小时了了，大未必佳",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%B0%8F%E6%99%82%E4%BA%86%E4%BA%86"
      }
    ],
    "related": [
      "word-jiujia-bugui"
    ]
  },
  {
    "id": "word-wusuo-buyong-qiji",
    "category": "word",
    "belief": "「无所不用其极」是干坏事时用尽一切卑劣手段",
    "truth": "这句话在《大学》里是褒义：君子在「日新」上「无处不尽其极」；用于坏事是后起的用法，辞书如今两义并收。",
    "detail": "出处是《礼记·大学》：「汤之盘铭曰：『苟日新，日日新，又日新。』康诰曰：『作新民。』诗曰：『周虽旧邦，其命惟新。』是故君子无所不用其极。」前面说的是不断自新、使人民更新，所以「无所不用其极」是说君子在这件事上处处尽力、做到极致。\n\n教育部《重编国语辞典修订本》把它列为两个义项：第一个是「没有一个地方不竭尽全力」，并引了《礼记》；第二个是「做坏事时用尽一切卑劣手段」，配了犯罪场景的例句。也就是说，辞书已经明确承认了贬义用法。\n\n后一种用法为什么会兴起？「用其极」听起来像「不择手段、走极端」，加上「无所不」，句子的力度很强，语感上更接近「不择手段」。这种由褒转贬的演变在汉语里并不少见：词的语感被语境一点点推向相反的一边。",
    "origin": "「极」常和「极端、极坏」联想，「用其极」又像「把手段用到极点」，于是原来的「尽力做到最好」，被理解成「什么手段都使得出来」。这是语感上的推测，本站没有查到专门的考证。",
    "instead": "要说「尽力」，用「竭尽全力」「不遗余力」；要说「不择手段」，用「无所不用其极」是辞书认可的现代用法。引《大学》本义时，最好在上下文里点明是「自新」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《礼记·大学》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E5%A4%A7%E5%AD%B8"
      },
      {
        "label": "教育部《重编国语辞典修订本》——无所不用其极",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%84%A1%E6%89%80%E4%B8%8D%E7%94%A8%E5%85%B6%E6%A5%B5"
      }
    ],
    "related": [
      "word-weiyan-weixing"
    ]
  },
  {
    "id": "word-wen-bu-jiadian",
    "category": "word",
    "belief": "「文不加点」是文章没有标点",
    "truth": "「文不加点」说的是下笔成文、不用涂改，「点」是涂去、点改文字；与标点符号无关。",
    "detail": "典故在《后汉书·祢衡传》：黄祖的长子黄射大宴宾客，有人献上一只鹦鹉，黄射向祢衡举杯说：「愿先生赋之，以娱嘉宾。」祢衡揽笔而作，「文无加点，辞采甚丽」。意思是一气呵成，不用改动，文采还很华美。\n\n教育部《重编国语辞典修订本》收有「文不加点」，释义为写文章流畅，不必修改，一气呵成（附《北史》《三国演义》例句），并注明也作「文无加点」。这里的「点」是古人修改文章的动作：涂抹或点去错字。\n\n误读的来源很容易理解：现代汉语里「加点」最常联想到「加标点」，而古人的文章本来也没有统一的标点。但按字义，这个成语夸的是文思敏捷，不是在说一篇文章「没断句」。",
    "origin": "「点」在今天最熟悉的含义是标点符号；古书又长期没有现代意义上的标点，两者一凑，「文不加点」就很自然地被理解成「不加标点的文章」。",
    "instead": "夸人下笔成文，可以用「文不加点」「一挥而就」「下笔成章」；若想说「没有标点」，直接说「未加标点」「无标点」即可。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《后汉书·祢衡传》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E5%BE%8C%E6%BC%A2%E6%9B%B8/%E5%8D%B780%E4%B8%8B"
      },
      {
        "label": "教育部《重编国语辞典修订本》——文不加点",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=162083"
      }
    ],
    "related": [
      "word-bukan-zhilun"
    ]
  },
  {
    "id": "word-weiyan-weixing",
    "category": "word",
    "belief": "「危言危行」是危险的言论和行为，或说得吓人、做得出格",
    "truth": "「危言危行」里的「危」是正直、端正：言行都正直不阿，是夸奖。",
    "detail": "出自《论语·宪问》：「邦有道，危言危行；邦无道，危行言孙。」意思是国家政治清明时，说话正直、做事正直；政治昏暗时，行为仍然正直，但说话要谨慎委婉（孙＝逊）。\n\n教育部《重编国语辞典修订本》的释义是「言行举止均正直不阿」，并引了《论语·宪问》和《三国志·杜畿传》：「当官不挠贵势……危言危行以处朝廷者，自明主所察也」。可见古人用这个词是称许一个人敢于直言、行为端正。\n\n误读很容易产生：今天的「危」几乎只表示「危险」，又有「危言耸听」这个常见词在前，读者就会把「危言危行」也读成「吓人的话和危险的行为」。这样一读，整个意思就拧了。",
    "origin": "「危」在日常汉语里几乎只剩「危险」一个义项，加上「危言耸听」天天出现，「危言」自然被读成「吓人的话」，把「危言危行」也拖进了这个语义圈。",
    "instead": "想表达「直言不讳、行为端正」，用「危言危行」即可，但读者不熟时建议加注或换成「正言直行」「刚正不阿」。想说吓人的话，用「危言耸听」。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《论语·宪问》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E6%86%B2%E5%95%8F%E7%AC%AC%E5%8D%81%E5%9B%9B"
      },
      {
        "label": "教育部《重编国语辞典修订本》——危言危行",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%8D%B1%E8%A8%80%E5%8D%B1%E8%A1%8C"
      }
    ],
    "related": [
      "word-wusuo-buyong-qiji"
    ]
  },
  {
    "id": "word-doukou-nianhua",
    "category": "word",
    "belief": "「豆蔻年华」泛指青春年少、二十来岁的美好年纪，男女都行",
    "truth": "「豆蔻年华」专指少女的十三四岁；出自杜牧的诗句「娉娉袅袅十三余，豆蔻梢头二月初」。",
    "detail": "杜牧《赠别二首》其一开头写道：「娉娉袅袅十三余，豆蔻梢头二月初。春风十里扬州路，卷上珠帘总不如。」诗里的少女才十三岁出头，像二月初枝头刚刚含苞的豆蔻花。后来「豆蔻」就成了少女初长成的代称。\n\n教育部《重编国语辞典修订本》的释义是：「比喻年轻少女，多指女子十三、四岁之时」，另有写法「荳蔻年华」。可见辞书对年龄和性别都有指向，但用了「多指」，留了余地。\n\n现实中，「豆蔻年华」常被拿来泛指一般的青春年少，甚至用于二十岁上下，也有用在男孩身上的。这是词语随时代泛化的普通现象；不过严格按本义说，仍是指少女的十三四岁，用在成年人身上会有些错位。本站没有查到辞书对泛化用法的专门记载。",
    "origin": "「豆蔻」听起来是一个美好、轻盈的词，「年华」又是通用词，二者合起来像一个「青春」的同义词；诗句出处和「十三余」的年龄特指，在传播中渐渐被忽略。",
    "instead": "写少女十三四岁，用「豆蔻年华」最贴切；泛指青春，可用「青春年少」「韶华」「花样年华」；写男孩不必用它。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "杜牧，《赠别二首》其一，《全唐诗》卷523（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E5%85%A8%E5%94%90%E8%A9%A9/%E5%8D%B7523"
      },
      {
        "label": "教育部《重编国语辞典修订本》——豆蔻年华",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=43437"
      }
    ],
    "related": [
      "word-meilun-meihuan",
      "word-qiyue-liuhuo"
    ]
  },
  {
    "id": "word-jiujia-bugui",
    "category": "word",
    "belief": "「久假不归」就是借了东西长期不还",
    "truth": "这是现在最通行的意思，辞书也这样收；但它出自《孟子》，原本说的是长期「借用」仁义之名而不归还。",
    "detail": "出处在《孟子·尽心上》：「尧舜，性之也；汤武，身之也；五霸，假之也。久假而不归，恶知其非有也？」尧舜的仁义出自本性，汤武是亲身践行，五霸则是「假」——借用仁义的名义。借得久了不还，怎么知道它不是他自己的呢？\n\n所以原句讲的是道德：借来的美德做久了，说不定就成了自己的。「假」是借用，借的是名义而不是东西。\n\n教育部《重编国语辞典修订本》收了「久假不归」，释义是「借用他人的东西，迟迟不还」，并同时引了《孟子》和明代《二刻拍案惊奇》的用例。这也就是说，辞书记录的正是今天最普遍的「借物不还」之义，并没有把它当作错用。这是一个很典型的词义具体化：一个讲「借名义」的抽象说法，落到了「借东西」的日常场景里。",
    "origin": "「假」在现代汉语里不再表示「借」，「久假不归」只剩字面可以读，大家就按字面理解成「借东西很久不还」；明代小说里已经有这种用法，说明这一转变不是新近的事。",
    "instead": "说借物不还，用「久假不归」是辞书认可的；说借来的名义、美德，引《孟子》时最好带上「久假而不归，恶知其非有也」整句。",
    "stakes": "harmless",
    "confidence": "strong",
    "sources": [
      {
        "label": "《孟子·尽心上》（维基文库）",
        "url": "https://zh.wikisource.org/wiki/%E5%AD%9F%E5%AD%90/%E7%9B%A1%E5%BF%83%E4%B8%8A"
      },
      {
        "label": "教育部《重编国语辞典修订本》——久假不归",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E4%B9%85%E5%81%87%E4%B8%8D%E6%AD%B8"
      }
    ],
    "related": [
      "word-xiaoshi-liaoliao"
    ]
  }
]
