import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.footer`
  background: #1e293b;
  color: #e2e8f0;
  margin-top: 80px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const Top = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
`;

const Brand = styled.div`
  display: grid;
  gap: 12px;
`;

const Logo = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #cbd5f5;
  line-height: 1.6;
`;

const Column = styled.div`
  display: grid;
  gap: 10px;
`;

const ColumnTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 6px;
  color: #f1f5f9;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: #cbd5f5;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const Bottom = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #334155;
  font-size: 12px;
  color: #94a3b8;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Top>
          <Brand>
            <Logo>Holidaze</Logo>
            <Description>
              Your perfect stay awaits. Discover and book amazing venues
              around the world.
            </Description>
          </Brand>

          <Column>
            <ColumnTitle>Quick Access</ColumnTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/venues">All Venues</FooterLink>
            <FooterLink to="/profile">My Profile</FooterLink>
          </Column>

          <Column>
            <ColumnTitle>Manager</ColumnTitle>
            <FooterLink to="/manager">Manager Dashboard</FooterLink>
            <FooterLink to="/register">Become a host</FooterLink>
          </Column>

          <Column>
            <ColumnTitle>Support</ColumnTitle>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
          </Column>
        </Top>

        <Bottom>
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </Bottom>
      </Container>
    </Wrapper>
  );
}