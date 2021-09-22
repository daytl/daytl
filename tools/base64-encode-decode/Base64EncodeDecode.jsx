import TextField from '@material-ui/core/TextField';
import React, { useCallback, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from "gatsby-plugin-intl"
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useMediaQuery } from "@material-ui/core";
import { decode, encode, atob, btoa } from 'js-base64';
import useTranslation from "../../src/utils/useTranslation";
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles(() => {
    return {
        button: (mobile) => (mobile ? {
            marginBottom: 5,
            width: '100%'
        } : {
            marginRight: 5,
        }),
        dropzone: (mobile, isDragActive,
                   isDragReject,
                   isDragAccept) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out',
        }),
        copy: {
            color: 'green',
            borderColor: 'green',
        }
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
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        let reader = new FileReader();
        let file = acceptedFiles[0];
        reader.onload= () => {
            setResult(reader.result)
        }
        reader.readAsDataURL(file)
    }, []);

    const {
        getRootProps, getInputProps,
        isDragActive,
        isDragReject,
        isDragAccept
    } = useDropzone({
        multiple: false,
        onDrop
    })


    const inputRef = useRef();

    const t = useTranslation();
    const matchesMobile = !useMediaQuery('(min-width:600px)')
    const classes = useStyles(matchesMobile, isDragActive,
        isDragReject,
        isDragAccept)

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
                <div {...getRootProps({className: classes.dropzone})}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
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
                <span>{result.length} / {resultSize}kB</span>{' '}
                {copied && <Chip size="small" variant="outlined" className={classes.copy} label={<FormattedMessage id="tools.base64-encode-decode.copied" />} />}
            </Grid>

        </Grid>
    </>);
};

// TODO
// image encoding
// error hadling