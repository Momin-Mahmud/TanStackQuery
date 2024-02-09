import { useParams } from "react-router-dom";
import { getPost, getPostAuthor } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";

const FullPost = () => {

    const { id } = useParams();
    const postData = useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPost(id),
    })

    console.log(postData?.data?.data?.authorId)

    const getAuthor = useQuery({
        queryKey: ["author", postData?.data?.data?.authorId],
        enabled: !!postData?.data?.data?.authorId,
        queryFn: () => getPostAuthor(id),
        
    });
    console.log("Get Author", getAuthor.data)

    return (
        <div>
            <h1>{postData?.data?.data?.title}</h1>
            {getAuthor?.isLoading ? <h1>Loading....</h1> : <p style={{ fontWeight: "bold" }}>Written by: {getAuthor?.data?.data?.name}</p>} 
            <hr />
            <p>{postData?.data?.data?.description}</p>
        </div>
    );
}

export default FullPost