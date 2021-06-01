import TextField from '@material-ui/core/TextField';
import React, { useCallback, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from "gatsby-plugin-intl"
import makeStyles from "@material-ui/core/styles/makeStyles";
import { TextareaAutosize, useMediaQuery } from "@material-ui/core";
import { fromByteArray } from 'base64-js';
import { encode, decode } from 'js-base64';
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


const toByteArray = (str) => {
    let bytes = [];
    let charCode;

    for (let i = 0; i < str.length; ++i) {
        charCode = str.charCodeAt(i);
        bytes.push((charCode & 0xFF00) >> 8);
        bytes.push(charCode & 0xFF);
    }
    return bytes;
}

export const Base64EncodeDecode = () => {
    const [source, setSource] = useState('čřščřčš');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();

    const t = useTranslation();
    const matchesMobile = !useMediaQuery('(min-width:600px)')
    const classes = useStyles(matchesMobile)

    // TODO get result size in useMemo
    const resultSize = (result.length * 2 / 1024).toFixed(2)

    // TODO move to utils
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

    const handleEncode = useCallback(() => {
        // type handler
        setResult(encode(source))
        setCopied(false);
    }, [source])

    const handleDecode = useCallback(() => {
        setResult(decode(source))
        setCopied(false);
    }, [source])

    const handleClear = useCallback((e) => {
        setSource('');
        setResult('');
        setCopied(false);
    }, [])

    return (<>
        <Grid container spacing={1}>
            <Grid item xs={7}>
                <TextField
                    placeholder={t("tools.base64-encode-decode.source")}
                    multiline
                    rows={4}
                    rowsMax={4}
                    fullWidth
                    variant="outlined"
                    value={source}
                    onChange={handleSource}
                />
            </Grid>
            <Grid item xs={5}>
                Or drop image here
            </Grid>

            <Grid item xs={12}>

                <Button color="primary" variant="contained" onClick={handleEncode} className={classes.button}>
                    <FormattedMessage id="tools.base64-encode-decode.encode" />
                </Button>
                <Button color="primary" variant="contained" onClick={handleDecode} className={classes.button}>
                    <FormattedMessage id="tools.base64-encode-decode.decode" />
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClear} className={classes.button}>
                    <FormattedMessage
                        id="tools.base64-encode-decode.clear" /></Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    placeholder={t("tools.base64-encode-decode.result")}
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
                <span>{result.length} / {resultSize}kB</span>
                {copied && <Chip size="small" label={<FormattedMessage id="tools.base64-encode-decode.copied" />} />}
            </Grid>

        </Grid>
    </>);
};

// TODO
// image encoding
// length info, kb info
// error hadling