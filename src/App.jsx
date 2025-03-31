import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import NotFound from "./pages/user/NotFound";
import Collection from "./pages/user/Collection";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";
import Product from "./pages/user/Product";
import Cart from "./pages/user/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaceOrder from "./pages/user/PlaceOrder";
import Orders from "./pages/user/Orders";
import Layout from "./pages/user/layout/Layout";
import AdminLayout from "./pages/admin/layout/AdminLayout";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import AllProducts from "./pages/admin/AllProducts";
import AllOrders from "./pages/admin/AllOrders";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/slices/userSlice";
import { AdminRoute, AuthRoute } from "./lib/routeProtector.jsx";
import Loading from "./components/Loading.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { user, getUserLoading } = useSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (getUserLoading) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="create/" element={<CreateProduct />} />
          <Route path="create/:productId" element={<CreateProduct />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="orders" element={<AllOrders />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
