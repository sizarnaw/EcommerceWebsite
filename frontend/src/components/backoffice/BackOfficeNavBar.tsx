import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import {FaUserCircle} from "react-icons/fa"
export function BackOfficeNavbar() {
    const navigate = useNavigate()
    let name = "ERROR"
    let user = localStorage.getItem("user");
    if(user == null){
        navigate("nomatch")
    }else{

        let userObj = JSON.parse(user);
        name = userObj.username
    }
    
    function handleLogout(): void {
        localStorage.removeItem("user");
        navigate('/')
    }
    
    return(
    <>
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <Button onClick ={() => handleLogout()} style={{ width: "4.7rem", height: "3rem", position: "absolute",bottom:0, color:"blue"}} variant="outline-primary" className="rounded-circle btn btn-outline-primary">
            
            <b>logout</b>
        </Button>
        <div className="fs-8 btn btn-outline-primary" style={{ color: "blue",position: "absolute" , right:0, bottom:1}}>
            <b>{name}</b> <FaUserCircle size="1.5rem"/>
        </div>

        </Navbar>
     <Navbar sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/backoffice" as={NavLink} >
                    products
                </Nav.Link>

            </Nav>
            <Nav className=" me-auto">
                <Nav.Link to="/backoffice/orders" as={NavLink} >
                    orders
                </Nav.Link>

            </Nav>
            
        </Container>

    </Navbar>
    </>
    )
}


