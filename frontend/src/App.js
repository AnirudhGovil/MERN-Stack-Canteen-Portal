import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Register2 from "./components/common/Register2";
import Login from "./components/common/Login";
import Login2 from "./components/common/Login2";
import Navbar from "./components/templates/Navbar";
import BuyerNavbar from "./components/templates/BuyerNavbar";
import VendorNavbar from "./components/templates/VendorNavbar";
import BuyerUI from "./components/common/BuyerUI";
import VendorUI from "./components/common/VendorUI";
import Profile from "./components/users/Profile";
import ProfileVendors from "./components/users/ProfileVendors";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <BuyerNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout3 = () => {
  return (
    <div>
      <VendorNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="register2" element={<Register2 />} />
          <Route path="login" element={<Login />} />
          <Route path="login2" element={<Login2 />} />
        </Route>
        <Route path="/" element={<Layout2 />}>
          <Route path="Profile" element={<Profile />} />
          <Route path="BuyerUI" element={<BuyerUI />} />
        </Route>
        <Route path="/" element={<Layout3 />}>
          <Route path="ProfileVendors" element={<ProfileVendors />} />
          <Route path="VendorUI" element={<VendorUI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
