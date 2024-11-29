import TextField from "@mui/material/TextField"
import React, { useCallback, useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import makeStyles from "@mui/styles/makeStyles"
import { Checkbox, FormControlLabel, InputAdornment, useMediaQuery } from "@mui/material"
import { decode, encode } from "js-base64"
import { useDropzone } from "react-dropzone"
import { CopyButton } from "../../components/tool/CopyButton"
import FormattedMessage from "../../components/FormattedMessage"
import { useI18n } from "../../utils/useI18n"
import { MdSave as Save } from "react-icons/md"
import filesaver from "file-saver"

const useStyles = makeStyles(() => {
  return {
    button: (mobile) => (mobile ? {
      marginBottom: 5,
      width: "100%",
    } : {
      marginRight: 5,
    }),
    dropzone: (mobile, isDragActive,
               isDragReject,
               isDragAccept) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: `#fafafa`,
      color: `#bdbdbd`,
      outline: "none",
      transition: `border .24s ease-in-out`,
    }),
  }
})


const toByteArray = (str) => {
  let bytes = []
  let charCode

  for (let i = 0; i < str.length; ++i) {
    charCode = str.charCodeAt(i)
    bytes.push((charCode & 0xFF00) >> 8)
    bytes.push(charCode & 0xFF)
  }
  return bytes
}

export const Base64EncodeDecode = () => {
  const [source, setSource] = useState("")
  const [result, setResult] = useState("")
  const [keepHeader, setKeepHeader] = useState(true)

  const onDrop = useCallback(acceptedFiles => {
    let reader = new FileReader()
    let file = acceptedFiles[0]
    reader.onload = () => {
      setResult(keepHeader ? reader.result : reader.result.replace(/^data:[^;]+;base64,/, ""))
    }
    reader.readAsDataURL(file)
  }, [keepHeader])

  const {
    getRootProps, getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    multiple: false,
    onDrop,
  })

  const { t } = useI18n({ namespace: "tools" })
  const matchesMobile = !useMediaQuery("(min-width:600px)", { defaultMatches: true })
  const classes = useStyles(matchesMobile, isDragActive,
    isDragReject,
    isDragAccept)

  const resultSize = useMemo(() => (result.length * 2 / 1024).toFixed(2), [result])

  const handleDownload = useCallback(() => {
    filesaver.saveAs(new Blob([result], { type: "text/plain;charset=utf-8" }), "result.txt")
  }, [result])

  const handleSource = useCallback((e) => {
    setSource(e.currentTarget.value)
  }, [])

  const handleEncode = useCallback(() => {
    setResult(encode(source))
  }, [source])

  const handleDecode = useCallback(() => {
    setResult(decode(source))
  }, [source])

  const handleClear = useCallback((e) => {
    setSource("")
    setResult("")
  }, [])

  return <>
    <Grid container spacing={1}>
      <Grid item xs={7}>
        <TextField
          placeholder={t("base64-encode-decode.source")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          variant="outlined"
          value={source}
          onChange={handleSource}
        />
      </Grid>
      <Grid item xs={5} sx={{ height: "100%", display: "flex", alignItems: "stretch" }}>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p><FormattedMessage namespace="tools" id="base64-encode-decode.drag" /></p>
        </div>
      </Grid>

      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={handleEncode} className={classes.button}>
          <FormattedMessage namespace="tools" id="base64-encode-decode.encode" />
        </Button>{" "}
        <Button color="primary" variant="contained" onClick={handleDecode} className={classes.button}>
          <FormattedMessage namespace="tools" id="base64-encode-decode.decode" />
        </Button>{" "}
        <Button variant="contained" color="secondary" onClick={handleClear} className={classes.button}>
          <FormattedMessage
            namespace="tools" id="base64-encode-decode.clear" /></Button>
        <FormControlLabel control={<Checkbox checked={keepHeader} onChange={
          (e) => setKeepHeader(e.target.checked)
        } />}
                          labelPlacement="start"
                          label={<FormattedMessage namespace="tools" id="base64-encode-decode.keepHeader" />}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder={t("base64-encode-decode.result")}
          multiline
          rows={4}
          maxRows={4}
          fullWidth
          onFocus={(event) => event.target.select()}
          variant="outlined"
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <CopyButton text={result} />
              </InputAdornment>,
          }}
          value={result}
        />
        <span>{result.length} / {resultSize}kB</span>{" "}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownload}
          startIcon={<Save />}
        >
          <FormattedMessage namespace="tools" id="birthnumber.download" />
        </Button>
      </Grid>
    </Grid>
  </>
}