import styled from "styled-components";

const Text = styled.p`
  margin: -10px 0 0;
  font-size: 12px;
  color: #dc2626;
`;

export default function FieldError({ children }) {
  if (!children) return null;
  return <Text>{children}</Text>;
}