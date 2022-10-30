import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"



function SupplierView() {

     const [persons,setPersons]=useState([]);

     const p = collection(db,"suppliers")
     useEffect(()=>{
     const getOrders=async()=>{
      const data=await getDocs(p)
      setPersons(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

     };
     getOrders();
  },[])

    return(
        <>

       <table>
          <tr>
               <td>Name</td>
               <td>Address</td>
               <td>ContactNumber</td>
               <td>Location</td>
          </tr>

        {persons.map((person)=>{
          return <div>
            <tr>
                <td> {person.name}</td>
                <td> {person.address}</td>
                <td> {person.contactnumber}</td>
                <td> {person.location}</td>
            </tr>
          </div>
        })}

        </table>
        </>
    )
}

export default SupplierView;