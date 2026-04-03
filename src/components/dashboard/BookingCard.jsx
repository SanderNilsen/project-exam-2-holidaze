import styled from "styled-components";

const Card = styled.article`
  display: grid;
  grid-template-columns: 64px 1fr auto;
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

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #dbeafe;
`;

const Content = styled.div`
  display: grid;
  gap: 6px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--text);
`;

const Venue = styled.p`
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
  @media (max-width: 768px) {
    justify-self: start;
  }
`;

const ViewButton = styled.button`
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--primary);
  border-radius: 10px;
  background: transparent;
  color: var(--primary);
  font-size: 14px;
  cursor: pointer;
`;

export default function BookingCard({
  guestName,
  venueTitle,
  checkIn,
  checkOut,
  guests,
}) {
  return (
    <Card>
      <Avatar />

      <Content>
        <Name>{guestName}</Name>
        <Venue>{venueTitle}</Venue>

        <MetaRow>
          <MetaText>
            Check-in: <strong>{checkIn}</strong>
          </MetaText>
          <MetaText>
            Check-out: <strong>{checkOut}</strong>
          </MetaText>
          <MetaText>
            Guests: <strong>{guests}</strong>
          </MetaText>
        </MetaRow>
      </Content>

      <Actions>
        <ViewButton type="button">View</ViewButton>
      </Actions>
    </Card>
  );
}