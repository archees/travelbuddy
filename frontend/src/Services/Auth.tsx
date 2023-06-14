
import {createContext, useContext, useEffect, useState} from "react";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import {DecodedToken, User, UserId} from "@/TBtypes.tsx";


export const AuthContext = createContext<AuthContextProps | null>(null);

export type AuthContextProps = {
    userId: number;
    name: string;
    email: string;
    handleLogin: () => void;
    handleLogout: () => void;
};

export const AuthProvider = ({ children }) => {
    const { loginWithRedirect, logout,  user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const[userExists, setuserExists ]=useState(false);

    useEffect(() => {

        const handleUserData = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                await updateAxios(accessToken);
                const user: User = await UserInfo(accessToken);
                const {exists, id} = await checkUser(user.email);
                setuserExists(exists);
                if(exists) {
                    setEmail(user.email);
                    setName(user.name);
                    setUserId(id);
                }else{
                    createUser(user.name, user.email)
                        .then(() => checkUser(user.email))
                        .then((response) => console.log(response));
                }
                console.log("User Valid:", exists);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        if (isAuthenticated) {
            handleUserData().then();
        }
    }, [isAuthenticated, getAccessTokenSilently, user, loginWithRedirect]);

    const handleLogin = async () => {
        await loginWithRedirect();
        try {
            const token = await getAccessTokenSilently();
            await updateAxios(token).then(() => console.log("update axios initiated"));
        } catch (error) {
            console.error("No Token found", error);
        }
    };
    const handleLogout = async () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        setEmail('');
        setName('');
        setUserId(null);

    };
    return (
        <AuthContext.Provider
            value={{
                email,
                name,
                userId,
                handleLogin,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserInfoContext = () => {
    return useContext(AuthContext);
};
// eslint-disable-next-line react-refresh/only-export-components
export async function checkUser(email): Promise<UserId> {
    const payload = await httpClient.post("/login", { email });
    return payload.data;
}
// eslint-disable-next-line react-refresh/only-export-components
export async function createUser(name: string, email: string) {
    try{
        const loginResult = await httpClient.post("/users", { name: name, email: email });
        return loginResult.data;
    } catch (e) {
        console.error(e);
        return false;
    }

}

export async function updateAxios(token: string) {
    httpClient.interceptors.request.use(
        async (config) => {
            // @ts-ignore
            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            };
            console.log("successful sending data to backend");
            return config;
        },
        (error) => {
            console.error("REJECTED TOKEN PROMISE");
            Promise.reject(error);
        }
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export async function UserInfo(accessToken: string) {
    const decodedToken: DecodedToken = jwtDecode(accessToken);
    const {
        "https://www.myapi.com/email": email,"https://www.myapi.com/nickname": name} = decodedToken;
    return { email, name  };
}

