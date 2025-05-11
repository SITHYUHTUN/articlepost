import { Box, Button, TextField, Alert } from "@mui/material";

import Item from "../components/Item";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { useApp } from "../ThemedApp";
import { deletePost} from "../libs/fetcher";
import { fetchComments } from "../libs/fetcher";
import { postComment } from "../libs/fetcher";
import { deleteComment } from "../libs/fetcher";
import { useRef } from "react";

const api = import.meta.env.VITE_API;

export default function Comments() {
	const contentInput = useRef();
	const { id } = useParams();
	const navigate = useNavigate();

	const { setGlobalMsg } = useApp();

	const { isLoading, isError, error, data } = useQuery(
		"comments",
		async () => 
			fetchComments(id),
		
	);
	
	const removePost = useMutation(async id => deletePost(id),{
		onSuccess: async () => {
			await queryClient.cancelQueries("posts");
			navigate("/");
			setGlobalMsg({ msg: "Post deleted", severity: "success" });

		}
	}
	

	
		
	);

	const removeComment = useMutation(
		async id => deleteComment(id),
		{
			onMutate: id => {
				queryClient.cancelQueries("comments");
				queryClient.setQueryData("comments", old => {
					old.comments = old.comments.filter(
						comment => comment.id !== id
					);
					return { ...old };
				});
				setGlobalMsg("A comment deleted");
			},
		}
	);

	const addComment = useMutation(
		content => postComment(content,id),{
			onSuccess: async comment => {
				await queryClient.cancelQueries("comments");

				await queryClient.setQueryData("comments", old => {
					old.comments = [...old.comments,comment];
					return {...old };
				})
				
				setGlobalMsg({ msg: "Comment added", severity: "success" });
			}

		}
	)

	if (isError) {
		return (
			<Box>
				<Alert severity="warning">{error.message}</Alert>
			</Box>
		);
	}

	if (isLoading) {
		return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
	}

	return (
		<Box>
			<Item
				primary
				item={data}
				remove={removePost.mutate}
			/>
			{data.comments.map(comment => {

                console.log({commet: comment})
				return (
					<Item
					    comment
						key={comment.id}
						item={comment}
						remove={removeComment.mutate}
					/>
				);
			})}

			<form
			 onSubmit={ e => {
				e.preventDefault();
				const content = contentInput.current.value;
				if (!content) {
					return;
				}
				addComment.mutate(content);
				e.currentTarget.reset();
			 }}
		 
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						mt: 3,
					}}>
					<TextField
						multiline
						placeholder="Your Comment"
						inputRef={contentInput}
					/>
					<Button
						type="submit"
						variant="contained">
						Reply
					</Button>
				</Box>
			</form>
		</Box>
	);
}