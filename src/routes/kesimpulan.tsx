import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Callout, PageHero, Section } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/kesimpulan")({ component: Kesimpulan });

const SARAN = [
  {
    t: "Bobot downscaling yang lebih kaya",
    d: "Asumsi homogenitas produktivitas per luas masih kasar. Tambahkan jarak ke irigasi primer, jenis tanah, atau NDVI historis per petak agar smoothing effect berkurang.",
  },
  {
    t: "Komposit lebih rapat",
    d: "Bulanan meredam awan tetapi bisa menghapus anomali singkat. Uji komposit 10 atau 15 harian yang selaras fase fenologi.",
  },
  {
    t: "Grid lebih halus",
    d: "1 km masih bisa menyamarkan petak bersebelahan. Resolusi lebih kecil perlu ditimbang terhadap beban hitung.",
  },
  {
    t: "Iklim beresolusi tinggi",
    d: "ERA5-Land dan CHIRPS menambah noise saat diinterpolasi ke 1 km. Produk reanalisis regional bisa menguji apakah iklim berguna tanpa kehilangan variasi spasial.",
  },
  {
    t: "Arsitektur sekuensial lain",
    d: "Eksplorasi GRU, TCN, Transformer, atau hybrid CNN-LSTM untuk pola temporal fenologi.",
  },
  {
    t: "Rentang historis lebih panjang",
    d: "2022–2024 mencakup La Niña dan El Niño tetapi singkat. Periode lebih panjang menstabilkan ekstrapolasi seperti lonjakan perubahan 2025 di beberapa kecamatan.",
  },
];

function Kesimpulan() {
  return (
    <>
      <PageHero
        kicker="Bab V"
        title="Kesimpulan dan saran"
        lead="Kesimpulan riset ini dilihat pada dua temuan utama: akurasi pemetaan sawah dinamis berbasis penginderaan jauh dan validitas regresi berbasis grid yang teruji secara konsisten setelah diagregasi terhadap data resmi BPS."
      />
      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 md:px-6">
        <Section title="Yang ditekankan">
          <div className="space-y-4">
            <Card className="p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-paddy">Kesimpulan 1</p>
              <CardTitle className="mt-2 text-2xl">Sawah aktif terpetakan dengan BiLSTM modifikasi</CardTitle>
              <CardDesc>
                Dari delapan konfigurasi, arsitektur BiLSTM yang dimodifikasi dari Filho et al. (2020)
                paling optimal: akurasi 0,9488, F1-Score 0,9514, Cohen’s Kappa 0,8977. Ia mengungguli
                LSTM/BiLSTM acuan dan ensemble machine learning. Setelah masking LBS, intensitas tanam terpusat
                di tengah kabupaten Bongas 80,4 persen dan Lelea 79,4 persen, sementara pesisir Pasekan
                25,21 persen dan Cantigi 26,74 persen.
              </CardDesc>
            </Card>
            <Card className="bg-paddy p-6 text-paper">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/70">Kesimpulan 2</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">S1+S2 mendekati BPS hingga 0,1 persen</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/90">
                Di grid 1 km, BiLSTM modifikasi semua fitur terbaik untuk produktivitas (R² 0,8146;
                RMSE 0,8053 ton/ha). LightGBM S1+S2 terbaik untuk luas panen (R² 0,6181; RMSE 18,50 ha).
                Ketika dijumlah ke kabupaten, justru skenario Sentinel-1 + Sentinel-2 tanpa iklim yang
                paling presisi 1.582.391 ton dibandingkan data resmi BPS 1.583.262 ton. Kroya 129.068,57 ton dan Anjatan
                111.044,60 ton memiliki estimasi produksi paling tinggi. Iklim resolusi kasar menambah noise pada agregasi makro.
              </p>
            </Card>
          </div>
          <Callout>
            Integrasi optik dan radar sudah sangat baik untuk mengestimasi nilai produksi. Iklim membantu produktivitas
            per hektar di level grid, tetapi merusak total kabupaten jika dipaksa ke sel 1 km.
          </Callout>
        </Section>

        <Section kicker="5.2" title="Enam saran">
          <ol className="space-y-3">
            {SARAN.map((s, i) => (
              <li key={s.t} className="rounded-lg bg-surface px-5 py-4 shadow-[var(--shadow-border)]">
                <p className="text-sm font-medium text-paddy">{i + 1}.</p>
                <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/hasil">
              Kembali ke peta hasil
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
