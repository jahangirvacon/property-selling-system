import React, { useState } from "react"
import { Layout } from "antd"
import TopicMenu from "./components/TopicMenu"

import "./App.css"

import NavBar from "./components/NavBar/NavBar"
import SideBar from "./components/SideBar/SideBar"
import Booking from "./components/Booking/Booking"
import { DashboardOutlined, CalendarOutlined, SettingOutlined } from "@ant-design/icons"
import Form from "./components/popoverForm/BookingForm"
import BookingForm from "./components/popoverForm/BookingForm"
import Upcoming from "./components/Upcoming/Upcoming"
import Testing from "./components/testing/Testing"
import DirectBookingTesting from "./components/testing/DirectBookingTesting"

function App() {
  const topics = [
    { text: "Dashboard", icon: <DashboardOutlined /> },
    { text: "Booking", icon: <CalendarOutlined /> },
    { text: "Setting", icon: <SettingOutlined /> },
  ]
  const [contentIndex, setContentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState("0")
  const changeSelectedKey = (event) => {
    const key = event.key
    setSelectedKey(key)
    setContentIndex(+key)
  }
  const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} changeSelectedKey={changeSelectedKey} />
  return (
    <div className="App">
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {/* {topics[contentIndex]} */}
          {/* <Booking /> */}
          {/* <BookingForm /> */}
           {/* <Upcoming/>  */}
          {/* <Testing/> */}        
           {/* <DirectBookingTesting/> */}

        </Layout.Content>
      </Layout>
    </div>
  )
}

export default App
