import { API_BASE_URL } from "./constants";
import {
  authHeaders,
  authJsonHeaders,
  parseJsonOrThrow,
  throwIfResponseError,
} from "./client";

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

  const data = await parseJsonOrThrow(response, "Failed to fetch venues.");

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
    `${API_BASE_URL}/holidaze/venues/${id}?_bookings=true&_owner=true`
  );

  const data = await parseJsonOrThrow(response, "Failed to fetch venue.");

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
    headers: authJsonHeaders(token, apiKey),
    body: JSON.stringify(venue),
  });

  const data = await parseJsonOrThrow(response, "Failed to create venue.");

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
    headers: authJsonHeaders(token, apiKey),
    body: JSON.stringify(venue),
  });

  const data = await parseJsonOrThrow(response, "Failed to update venue.");

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
    headers: authHeaders(token, apiKey),
  });

  await throwIfResponseError(response, "Failed to delete venue.");
}
