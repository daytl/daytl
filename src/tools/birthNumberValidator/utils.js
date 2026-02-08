export const verifyRC = (rc) => {
  const matches = rc.match(/^\s*(\d\d)(\d\d)(\d\d)[ /]*(\d\d\d)(\d?)\s*$/);
  if (!matches) {
    return false;
  }

  let [, year, month, day, ext, c] = matches;
  year = parseInt(year, 10);
  month = parseInt(month, 10);
  day = parseInt(day, 10);
  ext = parseInt(ext, 10);

  if (c === "") {
    year += year < 54 ? 1900 : 1800;
  } else {
    let mod = parseInt(year + month + day + ext, 10) % 11;
    if (mod === 10) mod = 0;
    if (mod !== parseInt(c, 10)) {
      return false;
    }

    year += year < 54 ? 2000 : 1900;
  }

  if (month > 70 && year > 2003) {
    month -= 70;
  } else if (month > 50) {
    month -= 50;
  } else if (month > 20 && year > 2003) {
    month -= 20;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return false;
  }

  return true;
};
