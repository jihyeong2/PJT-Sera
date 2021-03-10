# 💄SUBPJT 2 : 기본 추천 시스템 구현

> 주제: Será - 화장품 추천 서비스
> 팀명: 2조(B202) 

[SubPJT2 노션 문서](https://www.notion.so/_sub2-4acb788881b04c9e8f218912fda101c8)



##  팀원 역할

| 팀원   | 역할 | 비고                                          |
| ------ | ---- | --------------------------------------------- |
| 김지형 | 팀장 | 프론트엔드 개발, GIT마스터, 화면정의서        |
| 백정현 | 팀원 | 백엔드 개발, QA(Jira관리), 로고 디자인        |
| 유진이 | 팀원 | 풀스택 개발, QA(Jira관리), UX/UI 디자인       |
| 정다운 | 팀원 | 프론트엔드 테크리더, 화면정의서, UX/UI 디자인 |
| 정혜지 | 팀원 | 백엔드 테크리더, 화면정의서                   |



##  기술 스택

![HTML](https://img.shields.io/badge/HTML5----green?logo=HTML5)![CSS3](https://img.shields.io/badge/CCS3----green?logo=CSS3)![PostCSS](https://img.shields.io/badge/PostCSS----green?logo=PostCSS)![Javascript](https://img.shields.io/badge/JavaScript-ES6+-green?logo=javascript) ![React](https://img.shields.io/badge/React-v17.0.1-green?logo=react) ![React-Router](https://img.shields.io/badge/ReactRouter-v5-green?logo=react-router)

![Python](https://img.shields.io/badge/python-v3.6-blue?logo=python)![Java](https://img.shields.io/badge/Java-v1.8-blue?logo=java) ![Spring Boot](https://img.shields.io/badge/spring-v3.9.15-blue?logo=spring) ![AWS RDS](https://img.shields.io/badge/AWS%20RDS----blue?logo=amazonaws) ![MySQL](https://img.shields.io/badge/MySQL-v8.0-blue?logo=mysql)   



## Gantt Chart

```mermaid
gantt
    title Será 진행상황
    dateFormat  YYYY-MM-DD
    section 프로젝트 준비
    SubⅠ Jira,Git 생성  :done, 2021-03-08, 6h
    와이어프레임 : done, 2021-03-09, 6h
    사전학습   :done, 2021-03-05, 3d
    UI/UX   : active,   2021-03-10, 2d
    

    section Frontend
    회원가입/로그인 페이지  :   t1, 2021-03-11, 2d
    마이페이지  :    t2, 2021-03-11, 2d
    상품 리스트/디테일 페이지   :   t3, 2021-03-11,2d 
    피부진단(바우만) 페이지 : t4, after t1,2d
    퍼스널컬러 페이지 : t5, after t2, 2d
    메인페이지 : t6, after t3, 2d
    
    
    section Backend
    글로우픽/올리브영 크롤링  : active, b_t1, 2021-03-08, 3d
    DB설계, 테이블 구축 : b_t2, after b_t1, 1d
    회원가입 SMTP 메일 인증 : b_t4, after b_t2, 2d
    로그인 JWT 토큰 인증, 세션설정 : b_t5, after b_t2, 2d
    비밀번호 메일인증 : b_t6, after b_t5, 1d
    회원정보 CRUD : b_t7, after b_t4, 1d
    Swagger : b_t8, after b_t4, 1d
    마이페이지 : b_t12, after b_t7, 1d
    화장품 리스트/디테일 : b_t9, after b_t7, 1d
    리뷰 CRUD : b_t10, after b_t7, 1d
    검색 : b_t11, after b_t7, 1d
    CBF 추천 알고리즘 :    b_t3, after b_t1, 4d
```

## Branch 규칙



## Code Style



## 기능



## 산출물



### ERD



### 화면 정의서



### 와이어프레임



