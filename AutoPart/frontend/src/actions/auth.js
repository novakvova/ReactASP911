import authService from "../services/auth.service";
import { REGISTER, REGISTER_BEGIN } from "../constants/actionTypes";
import { push } from "connected-react-router";
//import { useHistory } from "react-router-dom";

export const RegisterUser = (model) => async (dispatch) => {
    //const history = useHistory();

    try {
        dispatch({type: REGISTER_BEGIN});
        const result = await authService.register(model);
        dispatch({type: REGISTER, payload: model.email});
        dispatch(push("/"));
        //return Promise.resolve(result);
        
    }
    catch(err) {
        console.log("Propblem register");
        //return Promise.reject(err);
    }
}