import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 1000;
  overflow-y: auto;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 480px;
  background: var(--background);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
`;

const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

const TextGroup = styled.div`
  display: grid;
  gap: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: var(--text);
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;

export default function EditModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <Header>
          <TextGroup>
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </TextGroup>

          <CloseButton type="button" onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        </Header>

        {children}
      </Modal>
    </Overlay>
  );
}