import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import "./upcomingStyle.css";
import {
  CheckOutlined,
  DashboardOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Popover, Button } from "antd";
// for Popover
const text = <span>Testing</span>;
const content = (
  <div className="popoverData">
      <div className="popoverDesign">
    <div >
      <p className="testingData">
        <strong>
          <UserAddOutlined />
        </strong>
        &nbsp;
        Gurinder Gill
      </p>
    </div>
    <div>
      <p className="testingData">  &nbsp;$ 9797</p>
    </div>
    </div>

    <div className="popoverDesign">


    <div>
      <p>
        <strong>
          <CheckOutlined />
        </strong>
        &nbsp;
        22/02/2021
      </p>
    </div>
    <div>
      <p>
        <strong>
          <CheckOutlined />
        </strong>
        &nbsp;
        22/02/2021
      </p>
    </div>
    </div>
    <hr></hr>

    <div className="popoverDesign">

    <div>
      <p className="detailsBtn">
        <strong>
          <InfoCircleOutlined />
        </strong>
        &nbsp;
        Details
      </p>
    </div>
    <div>
      <p className="editBtn">
        <strong>
          <EditOutlined />
        </strong>
        &nbsp;
        Edit
      </p>
    </div>

    <div>
      <p className="cancelBtn">
        <strong>
          <InfoCircleOutlined />
        </strong>
        &nbsp;
        Cancel
      </p>
    </div>
    </div>
  </div>
);

const buttonWidth = 70;

const Upcoming = () => {
  return (
    <div>
      <Row>
        <Col span={8} className>
          <div className="site-card-border-less-wrapper">
            <Card
              className="titleEvents"
              title="Upcoming Events"
              bordered={false}
              
            >
              <p className="UpcomingHeaders">
                
                <strong>
                
                  <DashboardOutlined />
                </strong>
                &nbsp;
                &nbsp;
                <strong>Barat On</strong>: 25/04/2021
              </p>
              <div>
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
                    <strong> Daim Hall </strong><span className="Testing">|Testing</span>
                  </p>
                </Popover>
              </div>
              <p className="UpcomingHeaders">
               
                <strong>
                  
                  <DashboardOutlined />
                </strong>
                &nbsp;
                &nbsp;
                <strong>Engagement</strong>: 25/07/2021
              </p>
              <div>
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
                    <strong> Daim Hall </strong> <span className="Testing">|Testing</span>
                  </p>
                </Popover>
              </div>
            </Card>
          </div>
        </Col>

        {/* new Row  */}

        <Col span={8} offset={4}>
          <div className="site-card-border-less-wrapper">
            <Card
              className="titleEvents"
              title="Activity Feed"
              bordered={false}
             
            >
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
                  <strong>Barat On</strong>: 25/04/2021 <span className="Testing">-Direct Booking</span>
                </p>
              </Popover>
              <div>
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
                    <strong> Daim Hall </strong>|Testing 5/04/22 - 26/04/22
                  </p>
                </Popover>
              </div>
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
                  <strong>Engagement</strong>: 25/07/2021 <span className="Testing">-Direct Booking</span>
                </p>
              </Popover>
              <div>
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
                    <strong> Guru Amar Das Darbar </strong>|Testing 5/04/22 -
                    26/04/22
                  </p>
                </Popover>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Upcoming;
