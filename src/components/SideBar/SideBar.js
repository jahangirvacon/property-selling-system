import React, { useState } from "react";
import { Col, Layout,Row } from "antd";
import "./SideBar.css"
import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const SideBar = ({ menu, update }) => {
  return (
    <Layout.Sider
      // className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={60}
      trigger={null}
      collapsible collapsed={update}
      width={190}
    >
      {menu}
    </Layout.Sider>
   
  );
};

export default SideBar;