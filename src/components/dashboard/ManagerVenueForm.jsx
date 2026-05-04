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

const CheckboxGroup = styled.div`
  display: grid;
  gap: 10px;
`;

const CheckboxTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin: 0;
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
      
      <CheckboxGroup>
        <CheckboxTitle>Facilities</CheckboxTitle>

        <CheckboxGrid>
          <CheckboxLabel htmlFor="wifi">
            <Checkbox
              id="wifi"
              name="wifi"
              type="checkbox"
              checked={venueForm.wifi}
              onChange={onChange}
            />
            Wifi
          </CheckboxLabel>

          <CheckboxLabel htmlFor="parking">
            <Checkbox
              id="parking"
              name="parking"
              type="checkbox"
              checked={venueForm.parking}
              onChange={onChange}
            />
            Parking
          </CheckboxLabel>

          <CheckboxLabel htmlFor="breakfast">
            <Checkbox
              id="breakfast"
              name="breakfast"
              type="checkbox"
              checked={venueForm.breakfast}
              onChange={onChange}
            />
            Breakfast
          </CheckboxLabel>

          <CheckboxLabel htmlFor="pets">
            <Checkbox
              id="pets"
              name="pets"
              type="checkbox"
              checked={venueForm.pets}
              onChange={onChange}
            />
            Pet-friendly
          </CheckboxLabel>
        </CheckboxGrid>
      </CheckboxGroup>

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