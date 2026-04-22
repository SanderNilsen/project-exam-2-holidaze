import styled from "styled-components";

const Card = styled.article`
  overflow: hidden;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
`;

const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
`;

const Content = styled.div`
  padding: 14px 14px 16px;
  display: grid;
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Location = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
`;

const Guests = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--text-placeholder);
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
`;

const Price = styled.p`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #22c55e;
`;

const PriceUnit = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Facilities = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Facility = styled.span`
  font-size: 12px;
  color: var(--text-placeholder);
`;

export default function VenueCard({
  image,
  title,
  location,
  guests,
  description,
  price,
  rating,
  facilities = [],
}) {
  return (
    <Card>
      <ImageWrapper>
        <Image src={image} alt={title} />
        {rating && <Rating>{rating} ⭐</Rating>}
      </ImageWrapper>

      <Content>
        <Title>{title}</Title>

        <MetaRow>
          <Location>{location}</Location>
          <Guests>{guests} guests</Guests>
        </MetaRow>

        <Description>{description}</Description>

        <Price>
          ${price}
          <PriceUnit>/night</PriceUnit>
        </Price>

        <Facilities>
          {facilities.map((item) => (
            <Facility key={item}>{item}</Facility>
          ))}
        </Facilities>
      </Content>
    </Card>
  );
}