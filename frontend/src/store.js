import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productGetReducer,
  getProductsByFilterReducer,
  getProductsByFilterCatReducer,
  productListSubCategoryReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productAdminListReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  userListReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productAdminList: productAdminListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productByFilterList: getProductsByFilterReducer,
  productByFilterListCat: getProductsByFilterCatReducer,
  productGet: productGetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userDetail: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  cart: cartReducer,
  productListSubCategory: productListSubCategoryReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
