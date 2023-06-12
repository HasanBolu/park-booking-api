import express, { NextFunction, Request, Response, Router } from 'express';
import { injectable } from 'tsyringe';
import { BookingService } from '../services/booking.service';
import { BookingDto } from '../models/dtos/booking.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { HttpException } from '../common/exceptions/http.exception';
import { HttpStatus } from '../common/enums/http-status.enum';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number,
        role: string,
      };
    }
  }
}

@injectable()
export class BookingController {
  public router: Router;

  constructor(private bookingService: BookingService) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getAllBookings);
    this.router.get('/:id', this.getBookingById);
    this.router.post('/', this.createBooking);
    this.router.put('/:id', this.updateBooking);
    this.router.delete('/:id', this.deleteBooking);
  }

  createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { startDate, endDate, parkingSpotId } = req.body as BookingDto;
      await this.bookingService.createBooking(req.user.id, { startDate, endDate, parkingSpotId });

      res.json({ message: 'Booking created successfully' });
    } catch (error) {
      next(error)
    }
  };

  getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = parseInt(req.params.id, 10);
      const hasAccess = await this.bookingService.hasUserAccess(bookingId, req.user.id, req.user.role)
      if(!hasAccess){
        throw new HttpException(HttpStatus.FORBIDDEN, 'User is not authorized read or change the booking');
      }

      const booking = await this.bookingService.getBookingById(bookingId);

      res.json(booking);
    } catch (error) {
      next(error)
    }
  };

  getAllBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);

      const userId: number | null = req.user.role === UserRole.STANDARD ? req.user.id : null;
      const bookings = await this.bookingService.getAllBookings(userId);

      res.json(bookings);
    } catch (error) {
      next(error)
    }
  };

  updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = parseInt(req.params.id, 10);
      const hasAccess = await this.bookingService.hasUserAccess(bookingId, req.user.id, req.user.role)
      if(!hasAccess){
        throw new HttpException(HttpStatus.FORBIDDEN, 'User is not authorized read or change the booking');
      }

      const { startDate, endDate, parkingSpotId } = req.body as BookingDto;
      await this.bookingService.updateBooking(bookingId, { startDate, endDate, parkingSpotId });

      res.json({ message: 'Booking updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  deleteBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookingId = parseInt(req.params.id, 10);
      const hasAccess = await this.bookingService.hasUserAccess(bookingId, req.user.id, req.user.role)
      if(!hasAccess){
        throw new HttpException(HttpStatus.FORBIDDEN, 'User is not authorized read or change the booking');
      }

      await this.bookingService.deleteBooking(bookingId);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}