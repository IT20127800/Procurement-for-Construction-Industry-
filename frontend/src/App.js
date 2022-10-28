import { useEffect, useState } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { db } from "./firebase-config";
import {collection, getDocs} from "firebase/firestore"




function App() {
  const [orders,setOrders]=useState([]);
  const OrderCollection=collection(db,"orders")
  useEffect(()=>{
     const getOrders=async()=>{
      const data=await getDocs(OrderCollection)
      setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

     };
     getOrders();
  },[])
  return (
    <BrowserRouter>
    
      <div>
        <button>Create Order</button>
        {orders.map((order)=>{
          return <div>
            <h1> Name:{order.orderState}</h1>
            <h1> Name:{order.total}</h1>
          </div>
        })}

      </div>
  
    </BrowserRouter>
  );
}

export default App;
