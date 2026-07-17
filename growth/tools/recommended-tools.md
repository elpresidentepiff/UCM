# Recommended Tools For UCM Media Center

## Immediate Tools

### GitHub

Use this repo as the source of truth for:

- Campaign briefs.
- Content calendars.
- SEO/GEO briefs.
- Media manifests.
- Approval status.
- Learnings.

### Google Drive

Use for client asset folders:

- Raw job photos.
- Team photos.
- Before/after assets.
- Reviews.
- Brand files.
- Compliance proof.

### Meta Business Suite / Ads Manager

Use for:

- Instagram/Facebook publishing.
- Paid campaign tests.
- Retargeting.
- Lead forms.
- Creative performance.

### GA4 + Search Console + Google Business Profile

Use for:

- Quote forms.
- Phone clicks.
- Landing-page performance.
- Local search visibility.
- GBP calls and website clicks.

## Media Production Tools

### Kdenlive

Primary human finishing editor. Use for final story, pacing, colour, sound, transitions and approval. Kdenlive is free, open source and can receive timeline exports from Auto-Editor.

### Auto-Editor

Use for first-pass removal of dead air and motion/loudness-based rough cuts. Export to Kdenlive; never treat the automatic cut as the finished film.

### Motion Canvas

Use for modern voice-synchronised UCM typography, evidence overlays, diagrams and data moments. Graphics support real footage rather than replacing it.

### FFmpeg

Use for:

- Cutting clips.
- Resizing to 9:16.
- Adding basic overlays.
- Exporting platform-ready files.

### WhisperX

Use for:

- Time-aligned transcription and captions.
- Searching Carlos interviews and testimonials.
- Finding spoken moments in longer footage.

All transcripts and word timing require human review.

### PySceneDetect

Use for content-aware shot detection, footage splitting and a searchable shot manifest.

### VideoAgent

Candidate tool:

- GitHub: https://github.com/HKUDS/VideoAgent

Use only after sandbox testing. The repository is MIT licensed, but its documented workflow requires several large local models plus Claude, GPT, Gemini and DeepSeek API configuration. It has no published release. Study its planning and retrieval architecture; do not make it a production dependency.

### SAM 2

Later GPU pilot for tracking people, tools or surfaces so graphics can follow real footage. It must not be used to fabricate or conceal service evidence.

Detailed decision: `growth/research/ucm-open-source-video-production-stack-2030.md`.

## App Stack Recommendation

### Phase 1

- Static HTML/CSS/JS prototype.
- JSON data files.
- GitHub repo for version control.

### Phase 2

- Next.js frontend.
- Supabase database.
- Supabase Auth.
- Storage bucket for media assets.
- Campaign manifest tables.
- Approval queue.

### Phase 3

- Worker queue.
- FFmpeg pipeline.
- WhisperX transcription.
- PySceneDetect shot indexing.
- Auto-Editor rough-cut export.
- Motion Canvas graphics.
- Kdenlive human finishing.
- VideoAgent sandbox.
- Meta/GA4/GBP metric import.
- Learning loop dashboard.

