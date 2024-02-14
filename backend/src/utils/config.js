import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const ALGORITHM = process.env.ALGORITHM || "es-256-cbc";
export const KEY =
  process.env.KEY ||
  "8987dfbf6b0c25a02535d452de04248690086a8dc7acf50ac966f1101a29ac09";
export const IV = process.env.IV || "b072d4a9be544a7c34f4517ff52f3621";
export const TYPE = process.env.TYPE || "hex";
