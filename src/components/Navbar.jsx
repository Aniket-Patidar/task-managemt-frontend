import Link from "next/link";
import React, { useEffect, useState } from "react";
import TaskModal from "./CreateModel";
import { useDispatch, useSelector } from "react-redux";
import { authenticateJWT, logoutUser } from "@/redux/action/user";
import { useRouter } from "next/router";
import { setUser } from "@/redux/sclice/user";

const Navbar = () => {
  
  const [isOpen, onClose] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setUser(null));
    router.push("/login");
  };



  return (
    <div>
      <TaskModal isOpen={isOpen} onClose={onClose}></TaskModal>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#F3F4F6] text-sm py-4">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <Link href="/" className="flex-none text-xl font-semibold">
            Task Management
          </Link>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
            <button
              onClick={() => onClose(true)}
              href="/create"
              className="font-medium text-gray-600 hover:text-gray-400"
              aria-current="page"
            >
              Create
            </button>
            <Link
              className="font-medium text-gray-600 hover:text-gray-400"
              href="/profile"
            >
              Profile
            </Link>
            <button
              className="font-medium text-gray-600 hover:text-gray-400"
              href="#"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
