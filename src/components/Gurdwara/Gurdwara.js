import React from "react"
import { Row, Col } from "antd"
import "./Gurdwara.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"

const { Text } = Typography

const { Search } = Input
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 20,
      color: "#1890ff",
      margin: 6,
    }}
  />
)

const onSearch = (value) => console.log(value)

// Table
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "chinese",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Contact",
    dataIndex: "math",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Email",
    dataIndex: "english",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },

   },
]

const data = [
  {
    key: "1",
    name: "22/2/17",
    chinese: 98,
    math: "Ali",
    english: 70,
    abc: "Portal1",
    def: "22/2/17",
    xyz: "Booked",
  },
  {
    key: "2",
    name: "22/2/17",
    chinese: 98,
    math: "Ahmad",
    english: 89,
    abc: "Portal2",
    def: "22/2/17",
    xyz: "Booked",
  },
  {
    key: "3",
    name: "22/2/17",
    chinese: 98,
    math: "Ahmad",
    english: 70,
    abc: "Portal3",
    def: "22/2/17",
    xyz: "Booked",
  },
  {
    key: "4",
    name: "22/2/17",
    chinese: 88,
    math: "Ahmad",
    english: 89,
    abc: "Portal1",
    def: "22/2/17",
    xyz: "Booked",
  },
]

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const Gurdwara = () => {
  return (
    <div>
      <Row>
        <Col span={8}>
          <h1 className="bookingHeader">Gurdwara List</h1>
        </Col>
        <Col span={8} offset={8} className="addGurdwara">
          <Button className="GurdwaraBtn">Add Gurdwara</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="bookingElement">
            <div className="searc">
              <Space direction="vertical">
                <Search placeholder="Search here..." onSearch={onSearch} style={{ width: 250,height:45 }} />
              </Space>
            </div>
            {/* <div className="datesetter">
              <input type="date" id="start" name="trip-start" placeholder="Start Date" style={{ width: 200,height:45 }} />
            </div>
            <div className="datesetter">
              <input type="date" id="start" name="trip-start" placeholder="End Date" style={{ width: 200,height:45 }} />
            </div> */}
           
          </div>
        </Col>
      </Row>

      <Row className="bookingTable">
        <Col span={24}>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </Col>
      </Row>
    </div>
  )
}
export default Gurdwara;
