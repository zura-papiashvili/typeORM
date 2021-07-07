import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  getAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['pets'] });
  }
  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id, {
        relations: ['pets'],
      });
      return user;
    } catch (error) {
      return error;
    }
  }
  createUser(name: string, surname: string): Promise<User> {
    const newUser = this.userRepository.create({ name, surname });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, name: string, surname: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name;
    user.surname = surname;
    return this.userRepository.save(user);
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);
    return this.userRepository.remove(user);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
