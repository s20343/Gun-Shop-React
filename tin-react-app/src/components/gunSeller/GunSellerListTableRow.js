import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function GunSellerListTableRow(props) {
    const gun = props.gunData
    const {t} = useTranslation();

    return (
        <tr>
            <td>{gun.gunNick}</td>
            <td>{gun.experience}</td>
            <td>{gun.salary}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`details/${gun._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`edit/${gun._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`delete/${gun._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default GunSellerListTableRow