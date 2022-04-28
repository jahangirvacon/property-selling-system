import React from "react";
import "./Price.css";
import { Button, Input } from "antd";
import { Modal } from "antd";
import { Row, Col } from "antd";
import { useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { DownOutlined } from "@ant-design/icons";

//
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const AddPrice = () => {
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
            <h2 className="bookingFormHeading">Add Price</h2>
          </Col>
        </Row>
        <Row>
        <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Gurdwara</h5>
              {/* <Input placeholder="Hall" /> */}
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
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Hall</h5>
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
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Event</h5>
              {/* <Input placeholder="Hall" /> */}
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
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Price</h5>
              <Input placeholder="Basic usage" disabled />
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default AddPrice;
