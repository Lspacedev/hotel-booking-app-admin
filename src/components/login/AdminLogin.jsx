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
        alert("Log in successfully");
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
          <img src="images/login-register.jpg" alt="login" />
        </div>
        <div className="login-form-container">
          <div className="logo-container" onClick={() => navigation("/")}>
            <FaHotel className="icon" />
            <h3 className="logo">ZaHotels.com|Admin</h3>
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
                  placeholder="admin@zahotels.co.za"
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
                  placeholder="admin"
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
