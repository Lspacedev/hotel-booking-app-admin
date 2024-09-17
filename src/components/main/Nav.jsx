import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigation = useNavigate();

  function navigateLogin() {
    navigation("/login");
  }
  return (
    <div className="Nav">
      <div className="logo">ZaHotels.com | Admin</div>
      <div className="nav-links">
        <div onClick={navigateLogin}>Login</div>
      </div>
    </div>
  );
}
export default Nav;
