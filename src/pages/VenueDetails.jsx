import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import FormMessage from "../components/ui/FormMessage";
import { getVenueById } from "../api/venues";
import { createBooking } from "../api/bookings";
import VenueImageCarousel from "../components/venues/VenueImageCarousel";
import VenueInfo from "../components/venues/VenueInfo";
import VenueBookingPanel from "../components/venues/VenueBookingPanel";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 80px;
  display: grid;
  gap: 32px;
`;

const LoadingText = styled.p`
  margin: 0;
  color: var(--text-muted);
`;

const DetailsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function datesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

export default function VenueDetails() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isVenueManager = user?.venueManager;

  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [bookingForm, setBookingForm] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  function handleCalendarChange({ dateFrom, dateTo }) {
    setBookingForm((prev) => ({
      ...prev,
      dateFrom,
      dateTo,
    }));

    setBookingError("");
    setBookingSuccess("");
  }

  function handleBookingChange(event) {
    const { name, value } = event.target;

    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setBookingError("");
    setBookingSuccess("");
  }

  async function handleBookingSubmit(event) {
    event.preventDefault();

    setBookingError("");
    setBookingSuccess("");

    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    if (user?.venueManager) {
      setBookingError("Venue managers cannot book venues.");
      return;
    }

    if (!token || !apiKey) {
      setBookingError("You must be logged in to book a venue.");
      return;
    }

    if (!bookingForm.dateFrom || !bookingForm.dateTo) {
      setBookingError("Please select both check-in and check-out dates.");
      return;
    }

    if (new Date(bookingForm.dateTo) <= new Date(bookingForm.dateFrom)) {
      setBookingError("Check-out date must be after check-in date.");
      return;
    }

    if (Number(bookingForm.guests) < 1) {
      setBookingError("Guests must be at least 1.");
      return;
    }

    if (Number(bookingForm.guests) > venue.maxGuests) {
      setBookingError(`Max ${venue.maxGuests} guests allowed.`);
      return;
    }

    const selectedStart = new Date(bookingForm.dateFrom);
    const selectedEnd = new Date(bookingForm.dateTo);

    const isUnavailable = venue.bookings?.some((booking) => {
      const bookedStart = new Date(booking.dateFrom);
      const bookedEnd = new Date(booking.dateTo);

      return datesOverlap(selectedStart, selectedEnd, bookedStart, bookedEnd);
    });

    if (isUnavailable) {
      setBookingError(
        "These dates are already booked. Please choose other dates."
      );
      return;
    }

    try {
      setIsBooking(true);

      await createBooking({
        token,
        apiKey,
        venueId: venue.id,
        dateFrom: new Date(bookingForm.dateFrom).toISOString(),
        dateTo: new Date(bookingForm.dateTo).toISOString(),
        guests: Number(bookingForm.guests),
      });

      setBookingSuccess("Booking created successfully.");

      setTimeout(() => {
        navigate("/profile");
      }, 800);

      setBookingForm({
        dateFrom: "",
        dateTo: "",
        guests: 1,
      });
    } catch (error) {
      setBookingError(error.message || "Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  }

  useEffect(() => {
    async function loadVenue() {
      try {
        setIsLoading(true);
        setPageError("");

        const data = await getVenueById(id);
        setVenue(data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (isLoading) {
    return (
      <PageWrapper>
        <Container>
          <LoadingText>Loading venue...</LoadingText>
        </Container>
      </PageWrapper>
    );
  }

  if (pageError) {
    return (
      <PageWrapper>
        <Container>
          <FormMessage variant="error">{pageError}</FormMessage>
        </Container>
      </PageWrapper>
    );
  }

  if (!venue) return null;

  return (
    <PageWrapper>
      <Container>
        <VenueImageCarousel media={venue.media} title={venue.name} />
        <DetailsLayout>
          <VenueInfo venue={venue} />

          <VenueBookingPanel
            isVenueManager={isVenueManager}
            venue={venue}
            bookingForm={bookingForm}
            bookingError={bookingError}
            bookingSuccess={bookingSuccess}
            isBooking={isBooking}
            onCalendarChange={handleCalendarChange}
            onBookingChange={handleBookingChange}
            onBookingSubmit={handleBookingSubmit}
            onManagerDashboard={() => navigate("/manager")}
          />
        </DetailsLayout>
      </Container>
    </PageWrapper>
  );
}
