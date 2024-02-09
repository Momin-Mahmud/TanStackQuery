import { useLocation } from "react-router-dom";
import { getAuthorPostsPaginated } from "../../api/author.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";
import { errorToast } from "../../common/CustomToast";

const AuthorPosts = () => {
  const state = useLocation().state;
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }: any = useInfiniteQuery<any>({
    queryKey: ["authorPosts", "paginated"],
    queryFn: async ({ pageParam = 1 }) => {
      return await getAuthorPostsPaginated(state, { pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage ? lastPage.data.nextPage : undefined;
    },
  });
  error && errorToast(data.error.message);
  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div>
          {data?.pages?.map((page: any) => {
            return page.data.items.map((post: any) => {
              return (
                <div style={{ border: "1px solid white", padding: "10px", margin: "20px", borderRadius: "10px" }} key={post.id}>
                  <h1>{post.title}</h1>
                  <hr />
                  <div
                    style={{
                      textAlign: "left",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                      overflowWrap: "break-word",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                </div>
              );
            });
          })}
          {isFetchingNextPage ? <Spinner /> : (
            hasNextPage && (
              <button style={{ margin: "30px" }}  onClick={() => fetchNextPage()}>Load More</button>
              )
          )}
        </div>
      )}
    </>
  );
};

export default AuthorPosts;
