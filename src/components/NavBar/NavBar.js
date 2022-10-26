import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBookingList } from "../../redux/thunk";
import { Col, Menu, Row } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Typography, Drawer, Button, Input } from "antd";
import { MenuOutlined, TeamOutlined } from "@ant-design/icons";
import "./NavBar.css";
import BookingForm from "../popoverForm/BookingForm";
import logoOne from "../../Assets/logoOne.png";
const { Search } = Input;

const NavBar = ({ menu, onUpdate, update }) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(true);
  const dispatch = useDispatch();

  const onSearch = (search) => {
    dispatch({ type: "TEXT_SEARCHED", payload: search });
    dispatch(fetchBookingList);
  };

  return (
    <nav className="navbar">
      <Drawer
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>

      <Row justify="space-between" className="navbarStyling navbarcolor">
          <div
            style={{ width: `${update ? "61px" : "190px"}`, height:"70px"}}
            height={0}
            className="logoStyling"
          >
            <Row align="center" onClick={() => onUpdate()}>
              <img src={logoOne} width={33} height={33} />
              {!update ? <h1>Gurdwara</h1> : ""}
            </Row>
          </div>
  
        <Col xs={3} sm={3} md={3} lg={0}>
          <Button
            className="menu menu-btn"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            }
            onClick={() => setVisible(!visible)}
          />
        </Col>
        <Col xs={3} sm={3} md={3} lg={0}>
          <Button
            className="serachMenu"
            // type="primary"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            }
            onClick={() => setSearch(!search)}
            style={{ background: "#f3f3f3", color: "blue" }}
          />
        </Col>
        <Col sm={13} xs={13} md={12} lg={0}>
          <Row justify="center">
            <img
              src={logoOne}
              width={50}
              height={50}
              style={{ marginTop: 15 }}
            />
          </Row>
        </Col>
        {search ? (
          <Col sm={0} xs={0} md={0} lg={8}>
            <div className="navbar-content">
              <BookingForm />
              <Search
                style={{ marginLeft: "10px" }}
                placeholder="Search Booking"
                allowClear
                onSearch={onSearch}
              />
            </div>
          </Col>
        ) : (
          ""
        )}
        {/* : ""} */}

        <Col lg={4} md={0} sm={0} xs={0}></Col>
        <Col xs={5} sm={5} md={6} lg={8} className="user">
          <div style={{ marginTop: "10px" }}>
            <Menu mode="horizontal">
              <Menu.SubMenu
                key="SubMenu"
                title={window.innerWidth > 980 ? <span className="bSingh">Balwinder Singh</span> : ""}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#41F793"
                    class="bi bi-people"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                }
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
        {!search ? (
          <Col sm={23} xs={23} md={23} lg={0}>
            <div className="navbar-content">
              <Search
                placeholder="Search Booking"
                allowClear
                onSearch={onSearch}
              />
            </div>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </nav>
  );
};

export default NavBar;


