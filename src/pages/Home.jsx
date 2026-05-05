import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import VenueCard from "../components/venues/VenueCard";
import FormMessage from "../components/ui/FormMessage";
import { getVenues } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venueUtils";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Hero = styled.section`
  background: var(--primary);
  min-height: 360px;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  justify-items: center;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
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

const SearchForm = styled.form`
  width: 100%;
  display: grid;
  justify-items: center;
`;

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  function handleSearchSubmit(event) {
  event.preventDefault();

  const query = search.trim();

  if (query) {
    navigate(`/venues?search=${encodeURIComponent(query)}`);
  } else {
    navigate("/venues");
  }
}

  useEffect(() => {
    async function loadFeaturedVenues() {
      try {
        setIsLoading(true);
        setPageError("");

        const result = await getVenues({
          page: 1,
          limit: 3,
          sort: "rating",
          sortOrder: "desc",
        });
        setVenues(result.data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedVenues();
  }, []);

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

          <SearchForm onSubmit={handleSearchSubmit}>
            <SearchInput
              type="text"
              placeholder="Search venues..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </SearchForm>

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

        {!isLoading && !pageError && venues.length === 0 && (
          <EmptyText>No featured venues found.</EmptyText>
        )}

        {!isLoading && !pageError && venues.length > 0 && (
          <VenueGrid>
            {venues.map((venue) => (
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