import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, LayoutGrid, FileBox, Calculator} from "lucide-react";
import { ChoroplethMap } from "@/components/choropleth-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { TOP_ACTIVITY, TOP_PRODUCTION } from "@/data/kecamatan";
import { formatPct, formatTon } from "@/lib/utils";
import { TimeMap } from "@/components/time-map";

export const Route = createFileRoute("/")({ component: Home });

const STATS = [
  { k: "Model Klasifikasi Terbaik", v: "F1 0,9514", d: (<><strong>Bi-LSTM Modifikasi</strong> · Akurasi = 0,9488 · Kappa = 0,8977</>)},
  { k: "Model Regresi Produktivitas Terbaik", v: "R² 0,81", d: (<><strong>BiLSTM Modifikasi</strong> dengan <strong>input Sentinel-1, Sentinel-2, dan Data Iklim</strong> · RMSE 0,8053 ton/ha</>) },
  { k: "Validasi Model Regresi pada Data Tahun 2025", v: "Selisih 0,1%", d: (<>Pemodelan regresi dengan <strong>input Sentinel-1 dan Sentinel-2 = 1.582.391 ton</strong> vs <strong>Data Resmi Produksi BPS 1.583.262 ton</strong></>) },
  { k: "Kecamatan dengan Estimasi Produksi Padi Tertinggi 2025", v: "Kroya", d: (<><strong>129.069 ton</strong>, disusul dengan Kecamatan Anjatan 111.045 ton</>) },
];

const CHAPTERS = [
  { to: "/pendahuluan", n: "01", t: "Pendahuluan", d: "Urgensi lumbung padi, celah KSA, dan rumusan two-phase modeling." },
  { to: "/landasan-teori", n: "02", t: "Tinjauan Pustaka", d: "Fenologi padi, Sentinel, KSA, dan tabel sepuluh penelitian terkait." },
  { to: "/metode", n: "03", t: "Metode", d: "Kerangka pikir, CRISP-DM, dan alur klasifikasi 10 m ke regresi 1 km." },
  { to: "/hasil", n: "04", t: "Hasil", d: "Peta keaktifan, ablation, dan peta produksi 2025 beserta insight." },
  { to: "/kesimpulan", n: "05", t: "Kesimpulan", d: "Temuan yang ditekankan dan enam saran pengembangan." },
];

function Home() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-16">
          <div>
            <Badge>Oleh: Janitra Hayu Pramestya / NIM 222212678</Badge>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-3xl">
              Estimasi Produksi Padi Skala <em>Grid</em> Menggunakan Integrasi <em>Deep Learning</em> dan Data Citra Satelit
            </h1>
            <h3 className="mt-0 font-display text-2xl tracking-tight md:text-3xl">
              di Kabupaten Indramayu
            </h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Tujuan utama penelitian ini mencakup klasifikasi tutupan lahan untuk memvalidasi 
              luas lahan padi aktif secara dinamis serta disagregasi estimasi nilai produksi. 
              Pendekatan ini berfungsi sebagai pemetaan variabilitas hasil produksi yang akurat dari tingkat 
              <em> grid</em> spasial mikro hingga agregasi tingkat kecamatan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/pendahuluan">
                  Latar Belakang
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/hasil">
                  Hasil dan Pembahasan
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <aside className="rounded-xl bg-paddy p-6 text-paper shadow-[var(--shadow-border)] md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/70">
              Highlight Penelitian
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <LayoutGrid className="mt-0.5 size-5 shrink-0" />
                <span className="text-sm leading-relaxed text-paper/90">
                  Penelitian ini merancang kerangka kerja <em>Two Phase Modeling</em> yang memetakan lahan padi aktif 
                  secara dinamis pada resolusi 10 meter sebelum melakukan <em>downscaling</em> estimasi regresi ke skala <em>grid</em> mikro 1 km x 1 km. 
                </span>
              </li>
              <li className="flex gap-3">
                <FileBox className="mt-0.5 size-5 shrink-0" />
                <span className="text-sm leading-relaxed text-paper/90">
                  Modifikasi BiLSTM memperbaiki model acuan dari penelitian Filho et al. (2020) 
                  beserta seluruh algoritma <em>machine learning</em> berbasis pohon. Arsitektur ini 
                  memiliki performa paling optimal dengan <em>F1 Score</em> 0,9514 pada tahap klasifikasi 
                  lahan serta <em>R-squared</em> 0,8146 pada tahap prediksi produksi.
                </span>
              </li>
              <li className="flex gap-3">
                <Calculator className="mt-0.5 size-5 shrink-0" />
                <span className="text-sm leading-relaxed text-paper/90">
                  Hasil agregasi estimasi produksi tingkat kabupaten dari 
                  skenario kombinasi citra Sentinel 1 dan Sentinel 2 terbukti 
                  akurat dengan nilai estimasi produkasi mencapai angka 1.582.391 ton 
                  yang mana hanya memiliki selisih sebesar 0,1 persen dari total produksi resmi BPS tahun 2025.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-paddy">Ringkasan Hasil Penelitian</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Performa Model Klasifikasi Lahan dan Regresi Estimasi Produksi</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.k} className="p-5">
              <p className="text-xs uppercase tracking-wide text-muted">{s.k}</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-paddy">{s.v}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 md:grid-cols-2 md:px-6">
        <ChoroplethMap
          metric="production2025"
          title="Estimasi Produksi Padi Tingkat Kecamatan 2025"
          caption="Agregasi grid skenario Sentinel-1 + Sentinel-2 ke 31 kecamatan. Kroya, Anjatan, Gabuswetan, dan Terisi menanggung sebagian besar volume kabupaten."
        />
        <TimeMap />
        <div className="flex flex-col gap-4">
          <Card>
            <CardTitle>Keaktifan tanam vs pesisir</CardTitle>
            <CardDesc>
              Indeks keaktifan adalah rasio piksel padi terhadap piksel valid sepanjang 2022–2024.
            </CardDesc>
            <ol className="mt-4 space-y-2">
              {TOP_ACTIVITY.slice(0, 3).map((k) => (
                <li key={k.name} className="flex justify-between text-sm">
                  <span>{k.name}</span>
                  <span className="tabular-nums font-medium text-paddy">{formatPct(k.activity, 1)}</span>
                </li>
              ))}
              {TOP_ACTIVITY.slice(-2).reverse().map((k) => (
                <li key={k.name} className="flex justify-between text-sm text-muted">
                  <span>{k.name}</span>
                  <span className="tabular-nums">{formatPct(k.activity, 1)}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <div>
          <Card>
            <CardTitle>Wilayah paling produktif</CardTitle>
            <CardDesc>
              Empat kecamatan barat-selatan menyumbang hampir 29 persen estimasi 1,58 juta ton.
            </CardDesc>
            <ol className="mt-4 space-y-2">
              {TOP_PRODUCTION.slice(0, 4).map((k, i) => (
                <li key={k.name} className="flex items-baseline justify-between border-t border-line pt-2 text-sm">
                  <span>
                    <span className="mr-2 tabular-nums text-muted">{i + 1}</span>
                    {k.name}
                  </span>
                  <span className="tabular-nums font-medium">{formatTon(k.production2025, 0)} ton</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <h2 className="font-display text-3xl font-semibold">Daftar Isi</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Setiap menu mengikuti bab skripsi. Hasil disusun sekuensial supaya peta tidak muncul
            sebelum fondasi klasifikasi dan metode selesai dijelaskan.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((c) => (
              <Link key={c.to} to={c.to} className="group">
                <Card className="h-full transition-[box-shadow,transform] duration-150 group-hover:-translate-y-0.5">
                  <p className="font-display text-sm text-paddy">{c.n}</p>
                  <CardTitle className="mt-1">{c.t}</CardTitle>
                  <CardDesc>{c.d}</CardDesc>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-paddy">
                    Buka
                    <ArrowRight className="size-4" />
                  </p>
                </Card>
              </Link>
            ))}
            <Card className="bg-paddy text-paper">
              <p className="text-xs uppercase tracking-wide text-paper/70">Dokumen</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">Buku Skripsi</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/85">
                Dokumen buku skripsi <em>full</em> dengan format .pdf dapat diakses di sini
              </p>
              <a
                href="https://drive.google.com/uc?export=download&id=1lfkOYDUg3ZTbGriVpdd89jFXKndsDQQN"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-paper underline-offset-4 hover:underline"
              >
                <Download className="size-4" />
                Buku Skripsi_Janitra Hayu
              </a>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
