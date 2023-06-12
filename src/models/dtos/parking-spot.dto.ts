import { IsNotEmpty } from 'class-validator';

export class ParkingSpotDto {
  @IsNotEmpty()
  name: string;
}