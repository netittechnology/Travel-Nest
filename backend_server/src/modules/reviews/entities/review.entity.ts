import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
@Index(['is_approved'])
@Index(['created_at'])
@Index(['created_at', 'is_approved'])
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    author_email!: string;

    @Column({ type: 'varchar', length: 255 })
    author_name!: string;

    @Column({ type: 'varchar', length: 255 })
    author_country!: string;

    @Column({ type: 'text' })
    text!: string;

    @Column({ type: 'int' })
    rating!: number;

    @Column({ type: 'boolean', default: false })
    is_approved!: boolean;

    @CreateDateColumn()
    created_at!: Date;
    
    @UpdateDateColumn()
    updated_at!: Date;
}