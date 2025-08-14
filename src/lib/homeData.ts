import path from "path";
import { promises as fs } from "fs";
import { HomeStats, Plant } from "@/types/plants";

const p = (...args: string[]) => path.join(process.cwd(), ...args);

async function readJsonSafe<T>(absPath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(absPath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[homeData] No se pudo leer ${absPath}:`, err);
    return fallback;
  }
}

export async function getPlants(): Promise<Plant[]> {
  const file = p("public", "data", "plants_home.json");
  return readJsonSafe<Plant[]>(file, []);
}

export async function getHomeStats(): Promise<HomeStats> {
  const file = p("public", "data", "stats_home.json");
  const fallback: HomeStats = {
    totalPlants: 0,
    totalUsers: 0,
    sensorsInstalled: 0,
    sensorsActive: 0,
    uptime: "—",
    lastUpdate: new Date(0).toISOString()
  };
  return readJsonSafe<HomeStats>(file, fallback);
}

export async function getProjectGoals(): Promise<string[]> {
  const file = p("public", "data", "project_goals.json");
  const data = await readJsonSafe<{ goals?: string[] }>(file, { goals: [] });
  return data.goals ?? [];
}
