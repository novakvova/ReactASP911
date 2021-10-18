import React, {useRef} from 'react'
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
    const { loading, errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();

    const onSubmitHandler = async (values) => {

        console.log("errors", errors);
        try {
            // console.log("submit data ", values);

            // console.log("Server submit file", JSON.stringify(
            //     { 
            //       fileName: values.photo.name, 
            //       type: values.photo.type,
            //       size: `${values.photo.size} bytes`
            //     }
            //   ));
            // var formData = new FormData();
            // formData.append("email", values.email);
            // formData.append("password", values.password);
            // formData.append("photo", values.photo);

            // const result = await authService.register(formData);
            // console.log("Server is good ", result);
            // dispatch({type: REGISTER, payload: values.email});
            // history.push("/");
            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            console.log("setError");
            dispatch(RegisterUser(formData))
                .then(result => {
                    dispatch(push("/"));
                    //history.push("/");
                })
                .catch(ex=> {
                    console.log("Problem register-------------------->",ex);
                    Object.entries(ex.errors).forEach(([key, values]) => {
                        console.log(key, values);
                        let message = '';
                        values.forEach(text=> message+=text+" ");
                        refFormik.current.setFieldError(key,message);
                        //formData.append(key, value)
                    });
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                    //setErrors( );
                    
                });
            
            //const result =  await dispatch(RegisterUser(formData));
            //
        }
        catch (error) {
            console.log("Server is bad register from", errors);
        }
    }

    return (
        
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 ref={titleRef} className="text-center" >Реєстрація</h1>
                <Formik
                    innerRef = {refFormik}
                    initialValues={initState}
                    validationSchema={validationFields()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <MyTextInput
                            label="Електронна пошта"
                            name="email"
                            id="email"
                            type="email" />

                        <MyTextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text" />

                        <MyTextInput
                            label="Прізвище"
                            name="secondName"
                            id="secondName"
                            type="text" />

                        <MyTextInput
                            label="Ім'я"
                            name="firstName" 
                            id="firstName"
                            type="text" />
                        
                        <MyPhotoInput 
                            refFormik={refFormik}
                            field="photo" />

                        <MyTextInput
                            label="Пароль"
                            name="password"
                            id="password"
                            type="password"/>

                        <MyTextInput
                            label="Підтвердження пароль"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password" />

                        <button type="submit" className="btn btn-primary">Реєстрація</button>
                    </Form>
                </Formik>
            </div>

            {loading && <EclipseWidget />}
        </div>
    )
}


export default RegisterPage
