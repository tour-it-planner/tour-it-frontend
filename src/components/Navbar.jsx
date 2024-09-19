import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";


function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    return (
        <nav>
            <div className="nav-links">
                <Link to="/">
                    <img src="/images/logo-tour-it.png" alt="Logo" className="logo" />
                </Link>

                {isLoggedIn && (
                    <>
                        <Link to="/itineraries">
                            <button>Itineraries</button>
                        </Link>
                        <Link to="/destinations">
                            <button>Destinations</button>
                        </Link>

                    </>
                )}
            </div>
            {isLoggedIn ? (
                <div className="user-options"> 
                <div className="logout">
                    <button onClick={logOutUser}>Logout</button>
                    
                </div>
                <div>
                <span className="username">{user && user.name}</span>
                </div>
                </div>
            ) : (
                <div>
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;