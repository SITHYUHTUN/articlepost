import React, { useState, useEffect } from "react";
import { Alert, Box ,Button,Typography} from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";
import { queryClient, useApp } from "../ThemedApp";
import { useQuery, useMutation } from "react-query";
import {
    postPost,
    deletePost,
    fetchPosts,
    fetchFollowingPosts
} from "../libs/fetcher";
const api = import.meta.env.VITE_API
const Home = () => {
    const [showLatest, setShowLatest] = useState(true)
    const { showForm, setGlobalMsg, setShowForm, auth } = useApp();
    const { isLoading, isError, error, data } = useQuery(["posts", showLatest], () => {
        if (showLatest) return fetchPosts();
        else return fetchFollowingPosts();
    });


    const remove = useMutation(
        async (id) => deletePost(id),
        {
            onMutate: async (id) => {
                await queryClient.cancelQueries("posts");
                await queryClient.setQueryData(["posts", showLatest], (old) => {
                    return old.filter((item) => item.id !== id);

                })
                setGlobalMsg({ msg: "Item removed", severity: "success" });
            }
        }
    )

    const add = useMutation(content => postPost(content), {
        onSuccess: async post => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData(["posts", showLatest], old => [post, ...old]);
            setGlobalMsg({ msg: "Post created", severity: "success" });

        },
    });
    if (isError) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error.message}
                </Alert>
            </Box>
        )
    }
    if (isLoading) {
        return (
            <Box sx={{ mt: 4, mb: 4 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    Loading data...</Alert>
            </Box>
        )
    }
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            {showForm && auth && (
                <Form add={add} onClose={() => setShowForm(false)} />
            )}

            {
                auth && (
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                    }} 
                    >
                        <Button
                        disabled={showLatest}
                        onClick={() => {
                            setShowLatest(true);
                        }}
                        >
                            Latest
                        </Button>
                        <Typography sx={{color: "text.fade",fontSize: 15}}> | </Typography>
                        <Button
                        disabled={!showLatest}
                        onClick={() => {
                            setShowLatest(false);
                        }}
                        >
                            Following
                        </Button>

                    </Box>
                )
            }

            {data.map((item) => {
                return (
                    <Item
                        key={item.id}
                        item={item}
                        remove={remove.mutate} />
                )
            })}
        </Box>
    )
};

export default Home;