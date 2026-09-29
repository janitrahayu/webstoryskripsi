import { ArrowDown, ArrowRight } from "lucide-react";

export function CrispDiagram() {
  const phases = [
    { n: "01", t: "Business Understanding", d: "Masalah & lingkup" },
    { n: "02", t: "Data Understanding", d: "Enam sumber data" },
    { n: "03", t: "Data Preparation", d: "Fitur & rolling window" },
    { n: "04", t: "Modeling", d: "Klasifikasi + regresi" },
    { n: "05", t: "Evaluation", d: "Metrik & validasi BPS" },
  ];
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {phases.map((p, i) => (
        <li key={p.n} className="relative rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="font-display text-2xl font-semibold text-paddy">{p.n}</p>
          <p className="mt-2 font-medium leading-snug">{p.t}</p>
          <p className="mt-1 text-sm text-muted">{p.d}</p>
          {i < phases.length - 1 ? (
            <ArrowRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted md:block" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function TwoPhaseDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
      <article className="rounded-xl bg-paddy p-6 text-paper shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/70">Fase 1</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">Klasifikasi 10 m</h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/85">
          Sentinel-1 (VV, VH, RVI) dan Sentinel-2 (NDVI, EVI, LSWI, BSI) memetakan sawah padi
          aktif tiap bulan. Masking LBS BIG membatasi estimasi pada lahan sawah resmi.
        </p>
        <p className="mt-4 text-xs text-paper/70">Output: peta padi bulanan + proporsi piksel per grid</p>
      </article>
      <div className="hidden items-center justify-center md:flex">
        <ArrowRight className="size-6 text-paddy" />
      </div>
      <div className="flex justify-center md:hidden">
        <ArrowDown className="size-6 text-paddy" />
      </div>
      <article className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paddy">Fase 2</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">Regresi 1 km × 1 km</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Produktivitas dan luas panen diprediksi terpisah, lalu dikalikan. Ablation lima skenario
          data menguji kontribusi radar, optik, dan iklim.
        </p>
        <p className="mt-4 text-xs text-muted">Output: produksi grid, agregasi kecamatan, validasi kabupaten</p>
      </article>
    </div>
  );
}

export function KerangkaDiagram() {
  const cols = [
    {
      t: "Permasalahan",
      items: [
        "Sensor tunggal gagal menembus awan dan menangkap stres tanaman sekaligus",
        "Peta lahan statis mencampur area non-padi",
        "Data BPS hanya agregat kabupaten",
      ],
    },
    {
      t: "Solusi",
      items: [
        "Integrasi Sentinel-1, Sentinel-2, CHIRPS, ERA5-Land, KSA",
        "Two-phase: klasifikasi dinamis lalu regresi",
        "Downscaling ke grid 1 km dengan rolling window 120 hari",
      ],
    },
    {
      t: "Evaluasi",
      items: [
        "Akurasi, F1, Kappa untuk klasifikasi",
        "R² dan RMSE untuk produktivitas & luas",
        "Validasi total 2025 terhadap angka resmi BPS",
      ],
    },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cols.map((c) => (
        <div key={c.t} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <h3 className="font-display text-lg font-semibold">{c.t}</h3>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {c.items.map((it) => (
              <li key={it} className="border-t border-line pt-2 first:border-0 first:pt-0">
                {it}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
