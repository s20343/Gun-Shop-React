
import {getCurrentUser} from "../helpers/authHelper";
const customersBaseUrl = 'http://localhost:3000/api/customers'
export function getCustomersApiCall() {
    const promise = fetch(customersBaseUrl)
    return promise;
}

export function getCustomerByIdApiCall(cusId) {
    const url = `${customersBaseUrl}/${cusId}`;
    const promise = fetch(url);
    return promise;
}

export function addCustomerApiCall(cus) {
    const user = getCurrentUser()
    const cusString = JSON.stringify(cus)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: cusString
    }
    console.log(cusString);
    const promise = fetch(customersBaseUrl, options)
    return promise;
}

export function updateCustomerApiCall(cusId, cus) {
    const url = `${customersBaseUrl}/${cusId}`
    const cusString = JSON.stringify(cus)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: cusString
    }
    console.log(cusString);
    const promise = fetch(url, options);
    return promise;
}