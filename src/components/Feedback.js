import React, { useCallback, useState } from "react"
import SendIcon from "@material-ui/icons/Send"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import DialogContent from "@material-ui/core/DialogContent"
import makeStyles from "@material-ui/core/styles/makeStyles"
import encode from "../utils/encode"
import { Controller, useForm } from "react-hook-form"
import { DialogActions, TextField } from "@material-ui/core"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Alert } from "@material-ui/lab"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 400,
  },
  alertButton: {
    width: "100%",
    textAlign: "right",
  },
  close: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  message: {
    width: "100%",
  },
}))

const Feedback = () => {
  const [open, setOpen] = useState(false)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({})
  const [success, setSuccess] = useState(true)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const handleOpen = useCallback(() => {
    setSuccess(false)
    setOpen(true)
  }, [setOpen, setSuccess])

  const classes = useStyles()

  const onSubmit = (data) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...data,
      }),
    })
      .then(() => {
        reset()
        setSuccess(true)
      })
      .catch((error) => alert(error))
  }
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<form name="contact" netlify netlify-honeypot="bot-field" hidden><input type="text" name="email" /><textarea name="message"></textarea></form>',
        }}
      />

      <Alert color="info" classes={classes}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormattedMessage id="common.feedback.text" />
          </Grid>
          <Grid item xs={6} className={classes.alertButton}>
            <Button
              size="small"
              color="primary"
              onClick={handleOpen}
              variant="outlined"
              endIcon={<SendIcon />}
            >
              <FormattedMessage id="common.feedback.button" />
            </Button>
          </Grid>
        </Grid>
      </Alert>
      <Dialog open={open} onClose={handleClose} classes={classes}>
        <DialogTitle>
          <IconButton onClick={handleClose} className={classes.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {success ? (
          <DialogContent>
            <Alert color="success">
              <FormattedMessage id="common.feedback.success" />
            </Alert>
          </DialogContent>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} name="contact">
              <DialogContent>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: (
                        <FormattedMessage id="common.feedback.emailError" />
                      ),
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      error={errors?.email}
                      helperText={errors?.email?.message}
                      label={<FormattedMessage id="common.feedback.email" />}
                    />
                  )}
                />
                <br />
                <br />
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 500,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={<FormattedMessage id="common.feedback.message" />}
                      multiline
                      error={errors?.message}
                      helperText={errors?.message?.message}
                      rows={4}
                      maxRows={4}
                      {...field}
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button color="primary" variant="contained" type="submit">
                  <FormattedMessage id="common.feedback.submit" />
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </Dialog>
    </>
  )
}

Feedback.propTypes = {}

Feedback.defaultProps = {}

export default Feedback
