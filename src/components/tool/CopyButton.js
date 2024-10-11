import { string } from "prop-types"
import { MdFileCopy as FileCopy } from "react-icons/md"
import IconButton from "@mui/material/IconButton"
import React, { useCallback, useState } from "react"
import copy from "copy-to-clipboard"
import { Chip } from "@mui/material"
import { useI18n } from "@/utils/useI18n"
import FormattedMessage from "@/components/FormattedMessage"

export const CopyButton = ({ text }) => {
  const { t } = useI18n({ namespace: "common" })
  const [copied, setCopied] = useState(false)

  const handleCopyToClipBoard = useCallback(() => {
    copy(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }, [text])

  return (

    copied ?
      <Chip color="success" variant="filled" label={<FormattedMessage id="copied" namespace="common" />} /> :
      <IconButton onClick={handleCopyToClipBoard} edge="end" size="large">
        <FileCopy />
      </IconButton>)
}

CopyButton.propTypes = {
  text: string,
}
