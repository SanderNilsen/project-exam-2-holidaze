/**
 * Creates JSON headers for unauthenticated requests.
 *
 * @returns {Object} Headers with JSON content type.
 */
export function jsonHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

/**
 * Creates authentication headers required by protected Noroff API endpoints.
 *
 * @param {string} token - JWT access token.
 * @param {string} apiKey - Noroff API key.
 * @returns {Object} Authorization and API key headers.
 */
export function authHeaders(token, apiKey) {
  return {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}

/**
 * Combines JSON and authentication headers for authenticated write requests.
 *
 * @param {string} token - JWT access token.
 * @param {string} apiKey - Noroff API key.
 * @returns {Object} JSON, authorization, and API key headers.
 */
export function authJsonHeaders(token, apiKey) {
  return {
    ...jsonHeaders(),
    ...authHeaders(token, apiKey),
  };
}

/**
 * Extracts the first API error message, with a fallback for unknown responses.
 *
 * @param {Object|null} data - Parsed API error response.
 * @param {string} fallback - Message to use when the response has no error text.
 * @returns {string} User-facing error message.
 */
export function getApiErrorMessage(data, fallback) {
  return data?.errors?.[0]?.message || fallback;
}

/**
 * Parses a JSON response and throws when the response status is not successful.
 *
 * @param {Response} response - Fetch response to parse.
 * @param {string} fallback - Fallback error message.
 * @returns {Promise<Object>} Parsed JSON response.
 * @throws {Error} Throws an API error message when the response is not ok.
 */
export async function parseJsonOrThrow(response, fallback) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data, fallback));
  }

  return data;
}

/**
 * Throws for non-OK responses that may not return a JSON body, such as DELETE.
 *
 * @param {Response} response - Fetch response to inspect.
 * @param {string} fallback - Fallback error message.
 * @returns {Promise<void>}
 * @throws {Error} Throws an API error message when the response is not ok.
 */
export async function throwIfResponseError(response, fallback) {
  if (response.ok) return;

  const data = await response.json().catch(() => null);
  throw new Error(getApiErrorMessage(data, fallback));
}
