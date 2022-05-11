import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Calendar, Badge, Tabs, Select, List } from "antd"
import UpcomingEvents from "../Upcoming/UpcomingEvents"
import "./Dashboard.css"
import moment from "moment"
import { getGurdwaraHalls } from "../../api"

const { TabPane } = Tabs
const { Option } = Select

const Dashboard = () => {
  const [bookingList, setBookingList] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedDateBookings, setSelectedDateBookings] = useState([])
  const [dateMode, setDateMode] = useState(moment())
  const bookings = useSelector((state) => state.bookingList)
  const [hallListSelection, setHallListSelection] = useState([])
  const [hallDetails, setHallDetails] = useState([])

  useEffect(() => {
    getData(bookings)
  }, [bookings])

  useEffect(() => {
    setSelectedDateBookings(bookingList.filter((booking) => moment(booking.bookingDate).isSame(moment(selectedDate), "day")))
    // getData()
  }, [selectedDate])

  useEffect(() => {
    populateHallList()
  }, [])

  const getData = (bookings) => {
    const gurdWaraBookings = bookings.map((booking) => ({
      id: booking._id,
      bookingDate: booking.bookingDate,
      guest: booking.guest,
      startTime: booking.startTime,
      endTime: booking.endTime,
      slot: `${booking.startTime} - ${booking.endTime}`,
      name: booking.guest,
      guestCount: booking.guestCount,
      portal: booking.hallEvent.hall.gurdwara.title,
      event: booking.hallEvent.eventType.title,
      createdAt: moment(booking.createdAt),
      hallId: booking.hallEvent.hall._id,
    }))
    setBookingList(gurdWaraBookings)
    setSelectedDateBookings(
      gurdWaraBookings.filter((booking) => moment(booking.bookingDate).isBetween(moment().subtract(1, "days"), moment().add(8, "days"), "day"))
    )
    detailedViewData(gurdWaraBookings)
  }

  const detailedViewData = (gurdWaraBookings) => {
    setHallDetails(
      hallListSelection.forEach((hall) => ({
        hall,
        bookings: gurdWaraBookings.filter((booking) => booking.hallId === hall._id),
      }))
    )
  }

  const filterHallBookings = (hallId) => {
    let filteredBookings = bookings
    if (hallId !== "ALL") {
      filteredBookings = bookings.filter((booking) => booking.hallEvent.hall._id === hallId)
    }
    getData(filteredBookings)
  }

  const populateHallList = async () => {
    const { response } = await getGurdwaraHalls("62700a29602540134f2d5bae")
    setHallListSelection(response.map((hall) => ({ id: hall._id, displayText: hall.title })))
  }

  const dateCellRender = (value) => {
    const listData = bookingList.filter((booking) => moment(booking.bookingDate).isSame(value, "day"))
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={item.event} />
          </li>
        ))}
      </ul>
    )
  }

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394
    }
  }

  const monthCellRender = (value) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const onSelect = (value) => {
    setSelectedDate(value)
  }

  const onPanelChange = (date, mode) => {
    console.log(date, mode)
  }


  const operations = (
    <Select style={{ width: 200 }} onChange={filterHallBookings} defaultValue="ALL">
      <Option value="ALL">All</Option>
      {hallListSelection.map((hall) => (
        <Option value={hall.id}>{hall.displayText}</Option>
      ))}
    </Select>
  )

  const getHallDetailedView = (hall) => {
    // const startDate = moment()
    const endDate = moment().add(1, "months")
    let counter = moment()
    const view = []
    while (moment(counter).isBefore(endDate)) {
      const filtered = bookingList.filter((booking) => moment(counter).isSame(booking.bookingDate, "day") && hall.id === booking.hallId)
      view.push(
        <p>
          <Badge style={{ backgroundColor: "#1890ff" }} count={filtered.length} />
          {moment(counter).format("MMMM D")}
        </p>
      )
      counter = moment(counter).add(1, "days")
    }
    return view
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Tabs defaultActiveKey="1" onChange={() => filterHallBookings("ALL")} tabBarExtraContent={operations}>
            <TabPane tab="Default" key="default">
              <Calendar
                style={{ padding: 10 }}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
              />
            </TabPane>
            <TabPane tab="Detailed" key="detailed">
              <List
                itemLayout="horizontal"
                dataSource={hallListSelection}
                renderItem={(hall) => (
                  <List.Item>
                    <div>{getHallDetailedView(hall)}</div>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={6}>
          <UpcomingEvents bookings={selectedDateBookings} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
