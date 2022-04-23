import React from "react";
import {Menu} from "antd";

const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item style={{ width: 200,height:75 }} key={index} onClick={changeSelectedKey}>
        {topic}
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
