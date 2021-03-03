import TextField from '@material-ui/core/TextField';
import React, { useCallback, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import striptags from 'striptags';
import { FormattedMessage, useIntl } from "gatsby-plugin-intl"

const useTransaltion = () => {
    const intl = useIntl();
    return (id) => {
        intl.formatMessage({id})
    }
}

export const RemoverTool = () => {
    //const classes = useStyles();
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
        setResult(source.replace(/(\r\n|\n|\r)/gm, ""))
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

    const t = useTransaltion();

    return (<>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    placeholder={t("remover.source")}
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
                    placeholder={t("remover.result")}
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
                <Button variant="contained" color="primary" onClick={handleRemoveBreaks}><FormattedMessage
                    id="tools.remover.breaks" /></Button>{' '}
                <Button variant="contained" color="primary" onClick={handleRemoveHtml}><FormattedMessage
                    id="tools.remover.html" /></Button>{' '}
                <Button variant="contained" color="secondary" onClick={handleClear}><FormattedMessage
                    id="tools.remover.clear" /></Button>
            </Grid>
        </Grid>
    </>);
};
