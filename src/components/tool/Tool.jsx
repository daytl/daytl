import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import React from "react"
import { object } from "prop-types"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

const useStyles = makeStyles((theme) => {
  return {
    link: {
      textDecoration: "none",
    },
    card: {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
      },
      minHeight: "8rem",
      height: "100%",
    },
  }
})

export const Tool = ({ config }) => {
  const { name } = config
  const classes = useStyles()
  const intl = useIntl()
  const styles = useStyles()
  return (
    <Link
      to={`/${name}`}
      className={classes.link}
      title={intl.formatMessage({ id: `tools.${name}.title` })}
    >
      <Card className={styles.card}>
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
