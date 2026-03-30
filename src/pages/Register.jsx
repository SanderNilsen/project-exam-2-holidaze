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
  gap: 18px;
`;

const CheckboxGroup = styled.div`
  display: grid;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text);
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin: 0;
`;

const InfoBox = styled.div`
  padding: 14px 16px;
  border: 1px solid #60a5fa;
  border-radius: 8px;
  background: #eff6ff;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
`;

export default function Register() {
  return (
    <PageWrapper>
      <Hero />

      <ContentWrapper>
        <AuthCard
          title="Create account"
          footerText="Have an account?"
          footerLinkText="Login here"
          footerLinkTo="/login"
        >
          <Form>
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="ExampleUser"
            />

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
              placeholder="Password (min 8 characters)"
            />

            <CheckboxGroup>
              <CheckboxLabel htmlFor="venueManager">
                <Checkbox
                  id="venueManager"
                  name="venueManager"
                  type="checkbox"
                />
                Register as venue manager
              </CheckboxLabel>

              <InfoBox>
                A venue manager account is used for managing and adding venues.
                If you only want to book venues un-check this box.
              </InfoBox>
            </CheckboxGroup>

            <PrimaryButton type="submit">
              Create account
            </PrimaryButton>
          </Form>
        </AuthCard>
      </ContentWrapper>
    </PageWrapper>
  );
}