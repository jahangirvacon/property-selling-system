import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Col, Calendar, Badge, Select, List, Card, Typography } from "antd"
import UpcomingEvents from "../Upcoming/UpcomingEvents"
import "./Dashboard.css"
import moment from "moment"
import { getGurdwaraList, getGurdwaraHalls } from "../../api"
import pics1 from "../../Assets/pics1.PNG"
import chart2 from "../../Assets/chart2.PNG"
import chart3 from "../../Assets/chart3.PNG"
import { HomeOutlined, InteractionOutlined } from "@ant-design/icons"

const { Title } = Typography
const { Option } = Select
const Dashboard = () => {
  const [bookingList, setBookingList] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedDateBookings, setSelectedDateBookings] = useState([])
  const [dateMode, setDateMode] = useState(moment())
  const bookings = useSelector((state) => state.bookingList)
  const [hallListSelection, setHallListSelection] = useState([])
  const [hallDetails, setHallDetails] = useState([])
  const [activeTabKey, setActiveTabKey] = useState("multi")

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
    if (gurdwaraList.length) {
      const { response } = await getGurdwaraHalls(gurdwaraList[0]._id)
      setHallListSelection(response.map((hall) => ({ id: hall._id, displayText: hall.title })))
    }
  }

  const dateCellRender = (value) => {
    const listData = bookingList.filter((booking) => moment(booking.bookingDate).isSame(value, "day"))
    return <div>{listData.length > 0 ? <Badge style={{ paddingLeft: 13 }} status="success" /> : <div></div>}</div>
    // <ul className="events">
    //   {listData.map((item) => (
    //     <li key={item.id}>
    //     </li>
    //   ))}
    // </ul>
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
      key: "multi",
      tab: "Multi",
    },
    {
      key: "monthly",
      tab: "Monthly",
    },
  ]

  // fullscreen={false}
  const tabView = {
    monthly: () => {
      const today = moment()
      const calendarArr = []
      for (let i = 0; i < 12; i++) {
        const current = i === 0 ? today.clone() : moment(today).startOf("month").add(i, "months")

        calendarArr.push(
          <div style={{ float: "left" }}>
            <Calendar
              headerRender={({ value, type, onChange, onTypeChange }) => {
                return (
                  <Title style={{ textAlign: "center" }} level={4}>
                    {moment(value).format("MMMM YY")}
                  </Title>
                )
              }}
              defaultValue={current}
              style={{ padding: 10, width: 300 }}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              validRange={[moment(current).startOf("month"), moment(current).endOf("month")]}
            />
          </div>
        )
      }
      return <div className="calendar-wrapper">{calendarArr}</div>
    },
    multi: () => {
      return (
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
      )
    },
  }

  const onTabChange = (key) => {
    setActiveTabKey(key)
    filterHallBookings("ALL")
  }

  return (
    <div>

      <Row justify="space-between" className="dashboardCard">
        <Col span={24}>
          <Row className="title" justify="start" align="middle" >
              <h1>Dashbord</h1>
          </Row>
        </Col>
        <Col span={6}>
          <div className="site-card-border-less-wrapper">
            {/* title="Card Nights / Portal"  */}
            <Card className="chart-card" bordered={false}>
              <Title level={4}>Card Nights / Portal</Title>
              <img src={pics1} className="graphtable" alt="" />
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="site-card-border-less-wrapper">
            <Card className="chart-card" bordered={false}>
              <Title level={4}>Occupancy</Title>
              <img src={chart2} className="graphtable" width alt="" />
            </Card>
          </div>
        </Col>
        <Col span={11}>
          <div className="site-card-border-less-wrapper">
            <Card className="chart-card" bordered={false}>
              <Title level={4}>Occupancy & Revenue</Title>
              <img src={chart3} alt="" className="graphtable" />
            </Card>
          </div>
        </Col>
      </Row>

      {/* Dashboard Calender */}
      <Row gutter={16}>
        <Col span={24}>
          <Card
            style={{ width: "100%" }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            tabBarExtraContent={activeTabKey === "multi" ? operations : <div></div>}
            onTabChange={onTabChange}
          >
            {tabView[activeTabKey]()}
          </Card>
        </Col>
      </Row>
      {/* Arrival And Departer Fields  */}
      <Row justify="space-between" className="DepartureHeader">
        <Col span={11}>
          <div className="site-card-border-less-wrapper">
            <Card title="Upcomming Events" className="card" bordered={false}>
              <div className={`cardcontent ${selectedDateBookings.length === 0 ? "empty-card" : ""}`}>
                {selectedDateBookings && selectedDateBookings.length > 0 ? (
                  <UpcomingEvents bookings={selectedDateBookings} />
                ) : (
                  <div className="no-events">
                    <h1>
                      <InteractionOutlined />
                    </h1>
                    <p>There are no Upcomming Events</p>
                  </div>
                )}
                {/* <h1>
                  <HomeOutlined />
                </h1>
                <p>There are no "Arrivals/Departures" scheduled</p> */}
              </div>
            </Card>
          </div>
        </Col>
        <Col span={11}>
          <div className="site-card-border-less-wrapper">
            <Card title="Activity Feed" className="card" bordered={false}>
              <div className="cardcontent empty-card">
                <h1>
                  <InteractionOutlined />
                </h1>
                <p>There are no “Activities” scheduled</p>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
