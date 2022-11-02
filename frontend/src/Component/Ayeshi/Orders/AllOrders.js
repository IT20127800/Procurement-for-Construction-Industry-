import React from "react";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const getColor = (tag) => {
  let color = "";

  if(tag == "Approved"){
    color = "green";
  }
  
  else if(tag == "Pending"){
    color = "gold";
  }

  else if(tag == "Requesting Approval"){
    color = "geekblue";
  }

  else if(tag == "Partially Approved"){
    color = "Purple";
  }

  else {
    color = "red";
  }

  return (
    <Tag color={color} key={tag}>
      {tag}
    </Tag>
  );
};

function AllOrders(props) {
  const [orders, setOrders] = useState([]);
  const OrderCollection = collection(db, "orders");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Items Count",
      key: "item",
      dataIndex: "item",
      render: (_, { item }) => <>{item.length}</>,
    },
    {
      title: 'Status',
      key: 'orderState',
      dataIndex: 'orderState',
      render: (_, { orderState }) => (
        <>
          {getColor(orderState)}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Button onClick={() => props.history.push(`/order/${record.id}`)} type="primary">View More</Button>
        </Space>
      ),
    },
  ];

  const getOrders = async () => {
    let data = await getDocs(OrderCollection);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(order =>  order.orderState !== "Rejected"));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Site Managers"
        subTitle="Pending Orders"
      />
      {orders.length > 0 && (
        <Table style={{padding: "0px 50px 0px 50px"}} dataSource={orders} columns={columns} pagination={false}></Table>
      )}
    </div>
  );
}

export default AllOrders;
