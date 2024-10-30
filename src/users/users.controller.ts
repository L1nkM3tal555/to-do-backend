import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() userDto: UserDto) {
        const user: UserEntity = plainToInstance(UserEntity, userDto);
        return await this.userService.create(user);
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        return await this.userService.findOne(userId);
    }
}
