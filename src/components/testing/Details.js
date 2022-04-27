import React from "react";
import { Row, Col } from "antd";
import { Card } from "antd";
import "./Details.css";
import { EditOutlined } from "@ant-design/icons";
const Details = () => {
  return (
    <div>
      <Row>
        <Col span={24}>
          <h1 className="testingHeaders">Testing</h1>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Card title="" bordered={false}>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <h1>
                    {" "}
                    <strong>Booking</strong>{" "}
                  </h1>
                  <p>Customer Name </p>
                  <p>Date </p>
                  <p>Price</p>
                  <p> Available Slot</p>
                  {/* </Card> */}
                </div>
              </Col>
              <Col span={10} offset={4}>
                <div className="site-card-border-less-wrapper">
                  {/* <Card title="" bordered={false} style={{ width: 300 }}> */}
                  <h1>
                    <EditOutlined />{" "}
                  </h1>
                  <p>Ahamd </p>
                  <p>22/04/2012 </p>
                  <p>$76875</p>
                  <p> Available Slot</p>
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
                <h1>
                  <EditOutlined />
                </h1>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row className="placeDetails">
        <Col span={10}>
          <Card title="" bordered={false}>
            <Row>
              <Col span={8}>
                <div className="site-card-border-less-wrapper">
                  <h1>
                    <strong>Places</strong>{" "}
                  </h1>
                  <p>Gurdwara </p>
                  <p>Hall </p>
                  <p>Event Type</p>
                  <p> Available Slot</p>
                </div>
              </Col>
              <Col span={8} offset={8}>
                <div className="site-card-border-less-wrapper">
                  <h1>
                    <EditOutlined />
                  </h1>

                  <p>Gru Nanak </p>
                  <p>Dam Complex </p>
                  <p>ceremoney</p>
                  <p> Available Slot</p>
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
                <h1>
                  <EditOutlined />
                </h1>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Details;
