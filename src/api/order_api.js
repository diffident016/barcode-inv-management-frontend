import { BASEURL } from '../../config'

const addOrder = (order) => {
    return fetch(`${BASEURL}/api/order/add`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(order),
    });
}

const updateQuantity = (update) => {
    return fetch(`${BASEURL}/api/order/update/quantity`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(update),
    });
}

const getCart = (customerID) => {
    return fetch(`${BASEURL}/api/order/get/${customerID}`);
}

const removeOrder = (orderID) => {
    return fetch(`${BASEURL}/api/order/remove/${orderID}`);
}

export { addOrder, getCart, updateQuantity, removeOrder }