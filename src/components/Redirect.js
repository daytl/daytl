import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import Seo from "./Seo"

const Redirect = () => {
  const intl = useIntl()
  return <Seo title={`${intl.formatMessage({ id: "common.title" })}`} />
}

export default Redirect
