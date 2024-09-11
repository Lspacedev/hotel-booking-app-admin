import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoutes({ auth }) {
  console.log(auth);
  return auth != null ? <Outlet /> : <Navigate to="/" />;
}
