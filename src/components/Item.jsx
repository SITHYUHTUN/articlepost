import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { formatRelative } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
	
	Alarm as TimeIcon,
	AccountCircle as UserIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

export default function Item({ item, remove, primary, comment }) {
	
	const navigate = useNavigate();
	return (

		<Card sx={{ mb: 2 }}>
			{primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
			<CardContent
				onClick={() => {
					if (comment) return false;
					navigate(`/comments/${item.id}`);

				}}
				sx={{ cursor: "pointer" }}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: 1,
						}}>
						<TimeIcon
							fontSize="10"
							color="success"
						/>
						<Typography
							variant="caption"
							sx={{ color: green[500] }}>
							{formatRelative(new Date(item.created), new Date())}
						</Typography>
					</Box>
					<IconButton
						sx={{ color: "text.fade" }}
						size="small"
						onClick={e => {
							remove(item.id)
							e.stopPropagation();
						}}>
						<DeleteIcon
							color="inherit"
							fontSize="inherit"
						/>
					</IconButton>
				</Box>

				<Typography sx={{ my: 3 }}>{item.content}</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 1,
						justifyContent: "space-between",
					}}
					

				>
					<Box 
					    onClick={e => {
							e.stopPropagation();
							navigate(`/profile/${item.user.id}`);
							
						}}
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 1,
						}}
					>
						<UserIcon
							fontSize="12"
							color="info"
						/>
						<Typography variant="caption">
							{item.user.name}

						</Typography>
					</Box>

					<Box>
						<LikeButton item={item} comment={comment} />
						<CommentButton item={item} comment={comment} />
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}