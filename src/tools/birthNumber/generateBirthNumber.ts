import { format } from "date-fns";

export function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function testRc(strRc: string, oldBirthNumber: boolean): boolean {
  return oldBirthNumber || parseInt(strRc, 10) % 11 === 0;
}

export interface BirthNumbersData {
  birthNumbers: string[];
  settings: BirthNumberData | null;
}

export const generateBirthNumbers = (
  count: number,
  settings: Partial<GenerateBirthNumberData>
): BirthNumbersData => {
  const result: { birthNumbers: string[]; settings: BirthNumberData | null } = {
    birthNumbers: [],
    settings: null,
  };
  let i = 0;
  while (result.birthNumbers.length < count && i < 500) {
    i++;
    const birthNumber = generateBirthNumber(settings);
    if (!result.birthNumbers.includes(birthNumber.birthNumber)) {
      result.birthNumbers.push(birthNumber.birthNumber);
      if (!result.settings) {
        result.settings = birthNumber;
      }
    }
  }
  return result;
};

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

const generateLastPart = (oldBirthNumber: boolean) => {
  return randomIntFromInterval(0, oldBirthNumber ? 999 : 9999).toLocaleString("en-US", {
    minimumIntegerDigits: oldBirthNumber ? 3 : 4,
    useGrouping: false,
  });
};

const generateBirthNumber = ({
  isFemale = false,
  minAge = 19,
  maxAge = 90,
  birthDate = randomDate(
    new Date(new Date().getFullYear() - maxAge, 0, 1),
    new Date(new Date().getFullYear() - minAge, 0, 1)
  ),
}: Partial<GenerateBirthNumberData> = {}): BirthNumberData => {
  const oldBirthNumber = birthDate.getFullYear() < 1954;
  let lastPart = generateLastPart(oldBirthNumber);
  let firstPart = format(birthDate, "yyMMdd");

  if (isFemale) {
    const month = parseInt(firstPart.substr(2, 2), 10);
    firstPart = firstPart.substr(0, 2) + (month + 50).toString() + firstPart.substr(4);
  }
  let birthNumber = firstPart + lastPart;

  while (!testRc(birthNumber, oldBirthNumber)) {
    lastPart = generateLastPart(oldBirthNumber);
    birthNumber = firstPart + lastPart;
  }
  return { birthNumber, birthDate, isFemale };
};

export default generateBirthNumber;
