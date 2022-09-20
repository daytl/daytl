import { format } from 'date-fns'

export function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomIntFromInterval(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function testRc(strRc: string): boolean {
	const result =
		parseInt(strRc[0]) +
		parseInt(strRc[2]) +
		parseInt(strRc[4]) +
		parseInt(strRc[6]) +
		parseInt(strRc[8]) -
		(parseInt(strRc[1]) + parseInt(strRc[3]) + parseInt(strRc[5]) + parseInt(strRc[7]) + parseInt(strRc[9]));
	return result === 0 || result % 11 === 0;
}
export interface BirthNumbersData {
	birthNumbers: string[];
	settings: any;
}

export const generateBirthNumbers = (count, settings): BirthNumbersData => {
	const result = { birthNumbers: [], settings: null };
	for (let i = 0; i < count; i++) {
		const birthNumber = generateBirthNumber(settings);
		result.birthNumbers.push(birthNumber.birthNumber);
		if (!result.settings) {
			result.settings = birthNumber;
		}
	}
	return result;
}


interface GenerateBirthNumberData {
	isFemale: boolean;
	minAge: number;
	maxAge: number;
	birthDate: Date;
}

export interface BirthNumberData {
	birthNumber: string;
	birthDate: Date;
	isFemale: boolean;
}

const generateBirthNumber = (
	{
		isFemale = false, minAge = 19, maxAge = 50,
		birthDate = randomDate(new Date(2020 - maxAge, 0, 1), new Date(2020 - minAge, 0, 1))
	}: Partial<GenerateBirthNumberData> = {}
): BirthNumberData => {

	let birthNumberString = format(birthDate, 'yyMMdd') + `${randomIntFromInterval(1000, 9999)}`;
	if (isFemale) {
		const month = parseInt(birthNumberString.substr(2, 2));
		birthNumberString = birthNumberString.substr(0, 2) + (month + 50).toString() + birthNumberString.substr(4);
	}

	const firstPart = birthNumberString.substr(0, 6);
	let lastPart: number = parseInt(birthNumberString.substr(6, 4));

	while (!testRc(`${firstPart}${lastPart}`)) {
		lastPart++;
	}
	return { birthNumber: `${firstPart}${lastPart}`, birthDate, isFemale };
}


export default generateBirthNumber;