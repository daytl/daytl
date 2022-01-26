import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import React, { useCallback, useState } from "react"
import generateBirthNumber from "./generateBirthNumber"
import Divider from "@material-ui/core/Divider"
import { FormattedDate, FormattedMessage } from "gatsby-plugin-intl"
import { FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, useMediaQuery } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CopyButton } from '../../src/components/tool/CopyButton';
import { useMount } from 'react-use';
import Grid from '@material-ui/core/Grid';

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
        helperText: {
            marginLeft: 0,
        },
        radioGroup: {
            marginLeft: 10,
        },
        radio: {
            height: 30
        }

    }
})

export const BirthNumberTool = () => {
    const [birthNumber, setBirthNumber] = useState()
    const [birthDate, setBirthDate] = useState();
    const [isFemale, setIsFemale] = useState(false);

    useMount(() => {
            const result = generateBirthNumber()
            setBirthNumber(result.birthNumber);
            setBirthDate(result.birthDate);
            setIsFemale(result.isFemale);
        }
    )

    const handleBirthDateChange = useCallback((date) => {
        const result = generateBirthNumber({birthDate: date, isFemale});
        setBirthNumber(result.birthNumber);
        setBirthDate(result.birthDate);
        setIsFemale(result.isFemale);
    }, [isFemale]);

    const handleGenderChange = useCallback((event) => {
        const result = generateBirthNumber({birthDate, isFemale: event.target.value === 'female'});
        setBirthNumber(result.birthNumber);
        setBirthDate(result.birthDate);
        setIsFemale(result.isFemale);
    }, [birthDate]);

    const handleGenerateBirthNumber = useCallback((event) => {
        const {isfemale, minage, maxage} = event.currentTarget.dataset
        const result = generateBirthNumber({isFemale: isfemale, minAge: parseInt(minage), maxAge: parseInt(maxage)})
        setBirthNumber(result.birthNumber);
        setBirthDate(result.birthDate);
        setIsFemale(result.isFemale);
    }, [])

    const matchesMobile = !useMediaQuery('(min-width:600px)')
    const classes = useStyles(matchesMobile)

    return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TextField
            value={birthNumber}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <CopyButton text={birthNumber} />
                    </InputAdornment>,
                className: classes.input,
            }}
            variant="outlined"
            className={classes.input}
            fullWidth
            FormHelperTextProps={{
                className: classes.helperText
            }}
            helperText={
                <>
                    <FormattedMessage id="tools.birthnumber.birthDate" />:
                    <strong><FormattedDate value={birthDate} /></strong>
                </>
            }
        />
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <br />

                <Button color="primary" variant="contained"
                        className={classes.button}
                        onClick={handleGenerateBirthNumber}
                        data-minage="0"
                        data-maxage="17"
                >
                    <FormattedMessage id="tools.birthnumber.button.men.child" />
                </Button>
                <Button color="primary" variant="contained" className={classes.button}
                        onClick={handleGenerateBirthNumber}
                        data-minage="18"
                        data-maxage="60"
                >
                    <FormattedMessage id="tools.birthnumber.button.men.adult" />
                </Button>
                <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
                        onClick={handleGenerateBirthNumber}
                        data-minage="0"
                        data-maxage="17"
                >
                    <FormattedMessage id="tools.birthnumber.button.women.child" />
                </Button>
                <Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
                        data-minage="18"
                        data-maxage="60"
                        onClick={handleGenerateBirthNumber}>
                    <FormattedMessage id="tools.birthnumber.button.women.adult" />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <DatePicker
                    label={<FormattedMessage id="tools.birthnumber.setupBirthDate" />}
                    value={birthDate}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    onChange={handleBirthDateChange}
                />
                <FormControl className={classes.radioGroup}>
                    <RadioGroup aria-label="gender" value={isFemale ? 'female' : 'male'} onChange={handleGenderChange}>
                        <FormControlLabel value="female" control={<Radio />}
                                          label={<FormattedMessage id="tools.birthnumber.female" />}
                                          className={classes.radio} />
                        <FormControlLabel value="male" control={<Radio />}
                                          label={<FormattedMessage id="tools.birthnumber.male" />}
                                          className={classes.radio} />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    </MuiPickersUtilsProvider>)
}
