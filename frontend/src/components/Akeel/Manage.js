import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs} from "firebase/firestore"
import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Space, Table, Tag, PageHeader, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: 'Do you Want to Accept this Order?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure to Reject this Order?',
    icon: <ExclamationCircleOutlined />,
    
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

function Manage() {
  const [orders,setOrders]=useState([]);
  const OrderCollection=collection(db,"orders")
  useEffect(()=>{
     const getOrders=async()=>{
      const data=await getDocs(OrderCollection)
      setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      for (let index=0;index<data.docs.length;index++) {
        console.log("index",index)
        console.log("indexxxxxxxxxxxxxxxxxxx",data.docs.length)
      console.log(data.docs[index]._document.data.value.mapValue.fields)
      }
     };
     getOrders();
  },[])

  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
  return (
   

      <div>
        <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Manager"
    subTitle="Dashboard"
  />
        <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space wrap>
        <Button width="140px" style={{ backgroundColor: "#3b9664" }}color="white" onClick={showConfirm}>Accept</Button>
        <Button width="140px" style={{ backgroundColor: "#ff4d4f" }}color="white" onClick={showDeleteConfirm}>
          Reject
        </Button>
      
      </Space>
      )}
    />
  </Table>
        <button>Create Order</button>
        {orders.map((order)=>{
          return <div>
            <h1> Name:{order.orderState}</h1>
            <h1> Name:{order.total}</h1>
          </div>
        })}

      </div>
  
    
  );
}

export default Manage;
