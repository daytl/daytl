import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography, Grid,
} from "@mui/material"
import { MdExpandMore } from "react-icons/md"
import PropTypes from "prop-types"
import React from "react"
import { useI18n } from "@/utils/useI18n"
import FormattedMessage from "@/components/FormattedMessage"
import Script from "next/script"

const Faq = ({ faqs, name }) => {
  const { t, lang } = useI18n({ namespace: "tools" })

  if (!faqs) {
    return null
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography variant="h3">
          <FormattedMessage id={`${name}.faqsTitle`} namespace="tools" />
        </Typography>
      </Grid>
      {faqs.map((faq, index) => {
        return (
          <Grid item>
            <Typography variant="h4"><FormattedMessage id={`${name}.faqs.q${faq}`} namespace="tools" /></Typography>

            <Typography variant="body1"><FormattedMessage id={`${name}.faqs.a${faq}`}
                                                          namespace="tools" /></Typography>

          </Grid>
        )
      })}
      <Script type="application/ld+json">{`
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
${faqs
        .map((faq, index) => {
          return `{"@type":"Question","name":"${t(`${name}.faq.${faq}.question`)}","acceptedAnswer":{"@type":"Answer","text":"${t(`${name}.faq.${faq}.answer`)}"}}`
        })
        .join(",")}]}        
        `}</Script>

    </Grid>
  )
}

export default Faq

Faq.propTypes = {
  faqs: PropTypes.array,
  name: PropTypes.string,
}
