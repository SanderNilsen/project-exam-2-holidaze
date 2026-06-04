import styled from "styled-components";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import FormMessage from "../../components/ui/FormMessage";

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

const MediaGroup = styled.div`
  display: grid;
  gap: 12px;
`;

const MediaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const MediaTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
`;

const MediaItem = styled.div`
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--background-light);
`;

const SmallButton = styled.button`
  height: 34px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: var(--background-light);
  }
`;

const RemoveButton = styled(SmallButton)`
  color: #dc2626;

  &:hover {
    background: #fef2f2;
  }
`;

export default function ManagerVenueForm({
  venueForm,
  formError,
  isSubmitting,
  editingVenue,
  onChange,
  onMediaChange,
  onAddMediaField,
  onRemoveMediaField,
  onSubmit,
  onCancel,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <InputField
        id="name"
        label="Venue name"
        type="text"
        placeholder="Title"
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
        placeholder="Price"
        value={venueForm.price}
        onChange={onChange}
      />

      <InputField
        id="maxGuests"
        label="Max guests"
        type="number"
        placeholder="Max guests"
        value={venueForm.maxGuests}
        onChange={onChange}
      />

      <MediaGroup>
        <MediaHeader>
          <MediaTitle>Images</MediaTitle>

          <SmallButton type="button" onClick={onAddMediaField}>
            Add another image
          </SmallButton>
        </MediaHeader>

        {venueForm.media.map((image, index) => (
          <MediaItem key={index}>
            <InputField
              id={`media-${index}-url`}
              label={`Image URL ${index + 1}`}
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image.url}
              onChange={(event) =>
                onMediaChange(index, "url", event.target.value)
              }
            />

            <InputField
              id={`media-${index}-alt`}
              label={`Image alt text ${index + 1}`}
              type="text"
              placeholder="Describe the image"
              value={image.alt}
              onChange={(event) =>
                onMediaChange(index, "alt", event.target.value)
              }
            />

            {venueForm.media.length > 1 && (
              <RemoveButton
                type="button"
                onClick={() => onRemoveMediaField(index)}
              >
                Remove image
              </RemoveButton>
            )}
          </MediaItem>
        ))}
      </MediaGroup>

      <InputField
        id="address"
        label="Address"
        type="text"
        placeholder="Address"
        value={venueForm.address}
        onChange={onChange}
      />

      <InputField
        id="city"
        label="City"
        type="text"
        placeholder="City"
        value={venueForm.city}
        onChange={onChange}
      />

      <InputField
        id="zip"
        label="Zip code"
        type="text"
        placeholder="0154"
        value={venueForm.zip}
        onChange={onChange}
      />

      <InputField
        id="country"
        label="Country"
        type="text"
        placeholder="Country"
        value={venueForm.country}
        onChange={onChange}
      />

      <InputField
        id="continent"
        label="Continent"
        type="text"
        placeholder="Continent"
        value={venueForm.continent}
        onChange={onChange}
      />

      <InputField
        id="lat"
        label="Latitude"
        type="number"
        placeholder="lat"
        value={venueForm.lat}
        onChange={onChange}
      />

      <InputField
        id="lng"
        label="Longitude"
        type="number"
        placeholder="lng"
        value={venueForm.lng}
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
