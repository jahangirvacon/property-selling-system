import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBookingList } from "../../redux/thunk"
import "./BookingForm.css"
import { Button, Form, Input } from "antd"
import { Modal } from "antd"
import { Row, Col, Collapse, Switch } from "antd"
import { Spin, DatePicker, TimePicker } from "antd"
import debounce from "lodash/debounce"
import { CaretRightOutlined, CheckOutlined, CloseOutlined, CalendarOutlined } from "@ant-design/icons"
import { addBooking, getGurdwaraList, getGurdwaraHalls, getHallEvents } from "../../api"
import useFormHandler from "../../hooks/form/form-handler"
import { TextField, Select, FormControl, InputLabel, FormHelperText } from '@material-ui/core';




import moment from "moment"

//
const { Option } = Select
const { Panel } = Collapse

const BookingForm = () => {
  
  const [gurdwaraListSelection, setGurdwaraListSelection] = useState([])
  const [hallListSelection, setHallListSelection] = useState([])
  const [eventTypeListSelection, setEventTypeListSelection] = useState([])
  const [eventTypeList, setEventTypeList] = useState([])
  const [isWeddingEvent, setIsWeddingEvent] = useState(false)
  const [disabledHours, setDisabledHours] = useState([])
  const dispatch = useDispatch()

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false)

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
    populateGurdwaraList()
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    await addBooking({
      ...inputs,
      available: true,
    })
    dispatch(fetchBookingList)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function range(start, end) {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }

  const getDisabledHours = () => eventTypeList.reduce((acc, curr) => [...acc, ...curr.bookings], [])
    .reduce((acc, curr) => [...acc, ...range(+curr.startTime, +curr.endTime)], [])

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
      <Button className="bookingBtn" onClick={showModal}>
        <CalendarOutlined className="calIcon" />
        <span className="bokBtn">Enter Booking</span>
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[

          <Row  align="start">
            <Col md={5} sm={5} xs={5}>
            <Button key="submit" htmlType="submit" onClick={handleSubmit} style={{background: "#28e086" ,color: "black", borderColor: "#28e086" }}>Save</Button>
            </Col>
          <Col md={1}></Col>
            <Col md={5} sm={5} xs={5}>
            <Button key="back" onClick={handleCancel} style={{background: "white" ,color: "blue", borderColor: "blue" }}>Discard</Button>
            </Col>  
          </Row>
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
              <div className="formData" >
                {/* <h5 className="formHeader">Customer Name</h5> */}
                {/* <Input  onChange={handleInputChange} value={inputs.guest} name="guest" placeholder="Customer Name" height={100}/> */}
                <TextField  id="guest" variant="outlined"  size="small" label="Customer Name" onChange={handleInputChange} value={inputs.guest} name="guest" 
          />
                   
                
                
              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                {/* <h5 className="formHeader">Post Code</h5> */}
                {/* <Input placeholder="Post Code" onChange={handleInputChange} value={inputs.postCode} name="postCode" required  /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Post Code" onChange={handleInputChange} value={inputs.postCode} name="postCode" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="formData">
                {/* <h5 className="formHeader">Phone Number</h5>
                <Input placeholder="Phone Number" onChange={handleInputChange} value={inputs.phoneNumber} name="phoneNumber" /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Phone Number" onChange={handleInputChange} value={inputs.phoneNumber} name="phoneNumber" />

              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                {/* <h5 className="formHeader">Mobile</h5>
                <Input onChange={handleInputChange} value={inputs.mobileNumber} name="mobileNumber" placeholder="Mobile" /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Mobile" onChange={handleInputChange} value={inputs.mobileNumber} name="mobileNumber" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={22}>
              <div className="formData">
                {/* <h5 className="formHeader">Email</h5>
                <Input onChange={handleInputChange} value={inputs.email} name="email" placeholder="Email" /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Email" onChange={handleInputChange} value={inputs.email} name="email" style={{ width: "420px" }} />

              </div>
            </Col>
            <Col span={22}>
              <div className="formData">
                {/* <h5 className="formHeader">Address</h5>
                <Input onChange={handleInputChange} value={inputs.address} name="address" placeholder="Address" /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Address" onChange={handleInputChange} value={inputs.address} name="address" style={{ width: "420px" }} />

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
                    {/* <h5 className="formHeader">Gurdwara</h5> */}
                    {/* <Select style={{ width: "100%" }} onChange={populateHallList} value={inputs.gurdwara} name="gurdwara">
                     {gurdwaraListSelection.map((gurdwara) =>  (
                        <Option value={gurdwara.id}>{gurdwara.displayText}</Option>
                      ))}
                    </Select>      */}
                    <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">Gurdwara</InputLabel>
                      <Select
                        native

                        label="Gurdwara"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                  </div>
                </Col>
                <Col span={10} offset={2}>
                  <div className="formData">
                    {/* <h5 className="formHeader">Hall</h5> */}
                    {/* <Select style={{ width: "100%" }} onChange={populateEventTypeList} value={inputs.hall} name="hall">
                      {hallListSelection.map((hall) => (
                        <Option value={hall.id}>{hall.displayText}</Option>
                      ))}
                    </Select> */}

                    <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">Hall</InputLabel>
                      <Select
                        native

                        label="Hall"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <div className="formData">
                    {/* <h5 className="formHeader">Event Type</h5> */}
                    {/* <Select
                      defaultValue="yiminghe"
                      style={{ width: "100%" }}
                      onChange={populateEventTypePrice}
                      value={inputs.hallEvent}
                      name="hallEvent"
                    >
                      {eventTypeListSelection.map((eventType) => (
                        <Option value={eventType.id}>{eventType.displayText}</Option>
                      ))}
                    </Select> */}
                    <FormControl variant="outlined"size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">Event Type</InputLabel>
                      <Select
                        native
                        label="Event Type"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
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
                    {/* <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      // disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                    /> */}
                    <TimePicker
                      style={{ width: "100%", textAlign: "start" }}
                      disabledHours={getDisabledHours}
                      showNow={false}
                      placeholder="Start Time"
                      format="HH"
                      placement="topLeft"
                      // disabledTime={disabledDateTime}
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
                      style={{ width: "100%", textAlign: "start" }}
                      showNow={false}
                      placeholder="End Time"
                      format="HH"
                      placement="topLeft"
                      disabledHours={getDisabledHours}
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
