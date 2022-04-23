import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { DiffOutlined, MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
import logo from "./../../logo.svg";
const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
      <div className="navbarStyling">
        <h1 className="logoStyling"> Smoobu</h1>
        <Button className="bookingBtn"> <DiffOutlined />Enter Booking</Button>
        <Button>Balwinder Singh
        </Button>
      </div>
      {/* <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a> */}
    </nav>
  );
};

export default NavBar;
