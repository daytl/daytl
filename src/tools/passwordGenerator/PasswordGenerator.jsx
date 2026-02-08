import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, InputAdornment, Slider } from "@mui/material";
import { generateMultiple } from "generate-password";
import { Controller, useForm } from "react-hook-form";
import filesaver from "file-saver";
import { MdRefresh as Refresh } from "react-icons/md";
import { MdSave as Save } from "react-icons/md";

import Grid from "@mui/material/Grid";

import FormattedMessage from "../../components/FormattedMessage";
import { CopyButton } from "../../components/tool/CopyButton";
import Head from "next/head";

const buttonSx = {
  marginRight: {
    xs: 0,
    sm: 0.625,
  },
  marginBottom: {
    xs: 0.625,
    sm: 0,
  },
  width: {
    xs: "100%",
    sm: "auto",
  },
};

const generatePass = ({
  length = 10,
  numbers = true,
  symbols = false,
  letters = true,
  count = 1,
} = {}) => {
  const finalLength = parseInt(length, 10);

  if (numbers || symbols || letters) {
    const passwords = generateMultiple(count, {
      length: finalLength > 4 ? finalLength : 4,
      numbers,
      symbols,
      lowercase: letters,
      uppercase: letters,
      strict: true,
      excludeSimilarCharacters: true,
    });

    return passwords.join("\n");
  }
  return "";
};

export const PasswordGenerator = () => {
  const { control, setValue, getValues, watch } = useForm({
    defaultValues: {
      length: 10,
      count: 1,
      letters: true,
      numbers: true,
      symbols: false,
      passwords: generatePass(),
    },
  });

  const watchPasswords = watch("passwords");
  const passwords = getValues("passwords");
  const [passwordStats, setPasswordStats] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const win = typeof window !== "undefined" ? window : {};
      setPasswordStats(win.zxcvbn ? win.zxcvbn(watchPasswords.split("\n")[0]) : {});
    }, 1000);
  }, [watchPasswords]);

  const handleGeneratePassword = useCallback(() => {
    setValue("passwords", generatePass(getValues()));
  }, [setValue, getValues]);

  const handleDownload = useCallback(() => {
    filesaver.saveAs(new Blob([passwords], { type: "text/plain;charset=utf-8" }), "passwords.txt");
  }, [passwords]);

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name !== "passwords") {
        setValue("passwords", generatePass(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <form>
      <Head>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"
          integrity="sha512-TZlMGFY9xKj38t/5m2FzJ+RM/aD5alMHDe26p0mYUMoCF5G7ibfHUQILq0qQPV3wlsnCwL+TPRNK4vIWGLOkUQ=="
          defer
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="passwords"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                multiline
                maxRows={3}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0,
                    marginBottom: 1.25,
                  },
                }}
                variant="outlined"
                onFocus={(event) => event.target.select()}
                helperText={
                  passwordStats.score ? (
                    <>
                      <FormattedMessage
                        namespace="tools"
                        tagName="strong"
                        id={`passwordgenerator.strength.s${passwordStats.score}`}
                      />
                      {" / "}
                      <FormattedMessage
                        namespace="tools"
                        id="passwordgenerator.crackTime"
                        values={{
                          time: passwordStats?.crack_times_display
                            ?.online_no_throttling_10_per_second,
                        }}
                      />
                    </>
                  ) : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyButton text={passwords} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid container>
            <Grid size={{ xs: 1 }}>
              <Controller
                name="length"
                control={control}
                rules={{
                  valueAsNumber: true,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    {...field}
                    label={<FormattedMessage namespace="tools" id="passwordgenerator.length" />}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 11 }}>
              <Slider
                defaultValue={10}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                sx={{ marginTop: 0.875 }}
                min={4}
                onChange={(_event, value) => {
                  setValue("length", value);
                }}
                max={100}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="letters"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={<FormattedMessage namespace="tools" id="passwordgenerator.letters" />}
                />
              );
            }}
          />
          <Controller
            name="numbers"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={<FormattedMessage namespace="tools" id="passwordgenerator.numbers" />}
              />
            )}
          />
          <Controller
            name="symbols"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={<FormattedMessage namespace="tools" id="passwordgenerator.symbols" />}
              />
            )}
          />
          <Controller
            name="count"
            control={control}
            rules={{
              // TODO numeric value
              valueAsNumber: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                label={<FormattedMessage namespace="tools" id="passwordgenerator.count" />}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={buttonSx}
            onClick={handleGeneratePassword}
            startIcon={<Refresh />}
          >
            <FormattedMessage namespace="tools" id="passwordgenerator.refresh" />
          </Button>
          <Button variant="contained" sx={buttonSx} onClick={handleDownload} startIcon={<Save />}>
            <FormattedMessage namespace="tools" id="passwordgenerator.download" />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
