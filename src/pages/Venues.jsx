import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import VenueCard from "../features/venues/VenueCard";
import FormMessage from "../components/ui/FormMessage";
import { getAllVenues } from "../api/venues";
import {
  formatLocation,
  getFacilities,
  matchesSearch,
  matchesFacilities,
} from "../utils/venueUtils";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Hero = styled.section`
  background: var(--primary);
  color: #ffffff;
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 16px;
  display: grid;
  gap: 14px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.95;
`;

const Content = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px 80px;
  display: grid;
  gap: 28px;
`;

const SearchBar = styled.div`
  display: grid;
  gap: 12px;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 420px;
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--background);
  color: var(--text);
  font-size: 14px;

  &::placeholder {
    color: var(--text-placeholder);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  }
`;

const Select = styled.select`
  height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--text);
  font-size: 14px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: var(--text);
    border-color: var(--primary);
  }
`;

const FilterCheckbox = styled.input`
  margin: 0;
`;

const ResultsText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
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

const VenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButton = styled.button`
  justify-self: center;
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 10px;
  background: var(--primary);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--primary-hover);
  }
`;

export default function Venues() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  function handleFacilityChange(event) {
    const { value, checked } = event.target;

    setSelectedFacilities((prev) => {
      if (checked) {
        return [...prev, value];
      }

      return prev.filter((item) => item !== value);
    });
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 12);
  }

  useEffect(() => {
    async function loadVenues() {
      try {
        setIsLoading(true);
        setPageError("");

        const data = await getAllVenues();
        setVenues(data);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVenues();
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [search, selectedFacilities, sortBy]);

  const filteredVenues = useMemo(() => {
    let result = venues.filter((venue) => {
      return (
        matchesSearch(venue, search) &&
        matchesFacilities(venue, selectedFacilities)
      );
    });

    switch (sortBy) {
      case "priceAsc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "priceDesc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;

      case "guests":
        result = [...result].sort((a, b) => b.maxGuests - a.maxGuests);
        break;

      default:
        break;
    }

    return result;
  }, [venues, search, selectedFacilities, sortBy]);

  const visibleVenues = filteredVenues.slice(0, visibleCount);
  const hasMoreVisible = visibleCount < filteredVenues.length;

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <Title>All Venues</Title>
          <Description>
            Browse venues for every kind of trip, from city apartments to
            mountain cabins.
          </Description>
        </HeroContent>
      </Hero>

      <Content>
        <SearchBar>
          <ControlsRow>
            <SearchInput
              type="text"
              placeholder="Search by title, city, country, facilities..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="guests">Guests</option>
            </Select>
          </ControlsRow>

          <FilterGroup>
            <FilterLabel>
              <FilterCheckbox
                type="checkbox"
                value="wifi"
                checked={selectedFacilities.includes("wifi")}
                onChange={handleFacilityChange}
              />
              Wifi
            </FilterLabel>

            <FilterLabel>
              <FilterCheckbox
                type="checkbox"
                value="parking"
                checked={selectedFacilities.includes("parking")}
                onChange={handleFacilityChange}
              />
              Parking
            </FilterLabel>

            <FilterLabel>
              <FilterCheckbox
                type="checkbox"
                value="breakfast"
                checked={selectedFacilities.includes("breakfast")}
                onChange={handleFacilityChange}
              />
              Breakfast
            </FilterLabel>

            <FilterLabel>
              <FilterCheckbox
                type="checkbox"
                value="pets"
                checked={selectedFacilities.includes("pets")}
                onChange={handleFacilityChange}
              />
              Pets
            </FilterLabel>
          </FilterGroup>

          <ResultsText>
            Showing {visibleVenues.length} of {filteredVenues.length} matching
            venues
          </ResultsText>
        </SearchBar>

        {isLoading && <LoadingText>Loading venues...</LoadingText>}

        {pageError && <FormMessage variant="error">{pageError}</FormMessage>}

        {!isLoading && !pageError && filteredVenues.length === 0 && (
          <EmptyText>No venues matched your search.</EmptyText>
        )}

        {!isLoading && !pageError && filteredVenues.length > 0 && (
          <>
            <VenueGrid>
              {visibleVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  id={venue.id}
                  image={
                    venue.media?.[0]?.url || "/images/placeholder-venue.svg"
                  }
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

            {hasMoreVisible && (
              <LoadMoreButton type="button" onClick={handleLoadMore}>
                Load More
              </LoadMoreButton>
            )}
          </>
        )}
      </Content>
    </PageWrapper>
  );
}
