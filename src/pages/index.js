import React from "react"
import {
  FormattedMessage,
  FormattedHTMLMessage,
  useIntl,
} from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import tools from "../../tools"
import { Tool } from "../components/tool/Tool"
import Typography from "@mui/material/Typography"

const useStyles = makeStyles(() => {
  return {
    home: {
      textAlign: "center",
      color: "#555",
    },
    tool: {
      padding: 10,
    },
    root: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    search: {
      width: "70%",
      margin: "auto",
    },
  }
})

const IndexPage = () => {
  const intl = useIntl()
  const classes = useStyles()
  return (
    <Layout index>
      <Seo
        lang={intl.locale}
        title={intl.formatMessage({ id: "common.title" })}
        keywords={intl.formatMessage({ id: "common.keywords" })}
        description={intl.formatMessage({ id: "common.description" })}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.home}>
          <br />
          <br />
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="common.info" />
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <FormattedHTMLMessage id="common.info2" />
          </Typography>
          <br />
          <br />
          <br />
        </Grid>
        {tools.map((config, index) => (
          <Grid item xs={12} sm={4} lg={3} xl={2} className={classes.tool} key={index}>
            <Tool config={config} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage
