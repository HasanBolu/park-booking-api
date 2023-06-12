import ParkingSpot from '../models/orm/parking-spot.entity';
import { ParkingSpotDto } from '../models/dtos/parking-spot.dto';
import { HttpException } from '../common/exceptions/http.exception';
import { HttpStatus } from '../common/enums/http-status.enum';
import { Repository } from 'typeorm';

export class ParkingSpotService {
    constructor(private parkingSpotRepository: Repository<ParkingSpot>) { }

    async createParkingSpot(createParkingSpotDto: ParkingSpotDto): Promise<void> {
        const parkingSpot = new ParkingSpot();
        parkingSpot.name = createParkingSpotDto.name;

        this.parkingSpotRepository.save(parkingSpot);
    }

    async getAllParkingSpots(): Promise<ParkingSpot[]> {
        return this.parkingSpotRepository.find();
    }

    async updateParkingSpot(id: number, updateParkingSpotDto: ParkingSpotDto): Promise<void> {
        const parkingSpot = await this.parkingSpotRepository.findOneBy({id});

        if (!parkingSpot) {
            throw new HttpException(HttpStatus.NOT_FOUND, 'Parking spot could not be found');
        }

        this.parkingSpotRepository.update({ id }, { updatedAt: new Date(), name: updateParkingSpotDto.name });
    }

    async deleteParkingSpot(id: number): Promise<void> {
        this.parkingSpotRepository.softDelete(id);
    }
}