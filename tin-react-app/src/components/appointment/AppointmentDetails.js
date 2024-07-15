import {Link, useParams} from 'react-router-dom'
import {getAppointmentByIdApiCall} from "../../apiCalls/appointmentApiCalls";
import {useEffect, useState} from "react";
import AppointmentDetailsData from "./AppointmentDetailsData";
import {useTranslation} from "react-i18next";


function AppointmentDetails() {
    const {t} = useTranslation()
    const [appointment, setAppointment] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let { appointmentId } = useParams()
    appointmentId = parseInt(appointmentId)

    function fetchAppointmentDetails() {
        getAppointmentByIdApiCall(appointmentId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setAppointment(null)
                        setMessage(data.message)
                    } else {
                        setAppointment(data)
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

    useEffect(() => {
        fetchAppointmentDetails()
    }, [])

    let content
    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading appointment data...</p>
    } else {
        content = <AppointmentDetailsData appointmentData={appointment} />
    }

    return (
        <main>
            { content }
            <div className="form-buttons">
                <Link to="/appointments" className="form-button-back">{t('form.actions.return')}</Link>
            </div>
        </main>
    )

}

export default AppointmentDetails