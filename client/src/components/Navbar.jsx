
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
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
            <span>Welcome, {user.name}!</span>
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

