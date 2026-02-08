import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import striptags from "striptags";
import { InputAdornment } from "@mui/material";
import { useI18n } from "@/utils/useI18n";
import FormattedMessage from "@/components/FormattedMessage";
import { CopyButton } from "@/components/tool/CopyButton";

export const RemoverTool = () => {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");

  const handleSource = useCallback((e) => {
    setSource(e.currentTarget.value);
  }, []);

  const handleRemoveBreaks = useCallback(() => {
    setResult(source.replace(/(\r\n|\n|\r|\t)/gm, " "));
  }, [source]);

  const handleRemoveHtml = useCallback(() => {
    setResult(striptags(source));
  }, [source]);

  const handleClear = useCallback(() => {
    setSource("");
    setResult("");
  }, []);

  const { t } = useI18n({ namespace: "tools" });

  return (
    <Grid container>
      <Grid size={{ xs: 6 }}>
        <TextField
          placeholder={t("remover.source")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          variant="outlined"
          value={source}
          onChange={handleSource}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          placeholder={t("remover.result")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          onFocus={(event) => event.target.select()}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CopyButton text={result} />
              </InputAdornment>
            ),
          }}
          value={result}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRemoveBreaks}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="remover.breaks" />
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRemoveHtml}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="remover.html" />
        </Button>{" "}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClear}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="remover.clear" />
        </Button>
      </Grid>
    </Grid>
  );
};
