export type Kecamatan = {
  name: string;
  produksi2022: number;
  perubahan2023: number;
  perubahan2024: number;
  perubahan2025: number;
};

export const KECAMATAN: Kecamatan[] = [
  { name: "Krangkeng", produksi2022: 69657, perubahan2023: -2904, perubahan2024: -2695, perubahan2025: -2556 },
  { name: "Karangampel", produksi2022: 35011, perubahan2023: -1136, perubahan2024: -859, perubahan2025: -10154 },
  { name: "Juntinyuat", produksi2022: 59321, perubahan2023: -620, perubahan2024: -1784, perubahan2025: -3491 },
  { name: "Sliyeg", produksi2022: 66813, perubahan2023: -315, perubahan2024: -1556, perubahan2025: -8912 },
  { name: "Jatibarang", produksi2022: 36551, perubahan2023: -871, perubahan2024: -670, perubahan2025: 8136 },
  { name: "Balongan", produksi2022: 35772, perubahan2023: -833, perubahan2024: -795, perubahan2025: -11084 },
  { name: "Indramayu", produksi2022: 27049, perubahan2023: -243, perubahan2024: -1905, perubahan2025: -1159 },
  { name: "Sindang", produksi2022: 26577, perubahan2023: 319, perubahan2024: -1460, perubahan2025: 1987 },
  { name: "Cantigi", produksi2022: 21437, perubahan2023: -1379, perubahan2024: -1082, perubahan2025: 3956 },
  { name: "Lohbener", produksi2022: 36790, perubahan2023: -1124, perubahan2024: -933, perubahan2025: 323 },
  { name: "Arahan", produksi2022: 36326, perubahan2023: -2493, perubahan2024: -104, perubahan2025: -343 },
  { name: "Losarang", produksi2022: 78621, perubahan2023: -6189, perubahan2024: -442, perubahan2025: -18201 },
  { name: "Kandanghaur", produksi2022: 90728, perubahan2023: -3270, perubahan2024: -1518, perubahan2025: -18426 },
  { name: "Bongas", produksi2022: 56242, perubahan2023: -310, perubahan2024: -2646, perubahan2025: -4142 },
  { name: "Anjatan", produksi2022: 90052, perubahan2023: -3069, perubahan2024: -943, perubahan2025: 20136 },
  { name: "Sukra", produksi2022: 50421, perubahan2023: -1027, perubahan2024: -2418, perubahan2025: -8675 },
  { name: "Gantar", produksi2022: 117736, perubahan2023: 1336, perubahan2024: -8808, perubahan2025: -58831 },
  { name: "Terisi", produksi2022: 105025, perubahan2023: -2944, perubahan2024: 1411, perubahan2025: -429 },
  { name: "Sukagumiwang", produksi2022: 33074, perubahan2023: -1727, perubahan2024: -187, perubahan2025: -16559 },
  { name: "Kedokan Bunder", produksi2022: 31426, perubahan2023: 752, perubahan2024: -340, perubahan2025: -12134 },
  { name: "Pasekan", produksi2022: 9819, perubahan2023: 290, perubahan2024: -604, perubahan2025: 3670 },
  { name: "Tukdana", produksi2022: 54394, perubahan2023: -601, perubahan2024: -1874, perubahan2025: -22965 },
  { name: "Patrol", produksi2022: 46034, perubahan2023: -3368, perubahan2024: -2191, perubahan2025: -9699 },
  { name: "Haurgeulis", produksi2022: 54610, perubahan2023: -4274, perubahan2024: 2435, perubahan2025: 14875 },
  { name: "Kroya", produksi2022: 143393, perubahan2023: -9461, perubahan2024: 4723, perubahan2025: -9586 },
  { name: "Gabuswetan", produksi2022: 104454, perubahan2023: -10153, perubahan2024: 4435, perubahan2025: 9296 },
  { name: "Cikedung", produksi2022: 64693, perubahan2023: -5491, perubahan2024: 2203, perubahan2025: 1065 },
  { name: "Lelea", produksi2022: 71961, perubahan2023: -537, perubahan2024: -2448, perubahan2025: -2722 },
  { name: "Bangodua", produksi2022: 51589, perubahan2023: -105, perubahan2024: -1719, perubahan2025: -12236 },
  { name: "Widasari", produksi2022: 45377, perubahan2023: -3, perubahan2024: -1754, perubahan2025: 5840 },
  { name: "Kertasemaya", produksi2022: 41324, perubahan2023: 1131, perubahan2024: -568, perubahan2025: -9854 },
];

export const KEC_BY_NAME = Object.fromEntries(KECAMATAN.map((k) => [k.name, k]));
