import React from "react"
import components from "../../tools/components"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Grid from "@material-ui/core/Grid"
import { FormattedMessage } from "gatsby-plugin-intl"
import Layout from "../components/Layout"

const useStyles = makeStyles(theme => ({
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
  const { name, componentName } = pageContext
  const ToolComponent = components[componentName]
  const classes = useStyles()
  return (
    <Layout>
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
        </Grid>
      </main>
    </Layout>
  )
}
