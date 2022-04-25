import React, { useState } from "react"
import { Typography, Drawer, Button } from "antd"
import { CalendarOutlined, MenuOutlined, TeamOutlined } from "@ant-design/icons"
import "./NavBar.css"
const {Text} = Typography
const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className="navbar">
      <Button className="menu" type="primary" icon={<MenuOutlined />} onClick={() => setVisible(true)} />
      <Drawer title="Topics" placement="left" onClick={() => setVisible(false)} onClose={() => setVisible(false)} visible={visible}>
        {menu}
      </Drawer>
      <div className="navbarStyling">
        <h1 className="logoStyling"> Smoobu</h1>
        <Button type="ghost" className="bookingBtn">
          {" "}
          <CalendarOutlined />
          Enter Booking
        </Button>
        <div className="user">
        <TeamOutlined />
        <Text strong> Balwinder Singh </Text>
        </div>
        {/* <Button></Button> */}
      </div>
      {/* <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a> */}
    </nav>
  )
}

export default NavBar
