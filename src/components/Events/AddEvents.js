import React from "react"
import "./Events.css"
import { Button, Input, TimePicker } from "antd"
import { Modal } from "antd"
import { Row, Col } from "antd"
import { useState } from "react"
import {  Spin } from "antd"
import debounce from "lodash/debounce"
import { DownOutlined } from "@ant-design/icons"
import { DatePicker, Space } from "antd"
import useFormHandler from "../../hooks/form/form-handler"
import { addEventType } from "../../api"
import { TextField, Select, FormControl, InputLabel } from '@material-ui/core';

const { RangePicker } = DatePicker

const { Option } = Select

const AddEvents = ({ refresh }) => {
  const [data, setData] = useState()

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    await addEventType({
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
      category: "Prayer",
      duration: "",
    },
    handleOk
  )

  return (
    <div>
      <Button type="primary" onClick={showModal} className="addBtn">
        Add Event
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
              <h2 className="bookingFormHeading">Add Event</h2>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="formData">
                {/* <h5 className="formHeader"> Name</h5>
                <Input placeholder="Event Name" onChange={handleInputChange} value={inputs.title} name="title" /> */}
                <TextField id="outlined-size-small"  variant="outlined" size="small" label="Name" onChange={handleInputChange} value={inputs.title} name="title"/>
              </div>
            </Col>
            <Col span={10} offset={2}>
              <div className="formData">
                <h5 className="formHeader">Duration Hours</h5>
                <TimePicker
                  style={{ width: 195, textAlign: "start" }}
                  showNow={false}
                  placeholder="Duration Hours"
                  format="HH"
                  // value={inputs.closingTime}
                  minuteStep={30}
                  onChange={(time, timeString) => UpdateFormValue("duration", timeString)}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={10}>
              <div className="formData">
                {/* <h5 className="formHeader">Category</h5>
                <Select style={{ width: 182 }} defaultValue="Prayer" onChange={(val) => UpdateFormValue("category", val)}>
                  <Option value="Prayer">Prayer</Option>
                  <Option value="Wedding">Wedding</Option>
                </Select> */}
                <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                      <Select
                        native

                        label="Category"
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
export default AddEvents
