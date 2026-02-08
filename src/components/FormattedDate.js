import { useI18n } from "@/utils/useI18n";

const FormattedDate = ({ value }) => {
  const { lang } = useI18n();
  return new Intl.DateTimeFormat(lang).format(value);
};

export default FormattedDate;
