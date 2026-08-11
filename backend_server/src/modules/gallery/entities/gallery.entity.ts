import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

export enum GalleryCategories {
    WILDLIFE_PHOTOGRAPHY = 'WILDLIFE_PHOTOGRAPHY',
    BIRDWATCHING_EXPERIENCES = 'BIRDWATCHING_EXPERIENCES',
    WHALE_MARINE_LIFE = 'WHALE_MARINE_LIFE',
    DAY_EXCURSIONS = 'DAY_EXCURSIONS',
    CULTURAL_HERITAGE = 'CULTURAL_HERITAGE',
    ADVENTURE_EXPERIENCES = 'ADVENTURE_EXPERIENCES',
    WILDLIFE_NATURE = 'WILDLIFE_NATURE',
    COASTAL_BEACHES = 'COASTAL_BEACHES',
    HILL_COUNTRY_MOUNTAINS = 'HILL_COUNTRY_MOUNTAINS',
}

@Entity('galleries')
@Index(['category'])
@Index(['is_published'])
@Index(['category', 'is_published'])
export class Gallery {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    location!: string;

    @Column()
    category!: string;

    @ManyToOne(() => Files, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_id' })
    image!: Files;

    @RelationId((gallery: Gallery) => gallery.image)
    image_id!: string;

    @Column({ type: 'boolean', default: true })
    is_published!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}