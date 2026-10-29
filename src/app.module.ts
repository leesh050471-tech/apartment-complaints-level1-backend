import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './building.entity';
import { Complaint } from './complaint.entity';
import { AppController } from './app.controller';
import { ComplaintsService } from './complaints.service';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      schema: process.env.DB_SCHEMA || 'level1',
      entities: [Building, Complaint],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Building, Complaint]),
  ],
  controllers: [AppController],
  providers: [ComplaintsService, SeedService],
})
export class AppModule {}
