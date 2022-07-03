import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="h-screen w-screen flex bg-[white] xs:bg-[transparent] xs:items-center justify-center">
      <div className="bg-white rounded p-4 pt-8 xs:p-8 xs:shadow xs:w-[400px]">
        <h1 className="text-center text-[#10182F] font-bold text-[1.2rem] mb-[2rem] ">
          Sign up
        </h1>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label
              htmlFor=""
              className="text-left text-[14px] text-[#10182F] font-bold"
            >
              Name
            </label>
            <input
              type="text"
              className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
              placeholder="Name"
            />
          </div>
          <div className="grid gap-1">
            <label
              htmlFor=""
              className="text-left text-[14px] text-[#10182F] font-bold"
            >
              Email
            </label>
            <input
              type="text"
              className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
              placeholder="Email"
            />
          </div>
          <div className="grid gap-1">
            <label
              htmlFor=""
              className="text-left text-[14px] text-[#10182F] font-bold"
            >
              Password
            </label>
            <input
              type="text"
              className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="mt-[30px]">
          <button className="bg-[#10182F] text-white py-3 w-full rounded">
            Sign Up
          </button>
        </div>
        <div className="mt-[35px] text-[#10182F] text-[14px]">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#306BF3] cursor-pointer">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
