import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import QuizPage from "./components/QuizPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Link className="btn" to="/">
          Home
        </Link>
        <Link className="btn" to="/register">
          Register
        </Link>
        <Link className="btn" to="/login">
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
