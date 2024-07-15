import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getGunSellerByIdApiCall} from "../../apiCalls/gunSellerApiCalls";
import GunSellerDetailsData from "./GunSellerDetailsData";
import {useTranslation} from "react-i18next";

function GunSellerDetails() {
    const {t} = useTranslation();
    let { gunId } = useParams()
    gunId = parseInt(gunId)

    const [gun, setGun] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    function fetchGunSellerDetails() {
        getGunSellerByIdApiCall(gunId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setGun(null)
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
                }
            )
    }

    useEffect( () => {
        fetchGunSellerDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading gun sellers data...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <GunSellerDetailsData gun={gun} />
    }

    return (
        <main>
            <h2>{t('gun.details.title')}</h2>
            {content}
            <div className="form-buttons">
                <Link to="/gunSellers" className="form-button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )


}

export default GunSellerDetails