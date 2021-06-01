import IconButton from "@material-ui/core/IconButton"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import React, { useCallback, useState } from "react"
import { object } from "prop-types"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import CloseIcon from "@material-ui/icons/Close"
import components from "../../../tools/components"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Zoom from "@material-ui/core/Zoom"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import { FormattedMessage, Link } from "gatsby-plugin-intl"

const useStyles = makeStyles(theme => {
    return {
        card: {
            cursor: "pointer",
            "&:hover": {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
            },
        },
        close: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
    }
})

export const Tool = ({config}) => {
    const {name, version, github, componentName} = config
    const ToolComponent = components[componentName]
    const [open, setOpen] = useState(false)

    const classes = useStyles();

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])
    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])
    const styles = useStyles()
    return (
        <>
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
                    <FormattedMessage id={`tools.${name}.title`} tagName="strong" /><br />
                    <FormattedMessage id={`tools.${name}.info`} />
                    <IconButton onClick={handleClose} className={classes.close}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {ToolComponent ? <ToolComponent /> : "No tool component available."}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormattedMessage id={`tools.${name}.content`} />
                    </DialogContentText>
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
        </>
    )
}

Tool.displayName = "Tool"

Tool.propTypes = {
    config: object,
}
