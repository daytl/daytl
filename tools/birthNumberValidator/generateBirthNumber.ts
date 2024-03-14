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
export const parseBirthNumber = (birthNumber: string): {birthDate: Date, gender: String}  => {
  let year = parseInt(birthNumber.substring(0, 2), 10)
  let month = parseInt(birthNumber.substring(2, 4), 10)
  let day = parseInt(birthNumber.substring(4, 6), 10)

  year += (year < 54) ? 2000 : 1900
  let gender = "male"
  if (month > 50) {
    gender = "female"
    month -= 50
  }

  let birthDate = new Date(year, month - 1, day)
  if (birthDate.getFullYear() !== year || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day) {
    return false
  }

  return { birthDate, gender }
}

