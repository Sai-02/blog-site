import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRegisterUserAPI } from "../../helpers/api";
import { isValidEmail } from "../../helpers/helperMethods";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const registerUser = async () => {
    if (name.trim() === "") {
      toast("Name can not be empty", {
        type: "error",
      });
      return;
    }
    if (email.trim() === "") {
      toast("Email can not be empty", {
        type: "error",
      });
      return;
    }
    if (password.trim() === "") {
      toast("Password can not be empty", {
        type: "error",
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast("Enter valid email !!", {
        type: "error",
      });
      return;
    }
    try {
      const data = await axios({
        url: getRegisterUserAPI(),
        method: "post",
        data: {
          name,
          email,
          password,
        },
      });
      const accessToken = data.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);
      toast.success("Registered Successfully !!!");
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.msg);
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type="email"
              className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              className="rounded-[5px] border border-[#DAE1F5] outline-none px-4 py-[6px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-[30px]">
          <button
            className="bg-[#10182F] text-white py-3 w-full rounded"
            onClick={registerUser}
          >
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
