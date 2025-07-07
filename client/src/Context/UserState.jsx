import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
const UserState = (props) => {
  const loginUrl = "http://localhost:1000";

  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAthenticated] = useState(false);

  const [userProfile, setUserProfile] = useState("");
  const [user, setUser] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAthenticated(true);
  
    }
  }, []); // runs once on mount: loads token

  useEffect(() => {
    if (!token) return; // skip fetch if token not loaded yet
    const fetchUserProfile = async () => {
      try {
        const api = await axios.get(`${loginUrl}/api/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setUserProfile(api.data.userProfile);
         setUser(api.data.userProfile);    

      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserProfile();
  }, [token]);

  // for signup
  const registerUser = async (email, name, password) => {
    try {
      const response = await axios.post(
        `${loginUrl}/api/user/register`,
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
      return { success: true, message: data.message, data };
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
        `${loginUrl}/api/user/login`,
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
        setToken(data.token);
        setIsAthenticated(true);
        return { success: true, message: data.message, data };
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
    <UserContext.Provider
      value={{
        registerUser,
        userLogin,
        token,
        isAuthenticated,
        loginUrl,
        setToken,
        setIsAthenticated,
        userProfile,
        user
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
