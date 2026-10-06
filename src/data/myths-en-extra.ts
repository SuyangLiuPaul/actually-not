/**
 * 新板块条目的英文翻译。由 scripts/merge-staging.mjs 生成，别手改。
 */
import type { MythText } from '../types'

export const MYTHS_EN_EXTRA: Record<string, MythText> = {
  "film-silencer": {
    "belief": "Put a silencer on a gun and all you hear is a soft 'pfft' — nobody nearby can hear a thing",
    "truth": "A suppressor makes a gunshot quieter, not quiet; the shooter's ears are still in a range that can damage hearing.",
    "detail": "A measurement study in the International Journal of Audiology (Campbell et al., 2018) tested guns with and without suppressors. At the shooter's ear, noise dropped by roughly 17–24 dB; one metre behind the shooter it dropped by about 20–28 dB; overall sound power fell by 2–23 dB. Those are real reductions, but a long way from 'inaudible'.\n\nThe study also found that low-velocity (subsonic) ammunition gave the biggest reduction, because there is no sharp supersonic crack from the bullet. The authors' conclusion is restrained: even with suppressors, cumulative exposure can still pose a significant hearing risk, and shooters should always wear hearing protection.",
    "origin": "Films often use a soft sound effect to signal 'silent', and after enough viewings that effect starts to feel like how things really sound. That is a reasonable inference only; we did not trace it to any one film.",
    "instead": "Treat the movie 'pfft' as sound design. In reality a suppressor is a noise-reduction device, not a silencing device, and hearing protection is still needed whenever firearms are used.",
    "sources": [
      {
        "label": "Campbell AR et al., International Journal of Audiology 2018;57(Suppl 1):S28–S41 — Reduction of gunshot noise and auditory risk with firearm suppressors and low-velocity ammunition",
        "url": "https://stacks.cdc.gov/view/cdc/211059"
      }
    ]
  },
  "film-cpr-always-works": {
    "belief": "On TV, a few chest compressions bring the person back — CPR saves most people",
    "truth": "Screen CPR works far better than real CPR: out-of-hospital cardiac arrest survival to discharge in the US has hovered around one in ten.",
    "detail": "In 1996 Diem and colleagues counted CPR in 97 episodes of ER, Chicago Hope and Rescue 911 in the New England Journal of Medicine: 60 CPR events, 75% of patients survived the immediate arrest and about 67% appeared to survive to discharge. The authors concluded this was significantly higher than the most optimistic survival rates in the medical literature and could give viewers an unrealistic impression.\n\nReal numbers: 2024 CARES registry data, as cited alongside the American Heart Association's 2025 statistics update, put median adult survival to hospital discharge after out-of-hospital arrest at about 10.4%, essentially unchanged for 30 years. Bystander CPR was given in about 41.7% of cases, and survival was about 13.0% with it versus 7.6% without. CPR is not magic, but it is one of the few things that can buy someone a better chance before an ambulance arrives.",
    "origin": "Medical dramas need tight, hopeful plots, so successful resuscitations are filmed far more often than failed ones. On screen the patients are also mostly young people with trauma, unlike real arrests, which mostly involve older people with heart disease. Both push expectations up.",
    "instead": "Lower real-world odds are a reason to act, not to hold back. If someone collapses, does not respond and is not breathing normally, call emergency services first (China 120 / Australia 000 / US 911), follow the dispatcher's instructions, and get an AED if one is available. This is also the CDC's sequence.",
    "sources": [
      {
        "label": "Diem SJ, Lantos JD, Tulsky JA, NEJM 1996 — Cardiopulmonary resuscitation on television: miracles and misinformation"
      },
      {
        "label": "Sudden Cardiac Arrest Foundation — latest statistics (citing AHA 2025 Heart and Stroke Statistics and the 2024 CARES annual report)",
        "url": "https://sca-aware.org/about-sudden-cardiac-arrest/latest-statistics"
      },
      {
        "label": "CDC — out-of-hospital cardiac arrest and what to do",
        "url": "https://www.cdc.gov/heart-disease/about/cardiac-arrest.html"
      }
    ]
  },
  "film-quicksand": {
    "belief": "Quicksand swallows people whole, and the more you struggle the deeper you sink",
    "truth": "Experiments show a person cannot be completely sucked under; at most you sink about halfway. The hard part is getting out, not being swallowed.",
    "detail": "In 2005 Khaldoun and colleagues studied the rheology of quicksand in Nature. Nature's news report says quicksand is denser than a human body: aluminium beads of human density never sank more than halfway, so the probability of a person being completely sucked in is 'nil'.\n\nThe real problem is escape. The report says the force needed to pull a foot out is comparable to lifting a medium-sized car, but if you wait long enough the grains settle and buoyancy floats you back toward the surface.",
    "origin": "Adventure films like quicksand because it is a slow-acting trap: it gives the hero time for dialogue and the rescuers time to arrive. Decades of that imagery turned it into 'common knowledge'.",
    "instead": "Think of quicksand as a mire that is very hard to pull a leg out of, not a monster that eats people. For how to get free in practice, follow local rescue-agency guidance; we are not offering personal safety instructions here.",
    "sources": [
      {
        "label": "Nature News, 28 Sep 2005 — report on Khaldoun et al.'s quicksand study (Nature 2005, 'Liquefaction of quicksand under stress')",
        "url": "https://www.nature.com/news/2005/050926/full/news050926-9.html"
      }
    ]
  },
  "film-coma-wakeup": {
    "belief": "In films a person who has been in a coma for years wakes up neatly groomed, with no wasting, and quickly recovers fully",
    "truth": "Neurologists reviewed 30 films with prolonged comas and found only 2 portrayed it reasonably accurately.",
    "detail": "Mayo Clinic neurologist Eelco Wijdicks and Coen Wijdicks reviewed 30 films in the 9 May 2006 issue of Neurology. Common distortions: people waking after years with no physical or cognitive problems; 'Sleeping Beauty' patients with no feeding tubes, no muscle loss and perfect grooming; and eyes closed in all but one film, whereas people in prolonged comas often have their eyes open or able to open.\n\nThey also showed clips to 72 people without medical training: more than a third of the time viewers could not spot important inaccuracies, 31% thought a comatose person could tap out Morse code, and 39% said such scenes would influence decisions about their own family members. That influence is what worried the authors.",
    "origin": "'Miraculous awakening after a long sleep' is a ready-made, heart-warming, dramatic plot that is easy to write. Real recovery is long, uncertain and not very cinematic, so it is rarely filmed.",
    "instead": "If a relative is actually in a coma, ask the treating doctors and care team about their specific situation and outlook rather than using film plots as a guide.",
    "sources": [
      {
        "label": "American Academy of Neurology press release — Wijdicks E, Wijdicks C, Neurology 9 May 2006: portrayal of coma in films",
        "url": "https://www.aan.com/pressroom/home/pressrelease/391"
      },
      {
        "label": "HealthDay — coverage of the study",
        "url": "https://www.healthday.com/health-news/neurology/it-s-not-a-real-coma-it-just-looks-like-one-532556.html"
      }
    ]
  },
  "film-amnesia-second-blow": {
    "belief": "A second knock on the head cures amnesia, and amnesiacs otherwise get on fine with life",
    "truth": "A neuropsychologist's review of film amnesia found it bears little relation to reality, and a 'second blow cure' makes no neurological sense.",
    "detail": "Sallie Baxendale of the National Hospital for Neurology and Neurosurgery in London analysed amnesia in films in the BMJ in 2004. According to coverage of the paper, film amnesiacs typically function on a 'clean slate' with few everyday problems, whereas real patients have significant difficulty taking in new information, making many everyday tasks extremely hard.\n\nOther common errors: amnesia changing someone's personality (for example bad characters turning good), when in reality personality and identity are usually unaffected; and a second serious head injury reversing the first, which the author calls one of the most neurologically bizarre features of film amnesia. Hypnosis or seeing familiar things curing amnesia is also rarely effective in reality.",
    "origin": "Amnesia is a handy dramatic device: it gives a hero a fresh start, suspense and an identity mystery. Writers need not respect neuroscience, and audiences rarely get to compare with real cases.",
    "instead": "Enjoy amnesia as a plot device. If someone you know has real memory problems, or is confused after a head injury, have a doctor assess them rather than relying on 'another knock' or similar ideas.",
    "sources": [
      {
        "label": "Baxendale S, BMJ 2004;329(7480):1480–1483 — Memories aren't made of this: amnesia at the movies"
      },
      {
        "label": "ScienceDaily, Dec 2004 — coverage of Baxendale's paper",
        "url": "https://www.sciencedaily.com/releases/2004/12/041219161255.htm"
      }
    ]
  },
  "film-vacuum-explode": {
    "belief": "A person exposed to the vacuum of space explodes or instantly freezes solid",
    "truth": "The body does not explode or flash-freeze; the real danger is lack of oxygen, with unconsciousness in roughly 15 seconds.",
    "detail": "A Harvard Science in the News article says space has no 'temperature' of its own and, with radiation the only way to shed heat in a vacuum, you would not freeze instantly. The real hazards are expanding air damaging the lungs, body fluids forming gas bubbles at low pressure (ebullism), and hypoxia: deoxygenated blood reaches the brain in about 15 seconds, causing unconsciousness.\n\nAn aerospace explainer summarises 1950s–60s NASA and US Air Force animal experiments and incidents such as a 1965 NASA pressure-suit leak: a person stays conscious for roughly 10–15 seconds, may survive about 90 seconds with relatively minor, reversible effects if recompressed in time, and death becomes unavoidable after roughly two to four minutes.",
    "origin": "Science fiction wants a striking image, and 'bursting' and 'flash freezing' are the most vivid. 'Vacuum' also sounds like an extreme force, so it is easy to imagine the body being torn apart.",
    "instead": "Treat such scenes as visual effects. Real spacesuits and cabin-pressure design address oxygen and pressure change, not 'explosion'.",
    "sources": [
      {
        "label": "Harvard Science in the News — The human body in space: Distinguishing fact from fiction (2013)",
        "url": "https://sites.harvard.edu/sitn/flash/2013/space-human-body"
      },
      {
        "label": "Aerospaceweb.org — Human Exposure to the Vacuum of Space",
        "url": "https://aerospaceweb.org/question/atmosphere/q0291.shtml"
      }
    ]
  },
  "film-concussion-knockout": {
    "belief": "In movies a blow to the head either knocks you out or does nothing; if you did not pass out, your brain is fine",
    "truth": "Most sport-related concussions occur without loss of consciousness, and passing out is not a reliable measure of how serious the injury is.",
    "detail": "The consensus statement from the 4th International Conference on Concussion in Sport (Zurich, 2012; McCrory et al., 2013) notes that most sports-related concussions occur without loss of consciousness and that loss of consciousness is not a reliable predictor of severity. It also notes that 80% to 90% of concussions resolve within 7–10 days.\n\nThe CDC's HEADS UP page lists loss of consciousness with increasing drowsiness, inability to wake up, or inability to stay awake as a danger sign needing emergency care. In other words, whether someone blacked out is not the only thing to look at, and danger signs call for immediate help.",
    "origin": "Film's 'one blow and down' is tidy: passed out means hurt, awake means fine. That binary saves screen time and is easily taken for medical fact.",
    "instead": "After a blow to the head, if the person is confused, getting increasingly sleepy or cannot be woken, or shows other danger signs listed by the CDC, call emergency services at once (China 120 / Australia 000 / US 911). Otherwise have a health professional assess them rather than relying on whether they blacked out.",
    "sources": [
      {
        "label": "McCrory P et al., Journal of Athletic Training 2013 — Consensus Statement on Concussion in Sport: the 4th International Conference, Zurich, 2012",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3715021/"
      },
      {
        "label": "CDC HEADS UP — concussion signs, symptoms and danger signs",
        "url": "https://www.cdc.gov/heads-up/signs-symptoms/index.html"
      }
    ]
  },
  "film-csi-effect": {
    "belief": "Jurors who watch crime dramas expect high-tech evidence in every case and acquit without it (the 'CSI effect')",
    "truth": "A study supported by the US Department of Justice's research arm found little evidence for a CSI effect.",
    "detail": "In 2008, Judge Donald Shelton and two criminology professors, with National Institute of Justice support, surveyed 1,027 randomly summoned prospective jurors in Ann Arbor, Michigan. Yes, 46% expected some scientific evidence in every criminal case, with especially high expectations for DNA in rape cases (73%).\n\nBut they found scant evidence that heavy CSI viewers were more likely to acquit without such evidence: only 4 of 13 scenarios showed any difference between viewers and non-viewers, and results were inconsistent. Higher expectations did not turn into a demand for scientific evidence as a prerequisite for conviction; jurors would convict on eyewitness testimony alone in most scenarios. The authors suggest a broader 'tech effect' from 30 years of technological change rather than a TV-show effect.",
    "origin": "In the early 2000s, media and prosecutors popularised the claim that 'the CSI effect makes the prosecution's job harder'; it was only later that anyone tested it empirically. The claim became a widely told story with little checking behind it.",
    "instead": "A fair statement: TV may raise expectations of scientific evidence, but there is no reliable evidence that it makes jurors let guilty people go. Keep 'expectations' and 'verdicts' separate.",
    "sources": [
      {
        "label": "National Institute of Justice, 2008 — 'The CSI effect': does it really exist? (Shelton, Barak, Kim)",
        "url": "https://nij.ojp.gov/topics/articles/csi-effect-does-it-really-exist"
      }
    ]
  },
  "film-bullet-knockback": {
    "belief": "A person who is shot is thrown backwards by the bullet's impact, crashing through windows or doors",
    "truth": "By conservation of momentum, a bullet can impart only centimetres to a few decimetres per second to a body, nowhere near enough to knock someone over.",
    "detail": "In 1996 Karger (Institute of Legal Medicine, Münster) and Kneubuehl (Defence Procurement Agency's ammunition test centre, Thun) worked through the physics in the International Journal of Legal Medicine. Transferring the bullet's momentum to an 80 kg target in the worst case (bullet stays in the body) gives a backward velocity of only 0.01–0.18 m/s, versus 1–2 m/s for an ordinary walking pace. Their table runs from .22 rimfire to a .375 magnum rifle and a 12-gauge shotgun, all within that range.\n\nThey add a simple argument: a gun's recoil momentum is at least that of the bullet, so if a bullet could throw the target backwards the shooter would be thrown backwards too. For empirical evidence they point to hunters' experience and a video documentary of a person in body armour hit twice by a rifle bullet without noticeable movement. When people do fall, the cause is normally the wound or a psychological reaction, not momentum.",
    "origin": "Film needs a punchy visual for a 'hit', and a body flung backwards reads more dramatically than one that simply drops. The authors also note that the belief persists partly because some expert witnesses repeat it, which in one case risked a miscarriage of justice.",
    "instead": "Treat the 'flung backwards' shot as a special effect. If you are writing or explaining, the more realistic picture is that a person falls because of injury or shock, not because they were pushed.",
    "sources": [
      {
        "label": "Karger B, Kneubuehl BP, Int J Legal Med 1996;109:147–149 — On the physics of momentum in ballistics: can the human body be displaced or knocked down by a small arms projectile? (web copy of the full paper)",
        "url": "https://www.jfk-assassination.net/pdf/fisicamomento.pdf"
      }
    ]
  },
  "film-flatline-shock": {
    "belief": "When the heart monitor goes to a flat line, a defibrillator shock restarts the heart",
    "truth": "In resuscitation guidelines a flat line (asystole) is a 'non-shockable' rhythm; defibrillators are not used to 'restart' it.",
    "detail": "The Resuscitation Council UK's 2025 adult advanced life support algorithm splits cardiac arrest rhythms into shockable (VF / pulseless VT) and non-shockable (PEA / asystole). For the latter the pathway is adrenaline, then immediately resume 2 minutes of CPR, not a shock.\n\nThe influence of TV is measurable: Alismail and colleagues (Advances in Medical Education and Practice, 2018) surveyed 170 non-medical college students and found that the more medical shows people watched, the more likely they were to choose a shock for asystole; more than half thought it needed defibrillation. It is a small, student-only study.\n\nOne emergency-medicine commentary adds a caveat: what looks like a flat line on a monitor can sometimes be a lead problem, low amplitude or very fine ventricular fibrillation, so real teams check leads and rhythm. That is a clinical judgement issue and does not change the guideline position that true asystole is not shocked.",
    "origin": "'Flat line, charge, clear, zap, heartbeat returns' is the classic emergency-room shot: clear image, strong rhythm, a physical action. The real process of continuous CPR, drugs and looking for reversible causes looks far duller.",
    "instead": "Take such scenes as dramatisation. In real life, if someone collapses, does not respond and is not breathing normally, call emergency services first (China 120 / Australia 000 / US 911) and, if an AED is available, follow its voice prompts; the machine decides whether a shock is appropriate.",
    "sources": [
      {
        "label": "Resuscitation Council UK, Guidelines 2025 — Adult advanced life support algorithm",
        "url": "https://www.resus.org.uk/sites/default/files/2025-10/Adult%20ALS%20algorithm%202025.pdf"
      },
      {
        "label": "Alismail A, Meyer NC, Almutairi W, Daher NS, Advances in Medical Education and Practice 2018 — CPR in medical TV shows: non-health care student perspective",
        "url": "https://www.dovepress.com/cpr-in-medical-tv-shows-non-health-care-student-perspective-peer-reviewed-fulltext-article-AMEP"
      },
      {
        "label": "resus.com.au — Should cardiac arrest patients in asystole be shocked? (clinical discussion of apparent flat lines)",
        "url": "https://resus.com.au/shock-patients-asystole/"
      }
    ]
  },
  "film-space-sound": {
    "belief": "In space, exploding ships and laser cannons make deafening noises",
    "truth": "Sound needs a medium to travel through, and most of space is essentially a vacuum, so an explosion there would be silent.",
    "detail": "Sound is a pressure wave carried by a medium such as air. A NASA science page explains that the popular idea that there is no sound in space comes from the fact that most of space is essentially a vacuum, which gives sound waves nothing to propagate through.\n\nElectromagnetic waves (light, radio) need no medium, so we can see an explosion's light and receive radio, but that is not the same as hearing it. NASA's data sonification projects translate astronomical data into audible sound; that is scientists' translation, not sound that space itself makes.",
    "origin": "An explosion with sound hits harder and is easier for sound designers to make immersive. A few deliberately quiet science-fiction films are the exception.",
    "instead": "Take space-battle sound as an artistic choice. If you want to 'hear' space, listen to NASA's data sonifications, which turn data into sound.",
    "sources": [
      {
        "label": "Smithsonian National Air and Space Museum — How Things Fly: how does sound travel in space?",
        "url": "https://howthingsfly.si.edu/ask-an-explainer/how-does-sound-travel-space"
      },
      {
        "label": "NASA Science — Data Sonifications: Black Holes",
        "url": "https://science.nasa.gov/learners/highlights/data-sonifications"
      }
    ]
  },
  "film-water-breaking": {
    "belief": "In films, a pregnant woman's 'water breaks' as a big gush at the start of labour and she must rush to hospital",
    "truth": "Water breaking before labour starts at term happens in only about 8% of pregnancies, and the NHS describes it as either a slow trickle or a sudden gush.",
    "detail": "ACOG Practice Bulletin No. 217 says prelabor rupture of membranes at term occurs in approximately 8% of pregnancies, and preterm prelabor rupture complicates about 2–3% of pregnancies in the US. So the film idea that waters breaking is the first sign of birth reflects only a minority of cases.\n\nThe NHS describes it as 'a slow trickle or a sudden gush of water you cannot control', and says waters can break before labour starts or during labour. Its advice is to call your midwife or maternity unit urgently if your waters break; if labour does not start within 24 hours, induction may be offered because of a small increased risk of infection.",
    "origin": "Breaking waters is a visual, instantly readable signal that 'the baby is coming', especially handy in comedies, so it was repeated until it became the default opening.",
    "instead": "Enjoy it as drama. In real life, if you suspect your waters have broken, whether gush or trickle, follow your local maternity service's guidance and contact your midwife or maternity unit promptly (the NHS says urgently), and call emergency services if needed (China 120 / Australia 000 / US 911).",
    "sources": [
      {
        "label": "ACOG Practice Bulletin No. 217 — Prelabor Rupture of Membranes, Obstet Gynecol 2020 (summary page quoting about 8% at term, 2–3% preterm)",
        "url": "https://opqic.org/?p=11100"
      },
      {
        "label": "NHS — Signs of labour",
        "url": "https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/"
      }
    ]
  },
  "film-truth-serum": {
    "belief": "Inject a spy or suspect with a 'truth serum' and he will honestly tell you everything",
    "truth": "No drug reliably makes people tell the truth; what people say under sedating drugs can be a mix of fact and fantasy.",
    "detail": "The CIA's declassified article 'Truth' Drugs in Interrogation (Bimmerle) says 'truth serum' is a misnomer twice over: the drugs are not sera, and they do not necessarily bring forth probative truth. It recounts early-20th-century scopolamine experiments: in 1922 an obstetrician interviewed two suspects under the drug, both denied the charges and were later found not guilty, yet the idea of a 'truth drug' took off.\n\nA Discover Magazine article sums up that nearly a century of scientific literature has not confirmed that any chemical compound can without doubt coax out the truth: subjects may recall facts, imagination or suggestion, often indistinguishably.",
    "origin": "Spy and thriller plots need a shortcut to 'make him talk', and from the 1920s press coverage of 'truth serum' gave that shortcut a scientific look.",
    "instead": "Treat truth serum as a movie prop. In real interviews and investigations, reliability comes from checking against evidence, not from a drug.",
    "sources": [
      {
        "label": "Bimmerle G, CIA Studies in Intelligence — 'Truth' Drugs in Interrogation (CIA Historical Review Program release)",
        "url": "https://cia.gov/resources/csi/static/Truth-Drugs-in-Interrogation.pdf"
      },
      {
        "label": "Discover Magazine — The Truth About Truth Serum",
        "url": "https://www.discovermagazine.com/the-truth-about-truth-serum-42882"
      }
    ]
  },
  "film-cyanide-almond-smell": {
    "belief": "In the movies the detective smells bitter almonds and knows it is cyanide — because everyone can smell it",
    "truth": "Not everyone can smell it: a large share of people cannot detect hydrogen cyanide, so its odor is not a reliable warning.",
    "detail": "The NIOSH emergency response card says hydrogen cyanide gas does have a distinctive bitter-almond odor (some people describe a musty 'old sneakers' smell), but that a large proportion of people cannot detect it, so the odor does not give adequate warning of hazardous concentrations.\n\nThe same card gives the time course: after inhalation, symptoms begin within seconds to minutes and death may occur within minutes; after skin exposure, symptoms may be immediate or delayed by 30 to 60 minutes. Early signs are lightheadedness, rapid breathing, nausea and confusion — not a single instant collapse.",
    "origin": "'Bitter almonds means cyanide' recurs so often in detective fiction and film that it became a ready-made clue. This is a reasonable inference only; we did not trace it to one earliest source.",
    "instead": "Treat the almond smell as a literary symbol, not a detection method. If you suspect toxic gas or a chemical leak, do not rely on smell: leave at once for fresh air and call emergency services (China 120 / Australia 000 / US 911).",
    "sources": [
      {
        "label": "NIOSH — Emergency Response Card: Hydrogen Cyanide (AC)",
        "url": "https://www.cdc.gov/niosh/ershdb/emergencyresponsecard_29750038.html"
      }
    ]
  },
  "film-polygraph-lie-detector": {
    "belief": "Hook someone up to a lie detector and, if they lie, the machine will accurately expose it",
    "truth": "A polygraph measures arousal, not lies: it beats guessing but is far from perfect, and it can be deliberately gamed.",
    "detail": "The US National Academies' 2003 report The Polygraph and Lie Detection reviewed the research and reached a restrained conclusion: for specific-incident investigations, polygraph tests can discriminate lying from truth-telling 'at rates well above chance, though well below perfection' in the populations studied.\n\nThe report also notes that all the physiological indicators a polygraph measures can be altered by conscious cognitive or physical effort, so a deceptive person may appear non-deceptive. For employee security screening, accuracy was judged insufficient to justify reliance: because real violators are rare, even a fairly accurate test falsely flags many loyal employees or misses real threats — in the report's words, 'an unacceptable choice'.",
    "origin": "Films often turn an instrument that records heart rate, breathing and skin conductance into a machine that 'goes off when you are guilty', which makes plots tidy. That is an inference; we did not trace it to one film.",
    "instead": "Treat a polygraph result as an error-prone lead, not as proof itself; real investigations and screening rely on other verifiable facts.",
    "sources": [
      {
        "label": "National Research Council, 2003 — The Polygraph and Lie Detection (read online)",
        "url": "https://www.nationalacademies.org/read/10420/chapter/2"
      }
    ]
  },
  "film-cold-water-minutes": {
    "belief": "Fall into freezing water and within a few minutes you freeze solid and die",
    "truth": "In icy water the first killers are cold shock in the opening minutes and then loss of use of your limbs — not freezing to death within minutes; hypothermic unconsciousness usually takes 30 minutes to an hour.",
    "detail": "The Canadian Safe Boating Council describes the '1-10-1' rule from Manitoba's Gordon Giesbrecht: in the first minute comes cold shock — a sudden gasp, then hyperventilation that can reach 600–1000% of normal breathing; the priority is keeping your airway clear and your breathing under control. Over roughly 10 minutes you lose effective use of fingers, arms and legs, swimming fails, and without a lifejacket drowning becomes likely; and even in ice water it takes about an hour before hypothermia causes unconsciousness.\n\nA 2020 narrative review of cold-water swimming (Knechtle et al., IJERPH) splits immersion into three stages too: cold shock in roughly the first three minutes (skin cooling, hyperventilation, fast heart rate, gasp reflex); neuromuscular cooling after three minutes; and hypothermia after about 30 minutes. It says unadapted people can die from the initial cold shock, from progressive loss of swimming efficiency, or from hypothermia, and that durations vary considerably with water temperature and other factors. The real timetable is earlier and more nuanced than movie 'freezing'.",
    "origin": "Films often compress death in icy water into a few minutes of slowly freezing and sinking, which works dramatically. That is an inference; we did not trace it to one film.",
    "instead": "This is a general population-level pattern, not personal medical advice. The practical point: the danger is in the first minutes, so wear a lifejacket near cold water; if someone falls into icy water, shout for help and call emergency services (China 120 / Australia 000 / US 911) rather than going in yourself.",
    "sources": [
      {
        "label": "Canadian Safe Boating Council — 1-10-1 Principle",
        "url": "https://csbc.ca/1-10-1-principle/"
      },
      {
        "label": "Knechtle B et al., Int J Environ Res Public Health 2020 — Cold Water Swimming: Benefits and Risks, A Narrative Review",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7730683/"
      }
    ]
  },
  "film-fingerprint-zero-error": {
    "belief": "In the movies a fingerprint match is ironclad — 100% accurate, never wrong",
    "truth": "Fingerprint comparison is a valuable lead, but the US National Academies found 'zero error rate' claims scientifically implausible, and the standard ACE-V procedure is not a validated method.",
    "detail": "In the fingerprint (friction ridge) section's 'Summary Assessment', the National Academies committee's 2009 report Strengthening Forensic Science in the United States: A Path Forward says the technique has historically helped to identify the guilty and exclude the innocent; because ridges contain so much detail it seems plausible that a careful comparison can tell whether two impressions share a source; but information on accuracy and reliability is limited, and claims of zero error rates are not scientifically plausible.\n\nIt adds that ACE-V (analysis, comparison, evaluation, verification) is only a broadly stated framework, not specific enough to qualify as a validated method: it does not guard against bias, is too broad to ensure repeatability and transparency, and does not guarantee that two analysts will reach the same result — so following its steps does not by itself mean the work is scientific or reliable. The report accepts there is some scientific support for fingerprints being unique and persistent, but stresses this does not mean anyone can reliably tell whether two impressions came from the same finger, since impressions from one finger vary with pressure. Note that the report dates from 2009 and research has continued since; this entry reflects only that report's conclusions.",
    "origin": "The report recalls that US courts long treated fingerprinting as the premier identification science without citing studies of its reliability; when DNA first appeared it was even called 'DNA fingerprinting' to suggest it was as reliable. Only in validating DNA evidence did it become apparent that assumptions about fingerprints had never had the same scientific scrutiny. It also notes that the 2004 Mayfield case refuelled the debate.",
    "instead": "Read 'fingerprint match' as 'a trained expert judges the two impressions may share a source', not as mathematical proof; in real cases fingerprints are best supported by independent evidence.",
    "sources": [
      {
        "label": "National Research Council, 2009 — Strengthening Forensic Science in the United States: A Path Forward (Chapter 5, friction ridge analysis and its 'Summary Assessment'; PDF hosted by the US DOJ/NIJ)",
        "url": "https://www.ojp.gov/pdffiles1/nij/grants/228091.pdf"
      }
    ]
  },
  "film-electric-shock-thrown-back": {
    "belief": "In the movies a person who touches live electricity is blasted backwards — so you can always pull free",
    "truth": "The commoner and more dangerous outcome is muscles locking so you cannot let go; being thrown clear is only one possibility, and the fall itself can be deadly.",
    "detail": "The OSHA construction eTool page on electrical incidents (cited here as an archived copy hosted by UAH) tabulates current against effect: about 5 mA, slight shock, the average person can let go; 6–16 mA, painful shock with beginning loss of muscular control — the 'freezing current' or 'let-go' range; 17–99 mA, extreme pain, respiratory arrest and severe muscle contraction, the person cannot let go and death is possible; 100–2000 mA, ventricular fibrillation.\n\nThe same page covers being thrown: if the extensor muscles are excited, the person may be thrown away from the circuit, often causing a fall from elevation that can kill even when the shock does not. But when muscle contraction prevents the victim freeing themselves, even relatively low voltages can be extremely dangerous because injury grows with time in the circuit — 'low voltage does not imply low hazard'. Wet skin lowers body resistance sharply: the page's worked example is about 1 mA at 120 V when dry versus 120 mA when wet.",
    "origin": "A person flung backwards is a crisp, one-frame way to show what happened, so it is common on screen. That is an inference; we did not trace it to one film.",
    "instead": "If you see someone being electrocuted, call emergency services (China 120 / Australia 000 / US 911) and follow the dispatcher's instructions; do not grab a person who may still be in the circuit with bare hands. And never count on 'I would just pull away': stay clear of damaged cords and appliances, especially in wet places.",
    "sources": [
      {
        "label": "OSHA Construction eTool — Electrical Incidents: How Electrical Current Affects the Human Body (archived PDF hosted by UAH, printed 2013)",
        "url": "https://www.uah.edu/images/administrative/facilities/oehs/how_electrical_current_affects_the_human_body.pdf"
      }
    ]
  },
  "film-adrenaline-heart-needle": {
    "belief": "In the movies a needle of adrenaline plunged straight into an unconscious person's chest makes them jolt awake",
    "truth": "Current resuscitation guidelines use intravenous or intraosseous drug delivery; injecting directly into the heart has been abandoned, and the antidote for an opioid overdose is naloxone, not adrenaline.",
    "detail": "A 2025 systematic review and meta-analysis in the Journal of Clinical Medicine (Zagalioti et al., open access) says current resuscitation guidelines recommend intravenous access as the first-line route, with intraosseous access as the alternative when IV is delayed or not feasible, and that intracardiac injection of adrenaline 'was once explored but has since been abandoned due to practical limitations and risks'.\n\nThe Pulp Fiction scene — intracardiac adrenaline for a heroin overdose — is described in the relevant Wikipedia article as far from normal treatment; the article calls intracardiac injection 'considered obsolete' and 'rarely used in modern practice', declining from the 1970s as intravenous injection proved equally effective and less risky. For opioid overdose, the US MedlinePlus entry says naloxone works by blocking the effects of opioids, relieving dangerous symptoms such as stopped breathing and loss of consciousness, and that after giving it you should call 911 immediately and stay watching the person closely.",
    "origin": "The scene is dramatically powerful: one needle and the person is back from the dead. We found no clear real-world source for it; the Wikipedia article says the technique did exist in medical history and was later discarded.",
    "instead": "If someone may have overdosed or has collapsed, do not inject anything yourself: call emergency services at once (China 120 / Australia 000 / US 911) and follow the dispatcher's instructions, such as CPR; if naloxone is on hand, use it as directed while calling.",
    "sources": [
      {
        "label": "Zagalioti SC et al., J Clin Med 2025 — Does the Injection Site Matter During CPR? A Systematic Review and Meta-Analysis of Drug Pharmacokinetics and Pharmacodynamics",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12609464/"
      },
      {
        "label": "MedlinePlus — Naloxone Injection",
        "url": "https://medlineplus.gov/druginfo/meds/a612022.html"
      },
      {
        "label": "Wikipedia — Intracardiac injection",
        "url": "https://en.wikipedia.org/wiki/Intracardiac_injection"
      }
    ]
  },
  "film-time-of-death-to-the-minute": {
    "belief": "In the movies the medical examiner takes one temperature reading and announces 'time of death: 10:17 last night'",
    "truth": "Time of death can only be estimated as a range: in a 76-case validation study, the common Henssge method's 95% prediction interval contained the true time in only about 37% of cases.",
    "detail": "Heinrich et al. (2025, International Journal of Legal Medicine) tested the widely used Henssge compound method — body temperature combined with other post-mortem signs — on 76 deceased people with known times of death at the Hamburg-Eppendorf institute of legal medicine. The 95% prediction interval matched the actual time of death in 36.8% of cases (95% CI 26.1–48.7%); 61.9% for warm-stored bodies versus 27.3% for cold-stored; body mass index and body surface area also mattered. The authors call the agreement 'low to moderate' and recommend larger external validation. This is a single-centre convenience sample: it shows these methods carry substantial error, not that forensic estimates are worthless.\n\nA deputy medical examiner writing on a laboratory-medicine blog says the same in plain words: time of death 'will be an estimate'; body temperature is affected by body habitus, clothing, wind and more; once livor is fixed it only separates 'less than' from 'more than' about 8–12 hours; and the best estimate usually comes from thorough scene investigation, such as mail dates and calendar marks.",
    "origin": "A to-the-minute number moves a detective plot along, so screens love it. That is an inference; we did not trace it to one film.",
    "instead": "When you read or watch an 'estimated time of death', treat it as a range with error, to be cross-checked against scene clues, CCTV, phone records and other evidence — not a single reading.",
    "sources": [
      {
        "label": "Heinrich F et al., Int J Legal Med 2025 — An assessment of the Henssge method for forensic death time estimation in the early post-mortem interval",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11732859/"
      },
      {
        "label": "Krywanczyk A, Lab Medicine Blog 2023 — Determining Time of Death: Separating Science from Pseudoscience",
        "url": "https://labmedicineblog.com/2023/01/25/determining-time-of-death-separating-science-from-pseudoscience/"
      }
    ]
  },
  "film-heart-attack-collapse": {
    "belief": "In the movies a heart attack means clutching your chest, crying out and collapsing",
    "truth": "On screen heart attacks are mostly falls and fainting; real symptoms are more often chest pressure or tightness, breathlessness, nausea and sweating, and may not be dramatic — especially in women.",
    "detail": "A 2024 study in the Journal of the American Heart Association (Shaw et al.) analysed heart attack scenes in the 100 most popular films portraying them. The two most common on-screen signs were falling and loss of consciousness: all 10 women and 88% of men fell, and 68% of men lost consciousness. Chest pain was actually portrayed less often — 67% of men and 50% of women — while 29% of men and 40% of women screamed or yelled. The authors conclude that films portray more severe, even unusual presentations, which may perpetuate false beliefs about typical symptoms that can be more subtle, particularly in women.\n\nThe UK NHS is plainer: chest pain may feel like crushing or squeezing and may spread to the arm, neck and jaw, with possible breathlessness, nausea or vomiting, sweating, and pale, blue or grey skin. Its advice is to call emergency services for tight or squeezing chest pain or pain spreading to the arms, neck or jaw, and not to drive yourself to A&E.",
    "origin": "A screen needs to tell the audience at a glance that something is wrong, so clutching and collapsing is the cheapest visual shorthand. That is an inference; the study shows how concentrated the screen portrayal is but does not trace the trope's origin.",
    "instead": "Do not wait for symptoms to 'look like the movies'. Chest pressure or tightness, pain spreading to the arm, neck or jaw, breathlessness, nausea or sweating — even if not severe — warrant calling emergency services at once (China 120 / Australia 000 / US 911 / UK 999), and not driving yourself to hospital.",
    "sources": [
      {
        "label": "Shaw KE et al., J Am Heart Assoc 2024 — Portrayal of Acute Myocardial Infarction in Popular Film: A Review of Gender, Race, and Ethnicity",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11963949/"
      },
      {
        "label": "NHS — Heart attack: Symptoms",
        "url": "https://www.nhs.uk/conditions/heart-attack/symptoms/"
      }
    ]
  },
  "film-shark-smell-blood-miles": {
    "belief": "A shark can smell a single drop of blood from miles away — in the movies, blood hits the water and sharks arrive from afar",
    "truth": "Sharks smell well, but measured sensitivity is comparable to ordinary bony fish; there is no evidence for 'one drop of blood from miles away'.",
    "detail": "Meredith and Kajiura (2010, Journal of Experimental Biology) compared the olfactory organs of five distantly related elasmobranchs, including sharks: the number of lamellae and lamellar surface area varied, but neither correlated with olfactory threshold; thresholds to amino acid odorants — the main olfactory stimuli of all fishes — ranged from about 10^-9.0 to 10^-6.9 mol per litre, comparable to bony fishes. The idea that a large olfactory surface makes sharks exceptionally sensitive had lacked direct evidence.\n\nThe American Institute of Physics' Inside Science covered the study and quoted its lead author saying that, from what is known now, sharks can't smell a drop of anything in an Olympic-sized swimming pool. Note that the study measured thresholds to amino acids, not how far blood can be smelled in real seawater; odor spreads with currents, so distance depends on the water movement, not on a fixed number of miles.",
    "origin": "'One drop of blood draws the shark' is a staple of shark and horror films: it gives danger a visible trigger. That is an inference; we did not trace it to one film.",
    "instead": "Take it as 'sharks smell well, but not magically'. For real beach safety, follow local lifeguards and beach signage.",
    "sources": [
      {
        "label": "Meredith TL, Kajiura SM, J Exp Biol 2010 — Olfactory morphology and physiology of elasmobranchs",
        "url": "https://europepmc.org/article/MED/20889825"
      },
      {
        "label": "AIP Inside Science, 2010 — Shark Smell Myth Found Fishy",
        "url": "https://www.aip.org/inside-science/shark-smell-myth-found-fishy"
      }
    ]
  },
  "origin-railway-gauge": {
    "belief": "Railway track width comes from Roman chariot wheels, and even the Space Shuttle's rocket boosters were sized by it",
    "truth": "The standard gauge (1,435 mm) can be traced to English colliery horse-drawn wagonways and George Stephenson's railways; no documentary chain links it to Roman chariots.",
    "detail": "The traceable chain runs like this: coal mines in north-east England used horse-drawn wagons on wooden and iron ways. George Stephenson, working at those collieries, adopted the roughly 4 ft 8 in gauge common there, then fixed 4 ft 8.5 in for the Liverpool and Manchester Railway (opened 1830). The extra half inch is said to have eased curves.\n\nAs for the 'Roman chariot': a cart's wheel spacing is set largely by how wide a draught horse standing between two shafts needs to be, so horse-drawn vehicles around the world sit near five feet. That is a practical coincidence, not an inherited standard. One historian of wagonways has also noted that English horse railways never had a single uniform gauge.\n\nThe claim that the Shuttle's boosters were limited by track gauge has been challenged too: the constraint on rail transport is more plausibly the loading gauge (tunnel and bridge clearances) than the distance between the rails. The story's neat 'link by link' feel has no document behind most of its links.",
    "origin": "The tale spread as a 'horse's behind decides the Space Shuttle' anecdote; according to Wikipedia, versions of it have circulated since at least 1937, and the internet kept repeating it. Its charm is chaining unrelated things into one cause.",
    "instead": "Say: 'Standard gauge mostly comes from early English colliery wagonways and was spread by Stephenson; cart widths were similar because they had to fit a horse.' Don't say it 'is' the chariot width unless someone produces a source.",
    "sources": [
      {
        "label": "Wikipedia — Standard-gauge railway (history: Stephenson and colliery wagonways; spread of the chariot story)",
        "url": "https://en.wikipedia.org/wiki/Standard-gauge_railway"
      },
      {
        "label": "Tastes of History — Dispelling some myths: Romans, railways and NASA rockets (2023; cites Baxter 1966 on the lack of a standard wagonway gauge)",
        "url": "https://www.tastesofhistory.co.uk/post/dispelling-some-myths-romans-railways-and-nasa-rockets"
      },
      {
        "label": "Network Rail — George Stephenson (1781–1848): cart wheel spacing and early trackways of about 4 ft 8 in",
        "url": "https://www.networkrail.co.uk/who-we-are/our-history/eminent-engineers/george-stephenson/"
      }
    ]
  },
  "origin-coca-cola-santa": {
    "belief": "Santa's red suit was invented by Coca-Cola to sell soda",
    "truth": "A red-coated Santa existed before Coca-Cola's 1931 ads; the company popularised the image but did not invent it.",
    "detail": "Coca-Cola's own history page says Santa appeared in a red coat before artist Haddon Sundblom painted him. It adds that cartoonist Thomas Nast drew Santa for Harper's Weekly for about thirty years from 1862, and that the coat's colour shifted from tan to the red we know.\n\nWikipedia's Santa Claus article notes that Puck magazine covers in the first years of the 20th century already showed Santa in red and white, essentially in his current form, and that White Rock Beverages used Santa in monochrome ads in 1915 and colour ads in 1923–25 — all before Coca-Cola's big series.\n\nThe accurate version: in 1931 Coca-Cola commissioned Sundblom to paint a warm, plump, human-looking Santa, and decades of repeated ads fixed that look in public memory. 'Invented the red suit' does not hold up.",
    "origin": "The idea probably grew out of how famous and long-running those ads were: people reasoned backwards from 'the best-known red Santa was Coke's' to 'Coke chose the red'. Wikipedia records this as an urban legend.",
    "instead": "Say: 'Coca-Cola's ads made the red-suited Santa a household image in the mid-20th century, but red coats appear in 19th-century illustrations.' For earlier examples, look at Thomas Nast's Santa drawings.",
    "sources": [
      {
        "label": "The Coca-Cola Company — Haddon Sundblom and the Coca-Cola Santas (company history page)",
        "url": "https://www.coca-colacompany.com/about-us/history/haddon-sundblom-and-the-coca-cola-santas"
      },
      {
        "label": "Wikipedia — Santa Claus (Coca-Cola urban legend; Puck covers; White Rock ads)",
        "url": "https://en.wikipedia.org/wiki/Santa_Claus"
      },
      {
        "label": "The Ferret — No, Santa Claus was not first dressed in red by Coca-Cola (earlier red Santas, 1868, 1881)",
        "url": "https://theferret.scot/fact-check-coca-cola-red-santa-claus-christmas/"
      }
    ]
  },
  "origin-napoleon-short": {
    "belief": "Napoleon was a tiny man, barely five feet tall",
    "truth": "Napoleon stood about 1.68–1.70 m, average or slightly above for a Frenchman of his time; the 'short' image comes from a unit mix-up and British caricature.",
    "detail": "A Fondation Napoléon article cites the measurement taken at his death: Antommarchi recorded '5 pieds 2 pouces 4 lignes' in old French units, about 1.686 m. An English upholsterer, Andrew Darling, measured 5 ft 7 in in English units, about 1.70 m. An English visitor in 1802 also put the First Consul at roughly 5 ft 7 in.\n\nThe confusion lies in units: the old French inch was longer than the English one. Read '5 ft 2 in' as English measure and you get about 1.57 m — hence 'tiny Napoleon'. Wikipedia's Napoleon complex entry likewise puts his height in imperial terms at just under 5 ft 6 in to 5 ft 7 in, about average for the era.\n\nThe other half is propaganda: the Foundation's article argues that after the 1802 Peace of Amiens, British satirists (Gillray in 1803, Cruikshank in 1814) deliberately drew him as a miniature 'Little Boney', and the tall, flamboyantly dressed officers around him made him look smaller by comparison.",
    "origin": "British cartoons shrank a political enemy, French units were misread as English ones, and later the psychological term 'Napoleon complex' deepened the impression.",
    "instead": "Say: 'Napoleon was around 1.68 m, normal to slightly tall for his day; the 'short' legend comes from British caricature and unit conversion.' When quoting a figure, say whether it is French or English measure.",
    "sources": [
      {
        "label": "Fondation Napoléon — La taille de Napoléon (measurements, unit conversion, role of British caricature)",
        "url": "https://www.napoleon.org/histoire-des-2-empires/articles/la-taille-de-napoleon"
      },
      {
        "label": "Wikipedia — Napoleon complex (height conversion; Gillray caricatures)",
        "url": "https://en.wikipedia.org/wiki/Napoleon_complex"
      }
    ]
  },
  "origin-viking-horned-helmets": {
    "belief": "Viking warriors wore helmets with bull horns",
    "truth": "No horned helmet from the Viking Age has ever been found; the image largely comes from 19th-century stage and book illustration, especially Wagner's 1876 costumes.",
    "detail": "The National Museum of Denmark is explicit: only one Viking Age helmet survives (the Gjermundbu helmet from Norway, c. 950–975), and it has no horns, only a face guard; no contemporary source mentions Vikings wearing horned headgear. ScienceNorway quotes an archaeologist saying helmets with horns have never been found from the Viking Age.\n\nGenuinely horned helmets are Bronze Age, such as the Veksø helmets found in a Danish bog in 1942, some two thousand years before the Vikings and more likely ritual objects. To be fair, the Danish museum notes that Iron Age and Viking-period images (the Golden Horns, the Oseberg tapestry) do show figures with horned headgear, and suggests that if such gear existed it belonged to ritual or special figures rather than ordinary battle dress.\n\nThe popular image is usually traced to the 1876 Bayreuth premiere of Wagner's Ring cycle, where costume designer Carl Emil Doepler gave characters horned helmets; illustrators, children's books and films then copied them.",
    "origin": "19th-century Nordic romanticism wanted an instantly recognisable 'barbarian'; stage costume supplied the horns and later artists and filmmakers copied them.",
    "instead": "Say: 'No horned helmets have been found from the Viking Age; horns belong to the Bronze Age or to later stage design.' Avoid claiming nobody ever wore horns in ritual — the accurate claim is that there's no evidence Vikings routinely fought that way.",
    "sources": [
      {
        "label": "National Museum of Denmark — Viking Age helmets",
        "url": "https://en.natmus.dk/historical-knowledge/denmark/prehistoric-period-until-1050-ad/the-viking-age/weapons/helmets/"
      },
      {
        "label": "ScienceNorway — No, the Vikings didn't wear helmets with horns (interview with archaeologist Ingrid Ystgaard)",
        "url": "https://sciencenorway.no/bronze-age-viking-age/no-the-vikings-didnt-wear-helmets-with-horns/1995364"
      },
      {
        "label": "Wikipedia — Horned helmet (origin of the Viking image; Veksø Bronze Age helmets)",
        "url": "https://en.wikipedia.org/wiki/Horned_helmet"
      },
      {
        "label": "Wikipedia — Carl Emil Doepler (costumes for the 1876 Bayreuth Ring)",
        "url": "https://en.wikipedia.org/wiki/Carl_Emil_Doepler"
      }
    ]
  },
  "origin-flat-earth-columbus": {
    "belief": "In Columbus's day everyone thought the Earth was flat, and he sailed to prove it was round",
    "truth": "Medieval scholars generally knew the Earth was a sphere; what Columbus's critics doubted was its size, not its shape.",
    "detail": "According to Wikipedia's 'Myth of the flat Earth', most medieval scholars, including those Columbus read, held the Earth to be spherical, and sphericity appeared in standard university textbooks; Christian thinkers from Augustine to Aquinas accepted it. Historian Jeffrey Burton Russell is quoted by HISTORY.com: no educated person in Western history from the third century BC onward believed the Earth was flat.\n\nThe real 1490s dispute was about distance: Columbus underestimated the planet's circumference and thought Asia was close to the west; Spanish scholars thought it was much farther — and on that point they were right. The existence of the Americas is what kept his voyage from ending in disaster.\n\nThe story's popularity is mostly due to Washington Irving's 1828 biography of Columbus, which invented scenes of clerics arguing about the Earth's shape; later writers such as Draper and White used it in their 'conflict of science and religion' narratives.",
    "origin": "Irving's 1828 bestseller embellished the tale, the 'science versus religion' storyline adopted it, textbooks repeated it.",
    "instead": "Say: 'Educated people knew the Earth was round; the argument was how big it was and how far Asia lay.' Replace 'proved the Earth round' with 'bet the Earth was smaller than the experts calculated'.",
    "sources": [
      {
        "label": "Wikipedia — Myth of the flat Earth (Irving 1828; Draper and White; the 1490s dispute was about size)",
        "url": "https://en.wikipedia.org/wiki/Myth_of_the_flat_Earth"
      },
      {
        "label": "HISTORY.com — Christopher Columbus never set out to prove the Earth was round (quotes Jeffrey Burton Russell)",
        "url": "https://www.history.com/news/christopher-columbus-never-set-out-to-prove-the-earth-was-round"
      }
    ]
  },
  "origin-newton-apple-head": {
    "belief": "An apple hit Newton on the head and he instantly discovered gravity",
    "truth": "The apple story comes from Newton's own late-life recollection recorded by his friend Stukeley; in the account we read, he watched an apple fall and began to think — no blow to the head, and no instant revelation.",
    "detail": "The Newton Project's introduction says William Stukeley was the first to record the anecdote, in his Memoirs of Sir Isaac Newton's Life: Newton told him the notion of gravitation was occasioned by the fall of an apple. Stukeley's manuscript was written after Newton's death and published only in 1752.\n\nIn the Stukeley text reproduced by Scientific American, Newton and Stukeley are having tea in the garden under apple trees when Newton recalls watching an apple fall and wondering why it always descended perpendicularly to the ground. There is no mention of it hitting his head.\n\nTo leave room: this is Newton's recollection decades later, passed on by someone else, and his theory of gravitation took years of mathematical work, not a single moment. We did not check every contemporary version (for example Conduitt's), so the safe claim is that the earliest account we read has no blow to the head.",
    "origin": "Once Stukeley's account circulated, the story became famous; we did not find the 'hit on the head' detail in the earliest account, so it was presumably added in later popular retellings.",
    "instead": "Say: 'Late in life Newton said watching an apple fall set him thinking about gravity; the theory itself took years of calculation.' Don't say an apple hit him and he discovered gravity.",
    "sources": [
      {
        "label": "The Newton Project, University of Oxford — Introduction (Stukeley first recorded the apple anecdote)",
        "url": "https://newtonproject.ox.ac.uk/view/texts/normalized/OTHE00017"
      },
      {
        "label": "Scientific American — What's the real story with Newton and the apple? See for yourself (Stukeley's manuscript text)",
        "url": "https://www.scientificamerican.com/blog/observations/whats-the-real-story-with-newton-and-the-apple-see-for-yourself/"
      }
    ]
  },
  "origin-great-wall-from-space": {
    "belief": "The Great Wall of China is the only man-made structure visible from space with the naked eye",
    "truth": "The Wall cannot be seen from the Moon, and from low Earth orbit it is difficult or impossible to see without a powerful lens.",
    "detail": "NASA's caption says the Wall isn't visible from the Moon and is 'difficult or impossible' to see from Earth orbit without the high-powered lenses used for the photo taken from the International Space Station. ESA astronaut Thomas Pesquet says it is not possible to see it with the naked eye; photographing it needs particular techniques and a lens of about 1,150 mm.\n\nBoth agencies stress that capturing it takes a long lens and deliberate technique, not unaided sight.\n\nThis entry relies only on the official NASA and ESA statements and does not weigh individual claimed sightings.",
    "origin": "The claim was circulating long before crewed spaceflight and has been repeated in textbooks and children's books for generations. This entry did not verify its earliest appearance, so it makes no claim about that.",
    "instead": "Say: 'NASA and ESA both say you can't reliably see it from orbit with the naked eye.' If someone says they saw it, ask what lens and what altitude.",
    "sources": [
      {
        "label": "NASA — Great Wall (image caption: not visible from the Moon; difficult or impossible from Earth orbit without high-powered lenses)",
        "url": "https://www.nasa.gov/image-article/great-wall/"
      },
      {
        "label": "ESA — Great Wall of China from space (astronaut Thomas Pesquet: not visible to the naked eye; special techniques and a ~1,150 mm lens)",
        "url": "https://www.esa.int/ESA_Multimedia/Images/2021/05/Great_Wall_of_China_from_space"
      }
    ]
  },
  "origin-sos-save-our-souls": {
    "belief": "SOS stands for 'Save Our Souls'",
    "truth": "SOS was never originally an abbreviation, just a distinctive Morse sequence; 'Save Our Souls' was invented afterwards as a memory aid.",
    "detail": "Wikipedia's SOS article says that when the 1906 International Radiotelegraph Convention adopted it, SOS was merely a distinctive Morse code sequence (three dots, three dashes, three dots sent continuously) and was not initially an abbreviation. Germany had mandated the signal in 1905; the 1906 Berlin convention made it the international distress signal, in force from 1 July 1908.\n\nMental Floss adds that it was chosen because it was fast to send, distinct and hard to misread, beating rival proposals such as Italy's SSSDDD. Three dots make an 'S' and three dashes an 'O', so operators came to say 'SOS' to remember the rhythm; only afterwards did people attach phrases like 'Save Our Souls' and 'Save Our Ship'.\n\nOn the Titanic in 1912, operators first used the Marconi company's older CQD call before also sending SOS.",
    "origin": "The after-the-fact explanation (a backronym) is easier to remember and more dramatic than the technical reason, so it travelled further.",
    "instead": "Say: 'SOS is a signal pattern, three dots-three dashes-three dots, not an abbreviation; 'Save Our Souls' is a later mnemonic.'",
    "sources": [
      {
        "label": "Wikipedia — SOS (Germany 1905; Berlin convention 1906; not originally an abbreviation)",
        "url": "https://en.wikipedia.org/wiki/SOS"
      },
      {
        "label": "Mental Floss — What SOS stands for (Germany 1905; Berlin 1906; Italy's SSSDDD proposal; Titanic and CQD)",
        "url": "https://www.mentalfloss.com/history/what-sos-stands-for"
      }
    ]
  },
  "origin-marco-polo-pasta": {
    "belief": "Marco Polo brought pasta to Italy from China",
    "truth": "Italy (Sicily) was already producing pasta commercially before Marco Polo returned to Venice in 1295.",
    "detail": "Wikipedia's History of pasta records earlier evidence: in 1154 the Arab geographer al-Idrisi, writing for Norman Sicily, described a food called itriyya being made and exported there; a Genoese will of 1279 mentions pasta, about 16 years before Marco Polo's return. Scientific American also cites al-Idrisi: the Sicilian town of Trabia made flour into strings, dried them in the sun and shipped them to other parts of Italy and abroad.\n\nWikipedia adds that noodle-making most likely spread gradually along the Silk Road and through the Arab world to Sicily, rather than being 'brought back' by one person. Polo's book (as written down by Rustichello) does mention a food similar to lagana, but that is something he saw on his travels, not an introduction of pasta to Italy.\n\nOn the legend's source, writer Jane Grigson believed it came from a 1920s–30s advertisement by a Canadian spaghetti company — Wikipedia's report of her view; we did not find the original advertisement.",
    "origin": "Reportedly a 20th-century marketing story: pairing pasta with a famous explorer made it romantic and sellable.",
    "instead": "Say: 'Pasta was already made in Sicily before Marco Polo, probably arriving via the Arab world; the Marco Polo story is a 20th-century legend.'",
    "sources": [
      {
        "label": "Wikipedia — History of pasta (al-Idrisi 1154; Genoese will 1279; Grigson on the legend's origin)",
        "url": "https://en.wikipedia.org/wiki/History_of_pasta"
      },
      {
        "label": "Scientific American — Noodling the Noodles (al-Idrisi 1154 on Trabia's pasta industry)",
        "url": "https://www.scientificamerican.com/article/noodling-the-noodles"
      }
    ]
  },
  "origin-forbidden-fruit-apple": {
    "belief": "The forbidden fruit Adam and Eve ate was an apple",
    "truth": "Genesis says only 'fruit of the tree' and never names it; the apple is a later development in art and language.",
    "detail": "Genesis 3:3 and 3:6 speak only of 'fruit' (in the NIV), without naming a kind. Early commentators proposed figs, grapes, pomegranates, citrons and others.\n\nAzzan Yadin-Israel, professor of Jewish Studies and Classics at Rutgers, argues that depicting the fruit as an apple first appears in 12th-century French art. Linguistically, Latin 'pomum' meant fruit in general and became Old French 'pom', which narrowed to mean 'apple'.\n\nThe popular 'malum pun' explanation (Latin mālum, evil, and mâlum, apple) lacks support: he found that medieval Latin commentators almost never used the pun, and even in the 14th century commentators still spoke of figs and grapes.\n\nThis entry deals only with the text and its history, not with religious interpretation.",
    "origin": "From the 12th century onward, French art and the evolution of a word gradually fixed 'fruit' as 'apple' in Europe's imagination.",
    "instead": "Say: 'Genesis never says which fruit; the apple comes from medieval art and language change.'",
    "sources": [
      {
        "label": "Rutgers University — How the Forbidden Fruit Became an Apple (Azzan Yadin-Israel)",
        "url": "https://www.rutgers.edu/news/how-forbidden-fruit-became-apple"
      },
      {
        "label": "Wikipedia — Forbidden fruit (Genesis doesn't specify; apple first in 12th-century French art)",
        "url": "https://en.wikipedia.org/wiki/Forbidden_fruit"
      },
      {
        "label": "BibleGateway — Genesis 3:1-6 (NIV text, 'fruit' only)",
        "url": "https://www.biblegateway.com/passage/?search=Genesis+3%3A1-6&version=NIV"
      }
    ]
  },
  "origin-iron-maiden": {
    "belief": "The 'iron maiden' was a common medieval torture device",
    "truth": "No record of an iron maiden is known from before the 19th century; the earliest description dates to 1793 and the surviving objects are mostly 19th-century exhibits.",
    "detail": "Wikipedia's article says there is no evidence of iron maidens before the 19th century. The earliest account is in a Nuremberg guidebook by Johann Philipp Siebenkees (1759–1796), who in 1793 claimed a coin forger was executed with one in 1515. History.co.uk notes that historians have found no other contemporary record of that execution or any evidence of an iron maiden in Nuremberg then.\n\nMedievalists.net likewise says Siebenkees likely just invented the story, and that by the early 19th century the device was displayed in museums and later at the 1893 Chicago World's Fair. Wikipedia adds that Professor Wolfgang Schild theorises that 19th-century exhibitors assembled such objects from assorted older items to draw crowds.\n\nTo leave room: these sources differ on whether Siebenkees invented the tale or believed it, but agree there is no medieval record of the device.",
    "origin": "An 1793 guidebook, a set of 19th-century museum exhibits, and a ready-made image of the 'dark Middle Ages' made it the symbol of medieval torture.",
    "instead": "Say: 'The iron maiden first appears in writing in the late 18th century; there's no evidence the Middle Ages used it, and museum pieces are mostly later constructions.' At a 'medieval torture' exhibit, ask where the piece came from.",
    "sources": [
      {
        "label": "Wikipedia — Iron maiden (torture device) (no evidence before the 19th century; Siebenkees 1793; Schild's theory)",
        "url": "https://en.wikipedia.org/wiki/Iron_maiden_(torture_device)"
      },
      {
        "label": "History.co.uk — The Iron Maiden: medieval torture device or modern myth? (Siebenkees' account and lack of corroboration)",
        "url": "https://www.history.co.uk/articles/the-iron-maiden-medieval-torture-device-or-modern-myth"
      },
      {
        "label": "Medievalists.net — Medieval torture devices (iron maiden a later product; 1893 Chicago exposition)",
        "url": "https://www.medievalists.net/2023/12/medieval-torture-devices/"
      }
    ]
  },
  "origin-medieval-no-bathing": {
    "belief": "Medieval Europeans went a thousand years without bathing and stank",
    "truth": "Medieval European towns had many public bathhouses and people washed regularly; bathing declined mostly after the Middle Ages.",
    "detail": "Medievalists.net gathers evidence: Paris had more than 32 bathhouses by the 13th century, Southwark in London offered 18 hot baths, and Edward III had hot and cold taps installed at Westminster Palace in 1351. Virginia Smith's Clean: A History of Personal Hygiene and Purity is cited as saying that by the 15th century bath-feasting in town bathhouses seems to have been as common as going to a restaurant.\n\nTastes of History adds that full baths were rarer because of cost, but washing with basins and buckets was widespread, and 'virtually every household account book' records payments to washerwomen. After the Black Death (1346–1353) people avoided public baths for fear of contagion; Wikipedia's Bathing article says the 16th-century appearance of syphilis, the false belief that bathing opens pores to disease, and religious limits on nudity also drove the decline of public baths.\n\nTo leave room: practice varied widely by region, class and monastery, and the poor certainly had worse facilities. This entry only rebuts the claim that the whole millennium went unwashed.",
    "origin": "This entry did not verify who first made the claim. What the sources do show is that public bathing declined mainly after the Black Death and in the 16th century, not across the whole Middle Ages.",
    "instead": "Say: 'Medieval towns had bathhouses and people washed; public bathing declined mainly after the Black Death and in the 16th century.'",
    "sources": [
      {
        "label": "Medievalists.net — People in the Middle Ages and baths (bathhouse counts in Paris and London; Virginia Smith)",
        "url": "https://www.medievalists.net/2023/11/people-middle-ages-baths/"
      },
      {
        "label": "Tastes of History — Dispelling some myths: medieval bathing (daily washing; bathhouses; effect of the plague)",
        "url": "https://www.tastesofhistory.co.uk/post/dispelling-some-myths-medieval-bathing"
      },
      {
        "label": "Wikipedia — Bathing (decline of public bathhouses around the 16th century)",
        "url": "https://en.wikipedia.org/wiki/Bathing"
      }
    ]
  },
  "origin-gunpowder-fireworks-only": {
    "belief": "The Chinese invented gunpowder but only used it for fireworks; Westerners made guns and cannon",
    "truth": "China used gunpowder in war early: fire arrows by the 10th century, a recorded formula in an 11th-century military manual, and gunpowder weapons in the 12th century.",
    "detail": "Wikipedia's Gunpowder article says gunpowder was invented in China, with the earliest confirmed reference in the Tang dynasty (9th century), arising from alchemical experiments. Fire arrows used it in the 10th century, the Wujing Zongyao of 1044 documented the earliest chemical formula, bombs and fire lances became prominent in the 12th century, and metal-barrelled hand cannon appeared in the 13th.\n\nMedievalists.net likewise says that although gunpowder was invented in China it was applied to warfare as soon as its properties were clear; fire lances are first documented at the siege of De'an in 1132, and the Xanadu Gun of 1298 is the oldest definitively dated firearm. Early Ming policy reportedly set gunners at around 10% of infantry units.\n\nTo leave room: this does not mean China 'led' in every technology; the two regions developed along different paths — Europe leaned toward artillery to breach walls, China toward portable infantry firearms.",
    "origin": "Probably a back-projection of fireworks, the most familiar peaceful use today, onto the invention's beginnings, helped by an 'invented in China, developed in the West' narrative. This entry did not verify who first said it.",
    "instead": "Say: 'Gunpowder was weaponised in China soon after it appeared; Song-era armies had fire arrows and fire lances. Fireworks were one use, not the only one.'",
    "sources": [
      {
        "label": "Wikipedia — Gunpowder (9th-century origin; 10th-century fire arrows; 1044 Wujing Zongyao; 12th-century fire lances and bombs)",
        "url": "https://en.wikipedia.org/wiki/Gunpowder"
      },
      {
        "label": "Medievalists.net — The origins of the gunpowder age (military timeline; 1132; 1298)",
        "url": "https://www.medievalists.net/2022/11/origins-gunpowder-age/"
      }
    ]
  },
  "origin-ok-zero-killed": {
    "belief": "OK comes from the American Civil War: battles without casualties were reported as '0 Killed'",
    "truth": "The earliest printed OK is from a Boston newspaper in 1839, more than twenty years before the Civil War began in 1861.",
    "detail": "Linguist Allen Walker Read established in his 1963–64 research that OK first appeared in the Boston Morning Post on 23 March 1839, used by editor Charles Gordon Greene as an abbreviation of 'oll korrect', a comic misspelling of 'all correct', part of a newspaper fad for humorous abbreviations. In the 1840 election, supporters of Martin Van Buren formed OK clubs after his nickname 'Old Kinderhook', spreading it nationwide.\n\nSince it existed in 1839, an explanation that arose during the Civil War (1861–65) cannot fit the dates. Wordorigins.org lists various folk etymologies without credible evidence, including Andrew Jackson's supposed illiteracy, Choctaw, and German 'Ober Kommando'.\n\nTo leave room: Wikipedia notes that Read himself did not rule out other influences, and a West African (for example Wolof) contribution has been proposed but lacks documentary proof.",
    "origin": "'0 Killed' sounds like a military anecdote and is easy to remember; the real source is an outdated newspaper joke, less dramatic.",
    "instead": "Say: 'OK appears in American newspapers by 1839 as a joking misspelling of 'all correct'; the Civil War story doesn't fit the dates.'",
    "sources": [
      {
        "label": "Wikipedia — OK (etymology: 1839; Allen Walker Read; other hypotheses)",
        "url": "https://en.wikipedia.org/wiki/OK"
      },
      {
        "label": "Word Origins — OK / okay / A-OK (23 March 1839; list of folk etymologies)",
        "url": "https://wordorigins.org/big-list-entries/ok-okay"
      }
    ]
  },
  "origin-li-bai-moon-drowning": {
    "belief": "Li Bai got drunk, jumped into the river to grasp the moon's reflection, and drowned",
    "truth": "The 'grasping the moon' death is a later legend: early and near-contemporary texts don't have it, and the earliest explicit account we found is a Northern Song poem by Mei Yaochen.",
    "detail": "Li Bai died in 762 at Dangtu. According to an essay on aisixiang.com, neither Li Yangbing's preface (762), Fan Chuanzheng's epitaph (817) nor the Old and New Tang Histories contain the moon-grasping episode; they record only that he died in Dangtu. The essay argues the legend formed gradually over more than a century after his death.\n\nThe earliest explicit material it identifies is Mei Yaochen's (1002–1060) Northern Song poem, which tells of a drunken poet reaching for the moon. A Qing scholar, Wang Qi, cited a line from Wang Dingbao's Five Dynasties Tang Zhiyan about drowning while grasping the moon, but the essay says it cannot be found in the extant editions. Chinese Wikipedia also says the legend circulates 'from the Song dynasty on', and a Sotheby's article calls it an apocryphal story.\n\nSo we can say there's no reliable early source for it; we cannot say he surely did not die that way, because we have no detailed reliable record of his death.",
    "origin": "Li Bai loved wine and the moon, which fill his poems; later writers merged poet and ending into one romantic story that spread from the Song dynasty and was fixed by literary retellings.",
    "instead": "Say: 'Li Bai died at Dangtu and the sources don't detail the cause; the drunken moon-grasping death first appears in Northern Song writing and is legend.' Add 'it is said' when telling it.",
    "sources": [
      {
        "label": "Aisixiang — essay on the formation of the 'grasping the moon' legend (Li Yangbing's preface, Fan Chuanzheng's epitaph, the Tang Histories, Mei Yaochen's poem, Tang Zhiyan)",
        "url": "https://www.aisixiang.com/data/85828.html"
      },
      {
        "label": "Chinese Wikipedia — Li Bai (moon-grasping legend circulating from the Song dynasty)",
        "url": "https://zh.wikipedia.org/wiki/李白"
      },
      {
        "label": "Sotheby's — Reaching for the Moon: Reimagining the Death of a Legendary Poet (calls it an apocryphal story)",
        "url": "https://www.sothebys.com/en/articles/reaching-for-the-moon-reimaging-the-death-of-a-legendary-poet"
      }
    ]
  },
  "origin-dragon-boat-qu-yuan": {
    "belief": "People eat zongzi and race dragon boats at Duanwu to commemorate the drowned poet Qu Yuan",
    "truth": "The Qu Yuan story is a layer added to Duanwu later; both the sources and scholars point to earlier customs on the fifth day of the fifth month, such as warding off evil and dragon rites.",
    "detail": "Qu Yuan lived in the Warring States period (c. 340–278 BC). The best-known tale says the people of Chu raced boats to search for him, or threw rice into the river so fish would spare his body, giving us dragon boats and zongzi. But Wikipedia's survey of the festival notes that some modern research suggests the stories of Qu Yuan or Wu Zixu were superimposed onto pre-existing holiday traditions.\n\nSeveral people are in fact commemorated on this day. Beyond Qu Yuan, the Han-dynasty Stele of Cao E records the line 'on the fifth of the fifth month, welcoming Lord Wu', referring to rites for Wu Zixu in the Wu region, and the filial daughter Cao E is tied to the date too. Meanwhile, earlier texts treat the fifth month itself as a time for warding off pestilence: the Chinese Wikipedia summary points to the Xia Xiaozheng's mention of bathing with orchid herbs in the fifth month, and Fengsu Tongyi calling it an 'evil month'.\n\nWen Yiduo argued in 'Duanwu kao' and elsewhere that the day began as a dragon-totem festival of the Wu-Yue peoples of the lower Yangtze, with dragon-boat racing as a survival of totem rites. The theory has been very influential, though later scholars found it not fully convincing. The earliest explicit text tying Qu Yuan, the fifth day and thrown rice together is dated differently by different sources (some say the Han, others point to Wu Jun's Xu Qixie ji of the Liang dynasty), but either way it comes long after Qu Yuan's life. A safe summary: the festival's origin is unsettled, and Qu Yuan is its most moving layer rather than its only or earliest one.",
    "origin": "Qu Yuan's loyalty and tragic end struck a deep chord, and Sima Qian gave him a biography in the Shiji. Later generations tied a pre-existing festival about warding off evil, water and dragons to his fate, and that account became the most common explanation in schools and festival publicity.",
    "instead": "Say: 'Duanwu has several origin stories, and Qu Yuan's is the best known; its protective and dragon-related customs are probably older than him.' Remembering Qu Yuan at the festival is perfectly fine; just don't present it as the one and only origin.",
    "sources": [
      {
        "label": "Wikipedia — Duanwu Festival (origins: Qu Yuan, Wu Zixu, Cao E and earlier-festival theories)",
        "url": "https://en.wikipedia.org/wiki/Duanwu_Festival"
      },
      {
        "label": "Chinese Wikipedia — Duanwu Festival (multiple origin theories; Xia Xiaozheng, Fengsu Tongyi and the Qu Yuan texts)",
        "url": "https://zh.wikipedia.org/wiki/端午节"
      },
      {
        "label": "Tsinghua University — introduction to Wen Yiduo's 'Duanwu kao' and the dragon-worship theory",
        "url": "https://www.tsinghua.edu.cn/info/1365/81394.htm"
      }
    ]
  },
  "origin-vena-amoris-ring-finger": {
    "belief": "The wedding ring goes on the left ring finger because it has a 'vein of love' running straight to the heart",
    "truth": "No finger has a special vessel running straight to the heart; the explanation is an old writers' claim, and the Latin phrase 'vena amoris' itself first appears in English only in 1686.",
    "detail": "The Roman writer Macrobius (c. AD 400, Saturnalia) reported a doctor's claim that a nerve runs from the heart to the tip of the left ring finger. He said nerve, not vein. By the 7th century, Isidore of Seville wrote that people had begun wearing a ring on the fourth finger counting from the thumb because a vein there links it to the heart. The 12th-century Decretum of Gratian and John of Salisbury have similar passages, so this was an anatomical idea copied from book to book.\n\nThe term 'vena amoris' is, according to Wikipedia, first recorded in Henry Swinburne's treatise on marriage contracts, published in 1686; he cites unnamed ancient sources and an Egyptian connection, most likely meaning Macrobius. William Harvey's work on the circulation later left the idea of a dedicated finger-to-heart line untenable.\n\nOne caution: the story is used to explain where the ring goes, but there is no reliable single answer for why the tradition settled on that finger. The sources only show that ancient and medieval writers explained it this way, not that this was the real cause of the custom.",
    "origin": "The claim recurs in late-antique and medieval writing, shifts from nerve to vein, and was later renamed 'vein of love' in modern wedding culture, where it is a staple of jewellery marketing and wedding articles.",
    "instead": "Say: 'Ancient and medieval writers explained the ring finger this way; it's a romantic tradition, not anatomy.' Wear a ring on any finger you like; what matters is what it means to the two people.",
    "sources": [
      {
        "label": "Wikipedia — Vena amoris (Macrobius, Isidore, Swinburne 1686)",
        "url": "https://en.wikipedia.org/wiki/Vena_amoris"
      },
      {
        "label": "Word Histories — origin of 'the ring finger' and of French 'l'annulaire' (Macrobius, Isidore, John of Salisbury, Decretum Gratiani)",
        "url": "https://wordhistories.net/2016/12/07/annulaire/"
      }
    ]
  },
  "origin-valentine-lupercalia": {
    "belief": "Valentine's Day comes from the Roman festival of Lupercalia, or honors a saint martyred for secretly marrying lovers",
    "truth": "Almost nothing is known of St Valentine, the Lupercalia link lacks evidence, and the earliest recorded tie between Valentine's feast and romance is Chaucer in the 1380s.",
    "detail": "Feb 14 as a feast for martyrs named Valentine is recorded in the 8th-century Gelasian Sacramentary. But Wikipedia, relaying scholars, says that apart from his name and burial on the Via Flaminia on Feb 14, nothing is known of him; History.com quotes a researcher saying the early martyrdom accounts have 'not a word' about romance.\n\nThe Lupercalia claim (c. Feb 13–15) fares no better: Bruce Forbes and others say there is no evidence linking St Valentine's Day to Lupercalia's purification rites. Jack Oruch and Henry Ansgar Kelly traced such speculation largely to 18th-century antiquaries such as Alban Butler, from whom it hardened into 'fact'. History.com likewise says early accounts do not support the modern claim that Lupercalia was romantic.\n\nThe first recorded link between St Valentine's Day and love is Chaucer's Parliament of Fowls (c. 1382), where birds choose mates on the day. Kelly suggests Chaucer may have meant a different Valentine, whose feast is May 3, but that Feb 14 was better known and so became the romantic date; that part is still discussed by scholars.",
    "origin": "18th-century antiquaries joined St Valentine's Day to Lupercalia; such claims were then repeated in popular writing, and the commercial holiday later treated them as a ready-made origin.",
    "instead": "Say: 'The earliest known link between Valentine's Day and romance is Chaucer in the 14th century; the Lupercalia and martyr-romance stories have no solid sources.' 'According to legend' fits the evidence better than 'in fact'.",
    "sources": [
      {
        "label": "Wikipedia — Valentine's Day (St Valentine, Chaucer's Parliament of Fowls, scholarly assessment of Lupercalia)",
        "url": "https://en.wikipedia.org/wiki/Valentine%27s_Day"
      },
      {
        "label": "History.com — Livia Gershon, The real St. Valentine and the medieval romance of the holiday",
        "url": "https://www.history.com/articles/real-st-valentine-medieval"
      }
    ]
  },
  "origin-watt-kettle": {
    "belief": "James Watt saw a kettle lid rattle with steam and thereby invented the steam engine",
    "truth": "The Newcomen engine existed before Watt; his contribution was improvements such as the separate condenser (1765), and the kettle-inspiration story has an unclear source and looks like a later addition.",
    "detail": "Wikipedia is explicit: Watt did not invent the steam engine but greatly improved the efficiency of the existing Newcomen engine. In 1763, repairing a Newcomen model, he found that about three-quarters of the steam's thermal energy went into reheating the cylinder each cycle; in May 1765, crossing Glasgow Green, he conceived the separate condenser, keeping the cylinder hot and making engines up to about five times as fuel-efficient.\n\nAs for the kettle: Wikipedia suggests the story may have been created by Watt's son to embellish his father's legacy. The Science Museum's blog notes that it holds an object known as Watt's 'philosophising steam kettle' and relays the story that his steam work was inspired by a boiling kettle. All that can be said is that no reliable contemporary record of 'saw the lid lift and invented the engine' has been found.",
    "origin": "The 19th century liked to give great inventors a single flash of insight (the same kind of story as Newton's apple). The kettle tale is still told today, and a museum even keeps an object known as Watt's 'philosophising steam kettle'.",
    "instead": "Say: 'Watt didn't invent the steam engine; he made the existing Newcomen engine efficient, chiefly with the separate condenser.' The kettle can be told as a later legend with an unclear source.",
    "sources": [
      {
        "label": "Wikipedia — James Watt (kettle story; Newcomen engine; separate condenser, 1765)",
        "url": "https://en.wikipedia.org/wiki/James_Watt"
      },
      {
        "label": "Science Museum Group blog — Remembering James Watt ('philosophising steam kettle' and the kettle story)",
        "url": "https://blog.sciencemuseum.org.uk/remembering-james-watt/"
      }
    ]
  },
  "origin-edison-invented-lightbulb": {
    "belief": "Thomas Edison invented the light bulb",
    "truth": "Several people had made incandescent lamps before Edison, and Swan demonstrated a carbon-filament lamp in 1878–79; Edison's achievement was making it durable, practical and part of a whole supply system.",
    "detail": "The Edison Papers project (Rutgers) says experimenters had struggled for about forty years before Edison began in 1878; the problem was getting a filament hot enough to give light without melting, oxidizing or drawing too much power. Earlier work includes Davy's platinum strip in 1802, De la Rue's platinum coil in a vacuum tube in 1840, and Joseph Swan in Britain, who demonstrated a carbon-rod lamp in December 1878 and again in early 1879.\n\nWhat Edison did was turn it into a product: he reasoned that lamps needed high resistance to save costly copper; from March 1879 he isolated the filament in a vacuum bulb; on 21–22 October 1879 a carbonized cotton thread glowed in vacuum (Wikipedia records about 13.5 hours), and he later found carbonized bamboo could last over 1,200 hours; and the lamps were wired in parallel so one could go out without affecting the others.\n\nPatents were not one-sided either: the two companies merged in Britain as the Edison and Swan United Electric Company; in the US the Patent Office in 1883 ruled Edison's patents invalid on prior art, and only in 1889 did a judge uphold the claim to a 'filament of carbon of high resistance'. Another commonly cited forerunner, Heinrich Göbel's 1850s lamps, was concluded by 2007 research to be fictitious.",
    "origin": "Edison was good at packaging, manufacturing and storytelling; Menlo Park and the power system built around it made him 'the man who invented the lamp', and textbooks and press compressed a relay of inventors in several countries into one name.",
    "instead": "Say: 'Edison didn't invent the incandescent lamp; he and his team made it durable, commercial and connectable to a grid.' Mention Swan too, whose British company merged with Edison's.",
    "sources": [
      {
        "label": "Thomas A. Edison Papers (Rutgers) — Electric Lamp (forty years of earlier experiments; high resistance, vacuum, carbonized cotton Oct 1879, parallel circuits)",
        "url": "https://edison.rutgers.edu/life-of-edison/inventions?catid=91&id=531%3Aelectric-lamp&view=article"
      },
      {
        "label": "Wikipedia — Incandescent light bulb (Davy, De la Rue, Swan, Göbel, patent disputes)",
        "url": "https://en.wikipedia.org/wiki/Incandescent_light_bulb"
      }
    ]
  },
  "origin-archimedes-eureka-bath": {
    "belief": "Archimedes discovered buoyancy in his bath and ran naked through the streets shouting 'Eureka'",
    "truth": "The story first appears in Vitruvius, about two centuries after Archimedes, and not in his own works; whether the measurement it describes could actually work has long been debated.",
    "detail": "Vitruvius tells it in the preface to Book IX of De Architectura: King Hiero of Syracuse commissioned a gold votive crown, suspected the goldsmith of mixing in silver, and asked Archimedes to examine it. Entering a bath, Archimedes saw the water overflow, grasped the method, leapt out, ran home naked and kept shouting the Greek 'εὑρηκα' ('I have found it'). Wikipedia notes that the anecdote appears in none of Archimedes' surviving mathematical works and that Vitruvius wrote around two centuries later.\n\nThe Museo Galileo exhibit says the method Vitruvius attributes to Archimedes 'has been the focus of lively scholarly debate ever since'. One criticism Wikipedia relays is that a crown with only a little silver would displace a barely different volume of water, hard to detect with ancient tools. Another ancient source, the anonymous poem Carmen de Ponderibus (c. 5th century), describes weighing the objects on a balance immersed in water, closer to the principle in Archimedes' On Floating Bodies.\n\nA safe reading is that the buoyancy principle is Archimedes' own, documented in his writings, while the bathtub scene and the shout are a later legend whose details cannot be checked against contemporary records.",
    "origin": "The tale was passed on by Vitruvius and later writers such as Plutarch and became the classic picture of the sudden flash of insight; in modern times textbooks and popular science retold it until the details looked settled.",
    "instead": "Say: 'The buoyancy principle is Archimedes' own, in his writings; the bath-and-crown story comes from Vitruvius two centuries later and is best told as a legend.'",
    "sources": [
      {
        "label": "Vitruvius, De Architectura, Book IX preface (Thayer edition, University of Chicago)",
        "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Vitruvius/9*.html"
      },
      {
        "label": "Wikipedia — Archimedes (source of the crown story, absence from his works, On Floating Bodies, Carmen de Ponderibus)",
        "url": "https://en.wikipedia.org/wiki/Archimedes"
      },
      {
        "label": "Museo Galileo — Vitruvius and Archimedes (scholarly debate over the method)",
        "url": "https://exhibits.museogalileo.it/archimedes/section/VitruviusArchimedes.html"
      },
      {
        "label": "Wikipedia — Eureka (word) (criticism that the displacement difference would be hard to measure; Vitruvius and Plutarch)",
        "url": "https://en.wikipedia.org/wiki/Eureka_(word)"
      }
    ]
  },
  "origin-nian-beast": {
    "belief": "Firecrackers and red couplets at Spring Festival come from scaring away a fierce monster called Nian",
    "truth": "The Nian monster cannot be found in classical texts; the earliest written trace found so far dates to the 1930s, and the standard version was fixed by a 1980 newspaper article.",
    "detail": "Folklore researcher Zhu Chunxiang's survey (published by The Paper) lays out the written trail found so far: in January 1933, Sun Yusheng (pen name Haishang Shushengsheng) mentioned in the newspaper Jingangzuan a dog-like creature chained to a pillar, linked to Ziwei-star New Year pictures; on 31 December 1939 Shen Bao ran 'The Legend of New Year' signed 'Shen'; on 16 February 1980 People's Daily published Zhao Cifeng and Kang Xinmin's 'The Legend and Customs of New Year', which set the now-familiar version where Nian fears noise, red and fire.\n\nA piece on China Writers' Network, relaying research, likewise says the Nian tale can be traced back only to roughly the 1930s, having circulated orally before then without authoritative written records, which is why local versions vary; it was through newspapers and popular books from the 1980s that it became uniform and widespread.\n\nA caution: 'not found in old books' does not mean nobody ever told it before; oral legends leave few traces. Researchers speculate it may derive from the beast in Ziwei-star New Year pictures plus the idea of the 'year-end pass' (debt collection). What can be said is that describing it as an ancient origin thousands of years old has no written evidence at present.",
    "origin": "The story was retold through 20th-century newspapers, picture books and later animation until it became the 'standard answer' for Spring Festival customs (firecrackers, red decorations, staying up late).",
    "instead": "Say: 'Nian is a widely told story, but the earliest written record found is from the 1930s.' Tell it to children as a story.",
    "sources": [
      {
        "label": "The Paper (Pengpai) — Zhu Chunxiang on the documentary sources of the Nian legend (Jingangzuan 1933, Shen Bao 1939, People's Daily 1980)",
        "url": "https://www.thepaper.cn/newsDetail_forward_2778438"
      },
      {
        "label": "China Writers' Network — article on the origin and earliest record of the Nian legend (2025)",
        "url": "https://www.chinawriter.com.cn/n1/2025/0209/c442005-40415244.html"
      }
    ]
  },
  "origin-posh-port-out-starboard-home": {
    "belief": "'Posh' stands for 'Port Out, Starboard Home', the shady cabins wealthy passengers booked on ships to India",
    "truth": "No ticket stamped POSH and no shipping-company record has ever been found; the explanation first appears in 1932, long after the word was in English.",
    "detail": "The tale says that on liners between Britain and India the rich booked port-side cabins outbound and starboard-side homeward to avoid the sun, and their tickets were stamped POSH. The WordOrigins.org entry puts it bluntly: an excellent story, but no tickets with posh stamped on them have ever been found and company records show no sign of the phrase. It also notes that the explanation did not appear until 1932, by which time the word had long been established.\n\nWordOrigins' likelier sources are two related senses. One is money, from Angloromani posh ('half', as in a halfpenny), with 1830 court records already using it for money. The other is 'smart, stylish', possibly from Urdu safed-pōš ('white-clothed', i.e. well-dressed), with 1914 military slang using it for superior clothing. Earlier still, in 1801, Posh was merely a character's name in a play. Wikipedia's list of false etymologies likewise says posh probably derives from 19th-century slang for a dandy, originally underworld slang for money.\n\nTwo similar 'acronym' stories fail too: golf is not 'Gentlemen Only, Ladies Forbidden', since the word existed in Middle Scots, and tip is not 'To Insure Promptness', since the word dates to the 17th century while acronyms were nearly non-existent in English until the mid-20th. The real sources of these words are not fully settled, but 'not an acronym' is well supported.",
    "origin": "'Each letter stands for a word' tales sound clever and visual and involve no real people, so they pass easily through guidebooks and chat; acronyms only became common in English in the 20th century, so applying one to an older word is an after-the-fact reconstruction.",
    "instead": "Say: 'The origin of posh is uncertain; the better-supported view is that it grew from slang for money and for smart dress; there is no documentary support for Port Out, Starboard Home.' When told 'X is really an acronym', ask when it first appears and whether any physical evidence exists.",
    "sources": [
      {
        "label": "WordOrigins.org — Posh (no POSH tickets, 1932 first appearance of the claim, Romani and Urdu sources)",
        "url": "https://www.wordorigins.org/big-list-entries/posh"
      },
      {
        "label": "Wikipedia — List of common false etymologies of English words (posh, golf, tip)",
        "url": "https://en.wikipedia.org/wiki/List_of_common_false_etymologies_of_English_words"
      }
    ]
  },
  "origin-cocktail-word-legends": {
    "belief": "The word 'cocktail' comes from a Revolutionary War tavern-keeper Betsy Flanagan decorating glasses with cock tail feathers (or from the French egg cup, coquetier)",
    "truth": "Betsy Flanagan is a fictional character and the egg-cup story fails on dates; where the word really comes from is unsettled, with the better-supported guess involving horses with upright tails.",
    "detail": "The earliest printed uses of 'cocktail' are 1798 in London's Morning Post and Gazetteer and 1803 in a US agricultural paper; on 13 May 1806 the editor of The Balance and Columbian Repository replied to a reader's question with the earliest known definition: a stimulating liquor of spirits, sugar, water and bitters.\n\nBetsy Flanagan (a Virginia tavern about 1779 where drinks were stirred with feathers): VinePair, citing historian William Grimes, says she was actually a character in James Fenimore Cooper's novel The Spy. The coquetier story (Antoine Peychaud serving drinks in French egg cups that customers mispronounced): his business opened only in 1834, decades after the word had been defined.\n\nThe better-supported account in the Difford's Guide and VinePair surveys: following the Oxford English Dictionary, a 'cocktail' was a horse with a docked, upright tail, usually of mixed breeding, and the sense of 'mixed' passed to adulterated drinks; the cocktail historian David Wondrich favours British sporting slang about stimulating tired horses. This is still conjecture, and both surveys say no definitive origin has been established; other tales (such as Mexican cola de gallo) rest on a single 1936 source.",
    "origin": "Betsy's story comes from Cooper's novel The Spy, yet later tellings repeated it as fact; the egg-cup story was devised long after 'cocktail' was already in use.",
    "instead": "Say: 'The word goes back to at least 1798 and its origin is unsettled; the popular Betsy and egg-cup tales both have clear holes.'",
    "sources": [
      {
        "label": "Difford's Guide — Origins of the word cocktail (1798, 1803, 1806; OED horse-tail theory; assessment of theories)",
        "url": "https://www.diffordsguide.com/encyclopedia/2292/cocktails/origins-of-the-word-cocktail"
      },
      {
        "label": "VinePair — The term 'cocktail' and its disputed origins (Betsy Flanagan as novel character; Peychaud 1834; Wondrich's view)",
        "url": "https://vinepair.com/articles/term-cocktail-disputed-origins/"
      },
      {
        "label": "Wikipedia — Cocktail (etymology: disputed; early 'stimulating' uses)",
        "url": "https://en.wikipedia.org/wiki/Cocktail"
      }
    ]
  },
  "origin-sandwich-gambling-earl": {
    "belief": "The sandwich was invented by the Earl of Sandwich so he could keep gambling without leaving the card table",
    "truth": "The gambling tale rests on one French travel writer's anecdote, which the earl's biographer finds unsupported; bread-and-filling foods were not his invention, though the name very likely does come from him.",
    "detail": "The usual version says John Montagu, 4th Earl of Sandwich, gambled for a whole day eating only beef between toasted bread, and others began ordering 'the same as Sandwich'. The source is the French writer Pierre-Jean Grosley's account of his 1765 stay in London, published in the early 1770s; it describes a minister gaming for 24 hours, without naming him.\n\nThe naval historian N. A. M. Rodger, in his biography of the earl, says there is no supporting evidence for the piece of gossip and it does not seem likely to have any foundation, especially since in 1765 Sandwich was a busy Cabinet minister; he thinks the earl more probably ate this way at his desk. Word Histories notes that the earliest known use of the word 'sandwich' is in Edward Gibbon's 1762 diary, which does not mention the earl, but the word is almost certainly named for him, as there is no other plausible explanation.\n\nHistory.com also stresses that the earl was not the first to think of the idea; bread-wrapped fillings existed in many places long before. A safe summary: his name stuck to the food, and how that came about cannot be settled from the surviving sources.",
    "origin": "Grosley's book describes only an unnamed minister gaming for 24 hours; later retellings attached it to the Earl of Sandwich, and gambling, 24 hours and 'the same as Sandwich' hardened into fixed plot, and into the thing the earl, better known for naval and political roles, is most remembered for.",
    "instead": "Say: 'The sandwich is named after the Earl of Sandwich, but he didn't invent bread with fillings; the gambling story is an 18th-century anecdote his biographer doesn't believe.'",
    "sources": [
      {
        "label": "Word Histories — history of the word 'sandwich' (Gibbon 1762, Grosley's Londres, Rodger's comment)",
        "url": "https://wordhistories.net/2017/03/23/sandwich/"
      },
      {
        "label": "History.com — Who Invented the Sandwich? (earl not the first; Grosley's anecdote may be invented)",
        "url": "https://www.history.com/.amp/news/sandwich-inventor-john-montagu-earl-of-sandwich"
      },
      {
        "label": "Wikipedia — John Montagu, 4th Earl of Sandwich (Grosley's account; Rodger's work-desk theory)",
        "url": "https://en.wikipedia.org/wiki/John_Montagu,_4th_Earl_of_Sandwich"
      }
    ]
  },
  "origin-toast-clink-poison": {
    "belief": "People clink glasses so the drinks splash into each other's cup, to guard against poisoning",
    "truth": "There is no evidence for this; clinking has only about 300 years of history, long after toasting began, and toasting itself goes back to ancient libations.",
    "detail": "Wikipedia says that the account (clinking makes each drink spill into the other's) has 'no real evidence'; Mental Floss adds that people have only been clinking glasses for about 300 years, long after toasting was born, so poison testing is unlikely to be the cause. The same article says explanations such as driving away evil spirits with the noise also lack credible evidence.\n\nTwo better-supported explanations: toasting itself is probably a secular vestige of ancient sacrificial libations, according to the International Handbook on Alcohol and Culture as cited by Wikipedia; and the word 'toast' became attached to the custom in the 17th century from spiced toast used to flavour drinks, with a lady's name likened to the seasoning. As for the clink, Mental Floss relays the view that once people moved from a shared 'loving cup' to individual glasses, bringing the glasses together symbolically reunited the drink as one. That is an interpretation, not a settled fact.",
    "origin": "'To avoid poison' sounds reasonable and has a touch of court intrigue, so it became the favourite table-talk explanation; it reflects people's habit of inventing reasons for customs rather than a documented cause.",
    "instead": "Say: 'Nobody knows for sure how clinking began; the poison story has no evidence, and clinking is much younger than toasting.'",
    "sources": [
      {
        "label": "Wikipedia — Toast (honor) (clink-and-poison claim 'no real evidence'; libation theory; the word 'toast')",
        "url": "https://en.wikipedia.org/wiki/Toast_(honor)"
      },
      {
        "label": "Mental Floss — Why do we toast and clink glasses? (about 300 years of clinking; poison and spirit theories unsupported)",
        "url": "https://www.mentalfloss.com/culture/why-do-we-toast-celebrate"
      }
    ]
  },
  "origin-hanshi-jie-zitui": {
    "belief": "The Cold Food Festival bans fire and eats cold food to honour Jie Zitui, who died when the Duke of Jin set the mountain ablaze to force him out",
    "truth": "The story of Jie Zitui burning to death is absent from the early sources, the earliest record of the festival comes about 600 years after him, and scholars differ over whether the fire ban has an older origin.",
    "detail": "According to Wikipedia's account, the earliest record of the festival is in Huan Tan's New Discussions (c. 1st century AD), saying residents of Taiyuan avoided fire for five days around midwinter to honour Jie Zitui, about six hundred years after the Spring and Autumn period. In the earlier Zuozhuan, Jie Zitui withdraws voluntarily after feeling overlooked; there is no death by fire. A later Han biography has the official Zhou Ju criticizing locals for fire-avoidance that cost lives, showing the custom was strictly kept by then.\n\nOther scholars argue the roots lie in an older 'changing fire' practice: Du Gongzhan linked it to the Rites of Zhou's rule that in mid-spring wooden bells enforce a fire ban, and China News introduces it as extinguishing old fires and drilling new ones in dry early spring, with cold food eaten meanwhile; they see the Jie Zitui tale as added later. Wikipedia, however, says such alternative theories are 'unlikely accurate', because early sources consistently tie the festival to Jie Zitui and the theories lean on the spring timing, when the festival originally fell in midwinter.\n\nSo scholars disagree: what can be said is that the burning episode is late; whether the fire ban existed first and was attached to Jie Zitui, or was tied to him from the start, is unsettled.",
    "origin": "Jie Zitui went from a man who withdrew when overlooked to a model of loyalty who cut flesh to feed his lord, refused rewards and burned to death; once the festival drew close to Qingming and merged with it, the story entered the explanation of Qingming too.",
    "instead": "Say: 'There are two main explanations for the Cold Food Festival: commemorating Jie Zitui, or an older fire-changing custom; the 'burned out of the mountain' detail is not in the early sources.'",
    "sources": [
      {
        "label": "Wikipedia — Cold Food Festival (Huan Tan; Zuozhuan's Jie Zitui; Zhou Ju; alternative theories of Du Gongzhan, de Groot, Frazer)",
        "url": "https://en.wikipedia.org/wiki/Hanshi_Festival"
      },
      {
        "label": "China News — two accounts of the Cold Food Festival's origin (Jie Zitui and the ancient fire-changing custom)",
        "url": "https://www.chinanews.com.cn/life/2022/04-02/9718038.shtml"
      },
      {
        "label": "The World of Chinese — China's ancient Cold Food Festival (the standard Jie Zitui legend)",
        "url": "https://www.theworldofchinese.com/2018/04/chinas-ancient-cold-food-festival-is-not-too-hot/"
      }
    ]
  },
  "origin-thomas-crapper-flush-toilet": {
    "belief": "Thomas Crapper invented the flush toilet, and the English word 'crap' comes from his name",
    "truth": "Crapper did not invent the flush toilet, and the word 'crap' is older than he was; he did have real inventions, such as the floating ballcock and the U-bend.",
    "detail": "Wikipedia says Crapper held nine patents, three of them for water-closet improvements such as the floating ballcock, but none for the flush toilet itself; his advertising even implied he invented the siphonic flush, and one ad cited a patent number that actually belonged to Albert Giblin in 1898. He did improve the drain trap in 1880 with the U-bend, opened the world's first bathroom showroom on King's Road, and won several royal warrants.\n\nThe 'crap' story (American soldiers in the First World War saw his name on cisterns and began saying 'going to the crapper') fails as well: the word long predates him. The WordOrigins.org entry cites a manuscript copied before 1425 where 'crappys' means mill chaff, with earlier Anglo-Norman forms such as chrape and crappe meaning rubbish or chaff; its application to excrement is recorded in the 19th century (the OED's first such use is 1846, about ten years after Crapper's birth). The word's ultimate source is still uncertain, with French and Dutch influences likely.\n\nWordOrigins' view is that his name, so apt for his trade, may have helped the word spread but was not its source.",
    "origin": "The coincidence of surname and trade, together with his genuine sanitary-ware business, made 'Crapper invented the toilet' a widely repeated piece of trivia, often joined to the origin of the word 'crap'.",
    "instead": "Say: 'Crapper was a real sanitary-ware businessman who improved toilet parts but did not invent the flush toilet; the word crap existed before him.'",
    "sources": [
      {
        "label": "Wikipedia — Thomas Crapper (nine patents, no flush-toilet patent, the U-bend, misleading ads; 'crap' predates him)",
        "url": "https://en.wikipedia.org/wiki/Thomas_Crapper"
      },
      {
        "label": "WordOrigins.org — Crap (pre-1425 manuscript; Anglo-Norman and Dutch roots; 19th-century excretory sense)",
        "url": "https://www.wordorigins.org/big-list-entries/crap"
      }
    ]
  },
  "world-einstein-compound-interest": {
    "belief": "\"Compound interest is the eighth wonder of the world.\" — Albert Einstein",
    "truth": "No source has been found for Einstein saying this. The earliest close match is a 1925 advertisement for a US savings-and-loan company.",
    "detail": "Quote Investigator's earliest close match is an unsigned 1925 advertisement for the Equity Savings & Loan Company in the Cleveland Plain Dealer (Ohio): \"The Eighth Wonder of the World—is compound interest.\" Similar ads followed: a 1929 bank ad, a 1965 Wall Street Journal ad crediting Baron Rothschild, and a 1981 newspaper crediting Rockefeller.\n\nThe earliest Einstein attribution found is in a 1988 newspaper. Princeton University Press's The Ultimate Quotable Einstein lists the line under \"Probably Not By Einstein\". Quote Investigator found no substantive evidence that Einstein, Rothschild or Rockefeller used it, and suspects an anonymous copywriter.\n\nTo be fair, this shows an absence of evidence, not proof that Einstein never said it. But no document records him saying it.",
    "origin": "Financial advertising likes borrowed authority, so an unsigned line was reassigned to Rothschild, Rockefeller and finally Einstein (first recorded attribution 1988), and then copied across personal-finance writing.",
    "instead": "If you want to cite it, say \"often attributed to Einstein, no source found; earliest known in a 1925 savings ad\". To make the point about compounding, show the formula and real numbers instead.",
    "sources": [
      {
        "label": "Quote Investigator, 2019 — The Eighth Wonder of the World Is Compound Interest",
        "url": "https://quoteinvestigator.com/2019/09/09/interest/"
      }
    ]
  },
  "world-einstein-insanity-definition": {
    "belief": "\"Insanity is doing the same thing over and over again and expecting different results.\" — Albert Einstein",
    "truth": "There is no evidence Einstein said it. The earliest versions found are from 1981, in addiction-recovery settings.",
    "detail": "Quote Investigator's earliest strong matches are both from 1981: in October a Knoxville, Tennessee newspaper reported an Al-Anon attendee saying it, and in November a Narcotics Anonymous pamphlet had \"Insanity is repeating the same mistakes and expecting different results.\" A 1983 novel by Rita Mae Brown, Sudden Death, also has a character say it.\n\nAttributions to Einstein start appearing in newspapers around 1990, decades after his death in 1955. The Ultimate Quotable Einstein lists it under \"Misattributed to Einstein\".\n\nBecause twelve-step groups are anonymous, who first said it cannot be established. What can be said is that it circulated in recovery circles in 1981, before any Einstein attribution.",
    "origin": "It probably spread by word of mouth in recovery groups, then into self-help books; from about 1990 it was given Einstein's name because a famous genius makes a line sound weightier.",
    "instead": "Write \"a saying from addiction-recovery circles, recorded by 1981\", or leave it unsigned. It is also not a clinical definition, and repeated attempts are often exactly how learning works.",
    "sources": [
      {
        "label": "Quote Investigator, 2017 — Insanity Is Doing the Same Thing Over and Over Again and Expecting Different Results",
        "url": "https://quoteinvestigator.com/2017/03/23/same/"
      }
    ]
  },
  "world-einstein-bees": {
    "belief": "\"If the bee disappeared off the face of the earth, man would have only four years left to live.\" — Albert Einstein",
    "truth": "No document records Einstein saying this. The earliest Einstein attribution is from a French periodical in 1965, a decade after his death.",
    "detail": "Quote Investigator's timeline: in 1941 the Canadian Bee Journal printed \"Remove the bee from the earth and at the same stroke you remove at least one hundred thousand plants\", with no four-year figure and no Einstein. In May 1965 the French periodical La Vie des Bêtes et l'Ami des Bêtes first tied a four-year deadline for humanity to Einstein, and a June 1965 bee magazine repeated it. In January 1994 The Scotsman quoted a pamphlet from the National Union of French Apiculture using his name.\n\nThe Ultimate Quotable Einstein files it under \"Probably Not by Einstein\". Some sites credit Maeterlinck's 1901 Life of the Bee, but Quote Investigator does not give the four-year line to him; he wrote about plants that depend on bees.\n\nPollinators matter for many crops, but the four-year figure has no scientific calculation behind it. This entry is about the attribution only.",
    "origin": "Beekeeping and conservation groups wanted a striking line, and Einstein's name gave it a scientific air. It appeared in French bee journals from the 1960s and reached English via a 1990s apiculture pamphlet.",
    "instead": "Say \"attributed to Einstein; earliest known in a 1965 French beekeeping journal; no source\". For the substance, cite published data on pollinator-dependent crops.",
    "sources": [
      {
        "label": "Quote Investigator, 2013 — If the Bee Disappeared Off the Face of the Earth, Man Would Only Have Four Years Left To Live",
        "url": "https://quoteinvestigator.com/2013/08/27/einstein-bees/"
      }
    ]
  },
  "world-voltaire-defend-to-death": {
    "belief": "\"I disapprove of what you say, but I will defend to the death your right to say it.\" — Voltaire",
    "truth": "The sentence was written by the English author Evelyn Beatrice Hall in 1906, and she later said it was her own wording, not Voltaire's.",
    "detail": "In 1906 Hall, writing as S. G. Tallentyre, published The Friends of Voltaire. Describing the 1758 burning of Helvétius's book De l'esprit, she wrote this sentence as a summary of Voltaire's attitude, but put it in quotation marks. Quote Investigator found nothing like it in Voltaire's writings.\n\nIn 1939 Hall wrote to the scholar Burdette Kinne that the phrase \"is my own expression and should not have been put in inverted commas\", and apologised for misleading him.\n\nSo the accurate description is a summary of Voltaire's stance: consistent with his advocacy of tolerance, but in Hall's words.",
    "origin": "An author's neat paraphrase of a historical figure's attitude, wrapped in quotation marks, was so quotable that later writers copied it as his own words.",
    "instead": "Cite it as \"Evelyn Beatrice Hall's summary of Voltaire's attitude (1906)\", or \"often attributed to Voltaire, actually Hall\".",
    "sources": [
      {
        "label": "Quote Investigator, 2015 — I Disapprove of What You Say, But I Will Defend to the Death Your Right to Say It",
        "url": "https://quoteinvestigator.com/2015/06/01/defend-say/"
      }
    ]
  },
  "world-marie-antoinette-brioche": {
    "belief": "\"Let them eat cake.\" — Marie Antoinette",
    "truth": "There is no evidence she said it. Rousseau recorded a similar anecdote about an unnamed \"great princess\" in the 1760s, and it was pinned on her about fifty years after her death.",
    "detail": "Rousseau wrote the first six books of his Confessions in 1765 and they were published in 1782. He recalls a \"great princess\" who, told that peasants had no bread, said \"Qu'ils mangent de la brioche\". He never names her and may have invented the anecdote. Marie Antoinette was then a child in Austria.\n\nAccording to Wikipedia's account, the earliest link to her is Alphonse Karr in 1843, roughly fifty years after her execution, and revolutionaries did not use the line against her. Antonia Fraser's biography reports that Louis XVIII's family thought the story older still, about Maria Theresa, wife of Louis XIV.\n\nThe Chinese counterpart, \"why not eat meat porridge\", comes from the Book of Jin, about Emperor Hui of Jin (259–307) asking why starving people did not eat meat gruel. It is a different story about a different ruler, of the same out-of-touch-elite type.",
    "origin": "The out-of-touch-ruler anecdote circulates in many cultures and tends to be pinned on the most disliked ruler available. In 19th-century France it settled on Marie Antoinette.",
    "instead": "Say \"attributed to her, with no contemporary evidence; Rousseau tells a similar story about an unnamed princess\". For a documented case of elite indifference, use history rather than the legend.",
    "sources": [
      {
        "label": "Wikipedia — Let them eat cake (Rousseau's Confessions, Karr 1843, Emperor Hui of Jin)",
        "url": "https://en.wikipedia.org/wiki/Let_them_eat_cake"
      },
      {
        "label": "Professor Buzzkill — Quote or No Quote: \"Let Them Eat Cake\", 2019",
        "url": "https://professorbuzzkill.com/2019/07/09/quote-or-no-quote-let-them-eat-cake/"
      }
    ]
  },
  "world-burke-evil-triumph": {
    "belief": "\"The only thing necessary for the triumph of evil is for good men to do nothing.\" — Edmund Burke",
    "truth": "It is not found in Burke's writings. The earliest close match is from a speech in 1916.",
    "detail": "Quote Investigator quotes Burke's real 1770 line from Thoughts on the Cause of the Present Discontents: \"When bad men combine, the good must associate; else they will fall, one by one, an unpitied sacrifice in a contemptible struggle.\" It is related, but not the popular sentence. In 1867 John Stuart Mill, in his St Andrews address, wrote \"Bad men need nothing more to compass their ends, than that good men should look on and do nothing\", which is closer.\n\nThe earliest close match to the modern wording is from Rev. Charles F. Aked in October 1916, speaking on alcohol restriction: \"for evil men to accomplish their purpose it is only necessary that good men should do nothing.\" Sir R. Murray Hyslop first credited the modern form to Burke in 1920, and President Kennedy attributed it to Burke in 1961.\n\nQuote Investigator is cautious: the record is too incomplete to say who crafted it, and Aked may have adapted Burke or Mill.",
    "origin": "Burke and Mill both wrote related ideas. A tighter version took shape in the early 1900s and was assigned to Burke, a famous name for this theme, then spread widely after Kennedy cited it in 1961.",
    "instead": "Say \"often attributed to Burke; earliest close match 1916 (Aked); Mill (1867) and Burke (1770) wrote related lines\". To quote Burke himself, use his 1770 sentence.",
    "sources": [
      {
        "label": "Quote Investigator, 2010 — The Only Thing Necessary for the Triumph of Evil is that Good Men Do Nothing",
        "url": "https://quoteinvestigator.com/2010/12/04/good-men-do/"
      }
    ]
  },
  "world-well-behaved-women": {
    "belief": "\"Well-behaved women rarely make history.\" — Marilyn Monroe",
    "truth": "It comes from historian Laurel Thatcher Ulrich, in an academic article in 1976. Monroe is not the source.",
    "detail": "Quote Investigator traced it to Ulrich's article \"Vertuous Women Found: New England Ministerial Literature, 1668-1735\" in American Quarterly, vol. 28, no. 1 (Spring 1976): \"Well-behaved women seldom make history\". The word was \"seldom\", not \"rarely\" or \"never\". The article concerns funeral sermons for \"virtuous\" women in colonial New England; the line is a scholarly observation that such women left little historical record.\n\nIt was later reworded to \"rarely\" and credited to Monroe, Eleanor Roosevelt, Gloria Steinem and many others. The earliest Monroe attribution Quote Investigator found is a 2002 book, Born on a Rotten Day by Hazel Dixon-Cooper.\n\nUlrich later became a Pulitzer-winning Harvard historian. She has said that once words are written they are no longer entirely yours, and people may interpret them as they wish.",
    "origin": "A line from a scholarly paper, detached from context, became a slogan on mugs and posters; since the author mattered little to the audience, it picked up famous women's names.",
    "instead": "Cite \"Laurel Thatcher Ulrich, 1976\". Remember the original sense: it is about who history records, not a call to break rules.",
    "sources": [
      {
        "label": "Quote Investigator, 2012 — Well-Behaved Women Seldom Make History",
        "url": "https://quoteinvestigator.com/2012/11/03/well-behaved-women/"
      }
    ]
  },
  "world-aristotle-we-are-what-we-repeatedly-do": {
    "belief": "\"We are what we repeatedly do. Excellence, then, is not an act, but a habit.\" — Aristotle",
    "truth": "It is Will Durant's 1926 summary of Aristotle's ideas in The Story of Philosophy, not Aristotle's own wording.",
    "detail": "In The Story of Philosophy (1926), discussing Aristotle's ethics, Durant writes that excellence is won by training and habituation: we do not act rightly because we have virtue, but have it because we acted rightly; \"we are what we repeatedly do. Excellence, then, is not an act but a habit.\" The quoted fragments inside his passage are from the Nicomachean Ethics; \"we are what we repeatedly do\" is Durant's own summary. Wikiquote's Will Durant page places the related passage near p. 87.\n\nAristotle really does argue in Nicomachean Ethics Book II that moral excellence results from habit and custom. So the line is Aristotelian in spirit, not in wording.",
    "origin": "Durant was a best-selling popular philosopher whose summary is more memorable than any translation, and \"Durant summarising Aristotle\" gradually shrank to \"Aristotle said\".",
    "instead": "Cite \"Will Durant's summary of Aristotle's ethics, The Story of Philosophy, 1926\". To quote Aristotle, use the Nicomachean Ethics Book II passage on virtue and habit.",
    "sources": [
      {
        "label": "Wikipedia — The Story of Philosophy (source of the quotation)",
        "url": "https://en.wikipedia.org/wiki/The_Story_of_Philosophy"
      },
      {
        "label": "Wikiquote — Will Durant (related passage in The Story of Philosophy)",
        "url": "https://en.wikiquote.org/wiki/Will_Durant"
      }
    ]
  },
  "world-napoleon-china-sleeping": {
    "belief": "\"China is a sleeping lion. Let her sleep, for when she wakes the world will shake.\" — Napoleon",
    "truth": "Napoleon specialists find no evidence he said it. The earliest English version found is from an 1888 newspaper that does not mention him.",
    "detail": "According to Wikipedia's summary, Peter Hicks of the Fondation Napoléon states that Napoleon never said \"Let China sleep, for when she wakes, the world will tremble\" and found no reference to a sleeping dragon in his recorded speeches or writings. John Fitzgerald of the Australian National University says that \"in all likelihood\" Napoleon never uttered the words attributed to him.\n\nThe oldest known English \"China is a sleeping giant\" appeared in the New York Journal of Commerce in 1888, without Napoleon. The \"sleeping lion\" variant first appears in the Sydney Morning Herald in 1890, indirectly linking Napoleon via a speech by a Queensland politician.\n\nThis is an absence of evidence, not proof he never thought it. But it is absent from his records and the earliest versions postdate him by decades.",
    "origin": "Late-19th-century Western writers loved the \"sleeping China\" image, and attaching it to Napoleon lent it dramatic authority as a century-old prophecy. 20th-century journalism then repeated it.",
    "instead": "Say \"attributed to Napoleon; specialists have not found it in his writings; the earliest similar English line is from 1888\". For China's rise, cite concrete history or data.",
    "sources": [
      {
        "label": "Wikipedia — China is a sleeping giant (Hicks and Fitzgerald; earliest 1888/1890 instances)",
        "url": "https://en.wikipedia.org/wiki/China_is_a_sleeping_giant"
      }
    ]
  },
  "world-gandhi-be-the-change": {
    "belief": "\"Be the change you wish to see in the world.\" — Mahatma Gandhi",
    "truth": "It is not found in Gandhi's writings. The earliest close match is from a 1974 book by the American educator Arleen Lorrance.",
    "detail": "Quote Investigator's earliest close match is from educator Arleen Lorrance in 1974, in a chapter called \"The Love Project\". Minister Ernest Troutner cited the principle in 1975 and Diane Kennedy Pike published it in 1976. The first (incorrect) Gandhi attribution found is from 1987, and in 2006 the Gandhi Institute confirmed there is no reliable documentary evidence for it in his writings.\n\nGandhi did write something related in 1913: \"If we could change ourselves, the tendencies in the world would also change. As a man changes his own nature, so does the attitude of the world change towards him.\" That is the same idea in other words, not the popular slogan.\n\nSo the thought has a Gandhian flavour, but the wording belongs to Lorrance.",
    "origin": "1970s American movement culture spread slogans on stickers and posters; Gandhi symbolised nonviolent self-change, so the line drifted to him, with the first recorded attribution in 1987.",
    "instead": "Quote Gandhi's 1913 passage, or credit \"Arleen Lorrance, 1974\". If you use the slogan, say it is often attributed to Gandhi but dates from 1970s writing.",
    "sources": [
      {
        "label": "Quote Investigator, 2017 — Be the Change You Wish to See in the World",
        "url": "https://quoteinvestigator.com/2017/10/23/be-change/"
      }
    ]
  },
  "world-gandhi-first-they-ignore-you": {
    "belief": "\"First they ignore you, then they laugh at you, then they fight you, then you win.\" — Gandhi",
    "truth": "It is not in Gandhi's writings. The earliest substantive match is a 1918 speech by the union official Nicholas Klein.",
    "detail": "Quote Investigator found the saying was first ascribed to Gandhi in 1982, decades after his death, and researchers have not found it in his works. The earliest substantive match is from Nicholas Klein at a 1918 Amalgamated Clothing Workers of America convention: \"First they ignore you. Then they ridicule you. And then they attack you and want to burn you. And then they build monuments to you.\"\n\nThe wider family of \"stages of a new idea\" sayings is old: Schopenhauer in 1819 described truth being condemned as paradoxical before becoming trivial, and Earl B. Morgan in 1917 spoke of ridicule, argument and acceptance. Gandhi's own 1921 writing mentions ridicule, repression and respect, in different phrasing.\n\nThe idea is old; the Gandhi label dates from 1982.",
    "origin": "Variants circulated in labour and reform circles, each generation tweaking them. Gandhi symbolises nonviolent movements, so the saying drifted to his name.",
    "instead": "Credit \"Nicholas Klein, 1918\", or say \"often attributed to Gandhi; no source in his writings\". If quoting Gandhi, check his 1921 passage first.",
    "sources": [
      {
        "label": "Quote Investigator, 2017 — First They Ignore You, Then They Laugh at You, Then They Attack You, Then You Win",
        "url": "https://quoteinvestigator.com/2017/08/13/stages/"
      }
    ]
  },
  "world-god-helps-those-who-help-themselves": {
    "belief": "\"God helps those who help themselves.\" — the Bible",
    "truth": "It is not in the Bible. The modern English wording is linked to Algernon Sidney, and Benjamin Franklin's 1736 Poor Richard's Almanack made it famous.",
    "detail": "According to Wikipedia's account, the saying does not appear in scripture, though polls cited there find that between 53% and 82% of Americans think it does. Similar ideas appear in Greek tragedy (Sophocles, Euripides) and in Aesop, such as \"Hercules and the Wagoner\". George Herbert included \"Help thyself, and God will help thee\" in his 1651 proverbs.\n\nThe familiar wording is credited to Algernon Sidney in his Discourses Concerning Government, and Franklin used it in Poor Richard's Almanack in 1736, so many people credit Franklin.\n\nFairly stated: some Christians argue the saying sits uneasily with the biblical emphasis on grace, which more often speaks of God helping those who cannot help themselves. This entry concerns provenance only and takes no position on any faith.",
    "origin": "A proverb that has circulated for over two thousand years, fixed in English by 17th and 18th-century writers and Franklin's almanack; it sounds like scripture, so it is often taken for it.",
    "instead": "Say \"an English proverb often mistaken for scripture; modern wording from Algernon Sidney, popularised by Franklin (1736)\". For biblical teaching, check the actual text.",
    "sources": [
      {
        "label": "Wikipedia — God helps those who help themselves",
        "url": "https://en.wikipedia.org/wiki/God_helps_those_who_help_themselves"
      }
    ]
  },
  "world-churchill-liberal-at-twenty": {
    "belief": "\"If you're not a liberal at twenty you have no heart; if you're not a conservative at forty you have no brain.\" — Churchill",
    "truth": "No record shows Churchill saying it. The earliest strong match is a public letter by the French academic Anselme Batbie in 1872.",
    "detail": "Quote Investigator's earliest strong match is Batbie's 1872 letter, which credits the remark to \"Burke\" (probably Edmund Burke); QI found nothing like it in Burke's writings. Earlier precursors lack the heart/head contrast: a 1799 remark credited to John Adams about a boy of fifteen who is not a democrat, and a version attributed to François Guizot in 1861 about republicans.\n\nThe heart-and-head form was established by the 1870s and circulated in French and English, with the political label changing from \"republican\" to \"socialist\" to \"liberal\". Churchill attributions appear by 1986; Disraeli from 1977, Victor Hugo from 1916, and others.",
    "origin": "An old European political quip that kept changing its subject and its ages; a witty line about political maturity naturally attached itself to a famous orator, and Churchill became the default.",
    "instead": "Say \"a popular quip first recorded strongly in 1872 France; Churchill attribution appears about 1986\".",
    "sources": [
      {
        "label": "Quote Investigator, 2014 — If You Are Not a Liberal at 25, You Have No Heart. If You Are Not a Conservative at 35 You Have No Brain",
        "url": "https://quoteinvestigator.com/2014/02/24/heart-head/"
      }
    ]
  },
  "world-goebbels-repeat-lie": {
    "belief": "\"A lie repeated a thousand times becomes the truth.\" — Goebbels",
    "truth": "No primary source has been found. The genuine related documents are Hitler's \"big lie\" passage in Mein Kampf (1925) and a 1941 Goebbels article accusing the British.",
    "detail": "Wikipedia, citing Randall Bytwerk's research, notes that the popular Goebbels quotation has been repeated in countless books and web pages, but none cites a primary source, and it is \"an unlikely thing for Goebbels to have said\".\n\nThe real documents are two. In Mein Kampf (1925), chapter 10, Hitler discusses the \"big lie\" (große Lüge): people fall for colossal lies because they cannot believe others would have the impudence to distort the truth so infamously, and he accuses others of doing this. On 12 January 1941 Goebbels published \"Aus Churchills Lügenfabrik\" in Die Zeit ohne Beispiel, saying the English follow the principle that \"when one lies, one should lie big, and stick to it\", again as an accusation. A c. 1943 OSS report by Walter Langer (published in 1972 as The Mind of Adolf Hitler) also attributed to Hitler the idea that people will believe a big lie sooner than a little one.\n\nThis is \"no source found\", not proof that he never said anything similar.",
    "origin": "After the war a short \"Goebbels quote\" summarised Nazi propaganda better than scattered documents, so it was repeated until it became a standard example.",
    "instead": "Quote Mein Kampf's big-lie passage or the 1941 article directly, noting both are accusations against opponents. If using the popular line, label it \"often attributed to Goebbels; no primary source\".",
    "sources": [
      {
        "label": "Wikipedia — Big lie (Bytwerk's research, the 1941 Goebbels article, Mein Kampf ch. 10, the OSS report)",
        "url": "https://en.wikipedia.org/wiki/Big_lie"
      }
    ]
  },
  "world-einstein-fish-climb-tree": {
    "belief": "\"Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.\" — Albert Einstein",
    "truth": "It is not in Einstein's writings. The earliest Einstein attribution found is a 2004 self-help book, and the underlying idea goes back to an 1898 educational allegory.",
    "detail": "Quote Investigator notes the line is not in The Ultimate Quotable Einstein (Princeton). The earliest close match is Matthew Kelly's 2004 book The Rhythm of Life, in a chapter titled \"Everybody is a Genius\", which credits Einstein.\n\nThe older source of the idea is \"An Educational Allegory\", published under the pen name \"Aesop, Jr.\" in the Journal of Education in 1898; the author was later identified as Amos E. Dolbear, a physicist at Tufts College. In it animals at school are judged on skills they do not have, illustrating why a creature should not be judged by a skill it lacks. The essay was widely reprinted in the early 1900s.\n\nQuote Investigator's view is that this allegory and the \"everybody is a genius\" phrasing, found in various forms since the 1970s, merged into the modern quote, and Kelly's 2004 attribution was amplified by social media.",
    "origin": "An old educational fable and a motivational cliché were spliced together, attached to Einstein by a best-selling self-help book, and spread by image posts.",
    "instead": "Credit the idea to the 1898 allegory (Amos E. Dolbear writing as Aesop, Jr.), or say \"often misattributed to Einstein\".",
    "sources": [
      {
        "label": "Quote Investigator, 2013 — Everybody is a Genius. But If You Judge a Fish by Its Ability to Climb a Tree...",
        "url": "https://quoteinvestigator.com/2013/04/06/fish-climb/"
      }
    ]
  },
  "world-einstein-simple-as-possible": {
    "belief": "\"Everything should be made as simple as possible, but not simpler.\" — Albert Einstein",
    "truth": "The idea is Einstein's, but his own words for this exact sentence cannot be found; the earliest record is composer Roger Sessions's paraphrase in 1950.",
    "detail": "Quote Investigator found that in the New York Times on 8 January 1950 the composer Roger Sessions wrote that Einstein \"said, in effect, that everything should be as simple as it can be but not simpler!\" The phrase \"in effect\" signals a paraphrase. In June 1950 the poet Louis Zukofsky put it in quotation marks in Poetry magazine and credited Einstein, which influenced later citations. Reader's Digest printed it in July 1977 without documentation.\n\nOn 10 June 1933, in his Oxford lecture \"On the Method of Theoretical Physics\", Einstein wrote that the supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible without surrendering the adequate representation of a single datum of experience. Calaprice cites that as a precursor.\n\nQuote Investigator concludes Einstein may have said something like it but there is no direct evidence; Sessions may have crafted the phrasing himself. So this is a \"debated\" case.",
    "origin": "Einstein's own sentence is long and academic; Sessions's short paraphrase is far more memorable, and magazines and Reader's Digest spread it until it was taken as his exact words.",
    "instead": "Say \"a paraphrase of Einstein's view, first recorded by Roger Sessions in 1950; compare his 1933 Oxford lecture\".",
    "sources": [
      {
        "label": "Quote Investigator, 2011 — Everything Should Be Made as Simple as Possible, But Not Simpler",
        "url": "https://quoteinvestigator.com/2011/05/13/einstein-simple/"
      }
    ]
  },
  "luxun-no-road": {
    "belief": "\"There was originally no road in the world; when many people walk, a road comes into being.\" —Lu Xun",
    "truth": "Lu Xun wrote \"in fact the roads on the ground did not exist to begin with; they came to be when many people walked\" — and in the original it is a metaphor for hope.",
    "detail": "The line is in the last paragraph of the short story 'My Old Home' (Guxiang), dated January 1921. The original reads, roughly: 'I thought: hope is neither something that exists nor something that does not. It is like the paths on the ground; in fact there were no paths to begin with, but when many people walk, a path comes to be.'\n\nSo the popular version differs in two ways. 'On the ground' (地上) is often smoothed into 'in the world' (世上), and the sentence before it — the one that says the image is about hope — is dropped. Lu Xun is not talking about roads; he is talking about hope, which you can neither claim exists nor deny, until enough people walk toward it.\n\nThis is a harmless slip rather than a fabrication; the sense survives. It is only worth noting that words in quotation marks should be the author's words.",
    "origin": "The story first appeared in New Youth in May 1921, was collected in 'Call to Arms' (Nahan), and has been a standard school text for generations. In oral repetition, 'on the ground' became the smoother 'in the world'. We could not find when the 'world' version first appeared.",
    "instead": "When you need quotation marks, quote the original: 'in fact there were no paths on the ground to begin with; when many people walk, a path comes to be.' To keep the context, quote the previous sentence about hope as well. If you are only paraphrasing, drop the quotation marks.",
    "sources": [
      {
        "label": "Lu Xun, 'My Old Home' (Guxiang), in Call to Arms, dated Jan 1921 — electronic text of the Complete Works at the Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/03/002.htm"
      }
    ]
  },
  "luxun-herd": {
    "belief": "\"Fierce beasts walk alone; only cattle and sheep move in herds.\" —Lu Xun",
    "truth": "The original says beasts are solitary and cattle go in herds — but the very next clause is about the strength of the herd: wild oxen can form a wall of horns against a stronger enemy.",
    "detail": "The line comes from the essay 'Idle Talk at the End of Spring' (first published in the weekly Mangyuan on 24 April 1925 under the pen name Mingzhao). Roughly, it reads: 'Beasts are solitary, cattle and sheep go in herds; a big herd of wild oxen can form a wall of horns against a stronger foe — but pull one animal out and it can only bellow.'\n\nThe viral version keeps only the first half and rewords it as 'always walk alone' and 'only then do they herd', so it reads as an aphorism that the strong are solitary and joiners are weak. The original's weight is on the second half: a herd can resist; a lone animal cannot. The surrounding passage is satire, going on to describe how rulers try to forbid assembly and suppress speech — the herd's strength is exactly why they fear it.\n\nUsing it as a source for 'the strong walk alone' therefore nearly inverts the meaning.",
    "origin": "In the essay these sentences sit inside a long ironic argument. Pulled out of context, the first half is easy to remember because of its parallel structure, and it was reworded into a more aphoristic form and shared as 'Lu Xun said'. We could not trace who first excerpted it.",
    "instead": "To quote him, give the whole sentence. If you want to express 'the strong are lonely', do not attach Lu Xun's name to it.",
    "sources": [
      {
        "label": "Lu Xun, 'Idle Talk at the End of Spring' (in 'The Grave'; first published Mangyuan, 24 Apr 1925) — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/01/013.htm"
      }
    ]
  },
  "luxun-time-life": {
    "belief": "\"Life is measured in units of time. Wasting other people's time is murder for money; wasting your own time is slow suicide.\" —Lu Xun",
    "truth": "Lu Xun did write \"time is life; to squander other people's time for no reason is no different from murder for gain\" — but 'life is measured in units of time' and 'slow suicide' do not appear in his collected essays.",
    "detail": "The genuine sentences come from 'Talks Outside the Gate on Writing' (serialized in Shen Bao's 'Free Talk' column, August–September 1934, under the pen name Huayu). He is arguing that Latinized script is quick to write: 'Americans say time is money; I think time is life. To waste other people's time for no reason is no different from murder for money.'\n\nThe long viral version expands and splices those two sentences and adds 'wasting your own time is slow suicide'. We searched the electronic text of Lu Xun's Complete Works at the Chinese Marxists Internet Archive (30 sections of essays, stories and so on) and found none of 'life is measured in time', 'slow suicide' or 'waste your own time'. That text does not include his diaries or letters, so what All we can say is that it is not in his published collections, not that he never said it anywhere.\n\nNote also that the original is about other people's time, and he follows it with a self-mocking remark that people like him, chatting in the cool of the evening, are an exception — a lighter tone than the internet version.",
    "origin": "Because the first two sentences are real, the whole passage sounds convincingly like Lu Xun. The expansion was probably added by someone while reposting; We could not find its earliest appearance.",
    "instead": "Quote only the genuine sentences — 'time is life; to waste other people's time for no reason is no different from murder for gain' — and cite 'Talks Outside the Gate on Writing'. Do not attach his name to the 'slow suicide' line.",
    "sources": [
      {
        "label": "Lu Xun, 'Talks Outside the Gate on Writing' (in 'Qiejieting zawen'; Shen Bao, Aug–Sep 1934, pen name Huayu) — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/18/008.htm"
      },
      {
        "label": "Huxiu, compilation of altered and invented 'Lu Xun quotes' with their real sources",
        "url": "https://www.huxiu.com/article/4373413.html"
      }
    ]
  },
  "luxun-awakened": {
    "belief": "\"The greatest pain in life is to wake from a dream and find there is no road to take.\" —Lu Xun",
    "truth": "The original is 'the most painful thing in life is to wake from the dream and have no road to go on', from a lecture about what happens after Nora leaves home — and his conclusion is not despair.",
    "detail": "The line comes from Lu Xun's lecture 'What Happens After Nora Leaves Home?', given on 26 December 1923 at the Beijing Women's Normal College. The original is 'the most painful thing in life is to wake from the dream and have no road to go on'. The popular wording ('greatest pain', 'no road to walk') differs a little, but the sense is intact.\n\nWhat changes is the context. His question is concrete: what happens to Ibsen's Nora once she walks out? His answer is that without economic independence she has only two roads, 'to fall, or to come back'. He goes on to say that if no road can be found, 'what we need is a dream' — and then 'dreams are good; otherwise, money is what matters'.\n\nSo this is one sentence inside a sober argument about women's economic independence, not a general definition of life's greatest pain.",
    "origin": "The sentence is short and balanced, so it was lifted again and again into textbooks and inspirational pieces, and each retelling made the wording a bit more colloquial. This is ordinary drift, not forgery — just a little further from the text each time.",
    "instead": "Quote it as 'the most painful thing in life is to wake from the dream and have no road to go on' and say it comes from the lecture about Nora. For the theme of independence, the more fitting line from the same lecture is 'dreams are good; otherwise, money is what matters.'",
    "sources": [
      {
        "label": "Lu Xun, 'What Happens After Nora Leaves Home?' (lecture, 26 Dec 1923; in 'The Grave') — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/01/018.htm"
      }
    ]
  },
  "zh-shameless-sanguo": {
    "belief": "\"I have never seen anyone so shameless!\" —Zhuge Liang cursing Wang Lang in 'Romance of the Three Kingdoms'",
    "truth": "The novel by Luo Guanzhong does not contain this line; it was added for the 1994 CCTV television series.",
    "detail": "In chapter 93 of the novel, 'The Marquis of Wuxiang Curses Wang Lang to Death', Zhuge Liang's speech ends: 'Be gone, old villain! Send the traitor out to settle this with me!' Wang Lang, hearing it, 'his chest filled with fury, gave a great cry and fell dead from his horse.' The words 'shameless' or 'brazen' do not appear in the chapter.\n\nThe line comes from episode 69 of the 1994 series (produced by the China TV Drama Production Center and CCTV, with Tang Guoqiang as Zhuge Liang). Wikipedia's article on the series calls it an original line: the scriptwriters stretched the exchange between the two armies and gave it this ending. Years later it became a mainstream internet phrase through countless Bilibili remix videos.\n\nAs an aside, the scene itself is fiction: histories record Wang Lang dying in 228 CE without ever facing Zhuge Liang across the field.",
    "origin": "After the series aired, the performance spread widely; in the video-site era it was cut and pitch-shifted over and over, and the line drifted away from its source. Because it sounds like the voice of an ancient hero, many people assume it is from the novel.",
    "instead": "The safest wording is 'a line from the 1994 TV series, spoken by Zhuge Liang'. To quote the novel, use 'Be gone, old villain! Send the traitor out to settle this with me!' Do not call it 'the original text of Romance of the Three Kingdoms'.",
    "sources": [
      {
        "label": "Luo Guanzhong, Romance of the Three Kingdoms, chapter 93 (original text) — Wikisource",
        "url": "https://zh.wikisource.org/wiki/三國演義/第093回"
      },
      {
        "label": "Three Kingdoms (1994 TV series) — Chinese Wikipedia (premiere details, episode 69 and the line)",
        "url": "https://zh.wikipedia.org/wiki/三国演义_(电视剧)"
      },
      {
        "label": "Cursing Wang Lang to Death — Chinese Wikipedia (novel chapter, historical facts, episode 69)",
        "url": "https://zh.wikipedia.org/zh-hans/%E9%AA%82%E6%AD%BB%E7%8E%8B%E6%9C%97"
      }
    ]
  },
  "zh-repay-virtue": {
    "belief": "'Repay hatred with kindness' is a teaching of Confucius",
    "truth": "In the Analects someone asks Confucius about repaying hatred with kindness, and he does not endorse it; 'repay hatred with virtue' is a line of the Laozi, chapter 63.",
    "detail": "In Analects 14 ('Xianwen'), 'someone' asks: 'What about repaying resentment with kindness?' Confucius answers with a question — 'Then with what will you repay kindness?' — and says to meet resentment with 'straightness' (zhi, fairness and candor) and kindness with kindness. He is declining the proposal.\n\nThe positive formulation appears in chapter 63 of the Laozi: 'Whether great or small, many or few, repay resentment with virtue.' So the idea sits closer to Daoism.\n\nOne fair caveat: some modern scholars, pointing to how the Warring States bamboo texts write the character, argue that the 'straightness' in this Analects line should be read as 'virtue' (Wikisource notes this on that very chapter). That is a minority view; the standard reading, followed by most commentators, remains 'repay resentment with straightness'.",
    "origin": "'Repay hatred with kindness' is catchy and sounds like Confucian generosity, so it spread as his words. In the Analects those four characters belong to someone else's question.",
    "instead": "To cite Confucius, say he advocated 'repay resentment with straightness and kindness with kindness'. For 'repay resentment with virtue', point to the Laozi (ch. 63) — and in the Analects it is a position Confucius did not adopt.",
    "sources": [
      {
        "label": "Analects 14 (section 36) — Wikisource (with a note on the variant reading and scholarly opinion)",
        "url": "https://zh.wikisource.org/wiki/論語/憲問第十四"
      },
      {
        "label": "Daodejing, chapter 63, 'repay resentment with virtue' — Wikisource (Wang Bi edition)",
        "url": "https://zh.wikisource.org/wiki/道德經_(王弼本)"
      },
      {
        "label": "The Paper, 'These so-called ancient sayings are all wrong' (includes this one)",
        "url": "https://m.thepaper.cn/newsDetail_forward_29191107"
      }
    ]
  },
  "zh-fortress-besieged": {
    "belief": "'Those inside the besieged city want to get out; those outside want to get in' is Qian Zhongshu's own invention",
    "truth": "The novel itself says it is borrowed: a character says 'the French have a saying like that too', after an English one.",
    "detail": "In 'Fortress Besieged' (Weicheng), Chu Shenming first says that an old English saying compares marriage to a gilded birdcage: the birds outside want to get in, the birds inside want to fly out. Miss Su replies that the French have the same saying, but with a besieged fortress instead of a cage — those outside want to charge in, those inside want to escape. The novel's title comes from that remark.\n\nSo Qian never presented the image as his own; he had the characters say where it came from. An article titled 'Who brought the \"besieged city\" to China?' (published in Xin Wenxue Shiliao and reposted by China Writers Net, author Guo Shuai) traces the birdcage image further back to the English playwright John Webster. We have not independently checked that tracing, so we are only reporting it.\n\nQian's achievement was to build a novel around the image and make it a common metaphor in Chinese — which is not the same as inventing it.",
    "origin": "After the novel became popular, 'besieged city' became shorthand for marriage and careers. Readers remembered the metaphor but forgot that the book itself credits it, so it is often treated as Qian's original aphorism.",
    "instead": "Say 'the French saying that Qian Zhongshu has Su Wenwan quote in Fortress Besieged'. If you want to praise him, praise how he used it in the novel, not the idea of having invented it.",
    "sources": [
      {
        "label": "Guo Shuai, 'Who brought the \"besieged city\" to China?', Xin Wenxue Shiliao; reposted by China Writers Net, 30 May 2023 (quotes the Chu Shenming / Miss Su exchange)",
        "url": "https://www.chinawriter.com.cn/n1/2023/0530/c404063-40001759.html"
      }
    ]
  },
  "zh-read-ten-thousand-books": {
    "belief": "'Read ten thousand books, travel ten thousand miles' is from Confucius or an ancient maxim",
    "truth": "The clearest source one can verify is the Ming painter Dong Qichang's writing on painting, not Confucius — though some claim an earlier source, which We could not check.",
    "detail": "In Dong Qichang's 'Huachanshi Suibi', discussing the 'spirit resonance' of a painting, he writes that it cannot be learned, being innate — yet there is something to learn: 'read ten thousand books, travel ten thousand miles, and the dust and murk fall from your chest, and hills and valleys form naturally within.' Media such as Beijing Daily's website point to this passage as the source. It was about how a painter cultivates breadth of mind and only later became a general saying about reading and travel.\n\nNeither the Analects nor other pre-Qin texts contain the line. In fairness, some say there is an earlier source (searches turn up claims about the Song-dynasty Liu Yi, or a Qing note by Liang Shaoren citing an 'inscription for spectacles'). We could not open reliable primary texts to check them, so We can only say Dong Qichang is the most cited and most checkable source, and earlier uses are not ruled out.\n\nThe book itself is also named variously (Huachanshi Suibi, Huazhi, Huajue), so cite whichever edition you have seen.",
    "origin": "The pairing is neat and positive, and fits the voice of 'ancient wisdom', so it is routinely credited to 'the ancients' or even Confucius. The shift from painting theory to general maxim probably happened in Ming–Qing times. We could not find when it was first pinned on Confucius.",
    "instead": "If you cite a source, say 'Dong Qichang, Ming dynasty, in Huachanshi Suibi'. When unsure, write 'an old saying'. Do not write 'Confucius said'.",
    "sources": [
      {
        "label": "Beijing Daily online, 'Read ten thousand books, travel ten thousand miles' (quotes Dong Qichang's text), 16 Sep 2023",
        "url": "https://news.bjd.com.cn/2023/09/16/10565086.shtml"
      },
      {
        "label": "Guwendao (gushiwen.cn), entry for the saying (gives Dong Qichang as the earliest source)",
        "url": "https://m.gushiwen.cn/mingju/juv_7360eb6518d5.aspx"
      }
    ]
  },
  "zh-tagore-farthest-distance": {
    "belief": "'The farthest distance in the world is not between life and death…' —Tagore, 'Stray Birds'",
    "truth": "The poem is not in Tagore's collections; it is usually traced to Zhang Xiaoxian, but accounts of its authorship disagree.",
    "detail": "This 'farthest distance' text is often passed around as a Tagore love poem, but nothing like it appears in his works. The China Joint Internet Rumor-Refuting Platform (reposting a Toutiao article, December 2018) says it is really the early work of the writer Zhang Xiaoxian, from her 1997 novel 'A Single Bed in the Pocket'.\n\nAnother piece on misattributed works (Southern Art Network) stresses that the text exists online in many expanded versions, that sources give different origins, and that authorship has no generally accepted answer. So 'not Tagore' is fairly safe, while 'it is Zhang Xiaoxian' can only be reported as a claim.\n\nWe could not find the 1997 book's original text to check, so we do not present Zhang Xiaoxian as established.",
    "origin": "Tagore's translated verse (Stray Birds in particular) has high prestige in Chinese, and this text's imagery and rhythm resemble translated poetry, so online reposting pinned it on him. Several expanded versions (for example one with 'the bird and the fish') then multiplied.",
    "instead": "If you quote it, label it 'a poem circulating online, author disputed (often traced to Zhang Xiaoxian)'. Do not write 'Tagore, Stray Birds'; for genuine Stray Birds lines, check a specific translation.",
    "sources": [
      {
        "label": "China Joint Internet Rumor-Refuting Platform, 'The farthest distance… is fake quotations right in front of me' (from Toutiao, 19 Dec 2018)",
        "url": "https://www.piyao.org.cn/2019-02/02/c_1210054152.htm"
      },
      {
        "label": "Southern Art Network, 'Misplaced authorship: who wrote \"The farthest distance in the world\"?'",
        "url": "https://www.zgnfys.com/m/a/nfrw-5892.shtml"
      }
    ]
  },
  "zh-linhuiyin-safe-sunny": {
    "belief": "'If you are well, it is a sunny day.' —Lin Huiyin",
    "truth": "The People's Literature Publishing House lists it among things Lin Huiyin did not say; the easiest source to find is the title of a biography of her.",
    "detail": "In a June 2025 piece called 'Lin Huiyin quotes debunked', the People's Literature Publishing House lists 11 sayings she never said, and 'If you are well, it is a sunny day' tops the list, labelled 'fake inspirational soup, invented'.\n\nWhat We could verify is that Bai Luomei's biography of Lin Huiyin is titled exactly this (China Overseas Chinese Publishing House; Douban gives the edition as February 2013). The book is a lyrical, biography-style prose work, and readers on Douban criticize it for more imagination than documentation. The title uses the line, but the line is not Lin's own; We could not find who first wrote it.\n\nLin Huiyin's real poems exist — 'You Are the April Day on Earth', for example — and have nothing to do with this sentence.",
    "origin": "A bestselling biography of Lin Huiyin printed the line in large type as its title, so readers easily treat 'a book title' as 'her words'. On social media it was then paired with her photo and her name and reposted endlessly.",
    "instead": "To quote Lin Huiyin, choose something she actually wrote, such as 'You Are the April Day on Earth'. To use this line, label it 'popular online' or 'title of Bai Luomei's book', not Lin's.",
    "sources": [
      {
        "label": "People's Literature Publishing House, 'Lin Huiyin quotes debunked!' (The Paper, 10 Jun 2025)",
        "url": "https://m.thepaper.cn/newsDetail_forward_30959316"
      },
      {
        "label": "Bai Luomei, 'If You Are Well, It Is a Sunny Day' — Douban Books (China Overseas Chinese Publishing House)",
        "url": "https://book.douban.com/subject/20506611/"
      }
    ]
  },
  "zh-hushi-dirty-country": {
    "belief": "'A filthy country, if everyone follows rules instead of preaching morality, will eventually become a normal, human country.' —Hu Shih",
    "truth": "The columnist Yu Ge checked the cited source ('Introducing My Own Thinking') and the Collected Works of Hu Shih and found no such passage; no reliable source has turned up.",
    "detail": "For years this passage circulated on Weibo and WeChat under Hu Shih's name, with a supposed source attached: 'Introducing My Own Thinking' (1930). In an October 2016 column, Yu Ge says he checked that essay and found no discussion of rules versus morality, then went through the 12-volume Peking University edition of Hu Shih's collected works and found nothing similar. The Chinese Wikiquote page for Hu Shih lists the line under 'misattributed'.\n\nYu Ge adds a linguistic hint: the colloquial -er endings in the text do not match Hu Shih's way of speaking. That is an inference, not proof; the solid point is the first one — the cited source does not contain it.\n\nWhat this shows is 'no source found', not that Hu Shih never said anything like it.",
    "origin": "Posts of this kind often attach an impressive-looking source (title, year) to a quote, which makes it seem reliable. This one was already circulating on Weibo and WeChat by 2016. We could not find where it first appeared.",
    "instead": "If you want Hu Shih on rules and order, read what he actually wrote in his collected works and cite the essay. For this sentence, the safest label is 'attributed online; no source found'.",
    "sources": [
      {
        "label": "Yu Ge, 'Starting from a forged Hu Shih quotation', Sina News column, 18 Oct 2016",
        "url": "https://news.sina.cn/zl/2016-10-18/zl-ifxwvpar8378190.d.html?from=wap"
      },
      {
        "label": "Hu Shih — Chinese Wikiquote ('misattributed' section)",
        "url": "https://zh.wikiquote.org/zh-cn/%E8%83%A1%E9%81%A9"
      }
    ]
  },
  "zh-zhuangzi-moisten-foam": {
    "belief": "'Moistening each other with spit' (xiangru yimo) is Zhuangzi's praise of devotion in hard times",
    "truth": "Zhuangzi's actual sentence is 'moistening each other with foam is not as good as forgetting each other in the rivers and lakes' — the weight is on the second half.",
    "detail": "The passage is in the Zhuangzi, chapter 'The Great and Venerable Teacher': when the spring dries up, fish stranded on land breathe on each other to keep damp and moisten each other with spittle, but that is not as good as forgetting one another in the rivers and lakes. The next line is a parallel contrast: rather than praise Yao and condemn Jie, better to forget both and dissolve into the Way.\n\nSo he is contrasting two states: helping each other in distress is admirable, but better still is a condition in which no rescue is needed and each is at ease. Later usage lifted the first half out and turned it into a positive idiom for spouses and friends who stand by each other — a successful reinvention whose meaning departs from the source.\n\nOne more honest point: commentators differ on whether Zhuangzi is belittling such devotion — some read it as a critique of Confucian-style warmth, others as longing for a freer way of living together. What is certain is only the literal order of the text.",
    "origin": "Over the centuries the half-sentence 'better to forget each other in the rivers and lakes' dropped away, and 'xiangru yimo' became an independent compliment for couples and friends, often credited as Zhuangzi's praise.",
    "instead": "Using it as an idiom is fine — in modern Chinese it is positive. But do not say 'Zhuangzi praised this'. If you cite the source, quote the whole line 'moistening each other… is not as good as forgetting each other in the rivers and lakes' and note that his point lies in the second half.",
    "sources": [
      {
        "label": "Zhuangzi, 'The Great and Venerable Teacher' (original text) — Wikisource",
        "url": "https://zh.wikisource.org/wiki/莊子/大宗師"
      },
      {
        "label": "The Paper, 'These so-called ancient sayings are all wrong' (includes this idiom)",
        "url": "https://m.thepaper.cn/newsDetail_forward_29191107"
      }
    ]
  },
  "luxun-coffee-genius": {
    "belief": "\"What genius? I just put the time others spend drinking coffee into work.\" —Lu Xun",
    "truth": "The line does not appear in Lu Xun's published collections; the earliest form We could find is an unattributed school-reading piece called 'Lu Xun Cherished Time'.",
    "detail": "We searched the electronic text of Lu Xun's Complete Works at the Chinese Marxists Internet Archive (30 sections: essay collections, fiction, prefaces) for 'where is there any genius' and 'the time others spend drinking coffee' and found neither. That text does not include his diaries or letters, so what All we can say is 'not in his published collections', not 'he never said it anywhere'.\n\nThe usual source is a short piece titled 'Lu Xun Cherished Time' (school reading material, author not stated; a 2016 repost is online). It says 'some say Lu Xun was a genius, but he himself said…' and then gives the line, with no date, no occasion and no source.\n\nTwo side facts: his diary does record coffee (for example 28 May 1913 and 16 Feb 1930, as compiled by Tencent News), and in 1928 he wrote 'The Revolutionary Coffee Shop', a satire on a newspaper advertisement for a cafe, saying of that 'paradise' that he had not gone and did not want to. So he was no enemy of coffee, but neither fact is the source of this line.",
    "origin": "The line has circulated for years in teaching texts and inspirational writing, and 'coffee' gives it a modern flavor, so it is easily taken as his. We could not find its earliest appearance or whether it came from a relative's recollection; all All we can say is that no reliable source has turned up.",
    "instead": "To talk about Lu Xun and diligence, quote something he did write, such as 'time is life; to waste other people's time for no reason is no different from murder for gain' ('Talks Outside the Gate on Writing'). For the coffee line, the safest label is 'attributed to Lu Xun; not found in his published works'.",
    "sources": [
      {
        "label": "Lu Xun, 'The Revolutionary Coffee Shop' (in 'Sanxian ji', 1928) — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/12/007.htm"
      },
      {
        "label": "Tencent News, 'This saying of Lu Xun's may be a lie' (compiles diary entries about coffee)",
        "url": "https://news.qq.com/rain/a/20220727A02X2J00"
      }
    ]
  },
  "luxun-medicine": {
    "belief": "\"Studying medicine cannot save the Chinese.\" —Lu Xun",
    "truth": "This is not Lu Xun's wording; the preface to 'Call to Arms' explains why he gave up medicine, in more specific and more measured words.",
    "detail": "When the Beijing Lu Xun Museum's 'things Lu Xun said' search tool went online, media tried this sentence and it was not found (as reported by Sohu). It is a later summary of an episode.\n\nThe real source is the preface to 'Call to Arms', dated 3 December 1922. He recalls the slides he saw while studying medicine in Sendai and writes, roughly: 'I felt medicine was not an important matter; a weak and foolish people, however healthy and robust in body, could only serve as meaningless material for public display, and as spectators', so 'the first priority is to change their spirit' — and at the time he thought literature was the best means.\n\nThe differences: the original says 'medicine is not an important matter' as his thinking then, not a verdict on all doctors, and the claim he actually makes is about changing the spirit. He never repudiated medicine itself, so reading it as 'doctors are useless' is an over-reading.",
    "origin": "Compressing a two-thousand-word recollection into a slogan is common in transmission. 'Studying medicine cannot save the Chinese' is short, forceful and has a target; it is easier to remember than the original, and it spread through classroom talk and inspirational writing.",
    "instead": "Quote the original, 'I felt medicine was not an important matter', and say it is his explanation for abandoning medicine. For a summary, write 'in the preface to Call to Arms he says he then thought changing a people's spirit mattered more than treating bodies'.",
    "sources": [
      {
        "label": "Lu Xun, preface to 'Call to Arms' (3 Dec 1922) — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/03/001.htm"
      },
      {
        "label": "Sohu, 'The \"things Lu Xun said\" search tool is online!' (test result for this sentence: not found)",
        "url": "https://www.sohu.com/a/312984295_563929"
      },
      {
        "label": "Huxiu, compilation of summarized and invented 'Lu Xun quotes' with real sources",
        "url": "https://www.huxiu.com/article/4373413.html"
      }
    ]
  },
  "luxun-village-dogs": {
    "belief": "\"One dog in the village barked, and the other dogs joined in without knowing why; when murk becomes normal, being clean becomes a crime.\" —Lu Xun",
    "truth": "This passage cannot be found in Lu Xun's collected writings; one article says its first half resembles a line in a Korean drama, but We could not check the show, so all All we can say is that no source has turned up.",
    "detail": "We searched the electronic text of Lu Xun's Complete Works at the Chinese Marxists Internet Archive (30 sections, 1,260 pages) and found nothing like 'the dogs in the village'; the few hits for 'dog barking' are unrelated passages. As elsewhere, that text lacks his diaries and letters, so the claim is 'not in his published collections'.\n\nA Huxiu compilation lists it as 'probably invented' and says a similar first half can be found in the Korean drama 'Pinocchio'. That is second-hand — We did not check the series' script — so treat it as a lead, not a finding.\n\nThe style is typical of internet 'Lu Xun-speak': an animal metaphor for mindless crowds, followed by a balanced punchline. Lu Xun did write about crowd conformity, but not in these words.",
    "origin": "Attaching Lu Xun's name makes a line sound profound. This one borrows the familiar theme of herd mentality; We could not find where or when it first appeared.",
    "instead": "If you want to quote it, label it 'a line circulating online; no source found'. For Lu Xun on crowds, quote something he did write, such as 'the brave, in anger, draw their swords against the stronger; the timid, in anger, draw theirs against the weaker' ('Miscellaneous Thoughts', in 'Huagai ji').",
    "sources": [
      {
        "label": "Huxiu, compilation of altered and invented 'Lu Xun quotes' (includes this line and the Korean-drama lead)",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "Lu Xun, 'Miscellaneous Thoughts' (in 'Huagai ji') — Chinese Marxists Internet Archive (genuine text for comparison)",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/08/011.htm"
      }
    ]
  },
  "luxun-mask": {
    "belief": "\"Wear a mask too long and it grows into your face; to take it off you must break bones and tear skin.\" —Lu Xun",
    "truth": "The line is not in his collected works; Lu Xun did write repeatedly about 'false masks', but never this 'grows into your face' formulation.",
    "detail": "We searched the electronic text of the Complete Works (Chinese Marxists Internet Archive, 30 sections) for the key phrases and found no match. Essays that do contain 'false mask' include 'Sudden Thoughts', 'Correspondence', 'I Cannot Stop Yet', 'Analects, One Year On', 'On the Third Kind of People' and 'The True and False Don Quixotes'; they criticize hypocrisy and posturing, for example calling some people compradors 'wearing false masks'. That is a different thing from the psychological aphorism that a mask worn long enough becomes your face.\n\nA Huxiu compilation lists this line as a fabrication while noting that Lu Xun did discuss 'false masks'. The text We searched lacks his diaries and letters, so We can only show that it is not in his published collections.\n\nThe 'worn so long it will not come off' idea is common online; We could not find who first wrote it in this form.",
    "origin": "'False mask' really is a favorite image of his, which makes the line plausible, and the harsh ending ('break bones and tear skin') feels Lu Xun-like. We could not find its earliest appearance.",
    "instead": "To quote Lu Xun on masks, read the specific passages in 'Sudden Thoughts' or 'Analects, One Year On' and cite the essay. This sentence can only be labelled 'attributed online; no source found'.",
    "sources": [
      {
        "label": "Huxiu, compilation of altered and invented 'Lu Xun quotes' (lists this line as a fabrication)",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "Lu Xun, 'Sudden Thoughts' (in 'Huagai ji', contains 'false mask') — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/08/020.htm"
      }
    ]
  },
  "luxun-sponge-time": {
    "belief": "\"Time is like water in a sponge; if you are willing to squeeze, there is always some.\" —Lu Xun",
    "truth": "The line is not in Lu Xun's collected works; no reliable source has turned up.",
    "detail": "We searched the electronic text of the Complete Works (Chinese Marxists Internet Archive, 30 sections, including 'Hot Wind', 'The Grave', 'Huagai ji' and all the other essay collections) for 'sponge' and 'willing to squeeze' and found nothing. A Huxiu compilation likewise says that neither the complete works nor the Lu Xun Museum's retrieval tool yields a source and classes the line as 'invented or misattributed'.\n\nAgain, that text does not contain his diaries and letters, so the claim is only that it is not in his published collections. Some people on Zhihu have asked whether he really said it, but We found nobody giving a concrete original source.\n\nThe theme is close to something he did write ('time is life'), which may be how it got attached to his name.",
    "origin": "Time-management articles love famous quotations. This one is vivid, colloquial and fits the inspirational genre, so it was easy to put Lu Xun's name on it. We could not find who first wrote it or where.",
    "instead": "To talk about finding time, you can use the image without a byline; or quote what Lu Xun did write, 'time is life' ('Talks Outside the Gate on Writing').",
    "sources": [
      {
        "label": "Huxiu, compilation of altered and invented 'Lu Xun quotes' (says no source in the complete works or the museum's tool)",
        "url": "https://www.huxiu.com/article/4373413.html"
      },
      {
        "label": "Lu Xun, 'Talks Outside the Gate on Writing' (in 'Qiejieting zawen') — what he really wrote about time",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/18/008.htm"
      }
    ]
  },
  "luxun-child-ox": {
    "belief": "'Head bowed, glad to be an ox for the children' means Lu Xun was glad to serve the people",
    "truth": "The line itself carries only a literary allusion: the Complete Works' annotation points to a Zuo Zhuan story about playing an ox for a child; reading 'children' as 'the masses' is a later interpretation.",
    "detail": "The poem is 'Mocking Myself'. His diary for 12 October 1932 says he wrote a scroll for Liu Yazi, having 'stolen half a couplet and stitched it into a regulated poem': 'Cold-browed, I face a thousand pointing fingers; head bowed, I am glad to be an ox for the child.' The annotation in the Complete Works glosses 'ox for the child' with the Zuo Zhuan (Duke Ai, year 6): Duke Jing of Qi once held a rope in his mouth and played an ox for his son Tu to lead. It also cites Hong Liangji's 'Beijiang Poetry Talks': a licentiate named Qian, who doted on his three sons, wrote on his door-couplet 'fed and merry, glad to be an ox for the children', and the annotation says that is the 'half couplet' he stole.\n\nSo the prototype of the line is 'a father willing to bow down and be an ox for his child'. Reading 'child' directly as 'the people' is a later extension, not the gloss given in the annotation. Some articles cite a letter of his about working harder 'to be an ox for the child' as evidence that the child was his son Haiying, but We did not check that letter.\n\nThe extended reading is widespread and not necessarily wrong — poems can bear several readings. It is just a reading, not his stated meaning.",
    "origin": "The couplet is balanced and forceful, so it was quoted again and again, and in teaching and propaganda settled into 'clear in love and hate, serving the people'. The source of the 'stolen half couplet' and the Zuo Zhuan allusion are seldom quoted along with it.",
    "instead": "Quote it with its context: 'from \"Mocking Myself\" (1932); \"ox for the child\" uses a Zuo Zhuan allusion — literally, playing an ox for a child.' For the 'serving the people' reading, say 'often interpreted as'.",
    "sources": [
      {
        "label": "Lu Xun, 'Mocking Myself' (1932) and annotations — Chinese Marxists Internet Archive electronic text of the Complete Works",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/22/038.htm"
      },
      {
        "label": "Lu Xun, 'Mocking Myself' (poetry volume, with diary note) — Chinese Marxists Internet Archive",
        "url": "https://www.marxists.org/chinese/reference-books/luxun/30/024.htm"
      }
    ]
  },
  "world-twain-lie-halfway": {
    "belief": "\"A lie can travel halfway around the world while the truth is putting on its shoes.\" —Mark Twain",
    "truth": "Twain left no record of saying it; close versions go back to 1710, and the first attribution to him appears nine years after his death.",
    "detail": "The line is usually credited to Mark Twain or Winston Churchill. Quote Investigator found no solid citation for either. Churchill expert Richard Langworth stated in 2009 that it is not Churchill; for Twain, the earliest attribution is a 1919 item in Standard Player Monthly, nine years after his death, and nothing shows he said it.\n\nMuch earlier relatives exist: in 1710 Jonathan Swift wrote in The Examiner that falsehood flies and truth comes limping after it; an 1820 Portland Gazette item has truth still 'pulling her boots on'; an 1834 New-England Magazine piece says error will run half over the world while truth is putting on his boots. A 1821 source credits a similar saying to Fisher Ames.\n\nSo this is an English proverb that has circulated for three centuries; the boots became shoes and the author was swapped for the most famous humorist. The finding is 'no Twain source found', not proof that he could never have said it, but without evidence there is no reason to put quotation marks and his name on it.",
    "origin": "The idea grew out of 18th-century satire and sermons, and by the early 1800s a 'boots' version was circulating in newspapers. In the 20th century it was attached to Twain, Churchill and other famous wits — the wittier the person, the likelier they are to be named as the source of an orphan quip.",
    "instead": "Say 'as the old saying goes' and leave off a name, or cite Swift's 1710 line (falsehood flies, truth limps after it) with its source.",
    "sources": [
      {
        "label": "Quote Investigator, 'A Lie Can Travel Halfway Around the World While the Truth Is Putting On Its Shoes'",
        "url": "https://quoteinvestigator.com/2014/07/13/truth/"
      }
    ]
  },
  "world-twain-quit-smoking": {
    "belief": "\"Quitting smoking is easy. I've done it a thousand times.\" —Mark Twain",
    "truth": "Twain did write about giving up smoking, but the joke's template predates him: a 1905 novel has 'I've quit more'n a thousand times', and W. C. Fields used it for drinking by 1938.",
    "detail": "Quote Investigator found no substantive evidence that Twain said this. The earliest match located is in Harris Dickson's 1905 novel Duke of Devil-May-Care, where the line is about gambling, not smoking: 'I've quit more'n a thousand times.'\n\nW. C. Fields performed 'The Temperance Lecture' on radio by 1938, with the line that you shouldn't say you can't swear off drinking, because it's easy: 'I've done it a thousand times.' So the pattern fits drinking, smoking or gambling alike.\n\nWhat Twain wrote about it himself, in a work published in 1913, is that he was warned to stop smoking and did, for two or three days, 'but it was too lonesome.' That is why the quip feels like him — the voice is right, only the record is missing.",
    "origin": "'I've quit a thousand times' is a portable comic template that first circulated in fiction and stage routines, then settled on the best-known smoker among humorists. Twain loved his cigars and joked about himself, so it sounds right.",
    "instead": "Say 'the old joke goes: quitting is easy, I've done it a thousand times', without a name. If you want Twain, quote what he actually wrote: he stopped for two or three days, but it was too lonesome.",
    "sources": [
      {
        "label": "Quote Investigator, 'It's Easy to Quit Smoking. I've Done It a Thousand Times'",
        "url": "https://quoteinvestigator.com/2012/09/19/easy-quit-smoking/"
      }
    ]
  },
  "world-twain-coldest-winter-sf": {
    "belief": "\"The coldest winter I ever spent was a summer in San Francisco.\" —Mark Twain",
    "truth": "Nothing in Twain's writing says this about San Francisco; the joke belongs to the 18th-century English actor James Quin, and Twain in 1880 was repeating it about Paris.",
    "detail": "Quote Investigator found no such remark about San Francisco in Twain's papers or speeches. The earliest instance of the joke is in a letter from Horace Walpole to Mary Berry dated 29 July 1789: Quin, asked whether he had ever seen so bad a winter, replied, 'Yes, just such an one last summer!'\n\nTwain does mention the jest — in a letter to Lucius Fairchild of 28 April 1880, complaining about Paris weather — but he was quoting Quin. The earliest link to San Francisco QI located is a 1963 psychology textbook; before that the joke had also circulated about Duluth, Minnesota.\n\nSan Francisco summers really are cool and foggy, which is why the joke stuck to the city, but Twain is not its source for it.",
    "origin": "Quin's quip spread through Walpole's letters; Twain read and repeated it; in the 20th century it was pinned on different cities (Duluth, San Francisco), and from the 1960s on it carried Twain's name. The fog made it feel right.",
    "instead": "Say 'there's an old joke about San Francisco summers'. If you want a source, cite Walpole's 1789 letter on Quin and note that Twain's 1880 use was about Paris.",
    "sources": [
      {
        "label": "Quote Investigator, 'The Coldest Winter I Ever Spent Was a Summer in San Francisco'",
        "url": "https://quoteinvestigator.com/2011/11/30/coldest-winter/"
      }
    ]
  },
  "world-lincoln-silent-fool": {
    "belief": "\"Better to remain silent and be thought a fool than to speak and remove all doubt.\" —Abraham Lincoln (or Mark Twain)",
    "truth": "Neither Lincoln nor Twain has a record of saying it; the earliest source found is a 1907 book by Maurice Switzer, with Proverbs 17:28 as the older cousin.",
    "detail": "The earliest match Quote Investigator found is in Maurice Switzer's 1907 Mrs. Goose, Her Book: 'It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.'\n\nThe first credit to Lincoln appeared in Golden Book magazine in November 1931, 66 years after his death; the first credit to Twain is a Saskatchewan newspaper in May 1953. Neither comes with a contemporary document.\n\nThe ancient ancestor is Proverbs 17:28 (even a fool is thought wise if he keeps silent) — though there the silent man is thought wise, whereas the modern line only promises not to be thought a fool.",
    "origin": "A 1907 nursery-rhyme-style book of maxims; the line lost its author in circulation, was assigned to Lincoln from the 1930s and to Twain from the 1950s — the two names most often handed unclaimed quotations.",
    "instead": "Say 'as the saying goes' or cite Switzer 1907. If you want an ancient root, point to Proverbs 17:28 and note it is a different claim.",
    "sources": [
      {
        "label": "Quote Investigator, 'Better to Remain Silent and Be Thought a Fool than to Speak and Remove All Doubt'",
        "url": "https://quoteinvestigator.com/2010/05/17/remain-silent/"
      }
    ]
  },
  "world-lincoln-fool-all-the-people": {
    "belief": "\"You can fool all of the people some of the time, and some of the people all of the time, but you cannot fool all of the people all of the time.\" —Abraham Lincoln",
    "truth": "No contemporary document shows Lincoln saying it; the earliest attribution to him is an 1885 letter, and a similar thought appears in Jacques Abbadie in 1684.",
    "detail": "Quote Investigator concludes that Lincoln probably did not use this adage, and the Collected Works contain no trace of it. The earliest attribution located is a letter from H. Clay Bascom to the New York newspaper The Voice, published in September 1885 — twenty years after Lincoln's death — which gave a version: 'you can fool the people some of the time, and you can fool some of the people all of the time; but you can't fool all of the people all the time.'\n\nThe older idea is in Jacques Abbadie's 1684 Traité de la Vérité de la Religion Chrétienne: one can fool some men, or all men in some places and times, but not all men in all places and ages.\n\nQI conjectures that someone in the prohibitionist movement of the 1880s met the idea in Abbadie or Diderot and credited it to the revered Lincoln. That is a conjecture, not a proven chain.",
    "origin": "A 17th-century French apologetic idea, phrased colloquially in 1880s temperance rhetoric and attributed to Lincoln, then repeated for a century as a Lincoln staple.",
    "instead": "Write 'attributed to Lincoln, though no contemporary source has been found', or cite Abbadie 1684 as a paraphrase.",
    "sources": [
      {
        "label": "Quote Investigator, 'You Cannot Fool All the People All the Time'",
        "url": "https://quoteinvestigator.com/2013/12/11/cannot-fool/"
      }
    ]
  },
  "world-hemingway-write-drunk": {
    "belief": "\"Write drunk, edit sober.\" —Ernest Hemingway",
    "truth": "No record in Hemingway's writing or recorded remarks; the earliest strong match is a line given to a fictional character in a 1964 Peter De Vries novel.",
    "detail": "Quote Investigator concludes that Hemingway never said or wrote this. The earliest strong match is in Peter De Vries's 1964 novel Reuben, Reuben, chapter 21, where the character Gowan McGland, modelled on Dylan Thomas, says: 'Sometimes I write drunk and revise sober, and sometimes I write sober and revise drunk.'\n\nIn the novel the line describes one man's process — shuttling between spontaneity and restraint, the Dionysian and the Apollonian — not advice to writers. QI suggests it was later reassigned to the more famous, and famously hard-drinking, Hemingway.\n\nHemingway's own described habit was the opposite: he wrote in the morning and kept the afternoon free. His reputation as a drinker is what made the misattribution so easy to believe.",
    "origin": "A line from a 1964 novel, stripped of context and rephrased as the imperative 'Write drunk, edit sober', then handed to the most plausible-sounding author.",
    "instead": "Leave off Hemingway's name. If you want a source, cite De Vries's Reuben, Reuben (1964) and say it is a character speaking.",
    "sources": [
      {
        "label": "Quote Investigator, 'Write Drunk, Revise Sober'",
        "url": "https://quoteinvestigator.com/2016/09/21/write-drunk/"
      }
    ]
  },
  "world-newton-shoulders-of-giants": {
    "belief": "\"If I have seen further, it is by standing on the shoulders of giants.\" —Isaac Newton (his own humble phrase)",
    "truth": "Newton really wrote it in an 1675 letter to Hooke, but the metaphor was not his invention — twelfth-century scholars used it — and whether the letter was pure modesty or a veiled jab is disputed.",
    "detail": "Newton wrote to Robert Hooke on 5 February 1675 (some sources say 1676): 'If I have seen further it is by standing on the shoulders of Giants.' The words are genuine; this is not a misquotation.\n\nThe confusion is about whose idea it was. John of Salisbury, in his 1159 Metalogicon, credits the image to the earlier Bernard of Chartres, who compared us to dwarfs perched on the shoulders of giants; William of Conches had a similar comparison in 1123. By the 17th century Mersenne, Pascal and Herbert were using it, so it was a commonplace before Newton.\n\nOne more point usually left out: Newton wrote while quarrelling with Hooke over priority in optics, and Hooke had a severe spinal curvature. Some scholars have recently read the line as a sly dig; others disagree, and historians have not settled it. Reading it only as plain modesty is common but may not be the whole story.",
    "origin": "After the letter was published in 1855 the line became Newton's best-known 'modest' remark, retold like the apple story, while its medieval ancestry was forgotten.",
    "instead": "Write: 'In an 1675 letter to Hooke Newton said that if he had seen further it was by standing on the shoulders of giants — a metaphor already medieval.' If you call it modesty, add that he was then in a priority dispute with Hooke.",
    "sources": [
      {
        "label": "Wikipedia, 'Standing on the shoulders of giants'",
        "url": "https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants"
      }
    ]
  },
  "world-socrates-know-nothing": {
    "belief": "\"The only thing I know is that I know nothing.\" —Socrates",
    "truth": "Plato's Socrates does not say this; what he says is that what he does not know he does not think he knows.",
    "detail": "In the Apology, 21d, after questioning a politician who thought himself wise, Socrates concludes (in the Perseus English text): 'what I do not know I do not think I know either.'\n\nThere is a real difference between the two. 'I know that I know nothing' is an assertion of total ignorance. The Apology's Socrates only declines to pretend to knowledge he lacks; he does not claim to know nothing, and elsewhere he holds firm views about justice and how to live.\n\nSecondary accounts We found agree that 'I know that I know nothing' is a later summary not found in Plato's dialogues. It is not an absurd summary, but putting it in quotation marks under Socrates' name turns a more restrained claim into a bolder slogan.",
    "origin": "Later summaries of the Apology compressed 'I do not think I know what I do not know' into 'I know that I know nothing', which then appeared on quote cards.",
    "instead": "Quote the Apology (21d) closely — 'what I do not know I do not think I know' — or paraphrase: Socrates' wisdom lay in not pretending to know.",
    "sources": [
      {
        "label": "Plato, Apology 21d (Perseus Digital Library, English)",
        "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=21d"
      }
    ]
  },
  "world-picasso-good-artists-copy": {
    "belief": "\"Good artists copy; great artists steal.\" —Pablo Picasso",
    "truth": "There is no evidence Picasso said it; similar lines go back to 1892, T. S. Eliot wrote a closer version in 1920, and Steve Jobs credited it to Picasso only in 1996.",
    "detail": "Quote Investigator found no evidence that Picasso said this. The trail runs roughly as follows. In 1892 W. H. Davenport Adams wrote in The Gentleman's Magazine that great poets imitate and improve, whereas small ones steal and spoil.\n\nIn 1920 T. S. Eliot's The Sacred Wood reversed the moral valence: 'Immature poets imitate; mature poets steal; bad poets deface what they take, and good poets make it into something better.' In 1967 Peter Yates claimed Igor Stravinsky said 'A good composer does not imitate; he steals', and a 1974 book on stage design credited William Faulkner with 'immature artists copy, great artists steal.'\n\nIn 1996, on the PBS programme Triumph of the Nerds, Steve Jobs attributed 'good artists copy, great artists steal' to Picasso, which spread that version widely. QI concludes the saying was reshaped by many hands and finds nothing to support Picasso.",
    "origin": "From late-19th-century literary criticism through Eliot's aphorism, then oral lore among composers and stage designers, and finally a 1996 Jobs television interview that tied it to Picasso.",
    "instead": "Say 'as the saying goes' without a name, or quote Eliot's 1920 line and note that he was talking about poets.",
    "sources": [
      {
        "label": "Quote Investigator, 'Good Artists Copy; Great Artists Steal'",
        "url": "https://quoteinvestigator.com/2013/03/06/artists-steal/"
      }
    ]
  },
  "world-twain-death-exaggerated": {
    "belief": "\"The reports of my death are greatly exaggerated.\" —Mark Twain",
    "truth": "Twain did say something like it, but not in these words: the 1897 newspaper version is 'The report of my death was an exaggeration'; 'greatly' came later.",
    "detail": "On 2 June 1897 the New York Journal reported, via journalist Frank Marshall White, that Twain's cousin Dr. J. Ross Clemens had been seriously ill in London and that a rumour of Twain's own death had grown from the confusion. The earliest published version of Twain's reply is: 'The report of my death was an exaggeration.'\n\nQuote Investigator traces the later versions: in the North American Review in 1906 Twain recalled telling a reporter 'Say the report is greatly exaggerated'; in 1912 biographer Albert Bigelow Paine recorded 'Just say the report of my death has been grossly exaggerated'; and later newspapers added adjectives and phrases like 'rumors of my demise'.\n\nSo the remark is real, but the familiar wording was polished through retellings. The earliest documented wording and the popular wording are different things.",
    "origin": "The event was in 1897; the wording shifted through Twain's own recollection, a biographer's retelling and newspaper reprints until it settled into the smooth 'greatly exaggerated'.",
    "instead": "Write: 'In 1897 the press recorded Twain's reply as \"The report of my death was an exaggeration\"; the popular \"greatly exaggerated\" is a later form.'",
    "sources": [
      {
        "label": "Quote Investigator, 'Reports of My Death Are Greatly Exaggerated'",
        "url": "https://quoteinvestigator.com/2024/06/07/report-death/"
      }
    ]
  },
  "world-einstein-god-dice": {
    "belief": "\"God does not play dice.\" —Einstein",
    "truth": "Einstein did write it, but in a December 1926 letter to Born the words were 'I am at all events convinced that He does not play dice' — a philosophical reservation about quantum randomness, not a theological statement.",
    "detail": "In December 1926 Einstein replied to Max Born. The translation quoted by Aeon reads: 'The theory produces a good deal but hardly brings us closer to the secret of the Old One. I am at all events convinced that He does not play dice.' Born had been arguing that the heart of the new quantum mechanics beats randomly, unlike deterministic classical physics.\n\nTwo cautions. First, the letter's subject is 'the Old One' and 'He'; 'God does not play dice' is a later compression. Second, Einstein's 'God' was not a personal deity; the article quotes him saying he believed in Spinoza's God, who reveals himself in the lawful harmony of what exists, not a God concerned with the fates of humans.\n\nThat is why 'Einstein rejected quantum mechanics because he believed in God' is too simple: he was expressing trust that nature is rational and intelligible. His position was later outweighed by experiment, but that is another story.",
    "origin": "A private 1926 letter that became one of the most quoted lines in physics, shortened in popular culture to 'God does not play dice' and then recruited to support all kinds of religious or anti-religious arguments.",
    "instead": "Quote it as: 'In a 1926 letter to Born Einstein wrote that he was convinced \"He does not play dice\" (the \"Old One\", i.e. nature's order).' Don't use it to say what religion he held.",
    "sources": [
      {
        "label": "Aeon, What Einstein meant by God does not play dice",
        "url": "https://aeon.co/ideas/what-einstein-meant-by-god-does-not-play-dice"
      }
    ]
  },
  "luxun-some-live-dead": {
    "belief": "\"Some people are alive, yet already dead; some are dead, yet still alive.\" —Lu Xun",
    "truth": "These are the opening lines of poet Zang Kejia's 1949 poem 'Some People', subtitled 'Thoughts in Memory of Lu Xun' — it is about Lu Xun, not by him.",
    "detail": "Zang Kejia wrote 'Some People' in 1949, with the subtitle 'Thoughts in Memory of Lu Xun'. The China Writers Network article about Zang's former home dates its composition to October 1949 and quotes these opening lines.\n\nLu Xun is the subject of the memorial poem; Zang Kejia is its author. Cite both the author and the poem's title to keep the two roles clear.",
    "origin": "A memorial poem's subject and author are different people. An excerpt detached from the title can blur those roles.",
    "instead": "Cite it as: Zang Kejia, 'Some People' (1949, subtitled 'Thoughts in Memory of Lu Xun'): 'Some people are alive, yet already dead; some are dead, yet still alive.'",
    "sources": [
      {
        "label": "China Writers Network, 'Visiting Zang Kejia's former home' (notes the poem, written Oct 1949, subtitled 'Thoughts in Memory of Lu Xun')",
        "url": "https://www.chinawriter.com.cn/n1/2023/0728/c404063-40045334.html"
      }
    ]
  },
  "luxun-one-confidant": {
    "belief": "\"Finding one true confidant in life is enough; regard that person as a kindred spirit in this world.\" — Lu Xun",
    "truth": "The couplet is attributed to the Qing-dynasty writer He Waqin. Lu Xun copied it as a gift for Qu Qiubai in spring 1933; attributing its authorship solely to Lu Xun is misleading.",
    "detail": "The CPPCC Net article about Qu Qiubai's Ah Q cartoon records that in spring 1933 Lu Xun wrote out this couplet by the Qing writer He Waqin and gave it to Qu Qiubai.\n\nThe calligrapher and the original author are different roles. This source supports the account of Lu Xun copying and gifting the couplet, not his authorship.",
    "origin": "A couplet Lu Xun wrote out for Qu Qiubai can be reduced in retelling to 'Lu Xun said'.",
    "instead": "Cite it as a couplet attributed to the Qing writer He Waqin, copied by Lu Xun for Qu Qiubai in 1933.",
    "sources": [
      {
        "label": "人民政协网 — Qu Qiubai’s Ah Q cartoon (Lu Xun copies He Waqin’s couplet as a gift, spring 1933)",
        "url": "https://www.rmzxw.com.cn/c/2024-07-17/3579048.shtml"
      }
    ]
  },
  "zh-fools-trouble-themselves": {
    "belief": "\"There was originally no trouble in the world; fools make trouble for themselves.\" —proverb",
    "truth": "The source is a remark by Lu Xiangxian in the New Book of Tang: 'There is originally nothing the matter in the world; mediocre people stir it up into trouble.' The popular form is a later smoothing.",
    "detail": "The New Book of Tang describes Lu Xiangxian governing Puzhou and inspecting Hedong with leniency. His remark concerns keeping government simple and avoiding needless interference.\n\nThe popular version changes both the wording and the emphasis: advice about governing becomes advice not to worry unnecessarily. It can be used as a modern proverb, but should not be presented as the exact wording of the historical text.",
    "origin": "A provincial official's remark in a dynastic history, reshaped by folk usage into a proverb and later into lifestyle advice, with the meaning sliding from 'officials, stop meddling' to 'don't worry so much'.",
    "instead": "When accuracy matters, quote the Tang text 'The world originally has nothing the matter...' and say it is about governing; as an everyday proverb the short form is fine, just do not present it as the history's wording.",
    "sources": [
      {
        "label": "Ouyang Xiu and Song Qi, New Book of Tang, biography of Lu Xiangxian (Chinese Wikisource)",
        "url": "https://zh.wikisource.org/wiki/新唐書/卷116"
      }
    ]
  },
  "zh-liang-qichao-drink-ice": {
    "belief": "\"Ten years drinking ice, and still the hot blood does not cool.\" —Liang Qichao",
    "truth": "The complete line lacks a verifiable source in Liang Qichao's own writings. The 'drinking ice' allusion can be traced to the Zhuangzi, but that does not establish his authorship of this sentence.",
    "detail": "Chinese Wikiquote labels the line a false attribution. That secondary annotation alone does not identify its author or replace a specific reference to Liang's writings.\n\nIn the Zhuangzi, 'drinking ice' describes anxiety after receiving a mission. Liang's studio name refers to that allusion. The allusion's source and the authorship of the complete modern line are separate questions. The available sources neither confirm Liang wrote the line nor prove that he never did.",
    "origin": "The allusion and Liang's studio name encourage the association, but the complete line's author and date still need reliable documentation.",
    "instead": "Say: 'Liang Qichao styled himself \"Master of the Ice-Drinker's Studio\", from the Zhuangzi.' Label the couplet as 'attributed online, no original text found'.",
    "sources": [
      {
        "label": "Chinese Wikiquote, Liang Qichao (couplet marked as a spurious attribution)",
        "url": "https://zh.wikiquote.org/wiki/梁啟超"
      },
      {
        "label": "Zhuangzi, 'In the World of Men' (Chinese Wikisource): 'This morning I received my orders and by evening I am drinking ice'",
        "url": "https://zh.wikisource.org/wiki/莊子/人間世"
      }
    ]
  },
  "why-manhole-round": {
    "belief": "Manhole covers are round because only a round lid can't fall into its own hole.",
    "truth": "A circle can't fall through, but it isn't the only shape that can: any curve of constant width, such as a Reuleaux triangle, works too. Round wins mostly because it is easy and cheap to make.",
    "detail": "Whether a lid can drop into its opening depends on its width in every direction. A circle has the same width everywhere, so however you tilt it, it is still wider than the hole. A square lid is longer along its diagonal than along its side, so tilted it can slip into a square opening.\n\nBut that property isn't unique to circles. Any 'curve of constant width' has it. The simplest alternative is the Reuleaux triangle, an equilateral triangle with its sides bulged into circular arcs, and there are Reuleaux pentagons and heptagons too. A 2003 Science News article by Ivars Peterson explains exactly this, and notes that some coins use a constant-width heptagon shape.\n\nSo why are street covers nearly always round? The reasons usually given are practical: circles are easiest to cast and machine and use less material than a square of the same width; a round shaft resists soil pressure evenly; a round lid needs no alignment and can be rolled. How much each reason weighs varies by place and maker, so the careful version is: not falling in is a hard geometric fact, and ease of manufacture is what makes the circle the usual winner.",
    "origin": "The question became famous as a 'how do you think?' interview puzzle, popularised by William Poundstone's 2003 book about tech-company hiring puzzles (as cited in Wikipedia's 'Manhole cover' article). Boiled down to 'why round? so it can't fall in', the extra idea that only a circle works got added in the retelling.",
    "instead": "Next time you see a manhole cover, notice that not all are round. Square or rectangular ones usually sit on a frame or ledge larger than the opening rather than relying on shape alone. Not falling in is one advantage of the circle, not its only reason for existing.",
    "sources": [
      {
        "label": "Ivars Peterson, Science News 2003: Why manhole covers are round (popular article on constant-width curves and the Reuleaux triangle)",
        "url": "https://www.sciencenews.org/?p=26010"
      },
      {
        "label": "Wikipedia: Manhole cover (lists the common reasons for round covers; cites Poundstone 2003)",
        "url": "https://en.wikipedia.org/wiki/Manhole_cover"
      }
    ]
  },
  "why-comet-round-windows": {
    "belief": "Airliner windows have rounded corners because the Comet's square windows tore early jets apart.",
    "truth": "The lesson is right, since sharp-cornered openings concentrate stress, but the first fractures were at roughly square antenna windows and an escape-hatch window, not at the passenger windows themselves.",
    "detail": "In 1954 two de Havilland Comet 1 airliners, one flown for BOAC and one for South African Airways, broke up in flight over the Mediterranean. Investigators put a whole fuselage in a water tank and pressurised it again and again to simulate thousands of flights. It cracked from fatigue at the corner of a roughly square forward escape-hatch window. Wreckage recovered near Elba then showed the break-up began around the two automatic direction finder (ADF) antenna windows on top of the fuselage, which were also roughly square.\n\nThe US Federal Aviation Administration's lessons-learned page explains that these squarish openings produced much higher local stress than the designers had estimated, and each pressurisation cycle wore the material at the corners until it tore. Round and oval openings let stress flow smoothly round the curve instead of piling up at corners, which is why jets since then have rounded windows.\n\nHowever, the safety consultancy Aerossurance has catalogued common Comet misconceptions, pointing out that the failures began at the antenna aperture and the escape hatch, so it is too simple to say square passenger windows ripped the aircraft apart. The investigation also drove the shift to fail-safe design and to serious fatigue testing. The FAA adds a telling detail: the test fuselage that survived 16,000 cycles had earlier been pressurised to twice working pressure, which hardened the material and masked the true fatigue life.",
    "origin": "The Comet crashes are among the most retold stories in aviation, and 'square window, stress concentration, round window' is the easiest thread to draw and remember, so it got compressed into 'square windows killed them'. The short version isn't wrong, it just credits every squarish opening to the passenger windows.",
    "instead": "Next time you look out of a rounded window, think of stress flowing smoothly around the curve. The more accurate rule is that any sharp-cornered opening in a pressurised skin is a favourite starting point for fatigue cracks, which is why doors, antenna cut-outs and access panels have rounded corners too.",
    "sources": [
      {
        "label": "US Federal Aviation Administration, Lessons Learned: De Havilland DH-106 Comet 1",
        "url": "https://www.faa.gov/lessons_learned/transport_airplane/accidents/G-ALYV"
      },
      {
        "label": "Aerossurance: Common Comet Misconceptions and Collaborative Contribution to Safety",
        "url": "https://aerossurance.com/safety-management/comet-misconceptions/"
      }
    ]
  },
  "why-pen-cap-hole": {
    "belief": "The tiny hole in a pen cap is there to equalise air pressure so the ink doesn't dry out or leak.",
    "truth": "It is mainly a safety feature: if a child inhales the cap, the hole leaves an air path. ISO 11540 is the standard written for exactly this.",
    "detail": "ISO 11540 is titled for caps on writing and marking instruments that reduce the risk of asphyxiation. According to the Standards Council of Canada's database entry, it sets requirements for such caps and relates to instruments likely, in normal or foreseeable use, to be used by children up to 14. Instruments designed only for adults (jewellery pens, expensive fountain pens, professional technical pens) are outside its scope. The 1993 edition has been withdrawn and the 2014 edition is current.\n\nThe idea is simple. A pen cap is about the size that can lodge in a windpipe, and if one is inhaled, a cap with a vent at least doesn't seal the airway completely, buying time for help. A popular-science article reports that the standard sets a numerical air-flow requirement (around 8 litres per minute), but We could not open the full standard to verify the number, so it isn't presented here as settled.\n\nTo be clear, the standard is about asphyxiation, not ink. Whether the hole has any other effect is something We found no authoritative source for, so no claim is made.",
    "origin": "Explaining the hole as 'pressure equalising' or 'keeps ink from drying' follows the intuition that a small hole means ventilation. We could not find where that explanation first appeared. The documented source of the design is ISO 11540, first published in 1993 and revised in 2014.",
    "instead": "Next time you see a vent in a pen cap, notice where it is: it is a child-safety feature. For stationery that children use, a quick look for a vent in the cap is a small detail worth noticing.",
    "sources": [
      {
        "label": "Standards Council of Canada database: ISO 11540:2014, caps for writing and marking instruments to reduce the risk of asphyxiation",
        "url": "https://ccn-scc.ca/standardsdb/standards/8154463"
      },
      {
        "label": "Standards Council of Canada database: ISO 11540:1993 (annulled)",
        "url": "https://ccn-scc.ca/standardsdb/standards/8109284"
      },
      {
        "label": "Mental Floss: The surprising reason why pen caps have tiny holes in the top (popular article citing the air-flow figure)",
        "url": "https://www.mentalfloss.com/article/545682/surprising-reason-why-pen-caps-have-tiny-holes-top"
      }
    ]
  },
  "why-a4-ratio": {
    "belief": "A4's awkward 210 × 297 mm size was picked arbitrarily.",
    "truth": "It isn't arbitrary: the long side to the short side is the square root of two, so folding a sheet in half along its long side gives a sheet of the same shape. The whole series descends from A0, which has an area of one square metre.",
    "detail": "ISO 216 defines the A series with two rules: every sheet has a height-to-width ratio of the square root of two (about 1.4142), and A0 has an area of one square metre. Because of that ratio, cutting a sheet in half across its long side gives two sheets with the same proportions, so A3 halved is A4, A4 halved is A5, and so on.\n\nA0 measures 841 × 1189 mm. The exact halved dimensions aren't whole millimetres, so the standard rounds them, giving the slightly odd-looking 210 × 297 for A4.\n\nThe idea is old. In Markus Kuhn's write-up at the University of Cambridge, the physics professor Georg Christoph Lichtenberg is shown discussing the advantages of the square-root-of-two ratio in a letter of 1786; a French paper-tax law of 1798 defined sizes that correspond exactly to some modern ISO sizes; and Walter Porstmann independently reinvented the system in Germany, where it became DIN 476 in 1922. Many countries followed, and it became the international standard ISO 216, and the UN's document format, in 1975. The United States and Canada are the main exceptions.",
    "origin": "The 'it looks random' impression comes from the unround millimetre numbers. Seeing 210 and 297, people assume they were picked by chance; the square-root-of-two logic isn't printed on the paper and only shows when you fold it.",
    "instead": "Fold a sheet of A4 in half and lay it over another: the A5 you made has the same shape as the A4. That's why scaling A4 down to A5, or A3 up to A4, on a copier fills the page exactly.",
    "sources": [
      {
        "label": "Markus Kuhn, University of Cambridge Computer Laboratory: International standard paper sizes (design principles and history of ISO 216)",
        "url": "https://www.cl.cam.ac.uk/~mgk25/iso-paper.html"
      }
    ]
  },
  "why-qwerty-slow-down": {
    "belief": "QWERTY scrambled the letters on purpose to slow typists down so the typebars wouldn't jam.",
    "truth": "The 'slow them down' story is the most widespread version but isn't settled: researchers at Kyoto University argue the layout evolved through telegraph equipment and Morse-code receivers, with no consistent plan to slow typing.",
    "detail": "The usual story: early typewriters' typebars jammed, so the inventor Christopher Latham Sholes separated common letters to slow typists down. It has circulated for decades and appears even in academic papers.\n\nIn 2011 Koichi and Motoko Yasuoka of Kyoto University published 'On the Prehistory of QWERTY'. They argue that the first typewriter keyboard descended from printing telegraphs and was developed for Morse-code receivers, that the arrangement changed many times and 'accidentally' grew into QWERTY, through Sholes and others, then other partners, then manufacturers, at times to receive telegraphs, at times as a compromise between inventors and producers, and finally to avoid old patents. They explicitly disagree that Sholes meant to slow operators down, and they take apart related tales such as the idea that TYPE WRITER was meant to be typed from one row for salesmen.\n\nThe other side has a source too: the Yasuokas quote a 1980 paper by Prof. Hisao Yamada of the University of Tokyo which says the layout was meant to separate frequent letter pairs to reduce jams. The Yasuokas reject this, though typebar jamming was certainly a real problem for early typewriters. The safest reading is that the history is tangled and has no single clean cause.",
    "origin": "From the 1980s the jam-and-slow-down story was repeated in technical histories, economics papers about path dependence, and popular books, getting more certain each time. The Yasuokas name this chain of citations and argue that its details, such as 'ed' having to be typed with the same finger, don't hold up against the historical machines.",
    "instead": "When you hear that a design was 'done on purpose', ask who first said so and on what evidence. QWERTY shows how a layout can be the product of telegraphy, patents and manufacturer compromises rather than one clever plan. The careful line is 'the origin is disputed, but it wasn't simply a deliberate slow-down'.",
    "sources": [
      {
        "label": "Koichi Yasuoka & Motoko Yasuoka, ZINBUN No. 42, Kyoto University 2011: On the Prehistory of QWERTY",
        "url": "https://repository.kulib.kyoto-u.ac.jp/server/api/core/bitstreams/dc434be9-80cd-499b-a984-f9fa35954c3b/content"
      }
    ]
  },
  "why-pill-score-line": {
    "belief": "The line across the middle of a pill is just decoration; split or not, a pill is a pill, scored or not.",
    "truth": "A score is designed for splitting: FDA's guidance asks for data supporting scored tablets, and says modified-release tablets, whose drug release can be compromised by splitting, should not be scored.",
    "detail": "In its March 2013 guidance 'Tablet Scoring: Nomenclature, Labeling, and Data for Evaluation', the US FDA's CDER defines a score as a debossed line across a tablet's surface, and says it facilitates splitting a higher-strength tablet into smaller portions. It recommends that sponsors supply data showing scored tablets can be split reliably, including checks on the split portions' stability.\n\nIt also states that modified-release products for which control of drug release can be compromised by splitting should not have a scoring feature. FDA's own research concluded that splitting can raise safety issues in some cases, especially when tablets are not scored or evaluated for splitting: variation in content, weight, disintegration or dissolution can change how much drug is in each piece and available for absorption.\n\nThe guidance also draws its own limits. It notes there are no standards or regulatory requirements specifically addressing scoring, and it does not describe the medical circumstances in which splitting is appropriate. So a score says 'designed to be split', not 'you should split this one'. For that, follow the leaflet and the advice of your doctor or pharmacist.",
    "origin": "A score looks like a casually pressed decorative line, and many tablets also carry printed letters and logos, so it's easy to treat it as decoration or to assume unscored pills can be broken just as well. The intuition comes from picturing every tablet as a plain pressed lump of powder, but internal construction differs a lot between dosage forms.",
    "instead": "Notice whether a tablet has a score, and whether the leaflet says it may be split. When unsure, show the pack to a pharmacist rather than judging for yourself. This entry describes how tablets are designed in general and is not medication advice.",
    "sources": [
      {
        "label": "US FDA / CDER, Guidance for Industry (March 2013): Tablet Scoring: Nomenclature, Labeling, and Data for Evaluation",
        "url": "https://www.fda.gov/media/81626/download"
      }
    ]
  },
  "why-runway-numbers": {
    "belief": "The big numbers painted on an airport runway are just serial numbers.",
    "truth": "The number is the runway centreline's magnetic bearing divided by ten and rounded, so the two ends of a runway differ by 18, and when magnetic north drifts enough, runways get renamed.",
    "detail": "The FAA's Aeronautical Information Manual is explicit: the runway number is the whole number nearest one-tenth of the magnetic azimuth of the runway centreline, measured clockwise from magnetic north, determined from the approach direction. A runway pointing at about 092 degrees is Runway 09; the other end, at about 272 degrees, is 27. The two ends differ by 180 degrees, hence 18 in the numbers. Parallel runways add L, R or C for left, right or centre.\n\nBecause it uses magnetic rather than true north, and Earth's magnetic field slowly changes, runways sometimes have to be renumbered. NOAA's National Centers for Environmental Information says Fairbanks International Airport in Alaska renamed runway 1L-19R to 2L-20R in 2009 and expects to need another change around 2033. A Tucson Airport Authority notice also says such renumbering happens at almost every airport, roughly once every 30 years; that is the airport's own statement, not a universal rule.",
    "origin": "Runway numbers look like serial numbers because they are two digits painted at the end of the pavement with no explanation next to them. We found no particular source for the misconception; it is the natural assumption when you see a number with no context.",
    "instead": "Next time you see a runway number, estimate the direction: 09 points roughly east, 18 south, 27 west, 36 north. The number you see through the window when landing tells you which way the aircraft is facing.",
    "sources": [
      {
        "label": "US FAA, Aeronautical Information Manual 2-3: Airport Marking Aids and Signs (runway designators)",
        "url": "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap2_section_3.html"
      },
      {
        "label": "NOAA National Centers for Environmental Information: Airport Runway Names Shift with Magnetic Field",
        "url": "https://www.ncei.noaa.gov/node/253"
      },
      {
        "label": "FAASafety.gov notice: Tucson International Airport runway closure and renumbering",
        "url": "https://www.faasafety.gov/SPANS/noticeView.aspx?nid=13246"
      }
    ]
  },
  "why-black-box-orange": {
    "belief": "The 'black box' in an aircraft is black, which is why it's called that.",
    "truth": "Flight recorders are actually bright orange so they are easy to spot in wreckage; where the name 'black box' came from isn't settled.",
    "detail": "A fact sheet from the Australian Transport Safety Bureau says plainly that flight recorders, popularly known as 'black boxes', are in fact painted orange to help recovery after an accident. There are normally two: the cockpit voice recorder and the flight data recorder.\n\nThe name's origin isn't settled. Wikipedia's 'Flight recorder' article says 'black box' was a British Second World War phrase for secret radar and navigation electronics, often housed in non-reflective black cases; the earliest reference it finds is a 1946 Flight magazine article; and by 1967, when many countries mandated flight recorders, the phrase was in general use, with one report noting these so-called black boxes were in fact fluorescent flame-orange. The article itself flags that section as possibly containing original research, so treat it as one explanation rather than a conclusion.",
    "origin": "The name predates the look of the recorders: 'black box' already meant, in engineering, a system known only by its inputs and outputs, and in aviation it carried over from early electronic equipment. So something called a black box needn't be black; the name and the colour are unrelated.",
    "instead": "When the news says 'the black box has been found', picture a tough, conspicuously orange metal box. As for the name, remember that it has nothing to do with the colour.",
    "sources": [
      {
        "label": "Australian Transport Safety Bureau (ATSB): Black box flight recorders fact sheet, hosted on SKYbrary",
        "url": "https://skybrary.aero/sites/default/files/bookshelf/3679.pdf"
      },
      {
        "label": "Wikipedia: Flight recorder (Terminology section, which flags itself as possibly original research)",
        "url": "https://en.wikipedia.org/wiki/Flight_recorder"
      }
    ]
  },
  "why-golf-ball-dimples": {
    "belief": "A golf ball's dimples are just for grip, and a smooth ball would fly farther.",
    "truth": "The dimples are aerodynamic: they make the air layer next to the ball turbulent, so the flow separates later behind it, and drag falls well below that of a smooth ball.",
    "detail": "When an object flies through air, the pressure difference between its front and back, pressure drag, is the main resistance. On a smooth sphere the flow leaves the surface early, trailing a large low-pressure wake and giving high drag.\n\nA 2006 letter in Physics of Fluids by Choi, Jeon and Choi measured the air velocity above a dimpled surface and explained the mechanism: dimples cause local flow separation and trigger instability in the separating shear layer, generating strong turbulence; with this the flow reattaches to the surface with high momentum near the wall and can overcome the strong adverse pressure gradient at the rear, so the main separation is delayed and drag is greatly reduced. The paper's introduction says dimples reduce drag on a sphere by as much as 50 per cent compared with a smooth surface.",
    "origin": "We found no source for the 'dimples are for grip' idea. It looks like a layperson's intuition from touch: a textured ball suggests grip. It overlooks that surface shape changes how air flows around a ball in flight.",
    "instead": "Next time you see a golf ball, picture the dimples stirring up tiny turbulence that lets air cling to the ball longer.",
    "sources": [
      {
        "label": "Choi, Jeon & Choi, Physics of Fluids 18, 041702 (2006): Mechanism of drag reduction by dimples on a sphere",
        "url": "https://research.engineering.ucdavis.edu/biosport/wp-content/uploads/sites/24/2014/06/Choi-et-al-2006-Mechanism-of-drag-reduction-by-dimples-on-a-sphere.pdf"
      }
    ]
  },
  "why-coin-ridged-edge": {
    "belief": "The ridges around a coin's edge are for grip, or just for looks.",
    "truth": "The ridges began as protection against clipping: people shaved metal from the edges of precious-metal coins, and a milled edge makes that tampering obvious at a glance.",
    "detail": "Gold and silver coins used to be worth what their metal was worth. With a smooth edge, someone could shave a little metal off, the coin still looked about right and spent at face value, and the shavings could be melted down and sold. This was called clipping. The Royal Mint says machines able to strike thicker coins and put milling around the edge were brought in during the mid-17th century; another Royal Mint article says milled edges began on British coinage in the 1660s, as a response to clipping. Some 17th-century coins carry the Latin edge inscription 'Decus et Tutamen', meaning 'an ornament and a safeguard'.\n\nSo the ridges were originally an anti-tampering feature, not a matter of feel. Most coins today contain little precious metal, and whether their edge ridges serve other purposes varies by country and coin; We found no authoritative source that settles that, so no claim is made.",
    "origin": "Once value no longer depended on metal, the anti-clipping need disappeared but the ridges stayed by tradition, so people naturally explain them by present-day functions such as grip or identification. We could not trace who first offered that explanation.",
    "instead": "Next time you run a thumb along a coin's edge, think of it as a tamper-evident seal: any filing would show up in the ridges. Compare coins of different values in your pocket and see which have ridged edges and which are smooth.",
    "sources": [
      {
        "label": "The Royal Mint: The Milled Edge Motif (journal article on the origin and timing of milled edges)",
        "url": "https://886.royalmint.com/blogs/the-journal/the-milled-edge-motif"
      },
      {
        "label": "The Royal Mint: Clippers and Counterfeiters, notes for teachers (clipping and the mid-17th-century milling machines)",
        "url": "https://www.royalmint.com/globalassets/the-royal-mint/pdf/clippers-and-counterfeiters-notes-for-teachers.pdf"
      }
    ]
  },
  "why-wire-marker-balls": {
    "belief": "The big coloured balls on power lines are decoration, or counterweights, or for birds.",
    "truth": "They are for low-flying aircraft: they make hard-to-see wires visible. The FAA sets rules for their size, colour and spacing.",
    "detail": "The US FAA's Advisory Circular 70/7460-1, Obstruction Marking and Lighting, section 3.5.1 'Spherical Markers', says spherical markers are primarily used to identify overhead wires and catenary lines under 69 kilovolts, and that other shapes such as cylinders are acceptable if their projected area is no less than that of a sphere. For extensive crossings of canyons, lakes or rivers, diameter should be at least 36 inches (91 cm); smaller 20-inch (51 cm) spheres are allowed on less extensive spans or on power lines below 50 feet above ground within 1,500 feet of a runway end. Each marker should be a solid colour: aviation orange, white or yellow.\n\nFor installation, unlighted markers should be spaced about 200 feet apart, closer (30 to 50 feet) in critical areas near runway ends, and alternating colours are recommended because that gives the most conspicuity against all backgrounds.\n\nThis is the US standard; other countries have their own rules, which We did not check. The entry also makes no claim about birds: the FAA document reviewed describes only the use for aircraft.",
    "origin": "The balls hang high, away from roads, with no sign to explain them, so people guess from 'decoration' or 'something physical'. we couldn't trace where those guesses first appeared.",
    "instead": "Next time you see coloured balls on wires near a mountain pass, river valley or airport, think of them as road signs for helicopter and crop-duster pilots. If you fly low in such places, the balls are your cue to watch for wires.",
    "sources": [
      {
        "label": "US FAA, Advisory Circular 70/7460-1M: Obstruction Marking and Lighting (section 3.5.1, Spherical Markers)",
        "url": "https://www.faa.gov/documentLibrary/media/Advisory_Circular/Advisory_Circular_70_7460_1M.pdf"
      }
    ]
  },
  "word-kongxue-laifeng": {
    "belief": "\"Kōng xué lái fēng\" (空穴来风) means a rumor with no basis at all",
    "truth": "Literally \"where there is an empty hole, wind comes in\" — originally it meant a rumor doesn't arise without some cause. The \"groundless\" sense is now recorded by dictionaries alongside the original.",
    "detail": "The phrase comes from Song Yu's \"Rhapsody on the Wind\" in the Wen Xuan. When King Xiang of Chu says the breeze is shared by everyone, Song Yu replies that he learned from his teacher: the zhi-ju tree draws nests, and a hollow opening draws wind — what a place offers decides what comes to it. A commentary in the Liuchen-annotated Wen Xuan explains 空穴 as an opening in a door or gate through which wind readily passes. So \"empty hole\" is the condition that lets wind in, not a symbol of nothingness.\n\nIn its original sense the phrase therefore means \"no smoke without fire\": a gap has to exist before a rumor can enter. The Taiwan Ministry of Education's Revised Dictionary still glosses it as rumor slipping in through a gap, though its own example sentence (\"such rumors are not credible\") already uses the newer, \"baseless\" feel.\n\nChinese lexicography has followed the shift. According to a 2020 article in Modern Chinese (现代语文), the Contemporary Chinese Dictionary's 2002 supplement defined it only as \"rumors are not entirely without cause\", while its 5th edition added \"now mostly used to mean rumors with no basis whatsoever\" — keeping both senses (the article's author argues even that under-states how dominant the new sense has become). It is a word whose old and new meanings are changing places, not simply a mistake.",
    "origin": "The reversal probably comes from reading 空 as \"empty, nothing there\": 空穴来风 then sounds like \"wind from nowhere\", i.e. no basis. That reading spread through speech and news writing until dictionaries began annotating it as a common modern use.",
    "instead": "To mean \"rumors rarely come from nothing\", use the original sense with context, e.g. \"空穴来风，未必无因\". To say \"completely baseless\", terms like 无稽之谈 (wú jī zhī tán) or 捕风捉影 (bǔ fēng zhuō yǐng) are unambiguous.",
    "sources": [
      {
        "label": "Song Yu, Rhapsody on the Wind, in the annotated Wen Xuan, juan 13 (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E5%85%AD%E8%87%A3%E8%A8%BB%E6%96%87%E9%81%B8_(%E5%9B%9B%E9%83%A8%E5%8F%A2%E5%88%8A%E6%9C%AC)/%E5%8D%B7%E7%AC%AC%E5%8D%81%E4%B8%89"
      },
      {
        "label": "Taiwan Ministry of Education, Revised Mandarin Dictionary — 空穴來風",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%A9%BA%E7%A9%B4%E4%BE%86%E9%A2%A8"
      },
      {
        "label": "Song Qixia, Modern Chinese 2020 no. 8 — on the dictionary definition of 空穴来风",
        "url": "https://m.fx361.com/news/2020/1215/7342152.html"
      }
    ]
  },
  "word-chaqiang-renyi": {
    "belief": "\"Chā qiáng rén yì\" (差强人意) means disappointing or unsatisfactory",
    "truth": "It began as praise: 差 means \"somewhat\" and 强 means \"to rouse\", so it meant \"quite heartening\". It later softened to \"reasonably satisfactory\".",
    "detail": "The source is the Book of the Later Han, biography of Wu Han. Emperor Guangwu sent someone to see what his commander Wu Han was doing; the report was that he was repairing the tools of war, and the emperor sighed: \"Lord Wu rather heartens me — he is like a whole enemy state in himself.\" Here 差 (chā) means \"somewhat\", and 强人意 means \"stiffens one's spirit\". It is an emperor's commendation of a general, not a complaint.\n\nLater usage drifted to \"passably satisfactory\", and many readers now hear it as \"not very satisfactory\". Taiwan's Ministry of Education Revised Dictionary records this drift openly: \"originally meant greatly heartening; later, broadly passable, grudgingly satisfactory.\" So \"just acceptable\" is dictionary-approved, while \"bad / a letdown\" is not listed.\n\nLinguists treat it as change in progress: Zhu Qingzhi's 2011 paper \"From 差强人意 to 强差人意\" uses corpus and web material to document the meaning and even the word-form varying over a short period.",
    "origin": "The common reading of 差 is \"poor\" (chà), so 差强 looks like \"poorly strong\", and the whole phrase gets reinterpreted as \"not great\". As the old pronunciation chā and the classical sense of \"somewhat\" faded, the meaning followed.",
    "instead": "For \"fairly acceptable\", 差强人意 is dictionary-backed. For \"disappointing\", use 不尽如人意 (bù jìn rú rén yì) or 不及预期, which cannot be mistaken for praise by readers who know the old sense.",
    "sources": [
      {
        "label": "Book of the Later Han, biography of Wu Han (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E5%BE%8C%E6%BC%A2%E6%9B%B8/%E5%8D%B718"
      },
      {
        "label": "Taiwan Ministry of Education, Revised Mandarin Dictionary — 差強人意",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%B7%AE%E5%BC%B7%E4%BA%BA%E6%84%8F"
      },
      {
        "label": "Zhu Qingzhi, \"From 差强人意 to 强差人意\", Macao Language and Culture Research 2011 (2012)",
        "url": "https://repository.eduhk.hk/en/publications/%E5%BE%9E%E5%B7%AE%E5%BC%B7%E4%BA%BA%E6%84%8F%E5%88%B0%E5%BC%B7%E5%B7%AE%E4%BA%BA%E6%84%8F%E5%B0%8D%E4%B8%80%E5%80%8B%E6%AD%A3%E5%9C%A8%E7%99%BC%E7%94%9F%E7%9A%84%E8%AA%9E%E8%A8%80%E8%AE%8A%E7%95%B0%E5%AF%A6%E4%BE%8B%E7%9A%84%E5%88%9D%E6%AD%A5%E8%A7%80%E5%AF%9F/"
      }
    ]
  },
  "word-shoudang-qichong": {
    "belief": "\"Shǒu dāng qí chōng\" (首当其冲) means to charge at the front, to lead the attack",
    "truth": "It means being positioned at the point of impact and so the first to take the blow — it is passive, not \"leading the charge\".",
    "detail": "冲 (衝) is a thoroughfare or exposed junction, and 当其冲 means \"to stand facing the impact\". An early use appears in the Book of Han's Five Phases treatise, quoting Liu Xiang: the small state of Zheng, squeezed between Jin and Chu and further pressed by Wu, \"stood at the crossroads of the clash\" (郑当其冲) and failed to cultivate virtue, so it risked ruin among three powers.\n\nThe Taiwan Ministry of Education's Revised Dictionary defines it as \"first to be attacked, or first to meet disaster\", with the example of a town caught between two armies bearing the brunt of both sides' shelling. No \"first to charge\" sense is recorded there, so in sentences like \"he led the way and finished first\" many readers will still count it as a slip.\n\nThe misreading is understandable: today 冲 most often means \"to rush\", and 首 means \"first\", so the characters read as \"first to rush\". We could not find an official statement on whether any dictionary plans to add the active sense.",
    "origin": "As 冲 shifted in everyday Chinese from the noun \"thoroughfare\" to the verb \"rush / charge\", the idiom was reinterpreted as \"first to charge\". The usage is common in news and speech, which is why it is on many lists of frequently misused idioms.",
    "instead": "Use it for \"first to be affected\": \"as prices rise, low-income households bear the brunt\". For an active lead, say 冲锋在前 (chōngfēng zài qián), 率先垂范 (shuàixiān chuífàn) or 一马当先 (yì mǎ dāng xiān).",
    "sources": [
      {
        "label": "Book of Han, Five Phases treatise, quoting Liu Xiang (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E6%BC%A2%E6%9B%B8/%E5%8D%B7027%E4%B8%8B%E4%B9%8B%E4%B8%8B"
      },
      {
        "label": "Taiwan Ministry of Education, Revised Mandarin Dictionary — 首當其衝",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E9%A6%96%E7%95%B6%E5%85%B6%E8%A1%9D"
      }
    ]
  },
  "word-qiyue-liuhuo": {
    "belief": "\"Qī yuè liú huǒ\" (七月流火) means July is blazing hot",
    "truth": "The 火 is a star (Antares, called Great Fire) and 流 means it slides westward — the line originally says the heat is ending and autumn approaching.",
    "detail": "The line opens the \"Seventh Month\" ode in the Book of Songs: \"In the seventh month the Fire declines; in the ninth month clothes are handed out.\" According to Wang Li's essay \"Why studying classical Chinese means studying a little astronomy\", 火 is the lunar mansion Xin, also called Great Fire (Antares), and 流 is its westward descent. Wang notes this line was long misexplained until Dai Zhen used the precession of the equinoxes to show that in Zhou times the star stood highest in the south at dusk in the sixth month and was already sinking west by the seventh.\n\nSo the verse says: when the Fire star sets, the worst heat is over, and two months later it will be time to issue winter clothes. It marks the approach of autumn, not midsummer.\n\nModern writers often use it to mean \"scorching July\" by reading the characters literally. A search of Taiwan's Ministry of Education Revised Dictionary returned zero entries for the phrase, so that dictionary does not list it; We could not locate how the Contemporary Chinese Dictionary treats it, so no claim is made. The original sense is clear: cooling.",
    "origin": "Pulled out of context, \"flowing fire\" sounds like heat. And since the phrase is quoted every year in Gregorian July, when it really is hottest, the literal misreading is repeated each summer.",
    "instead": "For heat, use 酷暑难耐 (kùshǔ nánnài) or 暑气蒸腾 (shǔqì zhēngténg). To quote the ode properly, use 七月流火 for \"summer is waning, autumn is coming\" — and note it refers to the lunar seventh month, around mid-to-late August.",
    "sources": [
      {
        "label": "Book of Songs, \"Seventh Month\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E8%A9%A9%E7%B6%93/%E4%B8%83%E6%9C%88"
      },
      {
        "label": "Wang Li, \"Why study a little astronomy for classical Chinese\", 1984 (reprinted on Aisixiang)",
        "url": "https://www.aisixiang.com/data/164341.html"
      }
    ]
  },
  "word-bukan-zhilun": {
    "belief": "\"Bù kān zhī lùn\" (不刊之论) means a view too shocking or improper to be published",
    "truth": "刊 here means \"to pare away / revise\", so the phrase means an unalterable, indelible judgment — high praise.",
    "detail": "When writing on bamboo slips, an error was scraped away with a knife and rewritten; that act was 刊. So 不刊 means \"cannot be pared or altered\". Taiwan's Ministry of Education Revised Dictionary lists 不刊 as \"cannot be cut or revised; unalterable, indelible\", with two classical examples: Du Yu's preface to the Zuo Commentary calling the classics \"unalterable books\", and Liu Xie's Wenxin Diaolong (chapter \"Zong Jing\") calling them \"the eternal ultimate Way, unalterable grand teaching\". Its entry for 不刊之论 reads, roughly, \"a firm, unmovable, outstanding view that cannot be erased\".\n\nToday the best-known sense of 刊 is \"to publish\" (as in 刊登, 刊物), so 不刊 is easily read as \"not to be published\" — turning praise into suppression. That is an understandable misreading from an archaic sense, nothing more.\n\nWe found no dictionary that adds the \"unpublishable\" sense; all current glosses remain the positive \"indelible\". It is also wise not to read it as \"absolutely correct\": the old usage was about the classics' fixed status, and a little hedging is sensible when praising a modern argument.",
    "origin": "The living sense of 刊 is now \"publish\"; the older \"pare away\" meaning rarely appears in daily writing, so the idiom's logic is hidden. Words like 报刊 and 刊物 reinforce \"刊 = publish\".",
    "instead": "To praise a view as unshakable, 不刊之论 is right. To say something cannot be published, use 不宜刊登 (bù yí kāndēng) or 不予刊发. If readers might misunderstand, 不易之论 (bù yì zhī lùn) or \"定论\" is clearer.",
    "sources": [
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 不刊",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=20780"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 不刊之論",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=20782"
      },
      {
        "label": "Liu Xie, Wenxin Diaolong, \"Zong Jing\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E6%96%87%E5%BF%83%E9%9B%95%E9%BE%8D/%E5%AE%97%E7%B6%93"
      }
    ]
  },
  "word-zhishou-kere": {
    "belief": "\"Zhì shǒu kě rè\" (炙手可热) means hugely popular or in great demand",
    "truth": "It originally mocked the overbearing power of the great and powerful — so hot you can't touch it; the \"in demand\" sense came later.",
    "detail": "The source is Du Fu's poem \"Ballad of the Beautiful Women\", which describes a spring outing of Chang'an's high-ranking families and ends: \"Singeing-hot, their power has no equal; keep well back, lest the Chancellor take offence.\" Touch it and your hand burns: the heat is arrogance of rank, and the tone is satirical.\n\nTaiwan's Ministry of Education Revised Dictionary glosses it as \"one feels heat when the hand draws near; figuratively, of high status and blazing power\", citing Du Fu and a Ming-dynasty example; the \"popular\" sense is not listed there. We did not find the Contemporary Chinese Dictionary's treatment, so no claim is made about it.\n\nYet phrases like \"a hot new stock\" or \"a sought-after rising star\" are now common in the media. The meaning has travelled a long way, from a critical \"blazing authority\" to a neutral or even positive \"in demand\". Most users mean no harm; they simply haven't met the poem's context.",
    "origin": "In modern Chinese 热 most readily suggests \"hot, trending\", and 炙手 conjures \"people grabbing at it\", so the phrase is read as \"so wanted your hands burn reaching\". Repeated in finance and entertainment news, this reading has overtaken the original satire.",
    "instead": "For popularity, use 备受追捧 (bèi shòu zhuīpěng), 供不应求 or 抢手. For intimidating power, 炙手可热 or 权倾一时 (quán qīng yīshí). In formal writing, keep 炙手可热 for the \"blazing influence\" sense.",
    "sources": [
      {
        "label": "Du Fu, \"Ballad of the Beautiful Women\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E9%BA%97%E4%BA%BA%E8%A1%8C"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 炙手可熱",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%82%99%E6%89%8B%E5%8F%AF%E7%86%B1"
      }
    ]
  },
  "word-meilun-meihuan": {
    "belief": "\"Měi lún měi huàn\" (美轮美奂) can describe anything magnificent — scenery, performances, music",
    "truth": "It originally praised a building — lofty and splendid. Applying it to scenery or shows is a later extension; the dictionary We checked still glosses it as about houses.",
    "detail": "The source is the Book of Rites, \"Tangong, part 2\": when Xianwenzi of Jin finished building a new residence, the grandees came to congratulate him, and Zhang Lao said, \"How beautiful are its heights, how beautiful its splendor — here you may sing, here weep, here gather your clan.\" The praise is for a new house.\n\nTaiwan's Ministry of Education Revised Dictionary glosses it as \"describing a building decorated with supreme splendor\", and its example is a newly finished skyscraper. So the dictionary records the specific sense of buildings, not scenery, stages or music.\n\nIn practice, \"a stunning stage set\" or \"a dazzling light show\" in 美轮美奂 is now everywhere; most users just mean \"gorgeous\" without knowing it began as a building word. That is ordinary semantic broadening — a specific word borrowed for beauty in general. Whether and when dictionaries add the broader sense varies; here We only note the original and what the MOE dictionary currently records.",
    "origin": "Outside the idiom, 轮 and 奂 are almost never used alone, so readers grasp it only as an impression — \"sounds splendid\". The phrase slid from an architectural compliment into a general word for gorgeous.",
    "instead": "For buildings and homes, 美轮美奂 fits the original. For shows or scenery, 绚丽多彩 (xuànlì duōcǎi), 瑰丽 (guīlì) or 如梦如幻 are alternatives; a phrase like \"as grand as a palace\" also makes the reference clear.",
    "sources": [
      {
        "label": "Book of Rites, \"Tangong\" part 2 (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E6%AA%80%E5%BC%93%E4%B8%8B"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 美輪美奐",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%BE%8E%E8%BC%AA%E7%BE%8E%E5%A5%90"
      }
    ]
  },
  "word-xiaoshi-liaoliao": {
    "belief": "\"Xiǎoshí liǎoliǎo, dà wèibì jiā\" (小时了了，大未必佳) means clever kids usually turn out mediocre",
    "truth": "It began as a grown man's sneer at ten-year-old Kong Rong, answered on the spot by the boy; it is a jibe from an anecdote, not a rule.",
    "detail": "A Tale of the World, \"Speech\" chapter: at ten, Kong Rong (courtesy name Wenju) went to Luoyang with his father to visit the eminent Li Yuanli. Chen Wei, arriving later and told of the boy's quick remarks, said: \"Bright as a child, not necessarily good when grown.\" Wenju retorted at once: \"Then you must have been very bright as a child, sir!\" Chen Wei was thoroughly embarrassed.\n\nTaiwan's Ministry of Education Revised Dictionary has an entry glossed \"clever and sharp when young, but not necessarily accomplished as an adult\", citing the same passage. So the commonly used meaning is the dictionary one — not an error. What is lost is the context: a put-down to a child, and a retort that exposes its logic (by that reasoning, what became of the speaker?).\n\nWhether precocious children really tend to plateau is a separate question the idiom cannot answer: it comes from a line in a story, not from observation or data.",
    "origin": "The half-line is catchy and has a worldly \"don't praise children too soon\" ring, so people lifted it out of the story. They kept Chen Wei's half and forgot Kong Rong's reply, and a spat turned into a respectable \"truism\".",
    "instead": "When quoting, add Kong Rong's reply so the story comes with it. To talk about early brilliance versus later achievement, plain words like 早慧 (zǎohuì, precocious) and 后劲 (hòujìn, staying power) are more neutral. Never use it as a prediction about a child.",
    "sources": [
      {
        "label": "Liu Yiqing, A New Account of Tales of the World, \"Speech\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E4%B8%96%E8%AA%AA%E6%96%B0%E8%AA%9E/%E8%A8%80%E8%AA%9E"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 小時了了，大未必佳",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%B0%8F%E6%99%82%E4%BA%86%E4%BA%86"
      }
    ]
  },
  "word-wusuo-buyong-qiji": {
    "belief": "\"Wú suǒ bù yòng qí jí\" (无所不用其极) means using every dirty trick in the book",
    "truth": "In the Great Learning it is praise: the exemplary person gives his utmost everywhere in renewal. The bad-deeds sense is a later development, and the dictionary now lists both.",
    "detail": "The source is the Book of Rites, \"Great Learning\": \"On Tang's bathing basin was inscribed, 'If you can renew yourself one day, do so every day, and again every day.' The Announcement to Kang says, 'Make the people new.' The Odes say, 'Zhou is an old state, but its mandate is new.' Therefore the exemplary person leaves no place where he does not use his utmost.\" The subject is constant renewal, so the phrase means giving one's all at every point.\n\nTaiwan's Ministry of Education Revised Dictionary lists two senses: first \"leaving no place where one does not exert full effort\" (citing the Book of Rites), second \"using every vile means when doing wrong\", with a crime example. So the pejorative use is explicitly recognised.\n\nWhy the shift? \"Use its extreme\" reads like \"resort to extremes\", and 无所不 gives it force, so it sounds like \"stopping at nothing\". Such positive-to-negative drift is common: context gradually pushes the feel of a word to the other side.",
    "origin": "极 is associated with \"extreme\" and \"worst\"; 用其极 sounds like \"push the means to the limit\". The original \"do your best\" thus became \"stop at nothing\" — a plausible reading of the drift; We found no dedicated study.",
    "instead": "For \"doing everything you can\", use 竭尽全力 (jiéjìn quánlì) or 不遗余力. For \"stopping at nothing\", 无所不用其极 is now dictionary-approved. When quoting the Great Learning, make clear from context that it concerns self-renewal.",
    "sources": [
      {
        "label": "Book of Rites, \"Great Learning\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E7%A6%AE%E8%A8%98/%E5%A4%A7%E5%AD%B8"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 無所不用其極",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E7%84%A1%E6%89%80%E4%B8%8D%E7%94%A8%E5%85%B6%E6%A5%B5"
      }
    ]
  },
  "word-wen-bu-jiadian": {
    "belief": "\"Wén bù jiā diǎn\" (文不加点) describes writing with no punctuation",
    "truth": "It means writing a piece in one go without any corrections; 点 here is \"to strike out or mark over\", not punctuation.",
    "detail": "The source is the Book of the Later Han, biography of Mi Heng. At a banquet given by Huang She, someone presented a parrot, and Huang She raised his cup to Mi Heng: \"Master, please compose a fu on it to entertain our guests.\" Mi Heng took up his brush and wrote it, with \"no marks added (文无加点) and very fine language\" — that is, in one pass, without alteration, and beautifully.\n\nTaiwan's Ministry of Education Revised Dictionary defines 文不加点 as writing fluently without needing to revise, completing a piece in a single flow (with examples from the History of the Northern Dynasties and Romance of the Three Kingdoms), and lists 文无加点 as a variant. The 点 is the old editorial act of striking out or marking over mistaken characters.\n\nThe misreading is easy to see: today 加点 sounds like adding punctuation, and classical texts did not have standardised punctuation anyway. But the idiom praises fast, sure composition; it says nothing about missing punctuation.",
    "origin": "点 now most readily means a punctuation mark, and old books lacked modern punctuation, so the two ideas merge into \"text without punctuation\".",
    "instead": "To praise fluent composition, use 文不加点, 一挥而就 (yì huī ér jiù) or 下笔成章. To say a text has no punctuation, say so directly.",
    "sources": [
      {
        "label": "Book of the Later Han, biography of Mi Heng (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E5%BE%8C%E6%BC%A2%E6%9B%B8/%E5%8D%B780%E4%B8%8B"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 文不加點",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=162083"
      }
    ]
  },
  "word-weiyan-weixing": {
    "belief": "\"Wēi yán wēi xíng\" (危言危行) means dangerous words and risky deeds",
    "truth": "Here 危 means \"upright, straight\": the phrase describes words and conduct that are both upright — praise.",
    "detail": "The source is the Analects, \"Xian Wen\": \"When the state has the Way, be upright in speech and upright in action; when the state lacks the Way, remain upright in action but speak with care (孙 = 逊).\" In a well-governed state one speaks and acts straight; in a corrupt one, conduct stays straight while speech turns circumspect.\n\nTaiwan's Ministry of Education Revised Dictionary glosses it as \"words and conduct both upright and unbending\", citing the Analects and the Records of the Three Kingdoms (\"one who in office does not bend to the powerful... and keeps upright words and conduct at court, is what a wise ruler looks for\"). So the old usage commended frankness and rectitude.\n\nThe misreading is easy: today 危 almost only means \"dangerous\", and the very common 危言耸听 (\"alarmist talk\") sits next door, so 危言危行 gets read as \"scary talk and risky acts\" — which turns the meaning inside out.",
    "origin": "危 in daily Chinese has nearly narrowed to \"danger\", and 危言耸听 appears constantly, so 危言 is heard as \"frightening talk\" and drags 危言危行 along with it.",
    "instead": "For \"straightforward and principled\", 危言危行 is correct, though many readers won't know it; 正言直行 or 刚正不阿 (gāngzhèng bù'ē) are clearer. For alarmist talk, use 危言耸听 (wēiyán sǒngtīng).",
    "sources": [
      {
        "label": "Analects, \"Xian Wen\" (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E6%86%B2%E5%95%8F%E7%AC%AC%E5%8D%81%E5%9B%9B"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 危言危行",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E5%8D%B1%E8%A8%80%E5%8D%B1%E8%A1%8C"
      }
    ]
  },
  "word-doukou-nianhua": {
    "belief": "\"Dòukòu niánhuá\" (豆蔻年华) is a general term for lovely youth, for anyone in their early twenties",
    "truth": "It refers specifically to a girl of about thirteen or fourteen, from Du Mu's line about cardamom buds in early spring.",
    "detail": "Du Mu's \"Parting Gifts, No. 1\" opens: \"Slender and graceful, thirteen and a little more, like a cardamom bud at the branch tip in early spring; along the ten miles of Yangzhou's spring road, rolling up a pearl curtain, none compare.\" The girl is just past thirteen, like a cardamom bud opening in the second month. \"Cardamom\" then became a byword for a girl coming into bloom.\n\nTaiwan's Ministry of Education Revised Dictionary glosses it as \"figuratively, a young girl; mostly meaning a girl of thirteen or fourteen\", with the variant 荳蔻年华. The dictionary points at age and sex, but with the soft word \"mostly\".\n\nIn practice it is often used for youth in general, around twenty, and sometimes for boys — ordinary broadening over time. Strictly, though, the original sense is a girl of thirteen or fourteen, and using it for adults is a slight mismatch. We found no dictionary record of the broadened use.",
    "origin": "\"Cardamom\" sounds lovely and light, and 年华 is a generic word for years, so together they sound like a synonym for \"youth\"; the poem's source and the specific age \"thirteen and more\" got lost in the spread.",
    "instead": "For a girl of thirteen or fourteen, 豆蔻年华 fits exactly. For youth in general, use 青春年少 (qīngchūn niánshào), 韶华 (sháohuá) or 花样年华 (huāyàng niánhuá); there's no need to use it for boys.",
    "sources": [
      {
        "label": "Du Mu, \"Parting Gifts, No. 1\", Complete Tang Poems juan 523 (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E5%85%A8%E5%94%90%E8%A9%A9/%E5%8D%B7523"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 豆蔻年華",
        "url": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=43437"
      }
    ]
  },
  "word-jiujia-bugui": {
    "belief": "\"Jiǔ jiǎ bù guī\" (久假不归) just means borrowing something and not returning it for ages",
    "truth": "That is now its commonest sense, and dictionaries record it. But in Mencius it was about long \"borrowing\" the name of virtue without giving it back.",
    "detail": "The source is Mencius 7A: \"Yao and Shun were benevolent by nature; Tang and Wu embodied it; the Five Hegemons borrowed it. If one borrows for long and never returns it, how can one tell it is not truly one's own?\" So the line is about morality: borrowed virtue, practised long enough, may become one's own. 假 means \"to borrow\", and what is borrowed is a reputation for benevolence, not an object.\n\nTaiwan's Ministry of Education Revised Dictionary lists 久假不归 as \"borrowing another's thing and not returning it for a long time\", citing both Mencius and a Ming-dynasty story collection. So the dictionary records exactly today's everyday sense; it is not treated as an error. It is a classic case of an abstract saying being made concrete: from \"borrowed credentials\" to \"borrowed property\".",
    "origin": "假 no longer means \"to borrow\" in modern Chinese, so only the literal reading of the four characters is left, \"borrow for long, don't return\". The Ming example shows the shift is old, not recent.",
    "instead": "For unreturned borrowing, 久假不归 is dictionary-approved. For borrowed virtue or credentials, quote Mencius's full line, \"久假而不归，恶知其非有也\".",
    "sources": [
      {
        "label": "Mencius 7A (Wikisource)",
        "url": "https://zh.wikisource.org/wiki/%E5%AD%9F%E5%AD%90/%E7%9B%A1%E5%BF%83%E4%B8%8A"
      },
      {
        "label": "Taiwan Ministry of Education Revised Dictionary — 久假不歸",
        "url": "https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E4%B9%85%E5%81%87%E4%B8%8D%E6%AD%B8"
      }
    ]
  }
}
