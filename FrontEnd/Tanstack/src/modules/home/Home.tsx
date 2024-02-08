import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{display:"flex" , flexDirection:"column", gap:"10px"}}>
      <h1 style={{ textAlign: "center" }}>Home</h1>
      <button onClick={() => navigate("/posts")}>Posts</button>
      <button onClick={() => navigate("/author")}>Authors</button>
    </div>
  );
};


export default Home