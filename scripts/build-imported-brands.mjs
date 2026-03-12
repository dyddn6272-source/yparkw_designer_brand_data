import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (flag, fallback = "") => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : fallback;
};

const inputPath = getArg("--input");
const outputPath = getArg("--output", "data/imported-brands.js");

if (!inputPath) {
  console.error("Usage: node scripts/build-imported-brands.mjs --input imports/raw-brands.json [--output data/imported-brands.js]");
  process.exit(1);
}

const toArray = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (!value) return [];
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
};

const toLocations = (record, showroom) => {
  if (Array.isArray(record.locations) && record.locations.length) {
    return record.locations
      .map((item) => ({
        type: item.type || "매장",
        name: item.name || `${record.name || "브랜드"} 포인트`,
        address: item.address || showroom
      }))
      .filter((item) => item.address);
  }

  return showroom
    ? [{ type: "쇼룸", name: `${record.name || "브랜드"} 쇼룸`, address: showroom }]
    : [];
};

const raw = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
const items = Array.isArray(raw) ? raw : raw.items || [];
const deduped = new Map();

for (const record of items) {
  const name = String(record.name || "").trim();
  if (!name) continue;

  const showroom = String(record.showroom || record.address || "").trim();
  const normalized = {
    name,
    categories: toArray(record.categories).length ? toArray(record.categories) : ["의류"],
    styles: toArray(record.styles).length ? toArray(record.styles) : ["기타"],
    regions: toArray(record.regions).length ? toArray(record.regions) : ["미확인"],
    summary: String(record.summary || `${name} 브랜드 데이터가 가져와졌습니다.`).trim(),
    styleNote: String(record.styleNote || `${name} 스타일 메모는 추가 검수 필요`).trim(),
    showroom,
    officialSite: String(record.officialSite || "").trim(),
    sourceUrl: String(record.sourceUrl || record.officialSite || "").trim(),
    qualityTone: String(record.qualityTone || (record.officialSite ? "official" : "mixed")).trim(),
    locations: toLocations(record, showroom)
  };

  deduped.set(name.toLowerCase(), normalized);
}

const output = `window.IMPORTED_BRAND_DATA = ${JSON.stringify([...deduped.values()], null, 2)};\n`;
fs.writeFileSync(path.resolve(outputPath), output, "utf8");
console.log(`Wrote ${deduped.size} brands to ${outputPath}`);
