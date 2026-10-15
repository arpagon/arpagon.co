#!/usr/bin/env python3
"""Generate public/og.png (1200x630) from public/media/me-480.webp. Requires Pillow."""
import math, random, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
BG, GOLD = (11, 11, 13), (201, 162, 74)


def fc(q):
    try:
        return subprocess.check_output(["fc-match", "-f", "%{file}", q]).decode()
    except Exception:
        return ""


def font(q, size):
    try:
        return ImageFont.truetype(fc(q), size)
    except OSError:
        return ImageFont.load_default()


im = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(im)
random.seed(7)
for i in range(2600):  # subtle starry-night swirl, same field as the site
    x, y = random.random() * W * 0.55, random.random() * H
    for _ in range(14):
        cx, cy = W * 0.22, H * 0.45
        dx, dy = x - cx, y - cy
        r = math.hypot(dx, dy) + 1
        k = math.exp(-r * r / (2 * (H * 0.33) ** 2)) * 2.4
        vx, vy = 0.55 - dy / r * k, dx / r * k + math.sin(x * 0.0045 + y * 0.0021) * 0.35
        n = math.hypot(vx, vy)
        nx, ny = x + vx / n * 1.6, y + vy / n * 1.6
        c, a = (GOLD, 0.10) if i % 10 == 0 else ((230, 230, 240), 0.06)
        d.line([(x, y), (nx, ny)], fill=tuple(int(BG[j] * (1 - a) + c[j] * a) for j in range(3)), width=1)
        x, y = nx, ny

ph = Image.open("public/media/me-480.webp").convert("RGBA").resize((300, 300))
mask = Image.new("L", (300, 300), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 299, 299), fill=255)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse((86, 151, 414, 479), fill=GOLD + (70,))
im = Image.alpha_composite(im.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(24)))
d = ImageDraw.Draw(im)
d.ellipse((96, 161, 404, 469), outline=GOLD, width=5)
im.paste(ph, (100, 165), mask)
d.text((470, 215), "Sebastián Rojo", font=font("Inter:bold", 64), fill=(242, 242, 242))
d.text((472, 300), "Co-founder & CTO at Emilia AI", font=font("Inter:semibold", 32), fill=GOLD)
d.text((472, 360), "AI copilots for the physical world,", font=font("Inter", 28), fill=(170, 170, 176))
d.text((472, 398), "and open-source tools for the agents that build them.", font=font("Inter", 24), fill=(170, 170, 176))
d.text((472, 480), "> arpagon.co", font=font("monospace:bold", 26), fill=(233, 217, 174))
im.convert("RGB").save("public/og.png", optimize=True)
print("public/og.png")
