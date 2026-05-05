import { useState } from "react";
import styled from "styled-components";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import AuthCard from "../components/ui/AuthCard";
import FormMessage from "../components/ui/FormMessage";
import { registerUser, loginUser, createApiKey } from "../api/auth";
import { useNavigate } from "react-router-dom";

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

function validateRegisterForm(values) {
  const errors = {};

  if (!values.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@stud\.noroff\.no$/i.test(values.email)) {
    errors.email = "Email must be a valid stud.noroff.no address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    venueManager: false,
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    setFormError("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        name: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        venueManager: formData.venueManager,
      });

      const loginData = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      const apiKey = await createApiKey(loginData.data.accessToken);

      localStorage.setItem("token", loginData.data.accessToken);
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("user", JSON.stringify(loginData.data));

      setSuccessMessage("Account created successfully.");

      navigate(formData.venueManager ? "/manager" : "/profile");
    } catch (error) {
      setFormError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <Form onSubmit={handleSubmit} noValidate>
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="ExampleUser"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="you.email@stud.noroff.no"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password (min 8 characters)"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <CheckboxGroup>
              <CheckboxLabel htmlFor="venueManager">
                <Checkbox
                  id="venueManager"
                  name="venueManager"
                  type="checkbox"
                  checked={formData.venueManager}
                  onChange={handleChange}
                />
                Register as venue manager
              </CheckboxLabel>

              {formData.venueManager && (
                <InfoBox>
                  A venue manager account is used for managing and adding venues.
                  If you only want to book venues, leave this box unchecked.
                </InfoBox>
              )}
            </CheckboxGroup>

            <FormMessage variant="error">{formError}</FormMessage>
            <FormMessage variant="success">{successMessage}</FormMessage>

            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </PrimaryButton>
          </Form>
        </AuthCard>
      </ContentWrapper>
    </PageWrapper>
  );
}