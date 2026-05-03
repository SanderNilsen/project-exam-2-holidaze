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

/**
 * Cancels an existing booking.
 *
 * @async
 * @function deleteBooking
 *
 * @param {Object} params
 * @param {string} params.id - Booking id
 * @param {string} params.token - JWT access token
 * @param {string} params.apiKey - Noroff API key
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} Throws an error if booking cancellation fails
 */
export async function deleteBooking({ id, token, apiKey }) {
  const response = await fetch(`${API_BASE_URL}/holidaze/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data?.errors?.[0]?.message || "Failed to cancel booking.");
  }
}