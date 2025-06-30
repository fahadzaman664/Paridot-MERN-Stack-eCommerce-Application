import { useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
const UserState = (props) => {
  const url = "http://localhost:1000";

  // for signup
  const registerUser = async (email, name, password) => {
    try {
      const response = await axios.post(
        `${url}/api/user/register`,
        {
          email,
          name,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      return { success: true, data };
      
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed.",
      };
    }
  };

  // for login
  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        return { success: true, data };
      } else {
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed.",
      };
    }
  };

  return (
    <UserContext.Provider value={{ registerUser, userLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
