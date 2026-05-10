export function createEmptyVenueForm() {
  return {
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    mediaUrl: "",
    city: "",
    country: "",
    lat: "",
    lng: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };
}

export function mapVenueToForm(venue) {
  return {
    name: venue.name || "",
    description: venue.description || "",
    price: venue.price || "",
    maxGuests: venue.maxGuests || "",
    mediaUrl: venue.media?.[0]?.url || "",
    city: venue.location?.city || "",
    country: venue.location?.country || "",
    lat: venue.location?.lat ?? "",
    lng: venue.location?.lng ?? "",
    wifi: venue.meta?.wifi || false,
    parking: venue.meta?.parking || false,
    breakfast: venue.meta?.breakfast || false,
    pets: venue.meta?.pets || false,
  };
}

export function validateVenueForm(venueForm) {
  if (!venueForm.name.trim()) {
    return "Venue name is required.";
  }

  if (!venueForm.description.trim()) {
    return "Description is required.";
  }

  if (!venueForm.price || Number(venueForm.price) < 1) {
    return "Price must be at least 1.";
  }

  if (!venueForm.maxGuests || Number(venueForm.maxGuests) < 1) {
    return "Max guests must be at least 1.";
  }

  return "";
}

export function mapVenueFormToPayload(venueForm) {
  const name = venueForm.name.trim();

  return {
    name,
    description: venueForm.description.trim(),
    price: Number(venueForm.price),
    maxGuests: Number(venueForm.maxGuests),
    media: venueForm.mediaUrl.trim()
      ? [
          {
            url: venueForm.mediaUrl.trim(),
            alt: name,
          },
        ]
      : [],
    meta: {
      wifi: venueForm.wifi,
      parking: venueForm.parking,
      breakfast: venueForm.breakfast,
      pets: venueForm.pets,
    },
    location: {
      address: "",
      city: venueForm.city.trim(),
      zip: "",
      country: venueForm.country.trim(),
      continent: "",
      lat: venueForm.lat ? Number(venueForm.lat) : 0,
      lng: venueForm.lng ? Number(venueForm.lng) : 0,
    },
  };
}
