import React from "react";
import { useApp } from "../ThemedApp";
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge
} from "@mui/material";
import {
	Menu as MenuIcon,
	Add as AddIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	Notifications as NotiIcon

} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";

import { useNavigate } from "react-router-dom";
import { fetchNotis } from "../libs/fetcher";
const Header = () => {
	const navigate = useNavigate();
	
	const { showForm, setShowForm, mode, setMode, showDrawer,setShowDrawer,auth} = useApp();
	function notisCount() {
		if(!auth) return 0;
		if(isLoading || isError) return 0
		return data.filter(noti => !noti.read).length;
	}
	const {isLoading, data, error, isError} = useQuery(["notis",auth],fetchNotis);
	return (
		<Box sx={{ width: "100%" }}>
			<AppBar
				position="static"
				sx={{ width: "100%", backgroundColor: "primary.main" }}
			>
				<Toolbar>
					{/* Right icons */}
					<IconButton edge="start" color="inherit" aria-label="menu"
						onClick={() => setShowDrawer(!showDrawer)}
						sx={{ mr: 2 }}	>
						<MenuIcon />
					</IconButton>

					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, textAlign: "center" }}
					>
						My MUI App
					</Typography>

					{/* Left icons */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton
							color="inherit" aria-label="add"
							
							onClick={() => 
							{
								navigate("/");
								setShowForm(!showForm)
								
							}
							}
						>
							<AddIcon />
						</IconButton>
						<IconButton color="inherit"
						onClick={() => navigate("/search")}
						 >
							<SearchIcon />
						</IconButton>
						{
							auth && (
								<IconButton
									color="inherit"
									onClick={() => navigate("/notis")}
								>
									<Badge
										color="error"
										badgeContent={notisCount()}
									>
										<NotiIcon />
									</Badge>
								</IconButton>
							)
						}
						{
							mode === "dark" ? (
								<IconButton color="inherit" aria-label="light mode"
									onClick={() => setMode("light")}>
									<LightModeIcon />
								</IconButton>
							) : (
								<IconButton color="inherit" aria-label="dark mode"
									onClick={() => setMode("dark")}>
									<DarkModeIcon />
								</IconButton>
							)
						}

					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;