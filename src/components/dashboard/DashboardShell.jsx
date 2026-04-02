import styled from "styled-components";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 16px 80px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 24px;
`;

const Main = styled.main`
  display: grid;
  gap: 32px;
`;

export default function DashboardShell({ sidebar, children }) {
  return (
    <PageWrapper>
      <Content>
        <Sidebar>{sidebar}</Sidebar>
        <Main>{children}</Main>
      </Content>
    </PageWrapper>
  );
}