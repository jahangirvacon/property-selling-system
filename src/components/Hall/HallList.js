import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import "./Hall.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { getHallList, deleteHall } from "../../api"
import AddHalls from "./AddHalls"

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
const columns = removeHall => [
  {
    title: "Hall Name",
    dataIndex: "hallName",
  },
  {
    title: "Gurdwara",
    dataIndex: "gurdwara",
  },
  {
    title: "Working Hours",
    dataIndex: "duration",
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <Space size="middle">
        <Button type="danger" size="small" onClick={() => removeHall(id)}>
          Delete
        </Button>
      </Space>
    ),
  }
]


function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const HallList = () => {
  // Hooks used in 
  const [hallList, setHallList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    populateTable()
  },[])


  const removeHall = async (hallId) => {
    setIsLoading(true)
    await deleteHall(hallId)
    populateTable()
  } 

  // Function 
  const populateTable = async () => {
    setIsLoading(true)
    const { response } = await getHallList()
    setHallList(response.map(hall => ({
        id: hall._id,
        gurdwara:hall.gurdwara.title,
        hallCount:hall.halls,
        duration:`${hall.openingTime} - ${hall.closingTime}`,
        hallName:hall.title,
      })
    ))
    setIsLoading(false)
  }

  return (
    <div>
      <Row>
        <Col span={8}>
          <h1 className="bookingHeader">Hall List</h1>
        </Col>
        <Col span={8} offset={8} className="addGurdwara">
          <AddHalls refresh={populateTable}/>
          {/* <Button className="GurdwaraBtn">Add Hall</Button> */}
        </Col>
      </Row>
      {/* <Row>
        <Col span={24}>
          <div className="bookingElement">
            <div className="searc">
              <Space direction="vertical">
                <Search placeholder="Search here..." onSearch={onSearch} style={{ width: 250,height:45 }} />
              </Space>
            </div>
            <div className="datesetter">
              <input type="date" id="start" name="trip-start" placeholder="Start Date" style={{ width: 200,height:45 }} />
            </div>
            <div className="datesetter">
              <input type="date" id="start" name="trip-start" placeholder="End Date" style={{ width: 200,height:45 }} />
            </div>
           
          </div>
        </Col>
      </Row> */}

      <Row className="bookingTable">
        <Col span={24}>
          <Table columns={columns(removeHall)} dataSource={hallList} onChange={onChange} loading={isLoading} />
        </Col>
      </Row>
    </div>
  )
}
export default HallList;
