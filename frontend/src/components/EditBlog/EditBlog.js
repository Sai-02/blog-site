import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAccessToken,
  isEmptyString,
  isLoggedIn,
} from "../../helpers/helperMethods";
import Header from "../Header/Header";
import { getBlogAPI, getEditBlogAPI } from "../../helpers/api";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
    fetchBlog();
  }, []);

  useEffect(() => {
    setTitle(blog.title);
    setDescription(blog.description);
    setContent(blog.content);
  }, [blog]);
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
  const editBlog = async () => {
    if (isEmptyString(title)) {
      toast.error("Title can't be empty");
      return;
    }
    if (isEmptyString(description)) {
      toast.error("Description can't be empty");
      return;
    }
    if (isEmptyString(content)) {
      toast.error("Content can't be empty");
      return;
    }
    try {
      let data = await axios({
        url: getEditBlogAPI(),
        data: {
          title,
          content,
          description,
          id,
        },
        method: "post",
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      toast.success("Updated successfully!!");
      navigate(`/blog/${id}`);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <Header />
      <div className="">
        <div className="px-4">
          <h1 className="text-[#1A2653] text-[24px] text-left">Edit Blog</h1>
        </div>
        <div className="grid gap-6 justify-center">
          <input
            type="text"
            className="flex items-center bg-white sm:max-w-[700px] sm:min-w-[500px] rounded-xl p-4 gap-2 py-2 shadow"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="flex items-center bg-white sm:max-w-[700px] sm:min-w-[500px] rounded-xl p-4 gap-2 py-2 shadow"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            type="text"
            className="flex resize-none outline-none items-center bg-white sm:max-w-[700px] sm:min-w-[500px] rounded-xl p-4 gap-2 py-2 shadow h-[15rem]"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-start p-2">
            <button
              className="bg-[#1A2653] px-7 py-2  text-white text-[1rem] rounded-[1rem] shadow"
              onClick={editBlog}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
