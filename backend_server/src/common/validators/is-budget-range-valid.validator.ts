import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isBudgetRangeValid', async: false })
export class IsBudgetRangeValidConstraint implements ValidatorConstraintInterface {
    validate(maximum_budget: number, args: ValidationArguments) {
        const object = args.object as any;
        const lowest_budget = object.lowest_budget;

        if (lowest_budget == null || maximum_budget == null) {
            return true;
        }

        return maximum_budget >= lowest_budget;
    }

    defaultMessage(args: ValidationArguments) {
        return 'maximum_budget cannot be less than lowest_budget';
    }
}

export function IsBudgetRangeValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsBudgetRangeValidConstraint,
        });
    };
}