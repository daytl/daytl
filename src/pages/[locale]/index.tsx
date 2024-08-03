import {useI18n} from "@/utils/useI18n";
import Layout from "@/components/Layout";
import {Grid, Typography} from "@mui/material";
import FormattedMessage from "@/components/FormattedMessage";
import FormattedHTMLMessage from "@/components/FormattedHTMLMessage";
import tools from "@/tools";
import {Tool} from "@/components/tool/Tool";
import Seo from "@/components/Seo";

const Home = () => {
    const {t} = useI18n();

    return (
        <Layout index>
            <Seo
                title={t("title")}
                keywords={t("keywords")}
                description={t("description")}
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
                    <br/>
                    <br/>
                    <Typography variant="h4" gutterBottom>
                        <FormattedMessage id="info"/>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedHTMLMessage id="info2"/>
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                </Grid>
                {tools.map((config, index) => {

                    return (
                        <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
                            <Tool config={config}/>
                        </Grid>
                    );
                })}
            </Grid>
        </Layout>
    );
};

export default Home;
