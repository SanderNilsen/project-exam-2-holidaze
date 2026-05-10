import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ProfileVenueCard from "../components/dashboard/ProfileVenueCard";
import AvatarModal from "../components/dashboard/AvatarModal";
import FormMessage from "../components/ui/FormMessage";
import { getProfileBookings } from "../api/profile";
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
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const navigate = useNavigate();

  function openAvatarModal() {
    setIsAvatarModalOpen(true);
  }

  function closeAvatarModal() {
    setIsAvatarModalOpen(false);
  }

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
            <MenuItem type="button" onClick={openAvatarModal}>
              Edit Profile
            </MenuItem>
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
        avatarUrl={user?.avatar?.url}
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