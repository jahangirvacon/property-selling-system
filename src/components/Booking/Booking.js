import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBookingList } from "../../redux/thunk"
import { Row, Col } from "antd"
import "./booking.css"
import { Input, Space, Typography, Button } from "antd"
import { AudioOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { getBookingList, deleteBooking } from "../../api"
import { useNavigate } from "react-router-dom"
import moment from "moment"

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
const columns = (removeBooking, navigateToDetails) => [
  {
    title: "Arrival",
    dataIndex: "bookingDate",
  },
  {
    title: "Slot",
    dataIndex: "slot",
    // sorter: {
    //   compare: (a, b) => a.chinese - b.chinese,
    //   multiple: 3,
    // },
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Guest",
    dataIndex: "guestCount",
    render: (guest) => (
      <Space size="middle">
        <a> {guest} </a>{" "}
      </Space>
    ),
  },
  {
    title: "Portal",
    dataIndex: "portal",
    render: (portal) => (
      <Space size="middle">
        <Text className="td-portal" mark>
          {" "}
          {portal}{" "}
        </Text>{" "}
      </Space>
    ),
  },
  {
    title: "Event",
    dataIndex: "event",
    render: (event) => (
      <Space size="middle">
        <Text className="td-event" mark>
          {" "}
          {event}{" "}
        </Text>{" "}
      </Space>
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (statusText) => (
      <Space size="middle">
        <Button type="primary" size="small">
          {" "}
          {statusText}{" "}
        </Button>{" "}
      </Space>
    ),
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <Space size="middle">
        <Button type="warn" size="small" onClick={() => navigateToDetails(id)}>
          Details{" "}
        </Button>{" "}
        <Button type="danger" size="small" onClick={() => removeBooking(id)}>
          Delete{" "}
        </Button>{" "}
      </Space>
    ),
  },
]

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra)
}

const Booking = () => {
  const navigate = useNavigate()

  const [bookingList, setBookingList] = useState([])
  const isLoading = useSelector((state) => state.isLoading)
  const bookings = useSelector((state) => state.bookingList)

  useEffect(() => {
    populateTable()
  }, [bookings])

  const dispatch = useDispatch()

  const navigateToDetails = (id) => {
    navigate("/bookingDetail?id=" + id)
  }

  const populateTable = async () => {
    setBookingList(
      bookings.map((booking) => ({
        id: booking._id,
        bookingDate: moment(booking.bookingDate).format("YYYY/MM/DD"),
        slot: `${booking.startTime} - ${booking.endTime}`,
        name: booking.guest,
        guestCount: booking.guestCount,
        portal: `${booking.hallEvent.hall.title}, ${booking.hallEvent.hall.gurdwara.title}`,
        event: booking.hallEvent.eventType.title,
        createdAt: moment(booking.createdAt).format("YYYY/MM/DD kk:mm:ss"),
        status: "Booked",
      }))
    )
  }

  const removeBooking = async (id) => {
    await deleteBooking(id)
    dispatch(fetchBookingList)
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <h1 className="bookingHeader"> Bookings </h1>{" "}
        </Col>{" "}
      </Row>{" "}
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
          <Table columns={columns(removeBooking, navigateToDetails)} dataSource={bookingList} onChange={onChange} loading={isLoading}  scroll={{
      x: 1100,
    }}/>
        </Col>{" "}
      </Row>{" "}
    </div>
  )
}
export default Booking
