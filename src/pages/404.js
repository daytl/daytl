import React from "react"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    padding: "2rem 0 2rem 0",
  },
}))

const NotFoundPage = () => {
  const intl = useIntl()
  const classes = useStyles()
  return (
    <Layout>
      <Seo
        lang={intl.locale}
        title={`404: ${intl.formatMessage({ id: "title" })}`}
      />
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Typography variant="h1" component="h1">
            404
          </Typography>
          <Typography variant="h3">
            <FormattedMessage id="common.404.info" />
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default NotFoundPage
