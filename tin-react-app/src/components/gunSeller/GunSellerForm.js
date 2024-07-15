import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormMode, {formValidationKeys} from "../../helpers/formHelper";
import {checkNumber, checkNumberRange, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {addGunSellerApiCall, getGunSellerByIdApiCall, updateGunSellerApiCall} from "../../apiCalls/gunSellerApiCalls";
import {useTranslation} from "react-i18next";

function GunSellerForm() {
    const {t} = useTranslation();
    const [gun, setGun] = useState({
        'gunNick': '',
        'experience': '',
        'salary': ''
    })

    const [errors, setErrors] = useState({
        'gunNick': '',
        'experience': '',
        'salary': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { gunId } = useParams()
    const currentFormMode = gunId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'gunNick') {
            //nick name validation
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 15)) {
                if(15 && fieldValue.toString().trim().length > 15) {
                    errorMessage = formValidationKeys.max_15
                } else if (2 && fieldValue.toString().trim().length < 2) {
                    errorMessage = formValidationKeys.min_2
                }
            }
        }

    if (fieldName === 'experience') {
        if (!checkRequired(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        }
    }

    if (fieldName === 'salary') {
        //salary validation
        if (!checkRequired(fieldValue)) {
            errorMessage = formValidationKeys.notEmpty
        } else if (!checkNumber(fieldValue)) {
           errorMessage = formValidationKeys.validNumber
        } else if (!checkNumberRange(fieldValue, 5000, 50000)) {
            if(parseFloat(fieldValue) > 15) {
                errorMessage = formValidationKeys.max_number
            } else if (parseFloat(fieldValue) < 2) {
                errorMessage = formValidationKeys.min_number
            }
        }
    }

        return errorMessage;
    }


    function fetchGunSellerDetails() {
        getGunSellerByIdApiCall(gunId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setGun(data)
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
            fetchGunSellerDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setGun({
            ...gun,
            [name]: value
        })
    }



    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            const newGun = { "gunNick": gun.gunNick, "experience": gun.experience, "salary": gun.salary}
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addGunSellerApiCall(newGun)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateGunSellerApiCall(gunId, newGun)
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
        Object.entries(gun).forEach(([key, value]) => {
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
    const pageTitle = currentFormMode === FormMode.NEW ? t('gun.form.add.pageTitle') : t('gun.form.edit.pageTitle')

    useEffect(() => {
        if (redirect) {
            navigate('/gunSellers')
        }
    }, [redirect])

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div>

                    <FormInput
                        type="text"
                        label={t('gun.fields.gunNick')}
                        required
                        error={errors['gunNick']}
                        name="gunNick"
                        placeholder="2-15 characters"
                        onChange={handleChange}
                        value={gun['gunNick']}
                    />

                    <FormInput
                        type="text"
                        label={t('gun.fields.experience')}
                        required
                        error={errors['experience']}
                        name="experience"
                        onChange={handleChange}
                        value={gun['experience']}
                    />
                    <FormInput
                        type="number"
                        label={t('gun.fields.salary')}
                        error={errors['salary']}
                        name="salary"
                        placeholder="from 5000 to 50000"
                        onChange={handleChange}
                        value={gun['salary']}
                    />

                </div>
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/gunSellers"
                    />
                </div>
            </form>

        </main>
    )
}

export default GunSellerForm