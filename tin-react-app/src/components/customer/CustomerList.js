import {Link} from "react-router-dom";
import {getCustomersApiCall} from "../../apiCalls/customerApiCalls";
import {useEffect, useState} from "react";
import CustomerListTable from "./CustomerListTable";
import {useTranslation} from "react-i18next";

function CustomerList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [customers, setCustomers] = useState([])

    function fetchCustomerList() {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCustomers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading customers data...</p>
    } else {
        content = <CustomerListTable cusList={customers} />
    }

    const { t } = useTranslation();

    return (
        <main>
            <h2>{t('cus.list.title')}</h2>
            {content}
            <p>
                <Link to="/customers/add" className="button-add">{t('cus.list.addNew')}</Link>
            </p>
        </main>
    )



}

export default CustomerList


