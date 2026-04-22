import { API_BASE_URL } from "./constants";

/**
 * Fetches a paginated list of venues from the API.
 *
 * @async
 * @function getVenues
 *
 * @param {Object} [options]
 * @param {number} [options.page=1] - Page number to fetch
 * @param {number} [options.limit=12] - Number of venues per page
 *
 * @returns {Promise<{data: Array, meta: Object}>} Returns venues and pagination metadata
 *
 * @throws {Error} Throws an error if the request fails
 */
export async function getVenues({ page = 1, limit = 12 } = {}) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/venues?page=${page}&limit=${limit}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to fetch venues.");
  }

  return data;
}