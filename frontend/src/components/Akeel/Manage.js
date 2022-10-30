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
      let data=await getDocs(OrderCollection)
      setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      for (let index=0;index<data.docs.length;index++) {
        console.log("index",index)
        console.log("indexxxxxxxxxxxxxxxxxxx",data.docs.length)
      console.log(data.docs[index]._document.data.value.mapValue.fields)
      }
     };
     getOrders();
  },[])
  let DataBase=[]
console.log(orders)
for (let index=0;index<orders.length;index++){
  console.log(index)
   DataBase.push(orders[index]) 
}
// return DataBase;

  return  (DataBase || [],
   

      <div>
        <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Manager"
    subTitle="Dashboard"
  />
        <Table dataSource={DataBase}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="orderState" key="firstName" />
      <Column title="Last Name" dataIndex="total" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="id" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
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
