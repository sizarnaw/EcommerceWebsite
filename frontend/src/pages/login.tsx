import React, { useEffect, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
const LogIn: React.FC = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const validationSchema =() =>  {
        return Yup.object().shape({
          username: Yup.string().required("This field is required!"),
          password: Yup.string().required("This field is required!"),
        });
      }
    
      useEffect( () => {
        let user = localStorage.getItem("user");
        if (user !== null) {
            let userObj = JSON.parse(user);

            let screen = userObj.role === 'U' ? "/usercatalog": "/backoffice"
            navigate(screen);
        }
    }, [])

      const handleLogin= async ( formValue: { username: string; password: string }) =>{

        setLoading(true)
        const body = {username:formValue.username, password:formValue.password}
        Axios.post('http://localhost:8000/login',
            body
        ).then((res: AxiosResponse) => {
            
            if (res.status == 200){
                localStorage.setItem("user", JSON.stringify(res.data))
                let screen = res.data.role === 'U' ? "/usercatalog": "/backoffice"
                navigate(screen);
            }else{
                alert(res.data.message)
            }
            

        }). catch((error) => {
            setLoading(false);
            alert(error.response.data.message)
            });
        
      };
        

    const initialValues = {
        username: "",
        password: "",
      };
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">   
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>

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

            <div className="mt-5">
            {/* // this type="submit" is unchangeable - triggers function*/}
            <button type="submit" className="btn btn-primary px-5 py-2" disabled={loading}>
                Login
            </button>
            </div>
            <button type="submit" className="btn btn-primary px-5 py-2" style={{position: "relative",bottom:-5 }} onClick={() => {
                navigate("/signup")
            }}>
                Register
            </button>
        </Form>
            </Formik>
            <div className="mt-5">
            
            </div>
            </div>
      </div>
    )
}

export default LogIn;