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