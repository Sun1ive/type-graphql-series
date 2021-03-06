import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../entity/User';

@ValidatorConstraint({ async: true })
export class IsEmailInUseConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({
      where: {
        email
      }
    }).then(user => {
      if (user) {
        return false;
      }

      return true;
    });
  }
}

export function isEmailInUse(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailInUseConstraint
    });
  };
}
