import TextField from "@mui/material/TextField"
import React, { useCallback, useEffect, useState } from "react"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import makeStyles from "@mui/styles/makeStyles"
import { Alert, CardHeader, useMediaQuery } from "@mui/material"
import { jwtDecode } from "jwt-decode"
import JsonView from "@uiw/react-json-view"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import {useI18n} from "../../utils/useI18n";
import FormattedMessage from "../../components/FormattedMessage";

const useStyles = makeStyles(() => {
  return {
    button: (mobile) => (mobile ? {
      marginBottom: 5,
      width: "100%",
    } : {
      marginRight: 5,
    }),
  }
})
export const JwtDecode = () => {
  const [source, setSource] = useState()
  const [result, setResult] = useState()
  const [error, setError] = useState()
  const [header, setHeader] = useState()
  const {t} = useI18n({namespace: 'tools'});
  const matchesMobile = !useMediaQuery("(min-width:600px)", { defaultMatches: true })
  const classes = useStyles(matchesMobile)

  const handleSource = useCallback((e) => {
    setSource(e.currentTarget.value)
  }, [])

  const handleClear = useCallback((e) => {
    setSource(null)
    setResult(null)
    setError(null)
  }, [])

  useEffect(() => {
    try {
      setResult(jwtDecode(source))
      setHeader(jwtDecode(source, { header: true }))
      setError(null)
    } catch (e) {
      setError(e)
    }
  }, [source])

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          placeholder={t("jwt-decode.source")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          variant="outlined"
          value={source || "" }
          onChange={handleSource}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleClear} className={classes.button}>
          <FormattedMessage  namespace="tools" id="jwt-decode.clear" /></Button>
      </Grid>
      <Grid item xs={12}>
        {header && !error && <Card>
          <CardHeader title={t("jwt-decode.header")} />
          <CardContent><JsonView value={header} /></CardContent></Card>}
        {result && !error && <Card>
          <CardHeader title={t("jwt-decode.payload")} />
          <CardContent><JsonView value={result} /></CardContent></Card>}
        {source && error && <Alert color="error">{error.message}</Alert>}
        <br />
      </Grid>
    </Grid>
  </>
}