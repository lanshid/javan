import { Products } from '../../_interfaces/product.interfaces';
import ShoppingActionTypes from './shopping.types';

export const SetWishList = (product: Products[]) => {
  return ( (dispatch: any) => {
    dispatch({ type: ShoppingActionTypes.SET_WISHLIST, payload: product });
  })
};

export const SetCart = (product: Products[]) => {
  return ( (dispatch: any) => {
    dispatch({ type: ShoppingActionTypes.SET_CART, payload: product });
  })
};

export const showToast = () => {
  return ( (dispatch: any) => {
    dispatch({ type: ShoppingActionTypes.SHOW_TOAST});
  })
};

export const hideToast = () => {
  return ( (dispatch: any) => {
    dispatch({ type: ShoppingActionTypes.SHOW_TOAST});
  })
};