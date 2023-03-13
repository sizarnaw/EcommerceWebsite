import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const validationSchema =() =>  {
        return Yup.object().shape({
          username: Yup.string().required("This field is required!"),
          password: Yup.string().required("This field is required!"),
          passwordConfirmation: Yup.string().required("This field is required!")
          .oneOf([Yup.ref('password')], 'Your passwords do not match.')
      })}
    const handleRegister=(formValue: { username: string; password: string,passwordConfirmation: string }) =>{
        
    setLoading(true)
    let url = `http://localhost:8000/signup`;
    const body = {username:formValue.username , password:formValue.password}
     const res = Axios.post(url,
         body
    ).then((res: AxiosResponse) => {
            if (res.status = 201){
                navigate("/")
            }

        }). catch(()=>{});
        //TODO : catch errors
        
      }
      
      const initialValues = {
        username: "",
        password: "",
        passwordConfirmation: "",
      };
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">   
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}>

            <Form>
                <h2 className="mt-5">Login NOW!</h2>
            <div className="mt-5">
            <label htmlFor="username" className="font-large">username</label>
            <Field name="username" type="text" className="form-control" />
            <ErrorMessage name="username" component="div" />
            </div>

            <div>
            <label htmlFor="password" className="font-large">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" />
            </div>
            <label htmlFor="passwordConfirmation" className="font-large">Confirm Password</label>
            <Field name="passwordConfirmation" type="password" className="form-control" />
            <ErrorMessage name="passwordConfirmation" component="div" />

            <div className="mt-5">
                <button type="submit" className="btn btn-primary px-5 py-2" disabled={loading}>
                    register
                </button>
            </div>
            <button type="submit" className="btn btn-primary px-5 py-2" style={{position: "relative",bottom:-5 }} onClick= {()=> navigate('/')}>
                    Go Back
            </button>
        </Form>
            </Formik>
            </div>
      </div>
    )
    }
export default SignUp;