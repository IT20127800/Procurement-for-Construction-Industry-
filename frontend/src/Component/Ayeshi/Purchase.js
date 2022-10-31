import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs} from "firebase/firestore"
import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { Space, Table, Tag, PageHeader, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;


function Purchase() {
  const [orders,setOrders]=useState([]);
  const OrderCollection=collection(db,"orders")
  useEffect(()=>{
     const getOrders=async()=>{
      const data=await getDocs(OrderCollection)
      setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

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
    title="Procument Department"
    subTitle="Dashboard"
  />
    <Table dataSource={DataBase}>
    <ColumnGroup title="Order">
      <Column title="Item Name" dataIndex="orderState" key="firstName" />
      <Column title="Sub Total" dataIndex="subTotal" key="lastName" />
    </ColumnGroup>
  
    
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space wrap>
       <a href={`/purchaseOrder${orders._id}`}>
                        <button type="button" className="btn btn-success">
                          <i className="fas fa-edit"></i> Purchase
                        </button>
                      </a>
      
      </Space>
      )}
    />
  </Table>
        

      </div>
  
    
  );
}

export default Purchase;
