import { useEffect, useState } from "react";
import { BrowserRouter, Route, withRouter,Routes } from "react-router-dom";
import { db } from "./firebase-config";
import {collection, getDocs} from "firebase/firestore"
import Manage from "./components/Akeel/Manage";




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
      {/* <Routes> */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/manage" exact component={Manage}></Route>
        {/* </Routes> */}

      </div>
  
    </BrowserRouter>
  );
}

export default App;
