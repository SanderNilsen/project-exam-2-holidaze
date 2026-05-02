import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: #ffffff;
  color: var(--primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--border);

  &:hover {
    background: #f8fafc;
  }
`;

const ViewButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: var(--primary);
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover);
  }
`;

export default function ManagerVenueCard({
  id,
  image,
  title,
  location,
  bookings,
  price,
}) {
  const navigate = useNavigate();
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
            <ViewButton type="button" onClick={() => navigate(`/venues/${id}`)}>
              View
            </ViewButton>
        </ActionRow>
      </Actions>
    </Card>
  );
}