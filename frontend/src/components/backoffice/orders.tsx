import {  Stack } from "react-bootstrap"
import { formatCurrency } from "../../utilities/formatCurrency"
import Axios, { AxiosResponse } from "axios";
require('bootstrap')

type OrderItemProps ={
    orderId: string,
    userId: string,
    status: string,
    createdAt: string,
    totalprice:number,
    shippingAddress:string,
}
export function Orders({orderId,totalprice,shippingAddress,userId,status}:OrderItemProps){
    const Waitinggoption:string = "Waiting for Delivery"
    const Shippingoption:string = "Shipping"
    const Shippededoption:string = "Shipped"

    const ChangeStatus= async ( formValue: {orderId:string,status:string,newStatus:string}) =>{
        let user =  localStorage.getItem("user");
        const body = formValue
        if (user !== null) {
          let userObj = JSON.parse(user);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
        const res =  await Axios.put('http://localhost:8000/shopping/orders/status/',
        body
        ).then((res: AxiosResponse) => {
            window.location.reload()
        }). catch((e) =>{
            alert(e.response.data.message)

        });
      }
    
      
    };
    return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center" >
        <div className="me-auto" >

          <div>
            <b>Order ID:{orderId}{" "}</b>
          </div>
          <div>
            Customer ID: <b>{userId}</b>
          </div>
          <div>
            Shipping Address: <b>{shippingAddress}</b>
          </div>
          <div style={{color:"blue"}}>
          Status:<b>{status}</b>
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
          Total Order Price:<b>{formatCurrency(totalprice)}</b>
          </div>
        </div>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Status Change
            </button>
            <ul className="dropdown-menu">
              <button className="dropdown-item" onClick={() =>ChangeStatus({orderId,status,newStatus:Waitinggoption})}>Waiting For Delivery</button>
              <button className="dropdown-item" onClick={() =>ChangeStatus({orderId,status,newStatus:Shippingoption})}>Shipping</button>
              <button className="dropdown-item" onClick={() =>ChangeStatus({orderId,status,newStatus:Shippededoption})}>Shipped</button>

            </ul>
          </div> 
        
        </Stack>
    )
}