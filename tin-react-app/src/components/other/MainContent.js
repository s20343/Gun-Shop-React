import {useTranslation} from "react-i18next";

function MainContent() {
    const {t} = useTranslation();
    return (
        <main>
            <h2>{t('main-page.content')}</h2>
            <p>{t('main-page.text')}</p>
        </main>
    )
}

export default MainContent