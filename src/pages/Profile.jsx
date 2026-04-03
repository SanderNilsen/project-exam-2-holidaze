import { useState } from "react";
import styled from "styled-components";
import HeroPanel from "../components/dashboard/HeroPanel";
import DashboardShell from "../components/dashboard/DashboardShell";
import SidebarCard from "../components/dashboard/SidebarCard";
import SectionBlock from "../components/dashboard/SectionBlock";
import ProfileVenueCard from "../components/dashboard/ProfileVenueCard";
import EditModal from "../components/dashboard/EditModal";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
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

const SecondaryButton = styled.button`
  height: 44px;
  margin-top: 8px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: var(--background-light);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const upcomingBookings = [
  {
    id: 1,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 30, 2026",
    price: "$180/night",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80",
    showCancel: true,
  },
  {
    id: 2,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 30, 2026",
    price: "$180/night",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
    showCancel: true,
  },
];

const pastBookings = [
  {
    id: 3,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    checkIn: "Mar 25, 2026",
    checkOut: "Mar 30, 2026",
    price: "$180/night",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80",
    muted: true,
  },
];

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

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
            <StatValue>{upcomingBookings.length + pastBookings.length}</StatValue>
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Avatar URL:", avatarUrl);
    setIsModalOpen(false);
  }

  return (
    <>
      <HeroPanel
        name={user?.name || "UserName"}
        email={user?.email || "user@stud.noroff.no"}
        role={user?.venueManager ? "Manager Account" : "Customer Account"}
        buttonText="Edit Profile"
        onEdit={() => setIsModalOpen(true)}
      />

      <DashboardShell sidebar={sidebar}>
        <SectionBlock title="Upcoming bookings">
          {upcomingBookings.map((booking) => (
            <ProfileVenueCard key={booking.id} {...booking} />
          ))}
        </SectionBlock>

        <SectionBlock title="Past bookings">
          {pastBookings.map((booking) => (
            <ProfileVenueCard key={booking.id} {...booking} />
          ))}
        </SectionBlock>
      </DashboardShell>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit profile"
        description="Add a public image URL to update your avatar."
      >
        <ModalForm onSubmit={handleSubmit}>
          <InputField
            id="avatarUrl"
            label="Avatar URL"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
          />

          <ButtonRow>
            <SecondaryButton
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton type="submit">Save changes</PrimaryButton>
          </ButtonRow>
        </ModalForm>
      </EditModal>
    </>
  );
}