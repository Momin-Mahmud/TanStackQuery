import { useState } from "react";
import { createPost } from "../../api/post.api";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../common/Spinner";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const queryClient : any = useQueryClient()
  const navigate = useNavigate()
  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
        queryClient.invalidateQueries(["posts"])
        navigate("/posts")
    }
  })
  const currentAuthorID = useSelector((state:any)=>state.author.userID)
  const currentAuthorName = useSelector((state:any)=>state.author.userName)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId : currentAuthorID
  });

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log("FormData", formData);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()
    addPost.mutate(formData)
  };
  return (
    <>
    {addPost?.isPending ? <Spinner/> : (
        <div
      id="form-main"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!currentAuthorID || !currentAuthorName ? <h1>Please select an  author first from authors list</h1> :
      (
        <div id="form-div">
        <span
          style={{
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
            width: "full",
            height: "200px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        Creating Post <br /> as <br />  <strong>{currentAuthorName}</strong>
        </span>
        <p className="name">
          <input
          onChange={(event) => handleChange(event)}
            name="title"
            type="text"
            className="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
            placeholder="Title"
            id="title"
          />
        </p>
        <p className="text">
          <textarea
          onChange={(event) => handleChange(event)}
            name="description"
            className="validate[required,length[6,300]] feedback-input"
            id="description"
            placeholder="Content"
          ></textarea>
        </p>

        <button onClick={handleSubmit} type="submit" id="button-blue">
          Submit
        </button>
      </div>
      )}

    </div>
    )}
    </>
    
  );
};

export default CreatePost;
