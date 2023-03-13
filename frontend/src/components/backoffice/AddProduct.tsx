import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { BackOfficeNavbar } from "./BackOfficeNavBar";
import { useNavigate, useParams } from "react-router-dom";
const AddProduct: React.FC = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const validationSchema =() =>  {
        return Yup.object().shape({
          name: Yup.string().required("This field is required!"),
          category: Yup.string().required("This field is required!"),
          description: Yup.string().required("This field is required!"),
          price: Yup.string().required("This field is required!"),
          stock: Yup.string().required("This field is required!"),
        });
      }
      type AddproductDetails = {
        name: string,
        category: string,
        description:string,
        price: number 
        stock:number
        ImgUrl: string
      }
      const handleAddProduct= async ( formValue: AddproductDetails) =>{

        setLoading(true)
        const body = {formValue}
        let user =  localStorage.getItem("user");
        if (user !== null) {
          let userObj = JSON.parse(user);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
        const res =  await Axios.post('http://localhost:8000/products/create',
            body
        ).then((res: AxiosResponse) => {
          alert("Product ADDED!")
          navigate("/backoffice")

        }). catch(()=>{});
      }
        
      };
        

    const initialValues = {
        name: "",
        category: "",
        description:"",
        price: 0, 
        stock:0,
        ImgUrl: ""
      };
    return (
        <div className="container">
            <BackOfficeNavbar/>

            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">   
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddProduct}>

            <Form>
                <h2 className="mt-5">Add Product!</h2>
            <div className="mt-5">
            <label htmlFor="name" className="font-large">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" component="div" />
            </div>

            <div>
            <label htmlFor="category" className="font-large">Category</label>
            <Field name="category" type="category" className="form-control" />
            <ErrorMessage name="category" component="div" />
            </div>
            <div>
            <label htmlFor="description" className="font-large" >Description</label>
            <Field name="description" style={{height: '150px', width:'200px'}} type="description" className="form-control" />
            <ErrorMessage name="description" component="div" />
            </div>
            <div>
            <label htmlFor="price" className="font-large">Price</label>
            <Field name="price" type="price" className="form-control" />
            <ErrorMessage name="price" component="div" />
            </div>
            <div>
            <label htmlFor="stock" className="font-large">Stock</label>
            <Field name="stock" type="stock" className="form-control" />
            <ErrorMessage name="stock" component="div" />
            </div>
            <div>
            <label htmlFor="ImgUrl" className="font-large">ImgUrl</label>
            <Field name="ImgUrl" type="ImgUrl" className="form-control" />
            <ErrorMessage name="ImgUrl" component="div" />
            </div>

            <div className="mt-5">
            <button type="submit" className="btn btn-primary px-5 py-2" disabled={loading}>
                Add
            </button>
            </div>
        </Form>
            </Formik>
            </div>
      </div>
    )
}

export default AddProduct;