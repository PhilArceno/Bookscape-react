import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const username = yup.string().min(4).max(24).trim().required();
const email = yup.string().email().trim().required();
const phoneNumber = yup
  .string()
  .trim()
  .matches(phoneRegExp, 'Please use the correct format.')
  .required();
const password = yup.string().min(6).max(24).required();
const passwordConfirm = yup
  .string()
  .required()
  .oneOf([yup.ref('password')], 'Passwords do not match');
const ISBN = yup.string()
  .test('Is a number?', 'Must be a number', val => !isNaN(val))
  .test('Is 13 characters?', 'Must be exactly 13 numbers', val => val.length === 13)
  .required('ISBN is required');

export { email, password, passwordConfirm, phoneNumber, username, ISBN };
