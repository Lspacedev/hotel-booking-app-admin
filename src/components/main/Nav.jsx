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
        <FaHotel className="icon" />
        <h3 className="logo">ZaHotels.com|Admin</h3>
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
