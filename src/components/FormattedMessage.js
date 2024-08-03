import {useI18n} from "@/utils/useI18n";
import Trans from "next-translate/Trans";


const FormattedMessage = ({id, values = null, tagName = 'span', namespace = 'common'}) => {
    return <Trans
        i18nKey={`${namespace}:${id}`}
        components={{strong: <strong/>, span: <span/>, a: <a/>}}
        values={values}
    />
}

export default FormattedMessage;