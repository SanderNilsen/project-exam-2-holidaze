import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/ui/Modal";
import ManagerVenueForm from "../components/dashboard/ManagerVenueForm";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ManagerVenueCard from "../components/dashboard/ManagerVenueCard";
import BookingCard from "../components/dashboard/BookingCard";
import FormMessage from "../components/ui/FormMessage";
import AvatarModal from "../components/dashboard/AvatarModal";
import { getProfileVenues } from "../api/profile";
import { createVenue, updateVenue, deleteVenue } from "../api/venues";
import { formatLocation } from "../utils/venueUtils";
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

export default function Manager() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [user, setUser] = useState(storedUser);
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  const [venueForm, setVenueForm] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    mediaUrl: "",
    city: "",
    country: "",
    lat: "",
    lng: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  function openAvatarModal() {
    setIsAvatarModalOpen(true);
  }

  function closeAvatarModal() {
    setIsAvatarModalOpen(false);
  }

  function handleVenueChange(event) {
    const { name, value, type, checked } = event.target;

    setVenueForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormError("");
  }

  async function handleDeleteVenue(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) return;

    try {
      await deleteVenue({ id, token, apiKey });
      setVenues((prev) => prev.filter((venue) => venue.id !== id));
    } catch (error) {
      setPageError(error.message || "Could not delete venue.");
    }
  }

  function openModal() {
    setEditingVenue(null);
    setVenueForm({
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      mediaUrl: "",
      city: "",
      country: "",
      lat: "",
      lng: "",
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    });
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError("");
  }

function openEditModal(venue) {
  setEditingVenue(venue);
  setVenueForm({
    name: venue.name || "",
    description: venue.description || "",
    price: venue.price || "",
    maxGuests: venue.maxGuests || "",
    mediaUrl: venue.media?.[0]?.url || "",
    city: venue.location?.city || "",
    country: venue.location?.country || "",
    wifi: venue.meta?.wifi || false,
    parking: venue.meta?.parking || false,
    breakfast: venue.meta?.breakfast || false,
    pets: venue.meta?.pets || false,
    lat: venue.location?.lat || "",
    lng: venue.location?.lng || "",
  });
  setFormError("");
  setIsModalOpen(true);
}

async function handleVenueSubmit(event) {
  event.preventDefault();

  setFormError("");

  if (!venueForm.name.trim()) {
    setFormError("Venue name is required.");
    return;
  }

  if (!venueForm.description.trim()) {
    setFormError("Description is required.");
    return;
  }

  if (!venueForm.price || Number(venueForm.price) < 1) {
    setFormError("Price must be at least 1.");
    return;
  }

  if (!venueForm.maxGuests || Number(venueForm.maxGuests) < 1) {
    setFormError("Max guests must be at least 1.");
    return;
  }

  const venuePayload = {
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
      wifi: venueForm.wifi,
      parking: venueForm.parking,
      breakfast: venueForm.breakfast,
      pets: venueForm.pets,
    },
    location: {
      address: "",
      city: venueForm.city.trim(),
      zip: "",
      country: venueForm.country.trim(),
      continent: "",
      lat: venueForm.lat ? Number(venueForm.lat) : 0,
      lng: venueForm.lng ? Number(venueForm.lng) : 0,
    },
  };

  try {
    setIsSubmitting(true);

    if (editingVenue) {
      const updatedVenue = await updateVenue({
        id: editingVenue.id,
        token,
        apiKey,
        venue: venuePayload,
      });

      setVenues((prev) =>
        prev.map((venue) =>
          venue.id === updatedVenue.id
            ? { ...updatedVenue, bookings: venue.bookings || [] }
            : venue
        )
      );
    } else {
      const newVenue = await createVenue({
        token,
        apiKey,
        venue: venuePayload,
      });

      setVenues((prev) => [{ ...newVenue, bookings: [] }, ...prev]);
    }

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
            <MenuItem type="button" onClick={openAvatarModal}>
              Edit Profile
            </MenuItem>
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
        avatarUrl={user?.avatar?.url}
      />

      <DashboardShell sidebar={sidebar}>
        <SectionBlock title="My Venues">
          <AddButton type="button" onClick={openModal}>
            + Add new venue
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
                onEdit={() => openEditModal(venue)}
                onDelete={() => handleDeleteVenue(venue.id)}
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
        title={editingVenue ? "Edit venue" : "Add new venue"}
        description={
          editingVenue
            ? "Update the venue details below."
            : "Fill in the venue details below."
        }
      >
        <ManagerVenueForm
          venueForm={venueForm}
          formError={formError}
          isSubmitting={isSubmitting}
          editingVenue={editingVenue}
          onChange={handleVenueChange}
          onSubmit={handleVenueSubmit}
          onCancel={closeModal}
        />
      </Modal>
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={closeAvatarModal}
        user={user}
        token={token}
        apiKey={apiKey}
        onUserUpdated={setUser}
      />
    </>
  );
}