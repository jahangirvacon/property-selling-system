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
import Upcoming from "./components/Upcoming/UpcomingEvents"
import Testing from "./components/testing/Details"
import DirectBookingTesting from "./components/testing/TestingDetails"
import UpcomingEvents from "./components/Upcoming/UpcomingEvents"
import ActivityFeed from "./components/Upcoming/ActivityFeed"
import Details from "./components/testing/Details"
import TestingDetails from "./components/testing/TestingDetails"
import Gurdwara from "./components/Gurdwara/Gurdwara"
import Dashboard from "./components/Dashboard/Dashboard"
import AddGurdwara from "./components/Gurdwara/AddGurdwara"
import AddEvents from "./components/Events/AddEvents"
import AddHalls from "./components/Hall/AddHalls"
import AddPrice from "./components/Price/AddPrice"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EventList from "./components/Events/EventList"
import HallList from "./components/Hall/HallList"

function App() {
  const topics = [
    { 
      text: "Dashboard",
      link: "dashboard",
      icon: <DashboardOutlined /> },
    { 
      text: "Booking", 
      link: "booking",
      icon: <CalendarOutlined /> 
    },
    {
      text: "Settings",
      icon: <SettingOutlined />,
      subMenu: [
        {
          text: "Gurdwara",
          link: "gurdwara",
          icon: <CalendarOutlined />,
        },
        {
          text: "Hall",
          link: "hall",
          icon: <CalendarOutlined />,
        },
        {
          text: "EventType",
          link: "event",
          icon: <CalendarOutlined />,
        },
      ],
    },
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
      <BrowserRouter>
        <NavBar menu={Menu} />
        <Layout>
          <SideBar menu={Menu} />
          <Layout.Content className="content">
            {/* {topics[contentIndex]} */}
            {/* <Gurdwara />
          <AddGurdwara /> */}
            {/* <EventList/>
          <AddEvents/> */}

            {/* <HallList/>
          <AddHalls/> */}

            {/* <AddPrice/>   */}

            {/* <Booking />
          <BookingForm /> */}
            {/* <UpcomingEvents/>  */}
            {/* <ActivityFeed/>  */}
            {/* <Details/>  */}
            {/* <TestingDetails/> */}

            {/* Routing */}

            <Routes>
              <Route path="/">
                <Route index element={<Dashboard />} />
                <Route path="booking" element={<Booking />} />
                <Route path="details" element={<Details />} />
                <Route path="gurdwara" element={<Gurdwara />} />
                <Route path="hall" element={<HallList />} />
                <Route path="event" element={<EventList />} />
              </Route>
            </Routes>
          </Layout.Content>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
