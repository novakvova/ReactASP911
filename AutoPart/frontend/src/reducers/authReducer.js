import { LOGIN, REGISTER, REGISTER_BEGIN, 
    REGISTER_FAILED, LOGOUT } from "../constants/actionTypes";

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
        case REGISTER_FAILED: {
            return {
                ...state,
                loading: false

            }
        }
        case REGISTER: {
            return {
                isAuth: false,
                loading: false
            };
        }
        case LOGIN: {
            return {
                isAuth: true,
                username: payload.name,
                loading: false
            };
        } 
        case LOGOUT: {
            return { 
                isAuth: false
            }
        }
        default: {
            return state;
        }
    }
    

}

export default authReducer;