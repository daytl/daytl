import { string } from "prop-types"
import { FileCopy } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import React, { useCallback, useState } from "react"
import copy from "copy-to-clipboard"
import { Tooltip } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import useTranslation from "../../utils/useTranslation"

const useStyles = makeStyles((theme) => {
  return {
    tooltip: ({ copied }) => ({
      backgroundColor: copied
        ? theme.palette.success.main
        : "rgba(97, 97, 97, 0.92)",
    }),
  }
})

export const CopyButton = ({ text }) => {
  const t = useTranslation()
  const [copied, setCopied] = useState(false)
  const classes = useStyles({ copied })

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
      title={t(copied ? "common.copied" : "common.copy")}
    >
      <IconButton onClick={handleCopyToClipBoard} edge="end">
        <FileCopy />
      </IconButton>
    </Tooltip>
  )
}

CopyButton.propTypes = {
  text: string,
}