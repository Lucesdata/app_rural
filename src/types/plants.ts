export type PlantSource = "Pozo profundo" | "Bocatoma" | "Otra";
export interface Plant {
  id: string;
  nombre: string;
  vereda: string;
  corregimiento: string;
  fuente: PlantSource | string;
  usuarios?: number;
  imagen?: string;
}
export interface HomeStats {
  totalPlants: number;
  totalUsers: number;
  sensorsInstalled: number;
  sensorsActive: number;
  uptime: string;
  lastUpdate: string;
}
