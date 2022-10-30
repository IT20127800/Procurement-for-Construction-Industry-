import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore"
import { async } from "@firebase/util";



function ItemView() {

     const [items,setitems]=useState([]);

     const p = collection(db,"items")
     useEffect(()=>{
     const getOrders=async()=>{
      const data=await getDocs(p)
      setitems(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

     };
     getOrders();
  },[])

  const deleteitem = async(id) => {
    const pitem = doc(db,"items", id);
    await deleteDoc(pitem);
  };

    return(
        <>

       <table class="table table-striped">
        <thead>
          <tr>
               <th>Name</th>
               <th>Address</th>
               <th>ContactNumber</th>
               <th>Location</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item)=>{
          return <div>
            <tr>
          
                <td style={{padding:"10px"}}> {item.itemID}</td>
                <td> {item.itemName}</td>
                <td> {item.itemPrice}</td>
                <td> {item.itemQTY}</td>
                <td> <button onClick={() => {deleteitem(item.id)}}>Delete</button></td>
            </tr>
          </div>
        })}
        </tbody>
     </table>
        </>
    )
}

export default ItemView;