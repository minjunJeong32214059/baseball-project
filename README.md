# ⚾ 야구 직관 기록 노트 (Baseball Log Note)

프론트엔드(React)와 백엔드(Spring Boot)를 활용하여 개인의 야구 직관 기록을 관리하는 풀스택 웹 애플리케이션입니다.

---

## 🚀 프로젝트 개요
- **목적**: 직관한 야구 경기의 날짜, 장소, 팀 정보를 기록하고 관리함
- **핵심 가치**: 사용자별 보안이 적용된 데이터 관리 및 REST API 기반의 효율적인 통신

---

## 🛠 기술 스택 (Tech Stack)

### **Backend**
- **Framework**: Spring Boot 3.x
- **Language**: Java
- **Database**: MySQL (Docker 환경)
- **ORM**: Spring Data JPA
- **Security**: Spring Security (BCrypt Password Encoding)
- **IDE**: Eclipse

### **Frontend**
- **Library**: React
- **HTTP Client**: Axios (REST API 호출)
- **IDE**: VS Code / Eclipse

---

## ✨ 현재 구현된 주요 기능

### 1. 야구 경기 기록 CRUD
- 야구 직관 기록에 대한 **생성(Create)** 및 **전체 조회(Read)** 기능 구현
- 프론트엔드에서 입력한 데이터를 백엔드 API를 통해 DB에 영구 저장

### 2. 사용자 인증 및 보안 (진행 중)
- **회원가입 API**: 사용자의 정보를 받아 DB에 저장하는 REST API 구현
- **비밀번호 암호화**: `BCryptPasswordEncoder`를 사용하여 사용자 비밀번호를 해시화하여 안전하게 보관
- **Spring Security**: 기본적인 보안 설정을 통해 API 접근 제어 기틀 마련

### 3. 풀스택 시스템 아키텍처
- **REST API 설계**: 프론트엔드와 백엔드가 JSON 형식을 통해 데이터를 주고받는 구조 확립
- **Integrated Environment**: 백엔드와 프론트엔드 폴더를 하나의 저장소로 통합 관리

---

## 📂 폴더 구조 (Folder Structure)
- `baseball-api/`: Spring Boot 기반의 백엔드 서버 코드
- `baseball-frontend/`: React 기반의 프론트엔드 웹 코드

---

## 🏁 향후 진행 계획 (Roadmap)
- [ ] **JWT 인증 도입**: 로그인 성공 시 토큰을 발행하여 보안 강화
- [ ] **권한 필터 적용**: 인증된 사용자만 자신의 기록에 접근할 수 있도록 제어
- [ ] **통계 페이지**: 저장된 데이터를 바탕으로 팀별 승률 등 통계 시각화
