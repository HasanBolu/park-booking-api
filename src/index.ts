require('dotenv').config();

import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import AuthenticateMiddleware from './middlewares/authentication.middleware';
import errorHandlerMiddleware from './middlewares/exception-handler.middleware';
import { BookingController } from './controllers/booking.controller';
import { ParkingSpotController } from './controllers/parking-spot.controller';
import config from './config/ormconfig';
import { DataSource } from 'typeorm';
import User from './models/orm/user.entity';
import { BookingService } from './services/booking.service';
import Booking from './models/orm/booking.entity';
import { ParkingSpotService } from './services/parking-spot.service';
import ParkingSpot from './models/orm/parking-spot.entity';
import bodyParser from 'body-parser';

const app = express();

const dataSource = new DataSource(config);
dataSource.initialize();
console.log('Connected to the database');



app.use(bodyParser.json())

// authentication middleware
const authenticateMiddleware = new AuthenticateMiddleware(dataSource.getRepository(User))
app.use(authenticateMiddleware.handle);

// registering services
container.register('BookingService', { useFactory: () => new BookingService(dataSource.getRepository(Booking)) });
container.register('ParkingSpotService', { useFactory: () => new ParkingSpotService(dataSource.getRepository(ParkingSpot)) });

// registering routes of the contollers
container.register('BookingController', { useFactory: () => new BookingController(container.resolve<BookingService>('BookingService')) });
container.register('ParkingSpotController', { useFactory: () => new ParkingSpotController(container.resolve<ParkingSpotService>('ParkingSpotService')) });

const bookingController = container.resolve<BookingController>('BookingController');
const parkingSpotController = container.resolve<ParkingSpotController>('ParkingSpotController');

app.use('/api/v1/bookings', bookingController.router);
app.use('/api/v1/parking-spots', parkingSpotController.router);

// global exception handling
app.use(errorHandlerMiddleware);

const port: number = parseInt(process.env.PORT ?? '3000');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

