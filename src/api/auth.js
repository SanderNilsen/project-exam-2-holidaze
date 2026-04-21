import { API_BASE_URL } from "./constants";

export async function registerUser({ name, email, password, venueManager }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      venueManager,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Registration failed.");
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(
    `${API_BASE_URL}/auth/login?_holidaze=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Login failed.");
  }

  return data;
}

export async function createApiKey(token) {
  const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to create API key.");
  }

  return data.data.key;
}