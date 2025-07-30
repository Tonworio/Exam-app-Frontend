import { useState } from "react";
import API from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="reg">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div id="regg">
        <button className="button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
