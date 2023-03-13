import { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useShoppingCart } from "../context/ShoppingCartContext";

export type CheckOutInput = {
  
    cc: string,
    holder:string,
    cvv: string,
    exp: string,
    charge:number
    shippingAddress: string,
}
export function CheckOut(){
    const {handleCheckOut,CheckOutClose,getTotalPriceFromCart} = useShoppingCart()
    
    const [loading,setLoading] = useState(false)
    //if empty show this
    const validationSchema =() =>  {
        return Yup.object().shape({

          shippingAddress: Yup.string().required("This field is required!"),
          cc: Yup.string().required("This field is required!"),
          cvv: Yup.string().required("This field is required!"),
          exp: Yup.string().required("This field is required!"),
          holder: Yup.string().required("This field is required!"),    
        });
      }

      
        

    const initialValues = {
        cc: "",
        holder:"",
        cvv: "",
        exp: "",
        charge:getTotalPriceFromCart(),
        shippingAddress:"",

      };
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">   
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCheckOut}>

            <Form>
                <h2 className="mt-5">Check Out Method</h2>
            <div>
            <label htmlFor="holder" className="font-large">Card Holder Name</label>
            <Field name="holder" type="text" className="form-control" />
            <ErrorMessage name="holder" component="div" />
            </div>
            <div>
            <label htmlFor="cc" className="font-large">Card Number</label>
            <Field name="cc" type="text" className="form-control" />
            <ErrorMessage name="cc" component="div" />
            </div>
            <div>
            <label htmlFor="cvv" className="font-large">CVV</label>
            <Field name="cvv" type="text" className="form-control" />
            <ErrorMessage name="cvv" component="div" />
            </div>
            <div>
            <label htmlFor="exp" className="font-large">Exp. Date</label>
            <Field name="exp" type="text" className="form-control" />
            <ErrorMessage name="exp" component="div" />
            </div>
            <div>
            <label htmlFor="shippingAddress" className="font-large">Shipping Address</label>
            <Field name="shippingAddress" type="text" className="form-control" />
            <ErrorMessage name="shippingAddress" component="div" />
            </div>
            <div>
            <label htmlFor="charge" className="font-large" >charge</label>
            <Field name="charge" type="text" className="form-control" disabled={true}/>
            <ErrorMessage name="ShippingAddress" component="div" />
            </div>

            <div className="mt-5">
            {/* // this type="submit" is unchangeable - triggers function*/}
            <button type="submit" className="btn btn-primary px-5 py-2" disabled={loading}>
                PAY
            </button>
            </div>
        </Form>
            </Formik>
            </div>
            <div className="mt-5">
            {/* // this type="submit" is unchangeable - triggers function*/}
            <button type="submit" className="btn btn-danger px-5 py-2" disabled={loading} onClick={CheckOutClose}>
                GoBack
            </button>
            </div>
      </div>

    )
}