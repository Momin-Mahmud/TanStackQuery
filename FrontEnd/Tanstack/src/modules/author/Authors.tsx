import { useState } from "react";
import { createAuthor, getAuthors } from "../../api/author.api";
import { useDispatch } from "react-redux";
import { saveUserID, saveUserName } from "../../store/authorStore/authorSlicer";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Authors = () => {
  const navigate = useNavigate();
  const queryClient: any = useQueryClient();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const authorsData: any = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  const addAuthor = useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
        queryClient.invalidateQueries(["authors"])
    } 
  })

  const handleSubmit = (e: any) => {
      e.preventDefault();
      addAuthor.mutate({
          name: name
      })
  }

  return (
    <div>
      <h1>Authors</h1>
      <div>
        <h2>Create Author</h2>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          style={{ color: "black", backgroundColor: "white" }}
        />
        <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
          Create
        </button>
      </div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Choose an author
      </h1>
      {authorsData?.data?.data?.map((author: any) => (
        <div key={author.id}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h4
              onClick={(e: any) => {
                e.target.style.backgroundColor = "green";
                dispatch(saveUserName(author.name));
                dispatch(saveUserID(author.id));
              }}
              onMouseOver={(e: any) => {
                e.target.style.border = "2px solid black";
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              style={{
                padding: "4px",
                backgroundColor: "black",
                borderRadius: "10px",
                border: "",
                cursor: "pointer",
              }}
            >
              {author.name}
            </h4>
            <span
              onClick={() => {
                  navigate("/author/posts" , {state:author.id})
              }}
              style={{ cursor: "pointer" }}
              onMouseLeave={(e: any) => {
                e.target.style.textDecoration = "none";
              }}
              onMouseOver={(e: any) => {
                e.target.style.textDecoration = "underline";
              }}
            >
              See all Posts by this Author
            </span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Authors;
