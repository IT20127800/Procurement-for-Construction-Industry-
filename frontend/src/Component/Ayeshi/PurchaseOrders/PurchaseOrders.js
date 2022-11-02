import React from "react";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Space, Table, PageHeader, Button } from "antd";

function PurchseOrders(props) {
  const [orders, setOrders] = useState([]);
  const purchaseOrderCollection = collection(db, "purchaseOrders");

  const columns = [
    {
      title: "PO Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Button onClick={() => props.history.push(`/purchaseOrder/${record.id}`)} type="primary">View More</Button>
        </Space>
      ),
    },
  ];

  const getPurchaseOrders = async () => {
    let data = await getDocs(purchaseOrderCollection);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.push("/allOrders")}
        title="Site Manager"
        subTitle="Purchase Orders"
      />
      {orders.length > 0 && (
        <Table style={{padding: "0px 50px 0px 50px"}} dataSource={orders} columns={columns} pagination={false}></Table>
      )}
    </div>
  );
}

export default PurchseOrders;
