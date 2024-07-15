import GunSellerListTableRow from "./GunSellerListTableRow";
import {useTranslation} from "react-i18next";

function GunSellerListTable(props) {
    const gunSellers = props.gunList
    const {t} = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('gun.fields.gunNick')}</th>
                <th>{t('gun.fields.experience')}</th>
                <th>{t('gun.fields.salary')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {gunSellers.map(gun =>
                <GunSellerListTableRow gunData={gun} key ={gun._id}/>
            )}
            </tbody>
        </table>
    )
}

export default GunSellerListTable