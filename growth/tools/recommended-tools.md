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

### FFmpeg

Use for:

- Cutting clips.
- Resizing to 9:16.
- Adding basic overlays.
- Exporting platform-ready files.

### Whisper

Use for:

- Transcribing voiceovers.
- Transcribing testimonials.
- Finding short clip moments in longer footage.

### VideoAgent

Candidate tool:

- GitHub: https://github.com/HKUDS/VideoAgent

Use only after sandbox testing. It is promising for video understanding, editing and remaking workflows, but UCM should not rely on it for production publishing until it is tested with real short-form cleaning assets.

### Canva / CapCut / Adobe Express

Use as practical human-in-the-loop design tools while the AI media center matures.

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
- Whisper transcription.
- VideoAgent sandbox.
- Meta/GA4/GBP metric import.
- Learning loop dashboard.

