import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { BackOfficeNavbar } from "./BackOfficeNavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export type DeleteproductProps = {
  ProductID:string,

}
const DeleteProduct= () => {
    const navigate = useNavigate()
    
      const validationSchema =() =>  {
          return Yup.object().shape({
            ProductID: Yup.string().required("This field is required!"),
  
          });
        }
        const handleDeleteProduct= async ( formValue: DeleteproductProps) =>{

            let user =  localStorage.getItem("user");
            if (user !== null) {
              let userObj = JSON.parse(user);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const res =  await Axios.delete('http://localhost:8000/products/delete/'+formValue.ProductID,
            ).then((res: AxiosResponse) => {
              alert("Product Removed Successfuly!")
              navigate("/backoffice")
    
            }).catch(() => {
                alert("ProductID Not Found!")
                navigate("/backoffice/deleteproduct")
          })
        }
  
        };
        const initialValues={
          ProductID: "0",
        }
          
  
      return (
          <div className="container">
              <BackOfficeNavbar />
  
              <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">   
              <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleDeleteProduct}>
  
              <Form>
                  <h2 className="mt-5">Delete Product!</h2>
              <div className="mt-5">
              <label htmlFor="ProductID" className="font-large">ProductID</label>
              <Field name="ProductID" type="text" className="form-control" />
              <ErrorMessage name="ProductID" component="div" />
              </div>
  
              <div className="mt-5">
              {/* // this type="submit" is unchangeable - triggers function*/}
              <Button type="submit" variant="danger" className="btn btn-primary px-5 py-2" >
                  Delete
              </Button>
              </div>
          </Form>
              </Formik>
              </div>
        </div>
      )
  }
  
  export default DeleteProduct;