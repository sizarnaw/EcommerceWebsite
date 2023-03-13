import { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { BackOfficeNavbar } from "./BackOfficeNavBar";
import { useNavigate } from "react-router-dom";
export type EditproductProps = {
  ProductID?:string,
  category?:string,
  name?: string,
  description?:string,
  price?: number 
  stock?:number
  ImgUrl?: string
}
const EditProduct= () => {
    const navigate = useNavigate()
    const [ProductExist,setProdictExist] = useState(false)
    const [ExistProductID,setExistProductID] = useState("")
    //if empty show this
    const validationSchema =() =>  {
        return Yup.object().shape({
          ProductID: Yup.string().required("This field is required!"),

        });
      }
      const handleEditProduct= async ( formValue: EditproductProps) =>{
        if(ProductExist){
        let user =  localStorage.getItem("user");
        if (user !== null) {
          let userObj = JSON.parse(user);

        const body = formValue
        delete body['ProductID']
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
        const reqURL = 'http://localhost:8000/products/updateProduct/'+ExistProductID
        const res =  await Axios.put(reqURL,
          body
        ).then((res: AxiosResponse) => {
          alert("Product Edited Succefully!")
          navigate("/backoffice")
        }). catch(() => {
          alert("Invalid input")
          navigate("/backoffice/updateproduct")
        });
      }
    } else{
      if(formValue.ProductID){
      handleCheckExist({ProductID:formValue.ProductID})
      }else{
        alert("ERROR")
        navigate("/backoffice/updateproduct")
      }
    }
        
      };
      const handleCheckExist= async ( formValue:{ProductID: string})=> {
        let user =  localStorage.getItem("user");
        if (user !== null) {
          let userObj = JSON.parse(user);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
        const reqURL = 'http://localhost:8000/products/'+formValue.ProductID
        const res =  await Axios.get(reqURL,
        ).then((res: AxiosResponse) => {
          setProdictExist(true)
          setExistProductID(formValue.ProductID)
        }). catch(() => {
          alert("ProductID Not Found!")
          navigate("/backoffice/updateproduct")
        });
      }
        
      };
      const initialValues={
        ProductID:ExistProductID
      }

    return (
        <div className="container">
            <BackOfficeNavbar />
            
            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">
              
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEditProduct}> 
            

            <Form>
                <h2 className="mt-5">Edit Product!</h2>
            <div className="mt-5">
            <label htmlFor="ProductID" className="font-large">ProductID</label>
            <Field name="ProductID" type="text" className="form-control"disabled={ProductExist} onSubmit={handleCheckExist}/>
            <ErrorMessage name="ProductID" component="div" />
            </div>
            { !ProductExist ? (
            <div className="mt-5">
            <button type="submit" className="btn btn-primary px-5 py-2">
                Check ProductID Existence!
            </button>
            </div>
            ): (
              <>
              <div className="mt-5">
            <label htmlFor="name" className="font-large">Name</label>
            <Field name="name" type="text" className="form-control" disabled={!ProductExist} />
            <ErrorMessage name="name" component="div" />
            </div>
            <div>
            <label htmlFor="description" className="font-large" >Description</label>
            <Field name="description" style={{height: '150px', width:'200px'}} type="description" className="form-control" disabled={!ProductExist} />
            <ErrorMessage name="description" component="div" />
            </div>
            <div>
            <label htmlFor="category" className="font-large" >Category</label>
            <Field name="category" type="category" className="form-control"disabled={!ProductExist} />
            <ErrorMessage name="category" component="div" />
            </div>
            <div>
            <label htmlFor="price" className="font-large">Price</label>
            <Field name="price" type="price" className="form-control" disabled={!ProductExist}/>
            <ErrorMessage name="price" component="div" />
            </div>
            <div>
            <label htmlFor="stock" className="font-large">Stock</label>
            <Field name="stock" type="stock" className="form-control" disabled={!ProductExist}/>
            <ErrorMessage name="stock" component="div" />
            </div>
            <div>
            <label htmlFor="ImgUrl" className="font-large">ImgUrl</label>
            <Field name="ImgUrl" type="ImgUrl" className="form-control" disabled={!ProductExist}/>
            <ErrorMessage name="ImgUrl" component="div" />
            </div>

            <div className="mt-5">
            <button type="submit" className="btn btn-primary px-5 py-2">
                Edit
            </button>
            </div>
        </>
        )}
        </Form>
            </Formik> 
            </div>
      </div>
    )
}

export default EditProduct;