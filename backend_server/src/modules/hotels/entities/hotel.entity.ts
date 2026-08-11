import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

@Entity('hotels')
@Index(['is_available'])
export class Hotel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    short_description!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'varchar', length: 255 })
    category!: string;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude!: number;

    // Relations ----------------
    @OneToMany(() => Files, (file) => file.hotel, { 
        cascade: true, 
        eager: false 
    })
    images!: Files[]

    @Column({ type: "simple-array", nullable: true })
    highlight_keywords?: string[];

    @Column({ type: 'boolean', default: true })
    is_available!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}