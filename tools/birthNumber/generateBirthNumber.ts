import { format } from 'date-fns'

export function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomIntFromInterval(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function testRc(strRc: string): boolean {
	return parseInt(strRc) % 11 == 0;
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
	let lastPart = randomIntFromInterval(0, 9999).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false});
	const firstPart = format(birthDate, 'yyMMdd');
	
	let birthNumber = firstPart + lastPart;
	if (isFemale) {
		const month = parseInt(birthNumber.substr(2, 2));
		birthNumber = birthNumber.substr(0, 2) + (month + 50).toString() + birthNumber.substr(4);
	}

	while (!testRc(birthNumber)) {
		lastPart = randomIntFromInterval(0, 9999).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false});
		birthNumber = firstPart + lastPart;
	}
	return { birthNumber, birthDate, isFemale };
}


export default generateBirthNumber;
