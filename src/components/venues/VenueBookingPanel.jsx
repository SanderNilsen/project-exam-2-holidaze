import styled from "styled-components";
import FormMessage from "../ui/FormMessage";
import InputField from "../ui/InputField";
import PrimaryButton from "../ui/PrimaryButton";
import BookingCalendar from "./BookingCalendar";

const BookingCard = styled.aside`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  display: grid;
  gap: 18px;
  position: sticky;
  top: 90px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const BookingTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  color: var(--text);
`;

const BookingForm = styled.form`
  display: grid;
  gap: 16px;
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
`;

export default function VenueBookingPanel({
  isVenueManager,
  venue,
  bookingForm,
  bookingError,
  bookingSuccess,
  isBooking,
  onCalendarChange,
  onBookingChange,
  onBookingSubmit,
  onManagerDashboard,
}) {
  if (isVenueManager) {
    return (
      <BookingCard>
        <BookingTitle>Manager account</BookingTitle>
        <HelperText>
          Venue managers cannot book venues. Use your dashboard to add and manage
          your own venues.
        </HelperText>

        <PrimaryButton type="button" onClick={onManagerDashboard}>
          Go to manager dashboard
        </PrimaryButton>
      </BookingCard>
    );
  }

  return (
    <BookingCard>
      <BookingTitle>Book this venue</BookingTitle>

      {venue.bookings?.length > 0 && (
        <HelperText>
          {venue.bookings.length} existing booking(s) for this venue.
        </HelperText>
      )}

      <HelperText>Select your dates and number of guests.</HelperText>

      <BookingForm onSubmit={onBookingSubmit}>
        <BookingCalendar
          bookings={venue.bookings || []}
          dateFrom={bookingForm.dateFrom}
          dateTo={bookingForm.dateTo}
          onChange={onCalendarChange}
        />

        <InputField
          id="guests"
          label="Guests"
          type="number"
          min="1"
          max={venue.maxGuests}
          value={bookingForm.guests}
          onChange={onBookingChange}
        />

        <FormMessage variant="error">{bookingError}</FormMessage>
        <FormMessage variant="success">{bookingSuccess}</FormMessage>

        <PrimaryButton type="submit" disabled={isBooking}>
          {isBooking ? "Booking..." : "Book now"}
        </PrimaryButton>
      </BookingForm>
    </BookingCard>
  );
}
