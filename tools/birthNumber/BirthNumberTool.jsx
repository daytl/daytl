import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import React, { useCallback, useRef, useState } from "react"
import generateBirthNumber from "./generateBirthNumber"
import Divider from "@material-ui/core/Divider"
import { FormattedMessage, FormattedDate } from "gatsby-plugin-intl"

const useStyles = makeStyles(() => {
  return {
    input: {
      fontSize: "2rem",
    },
    button: {
      marginRight: 5,
    },
  }
})

export const BirthNumberTool = () => {
  const [birthNumber, setBirthNumber] = useState(generateBirthNumber())
  const [copied, setCopied] = useState(false)
  const inputRef = useRef()

  const handleGenerateBirthNumber = useCallback((event) => {
    const { isfemale, minage, maxage } = event.currentTarget.dataset
    setBirthNumber(generateBirthNumber(isfemale, parseInt(minage), parseInt(maxage)))
    setCopied(false)
  }, [])

  const handleCopyToClipBoard = useCallback((event) => {
    // coppy
    event.preventDefault()
    const { target } = event
    const extensionStarts = target.value.lastIndexOf(".")
    target.focus()
    target.setSelectionRange(0, extensionStarts)
    document.execCommand("copy")
    setCopied(true)
  }, [])

  const classes = useStyles()

  return (<>
    <TextField
      value={birthNumber.birthNumber}
      InputProps={{
        onFocus: handleCopyToClipBoard,
        endAdornment: copied ? <Chip size="small" label={<FormattedMessage id="tools.birthNumber.copied" />} /> : null,
        className: classes.input,
      }}
      variant="outlined"
      className={classes.input}
      fullWidth
      helperText={
        <>
          <FormattedMessage id="tools.birthNumber.birthDate" />:
          <strong><FormattedDate value={birthNumber.birthDate}/></strong>
        </>
      }
      inputRef={inputRef}
    />
    <div><br />
      <Divider />
      <br />
      <Button color="primary" variant="contained"
              className={classes.button}
              onClick={handleGenerateBirthNumber}
              data-minage="0"
              data-maxage="18"
      >
        <FormattedMessage id="tools.birthNumber.button.men.child" />
      </Button>
      <Button color="primary" variant="contained" className={classes.button} onClick={handleGenerateBirthNumber}
              data-minage="19"
              data-maxage="60"
      >
        <FormattedMessage id="tools.birthNumber.button.men.adult" />
      </Button>
      <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
              onClick={handleGenerateBirthNumber}
              data-minage="0"
              data-maxage="18"
      >
        <FormattedMessage id="tools.birthNumber.button.women.child" />
      </Button>
      <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
              data-minage="19"
              data-maxage="60"
              onClick={handleGenerateBirthNumber}>
        <FormattedMessage id="tools.birthNumber.button.women.adult" />
      </Button>
    </div>
  </>)
}
