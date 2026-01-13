import fs from "fs";
import { FeatureCollection } from "geojson";

const input = process.argv[3];
const file = process.argv[2];

const geojson: FeatureCollection = JSON.parse(fs.readFileSync(file, "utf-8")) as GeoJSON.FeatureCollection;

if (input === "huts") {
  convertHuts(geojson);
} else if (input === "peaks") {
  convertPeaks(geojson);
} else if (input === "lakes") {
  convertLakes(geojson);
} else {
  console.error("Unknown input type. Use 'huts' | 'peaks' | 'lakes'.");
  process.exit(1);
}

function convertHuts(geojson: FeatureCollection) {
  const huts = geojson.features
    .map((feature: GeoJSON.Feature) => {
      if (feature.properties?.name == "") return null;
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates;
      return {
        name: feature.properties?.name as string,
        description: `Operator: ${(feature.properties?.operator ?? "Unbekannt") as string}, Tenant: ${(feature.properties?.["operator:tenant"] ?? "Unbekannt") as string}`,
        category: "hut",
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      };
    })
    .filter(Boolean);

  fs.writeFileSync("src/helper/seeder/seed-data/huts.ts", `export const hutSeeds = ${JSON.stringify(huts, null, 2)};`);
}

function convertPeaks(geojson: FeatureCollection) {
  const peaks = geojson.features
    .map((feature: GeoJSON.Feature) => {
      if (feature.properties?.name == "" || feature.properties?.name == null) return null;
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates;
      return {
        name: feature.properties?.name as string,
        description: `Elevation: ${(feature.properties?.ele ?? "Unbekannt") as string} meters`,
        category: "peak",
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      };
    })
    .filter(Boolean);

  fs.writeFileSync("src/helper/seeder/seed-data/peaks.ts", `export const peakSeeds = ${JSON.stringify(peaks, null, 2)};`);
}

function convertLakes(geojson: FeatureCollection) {
  const lakes = geojson.features
    .map((feature: GeoJSON.Feature) => {
      if (feature.properties?.name == "" || feature.properties?.name == null || (feature.properties?.name as string).includes("Weiher")) return null;
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates;
      return {
        name: feature.properties?.name as string,
        description: `Description: ${(feature.properties?.description ?? "") as string}`,
        category: "lake",
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      };
    })
    .filter(Boolean);

  fs.writeFileSync("src/helper/seeder/seed-data/lakes.ts", `export const lakeSeeds = ${JSON.stringify(lakes, null, 2)};`);
}
