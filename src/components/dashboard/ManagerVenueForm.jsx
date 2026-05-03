import styled from "styled-components";
import InputField from "../ui/InputField";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import FormMessage from "../ui/FormMessage";

const Form = styled.form`
  display: grid;
  gap: 18px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

export default function ManagerVenueForm({
  venueForm,
  formError,
  isSubmitting,
  editingVenue,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <InputField
        id="name"
        label="Venue name"
        type="text"
        placeholder="Scandinavian apartment"
        value={venueForm.name}
        onChange={onChange}
      />

      <InputField
        id="description"
        label="Description"
        type="text"
        placeholder="Describe your venue"
        value={venueForm.description}
        onChange={onChange}
      />

      <InputField
        id="price"
        label="Price per night"
        type="number"
        placeholder="180"
        value={venueForm.price}
        onChange={onChange}
      />

      <InputField
        id="maxGuests"
        label="Max guests"
        type="number"
        placeholder="4"
        value={venueForm.maxGuests}
        onChange={onChange}
      />

      <InputField
        id="mediaUrl"
        label="Image URL"
        type="url"
        placeholder="https://example.com/image.jpg"
        value={venueForm.mediaUrl}
        onChange={onChange}
      />

      <InputField
        id="city"
        label="City"
        type="text"
        placeholder="Oslo"
        value={venueForm.city}
        onChange={onChange}
      />

      <InputField
        id="country"
        label="Country"
        type="text"
        placeholder="Norway"
        value={venueForm.country}
        onChange={onChange}
      />

      <FormMessage variant="error">{formError}</FormMessage>

      <ButtonRow>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>

        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : editingVenue
              ? "Save changes"
              : "Create venue"}
        </PrimaryButton>
      </ButtonRow>
    </Form>
  );
}