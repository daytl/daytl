import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import striptags from 'striptags';
import makeStyles from '@mui/styles/makeStyles';
import { InputAdornment, useMediaQuery } from "@mui/material";
import {useI18n} from "@/utils/useI18n";
import FormattedMessage from "@/components/FormattedMessage";
import {CopyButton} from "@/components/tool/CopyButton";


const useStyles = makeStyles(() => {
    return {
        button: (mobile) => (mobile ? {
            marginBottom: 5,
            width: '100%'
        } : {
            marginRight: 5,
        }),
    }
})

export const RemoverTool = () => {
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');

    const handleSource = useCallback((e) => {
        setSource(e.currentTarget.value);
    }, [])

    const handleRemoveBreaks = useCallback(() => {
        setResult(source.replace(/(\r\n|\n|\r|\t)/gm, " "))
    }, [source])

    const handleRemoveHtml = useCallback(() => {
        setResult(striptags(source))
    }, [source])

    const handleClear = useCallback((e) => {
        setSource('');
        setResult('');
    }, [])

    const {t} = useI18n({namespace: 'tools'});

    const matchesMobile = !useMediaQuery('(min-width:600px)', {defaultMatches: true})
    const classes = useStyles(matchesMobile)

    return <>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    placeholder={t("remover.source")}
                    multiline
                    rows={4}
                    maxRows={4}
                    fullWidth
                    variant="outlined"
                    value={source}
                    onChange={handleSource}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    placeholder={t("remover.result")}
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
            </Grid>
            <Grid item xs={12}>
                <br />
                <Button variant="contained" color="primary" onClick={handleRemoveBreaks} className={classes.button}>
                    <FormattedMessage
                         namespace="tools" id="remover.breaks" /></Button>{' '}
                <Button variant="contained" color="primary" onClick={handleRemoveHtml} className={classes.button}>
                    <FormattedMessage
                         namespace="tools" id="remover.html" /></Button>{' '}
                <Button variant="contained" color="secondary" onClick={handleClear} className={classes.button}>
                    <FormattedMessage
                         namespace="tools" id="remover.clear" /></Button>
            </Grid>
        </Grid>
    </>;
};
