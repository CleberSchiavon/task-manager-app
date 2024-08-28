import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  export function IsMatching(
    relatedPropertyName: string,
    validationOptions?: ValidationOptions,
  ) {
    return (object: Object, propertyName: string) => {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [relatedPropertyName],
        validator: MatchingPropertyConstraint,
      });
    };
  }
  
  @ValidatorConstraint({ name: 'MatchingProperty' })
  export class MatchingPropertyConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = (args.object as Record<string, any>)[relatedPropertyName];
      return value === relatedValue;
    }
  
    defaultMessage(args: ValidationArguments): string {
      const [relatedPropertyName] = args.constraints;
      return `${args.property} must match ${relatedPropertyName}`;
    }
  }