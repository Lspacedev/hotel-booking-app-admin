import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FaHotel } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("Admin");
  const [password, setPassword] = useState("****");
  const navigation = useNavigate();

  function login() {
    signInWithEmailAndPassword(
      auth,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD
    )
      .then(() => {
        // alert("Log in successfully");
        navigation("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className="AdminLogin">
      <div className="login-register-container">
        <div className="login-img">
          <img src="images/capetownbeach.jpg" alt="login" />
        </div>
        <div className="login-form-container">
          <div className="logo-container" onClick={() => navigation("/")}>
            <img src="/images/logo-icon2.png" className="logo-icon-img" />
            <img src="/images/logo-text2.png" className="logo-text-img" />
          </div>
          <p>Log in to your admin account.</p>
          <div className="form">
            <div className="email">
              <label htmlFor="email">
                Admin Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Admin"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="password">
              <label htmlFor="password">
                Admin Password:
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <button className="submit-btn" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
