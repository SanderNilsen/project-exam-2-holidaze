import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ProfileVenueCard from "../components/dashboard/ProfileVenueCard";
import Modal from "../components/ui/Modal";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import FormMessage from "../components/ui/FormMessage";
import { getProfileBookings, updateAvatar } from "../api/profile";
import { useNavigate } from "react-router-dom";
import { deleteBooking } from "../api/bookings";
import {
  MenuList,
  MenuItem,
  ActiveMenuItem,
  StatsList,
  StatItem,
  StatLabel,
  StatValue,
} from "../components/dashboard/SidebarElements";

const ModalForm = styled.form`
  display: grid;
  gap: 18px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const EmptyText = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getBookingLocation(venue) {
  const city = venue?.location?.city;
  const country = venue?.location?.country;

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;

  return "Location not available";
}

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [user, setUser] = useState(storedUser);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadBookings() {
      try {
        setIsLoading(true);
        setPageError("");

        if (!user?.name || !token || !apiKey) {
          throw new Error("You must be logged in to view your bookings.");
        }

        const profile = await getProfileBookings({
          name: user.name,
          token,
          apiKey,
        });

        setBookings(profile.bookings || []);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadBookings();
  }, [user?.name, token, apiKey]);

  function openModal() {
    setAvatarUrl(user?.avatar?.url || "");
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError("");
  }

  async function handleCancelBooking(id) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    await deleteBooking({
      id,
      token,
      apiKey,
    });

    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  } catch (error) {
    setPageError(error.message || "Could not cancel booking.");
  }
}

  async function handleAvatarSubmit(event) {
    event.preventDefault();

    setFormError("");

    if (!user?.name) {
      setFormError("User not found.");
      return;
    }

    if (!token || !apiKey) {
      setFormError("Missing authentication.");
      return;
    }

    if (!avatarUrl.trim()) {
      setFormError("Avatar URL is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const updatedProfile = await updateAvatar({
        name: user.name,
        token,
        apiKey,
        avatarUrl: avatarUrl.trim(),
        alt: `${user.name} avatar`,
      });

      const updatedUser = {
        ...user,
        avatar: updatedProfile.avatar,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.dispatchEvent(new Event("userUpdated"));
      closeModal();
    } catch (error) {
      setFormError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const today = new Date();

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.dateFrom) >= today
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.dateFrom) < today
  );

  const sidebar = (
    <>
      <SidebarCard title="Account">
        <MenuList>
          <ActiveMenuItem>My Bookings</ActiveMenuItem>
          <MenuItem>Account Details</MenuItem>
        </MenuList>
      </SidebarCard>

      <SidebarCard title="Stats">
        <StatsList>
          <StatItem>
            <StatLabel>Total Bookings</StatLabel>
            <StatValue>{bookings.length}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Upcoming trips</StatLabel>
            <StatValue>{upcomingBookings.length}</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Member type</StatLabel>
            <StatValue>
              {user?.venueManager ? "Venue Manager" : "Customer"}
            </StatValue>
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
        role={user?.venueManager ? "Manager Account" : "Customer Account"}
        buttonText="Edit Profile"
        avatarUrl={user?.avatar?.url}
        onEdit={openModal}
      />

      <DashboardShell sidebar={sidebar}>
        <SectionBlock title="Upcoming bookings">
          {isLoading && <EmptyText>Loading bookings...</EmptyText>}

          {!isLoading && upcomingBookings.length === 0 && (
            <EmptyText>No upcoming bookings yet.</EmptyText>
          )}

          {!isLoading &&
            upcomingBookings.map((booking) => (
              <ProfileVenueCard
                key={booking.id}
                title={booking.venue?.name || "Venue"}
                location={getBookingLocation(booking.venue)}
                checkIn={formatDate(booking.dateFrom)}
                checkOut={formatDate(booking.dateTo)}
                price={
                  booking.venue?.price
                    ? `$${booking.venue.price}/night`
                    : "Price unavailable"
                }
                image={
                  booking.venue?.media?.[0]?.url ||
                  "/images/placeholder-venue.svg"
                }
                showCancel
                onView={() => navigate(`/venues/${booking.venue?.id}`)}
                onCancel={() => handleCancelBooking(booking.id)}
              />
            ))}
        </SectionBlock>

        <SectionBlock title="Past bookings">
          {!isLoading && pastBookings.length === 0 && (
            <EmptyText>No past bookings yet.</EmptyText>
          )}

          {!isLoading &&
            pastBookings.map((booking) => (
              <ProfileVenueCard
                key={booking.id}
                title={booking.venue?.name || "Venue"}
                location={getBookingLocation(booking.venue)}
                checkIn={formatDate(booking.dateFrom)}
                checkOut={formatDate(booking.dateTo)}
                price={
                  booking.venue?.price
                    ? `$${booking.venue.price}/night`
                    : "Price unavailable"
                }
                image={
                  booking.venue?.media?.[0]?.url ||
                  "/images/placeholder-venue.svg"
                }
                muted
                onView={() => navigate(`/venues/${booking.venue?.id}`)}
              />
            ))}
        </SectionBlock>
      </DashboardShell>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Edit profile"
        description="Add a public image URL to update your avatar."
      >
        <ModalForm onSubmit={handleAvatarSubmit}>
          <InputField
            id="avatarUrl"
            label="Avatar URL"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
          />

          <FormMessage variant="error">{formError}</FormMessage>

          <ButtonRow>
            <SecondaryButton type="button" onClick={closeModal}>
              Cancel
            </SecondaryButton>

            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </PrimaryButton>
          </ButtonRow>
        </ModalForm>
      </Modal>
    </>
  );
}