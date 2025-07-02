import UserContext from "../../Context/UserContext";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Alert from "../Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const login = await userLogin(email, password);
    // success comes from api call backend/server
    if (login.success) {
      setAlert({ color: "success", message: login?.message });
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setAlert(null);
        navigate("/");
      }, 1500);
    } else {
      setAlert({ color: "danger", message: login?.message || "Login failed!" });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
      >
        {/* Alert */}
        {alert && (
          <Alert
            color={alert.color}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            Email
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            Password
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute mt-6 inset-y-0 right-2 flex items-center text-gray-500 hover:text-red-500 focus:outline-none"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>

        {/* Sign In Button with Spinner */}
        <div className="relative">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {loading && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {/* Don't have an account? */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
