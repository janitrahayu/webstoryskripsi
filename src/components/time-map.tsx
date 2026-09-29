import { useMemo, useState } from "react";
import { KEC_BY_NAME, type Kecamatan } from "@/data/kecamatan";
import { formatPct, formatTon } from "@/lib/utils";
import { geoMercator, geoPath } from "d3-geo";
import geojsonData from "@/data/batas-kecamatan-indramayu.json";

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

// Data Narasi/Insight Dinamis
const INSIGHTS: Record<number, string> = {
  2022: "Tahun 2022 merupakan tahun dasar (baseline) perhitungan. Wilayah Kroya, Terisi, Gantar, dan Gabuswetan menjadi lumbung padi utama yang menopang sebagian besar volume produksi kabupaten.",
  2023: "Efek domino anomali iklim mulai terlihat. Hampir seluruh wilayah pesisir hingga tengah mengalami penurunan produksi (merah), dengan defisit paling signifikan di wilayah Gabuswetan dan Kroya.",
  2024: "Fase pemulihan spasial. Beberapa kecamatan sentra seperti Gabuswetan dan Kroya berhasil bangkit (hijau), namun wilayah selatan seperti Gantar justru mulai mengalami tren penyusutan lahan panen.",
  2025: "Proyeksi model menunjukkan polarisasi ekstrem. Terjadi lonjakan produksi masif di Anjatan dan Haurgeulis, yang ironisnya dibarengi oleh anjloknya produksi di Gantar hingga lebih dari 58 ribu ton."
};

export function TimeMap() {
  const [hover, setHover] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2022); 

  const isChangeMap = year !== 2022;
  const metricKey = year === 2022 ? "produksi2022" : `perubahan${year}`;

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

  const { min, max, globalMaxAbs } = useMemo(() => {
    const currentVals = fixedGeoJson.features.map((f: any) => {
      const kecName = f.properties.namobj; 
      return (KEC_BY_NAME[kecName]?.[metricKey as keyof Kecamatan] as number) ?? 0;
    });

    const allChangeVals = fixedGeoJson.features.flatMap((f: any) => {
      const kec = KEC_BY_NAME[f.properties.namobj];
      if (!kec) return [0];
      return [kec.perubahan2023, kec.perubahan2024, kec.perubahan2025];
    });
    
    const globalAbs = Math.max(Math.abs(Math.min(...allChangeVals)), Math.abs(Math.max(...allChangeVals)));

    return { 
      min: Math.min(...currentVals), 
      max: Math.max(...currentVals), 
      globalMaxAbs: globalAbs 
    };
  }, [metricKey, fixedGeoJson]);

  const hovered = hover ? KEC_BY_NAME[hover] : null;

  function colorOf(k: Kecamatan | undefined) {
    if (!k) return "#d7e4d6";
    const val = k[metricKey as keyof Kecamatan] as number;

    if (isChangeMap) {
      const t = (val + globalMaxAbs) / (globalMaxAbs * 2 || 1);
      return ramp(t, "#d73027", "#ffffbf", "#1a9850"); 
    } else {
      const t = (val - min) / (max - min || 1);
      return ramp(t, "#E8E1D1", "#5E8A6E", "#1F4D3A");
    }
  }

  function formatValue(val: number) {
    if (isChangeMap && val > 0) return `+${formatTon(val, 0)}`;
    return formatTon(val, 0);
  }

  const ticks = isChangeMap 
    ? [-globalMaxAbs, 0, globalMaxAbs]
    : [min, min + (max - min) / 2, max];

  return (
    <figure className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {isChangeMap ? "Peta Perubahan Produksi (YoY)" : "Peta Perubahan Produksi"}
          </p>
          <div className="mt-1 flex items-center gap-3">
             <h3 className="font-display text-xl font-semibold">
               {isChangeMap ? `Tren ${year}` : "Total Produksi 2022"}
             </h3>
          </div>
          
          <div className="mt-3 flex max-w-sm items-center gap-3">
            <span className="text-xs font-medium text-muted">2022</span>
            <input 
              type="range" 
              min="2022" 
              max="2025" 
              step="1" 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-line accent-paddy outline-none transition-all"
            />
            <span className="text-xs font-medium text-muted">2025</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span>{isChangeMap ? formatValue(-globalMaxAbs) : formatTon(min, 0)}</span>
          <div
            className="h-2 w-28 rounded-full"
            style={{
              background: isChangeMap 
                ? "linear-gradient(90deg, #d73027 0%, #ffffbf 50%, #1a9850 100%)" 
                : "linear-gradient(90deg, #E8E1D1 0%, #5E8A6E 50%, #1F4D3A 100%)",
            }}
            aria-hidden
          />
          <span>{isChangeMap ? formatValue(globalMaxAbs) : formatTon(max, 0)}</span>
        </div>
      </div>
      
<div className="relative bg-paper-deep/40">
        <svg viewBox="0 0 900 620" className="h-auto w-full" role="img">
          <rect width="900" height="620" fill="#E8E1D1" />
          
          {/* Layer 1: Poligon Kecamatan */}
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
                className="cursor-pointer transition-all duration-700 ease-in-out"
                onMouseEnter={() => setHover(kecName)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}

          {/* Layer 2: Teks Nama Kecamatan */}
          {fixedGeoJson.features.filter((feature: any) => {
            const kecName = feature.properties.namobj;
            const k = KEC_BY_NAME[kecName];
            if (!k) return false;
            
            // Logika untuk menampilkan nama kecamatan besar
            // (Kamu bisa menyesuaikan angka batas ini agar peta tidak terlalu penuh teks)
            return metricKey === "produksi2022" 
                    ? k.produksi2022 > 60000 
                    : Math.abs(k[metricKey as keyof Kecamatan] as number) > 8000;
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
          <div className="pointer-events-none absolute bottom-4 left-4 max-w-xs rounded-lg bg-ink px-4 py-3 text-paper shadow-[var(--shadow-border)] transition-opacity duration-200">
            <p className="font-display text-lg font-semibold">{hovered.name}</p>
            <p className="mt-1 text-sm text-paper/80">
              {isChangeMap ? "Perubahan Produksi" : "Total Produksi"}:{" "}
              <span className="tabular-nums font-bold text-white">
                {formatValue(hovered[metricKey as keyof Kecamatan] as number)} ton
              </span>
            </p>
          </div>
        ) : null}
      </div>
      
      {/* INSIGHT DI BAWAH PETA */}
      <figcaption className="border-t border-line bg-paper px-5 py-4 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-paddy"></span> 
        {INSIGHTS[year]}{" "}
        <span className="text-ink/70">
          Skala {ticks.map((t) => (isChangeMap && t > 0 ? `+${formatTon(t, 0)}` : formatTon(t, 0))).join(" ton · ")} ton.
        </span>
      </figcaption>
    </figure>
  );
}