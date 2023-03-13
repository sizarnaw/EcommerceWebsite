import { Button, Card, Col } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import Comments from "./Comments"
import { SetStateAction, useState } from "react";
import Axios, { AxiosResponse } from "axios";
type CommentsType={
    username:string,
    comment:string,
    _id:string
}
type StoreItemProps ={
    id: string,
    name: string,
    category: string,
    description: string,
    ImgUrl: string,
    price: number,
    stock: number,
    comments:CommentsType[]
}
export function StoreItem({id,name,category,description,price,stock,ImgUrl,comments}:StoreItemProps){
    const {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const [ProductComments,setProductComments]=useState<CommentsType[]>([])
    const [isCommentsOpen,setisCommentsOpen] = useState<boolean>(false)
    const [MessageValue,setMessageValue] = useState<string>("write Comment")
    function handleComment(event: { target: { value: SetStateAction<string> } }) {
        setMessageValue(event.target.value)
    }
    const quantity = getItemQuantity(id)
    async function handleAddComment(MessageValue:string){
        let user =  localStorage.getItem("user");
            if (user !== null) {
              let userObj = JSON.parse(user);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const body = {userId:userObj.username,comment:MessageValue}
            const res =  await Axios.post('http://localhost:8000/products/comments/'+id,
            body
            ).then((res: AxiosResponse) => {
              alert("Comment Added Successfuly!")
            setProductComments([...comments,{username:userObj.username,comment:MessageValue,_id:res.data.message._id}])
            }). catch(()=>{});
          }
    }
    return <Card className="h-100">
        <Card.Img variant="top" src={ImgUrl} height="200px" style={{objectFit:"cover"}}/>
    <Card.Body className = "d-flex flex-column">
        <Card.Title className = "d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2>">{name}</span>
            <span className="fs-2>">{category}</span>
            <span className="fs-2>">Stock:{stock}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>

        </Card.Title>
            <span className="fs-2>"><b>Description:</b>{description}</span>
        <div >
             {quantity === 0 ? (
                <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                    Add To Cart
                </Button>
             ): <div className="d-flex align-items-center flex-column" style ={{gap:".5rem"}}>
                <div className="d-flex algin-items-center justify-content-center"style ={{gap:".5rem"}}>
                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                    <div>
                        <span className="fs-3">{quantity}</span>
                        in cart
                    </div>
                    {quantity < stock ? (
                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                    ): <>
                    </>}
                </div>
                <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">Remove</Button>
                </div>}
        <input
    type="text"
    name="Comment"
    onChange={event => handleComment(event)}
    autoComplete="off"
  />
        <Button  className ="btn btn-outlined-info"variant="contained" size="lg"type="submit" onClick={()=> handleAddComment(MessageValue)}><b>POST</b></Button>
         
        {!isCommentsOpen? (
            <div className ="mt-auto">
        <Button type="button" className="btn btn-info" onClick={() => setisCommentsOpen(true)}  size="sm" style={{color:"black",position:"relative",bottom:-5}}>Show Comments</Button>
        </div>
        
        ):
        ProductComments.map(item => (
            <Col key={item._id} > <Comments {...item} /></Col>
        
            ))
            
        }
        </div>
    </Card.Body>
    </Card>
}