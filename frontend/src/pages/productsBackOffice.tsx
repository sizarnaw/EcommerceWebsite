

import { useEffect, useState } from "react";
import Axios, { AxiosResponse } from "axios";
import { Col, Row } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { Prodcuts } from "../components/backoffice/products";



type ProductsProps = {
    id: string,
    name: string,
    category: string,
    description: string,
    ImgUrl: string,
    price: number,
    stock: number


}
export function BackOfficeProducts() {

    useEffect(() => {
        
        const fetchAllProducts =  async () =>{

            let user = localStorage.getItem("user");
            
            if (user !== null) {
                let userObj = JSON.parse(user);
                Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
                const res = await Axios.get('http://localhost:8000/products/',
                    ).then((res: AxiosResponse) => {
                        setstoreItems(res.data.products)
                        
            
                    })
            }else{
                navigate('/')
                //TODO: check if thats work
            }
        }
        fetchAllProducts()
        .catch((error ) =>{
        })
        //TODO:catch 
        
    },[])
    const [storeItems, setstoreItems] = useState<ProductsProps[]>([])
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : ""
    const Permission = userObj.role
    const navigate = useNavigate()

    const ADDProduct = () => {
        return (
            <button type="button" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-3 margin-left" onClick={() => navigate("/backoffice/addproduct")}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> ADD PRODUCT
            </button>
        )
    }

    const EditProduct = () => {
        return (
            <button type="button" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-3 margin-left" onClick={() => navigate("/backoffice/updateproduct")}>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> EDIT PRODUCT BY ID
            </button>
        )
    }
    const DeleteProduct = () => {
        return (
            <button type="button" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-3 margin-left" onClick={() => navigate("/backoffice/deleteproduct")}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> DELETE PRODUCT BY ID
            </button>
        )
    }
    const UpdatePermission = () => {
        return (
            <button type="button" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-3 margin-left" onClick={() => navigate("/backoffice/updatepermission")}>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> UPDATE PERMISSION
            </button>
        )
    }
    return (
        <>

            <div className="btn-toolbar text-center well">


                {Permission !== "W" ? (<>
                    <ADDProduct />
                    <EditProduct />
                </>) : null}
                {Permission === "A" ?
                    (<>
                        <DeleteProduct />
                        <UpdatePermission />
                    </>) : null}

            </div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item => (
                    <Col key={item.id}> <Prodcuts {...item} /></Col>

                ))}

            </Row>
        </>

    )

}
export default BackOfficeProducts;