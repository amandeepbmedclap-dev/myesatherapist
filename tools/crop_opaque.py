"""Crop a cut-out image (transparent wavy edges) to its largest fully opaque rectangle.
Usage: python3 tools/crop_opaque.py <in.webp> <out.webp>"""
import sys
import numpy as np
from PIL import Image

def largest_rect(mask):
    h, w = mask.shape
    heights = np.zeros(w, dtype=int)
    best = (0, 0, 0, 0, 0)  # area, top, left, bottom, right
    for y in range(h):
        heights = np.where(mask[y], heights + 1, 0)
        stack = []
        for x in range(w + 1):
            cur = heights[x] if x < w else 0
            start = x
            while stack and stack[-1][1] >= cur:
                sx, sh = stack.pop()
                area = sh * (x - sx)
                if area > best[0]:
                    best = (area, y - sh + 1, sx, y + 1, x)
                start = sx
            stack.append((start, cur))
    return best

def crop(src, dst, step=4):
    im = Image.open(src).convert("RGBA")
    a = np.array(im)[:, :, 3]
    small = a[::step, ::step] > 250
    _, t, l, b, r = largest_rect(small)
    box = (l * step + step, t * step + step, min(im.width, r * step) - step, min(im.height, b * step) - step)
    out = im.crop(box).convert("RGB")
    out.save(dst, "WEBP", quality=88)
    return box, out.size

if __name__ == "__main__":
    print(crop(sys.argv[1], sys.argv[2]))
