<div align="center">
  <img width="250px;" src="/uploads/1104acdedd3c689307b2f8c84c93d81c/Sera_Logo2.png" />
  <br/><br/>
  <br/>코스메틱 추천 서비스 💄 


  <p align="center"><br/>
     <img src="https://img.shields.io/badge/PostCSS----green?logo=PostCSS">
     <img src="https://img.shields.io/badge/JavaScript-ES6+-green?logo=javascript">
     <img src="https://img.shields.io/badge/React.js-v17.0.1-green?logo=react">
     <img src="https://img.shields.io/badge/ReactRouter-v5-green?logo=react-router"><br/>
     <img src="https://img.shields.io/badge/python-v3.6-blue?logo=python">
     <img src="https://img.shields.io/badge/Java-v1.8-blue?logo=java">
     <img src="https://img.shields.io/badge/Spring Boot-v3.9.15-blue?logo=spring">
     <img src="https://img.shields.io/badge/AWS%20EC2----blue?logo=awsec2">
     <img src="https://img.shields.io/badge/AWS%20RDS----blue?logo=awsrds">
     <img src="https://img.shields.io/badge/MySQL-v8.0-blue?logo=mysql">
     <img src="https://img.shields.io/badge/Django-v3.1.7-blue?logo=django">
  </p>
</div>  

> 서비스명: Será       
> 팀명: 장코   
> 개발 기간: 2021.02.22 ~ 2021.04.09 (약 7주)        



### 📃문서  
> [기획 문서](https://www.notion.so/PJT-2a4c024fa30c4c919aee328b7e09e64c)   
> [1️⃣SubPJT_기획문서](https://www.notion.so/dovvn/Sub1-13498659a2844ee39995e24f63ee4558), [2️⃣SubPJT_학습 및 개발기본 문서](https://www.notion.so/Sub2-6c68ef0be53645c7bc32051b72655781), [3️⃣SubPJT3_심화 및 마무리 문서](https://www.notion.so/Sub3-9809c183f48346e4aa94df8c34cccb75)      

<br/>




## 📑 서비스개요      
* **사회현상**
  > 1. 코로나 현상으로 마스크가 불가피 해지면서 피부관리와 화장품 성분에 관심이 높아졌다.  
  >
  > 2. 자신의 피부타입을 알지 못하고 단순한 리뷰로만 구매하여 실패하는 사례가 많다.  
  >
  > 3. 자신의 퍼스널컬러를 잘 알지 못한다.      
  >
  > 4. 자기관리가 필수화 된 사회이다.     

위와 같은 사회현상으로 인해 고민이 들어난 남녀노소 모든 사용자를 대상으로 `피부타입`에 따른 설명, `좋은 성분과 피해야하는 성분`, 좋은 성분이 들어간 상품들을 `추천`받을 수 있다.   
더불어 `퍼스널컬러` 진단 후 뷰티팁, 어울리는 색상을 추천받고 다른 유저들이 올린 `리뷰`를 통해 신뢰도 높은 화장품 정보를 제공 받을 수 있다.   


<br/>


## 👨 팀원 역할

| 팀원   | 역할 | 비고                                          |
| ------ | ---- | --------------------------------------------- |
| 김지형 | 팀장 | 프론트엔드 개발, GIT마스터        |
| 백정현 | 팀원 | 백엔드 개발, QA(Jira관리), 로고 디자인        |
| 유진이 | 팀원 | 프론트엔드 테크리더, QA(Jira관리), UX/UI 디자인       |
| 정다운 | 팀원 | 풀스택 개발, UX/UI 디자인 |
| 정혜지 | 팀원 | 백엔드 테크리더, 테스트 시나리오 작성                   |


<br/>


## 📑 주요 기능  
* **회원가입/로그인 기능**  
  > a. 사용자 회원정보를 받아 핸드폰 인증 후 회원가입에 성공한다.  
  >
  > b. 이외 간편 SNS로그인(카카오톡)으로 별도 인증 없이 빠르게 로그인할 수 있다.  
  >
  > c. 가입 후 최초 로그인 시 피부진단 페이지로 이동한다.  
* **피부진단 테스트 기능**  
  > a. 바우만 피부타입 분석 프로세스 기반으로 20가지의 설문문항으로 구성된 테스트를 진행한다.
  >
  > b. 만약, 본인의 피부타입을 이미 알고 있는 경우 skip하여 피부타입을 직접 선택할 수 있다.
  >
  > c. 16가지로 분류된 본인의 피부타입을 기반으로 본인의 피부에 맞는/맞지 않는 성분들을 확인하고 제품을 추천받을 수 있다.  
* **퍼스널컬러 진단 기능**
  > a. 본인의 사진을 업로드하여 퍼스널컬러(4가지)를 진단받을 수 있다.
  >
  > b. 진단 결과 페이지에서는 본인 퍼스널컬러에 대한 설명과 뷰티팁, 어울리는 색상을 확인할 수 있다.
* **상품 기능**
  > a. 상품 페이지에서는 전체, 맞춤, 스킨케어, 메이크업, 향수, 남성 등 카테고리별로  필터링하여 화장품 리스트를 확인할 수 있다. 
  >
  > b. 본인의 피부타입이 진단된 후, "맞춤" 탭에서 맞는 제품 또는 안맞는 제품 리스트를 제공한다.  
  >
  > c. 상품 이미지에서는 본인의 피부타입에 따라 "잘 맞아요/보통이에요/맞지 않아요" 3가지로 색상과 문구가 구분되어 표시된다.
  >
  > d. 인기순, 가격 낮은 순, 가격 높은 순, 리뷰 개수 순으로 상품 리스트를 정렬 할 수 있다.  
  >
  > e. 상품 상세 페이지에서는 상품 상세 정보를 확인하고, 네이버 쇼핑검색으로 최저가를 확인할 수 있습니다.  
  >
  > f. 성분보기를 누르면 나의 피부타입과의 일치여부에 따라 3가지 등급(안전/보통/위험)으로 나누어 현재 상품의 전 성분을 확인할 수 있다.
  >
  > g. 관련 상품을 사용한 유튜버들의 영상을 최신순으로 감상할 수 있으며, 바로 재생이 가능하다. 
  >
  > h. 하단에는 사용자들이 직접 작성한 리뷰의 리스트, 평점, 리뷰 차트를 확인할 수 있고 작성/수정/삭제가 가능하다.  
  >
  > i. 작성한 리뷰의 포토리뷰만 모아서 확인할 수 있고,  작성한 사용자의 연령대와 피부타입도 알 수 있어 나와 비슷한 사람의 리뷰 정보를 얻을 수 있다.  
  >
  > j. 도움이 된 리뷰는 좋아요 할 수 있다.  
* **찜하기기능**
  > a. 상품 리스트, 상세, 검색결과 페이지에서 원하는 상품을 찜하기 할 수 있다.  
  >
  > b. 찜한 상품들은 "내 찜 목록"페이지에서 모아 확인할 수 있다.  
* **검색 기능**
  > a. 카테고리 별로 상품 이름을 검색가능하다.   
  > 
  > b. 검색 결과 페이지에서는 상품명/성분명으로 검색 결과를 확인할 수 있다.
* **마이페이지 기능**
  > a. 마이페이지에서 가입시 입력한 본인 정보를 수정할 수 있다.   
  >  
  > b. 진단받은 피부타입과 퍼스널컬러 유형을 직접 선택해서 수정할 수 있다.   
  >  
  > c. 피부타입탭에서 본인의 피부타임에 관한 설명을 확인할 수 있다.   
  >  
  > d. 퍼스널컬러 탭에서 본인의 퍼스털컬러에 대한 설명을 확인할 수 있다.   


<br/>



## 📑 Gantt Chart

```mermaid
gantt
    title Será 진행상황
    dateFormat  YYYY-MM-DD
    section 프로젝트 준비
    SubⅠ Jira,Git 생성  :done, 2021-03-08, 6h
    와이어프레임 : done, 2021-03-09, 6h
    사전학습   :done, 2021-03-05, 3d
    UI/UX   : done,   2021-03-10, 2d
    발표 PPT 제작: done, t8, 2021-03-16, 3d
    발표 준비 : done,t9, after t8, 1d
    Sub2 발표 : done, t10, 2021-03-19, 1d
    추가 UI/UX(메인,피부진단,퍼스널컬러): done, 2021-03-19, 5d
    테스트 시나리오 작성 : done, t14, 2021-03-25, 1d
    SUB3 중간 발표 PPT 제작 : done, t16, 2021-03-24, 2d
    SUB3 중간 발표 : done, t17, 2021-03-26, 1d
	UCC 기획 && 콘티 : done, 2021-04-05, 1d
	테스트 시나리오 : done, 2021-04-05, 1d
	프로젝트 점검 : done, 2021-04-06, 3d
	UCC 촬영 && 편집 : done, 2021-04-06, 3d
	와이어프레임 산출물 제작 :  done, t15, 2021-04-07, 1d
	PPT 제작 : done, 2021-04-06, 2d
	SUB3 최종 발표 준비 : done, 2021-04-07, 2d
	README 정리 : done, 2021-04-08, 1d
	SUB3 최종 발표 : done, 2021-04-09, 1d
	
    section Frontend
   	회원가입/로그인/비밀번호찾기 페이지 :  done, t1, 2021-03-14, 2d
   	마이페이지 :  done, t2, 2021-03-14, 2d
   	상품 리스트/디테일 페이지  : done, t3, 2021-03-22, 4d
    회원가입/로그인/비밀번호찾기 api 연동 : done, t4, after t1,2d
    공통 컴포넌트 UI : done, t7, 2021-03-16, 1d
    마이페이지 api 연동: done, t5, 2021-03-18, 1d
    Redux : done, t6, 2021-03-17, 1d
  	검색결과 페이지 : done, t11, 2021-03-18, 1d
  	찜 목록 페이지 : done, t12, 2021-03-18, 1d
  	메인화면: done, t13, 2021-03-25, 4d
	마이페이지 피부진단 UI : done, t17, 2021-03-24, 1d
	마이페이지 퍼스널컬러 UI : done, t18, 2021-03-24, 1d
	피부진단 & 퍼스널 컬러 리덕스 : done, 2021-03-25, 6h
	SNS 로그인 UI & api 연동 : done, 2021-03-25, 1d
	로그인 리덕스 연결 : done, t19, 2021-03-24, 1d
	피부 진단 수정 모달 : done, after t13, 1d
	퍼스널 컬러 수정 모달 : done, after t13, 1d
	피부 진단 페이지 (소개, 설문, skip, 도움말, 결과) : done, t20, 2021-03-31, 1d
	퍼스널 컬러 페이지 (진단, 결과) : done, t21, after t20, 1d
	검색 & 검색 결과페이지 api : active, 2021-04-03, 2d
	내가 찜한 목록 api : active, 2021-04-03, 2d
    
    section Backend
  	글로우픽 크롤링 : done, b_t1, 2021-03-15, 6d
  	DB설계, 테이블 구축 : done, b_t2, after 2021-03-12, 6h
    회원가입 SMS 인증 : done, b_t4, 2021-03-15, 1d
    로그인 JWT 토큰 인증, 세션설정 : done, b_t5, 2021-03-15, 1d
    비밀번호 SMS 인증 : done, b_t6, 2021-03-16, 1d
    회원정보 CRUD : done, b_t7, 2021-03-15, 1d
    Swagger : done, b_t8, after b_t6, 1d
    CF 추천 알고리즘 : done, b_t3, 2021-03-14, 11d
    상품 리스트 & 디테일 조회 api (Django): done, b_t11, 2021-03-30, 2d
    상품 검색 api (Django): done, b_t13, after b_t11, 1d
    리뷰 CRUD api (Spring) : done, 2021-03-29, 3d
    퍼스널 컬러 api (Django) : done, after b_t13, 1d
    피부 진단 결과 반영 (Spring) : done, 2021-03-26,1d
    AWS 배포: done, b_t13, 2021-04-05, 2d
    SNS 로그인 api : done, 2021-03-24, 1d
    유저 DB 이미지 컬럼 추가 : done, 2021-03-29,2d

```


<br/>



## ✔Branch 규칙  
```bash
develop/feature/기능명  
```



<br/>




## ✔Code Style
| FrontEnd   | BackEnd |
| ------ | ---- |
| 1. 폴더명: 첫글자 대문자<br/>→ ex) Feed/Add.vue <br/><br/>2. 파일명: 첫글자 대문자 <br/> → ex) Add.vue <br/><br/>3. 경로명: 소문자 → ex) /add | 1. 클래스명:  첫글자 대문자 + camel case <br/> ex) MainController.java <br/><br/> 2. 함수, 변수: 첫글자 소문자 + camel case <br/> ex) public void setUserName(); |
- if문
    - 한줄 일 때, Block 처리하기
    - else if / else /중괄호는 조건문 바로 옆에 붙이기

    ```java
    if(condition){
     statement;
    } else if(condition2){
     statement2;
    } else{
     statement3;
    }
    ```

- for
  
    - 단순 반복문은 iterator를 i,j,k,...,z순으로 명명하기
- 주석 상대방이 이해할 수 있도록 달기
    - /**/ 설명 여러줄 필요할 때 코드 위에 작성
    - // 간단한 주석 코드 옆에 작성


<br/>


<br/>




## ✔프로젝트 구조  
![20210408_163746](/uploads/fb3148ff252b8a9f16411466d76fcca8/20210408_163746.png)  

<br/>




## 💻 주요 기능 미리보기  
### 1. 메인 화면           
![녹화_2021_04_08_16_45_35_778](/uploads/9008c18417659568049f02abb44f7fa8/녹화_2021_04_08_16_45_35_778.gif)    
메인화면에서는 핵심 기능인 피부 진단, 맞춤 화장품 추천, 퍼스널컬러 진단 기능을 원페이지 스크롤로 구현하고 있습니다.  


### 2. 피부 진단  
![녹화_2021_04_08_16_47_25_826](/uploads/b4624639b5a3bbb1bbd62bce53cdc9b9/녹화_2021_04_08_16_47_25_826.gif)    
피부진단 페이지에서는 16문항의 설문테스트 후 본인의 피부타입 결과를 확인할 수 있습니다.  
만약, 설문을 하지 않고 스킵하여 본인의 피부타입을 바로 선택할 수도 있습니다.  
결고 페이지에서는 피부타입에 맞는 성분과 맞지 않는 성분이 소개되며, 피부타입에 맞는 성분으로 구성된 제품을 추천해줍니다.  


### 3. 퍼스널컬러 진단
![녹화_2021_04_08_16_47_45_199](/uploads/0822f525d5a1677a1a43566a8cada39f/녹화_2021_04_08_16_47_45_199.gif)  
본인의 사진을 업로드하여 퍼스널컬러를 확인하고 이와 관련된 뷰티팁, 컬러리스트를 추천받을 수 있습니다.  


### 4. 상품 기능
![녹화_2021_04_08_16_49_45_189](/uploads/9c76f092e2be94558b7133ae73afdd80/녹화_2021_04_08_16_49_45_189.gif)  
상품 페이지에서는 전체 상품 리스트를 확인할 수 있고, 카테고리에 따라 분류하여 볼 수 있습니다.  
상품마다 본인의 피부타입에 맞는지 문구와 색상으로 구분하여 표시되며, 인기순, 리뷰순으로 정렬하여 볼 수 있습니다.  
상품 상세 페이지에서는 상품에 대한 소개와 관련 유튜브 영상으로 이동이 가능하며, 사용자들이 작성한 리뷰를 제공합니다.  



<br/>



# 📑산출물  
> 1. ER 다이어그램     
> 2. 와이어프레임   


##  💄 ER 다이어그램   
![erd](/uploads/983b82e6ad67cc5ebfc7a58106039b72/erd.png)  


---


<br/>



### 💄 와이어프레임
![슬라이드0001](/uploads/d3dfff039f7ccd3ccd1bcf6cab46b75a/슬라이드0001.png)

![슬라이드0002](/uploads/e29f37c1737acdee2d4519f05bcfdde1/슬라이드0002.png)

![슬라이드0003](/uploads/0ed75017b66e19ec53d7df08fb44ecd7/슬라이드0003.png)

![슬라이드0004](/uploads/02b36011070b483c70b7b1f35fe886be/슬라이드0004.png)

![슬라이드0005](/uploads/f45e61902c6331239ecc6cd87e6e688f/슬라이드0005.png)

![슬라이드0006](/uploads/ebe8d6d010060d338da1fddbfafd440f/슬라이드0006.png)

![슬라이드0007](/uploads/5cc1cbe26a9d568d1b59eb09849de2ba/슬라이드0007.png)

![슬라이드0008](/uploads/311d4070e6a2ea8c8ef9c73fac04d7b3/슬라이드0008.png)

![슬라이드0009](/uploads/29dafacdda5c46f3a107dc33db199904/슬라이드0009.png)

![슬라이드0010](/uploads/f4054457c05f5ccb0226d9faad39acb1/슬라이드0010.png)

![슬라이드0011](/uploads/5149c6997213610750fbc33ee85c74ac/슬라이드0011.png)

![슬라이드0012](/uploads/54c0ffe3fc2a8cb4baa1ab56e1b90124/슬라이드0012.png)

![슬라이드0013](/uploads/0e9d3b383aaac01e29cbd23becdc77d3/슬라이드0013.png)

![슬라이드0014](/uploads/5f57333443801663883a5495d4506d4f/슬라이드0014.png)

![슬라이드0015](/uploads/1655d15006532f67a71b04548cf2430d/슬라이드0015.png)

![슬라이드0016](/uploads/fcc49547de6c69bcd257064e00bdacda/슬라이드0016.png)
