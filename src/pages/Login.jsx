import styled from "styled-components";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import AuthCard from "../components/ui/AuthCard";

const PageWrapper = styled.section`
  background: var(--background-light);
`;

const Hero = styled.div`
  height: 320px;
  background: url("/images/login-hero.jpg") center/cover no-repeat;
`;

const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 40px 16px 80px;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

export default function Login() {
  return (
    <PageWrapper>
      <Hero />

      <ContentWrapper>
        <AuthCard
          title="Login"
          footerText="Doesn’t have an account?"
          footerLinkText="Register here"
          footerLinkTo="/register"
        >
          <Form>
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="you.email@stud.noroff.no"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
            />

            <PrimaryButton type="submit">Login</PrimaryButton>
          </Form>
        </AuthCard>
      </ContentWrapper>
    </PageWrapper>
  );
}