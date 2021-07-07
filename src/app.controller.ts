import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(): Promise<User> {
    return this.appService.createUser('Zura', 'Papiashvili');
  }
  @Patch()
  updateUser(): Promise<User> {
    return this.appService.updateUser(1, 'Zura', 'Papiashvili');
  }
  @Delete()
  deleteUser(): Promise<User> {
    return this.appService.deleteUser(1);
  }
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.appService.getOneById(id);
  }
  @Get()
  getAllUser(): Promise<User[]> {
    return this.appService.getAll();
  }
}
