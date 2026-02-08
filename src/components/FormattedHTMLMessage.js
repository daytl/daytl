import { useI18n } from "../utils/useI18n";

const FormattedHTMLMessage = ({ id, values = null, TagName = "span", namespace = "common" }) => {
  const { t } = useI18n({ namespace });
  const message = t(id, values);
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted translation content
    <TagName dangerouslySetInnerHTML={{ __html: message }} />
  );
};

export default FormattedHTMLMessage;
