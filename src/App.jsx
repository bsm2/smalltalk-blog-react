import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Nav from "./components/Nav";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import PostForm from "./pages/PostForm";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNav && <Nav />}
      <div>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostForm />} />
        </Routes>
        <ToastContainer
          toastStyle={{
            backgroundColor: "#1F2937",
            color: "white"
          }}
        />
      </div>
    </>
  );
}

export default App;
