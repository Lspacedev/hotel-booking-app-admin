import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
function Nav() {
  const navigation = useNavigate();

  function navigateLogin() {
    navigation("/login");
  }
  return (
    <div className="Nav">
      <div className="logo-container" onClick={() => navigation("/")}>
        <img
          src="/images/logo-icon2.png"
          style={{ width: "50px", height: "50px" }}
        />
        <img
          src="/images/logo-text2.png"
          style={{ width: "130px", height: "25px" }}
        />
      </div>
      <div className="nav-links">
        <div className="login-btn" onClick={navigateLogin}>
          Login
        </div>
      </div>
    </div>
  );
}
export default Nav;
