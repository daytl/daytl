import React from "react"
import {
  IntlContextConsumer,
  changeLocale,
  useIntl,
  FormattedMessage,
} from "gatsby-plugin-intl"
import { MenuItem, Select } from "@material-ui/core"

const Language = () => {
  const handleChange = (event) => {
    changeLocale(event.target.value)
  }
  return (
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) => (
        <Select value={currentLocale} onChange={handleChange}>
          {languages.map((language) => (
            <MenuItem value={language}>
              <FormattedMessage id={`common.languages.${language}`} />
            </MenuItem>
          ))}
        </Select>
      )}
    </IntlContextConsumer>
  )
}

export default Language
