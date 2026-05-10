import { API_BASE_URL } from "./constants";
import { jsonHeaders, parseJsonOrThrow } from "./client";

/**
 * Registers a new user with the Noroff API.
 *
 * @async
 * @function registerUser
 *
 * @param {Object} params - Parameters object
 * @param {string} params.name - Unique username (used as profile identifier)
 * @param {string} params.email - User email (must be @stud.noroff.no)
 * @param {string} params.password - User password (min 8 characters)
 * @param {boolean} params.venueManager - Whether the user should be a venue manager
 *
 * @returns {Promise<Object>} Returns API response containing created user data
 *
 * @throws {Error} Throws an error if registration fails
 *
 * @example
 * await registerUser({
 *   name: "johnDoe",
 *   email: "john@stud.noroff.no",
 *   password: "12345678",
 *   venueManager: true,
 * });
 */
export async function registerUser({ name, email, password, venueManager }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify({
      name,
      email,
      password,
      venueManager,
    }),
  });

  const data = await parseJsonOrThrow(response, "Registration failed.");

  return data;
}

/**
 * Logs in a user and retrieves authentication data.
 *
 * @async
 * @function loginUser
 *
 * @param {Object} params - Parameters object
 * @param {string} params.email - User email
 * @param {string} params.password - User password
 *
 * @returns {Promise<Object>} Returns login response including accessToken and user data
 *
 * @throws {Error} Throws an error if login fails
 *
 * @example
 * const data = await loginUser({
 *   email: "john@stud.noroff.no",
 *   password: "12345678",
 * });
 *
 * const token = data.data.accessToken;
 */
export async function loginUser({ email, password }) {
  const response = await fetch(
    `${API_BASE_URL}/auth/login?_holidaze=true`,
    {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await parseJsonOrThrow(response, "Login failed.");

  return data;
}

/**
 * Creates a Noroff API key for authenticated requests.
 *
 * Required for accessing protected endpoints.
 *
 * @async
 * @function createApiKey
 *
 * @param {string} token - JWT access token from login
 *
 * @returns {Promise<string>} Returns the generated API key
 *
 * @throws {Error} Throws an error if API key creation fails
 *
 * @example
 * const apiKey = await createApiKey(token);
 */
export async function createApiKey(token) {
  const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await parseJsonOrThrow(response, "Failed to create API key.");

  return data.data.key;
}
