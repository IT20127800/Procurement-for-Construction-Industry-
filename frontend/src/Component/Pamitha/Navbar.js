import "../../CSS/nav.css";
import logo from "../image/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

function nav() {

  AOS.init();

  return (
    <>

    <center>

     <img src={logo} style={{width:"100px"}}/>
      <div data-aos="fade-up" data-aos-duration="2000">
          <h2 style={{fontSize:"40px"}}>Pahasara Construction </h2>
      </div>
    </center>

      <ul>
        <li>
          <a class="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#contact">Manager</a>
        </li>
        <li>
          <a href="#about">Site Manager</a>
        </li>
        <li>
          <a href="#about">Supplier</a>
        </li>
        <li>
          <a href="#about">About us</a>
        </li>
      </ul>
    </>
  );
}

export default nav;
