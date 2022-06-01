import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import {useNavigate} from 'react-router-dom'
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Navbar from "./Navbar";
import axios from "../api/axios";

const CreateBlog = () => {
  const [file, setFile] = useState(null);
  const blog = useSelector((state) => state.blog.value);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bg = {
      title: blog.title,
      desc: blog.desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      bg.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        toast.error(err);
      }
    }
    try {
      const { data } = await axios.post("/blog", bg, {
        headers: { authorization: token },
      });
      toast.success(data);
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleValue = (e) => {
    dispatch(setBlog({ ...blog, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar />
      <div className="con">
        <form
          className="d-flex justify-content-center flex-column"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            {file && (
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
          </div>
          <div className="from-group">
            <label htmlFor="fileInput">
              <AddAPhotoIcon />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control m-3 p-3"
            />
          </div>
          <div className="from-group">
            <input
              type="text"
              className="form-control m-3 p-3 writeInput"
              placeholder="Title"
              name="title"
              autoFocus={true}
              value={blog.title}
              onChange={handleValue}
            />
          </div>
          <div className="from-group">
            <textarea
              placeholder="Tell your story..."
              className="form-control m-3 p-3 writeInput"
              type="text"
              name="desc"
              value={blog.desc}
              onChange={handleValue}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-primary m-2" type="submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
