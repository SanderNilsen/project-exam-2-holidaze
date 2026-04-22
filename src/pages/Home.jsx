import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import VenueCard from "../components/venues/VenueCard";

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
  margin-bottom: 28px;
`;

const Grid = styled.div`
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

const featuredVenues = [
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
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
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
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
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
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    facilities: ["Wifi", "Pet-friendly", "Breakfast"],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

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

          <SearchInput placeholder="Search..." />

          <ButtonRow>
            <SecondaryButton onClick={() => navigate("/venues")}>
              All Venues
            </SecondaryButton>

            <PrimaryButton onClick={handleProfileClick}>
              View Profile
            </PrimaryButton>
          </ButtonRow>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Featured Venues</SectionTitle>

        <Grid>
          {featuredVenues.map((venue) => (
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
        </Grid>
      </Section>
    </PageWrapper>
  );
}