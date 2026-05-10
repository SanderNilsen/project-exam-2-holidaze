import { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import FormMessage from "../../components/ui/FormMessage";
import { updateAvatar } from "../../api/profile";

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

export default function AvatarModal({
  isOpen,
  onClose,
  user,
  token,
  apiKey,
  onUserUpdated,
}) {
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClose() {
    setFormError("");
    onClose();
  }

  async function handleSubmit(event) {
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
      window.dispatchEvent(new Event("userUpdated"));

      onUserUpdated(updatedUser);
      handleClose();
    } catch (error) {
      setFormError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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

        <FormMessage variant="error">{formError}</FormMessage>

        <ButtonRow>
          <SecondaryButton type="button" onClick={handleClose}>
            Cancel
          </SecondaryButton>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </PrimaryButton>
        </ButtonRow>
      </ModalForm>
    </Modal>
  );
}
