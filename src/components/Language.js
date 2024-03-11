import React from "react"
import {
  IntlContextConsumer,
  changeLocale,
  FormattedMessage,
} from "gatsby-plugin-intl"
import { MenuItem, Select } from "@mui/material"
import useTranslation from "../utils/useTranslation"

const Language = () => {
  const t = useTranslation()
  const handleChange = (event) => {
    changeLocale(event.target.value)
  }
  return (
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) => (
        <Select
          size="small"
          inputProps={{
            "aria-label": t(`common.languages.${currentLocale}`),
          }}
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
