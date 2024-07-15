import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom'
import {getCustomerByIdApiCall} from "../../apiCalls/customerApiCalls";
import CustomerDetailsData from "./CustomerDetailsData";
import {useTranslation} from "react-i18next";

function CustomerDetails() {
    let { cusId } = useParams()
    cusId = parseInt(cusId)

    const [cus, setCus] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    function fetchCustomerDetails() {
        getCustomerByIdApiCall(cusId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCus(null)
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
                }
            )
    }

    useEffect( () => {
        fetchCustomerDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading customers data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CustomerDetailsData cus={cus} />
    }

    const {t} = useTranslation();

    return (
        <main>
            <h2>{t('cus.details.title')}</h2>
            {content}
            <div className="form-buttons">
                <Link to="/customers" className="form-button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )

}
export default CustomerDetails