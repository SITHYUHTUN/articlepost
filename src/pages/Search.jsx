import { 
    Alert ,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchSearch } from '../libs/fetcher';
import FollowButton from '../components/FollowButton';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

export default function Search(){
    const navigate = useNavigate();
    const [query,setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { isLoading, isError, data, error} = useQuery(["search", debouncedQuery], () => {return fetchSearch(debouncedQuery);})
    if(isError){
        return <Alert severity='warning'>{ error.message}</Alert>
    }
    
    return (
        <Box>
            <TextField
            fullWidth= {true}
            variant = "outlined"
            placeholder = "Search fro users"
            onKeyUp={
                e => {
                    setQuery(e.target.value);
                }
            }
            />
            {isLoading ? (
                <Box sx={{textAlign: "center",mt: 4}}>
                    Loading...
                </Box>
            ): (
                <List>
                    {data.map(user => {
                        return (
                            <ListItem key= {user.id}>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(`/profile/${user.id}`);
                                    }}
                                    >
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} secondary={user.bio}/>
                                    <ListItemSecondaryAction>
                                        <FollowButton user={user}/>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </ListItem>
                        )

                    })}
                </List>
            )}
        </Box>
    )
}