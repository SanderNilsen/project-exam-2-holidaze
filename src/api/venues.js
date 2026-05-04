import { API_BASE_URL } from "./constants";

/**
 * Fetches a paginated list of venues from the API.
 *
 * @async
 * @function getVenues
 *
 * @param {Object} [options] - Query options
 * @param {number} [options.page=1] - Page number to fetch
 * @param {number} [options.limit=12] - Number of venues per page
 * @param {string} [options.sort="created"] - Field to sort venues by
 * @param {string} [options.sortOrder="desc"] - Sort direction, either "asc" or "desc"
 *
 * @returns {Promise<{data: Array, meta: Object}>} Returns venues and pagination metadata
 *
 * @throws {Error} Throws an error if the request fails
 */
export async function getVenues({
  page = 1,
  limit = 12,
  sort = "created",
  sortOrder = "desc",
} = {}) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to fetch venues.");
  }

  return data;
}

/**
 * Fetches a single venue by id from the Noroff Holidaze API.
 *
 * @async
 * @function getVenueById
 *
 * @param {string} id - Venue id
 * @returns {Promise<Object>} Returns a single venue object
 *
 * @throws {Error} Throws an error if the request fails
 */
export async function getVenueById(id) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues/${id}?_bookings=true`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to fetch venue.");
  }

  return data.data;
}

/**
 * Creates a new venue.
 *
 * @async
 * @function createVenue
 *
 * @param {Object} params
 * @param {string} params.token
 * @param {string} params.apiKey
 * @param {Object} params.venue
 *
 * @returns {Promise<Object>} Created venue data
 *
 * @throws {Error} Throws an error if venue creation fails
 */
export async function createVenue({ token, apiKey, venue }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(venue),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to create venue.");
  }

  return data.data;
}

/**
 * Updates an existing venue.
 *
 * @async
 * @function updateVenue
 *
 * @param {Object} params
 * @param {string} params.id - Venue id
 * @param {string} params.token - JWT access token
 * @param {string} params.apiKey - Noroff API key
 * @param {Object} params.venue - Updated venue data
 *
 * @returns {Promise<Object>} Updated venue data
 *
 * @throws {Error} Throws an error if venue update fails
 */
export async function updateVenue({ id, token, apiKey, venue }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(venue),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to update venue.");
  }

  return data.data;
}

/**
 * Deletes an existing venue.
 *
 * @async
 * @function deleteVenue
 *
 * @param {Object} params
 * @param {string} params.id - Venue id
 * @param {string} params.token - JWT access token
 * @param {string} params.apiKey - Noroff API key
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} Throws an error if venue delete fails
 */
export async function deleteVenue({ id, token, apiKey }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data?.errors?.[0]?.message || "Failed to delete venue.");
  }
}