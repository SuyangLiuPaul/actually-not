/**
 * 英文版内容 —— 与 myths.ts 一一对应（测试会强制每条都有翻译）。
 * 结构字段（category / stakes / related）以 myths.ts 为准，这里只放文字。
 */
import type { MythText } from '../types'

export const MYTHS_EN: Record<string, MythText> = {
  "breakfast": {
  "belief": "Skipping breakfast is bad for you — it makes you gain weight and wrecks your stomach",
  "truth": "The weight claim is actually backwards: in controlled trials, people who skip breakfast end up slightly lighter.",
  "detail": "Meta-analyses of randomized controlled trials found that getting habitual breakfast-skippers to start eating breakfast does not make them lose weight, and getting breakfast-eaters to stop does not make them gain — on average the skippers were about 0.44 kg lighter, because the breakfast group ate about 260 kcal more per day in total. The claim that skipping breakfast slows your metabolism and puts your body into starvation mode simply did not show up in the experiments.\n\nOne caveat, to be fair: in the same studies, breakfast skippers had somewhat higher LDL cholesterol (LDL-C). So the accurate conclusion is not 'breakfast is useless' — it is that breakfast has no causal relationship with body weight.",
  "origin": "Decades of observational studies did find that breakfast eaters tend to be leaner, and that got repeated as 'breakfast helps you lose weight.' But breakfast eaters also tend to sleep better, smoke less, and exercise more — breakfast looks more like a marker of a healthy lifestyle than a cause. Cereal advertising then gave the idea a big push.",
  "instead": "Go by your own hunger. What actually affects your weight is how much you eat over the whole day, not how many meals you split it into. If skipping breakfast makes you binge at lunch, eat it. If you feel fine without it, don't force yourself.",
  "sources": [
    {
      "label": "Sievert et al., BMJ 2019 — meta-analysis of randomized trials on breakfast and weight",
      "url": "https://www.bmj.com/content/364/bmj.l42"
    },
    {
      "label": "Bonnet et al., Obesity 2020 — systematic review of skipping breakfast and body composition",
      "url": "https://onlinelibrary.wiley.com/doi/full/10.1002/oby.22791"
    }
  ]
},
  "bone-soup": {
  "belief": "Bone soup is full of calcium — the longer you simmer it and the whiter it gets, the more nourishing it is",
  "truth": "Bone soup contains pitifully little calcium. That milky white color is mostly fat.",
  "detail": "Calcium is locked into the bone's mineral structure as hydroxyapatite, and ordinary simmering temperatures cannot dissolve it out. Measured values put a bowl of bone soup at just a few milligrams of calcium per 100 ml — about the same as tap water. To get a day's worth of calcium from it, you would have to drink dozens of bowls.\n\nThe milky white color is not 'the goodness coming out' either — it is fat emulsified into tiny droplets that scatter light. The whiter the soup, the more fat it usually means. Adding vinegar does dissolve a bit of calcium, but to get a meaningful amount out, the soup would be too sour to drink.",
  "origin": "The old 'like nourishes like' logic: bones are made of calcium, so drinking bone soup must supplement calcium. It sounds plausible — it just skips the question of whether the calcium can actually dissolve.",
  "instead": "For calcium, milk, yogurt, tofu (the gypsum-set kind), dark leafy greens, and small fish eaten with the bones all beat bone soup by one or two orders of magnitude. A glass of milk has about 250 mg of calcium. Drink the soup if you like it — just treat it as soup.",
  "sources": [
    {
      "label": "Chinese Nutrition Society, Dietary Guidelines for Chinese Residents — dietary sources of calcium",
      "url": "https://www.cnsoc.org/"
    }
  ]
},
  "leftovers": {
  "belief": "Overnight dishes are full of nitrite — eating them causes cancer",
  "truth": "Promptly refrigerated leftovers have nitrite levels far below national limits. The real risk is bacteria, not cancer.",
  "detail": "Multiple organizations have tested this: leftovers refrigerated at 4°C for 24–48 hours show very slow nitrite growth, and vegetable dishes usually stay far below the 20 mg/kg national limit for pickled vegetables. On top of that, nitrite itself is not carcinogenic — it has to combine with protein breakdown products under specific conditions to form nitrosamines, which are carcinogenic, and everyday eating rarely assembles those conditions.\n\nThe key variable is not 'did it sit overnight' but 'at what temperature.' The same dish left at 25°C room temperature for 12 hours shows a clear rise in nitrite, sometimes over the limit — but by then the bigger worry is bacterial growth.",
  "origin": "Nitrite, nitrosamine, cancer — three words compressed into one slogan, with the dose and conditions edited out. Dose makes the poison; cut that step and the conclusion gets distorted.",
  "instead": "Portion, cover, and refrigerate cooked food promptly — don't wait for it to cool completely; get it in the fridge within two hours. Try to finish leafy greens in the same meal, and reheat leftover meat dishes thoroughly. Judge by smell and appearance, not by how many nights have passed.",
  "sources": [
    {
      "label": "The Paper (Pengpai News) — nitrite measurements in overnight dishes",
      "url": "https://www.thepaper.cn/newsDetail_forward_13273228"
    },
    {
      "label": "Zhejiang Online — report on the overnight-dish experiment",
      "url": "https://zjnews.zjol.com.cn/zjnews/tznews/201603/t20160316_607651.shtml"
    }
  ]
},
  "msg": {
  "belief": "Too much MSG is bad for you — it makes your hair fall out and leaves you thirsty",
  "truth": "Decades of double-blind trials have failed to reproduce 'MSG sensitivity,' and the glutamate in MSG is the same molecule as the glutamate in tomatoes and cheese.",
  "detail": "Under double-blind conditions — where subjects don't know whether they're eating MSG or a placebo — the supposed headaches, flushing, and palpitations cannot be reliably reproduced. Food safety agencies in multiple countries (including the FDA, the EU's EFSA, and the joint FAO/WHO expert committee) have reviewed MSG and classify it as generally recognized as safe.\n\nGlutamate itself occurs widely in tomatoes, kelp, Parmesan cheese, and breast milk. Your body cannot tell whether a glutamate molecule came from kelp or from a fermentation tank.",
  "origin": "In 1968, the New England Journal of Medicine published a reader's letter describing feeling unwell after eating at Chinese restaurants, speculating that MSG might be the cause. That letter gave rise to the term 'Chinese restaurant syndrome,' which spread widely in the media — and half a century of controlled trials since have not supported it. The label itself carried the era's prejudice against Chinese restaurants.",
  "instead": "Use it normally. MSG has about one-third the sodium of table salt, so swapping some salt for MSG can actually lower total sodium intake. What you really want to control is total sodium, not MSG.",
  "sources": [
    {
      "label": "FDA — Questions and Answers on Monosodium Glutamate (MSG)",
      "url": "https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg"
    }
  ]
},
  "collagen": {
  "belief": "Eating pig's feet, bird's nest, or tremella soup replenishes collagen and improves your skin",
  "truth": "Collagen gets broken down into amino acids in your stomach. Your body does not deliver it to your face intact.",
  "detail": "Collagen is a large protein molecule that cannot cross the intestinal wall whole. Digestive enzymes chop it into amino acids and small peptides, which enter the body's shared amino acid pool and get rebuilt into whatever the body prioritizes — maybe muscle, maybe enzymes. You don't get to specify 'please send this to my smile lines.'\n\nTo be fair: some recent trials on hydrolyzed collagen peptides have reported small improvements in skin hydration and elasticity, possibly through signaling effects of specific small peptides. But those involve specific doses of supplements, not stewed pig's feet — and many of these studies are industry-funded with small samples, so the conclusions are far from solid.",
  "origin": "More 'like nourishes like': skin contains collagen, so eat collagen. The name matches; the metabolism got skipped.",
  "instead": "What skin fears most is UV. Sunscreen, hats, not smoking, and enough sleep all have far stronger evidence than any oral collagen. If you enjoy pig's feet, eat them — but what they mostly give you is fat.",
  "sources": [
    {
      "label": "Harvard Health — Considering collagen drinks and supplements?",
      "url": "https://www.health.harvard.edu/blog/considering-collagen-drinks-and-supplements-202304122911"
    }
  ]
},
  "eight-glasses": {
  "belief": "You must drink eight glasses of water a day",
  "truth": "The 'eight glasses' number has no experimental basis — and it leaves out the water in your food.",
  "detail": "The advice is often traced to a 1945 US National Research Council document recommending about 2.5 liters of water per day for adults — but the very next sentence said: 'Most of this quantity is contained in prepared foods.' That second half got lost in transmission, leaving a bare number behind.\n\nThe human body has a quite precise osmotic regulation system, and thirst is its output signal. Unless you're doing heavy labor in heat, running a fever, having diarrhea, or under specific medical instructions, drinking to thirst is enough. Going the other way — chugging huge amounts of water in a short time and diluting blood sodium — can be fatal (exercise-associated hyponatremia).",
  "origin": "A truncated quotation, plus decades of the bottled-water industry happily going along with it.",
  "instead": "Drink when you're thirsty. If you want a rough self-check, look at urine color: pale yellow means you're hydrated, dark yellow means drink up. Soup, porridge, fruit, tea, and coffee all count.",
  "sources": [
    {
      "label": "Valtin, Am J Physiol 2002 — 'Drink at least eight glasses of water a day.' Really?",
      "url": "https://journals.physiology.org/doi/full/10.1152/ajpregu.00365.2002"
    }
  ]
},
  "coffee-dehydrate": {
  "belief": "Coffee and tea are diuretics — the more you drink, the more dehydrated you get, so they don't count toward your water intake",
  "truth": "A moderate amount of coffee is net hydrating — the water it brings in far exceeds the little extra you pee out.",
  "detail": "Caffeine does have a mild diuretic effect, but a cup of coffee is more than 98% water. Controlled trials have directly compared people drinking coffee against people drinking the same amount of plain water and found no significant difference in whole-day hydration status. Habitual coffee drinkers also develop tolerance to caffeine's diuretic effect.",
  "origin": "Equating 'has a diuretic effect' with 'dehydrates you' skips the net-balance step.",
  "instead": "Coffee and tea count normally toward your daily fluid intake. The thing actually worth watching is drinking them too late and hurting your sleep — caffeine's half-life is about 5 hours.",
  "sources": [
    {
      "label": "Killer et al., PLoS ONE 2014 — controlled trial of coffee vs. water for hydration",
      "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0084154"
    }
  ]
},
  "spicy-ulcer": {
  "belief": "Eating spicy food gives you stomach ulcers",
  "truth": "The vast majority of stomach ulcers are caused by H. pylori infection or painkillers — not chili peppers.",
  "detail": "In the 1980s, Australians Barry Marshall and Robin Warren proposed that stomach ulcers are caused by Helicobacter pylori. The mainstream view at the time blamed stress and spicy food, and nobody believed them — so Marshall drank a petri dish of the bacteria and gave himself gastritis. The two received the 2005 Nobel Prize in Physiology or Medicine.\n\nThe two known leading causes today are H. pylori infection and long-term use of NSAIDs (ibuprofen, aspirin, and the like). Capsaicin can irritate an ulcer that already exists and make you miserable, but it does not create ulcers.",
  "origin": "'My stomach hurts after eating spicy food' is a real experience — but that's irritation of symptoms, not proof it caused the damage. Correlation got read as causation.",
  "instead": "If you have recurring upper-abdominal pain, bloating, or black stools, get tested for H. pylori (the breath test is easy) instead of just giving up spicy food. People on long-term painkillers should be especially careful.",
  "sources": [
    {
      "label": "NobelPrize.org — The 2005 Nobel Prize in Physiology or Medicine",
      "url": "https://www.nobelprize.org/prizes/medicine/2005/summary/"
    }
  ]
},
  "moldy-fruit": {
  "belief": "If a fruit has one small rotten spot, just cut off the bad part and eat the rest",
  "truth": "This one is backwards — mold toxins have already spread beyond what you can see.",
  "detail": "The fuzzy patch you see is just the mold's 'fruit'; its filaments have already spread through the soft, juicy flesh, and toxins like patulin spread with them. Studies have detected toxins in the apparently 'good' flesh well beyond the visible mold. Patulin is heat-stable, so cooking doesn't help.\n\nThere is one exception: hard foods. Hard cheese, carrots, cabbage — things with low moisture and dense structure — don't let mold penetrate easily, so you can cut off the moldy spot plus 2–3 cm around it and keep eating. Soft foods (fruit, bread, soft cheese, jam) go in the trash whole.",
  "origin": "This one isn't old-wives' wisdom — it's the 'if I can't see it, it isn't there' instinct, plus not wanting to waste food.",
  "instead": "If a soft food grows mold, throw the whole thing out. For hard foods, cut off the moldy spot plus 2–3 cm around it, and don't let the knife touch the mold.",
  "sources": [
    {
      "label": "USDA — Molds on Food: Are They Dangerous?",
      "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/molds-food-are-they-dangerous"
    }
  ]
},
  "honey-crystal": {
  "belief": "If honey crystallizes, it's been cut with sugar — it's fake",
  "truth": "Crystallization is a perfectly normal physical property of natural honey. It says nothing about authenticity.",
  "detail": "Honey is a supersaturated solution of glucose and fructose. Glucose has lower solubility, so it naturally precipitates into crystals as the temperature drops. How fast it crystallizes depends on the nectar source — rapeseed honey and linden honey are glucose-heavy and crystallize easily; acacia honey and jujube honey are fructose-heavy and can stay liquid for years.\n\nSo 'never crystallizes' doesn't prove it's fake either. To re-liquefy crystallized honey, set the jar in warm water around 40°C and let it melt slowly — don't heat it directly or microwave it.",
  "origin": "The assumption that 'all-natural means crystal-clear forever' — which is exactly the opposite of the facts.",
  "instead": "Judge by the type of honey, not by crystallization. Telling real from fake honey takes lab testing; eyeballing it is basically unreliable.",
  "sources": [
    {
      "label": "National Honey Board — Honey crystallization",
      "url": "https://honey.com/"
    }
  ]
},
  "microwave": {
  "belief": "Microwave ovens give off radiation — microwaved food causes cancer and loses all its nutrients",
  "truth": "Microwaves are non-ionizing radiation. All they do is spin water molecules to generate heat — they can't change the chemical structure of food.",
  "detail": "The word 'radiation' covers a huge swath of the spectrum, from radio waves to gamma rays. The kind that can break chemical bonds and damage DNA is ionizing radiation (X-rays, gamma rays). Microwaves carry orders of magnitude less energy than visible light; all they do is make water molecules vibrate rapidly and heat up through friction — fundamentally no different from roasting or boiling, just a different heating method.\n\nOn nutrition, microwaving often comes out ahead: short heating times and little added water mean water-soluble vitamins (vitamin C, some B vitamins) are usually lost less than with prolonged boiling.",
  "origin": "In everyday Chinese usage, 'radiation' (fushe) is practically synonymous with nuclear radiation — one word tying together two completely different physical phenomena.",
  "instead": "Use it normally. What deserves attention is the container — use vessels labeled microwave-safe, and avoid ordinary plastic containers and plastic wrap touching hot food directly.",
  "sources": [
    {
      "label": "FDA — Microwave Ovens: radiation types and safety",
      "url": "https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens"
    }
  ]
},
  "soup-nutrition": {
  "belief": "Simmer a soup long enough and all the goodness ends up in the broth — drinking the soup is more nutritious than eating the meat",
  "truth": "The protein basically stays in the meat. What dissolves into the soup is mostly water, fat, purines, and free amino acids.",
  "detail": "Measurements show that after long simmering, only a small fraction of the meat's protein dissolves into the broth — the bulk stays in the meat itself. Soup tastes good because free amino acids, nucleotides, and fat dissolve out; those are responsible for flavor, not for nutritional density.\n\nAlso, meat broth is not low in purines, so people with gout or high uric acid need to be careful — and rich soups are often very high in sodium.",
  "origin": "The intuition that 'rich, flavorful soup means the nutrition all came out.' Flavor intensity and nutrient density are two different things.",
  "instead": "Eat the soup and the meat together. If the meat feels dry and tough, that's a texture issue — the nutrition didn't run away.",
  "sources": [
    {
      "label": "Chinese Nutrition Society — scientific research report on the dietary guidelines",
      "url": "https://www.cnsoc.org/"
    }
  ]
},
  "egg-yolk": {
  "belief": "Egg yolks are high in cholesterol — no more than one egg a day",
  "truth": "For most people, the cholesterol you eat has a limited effect on the cholesterol in your blood.",
  "detail": "Your liver synthesizes far more cholesterol each day than a typical diet provides, and it automatically adjusts production based on how much comes in from food. Based on this evidence, the 2015–2020 US Dietary Guidelines dropped the hard cap of 'no more than 300 mg of cholesterol per day.'\n\nOne caveat: about 15–25% of people are 'hyper-responders,' for whom dietary cholesterol has a more noticeable effect on blood lipids, and the research on people with diabetes is also more complicated. What generally matters more for blood LDL is saturated and trans fat — in other words, the pat of butter you fry the egg in, not the yolk itself.",
  "origin": "Early research linked high blood cholesterol to cardiovascular disease, so people reasoned straight to 'eat less cholesterol-rich food.' The middle step — whether what you eat actually ends up in your blood — wasn't verified at the time.",
  "instead": "Healthy people can eat one to two whole eggs a day without a problem. If you already have cardiovascular disease or abnormal lipids, follow your doctor's advice. Don't eat only the whites to dodge cholesterol — the yolk holds the choline, lutein, and most of the vitamins.",
  "sources": [
    {
      "label": "US Dietary Guidelines 2015–2020 — removal of the cholesterol intake limit",
      "url": "https://health.gov/our-work/nutrition-physical-activity/dietary-guidelines/previous-dietary-guidelines/2015"
    }
  ]
},
  "five-second": {
  "belief": "Food dropped on the floor is fine to eat if you pick it up within five seconds",
  "truth": "Bacteria transfer the instant food makes contact. They don't check the stopwatch.",
  "detail": "Rutgers University ran a systematic experiment using four surfaces (stainless steel, tile, wood, carpet) and four foods, testing contact times from 1 to 300 seconds. The conclusion: time does matter — the longer it sits, the more transfers — but transfer begins in the very first moment of contact. There is no 'five-second safety window.'\n\nWhat matters more is actually the food's moisture content and the floor material. Watermelon slices picked up the most bacteria, gummy candy the least; carpet had a lower transfer rate than tile.",
  "origin": "This is a rule everyone wants to believe, so nobody bothers to test it. Its function is to give 'I'm going to eat this anyway' a respectable excuse.",
  "instead": "It depends where it fell. A cookie dropped on your own freshly mopped floor is very low risk; a floor in a public place — toss it.",
  "sources": [
    {
      "label": "Miranda & Schaffner, Appl Environ Microbiol 2016 — the five-second rule experiment",
      "url": "https://journals.asm.org/doi/10.1128/AEM.01838-16"
    }
  ]
},
  "late-eating": {
  "belief": "Eating after 8 p.m. will definitely make you fat — anything eaten before bed turns straight into fat",
  "truth": "What determines weight gain is your total daily calories, not the clock.",
  "detail": "Fat doesn't switch to a different set of metabolic rules after dark. In controlled studies with the same total calories, assigning the same food to different times of day produced very little difference in weight change.\n\nBut circadian rhythm deserves a footnote here: some studies have found that the same calories eaten at night produce a worse post-meal blood glucose response and lower satiety, and people who eat late at night often eat more overall across the day. So the accurate version is — eating late doesn't directly turn into fat, but it makes it easier to eat more and sleep worse.",
  "origin": "'You're not burning calories at night, so it all gets stored' — but your basal metabolism keeps running while you sleep, and it accounts for the bulk of the day's energy expenditure.",
  "instead": "Focus on the daily total. If you're genuinely hungry, eat something — protein plus fiber — just don't stuff yourself to the point it hurts your sleep. People with reflux should avoid eating 2–3 hours before bed.",
  "sources": [
    {
      "label": "Vujović et al., Cell Metabolism 2022 — effects of late eating on energy expenditure and appetite regulation"
    }
  ]
},
  "porridge-stomach": {
  "belief": "If your stomach is acting up, drink congee (rice porridge) to nourish it back to health",
  "truth": "Congee is easy to digest, but it doesn't repair your stomach — and for people with reflux it can backfire.",
  "detail": "The very idea of 'nourishing the stomach' is vague. Congee is indeed easy to digest and lightens the load on a stomach in an acute phase, so it's fine short-term. But it's a high-glycemic, low-protein liquid; making it your staple long-term makes protein deficiency likely.\n\nFor people with gastroesophageal reflux, a large volume of liquid increases the volume of stomach contents and makes reflux more likely; congee also needs little chewing, skipping the digestive preparation that saliva and chewing provide.",
  "origin": "Equating 'easy to digest' with 'therapeutic.' The first is true; the second has no evidence.",
  "instead": "Stomach problems need a diagnosis — H. pylori, medication irritation, and reflux each have their own treatment. Eating regular meals, avoiding scalding-hot or overly spicy food, and cutting smoking and alcohol do more than switching to congee.",
  "sources": [
    {
      "label": "Mayo Clinic — GERD lifestyle management",
      "url": "https://www.mayoclinic.org/diseases-conditions/gerd/diagnosis-treatment/drc-20361959"
    }
  ]
},
  "detox": {
  "belief": "You need regular detoxes to flush out accumulated waste — juice fasts to purge the gunk from your body",
  "truth": "Your liver and kidneys do this 24 hours a day. They don't need help from juice.",
  "detail": "The 'toxins' in this kind of marketing are never named — ask which toxin it is and what metric shows how much was expelled, and you generally won't get an answer. The body's detoxification systems (the liver's two-phase metabolism, kidney filtration, intestinal excretion, lungs, skin) run continuously.\n\n'Impacted stool' (sujiubian, the idea of old fecal matter caked in the colon) doesn't exist anatomically; the colon does not accumulate kilograms of ancient residue. Colonic irrigation and heavy laxative doses can instead cause electrolyte imbalances and dehydration, and in severe cases damage the gut flora and mucosa.",
  "origin": "The 19th century had a popular 'autointoxication' theory holding that decaying intestinal contents poison the whole body — some doctors even removed colons over it. The theory was debunked long ago, but the image of 'a toxic body that needs cleansing' survived and became a superb marketing frame.",
  "instead": "To lighten the load on your liver and kidneys, it's the same old three: drink less alcohol, don't take sketchy supplements, and eat enough fiber and water. If you genuinely suspect poisoning (heavy metals, medications), go to a hospital and get tested.",
  "sources": [
    {
      "label": "NIH NCCIH — 'Detoxes' and 'Cleanses': What You Need To Know",
      "url": "https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know"
    }
  ]
},
  "swallowed-gum": {
  "belief": "Swallowed gum sticks to your intestines and takes seven years to pass",
  "truth": "The gum base really can't be digested — but your digestive tract's solution is to push it out, and it's gone in your stool within days.",
  "detail": "Gum base resists acid and enzymes, which is exactly why gum stays chewable for so long. But 'indigestible' doesn't mean 'can't get out': the digestive tract handles everything that can be swallowed but not digested the same way — peristalsis pushes it along and out with the rest of the food residue. That process is measured in days, nowhere near years.\n\nThe exception worth noting: swallowing large amounts of gum in a short time, especially by small children, has produced extremely rare case reports of it tangling with other indigestible material into a bezoar that causes a blockage. In other words, an occasional accidental swallow is completely fine; swallowing gum like candy is not.",
  "origin": "A classic 'scare the kids so they stop swallowing things' line, and the precision of 'seven years' makes it sound authoritative. It probably stitched together the true fact 'gum base is indigestible' with the imagined 'so it stays inside you for ages.'",
  "instead": "When you're done chewing, wrap it in a tissue and throw it away. If a kid swallows one piece by accident, don't panic — and definitely don't induce vomiting. By the time the quantity is worth worrying about, you'd have already noticed the kid eating gum like meals.",
  "sources": [
    {
      "label": "Nemours KidsHealth — What If I Swallow Gum?",
      "url": "https://kidshealth.org/en/kids/swallowed-gum.html"
    },
    {
      "label": "Mayo Clinic — Swallowing gum: Is it harmful? (expert Q&A)"
    }
  ]
},
  "sugar-hyper": {
  "belief": "Sugar makes kids hyper — bouncing off the walls and impossible to control",
  "truth": "In double-blind trials, sugar has no causal link to behavioral excitement — what changes usually isn't the kid, it's the adults' perception.",
  "detail": "In 1995, JAMA (the Journal of the American Medical Association) pooled every adequately designed controlled trial to date: one group of kids ate sugar, another ate an indistinguishable placebo, and behavior was measured under double-blind conditions. The conclusion: sugar had no detectable effect on activity or hyperactivity.\n\nEven more telling are the 'expectancy experiments': researchers told mothers their child had just eaten sugar (it was actually a placebo), and the mothers promptly rated their kids as more hyper — and on video they could be seen hovering closer and controlling them more tightly. The sugar hadn't changed; the observer had.",
  "origin": "Birthday parties, sweet drinks, and excited kids always show up together, and the blame lands on the most visible suspect — sugar — even though the party itself is exciting enough. The causal story also fits nicely with the 'natural good, refined bad' intuition.",
  "instead": "The reasons to limit sugar are cavities and total calories, not fear of hyperactivity. If your kid really does get wild after sweets, first look at the occasion, their sleep, and how excited they actually were — then decide whether to skip the next birthday party.",
  "sources": [
    {
      "label": "Wolraich et al., JAMA 1995 — meta-analysis of sugar and children's behavior and cognition",
      "url": "https://pubmed.ncbi.nlm.nih.gov/7474248/"
    },
    {
      "label": "Hoover & Milich, J Abnorm Child Psychol 1994 — the maternal expectancy effect experiment"
    }
  ]
},
  "carrot-vision": {
  "belief": "Eat lots of carrots for good eyesight — you'll even see better at night",
  "truth": "Vitamin A deficiency does cause night blindness, but if you're not deficient, no amount of carrots will give you night-vision goggles.",
  "detail": "Carrots are rich in beta-carotene, the raw material for vitamin A, and vitamin A is an essential component of the light-sensing pigments in the retina. Severe vitamin A deficiency does cause night blindness and even blindness — that part is true. But the logic stops there: for someone with normal intake, extra supplementation does not improve vision, just as topping off a full gas tank doesn't make the car go faster.\n\nThe real consequence of eating too much beta-carotene is carotenemia: your skin turns yellow, most noticeably on the palms and soles. It's harmless and fades when you stop — but what you get is 'looking yellower,' not 'seeing clearer.'",
  "origin": "During WWII, the British Royal Air Force equipped planes with airborne radar and their nighttime interception success soared. To hide the radar's existence, the Brits publicly claimed their pilots had gained night vision by eating huge quantities of carrots, complete with propaganda posters. The campaign worked too well — for decades after the war, parents around the world used it to push carrots on their kids.",
  "instead": "Carrots are a good vegetable; just eat them normally. If your vision is blurry, get your eyes tested — the common causes of poor night vision are an outdated prescription, uncorrected astigmatism, and early cataracts, none of which carrots can help.",
  "sources": [
    {
      "label": "Smithsonian Magazine 2013 — A WWII Propaganda Campaign Popularized the Myth That Carrots Help You See in the Dark",
      "url": "https://www.smithsonianmag.com/arts-culture/a-wwii-propaganda-campaign-popularized-the-myth-that-carrots-help-you-see-in-the-dark-28812484/"
    }
  ]
},
  "juice-fruit": {
  "belief": "Fresh-squeezed juice is the same as eating fruit — and even better absorbed",
  "truth": "Not even close — juicing throws away the fiber and the fullness, and leaves you a glass of free sugars.",
  "detail": "In a whole fruit, the sugar is wrapped in cell walls and absorbed slowly; once it's juiced, the sugar is released and falls into the WHO's 'free sugars' category — the same class as added sugar in soft drinks, and just as much in need of limiting. Juice spikes blood sugar almost like a sugary drink, liquid doesn't fill you up, and one glass can hold the sugar of two or three fruits while you still feel virtuous.\n\nThe American Academy of Pediatrics' 2017 recommendation puts it bluntly: no juice at all for infants under 1 year, and strict limits for older kids — eating the fruit directly is always better. One caveat: juice is not poison, and an occasional glass is fine; the problem is treating it as a health food and drinking it every day.",
  "origin": "Juice has been sold as a health food since day one — 'concentrated orchard essence' sounds classier than 'sugar water.' Homemade juice adds a 'no additives' halo, but no additives doesn't change the fact that the sugar has been released.",
  "instead": "Eat the fruit, drink water. If you really want juice, keep it to a small glass (about 150 ml) — and don't count it as your fruit serving.",
  "sources": [
    {
      "label": "Heyman & Abrams, Pediatrics 2017 — American Academy of Pediatrics fruit juice recommendations",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28562300/"
    },
    {
      "label": "WHO — free sugars definition includes fruit juice (Guideline: Sugars intake, 2015)"
    }
  ]
},
  "water-meal": {
  "belief": "Drinking water with meals dilutes your stomach acid and hurts digestion",
  "truth": "Your digestive system isn't that fragile — drinking water with a meal doesn't hinder digestion, and sometimes it helps a little.",
  "detail": "The idea that 'diluted gastric juice can't digest' underestimates the stomach's ability to regulate itself: acid secretion adjusts dynamically as you eat, and the effect of one glass of water on stomach acidity is something the body compensates for without breaking a sweat. A Mayo Clinic expert Q&A says it plainly: drinking water with meals does not interfere with digestion — if anything it helps soften food and makes swallowing easier.\n\nOne caveat: people with gastroesophageal reflux can feel bloated and get worse reflux if they chug a lot of water during a meal — but that's a volume problem, not 'diluted stomach acid.' People who have had bariatric surgery have their own specific medical instructions and are outside the scope of this one.",
  "origin": "This line probably comes from the same table-manners package as 'eat it while it's hot' and 'don't talk during meals' — the original point was mostly to get kids to focus on eating, and somewhere along the way it hardened into a physiological claim.",
  "instead": "Drink if you want to; normal amounts are fine. What actually deserves attention is washing meals down with sugary drinks — the calories in that glass are the real deal.",
  "sources": [
    {
      "label": "Mayo Clinic — Water after meals: Does it disturb digestion?",
      "url": "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/water-after-meals/faq-20058394"
    }
  ]
},
  "wet-hair": {
  "belief": "If you don't blow-dry your hair after washing it, dampness gets in and you'll get headaches and catch a cold",
  "truth": "Colds are caused by viruses. Wet hair can make you uncomfortable, but it can't conjure up a virus.",
  "detail": "Britain's Common Cold Research Unit ran a classic experiment: volunteers were chilled and soaked, then their cold rates were compared with a warm, dry group. There was no difference — unless they were already carrying a virus. In other words, getting chilled might make an infection that's already incubating show symptoms sooner, but it doesn't create the infection.\n\nAs for 'shīqì' (dampness), that's a theoretical concept from traditional Chinese medicine. It doesn't belong to the same framework as modern etiology, and there's no measurable quantity behind it. Sleeping with wet hair does have real problems, just different ones: a chronically damp scalp encourages Malassezia yeast and can worsen seborrheic dermatitis, and wet hair rubbing against a pillow breaks more easily.",
  "origin": "Colds really are more common in winter, and winter is also when hair dries slowly and you're most likely to get chilled. Two things happening at once got read as one causing the other. The more likely reasons are indoor crowding, poor ventilation, and dry air helping viruses spread.",
  "instead": "Blow-dry if you like — for comfort and hair care, not to prevent colds. What actually prevents colds is washing your hands, ventilating rooms, touching your face less, and getting your shots on schedule.",
  "sources": [
    {
      "label": "Mayo Clinic Health System — Can wet hair make you sick?",
      "url": "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/can-wet-hair-make-you-sick"
    },
    {
      "label": "Eccles, review on the common cold (PMC)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10324571/"
    }
  ]
},
  "knuckle-crack": {
  "belief": "Cracking your knuckles gives you arthritis and makes your fingers thick",
  "truth": "The sound comes from bubbles forming in the joint fluid, and it has no known link to arthritis.",
  "detail": "That 'pop' is the sound of dissolved gas forming a bubble when pressure inside the joint cavity drops suddenly (a 2015 study captured the process on real-time MRI).\n\nA California doctor named Donald Unger ran a sixty-year single-person controlled experiment: he cracked only his left hand, never his right. Sixty years later, neither hand had arthritis. He won the 2009 Ig Nobel Prize for it. More formal population studies have also found no association between knuckle cracking and osteoarthritis.\n\nOne earlier study suggested habitual crackers might have slightly lower grip strength and a bit more soft-tissue swelling, but the sample was small and later studies failed to replicate it consistently.",
  "origin": "A cracking joint sounds like something being worn down. Intuitively, that's very convincing.",
  "instead": "Crack away if you want. If a joint pops and also hurts, swells, or locks up, that's when you see a doctor — and that's a different thing entirely.",
  "sources": [
    {
      "label": "Kawchuk et al., PLoS ONE 2015 — joint cracking under real-time MRI",
      "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0119470"
    },
    {
      "label": "Unger, Arthritis & Rheumatism 1998 — the sixty-year single-person experiment",
      "url": "https://pubmed.ncbi.nlm.nih.gov/9588755/"
    }
  ]
},
  "gray-hair": {
  "belief": "Pluck one gray hair and ten more will grow back",
  "truth": "One follicle grows one hair. Pluck it, and at most one hair grows back.",
  "detail": "Your follicle count is basically fixed at birth. Plucking a hair doesn't activate neighboring follicles or change their color. Repeatedly plucking the same spot can damage the follicle so nothing grows there at all — the exact opposite of the legend.\n\nGray hairs really do seem to multiply, but that's pigment stem cells naturally running out with age. It has nothing to do with whether you pluck.",
  "origin": "People only start paying attention to their hair when the first gray appears, so every one they notice afterward feels 'new'. A classic attention bias.",
  "instead": "If you want it gone, snip it — don't pluck. Dye is another option. So is acceptance.",
  "sources": [
    {
      "label": "Scientific American — Why does hair turn gray?",
      "url": "https://www.scientificamerican.com/article/why-does-hair-turn-gray/"
    }
  ]
},
  "shaving": {
  "belief": "Shaving makes hair grow back thicker, darker, and faster",
  "truth": "A blade only cuts the part above the skin. It never touches the follicle that sets thickness and color.",
  "detail": "A natural hair tip is fine and tapered. A razor leaves a flat cross-section that feels stubbly and looks blunt and thick. On top of that, the short new growth hasn't yet been bleached by sun and air, so it looks darker.\n\nA controlled experiment back in 1928 measured hair diameter and growth rate before and after shaving and found no difference. Later studies have all agreed.",
  "origin": "The change in feel and appearance is real — the cause just got misattributed. What changes is the shape of the cut end, not the hair itself.",
  "instead": "Do whatever you prefer. If you want regrowth to feel less stubbly, try waxing or laser — those work at the follicle level.",
  "sources": [
    {
      "label": "Mayo Clinic — Hair removal: Does shaved hair grow back thicker?",
      "url": "https://www.mayoclinic.org/healthy-lifestyle/adult-health/expert-answers/hair-removal/faq-20058427"
    }
  ]
},
  "glasses-worse": {
  "belief": "Wearing glasses for myopia makes your prescription climb, so avoid them if you can",
  "truth": "It's the opposite — under-correcting your prescription may make myopia progress faster.",
  "detail": "A randomized controlled trial directly compared full correction versus under-correction in children. The under-corrected group progressed faster, and the trial was stopped early. Deliberately prescribing a weaker prescription isn't protection — it's neglect.\n\nMyopia deepens mainly because the eyeball elongates, driven jointly by genetics and environment (time spent on close-up work, too little outdoor light). Whether you wear glasses has nothing to do with it.",
  "origin": "Kids typically get their first glasses at exactly the age when myopia naturally progresses fastest. Two things coinciding got read as cause and effect.",
  "instead": "Get the full prescription your refraction calls for. Evidence-backed ways to slow progression: 2 hours of outdoor time a day, low-dose atropine eye drops, orthokeratology (OK) lenses, and defocus spectacle lenses — have an ophthalmologist evaluate them.",
  "sources": [
    {
      "label": "Chung, Mohidin & O'Leary, Vision Research 2002 — randomized trial showing under-correction speeds myopia progression"
    }
  ]
},
  "blue-light": {
  "belief": "Blue-light-blocking glasses relieve eye strain and protect your vision",
  "truth": "A 2023 Cochrane review pooled 17 randomized trials: the evidence doesn't support that claim.",
  "detail": "The Cochrane review included 17 randomized controlled trials across six countries. Its conclusion: blue-light-filtering lenses probably don't reduce eye-strain symptoms from computer use, and likely make no difference to sleep quality either. As for contrast sensitivity, color discrimination, and macular health, not a single study evaluated them, so there's no way to judge at all.\n\nNote this is 'insufficient evidence to support', not 'proven harmful'. The blue light screens emit is also far weaker than natural daylight.",
  "origin": "Blue light at high intensity really can damage retinal cells — in test-tube and animal experiments. That part is true. Marketing transplanted it to everyday screen intensities and skipped the dose question entirely.",
  "instead": "Eye strain comes mainly from sustained close-up focus and reduced blinking. Use the 20-20-20 rule: every 20 minutes, look at something 20 feet (about 6 meters) away for 20 seconds. Dim your screen to match the room, and use artificial tears if needed.",
  "sources": [
    {
      "label": "Singh et al., Cochrane Database Syst Rev 2023",
      "url": "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013244.pub2/full"
    }
  ]
},
  "reading-dark": {
  "belief": "Reading in the dark or looking at your phone in bed ruins your eyes",
  "truth": "Dim light tires your eyes but causes no permanent damage. What actually drives myopia is too little outdoor time.",
  "detail": "Reading in dim light makes you squint, blink less, and keeps the focusing muscles tense. The result is soreness, dryness, and headaches — all reversible fatigue that fades with rest. There's no evidence of structural damage.\n\nWhen it comes to myopia, the repeatedly verified key factor is outdoor light. Multiple randomized trials have found that increasing students' daily outdoor time significantly lowers myopia rates. The mechanism may involve bright natural light stimulating dopamine release in the retina, which restrains eyeball elongation.",
  "origin": "'Straining your eyes damages them' sounds self-evident, and your eyes really do feel awful after reading in the dark. Experience seems to confirm the conclusion.",
  "instead": "Turn on a light to read — for comfort. If you genuinely want to protect a kid's eyesight, get them outdoors for two hours a day. That evidence is far stronger than anything behind eye-protection lamps or eye patches.",
  "sources": [
    {
      "label": "He et al., JAMA 2015 — cluster-randomized trial showing added outdoor time lowers childhood myopia incidence"
    }
  ]
},
  "ten-percent-brain": {
  "belief": "People only use 10% of their brain — unlock the rest and you could be a genius",
  "truth": "Functional imaging shows activity across nearly the whole brain. No large region sits idle.",
  "detail": "fMRI and PET scans show that even during sleep, every brain region stays active; over the course of a day, virtually all of them get used. Evolution makes the idea implausible too: the brain is 2% of body weight but burns about 20% of our energy. If 90% of it were dead weight, natural selection would have trimmed such an expensive organ long ago.\n\nThe more direct counterevidence is brain injury. If 90% of brain tissue did nothing, most strokes and head injuries should have no consequences at all. That's obviously not the case.",
  "origin": "The source is hard to pin down; it's often falsely attributed to Einstein. It may stem from early neuroscience's misunderstanding of glial cells, or from self-improvement slogans like 'human potential is barely tapped' taken literally. The self-help industry keeps it alive.",
  "instead": "If you want to sharpen your mind, sleep, aerobic exercise, and learning new skills all have far stronger evidence than any 'unlock your potential' course.",
  "sources": [
    {
      "label": "Scientific American — Do people only use 10 percent of their brains?",
      "url": "https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/"
    }
  ]
},
  "antibiotics-cold": {
  "belief": "Take some 'anti-inflammatory pills' (antibiotics) when you catch a cold and you'll recover faster",
  "truth": "The common cold is caused by viruses. Antibiotics do nothing to viruses.",
  "detail": "Antibiotics attack structures unique to bacteria — cell walls, ribosomes, metabolic pathways. Viruses don't have any of these, so antibiotics have no target. Taking them won't shorten your cold; it just brings side effects like diarrhea and allergic reactions, and it breeds resistant bacteria.\n\nYellow-green mucus doesn't mean a bacterial infection either. That color comes from myeloperoxidase inside neutrophils — it's the color of the immune response itself, and it's very common in the middle and late stages of a viral infection.",
  "origin": "The Chinese nickname for antibiotics, 'xiāoyányào' (anti-inflammation pills), is itself a trap — it lumps antibiotics together with actual anti-inflammatory drugs like ibuprofen, making people think any inflammation calls for them. Colds resolve on their own in 7–10 days anyway, and recovery right after taking the pills reinforces the illusion.",
  "instead": "Treat the symptoms: rest, fluids, and fever or pain relievers when needed. If symptoms last more than 10 days, or improve and then suddenly worsen with high fever, see a doctor to check for a secondary bacterial infection. Leave antibiotic prescriptions to doctors.",
  "sources": [
    {
      "label": "CDC — Antibiotic Prescribing and Use: Common Cold",
      "url": "https://www.cdc.gov/antibiotic-use/colds.html"
    }
  ]
},
  "vitamin-c": {
  "belief": "Load up on vitamin C as soon as you catch a cold and you'll recover faster",
  "truth": "For the general population, vitamin C neither prevents colds nor helps much once symptoms start.",
  "detail": "A Cochrane review pooled dozens of trials: in the general population, regular vitamin C supplementation doesn't reduce the incidence of colds. People who take it consistently long-term do see colds shorten by about 8% on average (in adults) — roughly a ten-day cold becoming a bit over nine days.\n\nThe key words are 'consistently, long-term'. Starting after symptoms appear showed no effect in most trials. There is one exception: people under extreme physical stress, like marathon runners and workers in subarctic conditions, did see a significant drop in cold risk from supplementation.",
  "origin": "Nobel laureate Linus Pauling published 'Vitamin C and the Common Cold' in 1970, promoting megadoses. His prestige spread the idea fast, but later controlled trials didn't back his conclusion.",
  "instead": "A normal diet covers your needs — one kiwi or half a bell pepper is a day's worth. When you have a cold, rest and fluids are still the main event.",
  "sources": [
    {
      "label": "Hemilä & Chalker, Cochrane Database Syst Rev — Vitamin C for preventing and treating the common cold",
      "url": "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000980.pub4/full"
    }
  ]
},
  "flu-shot": {
  "belief": "Getting a flu shot can give you the flu",
  "truth": "The virus in an inactivated vaccine is dead. It cannot cause the flu.",
  "detail": "Injectable flu vaccines are inactivated or recombinant-protein vaccines. They contain no virus capable of replicating. The low fever, fatigue, and sore arm for a day or two after the shot are your immune system building protection — that's a normal response, not the flu.\n\nPeople get this impression for a few reasons: the vaccine takes about two weeks to produce enough antibodies, and you can catch something in that window; or what you got was a cold from another respiratory virus; or that season's circulating strains matched the vaccine poorly. Vaccine effectiveness is never 100% — usually 40–60% — but even with a breakthrough infection, the risk of severe illness and hospitalization drops significantly.",
  "origin": "Timing coincidence. Vaccination season overlaps with peak respiratory virus season, so 'got the shot, then got sick' happens easily.",
  "instead": "Get vaccinated before each flu season, especially if you're older, have a chronic condition, are pregnant, or have young kids. Its value isn't just avoiding the flu — it's avoiding severe flu.",
  "sources": [
    {
      "label": "CDC — Misconceptions about Seasonal Flu and Flu Vaccines",
      "url": "https://www.cdc.gov/flu/prevent/misconceptions.htm"
    }
  ]
},
  "cramp-calcium": {
  "belief": "Leg cramps mean you're low on calcium — take a supplement, quick",
  "truth": "Nighttime leg cramps in adults almost never involve blood calcium, and calcium supplements usually don't help.",
  "detail": "Blood calcium is tightly regulated by parathyroid hormone. The true hypocalcemia that causes tetany is a clear pathological state, usually with numbness around the mouth and spasms of the hands and feet — not 'my calf seized up once in a while'.\n\nCommon nighttime leg cramps are currently thought to relate more to muscle fatigue and abnormal firing of nerve endings, and possibly to dehydration, electrolyte disturbances, certain medications (diuretics, statins), or vascular and nerve problems in the legs. In most cases no clear cause is found.",
  "origin": "Calcium ions genuinely do take part in muscle contraction and relaxation — that part is true. But 'involved in the process' got stretched into 'lacking it causes cramps', skipping over the fact that blood calcium is extremely stable.",
  "instead": "During a cramp: stretch in the opposite direction (for a calf cramp, pull your toes toward you and straighten the knee). For prevention: stretch your calves before bed, stay hydrated, and review the medications you're on. If cramps are frequent or come with numbness or weakness, get checked for an underlying cause.",
  "sources": [
    {
      "label": "Mayo Clinic — Muscle cramp",
      "url": "https://www.mayoclinic.org/diseases-conditions/muscle-cramp/symptoms-causes/syc-20350820"
    }
  ]
},
  "tongue-map": {
  "belief": "The tongue has zones: sweet at the tip, sour on the sides, bitter at the back",
  "truth": "Nearly every part of the tongue can taste all the basic tastes.",
  "detail": "This map is a thorough misunderstanding. Different regions of the tongue do have extremely slight differences in sensitivity to different tastes, but the differences are too small to matter — the tip can taste bitter, and the back can taste sweet.\n\nTaste receptor cells sit in taste buds across the whole tongue and even on the soft palate and pharynx, and every taste bud contains cells that respond to multiple tastes.",
  "origin": "In 1901, German researcher D. P. Hänig measured taste thresholds across the tongue and found tiny differences. In 1942, Harvard psychologist Edwin Boring translated the data into a chart, and his handling of the axes turned 'slightly more sensitive' into 'sensitive only here'. The chart entered textbooks and circulated for over half a century.",
  "instead": "Nothing to do. Next time you see this map, dip your tongue tip in something bitter and check for yourself.",
  "sources": [
    {
      "label": "ScienceAlert — How a mistranslation made you think your tongue had taste zones",
      "url": "https://www.sciencealert.com/how-a-mistranslation-made-you-think-your-tongue-had-taste-zones"
    }
  ]
},
  "left-right-brain": {
  "belief": "The left brain handles logic, the right brain handles art — develop your kid's right brain to make them smarter",
  "truth": "Brain-imaging studies find no 'left-brain people' or 'right-brain people'. For any remotely complex task, both hemispheres work together.",
  "detail": "Some functions are genuinely lateralized: in most people, language leans left and spatial attention leans right — but those are statistical tendencies at the level of specific functions. Whether a whole person is 'left-brained' or 'right-brained' is a different claim. A 2013 study analyzed resting-state brain imaging from over a thousand people and found no evidence that anyone globally favors one hemisphere. Speaking, arithmetic, drawing, playing an instrument — all of it recruits both sides.\n\nThat knocks out the 'right-brain development classes', 'blindfold reading', and 'whole-brain speed reading' programs built on the idea: they promise to awaken one side of the brain in days of training, charge handsomely, produce effects that don't survive controlled testing, and sometimes rely on outright tricks (like peeking through gaps in the blindfold).",
  "origin": "In the 1960s, research on split-brain patients — epilepsy patients whose corpus callosum had been severed — won a Nobel Prize: these patients showed clear division of labor between the hemispheres. Once this rigorous finding entered popular culture, it got flattened into the personality labels 'left-brain logical, right-brain artistic', and then the training industry picked it up and turned it into a business.",
  "instead": "If you want a child's brain to develop well, the methods are too plain to sell: enough sleep, exercise, reading, rich play, and conversation. No short course can 'expand' a brain.",
  "sources": [
    {
      "label": "Nielsen et al., PLoS ONE 2013 — testing the left-brain/right-brain hypothesis with resting-state imaging of over a thousand people",
      "url": "https://pubmed.ncbi.nlm.nih.gov/23967180/"
    }
  ]
},
  "mmr-autism": {
  "belief": "Vaccines cause autism, especially the MMR (measles-mumps-rubella) shot",
  "truth": "The claim traces back to one paper retracted for fraud. Studies covering tens of millions of children since then have found no link.",
  "detail": "In 1998 The Lancet published Andrew Wakefield's paper claiming a link between the MMR vaccine and autism. Later investigation revealed that the data had been manipulated, the study was funded by lawyers suing vaccine manufacturers, and Wakefield himself held a patent on a competing vaccine — none of these conflicts of interest were disclosed. The Lancet formally retracted the paper in 2010, the UK General Medical Council struck him off the medical register, and a BMJ investigation series called the paper 'an elaborate fraud'.\n\nOn the other side sits the evidence: a Danish study covering more than half a million children directly compared kids who had and hadn't received the MMR vaccine and found no difference in autism rates. A Cochrane review pooling dozens of studies covering tens of millions of children reached the same conclusion.\n\nTo be fair, autism diagnosis rates really have been rising — but that's the result of broadened diagnostic criteria and better recognition. The rise needed an explanation, and 'vaccines' happened to offer a plausible-sounding story: the age of vaccination and the age of diagnosis are about the same.",
  "origin": "One fraudulent paper, plus parents' very real desperation, plus media coverage that treated both sides as equal. Wakefield later moved to the United States and remains active in anti-vaccine rallies to this day.",
  "instead": "Follow your national immunization schedule. If you have questions about vaccine ingredients or contraindications, ask the doctor at the vaccination clinic — not the parent group chat.",
  "sources": [
    {
      "label": "Deer, BMJ 2011 — investigation of the MMR vaccine fraud",
      "url": "https://www.bmj.com/content/342/bmj.c7452"
    },
    {
      "label": "Cochrane systematic review 2020 — MMR vaccine and autism (tens of millions of children)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32309885/"
    }
  ]
},
  "wine-heart": {
  "belief": "A glass of red wine a day softens your blood vessels and protects your heart",
  "truth": "'Moderate drinking is good for you' is an artifact of observational studies. Once you control for their biases, light drinking shows no protective effect.",
  "detail": "Early studies produced a famous J-shaped curve: light drinkers had lower mortality than people who never drank at all. A 2023 analysis pooling 107 cohort studies and nearly 5 million participants pointed out that this 'protection' largely comes from methodological problems — many 'non-drinking' control groups include people who quit drinking because they got sick (former-drinker bias). After correcting for these biases, a drink or two a day shows no significant negative association with mortality risk. Risk starts climbing at about 25 grams of alcohol a day (under two glasses of red wine), and it rises earlier for women.\n\nOne caveat: this means there's no basis for drinking for your health — not that one glass will do something terrible. Risk accumulates with dose.",
  "origin": "'A little drinking is actually healthier' is news everyone wants to hear, so it spread effortlessly, and the alcohol industry was happy to fund and cite such research. Layer on the French paradox — 'the French eat butter yet have less heart disease' — and red wine put on a health halo.",
  "instead": "If you don't drink, there's no reason to start 'for your heart'. If you do drink, one line is enough: less is better than more, and none is best — that's the World Health Organization's own wording from 2023.",
  "sources": [
    {
      "label": "Zhao et al., JAMA Netw Open 2023 — meta-analysis of daily alcohol intake and all-cause mortality (107 cohorts)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37000449/"
    },
    {
      "label": "WHO 2023 — No level of alcohol consumption is safe for our health",
      "url": "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health"
    }
  ]
},
  "antiperspirant": {
  "belief": "Antiperspirants block your sweat glands so toxins can't get out, and that causes breast cancer",
  "truth": "The US National Cancer Institute's conclusion: there's no solid evidence linking antiperspirants to breast cancer.",
  "detail": "The claim has two parts: 'aluminum salts block sweat glands so toxins build up' and 'the armpit is close to the breast, so it's dangerous'. The problems: aluminum salts only form a temporary, shallow plug at the skin's surface, and sweat was never a detox channel in the first place — detoxification is the liver and kidneys' job. Large case-control studies comparing users and non-users found no difference in breast cancer risk, and the National Cancer Institute (NCI) states on its fact page that there is 'no conclusive evidence'.\n\nOne caveat: applying it right after shaving stings — that's skin irritation, not poisoning. If you're sensitive to aluminum, just pick an aluminum-free deodorant.",
  "origin": "Chain emails in the 1990s first spread this claim (the Chinese-speaking world later got its own social-media version). It hits the 'modern chemicals can't be trusted' nerve perfectly.",
  "instead": "Use it if you want, as directed. If you're uneasy, choose an aluminum-free deodorant — for odor control, not 'cancer prevention'.",
  "sources": [
    {
      "label": "National Cancer Institute — Antiperspirants/Deodorants and Breast Cancer",
      "url": "https://www.cancer.gov/about-cancer/causes-prevention/risk/myths/antiperspirants-fact-sheet"
    }
  ]
},
  "nightcap": {
  "belief": "A drink before bed helps you sleep deeper.",
  "truth": "Alcohol makes you fall asleep faster, but it wrecks the structure of your sleep in the second half of the night.",
  "detail": "Alcohol is a sedative, so it does shorten the time it takes to fall asleep. But it also suppresses REM sleep, and once the liver finishes metabolizing it there is a rebound effect — usually in the second half of the night — that causes frequent awakenings and more light sleep. Polysomnography shows that on nights you drink, objective sleep quality gets worse across the board.\n\nAlcohol also relaxes the muscles of the upper airway, which worsens snoring and sleep apnea, and its diuretic effect gets you up to pee at night. So 'sleeping deeply' is a subjective feeling from the falling-asleep phase; the objective quality of the whole night goes down.",
  "origin": "The experience of falling asleep faster is very direct, while the fragmented sleep later in the night is something you usually never notice.",
  "instead": "If you cannot sleep, look for the cause first: caffeine, screens, an irregular schedule, anxiety. The first-line treatment for insomnia is cognitive behavioral therapy (CBT-I), which works more reliably than any nightcap.",
  "sources": [
    {
      "label": "Ebrahim et al., Alcohol Clin Exp Res 2013 — Review of alcohol's effects on sleep",
      "url": "https://onlinelibrary.wiley.com/doi/10.1111/acer.12006"
    }
  ]
},
  "weekend-catchup": {
  "belief": "Sleep less during the week, no big deal — just catch up on the weekend.",
  "truth": "You can recover some of it, but not all — the cognitive damage and metabolic effects do not get wiped away.",
  "detail": "One controlled study restricted participants' sleep, then gave them recovery sleep on the weekend. The result: subjective sleepiness did improve, but insulin sensitivity did not recover — and when they went back to weekday sleep restriction after the recovery period, their metabolic markers got even worse.\n\nTo be fair: large cohort studies have also found that people who catch up on weekend sleep have a lower mortality risk than chronically sleep-deprived people who never do. So catch-up sleep is not useless — it just does not fully cancel the debt you ran up. And sleeping in drastically late on weekends creates 'social jet lag,' which makes Monday feel worse.",
  "origin": "The sleep-debt metaphor is just too handy — owe it, then pay it back. But your physiology is not a ledger, and some effects cannot be reversed just by repaying the hours.",
  "instead": "Try to keep the difference between your weekday and weekend wake-up times under an hour. If you really owe sleep, catching up beats not catching up — but do not make it your regular plan.",
  "sources": [
    {
      "label": "Depner et al., Current Biology 2019 — Metabolic effects of weekend recovery sleep"
    }
  ]
},
  "eight-hours": {
  "belief": "Everyone must get a full eight hours of sleep.",
  "truth": "Eight hours is a population average. Individual needs fall within a range.",
  "detail": "The American Academy of Sleep Medicine and the Sleep Research Society recommend at least 7 hours a night for adults, and most guidelines give a range of 7–9 hours. It is a band, not a number you must hit. Some people are fully refreshed on 7 hours; others need 9.\n\nWhat is more worth worrying about is turning 'must get eight hours' into anxiety itself — lying in bed staring at the clock doing the math on 'I only have five hours left.' That kind of sleep anxiety (there is even a term for it, orthosomnia, born from obsessing over sleep-tracker data) actually makes falling asleep harder.",
  "origin": "The eight-hour figure originally came from a labor-movement slogan of the industrial era: 'Eight hours' labor, eight hours' recreation, eight hours' rest.' It was a plan for dividing up the day socially, not a medical prescription.",
  "instead": "Judge by your days: if you are not leaning on coffee to get through the afternoon, your attention is normal, and you do not need to massively catch up on weekends, your sleep duration is probably enough.",
  "sources": [
    {
      "label": "Watson et al., SLEEP 2015 — Joint consensus statement of AASM and SRS on adult sleep duration"
    }
  ]
},
  "snoring": {
  "belief": "Snoring means you're sleeping soundly and deeply.",
  "truth": "Loud snoring is usually a sign of an obstructed airway, and it can be sleep apnea.",
  "detail": "Snoring happens when soft tissue vibrates as air moves through a narrowed upper airway. Mild snoring may be harmless, but if the snoring is loud, on-and-off, and comes with gasping or choking awakenings after pauses in breathing, it is very likely obstructive sleep apnea (OSA).\n\nSomeone with OSA can go through dozens or even hundreds of micro-awakenings a night, with sleep architecture broken over and over — the exact opposite of sleeping well. Untreated OSA is linked to higher risks of high blood pressure, arrhythmia, stroke, and diabetes, and the daytime sleepiness markedly raises the risk of traffic accidents.",
  "origin": "The observation that 'you only snore when you're asleep' is correct — and then it got stretched into 'snoring means you're sleeping deeply.'",
  "instead": "Take these signs seriously: very loud snoring, breathing pauses observed by someone else, waking up choking, morning headaches or dry mouth, and being sleepy all day no matter how much you sleep. If any of these fit, get a sleep study.",
  "sources": [
    {
      "label": "Mayo Clinic — Obstructive sleep apnea",
      "url": "https://www.mayoclinic.org/diseases-conditions/obstructive-sleep-apnea/symptoms-causes/syc-20352090"
    }
  ]
},
  "sleepwalk-wake": {
  "belief": "Never wake a sleepwalker — you'll frighten them out of their mind or make them sick.",
  "truth": "Waking a sleepwalker causes no harm — at worst they are confused for a few seconds. Not waking them is what can get them hurt.",
  "detail": "Sleepwalking (somnambulism) happens during deep sleep. Woken out of it, a person is briefly confused and groggy, and some get a bit irritable — this is called a confusional arousal. It passes on its own within minutes and leaves no damage. There is no medical basis whatsoever for claims about being 'scared mad' or having your soul frightened away.\n\nThe real risk is on the other side: a sleepwalker might open a door and walk outside, climb out a window, knock over hot water, or miss a step on the stairs. The UK's National Health Service (NHS) advises gently guiding the person back to bed, and if that does not work, waking them gently is safe.",
  "origin": "The blank look on a freshly woken sleepwalker's face is striking — it looks like their soul hasn't come back yet. Folk traditions everywhere attached an explanation to that image.",
  "instead": "Don't crowd around, shake them, or shout. Take their hand and walk them slowly back to bed; wake them if you can, watch over them if you can't. If episodes are frequent or involve dangerous actions, see a sleep clinic.",
  "sources": [
    {
      "label": "NHS — Sleepwalking",
      "url": "https://www.nhs.uk/conditions/sleepwalking/"
    }
  ]
},
  "insomnia-rest": {
  "belief": "Can't sleep? No problem — just lying there with your eyes closed is rest too.",
  "truth": "Lying awake in bed for long stretches teaches your brain that bed equals awake, and the insomnia digs itself in deeper.",
  "detail": "The first-line non-drug treatment for chronic insomnia (cognitive behavioral therapy for insomnia, CBT-I) has a core technique called stimulus control: if you have been in bed about 20 minutes without falling asleep, get up, do something calm somewhere else, and come back when you feel sleepy. The principle is behavioral conditioning — if the bed keeps getting paired with 'tossing and turning awake,' the brain forms that association and you perk up the moment you lie down.\n\nTo be fair: resting with your eyes closed is still better than scrolling on your phone, and one occasional bad night does not require leaping out of bed. This advice targets long-term difficulty falling asleep, several nights a week.",
  "origin": "The intuition that 'resting can't hurt,' plus the illusion that trying harder gets you to sleep. Unfortunately sleep is about the one thing in life that the harder you chase it, the further it runs.",
  "instead": "A fixed wake-up time matters more than a fixed bedtime. If you have been awake more than 20 minutes, get up, keep the lights dim, and do not check the clock. For long-term insomnia, see a doctor about CBT-I — its effects outlast sleeping pills.",
  "sources": [
    {
      "label": "Edinger et al., J Clin Sleep Med 2021 — AASM clinical practice guideline for behavioral treatment of chronic insomnia in adults",
      "url": "https://pubmed.ncbi.nlm.nih.gov/33164742/"
    }
  ]
},
  "elder-sleep": {
  "belief": "Older people naturally need less sleep — sleeping poorly is just a normal part of aging.",
  "truth": "Sleep need does not drop much with age. The poor sleep common in older adults is caused by illness, medications, and other factors — and it can and should be treated.",
  "detail": "Sleep-medicine reviews are clear on this: aging changes sleep architecture (less deep sleep, more awakenings), but there is no evidence that older people need less sleep, and sleep disturbance is not an inevitable part of aging. The real reasons older adults sleep poorly are usually chronic diseases, multiple medications, psychosocial factors, and primary sleep disorders (like sleep apnea) — most of which have corresponding treatments.\n\nTreating 'old-age insomnia' as normal comes at a real cost: chronically poor sleep is linked to falls, cognitive decline, and cardiovascular risk.",
  "origin": "People see that the elderly all rise early and work backwards to 'old people don't need sleep.' In fact, early-to-bed-early-to-rise is mostly a shift of the body clock earlier, and waking often at night is a loss of sleep continuity — neither one means 'need less.'",
  "instead": "If an older family member sleeps poorly for a long time, do not tell them 'that's just how it is at your age.' Get them evaluated: rule out sleep apnea, review the medication list, treat pain and nighttime urination. Many cases can improve.",
  "sources": [
    {
      "label": "Miner & Kryger, Sleep Med Clin 2017 — Sleep in the Aging Population",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28159095/"
    }
  ]
},
  "melatonin-sleep": {
  "belief": "Take melatonin for insomnia — it's a natural hormone, safe and sleep-inducing.",
  "truth": "Melatonin sets the clock; it does not knock you out. It adjusts your body clock, and for ordinary chronic insomnia its effect is so small that guidelines do not recommend it.",
  "detail": "Melatonin's legitimate use is shifting the timing of the body clock: jet lag, and correcting a delayed sleep phase (the more-night-more-awake rhythm). For these the evidence is fairly solid — the Cochrane review on jet lag reached a positive conclusion. But for the most common kind of chronic insomnia — lying there unable to fall asleep, waking again and again — its average effect is shortening time to fall asleep by just a few minutes. The American Academy of Sleep Medicine's 2017 guideline on drug treatment explicitly recommends against using melatonin as a sleeping pill.\n\nTo be fair to the cautious side: 'natural hormone' does not mean take it freely. Store-bought doses often far exceed what the body secretes, and long-term safety data are limited. Older adults, pregnant women, and people on anticoagulants should ask a doctor first.",
  "origin": "'Something your own body makes' sounds naturally harmless, and it is sold without a prescription (in China it is regulated as a health supplement, not a drug). 'Natural' and 'easy to buy' got mistaken for 'right for the problem.'",
  "instead": "For jet lag or a disrupted schedule, a low dose of melatonin is worth a short trial. For long-term insomnia, the first choice is CBT-I (cognitive behavioral therapy) — its effects outlast any pill.",
  "sources": [
    {
      "label": "Sateia et al., J Clin Sleep Med 2017 — AASM guideline on pharmacologic treatment of chronic insomnia",
      "url": "https://pubmed.ncbi.nlm.nih.gov/27998379/"
    },
    {
      "label": "Herxheimer & Petrie, Cochrane Database Syst Rev 2002 — Melatonin for preventing and treating jet lag",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12076414/"
    }
  ]
},
  "night-owl": {
  "belief": "Night owls are just lazy and undisciplined — early risers are better people.",
  "truth": "Whether you're a morning or evening type is largely written in your genes — it's a physiological tendency, not a character flaw.",
  "detail": "A 2019 genome-wide study of nearly 700,000 people expanded the number of genetic loci linked to being a 'morning person' from 24 to 351, concentrated in pathways like circadian clock regulation and retinal signaling. The 5% of people carrying the most 'morning alleles' fell asleep about 25 minutes earlier on average than the 5% carrying the fewest. Sleeping and rising late is a physiologically grounded 'chronotype' — like being naturally a bit taller or shorter.\n\nTo be fair: genes set the tendency, not everything — light exposure, caffeine, and habits can all shift your rhythm. Using 'I'm a night type' as an excuse to scroll your phone until 3 a.m. is a bait-and-switch.",
  "origin": "Agricultural society tied 'rise with the sun' to diligence, so early rising became a symbol of virtue; modern work schedules were then designed around morning people's rhythm by default, which made evening types look 'lazy.'",
  "instead": "Don't compare wake-up times with others — compare how regular your own sleep is. Night types who must rise early: get bright light in the morning, dim lights at night, and keep a fixed wake-up time. The rhythm can be nudged forward bit by bit.",
  "sources": [
    {
      "label": "Jones et al., Nat Commun 2019 — Genome-wide study of chronotype in nearly 700,000 people",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30696823/"
    }
  ]
},
  "spot-reduction": {
  "belief": "Train your abs to lose the belly, train your arms to slim them down.",
  "truth": "Spot reduction doesn't work. Where fat comes off first is decided by your genes and hormones — you don't get to order off the menu.",
  "detail": "The classic experiment: have subjects train only one arm, then after several weeks measure subcutaneous fat thickness on both sides. The trained arm got stronger, but fat loss was no different between the two sides. Sit-up trials of similar design reached the same conclusion — abdominal training strengthened the abs, but belly fat thickness did not drop any more than elsewhere.\n\nFat is mobilized through whole-body lipolysis: fatty acids enter the bloodstream and are used by the entire body. There is no 'using the nearest supply first.'",
  "origin": "After training, the area pumps up, warms up, and feels tight — it feels like 'that spot is burning.' The sensation is so concrete it's hard not to believe. Fitness-equipment ads have reinforced it for decades.",
  "instead": "To lose fat, create a calorie deficit (mainly through diet) plus keep up strength training (to keep muscle). Keep doing ab work — it makes the muscle more visible — but you only see it once the overall fat layer thins out.",
  "sources": [
    {
      "label": "Ramírez-Campillo et al., J Strength Cond Res 2013 — Regional fat changes after unilateral leg training"
    }
  ]
},
  "sweat-fat": {
  "belief": "The more you sweat, the more fat you burn — sweat suits work great.",
  "truth": "Sweat is temperature control, not a fat drain. What the scale loses is water.",
  "detail": "How much you sweat depends on ambient temperature, humidity, your personal sweat-gland density, and how heat-adapted you are — none of which corresponds to fat burned. Sitting in a sauna for half an hour produces buckets of sweat and burns very few calories.\n\nThe end products of fat metabolism are carbon dioxide and water, and most of the mass (about 84%) leaves the body as CO2 through your breath. So if you insist on talking about 'excreting' fat, it mostly gets exhaled.\n\nWearing a non-breathable sweat suit blocks heat dissipation and raises core temperature, which carries a real heatstroke risk during hard exercise.",
  "origin": "The intuition that 'drenched in sweat = trained hard,' plus the fact that the scale really does show a couple pounds less after a workout (it comes back when you drink water).",
  "instead": "Measure a workout by intensity and duration, not by sweat volume. Rehydrate during and after exercise; in hot summer workouts, remember electrolytes too.",
  "sources": [
    {
      "label": "Meerman & Brown, BMJ 2014 — When somebody loses weight, where does the fat go?",
      "url": "https://www.bmj.com/content/349/bmj.g7257"
    }
  ]
},
  "lactic-acid": {
  "belief": "Next-day muscle soreness is lactic acid buildup — massage it out to break it up.",
  "truth": "Lactic acid is basically cleared within an hour after exercise. Delayed soreness is micro-damage to muscle fibers.",
  "detail": "Blood lactate returns to baseline within 30–60 minutes after hard exercise, while delayed-onset muscle soreness (DOMS) typically peaks 24–72 hours later. The timeline does not match.\n\nThe current understanding of DOMS is micro-damage to muscle fibers and connective tissue caused by eccentric contractions, plus the inflammation and pain sensitization that follow. That also explains why downhill running and slowly lowering a barbell — eccentric work — are especially good at producing soreness.\n\nBy the way, lactate itself is not waste either — it can be reused as an energy substrate by the heart, other muscle fibers, and the liver.",
  "origin": "Classic studies from the 1920s linked muscle fatigue to lactic acid, which has some truth at the level of acute fatigue during exercise. It later got extrapolated to 'soreness the day after,' and the two things got lumped together.",
  "instead": "During a sore spell, low-intensity activity (walking, easy cycling) boosts blood flow and usually feels better than total rest. Massage and stretching can ease the discomfort, but they are not 'kneading out lactic acid.' Increasing training volume gradually markedly reduces DOMS.",
  "sources": [
    {
      "label": "Cheung et al., Sports Medicine 2003 — Review of DOMS mechanisms and management",
      "url": "https://link.springer.com/article/10.2165/00007256-200333020-00005"
    }
  ]
},
  "static-stretch": {
  "belief": "Always do a good static stretch before exercise, or you'll get hurt.",
  "truth": "Long static stretching before exercise does not reduce injury rates, and it temporarily weakens strength and power.",
  "detail": "Multiple systematic reviews find that pre-exercise static stretching has no clear effect on overall sports injury rates (it may help slightly with muscle strains, but the evidence is weak). Meanwhile, static stretches held longer than 60 seconds temporarily reduce a muscle's maximal strength and power output, and the effect lingers for a while.\n\nWhat the evidence actually supports is warming up itself — raising muscle temperature and progressively activating the neuromuscular system. Structured warm-up programs that combine dynamic movements with strength control, like FIFA 11+, genuinely and significantly reduced injury rates in soccer players.",
  "origin": "Decades of standard PE-class procedure, plus the intuitive analogy that 'a stretched muscle is less likely to tear.' The routine predates the evidence that fails to support it.",
  "instead": "Warm up dynamically before exercise: high knees, jumping jacks, walking lunges, low-intensity versions of your sport's movements — get heart rate and muscle temperature up. Save static stretching for after exercise, where it helps flexibility.",
  "sources": [
    {
      "label": "Behm et al., Appl Physiol Nutr Metab 2016 — Systematic review of static vs dynamic stretching in warm-ups",
      "url": "https://cdnsciencepub.com/doi/10.1139/apnm-2015-0235"
    }
  ]
},
  "ten-thousand-steps": {
  "belief": "You must hit 10,000 steps a day to count as healthy.",
  "truth": "That number comes from the brand name of a 1965 pedometer, not from research.",
  "detail": "In 1965, the Japanese company Yamasa Tokei Keiki launched a pedometer called the 'Manpo-kei' — literally '10,000-step meter.' The number was chosen partly because the character 万 (ten thousand) looks a bit like a walking person, and partly because it was catchy and easy to sell. When the product launched, there was no research on '10,000 steps' at all.\n\nLater cohort studies painted a finer picture: in older women, for example, compared with about 2,700 steps a day, mortality risk was already markedly lower at about 4,400 steps, with benefits continuing up to about 7,500 steps before leveling off. In other words, the biggest gains come from going from sedentary to just a bit more walking. Ten thousand steps is not a threshold.",
  "origin": "A catchy product name got treated as a health standard, and then step-counting apps and fitness bands wrote it into their default settings.",
  "instead": "Don't obsess over the round number. Adding one or two thousand steps to your current count delivers real benefits. Walking pace (about 100 steps per minute counts as moderate intensity) matters more than the total.",
  "sources": [
    {
      "label": "Lee et al., JAMA Internal Medicine 2019 — Step count, step rate, and all-cause mortality in older women",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6547157/"
    },
    {
      "label": "Popular Science — The origin of 10,000 steps",
      "url": "https://www.popsci.com/health/10000-steps-debunk-science/"
    }
  ]
},
  "women-lifting": {
  "belief": "Women who lift weights will turn into muscle-bound hulks — cardio is the safe choice.",
  "truth": "Women's testosterone levels are about one-fifteenth of men's — natural training will not accidentally make that happen.",
  "detail": "Muscle hypertrophy depends heavily on androgen levels. Women's testosterone concentration is typically only 5–10% of men's, which physiologically limits the speed and ceiling of muscle growth. Those extremely muscular physiques almost always involve years of specialized training plus performance-enhancing drugs.\n\nOn the flip side, the evidence for strength training's benefits to women is rock solid: increased bone density (especially important against postmenopausal osteoporosis), higher resting metabolic rate, better insulin sensitivity, and lower fall risk.",
  "origin": "Bodybuilding competition photos are an overpowering visual reference — one picture outweighs a pile of explanations. The gym culture of 'women tone, men build strength' keeps reinforcing it too.",
  "instead": "Lift away. Getting 'toned' takes exactly two things: muscle mass plus a moderate body-fat level — and the muscle comes from strength training.",
  "sources": [
    {
      "label": "ACSM — Resistance Training for Health",
      "url": "https://www.acsm.org/"
    }
  ]
},
  "running-knees": {
  "belief": "Running ruins your knees — run too much and you'll need a joint replacement sooner or later.",
  "truth": "Quite the opposite — recreational runners have lower rates of knee and hip osteoarthritis than sedentary people.",
  "detail": "A 2017 systematic review pooling 17 studies and over 110,000 people found that recreational runners had about a 3.5% rate of knee and hip osteoarthritis, versus about 10% in sedentary people. Cartilage is not a part that wears down with use — moderate loading brings it nutrients and strengthens it.\n\nTwo caveats: competitive-level high-mileage athletes do have a higher rate (about 13%), and people with old joint injuries or high body weight should control volume and progress gradually. But for ordinary recreational runners, 'running grinds down your knees' is not a fact. The things strongly linked to arthritis are obesity, old injuries, and genetics.",
  "origin": "The intuition is just too smooth: every step is an impact, so knees sound like consumable parts. Machines do wear out — but living tissue adapts. The 'machine' you never use is the one that degenerates faster.",
  "instead": "Build up gradually (no more than about 10% more volume per week), back off when it hurts instead of pushing through, and start with brisk walking if you carry a lot of weight. Giving up running to save your knees is picking up sesame seeds and dropping the watermelon.",
  "sources": [
    {
      "label": "Alentorn-Geli et al., JOSPT 2017 — Systematic review of running and knee/hip osteoarthritis",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28504066/"
    }
  ]
},
  "fasted-cardio": {
  "belief": "Morning workouts on an empty stomach burn fat directly — way more efficient for weight loss.",
  "truth": "The extra fat burned during the workout is just an accounting number. Over weeks, fasted and fed cardio show no difference in fat loss.",
  "detail": "When you exercise fasted, fat does supply a higher share of the fuel — that is where this idea gets its scientific sheen. But the body does not settle the bill per workout; metabolism evens itself out afterward. The randomized controlled trial that directly tested this (young women, regular cardio, controlled diet, four weeks) found no significant difference in weight or body-fat loss between the fasted and fed groups.\n\nOne caveat: that trial was very small (20 people), hardly the last word. But the claim that 'fasted exercise clearly loses more fat' currently has no decent evidence behind it either.",
  "origin": "Confusing 'what you're burning right now' with 'what you'll lose in the end' is the most common mix-up in fitness. On top of that, morning workouts are fasted anyway — and whatever is convenient is easiest to declare correct.",
  "instead": "Train whenever, and eat before or not, according to what feels good and what you can stick with. If fasted training leaves you dizzy and weak, eat something first — fat loss is settled by the long-term energy ledger.",
  "sources": [
    {
      "label": "Schoenfeld et al., J Int Soc Sports Nutr 2014 — Controlled trial of fasted vs fed aerobic exercise on body composition",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25429252/"
    }
  ]
},
  "anabolic-window": {
  "belief": "You must slam protein powder within 30 minutes after training — miss the window and the workout was wasted.",
  "truth": "The 'anabolic window' is far wider than the legend — several hours on either side count. Hitting your daily protein total is what matters.",
  "detail": "Sports nutritionists have re-examined this concept themselves: a 2013 review (co-authored by one of the people who originally promoted the window theory) concluded that the so-called window is far longer than 30 minutes and likely spans several hours before and after training. As long as your day's total protein is adequate (roughly around 1.6 grams per kilogram of body weight) and not crammed into one meal, chugging a shake immediately after training versus eating a normal meal an hour later makes little difference for muscle gain.\n\nTo be fair: there are two situations where timely post-workout protein is genuinely advised — training completely fasted, or training a second time the same day. For an ordinary person training once a day, it is not that urgent.",
  "origin": "A match made in heaven between gym lore and supplement marketing: 'miss it and the workout was wasted' leads straight to 'buy protein powder now.' The urgency is a selling point, not a science finding.",
  "instead": "Eat after training if you're hungry; eat a normal meal later if you're not. Watching your daily total and the long term beats chugging powder against a stopwatch.",
  "sources": [
    {
      "label": "Aragon & Schoenfeld, J Int Soc Sports Nutr 2013 — Re-examining the anabolic window",
      "url": "https://pubmed.ncbi.nlm.nih.gov/23360586/"
    }
  ]
},
  "muscle-to-fat": {
  "belief": "Muscle turns into fat if you stop training — everything you built will end up as flab.",
  "truth": "Muscle and fat are two completely different tissues and cannot convert into each other. What happens after you stop is two separate things at once: muscle shrinks and fat grows.",
  "detail": "After you stop training, muscles atrophy from lack of stimulus (detraining), and size and strength drop. At the same time, many people keep eating at their training-period level, and the calorie surplus piles on as fat. One tissue shrinking while the other swells looks exactly like 'muscle turning into fat.'\n\nThis myth also creates a reverse anxiety: some people become afraid to ever stop or rest. In fact, rebuilding muscle after a break is much faster than starting from zero — 'muscle memory' has some basis at the cellular level, since the myonuclei gained during training do not easily disappear when muscle atrophies.",
  "origin": "The sight of a retired athlete gone soft is just too convincing — superficially it really does look like 'lean muscle became fat.' People saw the correlation and imagined the conversion.",
  "instead": "When you stop training, just bring your eating back to everyday levels. And if you've taken a break, don't worry — starting again goes faster than you think.",
  "sources": [
    {
      "label": "Mujika & Padilla, Sports Med 2000 — Physiological and performance changes from detraining",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10999420/"
    }
  ]
},
  "period-exercise": {
  "belief": "You shouldn't exercise during your period — just lie down and rest, or you'll end up with lasting problems.",
  "truth": "There is no evidence that exercising during your period is harmful; regular exercise may actually ease period pain.",
  "detail": "A 2019 Cochrane systematic review pooled the relevant trials: the evidence quality is admittedly low, but the direction is consistent — regular exercise of at least three sessions a week at about 45 minutes each may markedly reduce the intensity of menstrual pain (about 25 points lower on a 100-point pain scale, on average). Modern medicine finds no basis for the claim that period exercise causes lasting harm.\n\nOne caveat: with heavy flow, severe cramps, anemia, or a gynecological condition, cutting back or resting is the right call — listening to your body is never wrong. What's wrong is making 'no exercise during your period' an iron rule for everyone.",
  "origin": "Blaming normal period discomfort on 'catching a chill' or 'overexerting yourself' is part of traditional Chinese health-preservation thinking — the motive is protection, but too much protection becomes restriction.",
  "instead": "If you feel no special discomfort, exercise as usual and adjust intensity to how you feel that day; gentle options like yoga and walking are especially friendly for cramps. If the pain disrupts your life, get checked for secondary dysmenorrhea (like endometriosis) — neither tough it out nor lie there forcing yourself to rest.",
  "sources": [
    {
      "label": "Armour et al., Cochrane Database Syst Rev 2019 — Systematic review of exercise for dysmenorrhea",
      "url": "https://pubmed.ncbi.nlm.nih.gov/31538328/"
    }
  ]
},
  "alcohol-warm": {
  "belief": "Have a shot of liquor to warm up in cold weather.",
  "truth": "Alcohol makes you feel warm while actually speeding up the loss of your core body temperature — which is dangerous in genuinely cold conditions.",
  "detail": "Alcohol dilates the blood vessels in your skin, sending a rush of warm blood to the surface. Temperature receptors in the skin report back 'warm.' But that heat is escaping into the environment through your skin — your core temperature is actually dropping.\n\nWorse, alcohol also blunts shivering — one of the body's key ways of generating heat — and impairs judgment. That's why drinking is a common factor in hypothermia deaths in cold regions: the person feels warm, so they take off layers, sit down outside, and then get hypothermia.",
  "origin": "Subjective sensation and objective physiology point in opposite directions here, and people can only perceive the first one.",
  "instead": "If it's really cold: dress properly, get indoors, drink something hot and non-alcoholic. And never give alcohol to someone already showing signs of hypothermia.",
  "sources": [
    {
      "label": "NHS — Hypothermia",
      "url": "https://www.nhs.uk/conditions/hypothermia/"
    }
  ]
},
  "baijiu-disinfect": {
  "belief": "Pour strong baijiu (Chinese distilled liquor) on a wound to disinfect it.",
  "truth": "Disinfection requires 70–75% alcohol. Even the strongest baijiu tops out around 60%, which doesn't get there.",
  "detail": "Interestingly, alcohol doesn't kill germs better at higher concentrations. 95% alcohol instantly coagulates the proteins on a bacterium's surface, forming a protective shell that actually stops the alcohol from penetrating further. Around 75% is the sweet spot between penetration and denaturation.\n\nA 52-proof baijiu is only 52% ethanol — below the effective concentration. It also contains sugars and other organic compounds that could, in theory, feed bacteria. And pouring liquor onto an open wound causes severe pain and tissue irritation.",
  "origin": "'Alcohol disinfects' is true, and 'baijiu is alcohol' is true — but the concentration requirement in between got skipped.",
  "instead": "For small wounds: rinsing with clean water or saline comes first, then you can use povidone-iodine (gentler than alcohol, doesn't sting the wound surface). Medical alcohol is for disinfecting intact skin, not for pouring into open wounds. Deep wounds, foreign objects, animal bites, or bleeding that won't stop — go to the hospital.",
  "sources": [
    {
      "label": "CDC — Chemical Disinfectants: Alcohol (effective concentration 60–90%)",
      "url": "https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html"
    }
  ]
},
  "phone-radiation": {
  "belief": "Phone and Wi-Fi radiation causes cancer — keep your phone away from the bed at night.",
  "truth": "Phones and Wi-Fi emit non-ionizing radiation, which doesn't carry enough energy to break chemical bonds or damage DNA.",
  "detail": "Ionizing radiation (X-rays, gamma rays, the high-energy end of ultraviolet) can knock electrons off atoms — that's how it damages DNA. The radiofrequency waves phones use have photon energies several orders of magnitude lower than visible light. They physically can't do that. Their only confirmed biological effect is slight heating.\n\nIn 2011, the WHO's International Agency for Research on Cancer (IARC) classified radiofrequency electromagnetic fields as Group 2B, 'possibly carcinogenic' — a classification often misread. 2B means 'limited evidence, can't be ruled out'; the same group includes aloe vera extract and pickled vegetables. Since then, the largest cohort studies (like the COSMOS study covering hundreds of thousands of people) have found no link between phone use and brain tumors, and brain tumor rates have not risen over the decades of mass mobile phone adoption.",
  "origin": "The ambiguity of the word 'radiation' again, plus the 2B classification being simplified by media into 'the WHO says phones may cause cancer.'",
  "instead": "No need to rearrange your life over radiation. Phones really do hurt sleep, but because the content is stimulating and the light suppresses melatonin — so keeping it away from the bed still makes sense, just not because of radiation.",
  "sources": [
    {
      "label": "National Cancer Institute (NCI) — Cell Phones and Cancer Risk",
      "url": "https://www.cancer.gov/about-cancer/causes-prevention/risk/radiation/cell-phones-fact-sheet"
    }
  ]
},
  "battery-charge": {
  "belief": "Run your phone down to empty before a full charge, and never charge it overnight — that ruins the battery.",
  "truth": "That was the rule for nickel-cadmium batteries decades ago. Lithium batteries actually hate deep discharge.",
  "detail": "The 'memory effect' is a trait of nickel-cadmium batteries; lithium-ion batteries don't have it. Lithium battery wear depends mostly on charge cycles and on time spent at high charge levels and high temperatures. Deep discharging to 0% actually accelerates aging.\n\nModern phones all have battery management systems. Once full, they cut off the charging circuit and run directly off the power supply — there's no 'trickle-charging all night.' Many systems also have optimized charging: they charge to 80%, pause, and top up just before your usual wake-up time.",
  "origin": "Correct advice from the nickel-cadmium era got inherited wholesale, long after battery chemistry moved on.",
  "instead": "Charge whenever it's convenient; keeping it between 20–80% day to day is kindest to battery life. What really hurts batteries is heat — don't charge in a sun-baked car or under a blanket.",
  "sources": [
    {
      "label": "Apple — Battery and Performance",
      "url": "https://support.apple.com/zh-cn/HT208387"
    }
  ]
},
  "more-detergent": {
  "belief": "More laundry detergent means cleaner clothes.",
  "truth": "Past a critical concentration, cleaning power stops improving. The extra detergent just ends up as residue in your clothes and your machine.",
  "detail": "Surfactants need to reach a certain concentration (the critical micelle concentration) to form micelles that trap grease — but once past that point, adding more doesn't improve cleaning. Excess detergent takes extra rinse cycles to remove, and in practice it often stays in the fabric fibers.\n\nThe consequences are concrete: stiff clothes, dulled colors, and possible skin irritation from residue on underwear. Detergent buildup inside the drum and hoses also feeds mold — that's where that washing-machine smell comes from.",
  "origin": "'More gets it cleaner' holds in plenty of situations (like using more water when mopping), so it got generalized onto a chemical process that has a saturation point.",
  "instead": "Follow the dosing marks on the package; if you have soft water, you can go lower. Scale down for small loads. Periodically run the machine's high-temperature tub-clean cycle.",
  "sources": [
    {
      "label": "ACI — Laundry detergent dosing guidance",
      "url": "https://www.cleaninginstitute.org/"
    }
  ]
},
  "sponge-microwave": {
  "belief": "Zap your kitchen sponge in the microwave and it's disinfected, good to keep using.",
  "truth": "It kills some bacteria — but the survivors tend to be the nastier ones.",
  "detail": "A German study examined used kitchen sponges and found extremely high bacterial densities (up to tens of billions per cubic centimeter). More strikingly, in sponges that were regularly 'cleaned' (microwaved or boiled), the surviving flora had a higher proportion of hardy, resistant species — the weak ones got killed, and the strong ones filled the freed-up niche.\n\nA sponge's porous structure, constant dampness, and clinging food residue make it a near-perfect bacterial culture medium.",
  "origin": "'Heat kills germs' is true, but 'kills most of them' doesn't mean 'back to clean' — the survivors just repopulate the whole sponge.",
  "instead": "Treat sponges as disposable: replace them every week or two. Wring them out and spread them somewhere ventilated after each use. For areas that touch raw meat, use a brush or a cloth you can wash hot — brushes stay drier than sponges.",
  "sources": [
    {
      "label": "Cardinale et al., Scientific Reports 2017 — kitchen sponge microbiome study",
      "url": "https://www.nature.com/articles/s41598-017-06055-9"
    }
  ]
},
  "sunscreen-cloudy": {
  "belief": "No need for sunscreen on cloudy days, in winter, or indoors.",
  "truth": "UVA passes through clouds and ordinary glass. It's there all year round.",
  "detail": "Clouds only block UV to a limited extent; a substantial share still reaches the ground on overcast days (the exact share varies with cloud type and thickness — thin cloud can even increase UV through scattering).\n\nUVA has a longer wavelength and stronger penetration. It passes through ordinary window glass (glass blocks most UVB, but not UVA). UVA reaches deep into the dermis and is the main driver of photoaging — wrinkles, sagging, dark spots. There's a famous clinical photograph of a truck driver whose left side sat by the window for three decades; the difference in aging between the two sides of his face is dramatic.",
  "origin": "People equate 'getting tanned' with 'UV damage.' Tanning is mostly UVB's immediate effect, while UVA damage accumulates silently.",
  "instead": "For daily wear, pick a broad-spectrum sunscreen (labeled PA+++ or broad spectrum). It's especially worth it if you work long hours by a window or commute by car. Physical barriers — hats, long sleeves, window film — work just as well.",
  "sources": [
    {
      "label": "Gordon & Brieva, NEJM 2012 — Unilateral Dermatoheliosis",
      "url": "https://www.nejm.org/doi/full/10.1056/NEJMicm1104059"
    }
  ]
},
  "thunder-phone": {
  "belief": "Don't use your phone indoors during a thunderstorm — it attracts lightning.",
  "truth": "A phone is a battery-powered wireless device. It won't draw lightning into your house.",
  "detail": "Lightning strikes objects that are tall, conductive, and well-grounded. A phone is small, ungrounded, and transmits at very low power (under 1 watt). It doesn't meet any of the conditions.\n\nWhat actually deserves caution indoors is wired connections: using a phone while it's plugged into the charger, corded landline phones, devices connected by Ethernet cable — lightning can travel in over power or communication lines. Metal plumbing is another path, which is why showering during a thunderstorm isn't recommended.",
  "origin": "The impression that 'metal attracts lightning,' merged with real old cases of people being shocked on corded phones during storms — and the combined belief got projected onto cellphones.",
  "instead": "Using your phone indoors during a storm is fine, but unplug the charging cable. Avoid corded phones, skip the shower, and stay away from windows and metal pipes. If you're outdoors, get into a building or a car as soon as you can.",
  "sources": [
    {
      "label": "NOAA — Lightning Safety Myths",
      "url": "https://www.weather.gov/safety/lightning-myths"
    }
  ]
},
  "cotton-swab": {
  "belief": "Earwax needs regular digging — give it a twist with a cotton swab to really clean it out.",
  "truth": "Earwax is a protective secretion that clears itself. A cotton swab just pushes it deeper — and can injure the ear canal and eardrum.",
  "detail": "Earwax (cerumen) isn't dirt: it's antibacterial, lubricating, and keeps out dust. The ear canal cleans itself — as you chew and talk, the canal skin acts like a conveyor belt, slowly carrying wax out. ENT clinical guidelines put it bluntly: don't put cotton swabs or ear picks into the ear canal. What swabs actually do, often, is pack the wax into an impacted plug. Emergency rooms also see plenty of swab tips left behind in ear canals, and even perforated eardrums.\n\nTo be fair: wax impaction does happen (frequent in-ear headphone users are more prone), with symptoms like fullness and muffled hearing — but that's for a doctor to handle, not for you to dig at with tools.",
  "origin": "The instant feedback of 'something came out' feels great, and swabs are right there at home. The satisfying feeling got mistaken for effectiveness.",
  "instead": "Wiping the outer ear with a towel after a shower is enough. If your ear feels blocked, full, or muffled, see an ENT — a doctor can flush it out in a minute.",
  "sources": [
    {
      "label": "Schwartz et al., Otolaryngol Head Neck Surg 2017 — AAO-HNS earwax clinical practice guideline",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28045632/"
    }
  ]
},
  "alkaline-diet": {
  "belief": "An acidic body is the root of all disease — eat alkaline foods and drink alkaline water to neutralize it.",
  "truth": "Your lungs and kidneys hold blood pH precisely at 7.35–7.45; food can't move it at all. 'Acid vs. alkaline body types' was a marketing concept from day one.",
  "detail": "'Acidic' and 'alkaline' foods do change the pH of your urine — but that's just the result of your kidneys dumping out the excess acid, which actually proves the buffering system is working. If food really shifted your blood pH by even a few tenths, that's acidosis or alkalosis — an ICU situation, not something lemon water can adjust. A 2016 systematic review in BMJ Open specifically examined the evidence for 'alkaline diets preventing cancer': no human studies support it.\n\nTo be fair: eating more vegetables and fruit is a good habit anyway — but the benefits come from fiber, vitamins, and the high-calorie foods they replace, not from 'alkalinity.'",
  "origin": "The concept spread worldwide in the 2000s through a few bestsellers and 'acid-alkaline self-test charts,' amplified in the Chinese-speaking world by wellness accounts. Its originator, Robert O. Young, was later convicted in the US of practicing medicine without a license — the concept itself didn't disappear with him.",
  "instead": "Save the money you'd spend on alkaline water. There are plenty of good reasons to eat a balanced diet; 'balancing your pH' isn't one of them.",
  "sources": [
    {
      "label": "Fenton & Huang, BMJ Open 2016 — systematic review of dietary acid load, alkaline water, and cancer",
      "url": "https://pubmed.ncbi.nlm.nih.gov/27297008/"
    }
  ]
},
  "magnet-bracelet": {
  "belief": "Magnetic bracelets and magnetic mattresses boost circulation and cure all kinds of pain.",
  "truth": "The verdict from pooled randomized controlled trials: static magnets work no better for pain than placebo.",
  "detail": "A 2007 meta-analysis in CMAJ pooled randomized controlled trials of static magnets for pain relief: combining the 9 adequately blinded trials, the difference in pain improvement between magnet and control groups was 2.1 mm on a 100 mm pain scale — not statistically significant, and clinically meaningless.\n\nTo be fair: in the small osteoarthritis subgroup, the evidence wasn't strong enough to fully rule out some effect — the authors' own words were that it's 'worthy of further study.' But big claims like 'promoting circulation and curing disease' have no evidential support. Incidentally, the iron in your blood is bound in hemoglobin and isn't ferromagnetic — a magnet can't pull on it.",
  "origin": "Magnetic fields are invisible, untouchable, and carry a whiff of 'science' — perfect raw material for wellness products. The fact that wearing one feels nice is fully explained by the placebo effect and pain's natural ups and downs.",
  "instead": "If something hurts, find out why before buying gadgets. If you already bought one, no need to throw it out — it's almost certainly harmless. It's just useless.",
  "sources": [
    {
      "label": "Pittler et al., CMAJ 2007 — systematic review and meta-analysis of static magnets for pain",
      "url": "https://pubmed.ncbi.nlm.nih.gov/17893349/"
    }
  ]
},
  "standing-desk": {
  "belief": "Get a standing desk — work standing up and you'll lose weight and fix your back pain.",
  "truth": "Standing burns only about 9 extra kcal per hour compared to sitting. Weight loss from it isn't realistic — it's a comfort tool, not a health device.",
  "detail": "A 2018 meta-analysis pooling 46 studies did the math clearly: the energy-expenditure difference between standing and sitting is 0.15 kcal per minute. Standing 6 hours a day burns about 54 extra kcal — in theory about 2.5 kg of fat over a year, but only if your eating doesn't increase at all, and in reality standing makes you hungry enough for one more bite.\n\nTo be fair: standing desks aren't worthless — breaking up long stretches of sitting is itself beneficial, and some people do get relief from back discomfort. But a standing desk won't fix an existing lumbar problem, and it's not a weight-loss plan.",
  "origin": "After 'sitting is the new smoking' went viral, the standing desk became the ready-made antidote product. The first step of fear marketing is manufacturing the fear.",
  "instead": "A free plan that works better than buying a desk: get up and walk for two minutes every half hour, take the stairs to get water. If you do buy one, get an adjustable sit-stand model and alternate.",
  "sources": [
    {
      "label": "Saeidifard et al., Eur J Prev Cardiol 2018 — meta-analysis of energy expenditure differences between standing and sitting",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29385357/"
    }
  ]
},
  "iodine-salt": {
  "belief": "Iodized salt causes thyroid nodules — who still dares eat it?",
  "truth": "The surge in nodules mostly comes from ultrasound screening 'finding' them. The real risk sits at the other end — too little iodine.",
  "detail": "Thyroid nodule detection rates at annual checkups easily run into the tens of percent, but that's because high-resolution ultrasound now picks up nodules a few millimeters across. They couldn't be felt or seen before — that doesn't mean they weren't there. There is currently no solid evidence linking properly iodized salt to thyroid nodules or thyroid cancer. The evidence on the other side is stronger: iodine is the raw material for thyroid hormones. Deficiency causes goiter, and deficiency in pregnancy harms fetal brain development — which is exactly why China rolled out universal salt iodization in 1995.\n\nOne caveat: more iodine isn't always better — excessive intake is linked to higher risks of subclinical hypothyroidism and autoimmune thyroiditis (confirmed by comparative studies across Chinese regions with different iodine intake levels). If you've been diagnosed with hyperthyroidism or Hashimoto's thyroiditis, follow your doctor's advice on which salt to use.",
  "origin": "Rising nodule detection and the salt iodization policy overlapped in time, and the two got welded together as cause and effect — plus the instinct that 'anything added later must be suspicious.'",
  "instead": "Ordinary households can just keep eating iodized salt; people with a history of thyroid disease should ask their endocrinologist. Rather than fussing over salt, follow your doctor's advice and get that few-millimeter nodule in your checkup report re-checked on schedule.",
  "sources": [
    {
      "label": "Teng et al., N Engl J Med 2006 — comparative study of iodine intake levels and thyroid disease in China",
      "url": "https://www.nejm.org/doi/full/10.1056/NEJMoa054022"
    }
  ]
},
  "nosebleed": {
  "belief": "For a nosebleed, tilt your head back — or raise the arm on the opposite side.",
  "truth": "Tilting your head back sends blood down your throat. The right move is to lean forward.",
  "detail": "Tilting your head back doesn't stop the bleeding; it just routes blood down the back of your nose into your throat, where you can't see it. Swallowed blood irritates the stomach lining and can cause nausea and vomiting, and in large amounts there's a risk of aspiration — especially dangerous for children and anyone not fully conscious.\n\nThe vast majority of nosebleeds come from a plexus of vessels in the front-lower part of the nasal septum (Little's area), very close to the surface, so direct pressure stops them. 'Raising the opposite arm' has no physiological basis whatsoever.",
  "origin": "After you tilt your head back, you really do 'stop seeing blood' — that instant feedback makes people think it worked. A move reinforced by misleading feedback.",
  "instead": "Sit down, lean slightly forward, and pinch the soft part of the nostrils (not the bony bridge) with thumb and forefinger. Hold continuously for 10–15 minutes without letting go to check. An ice pack on the bridge of the nose can help. If it's still bleeding after a full 20 minutes of pressure, if the bleeding is heavy, or if it was caused by an injury, go to the emergency room.",
  "sources": [
    {
      "label": "NHS — Nosebleed",
      "url": "https://www.nhs.uk/conditions/nosebleed/"
    }
  ]
},
  "fever-sweat": {
  "belief": "Sweat out a fever — bundle up under heavy blankets until you sweat, and the fever breaks.",
  "truth": "Bundling up blocks heat loss and pushes body temperature even higher. In infants, overheating from wrapping can be fatal.",
  "detail": "During a fever, the body's temperature set point is raised, so it actively produces heat and reduces heat loss — that's why you feel cold and shiver. Wrapping up tight at that moment blocks heat loss even further, and your core temperature just keeps climbing.\n\nInfants have immature temperature regulation and sweat-gland function. Overwrapping can cause 'muggy syndrome' (infant heat stress from over-bundling) — high fever, profuse sweating, dehydration, convulsions, and in severe cases multi-organ damage or death. Chinese pediatric literature carries clear warnings about this.\n\nThe sweating that happens when a fever breaks is the result of the temperature coming down, not the cause. The cause and effect are reversed.",
  "origin": "You really do sweat when a fever breaks — the sequence just got read backwards: sweating doesn't end the fever; the fever ending makes you sweat.",
  "instead": "Dress light and breathable, use a thin blanket, keep the room ventilated. Drink plenty of fluids. When needed, use acetaminophen or ibuprofen dosed by weight. Fever in a baby under three months, a high fever that won't come down, listlessness, convulsions, or a rash — seek medical care immediately.",
  "sources": [
    {
      "label": "NHS — Fever in children",
      "url": "https://www.nhs.uk/conditions/fever-in-children/"
    }
  ]
},
  "alcohol-rub-fever": {
  "belief": "Rub a feverish child down with alcohol to bring the temperature down.",
  "truth": "Alcohol can be absorbed through the skin and airways, putting children at risk of poisoning. No major guideline recommends it.",
  "detail": "Children have a large surface-area-to-weight ratio and a thinner skin barrier, so an alcohol rubdown can be absorbed through the skin, and the evaporating vapors get inhaled. Cases of low blood sugar, altered consciousness, and even coma have been reported.\n\nOn top of that, rapid evaporation causes skin blood vessels to constrict and triggers shivering — and shivering generates heat, which can push core temperature up instead. The cooling effect may not even materialize. For these reasons, mainstream pediatric guidelines explicitly advise against alcohol rubdowns.",
  "origin": "'Evaporating alcohol absorbs heat' is a true physical fact — but it ignores two physiological problems: skin absorption and the shivering response.",
  "instead": "Use acetaminophen or ibuprofen dosed by weight (babies under three months: see a doctor first, don't medicate on your own). A sponge-down with warm water (about 32–34°C) can be a comfort measure. The core of care is hydration and watching the child's mental state.",
  "sources": [
    {
      "label": "NICE guideline NG143 — Fever in under 5s",
      "url": "https://www.nice.org.uk/guidance/ng143"
    }
  ]
},
  "burn-toothpaste": {
  "belief": "Put toothpaste, soy sauce, sesame oil, or ice on a burn.",
  "truth": "All of these worsen the damage or get in the way of proper treatment. The right move is cool running water.",
  "detail": "Toothpaste, soy sauce, and the like form a coating over the burn that traps heat in the tissue, contaminates the wound, and raises the risk of infection. Dark soy sauce and sesame oil covering the surface also make it hard for doctors to judge the burn's depth — and scrubbing them off during wound cleaning adds extra pain and damage.\n\nIce directly on the skin doesn't work either — the extreme cold makes local blood vessels clamp down hard, worsening tissue ischemia, and can cause frostbite, turning a second-degree burn into a deeper one.",
  "origin": "A combination of two instincts: 'something cold brings the temperature down' and 'smear something on to seal out the air.' The first half points the right way; the second half does the damage.",
  "instead": "Rinse, remove, soak, cover, go: immediately run cool (not ice-cold) water over the burn for 20 minutes; carefully remove clothing over the burn — if it's stuck, don't tear it off; keep soaking in cool water to ease the pain; cover loosely with clean gauze or plastic wrap; if the burn is large, has big blisters, involves the face, hands, or genitals, or is deep, get to a hospital as soon as possible.",
  "sources": [
    {
      "label": "NHS — Burns and scalds: first aid",
      "url": "https://www.nhs.uk/conditions/burns-and-scalds/treatment/"
    }
  ]
},
  "seizure-mouth": {
  "belief": "During a seizure, press the philtrum (the groove under the nose) and wedge something into the mouth so they don't bite their tongue.",
  "truth": "Putting things in the mouth causes broken teeth, jaw injuries, and choking. People do not bite off their own tongues.",
  "detail": "A tongue bitten during a seizure is usually a superficial wound along the side edge that heals on its own. Forcing the jaw open and jamming something in carries far bigger risks: broken teeth, a dislocated temporomandibular joint, the rescuer's fingers getting bitten — and if the object shatters or slips into the airway, it can cause choking.\n\nPressing the philtrum does nothing to end a seizure either; it just leaves marks on the person's face. And forcibly holding down convulsing limbs can cause fractures or muscle injuries.\n\nMost generalized tonic-clonic seizures stop on their own within 1–3 minutes.",
  "origin": "The horrifying image of 'biting off the tongue' is vivid and endlessly replayed in movies and TV, so 'must wedge something in' became a reflex.",
  "instead": "Move hard and sharp objects away from the person; cushion their head with something soft; loosen the collar; don't hold down the limbs; put nothing in the mouth; when the seizure ends, roll them onto their side (recovery position) to keep the airway clear; time the seizure. Call an ambulance (120 in China) immediately if it lasts more than 5 minutes, if seizures repeat back-to-back, if it's a first seizure, if consciousness doesn't return for a long time afterward, or if there's an injury.",
  "sources": [
    {
      "label": "Epilepsy Foundation — Seizure First Aid",
      "url": "https://www.epilepsy.com/recognition/seizure-first-aid"
    },
    {
      "label": "CDC — First Aid for Seizures",
      "url": "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html"
    }
  ]
},
  "drowning-silent": {
  "belief": "A drowning person will scream for help and thrash wildly — you'd definitely notice.",
  "truth": "Real drowning is almost silent. It often goes unnoticed even with people right nearby.",
  "detail": "A drowning person's respiratory system is fully occupied dealing with water, and the airflow needed for speech gets sacrificed to breathing — so they can't shout. Their arms instinctively press down and out on the water to lift the mouth and nose above the surface, so they can't wave for help. The body stays mostly vertical through it all, with no visible kicking.\n\nFrank Pia of the US Coast Guard named this pattern the 'Instinctive Drowning Response.' It typically lasts only 20–60 seconds before the person slips underwater. A significant share of child drownings happen with adults right nearby.",
  "origin": "In movies and TV, drowning always comes with screams and violent splashing — that's so the audience understands what's happening. It's not reality.",
  "instead": "Watch for these signs: head tilted back with mouth open, glassy or closed eyes, upright in the water with no kicking, trying to swim in a direction but not moving, hair over the eyes and not brushed away, looking like they're 'climbing an invisible ladder.' If someone in the water is quietly acting off, just call out to them — no answer means they need rescue. When kids are swimming, never take your eyes off them.",
  "sources": [
    {
      "label": "Pia, On Scene — Instinctive Drowning Response",
      "url": "https://www.uscg.mil/"
    },
    {
      "label": "CDC — Drowning Prevention",
      "url": "https://www.cdc.gov/drowning/prevention/index.html"
    }
  ]
},
  "heimlich-baby": {
  "belief": "If someone's choking, give them a sip of water to wash it down.",
  "truth": "Water makes an already-blocked airway more dangerous. The airway and the esophagus are two different paths.",
  "detail": "A foreign object lodged in the airway won't be flushed down by water — the water itself has to pass through the pharynx, and it can trigger choking and aspiration, making things worse. Don't sweep blindly inside the mouth with a finger either; that often pushes the object deeper.\n\nJudging whether the obstruction is complete matters: if the person can still cough or make sounds, air is still getting through — encourage hard coughing. If they can't cough audibly, can't speak, clutch their throat with both hands, or turn blue, that's a complete obstruction and you must act immediately.",
  "origin": "'Wash it down' is experience from food stuck in the esophagus (where a drink of water really does help), misapplied to an airway obstruction.",
  "instead": "For complete obstruction in adults and children over one year: stand behind them and alternate 5 back blows (heel of the hand between the shoulder blades) with 5 abdominal thrusts (the Heimlich maneuver), repeating until the object comes out. For infants under one year, switch to 5 back blows plus 5 chest thrusts — no abdominal thrusts. If the person loses consciousness, start CPR. Call an ambulance (120 in China) at the same time. These moves are worth practicing once in a real training session.",
  "sources": [
    {
      "label": "American Red Cross — Adult & Child Choking: Symptoms and First Aid",
      "url": "https://www.redcross.org/take-a-class/resources/learn-first-aid/adult-child-choking"
    },
    {
      "label": "St John Ambulance — Choking (includes infant procedure)",
      "url": "https://www.sja.org.uk/first-aid-advice/choking/"
    }
  ]
},
  "cpr-hard": {
  "belief": "If CPR breaks someone's ribs, you pushed too hard and did it wrong.",
  "truth": "Broken ribs are common in properly performed CPR — it doesn't mean you did it wrong. Holding back for fear of breaking ribs is what actually kills.",
  "detail": "Effective chest compressions require a depth of 5–6 cm at a rate of 100–120 per minute. Applied to an adult's rib cage, that force can produce skeletal injuries. One study that CT-scanned patients after resuscitation found that nearly 30% of those who regained spontaneous circulation had rib or sternum fractures — and the fractures showed no significant correlation with whether compressions were done correctly.\n\nKeep the priorities straight: rib fractures heal; a cardiac arrest without compressions means irreversible brain damage within minutes. Resuscitation guidelines are explicit: don't ease off or stop compressions out of fear of fractures.",
  "origin": "'Saved the person but injured them' obviously sounds like malpractice. The two most common hesitations among lay rescuers — not daring to press, pressing too shallow — both trace back to this worry.",
  "instead": "Take a proper first-aid course (the Red Cross often offers free classes), learn the right depth and rate, then press with confidence. Good Samaritan laws in many places also protect emergency rescuers.",
  "sources": [
    {
      "label": "Zaidi et al., Resuscitation Plus 2020 — CT evaluation of chest complications after CPR",
      "url": "https://pubmed.ncbi.nlm.nih.gov/34223300/"
    }
  ]
},
  "stroke-needle": {
  "belief": "During a stroke, prick the fingertips to let blood out — it's life-saving first aid.",
  "truth": "Bleeding a fingertip can't reach the problem inside the brain — and in an ischemic stroke, about 1.9 million neurons die for every minute of delay.",
  "detail": "Strokes come in two types: a blocked vessel (ischemic, the majority) and a ruptured vessel (hemorrhagic). Either way, letting blood from a fingertip does nothing to the lesion inside the skull. The treatments that actually work for ischemic stroke are clot-busting drugs and clot retrieval, and both have strict time windows — the classic 'time is brain' calculation: with a large-vessel blockage, about 1.9 million neurons die every minute. Every minute spent pressing the philtrum, pricking fingers, or giving water is spending down the patient's brain 'savings.'\n\nThe deadlier part is false reassurance: fingers pricked, let's wait and see — and the treatment window quietly closes.",
  "origin": "Bloodletting has a thousand-year history in both East and West, and 'let out the stagnant blood and the blockage clears' fits an intuitive picture of a clogged pipe. Posts sharing these 'first-aid tricks' often fly the flag of 'what doctors won't tell you.'",
  "instead": "Remember FAST: Face drooping, Arm weakness on one side, Speech slurred — Time to call 120 (China's emergency number). While waiting for the ambulance, lay the person on their side. No water, no pills, nothing else.",
  "sources": [
    {
      "label": "Saver, Stroke 2006 — Time is brain—quantified",
      "url": "https://pubmed.ncbi.nlm.nih.gov/16339467/"
    },
    {
      "label": "Chinese Stroke Association — stroke first-aid education (recognition, calling for help, time windows)"
    }
  ]
},
  "sick-yearly": {
  "belief": "Getting sick once or twice a year is good for you — it purges the illness and trains your immune system",
  "truth": "Being sick doesn't purge anything or train anything — you keep catching colds simply because there are 200+ cold viruses, and each one needs its own immunity.",
  "detail": "The common cold is caused by more than 200 different viruses (rhinoviruses, coronaviruses, adenoviruses...). One infection gives you fairly solid immunity to that one strain; the next strain walks right in. There is no physiological mechanism that needs a yearly illness to stay in shape, and no evidence that people who get sick often have stronger immune systems. What actually correlates with resistance is far less legendary: sleep, vaccination, and managing chronic conditions.\n\nTo be fair: the hygiene hypothesis does discuss a link between early-life microbial exposure and allergy risk — but that's about environmental microbes, and it's a population-level correlation. It doesn't follow that deliberately getting sick is beneficial.",
  "origin": "People notice that kids catch colds constantly and adults rarely do, and reverse-engineer 'getting sick builds you up'. Adults catch fewer colds because they've already met most of the common strains over decades — that's prior exposure, not training through illness.",
  "instead": "A cold is neither worth pursuing nor a badge of honor to tough out. Sleep well, get the flu shot, wash your hands. And if you do get sick, rest and hydrate — no need to tell yourself your body is leveling up.",
  "sources": [
    {
      "label": "CDC — About Common Cold (more than 200 viruses can cause it)",
      "url": "https://www.cdc.gov/common-cold/about/index.html"
    }
  ]
},
  "craving-deficiency": {
  "belief": "Craving a specific food means your body is missing a nutrient it contains",
  "truth": "Cravings almost never come from nutrient deficiencies — they're driven by psychology, hormones, and dietary restriction. The one exception is iron deficiency, which causes pica.",
  "detail": "Pairings like 'craving chocolate means you need magnesium' or 'craving red meat means you need protein' are everywhere, but a biopsychosocial review of the evidence is clear: there is no reliable mapping between food cravings and nutrient deficiencies. What reliably predicts cravings in experiments is something else entirely: being on a restrictive diet, emotional states, and exposure to food cues.\n\nThe one well-documented exception runs in the opposite direction: iron deficiency can cause pica — intense cravings for ice, dirt, and other things with no nutritional value — and the cravings vanish with iron supplementation. Note the direction: the deficiency makes you crave things that don't contain it, which is exactly backwards from 'you crave what your body needs'.",
  "origin": "The idea that 'your body knows what it needs better than you do' feels both mystical and comforting — and it conveniently absolves a sweet tooth: it's not me, it's my body. Stories that legitimize desire have always spread fast.",
  "instead": "If you crave something, have a little — it's fine. For cravings that feel out of control, look at sleep, stress, and whether you're restricting too hard. And if you suddenly crave ice or chalky textures, get your ferritin checked.",
  "sources": [
    {
      "label": "Rogers & Smit, Pharmacol Biochem Behav 2000 — the evidence on food craving from a biopsychosocial perspective",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10837838/"
    },
    {
      "label": "Mabe et al., Transfus Med 2022 — pica (ice craving) and iron deficiency",
      "url": "https://pubmed.ncbi.nlm.nih.gov/35750589/"
    }
  ]
},
  "pregnancy-taboos": {
  "belief": "When you're pregnant you must avoid everything — coffee, crab, hawthorn — and ideally stay in bed the whole time",
  "truth": "The evidence-based avoid list in pregnancy is short — alcohol, smoking, raw foods, high-mercury fish. Most taboos have no evidence, and bed rest can actually do harm.",
  "detail": "The list of pregnancy restrictions with real evidence behind it is short: alcohol (no safe dose), smoking, raw meat and eggs and unpasteurized dairy (listeria, toxoplasma), large high-mercury fish, and caffeine capped at 200 mg a day (ACOG). The long folk list beyond that — crab being 'too cooling', hawthorn 'causing miscarriage', lychees, soy sauce 'darkening the baby's skin' — has no research support. More than half of early miscarriages are caused by chromosomal abnormalities in the embryo, not by anything the mother ate.\n\nBed rest is the bigger worry. A Cochrane review found no evidence that bed rest prevents miscarriage; trials of activity restriction for preterm-birth risk likewise found no benefit — and bed rest clearly increases the risk of blood clots, muscle loss, and bone loss. ACOG and SMFM do not recommend it as a safeguard. Exercise, on the other hand, is recommended: at least 150 minutes a week of moderate activity for women without complications lowers the risk of gestational diabetes and preeclampsia.\n\nCoffee deserves a caveat: ACOG holds that under 200 mg a day (about one and a half medium Americanos) has no clear link to miscarriage or preterm birth, though some meta-analyses say a dose relationship can't be ruled out. The sensible move is moderation — neither total abstinence nor unlimited refills. Phones and computers, hair dye, and everyday cosmetics are similar: non-ionizing radiation has no evidence of harming a fetus, and the skin absorption from hair dye is far too low to matter.",
  "origin": "Obstetrics historically ran on a 'what if' logic: any bad outcome could be blamed on something the mother did, so every mishap added one more line to the taboo list. Layer on a culture of pregnancy protection and the quiet stigma around miscarriage, and 'better safe than sorry' snowballs. Many items on the list are essentially rare risks treated as certainties.",
  "instead": "Follow the short list: no alcohol or smoking, cook meat and eggs through, drink pasteurized milk, skip high-mercury fish, keep coffee to one small cup a day. Stay active and keep exercising — don't lie still. If you have a cat, delegate the litter box (toxoplasma). For medications and checkups, listen to your OB — not the family group chat.",
  "sources": [
    {
      "label": "ACOG Committee Opinion 804 (2020) — Physical Activity and Exercise During Pregnancy",
      "url": "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/04/physical-activity-and-exercise-during-pregnancy-and-the-postpartum-period"
    },
    {
      "label": "ACOG Committee Opinion 462 (2010) — Moderate Caffeine Consumption During Pregnancy",
      "url": "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2010/08/moderate-caffeine-consumption-during-pregnancy"
    },
    {
      "label": "NHS — Foods to avoid in pregnancy",
      "url": "https://www.nhs.uk/pregnancy/keeping-well/foods-to-avoid/"
    },
    {
      "label": "Aleman et al., Cochrane Database Syst Rev 2005 — bed rest for preventing miscarriage (no evidence of benefit)",
      "url": "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003576.pub2/full"
    }
  ]
},
}
