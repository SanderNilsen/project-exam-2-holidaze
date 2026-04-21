import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Wrapper = styled.header`
  border-bottom: 1px solid var(--border);
  background: var(--background);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
`;

const TopBar = styled.div`
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerMenu = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--text);
  font-size: 20px;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: none;
  padding: 0 0 16px;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "grid" : "none")};
    gap: 12px;
  }
`;

const NavItem = styled(NavLink)`
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;

  &.active {
    color: var(--primary);
    font-weight: 600;
  }

  &:hover {
    color: var(--text);
  }
`;

const UserRow = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  color: var(--text-muted);

  &.active {
    color: var(--primary);
    font-weight: 600;
  }

  &:hover {
    color: var(--text);
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #fff;
  background-image: ${({ $src }) => ($src ? `url(${$src})` : "none")};
  background-size: cover;
  background-position: center;
`;

const Username = styled.span`
  font-size: 14px;
  color: inherit;
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

const MobileButtonGroup = styled.div`
  display: grid;
  gap: 12px;
`;

const MobileUserSection = styled.div`
  display: grid;
  gap: 12px;
`;

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    function syncAuthState() {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    }

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("authChanged", syncAuthState);
    window.addEventListener("userUpdated", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("authChanged", syncAuthState);
      window.removeEventListener("userUpdated", syncAuthState);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");
    setMenuOpen(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const profilePath = user?.venueManager ? "/manager" : "/profile";

  return (
    <Wrapper>
      <Container>
        <TopBar>
          <Logo to="/" onClick={closeMenu}>
            Holidaze
          </Logo>

          <DesktopNav>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/venues">All Venues</NavItem>

            {!token ? (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <PrimaryButton onClick={() => navigate("/register")}>
                  Register
                </PrimaryButton>
              </>
            ) : (
              <>
                <UserRow to={profilePath}>
                  <Avatar $src={user?.avatar?.url} />
                  <Username>{user?.name || "User"}</Username>
                </UserRow>

                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </DesktopNav>

          <HamburgerMenu
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </HamburgerMenu>
        </TopBar>

        <MobileNav $open={menuOpen}>
          <NavItem to="/" onClick={closeMenu}>
            Home
          </NavItem>

          <NavItem to="/venues" onClick={closeMenu}>
            All Venues
          </NavItem>

          {!token ? (
            <MobileButtonGroup>
              <Button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/login");
                }}
              >
                Login
              </Button>

              <PrimaryButton
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/register");
                }}
              >
                Register
              </PrimaryButton>
            </MobileButtonGroup>
          ) : (
            <MobileUserSection>
              <UserRow to={profilePath} onClick={closeMenu}>
                <Avatar $src={user?.avatar?.url} />
                <Username>{user?.name || "User"}</Username>
              </UserRow>

              <Button type="button" onClick={handleLogout}>
                Logout
              </Button>
            </MobileUserSection>
          )}
        </MobileNav>
      </Container>
    </Wrapper>
  );
}