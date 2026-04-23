import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FormMessage from "../components/ui/FormMessage";
import { getVenueById } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venuesUtils";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 80px;
  display: grid;
  gap: 32px;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const TopSection = styled.section`
  display: grid;
  gap: 12px;
`;

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

const Facilities = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Facility = styled.span`
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--background);
  border: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-muted);
`;

const LoadingText = styled.p`
  margin: 0;
  color: var(--text-muted);
`;

export default function VenueDetails() {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadVenue() {
      try {
        setIsLoading(true);
        setPageError("");

        const data = await getVenueById(id);
        setVenue(data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (isLoading) {
    return (
      <PageWrapper>
        <Container>
          <LoadingText>Loading venue...</LoadingText>
        </Container>
      </PageWrapper>
    );
  }

  if (pageError) {
    return (
      <PageWrapper>
        <Container>
          <FormMessage variant="error">{pageError}</FormMessage>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <HeroImage
          src={venue?.media?.[0]?.url}
          alt={venue?.media?.[0]?.alt || venue?.name}
        />

        <TopSection>
          <Title>{venue?.name}</Title>

          <MetaRow>
            <span>{formatLocation(venue?.location)}</span>
            <span>{venue?.maxGuests} guests</span>
            <span>{venue?.rating} ⭐</span>
          </MetaRow>

          <Price>${venue?.price}/night</Price>
        </TopSection>

        <Description>{venue?.description}</Description>

        <Facilities>
          {getFacilities(venue?.meta).map((item) => (
            <Facility key={item}>{item}</Facility>
          ))}
        </Facilities>
      </Container>
    </PageWrapper>
  );
}