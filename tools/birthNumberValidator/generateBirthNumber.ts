const removeSpecialChars = (input: string): string => input.replace(/\//g, "")
const parseToNumberOrNaN = (input: string): number => Number(input) || NaN
const parseCharToNumber = (str: string, charPosition: number): number => Number(str.slice(charPosition))

export const isValidBirthNumber = (birthNumber: string): boolean => {

  if (!/^\d{9,10}$/.test(birthNumber)) {
    return false
  }

  const sanitizedNumber = removeSpecialChars(birthNumber)
  const firstNineChars = sanitizedNumber.substring(0, 9)
  const firstNineNumericChars = parseToNumberOrNaN(firstNineChars)

  if (isNaN(firstNineNumericChars)) {
    return false
  }

  const result = firstNineNumericChars % 11
  const numericLastChar = parseCharToNumber(sanitizedNumber, -1)

  return (result === 10 && numericLastChar === 0) || result === numericLastChar
}
export const parseBirthNumber = (birthNumber: string): {birthDate: Date, gender: String} | false => {
  const [yearPart, monthPart, dayPart] = [birthNumber.slice(0, 2), birthNumber.slice(2, 4), birthNumber.slice(4, 6)];
  let [year, month, day] = [parseInt(yearPart), parseInt(monthPart), parseInt(dayPart)];

  year += (year < 54) ? 2000 : 1900;
  const gender = month > 50 ? "female" : "male";
  month = month > 50 ? month - 50 : month;

  const birthDate = new Date(year, month - 1, day);
  if (birthDate.getFullYear() !== year || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day) {
    return false;
  }

  return { birthDate, gender };
}

