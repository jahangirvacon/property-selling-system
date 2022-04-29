import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import "./Hall.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { getHallList } from "../../api"

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
    title: "Gurdwara",
    dataIndex: "gurdwara",
  },
  {
    title: "Working Hours",
    dataIndex: "duration",
  },
  {
    title: "Halls Name",
    dataIndex: "hallName",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "N0 Halls",
    dataIndex: "hallCount",
  },

  
  
]


function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const HallList = () => {
  // Hooks used in 
  const [hallList, setHallList] = useState([])
  useEffect(() => {
    populateTable()
  },[])

  // Function 
  const populateTable = async () => {
    const { response } = await getHallList()
    setHallList(response.map(hall => ({
        id: hall._id,
        gurdwara:hall.gurdwara.title,
        hallCount:hall.halls,
        duration:hall.duration,
        hallName:hall.title,


      })
    ))
  }

  return (
    <div>
      <Row>
        <Col span={8}>
          <h1 className="bookingHeader">Hall List</h1>
        </Col>
        <Col span={8} offset={8} className="addGurdwara">
          <Button className="GurdwaraBtn">Add Hall</Button>
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
          <Table columns={columns} dataSource={hallList} onChange={onChange} />
        </Col>
      </Row>
    </div>
  )
}
export default HallList;
