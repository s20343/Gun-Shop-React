import {getGunSellersApiCall} from "../../apiCalls/gunSellerApiCalls";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import GunSellerListTable from "./GunSellerListTable";
import {useTranslation} from "react-i18next";

function GunSellerList() {
    const {t} = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [gunSellers, setGunSellers] = useState([])

    function fetchGunSellerList() {
        getGunSellersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setGunSellers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchGunSellerList()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Loading gun selelrs data...</p>
    } else {
        content = <GunSellerListTable gunList={gunSellers} />
    }
    return (
        <main>
            <h2>{t('gun.list.pageTitle')}</h2>
            {content}
            <p>
                <Link to="/gunSellers/add" className="button-add">{t('gun.list.addNew')}</Link>
            </p>
        </main>
    )
}
export default GunSellerList