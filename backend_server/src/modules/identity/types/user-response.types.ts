import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../entities/user.entity";

@Exclude()
export class UserResponse {
    @Expose() id!: number;
    @Expose() email!: string;
    @Expose() name!: string;
    @Expose() role!: UserRole;
    @Expose() is_active!: boolean;
    @Expose() created_at!: Date;
    @Expose() updated_at!: Date;

    google_id!: string | null;
    must_change_password!: boolean;
    token_version!: number;
    temp_token!: string | null;
    temp_token_expires!: Date | null;

    constructor(partial: Partial<UserResponse>) {
        Object.assign(this, partial);
    }
}