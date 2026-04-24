import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FormMessage from "../components/ui/FormMessage";
import { getVenueById } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venuesUtils";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import { createBooking } from "../api/bookings";

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

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const TopSection = styled.section`
  display: grid;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  color: var(--text);
`;

const MetaRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 14px;
`;

const Price = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #22c55e;
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
`;

const Facilities = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Facility = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--background);
  border: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-muted);
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

const MainContent = styled.div`
  display: grid;
  gap: 24px;
`;

const BookingCard = styled.aside`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  display: grid;
  gap: 18px;
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

export default function VenueDetails() {
  const { id } = useParams();

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
        <HeroImage
          src={venue?.media?.[0]?.url || "/images/placeholder-venue.svg"}
          alt={venue?.media?.[0]?.alt || venue?.name}
        />

        <DetailsLayout>
          {/* LEFT SIDE */}
          <MainContent>
            <TopSection>
              <Title>{venue.name}</Title>

              <MetaRow>
                <span>{formatLocation(venue.location)}</span>
                <span>{venue.maxGuests} guests</span>
                <span>{venue.rating} ⭐</span>
              </MetaRow>

              <Price>${venue.price}/night</Price>
            </TopSection>

            <Description>{venue.description}</Description>

            <Facilities>
              {getFacilities(venue.meta).map((item) => (
                <Facility key={item}>{item}</Facility>
              ))}
            </Facilities>
          </MainContent>

          {/* RIGHT SIDE */}
          <BookingCard>
            <BookingTitle>Book this venue</BookingTitle>

            <HelperText>
              Select your dates and number of guests.
            </HelperText>

            <BookingForm onSubmit={handleBookingSubmit}>
              <InputField
                id="dateFrom"
                label="Check-in"
                type="date"
                value={bookingForm.dateFrom}
                onChange={handleBookingChange}
              />

              <InputField
                id="dateTo"
                label="Check-out"
                type="date"
                value={bookingForm.dateTo}
                onChange={handleBookingChange}
              />

              <InputField
                id="guests"
                label="Guests"
                type="number"
                min="1"
                max={venue.maxGuests}
                value={bookingForm.guests}
                onChange={handleBookingChange}
              />

              <FormMessage variant="error">{bookingError}</FormMessage>
              <FormMessage variant="success">{bookingSuccess}</FormMessage>

              <PrimaryButton type="submit" disabled={isBooking}>
                {isBooking ? "Booking..." : "Book now"}
              </PrimaryButton>
            </BookingForm>
          </BookingCard>
        </DetailsLayout>
      </Container>
    </PageWrapper>
  );
}