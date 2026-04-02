import styled from "styled-components";

export const MenuList = styled.div`
  display: grid;
  gap: 8px;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 12px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: rgba(29, 78, 216, 0.08);
  }
`;

export const ActiveMenuItem = styled(MenuItem)`
  background: rgba(29, 78, 216, 0.08);
  color: var(--primary);
`;

export const StatsList = styled.div`
  display: grid;
  gap: 18px;
`;

export const StatItem = styled.div`
  display: grid;
  gap: 4px;
`;

export const StatLabel = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
`;

export const StatValue = styled.p`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
`;