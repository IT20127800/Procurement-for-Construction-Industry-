import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {  Space, Table, Tag, PageHeader } from "antd";

import{Form, InputGroup,ButtonGroup ,Button} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../CSS/iteminsert.css"
import { async } from "@firebase/util";

function ItemInsert() {

  AOS.init();

  const item = collection(db, "sitem");

  const [sname, setsname] = useState("");
  const [snumber, setsnumber] = useState("");
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [qty, setqty] = useState("");
  const [message, setMessage] = useState({error:false, msg:"" });

  const createitem = async () => {
  
   if(sname === ""){ 
      alert("Supplier Name Field Empty")
   }else if(snumber === ""){ 
    alert("Supplier Contact Number Field Empty")
   }else if(id === ""){ 
    alert("Item ID Field Empty")
   }else if(name === ""){ 
    alert("Item Name Field Empty")
   }else if(price === ""){ 
    alert("Item Price Field Empty")
   }else if(qty === ""){ 
    alert("Item Quentity Field Empty")
   }else{
    try{
      await addDoc(item, {
        supplierName: sname,
        supplierContact : snumber,
        itemID: id,
        itemName: name,
        itemPrice: price,
        itemQTY: qty,
        image: " ",
      });
      alert("Item Added Successfully");
      window.location = "/iteminsert";
  
    }catch(err){
            
    }

    setsname("");
    setsnumber("");
    setid("");
    setname("");
    setprice("");
    setqty("");
   }
 
  };


  return (
    <div data-aos="fade-right" data-aos-duration="3000">
      <a href="/shome">
        <PageHeader
         style={{marginLeft:"4rem"}}
          className="site-page-header"
          onBack={() => "/shome"}
          title="Supplier"
          subTitle="Iteminsert"
        />
      </a>

      

      <center>
        <br/>
        <div class="form">
         <br/>

          <h1>Item Insert</h1>

          <br/>

           <input
            type="text"
            id="name1"
            placeholder="Enter Supplier Name"
            className="input"
            onChange={(e) => {
              setsname(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <input
            type="number"
            id="name1"
            placeholder="Enter Supplier Contact Number"
            className="input"
            onChange={(e) => {
              setsnumber(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <input
            type="text"
            id="id22"
            placeholder="Enter Item ID"
            className="input"
            onChange={(e) => {
              setid(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <input
            type="text"
            id="iname"
            placeholder="Enter Item Name"
            className="input"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <input
            type="number"
            id="num"
            placeholder="Enter Item Price"
            className="input"
            onChange={(e) => {
              setprice(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <input
            type="number"
            id="loca"
            placeholder="Enter Item Quentity"
            className="input"
            onChange={(e) => {
              setqty(e.target.value);
            }}
            required
          />
          <br />
          <br />

          <button
            class="btn btn-primary"
            onClick={() => {
              createitem({sname, snumber, id, name, price, qty });
              // document.getElementById("name1").value = " "
              // document.getElementById("skill1").value=" "
            }}
          >
            Add Item
          </button> 
          {/* </Form> */}
          <br/> <br/>
        </div>
        <br /><br />
      </center>
    </div>
  );
}

export default ItemInsert;
