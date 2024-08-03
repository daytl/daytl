import React from 'react';
import {useI18n} from "../utils/useI18n";


const FormattedHTMLMessage = ({id, values = null, TagName = 'span', namespace = 'common'}) => {
    const {t} = useI18n({namespace});
    const message = t(id, values);
    return (
        <TagName dangerouslySetInnerHTML={{__html: message}}/>
    )
}

export default FormattedHTMLMessage;