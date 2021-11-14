import http from "../http_common";

class CartService {

    add(data) {
        return http.post("api/carts/add", data);
    }
}

export default new CartService();