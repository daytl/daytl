import React, { useCallback, useState } from "react"
import FeedbackIcon from "@material-ui/icons/Feedback"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import DialogContent from "@material-ui/core/DialogContent"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 400,
    },
    content: {
        padding: 0,
    },
}))

const Feedback = () => {
    const [open, setOpen] = useState(false)

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])
    const handleOpen = useCallback(() => {
        setOpen(true)
    }, [setOpen])

    const classes = useStyles()

    return (
        <>
            <Button size="small" onClick={handleOpen}>
                <FeedbackIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} classes={classes}>
                <DialogTitle>
                    <IconButton onClick={handleClose} style={{float: "right"}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <iframe
                        title="feedback"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeGBvoZUbBwL7c4bx7vJ-fHfmDCiGuOz1eV7fz3VegMr7Qaxw/viewform?embedded=true"
                        width="400"
                        height="582"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                    >
                        Načítání…
                    </iframe>
                </DialogContent>
            </Dialog>
        </>
    )
}

Feedback.propTypes = {}

Feedback.defaultProps = {}

export default Feedback
