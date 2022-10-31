import { useEffect, useState } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { db } from "./firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"

import Nav from "./Component/Navbar"

import SupplierRegister from "./Component/Pamitha/Supplierregister"
import SupplierView from "./Component/Pamitha/SupplierView"

import ItemInsert from "./Component/Pamitha/ItemInsert"
import ItemView from "./Component/Pamitha/itemView"

import Purchase from "./Component/Ayeshi/Purchase"
import MakePurchase from "./Component/Ayeshi/MakePurchase"




function App() {
 
  return (
    <BrowserRouter>
    
      <div>
   
            <Route path="/sregister" exact component={SupplierRegister}></Route>
            <Route path="/registerview" exact component={SupplierView}></Route>
            <Route path="/iteminsert" exact component={ItemInsert}></Route>
            <Route path="/itemview" exact component={ItemView}></Route>
            <Route path="/purchase" exact component={Purchase}></Route>
            <Route path="/makepurchase" exact component={MakePurchase}></Route>
   

      </div>
  
    </BrowserRouter>
  );
}

export default App;
