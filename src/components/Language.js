import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import Typography from "@mui/material/Typography"

const languageName = {
  en: "English",
  cs: "Česky",
}

const Language = () => {
  return (
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map((language) => (
          <Typography variant="caption">
            <a
              key={language}
              onClick={() => changeLocale(language)}
              style={{
                fontWeight: currentLocale === language ? `bold` : `normal`,
                margin: 10,
                cursor: `pointer`,
              }}
            >
              {languageName[language]}
            </a>
          </Typography>
        ))
      }
    </IntlContextConsumer>
  )
}

export default Language
