import React, { useState, useEffect } from "react"
import "./Hall.css"
import { Button, Input } from "antd"
import { Modal } from "antd"
import { Row, Col } from "antd"
import { Spin, TimePicker } from "antd"
import debounce from "lodash/debounce"
import { DownOutlined } from "@ant-design/icons"
import { DatePicker, Space } from "antd"
import useFormHandler from "../../hooks/form/form-handler"
import { getEventList, getGurdwaraList, addHall } from "../../api"
import { TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import moment from "moment"

const { RangePicker } = DatePicker

const { Option } = Select

function handleChange(value) {
  console.log(`selected ${value}`)
}

const AddHalls = ({ refresh }) => {
  const [gurdwaraListSelection, setGurdwaraListSelection] = useState([])
  const [eventTypeListSelection, setEventTypeListSelection] = useState([])
  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    populateGurdwaraList()
    populateEventTypeList()
  }, [])

  const populateGurdwaraList = async () => {
    const { response } = await getGurdwaraList()
    setGurdwaraListSelection(response.map((gurdwara) => ({ id: gurdwara._id, displayText: gurdwara.title })))
    if(response.length > 0){
      UpdateFormValue("gurdwara",response[0]._id)
    }
  }

  const populateEventTypeList = async () => {
    const { response } = await getEventList()
    setEventTypeListSelection(response.map((event) => ({ id: event._id, displayText: event.title })))
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    const res = await addHall({
      ...inputs,
      available: true,
    })
    setIsModalVisible(false)
    refresh()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { inputs, formErrors, handleInputChange, UpdateFormValue, handleSubmit, setErrors } = useFormHandler(
    {
      title: "",
      gurdwara: "",
      openingTime: "",
      closingTime: "",
      eventIds: "",
    },
    handleOk
  )

  return (
    <div>
      <Button type="primary" onClick={showModal} className="addHall">
        Add Hall
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
           <Row align="start">
           <Col md={5}  sm={5} xs={5}>
             <Button key="submit" onClick={handleOk} style={{ background: "#28e086", color: "black", borderColor: "#28e086" }}>Save</Button>
           </Col>
           <Col md={1}></Col>
           <Col md={5}  sm={5} xs={5}>
             <Button key="back" onClick={handleCancel} style={{ background: "white", color: "blue", borderColor: "blue" }}>Return</Button>
           </Col>
         </Row>
        ]}
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col span={12}>
              <h2 className="bookingFormHeading">Add Hall</h2>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="formData">
                {/* <h5 className="formHeader">Hall Name</h5>
                <Input placeholder="Enter Name" onChange={handleInputChange} value={inputs.title} name="title" /> */}
                <TextField id="outlined-size-small" variant="outlined" defaultValue="Small" size="small" label="Hall Name" onChange={handleInputChange} value={inputs.title} name="title" />
              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                {/* <h5 className="formHeader">Gurdwara</h5>
                <Select style={{ width: 182 }} value={inputs.gurdwara} onChange={(val) => UpdateFormValue("gurdwara", val)}>
                  {gurdwaraListSelection.map((gurdwara) => (
                    <Option value={gurdwara.id}>{gurdwara.displayText}</Option>
                  ))}
                </Select> */}
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
          </Row>

          <Row>
            <Col span={24}>
              <div className="formData">
                <h5 className="formHeader"> Timing</h5>
                <Input.Group compact>
                  <TimePicker
                    style={{ width: 195, textAlign: "start" }}
                    showNow={false}
                    placeholder="Opening Time"
                    format="HH"
                    // value={inputs.openingTime}
                    minuteStep={30}
                    onChange={(time, timeString) => UpdateFormValue("openingTime", timeString)}
                  />
                  {/* <Input
                  style={{ width: 195, textAlign: "start" }}
                  placeholder="Opening"
                  onChange={handleInputChange} value={inputs.openingTime} name="openingTime"
                /> */}
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

                  <TimePicker
                    style={{ width: 195, textAlign: "start" }}
                    showNow={false}
                    placeholder="Closing Time"
                    format="HH"
                    // value={inputs.closingTime}
                    minuteStep={30}
                    onChange={(time, timeString) => UpdateFormValue("closingTime", timeString)}
                  />
                  {/* <Input
                  className="site-input-right"
                  style={{
                    width: 195,
                    textAlign: "start",
                  }}
                  placeholder="Closing"
                  onChange={handleInputChange} value={inputs.closingTime} name="closingTime"
                /> */}
                </Input.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="formData">
                {/* <h5 className="formHeader">Event Type</h5>
                <Select mode="multiple" style={{ width: 418 }} onChange={(val) => UpdateFormValue("eventIds", val)}>
                  {eventTypeListSelection.map((event) => (
                    <Option value={event.id}>{event.displayText}</Option>
                  ))}
                </Select> */}
                  <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }} size="small">
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
          </Row>
        </form>
      </Modal>
    </div>
  )
}
export default AddHalls
