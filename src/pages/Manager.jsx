import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ManagerVenueCard from "../components/dashboard/ManagerVenueCard";
import BookingCard from "../components/dashboard/BookingCard";
import {
  MenuList,
  MenuItem,
  ActiveMenuItem,
  StatsList,
  StatItem,
  StatLabel,
  StatValue,
} from "../components/dashboard/SidebarElements";

const myVenues = [
  {
    id: 1,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    bookings: 12,
    price: "$180/night",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    bookings: 12,
    price: "$180/night",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
  },
];

const upcomingBookings = [
  {
    id: 3,
    guestName: "UserName",
    venueTitle: "Scandinavian Apartment with Fjord View",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 30, 2026",
    guests: 4,
    primaryAction: "View",
  },
];

export default function Manager() {
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
            <StatValue>3</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Total Bookings</StatLabel>
            <StatValue>23</StatValue>
          </StatItem>

          <StatItem>
            <StatLabel>Member since</StatLabel>
            <StatValue>January 2026</StatValue>
          </StatItem>
        </StatsList>
      </SidebarCard>
    </>
  );

  return (
    <>
      <HeroPanel
        name="UserName"
        email="user@stud.noroff.no"
        role="Manager Account"
        buttonText="Edit Profile"
      />

      <DashboardShell sidebar={sidebar}>
        <SectionBlock title="My Venues">
          {myVenues.map((venue) => (
            <ManagerVenueCard key={venue.id} {...venue} />
          ))}
        </SectionBlock>

        <SectionBlock title="Upcoming Bookings">
          {upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </SectionBlock>
      </DashboardShell>
    </>
  );
}