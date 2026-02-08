import { Typography, Grid } from "@mui/material";
import type React from "react";
import { useI18n } from "@/utils/useI18n";
import FormattedMessage from "@/components/FormattedMessage";
import Script from "next/script";

interface FaqProps {
  faqs?: string[];
  name: string;
}

const Faq: React.FC<FaqProps> = ({ faqs, name }) => {
  const { t } = useI18n({ namespace: "tools" });

  if (!faqs) {
    return null;
  }

  return (
    <Grid container spacing={1}>
      <Grid>
        <Typography variant="h3">
          <FormattedMessage id={`${name}.faqsTitle`} namespace="tools" />
        </Typography>
      </Grid>
      {faqs.map((faq) => {
        return (
          <Grid key={faq}>
            <Typography variant="h4">
              <FormattedMessage id={`${name}.faqs.q${faq}`} namespace="tools" />
            </Typography>

            <Typography variant="body1">
              <FormattedMessage id={`${name}.faqs.a${faq}`} namespace="tools" />
            </Typography>
          </Grid>
        );
      })}
      <Script type="application/ld+json">{`
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
${faqs
  .map((faq) => {
    return `{"@type":"Question","name":"${t(`${name}.faqs.q${faq}`)}","acceptedAnswer":{"@type":"Answer","text":"${t(`${name}.faqs.a${faq}`)}"}}`;
  })
  .join(",")}]}        
        `}</Script>
    </Grid>
  );
};

export default Faq;
