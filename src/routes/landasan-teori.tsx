import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";
import { PageHero, Section } from "@/components/page-hero";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { RELATED_RESEARCH } from "@/data/tables";

export const Route = createFileRoute("/landasan-teori")({ component: Landasan });

const DEFS = [
  {
    t: "Produksi Padi",
    d: "Menurut BPS (2015), produksi (GKP/GKG) adalah hasil perkalian luas panen dan produktivitas. Produktivitas diukur melalui Survei Ubinan pada plot 2,5 × 2,5 m yang disajikan dalam kuintal per hektare.",
  },
  {
    t: "Fenologi & Siklus Tanaman",
    d: "Siklus hidup padi 80–160 hari terbagi dalam fase persiapan lahan, vegetatif awal, vegetatif akhir, generatif (paling rentan: suhu >35°C memicu sterilitas serbuk sari), dan panen.",
  },
  {
    t: "Time Lag & Rolling Window",
    d: "Pertumbuhan padi merupakan integral akumulasi kondisi lingkungan sepanjang siklus hidupnya. Jendela waktu (rolling window) 120 hari merangkum fase kritis secara utuh tanpa terpotong batasan kalender bulanan.",
  },
  {
    t: "Parameter Agrometeorologi",
    d: "Mencakup radiasi matahari (kebutuhan jenuh fotosintesis ~50 klx), suhu udara (optimum vegetatif 25–30°C), curah hujan (butuh 450–700 mm/musim), dan kelembapan tanah yang memengaruhi serapan hara di zona perakaran.",
  },
  {
    t: "Survei Kerangka Sampel Area (KSA)",
    d: "Metode pemantauan statistik bebas bias FAO/USDA. Menggunakan grid 300x300 m dan diamati pada 9 titik subsegmen melalui aplikasi Android pada 7 hari terakhir tiap bulannya.",
  },
  {
    t: "Remote Sensing & Citra Satelit",
    d: "Teknologi pengukuran tanpa kontak fisik memanfaatkan sensor aktif (memancarkan gelombang) atau pasif (merefleksikan matahari). Kapasitasnya ditentukan oleh resolusi spasial, spektral, radiometrik, dan temporal.",
  },
  {
    t: "Sentinel-1 (Sensor SAR)",
    d: "Satelit radar C-band aktif yang mampu menembus awan dan merekam siang-malam. Membutuhkan kalibrasi radiometrik, pemfilteran speckle, dan terrain correction untuk mengolah hamburan balik (backscatter).",
  },
  {
    t: "Sentinel-2 (Sensor Optik)",
    d: "Satelit multispektral dengan 13 band dan resolusi hingga 10 m. Sangat rentan terhadap gangguan awan, sehingga menggunakan algoritma SCL (Scene Classification Layer) Level-2A untuk mengeleminasi piksel awan dan bayangan.",
  },
  {
    t: "Indeks Vegetasi (Optik)",
    d: "Algoritma penyeimbang spektral seperti NDVI dan EVI (kerapatan biomassa), LSWI (kandungan air), BSI (deteksi tanah terbuka), GNDVI (klorofil untuk kanopi rapat), serta S2REP (kandungan nitrogen memanfaatkan red-edge).",
  },
  {
    t: "Parameter Polarimetri (Radar)",
    d: "Memanfaatkan polarisasi VV dan VH. Membentuk indeks seperti RVI, Cross-Polarization Ratio (VH/VV), dan NDPI untuk menonjolkan hamburan dari struktur daun dan batang sambil menekan noise pantulan dari permukaan air.",
  },
  {
    t: "CHIRPS & ERA5-Land",
    d: "CHIRPS adalah data curah hujan resolusi tinggi (~5,5 km) hasil penggabungan data satelit dan stasiun darat. ERA5-Land (~9 km) menyediakan reanalisis suhu 2m, radiasi, dan kelembapan tanah.",
  },
  {
    t: "Interpolasi Bilinear",
    d: "Metode resampling spasial untuk menyamakan resolusi grid spasial antar sumber (seperti iklim ke 1 km). Menciptakan gradien spasial yang realistis dan kontinu ketimbang perpindahan nilai yang diskrit.",
  },
  {
    t: "Downscaling Data Spasial",
    d: "Proses disagregasi resolusi kasar (statistik total kabupaten) ke skala mikro 1 km × 1 km berbasis bobot area (dasymetric mapping) memanfaatkan peta presisi Lahan Baku Sawah (LBS).",
  },
  {
    t: "Machine Learning",
    d: "Model komputasi adaptif yang belajar dari pengalaman (data historis). Algoritma dituntut bisa mengenali pola tersembunyi tanpa harus memprogram instruksinya secara spesifik guna menangani prediktor bervariasi tinggi.",
  },
  {
    t: "CART (Decision Tree)",
    d: "Pohon keputusan dasar (Classification and Regression Tree) yang melakukan splitting fitur rekursif menggunakan indeks Gini untuk metrik kemurnian klasifikasi, atau MSE untuk kasus regresi.",
  },
  {
    t: "Random Forest",
    d: "Algoritma metode ensemble yang mendistribusikan prediktor secara acak ke berbagai decision tree independen untuk meminimalkan korelasi antar-pohon, menurunkan varians prediksi, dan menghindari overfitting.",
  },
  {
    t: "LightGBM & XGBoost",
    d: "Varian efisien Gradient Boosting. LightGBM unggul memproses kumpulan dataset multidimensi dengan waktu komputasi cepat (via GOSS), sementara XGBoost menonjol pada optimasi regularisasi L1/L2 untuk reduksi overfitting.",
  },
  {
    t: "LSTM & Bi-LSTM",
    d: "Arsitektur Recurrent Neural Network berbekal sistem gate untuk mengolah deret waktu siklus padi yang fluktuatif. Bi-LSTM membaca pola dari dua arah sekaligus (awal-ke-akhir, akhir-ke-awal) untuk memperkaya konteks.",
  },
  {
    t: "CatBoost Regressor",
    d: "Model ensemble berbasis oblivious decision trees bersistem terpusat (simetris) yang terbukti meminimalkan risiko prediction shift, mengonversi variabel kategori langsung secara otomatis, dan mempercepat waktu inferensi.",
  },
  {
    t: "Evaluasi Model Klasifikasi",
    d: "Menggunakan Akurasi, F1-Score Makro (rata-rata harmonik Precision-Recall yang menyeimbangkan kelas mayoritas dan minoritas), dan Cohen's Kappa (menyeleksi tingkat kesepakatan klasifikasi yang melebihi tebakan acak).",
  },
  {
    t: "Evaluasi Model Regresi",
    d: "Root Mean Squared Error (RMSE) memetakan besaran rata-rata nilai simpangan atau kesalahan prediksi, sedangkan R-Squared/Adjusted R-Squared merepresentasikan proporsi variansi model terhadap data aktual observasi.",
  },
];

function Landasan() {
  return (
    <>
      <PageHero
        kicker="Bab II"
        title="Tinjauan Pustaka"
        lead="Definisi-definisi yang  digunakan pada penelitian dan tabel penelitian terkait di antara studi klasifikasi dan prediksi padi yang memperlihatkan keterbaruan dari penelitian ini."
      />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6">
        <Section kicker="2.1" title="Landasan Teori">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {DEFS.map((x) => (
              <Card key={x.t} className="p-5">
                <CardTitle className="text-lg leading-tight">{x.t}</CardTitle>
                <CardDesc className="mt-2 text-justify">{x.d}</CardDesc>
              </Card>
            ))}
          </div>
        </Section>

        <Section kicker="2.2" title="Penelitian terkait">
          <p className="text-justify">
            Mayoritas studi hanya mengerjakan satu domain: klasifikasi tutupan atau prediksi panen.
            Hanya Tiwari et al. (2024) dan Saini & Nagpal (2024) yang menggabungkan keduanya, namun
            tanpa memisahkan fase pemetaan dan fase estimasi. Penelitian ini merancang dua fase
            yang terhubung: output klasifikasi piksel menjadi bahan regresi.
          </p>
          <p className="text-justify">
            Dari sisi data, skripsi ini satu-satunya di tabel yang mengintegrasikan empat sumber
            sekaligus—Sentinel-1, Sentinel-2, ERA5-Land, CHIRPS—plus amatan KSA. Penggunaan algoritma
            juga lebih lebar seperti <em>machine learning</em> CART, RF, XGBoost, LightGBM, CatBoost hingga <em>deep learning</em>
            LSTM, BiLSTM pada klasifikasi dan regresi.
          </p>
          <DataTable
            caption="Tabel 2. Penelitian terkait"
            columns={[
              { key: "no", label: "No", numeric: true },
              { key: "author", label: "Peneliti" },
              { key: "type", label: "Jenis studi" },
              { key: "data", label: "Sumber data" },
              { key: "method", label: "Metode" },
              { key: "place", label: "Lokasi" },
            ]}
            rows={RELATED_RESEARCH.map((r) => ({
              no: r.no,
              author: r.author,
              type: r.type,
              data: r.data,
              method: r.method,
              place: r.place,
              highlight: "highlight" in r && r.highlight ? "1" : "",
            }))}
            highlightRow={(row) => row.highlight === "1"}
          />
        </Section>
      </div>
    </>
  );
}