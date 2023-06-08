import { useState } from "react";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import reactLogo from "@images/react.svg";
import viteLogo from "/vite.svg";
import "@css/App.css";
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from "@/Components/LoginButton.tsx";
import LogoutButton from "@/Components/LogoutButton.tsx";
const domain = import.meta.env.AUTH_DOMAIN;
const clientId = import.meta.env.AUTH_CLIENT_ID;
// This is our first React "Component"
export function App() {
	return (
		<BrowserRouter>
			<Auth0Provider
				domain={domain}
				clientId={clientId}
				authorizationParams={{
					redirect_uri: window.location.origin
				}}
			>
				<div>
					<h1>Welcome to My App</h1>
					<LoginButton />
					<LogoutButton />
				</div>
			</Auth0Provider>
		</BrowserRouter>
	);
}

export default App;
