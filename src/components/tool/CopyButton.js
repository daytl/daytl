import {string} from "prop-types"
import {MdFileCopy as FileCopy} from "react-icons/md"
import IconButton from "@mui/material/IconButton"
import React, {useCallback, useState} from "react"
import copy from "copy-to-clipboard"
import {Tooltip} from "@mui/material"
import makeStyles from '@mui/styles/makeStyles';
import useTranslation from "next-translate/useTranslation";
import {useI18n} from "../../utils/useI18n";

const useStyles = makeStyles((theme) => {
    return {
        tooltip: ({copied}) => ({
            backgroundColor: copied
                ? theme.palette.success.main
                : "rgba(97, 97, 97, 0.92)",
        }),
    }
})

export const CopyButton = ({text}) => {
    const {t} = useI18n({namespace: 'common'})
    const [copied, setCopied] = useState(false)
    const classes = useStyles({copied})

    const handleCopyToClipBoard = useCallback(() => {
        copy(text)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }, [text])

    return (
        <Tooltip
            placement="top"
            classes={classes}
            title={t(copied ? "copied" : "copy")}
        >
            <IconButton onClick={handleCopyToClipBoard} edge="end" size="large">
                <FileCopy/>
            </IconButton>
        </Tooltip>
    );
}

CopyButton.propTypes = {
    text: string,
}
