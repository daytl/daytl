import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import React from "react"
import { object } from "prop-types"
import makeStyles from "@mui/styles/makeStyles"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

export const Tool = ({ config }) => {
  const { name } = config
  const intl = useIntl()
  return (
    <Link
      to={`/${name}`}
      style={{ textDecoration: "none" }}
      title={intl.formatMessage({ id: `tools.${name}.title` })}
    >
      <Card sx={{
        cursor: "pointer",
        "&:hover": {
          color: "primary.contrastText",
          backgroundColor: "primary.main",
        },
        minHeight: "8rem",
        height: "100%",
      }}
            fullWidth
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            <FormattedMessage id={`tools.${name}.title`} />
          </Typography>
          <Typography variant="body2" component="p">
            <FormattedMessage id={`tools.${name}.info`} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

Tool.displayName = "Tool"

Tool.propTypes = {
  config: object,
}
