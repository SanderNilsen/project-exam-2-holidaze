import { API_BASE_URL } from "./constants";

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