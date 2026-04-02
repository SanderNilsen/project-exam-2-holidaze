import styled from "styled-components";

const Section = styled.section`
  display: grid;
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text);
`;

export default function SectionBlock({ title, children }) {
  return (
    <Section>
      <Title>{title}</Title>
      {children}
    </Section>
  );
}