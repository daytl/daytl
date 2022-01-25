import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormattedHTMLMessage, FormattedMessage } from "gatsby-plugin-intl"
import { Checkbox, FormControlLabel, InputAdornment, Slider, useMediaQuery } from "@material-ui/core";
import { generateMultiple } from 'generate-password';
import { Controller, useForm } from 'react-hook-form';
import zxcvbn from 'zxcvbn';
import filesaver from 'file-saver';
import { FileCopy, Refresh, Save } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import copy from 'copy-to-clipboard';

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
            marginTop: 15,
        },
        helperText: {
            marginLeft: 0,
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
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        clearErrors,
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


    const [copied, setCopied] = useState(false)


    const handleGeneratePassword = useCallback((event) => {
        setValue('passwords', generatePass(getValues()));
        setCopied(false)
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


    const handleCopyToClipBoard = useCallback((event) => {
        copy(passwords);
        // TODO copy to clipboard to separate component
        setCopied(true)
    }, [passwords])

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
                                helperText={
                                    <>
                                        <FormattedMessage
                                            tagName="strong"
                                            id={`tools.passwordGenerator.strength.${passwordStats.score}`} />{' / '}
                                        <FormattedHTMLMessage id="tools.passwordGenerator.crackTime"
                                                              values={{time: passwordStats.crack_times_display.online_no_throttling_10_per_second}} />
                                    </>

                                }
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleCopyToClipBoard}
                                                edge="end"
                                            >
                                                <FileCopy />
                                            </IconButton>
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
                                        {...field}
                                        label={<FormattedMessage id="tools.passwordGenerator.length" />}
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
                                label={<FormattedMessage id="tools.passwordGenerator.letters" />}
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
                            label={<FormattedMessage id="tools.passwordGenerator.numbers" />}
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
                            label={<FormattedMessage id="tools.passwordGenerator.symbols" />}
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
                                //variant="outlined"
                                label={<FormattedMessage id="tools.passwordGenerator.count" />}
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
                        <FormattedMessage id="tools.passwordGenerator.refresh" />
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleDownload}
                        startIcon={<Save />}
                    >
                        <FormattedMessage id="tools.passwordGenerator.download" />
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
