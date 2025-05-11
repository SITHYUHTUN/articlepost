import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

import { postUser } from "../libs/fetcher";

import { useRef, useState } from "react";
import { useMutation } from "react-query";


const Register = () => {
    const { setGlobalMsg } = useApp();

    const nameInput = useRef(null);
    const usernameInput = useRef(null);
    const bioInput = useRef(null);
    const passwordInput = useRef(null);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = () => {

        const name = nameInput.current.value;
        const username = usernameInput.current.value;
        const bio = bioInput.current.value;
        const password = passwordInput.current.value;

        if (!name || !username || !password) {
            setError("Please fill in all fields");
            return;
        }

        create.mutate({ name, username, bio, password });

    }

    const create = useMutation(async data => postUser(data), {
        onError: (error) => {
            setError("cannot create user, please try again later");
        },
        onSuccess: async user => {
            setGlobalMsg({ msg: "User created successfully", severity: "success" });
            navigate("/login");

        }
    })

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Register</Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
                Please enter your details to register.</Alert>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth margin="normal"
                inputRef={nameInput}
            />
            <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth margin="normal"
            inputRef={usernameInput}
             />
            <TextField placeholder="Bio" 
            variant="outlined" 
            fullWidth margin="normal" 
            multiline rows={4} 
            inputRef={bioInput}
            helperText="Optional"
            />

            <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth margin="normal"
            inputRef={passwordInput}
             />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
        </Box>
    )
}
export default Register;