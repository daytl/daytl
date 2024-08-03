/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {useI18n} from "@/utils/useI18n";
import Head from "next/head";

function Seo({description, meta, keywords, title}) {
    const {t, lang} = useI18n();
    const metaDescription = description || t('info');
    return (
        <Head>
            <title>{`${title} | ${t("titleSuffix")}`}</title>
            <meta name="author" content={t("author")}/>
            <meta name="description" content={metaDescription}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={metaDescription}/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:creator" content={t("author")}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={metaDescription}/>
            {keywords.length > 0 && <meta name="keywords" content={keywords}/>}
            <meta httpEquiv="Content-Language" content={lang}/>
        </Head>
    )
}

Seo.defaultProps = {
    lang: `cs`,
    meta: [],
    keywords: [],
    description: ``,
}

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
}

export default Seo
