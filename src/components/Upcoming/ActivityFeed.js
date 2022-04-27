import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import "./UpcomingEvents.css";
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

const ActivityFeed = () => {
  return (
    <div>
      <Row>
       

        <Col span={8}>
          <div className="site-card-border-less-wrapper">
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityFeed;
