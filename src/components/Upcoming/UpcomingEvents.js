import React from "react"
import { Row, Col } from "antd"
import { Card, Steps } from "antd"
import "./UpcomingEvents.css"
import {
  CheckOutlined,
  DashboardOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserAddOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Popover, Button } from "antd"
import { Link } from "react-router-dom"


const { Step } = Steps
// for Popover
const text = <span>Testing</span>
const content = (booking) => (
  <div className="popoverData">
    <div className="popoverDesign">
      <div>
        <p className="testingData">
          <strong>
            <UserOutlined />
          </strong>
          &nbsp; {booking.guest}
        </p>
      </div>
      <div>
        <p className="testingData"> &nbsp;<FieldTimeOutlined /> {booking.slot}</p>
      </div>
    </div>

    <div className="popoverDesign">
      <div>
        <p>
          <strong>
            <HomeOutlined />
          </strong>
          &nbsp; {booking.portal}
        </p>
      </div>
      <div>
        <p>
          <strong>
            <TeamOutlined />
          </strong>
          &nbsp; {booking.guestCount}
        </p>
      </div>
    </div>
    <hr></hr>

    <div className="popoverDesign">
      <div>
        <Link to={"/bookingDetail?id=" + booking.id}>
        <p className="detailsBtn">
          <strong>
            <InfoCircleOutlined />
          </strong>
          &nbsp; Details
        </p>
        </Link>
      </div>
      <div>
        <p className="editBtn">
          <strong>
            <EditOutlined />
          </strong>
          &nbsp; Edit
        </p>
      </div>

      <div>
        <p className="cancelBtn">
          <strong>
            <InfoCircleOutlined />
          </strong>
          &nbsp; Cancel
        </p>
      </div>
    </div>
  </div>
)

const buttonWidth = 70

const UpcomingEvents = ({ bookings }) => {
  return (
    <div>
      {/* <Row>
        <Col span={8} > */}
      <div className="site-card-border-less-wrapper">
        <Card className="titleEvents" title="Upcoming Events" bordered={false}>
          <Steps progressDot direction="vertical">
            {bookings &&
              bookings.map((booking) => (
                <Step
                  status="finish"
                  title={
                    <Popover placement="rightTop" title={booking.event} content={content(booking)} trigger="click">
                      <p className="UpcomingHeaders">
                        {booking.startTime}AM - {booking.endTime}AM | {booking.event} | <TeamOutlined /> 200
                      </p>
                    </Popover>
                  }
                  description={
                    <Popover placement="rightTop" title={booking.event} content={content(booking)} trigger="click">
                      <p className="UpcomingHeaders">
                        <HomeOutlined /> {booking.portal} | <UserOutlined />
                        {booking.guest}
                      </p>
                    </Popover>
                  }
                />
              ))}
            {bookings?.length > 0 ? <Step status="wait" /> : <div></div>}
          </Steps>
          {/* <div className="Events">
            <p className="UpcomingHeaders">
              <strong>
                <DashboardOutlined />
              </strong>
              &nbsp; &nbsp; Barat On: 25/04/2021
            </p>

            <Popover placement="rightTop" title={text} content={content} trigger="click">
              <p className="UpcomingHeaders">
                <strong>
                  <CheckOutlined />
                </strong>
                &nbsp; &nbsp; Daim Hall<span className="Testing">|Testing</span>
              </p>
            </Popover>
          </div> */}

          {/* One event done */}
          {/* <div className="Events">
            <p className="UpcomingHeaders">
              <strong>
                <DashboardOutlined />
              </strong>
              &nbsp; &nbsp; Engagement: 25/07/2021
            </p>

            <Popover placement="rightTop" title={text} content={content} trigger="click">
              <p className="UpcomingHeaders">
                <strong>
                  <CheckOutlined />
                </strong>
                &nbsp; &nbsp; Daim Hall <span className="Testing">|Testing</span>
              </p>
            </Popover>
          </div> */}
        </Card>
      </div>
      {/* </Col> */}

      {/* new Row  */}

      {/* <Col span={8} offset={4}> */}

      {/* here we call teh Activity feed component */}

      {/* <div className="site-card-border-less-wrapper">
            <Card
              className="titleEvents"
              title="Activity Feed"
              bordered={false}
             
            >
               <div className="Events">
              <Popover
                placement="rightTop"
                title={text}
                content={content}
                trigger="click"
              >
         
        

                <p className="UpcomingHeaders">
                  
                  <strong>
                   
                    <DashboardOutlined />
                  </strong>
                  &nbsp;
                  &nbsp;
                  Barat On: 25/04/2021 <span className="Testing">-Direct Booking</span>
                </p>
              </Popover>
              
                <Popover
                  placement="rightTop"
                  title={text}
                  content={content}
                  trigger="click"
                >
                  <p className="UpcomingHeaders">
                    <strong>
                     
                      <CheckOutlined />
                    </strong>
                    &nbsp;
                    &nbsp;
                     Daim Hall |Testing 5/04/22 - 26/04/22
                  </p>
             
                </Popover>
                </div>
                
              

                <div className="Events">
              <Popover
                placement="rightTop"
                title={text}
                content={content}
                trigger="click"
              >
                <p className="UpcomingHeaders">
                 
                  <strong>
                   
                    <DashboardOutlined />
                  </strong>
                  &nbsp;
                  &nbsp;
                  Engagement: 25/07/2021 <span className="Testing">-Direct Booking</span>
                </p>
              </Popover>
              
                <Popover
                  placement="rightTop"
                  title={text}
                  content={content}
                  trigger="click"
                >
                  <p className="UpcomingHeaders">
                    <strong>
                     
                      <CheckOutlined />
                    </strong>
                    &nbsp;
                    &nbsp;
                     Guru Amar Das Darbar |Testing 5/04/22 -
                    26/04/22
                  </p>
                </Popover>
            </div>
            </Card>
          </div> */}
      {/* </Col>
      </Row> */}
    </div>
  )
}

export default UpcomingEvents
