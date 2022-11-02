import React from "react";
import "antd/dist/antd.css";

import { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import {
  Table,
  PageHeader,
  Button,
  Modal,
  Avatar,
  Image,
  Row,
  Col,
  Typography,
  Divider,
  Spin,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Title } = Typography;
const { Text } = Typography;

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

function OrderById(props) {
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);

  const getOrder = async () => {
    const docRef = doc(db, "orders", props.match.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOrder(docSnap.data());
      let items = [];
      docSnap.data().item.map((i) => {
        items.push({
          image: i.model.image,
          code: i.model.itemID,
          name: i.model.itemName,
          quantity: i.qty,
          itemPrice: i.model.itemPrice,
          total: i.subTotal,
        });
      });
      setItems(items);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    setLoading(true);
    getOrder();
    setLoading(false);
  }, []);

  const getButtonContent = () => {
    if (order.total < 100000 || order.orderState === "Partially Approved") {
      return (
        <Button
          onClick={() => showConfirm("generate the PO!", generatePO)}
          type="primary"
        >
          Generate PO
        </Button>
      );
    } else if (order.total >= 100000 && order.total < 200000) {
      return (
        <Button
          type="primary"
          onClick={() =>
            showConfirm("approve the order and generate the PO!", generatePO)
          }
        >
          Approve and generate PO
        </Button>
      );
    } else {
      return (
        <Button
          type="primary"
          onClick={() =>
            showConfirm(
              "request the approval for this order!",
              requestForApproval
            )
          }
        >
          Request for approval
        </Button>
      );
    }
  };

  const showConfirm = (text, callBack) => {
    confirm({
      title: `Do you want to ${text}`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        callBack();
      },
      onCancel() {},
    });
  };

  const showRejectConfirm = () => {
    confirm({
      title: "Are you sure to reject this order?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        rejectOrder();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const rejectOrder = async () => {
    setLoading(true);

    const batch = writeBatch(db);

    // Update the state and purchase stuatus of the order
    const orderRef = doc(db, "orders", props.match.params.id);
    batch.update(orderRef, {
      orderState: "Rejected",
    });

    // Commit the batch
    await batch.commit();
    setLoading(false);

    props.history.push("/allOrders");
  };

  const requestForApproval = async () => {
    setLoading(true);

    const batch = writeBatch(db);

    // Update the state and purchase stuatus of the order
    const orderRef = doc(db, "orders", props.match.params.id);
    batch.update(orderRef, {
      orderState: "Requesting Approval",
    });

    // Commit the batch
    await batch.commit();
    setLoading(false);
    props.history.push("/allOrders");
  };

  const generatePO = async () => {
    setLoading(true);

    const batch = writeBatch(db);

    // Update the state and purchase stuatus of the order
    const orderRef = doc(db, "orders", props.match.params.id);
    batch.update(orderRef, {
      orderState: "Approved",
      purchaseOrderCreated: true,
    });

    let count = 0;

    items.map((i) => {
      let poRef = doc(db, "purchaseOrders", `PO-${Date.now()}-${count}`);
      batch.set(poRef, {
        orderId: order.id,
        itemId: i.code,
        index: count,
        total: i.total,
        supplierId: "W4J6IyKoRMBwdF8fDaJj"
      });

      ++count;
    });

    // Commit the batch
    await batch.commit();
    setLoading(false);
    props.history.push("/allPurchaseOrders");
  };

  return (
    <div>
      <Spin spinning={loading}>
        <PageHeader
          className="site-page-header"
          onBack={() => props.history.push("/allOrders")}
          title="Order No: "
          subTitle={order && order.id}
        />
        {items.length > 0 && (
          <React.Fragment>
            <Table
              dataSource={items}
              columns={columns}
              pagination={false}
              style={{ padding: "0px 50px 0px 50px" }}
            ></Table>
            <Row style={{ marginTop: 50, marginBottom: 50 }}>
              <Col span={12}></Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Title level={2}>Total</Title>
                  </Col>
                  <Col align="middle" span={12}>
                    <Title level={2} type="danger">
                      {order.total}
                    </Title>
                  </Col>
                </Row>
                <Divider />
              </Col>
            </Row>
            {order.orderState !== "Requesting Approval" && (
              <Row justify="center">
                {getButtonContent()}
                <Button
                  onClick={() => showRejectConfirm()}
                  style={{ marginLeft: 10 }}
                  type="primary"
                  danger
                >
                  Reject Order
                </Button>
              </Row>
            )}

            {order.orderState === "Requesting Approval" && (
              <Row justify="center">
                <Text type="danger">*Note: Please wait for the approval!</Text>
              </Row>
            )}
          </React.Fragment>
        )}
      </Spin>
      <br/>
      <br/>
    </div>
  );
}

export default OrderById;
