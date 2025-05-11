import React, { useEffect } from "react";
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useMemo } from "react";
import { deepPurple } from "@mui/material/colors";
import { fetchUser, fetchVerify } from "./libs/fetcher";
import { QueryClient, QueryClientProvider } from "react-query"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import Likes from "./pages/Likes";
import Search from "./pages/Search";
import Notis from "./pages/Notis";
import AppSocket from "./AppSocket";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Template />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/notis",
				element: <Notis />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "comments/:id",
				element: <Comment />,
			},
			{
				path: "/search",
				element: <Search />,
			},
			{
				path: "profile/:id",
				element: <Profile />,
			},
			{
				path: "/likes/:id/:type",
				element: <Likes />,
			}
		]
	}
])

export const queryClient = new QueryClient();

const AppContext = createContext();
export function useApp() {
	return useContext(AppContext);
}

const ThemedApp = () => {
	const [showDrawer, setShowDrawer] = useState(false);
	const [auth, setAuth] = useState(null);
	const [globalMsg, setGlobalMsg] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [mode, setMode] = useState("dark");

	useEffect(() => {
		fetchVerify().then(user=>{
			if(user) setAuth(user);
		})
	},[]);


	const theme = useMemo(() => createTheme({
		palette: {
			mode,
			primary: deepPurple,
			banner: mode === "dark" ? "#121212" : "#ffffff",
			text: {
				primary: mode === "dark" ? "#ffffff" : "#000000",
				secondary: mode === "dark" ? "#ffffff" : "#000000",
			},

		},
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider
				value={{
					showForm,
					setShowForm,
					mode,
					setMode,
					showDrawer,
					setShowDrawer,
					globalMsg,
					setGlobalMsg,
					auth,
					setAuth
				}}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<AppSocket />
					
				</QueryClientProvider>
				<CssBaseline />


			</AppContext.Provider>
		</ThemeProvider>
	);
};

export default ThemedApp;
