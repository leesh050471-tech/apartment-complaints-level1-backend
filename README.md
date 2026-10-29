# 햇살마을 민원 기록장 · 백엔드 (Level 1)

아파트 관리사무소 민원을 기록하는 NestJS + PostgreSQL API입니다. 기획서는 `기획서.md`를 보세요.

> ⏳ 무료 서버(Render)라 **15분 동안 쓰지 않으면 잠들어, 첫 접속이 1분 가까이 걸릴 수 있습니다.** 고장이 아닙니다.

## 확인 주소
- `/health` : 서버와 DB 연결 상태
- `/buildings`, `/complaints`, `/complaints/:id`

## 설정값 (환경 변수)
| 이름 | 뜻 |
|---|---|
| `DATABASE_URL` | Render Postgres 주소 (Render 서버에는 Internal 주소) |
| `DB_SCHEMA` | 이 앱이 쓰는 DB 공간 이름 (`level1`) |
| `FRONTEND_URL` | 접속을 허용할 프론트엔드 주소 (쉼표로 여러 개 가능) |
| `PORT` | 포트 (Render가 자동 지정) |

## Render 설정
- Build Command: `npm install --include=dev && npm run build`
- Start Command: `npm run start`

## 로컬 실행
```bash
cp .env.example .env   # 값을 채운 뒤
npm install
npm run start:dev
```

## 배포 주소
- 백엔드(Render): https://apartment-complaints-level1-backend.onrender.com (`/health`로 DB 연결 확인)
- 화면(Vercel): https://apartment-complaints-level1-fronten-delta.vercel.app
- 프론트엔드 저장소: https://github.com/leesh050471-tech/apartment-complaints-level1-frontend
