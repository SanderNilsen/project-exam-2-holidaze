import styled, { css } from "styled-components";

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
`;

const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--text);
  font-size: 14px;

  &::placeholder {
    color: var(--text-placeholder);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  }

  ${({ $error }) =>
    $error &&
    css`
      border-color: #dc2626;

      &:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
      }
    `}
`;

const ErrorText = styled.p`
  margin: 2px 0 0;
  font-size: 12px;
  color: #dc2626;
`;

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        $error={error}
        aria-invalid={!!error}
        {...props}
      />

      {error && <ErrorText>{error}</ErrorText>}
    </Field>
  );
}