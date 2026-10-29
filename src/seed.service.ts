import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { Complaint } from './complaint.entity';

function daysAgo(n: number) {
  const d = new Date(Date.now() + 9 * 3600 * 1000);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Building) private buildings: Repository<Building>,
    @InjectRepository(Complaint) private complaints: Repository<Complaint>,
  ) {}

  async onApplicationBootstrap() {
    if ((await this.buildings.count()) > 0) return;
    const bs = await this.buildings.save(['101동', '102동', '103동', '104동', '105동'].map((name) => ({ name })));
    const b = (i: number) => bs[i].id;
    const rows: Partial<Complaint>[] = [
      { building_id: b(0), category: '승강기', title: '1호기 엘리베이터 멈춤', content: '출근 시간에 1호기가 5층에서 멈췄다가 다시 움직였습니다.', reporter_name: '김서연', phone: '010-1111-2201', received_date: daysAgo(1), status: '접수' },
      { building_id: b(0), category: '소음', title: '윗집 밤 늦은 소음', content: '밤 11시 이후 쿵쿵거리는 소리가 계속 납니다.', reporter_name: '박민준', phone: '010-1111-2202', received_date: daysAgo(3), status: '처리 중', memo: '해당 세대에 안내문 전달함' },
      { building_id: b(1), category: '누수', title: '욕실 천장 물 샘', content: '욕실 천장에서 물이 떨어집니다. 윗집 확인이 필요합니다.', reporter_name: '이도윤', phone: '010-1111-2203', received_date: daysAgo(2), status: '처리 중', memo: '배관 업체 방문 예정' },
      { building_id: b(1), category: '주차', title: '지정 주차 자리에 외부 차량', content: '제 주차 자리에 모르는 차가 3일째 서 있습니다.', reporter_name: '최하은', phone: '010-1111-2204', received_date: daysAgo(5), status: '완료', memo: '차주 연락해 이동 완료' },
      { building_id: b(2), category: '승강기', title: '정기 점검 일정 문의', content: '이번 달 승강기 정기 점검이 언제인지 알고 싶습니다.', reporter_name: '정유진', phone: '010-1111-2205', received_date: daysAgo(4), status: '완료', memo: '게시판 공지로 안내' },
      { building_id: b(2), category: '기타', title: '복도 전등 깜빡임', content: '7층 복도 전등이 계속 깜빡입니다.', reporter_name: '강지후', phone: '010-1111-2206', received_date: daysAgo(1), status: '접수' },
      { building_id: b(3), category: '소음', title: '공사 소음', content: '평일 낮에 아랫집 공사 소음이 너무 큽니다.', reporter_name: '윤서아', phone: '010-1111-2207', received_date: daysAgo(6), status: '완료', memo: '공사 시간 안내 후 개선됨' },
      { building_id: b(3), category: '누수', title: '지하주차장 천장 누수', content: '비 온 뒤 지하 1층 B구역 천장에서 물이 떨어집니다.', reporter_name: '임준서', phone: '010-1111-2208', received_date: daysAgo(2), status: '접수' },
      { building_id: b(4), category: '주차', title: '장애인 주차구역 불법 주차', content: '장애인 주차구역에 표지 없는 차량이 서 있습니다.', reporter_name: '한소율', phone: '010-1111-2209', received_date: daysAgo(0), status: '접수' },
      { building_id: b(4), category: '승강기', title: '엘리베이터 버튼 고장', content: '3호기 12층 버튼이 눌리지 않습니다.', reporter_name: '오지안', phone: '010-1111-2210', received_date: daysAgo(7), status: '처리 중', memo: '부품 주문함' },
      { building_id: b(0), category: '기타', title: '분리수거장 청소 요청', content: '분리수거장 악취가 심합니다. 청소를 부탁드립니다.', reporter_name: '서하준', phone: '010-1111-2211', received_date: daysAgo(3), status: '완료', memo: '청소 완료' },
      { building_id: b(2), category: '소음', title: '층간 소음 상담', content: '아이 뛰는 소리 문제로 중재를 요청합니다.', reporter_name: '문채원', phone: '010-1111-2212', received_date: daysAgo(0), status: '접수' },
    ];
    await this.complaints.save(rows.map((r) => this.complaints.create(r)));
  }
}
