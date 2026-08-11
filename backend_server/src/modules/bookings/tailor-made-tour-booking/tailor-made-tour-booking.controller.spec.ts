import { Test, TestingModule } from '@nestjs/testing';
import { TailorMadeTourBookingController } from './tailor-made-tour-booking.controller';

describe('TailorMadeTourBookingController', () => {
  let controller: TailorMadeTourBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TailorMadeTourBookingController],
    }).compile();

    controller = module.get<TailorMadeTourBookingController>(TailorMadeTourBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
