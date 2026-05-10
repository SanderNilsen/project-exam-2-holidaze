import styled from "styled-components";

const MapWrapper = styled.section`
  display: grid;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  color: var(--text);
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 320px;
  border: 0;
  border-radius: 16px;
  background: var(--background);
`;

const FallbackText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
`;

function hasValidCoordinates(lat, lng) {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat !== 0 &&
    lng !== 0
  );
}

export default function VenueMap({ location }) {
  const lat = location?.lat;
  const lng = location?.lng;
  const address = location?.address;
  const city = location?.city;
  const country = location?.country;

  const hasCoordinates = hasValidCoordinates(lat, lng);
  const hasAddress = city || country || address;

  if (!hasCoordinates && !hasAddress) {
    return (
      <MapWrapper>
        <Title>Location</Title>
        <FallbackText>Map is not available for this venue.</FallbackText>
      </MapWrapper>
    );
  }

  const query = hasCoordinates
    ? `${lat},${lng}`
    : encodeURIComponent(`${address || ""}, ${city || ""}, ${country || ""}`);

  const mapUrl = `https://www.google.com/maps?q=${query}&z=14&output=embed`;

  return (
    <MapWrapper>
      <Title>Location</Title>

      <MapFrame
        title="Venue location map"
        src={mapUrl}
        loading="lazy"
      />
    </MapWrapper>
  );
}