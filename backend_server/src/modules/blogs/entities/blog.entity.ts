import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Files } from "../../file-upload/entities/files.entity";

@Entity('blogs')
@Index(['is_published'])
@Index(['created_at'])
@Index(['created_at', 'is_published'])
export class Blog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255 })
    slug!: string;

    @Column({ type: 'varchar', length: 500 })
    excerpt!: string;

    @Column({ type: 'text' })
    content!: string;

    // Relation -----------------
    @ManyToOne(() => Files, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_id' })
    image!: Files;

    @RelationId((blog: Blog) => blog.image)
    image_id!: string;

    @Column({ type: 'simple-array', nullable: true })
    tags?: string[];

    @Column({ type: 'varchar', length: 160, nullable: true })
    meta_description?: string;

    @Column({ type: 'simple-array', nullable: true })
    meta_keywords?: string[];

    @Column({ type: 'boolean', default: true })
    is_published!: boolean;

    @CreateDateColumn()
    created_at!: Date;
        
    @UpdateDateColumn()
    updated_at!: Date;
}