import React from "react";
import {Menu, Row, Col} from "antd";
import {DashboardOutlined} from "@ant-design/icons"
import './TopicMenu.css'

const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item className="topics" key={index} onClick={changeSelectedKey}>
        {topic.icon}{topic.text}
      </Menu.Item>
    )
  );

  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}
export default TopicMenu;
