import fs from 'fs';
import path from 'path';

// Lokasi file datauser.json
const dataUserPath = path.join(process.cwd(), 'pages', 'module', 'datauser.json');

// Fungsi untuk membaca data dari file JSON
export const readDataUser = (): { id: number; name: string; email: string; password: string }[] => {
  const data = fs.readFileSync(dataUserPath, 'utf8');
  return JSON.parse(data);
};

// Fungsi untuk menulis data ke file JSON
export const writeDataUser = (
  data: Array<{ id: number; name: string; email: string; password: string }>
) => {
  fs.writeFileSync(dataUserPath, JSON.stringify(data, null, 2), 'utf8');
};
