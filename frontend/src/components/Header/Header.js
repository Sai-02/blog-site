import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../helpers/helperMethods";
const Header = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
    toast.success("Logged out !!");
  };

  return (
    <nav className="flex justify-end gap-2">
      {isLoggedIn() ? (
        <>
          <Link to="/create/blog">
            <div className="cursor-pointer text-[#10182F] hover:text-white hover:bg-[#10182F] py-1 px-2 rounded">
              Create
            </div>
          </Link>
          <button
            className="cursor-pointer text-[#10182F] hover:text-white hover:bg-[#10182F] py-1 px-2 rounded"
            onClick={logoutUser}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">
            <div className="cursor-pointer text-[#10182F] hover:text-white hover:bg-[#10182F] py-1 px-2 rounded">
              Login
            </div>
          </Link>
          <Link to="/signup">
            <div className="cursor-pointer text-[#10182F] hover:text-white hover:bg-[#10182F] py-1 px-2 rounded">
              Sign up
            </div>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
