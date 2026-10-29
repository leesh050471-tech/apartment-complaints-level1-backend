import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { Complaint } from './complaint.entity';
import { CreateComplaintDto, UpdateComplaintDto } from './dto';

function fail(field: string, msg: string): never {
  throw new BadRequestException({ message: '입력한 내용을 다시 확인해 주세요.', fields: { [field]: msg } });
}

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint) private repo: Repository<Complaint>,
    @InjectRepository(Building) private buildings: Repository<Building>,
  ) {}

  listBuildings() {
    return this.buildings.find({ order: { id: 'ASC' } });
  }

  list(buildingId?: number) {
    return this.repo.find({
      where: buildingId ? { building_id: buildingId } : {},
      relations: { building: true },
      order: { id: 'DESC' },
    });
  }

  async get(id: number) {
    const c = await this.repo.findOne({ where: { id }, relations: { building: true } });
    if (!c) throw new NotFoundException('해당 민원을 찾을 수 없습니다.');
    return c;
  }

  async create(dto: CreateComplaintDto) {
    const d = new Date(dto.received_date + 'T00:00:00Z');
    if (isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== dto.received_date) {
      fail('received_date', '존재하지 않는 날짜예요. 다시 확인해 주세요.');
    }
    // 한국 시간 기준 오늘
    const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
    if (dto.received_date > today) fail('received_date', '접수 날짜는 오늘보다 뒤일 수 없어요.');
    if (!(await this.buildings.findOne({ where: { id: dto.building_id } }))) {
      fail('building_id', '없는 동이에요. 목록에서 골라 주세요.');
    }
    const saved = await this.repo.save(this.repo.create(dto));
    return this.get(saved.id);
  }

  async update(id: number, dto: UpdateComplaintDto) {
    const c = await this.get(id);
    if (dto.status !== undefined) c.status = dto.status;
    if (dto.memo !== undefined) c.memo = dto.memo || null;
    await this.repo.save(c);
    return this.get(id);
  }
}
