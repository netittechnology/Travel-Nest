import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        if (!value) return true;  // let @IsNotEmpty handle empty check
        return new Date(value) > new Date();
    }

    defaultMessage(): string {
        return '$property must be a future date';
    }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target:       object.constructor,
            propertyName,
            options:      validationOptions,
            constraints:  [],
            validator:    IsFutureDateConstraint,
        });
    };
}