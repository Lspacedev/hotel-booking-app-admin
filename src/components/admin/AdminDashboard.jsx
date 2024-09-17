import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import Reservations from "./Reservations";
import ReservationViewCard from "./ReservationViewCard";
import Accomodations from "./Accomodations";
import AccomodationDetails from "./AccomodationDetails";
import AdminProfile from "../profiles/AdminProfile";
import { Link, Outlet } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
        <div onClick={navigateAccomodation}>Accomodations</div>

        <div onClick={navigateReservations}>Reservations</div>

        <div className="logout" onClick={logOut}>
          Logout
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <Outlet />
        {/* <Reservations /> */}
        {/* <ReservationViewCard /> */}
        {/* <Accomodations /> */}
        {/* <AccomodationDetails acc={{ edit: false }} /> */}
        {/* <AdminProfile /> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
