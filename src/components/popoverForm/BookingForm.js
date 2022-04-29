import React, { useState, useEffect } from "react";
import "./BookingForm.css";
import { Button, Input } from "antd";
import { Modal } from "antd";
import { Row, Col } from "antd";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { DownOutlined } from "@ant-design/icons";
import { addBooking, getGurdwaraList, getGurdwaraHalls, getHallEvents } from "../../api"
import useFormHandler from "../../hooks/form/form-handler"


//
const { Option } = Select;

const BookingForm = () => {
  const [gurdwaraListSelection, setGurdwaraListSelection] = useState([]);
  const [hallListSelection, setHallListSelection] = useState([]);
  const [eventTypeListSelection, setEventTypeListSelection] = useState([]);
  const [eventTypeList, setEventTypeList] = useState([]);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    populateGurdwaraList()
  },[])
  
  useEffect(() => {
    populateEventTypePrice(eventTypeList.length > 0 ? eventTypeList[0]._id : '')
    if(eventTypeList.length > 0){
    } else {

    }
  },[eventTypeList])

  const populateGurdwaraList = async () => {
    const { response } = await getGurdwaraList()
    setGurdwaraListSelection(response.map(gurdwara => ({id: gurdwara._id, displayText: gurdwara.title})))
    if(response.length > 0){
      populateHallList(response[0]._id)
    }
  }
  
  const populateHallList = async (selectedGurdwaraId) => {
    const { response } = await getGurdwaraHalls(selectedGurdwaraId)
    setHallListSelection(response.map(hall => ({id: hall._id, displayText: hall.title})))
    UpdateFormValue('gurdwara',selectedGurdwaraId)
    if(response.length > 0){
      populateEventTypeList(response[0]._id)
    }
  }

  const populateEventTypeList = async (selectedHallId) => {
    const { response } = await getHallEvents(selectedHallId)
    setEventTypeListSelection(response.map(eventType => ({id: eventType._id, displayText: eventType.eventType.title})))
    setEventTypeList(response)
    UpdateFormValue('hall', selectedHallId)
    // if(response.length === 0){
    //   UpdateFormValue('eventType', '')
    // }
  }
  
  const populateEventTypePrice = async (selectedEventTypeId) => {
    UpdateFormValue('hallEvent', selectedEventTypeId)
    const selectedEvent = eventTypeList.find(eventType => eventType._id === selectedEventTypeId)
    UpdateFormValue('price', selectedEvent? selectedEvent.charges : 0)
  }

  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await addBooking({
      ...inputs,
      available: true, 
      startTime: 'abc',
      endTime: "def"
  })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { inputs, formErrors, handleInputChange, UpdateFormValue, handleSubmit, setErrors } = useFormHandler(
    {
      guest: "",
      gurdwara: "",
      hall: "",
      hallEvent: "",
      eventType: "",
      price: "",
      bookingDate:"",
      timeSlot: ""
    },
    handleOk
  )

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
        <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>,
      ]}
      >
        <form onSubmit={handleSubmit}>
        <Row>
          <Col span={12}>
            <h2 className="bookingFormHeading">Enter Booking</h2>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Customer Name</h5>
              <Input onChange={handleInputChange} value={inputs.guest} name="guest" placeholder="Enter Name" />
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Gurdwara</h5>
              {/* <Input placeholder="Gurdwara" /> */}
              <Select
                style={{ width: 182 }}
                onChange={populateHallList} 
                value={inputs.gurdwara} 
                name="gurdwara"
              >
                {gurdwaraListSelection.map(gurdwara => <Option value={gurdwara.id}>{gurdwara.displayText}</Option>)}
              </Select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Hall</h5>
              {/* <Input placeholder="Hall" /> */}
              <Select
                style={{ width: 182 }}
                onChange={populateEventTypeList} 
                value={inputs.hall} 
                name="hall"
              >
                {hallListSelection.map(hall => <Option value={hall.id}>{hall.displayText}</Option>)}
              </Select>
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Event Type</h5>
              {/* <Input placeholder="Type" /> */}
              <Select
                defaultValue="yiminghe"
                style={{ width: 182 }}
                onChange={populateEventTypePrice} 
                value={inputs.hallEvent} 
                name="hallEvent"
              >
                {eventTypeListSelection.map(eventType => <Option value={eventType.id}>{eventType.displayText}</Option>)}
              </Select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Price</h5>
               <Input placeholder="Price" onChange={handleInputChange} value={inputs.price} name="price" disabled /> 
             
            </div>
          </Col>
          <Col span={10} offset={2}>
            <div className="formData">
              <h5 className="formHeader">Date</h5>
              <Input placeholder="Booking Date" onChange={handleInputChange} value={inputs.bookingDate} name="bookingDate" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <div className="formData">
              <h5 className="formHeader">Time Slot</h5>
              <Input placeholder="Time Slot" onChange={handleInputChange} value={inputs.timeSlot} name="timeSlot"/>
            </div>
          </Col>
        </Row>

        {/* <Row>
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
            <Button className="BookingBtns">Save</Button>
            <Button className="BookingBtns" onClick={myfunction}>
              <DownOutlined />
            </Button>
            <Button className="discardBtns">Discard</Button>
            <p>{data}</p>
          </Col>
        </Row> */}
        </form>
      </Modal>
    </div>
  );
};
export default BookingForm;
