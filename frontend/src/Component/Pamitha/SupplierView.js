import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc,doc,deleteDoc } from "firebase/firestore";
import "antd/dist/antd.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;



// const showConfirm = () => {

//   AOS.init();

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

function SupplierView() {
  const [persons, setPersons] = useState([]);

  const p = collection(db, "suppliers");
  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(p);
      setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getOrders();
  }, []);

  const deleteitem = async (id) => {
    try{
    const pitem = doc(db, "suppliers", id);
    await deleteDoc(pitem);
    window.location = "/registerview";

    }catch(err){
      alert(err);
    }
  };

  let DataBase = [];
  console.log(persons);
  for (let index = 0; index < persons.length; index++) {
    console.log(index);
    DataBase.push(persons[index]);
  }

  return (
    DataBase || [],
    (
      <div>
         <div data-aos="fade-right" data-aos-duration="3000"> 
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Supplier"
          subTitle="Suppliers Details"
        />
        <center>
           <h1>Suppliers Details</h1>
        </center>

        <Table dataSource={DataBase} pagination={false} style={{marginLeft:"15rem", marginRight:"5rem"}}>
         
          <Column title="Name" dataIndex="name" key="firstName" />
          <Column title="Address" dataIndex="address" key="lastName" />
         
          <Column title="Contact Number" dataIndex="contactnumber" key="age" />
          <Column title="Location" dataIndex="location" key="address" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space wrap>
                {/* <Button
                  width="140px"
                  style={{ backgroundColor: "#3b9664" }}
                  color="white"
                  onClick={showConfirm}
                >
                  Accept
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
        <br/>
        <br/>
        </div>
      </div>
    )

    //  {/* <table>
    //     <tr>
    //          <td>Name</td>
    //          <td>Address</td>
    //          <td>ContactNumber</td>
    //          <td>Location</td>
    //     </tr>

    //   {persons.map((person)=>{
    //     return <div>
    //       <tr>
    //           <td> {person.name}</td>
    //           <td> {person.address}</td>
    //           <td> {person.contactnumber}</td>
    //           <td> {person.location}</td>
    //       </tr>
    //     </div>
    //   })}

    //   </table> */}
  );
}

export default SupplierView;
