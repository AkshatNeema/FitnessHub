// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import BMICalculator from "./pages/BMICalculator";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<BMICalculator />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       {/* You can add more routes here later */}
//     </Routes>
//   );
// };

// export default App;


// src/App.jsx
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BMICalculator from "./pages/BMICalculator"; // Replace if filename is different

import { Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BMICalculator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;


