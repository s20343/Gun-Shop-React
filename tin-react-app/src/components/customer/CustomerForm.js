import {useNavigate, useParams} from "react-router-dom";
import FormMode from '../../helpers/formHelper';
import {useEffect, useState} from "react";
import {addCustomerApiCall, getCustomerByIdApiCall, updateCustomerApiCall} from "../../apiCalls/customerApiCalls";
import {checkRequired, checkTextLengthRange, checkPhoneNumber} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {useTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";

function CustomerForm() {

    const {t} = useTranslation();

    const [cus, setCus] = useState({
        'firstName': '',
        'lastName': '',
        'nickName': '',
        'phoneNumber': '',
        'password': ''
    })

    const [errors, setErrors] = useState({
        'firstName': '',
        'lastName': '',
        'nickName': '',
        'phoneNumber': '',
        'password': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { cusId } = useParams()
    const currentFormMode = cusId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if(fieldName === 'firstName') {
            //first name validation
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                if(60 && fieldValue.toString().trim().length > 60) {
                    errorMessage = formValidationKeys.max_60
                } else if (2 && fieldValue.toString().trim().length < 2) {
                    errorMessage = formValidationKeys.min_2
                }
            }
        }

        if(fieldName === 'lastName') {
            //last name validation
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                if(60 && fieldValue.toString().trim().length > 60) {
                    errorMessage = formValidationKeys.max_60
                } else if (2 && fieldValue.toString().trim().length < 2) {
                    errorMessage = formValidationKeys.min_2
                }
            }
        }


        //nick name validation
        if(fieldName === 'nickName') {
            if (!checkTextLengthRange(fieldValue, 2, 15)) {
                if(15 && fieldValue.toString().trim().length > 15) {
                    errorMessage = formValidationKeys.max_15
                } else if (2 && fieldValue.toString().trim().length < 2) {
                    errorMessage = formValidationKeys.min_2
                }
            }
        }
        if(fieldName === 'phoneNumber') {
            //phone number validation
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkPhoneNumber(fieldValue)) {
                errorMessage = formValidationKeys.validPhone
            }
        }

        return errorMessage;
    }


    function fetchCustomerDetails() {
        getCustomerByIdApiCall(cusId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCus(data)
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
        if (currentFormMode === FormMode.EDIT) {
            fetchCustomerDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCus({
            ...cus,
            [name]: value
        })
    }



    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            const newCus = { "firstName": cus.firstName, "lastName": cus.lastName, "nickName": cus.nickName, "phoneNumber": cus.phoneNumber, "password": cus.password}
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCustomerApiCall(newCus)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCustomerApiCall(cusId, newCus)
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
        Object.entries(cus).forEach(([key, value]) => {
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
    const pageTitle = currentFormMode === FormMode.NEW ? t('cus.form.add.pageTitle') : t('cus.form.edit.pageTitle')

    useEffect(() => {
        if (redirect) {
            navigate('/customers')
        }
    }, [redirect])


    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div>

                    <FormInput
                        type="text"
                        label={t('cus.fields.firstName')}
                        required
                        error={errors['firstName']}
                        name="firstName"
                        placeholder="2-60 characters"
                        onChange={handleChange}
                        value={cus['firstName']}
                    />

                    <FormInput
                        type="text"
                        label={t('cus.fields.lastName')}
                        required
                        error={errors['lastName']}
                        name="lastName"
                        placeholder="2-60 characters"
                        onChange={handleChange}
                        value={cus['lastName']}
                    />
                    <FormInput
                        type="text"
                        label={t('cus.fields.nickName')}
                        error={errors['nickName']}
                        name="nickName"
                        placeholder="2-15 characters"
                        onChange={handleChange}
                        value={cus['nickName']}
                    />

                    <FormInput
                        type="text"
                        label={t('cus.fields.phoneNumber')}
                        required
                        error={errors['phoneNumber']}
                        name="phoneNumber"
                        placeholder="np. 123 456 789, +1 123 456 789..."
                        onChange={handleChange}
                        value={cus['phoneNumber']}
                    />
                    <FormInput
                        type="password"
                        label={t('auth.password')}
                        requried
                        error={errors['password']}
                        name="password"
                        onChange={handleChange}
                        value={cus['password']}
                        />


                </div>
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/customers"
                    />
                </div>
            </form>

        </main>
    )
}

export default CustomerForm