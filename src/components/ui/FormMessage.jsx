import styled from "styled-components";

const Box = styled.div`
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;

  ${({ variant }) =>
    variant === "error" &&
    `
    border: 1px solid #fecaca;
    background: #fef2f2;
    color: #b91c1c;
  `}

  ${({ variant }) =>
    variant === "success" &&
    `
    border: 1px solid #bbf7d0;
    background: #f0fdf4;
    color: #166534;
  `}
`;

export default function FormMessage({ children, variant = "error" }) {
  if (!children) return null;
  return <Box variant={variant}>{children}</Box>;
}