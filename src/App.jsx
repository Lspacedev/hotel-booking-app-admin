import { useState, useEffect } from "react";
import HomePage from "./components/main/HomePage";
import ResultsPage from "./components/main/ResultsPage";
import AccomodationCard from "./components/main/AccomodationCard";
import AccomodationDetails from "./components/admin/AccomodationDetails";
import UserDashboard from "./components/user/UserDashboard";
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import Accomodations from "./components/admin/Accomodations";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import Reservations from "./components/admin/Reservations";
import ReservationViewCard from "./components/admin/ReservationViewCard";
import UserRegistration from "./components/registration/UserRegistration";
import Checkout from "./components/checkout/Checkout";
import ProtectedRouteReg from "./components/protected-routes/ProtectedRouteReg";
import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  collectionGroup,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//import { ref, listAll } from "firebase/storage";
//import { storage } from "./config/firebase";
import { db } from "./config/firebase";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setAccomodations, setAdmin } from "./app/accomodationsSlice";
import useLocalStorage from "./components/storage/useLocalStorage";
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
        console.log(user);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
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
  //console.log(auth.currentUser);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />

          <Route element={<ProtectedRoutes auth={user} />}>
            <Route path="home" element={<AdminDashboard />}>
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
