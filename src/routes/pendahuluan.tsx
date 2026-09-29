import { createFileRoute } from "@tanstack/react-router";
import { Callout, PageHero, Section } from "@/components/page-hero";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/pendahuluan")({ component: Pendahuluan });

const GAPS = [
  {
    n: "01",
    t: "Peta lahan statis",
    d: "Studi terdahulu sering memprediksi produksi dari peta sawah satu tahun. Area non-padi ikut terhitung, sehingga bias luas lahan menular ke volume produksi.",
  },
  {
    n: "02",
    t: "Sensor tunggal",
    d: "Optik Sentinel-2 kaya klorofil tetapi terhalang awan tropis. Radar Sentinel-1 menembus awan namun peka genangan. Integrasi keduanya menutup kekurangan masing-masing.",
  },
  {
    n: "03",
    t: "Agregat kabupaten",
    d: "BPS hanya merilis produksi tahunan tingkat kabupaten. Diperlukan data dengan skala yang lbeih kecil untuk pemantauan kebijakan",
  },
  {
    n: "04",
    t: "Rata-rata bulanan",
    d: "Agregasi kalender menghilangkan sinyal stres kumulatif pada fase kritis. Penelitian ini memakai rolling window 120 hari yang selaras siklus tanam 90–130 hari.",
  },
];

function Pendahuluan() {
  return (
    <>
      <PageHero
        kicker="Bab I"
        title="Pendahuluan"
        lead="Bab ini berisi hal yang mendasari mengapa penelitian ini dilakukan, seperti mengapa Indramayu butuh estimasi produksi berskala grid, mengapa KSA tidak cukup sendiri, dan apa yang ingin dijawab skripsi ini."
      />
      <div className="mx-auto max-w-3xl space-y-14 px-4 py-12 md:px-6">
        <Section kicker="1.1" title="Latar belakang">
          <p style={{ textAlign: 'justify' }}>
            Ancaman iklim terhadap lumbung padi nasional di Kabupaten Indramayu membutuhkan sistem 
            pemantauan produksi yang akurat, namun metode konvensional dan penginderaan jauh saat 
            ini masih memiliki banyak celah. Keterbatasan citra satelit tunggal akibat hambatan awan 
            atau genangan air menuntut perlunya integrasi antarsensor dan data iklim. Selain itu 
            prediksi produksi berbasis peta statis sering memicu bias karena terhitungnya area 
            nonpadi tanpa adanya validasi lahan dinamis. Permasalahan ini diperparah oleh ketersediaan 
            data produksi yang hanya ada di level kabupaten, sehingga sangat membutuhkan proses 
            <em>downscaling</em> ke resolusi mikro untuk memfasilitasi pengambilan kebijakan.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Menjawab permasalahan tersebut penelitian ini merumuskan solusi dengan 
            mengintegrasikan data Kerangka Sampel Area, citra satelit Sentinel 1 dan Sentinel 2, 
            serta data iklim dari CHIRPS dan ERA5 Land. Variabel yang diekstrak mencakup fitur 
            satelit dasar, fitur tambahan, hingga parameter iklim untuk menutupi kekurangan
            dari masing masing instrumen. Pengolahan data dilakukan melalui sistem pemodelan dua 
            fase yang mengomparasikan berbagai algoritma <em>Ensemble Machine Learning</em> dan <em>Deep Learning</em> 
            baik pada tahap klasifikasi lahan maupun tahap regresi hasil produksi panen.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Tujuan akhir dari keseluruhan proses tersebut berfokus pada pembentukan model pemantauan 
            dalam skala mikro yang dapat diandalkan oleh pemerintah. Langkah pertama ditujukan untuk 
            mengevaluasi berbagai algoritma klasifikasi menggunakan integrasi citra satelit Sentinel 1 
            dan Sentinel 2 untuk memetakan sebaran spasial serta mengestimasi luas lahan padi aktif 
            di Kabupaten Indramayu. Langkah selanjutnya bertujuan menentukan model regresi yang paling 
            optimal melalui perbandingan beberapa model dalam skenario <em>ablation study</em> untuk mengestimasi 
            hasil produksi padi pada resolusi grid spasial 1 km x 1 km.
          </p>
          <Callout>
            Penelitian ini menyediakan peta estimasi independen berskala mikro 
            sebagai instrumen peringatan dini. Dengan memecah data tunggal kabupaten menjadi skala yang lebih kecil seperti kecamatan, 
            pemerintah dapat menentukan lokasi spesifik untuk menargetkan distribusi bantuan dan 
            intervensi pertanian secara akurat.
          </Callout>
        </Section>

        <Section kicker="1.2" title="Identifikasi dan batasan masalah">
          <div className="grid gap-3 sm:grid-cols-2">
            {GAPS.map((g) => (
              <Card key={g.n} className="p-5">
                <p className="font-display text-sm text-paddy">{g.n}</p>
                <CardTitle className="mt-1 text-lg">{g.t}</CardTitle>
                <CardDesc>{g.d}</CardDesc>
              </Card>
            ))}
          </div>
          <p>
            Ruang lingkup dibatasi Kabupaten Indramayu, periode historis Januari 2022–Desember 2024,
            dengan uji <em>out-of-sample</em> 2025. Data masukan terbatas pada Sentinel-1, Sentinel-2,
            ERA5-Land, CHIRPS, KSA, dan Peta Lahan Baku Sawah BIG. Metodologi mengikuti two-phase
            modeling: klasifikasi sawah aktif, lalu downscaling regresi nilai produksi.
          </p>
        </Section>

        <Section kicker="1.3" title="Tujuan penelitian">
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              Mengevaluasi berbagai algoritma klasifikasi menggunakan integrasi citra satelit 
              Sentinel-1 dan Sentinel-2 untuk memetakan sebaran spasial serta mengestimasi luas 
              lahan padi aktif di Kabupaten Indramayu.
            </li>
            <li>
              b)	Menentukan model regresi yang paling optimal melalui perbandingan beberapa model 
              baik menggunakan machine learning maupun deep learning dalam skenario <em>ablation study</em> 
              untuk mengestimasi hasil produksi padi pada resolusi grid spasial 1 km × 1 km.
            </li>
          </ol>
        </Section>

        <Section kicker="1.4" title="Manfaat">
          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <CardTitle>Teoritis</CardTitle>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                <li>Kerangka two-phase yang memisahkan pemetaan sawah dan regresi hasil panen.</li>
                <li>Bukti kuantitatif kontribusi radar, optik, dan iklim lewat ablation.</li>
                <li>Rujukan downscaling makro ke mikro dan time-series non-linear di pertanian.</li>
                <li>Perluasan kajian CHIRPS dan ERA5-Land untuk estimasi padi.</li>
              </ul>
            </Card>
            <Card>
              <CardTitle>Praktis</CardTitle>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                <li>Pemangku kepentingan: peta mikro untuk mitigasi puso dan logistik pangan.</li>
                <li>Masyarakat: sinyal awal ancaman iklim untuk menyesuaikan waktu tanam.</li>
                <li>Pembaca: peta jalan integrasi satelit, fitur temporal, dan perbandingan algoritma.</li>
              </ul>
            </Card>
          </div>
        </Section>
      </div>
    </>
  );
}
