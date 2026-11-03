"""Makes the link-preview images (og:image) in assets/images/social/.

Social sites show 1200x630 images without cropping and handle WebP unevenly, so each card
is a 1200x630 JPEG: the whole screenshot, scaled to fit inside a 24 px margin on the site
background colour.

- dusk-studio.jpg: the console screenshot; used by every page except plugin pages
- <slug>.jpg: the `screenshot` image of each page in _plugins/

Run from the repository root after changing any of those screenshots (needs Pillow):

    python3 .github/scripts/social-cards.py
"""
import glob
import os
import re

from PIL import Image

WIDTH, HEIGHT, MARGIN = 1200, 630, 24
BACKGROUND = (0x17, 0x18, 0x16)  # --color-bg in assets/css/showcase.css
OUT = "assets/images/social"

sources = {"dusk-studio": "assets/images/studio/console.webp"}
for page in sorted(glob.glob("_plugins/*.md")):
    front = open(page, encoding="utf-8").read().split("\n---", 1)[0]
    slug = re.search(r"^slug: *(\S+)", front, re.M)
    shot = re.search(r"^screenshot: *(\S+)", front, re.M)
    if slug and shot:
        sources[slug.group(1)] = shot.group(1).lstrip("/")

os.makedirs(OUT, exist_ok=True)
for name, src in sources.items():
    image = Image.open(src).convert("RGB")
    scale = min((WIDTH - 2 * MARGIN) / image.width, (HEIGHT - 2 * MARGIN) / image.height)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    card = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    card.paste(image, ((WIDTH - image.width) // 2, (HEIGHT - image.height) // 2))
    path = f"{OUT}/{name}.jpg"
    card.save(path, "JPEG", quality=88, subsampling=0, optimize=True, progressive=True)
    print(f"{path}  {os.path.getsize(path) // 1024} KB  from {src}")
