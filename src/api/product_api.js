import { BASEURL } from '../../config'
import products from '../assets/data/products.json'
import categories from '../assets/data/category.json'

const addProduct = (product) => {
    return fetch(`${BASEURL}/api/product/add`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(product),
    });
}

const getAllProducts = (userId) => {
    return fetch(`${BASEURL}/api/product/get/${userId}`);
}

const loadProducts = async () => {
    products['products'].map(async (data) => {

        var data = data;

        data['userID'] = '657175eea67f86460299f511'
        data['barcode'] = String(Date.now()).slice(3, 13);
        data['available'] = data.stock

        await addProduct(data).then((val) => {
            console.log(val);
        }).catch((err) => console.log(err))
    })
}

export {
    addProduct,
    getAllProducts,
    loadProducts
}