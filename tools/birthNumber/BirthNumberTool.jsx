import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import React, { useCallback, useRef, useState } from "react"
import generateBirthNumber from "./generateBirthNumber"
import Divider from "@material-ui/core/Divider"
import { FormattedDate, FormattedMessage } from "gatsby-plugin-intl"
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        input: {
            fontSize: "2rem",
        },
        button: (mobile) => (mobile ? {
            marginBottom: 5,
            width: '100%'
        } : {
            marginRight: 5,
        }),
    }
})

export const BirthNumberTool = () => {
    const [birthNumber, setBirthNumber] = useState(generateBirthNumber())
    const [copied, setCopied] = useState(false)
    const inputRef = useRef()

    const handleGenerateBirthNumber = useCallback((event) => {
        const {isfemale, minage, maxage} = event.currentTarget.dataset
        setBirthNumber(generateBirthNumber(isfemale, parseInt(minage), parseInt(maxage)))
        setCopied(false)
    }, [])

    const handleCopyToClipBoard = useCallback((event) => {
        // coppy
        event.preventDefault()
        const {target} = event
        const extensionStarts = target.value.lastIndexOf(".")
        target.focus()
        target.setSelectionRange(0, extensionStarts)
        document.execCommand("copy")
        setCopied(true)
    }, [])


    const matchesMobile = !useMediaQuery('(min-width:600px)')
    const classes = useStyles(matchesMobile)

    return (<>
        <TextField
            value={birthNumber.birthNumber}
            InputProps={{
                onFocus: handleCopyToClipBoard,
                endAdornment: copied ?
                    <Chip size="small" label={<FormattedMessage id="tools.birthnumber.copied" />} /> : null,
                className: classes.input,
            }}
            variant="outlined"
            className={classes.input}
            fullWidth
            helperText={
                <>
                    <FormattedMessage id="tools.birthnumber.birthDate" />:
                    <strong><FormattedDate value={birthNumber.birthDate} /></strong>
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
                <FormattedMessage id="tools.birthnumber.button.men.child" />
            </Button>
            <Button color="primary" variant="contained" className={classes.button} onClick={handleGenerateBirthNumber}
                    data-minage="19"
                    data-maxage="60"
            >
                <FormattedMessage id="tools.birthnumber.button.men.adult" />
            </Button>
            <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
                    onClick={handleGenerateBirthNumber}
                    data-minage="0"
                    data-maxage="18"
            >
                <FormattedMessage id="tools.birthnumber.button.women.child" />
            </Button>
            <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
                    data-minage="19"
                    data-maxage="60"
                    onClick={handleGenerateBirthNumber}>
                <FormattedMessage id="tools.birthnumber.button.women.adult" />
            </Button>
        </div>
    </>)
}
