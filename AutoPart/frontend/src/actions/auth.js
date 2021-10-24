import authService from "../services/auth.service";
import { REGISTER, REGISTER_BEGIN, 
    REGISTER_FAILED, LOGIN, LOGOUT
} from "../constants/actionTypes";
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from "jsonwebtoken";


//import { useHistory } from "react-router-dom";

export const RegisterUser = (model) => async (dispatch) => {
    //const history = useHistory();

    try {
        dispatch({type: REGISTER_BEGIN});
        const result = await authService.register(model);
        const token = result.data.token;
        console.log("register reuslt", result);
        dispatch({type: REGISTER});
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(result);
        
    }
    catch(err) {
        const {data} = err.response;
        //console.log("register error", );
        dispatch({type: REGISTER_FAILED});
        
        //console.log("Propblem register");
        return Promise.reject(data);
    }
}

export const authUser = (token) => (dispatch) => {
    var user = jwt.decode(token);
    setAuthorizationToken(token);
    dispatch({type: LOGIN, payload: user});
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch(
        {
            type: LOGOUT
        }
    );
}



