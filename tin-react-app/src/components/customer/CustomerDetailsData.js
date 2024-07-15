import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";


function CustomerDetailsData(props) {
    const cus = props.cus
    const {t} = useTranslation();
    return (
        <>
            <p>{t('cus.fields.firstName')}: {cus.firstName}</p>
            <p>{t('cus.fields.lastName')}: {cus.lastName}</p>
            <p>{t('cus.fields.nickName')}: {cus.nickName}</p>
            <p>{t('cus.fields.phoneNumber')}: {cus.phoneNumber}</p>
            <h2>{t('cus.form.appointments')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('cus.details.gunSeller')}</th>
                    <th>{t('cus.details.date')}</th>
                    <th>{t('cus.details.location')}</th>
                </tr>
                </thead>
                <tbody>
                {cus.appointments.map(
                    appointment =>
                        <tr key={appointment._id}>
                            <td>{appointment.gunSeller.gunNick}</td>
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