import { useIntl } from "gatsby-plugin-intl";

const useTranslation = () => {
    const intl = useIntl();
    return (id) => {
        return intl.formatMessage({id})
    }
}

export default useTranslation;