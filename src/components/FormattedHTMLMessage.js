import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';

const FormattedHTMLMessage = ({id, values, tagName = 'span'}) => {
    const intl = useIntl()
    const message = intl.formatMessage({id}, values);
    return (
        <tagName dangerouslySetInnerHTML={{__html: message}} />
    )
}

export default FormattedHTMLMessage;