import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

@Entity('destinations')
export class Destination {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255 })
    subtitle!: string;

    // Relation ---------------
    @ManyToOne(() => Files, { nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: 'image_id' })
    image!: Files;

    @RelationId((destination: Destination) => destination.image)
    image_id!: string;

    @Column({ type: 'boolean', default: true })
    is_available?: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}