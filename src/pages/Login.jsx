import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import PrimaryButton from "../components/ui/PrimaryButton";
import AuthCard from "../components/ui/AuthCard";
import FormMessage from "../components/ui/FormMessage";
import { loginUser } from "../api/auth";

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

function validateLoginForm(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@stud\.noroff\.no$/i.test(values.email)) {
    errors.email = "Email must be a valid stud.noroff.no address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    setFormError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));

      navigate("/");
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
          title="Login"
          footerText="Doesn’t have an account?"
          footerLinkText="Register here"
          footerLinkTo="/register"
        >
          <Form onSubmit={handleSubmit} noValidate>
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
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <FormMessage variant="error">{formError}</FormMessage>

            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </PrimaryButton>
          </Form>
        </AuthCard>
      </ContentWrapper>
    </PageWrapper>
  );
}