import React, { useState, useMemo, useEffect } from "react";
import barcode from "../../assets/images/barcode.png";
import { Backdrop, CircularProgress } from "@mui/material";
import empty from "../../assets/images/no-products.svg";
import error from "../../assets/images/error.svg";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { STORE } from "../../../config";
import ScanBarcode from "../../components/ScanBarcode";
import { checkoutOrder } from "../../api/order_api";
import { useDispatch } from "react-redux";
import { show } from "../../states/alerts";

function Dashboard({ signUp, user, products, refresh, categories }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(0);
  const [showProduct, setShowProduct] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [scan, setScan] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isProceed, setProceed] = useState(false);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let tempS = 0;
    orders.map((item) => {
      tempS += item["item"]["price"] * item["quantity"];
    });

    setTotal(tempS);
  }, [orders]);

  const cat = useMemo(() => {
    var temp = [
      {
        label: "Filter by categories",
        value: 0,
      },
    ];

    if (categories.fetchState != 1) return temp;

    temp = temp.concat(
      categories["categories"].map((c) => {
        return {
          label: c["category_name"],
          value: c,
        };
      })
    );

    return temp;
  }, [categories]);

  const handleProducts = () => {
    if (filter != 0)
      return products["groupProducts"][filter.category_name] || [];

    return products["products"];
  };

  const search = (query) => {
    var temp = handleProducts();

    temp = temp.filter((product) => {
      var name = product.name.toLowerCase().indexOf(query.toLowerCase());
      return name !== -1;
    });

    return temp;
  };

  const statusBuilder = (state) => {
    if (state == 2) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center pb-8">
          <img src={empty} className="w-60 h-60" />
          <h1 className="font-lato text-lg ">
            Oops, this store has no products yet.
          </h1>
        </div>
      );
    }

    if (state == -1) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center pb-8">
          <img src={error} className="w-60 h-60" />
          <h1 className="font-lato text-lg ">Oops, an error occurred.</h1>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center pb-8 gap-4">
        <CircularProgress color="inherit" className="text-[#ffc100]" />
        <h1 className="font-lato">Loading products, please wait...</h1>
      </div>
    );
  };

  const proceedOrder = async () => {
    setProceed(true);
    let temp = orders.map((order, index) => {
      const newOrder = {
        storeID: STORE.storeID,
        productID: order["item"]._id,
        product: order["item"],
        quantity: order["quantity"],
        orderDate: new Date(),
        orderStatus: 2,
        orderAmount: order["item"].price * order["quantity"],
      };

      return newOrder;
    });

    checkoutOrder(temp)
      .then((res) => res.json())
      .then((_) => {
        setOrders([]);
        setProceed(false);
        dispatch(
          show({
            type: "success",
            message: "Order was successful.",
            duration: 3000,
            show: true,
          })
        );
        refresh();
      })
      .catch((err) => {
        setProceed(false);
        dispatch(
          show({
            type: "error",
            message: "Something went wrong.",
            duration: 2000,
            show: true,
          })
        );
      });
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden mt-4">
      <div className="w-full h-full flex flex-row gap-4">
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-row w-full my-4 items-center lg:px-2 ">
            <div className="flex flex-row w-full gap-4">
              <div className="w-[350px] flex flex-col">
                <p className="font-lato-bold text-sm px-1 py-[2px]">Search</p>
                <input
                  value={query}
                  onChange={(e) => {
                    const query = e.target.value;
                    setQuery(query);

                    if (query == "") return setNewProducts(null);

                    setNewProducts(search(query));
                  }}
                  className="px-2 text-sm rounded-md h-9 border focus:outline-none bg-white shadow-sm"
                  placeholder="Search a product"
                />
              </div>
              <div className="w-[250px] flex flex-col">
                <p className="font-lato-bold text-sm px-1 py-[2px]">Category</p>
                <div className="h-9 rounded-md focus:outline-none border px-1 bg-white shadow-sm">
                  <select
                    onChange={(e) => {
                      const value = JSON.parse(e.target.value);
                      if (value == 0) return setFilter(0);

                      setFilter(value);
                    }}
                    className="w-full h-full focus:outline-none bg-transparent text-sm "
                  >
                    {cat.map((item, i) => (
                      <option
                        selected={item.value == 0 && filter == 0}
                        id={item.id}
                        value={JSON.stringify(item.value)}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {filter != 0 && (
              <div className="h-full w-full flex items-end px-2">
                {
                  <p
                    onClick={() => {
                      setFilter(0);
                    }}
                    className="text-sm h-9 flex items-center font-lato-bold cursor-pointer"
                  >
                    Clear filter
                  </p>
                }
              </div>
            )}

            <div className="flex-1 flex flex-col self-end items-end">
              <div
                onClick={() => {
                  setScan(true);
                }}
                className="shadow-sm flex gap-2 cursor-pointer justify-center h-9 p-2 w-52 rounded-md bg-white border"
              >
                <img src={barcode} className="w-5" />
                <h1 className="font-lato-bold text-sm">Scan Barcode</h1>
              </div>
            </div>
          </div>

          {products.fetchState != 1 ? (
            statusBuilder(products.fetchState)
          ) : (newProducts || handleProducts()).length == 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="font-lato-bold">No products found.</p>
            </div>
          ) : (
            <div className="w-full h-full overflow-auto lg:px-2">
              <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-4 py-2">
                {(newProducts || handleProducts()).map((item) => {
                  return (
                    <div
                      key={item._id}
                      onClick={() => {
                        let isAdded = false;

                        if (item.stock - item.sold < 1) return null;

                        if (orders) {
                          isAdded = orders.filter((order) => {
                            return order["item"]["_id"] == item["_id"];
                          });
                        }

                        let temp = [...orders];

                        if (isAdded.length > 0) {
                          let index = orders
                            .map((order) => order["item"]._id)
                            .indexOf(item._id);

                          if (
                            temp[index]["quantity"] <
                            temp[index]["item"]["stock"] -
                              temp[index]["item"]["sold"]
                          ) {
                            temp[index]["quantity"] =
                              temp[index]["quantity"] + 1;
                          }
                        } else {
                          temp.push({
                            item: item,
                            quantity: 1,
                          });
                        }

                        setOrders(temp);
                      }}
                      className={`${
                        item.stock - item.sold < 1 && "opacity-50"
                      } cursor-pointer hover:ring-1 ring-[#ffc100] flex flex-col bg-white items-center h-[250px] w-full border rounded-lg shadow-sm p-4`}
                    >
                      <div className="w-full h-28 flex justify-center">
                        <img
                          src={item.photoUrl}
                          alt={item.name}
                          className="h-32 w-32 object-cover"
                        />
                      </div>
                      <div className="flex w-full h-8 mt-8">
                        <h1 className="font-lato-bold leading-none">
                          {item.name}
                        </h1>
                      </div>
                      <div className="mt-2 flex flex-row w-full justify-between">
                        <p className="font-lato-bold text-sm">
                          {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </p>
                        <p className="px-2 text-sm">
                          Stock:{" "}
                          <span className="font-lato-bold">
                            {item.stock - item.sold}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={scan}
              >
                {scan && (
                  <ScanBarcode
                    products={products["products"]}
                    stream={scan}
                    close={() => {
                      setScan(false);
                    }}
                    isCustomer={true}
                    seeDetails={(product) => {
                      setShowProduct(product);
                    }}
                  />
                )}
              </Backdrop>
            </div>
          )}
        </div>
        <div className="w-[550px] h-full bg-white rounded-lg border">
          <div className="flex flex-col p-4 h-full w-full">
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-lato-bold text-lg">Orders</h1>
              {orders.length > 0 && (
                <p
                  onClick={() => {
                    setOrders([]);
                  }}
                  className="text-sm cursor-pointer"
                >
                  Clear all
                </p>
              )}
            </div>

            <div className="w-full flex-1 flex flex-col overflow-hidden mb-3">
              {orders.length < 1 ? (
                <div className="h-full w-full flex items-center justify-center">
                  <h1 className="text-center">Select an item to order.</h1>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col px-2 py-2 overflow-auto gap-4">
                  {orders.map((item, index) => {
                    return (
                      <div className="flex flex-row h-14 items-center gap-2">
                        <img
                          src={item["item"].photoUrl}
                          alt={item["item"].name}
                          className="h-12 w-12 object-cover rounded-lg border shadow-sm"
                        />
                        <div className="flex-1 flex flex-col w-full text-sm">
                          <h1 className="font-lato leading-none">
                            {item["item"].name}
                          </h1>
                          <p className="font-lato-bold text-sm">
                            {item["item"].price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </p>
                        </div>
                        <div className="w-[80px]">
                          <div
                            className={`my-1 h-8 items-center flex flex-row max-w-min py-1 px-2 border rounded-[15px] shadow-sm select-none text-sm`}
                          >
                            <MinusIcon
                              onClick={() => {
                                let temp = [...orders];

                                let newItem = temp[index];

                                newItem["quantity"] = newItem["quantity"] - 1;

                                if (newItem["quantity"] <= 0) {
                                  temp.splice(index, 1);
                                }

                                setOrders(temp);
                              }}
                              className={`w-4 cursor-pointer text-[#1F2F3D]`}
                            />
                            <p className="w-8 bg-white text-center font-lato-bold">
                              {item.quantity}
                            </p>
                            <PlusIcon
                              onClick={() => {
                                let temp = [...orders];

                                let newItem = temp[index];

                                if (
                                  newItem["quantity"] <
                                  newItem["item"]["stock"] -
                                    newItem["item"]["sold"]
                                ) {
                                  newItem["quantity"] = newItem["quantity"] + 1;
                                }

                                setOrders(temp);
                              }}
                              className={`w-4 cursor-pointer text-[#1F2F3D]`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-full h-[150px] flex flex-col px-8">
              <div className="flex flex-row justify-between">
                <h1 className="text-sm font-lato-bold">Subtotal</h1>
                <h1 className="text-sm font-lato-bold">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h1>
              </div>
              <div className="flex flex-row justify-between">
                <h1 className="text-sm font-lato">Tax</h1>
                <h1 className="text-sm font-lato">
                  {[0].toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h1>
              </div>
              <div className="h-[1px] my-2 border border-b-[#555C68] border-dashed"></div>
              <div className="flex flex-row justify-between">
                <h1 className="text-base font-lato-bold">Total</h1>
                <h1 className="text-base font-lato-bold">
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h1>
              </div>
              <button
                disabled={orders.length < 1 || isProceed}
                onClick={() => {
                  proceedOrder();
                }}
                className={`p-2 mt-4 ${
                  orders.length < 1 ? "bg-[#ffc100]/40" : "bg-[#ffc100]"
                } rounded-lg w-full text-sm text-[#555C68] font-lato-bold`}
              >
                {isProceed ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <CircularProgress size={"16px"} color="inherit" />
                    <p className="text-sm">Processing order, please wait...</p>
                  </div>
                ) : (
                  "Proceed Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
