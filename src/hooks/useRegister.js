import { useState } from "react";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(formData);
    try {
      const response = await fetch("http://localhost:3003/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSuccess(true);
      console.log("User registered successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

export default useRegister;
