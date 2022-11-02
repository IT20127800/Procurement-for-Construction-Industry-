
import "../../CSS/managerhome.css";
import person from "../image/ManagerHome.png";
import { Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";


function managerHome(){
    AOS.init();

    return(
        <div className="row">

        <PageHeader
          style={{marginLeft:"4rem"}}
          className="site-page-header"
          onBack={() => null}
          title="Manager"
          subTitle="Dashboard"
        />
            <center>
            <div data-aos="fade-up" data-aos-duration="2000">
                <h1>Manager Dashboard</h1>
            </div>
            </center>

          


            <div className="col-md-8">
                <br/><br/>
                <center>
                  <div data-aos="fade-right" data-aos-duration="3000">   
                       <img src={person} style={{width:"600px", height:"400px", merginLeft:"20px"}}/>
                  </div>
                </center>
            </div>

            <div className="col-md-4">
            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/allOrders">
            <div className="row"  >
           
                <div className="dashboard">
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">All Orders</h2>
                </div>
              
            </div>
            </a>
            </div>

            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/allPurchaseOrders">
            <div className="row">
           
                <div className="dashboard">
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">Purchase Orders</h2>
                </div>
              
            </div>
            </a>
            </div>  



           
            
            </div>
          

        </div>
    )
}

export default managerHome;