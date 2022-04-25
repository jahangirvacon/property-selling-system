import React from "react";
import { Row, Col } from 'antd';
import { Card } from 'antd';
import "./upcomingStyle.css"
import { CheckOutlined, DashboardOutlined, InfoCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Popover, Button } from 'antd';
// for Popover
const text = <span>Testing</span>;
const content = (
    <div className="popoverData">
        <p className="testingData" ><strong><UserAddOutlined /></strong>Gurinder Gill</p>
        <p className="testingData">$ 9797</p>
        <p className="detailsBtn"><strong><InfoCircleOutlined /></strong> Details</p>
        <p className="cancelBtn"><strong><InfoCircleOutlined /></strong> Cancel</p>

    </div>
);

const buttonWidth = 70;


const Upcoming = () => {
    return (
        <div>
            <Row>
                <Col span={8}>
                    <div className="site-card-border-less-wrapper">
                        <Card className="titleEvents" title="Upcoming Events" bordered={false} style={{ width: 500, height: 270, border: 5 }}>
                            <p className="UpcomingHeaders"> <strong> <DashboardOutlined /> </strong><strong>Barat On</strong>:  25/04/2021</p>
                            <div >
                                <Popover placement="rightTop" title={text} content={content} trigger="click">
                                    <p className="UpcomingHeaders"><strong> <CheckOutlined /> </strong><strong> Daim Hall </strong>|Testing</p>

                                </Popover>
                            </div>
                            <p className="UpcomingHeaders"> <strong> <DashboardOutlined /> </strong><strong>Engagement</strong>:  25/07/2021</p>
                            <div >
                                <Popover placement="rightTop" title={text} content={content} trigger="click">
                                    <p className="UpcomingHeaders"><strong> <CheckOutlined /> </strong><strong> Daim Hall </strong>|Testing</p>

                                </Popover>
                            </div>
                        </Card>
                    </div>
                </Col>


                {/* new Row  */}

                <Col span={8} offset={4}>
                    <div className="site-card-border-less-wrapper">
                        <Card className="titleEvents" title="Activity Feed" bordered={false} style={{ width: 500, height: 270, border: 5 }}>
                            <Popover placement="rightTop" title={text} content={content} trigger="click">

                                <p className="UpcomingHeaders"> <strong> <DashboardOutlined /> </strong><strong>Barat On</strong>:  25/04/2021 -Direct Booking</p>
                            </Popover>
                            <div >
                                <Popover placement="rightTop" title={text} content={content} trigger="click">
                                    <p className="UpcomingHeaders"><strong> <CheckOutlined /> </strong><strong> Daim Hall </strong>|Testing 5/04/22 - 26/04/22</p>

                                </Popover>
                            </div>
                            <Popover placement="rightTop" title={text} content={content} trigger="click">

                                <p className="UpcomingHeaders"> <strong> <DashboardOutlined /> </strong><strong>Engagement</strong>:  25/07/2021 -Direct Booking</p>
                            </Popover>
                            <div >
                                <Popover placement="rightTop" title={text} content={content} trigger="click">
                                    <p className="UpcomingHeaders"><strong> <CheckOutlined /> </strong><strong> Guru Amar Das Darbar   </strong>|Testing 5/04/22 - 26/04/22</p>

                                </Popover>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>


        </div>
    )

}

export default Upcoming;