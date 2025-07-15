import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../Context/UserContext";
import Alert from "../Alert";
const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, with at least one letter and one number"
      );
      return;
    }

    const result = await registerUser(email, fullName, password);
    if (result.success) {
      setAlert({ color: "success", message: "successfuly registered" });

      setFullName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
      setAlert(null); 
      navigate("/Login");
    }, 2000);
    } else {
      alert(result.message || "Registration failed");
    }

    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
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
          Register
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            Full Name
          </label>
          <input
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="text"
            name="fullname"
            value={fullName}
            placeholder="Enter Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative ">
          <label className="block text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            Password
          </label>
          <input
            className={`mt-1 block w-full px-4 py-2 rounded-md border 
            
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-red-500"
            }focus:outline-none`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            required
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
        <div>{error && <p className="text-red-500 text-sm">{error}</p>}</div>
        {/* Signup Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign Up
          </button>
        </div>
        {/* Already have account */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/Login" className="text-red-500 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
