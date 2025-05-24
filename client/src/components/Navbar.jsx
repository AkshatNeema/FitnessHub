// // src/components/Navbar.jsx
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-green-600">Fitness Hub</h1>
//       <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Home</Link>
//       <div className="space-x-4">
//         <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link>
//         <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign Up</Link>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-green-500 text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Fitness Hub
      </h1>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.firstName}!</span>
            <button
              className="bg-white text-green-600 px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

