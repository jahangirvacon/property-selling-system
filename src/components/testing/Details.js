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
      guest: booking.guest,
      postCode: booking.postCode,
      phoneNumber: booking.phoneNumber,
      mobileNumber: booking.mobileNumber,
      email: booking.email,
      address: booking.address,
      bookingDate: moment(booking.bookingDate).format("YYYY/MM/DD"),
      startTime: booking.startTime,
      endTime: booking.endTime,
      slot: `${booking.startTime} - ${booking.endTime}`,
      name: booking.guest,
      portal: booking.hallEvent.hall.gurdwara.title,
      hall: booking.hallEvent.hall.title,
      event: booking.hallEvent.eventType.title,
      isWeddingEvent: booking.hallEvent.eventType.category === "Wedding",
      groomName: booking.groomName,
      groomFatherName: booking.groomFatherName,
      groomMotherName: booking.groomMotherName,
      brideName: booking.brideName,
      brideFatherName: booking.brideFatherName,
      brideMotherName: booking.brideMotherName,
      guestCount: booking.guestCount,
      prashada: booking.prashada,
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
              <strong>Customer Details</strong>{" "}
            </h1>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <p>Customer Name </p>
                  <p>Post Code </p>
                  <p>Phone Number </p>
                  <p>Mobile Number </p>
                  <p>Email </p>
                  <p>Address</p>
                </div>
              </Col>
              <Col span={10} offset={4}>
                <div className="site-card-border-less-wrapper">
                  <p>{bookingDetails.guest} </p>
                  <p>{bookingDetails.postCode}</p>
                  <p>{bookingDetails.phoneNumber}</p>
                  <p>{bookingDetails.mobileNumber}</p>
                  <p>{bookingDetails.email}</p>
                  <p>{bookingDetails.address}</p>
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
              <strong>Venue</strong>{" "}
            </h1>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <p>Gurdwara </p>
                  <p>Hall </p>
                  <p>Event Type</p>
                  <p>Booking Date</p>
                  <p>Slot</p>
                </div>
              </Col>
              <Col span={8} offset={8}>
                <div className="site-card-border-less-wrapper">
                  <p>{bookingDetails.portal} </p>
                  <p>{bookingDetails.hall} </p>
                  <p>{bookingDetails.event}</p>
                  <p>{bookingDetails.bookingDate}</p>
                  <p>{bookingDetails.slot}</p>
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

      {bookingDetails?.isWeddingEvent && (
        <Row className="placeDetails">
          <Col span={10}>
            <Card title="" bordered={false}>
              <h1>
                <strong>Wedding Details</strong>{" "}
              </h1>
              <Row>
                <Col span={8}>
                  <div className="site-card-border-less-wrapper">
                    <p>Groom's Name </p>
                    <p>Father's Name</p>
                    <p>Mother's Name</p>
                    <p>Bride's Name</p>
                    <p>Father's Name</p>
                    <p>Mother's Name</p>
                    <p>Guest Count</p>
                    <p>Parshada at Gurdwara</p>
                  </div>
                </Col>
                <Col span={8} offset={8}>
                  <div className="site-card-border-less-wrapper">
                    <p>{bookingDetails.groomName} </p>
                    <p>{bookingDetails.groomFatherName} </p>
                    <p>{bookingDetails.groomMotherName}</p>
                    <p>{bookingDetails.brideName}</p>
                    <p>{bookingDetails.brideFatherName}</p>
                    <p>{bookingDetails.brideMotherName}</p>
                    <p>{bookingDetails.guestCount}</p>
                    <p>{bookingDetails.prashada ? "Yes" : "No" }</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}
export default Details
