import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import "./Gurdwara.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { getGurdwaraList, deleteGurdwara } from "../../api"
import AddGurdwara from "./AddGurdwara"

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
const columns = (removeGurdwara) => [
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Address",
    dataIndex: "location",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Contact",
    dataIndex: "contact",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <Space size="middle">
        {/* <Button type="warn" size="small">
          Update
        </Button> */}
        <Button type="danger" size="small" onClick={() => removeGurdwara(id)}>
          Delete
        </Button>
      </Space>
    ),
  }
  
]


function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const Gurdwara = () => {

  // Hooks used in 
  const [gurdwaraList, setGurdwaraList] = useState([])
  useEffect(() => {
    populateTable()
  },[])

  const removeGurdwara = async (gurdwaraId) => {
    await deleteGurdwara(gurdwaraId)
    populateTable()
  } 

  // Function 
  const populateTable = async () => {
    const { response } = await getGurdwaraList()
    setGurdwaraList(response.map(gurdwara => ({
        id: gurdwara._id,
        title:gurdwara.title,
        location:gurdwara.location,
        contact: gurdwara.contact,
        email: gurdwara.email
      })
    ))
  }

  return (
    <div>
      <Row>
        <Col span={8}>
          <h1 className="bookingHeader">Gurdwara List</h1>
        </Col>
        <Col span={8} offset={8} className="addGurdwara">
          <AddGurdwara refresh={populateTable}/>
          {/* <Button className="GurdwaraBtn">Add Gurdwara</Button> */}
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
          <Table columns={columns(removeGurdwara)} dataSource={gurdwaraList} onChange={onChange} />
        </Col>
      </Row>
    </div>
  )
}
export default Gurdwara;
