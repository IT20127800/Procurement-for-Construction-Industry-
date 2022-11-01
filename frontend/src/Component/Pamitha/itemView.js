import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import AOS from "aos";
import "aos/dist/aos.css";

import "antd/dist/antd.css";
import {Form, Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;



// const showConfirm = () => {


  

//   confirm({
//     title: "Do you Want to Accept this Order?",
//     icon: <ExclamationCircleOutlined />,
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };
// const showDeleteConfirm = () => {
//   confirm({
//     title: "Are you sure to Reject this Order?",
//     icon: <ExclamationCircleOutlined />,

//     okText: "Yes",
//     okType: "danger",
//     cancelText: "No",
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };

function ItemView() {

  AOS.init();

  const [items, setitems] = useState([]);

  const p = collection(db, "sitem");
  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(p);
      setitems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getOrders();
  }, []);

  const deleteitem = async (id) => {
    const pitem = doc(db, "sitem", id);
    await deleteDoc(pitem);
  };

  let DataBase = [];
  console.log(items);
  for (let index = 0; index < items.length; index++) {
    console.log(index);
    DataBase.push(items[index]);
  }

  return (

     
    DataBase || [],
    (
    <div data-aos="fade-right" data-aos-duration="3000"> 
   
      <div style={{width:"1200px"}}>
        <PageHeader
         style={{marginLeft:"4rem"}}
          className="site-page-header"
          onBack={() => null}
          title="Supplier"
          subTitle="Item Details"
        />
        <center>

          <h1 style={{marginLeft:"20rem"}}>Suppliers Supply Products Details</h1>


        <Table dataSource={DataBase} pagination={false} style={{marginLeft:"15%", marginRight:"-10rem"}}>
        {/* <Column title="Supplier Name" dataIndex="id" key="firstName" /> */}
            <Column title="Supplier Name" dataIndex="supplierName" key="firstName" />
            <Column title="Supplier Phone Number" dataIndex="supplierContact" key="firstName" />
            <Column title="Item ID" dataIndex="itemID" key="firstName" />
            <Column title="Item Name" dataIndex="itemName" key="lastName" />
            <Column title="Item price" dataIndex="itemPrice" key="age" />
            <Column title="Item Quentity" dataIndex="itemQTY" key="address" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space wrap>
                {/* <Button
                  width="140px"
                  style={{ backgroundColor: "#3b9664" }}
                  color="white"
                  // onClick={showConfirm}
                >
                  Update
                </Button> */}
                <Button
                  width="140px"
                  style={{ backgroundColor: "#ff4d4f" }}
                  color="white"
                  onClick={() => {deleteitem(record.id)}}
                >
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
        </center>
      </div>
    </div>
    )
    
  );
}

export default ItemView;
