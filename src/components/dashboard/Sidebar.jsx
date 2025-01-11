import { FaHotel } from "react-icons/fa";
function Sidebar({ children }) {
  return (
    <div className="Sidebar">
      <div className="logo-container">
        <FaHotel className="icon" />
        <h3 className="logo">ZaHotels.com|Admin</h3>
      </div>
      <div className="sidebar-links">{children}</div>
    </div>
  );
}

export default Sidebar;
