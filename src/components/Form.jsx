import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useRef } from "react";

const Form = ({ onClose, add }) => {
    const contentRef = useRef();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const content = contentRef.current.value;
                add.mutate(content);
                
                onClose();
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mb: 4,
                    textAlign: "right",
                    gap: 2,
                }}
            >
                <TextField
                    inputRef={contentRef}
					type="text"
					placeholder="Content"
					fullWidth
					multiline
					sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"

                    sx={{height: "56px"}}
                >
                    Post
                </Button>
            </Box>
        </form>
    );
};

export default Form;