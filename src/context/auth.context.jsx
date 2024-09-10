import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(
                `${import.meta.env.VITE_API_URL}/auth/verify`,
                {
                    headers: { Authorization: `Bearer ${storedToken}` }
                }
            )
            .then((response) => {
                const user = response.data;

                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    // Remove the token from localStorage
    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    // Log out the user
    const logOutUser = () => {
        removeToken();

        setIsLoggedIn(false);
        setUser(null);
        navigate("/login"); // Redirect to the login page after logout
    
    };

    // Authenticate the user on component mount
    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser, // Now accessible properly
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };