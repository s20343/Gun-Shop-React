import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";


function Navigation(props) {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
        console.log(lng)
        i18n.changeLanguage(lng)
    }

    const loginLogoutLink = isAuthenticated() ? <button>{props.handleLogout}{t('auth.logOut')}</button> :
        <Link to="/login">{t('form.actions.login')}</Link>

    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/customers">{t('nav.customers')}</Link></li>
                <li><Link to="/appointments">{t('nav.appointments')}</Link></li>
                <li><Link to="/gunsellers">{t('nav.gunSellers')}</Link></li>
                <li className='lang'>{loginLogoutLink}</li>
                <li><button onClick={() => handleLanguageChange('ru')}>RU</button></li>
                <li><button onClick={() => handleLanguageChange('en')}>EN</button></li>
            </ul>
        </nav>
    )
}

export default Navigation