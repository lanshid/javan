import { Products } from "../../_interfaces/product.interfaces";
import ShoppingActionTypes from "./shopping.types";

interface ShoppingState {
  wishlist: Products[],
  cart: Products[]
}

const INITIAL_STATE: ShoppingState = {
  wishlist: [],
  cart: []
};

const ShoppingReducer = (state = INITIAL_STATE, action: any): ShoppingState => {
  switch (action.type) {
    case ShoppingActionTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };
    case ShoppingActionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};

export default ShoppingReducer;
