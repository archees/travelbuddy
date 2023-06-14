import { useState } from "react";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import reactLogo from "@images/react.svg";
import viteLogo from "/vite.svg";
import "@css/App.css";
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
import Profile from "@/Components/Profile.tsx";
import {AuthProvider} from "@/Services/Auth.tsx";
import {TBRouter} from "@/TBRouter.tsx";  // Assuming Profile is in the same directory as your other components
const domain = import.meta.env.AUTH_DOMAIN;
const clientid = import.meta.env.AUTH_CLIENT_ID;
const audience = import.meta.env.AUTH_AUDIENCE;
const scope = import.meta.env.AUTH_SCOPE;
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
}
// This is our first React "Component"
export function App() {
	return (
		<BrowserRouter>
			<Auth0Provider
				domain={domain}
				clientId={clientid}
				authorizationParams={{
					redirect_uri: window.location.origin,
					audience: audience,
					scope: scope,
				}}
			>
				<AuthProvider>
					<ChakraProvider>
						<div className="App">
							<TBRouter />
						</div>
					</ChakraProvider>
				</AuthProvider>
			</Auth0Provider>
		</BrowserRouter>
	);
}

export default App;
