export function geoEngine({ city, zip, lead_score }) {
  let region = "unknown";
  let priority = "low";

  // 🌍 REGION MAPPING
  const west = ["calgary", "edmonton", "vancouver"];
  const central = ["toronto", "mississauga", "ottawa"];

  const normalizedCity = (city || "").toLowerCase();

  if (west.includes(normalizedCity)) region = "west";
  if (central.includes(normalizedCity)) region = "central";

  // 🔥 PRIORITY RULES
  if (lead_score >= 80) priority = "hot";
  else if (lead_score >= 50) priority = "warm";

  if (zip && zip.startsWith("T")) priority = "high"; // example override

  return {
    region,
    priority,
  };
}
