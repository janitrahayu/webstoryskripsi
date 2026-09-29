export const CLASSIFICATION = [
  { model: "BiLSTM (Modifikasi)", acc: 0.9488, f1: 0.9514, kappa: 0.8977, best: true },
  { model: "LSTM (Modifikasi)", acc: 0.9457, f1: 0.9487, kappa: 0.8914 },
  { model: "XGBoost", acc: 0.9449, f1: 0.9476, kappa: 0.8898 },
  { model: "LightGBM", acc: 0.9416, f1: 0.9445, kappa: 0.8833 },
  { model: "LSTM (Filho et al., 2020)", acc: 0.9398, f1: 0.9424, kappa: 0.8797 },
  { model: "BiLSTM (Filho et al., 2020)", acc: 0.9388, f1: 0.9415, kappa: 0.8777 },
  { model: "Random Forest", acc: 0.9381, f1: 0.9418, kappa: 0.8765 },
  { model: "CART", acc: 0.899, f1: 0.9047, kappa: 0.7982 },
] as const;

export const RELATED_RESEARCH = [
  {
    no: 1,
    author: "Nazir et al. (2021)",
    type: "Prediksi",
    data: "Sentinel-2, indeks vegetasi, GPS, kuesioner petani",
    method: "PLSR, regresi linier",
    place: "Punjab, Pakistan",
  },
  {
    no: 2,
    author: "Fan et al. (2024)",
    type: "Prediksi",
    data: "Sentinel-2, agrometeorologi, DEM, survei lapangan",
    method: "Random Forest, SVM, PLSR",
    place: "Chongqing, Tiongkok",
  },
  {
    no: 3,
    author: "Islam et al. (2023)",
    type: "Prediksi",
    data: "Statistik historis, NDVI MODIS, fitur meteorologi",
    method: "Stack Ensemble, XGBoost, LightGBM, RF",
    place: "Sabuk Terai, Nepal",
  },
  {
    no: 4,
    author: "Wang et al. (2019)",
    type: "Prediksi",
    data: "Sentinel-1A polaritas VH/VV, panen lapangan, GPS",
    method: "Korelasi time series, regresi empiris SAR",
    place: "Jiangsu, Tiongkok",
  },
  {
    no: 5,
    author: "Tiwari et al. (2024)",
    type: "Klasifikasi, Prediksi",
    data: "Satelit optik time series, peta tutupan lahan, statistik pemerintah",
    method: "Random Forest",
    place: "Bangladesh",
  },
  {
    no: 6,
    author: "Arumugam et al. (2021)",
    type: "Prediksi",
    data: "LAI MODIS, statistik panen distrik, peta tutupan lahan",
    method: "Gradient Boosted Regression",
    place: "India",
  },
  {
    no: 7,
    author: "Filho et al. (2020)",
    type: "Klasifikasi",
    data: "Time series SAR Sentinel-1A, survei padi, citra resolusi tinggi",
    method: "LSTM, BiLSTM, SVM",
    place: "Uruguaiana, Brasil",
  },
  {
    no: 8,
    author: "Saini & Nagpal (2024)",
    type: "Klasifikasi, Prediksi",
    data: "Sentinel-1, Sentinel-2, Landsat-8, meteorologi, GPS",
    method: "Hybrid DNN, Conv1D, LSTM",
    place: "Haryana, India",
  },
  {
    no: 9,
    author: "Thorp & Drajat (2021)",
    type: "Klasifikasi",
    data: "KSA BPS, Sentinel-1, Sentinel-2",
    method: "DNN, CNN, RNN, LSTM",
    place: "Jawa Barat, Indonesia",
  },
  {
    no: 10,
    author: "Penelitian ini",
    type: "Klasifikasi, Prediksi",
    data: "Sentinel-1, Sentinel-2, CHIRPS, ERA5-Land, KSA",
    method: "Klasifikasi: CART, RF, XGBoost, LightGBM, LSTM dan BiLSTM (Filho et al. 2020), LSTM dan BiLSTM Modifikasi; Regresi: CatBoost Regressor, RF, LightGBM, XGBoost, LSTM dan BiLSTM (Jeong et al. 2024), LSTM dan BiLSTM Modifikasi",
    place: "Kabupaten Indramayu, Jawa Barat",
    highlight: true,
  },
] as const;

export const DATA_SOURCES = [
  { no: 1, name: "Produksi padi", source: "KSA, BPS", spatial: "—", temporal: "Bulanan" },
  { no: 2, name: "Citra radar Sentinel-1", source: "ESA Copernicus", spatial: "10 m", temporal: "6–12 hari" },
  { no: 3, name: "Citra optik Sentinel-2", source: "ESA Copernicus", spatial: "10 m", temporal: "5 hari" },
  { no: 4, name: "Curah hujan", source: "CHIRPS", spatial: "~0,05°", temporal: "Harian" },
  { no: 5, name: "Suhu, radiasi, kelembapan tanah", source: "ERA5-Land", spatial: "~0,1°", temporal: "Harian" },
  { no: 6, name: "Peta Lahan Baku Sawah", source: "Badan Informasi Geospasial", spatial: "Poligon vektor", temporal: "Bulanan" },
] as const;

export type AblationRow = {
  model: string;
  scenario: string;
  r2: number;
  rmse: number;
  best?: boolean;
};

export const PRODUCTIVITY_ABLATION: AblationRow[] = [
  { model: "CatBoost", scenario: "Sentinel-1", r2: 0.7406, rmse: 0.9524 },
  { model: "CatBoost", scenario: "Sentinel-2", r2: 0.7291, rmse: 0.9734 },
  { model: "CatBoost", scenario: "Iklim", r2: 0.5777, rmse: 1.2153 },
  { model: "CatBoost", scenario: "S1+S2", r2: 0.7729, rmse: 0.8912 },
  { model: "CatBoost", scenario: "Semua fitur", r2: 0.7564, rmse: 0.9231 },
  { model: "Random Forest", scenario: "Sentinel-1", r2: 0.7408, rmse: 0.9521 },
  { model: "Random Forest", scenario: "Sentinel-2", r2: 0.7291, rmse: 0.9733 },
  { model: "Random Forest", scenario: "Iklim", r2: 0.6681, rmse: 1.0775 },
  { model: "Random Forest", scenario: "S1+S2", r2: 0.7607, rmse: 0.9148 },
  { model: "Random Forest", scenario: "Semua fitur", r2: 0.771, rmse: 0.8949 },
  { model: "LightGBM", scenario: "Sentinel-1", r2: 0.756, rmse: 0.9237 },
  { model: "LightGBM", scenario: "Sentinel-2", r2: 0.7317, rmse: 0.9687 },
  { model: "LightGBM", scenario: "Iklim", r2: 0.6492, rmse: 1.1077 },
  { model: "LightGBM", scenario: "S1+S2", r2: 0.7711, rmse: 0.8948 },
  { model: "LightGBM", scenario: "Semua fitur", r2: 0.7759, rmse: 0.8853 },
  { model: "XGBoost", scenario: "Sentinel-1", r2: 0.7319, rmse: 0.9683 },
  { model: "XGBoost", scenario: "Sentinel-2", r2: 0.7112, rmse: 1.0049 },
  { model: "XGBoost", scenario: "Iklim", r2: 0.6225, rmse: 1.149 },
  { model: "XGBoost", scenario: "S1+S2", r2: 0.7556, rmse: 0.9245 },
  { model: "XGBoost", scenario: "Semua fitur", r2: 0.7608, rmse: 0.9147 },
  { model: "LSTM (Jeong)", scenario: "Sentinel-1", r2: 0.7093, rmse: 1.0084 },
  { model: "LSTM (Jeong)", scenario: "Sentinel-2", r2: 0.712, rmse: 1.0035 },
  { model: "LSTM (Jeong)", scenario: "Iklim", r2: 0.5022, rmse: 1.3194 },
  { model: "LSTM (Jeong)", scenario: "S1+S2", r2: 0.7533, rmse: 0.9289 },
  { model: "LSTM (Jeong)", scenario: "Semua fitur", r2: 0.7682, rmse: 0.9003 },
  { model: "BiLSTM (Jeong)", scenario: "Sentinel-1", r2: 0.7334, rmse: 0.9656 },
  { model: "BiLSTM (Jeong)", scenario: "Sentinel-2", r2: 0.7543, rmse: 0.9269 },
  { model: "BiLSTM (Jeong)", scenario: "Iklim", r2: 0.5035, rmse: 1.3178 },
  { model: "BiLSTM (Jeong)", scenario: "S1+S2", r2: 0.7927, rmse: 0.8515 },
  { model: "BiLSTM (Jeong)", scenario: "Semua fitur", r2: 0.787, rmse: 0.8632 },
  { model: "LSTM Modifikasi", scenario: "Sentinel-1", r2: 0.7146, rmse: 0.9991 },
  { model: "LSTM Modifikasi", scenario: "Sentinel-2", r2: 0.6926, rmse: 1.0369 },
  { model: "LSTM Modifikasi", scenario: "Iklim", r2: 0.5423, rmse: 1.2652 },
  { model: "LSTM Modifikasi", scenario: "S1+S2", r2: 0.7669, rmse: 0.9028 },
  { model: "LSTM Modifikasi", scenario: "Semua fitur", r2: 0.7916, rmse: 0.8537 },
  { model: "BiLSTM Modifikasi", scenario: "Sentinel-1", r2: 0.7389, rmse: 0.9555 },
  { model: "BiLSTM Modifikasi", scenario: "Sentinel-2", r2: 0.7619, rmse: 0.9126 },
  { model: "BiLSTM Modifikasi", scenario: "Iklim", r2: 0.5135, rmse: 1.3044 },
  { model: "BiLSTM Modifikasi", scenario: "S1+S2", r2: 0.7826, rmse: 0.872 },
  { model: "BiLSTM Modifikasi", scenario: "Semua fitur", r2: 0.8146, rmse: 0.8053, best: true },
];

export const AREA_ABLATION: AblationRow[] = [
  { model: "Random Forest", scenario: "Sentinel-1", r2: 0.5556, rmse: 19.9595 },
  { model: "Random Forest", scenario: "Sentinel-2", r2: 0.5352, rmse: 20.4126 },
  { model: "Random Forest", scenario: "Iklim", r2: 0.5511, rmse: 20.0621 },
  { model: "Random Forest", scenario: "S1+S2", r2: 0.5769, rmse: 19.4756 },
  { model: "Random Forest", scenario: "Semua fitur", r2: 0.5797, rmse: 19.4121 },
  { model: "LightGBM", scenario: "Sentinel-1", r2: 0.5723, rmse: 19.5818 },
  { model: "LightGBM", scenario: "Sentinel-2", r2: 0.5668, rmse: 19.7074 },
  { model: "LightGBM", scenario: "Iklim", r2: 0.5371, rmse: 20.3709 },
  { model: "LightGBM", scenario: "S1+S2", r2: 0.6181, rmse: 18.5034, best: true },
  { model: "LightGBM", scenario: "Semua fitur", r2: 0.6113, rmse: 18.6675 },
  { model: "XGBoost", scenario: "Sentinel-1", r2: 0.5059, rmse: 21.0473 },
  { model: "XGBoost", scenario: "Sentinel-2", r2: 0.514, rmse: 20.8748 },
  { model: "XGBoost", scenario: "Iklim", r2: 0.2937, rmse: 25.1646 },
  { model: "XGBoost", scenario: "S1+S2", r2: 0.551, rmse: 20.0642 },
  { model: "XGBoost", scenario: "Semua fitur", r2: 0.5992, rmse: 18.9549 },
  { model: "BiLSTM (Jeong)", scenario: "Sentinel-1", r2: 0.5283, rmse: 20.5641 },
  { model: "BiLSTM (Jeong)", scenario: "Sentinel-2", r2: 0.538, rmse: 20.3517 },
  { model: "BiLSTM (Jeong)", scenario: "Iklim", r2: 0.2749, rmse: 25.497 },
  { model: "BiLSTM (Jeong)", scenario: "S1+S2", r2: 0.5825, rmse: 19.3472 },
  { model: "BiLSTM (Jeong)", scenario: "Semua fitur", r2: 0.5889, rmse: 19.1978 },
  { model: "LSTM Modifikasi", scenario: "Sentinel-1", r2: 0.4974, rmse: 21.2266 },
  { model: "LSTM Modifikasi", scenario: "Sentinel-2", r2: 0.4892, rmse: 21.3987 },
  { model: "LSTM Modifikasi", scenario: "Iklim", r2: 0.2486, rmse: 25.9544 },
  { model: "LSTM Modifikasi", scenario: "S1+S2", r2: 0.5836, rmse: 19.3214 },
  { model: "LSTM Modifikasi", scenario: "Semua fitur", r2: 0.5922, rmse: 19.1218 },
  { model: "BiLSTM Modifikasi", scenario: "Sentinel-1", r2: 0.493, rmse: 21.3209 },
  { model: "BiLSTM Modifikasi", scenario: "Sentinel-2", r2: 0.5609, rmse: 19.8411 },
  { model: "BiLSTM Modifikasi", scenario: "Iklim", r2: 0.3019, rmse: 25.0165 },
  { model: "BiLSTM Modifikasi", scenario: "S1+S2", r2: 0.5933, rmse: 19.0947 },
  { model: "BiLSTM Modifikasi", scenario: "Semua fitur", r2: 0.6026, rmse: 18.876 },
];

export const SCENARIO_TOTALS = [
  { name: "Sentinel-1", ton: 1685100, note: "Overestimasi" },
  { name: "Sentinel-2", ton: 1644756, note: "Overestimasi" },
  { name: "Iklim saja", ton: 869597, note: "Underestimasi" },
  { name: "S1 + S2", ton: 1582391, note: "Paling presisi", best: true },
  { name: "Semua fitur", ton: 539991, note: "Tidak stabil" },
  { name: "Data BPS 2025", ton: 1583262, note: "Acuan resmi", official: true },
];

export type CrispPhase = {
  name: string;
  goal: string;
  items?: string[];
  out: string;
  image?: string; 
  modelingImages?: {
      src1: string;
      src2: string;
      caption1: string;
      caption2: string;
      title: string;
    }[];
};

export const CRISP_PHASES: CrispPhase[] = [
  {
    name: "Business Understanding",
    goal: "Fase ini menetapkan ruang lingkup dan rumusan masalah penelitian berdasarkan analisis karakteristik agroklimatologis Kabupaten Indramayu (107°51'–108°36' BT dan 6°15'–6°40' LS) serta pemahaman siklus tanam padi selama 90–130 hari sebagai acuan rekayasa fitur temporal. Untuk memastikan model robust terhadap anomali cuaca, rentang data latih ditetapkan pada periode Januari 2022 hingga Desember 2024 guna mencakup fenomena La Niña (2022), kondisi normal (awal 2023), hingga El Niño (2023–2024). Selanjutnya, model akan divalidasi menggunakan data tahun 2025 sebagai pengujian out-of-sample dengan membandingkan estimasi grid berskala mikro terhadap angka produksi agregat resmi dari BPS.",
    out: "Rumusan masalah, penentuan kerangka two-phase modeling, dan penetapan target resolusi grid 1 km × 1 km.",
    image: "/Peta Indramayu.png" 
  },
  {
    name: "Data Understanding", // Pastikan ada kata Data Understanding di sini
    goal: "Mengidentifikasi kualitas, resolusi, dan keterbatasan enam sumber data.",
    out: "Distribusi kelas KSA, eksplorasi indeks spektral, dan spesifikasi Tabel 3.",
  },
  {
    name: "Data Preparation",
    goal: "", 
    items: [
      "Prapemrosesan Sentinel-1: Kalibrasi radiometrik, koreksi topografi SRTM, dan filter speckle boxcar untuk mengekstrak VV, VH, dan RVI.",
      "Prapemrosesan Sentinel-2: Filter SCL Level-2A untuk membuang awan/bayangan, lalu dirangkum menggunakan median dalam radius 10m.",
      "Penyesuaian Temporal: Ekstraksi fitur diambil dari komposit 7 hari terakhir tiap bulan (selaras jadwal KSA). Untuk regresi, Sentinel-1 diagregasi dengan median bulanan, dan data iklim diakumulasi.",
      "Ekstraksi Klasifikasi: Memadukan 7 indeks (VV, VH, RVI, NDVI, EVI, LSWI, BSI) plus lag 3 bulan ke belakang. Split data 80% latih dan 20% uji secara kronologis (tanpa pengacakan).",
      "Rekayasa Temporal Regresi: Agregasi per grid 1 km, interpolasi bilinear untuk iklim, dan interpolasi linear untuk piksel Sentinel-2 yang kosong akibat awan. Semua fitur dikenakan rolling window 90-130 hari."
    ],
    out: "Dua dataset siap latih: (1) Dataset titik sampel klasifikasi multitemporal; (2) Dataset regresi per grid berskala mikro (berisi lag indeks satelit, iklim, dan target luasan/produktivitas downscaling).",
  },
  {
    name: "Modeling",
    goal: "Fase ini mengeksekusi dua tugas pemodelan berurutan: klasifikasi peta sawah dan regresi estimasi produksi padi tingkat grid.",
    items: [
      "Sub-fase Klasifikasi: Memetakan sebaran sawah aktif resolusi 10 m menggunakan 8 algoritma (CART, RF, XGBoost, LightGBM, LSTM, BiLSTM).",
      "Modifikasi Arsitektur Klasifikasi: Arsitektur baseline LSTM/BiLSTM dari Filho et al. (2020) dimodifikasi untuk menangani kompleksitas integrasi optik-radar dan mencegah overfitting. Output peta klasifikasi ini dimasking dengan Lahan Baku Sawah (LBS) BIG untuk memastikan estimasi hanya dilakukan pada area sawah resmi.",
      "Sub-fase Regresi (Grid 1 km): Mengestimasi target luasan dan produktivitas hasil downscaling menggunakan 9 algoritma regresi (CatBoost, RF, XGBoost, LightGBM, LSTM, BiLSTM). Kontribusi setiap fitur dievaluasi melalui 5 skenario ablation study (Hanya S1, Hanya S2, Iklim Saja, S1+S2, dan Gabungan Semua Fitur).",
      "Hyperparameter Tuning & Training: Algoritma pohon keputusan diacak lewat Randomized Search (5 iterasi + k-fold MAE). Model Deep Learning menggunakan arsitektur dual-output dengan EarlyStopping dan ReduceLROnPlateau. Model dilatih dengan rasio 80:20 (latih:uji)."
    ],
    out: "Model klasifikasi terbaik dan model regresi dual-output optimal, menghasilkan peta estimasi produksi berskala 1 km × 1 km per kecamatan.",
    modelingImages: [
      {
        src1: "/Filho_LSTM.png",
        src2: "/Filho_BiLSTM.png",
        caption1: "(a) LSTM",
        caption2: "(b) BiLSTM",
        title: "Gambar 1. Arsitektur Klasifikasi (Filho et al., 2020)"
      },
      {
        src1: "/Jeong_LSTM.png",
        src2: "/Jeong_BiLSTM.png",
        caption1: "(a) LSTM",
        caption2: "(b) BiLSTM",
        title: "Gambar 2. Arsitektur Regresi (Jeong et al., 2024)"
      }
    ]
  },
  {
    name: "Evaluation",
    goal: "Fase ini mengevaluasi kinerja komparatif seluruh algoritma, menginterpretasikan metrik secara praktis, dan memastikan model menjawab kebutuhan pemantauan peringatan dini pangan.",
    items: [
      "Evaluasi Klasifikasi: Menggunakan 3 metrik ketat untuk menangani ketidakseimbangan kelas. (1) Akurasi (gambaran umum prediksi benar), (2) Macro F1-Score (memberi bobot seimbang pada kelas minoritas), dan (3) Cohen's Kappa (menghilangkan ilusi akurasi dari tebakan acak).",
      "Evaluasi Regresi: Diukur menggunakan R-Squared (R²) untuk melihat proporsi variansi produksi yang tertangkap, dan RMSE untuk mengukur besaran rata-rata galat (penalti tinggi untuk error besar).",
      "Validasi Independen: Evaluasi dilakukan secara konsisten pada set data uji (20%) yang sama sekali tidak dilibatkan selama pelatihan maupun tuning hyperparameter agar hasilnya tidak bias."
    ],
    out: "Tabel komparasi kinerja model dan skenario, identifikasi algoritma terbaik, serta analisis pola kesalahan (kelebihan/keterbatasan) integrasi optik-radar-iklim.",
  },
] as const;
