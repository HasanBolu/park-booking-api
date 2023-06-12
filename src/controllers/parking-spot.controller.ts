import express, { NextFunction, Request, Response, Router } from 'express';
import { autoInjectable } from 'tsyringe';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ParkingSpotDto } from '../models/dtos/parking-spot.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { HttpStatus } from '../common/enums/http-status.enum';
import { HttpException } from '../common/exceptions/http.exception';

@autoInjectable()
export class ParkingSpotController {

  public router: Router;

  constructor(private parkingSpotService: ParkingSpotService) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getAllParkingSpots);
    this.router.post('/', this.createParkingSpot);
    this.router.put('/:id', this.updateParkingSpot);
    this.router.delete('/:id', this.deleteParkingSpot);
  }

  createParkingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if(req.user.role !== UserRole.ADMIN){
        throw new HttpException(HttpStatus.FORBIDDEN, 'Standard user is not authorized to create or update parking spot.'); 
      }
      
      const { name } = req.body as ParkingSpotDto;
      await this.parkingSpotService.createParkingSpot({ name });

      res.json({ message: 'Parking spot created successfully' });
    } catch (error) {
      next(error)
    }

  };

  getAllParkingSpots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parkingSpots = await this.parkingSpotService.getAllParkingSpots();
      res.json(parkingSpots);
    } catch (error) {
      next(error);
    }
  };

  updateParkingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if(req.user.role !== UserRole.ADMIN){
        throw new HttpException(HttpStatus.FORBIDDEN, 'Standard user is not authorized to create or update parking spot.'); 
      }

      const id = parseInt(req.params.id, 10);
      const { name } = req.body as ParkingSpotDto;

      await this.parkingSpotService.updateParkingSpot(id, { name });

      res.json({ message: 'Parking spot updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  deleteParkingSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if(req.user.role !== UserRole.ADMIN){
        throw new HttpException(HttpStatus.FORBIDDEN, 'Standard user is not authorized to create or update parking spot.'); 
      }

      const id = parseInt(req.params.id, 10);
      await this.parkingSpotService.deleteParkingSpot(id);
      res.json({ message: 'Parking spot deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}