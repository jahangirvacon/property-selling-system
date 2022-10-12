import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { fetchBookingList } from "../../redux/thunk"
import { Col, Menu, Row } from "antd";
import {
  LogoutOutlined,
} from "@ant-design/icons";

import { Typography, Drawer, Button, Input } from "antd";
import {
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./NavBar.css";
import BookingForm from "../popoverForm/BookingForm"
const { Search } = Input;



const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const onSearch = (search) => {
    dispatch({ type: "TEXT_SEARCHED", payload: search });
    dispatch(fetchBookingList)
  }

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
      <Row className="navbarStyling navbarcolor">

        <div className="logoStyling" >
          <Row align="center" >

            <h1 >Gurdwara</h1>
          </Row>
        </div>

        <Col span={6}>
          <div className="navbar-content">
            <BookingForm />
            <Search
              placeholder="Search Booking"
              allowClear
              style={{ width: 200 }}
              onSearch={onSearch}

            />
          </div>

        </Col>
        <Col span={12} className="user">
          <div >
            <Menu mode="horizontal"  >
              <Menu.SubMenu
                key="SubMenu"
                title="Balwinder Singh"
                icon={<TeamOutlined  style={{color:"#41F793" }} />}
              >
                <Menu.Item key="two" icon={<TeamOutlined />}>
                  User Id
                </Menu.Item>
                <Menu.Item key="three" icon={<LogoutOutlined />}>
                  Logout
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
        </Col>
      </Row>

    </nav>
  );
};

export default NavBar;
