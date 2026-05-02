import styled from "styled-components";

const SecondaryButton = styled.button`
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: var(--background-light);
  }
`;

export default SecondaryButton;