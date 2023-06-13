import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function NavBar() {
    const { isAuthenticated } = useAuth0();

    return (
        <nav className="bg-primary rounded-b shadow-lg mb-4">
            <div className="navbar justify-center">
                <div className={"navbar-center lg:flex"}>
                    <ul className={"menu menu-horizontal"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/match">Match</Link>
                                </li>
                                <li>
                                    <Link to="/messagehistory">Message History</Link>
                                </li>
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/create">Create Account</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
