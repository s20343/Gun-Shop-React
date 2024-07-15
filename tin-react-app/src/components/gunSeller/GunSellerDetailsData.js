import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";


function CustomerDetailsData(props) {
    const gun = props.gun
    const {t} = useTranslation();
    return (
        <>
            <p>{t('gun.fields.gunNick')}: {gun.gunNick}</p>
            <p>{t('gun.fields.experience')}: {gun.experience}</p>
            <p>{t('gun.fields.salary')}: {gun.salary}</p>
            <h2>{t('gun.form.appointments')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('gun.details.customer')}</th>
                    <th>{t('gun.details.date')}</th>
                    <th>{t('gun.details.location')}</th>
                </tr>
                </thead>
                <tbody>
                {gun.appointments.map(
                    appointment =>
                        <tr key={appointment._id}>
                            <td>{appointment.customer.phoneNumber}</td>
                            <td>{appointment.date ? getFormattedDate(appointment.date) : ""}</td>
                            <td>{appointment.location}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CustomerDetailsData