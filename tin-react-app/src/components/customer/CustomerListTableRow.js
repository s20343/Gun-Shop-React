import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function CustomerListTableRow(props) {
    const cus = props.cusData
    const { t } = useTranslation();

    return (
        <tr>
            <td>{cus.firstName}</td>
            <td>{cus.lastName}</td>
            <td>{cus.nickName}</td>
            <td>{cus.phoneNumber}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`details/${cus._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`edit/${cus._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`delete/${cus._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default CustomerListTableRow