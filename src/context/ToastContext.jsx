import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const ToastContext = createContext(null);

const ToastWrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2000;
  display: grid;
  gap: 10px;
`;

const ToastMessage = styled.div`
  min-width: 260px;
  max-width: 360px;
  padding: 14px 16px;
  border-radius: 12px;
  background: ${({ $type }) =>
    $type === "error" ? "#ef4444" : "var(--primary)"};
  color: #ffffff;
  font-size: 14px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = "success") {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastWrapper>
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} $type={toast.type}>
            {toast.message}
          </ToastMessage>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}