import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import User from "../Pages/User";
import Notfound from "../Pages/Notfound";
import SingleUserPage from "../Pages/SingleUserPage";
import PrivateRoute from "../Pages/PrivateRoute";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/User"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route path="/User/:userId" element={<SingleUserPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}
