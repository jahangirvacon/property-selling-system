import React from "react";
import "./style.css"
import { Modal } from 'antd';
import { Row, Col } from 'antd';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { DownOutlined } from "@ant-design/icons";
const BookingForm = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [data, setData] = useState();
  const myfunction = () => {

    setData(<p>Create an offer/Quatation (Does not block calendar)</p>)
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
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
      <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Row>
        <Col span={12}>
          <h2 className="bookingFormHeading">Enter Booking</h2>
        </Col>
      </Row>
      <Row>
        <Col span={24} >


          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            
            <Form.Item label="Customer">
              <Input />
            </Form.Item>
            <Form.Item label="Gurdwara">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Hall">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Event Type">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="Price">
              <InputNumber />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Time Slot">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <h2 className="bookingFormHeading">Price</h2>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <h2 className="bookingFormHeading">Details</h2>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Button className="BookingBtns" >Save</Button>
          <Button className="BookingBtns" onClick={myfunction} ><DownOutlined /></Button>
          <Button className="discardBtns" >Discard</Button>
          <p>{data}</p>
        </Col>
      </Row>

       
      </Modal>

     
    </div>
  );

}
export default BookingForm