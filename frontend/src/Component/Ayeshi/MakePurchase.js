import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

import "../../CSS/iteminsert.css"

function MakePurchase() {
  const item = collection(db, "items");

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  

  const createpurchase = async () => {
    await addDoc(item, {
      purchaseID: id,
      itemName: name,
      itemPrice: price,

      
    });
  };

  return (
    <>
      <center>
        <br/>
        <div class="form">
         <br/>
          <h1>Create Purchase</h1>

          <br/>

          <input
            type="text"
            id="name1"
            placeholder="id"
            className="input"
            onChange={(e) => {
              setid(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            id="address"
            placeholder="name"
            className="input"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            id="number"
            placeholder="price"
            className="input"
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />
          <br />
          <br />
          
          <br />
          <br />

          <button
            class="btn btn-primary"
            onClick={() => {
              createpurchase({ id, name, price});
              // document.getElementById("name1").value = " "
              // document.getElementById("skill1").value=" "
            }}
          >
            click
          </button>

          <br/> <br/>
        </div>
      </center>
    </>
  );
}

export default MakePurchase;
