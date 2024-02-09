import { useNavigate } from "react-router-dom";
import { getPosts, getPostsPaginated } from "../../api/post.api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { errorToast } from "../../common/CustomToast";
import Spinner from "../../common/Spinner";

const Posts = () => {
  const navigate = useNavigate();
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }: any = useInfiniteQuery<any>({
    queryKey: ["posts", "paginated"],
    queryFn: async ({ pageParam = 1 }) => {
      return await getPostsPaginated({ pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage ? lastPage.data.nextPage : undefined;
    },
  });

  error && errorToast(data.error.message);
  return (
    <>
      {status === "loading" ? <Spinner /> : (
           <div>
           <div>
             <span
               onClick={() => {
                 navigate("/posts/create");
               }}
               style={{
                 fontWeight: "bold",
                 display: "flex",
                 height: "50px",
                 borderRadius: "10px",
                 border: "1px solid white",
                 cursor: "pointer",
                 backgroundColor: "none",
                 color: "white",
                 width: "fit-content",
                 padding: "0px 20px",
                 margin: "auto",
                 justifyContent: "center",
                 alignItems: "center",
               }}
             >
               + Create a Post
             </span>
             <h1>Posts</h1>
             {data?.pages?.map((page: any) => {
               return page.data.items.map((post: any) => (
                 <div
                   key={post.id}
                   style={{
                     gap: "10px",
                     flexDirection: "column",
                     display: "flex",
                     width: "600px",
                     height: "50px",
                     borderRadius: "10px",
                     border: "1px solid white",
                     cursor: "pointer",
                     color: "white",
                     justifyContent: "center",
                     alignItems: "center",
                     margin: "30px",
                     padding: "20px",
                     textOverflow: "ellipsis",
                     overflow: "auto",
                   }}
                   onClick={() => navigate(`/posts/${post.id}`)}
                 >
                   {post.title}
                 </div>
               ));
             })}
           </div>
           {isFetchingNextPage ? (
             <div>
               <Spinner />
             </div>
           ) : (
             hasNextPage && (
               <button
                 style={{
                   width: "full",
                   height: "50px",
                   borderRadius: "10px",
                   border: "1px solid black",
                   cursor: "pointer",
                   backgroundColor: "white",
                   color: "black",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
                 onClick={() => fetchNextPage()}
               >
                 Load More
               </button>
             )
           )}
         </div>
      )}
   
    </>
  );
};

export default Posts;
