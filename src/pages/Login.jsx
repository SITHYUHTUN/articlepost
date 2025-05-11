import { Alert, Box, Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";
import { useRef, useState } from "react";

const Login = () => {

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    const [error, setError] = useState(null);

    const { setGlobalMsg ,setAuth} = useApp();
    const navigate = useNavigate();


    const handleSubmit = () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        if (!username || !password) {
            setError("Please fill in all fields");
            return false;
        }

        login.mutate({ username, password });

    }
    const login = useMutation(async ({username,password}) => postLogin(username,password), {
        onError: (error) => {
            setError("Invalid username or password");
        },
        onSuccess: async result => {
            setAuth(result.user);
            setGlobalMsg({ msg: "Login successful", severity: "success" });
            navigate("/");
            localStorage.setItem("token", result.token);

        }
    })

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            {
                error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> 
            }
            <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth margin="normal" 
            inputRef={usernameInput}
            />
            <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            inputRef={passwordInput}
             />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
        </Box>
    )
}
export default Login;
// Compare this snippet from src/components/Header.jsx: