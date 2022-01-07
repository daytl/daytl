import React from "react"
import components from "../../tools/components"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Grid from "@material-ui/core/Grid"
import {
  FormattedHTMLMessage,
  FormattedMessage,
  useIntl,
} from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: theme.spacing(2),
  },
  tool: {
    margin: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ToolPage({ pageContext }) {
  const {
    tool: { name, componentName },
  } = pageContext
  const ToolComponent = components[componentName]
  const intl = useIntl()
  const classes = useStyles()
  return (
    <Layout>
      <Seo
        lang={intl.locale}
        title={intl.formatMessage({ id: `tools.${name}.title` })}
        keywords={intl.formatMessage({ id: `tools.${name}.keywords` })}
        description={intl.formatMessage({ id: `tools.${name}.description` })}
      />
      <main>
        <Grid container>
          <Grid item xs={12} className={classes.tool}>
            <Typography variant="h2" component="h1">
              <FormattedMessage id={`tools.${name}.title`} />
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <FormattedMessage id={`tools.${name}.info`} />
            </Typography>
            {ToolComponent ? <ToolComponent /> : "No tool component available."}
          </Grid>
          <Grid item xs={12} className={classes.tool}>
            <Typography variant="subtitle1">
              <FormattedHTMLMessage id={`tools.${name}.content`} />
            </Typography>
          </Grid>
        </Grid>
      </main>
    </Layout>
  )
}
