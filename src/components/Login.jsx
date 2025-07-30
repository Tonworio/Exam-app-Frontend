import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form className="reg" onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <button className="button" type="submit">
          Login
        </button>
      </form>

      {loggedIn && (
        <div style={{ marginTop: "20px" }}>
          <h3>Welcome! 🎉</h3>
          <button className="btn2" onClick={() => navigate("/quiz")}>
            Would you like to take the test?
          </button>
        </div>
      )}
    </div>
  );
}
