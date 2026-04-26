import { API_BASE_URL } from "./constants";

/**
 * Updates the avatar for a user profile using the Noroff Holidaze API.
 *
 * @async
 * @function updateAvatar
 *
 * @param {Object} params - Parameters object
 * @param {string} params.name - The username of the profile to update
 * @param {string} params.token - JWT access token for authentication
 * @param {string} params.apiKey - Noroff API key required for authenticated requests
 * @param {string} params.avatarUrl - Public URL of the new avatar image
 * @param {string} [params.alt] - Optional alt text for the avatar image
 *
 * @returns {Promise<Object>} Returns the updated profile data
 *
 * @throws {Error} Throws an error if the request fails or the API returns an error
 *
 * @example
 * await updateAvatar({
 *   name: "johnDoe",
 *   token,
 *   apiKey,
 *   avatarUrl: "https://example.com/avatar.jpg",
 * });
 */
export async function updateAvatar({ name, token, apiKey, avatarUrl, alt }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/profiles/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({
      avatar: {
        url: avatarUrl,
        alt: alt || `${name} avatar`,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to update avatar.");
  }

  return data.data;
}

/**
 * Fetches a Holidaze profile with bookings.
 *
 * @param {Object} params
 * @param {string} params.name - Profile name / username
 * @param {string} params.token - JWT access token
 * @param {string} params.apiKey - Noroff API key
 * @returns {Promise<Object>} Profile data with bookings
 */
export async function getProfileBookings({ name, token, apiKey }) {
  const response = await fetch(
    `${API_BASE_URL}/holidaze/profiles/${name}?_bookings=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to fetch bookings.");
  }

  return data.data;
}