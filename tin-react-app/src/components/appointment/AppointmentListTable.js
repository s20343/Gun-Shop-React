import AppointmentListTableRow from './AppointmentListTableRow'
import {useTranslation} from "react-i18next";

function AppointmentListTable(props) {
    const appointments = props.appointmentList
    const {t} = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('app.fields.customer')}</th>
                <th>{t('app.fields.gunSeller')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map(appointment =>
                <AppointmentListTableRow appointmentData={appointment} key={appointment._id} />
            )}
            </tbody>
        </table>
    )
}

export default AppointmentListTable