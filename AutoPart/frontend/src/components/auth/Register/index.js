import React, {useRef, useState} from 'react'
import { Formik, Form } from 'formik';
import { push } from "connected-react-router";
//import { useHistory } from "react-router-dom";
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';
import { useDispatch, useSelector } from 'react-redux';
import MyPhotoInput from '../../common/MyPhotoInput';
import { RegisterUser } from '../../../actions/auth';
import EclipseWidget from '../../common/eclipse';



const RegisterPage = () => {

    const initState = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        photo: null,
        password: '',
        confirmPassword: ''
    }
    //const history = useHistory();
    const dispatch = useDispatch();
    const { errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (values) => {

        console.log("errors", errors);
        try {            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            setLoading(true);
            dispatch(RegisterUser(formData))
                .then(result => {
                    setLoading(false);
                    dispatch(push("/"));
                })
                .catch(ex=> {
                    setLoading(false);
                    Object.entries(ex.errors).forEach(([key, values]) => {
                        let message = '';
                        values.forEach(text=> message+=text+" ");
                        refFormik.current.setFieldError(key,message);
                    });

                    setInvalid(ex.errors.invalid);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            setLoading(false);
            console.log("Server is bad register from", errors);
        }
    }

    return (
        
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 ref={titleRef} className="text-center" >????????????????????</h1>
                {invalid && invalid.length>0 &&
                    <div className="alert alert-danger">
                        <ul>
                        {
                            invalid.map((text, index) => {
                                return (
                                    <li key={index}>{text}</li>

                                );
                            })
                        }
                        </ul>
                    </div>

                }
                <Formik
                    innerRef = {refFormik}
                    initialValues={initState}
                    validationSchema={validationFields()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <MyTextInput
                            label="???????????????????? ??????????"
                            name="email"
                            id="email"
                            type="email" />

                        <MyTextInput
                            label="??????????????"
                            name="phone"
                            id="phone"
                            type="text" />

                        <MyTextInput
                            label="????????????????"
                            name="secondName"
                            id="secondName"
                            type="text" />

                        <MyTextInput
                            label="????'??"
                            name="firstName" 
                            id="firstName"
                            type="text" />
                        
                        <MyPhotoInput 
                            refFormik={refFormik}
                            field="photo" />

                        <MyTextInput
                            label="????????????"
                            name="password"
                            id="password"
                            type="password"/>

                        <MyTextInput
                            label="?????????????????????????? ????????????"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password" />

                        <button type="submit" className="btn btn-primary">????????????????????</button>
                    </Form>
                </Formik>
            </div>

            {loading && <EclipseWidget />}
        </div>
    )
}


export default RegisterPage
