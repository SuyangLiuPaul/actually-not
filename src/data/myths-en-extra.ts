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
  }
}
