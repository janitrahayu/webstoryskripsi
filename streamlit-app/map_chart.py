"""Peta skematik 31 kecamatan dari path SVG (bukan batas resmi)."""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import PathPatch
from matplotlib.path import Path as MplPath
from matplotlib.colors import LinearSegmentedColormap, Normalize
from matplotlib.cm import ScalarMappable

ROOT = Path(__file__).parent
PADDY = "#1F4D3A"
PAPER = "#F4F0E6"
INK = "#1A1C16"


def _parse(d: str):
    body = d.replace("M ", "").replace(" Z", "").replace("Z", "")
    pts = []
    for part in body.split(" L "):
        x, y = part.split(",")
        pts.append((float(x), -float(y)))  # flip Y for matplotlib
    return pts


def draw_map(values: dict[str, float], title: str, unit: str):
    with open(ROOT / "kecamatan-paths.json", encoding="utf-8") as f:
        feats = json.load(f)

    nums = [values.get(p["id"], 0.0) for p in feats]
    vmin, vmax = min(nums), max(nums)
    cmap = LinearSegmentedColormap.from_list("paddy", ["#E8E1D1", "#5E8A6E", PADDY])
    norm = Normalize(vmin=vmin, vmax=vmax)

    fig, ax = plt.subplots(figsize=(9.2, 6.4), facecolor=PAPER)
    ax.set_facecolor("#E8E1D1")
    for feat in feats:
        pts = _parse(feat["d"])
        codes = [MplPath.MOVETO] + [MplPath.LINETO] * (len(pts) - 2) + [MplPath.CLOSEPOLY]
        path = MplPath(pts + [pts[0]], codes)
        color = cmap(norm(values.get(feat["id"], vmin)))
        ax.add_patch(PathPatch(path, facecolor=color, edgecolor=PAPER, lw=0.6))
        if values.get(feat["id"], 0) >= sorted(nums, reverse=True)[4]:
            ax.text(feat["cx"], -feat["cy"], feat["id"], ha="center", va="center",
                    fontsize=6.5, color=PAPER, fontweight="bold")

    ax.set_aspect("equal")
    ax.autoscale()
    ax.axis("off")
    ax.set_title(title, loc="left", fontsize=13, color=INK, pad=8)
    fig.colorbar(ScalarMappable(norm=norm, cmap=cmap), ax=ax, fraction=0.035, pad=0.02,
                 label=unit)
    fig.tight_layout()
    return fig
