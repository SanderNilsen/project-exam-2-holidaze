import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/ui/Modal";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ManagerVenueCard from "../components/dashboard/ManagerVenueCard";
import BookingCard from "../components/dashboard/BookingCard";
import FormMessage from "../components/ui/FormMessage";
import { getProfileVenues } from "../api/profile";
import { createVenue } from "../api/venues";
import { formatLocation } from "../utils/venuesUtils";
import {
  MenuList,
  MenuItem,
  ActiveMenuItem,
  StatsList,
  StatItem,
  StatLabel,
  StatValue,
} from "../components/dashboard/SidebarElements";

const AddButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: var(--primary);
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--primary-hover);
  }
`;

const ModalForm = styled.form`
  display: grid;
  gap: 18px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

export default function Manager() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [venueForm, setVenueForm] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    mediaUrl: "",
    city: "",
    country: "",
  });

  function handleVenueChange(event) {
    const { name, value } = event.target;

    setVenueForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  }

  function openModal() {
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError("");
  }

  async function handleVenueSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const newVenue = await createVenue({
        token,
        apiKey,
        venue: {
          name: venueForm.name.trim(),
          description: venueForm.description.trim(),
          price: Number(venueForm.price),
          maxGuests: Number(venueForm.maxGuests),
          media: venueForm.mediaUrl.trim()
            ? [
                {
                  url: venueForm.mediaUrl.trim(),
                  alt: venueForm.name.trim(),
                },
              ]
            : [],
          meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
          },
          location: {
            address: "",
            city: venueForm.city.trim(),
            zip: "",
            country: venueForm.country.trim(),
            continent: "",
            lat: 0,
            lng: 0,
          },
        },
      });

      setVenues((prev) => [newVenue, ...prev]);

      setVenueForm({
        name: "",
        description: "",
        price: "",
        maxGuests: "",
        mediaUrl: "",
        city: "",
        country: "",
      });

      closeModal();
    } catch (error) {
      setFormError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function loadManagerVenues() {
      try {
        setIsLoading(true);
        setPageError("");

        if (!user?.name || !token || !apiKey) {
          throw new Error("You must be logged in to view your venues.");
        }

        const data = await getProfileVenues({
          name: user.name,
          token,
          apiKey,
        });

        setVenues(data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadManagerVenues();
  }, [user?.name, token, apiKey]);

  const totalBookings = venues.reduce((total, venue) => {
    return total + (venue.bookings?.length || 0);
  }, 0);

const venueBookings = venues.flatMap((venue) =>
  (venue.bookings || []).map((booking) => ({
    ...booking,
    venueTitle: venue.name,
  }))
);

const upcomingBookings = venueBookings.filter(
  (booking) => new Date(booking.dateFrom) >= new Date()
);

  const sidebar = (
    <>
      <SidebarCard title="Account">
        <MenuList>
          <ActiveMenuItem>My Venues</ActiveMenuItem>
          <MenuItem>Account Details</MenuItem>
        </MenuList>
      </SidebarCard>

      <SidebarCard title="Stats">
        <StatsList>
          <StatItem>
            <StatLabel>Total Venues</StatLabel>
            <StatValue>{venues.length}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Total Bookings</StatLabel>
            <StatValue>{totalBookings}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Member type</StatLabel>
            <StatValue>Venue Manager</StatValue>
          </StatItem>
        </StatsList>
      </SidebarCard>
    </>
  );

  if (pageError) {
    return <FormMessage variant="error">{pageError}</FormMessage>;
  }

  return (
    <>
      <HeroPanel
        name={user?.name || "UserName"}
        email={user?.email || "user@stud.noroff.no"}
        role="Manager Account"
        buttonText="Edit Profile"
        avatarUrl={user?.avatar?.url}
      />

      <DashboardShell sidebar={sidebar}>
        <SectionBlock title="My Venues">
          <AddButton type="button" onClick={openModal}>
            Add new venue
          </AddButton>
          {isLoading && <p>Loading venues...</p>}

          {!isLoading && venues.length === 0 && (
            <p>You have not created any venues yet.</p>
          )}

          {!isLoading &&
            venues.map((venue) => (
              <ManagerVenueCard
                key={venue.id}
                id={venue.id}
                image={venue.media?.[0]?.url || "/images/placeholder-venue.svg"}
                title={venue.name}
                location={formatLocation(venue.location)}
                bookings={venue.bookings?.length || 0}
                price={`$${venue.price}/night`}
              />
            ))}
        </SectionBlock>

        <SectionBlock title="Upcoming Bookings">
          {isLoading && <p>Loading bookings...</p>}

          {!isLoading && upcomingBookings.length === 0 && (
            <p>No upcoming bookings yet.</p>
          )}

          {!isLoading &&
            upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                guestName={booking.customer?.name || "Guest"}
                venueTitle={booking.venueTitle}
                checkIn={new Date(booking.dateFrom).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                checkOut={new Date(booking.dateTo).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                guests={booking.guests}
                avatarUrl={booking.customer?.avatar?.url}
              />
            ))}
        </SectionBlock>
      </DashboardShell>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add new venue"
        description="Fill in the venue details below."
      >
        <ModalForm onSubmit={handleVenueSubmit}>
          <InputField
            id="name"
            label="Venue name"
            type="text"
            placeholder="Scandinavian apartment"
            value={venueForm.name}
            onChange={handleVenueChange}
          />

          <InputField
            id="description"
            label="Description"
            type="text"
            placeholder="Describe your venue"
            value={venueForm.description}
            onChange={handleVenueChange}
          />

          <InputField
            id="price"
            label="Price per night"
            type="number"
            placeholder="180"
            value={venueForm.price}
            onChange={handleVenueChange}
          />

          <InputField
            id="maxGuests"
            label="Max guests"
            type="number"
            placeholder="4"
            value={venueForm.maxGuests}
            onChange={handleVenueChange}
          />

          <InputField
            id="mediaUrl"
            label="Image URL"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={venueForm.mediaUrl}
            onChange={handleVenueChange}
          />

          <InputField
            id="city"
            label="City"
            type="text"
            placeholder="Oslo"
            value={venueForm.city}
            onChange={handleVenueChange}
          />

          <InputField
            id="country"
            label="Country"
            type="text"
            placeholder="Norway"
            value={venueForm.country}
            onChange={handleVenueChange}
          />

          <FormMessage variant="error">{formError}</FormMessage>

          <ButtonRow>
            <SecondaryButton type="button" onClick={closeModal}>
              Cancel
            </SecondaryButton>

            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create venue"}
            </PrimaryButton>
          </ButtonRow>
        </ModalForm>
      </Modal>
    </>
  );
}