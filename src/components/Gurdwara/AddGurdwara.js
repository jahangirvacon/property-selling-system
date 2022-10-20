import React from "react";
import "./Gurdwara.css";
import { Button, Input } from "antd";
import { Modal } from "antd";
import { Row, Col } from "antd";
import { useState } from "react";
import { Select, Spin } from "antd";
import { addGurdwara } from "../../api"
import useFormHandler from "../../hooks/form/form-handler";

//
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const AddGurdwara = ({refresh}) => {
  const [data, setData] = useState();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await addGurdwara({
      ...inputs,
      available: true, 
  })
    setIsModalVisible(false);
    refresh()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { inputs, formErrors, handleInputChange, UpdateFormValue, handleSubmit, setErrors } = useFormHandler(
    {
      title: "",
      location: "",
      description: "",
      email: "",
    },
    handleOk
  )

  return (
    
    <div>
    
      <Button type="primary" onClick={showModal}>
        Add Gurdwara
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
        <form onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <h2 className="bookingFormHeading">Add Gurdwara</h2>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader"> Name</h5>
              <Input placeholder="Enter Name" value={inputs.title} name="title" onChange={handleInputChange}/>
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Address</h5>
              <Input placeholder="Enter Address" value={inputs.location} name="location" onChange={handleInputChange}/>
            </div>
          </Col>
          
        </Row>
       
          
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Contact</h5>
               <Input placeholder="Enter Contact" value={inputs.contact} name="contact" onChange={handleInputChange} /> 
             
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Email</h5>
              <Input value={inputs.email} name="email" placeholder="Enter Email" type="email" onChange={handleInputChange} />
            </div>
          </Col>
        </Row>
        </form>
      </Modal>
    </div>
  );
};
export default AddGurdwara;
