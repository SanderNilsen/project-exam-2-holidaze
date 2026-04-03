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
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
`;

const TextGroup = styled.div`
  display: grid;
  gap: 4px;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 600;
`;

const Email = styled.p`
  margin: 0;
  font-size: 16px;
  opacity: 0.95;
`;

const Role = styled.p`
  margin: 0;
  font-size: 16px;
  opacity: 0.95;
`;

const ActionButton = styled.button`
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: #ffffff;
  color: var(--primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export default function HeroPanel({
  name,
  email,
  role,
  buttonText = "Edit Profile",
  onEdit,
}) {
  return (
    <Hero>
      <HeroContainer>
        <ProfileInfo>
          <Avatar />
          <TextGroup>
            <Name>{name}</Name>
            <Email>{email}</Email>
            <Role>{role}</Role>
          </TextGroup>
        </ProfileInfo>

        <ActionButton type="button" onClick={onEdit}>
          {buttonText}
        </ActionButton>
      </HeroContainer>
    </Hero>
  );
}