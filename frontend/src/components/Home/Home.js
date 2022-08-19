import React from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/searchIcon.svg";
import Header from "../Header/Header";
const Home = () => {
  return (
    <div className="p-4">
      <Header />
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 items-center">
        <div className="flex items-center bg-white sm:max-w-[700px] sm:min-w-[500px] rounded-xl p-4 gap-2 py-2 shadow">
          <img src={searchIcon} alt="" className="w-[32px] h-[32px]" />
          <input
            type="text"
            className="grow"
            placeholder="Search articles, topics , etc."
          />
        </div>
        <div className="">
          <button className="bg-[#1A2653] px-4 h-[48px] text-white text-[1rem] rounded-[1rem] shadow">
            Search
          </button>
        </div>
      </div>
      <div className="mt-[2rem] md:px-[20rem]">
        <h1 className="text-[#1A2653] text-[24px] text-left">Recent Posts</h1>
        <div className="text-left mt-[2rem] hover:bg-white cursor-pointer py-2 px-4 hover:shadow rounded">
          <div className="">Azure Speech Studio for Mixed Reality</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
