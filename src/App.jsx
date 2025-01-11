import { useState, useEffect } from "react";
import HomePage from "./components/main/HomePage";

import AccomodationDetails from "./components/admin/AccomodationDetails";

import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import Accomodations from "./components/admin/Accomodations";

import AdminLogin from "./components/login/AdminLogin";
import Reservations from "./components/admin/Reservations";
import ReservationViewCard from "./components/admin/ReservationViewCard";

import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { collectionGroup, getDocs } from "firebase/firestore";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { db } from "./config/firebase";
import { useDispatch } from "react-redux";
import { setAccomodations } from "./app/accomodationsSlice";

import AdminProfile from "./components/profiles/AdminProfile";

function App() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  useEffect(() => {
    fetchAccomodations();
  }, []);

  async function fetchAccomodations() {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, "accomodations"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setAccomodations(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoutes auth={user} />}>
            <Route path="home" element={<AdminDashboard />}>
              <Route index element={<Accomodations />} />
              <Route path="accomodations" element={<Accomodations />}>
                <Route
                  path=":accomodation_id"
                  element={<AccomodationDetails />}
                />
              </Route>
              <Route path="reservations" element={<Reservations />}>
                <Route path=":booking_id" element={<ReservationViewCard />} />
              </Route>
              <Route path="profile" element={<AdminProfile admin={user} />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
