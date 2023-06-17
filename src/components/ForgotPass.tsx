import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform API integration here to send the password reset email
    // You can access the entered email using the `email` state variable

    setIsEmailSent(true);
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-8 p-4 bg-transparent shadow">
        {isEmailSent ? (
          <p className="text-green-500 text-center">
            Password reset email sent!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
