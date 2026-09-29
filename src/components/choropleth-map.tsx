import { useMemo, useState } from "react";
import { KEC_BY_NAME, type Kecamatan } from "@/data/kecamatan";
import { formatPct, formatTon } from "@/lib/utils";
import { geoMercator, geoPath } from "d3-geo";
import geojsonData from "@/data/batas-kecamatan-indramayu.json";

type Metric = "production2025" | "activity";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function ramp(t: number, low: string, mid: string, high: string) {
  const a = hexToRgb(low);
  const b = hexToRgb(mid);
  const c = hexToRgb(high);
  if (t < 0.5) {
    const u = t * 2;
    return rgbToHex(lerp(a.r, b.r, u), lerp(a.g, b.g, u), lerp(a.b, b.b, u));
  }
  const u = (t - 0.5) * 2;
  return rgbToHex(lerp(b.r, c.r, u), lerp(b.g, c.g, u), lerp(b.b, c.b, u));
}

export function ChoroplethMap({
  metric,
  title,
  caption,
}: {
  metric: Metric;
  title: string;
  caption: string;
}) {
  const [hover, setHover] = useState<string | null>(null);

  // KODE AJAIB: Membalik arah putaran koordinat untuk menghapus efek kotak raksasa
  const fixedGeoJson = useMemo(() => {
    const data = JSON.parse(JSON.stringify(geojsonData));
    data.features.forEach((f: any) => {
      if (f.geometry?.type === "Polygon") {
        f.geometry.coordinates.forEach((ring: any) => ring.reverse());
      } else if (f.geometry?.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((poly: any) => poly.forEach((ring: any) => ring.reverse()));
      }
    });
    return data;
  }, []);

  const projection = useMemo(() => {
    return geoMercator()
      .center([108.20, -6.42])
      .scale(70000)           
      .translate([450, 310]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const { min, max } = useMemo(() => {
    const vals = fixedGeoJson.features.map((f: any) => {
      const kecName = f.properties.namobj; 
      return KEC_BY_NAME[kecName]?.[metric] ?? 0;
    });
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [metric, fixedGeoJson]);

  const hovered = hover ? KEC_BY_NAME[hover] : null;

  function colorOf(k: Kecamatan | undefined) {
    if (!k) return "#d7e4d6";
    const t = (k[metric] - min) / (max - min || 1);
    return ramp(t, "#E8E1D1", "#5E8A6E", "#1F4D3A");
  }

  function valueLabel(k: Kecamatan) {
    return metric === "activity" ? formatPct(k.activity, 1) : `${formatTon(k.production2025, 0)} ton`;
  }

  const ticks = [min, min + (max - min) / 2, max];

  return (
    <figure className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Peta tematik</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span>{metric === "activity" ? formatPct(min, 0) : formatTon(min, 0)}</span>
          <div
            className="h-2 w-28 rounded-full"
            style={{
              background: "linear-gradient(90deg, #E8E1D1 0%, #5E8A6E 50%, #1F4D3A 100%)",
            }}
            aria-hidden
          />
          <span>{metric === "activity" ? formatPct(max, 0) : formatTon(max, 0)}</span>
        </div>
      </div>
      <div className="relative bg-paper-deep/40">
        <svg
          viewBox="0 0 900 620"
          className="h-auto w-full"
          role="img"
          aria-label={title}
        >
          <rect width="900" height="620" fill="#E8E1D1" />
          {fixedGeoJson.features.map((feature: any, i: number) => {
            const kecName = feature.properties.namobj; 
            const k = KEC_BY_NAME[kecName];
            const active = hover === kecName;
            
            const d = pathGenerator(feature) || ""; 

            return (
              <path
                key={kecName || i}
                d={d}
                fill={colorOf(k)}
                stroke={active ? "#1A1C16" : "#F4F0E6"}
                strokeWidth={active ? 2.4 : 1}
                className="cursor-pointer transition-[filter] duration-150"
                onMouseEnter={() => setHover(kecName)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(kecName)}
                onBlur={() => setHover(null)}
                tabIndex={0}
              >
                <title>
                  {kecName}
                  {k ? ` — ${valueLabel(k)}` : ""}
                </title>
              </path>
            );
          })}
          
          {fixedGeoJson.features.filter((feature: any) => {
            const kecName = feature.properties.namobj;
            const k = KEC_BY_NAME[kecName];
            if (!k) return false;
            return metric === "production2025" ? k.production2025 > 70000 : k.activity > 74;
          }).map((feature: any, i: number) => {
            const kecName = feature.properties.namobj;
            const centroid = pathGenerator.centroid(feature); 
            if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;

            return (
              <text
                key={`lbl-${kecName || i}`}
                x={centroid[0]}
                y={centroid[1]}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill="#F4F0E6"
                fontSize="11"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="600"
              >
                {kecName}
              </text>
            );
          })}
        </svg>
        {hovered ? (
          <div className="pointer-events-none absolute bottom-4 left-4 max-w-xs rounded-lg bg-ink px-4 py-3 text-paper shadow-[var(--shadow-border)]">
            <p className="font-display text-lg font-semibold">{hovered.name}</p>
            <p className="mt-1 text-sm text-paper/80">
              {metric === "activity" ? "Indeks keaktifan tanam" : "Estimasi produksi 2025"}:{" "}
              <span className="tabular-nums font-medium text-paper">{valueLabel(hovered)}</span>
            </p>
            <p className="mt-0.5 text-xs text-paper/65">
              LBS {formatTon(hovered.lbsHa, 0)} ha · tanam rata-rata {formatTon(hovered.plantHa, 0)} ha/bln
            </p>
          </div>
        ) : null}
      </div>
      <figcaption className="px-5 py-4 text-sm leading-relaxed text-muted">
        {caption}{" "}
        <span className="text-ink/70">
          Skala {ticks.map((t) => (metric === "activity" ? formatPct(t, 0) : `${formatTon(t, 0)} ton`)).join(" · ")}.
        </span>
      </figcaption>
    </figure>
  );
}