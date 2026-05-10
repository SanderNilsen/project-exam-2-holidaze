import styled from "styled-components";
import { formatLocation, getFacilities } from "../../utils/venueUtils";
import VenueMap from "./VenueMap";

const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  color: var(--text);
`;

const MetaRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 14px;
`;

const Price = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #22c55e;
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
`;

const Facility = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--background);
  border: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-muted);
`;

const MainContent = styled.div`
  display: grid;
  gap: 24px;
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
`;

const HostCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  padding: 12px 14px;
  background: var(--background-light);
  border: 1px solid var(--border);
  border-radius: 14px;
`;

const HostAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #ffffff;
  border: 1px solid var(--border);
`;

const HostInfo = styled.div`
  display: grid;
  gap: 3px;
`;

const HostLabel = styled.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
`;

const HostName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

const InfoCard = styled.section`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
  display: grid;
  gap: 18px;
`;

const SectionHeading = styled.h2`
  margin: 0;
  font-size: 22px;
  color: var(--text);
`;

const TitleRow = styled.div`
  display: grid;
  gap: 12px;
`;

const VenueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PriceBlock = styled.div`
  display: grid;
  justify-items: end;
  gap: 2px;

  @media (max-width: 640px) {
    justify-items: start;
  }
`;

const PriceUnit = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const FacilityList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export default function VenueInfo({ venue }) {
  const facilities = getFacilities(venue.meta);

  return (
    <MainContent>
      <InfoCard>
        <VenueHeader>
          <TitleRow>
            <Title>{venue.name}</Title>

            <MetaRow>
              <span>{formatLocation(venue.location)}</span>
              <span>{venue.maxGuests} guests</span>
              <span>{venue.rating} ⭐</span>
            </MetaRow>
          </TitleRow>

          <PriceBlock>
            <Price>
              ${venue.price}
              <PriceUnit>/night</PriceUnit>
            </Price>
          </PriceBlock>
        </VenueHeader>

        {venue.owner && (
          <HostCard>
            <HostAvatar
              src={venue.owner.avatar?.url || "/images/avatar-placeholder.png"}
              alt={`${venue.owner.name} avatar`}
            />

            <HostInfo>
              <HostLabel>Hosted by</HostLabel>
              <HostName>{venue.owner.name}</HostName>
            </HostInfo>
          </HostCard>
        )}
      </InfoCard>

      <InfoCard>
        <SectionHeading>Description</SectionHeading>
        <Description>{venue.description}</Description>
      </InfoCard>

      <InfoCard>
        <SectionHeading>Facilities</SectionHeading>

        <FacilityList>
          {facilities.length > 0 ? (
            facilities.map((item) => <Facility key={item}>{item}</Facility>)
          ) : (
            <HelperText>No facilities listed.</HelperText>
          )}
        </FacilityList>
      </InfoCard>

      <InfoCard>
        <VenueMap location={venue.location} />
      </InfoCard>
    </MainContent>
  );
}
