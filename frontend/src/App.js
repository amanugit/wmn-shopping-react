import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componenets/header/Header";
import Home from "./componenets/home/Home";
import Women from "./screens/women/Women";
import Men from "./screens/men/Men";
import Kid from "./screens/kid/Kid";
import ProductDetail from "./screens/productDetail/ProductDetail";
import { Provider } from "react-redux";
import store from "./store";
import Shop from "./screens/shop/Shop";
import Category from "./screens/category/Category";
import Cart from "./screens/cart/Cart";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import Shipping from "./screens/shipping/Shipping";
import Payment from "./screens/payment/Payment";
import PlaceOrder from "./screens/placeholder/PlaceOrder";
import Order from "./screens/order/Order";
import MyOrders from "./screens/myorders/MyOrders";
import Admin from "./screens/admin/Admin";
import AddProduct from "./screens/admin/addproduct/AddProduct";
import EditProduct from "./screens/admin/editProduct/EditProduct";
import ViewProduct from "./screens/admin/viewproduct/ViewProduct";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop/women" component={Women} exact></Route>
          <Route path="/shop/men" component={Men} exact></Route>
          <Route path="/shop/kid" component={Kid} exact></Route>
          <Route path="/cart" component={Cart} exact></Route>
          <Route path="/login" component={Login} exact></Route>
          <Route path="/shipping" component={Shipping} exact></Route>
          <Route path="/register" component={Register} exact></Route>
          <Route path="/payment" component={Payment} exact></Route>
          <Route path="/placeorder" component={PlaceOrder} exact></Route>
          <Route path="/admin" component={Admin} exact></Route>
          <Route path="/admin/:key" component={Admin} exact></Route>
          <Route path="/admin/:key/add" component={AddProduct} exact></Route>
          <Route
            path="/admin/product/:id/edit"
            component={EditProduct}
            exact
          ></Route>
          <Route
            path="/admin/product/:id/"
            component={ViewProduct}
            exact
          ></Route>

          <Route
            path="/admin/products/add"
            component={AddProduct}
            exact
          ></Route>
          <Route path="/order/:id" component={Order} exact></Route>
          <Route path="/user/:userId/orders" component={MyOrders} exact></Route>
          <Route path="/:supcat" component={Shop} exact></Route>
          <Route path="/:supcat/:category" component={Category} exact></Route>

          <Route
            path="/:supcat/:name/:id"
            component={ProductDetail}
            exact
          ></Route>

          <Route path="/" component={Home} exact></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
