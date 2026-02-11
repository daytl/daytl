import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Alert, CardHeader, Typography, Box } from "@mui/material";
import JsonView from "@uiw/react-json-view";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useI18n } from "../../utils/useI18n";
import FormattedMessage from "../../components/FormattedMessage";
import { CopyButton } from "../../components/tool/CopyButton";

export const JsonViewer = () => {
  const [source, setSource] = useState("");
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState(null);
  const [formatted, setFormatted] = useState("");
  const [stats, setStats] = useState({ keys: 0, size: 0, depth: 0 });
  const { t } = useI18n({ namespace: "tools" });

  const handleSource = useCallback((e) => {
    setSource(e.currentTarget.value);
  }, []);

  const handleClear = useCallback(() => {
    setSource("");
    setParsed(null);
    setError(null);
    setFormatted("");
    setStats({ keys: 0, size: 0, depth: 0 });
  }, []);

  const handleFormat = useCallback(() => {
    if (parsed) {
      const formatted = JSON.stringify(parsed, null, 2);
      setFormatted(formatted);
      setSource(formatted);
    }
  }, [parsed]);

  const handleMinify = useCallback(() => {
    if (parsed) {
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setSource(minified);
    }
  }, [parsed]);

  // Calculate statistics
  const calculateStats = useCallback((obj) => {
    let keyCount = 0;
    let maxDepth = 0;

    const countKeys = (item, depth = 0) => {
      maxDepth = Math.max(maxDepth, depth);
      
      if (typeof item === "object" && item !== null) {
        if (Array.isArray(item)) {
          for (const element of item) {
            countKeys(element, depth + 1);
          }
        } else {
          keyCount += Object.keys(item).length;
          for (const value of Object.values(item)) {
            countKeys(value, depth + 1);
          }
        }
      }
    };

    countKeys(obj);
    const size = JSON.stringify(obj).length;

    return { keys: keyCount, size, depth: maxDepth };
  }, []);

  useEffect(() => {
    if (!source || source.trim() === "") {
      setParsed(null);
      setError(null);
      setFormatted("");
      setStats({ keys: 0, size: 0, depth: 0 });
      return;
    }

    try {
      const parsedJson = JSON.parse(source);
      setParsed(parsedJson);
      setError(null);
      setFormatted(JSON.stringify(parsedJson, null, 2));
      setStats(calculateStats(parsedJson));
    } catch (e) {
      setParsed(null);
      setError(e);
      setFormatted("");
      setStats({ keys: 0, size: 0, depth: 0 });
    }
  }, [source, calculateStats]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <TextField
          placeholder={t("json-viewer.source")}
          multiline
          rows={8}
          maxRows={12}
          fullWidth
          variant="outlined"
          value={source}
          onChange={handleSource}
          error={!!error}
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
          <FormattedMessage namespace="tools" id="json-viewer.clear" />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormat}
          disabled={!parsed}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="json-viewer.format" />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMinify}
          disabled={!parsed}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="json-viewer.minify" />
        </Button>
        {parsed && formatted && (
          <CopyButton
            text={formatted}
            sx={{
              marginRight: { xs: 0, sm: 0.625 },
              marginBottom: { xs: 0.625, sm: 0 },
              width: { xs: "100%", sm: "auto" },
            }}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            <strong>{t("json-viewer.invalidJson")}:</strong> {error.message}
          </Alert>
        )}
        {parsed && !error && (
          <>
            <Card sx={{ mb: 2 }}>
              <CardHeader title={t("json-viewer.stats")} />
              <CardContent>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                  <Typography variant="body1">
                    <strong>{t("json-viewer.keys")}:</strong> {stats.keys}
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t("json-viewer.size")}:</strong> {stats.size} bytes
                  </Typography>
                  <Typography variant="body1">
                    <strong>{t("json-viewer.depth")}:</strong> {stats.depth}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title={t("json-viewer.result")} />
              <CardContent>
                <JsonView value={parsed} />
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
};
