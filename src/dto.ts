import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORIES, STATUSES } from './complaint.entity';

export class CreateComplaintDto {
  @Type(() => Number)
  @IsInt({ message: '동을 선택해 주세요.' })
  building_id: number;

  @IsIn(CATEGORIES, { message: '민원 종류를 선택해 주세요.' })
  category: string;

  @IsString({ message: '제목을 입력해 주세요.' })
  @Length(2, 50, { message: '제목은 2자 이상 50자 이하로 써 주세요.' })
  title: string;

  @IsString({ message: '내용을 입력해 주세요.' })
  @Length(5, 500, { message: '내용은 5자 이상 500자 이하로 써 주세요.' })
  content: string;

  @IsString({ message: '접수자 이름을 입력해 주세요.' })
  @IsNotEmpty({ message: '접수자 이름을 입력해 주세요.' })
  @Length(2, 20, { message: '이름은 2자 이상 20자 이하로 써 주세요.' })
  reporter_name: string;

  @IsString({ message: '연락처를 입력해 주세요.' })
  @Matches(/^010-\d{4}-\d{4}$/, { message: '연락처는 010-1234-5678 모양으로 써 주세요.' })
  phone: string;

  @IsString({ message: '접수 날짜를 입력해 주세요.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: '접수 날짜는 2026-10-29 모양으로 써 주세요.' })
  received_date: string;
}

export class UpdateComplaintDto {
  @IsOptional()
  @IsIn(STATUSES, { message: '처리 상태는 접수, 처리 중, 완료 중에서 골라 주세요.' })
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500, { message: '처리 메모는 500자 이하로 써 주세요.' })
  memo?: string;
}
