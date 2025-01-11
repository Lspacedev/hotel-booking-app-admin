import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";

import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalHotel } from "react-icons/md";
import { MdOutlineReceiptLong } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

function AdminDashboard() {
  const navigation = useNavigate();

  function logOut() {
    signOut(auth)
      .then(() => {
        navigation("/");
        localStorage.clear();
      })
      .catch((err) => {});
  }

  function navigateAccomodation() {
    navigation("/home/accomodations");
  }
  function navigateReservations() {
    navigation("/home/reservations");
  }
  return (
    <div className="AdminDashboard">
      <Sidebar>
        <div className="link" onClick={navigateAccomodation}>
          <MdOutlineLocalHotel className="icon" />
          <div className="text"> Accomodations</div>
        </div>

        <div className="link" onClick={navigateReservations}>
          <MdOutlineReceiptLong className="icon" />

          <div className="text">Reservations</div>
        </div>

        <div className="logout link" onClick={logOut}>
          <FiLogOut className="icon" />

          <div className="text">Logout</div>
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
