import Trans from "next-translate/Trans";

const FormattedMessage = ({ id, values = null, namespace = "common" }) => {
  return (
    <Trans
      i18nKey={`${namespace}:${id}`}
      // biome-ignore lint/a11y/useAnchorContent: Content is provided dynamically by Trans component
      components={{ strong: <strong />, span: <span />, a: <a href="/" /> }}
      values={values}
    />
  );
};

export default FormattedMessage;
