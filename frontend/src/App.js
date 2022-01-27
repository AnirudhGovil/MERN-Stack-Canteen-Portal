import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/common/UsersList";
import Home from "./components/common/Home";
import Register from "./components/Buyer/Register";
import Register2 from "./components/Vendor/Register2";
import RegisterFood from "./components/Vendor/RegisterFood";
import Login from "./components/common/Login";
import Navbar from "./components/common/Navbar";
import BuyerNavbar from "./components/Buyer/BuyerNavbar";
import VendorNavbar from "./components/Vendor/VendorNavbar";
import BuyerUI from "./components/Buyer/BuyerUI";
import Menu from "./components/Buyer/Menu";
import VendorUI from "./components/Vendor/VendorUI";
import Orders from "./components/Vendor/Orders";
import MyOrders from "./components/Buyer/MyOrders";
import Profile from "./components/Buyer/Profile";
import ProfileVendors from "./components/Vendor/ProfileVendors";
import Wallet from "./components/Buyer/Wallet";
import FoodEdit from "./components/Vendor/FoodEdit";
import Statistics from "./components/Vendor/Statistics";

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
          <Route path="UsersList" element={<UsersList />} />
        </Route>
        <Route path="/" element={<Layout2 />}>
          <Route path="Profile" element={<Profile />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="BuyerUI" element={<BuyerUI />} />
          <Route path="Wallet" element={<Wallet />} />
          <Route path="MyOrders" element={<MyOrders />} />
        </Route>
        <Route path="/" element={<Layout3 />}>
          <Route path="ProfileVendors" element={<ProfileVendors />} />
          <Route path="VendorUI" element={<VendorUI />} />
          <Route path="RegisterFood" element={<RegisterFood/>} />
          <Route path="FoodEdit" element={<FoodEdit/>} />
          <Route path="Orders" element={<Orders/>} />
          <Route path="Statistics" element={<Statistics/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
