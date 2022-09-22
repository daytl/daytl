import IconButton from "@mui/material/IconButton"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import React, { useCallback, useState } from "react"
import { object } from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import CloseIcon from "@mui/icons-material/Close"
import components from "../../../tools/components"
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import Zoom from "@mui/material/Zoom"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import {
  FormattedHTMLMessage,
  FormattedMessage,
  Link,
} from "gatsby-plugin-intl"
import Feedback from "../Feedback"
import Divider from "@mui/material/Divider"

const useStyles = makeStyles((theme) => {
  return {
    card: {
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
      },
      minHeight: "8rem",
      height: "100%",
    },
    close: {
      position: "absolute",
      right: 0,
      top: 0,
    },
  }
})

export const Tool = ({ config }) => {
  const { name, componentName } = config
  const ToolComponent = components[componentName]
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const styles = useStyles()
  return <>
    <Card onClick={handleOpen} className={styles.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <FormattedMessage id={`tools.${name}.title`} />
        </Typography>
        <Typography variant="body2" component="p">
          <FormattedMessage id={`tools.${name}.info`} />
        </Typography>
      </CardContent>
    </Card>
    <Dialog
      open={open}
      TransitionComponent={Zoom}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <FormattedMessage id={`tools.${name}.title`} tagName="strong" />
        <br />
        <FormattedMessage id={`tools.${name}.info`} />
        <IconButton onClick={handleClose} className={classes.close} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {ToolComponent ? <ToolComponent /> : "No tool component available."}
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <Divider />
        <DialogContentText id="alert-dialog-slide-description">
          <FormattedHTMLMessage id={`tools.${name}.content`} />
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <Feedback />
      </DialogContent>
      <DialogActions>
        <Button
          to={`/${name}`}
          component={Link}
          target="_blank"
          variant="text"
          endIcon={<OpenInNewIcon />}
        >
          <FormattedMessage id="common.toolPage" />
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

Tool.displayName = "Tool"

Tool.propTypes = {
  config: object,
}
