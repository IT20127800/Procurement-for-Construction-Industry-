import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import "../../CSS/iteminsert.css";

function Supplierregister() {
  const Supplier = collection(db, "suppliers");

  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [location, setlocation] = useState("");

  const createsupplier = async () => {

    try{
    await addDoc(Supplier, {
      name: name,
      address: address,
      contactnumber: contactnumber,
      location: location,
    });
    alert("Supplier Registration Success")
  }catch(err){
    alert(err);
  }
  };

  return (
    <div data-aos="fade-right" data-aos-duration="3000">

       <PageHeader
         style={{marginLeft:"4rem"}}
          className="site-page-header"
          onBack={() => "/shome"}
          title="Supplier"
          subTitle="registration"
        />
      <center>
       
        <br />
        <div class="form">

        <br/>

        <h1>Supplier Registration</h1>

        <br />
        <input
          type="text"
          id="name1"
          className="input"
          placeholder="Enter Supplier name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          id="address"
          className="input"
          placeholder="Enter address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          id="number"
          className="input"
          placeholder="Enter Contact Number"
          onChange={(e) => {
            setcontactnumber(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="text"
          id="location"
          className="input"
          placeholder="Enter location"
          onChange={(e) => {
            setlocation(e.target.value);
          }}
        />
        <br />
        <br />

        <button
          class="btn btn-primary" style={{width:"150px"}}
          onClick={() => {
            createsupplier({ name, address, contactnumber, location });
            // document.getElementById("name1").value = " "
            // document.getElementById("skill1").value=" "
          }}
        >
          Register
        </button>
        <br />
        <br />

        </div>
      </center>
      <br />
    </div>
  );
}

export default Supplierregister;
