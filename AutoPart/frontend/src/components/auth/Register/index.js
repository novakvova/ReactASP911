import React, { Component } from 'react'
import TextBoxField from '../../common/TextBoxField';

export class RegisterPage extends Component {

    state = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        password: '',
        confirmPassword: ''
    }

    onChangeHandler = (e) => {
        //console.log("onChange name", e.target.name);
        //console.log("onChange value", e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        console.log("state", this.state);
        const {email, password} = this.state;
        return (
            <div className="row">
                <div className="offset-md-3 col-md-6">
                <h1 className="text-center">Реєстрація</h1>
                <form>
                    <TextBoxField 
                        field="email"
                        label="Електронна пошта"
                        value={email}
                        onChangeHandler={this.onChangeHandler}/>

                    <TextBoxField 
                        field="password"
                        type="password"
                        label="Пароль"
                        value={password}
                        onChangeHandler={this.onChangeHandler}/>

                    
                </form>
                </div>

            </div>
        )
    }
}

export default RegisterPage
