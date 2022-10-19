import React from "react";
import { Link } from "react-router-dom"
import { Menu, Row, Col } from "antd";
import { DashboardOutlined } from "@ant-design/icons"
import './TopicMenu.css'

const TopicMenu = ({ topics, selectedKey, changeSelectedKey, update }) => {
  const styledTopics = [];
  const getMenuItem = (topic) => {
    if (topic.subMenu) {
      return (
        <Menu.SubMenu title={<div>{topic.icon}{update ? "" : topic.text}</div>}>
            {topic.subMenu.map(option =>
              <Menu.Item className="topics" key={option.text} onClick={changeSelectedKey}>
                <Link to={option.link}>
                  {option.icon}{update ? "" : option.text}
                </Link>
              </Menu.Item>
            )}  
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item className="topics" key={topic.text} onClick={changeSelectedKey}>
          <Link to={topic.link}>
            {topic.icon}{update ? "" : topic.text}
          </Link>
        </Menu.Item>
      )
    }
  }
  topics.forEach((topic, index) =>
    styledTopics.push(
      getMenuItem(topic)
    )
  );
  // styledTopics.push(
  //   <Menu.SubMenu title="sub menu">
  //     <Menu.Item>item 3</Menu.Item>
  //   </Menu.SubMenu>
  // )

  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}
export default TopicMenu;
