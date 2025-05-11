
import { useParams } from "react-router-dom";
import UserList from "../components/UserList";
import { Alert, Box } from "@mui/material";
import { fetchCommentLikes,fetchPostLikes } from "../libs/fetcher";
import { useQuery } from "react-query";

const Likes = () => {
    const {id , type} =useParams();
    const {isLoading, isError, error, data} = useQuery(
        ["users", id , type],() => {
            if(type == "comment"){
                return fetchCommentLikes(id)
            }else{
                return fetchPostLikes(id);
            }
        }
    )
    if(isError){
        return(
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }
    if(isLoading){
        return(
            <Box sx={{textAlign:"center"}}>Loading</Box>
        )
    }


    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <UserList title="Likes" data={data} />
        </Box>
    );  
}
export default Likes;
