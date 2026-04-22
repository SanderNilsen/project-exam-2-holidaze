import styled from "styled-components";
import VenueCard from "../components/venues/VenueCard";

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

const venues = [
  {
    id: 1,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
  {
    id: 2,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
  {
    id: 3,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
  {
    id: 4,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
  {
    id: 5,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
  {
    id: 6,
    title: "Scandinavian Apartment with Fjord View",
    location: "Oslo, Norway",
    guests: 4,
    description:
      "Modern apartment in Oslo with fjord views and central location.",
    price: 180,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
];

export default function Venues() {
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
          <SearchInput type="text" placeholder="Search venues..." />
          <ResultsText>{venues.length} venues available</ResultsText>
        </SearchBar>

        <VenueGrid>
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              image={venue.image}
              title={venue.title}
              location={venue.location}
              guests={venue.guests}
              description={venue.description}
              price={venue.price}
              rating={venue.rating}
              facilities={venue.facilities}
            />
          ))}
        </VenueGrid>
      </Content>
    </PageWrapper>
  );
}