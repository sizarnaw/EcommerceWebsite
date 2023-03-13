import { useEffect, useState } from "react";
import React from "react";
import Axios, { AxiosResponse } from "axios";
import { UserNavbar } from "../components/UserNavbar";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import {  useShoppingCart } from "../context/ShoppingCartContext";
export type ProductsProps = {
    id: string,
    name: string,
    category: string,
    description: string,
    ImgUrl: string,
    price: number,
    stock: number
    comments:{username:string,comment:string,_id:string}[]
}

const UserCatalog: React.FC = () => {
    const [AllItems, setAllItems] = useState<ProductsProps[]>([])
    const {LoginCart,StoreAllItems} = useShoppingCart()
    useEffect(() => {
        
        const fetchAllProducts =  async () =>{
    
            const body = {}
            let user = localStorage.getItem("user");
            
            if (user !== null) {
                let userObj = JSON.parse(user);
                Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
                const res = await Axios.get('http://localhost:8000/products/',
                    ).then((res: AxiosResponse) => {
                        setAllItems(res.data.products)
                        StoreAllItems(res.data.products)
                        
                    })
            }
        }
        fetchAllProducts()
        .catch(()=>{});
        const fetchUserCart = async ()=> {
            let user =  localStorage.getItem("user");
            if (user !== null) {
              let userObj = JSON.parse(user);
                
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const reqURL = 'http://localhost:8000/cart'
            const res =  await Axios.get(reqURL,
            ).then((res: AxiosResponse) => {
                LoginCart(res.data.cartItems.items)
            }). catch((error) => {
            });
          }
        }
        fetchUserCart()
        .catch(()=>{})
    },[])
    return (
        <>
        <UserNavbar />
        <Row md={2} xs={1} lg={3} className="g-3">
            {AllItems.map(item =>(
                <Col key = {item.id}> <StoreItem {...item} /></Col>
                
                ))}
            
        </Row>
        </>
        
    )
    }


export default UserCatalog;



