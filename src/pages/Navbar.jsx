import { Link } from "react-router-dom";
import logo from "../assets/restaurant-logo.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-5 shadow bg-white shadow-xl rounded z-index">

      {/* Logo Section ⭐ */}
      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt="logo"
          className="h-12 w-34 object-cover"
        />

        

      </div>

      {/* Navigation */}
      <div className="space-x-6 flex items-center">

        {/* <Link to="/">Home</Link> */}

        <Link
          to="/admin"
          className="bg-black/40 text-white px-4 py-2 rounded"
        >
          Admin
        </Link>
        

      </div>
      

    </div>
  );
}

export default Navbar;