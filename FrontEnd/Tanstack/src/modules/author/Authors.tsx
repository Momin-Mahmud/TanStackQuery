import { useState } from "react";
import { createAuthor, deleteAuthor, getAuthors, updateAuthor } from "../../api/author.api";
import { useDispatch, useSelector } from "react-redux";
import { saveUserID, saveUserName } from "../../store/authorStore/authorSlicer";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";
import { Modal } from "antd";

const Authors = () => {
  const navigate = useNavigate();
  const queryClient: any = useQueryClient();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const authorID = useSelector((state: any) => state.author.userID);
  const authorName = useSelector((state: any) => state.author.userName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authorsData: any = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  const addAuthor = useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
    },
  });
  const editAuthor: any = useMutation({
    mutationFn: ()=> updateAuthor(authorID, {name: name}),
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
      setIsModalOpen(false);
    }
  });

  const removeAuthor = useMutation({
    mutationFn: () => deleteAuthor(authorID),
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
      dispatch(saveUserID(""));
      dispatch(saveUserName(""));
    },
  })

  const handleDelete = () => {
    removeAuthor.mutate();

  }

  const handleUpdate = (e: any) => {
    e.preventDefault();
    editAuthor.mutate();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addAuthor.mutate({
      name: name,
    });
  };
  const handleCancel = () => {
    setName("");
    setIsModalOpen(false);
  };
  return (
    <>
      {authorsData?.isLoading ? (
        <Spinner />
      ) : (
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
                  style={{
                    padding: "4px",
                    backgroundColor: authorID === author.id ? "green" : "black",
                    borderRadius: "10px",
                    border: "",
                    cursor: "pointer",
                  }}
                >
                  {author.name}
                </h4>
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    dispatch(saveUserName(author.name));
                    dispatch(saveUserID(author.id));
                    setIsModalOpen(true);
                  }}
                >
                  Update author name
                </span>
                <span
                  onClick={() => {
                    dispatch(saveUserID(author.id));
                    handleDelete();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Delete this author
                </span>
                <span
                  onClick={() => {
                    navigate("/author/posts", { state: author.id });
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
          <Modal
            title="Update Author"
            open={isModalOpen}
            onOk={handleUpdate}
            onCancel={handleCancel}
          >
            <p><strong>Updating: </strong> {authorName}</p>
            <input style={{ padding: "2px", color: "black", backgroundColor: "white" }} value={name} onChange={(e) => setName(e.target.value)} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Authors;
