import { Routes, Route } from 'react-router-dom';
import Posts from '../modules/posts/Posts';
import Authors from '../modules/author/Authors';
import Home from '../modules/home/Home';
import CreatePost from '../modules/posts/CreatePost';
import AuthorPosts from '../modules/PostsByAnAuthor/AuthorPosts';
import FullPost from '../modules/posts/FullPost';

const RouterModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/posts" element={<Posts />} />
      <Route path="/author" element={<Authors />} />
      <Route path= "/posts/create" element={<CreatePost />} />
      <Route path= "/author/posts" element={<AuthorPosts />} />
      <Route path='posts/:id' element={<FullPost />} />
    </Routes>
  );
};

export default RouterModule;