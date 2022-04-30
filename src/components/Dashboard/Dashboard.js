import React, { useState, useEffect } from "react"
import { Row, Col, Calendar, Badge } from "antd"
import UpcomingEvents from "../Upcoming/UpcomingEvents"
import "./Dashboard.css"
import moment from "moment"
import { getBookingList } from "../../api"

const Dashboard = () => {
  const [bookingList, setBookingList] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedDateBookings, setSelectedDateBookings] = useState([])
  const [dateMode, setDateMode] = useState(moment())

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    console.log(moment(selectedDate));
    setSelectedDateBookings(bookingList.filter(booking => moment(booking.bookingDate).isSame(moment(selectedDate), 'day')))
    // getData()
  }, [selectedDate])

  const getData = async () => {
    const { response } = await getBookingList()
    setBookingList(
      response.map((booking) => ({
        id: booking._id,
        bookingDate: booking.bookingDate,
        guest: booking.guest,
        startTime: booking.startTime,
        endTime: booking.endTime,
        slot: `${booking.startTime} - ${booking.endTime}`,
        name: booking.guest,
        guestCount: 80,
        portal: booking.hallEvent.hall.gurdwara.title,
        event: booking.hallEvent.eventType.title,
        createdAt: moment(booking.createdAt),
      }))
    )
  }

  const dateCellRender = (value) => {
    const listData = bookingList.filter(booking => moment(booking.bookingDate).isSame(value, 'day'))
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

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Calendar
            style={{ padding: 10 }}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
          />
        </Col>
        <Col span={6}>
          <UpcomingEvents bookings={selectedDateBookings}/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
