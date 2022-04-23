import React from "react";
import { Row, Col } from 'antd';
import './booking.css'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Table } from 'antd';


const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 20,
            color: '#1890ff',
            margin: 6
        
        }}
    />
);


const onSearch = value => console.log(value);


// Table
const columns = [
    {
      title: 'Arrival',
      dataIndex: 'name',
    },
    {
      title: 'Departure',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Property',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Guest',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  
  const data = [
    {
      key: '1',
      name: '22/2/17',
      chinese: 98,
      math: 'Ali',
      english: 70,
    },
    {
      key: '2',
      name: '22/2/17',
      chinese: 98,
      math: 'Ahmad',
      english: 89,
    },
    {
      key: '3',
      name: '22/2/17',
      chinese: 98,
      math:'Ahmad',
      english: 70,
    },
    {
      key: '4',
      name: '22/2/17',
      chinese: 88,
      math:'Ahmad',
      english: 89,
    },
  ];
  
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  } 





const Booking = () => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <h1 className="bookingHeader">Bookings</h1>
                </Col>
            </Row>
            <Row >
                <Col span={24}>
                    <div className="bookingElement">
                    <div className="searc">
                        <Space direction="vertical">
                            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </div>
                    <div className="datesetter">
                        <label for="start">Start date:</label>

                        <input type="date" id="start" name="trip-start"
                            value="2018-07-22"
                            min="2018-01-01" max="2018-12-31" />


                    </div>
                    <div  className="datesetter">
                        <label for="start">End Date:</label>

                        <input type="date" id="start" name="trip-start"
                            value="2018-07-22"
                            min="2018-01-01" max="2018-12-31" />


                    </div>
                    {/* <div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Hover me <DownOutlined />
                            </a>
                        </Dropdown>
                    </div> */}
                    </div>
                </Col>
            </Row>

            <Row className="bookingTable">
                <Col span={24}>
                <Table columns={columns} dataSource={data} onChange={onChange} />
                </Col>
            </Row>


        </div>
    );
}
export default Booking;