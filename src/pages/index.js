import React from "react"
import {
    FormattedMessage,
    useIntl,
} from "gatsby-plugin-intl"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Grid } from "@mui/material";
import tools from "../../tools"
import { Tool } from "../components/tool/Tool"
import Typography from "@mui/material/Typography"
import FormattedHTMLMessage from '../components/FormattedHTMLMessage';

const IndexPage = () => {
    const intl = useIntl()
    return (
        <Layout index>
            <Seo
                lang={intl.locale}
                title={intl.formatMessage({id: "common.title"})}
                keywords={intl.formatMessage({id: "common.keywords"})}
                description={intl.formatMessage({id: "common.description"})}
            />
            <Grid container

                  spacing={2}
                  sx={{
                      paddingLeft: 1,
                      paddingRight: 1,
                  }}>
                <Grid item xs={12} sx={{
                    textAlign: "center",
                    color: "#555",
                }}>
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
                    <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                        <Tool config={config} />
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export default IndexPage
