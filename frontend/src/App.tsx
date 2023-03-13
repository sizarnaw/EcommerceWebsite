import { Component } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import UserCatalog from './pages/usercatalog';
import BackOffice from './pages/backoffice';
import NoMatch from './pages/nomatch';
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import OrdersBackOffice from './pages/ordersbackoffice';
import AddProduct from './components/backoffice/AddProduct';
import EditProduct from './components/backoffice/EditProduct';
import DeleteProduct from './components/backoffice/DeleteProduct';
import UpdatePermission from './components/backoffice/UpdatePermission';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import CheckedOut from './components/CheckedOut';
class App extends Component{
  render() {

  return (
    <Router>
      <ShoppingCartProvider >
        <Container className = "mb-4">
        <Routes>
          <Route  path="/"  element={<LogIn />} />
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/usercatalog" element={<UserCatalog />} />
          <Route  path="/backoffice" element={<BackOffice />} />
          <Route  path="/usercatalog/checkedout" element={<CheckedOut />} />
          <Route  path="/backoffice/orders" element={<OrdersBackOffice />} />
          <Route  path="/backoffice/addproduct" element={<AddProduct/>} />
          <Route  path="/backoffice/updateproduct" element={<EditProduct/>} />
          <Route  path="/backoffice/deleteproduct" element={<DeleteProduct/>} />
          <Route  path="/backoffice/updatepermission" element={<UpdatePermission/>} />
          <Route  path="*" element={<NoMatch />} />     
        </Routes>
    </Container>
    </ShoppingCartProvider>
      </Router>
  );
}
}

export default App;
