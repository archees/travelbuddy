import LoginButton from "./LoginButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/TravelPlans');
        }
    }, [isAuthenticated, navigate]);
    return (
        <div>
            <LoginButton text={"Log In"}/>
        </div>
    );
}
