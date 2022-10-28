

 const [orders,setOrders]=useState([]);
 const OrderCollection=collection(db,"orders")
 useEffect(()=>{
    const getOrders=async()=>{
     const data=await getDocs(OrderCollection)
     setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))

    };
    getOrders();
 },[])