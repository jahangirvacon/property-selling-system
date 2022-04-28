import React from "react";
import {Menu, Row, Col} from "antd";
import {DashboardOutlined} from "@ant-design/icons"
import './TopicMenu.css'

const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  const getMenuItem = (topic) => {
    if(topic.subMenu){
      return (
        <Menu.SubMenu title={<div>{topic.icon}{topic.text}</div>}>
          {topic.subMenu.map(option => 
            <Menu.Item className="topics" key={option.text} onClick={changeSelectedKey}>
              {option.icon}{option.text}
            </Menu.Item>
          )}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item className="topics" key={topic.text} onClick={changeSelectedKey}>
          {topic.icon}{topic.text}
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
