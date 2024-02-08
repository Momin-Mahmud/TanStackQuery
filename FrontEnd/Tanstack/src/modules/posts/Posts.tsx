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
              display: "flex",
              width: "full",
              height: "50px",
              borderRadius: "10px",
              border: "1px solid black",
              cursor: "pointer",
              backgroundColor: "grey",
              color: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Create a Post
          </span>
          <h1>Posts</h1>
          <div>
            {postData?.data?.data?.map((post: any) => (
              <div key={post.id}>
                <h2>{post.title || "No Title"}</h2>
                <p>{post.description}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
