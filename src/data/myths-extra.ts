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
      "origin-flat-earth-columbus"
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
      "origin-ok-zero-killed"
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
      "world-well-behaved-women"
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
      "why-comet-round-windows"
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
    ]
  }
]
