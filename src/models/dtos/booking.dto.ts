import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class BookingDto {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsInt()
  parkingSpotId: number;
}