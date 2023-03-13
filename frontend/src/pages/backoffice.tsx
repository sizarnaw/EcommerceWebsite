
import React from "react";
import { BackOfficeNavbar } from "../components/backoffice/BackOfficeNavBar";
import BackOfficeProducts from "./productsBackOffice";


const BackOffice: React.FC = () => {
     
    return (
            <>
            <BackOfficeNavbar />
            <BackOfficeProducts/>
            </>
            
        )

}
export default BackOffice;
