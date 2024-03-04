import React from "react"
import {
  IntlContextConsumer,
  changeLocale,
  FormattedMessage,
} from "gatsby-plugin-intl"
import { MenuItem, Select } from '@mui/material';

const Language = () => {
  const handleChange = (event) => {
    changeLocale(event.target.value)
  }
  return (
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) => (
        <Select
            size="small"
            value={currentLocale} onChange={handleChange}>
          {languages.map((language) => (
            <MenuItem value={language} key={language}>
              <FormattedMessage id={`common.languages.${language}`} />
            </MenuItem>
          ))}
        </Select>
      )}
    </IntlContextConsumer>
  )
}

export default Language
