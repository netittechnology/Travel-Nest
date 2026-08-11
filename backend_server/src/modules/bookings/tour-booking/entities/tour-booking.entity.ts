import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Tour } from "../../../tours/entities/tour.entity";

// booking-status.enum.ts
export enum BookingStatus {
    PENDING   = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    DECLINED  = 'DECLINED',
    COMPLETED = 'COMPLETED',
};

@Entity('bookings_tours')
@Index(['created_at'])
@Index(['is_agree'])
@Index(['tour'])
@Index(['created_at', 'is_agree'])
@Index(['created_at', 'tour'])
@Index(['tour', 'is_agree'])
@Index(['tour', 'is_agree', 'created_at'])
export class TourBooking {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    full_name!: string;

    @Column({ type: 'varchar', length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 50 })
    phone!: string;

    @Column({ type: 'date' })
    booking_date!: Date;

    @Column({ type: 'time' })
    booking_time!: string;

    @Column({ type: 'int' })
    adult_count!: number;

    @Column({ type: 'int', default: 0 })
    children_count!: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    pickup_location_latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    pickup_location_longitude!: number;

    @Column({ type: 'text' })
    message?: string;

    // Relation -----------------
    @ManyToOne(() => Tour, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tour_id' })
    tour!: Tour;

    @RelationId((booking: TourBooking) => booking.tour)
    tour_id!: number;

    @Column({ type: 'boolean' })
    is_agree!: boolean;

    @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
    status!: BookingStatus;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}