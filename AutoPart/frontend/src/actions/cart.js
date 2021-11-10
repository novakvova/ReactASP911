import cartService from "../services/cart.service";
import { CART_ADD_PRODUCT } from "../constants/actionTypes";

export const AddCartProduct = (product) => async (dispatch) => {
    try {
        const {data} = await cartService.add(product);
        dispatch({type: CART_ADD_PRODUCT, payload: data});
        return Promise.resolve();
        
    }
    catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}



