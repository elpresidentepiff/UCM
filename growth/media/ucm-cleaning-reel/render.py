from __future__ import annotations

import math
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageEnhance, ImageFont


ROOT = Path(__file__).resolve().parent
WIDTH = 1080
HEIGHT = 1920
FPS = 30
VOICEOVER = ROOT / "ucm-cleaning-voiceover.wav"
SILENT_VIDEO = ROOT / "ucm-cleaning-services-reel-v1-silent.mp4"
OUTPUT_VIDEO = ROOT / "ucm-cleaning-services-reel-v1.mp4"

FONT_REGULAR = Path(r"C:\Windows\Fonts\segoeui.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")

FOREST = (7, 49, 39)
SAGE = (190, 205, 164)
CYAN = (78, 220, 215)
WHITE = (247, 249, 246)
INK = (14, 18, 17)


SCENES = [
    {
        "start": 0.0,
        "end": 6.2,
        "image": "01-professional-cleaning.png",
        "kicker": "UCM CLEANING SERVICES",
        "headline": "LOOKS CLEAN.",
        "subhead": "But can you prove it?",
        "position": "top",
    },
    {
        "start": 6.2,
        "end": 13.0,
        "image": "01-professional-cleaning.png",
        "kicker": "LONDON COMMERCIAL CLEANING",
        "headline": "PROFESSIONAL PEOPLE.",
        "subhead": "Clear methods. Visible proof.",
        "position": "top",
    },
    {
        "start": 13.0,
        "end": 19.5,
        "image": "02-atp-verification.png",
        "kicker": "EVIDENCE-LED SERVICE",
        "headline": "BEFORE + AFTER CHECKS",
        "subhead": "Selected high-touch surfaces.",
        "position": "top",
    },
    {
        "start": 19.5,
        "end": 26.2,
        "image": "02-atp-verification.png",
        "kicker": "CONTROLLED PILOT",
        "headline": "HOCl DISINFECTION",
        "subhead": "Suitable surfaces. Approved products. Human review.",
        "position": "top",
    },
    {
        "start": 26.2,
        "end": 30.2,
        "image": "03-inspected-result.png",
        "kicker": "THE UCM STANDARD",
        "headline": "CLEANED.\nDISINFECTED.",
        "subhead": "Checked. Documented.",
        "position": "top",
    },
    {
        "start": 30.2,
        "end": 34.0,
        "image": "03-inspected-result.png",
        "kicker": "UCM CLEANING SERVICES",
        "headline": "REQUEST A QUOTE",
        "subhead": "ucmservices.co.uk",
        "position": "top",
    },
]


CAPTIONS = [
    (0.0, 3.6, "Clean should mean more than looking tidy."),
    (3.6, 10.4, "At UCM Cleaning Services, we clean London workplaces with professional people, clear methods and visible proof."),
    (10.4, 16.8, "Selected high-touch surfaces can be checked before and after cleaning, so clients see what changed."),
    (16.8, 25.8, "We are developing controlled HOCl disinfection for suitable surfaces, using approved products, specified contact times and human review."),
    (25.8, 29.6, "Cleaned. Disinfected. Checked. Documented."),
    (29.6, 34.0, "Request your UCM cleaning quote at ucmservices.co.uk."),
]


def build_gradient() -> Image.Image:
    alpha = Image.new("L", (1, HEIGHT))
    alpha.putdata(
        [
            int(
                max(
                    max(0.0, 1.0 - y / 860.0) * 205,
                    max(0.0, (y - 1230.0) / 690.0) * 220,
                )
            )
            for y in range(HEIGHT)
        ]
    )
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (4, 24, 19, 0))
    overlay.putalpha(alpha.resize((WIDTH, HEIGHT)))
    return overlay


GRADIENT_OVERLAY = build_gradient()


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def ease(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3 - 2 * value)


def prepare_image(image: Image.Image) -> Image.Image:
    scale = max(WIDTH / image.width, HEIGHT / image.height) * 1.10
    size = (math.ceil(image.width * scale), math.ceil(image.height * scale))
    return image.resize(size, Image.Resampling.LANCZOS)


def cover(image: Image.Image, progress: float, direction: int) -> Image.Image:
    max_x = max(0, image.width - WIDTH)
    max_y = max(0, image.height - HEIGHT)
    x_start = int(max_x * (0.35 if direction > 0 else 0.65))
    x_end = int(max_x * (0.60 if direction > 0 else 0.40))
    y_start = int(max_y * 0.25)
    y_end = int(max_y * 0.52)
    x = int(x_start + (x_end - x_start) * ease(progress))
    y = int(y_start + (y_end - y_start) * ease(progress))
    return image.crop((x, y, x + WIDTH, y + HEIGHT))


def add_gradient(frame: Image.Image) -> None:
    frame.alpha_composite(GRADIENT_OVERLAY)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, text_font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if draw.textbbox((0, 0), candidate, font=text_font)[2] <= max_width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def draw_brand(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle((56, 52, 220, 112), radius=8, fill=FOREST + (238,), outline=SAGE + (180,), width=2)
    draw.text((78, 64), "UCM", font=font(FONT_BOLD, 38), fill=SAGE)
    draw.text((242, 65), "CLEANING SERVICES", font=font(FONT_BOLD, 25), fill=WHITE)


def draw_scene_text(frame: Image.Image, scene: dict, scene_progress: float) -> None:
    draw = ImageDraw.Draw(frame)
    alpha = int(255 * ease(min(1.0, scene_progress / 0.12)))
    shift = int(26 * (1.0 - ease(min(1.0, scene_progress / 0.18))))

    kicker_font = font(FONT_BOLD, 29)
    headline_size = 82 if len(scene["headline"]) < 19 else 72
    headline_font = font(FONT_BOLD, headline_size)
    subhead_font = font(FONT_REGULAR, 39)

    y = 220 + shift
    draw.rectangle((58, y + 4, 74, y + 44), fill=CYAN + (alpha,))
    draw.text((94, y), scene["kicker"], font=kicker_font, fill=CYAN + (alpha,))
    y += 78

    for line in wrap_text(draw, scene["headline"], headline_font, 930):
        draw.text((58, y), line, font=headline_font, fill=WHITE + (alpha,), stroke_width=1, stroke_fill=INK + (alpha,))
        y += headline_size + 8

    y += 12
    for line in wrap_text(draw, scene["subhead"], subhead_font, 900):
        draw.text((60, y), line, font=subhead_font, fill=SAGE + (alpha,))
        y += 51


def active_caption(time_s: float) -> str:
    for start, end, text in CAPTIONS:
        if start <= time_s < end:
            return text
    return ""


def draw_caption(frame: Image.Image, text: str) -> None:
    if not text:
        return
    draw = ImageDraw.Draw(frame)
    caption_font = font(FONT_BOLD, 36)
    lines = wrap_text(draw, text, caption_font, 900)
    line_height = 48
    box_height = len(lines) * line_height + 48
    y0 = 1602 - box_height
    draw.rounded_rectangle((52, y0, 1028, 1602), radius=10, fill=(7, 25, 20, 220), outline=(190, 205, 164, 90), width=2)
    y = y0 + 24
    for line in lines:
        box = draw.textbbox((0, 0), line, font=caption_font)
        x = (WIDTH - (box[2] - box[0])) // 2
        draw.text((x, y), line, font=caption_font, fill=WHITE)
        y += line_height


def draw_footer(frame: Image.Image, time_s: float) -> None:
    draw = ImageDraw.Draw(frame)
    draw.text((58, 1831), "CAMPAIGN CONCEPT", font=font(FONT_BOLD, 22), fill=(255, 255, 255, 175))
    progress = max(0.0, min(1.0, time_s / SCENES[-1]["end"]))
    draw.rectangle((58, 1800, 1022, 1806), fill=(255, 255, 255, 55))
    draw.rectangle((58, 1800, 58 + int(964 * progress), 1806), fill=CYAN)
    if time_s >= 30.2:
        disclaimer = "HOCl pilot: exact product and claims subject to approval. Use disinfectants safely; always read the label."
        lines = wrap_text(draw, disclaimer, font(FONT_REGULAR, 22), 940)
        y = 1660
        for line in lines:
            draw.text((58, y), line, font=font(FONT_REGULAR, 22), fill=(255, 255, 255, 195))
            y += 30


def render_frame(time_s: float, images: dict[str, Image.Image]) -> bytes:
    scene_index = next((index for index, scene in enumerate(SCENES) if scene["start"] <= time_s < scene["end"]), len(SCENES) - 1)
    scene = SCENES[scene_index]
    duration = scene["end"] - scene["start"]
    scene_progress = (time_s - scene["start"]) / duration

    current = cover(images[scene["image"]], scene_progress, 1 if scene_index % 2 == 0 else -1).convert("RGBA")
    current = ImageEnhance.Color(current).enhance(0.90)
    current = ImageEnhance.Contrast(current).enhance(1.05)

    transition = 0.45
    if scene_index > 0 and time_s - scene["start"] < transition:
        previous = SCENES[scene_index - 1]
        previous_progress = min(1.0, (time_s - previous["start"]) / (previous["end"] - previous["start"]))
        previous_frame = cover(images[previous["image"]], previous_progress, -1 if scene_index % 2 == 0 else 1).convert("RGBA")
        mix = ease((time_s - scene["start"]) / transition)
        current = Image.blend(previous_frame, current, mix)

    add_gradient(current)
    draw = ImageDraw.Draw(current)
    draw_brand(draw)
    draw_scene_text(current, scene, scene_progress)
    draw_caption(current, active_caption(time_s))
    draw_footer(current, time_s)
    return current.convert("RGB").tobytes()


def voiceover_duration() -> float:
    with wave.open(str(VOICEOVER), "rb") as stream:
        return stream.getnframes() / stream.getframerate()


def main() -> None:
    if not VOICEOVER.exists():
        raise FileNotFoundError(f"Generate voiceover first: {VOICEOVER}")

    images = {
        path.name: prepare_image(Image.open(path).convert("RGB"))
        for path in sorted((ROOT / "assets").glob("*.png"))
    }
    missing = {scene["image"] for scene in SCENES} - images.keys()
    if missing:
        raise FileNotFoundError(f"Missing scene assets: {sorted(missing)}")

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    duration = max(SCENES[-1]["end"], voiceover_duration() + 0.5)
    total_frames = math.ceil(duration * FPS)

    SILENT_VIDEO.unlink(missing_ok=True)
    OUTPUT_VIDEO.unlink(missing_ok=True)

    writer = imageio_ffmpeg.write_frames(
        str(SILENT_VIDEO),
        (WIDTH, HEIGHT),
        fps=FPS,
        codec="libx264",
        quality=6,
        pix_fmt_in="rgb24",
        pix_fmt_out="yuv420p",
        macro_block_size=2,
        ffmpeg_log_level="warning",
        output_params=["-movflags", "+faststart", "-preset", "medium"],
    )
    writer.send(None)
    try:
        for frame_number in range(total_frames):
            writer.send(render_frame(frame_number / FPS, images))
    finally:
        writer.close()

    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i",
            str(SILENT_VIDEO),
            "-i",
            str(VOICEOVER),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-af",
            "apad=pad_dur=1.5,loudnorm=I=-16:LRA=7:TP=-1.5",
            "-shortest",
            "-movflags",
            "+faststart",
            str(OUTPUT_VIDEO),
        ],
        check=True,
    )
    SILENT_VIDEO.unlink(missing_ok=True)
    print(f"Rendered {OUTPUT_VIDEO} ({duration:.2f}s, {total_frames} frames)")


if __name__ == "__main__":
    main()
