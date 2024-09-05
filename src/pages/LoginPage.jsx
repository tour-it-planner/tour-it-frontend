import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

const API_URL = "http://localhost:5005";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        authService.login(requestBody)
            .then((response) => {
                console.log('JWT token', response.data.authToken);

                storeToken(response.data.authToken);

                authenticateUser();

                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <p>Login</p>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>

            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Would you like to create an account?</p>
            <Link to={"/signup"}>Sign Up!</Link>
        </div>

    )

}

export default LoginPage;