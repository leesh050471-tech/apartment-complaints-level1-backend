import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from './building.entity';

export const CATEGORIES = ['승강기', '누수', '소음', '주차', '기타'];
export const STATUSES = ['접수', '처리 중', '완료'];

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building_id: number;

  @ManyToOne(() => Building, (b) => b.complaints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @Column()
  category: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  reporter_name: string;

  @Column()
  phone: string;

  @Column({ type: 'date' })
  received_date: string;

  @Column({ default: '접수' })
  status: string;

  @Column({ type: 'text', nullable: true })
  memo: string | null;

  @CreateDateColumn()
  created_at: Date;
}
