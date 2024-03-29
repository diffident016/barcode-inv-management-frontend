import React, { useState, useMemo } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import barcode from "../../assets/images/barcode.png";
import Backdrop from "@mui/material/Backdrop";
import AddProduct from "./AddProduct";
import Barcode from "react-barcode";
import { getAllProducts } from "../../api/product_api";
import { STORE } from "../../../config";
import ProductDetails from "./ProductDetails";
import error from "../../assets/images/error.svg";
import empty from "../../assets/images/add-product.svg";
import { CircularProgress } from "@mui/material";
import ScanBarcode from "../../components/ScanBarcode";

function Inventory({ user, products, refresh, categories }) {
  const [query, setQuery] = useState("");
  const [addProduct, setAddProduct] = useState({ add: false, barcode: null });
  const [isSelectAll, setSelectAll] = useState(false);
  const [showProduct, setShowProduct] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [scan, setScan] = useState(false);

  const search = (query) => {
    var temp = products["products"];

    temp = temp.filter((product) => {
      var name = product.name.toLowerCase().indexOf(query.toLowerCase());
      var category = product.category.category_name
        .toLowerCase()
        .indexOf(query.toLowerCase());
      return name !== -1 || category !== -1;
    });

    return temp;
  };

  const columns = useMemo(() => [
    {
      name: "#",
      cell: (row, index) => {
        return (
          <div className="flex flex-row h-full w-full items-center gap-5">
            <div className="ml-4 p-[1px] w-12 h-12 rounded-lg border shadow-sm">
              <img
                className="w-full h-full rounded-lg object-cover"
                src={row.photoUrl}
                alt="product photo"
              />
            </div>
          </div>
        );
      },
      width: "90px",
    },
    {
      name: "Product Name",
      cell: (row) => <p className="text-sm">{row.name}</p>,
      width: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.category.category_name,
      width: "180px",
    },
    {
      name: "Price",
      cell: (row) => (
        <p className="w-full text-sm overflow-hidden text-ellipsis">
          {row.price.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </p>
      ),
      width: "100px",
    },
    {
      name: "Cost",
      cell: (row) => (
        <p className="w-full text-sm overflow-hidden text-ellipsis">
          {row.cost.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </p>
      ),
      width: "100px",
    },
    {
      name: "Stock",
      cell: (row) => (
        <p className="w-full text-sm overflow-hidden text-ellipsis">
          {row.stock - row.sold}/{row.stock}
        </p>
      ),
      width: "100px",
    },
    {
      name: "Barcode",
      cell: (row) => (
        <Barcode
          margin={0}
          height={32}
          width={1.5}
          background="transparent"
          fontSize={12}
          value={row.barcode}
        />
      ),
      width: "120px",
    },
  ]);

  const statusBuilder = (state) => {
    if (state == 2) {
      return (
        <div className="w-full h-full flex flex-col items-center pt-4">
          <img src={empty} className="w-60 h-60" />
          <h1 className="font-lato text-lg ">
            Your have no products, add now!
          </h1>
        </div>
      );
    }

    if (state == -1) {
      return (
        <div className="w-full h-full flex flex-col items-center pt-4">
          <img src={error} className="w-60 h-60" />
          <h1 className="font-lato text-lg ">Oops, an error occurred.</h1>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center pb-8 gap-4">
        <CircularProgress color="inherit" className="text-[#ffc100]" />
        <h1 className="font-lato">Loading inventory, please wait...</h1>
      </div>
    );
  };

  return (
    <div className="w-full h-full p-4 text-[#555C68]">
      <div className="flex flex-col flex-1 h-full rounded-lg border bg-white py-4 px-6">
        <h1 className="font-lato-bold text-base">Inventory</h1>
        <div className="flex flex-row justify-between w-full items-center pt-4 pb-2">
          <div className="flex flex-row items-center">
            <input
              value={query}
              onChange={(e) => {
                const query = e.target.value;
                setQuery(query);

                if (query == "") return setNewProducts(null);

                setNewProducts(search(query));
              }}
              className="px-2 text-sm rounded-md h-9 w-60 border border-[#555C68]/40 focus:outline-none"
              placeholder="Quick Search"
            />
          </div>

          <div className="flex flex-row gap-2 select-none items-center px-2">
            <div
              onClick={() => {
                setScan(true);
              }}
              className="flex gap-2 cursor-pointer border border-[#555C68]/40 py-2 w-40 justify-center rounded-lg shadow-sm"
            >
              <img src={barcode} className="w-5" />
              <h1 className="font-lato-bold text-sm">Scan Barcode</h1>
            </div>
            <h1
              onClick={() => {
                setAddProduct({ add: true, barcode: null });
              }}
              className="px-2 cursor-pointer flex gap-2 font-lato-bold text-sm text-[#555C68] border border-[#ffc100] w-40 shadow-sm py-2 rounded-lg justify-center bg-[#ffc100]"
            >
              <span>{<PlusIcon className="w-5" />}</span> Add Product
            </h1>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={scan}
          >
            {scan && (
              <ScanBarcode
                products={products["products"]}
                stream={scan}
                close={() => {
                  setScan(false);
                }}
                addProduct={(barcode) => {
                  setAddProduct({ add: true, barcode: barcode });
                }}
                seeDetails={(product) => {
                  setShowProduct(product);
                }}
              />
            )}
          </Backdrop>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={addProduct.add}
          >
            {addProduct.add && (
              <AddProduct
                barcode={addProduct.barcode}
                close={() => {
                  setAddProduct({
                    add: false,
                    barcode: null,
                  });
                }}
                refresh={() => {
                  refresh();
                  setAddProduct({
                    add: false,
                    barcode: null,
                  });
                }}
                categories={categories}
              />
            )}
          </Backdrop>
        </div>
        <div className="flex flex-col w-full h-full px-2 overflow-hidden">
          <div className="flex flex-row w-full h-14 border-b items-center drop-shadow-lg">
            {columns.map((item) => {
              return (
                <p
                  style={{ width: item.width }}
                  className="text-[#555C68]/80 text-sm font-lato-bold mx-1"
                >
                  {item.name}
                </p>
              );
            })}
          </div>
          {products.fetchState != 1 ? (
            statusBuilder(products.fetchState)
          ) : (
            <div className="flex flex-col overflow-auto h-full w-full">
              {(!!newProducts ? newProducts : products["products"]).map(
                (item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setShowProduct(item);
                      }}
                      className={`cursor-pointer flex flex-row w-full h-[72] border-b py-2 hover:bg-[#fff2cc] z-10`}
                    >
                      {columns.map((col) => {
                        return (
                          <div
                            style={{ width: col.width }}
                            className="font-lato-bold mx-1 h-full flex flex-row items-center"
                          >
                            {col.cell ? (
                              col.cell(item, index)
                            ) : (
                              <p className="w-full text-sm">
                                {col.selector(item)}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              )}
            </div>
          )}
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!!showProduct}
          >
            {!!showProduct && (
              <ProductDetails
                refresh={() => {
                  refresh();
                }}
                product={showProduct}
                close={() => {
                  setShowProduct(null);
                }}
              />
            )}
          </Backdrop>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
