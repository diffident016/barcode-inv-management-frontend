import React, { useEffect, useReducer, useState } from "react";
import Products from "../screens/customers/Products";
import ShoppingCart from "../screens/customers/ShoppingCart";
import {
  Cog6ToothIcon,
  CubeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Orders from "../screens/customers/Orders";
import Sidebar from "./Sidebar";
import { Backdrop } from "@mui/material";
import CustomerSignup from "../screens/customers/CustomerSignup";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../states/alerts";
import Navbar from "./Navbar";
import { STORE } from "../../config";
import { getAllProducts } from "../api/product_api";
import { getCart, getOrder } from "../api/order_api";
import socketIO from "socket.io-client";
import { BASEURL } from "../../config";

function Homepage() {
  const [screen, setScreen] = useState(0);
  const [isSignUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.value);
  const customer = useSelector((state) => state.customer.value);

  const [products, setProducts] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      products: [],
      groupProducts: [],
      count: 0,
    }
  );

  const [cart, setCart] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      products: [],
      count: 0,
    }
  );

  const [order, setOrder] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      fetchState: 0,
      orders: [],
      count: 0,
    }
  );

  const fetchOrder = () => {
    setOrder({ fetchState: 0 });
    getOrder(customer._id)
      .then((response) => response.json())
      .then((data) => {
        if (!data) return null;

        setOrder({
          fetchState: data.length < 1 ? 2 : 1,
          orders: data,
          count: data.length,
        });
      })
      .catch((err) => {
        console.log(err);
        setOrder({ fetchState: -1 });
      });
  };

  const fetchCart = () => {
    setCart({ fetchState: 0 });
    getCart(customer._id)
      .then((response) => response.json())
      .then((data) => {
        if (!data) return null;

        setCart({
          fetchState: data.length < 1 ? 2 : 1,
          products: data,
          count: data.length,
        });
      })
      .catch((err) => {
        console.log(err);
        setCart({ fetchState: -1 });
      });
  };

  const fetchProduct = () => {
    setProducts({ fetchState: 0 });
    getAllProducts(STORE.storeID)
      .then((response) => response.json())
      .then((data) => {
        if (!data) return null;

        const group = data.reduce((group, product) => {
          const { category } = product;

          group[category["category_id"]] = group[category["category_id"]] ?? [];
          group[category["category_id"]].push(product);
          return group;
        }, {});

        setProducts({
          fetchState: products.length < 1 ? 2 : 1,
          products: data,
          count: products.length,
          groupProducts: group,
        });
      })
      .catch((err) => {
        console.log(err);
        setProducts({ fetchState: -1 });
      });
  };

  const changeScreen = (index) => {
    if (index > 0) {
      if (!customer._id) {
        setSignUp(true);
        return;
      }
    }
    setScreen(index);
  };

  useEffect(() => {
    fetchProduct();

    if (!customer._id) {
      return;
    }

    fetchCart();
    fetchOrder();
  }, []);

  const screens = [
    {
      label: "Products",
      component: (
        <Products
          user={customer}
          signUp={setSignUp}
          products={products}
          refresh={() => {
            fetchCart();
            fetchOrder();
          }}
        />
      ),
      icon: <ShoppingBagIcon />,
      header: "Welcome, customer!",
    },
    {
      label: "Shopping Cart",
      component: (
        <ShoppingCart
          carts={cart}
          refresh={() => {
            fetchCart();
            fetchOrder();
          }}
        />
      ),
      icon: <ShoppingCartIcon />,
      header: "Shopping Cart",
      count: cart["count"],
    },
    {
      label: "Orders",
      component: (
        <Orders
          orders={order}
          refresh={() => {
            fetchOrder();
          }}
        />
      ),
      icon: <CubeIcon />,
      header: "Ordered Items",
      count: order["count"],
    },
  ];

  return (
    <div className="w-full h-screen">
      <div className="flex flex-row h-full w-full lg:p-4 p-2 lg:gap-4 gap-2 overflow-hidden font-lato text-[#555C68]">
        <div className="lg:w-[20%] w-[12%] h-full bg-white shadow-sm border rounded-lg lg:p-4 p-2">
          <div className="flex justify-center h-20 w-full py-2">
            <h1 className="hidden lg:flex cursor-pointer text-center font-cinzel font-extrabold text-xl text-[#1F2F3D]">
              {STORE.storeName}
            </h1>
          </div>
          <Sidebar
            screens={screens}
            screen={screen}
            setScreen={(index) => {
              changeScreen(index);
            }}
          />
        </div>
        <div className="flex flex-col lg:w-full w-[86%] h-full">
          <Navbar
            screen={screens[screen]}
            user={customer}
            signin={() => {
              setSignUp(true);
            }}
          />
          {screens[screen].component}
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSignUp}
        >
          <CustomerSignup
            close={() => {
              setSignUp(false);
            }}
          />
        </Backdrop>
      </div>
      {alert.show && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={alert.show}
          autoHideDuration={alert.duration}
          onClose={() => {
            dispatch(hide());
          }}
        >
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Homepage;
