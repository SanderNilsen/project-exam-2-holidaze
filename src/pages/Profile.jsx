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
import FormMessage from "../components/ui/FormMessage";
import { updateAvatar } from "../api/profile";
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
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const [user, setUser] = useState(storedUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function openModal() {
    setAvatarUrl(user?.avatar?.url || "");
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError("");
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
      </EditModal>
    </>
  );
}