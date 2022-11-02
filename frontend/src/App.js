import { useEffect, useState } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { db } from "./firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"

import Nav from "./Component/Pamitha/Navbar"
import Footer from "./Component/Pamitha/Footer"

import Register from "./Component/Pamitha/Register"
import Signin from "./Component/Pamitha/Signin"

import SupplierHome from "./Component/Pamitha/SupplierHome"
import SupplierRegister from "./Component/Pamitha/Supplierregister"
import SupplierView from "./Component/Pamitha/SupplierView"

import ItemInsert from "./Component/Pamitha/ItemInsert"
import ItemView from "./Component/Pamitha/itemView"
import Home from "./Component/Pamitha/Home"

import AllOrders from "./Component/Ayeshi/Orders/AllOrders";
import OrderById from "./Component/Ayeshi/Orders/OrderById";
import PurchseOrders from "./Component/Ayeshi/PurchaseOrders/PurchaseOrders";
import PurchaseOrderByID from "./Component/Ayeshi/PurchaseOrders/PurchaseOrderByID";





function App() {
 
  return (
    <BrowserRouter>
    
      <div>


            <Route path="/shome" exact component={Nav}></Route>
            <Route path="/sregister" exact component={Nav}></Route>
            <Route path="/registerview" exact component={Nav}></Route>
            <Route path="/iteminsert" exact component={Nav}></Route>
            <Route path="/itemview" exact component={Nav}></Route>
            <Route path="/home" exact component={Nav}></Route>
            <Route path="/home" exact component={Home}></Route>

            <Route path="/register" exact component={Register}></Route>
            <Route path="/" exact component={Signin}></Route>

            <Route path="/shome" exact component={SupplierHome}></Route>
            <Route path="/sregister" exact component={SupplierRegister}></Route>
            <Route path="/registerview" exact component={SupplierView}></Route>
            <Route path="/iteminsert" exact component={ItemInsert}></Route>
            <Route path="/itemview" exact component={ItemView}></Route>








            <Route path="/shome" exact component={Footer}></Route>
            <Route path="/sregister" exact component={Footer}></Route>
            <Route path="/registerview" exact component={Footer}></Route>
            <Route path="/iteminsert" exact component={Footer}></Route>
            <Route path="/itemview" exact component={Footer}></Route>
            <Route path="/home" exact component={Footer}></Route>

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
