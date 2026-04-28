import { useEffect, useState } from "react";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ManagerVenueCard from "../components/dashboard/ManagerVenueCard";
import BookingCard from "../components/dashboard/BookingCard";
import FormMessage from "../components/ui/FormMessage";
import { getProfileVenues } from "../api/profile";
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

export default function Manager() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

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
          {isLoading && <p>Loading venues...</p>}

          {!isLoading && venues.length === 0 && (
            <p>You have not created any venues yet.</p>
          )}

          {!isLoading &&
            venues.map((venue) => (
              <ManagerVenueCard
                key={venue.id}
                image={
                  venue.media?.[0]?.url || "/images/placeholder-venue.svg"
                }
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
                primaryAction="View"
              />
            ))}
        </SectionBlock>
      </DashboardShell>
    </>
  );
}