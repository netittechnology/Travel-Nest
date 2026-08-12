import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";
import { TourType } from '../enums/tour-type.enum';

@Entity('tours')
@Index(['is_available'])
@Index(['created_at'])
@Index(['created_at', 'is_available'])
export class Tour {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'varchar', length: 255 })
    location!: string;

    @Column({ type: 'text' })
    description!: string;

    // Relation -----------------
    @ManyToOne(() => Files, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_id' })
    image!: Files;

    @RelationId((tour: Tour) => tour.image)
    image_id!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    duration?: string;

    @Column({ type: "simple-array", nullable: true })
    includes?: string[];

    @Column({ type: "simple-array", nullable: true })
    highlights?: string[];

    @Column({ type: 'json', nullable: true })
    itinerary_days?: {
        day: string;
        title: string;
        description: string;
        details: string;
        location: string;
    }[];

    @Column({
        type: 'enum',
        enum: TourType,
        default: TourType.DAY_TOUR,
    })
    tour_type!: TourType;
    
    @Column({ type: 'boolean', default: true })
    is_available?: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}