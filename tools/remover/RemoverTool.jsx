import TextField from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import striptags from 'striptags';
import { FormattedMessage } from "gatsby-plugin-intl"
import makeStyles from "@material-ui/core/styles/makeStyles";
import { InputAdornment, useMediaQuery } from "@material-ui/core";
import useTranslation from "../../src/utils/useTranslation";
import { CopyButton } from '../../src/components/tool/CopyButton';

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
        setResult(source.replace(/(\r\n|\n|\r|\t)/gm, ""))
    }, [source])

    const handleRemoveHtml = useCallback(() => {
        setResult(striptags(source))
    }, [source])

    const handleClear = useCallback((e) => {
        setSource('');
        setResult('');
    }, [])

    const t = useTranslation();

    const matchesMobile = !useMediaQuery('(min-width:600px)', {defaultMatches: true})
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
