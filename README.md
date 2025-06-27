# TimeForGreen Frontend

TimeForGreen은 친환경 생활을 위한 미션 기반 소셜 플랫폼입니다. 사용자들이 방을 만들고 참여하여 친환경 미션을 수행하고 공유할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **방 생성 및 참여**: 친환경 미션을 위한 방을 만들고 다른 사용자들과 함께 참여
- **미션 시스템**: 다양한 친환경 미션 수행 및 인증
- **사진 인증**: 미션 완료를 위한 사진 촬영 및 업로드
- **사용자 관리**: 회원가입, 로그인, 사용자 프로필 관리
- **실시간 검색**: 방 및 사용자 검색 기능

## 🛠 기술 스택

- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: JavaScript/TypeScript
- **Styling**: CSS Modules
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Package Manager**: pnpm

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── create/            # 방 생성 페이지
│   ├── login/             # 로그인 페이지
│   ├── mission/[id]/      # 미션 상세 페이지
│   ├── photo/[Id]/        # 사진 촬영 페이지
│   ├── room/[id]/         # 방 상세 페이지
│   ├── signup/            # 회원가입 페이지
│   ├── user/              # 사용자 프로필 페이지
│   └── page.jsx           # 메인 페이지 (방 목록)
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.jsx         # 헤더 컴포넌트
│   └── Room.jsx           # 방 카드 컴포넌트
└── lib/                   # 유틸리티 함수
    ├── get.js             # GET 요청 함수
    └── post.js            # POST 요청 함수
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm, yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd timeforgreen-fe
   ```

2. **의존성 설치**
   ```bash
   pnpm install
   # 또는
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   pnpm dev
   # 또는
   npm run dev
   ```

4. **브라우저에서 확인**
   - [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인하세요

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint
```

## 📱 주요 페이지

- **메인 페이지** (`/`): 사용자의 방 목록을 보여주는 대시보드
- **방 생성** (`/create`): 새로운 친환경 미션 방 생성
- **방 상세** (`/room/[id]`): 특정 방의 상세 정보 및 미션 목록
- **미션 상세** (`/mission/[id]`): 개별 미션의 상세 정보
- **사진 촬영** (`/photo/[Id]`): 미션 완료를 위한 사진 촬영
- **사용자 프로필** (`/user`): 사용자 정보 및 활동 내역
- **로그인/회원가입** (`/login`, `/signup`): 사용자 인증

## 🔧 개발 환경 설정

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### 코드 스타일

- ESLint를 사용한 코드 품질 관리
- Prettier를 통한 코드 포맷팅 (권장)
- TypeScript 지원 (선택적)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**TimeForGreen** - 친환경 생활을 위한 소셜 플랫폼 🌱
