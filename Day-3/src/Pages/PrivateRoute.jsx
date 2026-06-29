import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  if (!auth) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
