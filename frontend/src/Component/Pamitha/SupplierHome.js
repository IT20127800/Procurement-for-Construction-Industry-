
import "../../CSS/shome.css";
import truck from "../image/truck.webp";
import { Space, Table, Tag, PageHeader, Button, Modal } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";


function home(){
    AOS.init();

    return(
        <div className="row">

        <PageHeader
          style={{marginLeft:"4rem"}}
          className="site-page-header"
          onBack={() => null}
          title="Supplier"
          subTitle="Dashboard"
        />
            <center>
            <div data-aos="fade-up" data-aos-duration="2000">
                <h1>Supplier Dashboard</h1>
            </div>
            </center>

          


            <div className="col-md-8">
                <br/><br/>
                <center>
                  <div data-aos="fade-right" data-aos-duration="3000">   
                       <img src={truck} style={{width:"600px", height:"400px", merginLeft:"20px"}}/>
                  </div>
                </center>
            </div>

            <div className="col-md-4">
            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/sregister">
            <div className="row"  >
           
                <div className="dashboard">
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">Supplier register</h2>
                </div>
              
            </div>
            </a>
            </div>

            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/registerview">
            <div className="row">
           
                <div className="dashboard">
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">Register View</h2>
                </div>
              
            </div>
            </a>
            </div>  



            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/iteminsert">
            <div className="row">
           
                <div className="dashboard" >
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">Item Insert</h2>
                </div>
              
            </div>
            </a>
            </div>
            <div  data-aos="fade-left" data-aos-duration="3000">
            <a href="/itemview">
            <div className="row">
           
                <div className="dashboard">
                <span class="material-icons-sharp">groups</span>
                    <h2 className="right-menu">Item View</h2>
                </div>
              
            </div>
            </a>
            </div>  
          
            </div>
          

        </div>
    )
}

export default home;