import { useEffect, useState } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { db } from "./firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"

import Nav from "./Component/Navbar"

import SupplierRegister from "./Component/Pamitha/Supplierregister"
import SupplierView from "./Component/Pamitha/SupplierView"

import ItemInsert from "./Component/Pamitha/ItemInsert"
import ItemView from "./Component/Pamitha/itemView"

import AllOrders from "./Component/Ayeshi/Orders/AllOrders";
import OrderById from "./Component/Ayeshi/Orders/OrderById";
import PurchseOrders from "./Component/Ayeshi/PurchaseOrders/PurchaseOrders";
import PurchaseOrderByID from "./Component/Ayeshi/PurchaseOrders/PurchaseOrderByID";





function App() {
 
  return (
    <BrowserRouter>
    
      <div>
   
            <Route path="/sregister" exact component={SupplierRegister}></Route>
            <Route path="/registerview" exact component={SupplierView}></Route>
            <Route path="/iteminsert" exact component={ItemInsert}></Route>
            <Route path="/itemview" exact component={ItemView}></Route>
            <Route path="/allOrders" exact component={AllOrders}></Route>
            <Route path="/allPurchaseOrders" exact component={PurchseOrders}></Route>
            <Route
              path="/order/:id"
              component={(props) => (
            <OrderById {...props} key={window.location.pathname} />
             )}
            />
            <Route
              path="/purchaseOrder/:id"
              component={(props) => (
                 <PurchaseOrderByID {...props} key={window.location.pathname} />
              )}
            />

           
   

      </div>
  
    </BrowserRouter>
  );
}

export default App;
