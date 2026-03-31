import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.header`
  height: 70px;
  border-bottom: 1px solid var(--border);
  background: var(--background);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: var(--primary);
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;

  &:hover {
    color: var(--text);
  }
`;

const Button = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  cursor: pointer;

  &:hover {
    background: var(--background-light);
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--primary);
  color: #fff;
  border: none;

  &:hover {
    background: var(--primary-hover);
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--primary);
`;

const Username = styled.span`
  font-size: 14px;
`;

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Wrapper>
      <Container>
        <Logo to="/">Holidaze</Logo>

        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/venues">All Venues</NavLink>

          {!token ? (
            <>
              <Button onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <PrimaryButton onClick={() => navigate("/register")}>
                Register
              </PrimaryButton>
            </>
          ) : (
            <>
              <UserWrapper>
                <Avatar />
                <Username>{user?.name || "User"}</Username>
              </UserWrapper>

              <Button onClick={handleLogout}>Sign Out</Button>
            </>
          )}
        </Nav>
      </Container>
    </Wrapper>
  );
}