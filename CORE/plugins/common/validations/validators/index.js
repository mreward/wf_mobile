export { default as alphaName } from './alphaName';
export { default as cardExpiryDateFormat } from './cardExpiryDateFormat';
export { default as isBankCard } from './isBankCard';
export { default as isBankAccount } from './isBankAccount';
export { default as isMobileNumber } from './isMobileNumber';
export { default as isTrue } from './isTrue';
export { default as maxValueFloat } from './maxValueFloat';
export { default as minValueFloat } from './minValueFloat';
export { default as regex } from './regex';
export { default as amount } from './amount';
export { default as validPassword } from './validPassword';
export { default as isASCII } from './isASCII';
export { default as containPrefix } from './containPrefix';
export { default as notSpecialCharacters } from './notSpecialCharacters';

/**
 * Re-export withParams modifier to avoid importing it separately.
 * withParams allows to extend any validator with custom parameters
 * We use it to add custom messages for used validators
 * Later we look if those are provided inside validation-error component
 */
export { withParams } from 'vuelidate';
export { required, requiredIf, minLength, maxLength, numeric, email, maxValue, minValue, helpers, sameAs, not, requiredUnless } from 'vuelidate/lib/validators';
