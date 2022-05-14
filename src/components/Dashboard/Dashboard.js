import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Calendar, Badge, Select, List, Card, Typography } from "antd"
import UpcomingEvents from "../Upcoming/UpcomingEvents"
import "./Dashboard.css"
import moment from "moment"
import { getGurdwaraList, getGurdwaraHalls } from "../../api"

const { Option } = Select

const Dashboard = () => {
  const [bookingList, setBookingList] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedDateBookings, setSelectedDateBookings] = useState([])
  const [dateMode, setDateMode] = useState(moment())
  const bookings = useSelector((state) => state.bookingList)
  const [hallListSelection, setHallListSelection] = useState([])
  const [hallDetails, setHallDetails] = useState([])
  const [activeTabKey, setActiveTabKey] = useState("default")

  useEffect(() => {
    getData(bookings)
  }, [bookings])

  useEffect(() => {
    setSelectedDateBookings(bookingList.filter((booking) => moment(booking.bookingDate).isSame(moment(selectedDate), "day")))
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
    const { response: gurdwaraList } = await getGurdwaraList()
    if(gurdwaraList.length){
      const { response } = await getGurdwaraHalls(gurdwaraList[0]._id)
      setHallListSelection(response.map((hall) => ({ id: hall._id, displayText: hall.title })))
    }
  }

  const dateCellRender = (value) => {
    const listData = bookingList.filter((booking) => moment(booking.bookingDate).isSame(value, "day"))
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status="success" />
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
      function preserver(counter) {
        const filtered = bookingList.filter((booking) => moment(counter).isSame(booking.bookingDate, "day") && hall.id === booking.hallId)
        view.push(
          <span className="block" onClick={(event) => setSelectedDate(counter)}>
            <p>{moment(counter).format("MMMM D")}</p>
            <Badge style={{ backgroundColor: "#1890ff" }} count={filtered.length}></Badge>
          </span>
        )
      }
      preserver(counter)
      counter = moment(counter).add(1, "days")
    }
    return view
  }

  const tabList = [
    {
      key: "default",
      tab: "Default",
    },
    {
      key: "detailed",
      tab: "Detailed",
    },
  ]

  const tabView = {
    default: (
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => <Typography.Title level={4}>Custom header</Typography.Title>}
        style={{ padding: 10, width: 200 }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    ),
    detailed: (
      <List
        itemLayout="horizontal"
        dataSource={hallListSelection}
        renderItem={(hall) => (
          <List.Item>
            <div className="hall-item">
              <h4 className="hall-heading">{hall.displayText}</h4>
              <div className="scrollmenu">{getHallDetailedView(hall)}</div>
            </div>
          </List.Item>
        )}
      />
    ),
  }

  const onTabChange = (key) => {
    setActiveTabKey(key)
    filterHallBookings("ALL")
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Card
            style={{ width: "100%", height: "950px" }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            tabBarExtraContent={activeTabKey === "default" ? operations : <div></div>}
            onTabChange={onTabChange}
          >
            {tabView[activeTabKey]}
          </Card>
          {/* <Tabs defaultActiveKey="1" onChange={() => filterHallBookings("ALL")} tabBarExtraContent={operations}>
            <TabPane tab="Default" key="default">
              <Calendar
                style={{ padding: 10 }}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
              />
            </TabPane>
            <TabPane tab="Detailed" key="detailed"></TabPane>
          </Tabs> */}
        </Col>
        <Col span={6}>
          <UpcomingEvents bookings={selectedDateBookings} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
