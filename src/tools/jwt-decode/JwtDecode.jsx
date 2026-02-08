import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Alert, CardHeader } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import JsonView from "@uiw/react-json-view";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useI18n } from "../../utils/useI18n";
import FormattedMessage from "../../components/FormattedMessage";

export const JwtDecode = () => {
  const [source, setSource] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [header, setHeader] = useState();
  const { t } = useI18n({ namespace: "tools" });

  const handleSource = useCallback((e) => {
    setSource(e.currentTarget.value);
  }, []);

  const handleClear = useCallback(() => {
    setSource(null);
    setResult(null);
    setError(null);
  }, []);

  useEffect(() => {
    try {
      setResult(jwtDecode(source));
      setHeader(jwtDecode(source, { header: true }));
      setError(null);
    } catch (e) {
      setError(e);
    }
  }, [source]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <TextField
          placeholder={t("jwt-decode.source")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          variant="outlined"
          value={source || ""}
          onChange={handleSource}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
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
          <FormattedMessage namespace="tools" id="jwt-decode.clear" />
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        {header && !error && (
          <Card>
            <CardHeader title={t("jwt-decode.header")} />
            <CardContent>
              <JsonView value={header} />
            </CardContent>
          </Card>
        )}
        {result && !error && (
          <Card>
            <CardHeader title={t("jwt-decode.payload")} />
            <CardContent>
              <JsonView value={result} />
            </CardContent>
          </Card>
        )}
        {source && error && <Alert color="error">{error.message}</Alert>}
        <br />
      </Grid>
    </Grid>
  );
};
