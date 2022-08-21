import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCreateBlogAPI } from "../../helpers/api";
import {
  getAccessToken,
  isEmptyString,
  isLoggedIn,
} from "../../helpers/helperMethods";
import Header from "../Header/Header";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, []);
  const postBlog = async () => {
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
        url: getCreateBlogAPI(),
        data: {
          title,
          content,
          description,
        },
        method: "post",
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      console.log(data);
      setTitle("");
      setContent("");
      setDescription("");
      toast.success("Blog posted successfully !!");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong !!");
    }
  };
  return (
    <div className="p-4">
      <Header />
      <div className="">
        <div className="px-4">
          <h1 className="text-[#1A2653] text-[24px] text-left">Create Blog</h1>
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
              onClick={postBlog}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
