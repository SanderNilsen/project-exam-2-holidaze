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
  opacity: ${({ $muted }) => ($muted ? 0.65 : 1)};

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
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text);
`;

const Location = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const MetaText = styled.p`
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
  font-size: 1.2rem;
  font-weight: 500;
  color: #22c55e;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ViewButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--primary);
  border-radius: 10px;
  background: transparent;
  color: var(--primary);
  font-size: 0.95rem;
  cursor: pointer;
`;

const CancelButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid #ef4444;
  border-radius: 10px;
  background: transparent;
  color: #ef4444;
  font-size: 0.95rem;
  cursor: pointer;
`;

export default function ProfileVenueCard({
  image,
  title,
  location,
  checkIn,
  checkOut,
  price,
  muted = false,
  showCancel = false,
}) {
  return (
    <Card $muted={muted}>
      <Image src={image} alt={title} />

      <Content>
        <Title>{title}</Title>
        <Location>{location}</Location>

        <MetaRow>
          <MetaText>
            Check-in: <strong>{checkIn}</strong>
          </MetaText>
          <MetaText>
            Check-out: <strong>{checkOut}</strong>
          </MetaText>
        </MetaRow>
      </Content>

      <Actions>
        <Price>{price}</Price>

        <ActionRow>
          <ViewButton type="button">View</ViewButton>
          {showCancel && <CancelButton type="button">Cancel</CancelButton>}
        </ActionRow>
      </Actions>
    </Card>
  );
}