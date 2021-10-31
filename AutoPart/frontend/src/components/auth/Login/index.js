import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../../actions/auth';
import jwt from 'jsonwebtoken';
import { SET_ROLE } from '../../../constants/actionTypes';
import { push } from 'connected-react-router';

const LoginPage = () => {

    const initState = {
        email: '',
        password: ''
    }
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();


    const onSubmitHandler=(values) => {
        try {            
           
            dispatch(LoginUser(values))
                .then(result => {
                    const token = localStorage.authToken;
                    
                    if (token) {
                        var user = jwt.decode(token);
                        dispatch({type: SET_ROLE, payload: user.roles.toLowerCase()});
                        console.log("roles: ", user.roles);
                        if(user && user.roles.toLowerCase() == 'admin') 
                        {
                            dispatch(push("/admin"));
                            return;
                        }
                    }
                    dispatch(push("/"));
                })
                .catch(ex => {
                    console.log("exception: ", ex);
                    setInvalid(ex.errors.invalid);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            console.log("Server is bad register from", error);
        }
    }

    return (
        <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 ref={titleRef} className="text-center">Вхід на сайт</h1>
                {invalid && invalid.length > 0 &&
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
                    initialValues={initState}
                    validationSchema={validationFields()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <MyTextInput
                            label="Пошта"
                            id="email"
                            name="email"
                            type="text"
                        />

                        <MyTextInput
                            label="Пароль"
                            id="password"
                            name="password"
                            type="password"
                        />
                        <input type="submit" className="btn btn-success" value="Вхід"></input>
                    </Form>
                </Formik>

            </div>


        </div>
    )
}

export default LoginPage
