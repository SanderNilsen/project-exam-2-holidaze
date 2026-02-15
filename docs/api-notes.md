# Holidaze API Notes

Base URL
https://docs.noroff.dev/docs/v2/holidaze

Auth
POST /auth/register
POST /auth/login → returns accessToken
POST /auth/create-api-key → create app API key (once)

Protected routes require BOTH:
Authorization: Bearer <token>
X-Noroff-API-Key: <apiKey>

Public
GET /holidaze/venues
GET /holidaze/venues/{id}

Protected
GET /holidaze/profiles/{name}
GET /holidaze/profiles/{name}/bookings
POST /holidaze/bookings
POST /holidaze/venues
PUT /holidaze/venues/{id}
DELETE /holidaze/venues/{id}

Booking payload
{
  dateFrom: "YYYY-MM-DD",
  dateTo: "YYYY-MM-DD",
  guests: number,
  venueId: string
}

Rules
- guests <= maxGuests
- cannot overlap bookings