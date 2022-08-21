import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  isLoggedIn,
  isValidEmail,
  setAccessToken,
} from "../../helpers/helperMethods";
import { useState } from "react";
import { getLoginUserAPI } from "../../helpers/api";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleIfAlreadyLoggedIn = () => {
    if (isLoggedIn()) {
      toast.info("Already Logged in !!");
      navigate("/");
    }
  };
  useEffect(() => {
    handleIfAlreadyLoggedIn();
  }, []);

  const handleLogin = async () => {
    if (email.trim() === "") {
      toast.error("Enter email !!");
      return;
    }
    if (password.trim() === "") {
      toast.error("Enter Password!!");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Enter valid email !!");
      return;
    }
    try {
      const data = await axios({
        url: getLoginUserAPI(),
        method: "post",
        data: {
          email,
          password,
        },
      });
      const accessToken = data.data.accessToken;
      setAccessToken(accessToken);
      toast.success("Logged In Successfully !!!");
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.msg);
    }
  };
  return (
    <div className="h-screen w-screen flex bg-[white] xs:bg-[transparent] xs:items-center justify-center">
      <div className="bg-white rounded p-4 pt-8 xs:p-8 xs:shadow">
        <div className="grid gap-4">
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:flex-row justify-between xs:gap-[60px] mt-[20px]">
          <div className="flex items-center justify-center gap-1">
            <input type="checkbox" className="" />
            <span className="text-[#545D7A] text-[14px] text-center">
              Remember me
            </span>
          </div>
          <div className=" text-[#306BF3] text-[14px] cursor-pointer">
            Forgot your password?
          </div>
        </div>
        <div className="mt-[30px]">
          <button
            className="bg-[#10182F] text-white py-3 w-full rounded"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
        <div className="mt-[35px] text-[#10182F] text-[14px]">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-[#306BF3] cursor-pointer">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
