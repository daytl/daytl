import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import * as React from "react"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import { BirthNumbersData, generateBirthNumbers } from "./generateBirthNumber"
import { Checkbox, Chip, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import filesaver from "file-saver"
import Grid from "@mui/material/Grid"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { CopyButton } from "@/components/tool/CopyButton"
import { useI18n } from "@/utils/useI18n"
import FormattedMessage from "@/components/FormattedMessage"
import { MdSave as Save } from "react-icons/md"
import Cookies from "js-cookie"
import copy from "copy-to-clipboard"
import FormattedDate from "@/components/FormattedDate"

const buttonSx = {
  marginRight: {
    xs: 0,
    sm: "5px",
  },
  marginBottom: {
    xs: "5px",
    sm: 0,
  },
  width: {
    xs: "100%",
    sm: "auto",
  },
}

export const BirthNumberTool = () => {
  const [count, setCount] = useState(1)
  const [birthNumber, setBirthNumber] = useState<string>()
  const [settings, setSettings] = useState<any>()
  const [birthDate, setBirthDate] = useState<Date>()
  const [isFemale, setIsFemale] = useState(false)
  const { t } = useI18n({ namespace: "tools" })
  const [automaticCopy, setAutomaticCopy] = useState(Cookies.get("automaticCopy") === "true")
  const [justCopied, setJustCopied] = useState(false)
  const [lastCopiedValue, setLastCopiedValue] = useState("")

  useEffect(() => {
      if (count) {
        const result: BirthNumbersData = generateBirthNumbers(count, settings)
        setBirthNumber(result.birthNumbers.join("\n"))
        setBirthDate(result.settings.birthDate)
        setIsFemale(result.settings.isFemale)
      }
    }, [count, settings],
  )

  const handleBirthDateChange = useCallback((date: Date) => {
    if (date instanceof Date && !isNaN(date)) {
      setSettings({ birthDate: date, isFemale })
    }
  }, [isFemale])

  const handleCountChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e: React.FormEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.currentTarget.value)
    if (!isNaN(parsedValue)) {
      setCount(parsedValue)
    } else {
      setCount("")
    }
  }, [])

  const handleGenderChange = useCallback((event) => {
    setSettings({ birthDate, isFemale: event.target.value === "female" })
  }, [birthDate])

  const handleGenerateBirthNumber = useCallback((event) => {
    const { isfemale, minage, maxage } = event.currentTarget.dataset
    setSettings({ isFemale: isfemale, minAge: parseInt(minage), maxAge: parseInt(maxage) })
  }, [])

  const handleDownload = useCallback(() => {
    filesaver.saveAs(new Blob([birthNumber], { type: "text/plain;charset=utf-8" }), "birthnumbers.txt")
  }, [birthNumber])

  const handleAutomaticCopyChange = useCallback((event) => {
    setAutomaticCopy(!automaticCopy)
    Cookies.set("automaticCopy", (!automaticCopy).toString())
  }, [automaticCopy])

  return (<LocalizationProvider dateAdapter={AdapterDateFns}>
    <TextField
      value={birthNumber}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            {justCopied ?
              <Chip color="success" variant="filled" label={<FormattedMessage id="copied" namespace="common" />} /> :
              <CopyButton text={birthNumber} />}
          </InputAdornment>,
        "aria-label": t("birthnumber.birthNumber"),
      }}
      sx={
        {
          "textarea": {
            fontSize: "2rem",
            paddingTop: "10px",
            lineHeight: "2rem",
          },
        }
      }
      variant="outlined"
      multiline
      maxRows={3}
      onFocus={(event) => {
        if (automaticCopy && event.target.value !== lastCopiedValue) {
          copy(event.target.value)
          setLastCopiedValue(event.target.value)
          setJustCopied(true)
          setTimeout(() => setJustCopied(false), 1000)
        }
        return event.target.select()
      }}
      fullWidth
      FormHelperTextProps={{
        sx: {
          marginLeft: 0,
        },
      }}
      helperText={
        <Grid container>
          <Grid item xs={6}>
            <FormattedMessage namespace="tools" id="birthnumber.birthDate" />:{' '}
            <strong><FormattedDate value={birthDate} /></strong>
          </Grid>
          <Grid item xs={6} sx={{
            textAlign: "right",
          }}>
            <FormControlLabel control={<Checkbox checked={automaticCopy} onChange={handleAutomaticCopyChange} />}
                              labelPlacement="start"
                              label={<FormattedMessage namespace="common" id="automaticCopy" />}
            />

          </Grid>
        </Grid>
      }
    />
    <br />
    <br />
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Button color="primary" variant="contained"
                sx={buttonSx}
                onClick={handleGenerateBirthNumber}
                data-minage="0"
                data-maxage="17"
        >
          <FormattedMessage namespace="tools" id="birthnumber.buttonMenChild" />
        </Button>
        <Button color="primary" variant="contained"
                sx={buttonSx}
                onClick={handleGenerateBirthNumber}
                data-minage="18"
                data-maxage="60"
        >
          <FormattedMessage namespace="tools" id="birthnumber.buttonMenAdult" />
        </Button>
        <Button color="primary" variant="contained"
                sx={buttonSx}
                data-isfemale="true"
                onClick={handleGenerateBirthNumber}
                data-minage="0"
                data-maxage="17"
        >
          <FormattedMessage namespace="tools" id="birthnumber.buttonWomenChild" />
        </Button>
        <Button color="primary" variant="contained"
                sx={buttonSx}
                data-isfemale="true"
                data-minage="18"
                data-maxage="60"
                onClick={handleGenerateBirthNumber}>
          <FormattedMessage namespace="tools" id="birthnumber.buttonWomenAdult" />
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          label={<FormattedMessage namespace="tools" id="birthnumber.setupBirthDate" />}
          value={birthDate}
          inputFormat="yyyy/MM/dd"
          onChange={handleBirthDateChange}
          renderInput={(params) => <TextField {...params}
                                              size="small"
                                              sx={{ width: "160px" }}
                                              disabled
          />}
        />
        {" "}
        <FormControl sx={{
          marginLeft: 1,
        }}>
          <RadioGroup row aria-label="gender" value={isFemale ? "female" : "male"}
                      onChange={handleGenderChange}>
            <FormControlLabel value="female" control={<Radio />}
                              label={<FormattedMessage namespace="tools" id="birthnumber.female" />}
                              sx={{
                                height: "30px",
                              }} />
            <FormControlLabel value="male" control={<Radio />}
                              label={<FormattedMessage namespace="tools" id="birthnumber.male" />}
                              sx={{
                                height: "30px",
                              }} />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} paddingBottom={2}>
        <TextField
          variant="outlined"
          label={<FormattedMessage namespace="tools" id="birthnumber.count" />}
          onChange={handleCountChange}
          inputProps={{
            type: "number",
            max: 500,
            sx: {
              width: "50px",
            },
          }}
          value={count}
          size="small"
        />{" "}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            marginLeft: 1,
          }}
          onClick={handleDownload}
          startIcon={<Save />}
        >
          <FormattedMessage namespace="tools" id="birthnumber.download" />
        </Button>
      </Grid>
    </Grid>
  </LocalizationProvider>)
}

// copy button