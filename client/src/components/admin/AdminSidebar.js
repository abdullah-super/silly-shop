import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user";

const AdminSidebar = () => {
  const location = useLocation();

  const screenWidth = useSelector((state) => state.ui.screenWidth);
  const sideBar = useSelector((state) => state.adminNav.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
    navigate(0);
  };

  if (screenWidth > 1000) {
    return (
      <>
        <aside id="sidebar">
          <DivOne location={location} screenWidth={screenWidth} />
          <DivTwo location={location} screenWidth={screenWidth} />
        </aside>
      </>
    );
  } else if (sideBar) {
    return (
      <>
        <aside
          id="sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "10rem",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <h1>Admin</h1>
          <DivOne
            location={location}
            screenWidth={screenWidth}
            logOut={logOut}
          />
        </aside>
      </>
    );
  } else {
    return "";
  }
};

const DivOne = ({ location, screenWidth }) => (
  <div className="board">
    {screenWidth > 1000 ? <h3>Managment</h3> : ""}
    {screenWidth > 1000 ? (
      <ul>
        <Li
          url="/admin/dashboard"
          text="Dashboard"
          Icon={<i className="fa-solid fa-boxes-stacked"></i>}
          location={location}
        />
        <Li
          url="/admin/product"
          text="Product"
          Icon={<i className="fa-solid fa-bag-shopping"></i>}
          location={location}
        />
        <Li
          url="/admin/customer"
          text="Customer"
          Icon={<i className="fa-solid fa-users"></i>}
          location={location}
        />
        <Li
          url="/admin/transaction"
          text="Transaction"
          Icon={<i className="fa-solid fa-file-lines"></i>}
          location={location}
        />
        <Li
          url="/admin/app/coupon"
          text="Coupon"
          Icon={<i className="fa-solid fa-ticket"></i>}
          location={location}
        />
      </ul>
    ) : (
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",

        }}>
        <Li2 url="/admin/dashboard" text="Dashboard" location={location} />
        <Li2 url="/admin/product" text="Product" location={location} />
        <Li2 url="/admin/customer" text="Customer" location={location} />
        <Li2 url="/admin/transaction" text="Transaction" location={location} />
        <Li2 url="/admin/app/coupon" text="Coupon" location={location} />
        <Li2 url="/admin/chart/bar" text="Bar" location={location} />
        <Li2 url="/admin/chart/pie" text="Pie" location={location} />
        <Li2 url="/admin/chart/line" text="Line" location={location} />
      </ul>
    )}
  </div>
);

const DivTwo = ({ location, screenWidth, logOut }) => (
  <div className="charts">
    {screenWidth > 1000 ? <h3>Charts</h3> : ""}

    <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={<i className="fa-solid fa-chart-column"></i>}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={<i className="fa-solid fa-chart-pie"></i>}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={<i className="fa-solid fa-chart-line"></i>}
        location={location}
      />
    </ul>
  </div>
);

const Li = ({ url, text, location, Icon }) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}>
    <Link
      className="link"
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}>
      {Icon}
      {text}
    </Link>
  </li>
);

const Li2 = ({ url, text, location }) => (
  <li style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start"}}>
    <Link
      className="link"
      to={url}
      style={{
        color: "black",
        gap: "10px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}>
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
