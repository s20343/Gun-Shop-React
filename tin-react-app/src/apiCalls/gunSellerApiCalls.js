import {gunSellerDetailsList, gunSellerList} from "./gunSellerApiMockData";
const gunSellersBaseUrl = 'http://localhost:3000/api/gunSellers'
export function getGunSellersApiCall() {
    const promise = fetch(gunSellersBaseUrl)
    return promise;
}

export function getGunSellerByIdApiCall(gunId) {
    const url = `${gunSellersBaseUrl}/${gunId}`;
    const promise = fetch(url);
    return promise;
}

export function addGunSellerApiCall(gun) {
    const gunString = JSON.stringify(gun)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: gunString
    }
    console.log('Add');
    const promise = fetch(gunSellersBaseUrl, options)
    return promise;
}

export function updateGunSellerApiCall(gunId, gun) {
    const url = `${gunSellersBaseUrl}/${gunId}`
    const gunString = JSON.stringify(gun)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: gunString
    }
    console.log(gunString);
    const promise = fetch(url, options);
    return promise;
}