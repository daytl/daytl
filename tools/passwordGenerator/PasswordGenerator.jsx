import Button from "@mui/material/Button"
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField"
import React, { useCallback, useEffect, useMemo } from "react"
import { FormattedHTMLMessage, FormattedMessage } from "gatsby-plugin-intl"
import { Checkbox, FormControlLabel, InputAdornment, Slider, useMediaQuery } from "@mui/material";
import { generateMultiple } from 'generate-password';
import { Controller, useForm } from 'react-hook-form';
import zxcvbn from 'zxcvbn';
import filesaver from 'file-saver';
import { Refresh, Save } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { CopyButton } from '../../src/components/tool/CopyButton';

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
        slider: {
            marginTop: 7,
        },
        helperText: {
            marginLeft: 0,
            marginBottom: 10,
        }
    }
})

const generatePass = (
    {
        length = 10,
        numbers = true,
        symbols = false,
        letters = true,
        count = 1,
    }
        = {}) => {

    const finalLength = parseInt(length);

    if (numbers || symbols || letters) {
        const passwords = generateMultiple(count, {
            length: finalLength > 4 ? finalLength : 4,
            numbers,
            symbols,
            lowercase: letters,
            uppercase: letters,
            strict: true,
            excludeSimilarCharacters: true,
        });

        return passwords.join('\n');
    }
    return '';
}

export const PasswordGenerator = () => {

    const {
        control,
        setValue,
        getValues,
        watch,
        formState: {errors},
    } = useForm({
        defaultValues: {
            length: 10,
            count: 1,
            letters: true,
            numbers: true,
            symbols: false,
            passwords: generatePass(),
        }
    });

    const watchPasswords = watch('passwords');
    const passwords = getValues('passwords');
    const passwordStats = useMemo(() => zxcvbn(watchPasswords.split('\n')[0]), [watchPasswords])

    const handleGeneratePassword = useCallback((event) => {
        setValue('passwords', generatePass(getValues()));
    }, [setValue, getValues])

    const handleDownload = useCallback((event) => {
        filesaver.saveAs(new Blob([passwords], {type: "text/plain;charset=utf-8"}), "passwords.txt");
    }, [passwords])

    useEffect(() => {
        const subscription = watch((values, {name, type}) => {
            if (name !== 'passwords') {
                setValue('passwords', generatePass(values));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);


    const classes = useStyles(!useMediaQuery('(min-width:600px)'))

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Controller
                        name="passwords"
                        control={control}
                        render={({field}) => (
                            <TextField
                                fullWidth
                                {...field}
                                multiline
                                maxRows={3}
                                FormHelperTextProps={{
                                    className: classes.helperText
                                }}
                                variant="outlined"
                                onFocus={(event)=> event.target.select()}
                                helperText={
                                    <>
                                        <FormattedMessage
                                            tagName="strong"
                                            id={`tools.passwordgenerator.strength.${passwordStats.score}`} />{' / '}
                                        <FormattedHTMLMessage id="tools.passwordgenerator.crackTime"
                                                              values={{time: passwordStats.crack_times_display.online_no_throttling_10_per_second}} />
                                    </>

                                }
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <CopyButton text={passwords} />
                                        </InputAdornment>

                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1}>
                            <Controller
                                name="length"
                                control={control}
                                rules={{
                                    valueAsNumber: true,
                                }}
                                render={({field}) => (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                        label={<FormattedMessage id="tools.passwordgenerator.length" />}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Slider
                                defaultValue={10}
                                aria-labelledby="discrete-slider-small-steps"
                                step={1}
                                marks
                                className={classes.slider}
                                min={4}
                                onChange={(event, value) => {
                                    setValue('length', value)
                                }}
                                max={100}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>

                    <Controller
                        name="letters"
                        control={control}
                        render={({
                                     field,
                                     fieldState,
                                 }) => {

                            return <FormControlLabel
                                control={<Checkbox {...field}

                                                   checked={field.value}
                                />}
                                label={<FormattedMessage id="tools.passwordgenerator.letters" />}
                            />
                        }
                        }
                    />
                    <Controller
                        name="numbers"
                        control={control}
                        render={({
                                     field,
                                     fieldState,

                                 }) => <FormControlLabel
                            control={<Checkbox {...field}
                                               checked={field.value}
                            />}
                            label={<FormattedMessage id="tools.passwordgenerator.numbers" />}
                        />
                        }
                    />
                    <Controller
                        name="symbols"
                        control={control}
                        render={({
                                     field,
                                     fieldState,

                                 }) => <FormControlLabel
                            control={<Checkbox {...field}
                                               checked={field.value}
                            />}
                            label={<FormattedMessage id="tools.passwordgenerator.symbols" />}
                        />
                        }
                    />
                    <Controller
                        name="count"
                        control={control}
                        rules={{
                            // TODO numeric value
                            valueAsNumber: true,
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                size="small"
                                label={<FormattedMessage id="tools.passwordgenerator.count" />}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <br />
                    <Button variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={handleGeneratePassword}
                            startIcon={<Refresh />}
                    >
                        <FormattedMessage id="tools.passwordgenerator.refresh" />
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleDownload}
                        startIcon={<Save />}
                    >
                        <FormattedMessage id="tools.passwordgenerator.download" />
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
