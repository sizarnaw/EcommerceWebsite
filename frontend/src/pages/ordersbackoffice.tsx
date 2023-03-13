

import { useEffect, useState } from "react";
import Axios, { AxiosResponse } from "axios";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { BackOfficeNavbar } from "../components/backoffice/BackOfficeNavBar";
import { Orders } from "../components/backoffice/orders";

type OrdersProps={
    orderId: string,
    userId: string,
    status: string,
    paymentToken: string,
    items: [],
    createdAt: string,
    totalprice:number,
    shippingAddress:string,
}
const OrdersBackOffice: React.FC = () => {
    const [storeOrders,setstoreOrders]=useState<OrdersProps[]>([])

    useEffect(() => {
        
        const fetchOrders =  async () =>{

            let user = localStorage.getItem("user");
            
            if (user !== null) {
                let userObj = JSON.parse(user);
                Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
                const res = await Axios.get('http://localhost:8000/shopping/orders',
                    ).then((res: AxiosResponse) => {
                        setstoreOrders(res.data)

            
                    })
            }else{
            }
        }
        fetchOrders()
        .catch(()=>{});
        //TODO:catch 
        
    },[])
    return (
        <>
        <BackOfficeNavbar/>
        <div className="btn-toolbar text-center well">
      <span className="glyphicon glyphicon-edit" aria-hidden="true" ></span> Here You Can Change Status Of The Orders
    
    </div>
        <Row md={2} xs={1} lg={3} className="g-3">
            {storeOrders.map(order =>(
                <Col key = {order.orderId}> <Orders {...order} /></Col>
                
                ))}
            
        </Row>
        </>
        
    )

}
export default OrdersBackOffice;