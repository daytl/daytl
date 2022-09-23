import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import TextField from "@material-ui/core/TextField"
import * as React from 'react';
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from "react"
import { BirthNumbersData, generateBirthNumbers } from "./generateBirthNumber"
import { FormattedDate, FormattedMessage } from "gatsby-plugin-intl"
import {
	FormControl,
	FormControlLabel,
	InputAdornment,
	Radio,
	RadioGroup,
	Theme,
	useMediaQuery
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CopyButton } from '../../src/components/tool/CopyButton';
import filesaver from 'file-saver';
import Grid from '@material-ui/core/Grid';
import { Save } from '@material-ui/icons';

interface StyleProps {
	mobile: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(() => {
	return {
		input: {
			fontSize: "2rem",
		},
		button: ({ mobile }) => (mobile ? {
			marginBottom: 5,
			width: '100%'
		} : {
			marginRight: 5,
		}),
		helperText: {
			marginLeft: 0,
		},
		radioGroup: {
			marginLeft: 10,
		},
		radio: {
			height: 30
		},
		save: {
			marginLeft: 10
		}
	}
})

export const BirthNumberTool = () => {
	const [count, setCount] = useState(1)
	const [birthNumber, setBirthNumber] = useState<string>()
	const [settings, setSettings] = useState<any>()
	const [birthDate, setBirthDate] = useState<Date>();
	const [isFemale, setIsFemale] = useState(false);

	useEffect(() => {
			const result: BirthNumbersData = generateBirthNumbers(count, settings)
			setBirthNumber(result.birthNumbers.join('\n'));
			setBirthDate(result.settings.birthDate);
			setIsFemale(result.settings.isFemale);
		}, [count, settings]
	)

	const handleBirthDateChange = useCallback((date) => {
		setSettings({ birthDate: date, isFemale });
	}, [isFemale]);

	const handleCountChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e: React.FormEvent<HTMLInputElement>) => {
		setCount(parseInt(e.currentTarget.value));
	}, []);

	const handleGenderChange = useCallback((event) => {
		setSettings({ birthDate, isFemale: event.target.value === 'female' });
	}, [birthDate]);

	const handleGenerateBirthNumber = useCallback((event) => {
		const { isfemale, minage, maxage } = event.currentTarget.dataset
		setSettings({ isFemale: isfemale, minAge: parseInt(minage), maxAge: parseInt(maxage) })
	}, [])

	const handleDownload = useCallback((event) => {
		filesaver.saveAs(new Blob([birthNumber], { type: "text/plain;charset=utf-8" }), "birthnumbers.txt");
	}, [birthNumber])

	const matchesMobile = !useMediaQuery('(min-width:600px)')
	const classes = useStyles({ mobile: matchesMobile });

	return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<TextField
			value={birthNumber}
			InputProps={{
				endAdornment:
					<InputAdornment position="end">
						<CopyButton text={birthNumber} />
					</InputAdornment>,
				className: classes.input,
			}}
			variant="outlined"
			multiline
			maxRows={3}
			onFocus={(event)=> event.target.select()}
			className={classes.input}
			fullWidth
			FormHelperTextProps={{
				className: classes.helperText
			}}
			helperText={
				<>
					<FormattedMessage id="tools.birthnumber.birthDate" />:
					<strong><FormattedDate value={birthDate} /></strong>
				</>
			}
		/>
		<br />
		<br />
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Button color="primary" variant="contained"
						className={classes.button}
						onClick={handleGenerateBirthNumber}
						data-minage="0"
						data-maxage="17"
				>
					<FormattedMessage id="tools.birthnumber.button.men.child" />
				</Button>
				<Button color="primary" variant="contained" className={classes.button}
						onClick={handleGenerateBirthNumber}
						data-minage="18"
						data-maxage="60"
				>
					<FormattedMessage id="tools.birthnumber.button.men.adult" />
				</Button>
				<Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
						onClick={handleGenerateBirthNumber}
						data-minage="0"
						data-maxage="17"
				>
					<FormattedMessage id="tools.birthnumber.button.women.child" />
				</Button>
				<Button color="primary" variant="contained" className={classes.button} data-isfemale="true"
						data-minage="18"
						data-maxage="60"
						onClick={handleGenerateBirthNumber}>
					<FormattedMessage id="tools.birthnumber.button.women.adult" />
				</Button>
				{' '}
				<DatePicker
					label={<FormattedMessage id="tools.birthnumber.setupBirthDate" />}
					value={birthDate}
					size="small"
					format="yyyy/MM/dd"
					inputVariant="outlined"
					onChange={handleBirthDateChange}
				/>
				<FormControl className={classes.radioGroup}>
					<RadioGroup row aria-label="gender" value={isFemale ? 'female' : 'male'}
								onChange={handleGenderChange}>
						<FormControlLabel value="female" control={<Radio />}
										  label={<FormattedMessage id="tools.birthnumber.female" />}
										  className={classes.radio} />
						<FormControlLabel value="male" control={<Radio />}
										  label={<FormattedMessage id="tools.birthnumber.male" />}
										  className={classes.radio} />
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<TextField
					variant="outlined"
					label={<FormattedMessage id="tools.birthnumber.count" />}
					onChange={handleCountChange}
					value={count}
					size="small"
				/>
				<Button
					variant="contained"
					className={classes.save}
					onClick={handleDownload}
					startIcon={<Save />}
				>
					<FormattedMessage id="tools.birthnumber.download" />
				</Button>
			</Grid>
		</Grid>
	</MuiPickersUtilsProvider>)
}
