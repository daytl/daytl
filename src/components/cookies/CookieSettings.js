import React, { useState } from 'react';

import Cookies from 'js-cookie';

const CookieSettings = ({
                            handleAccept,
                            handleDecline,
                            initTracking,
                            handleCloseAll
                        }) => {
    const [trackAnalytics, setTrackAnalytics] = useState(Cookies.get('nextjs-gdpr-google-analytics') === 'true')
    const handleToggle = (cookieName) => {
        Cookies.set('nextjs-gdpr-responded', true, {expires: 365});

        switch (cookieName) {
            case 'nextjs-gdpr-google-analytics':
                return setTrackAnalytics((prevState) => {
                    if (prevState) {
                        Cookies.remove(cookieName);
                    } else {
                        Cookies.set(cookieName, true, {
                            expires: 365
                        });
                    }

                    return !prevState
                })
            default:
                break;
        }
        initTracking()
    }

    return (
        'x'
        // your JSX code here
    )
}

export default CookieSettings;