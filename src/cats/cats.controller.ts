import { Body, Controller, DefaultValuePipe, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
//import { JoiValidationPipe } from '../joi-validation.pipe';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  //throw new ForbiddenException();
  }
  
  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
  ) {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }
}
