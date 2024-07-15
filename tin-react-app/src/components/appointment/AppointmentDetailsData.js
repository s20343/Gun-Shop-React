import { getFormattedDate } from '../../helpers/dateHelper';
import {useTranslation} from "react-i18next";

function AppointmentDetailsData(props) {
    const {t} = useTranslation()
    const appointment = props.appointmentData
    const date = appointment.date ? getFormattedDate(appointment.date) : ""
    return (
        <>
            <p>{t('app.fields.customer')}: {appointment.customer.phoneNumber}</p>
            <p>{t('app.fields.gunSeller')}: {appointment.gunSeller.gunNick} </p>
            <p>{t('app.fields.date')}: {date} </p>
            <p>{t('app.fields.location')}: {appointment.location} </p>
        </>
    )
}

export default AppointmentDetailsData