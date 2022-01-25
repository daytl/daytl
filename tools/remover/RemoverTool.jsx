import TextField from '@material-ui/core/TextField';
import React, { useCallback, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import striptags from 'striptags';
import { FormattedMessage } from "gatsby-plugin-intl"
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useMediaQuery } from "@material-ui/core";
import useTranslation from "../../src/utils/useTranslation";

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
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();

    const handleCopyToClipBoard = useCallback((event) => {
        // coppy
        event.preventDefault();
        const {target} = event;
        const extensionStarts = target.value.lastIndexOf('.');
        target.focus();
        target.setSelectionRange(0, extensionStarts);
        document.execCommand('copy');
        setCopied(true);
    }, []);


    const handleSource = useCallback((e) => {
        setSource(e.currentTarget.value);
        setCopied(false);
    }, [])

    const handleRemoveBreaks = useCallback(() => {
        setResult(source.replace(/(\r\n|\n|\r|\t)/gm, ""))
        setCopied(false);
    }, [source])

    const handleRemoveHtml = useCallback(() => {
        setResult(striptags(source))
        setCopied(false);
    }, [source])

    const handleClear = useCallback((e) => {
        setSource('');
        setResult('');
        setCopied(false);
    }, [])

    const t = useTranslation();

    const matchesMobile = !useMediaQuery('(min-width:600px)')
    const classes = useStyles(matchesMobile)

    return (<>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    placeholder={t("tools.remover.source")}
                    multiline
                    rows={4}
                    rowsMax={4}
                    fullWidth
                    variant="outlined"
                    value={source}
                    onChange={handleSource}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    placeholder={t("tools.remover.result")}
                    multiline
                    rows={4}
                    rowsMax={4}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        onFocus: handleCopyToClipBoard,
                    }}
                    value={result}
                    inputRef={inputRef}
                />
                {copied && <Chip size="small" label={<FormattedMessage id="tools.remover.copied" />} />}
            </Grid>
            <Grid item xs={12}>
                <br />
                <Button variant="contained" color="primary" onClick={handleRemoveBreaks} className={classes.button}>
                    <FormattedMessage
                        id="tools.remover.breaks" /></Button>{' '}
                <Button variant="contained" color="primary" onClick={handleRemoveHtml} className={classes.button}>
                    <FormattedMessage
                        id="tools.remover.html" /></Button>{' '}
                <Button variant="contained" color="secondary" onClick={handleClear} className={classes.button}>
                    <FormattedMessage
                        id="tools.remover.clear" /></Button>
            </Grid>
        </Grid>
    </>);
};
