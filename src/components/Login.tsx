import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth.js";

const Login = () => {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        setLoginMessage("Login successful!");
        auth.login(email);
        navigate("/form");
        // Redirect to the next page or perform any necessary actions
      } else {
        setLoginMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mx-auto flex flex-col w-[60%]">
      <h1 className="text-2xl font-bold">Login</h1>
      <br />
      <form onSubmit={handleSubmit} className="mt-8 ">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered input-secondary w-full max-w-xs"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary mt-4 w-full  max-w-xs"
        >
          Login
        </button>
        {loginMessage && <p className="mt-4 text-red-500">{loginMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
