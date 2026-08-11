import { UserResponse } from "./user-response.types";

export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
}

export interface JwtPayload {
    sub: number;
    email?: string;
    role?: string;
    tokenVersion: number;
}