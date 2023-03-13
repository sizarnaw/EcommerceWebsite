
import { UserNavbar } from "../components/UserNavbar";
import { useNavigate, useParams } from "react-router-dom";



const CheckedOut= () => {
    const navigate = useNavigate()
    


          
  
      return (
        <div className="jumbotron text-center">
        <UserNavbar/>

        <h1 className="display-3">Thank You!</h1>
        <p className="lead"><strong>Thank You For Purchasing In Our Webiste</strong></p>
        
        <p className="lead">
            <button className="btn btn-primary btn-sm" role="button" onClick={()=> navigate("/usercatalog")}>Continue to homepage</button>
        </p>
        </div>
      )
  }
  
  export default CheckedOut;