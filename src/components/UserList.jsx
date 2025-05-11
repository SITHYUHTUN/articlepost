import {Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, ListItemAvatar, Avatar,listItemSecondaryActionClasses, ListItemSecondaryAction} from "@mui/material";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
const UserList = ({title,data}) => {
    const navigator = useNavigate();
    console.log(data)
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 ,textAlign:'center'}} >
                {title}
            </Typography>
            <List>
                {data.map(item => {
                    return (
                        <ListItem key={item.id}>
                            <ListItemButton
                                onClick={e => {
                                    navigator(`/profile/${item.user.id}`);
                        
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.user.name}
                                    secondary={item.user.bio}
                                 />
                                 <ListItemSecondaryAction>
                                    <FollowButton user={item.user} />
                                 </ListItemSecondaryAction>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}
export default UserList;