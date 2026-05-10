import styled from "styled-components";

const Hero = styled.section`
  background: var(--primary);
  color: #fff;
`;

const HeroContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 56px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 520px) {
    align-items: flex-start;
    gap: 14px;
  }
`;

const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ffffff;
  border: 3px solid rgba(255, 255, 255, 0.65);
  flex-shrink: 0;

  @media (max-width: 520px) {
    width: 72px;
    height: 72px;
  }
`;

const TextGroup = styled.div`
  display: grid;
  gap: 6px;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;

  @media (max-width: 520px) {
    font-size: 26px;
  }
`;

const Email = styled.p`
  margin: 0;
  font-size: 15px;
  word-break: break-word;
`;

const Role = styled.span`
  width: fit-content;
  margin-top: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
`;

export default function HeroPanel({ name, email, role, avatarUrl }) {
  return (
    <Hero>
      <HeroContainer>
        <ProfileInfo>
          <Avatar
            src={avatarUrl || "/images/avatar-placeholder.png"}
            alt={`${name} avatar`}
          />
          <TextGroup>
            <Name>{name}</Name>
            <Email>{email}</Email>
            <Role>{role}</Role>
          </TextGroup>
        </ProfileInfo>
      </HeroContainer>
    </Hero>
  );
}
