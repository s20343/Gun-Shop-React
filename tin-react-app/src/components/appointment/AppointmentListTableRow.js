import { Link } from "react-router-dom"
import {useTranslation} from "react-i18next";

function AppointmentListTableRow(props) {
    const appointment = props.appointmentData
    const {t} = useTranslation();
    return (
        <tr>
            <td>{appointment.customer.phoneNumber}</td>
            <td>{appointment.gunSeller.gunNick}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/appointments/details/${appointment._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/appointments/edit/${appointment._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/appointments/delete/${appointment._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default AppointmentListTableRow