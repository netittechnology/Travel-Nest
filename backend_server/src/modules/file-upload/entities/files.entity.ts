import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../identity/entities/user.entity";
import { Hotel } from "../../hotels/entities/hotel.entity";

@Entity('files')
export class Files {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 500 })
    original_name!: string;

    @Column({ type: 'varchar', length: 100 })
    mime_type!: string;

    @Column({ type: 'int' })
    size!: number;

    @Column({ type: 'varchar', length: 1000 })
    url!: string;

    @Column({ type: 'varchar', length: 500, unique: true })
    public_id!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    // Relations ---------------
    @ManyToOne(() => UserEntity, (user) => user.files, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'uploader_id' })
    uploader!: UserEntity;

    @RelationId((file: Files) => file.uploader)
    uploader_id!: number;

    // Relations ---------------
    @ManyToOne(() => Hotel, (hotel) => hotel.images, {
        onDelete: 'CASCADE',
        nullable: true
    })
    @JoinColumn({ name: 'hotel_id' })
    hotel!: Hotel | null;

    @RelationId((file: Files) => file.hotel)
    hotel_id!: number | null;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}