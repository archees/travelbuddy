/*import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;*/
import {UserInfoContext} from "@/Services/Auth.tsx";

const LoginButton = (props: {text: string}) => {
    const user = UserInfoContext();
    return <button onClick={user?.handleLogin}>{props.text}</button>;
};

export default LoginButton;
