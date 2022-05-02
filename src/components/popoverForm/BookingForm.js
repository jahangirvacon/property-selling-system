import React, { useState, useEffect } from "react"
import "./BookingForm.css"
import { Button, Input } from "antd"
import { Modal } from "antd"
import { Row, Col, Collapse, Switch } from "antd"
import { Select, Spin, DatePicker, TimePicker } from "antd"
import debounce from "lodash/debounce"
import { CaretRightOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { addBooking, getGurdwaraList, getGurdwaraHalls, getHallEvents } from "../../api"
import useFormHandler from "../../hooks/form/form-handler"

//
const { Option } = Select
const { Panel } = Collapse

const BookingForm = () => {
  const [gurdwaraListSelection, setGurdwaraListSelection] = useState([])
  const [hallListSelection, setHallListSelection] = useState([])
  const [eventTypeListSelection, setEventTypeListSelection] = useState([])
  const [eventTypeList, setEventTypeList] = useState([])
  const [isWeddingEvent, setIsWeddingEvent] = useState(false)

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    populateGurdwaraList()
  }, [])

  useEffect(() => {
    populateEventTypePrice(eventTypeList.length > 0 ? eventTypeList[0]._id : "")
    if (eventTypeList.length > 0) {
    } else {
    }
  }, [eventTypeList])

  const populateGurdwaraList = async () => {
    const { response } = await getGurdwaraList()
    setGurdwaraListSelection(response.map((gurdwara) => ({ id: gurdwara._id, displayText: gurdwara.title })))
    if (response.length > 0) {
      populateHallList(response[0]._id)
    }
  }

  const populateHallList = async (selectedGurdwaraId) => {
    const { response } = await getGurdwaraHalls(selectedGurdwaraId)
    setHallListSelection(response.map((hall) => ({ id: hall._id, displayText: hall.title })))
    UpdateFormValue("gurdwara", selectedGurdwaraId)
    if (response.length > 0) {
      populateEventTypeList(response[0]._id)
    }
  }

  const populateEventTypeList = async (selectedHallId) => {
    const { response } = await getHallEvents(selectedHallId)
    setEventTypeListSelection(
      response.map((eventType) => ({
        id: eventType._id,
        displayText: eventType.eventType.title,
      }))
    )
    setEventTypeList(response)
    UpdateFormValue("hall", selectedHallId)
    // if(response.length === 0){
    //   UpdateFormValue('eventType', '')
    // }
  }

  const populateEventTypePrice = async (selectedEventTypeId) => {
    UpdateFormValue("hallEvent", selectedEventTypeId)
    const selectedEvent = eventTypeList.find((eventType) => eventType._id === selectedEventTypeId)
    UpdateFormValue("price", selectedEvent ? selectedEvent.charges : 0)
    setIsWeddingEvent(selectedEvent?.eventType?.category === "Wedding")
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    const {response } = await addBooking({
      ...inputs,
      available: true,
    })
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { inputs, formErrors, handleInputChange, UpdateFormValue, handleSubmit, setErrors } = useFormHandler(
    {
      guest: "",
      postCode: "",
      phoneNumber: "",
      mobileNumber: "",
      email: "",
      address: "",

      gurdwara: "",
      hall: "",
      hallEvent: "",
      eventType: "",
      price: "",
      bookingDate: "",
      timeSlot: "",
      startTime: "",
      endTime: "",

      groomName: "",
      groomFatherName: "",
      groomMotherName: "",
      brideName: "",
      brideFatherName: "",
      brideMotherName: "",
      guestCount: "",
      prashada: true,
    },
    handleOk
  )

  return (
    <div>
      <Button type="primary" style={{ position: "absolute", left: 220 }} onClick={showModal}>
        Add Booking
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
                <Input onChange={handleInputChange} value={inputs.guest} name="guest" placeholder="Customer Name" />
              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                <h5 className="formHeader">Post Code</h5>
                <Input placeholder="Post Code" onChange={handleInputChange} value={inputs.postCode} name="postCode" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="formData">
                <h5 className="formHeader">Phone Number</h5>
                <Input placeholder="Phone Number" onChange={handleInputChange} value={inputs.phoneNumber} name="phoneNumber" />
              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                <h5 className="formHeader">Mobile</h5>
                <Input onChange={handleInputChange} value={inputs.mobileNumber} name="mobileNumber" placeholder="Mobile" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={22}>
              <div className="formData">
                <h5 className="formHeader">Email</h5>
                <Input onChange={handleInputChange} value={inputs.email} name="email" placeholder="Email" />
              </div>
            </Col>
            <Col span={22}>
              <div className="formData">
                <h5 className="formHeader">Address</h5>
                <Input onChange={handleInputChange} value={inputs.address} name="address" placeholder="Address" />
              </div>
            </Col>
          </Row>

          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            <Panel header="Venue" key="1" className="site-collapse-custom-panel">
              <Row>
                <Col span={10}>
                  <div className="formData">
                    <h5 className="formHeader">Gurdwara</h5>
                    {/* <Input placeholder="Gurdwara" /> */}
                    <Select style={{ width: "100%" }} onChange={populateHallList} value={inputs.gurdwara} name="gurdwara">
                      {gurdwaraListSelection.map((gurdwara) => (
                        <Option value={gurdwara.id}>{gurdwara.displayText}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col span={10} offset={2}>
                  <div className="formData">
                    <h5 className="formHeader">Hall</h5>
                    {/* <Input placeholder="Hall" /> */}
                    <Select style={{ width: "100%" }} onChange={populateEventTypeList} value={inputs.hall} name="hall">
                      {hallListSelection.map((hall) => (
                        <Option value={hall.id}>{hall.displayText}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <div className="formData">
                    <h5 className="formHeader">Event Type</h5>
                    {/* <Input placeholder="Type" /> */}
                    <Select
                      defaultValue="yiminghe"
                      style={{ width: "100%" }}
                      onChange={populateEventTypePrice}
                      value={inputs.hallEvent}
                      name="hallEvent"
                    >
                      {eventTypeListSelection.map((eventType) => (
                        <Option value={eventType.id}>{eventType.displayText}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col span={10} offset={2}>
                  <div className="formData">
                    <h5 className="formHeader">Price</h5>
                    <Input placeholder="Price" onChange={handleInputChange} value={inputs.price} name="price" disabled />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <div className="formData">
                    <h5 className="formHeader">Start Time</h5>
                    <TimePicker
                      style={{ width: '100%', textAlign: "start" }}
                      showNow={false}
                      placeholder="Start Time"
                      format="HH"
                      // value={inputs.openingTime}
                      minuteStep={30}
                      onChange={(time, timeString) => UpdateFormValue("startTime", timeString)}
                    />
                  </div>
                </Col>
                <Col span={10} offset={2}>
                  <div className="formData">
                    <h5 className="formHeader">End Time</h5>
                    <TimePicker
                      style={{ width: '100%', textAlign: "start" }}
                      showNow={false}
                      placeholder="End Time"
                      format="HH"
                      // value={inputs.openingTime}
                      minuteStep={30}
                      onChange={(time, timeString) => UpdateFormValue("endTime", timeString)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div className="formData">
                    <h5 className="formHeader">Date</h5>
                    <DatePicker
                      style={{ width: "100%" }}
                      format="MM-DD-YYYY"
                      placeholder="Booking Date"
                      onChange={(val) => UpdateFormValue("bookingDate", val)}
                      value={inputs.bookingDate}
                      name="bookingDate"
                    />
                    {/* <Input placeholder="Booking Date" onChange={handleInputChange} value={inputs.bookingDate} name="bookingDate" /> */}
                  </div>
                </Col>
              </Row>
            </Panel>
            {isWeddingEvent && (
              <Panel header="Wedding Details" key="2" className="site-collapse-custom-panel">
                <Row>
                  <Col span={10}>
                    <div className="formData">
                      <h5 className="formHeader">Groom's Name</h5>
                      <Input onChange={handleInputChange} value={inputs.groomName} name="groomName" placeholder="Groom's Name" />
                    </div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div className="formData">
                      <h5 className="formHeader">Father's Name</h5>
                      <Input placeholder="Father's Name" onChange={handleInputChange} value={inputs.groomFatherName} name="groomFatherName" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <div className="formData">
                      <h5 className="formHeader">Mother's Name</h5>
                      <Input onChange={handleInputChange} value={inputs.groomMotherName} name="groomMotherName" placeholder="Mother's Name" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <div className="formData">
                      <h5 className="formHeader">Bride's Name</h5>
                      <Input onChange={handleInputChange} value={inputs.brideName} name="brideName" placeholder="Bride's Name" />
                    </div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div className="formData">
                      <h5 className="formHeader">Father's Name</h5>
                      <Input placeholder="Father's Name" onChange={handleInputChange} value={inputs.brideFatherName} name="brideFatherName" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <div className="formData">
                      <h5 className="formHeader">Mother's Name</h5>
                      <Input onChange={handleInputChange} value={inputs.brideMotherName} name="brideMotherName" placeholder="Mother's Name" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <div className="formData">
                      <h5 className="formHeader">Guest Count</h5>
                      <Input onChange={handleInputChange} value={inputs.guestCount} name="guestCount" placeholder="Guest Count" />
                    </div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div className="formData">
                      <h5 className="formHeader">Prashada at Gurdwara</h5>
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        onChange={(checked) => UpdateFormValue("prashada", checked)}
                      />
                      {/* <Input placeholder="Post Code" onChange={handleInputChange} value={inputs.postCode} name="postCode" /> */}
                    </div>
                  </Col>
                </Row>
              </Panel>
            )}
          </Collapse>
        </form>
      </Modal>
    </div>
  )
}
export default BookingForm
