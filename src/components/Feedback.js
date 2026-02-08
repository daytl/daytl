import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { MdClose as CloseIcon, MdSend as SendIcon } from "react-icons/md";
import DialogContent from "@mui/material/DialogContent";
import encode from "../utils/encode";
import { Controller, useForm } from "react-hook-form";
import { DialogActions, TextField } from "@mui/material";

import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormattedMessage from "./FormattedMessage";

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({});
  const [success, setSuccess] = useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setSuccess(false);
    setOpen(true);
  }, []);

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
        reset();
        setSuccess(true);
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Netlify form requires static HTML
        dangerouslySetInnerHTML={{
          __html:
            '<form name="contact" netlify netlify-honeypot="bot-field" hidden><input type="text" name="email" /><textarea name="message"></textarea></form>',
        }}
      />

      <Alert color="info" slotProps={{ message: { sx: { width: "100%" } } }}>
        <Grid container spacing={3}>
          <Grid size={"grow"}>
            <FormattedMessage id="feedback.text" />
          </Grid>
          <Grid size={"auto"}>
            <Button
              size="small"
              color="primary"
              onClick={handleOpen}
              variant="outlined"
              endIcon={<SendIcon />}
            >
              <FormattedMessage id="feedback.button" />
            </Button>
          </Grid>
        </Grid>
      </Alert>
      <Dialog open={open} onClose={handleClose} slotProps={{ paper: { sx: { minWidth: 400 } } }}>
        <DialogTitle>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {success ? (
          <DialogContent>
            <Alert color="success">
              <FormattedMessage id="feedback.success" />
            </Alert>
          </DialogContent>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} name="contact">
            <DialogContent>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: <FormattedMessage id="feedback.emailError" />,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={errors?.email}
                    helperText={errors?.email?.message}
                    label={<FormattedMessage id="feedback.email" />}
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
                    label={<FormattedMessage id="feedback.message" />}
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
                <FormattedMessage id="feedback.submit" />
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};

Feedback.propTypes = {};

Feedback.defaultProps = {};

export default Feedback;
