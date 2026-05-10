import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import FormMessage from "../components/ui/FormMessage";
import { getVenueById } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venueUtils";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import { createBooking } from "../api/bookings";
import BookingCalendar from "../components/venues/BookingCalendar";
import VenueMap from "../components/venues/VenueMap";
import VenueImageCarousel from "../components/venues/VenueImageCarousel";

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

const HostCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  padding: 12px 14px;
  background: var(--background-light);
  border: 1px solid var(--border);
  border-radius: 14px;
`;

const HostAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #ffffff;
  border: 1px solid var(--border);
`;

const HostInfo = styled.div`
  display: grid;
  gap: 3px;
`;

const HostLabel = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
`;

const HostName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

const InfoCard = styled.section`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  display: grid;
  gap: 18px;
`;

const SectionHeading = styled.h2`
  margin: 0;
  font-size: 22px;
  color: var(--text);
`;

const TitleRow = styled.div`
  display: grid;
  gap: 12px;
`;

const VenueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PriceBlock = styled.div`
  display: grid;
  justify-items: end;
  gap: 2px;

  @media (max-width: 640px) {
    justify-items: start;
  }
`;

const PriceUnit = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const FacilityList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
      setBookingError("These dates are already booked. Please choose other dates.");
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
          {/* LEFT SIDE */}
          <MainContent>
            <InfoCard>
              <VenueHeader>
                <TitleRow>
                  <Title>{venue.name}</Title>

                  <MetaRow>
                    <span>{formatLocation(venue.location)}</span>
                    <span>{venue.maxGuests} guests</span>
                    <span>{venue.rating} ⭐</span>
                  </MetaRow>
                </TitleRow>

                <PriceBlock>
                  <Price>
                    ${venue.price}
                    <PriceUnit>/night</PriceUnit>
                  </Price>
                </PriceBlock>
              </VenueHeader>

              {venue.owner && (
                <HostCard>
                  <HostAvatar
                    src={venue.owner.avatar?.url || "/images/avatar-placeholder.svg"}
                    alt={`${venue.owner.name} avatar`}
                  />

                  <HostInfo>
                    <HostLabel>Hosted by</HostLabel>
                    <HostName>{venue.owner.name}</HostName>
                  </HostInfo>
                </HostCard>
              )}
            </InfoCard>

            <InfoCard>
              <SectionHeading>Description</SectionHeading>
              <Description>{venue.description}</Description>
            </InfoCard>

            <InfoCard>
              <SectionHeading>Facilities</SectionHeading>

              <FacilityList>
                {getFacilities(venue.meta).length > 0 ? (
                  getFacilities(venue.meta).map((item) => (
                    <Facility key={item}>{item}</Facility>
                  ))
                ) : (
                  <HelperText>No facilities listed.</HelperText>
                )}
              </FacilityList>
            </InfoCard>

            <InfoCard>
              <VenueMap location={venue.location} />
            </InfoCard>
          </MainContent>

          {/* RIGHT SIDE */}
        {isVenueManager ? (
          <BookingCard>
            <BookingTitle>Manager account</BookingTitle>
            <HelperText>
              Venue managers cannot book venues. Use your dashboard to add and manage
              your own venues.
            </HelperText>

            <PrimaryButton type="button" onClick={() => navigate("/manager")}>
              Go to manager dashboard
            </PrimaryButton>
          </BookingCard>
        ) : (
          <BookingCard>
            <BookingTitle>Book this venue</BookingTitle>

            {venue.bookings?.length > 0 && (
              <HelperText>
                {venue.bookings.length} existing booking(s) for this venue.
              </HelperText>
            )}

            <HelperText>Select your dates and number of guests.</HelperText>

            <BookingForm onSubmit={handleBookingSubmit}>
              <BookingCalendar
                bookings={venue.bookings || []}
                dateFrom={bookingForm.dateFrom}
                dateTo={bookingForm.dateTo}
                onChange={handleCalendarChange}
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
        )}
        </DetailsLayout>
      </Container>
    </PageWrapper>
  );
}