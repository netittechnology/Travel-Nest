import { Test, TestingModule } from '@nestjs/testing';
import { TourBookingController } from './tour-booking.controller';

describe('TourBookingController', () => {
  let controller: TourBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourBookingController],
    }).compile();

    controller = module.get<TourBookingController>(TourBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
