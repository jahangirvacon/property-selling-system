import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Row, Col } from "antd"
import { Card } from "antd"
import "./Details.css"
import { EditOutlined } from "@ant-design/icons"
import moment from "moment"
import { getBookingDetails } from "../../api"

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [bookingDetails, setBookingDetails] = useState({})

  useEffect(() => {
    const bookingId = searchParams.get("id")
    if (bookingId) {
      getData(bookingId)
    }
  }, [])

  const getData = async (bookingId) => {
    const { response: booking } = await getBookingDetails(bookingId)
    setBookingDetails({
      id: booking._id,
      bookingDate: booking.bookingDate,
      guest: booking.guest,
      startTime: booking.startTime,
      endTime: booking.endTime,
      slot: `${booking.startTime} - ${booking.endTime}`,
      name: booking.guest,
      guestCount: 80,
      portal: booking.hallEvent.hall.gurdwara.title,
      hall: booking.hallEvent.hall.title,
      event: booking.hallEvent.eventType.title,
      createdAt: moment(booking.createdAt),
    })
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <h1 className="testingHeaders">Booking Details</h1>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Card title="" bordered={false}>
            <h1>
              {" "}
              <strong>Booking</strong>{" "}
            </h1>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <p>Customer Name </p>
                  <p>Date </p>
                  <p>Guest Count</p>
                  {/* <p> Available Slot</p> */}
                  {/* </Card> */}
                </div>
              </Col>
              <Col span={10} offset={4}>
                <div className="site-card-border-less-wrapper">
                  {/* <Card title="" bordered={false} style={{ width: 300 }}> */}
                  {/* <h1>
                    <EditOutlined />{" "}
                  </h1> */}
                  <p>{bookingDetails.guest} </p>
                  <p>{bookingDetails.bookingDate}</p>
                  <p>{bookingDetails.guestCount}</p>
                  {/* <p> {bookingDetails.slot}</p> */}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* new coloumn */}
        <Col span={10} offset={4}>
          <Card title=" Payment Details" bordered={false}>
            <Row>
              <div className="site-card-border-less-wrapper">
                <h1>No Payments</h1>
                <h1>{/* <EditOutlined /> */}</h1>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row className="placeDetails">
        <Col span={10}>
          <Card title="" bordered={false}>
            <h1>
              <strong>Places</strong>{" "}
            </h1>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <p>Gurdwara </p>
                  <p>Hall </p>
                  <p>Event Type</p>
                  <p> Available Slot</p>
                </div>
              </Col>
              <Col span={8} offset={8}>
                <div className="site-card-border-less-wrapper">
                  {/* <h1>
                    <EditOutlined />
                  </h1> */}

                  <p>{bookingDetails.portal} </p>
                  <p>{bookingDetails.hall} </p>
                  <p>{bookingDetails.event}</p>
                  <p>{bookingDetails.dlot}</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={10} offset={4}>
          <Card title=" Payment Details" bordered={false}>
            <Row>
              <div className="site-card-border-less-wrapper">
                <h1>No Invoice</h1>
                <h1>{/* <EditOutlined /> */}</h1>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Details
