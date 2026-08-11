import { Test, TestingModule } from '@nestjs/testing';
import { TailorMadeTourBookingService } from './tailor-made-tour-booking.service';

describe('TailorMadeTourBookingService', () => {
  let service: TailorMadeTourBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TailorMadeTourBookingService],
    }).compile();

    service = module.get<TailorMadeTourBookingService>(TailorMadeTourBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
