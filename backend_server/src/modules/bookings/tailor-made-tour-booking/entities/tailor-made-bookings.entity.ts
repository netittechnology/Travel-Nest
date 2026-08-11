import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Style {
    PRIVATE_GUIDED = 'PRIVATE_GUIDED',
    CHAUFFEUR_GUIDED = 'CHAUFFEUR_GUIDED',
    AREA_GUIDED = 'AREA_GUIDED',
    GROUP_TOUR = 'GROUP_TOUR',
    NO_GUIDE_HOTEL_TRANSFER = 'NO_GUIDE_HOTEL_TRANSFER',
    SELF_DRIVE_NO_GUIDE = 'SELF_DRIVE_NO_GUIDE',
}

export enum Type {
    SAFARI = 'SAFARI',
    BEACH_ESCAPE = 'BEACH_ESCAPE',
    CULTURAL_EXPLORATION = 'CULTURAL_EXPLORATION',
    ADVENTURE_HIKING = 'ADVENTURE_HIKING',
    WILDLIFE_PHOTOGRAPHY = 'WILDLIFE_PHOTOGRAPHY',
    CITY_DISCOVERY = 'CITY_DISCOVERY',
    WELLNESS_RETREAT = 'WELLNESS_RETREAT',
    LUXURY_LEISURE = 'LUXURY_LEISURE',

};

export enum Vehicle {
    ECONOMY_CAR = 'ECONOMY_CAR',
    STANDARD_CAR = 'STANDARD_CAR',
    PREMIUM_CAR = 'PREMIUM_CAR',
    MINIVAN_4PAX = 'MINIVAN_4PAX',
    MINIVAN_7PAX = 'MINIVAN_7PAX',
    LARGE_VAN_10PAX = 'LARGE_VAN_10PAX',
    SUV_4X4 = 'SUV_4X4',
    LUXURY_SUV = 'LUXURY_SUV',
    TUK_TUK = 'TUK_TUK', 
    COACH_BUS = 'COACH_BUS', 
    LUXURY_VAN = 'LUXURY_VAN',
    SELF_DRIVE_CAR = 'SELF_DRIVE_CAR', 
    NO_TRANSPORT_NEEDED = 'NO_TRANSPORT_NEEDED',
    OTHER = 'OTHER',
  }

export enum MediaType {
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
    INSTAGRAM = 'INSTAGRAM',
    FRIEND = 'FRIEND',
    SEARCH_ENGINE = 'SEARCH_ENGINE',
    ADVERTISEMENT = 'ADVERTISEMENT',
    BLOG = 'BLOG',
    OTHER = 'OTHER',
}

@Entity('bookings_tailor_made')
@Index(['travel_style'])
@Index(['experience_type'])
@Index(['vehicle_preference'])
@Index(['how_know_us'])
@Index(['is_agree'])
@Index(['is_read'])
@Index(['created_at'])
@Index(['created_at', 'is_agree'])
@Index(['created_at', 'is_read'])
@Index(['created_at', 'is_read', 'is_agree'])
export class TailorMadeBooking {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    full_name!: string;

    @Column({ type: 'varchar', length: 255 })
    country!: string;

    @Column({ type: 'varchar', length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 50 })
    whatsapp_number!: string;

    // step 2
    @Column({ type: 'varchar', length: 255, nullable: true })
    pickup_location?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    drop_location?: string;

    @Column({ type: 'date', nullable: true })
    start_date?: Date;

    @Column({ type: 'date', nullable: true })
    end_date?: Date;

    @Column({ type: 'json', nullable: true })
    destination?: string[];

    // step 3
    @Column({ type: 'enum', enum: Style, nullable: true })
    travel_style?: Style;

    @Column({ type: 'enum', enum: Type, nullable: true })
    experience_type?: Type;

    @Column({ type: 'enum', enum: Vehicle, nullable: true })
    vehicle_preference?: Vehicle;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    budget_per_day?: number;

    // step 4
    @Column({ type: 'text', nullable: true })
    special_requests?: string;

    @Column({ type: 'enum', enum: MediaType, nullable: true })
    how_know_us?: MediaType;

    @Column({ type: 'boolean', default: false })
    is_agree?: boolean;

    @Column({ type: 'boolean', default: false })
    is_read?: boolean;

    @Column({ type: 'boolean', default: false })
    is_completed?: boolean;

    @Column({ type: 'int', default: 1 })
    create_step!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}