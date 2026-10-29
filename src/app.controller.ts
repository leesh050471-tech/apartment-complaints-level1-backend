import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto, UpdateComplaintDto } from './dto';
import { CATEGORIES } from './complaint.entity';

@Controller()
export class AppController {
  constructor(private ds: DataSource, private svc: ComplaintsService) {}

  @Get('health')
  async health() {
    try {
      await this.ds.query('SELECT 1');
      return { status: 'ok', database: 'connected', time: new Date().toISOString() };
    } catch {
      throw new ServiceUnavailableException({ status: 'error', database: 'disconnected' });
    }
  }

  @Get('buildings')
  buildings() {
    return this.svc.listBuildings();
  }

  @Get('categories')
  categories() {
    return CATEGORIES;
  }

  @Get('complaints')
  list(@Query('building_id') buildingId?: string) {
    return this.svc.list(buildingId ? Number(buildingId) : undefined);
  }

  @Get('complaints/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.svc.get(id);
  }

  @Post('complaints')
  create(@Body() dto: CreateComplaintDto) {
    return this.svc.create(dto);
  }

  @Patch('complaints/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateComplaintDto) {
    return this.svc.update(id, dto);
  }
}
