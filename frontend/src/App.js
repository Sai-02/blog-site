import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
function App() {
  return (
    <div
      className="text-center w-screen h-screen"
      style={{
        background: "linear-gradient(119.36deg, #F3F7FF 0%, #FEE2F6 100%)",
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
