import React from "react"
import components from "../../tools/components"
import Typography from "@mui/material/Typography"
import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Grid"
import {
    FormattedMessage,
    useIntl,
} from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Divider from "@mui/material/Divider"
import FormattedHTMLMessage from '../components/FormattedHTMLMessage';
import tools from '../../tools';
import { Tool } from '../components/tool/Tool';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
        color: "#000",
        marginBottom: 2,
    },
    tool: {
        margin: 10,
        fontSize: "1rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: 1.75,
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        flexGrow: 1,
    },
}))

export default function ToolPage({pageContext}) {
    const {
        tool: {name, componentName},
    } = pageContext
    const ToolComponent = components[componentName]
    const intl = useIntl()
    const classes = useStyles()
    return (
        <Layout>
            <Seo
                lang={intl.locale}
                title={intl.formatMessage({id: `tools.${name}.title`})}
                keywords={[intl.formatMessage({id: `tools.${name}.keywords`})]}
                description={intl.formatMessage({id: `tools.${name}.description`})}
            />
            <Grid container>
                <Grid item xs={12} className={classes.tool}>
                    <Typography variant="h2" component="h1">
                        <FormattedMessage id={`tools.${name}.title`} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom component="h2">
                        <FormattedMessage id={`tools.${name}.info`} />
                    </Typography>
                    {ToolComponent ? <ToolComponent /> : "No tool component available."}
                </Grid>
                <Grid item xs={12} className={classes.tool}>
                    <Divider />
                    <FormattedHTMLMessage id={`tools.${name}.content`} tagName="div" />
                </Grid>

                <Grid item xs={12} className={classes.tool}>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h4" component="h2">
                        <FormattedMessage id={`common.otherTools`} />
                    </Typography>
                    <br />
                    <Grid container spacing={2}>
                        {tools.filter((config) => config.name !== name).map((config, index) => (
                            <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                                <Tool config={config} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}
