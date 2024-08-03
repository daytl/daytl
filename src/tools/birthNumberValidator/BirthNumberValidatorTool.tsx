import TextField from "@mui/material/TextField"
import * as React from "react"
import {useState} from "react"
import {isValidBirthNumber, parseBirthNumber} from "./generateBirthNumber"
import {Chip, InputAdornment} from "@mui/material"
import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3"
import {useI18n} from "@/utils/useI18n";
import FormattedMessage from "@/components/FormattedMessage";
import FormattedDate from "@/components/FormattedDate";

const buttonSx = {
    marginRight: {
        xs: 0,
        sm: "5px",
    },
    marginBottom: {
        xs: "5px",
        sm: 0,
    },
    width: {
        xs: "100%",
        sm: "auto",
    },
}

export const BirthNumberValidatorTool = () => {
    const {t} = useI18n({namespace: 'tools'});
    const [birthNumber, setBirthNumber] = useState<string>()
    const [birthNumberValid, setBirthNumberValid] = useState<boolean>()
    const [birthDate, setBirthDate] = useState<Date>()
    const [gender, setGender] = useState<String>()

    return (<LocalizationProvider dateAdapter={AdapterDateFns}>
        <TextField
            value={birthNumber}
            InputProps={{
                endAdornment:
                    birthNumber ? <InputAdornment position="end">
                        {birthNumberValid ?
                            <Chip color="success"
                                  label={<FormattedMessage id="birthnumbervalidator.valid" namespace="tools"/>}/>
                            : <Chip color="error"
                                    label={<FormattedMessage id="birthnumbervalidator.invalid" namespace="tools"/>}/>}
                    </InputAdornment> : null,
            }}
            sx={
                {
                    "textarea": {
                        fontSize: "2rem",
                        paddingTop: "10px",
                    },
                }
            }
            variant="outlined"
            onChange={(event) => {
                setBirthNumber(event.target.value)
                const valid = isValidBirthNumber(event.target.value)
                setBirthNumberValid(valid)
                if (valid) {
                    const result = parseBirthNumber(event.target.value)
                    setBirthDate(result.birthDate)
                    setGender(result.gender)
                } else {
                    setBirthDate(undefined)
                }
            }}
            multiline
            maxRows={3}
            placeholder={t("birthnumbervalidator.placeholder")}
            onFocus={(event) => event.target.select()}
            fullWidth
            FormHelperTextProps={{
                sx: {
                    marginLeft: 0,
                },
            }}
            helperText={
                birthDate ? <>
                    <FormattedMessage  namespace="tools" id="birthnumbervalidator.birthDate"/>:
                    <strong><FormattedDate value={birthDate}/></strong>
                    {" / "}
                    <FormattedMessage namespace="tools" id={`birthnumbervalidator.${gender}`}/>
                </> : null
            }
        />
        <br/>
        <br/>
    </LocalizationProvider>)
}