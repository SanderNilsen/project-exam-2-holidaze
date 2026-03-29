import styled from "styled-components";

const Button = styled.button`
  height: 44px;
  margin-top: 8px;
  border: 0;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover);
  }
`;

export default function PrimaryButton({ children, type = "button", ...props }) {
  return (
    <Button type={type} {...props}>
      {children}
    </Button>
  );
}