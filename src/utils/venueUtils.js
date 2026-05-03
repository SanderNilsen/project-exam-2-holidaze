export function formatLocation(location) {
  const city = location?.city;
  const country = location?.country;

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;

  return "Location not available";
}

export function getFacilities(meta) {
  const facilities = [];

  if (meta?.wifi) facilities.push("Wifi");
  if (meta?.parking) facilities.push("Parking");
  if (meta?.breakfast) facilities.push("Breakfast");
  if (meta?.pets) facilities.push("Pet-friendly");

  return facilities;
}
