import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../common/enums/http-status.enum';
import { Repository } from 'typeorm';
import User from '../models/orm/user.entity';

class AuthenticateMiddleware {
  constructor(
    private userRepository: Repository<User>
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const apiKey = req.headers['api-key'] as string;
      if (!apiKey) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Missing api key' });
      }

      const user = await this.userRepository.findOneBy({token: apiKey});
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid api key' });
      }

      req.user = { id: user.id, role: user.role };

      next();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
}

export default AuthenticateMiddleware;