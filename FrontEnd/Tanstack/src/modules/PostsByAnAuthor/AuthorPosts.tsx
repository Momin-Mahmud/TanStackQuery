import { useLocation } from "react-router-dom";
import { getAuthorPosts } from "../../api/author.api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";

const AuthorPosts = () => {
  const state = useLocation().state;
  const postsData = useQuery({
    queryKey: ["authors", state, "posts"],
    queryFn: () => getAuthorPosts(state),
  });

  return (
    <>
      {postsData?.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Posts</h1>
          <p>
            {postsData?.data?.data?.map((post: any) => (
              <div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <hr />
              </div>
            ))}
          </p>
        </div>
      )}
    </>
  );
};

export default AuthorPosts;
