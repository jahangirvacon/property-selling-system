import React, { useState } from "react";
import { Layout } from "antd";
import TopicMenu from "./components/TopicMenu";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Booking from "./components/Booking/Booking";
import {
  DashboardOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Form from "./components/popoverForm/BookingForm";
import BookingForm from "./components/popoverForm/BookingForm";
import Upcoming from "./components/Upcoming/UpcomingEvents";
import Testing from "./components/testing/Details";
import DirectBookingTesting from "./components/testing/TestingDetails";
import UpcomingEvents from "./components/Upcoming/UpcomingEvents";
import ActivityFeed from "./components/Upcoming/ActivityFeed";
import Details from "./components/testing/Details";
import TestingDetails from "./components/testing/TestingDetails";

function App() {
  const topics = [
    { text: "Dashboard", icon: <DashboardOutlined /> },
    { text: "Booking", icon: <CalendarOutlined /> },
    { 
      text: "Settings", 
      icon: <SettingOutlined />,
      subMenu: [
        { text: "Gurdwara", icon: <CalendarOutlined /> },
        { text: "Hall", icon: <CalendarOutlined /> },
        { text: "EventType", icon: <CalendarOutlined /> },
      ] 
    },

  ];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div className="App">
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {/* {topics[contentIndex]} */}
          <Booking />
          <BookingForm />
          {/* <UpcomingEvents/>  */}
           {/* <ActivityFeed/>  */}
           {/* <Details/>  */}
          {/* <TestingDetails/> */}
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
