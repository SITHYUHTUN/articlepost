import {Box, Container, Snackbar} from "@mui/material";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";
import {useApp} from "./ThemedApp";
import { Outlet } from "react-router-dom";
const Template = () => {
    const {  setGlobalMsg ,globalMsg } = useApp();
    return (
        <>
            <Header />
            <AppDrawer />
            
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Outlet />
                </Box>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={!!globalMsg}
                autoHideDuration={6000}
                onClose={() => setGlobalMsg(null)}
                message={globalMsg?.msg}
                severity={globalMsg?.severity}
                />
        </>
    );
}
export default Template;