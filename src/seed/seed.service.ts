import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    try {
      const adminExists = await this.userRepository.findOne({
        where: { email: 'admin@quiz.com' },
      });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('Admin@123', 10);
        const adminUser = this.userRepository.create({
          email: 'admin@quiz.com',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true,
        });

        await this.userRepository.save(adminUser);
        this.logger.log('Admin user created successfully');
      } else {
        this.logger.log('Admin user already exists');
      }
    } catch (error) {
      this.logger.error('Error creating admin user:', error);
    }
  }
}
