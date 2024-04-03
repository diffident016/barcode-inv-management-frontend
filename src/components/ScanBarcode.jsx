import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import barcode from "../assets/images/barcode.png";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

function ScanBarcode({
  close,
  stream,
  products,
  addProduct,
  seeDetails,
  isCustomer,
}) {
  const [data, setData] = useState(null);
  const [scannedProduct, setProduct] = useState(null);

  const handleScan = (result, _) => {
    if (!!result && result != data) {
      const product = products.find((product) => product.barcode === result);

      setProduct(product);
      setData(result);
    }
  };

  return (
    <div className="w-[400px] h-[550px] bg-white rounded-lg ">
      <div className="w-full h-full flex flex-col text-[#555C68] font-lato">
        <div className="flex flex-row h-1 my-4 items-center justify-between px-4 py-2">
          <h1 className="flex gap-2 items-center text-sm font-lato-bold">
            <span>
              <img src={barcode} className="w-5" />
            </span>
            Barcode Scanner
          </h1>
          <XMarkIcon
            onClick={() => {
              close();
            }}
            className="w-5 cursor-pointer"
          />
        </div>
        <div className="w-[400px] h-[400px]">
          <Html5QrcodePlugin
            fps={15}
            qrbox={280}
            disableFlip={false}
            qrCodeSuccessCallback={handleScan}
          />
        </div>
        <div className="flex py-2 justify-center items-center h-full w-full">
          {!data ? (
            <p className="text-base font-lato-bold">Scan a barcode now.</p>
          ) : scannedProduct ? (
            <div className="flex-col w-full h-full p-4 justify-center items-center">
              <div className="px-4 w-full">
                <p className="">
                  Barcode:{" "}
                  <span className="font-lato-bold">
                    {scannedProduct.barcode}
                  </span>
                </p>
                <p>
                  Product:{" "}
                  <span className="font-lato-bold">{scannedProduct.name}</span>
                </p>
              </div>
              <div className="flex items-center justify-center w-full pt-8 z-10">
                <button
                  onClick={() => {
                    close();
                    seeDetails(scannedProduct);
                  }}
                  className="border border-[#ffc100] text-[#ffc100] py-2 w-60 rounded-lg text-sm font-lato-bold"
                >
                  Check Details
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-col w-full h-full p-4 justify-center items-center">
              <div className="px-4 w-full">
                <p className="pb-2">
                  Barcode: <span className="font-lato-bold">{data}</span>
                </p>
                <p className="text-base font-lato-bold">
                  No product found from this barcode.
                </p>
              </div>
              {!isCustomer && (
                <div className="flex items-center justify-center w-full pt-8">
                  <button
                    onClick={() => {
                      close();
                      addProduct(data);
                    }}
                    className="border border-[#ffc100] text-[#ffc100] py-2 w-60 rounded-lg text-sm font-lato-bold"
                  >
                    Add Product
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScanBarcode;
