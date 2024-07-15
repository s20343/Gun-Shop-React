import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import {getAppointmentsApiCall} from "../../apiCalls/appointmentApiCalls";
import AppointmentListTable from "./AppointmentListTable";
import {useTranslation} from "react-i18next";


function AppointmentList() {
    const {t} = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [appointments, setAppointments] = useState([])
    let content;

    function fetchAppointmentsList() {
        getAppointmentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setAppointments(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchAppointmentsList()
    }, [])

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading appointments data...</p>
    } else if (appointments.length == 0) {
        content = <p>No appointments.</p>
    } else {
        content = <AppointmentListTable appointmentList={appointments} />
    }

    return (
        <main>
            <h2>{t('app.list.pageTitle')}</h2>
            { content }
            <p className="section-buttons">
                <Link to="/appointment/add" className="button-add">{t('app.list.addNew')}</Link>
            </p>
        </main>
    )


}

export default AppointmentList