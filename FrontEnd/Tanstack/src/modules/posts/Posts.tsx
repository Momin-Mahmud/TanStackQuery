import { useNavigate } from "react-router-dom";
import { getPosts } from "../../api/post.api";
import Spinner from "../../common/Spinner";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  const navigate = useNavigate();
  const postData: any = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <>
      {postData?.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <span
            onClick={() => {
              navigate("/posts/create");
            }}
            style={{
              fontWeight: "bold",
              display: "flex",
              width: "full",
              height: "50px",
              borderRadius: "10px",
              border: "1px solid black",
              cursor: "pointer",
              backgroundColor: "#CF1D2D",
              color: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
           +  Create a Post
          </span>
          <h1>Posts</h1>
          <div>
            {postData?.data?.data?.map((post: any) => (
              <div style={{ display: "flex", flexDirection: "column", border: "2px solid #CF1D2D", margin: "20px", borderRadius: "10px", padding: "10px", gap: "10px" }} key={post.id}>
                <span  style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:"20px"}}>
                <h2>{post.title || "No Title"}</h2>
                <span style={{ cursor: "pointer", color: "blue", textDecoration : "underline" }} onClick={() => navigate(`/posts/${post.id}`)}>See full Post &#8594;</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
