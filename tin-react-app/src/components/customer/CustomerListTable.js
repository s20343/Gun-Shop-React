import CustomerListTableRow from "./CustomerListTableRow";
import {useTranslation} from "react-i18next";

function CustomerListTable(props) {
    const customers = props.cusList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('cus.fields.firstName')}</th>
                <th>{t('cus.fields.lastName')}</th>
                <th>{t('cus.fields.nickName')}</th>
                <th>{t('cus.fields.phoneNumber')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {customers.map(cus =>
            <CustomerListTableRow cusData={cus} key ={cus._id}/>
            )}
            </tbody>
        </table>
    )
}

export default CustomerListTable