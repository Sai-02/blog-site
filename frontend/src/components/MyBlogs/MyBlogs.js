import React from "react";
import Header from "../Header/Header";
import searchIcon from "../../assets/searchIcon.svg";
import { useEffect } from "react";
import { getMyBlogsAPI } from "../../helpers/api";
import axios from "axios";
import { getAccessToken } from "../../helpers/helperMethods";
import { useState } from "react";
import { Link } from "react-router-dom";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchMyBlogs = async () => {
    try {
      const data = await axios({
        url: getMyBlogsAPI(),
        method: "get",
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      setBlogs(data.data.blogs);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchMyBlogs();
  }, []);
  return (
    <div className="p-4">
      <Header />
      <div className="">
        <h1 className="text-left p-8 text-[#1A2653] text-[24px]">My Blogs </h1>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 items-center">
        <div className="flex items-center bg-white sm:max-w-[700px] sm:min-w-[500px] rounded-xl p-4 gap-2 py-2 shadow">
          <img src={searchIcon} alt="" className="w-[32px] h-[32px]" />
          <input type="text" className="grow" placeholder="Filters.." />
        </div>
        <div className="">
          <button className="bg-[#1A2653] px-4 h-[48px] text-white text-[1rem] rounded-[1rem] shadow">
            Search
          </button>
        </div>
      </div>
      <div className=" flex flex-col justify-center mt-[2rem] gap-4">
        {blogs &&
          blogs.map((blog) => {
            return (
              <div className=" flex justify-center " key={blog._id}>
                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-white cursor-pointer py-2 px-8 shadow rounded min-w-[50vw] max-w-[500px]"
                >
                  {blog.title}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyBlogs;
