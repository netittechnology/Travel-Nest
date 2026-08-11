import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

@Entity('experiences')
@Index(['is_available'])
@Index(['created_at'])
@Index(['created_at', 'is_available'])
export class Experience {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 300 })
    category!: string;

    @Column({ type: 'varchar', length: 255 })
    duration!: string;

    @Column({ type: 'text' })
    content!: string;

    // Relation -------------------
    @ManyToOne(() => Files, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_id' })
    image!: Files;
    
    @RelationId((experience: Experience) => experience.image)
    image_id!: string;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude!: number;

    @Column({ type: 'boolean', default: true })
    is_available!: boolean;

    @CreateDateColumn()
    created_at!: Date;
    
    @UpdateDateColumn()
    updated_at!: Date;
}