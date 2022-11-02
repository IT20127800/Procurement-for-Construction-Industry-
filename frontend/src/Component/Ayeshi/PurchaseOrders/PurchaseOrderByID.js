import React from "react";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {
  Table,
  PageHeader,
  Avatar,
  Image,
  Spin,
  Descriptions,
  Badge,
} from "antd";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (_, { image }) => (
      <>
        <Avatar size={64} src={<Image src={image} />} />
      </>
    ),
  },
  {
    title: "Item Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Unit Price",
    dataIndex: "itemPrice",
    key: "itemPrice",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Amount",
    dataIndex: "total",
    key: "total",
  },
];

function PurchaseOrderByID(props) {
  const [poDetails, setPoDetails] = useState(null);
  const [loading, setLoading] = useState([]);

  const getPurchaseOrderDetails = async () => {
    const poRef = doc(db, "purchaseOrders", props.match.params.id);
    const poSnap = await getDoc(poRef);

    if (poSnap.exists()) {
      const orderRef = doc(db, "orders", poSnap.data().orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        const supplierRef = doc(db, "suppliers", poSnap.data().supplierId);
        const supplierSnap = await getDoc(supplierRef);

        if (supplierSnap.exists()) {
          const p = poSnap.data();
          const o = orderSnap.data();
          const s = supplierSnap.data();
          const i = o.item[p.index];

          let details = {
            poId: props.match.params.id,
            orderId: o.id,
            image: i.model.image,
            code: i.model.itemID,
            name: i.model.itemName,
            quantity: i.qty,
            itemPrice: i.model.itemPrice,
            total: i.subTotal,
            supplierName: s.name,
            supplierContact: s.contactnumber,
            supplierAddress: s.address,
            userName: o.user.name,
            userId: o.user.uid,
          };

          setPoDetails(details);
        } else {
          props.history.push("/allPurchaseOrders");
        }
      } else {
        props.history.push("/allPurchaseOrders");
      }
    } else {
      props.history.push("/allPurchaseOrders");
    }
  };

  useEffect(() => {
    setLoading(true);
    getPurchaseOrderDetails();
    setLoading(false);
  }, []);

  return (
    <div>
      <Spin spinning={loading}>
        <PageHeader
          className="site-page-header"
          onBack={() => props.history.push("/allPurchaseOrders")}
          title="Purchase Order No: "
          subTitle={props.match.params.id}
        />

        {poDetails && (
          <React.Fragment>
            <Descriptions
              layout="vertical"
              bordered
              style={{ padding: "0px 50px 0px 50px" }}
            >
              <Descriptions.Item label="Purchase Order id">
                {props.match.params.id}
              </Descriptions.Item>
              <Descriptions.Item label="Order Id">
                {poDetails.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                {poDetails.total}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running" />
              </Descriptions.Item>
              <Descriptions.Item label="Supplier Name">
                {poDetails.supplierName}
              </Descriptions.Item>
              <Descriptions.Item label="Supplier Contact">
                {poDetails.supplierContact}
              </Descriptions.Item>
              <Descriptions.Item label="Supplier Address">
                {poDetails.supplierAddress}
              </Descriptions.Item>
              <Descriptions.Item label="User Name">
                {poDetails.userName}
              </Descriptions.Item>
              <Descriptions.Item label="User Id">
                {poDetails.userId}
              </Descriptions.Item>
            </Descriptions>
            <Table
              dataSource={[poDetails]}
              columns={columns}
              pagination={false}
              style={{ padding: "0px 50px 0px 50px" }}
            ></Table>
          </React.Fragment>
        )}
      </Spin>
    </div>
  );
}

export default PurchaseOrderByID;
