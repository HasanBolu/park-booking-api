import Booking from '../models/orm/booking.entity';
import { BookingDto } from '../models/dtos/booking.dto';
import { HttpException } from '../common/exceptions/http.exception';
import * as _ from 'underscore';
import { HttpStatus } from '../common/enums/http-status.enum';
import { Repository } from 'typeorm';
import { UserRole } from '../common/enums/user-role.enum';


export class BookingService {
  constructor(
    private readonly bookingRepository: Repository<Booking>,
  ) { }

  getExistingBookingForParkingSpot = async (parkingSpotId: number, startTime: Date, endTime: Date): Promise<Booking | null> => {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.startDate < :endTime', { endTime })
      .andWhere('booking.endDate > :startTime', { startTime })
      .andWhere('booking.parkingSpotId = :parkingSpotId', { parkingSpotId })
      .getOne();
  }

  isStartDateLessThanEndDate = (startDate: Date, endDate: Date): boolean => {
    return startDate < endDate;
  }

  hasUserAccess = async (bookingId: number, userId: number, role: string): Promise<boolean> => {
    let booking = await this.getBookingById(bookingId);
    if (!booking) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Booking could not be found');
    }

    if(booking.createdByUserId !== userId && role === UserRole.STANDARD){
      return false;
    }

    return true;
  } 

  createBooking = async (userId: number, createBookingDto: BookingDto): Promise<Booking> => {
    const startDate = new Date(createBookingDto.startDate);
    const endDate = new Date(createBookingDto.endDate);

    if (!this.isStartDateLessThanEndDate(startDate, endDate)) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'start date can not be greater than end date');
    }

    const existingBooking = await this.getExistingBookingForParkingSpot(createBookingDto.parkingSpotId, startDate, endDate)
    if (existingBooking != null) {
      throw new HttpException(HttpStatus.CONFLICT, 'Given time slot overlaps with an existing boooking for the parking spot');
    }

    return this.bookingRepository.save({ ...createBookingDto, createdByUserId: userId });
  }

  getBookingById = async (id: number): Promise<Booking | null> => {
    return await this.bookingRepository.findOneBy({ id });
  }

  getAllBookings = async (userId: number | null): Promise<Booking[]> => {
    if (userId) {
      return this.bookingRepository.findBy({ createdByUserId: userId });
    }

    return this.bookingRepository.find();
  }

  updateBooking = async (id: number, updateBookingDto: BookingDto): Promise<void> => {
    const startDate = new Date(updateBookingDto.startDate);
    const endDate = new Date(updateBookingDto.endDate);

    if (!this.isStartDateLessThanEndDate(startDate, endDate)) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'start date can not be greater than end date');
    }

    const existingBooking = await this.getExistingBookingForParkingSpot(updateBookingDto.parkingSpotId, startDate, endDate)
    if (existingBooking != null) {
      throw new HttpException(HttpStatus.CONFLICT, 'Given time slot overlaps with an existing boooking for the parking spot');
    }

    await this.bookingRepository.update({ id }, updateBookingDto)
  }

  deleteBooking = async (id: number): Promise<void> => {
    await this.bookingRepository.softDelete(id);
  }
}