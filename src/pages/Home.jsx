import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import VenueCard from "../components/venues/VenueCard";
import FormMessage from "../components/ui/FormMessage";
import { getVenues } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venuesUtils";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Hero = styled.section`
  min-height: 360px;
  background:
    linear-gradient(rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.22)),
    url("/images/home-hero.jpg") center/cover no-repeat;
  display: grid;
  place-items: center;
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 48px 16px;
  display: grid;
  justify-items: center;
  gap: 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SearchInput = styled.input`
  width: min(100%, 520px);
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
`;

const SecondaryButton = styled.button`
  height: 42px;
  padding: 0 18px;
  border-radius: 10px;
  border: none;
  background: #ffffff;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  height: 42px;
  padding: 0 18px;
  border-radius: 10px;
  border: none;
  background: var(--accent);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 56px 16px 80px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 28px;
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
`;

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
`;

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadFeaturedVenues() {
      try {
        setIsLoading(true);
        setPageError("");

        const result = await getVenues({ page: 1, limit: 6 });
        setVenues(result.data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedVenues();
  }, []);

  const featuredVenues = useMemo(() => {
    const filtered = venues.filter((venue) => {
      const query = search.trim().toLowerCase();

      if (!query) return true;

      const name = venue.name?.toLowerCase() || "";
      const description = venue.description?.toLowerCase() || "";
      const city = venue.location?.city?.toLowerCase() || "";
      const country = venue.location?.country?.toLowerCase() || "";

      return (
        name.includes(query) ||
        description.includes(query) ||
        city.includes(query) ||
        country.includes(query)
      );
    });

    return filtered.slice(0, 3);
  }, [venues, search]);

  function handleProfileClick() {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(user.venueManager ? "/manager" : "/profile");
  }

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <HeroTitle>Find Your Perfect Stay</HeroTitle>

          <SearchInput
            type="text"
            placeholder="Search featured venues..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <ButtonRow>
            <SecondaryButton type="button" onClick={() => navigate("/venues")}>
              All Venues
            </SecondaryButton>

            <PrimaryButton type="button" onClick={handleProfileClick}>
              View Profile
            </PrimaryButton>
          </ButtonRow>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Featured Venues</SectionTitle>

        {isLoading && <LoadingText>Loading featured venues...</LoadingText>}

        {pageError && <FormMessage variant="error">{pageError}</FormMessage>}

        {!isLoading && !pageError && featuredVenues.length === 0 && (
          <EmptyText>No featured venues found.</EmptyText>
        )}

        {!isLoading && !pageError && featuredVenues.length > 0 && (
          <VenueGrid>
            {featuredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                id={venue.id}
                image={venue.media?.[0]?.url || "/images/placeholder-venue.svg"}
                title={venue.name}
                location={formatLocation(venue.location)}
                guests={venue.maxGuests}
                description={venue.description}
                price={venue.price}
                rating={venue.rating}
                facilities={getFacilities(venue.meta)}
              />
            ))}
          </VenueGrid>
        )}
      </Section>
    </PageWrapper>
  );
}