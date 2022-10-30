import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"

function Supplierregister(){

    const Supplier =collection(db,"suppliers")

     const [name,setname] = useState('');
     const [address,setaddress] = useState('');
     const [contactnumber,setcontactnumber] = useState('');
     const [location,setlocation] = useState('');
  
     const createsupplier = async() => {
      
         await addDoc(Supplier, {name:name,address:address,contactnumber:contactnumber,location:location})

     }
  

    return(
        <>
      <center>

          <h1>Supplier Registration</h1>

      <input type="text" id="name1" placeholder="name" onChange={(e) => {setname(e.target.value)}}/>
      <br/><br/>
      <input type="text" id="address" placeholder="s" onChange={(e) => {setaddress(e.target.value)}}/>
      <br/><br/>
      <input type="text" id="number" placeholder="name" onChange={(e) => {setcontactnumber(e.target.value)}}/>
      <br/><br/>
      <input type="text" id="location" placeholder="skill" onChange={(e) => {setlocation(e.target.value)}}/>
      <br/><br/>

      <button class="btn btn-primary"
      onClick={() => {
        createsupplier({name,address,contactnumber,location})
      // document.getElementById("name1").value = " "
      // document.getElementById("skill1").value=" "
    }}
      >click</button>
       </center> 

        </>
    )
}

export default Supplierregister;