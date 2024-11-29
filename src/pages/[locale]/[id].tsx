import { useI18n } from "@/utils/useI18n"
import { useRouteRedirect } from "@/utils/useRouteRedirect"
import Layout from "@/components/Layout"
import tools from "@/tools"
import { useRouter } from "next/router"
import { Divider, Grid, Typography } from "@mui/material"
import FormattedMessage from "@/components/FormattedMessage"
import FormattedHTMLMessage from "@/components/FormattedHTMLMessage"
import { Tool } from "@/components/tool/Tool"
import Seo from "@/components/Seo"
import { i18nConfig } from "../../../i18n"
import Faq from "@/components/Faq"

const DynamicPage = () => {
  const { t, lang } = useI18n({ namespace: "tools" })
  const router = useRouter()
  const { locale, id } = router.query

  const { redirect } = useRouteRedirect()
  const tool = tools.find((tool) => tool.name === id) as any
  const ToolComponent = tool?.component
  if (!tool) {
    redirect("404")
    return null
  }

  return (
    <Layout>
      <Seo
        lang={lang}
        title={t(`${tool.name}.title`)}
        keywords={t(`${tool.name}.keywords`)}
        description={t(`${tool.name}.description`)}
      />
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1">
            <FormattedMessage id={`${tool.name}.title`} namespace="tools" />
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="h2">
            <FormattedMessage id={`${tool.name}.info`} namespace="tools" />
          </Typography>
          <ToolComponent />
        </Grid>
        <Grid item xs={12}>
          <br />
          <Divider />
          <FormattedHTMLMessage id={`${tool.name}.content`} namespace="tools" TagName="div" />
        </Grid>

        {tool.faqs && <Grid item xs={12}>
          <Divider />
          <br />
          <Faq faqs={tool.faqs} name={tool.name} />
        </Grid>}

        <Grid item xs={12}>
          <br />
          <Divider />
          <br />
          <Typography variant="h4" component="h2">
            <FormattedMessage id={`otherTools`} namespace="common" />
          </Typography>
          <br />
          <Grid container spacing={2}>
            {tools.filter((config) => config.name !== tool.name).map((config, index) => (
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

export default DynamicPage

export async function getStaticProps() {
  return { props: {} }
}

export async function getStaticPaths() {
  let pathsData: any[]
  pathsData = []
  i18nConfig.locales.map((locale) => {
    tools.map((tool) => {

      pathsData.push({
        params: {
          locale,
          id: tool.name,
        },
      })
    })
  })
  return {
    paths: pathsData,
    fallback: false,
  }
}
