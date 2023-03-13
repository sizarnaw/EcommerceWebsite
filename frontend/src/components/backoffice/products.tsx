import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../../utilities/formatCurrency"
import Axios, { AxiosResponse } from "axios";

type StoreItemProps ={
    id:string,
    name:string,
    price:number,
    ImgUrl:string,
    stock:number,
    description:string
}
export function Prodcuts({id,name,price,ImgUrl,stock,description}:StoreItemProps){
    const user =  localStorage.getItem("user");
    const userObj = user? JSON.parse(user) : ""
    const Permission = userObj.role
    const navigate = useNavigate()


    async function removeProducts(id:string){
        let user =  localStorage.getItem("user");
            if (user !== null) {
              let userObj = JSON.parse(user);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const res =  await Axios.delete('http://localhost:8000/products/delete/'+id,
            ).then((res: AxiosResponse) => {
              alert("Product Removed Successfuly!")
              window.location.reload()
    
            }). catch(()=>{});
          }

    }
    return <Card className="h-100">
        <Card.Img variant="top" src={ImgUrl} height="200px" style={{objectFit:"cover"}}/>
    <Card.Body className = "d-flex flex-column">
        <Card.Title className = "d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2>">Id:{id}</span>
            <span className="fs-2>">Name:{name}</span>
            <span className="fs-2>">Stock:{stock}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>

        </Card.Title>
        <div className="ms-2 text-muted>"><b>Description:</b>{description}</div>
        { Permission !== "W" ?(
        <Button type="button" className="btn btn-primary btn-color btn-bg-color " onClick={() => navigate("/backoffice/updateproduct" )}  size="sm">
        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span> EDIT PRODUCT
        </Button>
        ): <>
        </>}
        { Permission === "A" ? (
        <Button type="button" className="btn btn-primary btn-color btn-bg-color  " onClick={() => removeProducts(id)} variant="danger" size="sm">
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> DELETE PRODUCT
        </Button>
        ) : <>
        </>}

    </Card.Body>
    </Card>
}