import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class UserExistsPipe implements PipeTransform {
    constructor(
        private readonly userService: UsersService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.userService.findUserById(value);
    }
}