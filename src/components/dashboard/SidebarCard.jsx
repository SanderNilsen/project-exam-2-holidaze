import styled from "styled-components";

const Card = styled.section`
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 22px;
`;

const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
`;

export default function SidebarCard({ title, children }) {
  return (
    <Card>
      <Title>{title}</Title>
      {children}
    </Card>
  );
}