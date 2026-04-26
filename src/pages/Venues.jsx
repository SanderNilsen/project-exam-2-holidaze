import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import VenueCard from "../components/venues/VenueCard";
import FormMessage from "../components/ui/FormMessage";
import { getVenues } from "../api/venues";
import { formatLocation, getFacilities } from "../utils/venuesUtils";
import { useSearchParams } from "react-router-dom";

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

const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Venues() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

async function handleLoadMore() {
  try {
    setIsLoadingMore(true);

    const nextPage = page + 1;
    const result = await getVenues({ page: nextPage, limit: 12 });

    setVenues((prev) => [...prev, ...result.data]);
    setPage(nextPage);
    setHasMore(!result.meta.isLastPage);
  } catch (error) {
    setPageError(error.message || "Could not load more venues.");
  } finally {
    setIsLoadingMore(false);
  }
}

  useEffect(() => {
    async function loadVenues() {
      try {
        setIsLoading(true);
        setPageError("");

        const result = await getVenues({ page: 1, limit: 12 });

        setVenues(result.data);
        setHasMore(!result.meta.isLastPage);
      } catch (error) {
        setPageError(error.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVenues();
  }, []);

  const filteredVenues = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = venues.filter((venue) => {
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
  }, [venues, search, sortBy]);

  return (
    <PageWrapper>
      <Hero>
        <HeroContent>
          <Title>All Venues</Title>
          <Description>
            Browse venues for every kind of trip, from city apartments to mountain cabins.
          </Description>
        </HeroContent>
      </Hero>

      <Content>
      <SearchBar>
        <ControlsRow>
          <SearchInput
            type="text"
            placeholder="Search venues..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="guests">Guests</option>
          </Select>
        </ControlsRow>

        <ResultsText>{filteredVenues.length} venues loaded</ResultsText>
      </SearchBar>

        {isLoading && <LoadingText>Loading venues...</LoadingText>}

        {pageError && <FormMessage variant="error">{pageError}</FormMessage>}

        {!isLoading && !pageError && filteredVenues.length === 0 && (
          <EmptyText>No venues matched your search.</EmptyText>
        )}

      {!isLoading && !pageError && filteredVenues.length > 0 && (
        <>
          <VenueGrid>
            {filteredVenues.map((venue) => (
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

          {hasMore && (
            <LoadMoreButton
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </LoadMoreButton>
          )}
        </>
      )}
      </Content>
    </PageWrapper>
  );
}