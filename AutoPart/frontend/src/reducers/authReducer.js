import { LOGIN, REGISTER, REGISTER_BEGIN } from "../constants/actionTypes";

const initialState ={
    isAuth: false,
    username: "",
    loading: false
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case REGISTER_BEGIN: {
            return {
                ...state,
                loading: true
            }
        }
        case REGISTER:
        case LOGIN: {
            return {
                isAuth: true,
                username: payload,
                loading: false
            };
        } 
    }
    return state;

}

export default authReducer;