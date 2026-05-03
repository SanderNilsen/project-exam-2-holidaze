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
  font-size: 18px;
  font-weight: 500;
  color: var(--text);
`;

const Location = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const MetaText = styled.p`
  margin: 0;
  font-size: 14px;
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
  font-size: 18px;
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

const CancelButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: #ef4444;
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
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
  onView,
  onCancel,
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
          <ViewButton type="button" onClick={onView}>
            View
          </ViewButton>

          {showCancel && (
            <CancelButton type="button" onClick={onCancel}>
              Cancel
            </CancelButton>
          )}
        </ActionRow>
      </Actions>
    </Card>
  );
}