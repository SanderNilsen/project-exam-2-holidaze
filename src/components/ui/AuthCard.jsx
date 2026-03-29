import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  width: min(100%, 370px);
  padding: 32px 24px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  margin: 0 0 28px;
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
`;

const FooterText = styled.p`
  margin: 20px 0 0;
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
`;

const FooterLink = styled(Link)`
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function AuthCard({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <Card>
      <Title>{title}</Title>

      {children}

      {(footerText || footerLinkText) && (
        <FooterText>
          {footerText}{" "}
          {footerLinkTo && (
            <FooterLink to={footerLinkTo}>
              {footerLinkText}
            </FooterLink>
          )}
        </FooterText>
      )}
    </Card>
  );
}