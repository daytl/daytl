import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import * as React from 'react';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { BirthNumbersData, generateBirthNumbers } from "./generateBirthNumber"
import { FormattedDate, FormattedMessage } from "gatsby-plugin-intl"
import { FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { CopyButton } from '../../src/components/tool/CopyButton';
import filesaver from 'file-saver';
import Grid from '@mui/material/Grid';
import { Save } from '@mui/icons-material';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const buttonSx = {
	marginRight: {
		xs: 0,
		sm: '5px'
	},
	marginBottom: {
		xs: '5px',
		sm: 0
	},
	width: {
		xs: '100%',
		sm: 'auto',
	}
};

export const BirthNumberTool = () => {
	const [count, setCount] = useState(1)
	const [birthNumber, setBirthNumber] = useState<string>()
	const [settings, setSettings] = useState<any>()
	const [birthDate, setBirthDate] = useState<Date>();
	const [isFemale, setIsFemale] = useState(false);

	useEffect(() => {
			if (count) {
				const result: BirthNumbersData = generateBirthNumbers(count, settings)
				setBirthNumber(result.birthNumbers.join('\n'));
				setBirthDate(result.settings.birthDate);
				setIsFemale(result.settings.isFemale);
			}
		}, [count, settings]
	)

	const handleBirthDateChange = useCallback((date) => {
		if (date instanceof Date && !isNaN(date)) {
			setSettings({ birthDate: date, isFemale });
		}
	}, [isFemale]);

	const handleCountChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e: React.FormEvent<HTMLInputElement>) => {
		const parsedValue = parseInt(e.currentTarget.value);
		if (!isNaN(parsedValue)) {
			setCount(parsedValue);
		} else {
			setCount('');
		}
	}, []);

	const handleGenderChange = useCallback((event) => {
		setSettings({ birthDate, isFemale: event.target.value === 'female' });
	}, [birthDate]);

	const handleGenerateBirthNumber = useCallback((event) => {
		const { isfemale, minage, maxage } = event.currentTarget.dataset
		setSettings({ isFemale: isfemale, minAge: parseInt(minage), maxAge: parseInt(maxage) })
	}, [])

	const handleDownload = useCallback(() => {
		filesaver.saveAs(new Blob([birthNumber], { type: "text/plain;charset=utf-8" }), "birthnumbers.txt");
	}, [birthNumber])

	return (<LocalizationProvider dateAdapter={AdapterDateFns}>
		<TextField
			value={birthNumber}
			InputProps={{
				endAdornment:
					<InputAdornment position="end">
						<CopyButton text={birthNumber} />
					</InputAdornment>,
			}}
			sx={
				{
					'textarea': {
						fontSize: '2rem',
						paddingTop: '10px',
						lineHeight: '2rem',
					}
				}
			}
			variant="outlined"
			multiline
			maxRows={3}
			onFocus={(event) => event.target.select()}
			fullWidth
			FormHelperTextProps={{
				sx: {
					marginLeft: 0,
				}
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
			<Grid item xs={12} sm={6}>
				<Button color="primary" variant="contained"
						sx={buttonSx}
						onClick={handleGenerateBirthNumber}
						data-minage="0"
						data-maxage="17"
				>
					<FormattedMessage id="tools.birthnumber.button.men.child" />
				</Button>
				<Button color="primary" variant="contained"
						sx={buttonSx}
						onClick={handleGenerateBirthNumber}
						data-minage="18"
						data-maxage="60"
				>
					<FormattedMessage id="tools.birthnumber.button.men.adult" />
				</Button>
				<Button color="primary" variant="contained"
						sx={buttonSx}
						data-isfemale="true"
						onClick={handleGenerateBirthNumber}
						data-minage="0"
						data-maxage="17"
				>
					<FormattedMessage id="tools.birthnumber.button.women.child" />
				</Button>
				<Button color="primary" variant="contained"
						sx={buttonSx}
						data-isfemale="true"
						data-minage="18"
						data-maxage="60"
						onClick={handleGenerateBirthNumber}>
					<FormattedMessage id="tools.birthnumber.button.women.adult" />
				</Button>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DatePicker
					label={<FormattedMessage id="tools.birthnumber.setupBirthDate" />}
					value={birthDate}
					inputFormat="yyyy/MM/dd"
					onChange={handleBirthDateChange}
					renderInput={(params) => <TextField {...params}
														size="small"
														sx={{ width: '160px' }}
														disabled
					/>}
				/>
				{' '}
				<FormControl sx={{
					marginLeft: 1,
				}}>
					<RadioGroup row aria-label="gender" value={isFemale ? 'female' : 'male'}
								onChange={handleGenderChange}>
						<FormControlLabel value="female" control={<Radio />}
										  label={<FormattedMessage id="tools.birthnumber.female" />}
										  sx={{
											  height: '30px'
										  }} />
						<FormControlLabel value="male" control={<Radio />}
										  label={<FormattedMessage id="tools.birthnumber.male" />}
										  sx={{
											  height: '30px'
										  }} />
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12} paddingBottom={2}>
				<TextField
					variant="outlined"
					label={<FormattedMessage id="tools.birthnumber.count" />}
					onChange={handleCountChange}
					inputProps={{
						type: 'number',
						max: 500,
						sx: {
							width: '50px'
						}
					}}
					value={count}
					size="small"
				/>{' '}
				<Button
					variant="contained"
					color="secondary"
					sx={{
						marginLeft: 1
					}}
					onClick={handleDownload}
					startIcon={<Save />}
				>
					<FormattedMessage id="tools.birthnumber.download" />
				</Button>
			</Grid>
		</Grid>
	</LocalizationProvider>)
}
