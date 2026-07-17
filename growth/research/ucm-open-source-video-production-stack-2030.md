# UCM Open-Source Video Production Stack: 2030 Standard

## Decision

UCM should stop producing automated still-image slideshows. They look inexpensive, flatten the company story and cannot prove real cleaning work.

The correct open-source approach is a connected production stack:

> Real UCM footage + real human voice + automated footage intelligence + modern motion design + human editorial judgement + controlled export

No single repository does all of this brilliantly. The best practical stack combines mature specialist tools and keeps UCM's existing Media Engine as the orchestrator.

## Recommended Stack

| Layer | Tool | License | UCM job | Decision |
| --- | --- | --- | --- | --- |
| Human finishing | Kdenlive | GPL-3.0 | Final timeline, pacing, colour, audio, transitions and review | Adopt now |
| Rough-cut automation | Auto-Editor | Unlicense/public domain code | Remove dead air, detect loudness/motion and export a Kdenlive timeline | Adopt now |
| Transcription | WhisperX | BSD-2-Clause | Transcript, word-level timing, subtitles and searchable spoken content | Pilot now |
| Shot detection | PySceneDetect | BSD-3-Clause | Detect cuts, split footage and create shot indexes | Adopt now |
| Motion design | Motion Canvas | MIT | Voice-synchronised typography, diagrams, proof overlays and branded data moments | Pilot now |
| Media processing | FFmpeg | LGPL/GPL depending build | Proxies, crops, audio normalisation, codecs and platform exports | Keep as core |
| Subject tracking | SAM 2 | Apache-2.0 | Track a cleaner, tool or surface for masks and restrained graphics | Later GPU pilot |
| Agentic research | VideoAgent | MIT | Study storyboard planning, clip retrieval and agent workflow ideas | Sandbox only |

## Why This Is The Right Answer

### Kdenlive Is The Production Centre

Kdenlive is a mature free and open-source non-linear editor built on MLT. It gives a human editor control over the thing an agent still cannot reliably judge: whether the film feels credible, current and worth watching.

Use Kdenlive for:

- Selecting the final performance from Carlos or another speaker.
- Building visual rhythm from real UCM footage.
- Colour correction and a consistent UCM look.
- Dialogue, room sound, music and sound-design balance.
- Professional transitions used sparingly.
- Final compliance and consent review.
- 9:16, 1:1 and 16:9 versions from one approved story.

Auto-Editor can export Kdenlive timelines, so repetitive first-pass cutting can be automated without trapping the team in an automatic final edit.

### Motion Canvas Creates The 2030 Layer

Motion Canvas is designed for animations synchronised to voiceovers. Use it for the visual intelligence layer, not as a replacement for footage:

- Clean animated UCM titles.
- Tracking labels tied to real surfaces or process steps.
- Before/after readings and Proof Passport evidence.
- Location, service and result data.
- Minimal line graphics, split screens and controlled reveals.
- A repeatable UCM motion language across every campaign.

The target mix is at least 80% real moving footage and no more than 20% designed graphics. Still images should only appear when they are genuine archive or evidence material and the movement is editorially justified.

### WhisperX And PySceneDetect Make Footage Searchable

WhisperX can create a transcript with detailed timing. PySceneDetect can detect scene changes and return shot boundaries. Combined, the Media Engine can answer useful production questions:

- Where does Carlos deliver the strongest sentence?
- Which shots show cleaning action rather than posing?
- Where is the ATP swab, result, checklist or handover proof?
- Which clip contains a client-approved statement?
- Which shots are stable enough for vertical reframing?

Word timings still require human review. An open WhisperX issue documents alignment errors in some workflows, so subtitle accuracy must be checked against the final voice recording.

## VideoAgent Verdict

VideoAgent is genuinely interesting and MIT licensed. It offers intent analysis, storyboard queries, clip retrieval and graph-planned video workflows. It supports Windows/Linux and states an 8 GB GPU requirement.

It is not the immediate production answer because:

- It has no published releases.
- Its setup downloads several large speech, voice and multimodal models.
- Its documented agent router requires Claude and its other functions reference GPT, Gemini and DeepSeek API keys.
- The code is free, but the demonstrated operating stack is not cost-free.
- Its demos focus heavily on remaking existing entertainment content, which is not UCM's commercial-proof use case.
- It cannot supply taste, genuine site footage, consent or factual proof.

Decision: sandbox it later against UCM-owned footage. Reuse architectural ideas if useful; do not make it the production dependency.

## ViMax Verdict

ViMax is a newer MIT-licensed agentic video-generation framework with script, storyboard, reference management and multi-shot planning. Its current examples configure paid LLM, image and video-generation APIs. It is useful research for synthetic story films, not the core of a cleaning company that must prove real work.

Decision: monitor only. Generated footage may support an abstract transition or concept, but it must never impersonate a client site, employee, cleaning result or product test.

## Tools Rejected For The Core Stack

### NarratoAI

The software may be downloadable, but its repository states that it is for learning and research and cannot be used commercially without authorisation. It is therefore unsuitable for UCM production.

### MoneyPrinter-Style Generators

These optimise for volume, generic stock footage and automated narration. That is exactly the visual language UCM must leave behind.

### Desktop Text-To-Speech

The first reel proved the problem. Flat synthetic narration destroys authority. Carlos, a UCM team member, a client with permission or a properly directed professional human voice should carry the films.

## UCM 2030 Creative Standard

Every flagship UCM film must meet these rules:

1. A human face, human action or striking real result appears in the first second.
2. The opening creates tension: an unproven clean, a hidden detail, a client risk or a transformation.
3. Real footage drives the story. No generated-still montage.
4. Shots change because the idea changes, not because a timer expires.
5. Use wide, medium, close and macro footage to create depth.
6. Capture hands, tools, surfaces, movement, evidence and decisions.
7. Sound design includes real cloth movement, equipment, doors, footsteps and room tone.
8. Music supports the edit but never carries a weak story.
9. Typography is concise, animated and connected to the image.
10. Captions are checked by a person and designed for muted viewing.
11. Every claim is linked to an approved product, process, record or client permission.
12. The ending gives one action, not five competing calls to action.

## Footage Carlos And UCM Need To Capture

Use a recent phone capable of 4K recording or a dedicated camera. Capture both vertical and horizontal versions where practical.

### Founder Material

- Carlos walking into a real approved site.
- Carlos inspecting a space rather than simply talking to camera.
- Three takes of every script section: direct, conversational and forceful.
- Silent reaction shots, listening, reviewing and speaking with the team.

### Cleaning Action

- Wide shot establishing the building and room.
- Medium shot showing the operative and task.
- Macro shot of the actual surface, edge, tool and movement.
- Before condition with honest imperfections.
- Correct physical cleaning, product use and contact time where relevant.
- Final result from the same angle.

### Proof

- Site walk and scope creation.
- ATP swab at a defined test point.
- Real instrument reading without invented numbers.
- Checklist completion and approved photograph.
- Proof Passport or demonstration record.
- An issue being identified, escalated and resolved.

### Property Care

- Minor maintenance observation.
- Handover check.
- Communal-area inspection.
- Technical cleaning detail.
- Supervisor quality review.

## Capture Rules

- Record 4K where storage permits; deliver 25 or 50 fps consistently.
- Lock exposure and white balance where the device allows.
- Clean the camera lens before every location.
- Avoid digital zoom; move the camera or change lens.
- Hold each usable action for at least five seconds before moving.
- Record several seconds before and after the action.
- Use a tripod, gimbal or stable body position for deliberate movement.
- Record clean voice with a lapel or directional microphone.
- Capture 30 seconds of room tone at each site.
- Do not film personal data, access codes, client screens or unapproved faces/logos.

## New Media Engine Workflow

```text
Approved UCM footage and human voice
  -> checksum, consent and claims metadata
  -> proxy and audio preparation with FFmpeg
  -> rough speech cut with Auto-Editor
  -> transcript and captions with WhisperX
  -> scene index with PySceneDetect
  -> UCM agent creates a shot shortlist and storyboard
  -> Motion Canvas renders only the required graphic layers
  -> Kdenlive human edit, sound, colour and final judgement
  -> independent claims and consent review
  -> FFmpeg platform exports
  -> performance and qualified-lead measurement
```

The agent prepares choices. It does not publish, invent proof or make the final creative judgement.

## First Production Sprint

### Day 1: Voice And Shot Plan

- Receive the three human voice recordings.
- Select the first script to produce.
- Mark each sentence with required proof and footage.
- Create the Kdenlive project structure and proxy settings.

### Day 2: Real UCM Shoot

- Record Carlos and one approved real service visit.
- Capture wide, medium, close and macro coverage.
- Capture clean room tone and practical sounds.

### Day 3: Intelligence Pass

- Run Auto-Editor, WhisperX and PySceneDetect.
- Create a searchable shot manifest.
- Produce three alternative opening sequences.

### Day 4: Human Edit

- Build the story in Kdenlive.
- Add restrained Motion Canvas graphics.
- Mix the real voice and sound.

### Day 5: Review And Export

- Claims, consent, continuity and mobile-legibility review.
- Export 9:16 flagship, 1:1 feed and 16:9 website versions.
- Create platform captions and tracked CTA.

## Acceptance Gate

Do not publish unless:

- The first five seconds work without sound.
- The voice sounds human, confident and properly recorded.
- At least 80% of the film is real approved UCM moving footage.
- No shot falsely implies a real client, employee or result.
- Captions are accurate and fit mobile screens.
- The film has one clear buyer, one promise and one CTA.
- Claims and consent pass independently.
- Carlos approves the final cut.

## Official Repositories

- Kdenlive: https://github.com/KDE/kdenlive
- Auto-Editor: https://github.com/WyattBlue/auto-editor
- WhisperX: https://github.com/m-bain/whisperX
- PySceneDetect: https://github.com/Breakthrough/PySceneDetect
- Motion Canvas: https://github.com/motion-canvas/motion-canvas
- FFmpeg: https://github.com/FFmpeg/FFmpeg
- SAM 2: https://github.com/facebookresearch/sam2
- VideoAgent: https://github.com/HKUDS/VideoAgent
- ViMax: https://github.com/HKUDS/ViMax
