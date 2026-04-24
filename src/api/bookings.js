import { API_BASE_URL } from "./constants";

/**
 * Creates a new booking for a venue.
 *
 * @async
 * @function createBooking
 *
 * @param {Object} params - Booking parameters
 * @param {string} params.token - User access token
 * @param {string} params.apiKey - Noroff API key
 * @param {string} params.venueId - Venue id
 * @param {string} params.dateFrom - Booking start date
 * @param {string} params.dateTo - Booking end date
 * @param {number} params.guests - Number of guests
 *
 * @returns {Promise<Object>} Created booking data
 *
 * @throws {Error} Throws an error if booking fails
 */
export async function createBooking({
  token,
  apiKey,
  venueId,
  dateFrom,
  dateTo,
  guests,
}) {
  const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({
      dateFrom,
      dateTo,
      guests,
      venueId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.[0]?.message || "Failed to create booking.");
  }

  return data.data;
}