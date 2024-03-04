import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';

const FormattedHTMLMessage = ({id, values, TagName = 'span'}) => {
    const intl = useIntl()
    const message = intl.formatMessage({id}, values);
    return (
        <TagName dangerouslySetInnerHTML={{__html: message}} />
    )
}

export default FormattedHTMLMessage;