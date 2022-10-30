import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

import "../../CSS/iteminsert.css"

function ItemInsert() {
  const item = collection(db, "items");

  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [qty, setqty] = useState("");

  const createitem = async () => {
    await addDoc(item, {
      itemID: id,
      itemName: name,
      itemPrice: price,
      itemQTY: qty,
      image: " ",
    });
  };

  return (
    <>
      <center>
        <br/>
        <div class="form">
         <br/>
          <h1>Item Insert</h1>

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
          <input
            type="text"
            id="location"
            placeholder="quentity"
            className="input"
            onChange={(e) => {
              setqty(e.target.value);
            }}
          />
          <br />
          <br />

          <button
            class="btn btn-primary"
            onClick={() => {
              createitem({ id, name, price, qty });
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

export default ItemInsert;
