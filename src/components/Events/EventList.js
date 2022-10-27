import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import "./Events.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { getEventList } from "../../api"
import AddEvents from "./AddEvents"


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
    title: "Event Name",
    dataIndex: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Event Category",
    dataIndex: "category",
    sorter: (a, b) => a.category - b.category,  
  },
  {
    title: "Event Duration",
    dataIndex: "duration",
    sorter: (a, b) => a.duration - b.duration, 
  },
  // {
  //   title: "Action",
  //   dataIndex: "id",
  //   render: (id) => (
  //     <Space size="middle">
  //       <Button type="warn" size="small">
  //         Update
  //       </Button>
  //       <Button type="danger" size="small">
  //         Delete
  //       </Button>
  //     </Space>
  //   ),
  // }
  
]

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const EventList = () => {
// Hooks used in 
  const [eventList, setEventList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    populateTable()
  },[])

  // Function 
  const populateTable = async () => {
    setIsLoading(true)
    const { response } = await getEventList()
    setEventList(response.map(event => ({
        id: event._id,
        name:event.title,
        category:event.category,
        duration:event.duration,
      })
    ))
    setIsLoading(false)
  }


  return (
    <div>
      <Row>
        <Col span={8}>
          <h1 className="bookingHeader">Event List</h1>
        </Col>
        <Col span={8} offset={8} className="addGurdwara">
          <AddEvents refresh={populateTable}/>
          {/* <Button className="GurdwaraBtn">Add Event</Button> */}
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
          <Table columns={columns} scroll={{
     x: 1100,
    }}  dataSource={eventList} onChange={onChange} loading={isLoading}  
  />
        </Col>
      </Row>
    </div>
  )
}
export default EventList;
