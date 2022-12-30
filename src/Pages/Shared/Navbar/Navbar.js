import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut, currentUser } = useContext(AuthContext);
  const handleLogOut =() =>{
    logOut()
    .then(() =>{})
    .catch( err => console.error(err))
  }
  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/media">Media</Link>
      </li>
      <li>
        <Link to="/message">Message</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </React.Fragment>
  );
  const loginInfo = (
    <React.Fragment>
      {user?.uid ? (
        <li onClick={handleLogOut}>
          <Link>Sign Out</Link>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
            {loginInfo}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Hello-snap!
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
          {loginInfo}
        </ul>
      </div>
      <div className="navbar-end">
        {/* <a className="btn">Get started</a> */}
        { user?.photoURL ? <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div> : 
        <div className="avatar">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>}
      </div>
    </div>
  );
};

export default Navbar;
