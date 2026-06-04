/**
 * Creates the default state object used by the venue create/edit form.
 *
 * @returns {Object} Empty venue form values.
 */
export function createEmptyVenueForm() {
  return {
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [{ url: "", alt: "" }],
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: "",
    lng: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };
}

/**
 * Maps a venue from the API into the flat form shape used by ManagerVenueForm.
 *
 * @param {Object} venue - Venue data returned from the Holidaze API.
 * @returns {Object} Venue form values ready for editing.
 */
export function mapVenueToForm(venue) {
  const media =
    venue.media?.length > 0
      ? venue.media.map((image) => ({
          url: image.url || "",
          alt: image.alt || venue.name || "",
        }))
      : [{ url: "", alt: venue.name || "" }];

  return {
    name: venue.name || "",
    description: venue.description || "",
    price: venue.price || "",
    maxGuests: venue.maxGuests || "",
    media,
    address: venue.location?.address || "",
    city: venue.location?.city || "",
    zip: venue.location?.zip || "",
    country: venue.location?.country || "",
    continent: venue.location?.continent || "",
    lat: venue.location?.lat || "",
    lng: venue.location?.lng || "",
    wifi: venue.meta?.wifi || false,
    parking: venue.meta?.parking || false,
    breakfast: venue.meta?.breakfast || false,
    pets: venue.meta?.pets || false,
  };
}

/**
 * Validates the venue form before creating or updating a venue.
 *
 * Checks required text fields, numeric values, image fields, image URL format,
 * and optional latitude/longitude ranges.
 *
 * @function validateVenueForm
 *
 * @param {Object} venueForm - The venue form state to validate
 * @param {string} venueForm.name - Venue name
 * @param {string} venueForm.description - Venue description
 * @param {string|number} venueForm.price - Price per night
 * @param {string|number} venueForm.maxGuests - Maximum number of guests
 * @param {Array<{url: string, alt: string}>} [venueForm.media] - Venue image fields
 * @param {string|number} [venueForm.lat] - Optional latitude value
 * @param {string|number} [venueForm.lng] - Optional longitude value
 *
 * @returns {string} Returns an error message if validation fails, otherwise an empty string
 *
 * @example
 * const error = validateVenueForm(venueForm);
 *
 * if (error) {
 *   setFormError(error);
 *   return;
 * }
 */
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

  const hasInvalidImage = venueForm.media?.some((image) => {
    const hasUrl = image.url.trim();
    const hasAlt = image.alt.trim();

    return !hasUrl && hasAlt;
  });

  if (hasInvalidImage) {
    return "Image alt text requires an image URL.";
  }

  const hasInvalidUrl = venueForm.media?.some((image) => {
    if (!image.url.trim()) return false;

    try {
      new URL(image.url.trim());
      return false;
    } catch {
      return true;
    }
  });

  if (hasInvalidUrl) {
    return "Please enter a valid image URL.";
  }

  const hasInvalidLatitude =
    venueForm.lat && (Number(venueForm.lat) < -90 || Number(venueForm.lat) > 90);

  if (hasInvalidLatitude) {
    return "Latitude must be between -90 and 90.";
  }

  const hasInvalidLongitude =
    venueForm.lng &&
    (Number(venueForm.lng) < -180 || Number(venueForm.lng) > 180);

  if (hasInvalidLongitude) {
    return "Longitude must be between -180 and 180.";
  }

  return "";
}

/**
 * Maps venue form state to the payload shape required by the Noroff Holidaze API.
 *
 * @function mapVenueFormToPayload
 *
 * @param {Object} form - Venue form state
 * @param {string} form.name - Venue name
 * @param {string} form.description - Venue description
 * @param {string|number} form.price - Price per night
 * @param {string|number} form.maxGuests - Maximum number of guests
 * @param {Array<{url: string, alt: string}>} form.media - Venue images
 * @param {string} [form.address] - Venue street address
 * @param {string} [form.city] - Venue city
 * @param {string} [form.zip] - Venue zip code
 * @param {string} [form.country] - Venue country
 * @param {string} [form.continent] - Venue continent
 * @param {string|number} [form.lat] - Venue latitude
 * @param {string|number} [form.lng] - Venue longitude
 *
 * @returns {Object} Venue payload for create/update requests
 */
export function mapVenueFormToPayload(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    maxGuests: Number(form.maxGuests),
    media: form.media
      .filter((image) => image.url.trim())
      .map((image) => ({
        url: image.url.trim(),
        alt: image.alt.trim() || form.name.trim(),
      })),
    meta: {
      wifi: form.wifi,
      parking: form.parking,
      breakfast: form.breakfast,
      pets: form.pets,
    },
    location: {
      address: form.address?.trim() || "",
      city: form.city?.trim() || "",
      zip: form.zip?.trim() || "",
      country: form.country?.trim() || "",
      continent: form.continent?.trim() || "",
      lat: form.lat ? Number(form.lat) : 0,
      lng: form.lng ? Number(form.lng) : 0,
    },
  };
}
