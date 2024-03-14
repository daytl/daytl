import React from "react"
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import makeStyles from '@mui/styles/makeStyles';

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
        title={`page404: ${intl.formatMessage({ id: "title" })}`}
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
