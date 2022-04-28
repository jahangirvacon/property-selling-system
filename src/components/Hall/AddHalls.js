import React from "react";
import "./Hall.css";
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

const AddHalls = () => {
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
            <h2 className="bookingFormHeading">Add Halls</h2>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Hall Name</h5>
              <Input placeholder="Enter Name" />
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Gurdwara</h5>
              {/* <Input placeholder="Gurdwara" /> */}
              <Select
                defaultValue="Gurdwara"
                style={{ width: 182 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="formData">
              <h5 className="formHeader"> Timing</h5>
              <Input.Group compact>
                <Input
                  style={{ width: 195, textAlign: "start" }}
                  placeholder="Opening"
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: "none",
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  className="site-input-right"
                  style={{
                    width: 195,
                    textAlign: "start",
                  }}
                  placeholder="Closing"
                />
              </Input.Group>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Event Type</h5>
              <Select
                mode="multiple"
                defaultValue="Gurdwara"
                style={{ width: 182 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default AddHalls;
