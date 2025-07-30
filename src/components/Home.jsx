import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Exam Preparation App</h1>
      <p>Choose an option to begin:</p>
      <div>
        <Link to="/register">
          <button className="button">Register</button>
        </Link>{" "}
        <Link to="/login">
          <button className="button">Login</button>
        </Link>{" "}
      </div>
    </div>
  );
}
