import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img
            src="https://toppng.com/uploads/preview/mongodb-logo-11609369386lqoc6r2ga9.png"
            alt="MongoDB logo"
            className="h-10 inline"
          />
        </NavLink>
        <NavLink
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:bg-slate-100 h-9 rounded-md px-3"
          to="/create"
        >
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
