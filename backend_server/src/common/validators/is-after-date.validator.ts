import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsAfterDate(property: string, options?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isAfterDate',
            target: (object as any).constructor,
            propertyName,
            constraints: [property],
            options,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedProp] = args.constraints;
                    const relatedValue = (args.object as any)[relatedProp];
                    if (!value || !relatedValue) return true; // let other validators handle missing
                    return new Date(value) > new Date(relatedValue);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be after ${args.constraints[0]}`;
                },
            },
        });
    };
}