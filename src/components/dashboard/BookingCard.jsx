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

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
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

export default function BookingCard({
  guestName,
  venueTitle,
  checkIn,
  checkOut,
  guests,
  avatarUrl,
}) {
  return (
    <Card>
      <Avatar
        src={avatarUrl || "/images/avatar-placeholder.svg"}
        alt={guestName}
      />
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
    </Card>
  );
}