import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../helpers/helperMethods";
import { getBlogAPI } from "../../helpers/api";
import { toast } from "react-toastify";
import Header from "../Header/Header";
const Blog = () => {
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
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="p-4 flex flex-col h-screen">
      <Header />
      <div className="flex grow items-center justify-center flex-col p-8 gap-4">
        <div className="text-2xl">{blog.title}</div>
        <div className="">{blog.description}</div>
        <div className="bg-white rounded text-[#1A2653] p-3 overflow-auto h-full w-full max-w-full min-w-[300px] grow">
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default Blog;
