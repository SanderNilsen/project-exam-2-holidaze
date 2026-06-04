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

export function getVenueSearchText(venue) {
  const facilities = getFacilities(venue.meta).join(" ");

  return [
    venue.name,
    venue.title,
    venue.description,
    venue.location?.address,
    venue.location?.city,
    venue.location?.zip,
    venue.location?.country,
    venue.location?.continent,
    facilities,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesSearch(venue, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return true;

  return getVenueSearchText(venue).includes(normalizedQuery);
}

export function matchesFacilities(venue, selectedFacilities) {
  if (selectedFacilities.length === 0) return true;

  return selectedFacilities.every((facility) => venue.meta?.[facility]);
}