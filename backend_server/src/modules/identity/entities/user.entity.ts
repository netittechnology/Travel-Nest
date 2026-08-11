import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
};

@Entity('users')
@Index('IDX_user_role', ['role'])
@Index('IDX_user_is_active', ['is_active'])
@Index('IDX_user_created_at', ['created_at'])
@Index('IDX_user_role_is_active', ['role', 'is_active'])
@Index('IDX_user_role_created_at', ['role', 'created_at'])
@Index('IDX_user_created_at_is_active', ['created_at', 'is_active'])
@Index('IDX_user_role_is_active_created_at', ['role', 'is_active', 'created_at'])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Index({ unique: true, where: "google_id IS NOT NULL" })
    google_id!: string | null;

    @Column({ type: 'boolean', default: false })
    must_change_password!: boolean;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @Column({ type: 'int', default: 0 })
    token_version!: number;

    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    temp_token!: string | null;

    @Column({ type: 'datetime', nullable: true })
    temp_token_expires!: Date | null;

    // Relations
    @OneToMany(() => Files, (file) => file.uploader)
    files!: Files[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}