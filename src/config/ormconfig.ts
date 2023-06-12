import 'reflect-metadata';
import User from '../models/orm/user.entity';
import Booking from '../models/orm/booking.entity';
import ParkingSpot from '../models/orm/parking-spot.entity';


const config: any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Booking, ParkingSpot],
  timezone: 'UTC'
};

export default config;


