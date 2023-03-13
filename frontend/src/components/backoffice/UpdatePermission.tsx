import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios, { AxiosResponse } from "axios";
import { BackOfficeNavbar } from "./BackOfficeNavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export type UpdatePermissionProps = {
    username: string
    permission: string
}
const UpdatePermission = () => {
    const navigate = useNavigate()
    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string().required("This field is required!"),
            permission: Yup.string().required("This field is required!"),

        });
    }
    const handleUpdatePermission = async (formValue: UpdatePermissionProps) => {
        if(formValue.permission =="N"){
            alert("Please Select Correct Role")
            navigate("/backoffice/updatepermission")
        }
        let user = localStorage.getItem("user");
        const body = formValue
        if (user !== null) {
            let userObj = JSON.parse(user);
            Axios.defaults.headers.common['Authorization'] = `Bearer ${userObj.token}`;
            const res = await Axios.post('http://localhost:8000/permission',
                body
            ).then((res: AxiosResponse) => {
                alert("Permission Updated Successfuly")
                navigate("/backoffice")

            }). catch(() => {
                alert("ProductID Not Found!")
                navigate("/backoffice/updatepermission")
              });
            
        }


    };
    const initialValues = {
        username: "",
        permission: "",
    }


    return (
        <div className="container">
            <BackOfficeNavbar />

            <div className="d-flex justify-content-center align-items-center flex-direction-column w-100 text-center my-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdatePermission}>

                    <Form>
                        <h2 className="mt-5">Update Permission!</h2>
                        <div className="mt-5">
                            <label htmlFor="username" className="font-large">Username</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="permission" className="font-large">Role:</label>
                            <Field as="select" name="permission">
                                <option value="N">None</option>
                                <option value="U">User</option>
                                <option value="W">Worker</option>
                                <option value="M">Manager</option>
                            </Field>
                        </div>
                        <div className="mt-5">
                            <Button type="submit" className="btn btn-primary px-5 py-2" >
                                Update
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default UpdatePermission;