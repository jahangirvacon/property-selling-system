import React from "react";
import "./Events.css";
import { Button, Input } from "antd";
import { Modal } from "antd";
import { Row, Col } from "antd";
import { useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { DownOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

//
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const AddEvents = () => {
  const [data, setData] = useState();
  const myfunction = () => {
    setData(<p>Create an offer/Quatation (Does not block calendar)</p>);
  };

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Row>
          <Col span={12}>
            <h2 className="bookingFormHeading">Add Events</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="formData">
              <h5 className="formHeader">Event Name</h5>
              <Input placeholder="Enter Name" />
            </div>
          </Col>
          <Col span={24}>
            <div className="formData">
              <h5 className="formHeader">Event Duration</h5>

              <Space direction=" " size={6}>
                <RangePicker />
                <RangePicker showTime />
              </Space>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default AddEvents;
