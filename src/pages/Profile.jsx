import { Alert, Avatar, Box, Typography, Card, CardContent } from "@mui/material";
import { pink ,green} from "@mui/material/colors";

import { fetchUser } from "../libs/fetcher";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import { Alarm as TimeIcon } from "@mui/icons-material";
import { formatRelative } from "date-fns";


import Item from "../components/Item";

export default function Profile() {
	const { id } = useParams();
	const { isLoading, isError, error, data } = useQuery(
		["users", id],
		() => fetchUser(id),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: false,
		},
		async () => fetchUser(id),

	)
	console.log(data);


	if (isError) return (
		<Box>
			<Alert severity="warning">{error.message}</Alert>
		</Box>
	);
	if (isLoading) return (
		<Box>

			<Alert severity="info">Loading...</Alert>
		</Box>
	)
	return (
		<Box>
			<Box sx={{ bgcolor: "yellow", height: 150, borderRadius: 4 }}></Box>
			<Box
				sx={{
					mb: 4,
					marginTop: "-60px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 1,
				}}>
				<Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
				<Box sx={{ textAlign: "center" }}>
					<Typography>
						{data.name}
					</Typography>
					<Typography sx={{ fontSize: "0.8em", color: "text.fade", mb: 3 }}>
						{data.bio}
					</Typography>
					<FollowButton user={data} />
				</Box>


			</Box>

			{/* Posts */}
			<Box>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Posts
				</Typography>
				{data.posts && data.posts.length > 0 ? (
					<Box>
						{data.posts.map((post) => (
							<Card key={post.id} sx={{ mb: 2 }}>
								<CardContent>
									<Typography variant="body1" sx={{ mb: 1 }}>
										{post.content}
									</Typography>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											gap: 2,

										}}>
										<TimeIcon 
										color="success"
										fontSize="10"
										/>
										<Typography
											variant="caption"
											sx={{ color: green[500] }}
										>
											{new Date(post.created).toLocaleString()}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						))}
					</Box>
				) : (
					<Alert severity="info" sx={{ mb: 2 }}>
						No posts yet.
					</Alert>
				)}

			</Box>
		</Box>
	);
}