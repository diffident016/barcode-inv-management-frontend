import { BASEURL } from '../../config'

const registerCustomer = (customer) => {
    return fetch(`${BASEURL}/customer/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(customer),
    });
}

export { registerCustomer }