import { appointmentList, appointmentDetailsList} from "./appointmentApiMockData";
const appointmentsBaseUrl = 'http://localhost:3000/api/appointments'
export function getAppointmentsApiCall() {
    const promise = fetch(appointmentsBaseUrl)
    return promise
}

export function getAppointmentByIdApiCall(appointmentId) {
    const url = `${appointmentsBaseUrl}/${appointmentId}`;
    const promise = fetch(url);
    return promise;
}

export function addAppointmentApiCall(app) {
    const appString = JSON.stringify(app)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: appString
    }
    console.log(appString);
    const promise = fetch(appointmentsBaseUrl, options)
    return promise;
}

export function updateAppointmentApiCall(appId, app) {
    const url = `${appointmentsBaseUrl}/${appId}`
    const appString = JSON.stringify(app)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: appString
    }
    console.log(appString);
    const promise = fetch(url, options);
    return promise;
}