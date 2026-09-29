"""Angka skripsi — ubah di sini jika ingin menyesuaikan tampilan."""

KECAMATAN = [
    {"name": "Anjatan", "area_ha": 8449.16, "lbs_ha": 6643.62, "plant_ha": 6314.73, "activity": 77.51, "prod_2025": 111044.6},
    {"name": "Arahan", "area_ha": 3434.25, "lbs_ha": 2080.71, "plant_ha": 1890.33, "activity": 62.86, "prod_2025": 33386.21},
    {"name": "Balongan", "area_ha": 3448.12, "lbs_ha": 2024.91, "plant_ha": 1859.96, "activity": 60.27, "prod_2025": 23059.28},
    {"name": "Bangodua", "area_ha": 4370.97, "lbs_ha": 3472.34, "plant_ha": 3308.43, "activity": 78.72, "prod_2025": 37527.46},
    {"name": "Bongas", "area_ha": 4989.9, "lbs_ha": 4058.68, "plant_ha": 3889.59, "activity": 80.4, "prod_2025": 49143.41},
    {"name": "Cantigi", "area_ha": 8531.6, "lbs_ha": 1442.26, "plant_ha": 1221.76, "activity": 26.74, "prod_2025": 22931.44},
    {"name": "Cikedung", "area_ha": 11306.64, "lbs_ha": 4146.52, "plant_ha": 3744.51, "activity": 62.44, "prod_2025": 62470.78},
    {"name": "Gabuswetan", "area_ha": 7774.82, "lbs_ha": 6481, "plant_ha": 5832.2, "activity": 77.39, "prod_2025": 108034.01},
    {"name": "Gantar", "area_ha": 17204.31, "lbs_ha": 8804.37, "plant_ha": 7281.32, "activity": 55.27, "prod_2025": 53996.51},
    {"name": "Haurgeulis", "area_ha": 6396.2, "lbs_ha": 4557.38, "plant_ha": 4189.01, "activity": 68.07, "prod_2025": 69559.54},
    {"name": "Indramayu", "area_ha": 5458.97, "lbs_ha": 1750.45, "plant_ha": 1535.48, "activity": 37.22, "prod_2025": 23740.69},
    {"name": "Jatibarang", "area_ha": 4311.07, "lbs_ha": 2679.29, "plant_ha": 2465.19, "activity": 61.02, "prod_2025": 43146.18},
    {"name": "Juntinyuat", "area_ha": 5420.25, "lbs_ha": 3878.97, "plant_ha": 3459.73, "activity": 69.33, "prod_2025": 58480.06},
    {"name": "Kandanghaur", "area_ha": 8772.03, "lbs_ha": 5998.72, "plant_ha": 4942.56, "activity": 62.27, "prod_2025": 68111.79},
    {"name": "Karangampel", "area_ha": 3073.12, "lbs_ha": 2118.58, "plant_ha": 1884.06, "activity": 65.68, "prod_2025": 22861.51},
    {"name": "Kedokan Bunder", "area_ha": 3176.59, "lbs_ha": 2406.39, "plant_ha": 2235.08, "activity": 74.3, "prod_2025": 21788.69},
    {"name": "Kertasemaya", "area_ha": 3839.33, "lbs_ha": 2629.26, "plant_ha": 2487.45, "activity": 67.92, "prod_2025": 33030.75},
    {"name": "Krangkeng", "area_ha": 7365.64, "lbs_ha": 4712.95, "plant_ha": 4299.43, "activity": 65.75, "prod_2025": 74288.53},
    {"name": "Kroya", "area_ha": 13522.59, "lbs_ha": 10384.09, "plant_ha": 9156.41, "activity": 74.06, "prod_2025": 129068.57},
    {"name": "Lelea", "area_ha": 6175.04, "lbs_ha": 4943.73, "plant_ha": 4662.3, "activity": 79.4, "prod_2025": 66253.08},
    {"name": "Lohbener", "area_ha": 3806.04, "lbs_ha": 2543.05, "plant_ha": 2368.18, "activity": 66.85, "prod_2025": 35056.3},
    {"name": "Losarang", "area_ha": 10800.97, "lbs_ha": 5020.82, "plant_ha": 4399.39, "activity": 52.72, "prod_2025": 53788.73},
    {"name": "Pasekan", "area_ha": 6821.69, "lbs_ha": 759.59, "plant_ha": 707.3, "activity": 25.21, "prod_2025": 13175.85},
    {"name": "Patrol", "area_ha": 4234.09, "lbs_ha": 3230.53, "plant_ha": 2676.04, "activity": 67.29, "prod_2025": 32380.65},
    {"name": "Sindang", "area_ha": 3764.56, "lbs_ha": 1901.35, "plant_ha": 1737.54, "activity": 55.83, "prod_2025": 27424.12},
    {"name": "Sliyeg", "area_ha": 5465.18, "lbs_ha": 4099.76, "plant_ha": 3821.76, "activity": 75.88, "prod_2025": 56029.99},
    {"name": "Sukagumiwang", "area_ha": 3301.8, "lbs_ha": 2213.81, "plant_ha": 2017.35, "activity": 66.13, "prod_2025": 18237.11},
    {"name": "Sukra", "area_ha": 4434.74, "lbs_ha": 3481.12, "plant_ha": 3160.48, "activity": 74.2, "prod_2025": 48803.44},
    {"name": "Terisi", "area_ha": 16772.59, "lbs_ha": 8182.77, "plant_ha": 6514.54, "activity": 55.0, "prod_2025": 106254.8},
    {"name": "Tukdana", "area_ha": 7528.57, "lbs_ha": 3429.29, "plant_ha": 3285.28, "activity": 71.3, "prod_2025": 29856.37},
    {"name": "Widasari", "area_ha": 3994.55, "lbs_ha": 3045.08, "plant_ha": 2844.38, "activity": 74.79, "prod_2025": 49461.08},
]

CLASSIFICATION = [
    {"model": "BiLSTM (Modifikasi)", "acc": 0.9488, "f1": 0.9514, "kappa": 0.8977},
    {"model": "LSTM (Modifikasi)", "acc": 0.9457, "f1": 0.9487, "kappa": 0.8914},
    {"model": "XGBoost", "acc": 0.9449, "f1": 0.9476, "kappa": 0.8898},
    {"model": "LightGBM", "acc": 0.9416, "f1": 0.9445, "kappa": 0.8833},
    {"model": "LSTM (Filho et al., 2020)", "acc": 0.9398, "f1": 0.9424, "kappa": 0.8797},
    {"model": "BiLSTM (Filho et al., 2020)", "acc": 0.9388, "f1": 0.9415, "kappa": 0.8777},
    {"model": "Random Forest", "acc": 0.9381, "f1": 0.9418, "kappa": 0.8765},
    {"model": "CART", "acc": 0.8990, "f1": 0.9047, "kappa": 0.7982},
]

RELATED = [
    ["Nazir et al. (2021)", "Prediksi", "Sentinel-2, GPS, kuesioner", "PLSR, regresi linier", "Punjab, Pakistan"],
    ["Fan et al. (2024)", "Prediksi", "Sentinel-2, agrometeorologi, DEM", "RF, SVM, PLSR", "Chongqing, Tiongkok"],
    ["Islam et al. (2023)", "Prediksi", "Statistik, NDVI MODIS, meteorologi", "Stack Ensemble, XGB, LGBM, RF", "Terai, Nepal"],
    ["Wang et al. (2019)", "Prediksi", "Sentinel-1A VH/VV", "Korelasi time series SAR", "Jiangsu, Tiongkok"],
    ["Tiwari et al. (2024)", "Klasifikasi, Prediksi", "Optik time series, statistik", "Random Forest", "Bangladesh"],
    ["Arumugam et al. (2021)", "Prediksi", "LAI MODIS, statistik distrik", "Gradient Boosted Regression", "India"],
    ["Filho et al. (2020)", "Klasifikasi", "SAR Sentinel-1A", "LSTM, BiLSTM, SVM", "Uruguaiana, Brasil"],
    ["Saini & Nagpal (2024)", "Klasifikasi, Prediksi", "S1, S2, Landsat-8, iklim", "Hybrid DNN, Conv1D, LSTM", "Haryana, India"],
    ["Thorp & Drajat (2021)", "Klasifikasi", "KSA BPS, S1, S2", "DNN, CNN, RNN, LSTM", "Jawa Barat, Indonesia"],
    ["Penelitian ini", "Klasifikasi, Prediksi", "S1, S2, CHIRPS, ERA5-Land, KSA", "CART–BiLSTM + regresi", "Indramayu, Jawa Barat"],
]

PRODUCTIVITY = [
    ("BiLSTM Modifikasi", "Sentinel-1", 0.7389, 0.9555),
    ("BiLSTM Modifikasi", "Sentinel-2", 0.7619, 0.9126),
    ("BiLSTM Modifikasi", "Iklim", 0.5135, 1.3044),
    ("BiLSTM Modifikasi", "S1+S2", 0.7826, 0.8720),
    ("BiLSTM Modifikasi", "Semua fitur", 0.8146, 0.8053),
    ("LightGBM", "Sentinel-1", 0.7560, 0.9237),
    ("LightGBM", "Sentinel-2", 0.7317, 0.9687),
    ("LightGBM", "Iklim", 0.6492, 1.1077),
    ("LightGBM", "S1+S2", 0.7711, 0.8948),
    ("LightGBM", "Semua fitur", 0.7759, 0.8853),
]

AREA = [
    ("LightGBM", "Sentinel-1", 0.5723, 19.5818),
    ("LightGBM", "Sentinel-2", 0.5668, 19.7074),
    ("LightGBM", "Iklim", 0.5371, 20.3709),
    ("LightGBM", "S1+S2", 0.6181, 18.5034),
    ("LightGBM", "Semua fitur", 0.6113, 18.6675),
]

SCENARIOS = [
    ("Sentinel-1", 1685100, "Overestimasi"),
    ("Sentinel-2", 1644756, "Overestimasi"),
    ("Iklim saja", 869597, "Underestimasi tajam"),
    ("S1 + S2", 1582391, "Paling presisi"),
    ("Semua fitur", 539991, "Tidak stabil"),
    ("Data BPS 2025", 1583262, "Acuan resmi"),
]

DATA_SOURCES = [
    ["Produksi padi", "KSA, BPS", "—", "Bulanan"],
    ["Sentinel-1", "ESA", "10 m", "6–12 hari"],
    ["Sentinel-2", "ESA", "10 m", "5 hari"],
    ["Curah hujan", "CHIRPS", "~0,05°", "Harian"],
    ["Suhu, radiasi, kelembapan tanah", "ERA5-Land", "~0,1°", "Harian"],
    ["Lahan Baku Sawah", "BIG", "Poligon", "Bulanan"],
]

BPS_2025 = 1_583_262
