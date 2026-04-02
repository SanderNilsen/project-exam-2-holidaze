import styled from "styled-components";

const Card = styled.article`
  display: grid;
  grid-template-columns: 96px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 14px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.img`
  width: 96px;
  height: 68px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  display: grid;
  gap: 6px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text);
`;

const Location = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const Meta = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);

  strong {
    color: var(--text);
  }
`;

const Actions = styled.div`
  display: grid;
  justify-items: end;
  gap: 12px;

  @media (max-width: 768px) {
    justify-items: start;
  }
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #22c55e;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const EditButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--primary);
  border-radius: 10px;
  background: transparent;
  color: var(--primary);
  font-size: 0.95rem;
  cursor: pointer;
`;

const ViewButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  cursor: pointer;
`;

export default function VenueCard({
  image,
  title,
  location,
  bookings,
  price,
}) {
  return (
    <Card>
      <Image src={image} alt={title} />

      <Content>
        <Title>{title}</Title>
        <Location>{location}</Location>
        <Meta>
          Bookings: <strong>{bookings}</strong>
        </Meta>
      </Content>

      <Actions>
        <Price>{price}</Price>

        <ActionRow>
          <EditButton type="button">Edit</EditButton>
          <ViewButton type="button">View</ViewButton>
        </ActionRow>
      </Actions>
    </Card>
  );
}