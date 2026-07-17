# UCM Cleaning Services Reel V1

Vertical campaign concept for Instagram Reels, Facebook, LinkedIn and YouTube Shorts.

## Creative Position

The film presents UCM as a professional London cleaning company built around people, method and visible proof. HOCl appears only as a controlled service in development because the exact product dossier and approved claims are not yet available.

Core line:

> Cleaned. Disinfected. Checked. Documented.

## Files

- `ucm-cleaning-services-reel-v1.mp4` - rendered 1080 x 1920 social video.
- `voiceover.txt` - approved evidence-safe narration draft.
- `subtitles.srt` - platform caption file.
- `render.py` - deterministic video renderer.
- `assets/` - generated concept imagery; these are not real UCM staff or client sites.

## Publication Gate

This is a campaign concept, not final client evidence. Before public paid promotion:

1. Replace generated imagery with approved UCM job footage where possible.
2. Confirm the exact HOCl product, UK status, label, SDS and permitted claims.
3. Confirm the quote URL and tracking parameters.
4. Obtain staff, site and client media permission.
5. Run the claims and consent review.

## Rebuild

The renderer requires Python, Pillow, `imageio-ffmpeg` and the generated WAV voiceover.

```powershell
python render.py
```
