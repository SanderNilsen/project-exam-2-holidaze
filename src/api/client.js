export function jsonHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

export function authHeaders(token, apiKey) {
  return {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}

export function authJsonHeaders(token, apiKey) {
  return {
    ...jsonHeaders(),
    ...authHeaders(token, apiKey),
  };
}

export function getApiErrorMessage(data, fallback) {
  return data?.errors?.[0]?.message || fallback;
}

export async function parseJsonOrThrow(response, fallback) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data, fallback));
  }

  return data;
}

export async function throwIfResponseError(response, fallback) {
  if (response.ok) return;

  const data = await response.json().catch(() => null);
  throw new Error(getApiErrorMessage(data, fallback));
}
