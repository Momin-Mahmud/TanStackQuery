import { useParams } from "react-router-dom";
import { getPost, getPostAuthor } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "../../common/CustomToast";
import Spinner from "../../common/Spinner";

const FullPost = () => {
  const { id } = useParams();
  const postData = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  postData.isError && errorToast(postData.error.message);
  const getAuthor = useQuery({
    queryKey: ["author", postData?.data?.data?.authorId],
    enabled: !!postData?.data?.data?.authorId,
    queryFn: () => getPostAuthor(id),
  });
  getAuthor.isError && errorToast(getAuthor.error.message);

  return (
    <>
      {postData.isLoading ? (
        <Spinner />
      ) : ( 
        <div>
          <h1>{postData?.data?.data?.title}</h1>
          {getAuthor?.isLoading ? (
            <h1>Loading....</h1>
          ) : (
            <p style={{ fontWeight: "bold" }}>
              Written by: {getAuthor?.data?.data?.name}
            </p>
          )}
          <hr />
          <div style={{ textAlign: "left" }} dangerouslySetInnerHTML={{ __html: postData?.data?.data?.description }}></div>
        </div>
      )}
    </>
  );
};

export default FullPost;
