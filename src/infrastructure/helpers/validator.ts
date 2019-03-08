import { validate as validateTarget, ValidationError } from 'class-validator';

const formatErrorMessage = (error: ValidationError, constraintsKey: string) =>
  `[ValidationException] ${error.target.constructor.name}.${error.constraints[constraintsKey]}`;

const throwErrors = (error: ValidationError) => Object
  .keys(error.constraints)
  .forEach(key => {
    throw new Error(formatErrorMessage(error, key));
  });

export const validate = async <T>(target: T) => {
  const errors = await validateTarget(target);
  errors.forEach(throwErrors);
};