import birthNumber from './birthNumber';
import base64EncodeDecode from './base64-encode-decode';
import passwordGenerator from './passwordGenerator';
import birthNumberValidator from './birthNumberValidator';
import remover from './remover';
import jwtDecode from './jwt-decode';

const tools = [birthNumber, birthNumberValidator, remover, base64EncodeDecode, passwordGenerator, jwtDecode];

export default tools;