import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccessToken } from "../../helpers/helperMethods";
import { getBlogAPI, getDeleteBlogAPI } from "../../helpers/api";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import { URLPaths } from "../Utils/constants";
const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const fetchBlog = async () => {
    try {
      const data = await axios({
        url: getBlogAPI(id),
        method: "get",
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      setBlog(data.data);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const data = await axios({
        url: getDeleteBlogAPI(id),
        method: "delete",
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      toast.success("Blog Deleted Successfully");
      navigate(URLPaths.MY_BLOGS);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
  const handleEdit = () => {
    navigate(`/blog/edit/${id}`);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="p-4 flex flex-col h-screen oveflow-hidden">
      <Header />
      <div className="flex grow items-center justify-center flex-col p-8 gap-4 max-h-full overflow-hidden">
        <div className="text-2xl">{blog.title}</div>
        <div className="">{blog.description}</div>
        <div className="bg-white rounded text-[#1A2653] p-3 overflow-auto h-full w-full max-w-full min-w-[300px] max-h-full grow">
          {blog.content}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-[#1A2653] px-4 h-[48px] text-white text-[1rem] rounded-[1rem] shadow"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-[#1A2653] px-4 h-[48px] text-white text-[1rem] rounded-[1rem] shadow"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
