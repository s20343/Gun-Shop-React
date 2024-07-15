import { useState } from "react";
import { useTranslation } from "react-i18next";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { loginApiCall } from "../../apiCalls/authApiCalls";
import { formValidationKeys } from "../../helpers/formHelper";
import { checkRequired } from "../../helpers/validationCommon";
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";

function LoginForm(props) {
    const [user, setUser] = useState(
        {
            phoneNumber: '',
            password: ''
        }
    )
    const [errors, setErrors] = useState(
        {
            phoneNumber: '',
            password: ''
        }
    )
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)

    const { t } = useTranslation()
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            let response
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data)
                                props.handleLogin(userString)
                                navigate(-1)
                            } else if (response.status === 401) {
                                setMessage(data.message)
                            }
                        }
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'phoneNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = { ...errors }
        Object.entries(user).forEach(([key, value]) => {
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

    //const errMessage = error.message.toString()

    const errorsSummary = hasErrors() ? t('form.validation.messages.summary') : ''
    const fetchError = error ? `Error: Invalid phone number or password`  : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    return (
        <main>
            <div id="login">
                <h2>{t('auth.pageTitle')}</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <div>
                    <FormInput
                        name="phoneNumber"
                        value={user.phoneNumber}
                        error={errors.phoneNumber}
                        label={t('cus.fields.phoneNumber')}
                        onChange={handleChange}
                        type="text"
                    />
                    <FormInput
                        name="password"
                        value={user.password}
                        error={errors.password}
                        label={t('auth.password')}
                        onChange={handleChange}
                        type="password"
                    />
                    </div>

                    <FormButtons
                        cancelPath="/"
                        error = {globalErrorMessage}
                        submitButtonLabel={t('form.actions.login')}
                    />
                </form>
            </div>
        </main>
    )
}

export default LoginForm