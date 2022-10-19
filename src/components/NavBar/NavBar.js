import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { fetchBookingList } from "../../redux/thunk"
import { Col, Menu, Row, } from "antd";
import {
  LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined,

} from "@ant-design/icons";

import { Typography, Drawer, Button, Input, } from "antd";
import {
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./NavBar.css";
import BookingForm from "../popoverForm/BookingForm"
import logoOne from "../../Assets/logoOne.png"
const { Search } = Input;



const NavBar = ({ menu, onUpdate, update }) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(true);
  const dispatch = useDispatch()

  const onSearch = (search) => {
    dispatch({ type: "TEXT_SEARCHED", payload: search });
    dispatch(fetchBookingList)
  }


  return (

    <nav className="navbar" >


      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>

      <Row justify="space-between" className="navbarStyling navbarcolor"  >
        <Col sm={0} xs={0} md={0} lg={6} >
          <div style={{ width: `${update ? "61px" : "200px"}` }} className="logoStyling" >
            <Row align="center" onClick={() => onUpdate()}  >

              <img src={logoOne} width={33} height={33} />
              {!update ?
                <h1>Gurdwara</h1>
                : ""}
            </Row>
          </div>
        </Col>

        <Col xs={2} sm={2} md={2} lg={0}  >
          <Button
            className="menu"
            // type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}

          />
        </Col>
        <Col xs={2} sm={2} md={2} lg={0} >
          <Button
            className="serachMenu"
            // type="primary"
            icon={<SearchOutlined />}
            onClick={() => setSearch(!search)}
            style={{ background: "#f3f3f3", color: "blue" }}

          />

        </Col >
        <Col sm={15} xs={15} md={14} lg={0}  >
          <Row justify="center" >

            <h1>logo</h1>
          </Row>
        </Col>
        {search ?
          <Col sm={0} xs={0} md={0} lg={10}  >
            <div className="navbar-content">
              <BookingForm />
              <Search
                placeholder="Search Booking"
                allowClear
                onSearch={onSearch}

              />
            </div>
          </Col>
          : ""}
        {/* : ""} */}
        <Col xs={5} sm={5} md={6} lg={8} className="user">
          <div >
            <Menu mode="horizontal"  >
              <Menu.SubMenu
                key="SubMenu"
                title="Balwinder Singh"
                icon={<TeamOutlined style={{ color: "#41F793" }} />}
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
        {!search ?
          <Col sm={23} xs={23} md={23}  lg={0}  >
            <div className="navbar-content">
              <Search
                placeholder="Search Booking"
                allowClear
                onSearch={onSearch}

              />
            </div>
          </Col>
          : ""}
      </Row>

    </nav>
  );
};

export default NavBar;
