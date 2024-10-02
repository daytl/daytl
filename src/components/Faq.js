import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
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
    <>
      <Typography variant="h4">
        <FormattedMessage id={`${name}.faqsTitle`} namespace="tools" />
      </Typography>
      {faqs.map((faq, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              sx={{ paddingTop: 1, paddingBottom: 1 }}
            >
              <Typography variant="h5"><FormattedMessage id={`${name}.faqs.q${faq}`} namespace="tools" /></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingTop: 0 }}>
              <Typography variant="body1"><FormattedMessage id={`${name}.faqs.a${faq}`}
                                                            namespace="tools" /></Typography>
            </AccordionDetails>
          </Accordion>
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

    </>
  )
}

export default Faq

Faq.propTypes = {
  faqs: PropTypes.array,
  name: PropTypes.string,
}
