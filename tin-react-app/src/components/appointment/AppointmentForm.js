import {useNavigate, useParams} from 'react-router-dom'
import {
    getCustomersApiCall
} from "../../apiCalls/customerApiCalls";
import {getGunSellersApiCall} from "../../apiCalls/gunSellerApiCalls";
import {useEffect, useState} from "react";
import FormMode, {formValidationKeys, getValidationErrorKey} from "../../helpers/formHelper";
import {checkDate, checkDateIfInBounds, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {
    addAppointmentApiCall,
    getAppointmentByIdApiCall,
    updateAppointmentApiCall
} from "../../apiCalls/appointmentApiCalls";
import {useTranslation} from "react-i18next";



function AppointmentForm() {
    const { t } = useTranslation()
    const [customers, setCustomers] = useState([])
    const [gunSellers, setGunSellers] = useState([])

    function fetchCustomerList() {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setCustomers(data)
                }
            )
    }

    function fetchGunSellerList() {
        getGunSellersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setGunSellers(data)
                }
            )
    }

    const [app, setApp] = useState({
        'date': '',
        'location': '',
        'customer': {
            '_id': '',
            'phoneNumber': ''
        },
        'gunSeller': {
            '_id': '',
            'gunNick': ''
        }
    })



    const [errors, setErrors] = useState({
        'date': '',
        'location': '',
        'customer': {
            'phoneNumber': ''
        },
        'gunSeller': {
            'gunNick': ''
        }
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { appId } = useParams()
    const currentFormMode = appId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        //meeting date validation
        let nowDate = new Date(),
            month = '' + (nowDate.getMonth() + 1),
            day = '' + nowDate.getDate(),
            year = nowDate.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = "0" + day;
        const nowString = [year,month,day].join('-');

        if(fieldName === 'date') {
        if (!checkRequired(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        } else if (!checkDate(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        } else if (!checkDateIfInBounds(fieldValue, nowString)) {
            if(new Date(fieldValue).getTime() < nowDate.getTime() ) {
                errorMessage = formValidationKeys.min_date
            }
            else if(new Date(fieldValue).getTime() > new Date("2024-01-01").getTime()) {
                errorMessage = formValidationKeys.max_date
            }
        }
        }

        if (fieldName === 'location') {
            //meeting place validation
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 10, 60)) {
                if(60 && fieldValue.toString().trim().length > 60) {
                    errorMessage = formValidationKeys.max_60
                } else if (10 && fieldValue.toString().trim().length < 10) {
                    errorMessage = formValidationKeys.min_10
                }
            }
        }

        if(fieldName === 'customer')
        //customer validation
        if (!checkRequired(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        }
        if(fieldName === 'gunSeller')
        //gun seller validation
        if (!checkRequired(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        }

        return errorMessage;
    }


    function fetchAppointmentDetails() {
        getAppointmentByIdApiCall(appId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setApp(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }

    useEffect(() => {
        fetchCustomerList();
        fetchGunSellerList();
        if (currentFormMode === FormMode.EDIT) {
            fetchAppointmentDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setApp({
            ...app,
            [name]: value
        })
    }



    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            const newApp = {"cId": app.customer._id, "gunId": app.gunSeller._id, "date": app.date, "location": app.location}
            if (currentFormMode === FormMode.NEW) {
                promise = addAppointmentApiCall(newApp)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateAppointmentApiCall(appId, newApp)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(app).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    const errorsSummary = hasErrors() ? t('form.validation.messages.summary') : ''
    const fetchError = error ? `Error: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    const pageTitle = currentFormMode === FormMode.NEW ? t('app.form.add.pageTitle') : t('app.form.edit.pageTitle')


    useEffect(() => {
        if (redirect) {
            navigate('/appointments')
        }
    }, [redirect])

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div>

                    <label htmlFor="customer">{t('app.fields.customer')}: <abbr className="symbol-required" title="required" aria-label="required">*</abbr></label>
                    <select name="customer" id="customer" onChange={handleChange} required>
                        <option value="">--- Choose Customer ---</option>
                        {customers.map(customer =>
                            (<option key={customer._id} selected={customer._id === app.customer._id} value={customer._id} label={customer.phoneNumber}></option>)
                        )}
                    </select>
                    <span id='errorCustomer' className="errors-text">{errors['customer'] ? t(getValidationErrorKey(errors['customer'])) : ''}</span>

                    <label htmlFor="gunSeller">{t('app.fields.gunSeller')}: <abbr className="symbol-required" title="required" aria-label="required">*</abbr></label>
                    <select name="gunSeller" id="gunSeller" onChange={handleChange} required>
                        <option value="">--- Choose Gun Seller ---</option>
                        {gunSellers.map(gunSeller =>
                            (<option key={gunSeller._id} selected={gunSeller._id === app.gunSeller._id} value={gunSeller._id} label={gunSeller.gunNick}></option>)
                        )}
                    </select>
                    <span id='errorCustomer' className="errors-text">{errors['gunSeller'] ? t(getValidationErrorKey(errors['gunSeller'])) : ''}</span>

                    <FormInput
                        type="date"
                        label={t('app.fields.date')}
                        required
                        error={errors['date']}
                        name="date"
                        onChange={handleChange}
                        value={app['date']}
                    />

                    <FormInput
                        type="text"
                        label={t('app.fields.location')}
                        required
                        error={errors['location']}
                        name="location"
                        placeholder="10 to 60 characters"
                        onChange={handleChange}
                        value={app['location']}
                    />


                </div>
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/appointments"
                    />
                </div>
            </form>

        </main>
    )

}

export default AppointmentForm
