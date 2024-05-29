---
layout: post
title: TDD, Junit, assertJ
description: TDD, Junit, assertJ, BDD
date: 2024-05-28 00:00:00 +0000
categories: Develop # Develop, Life, DevOps, Conference
comments: true
type: writing # done, writing, hide
---

TDD란 테스트 주도 개발(Test driven development)의 약자로 소프트웨어 개발 방법론중에 하나이다.
선 개발 후 테스트 방식이 아닌, 선 테스트 후 개발 방식의 프로그래밍 방법을 말한다.

TDD를 하면 코드의 변경이 더 편하다.
예를 들어 어떤 코드를 결과값은 변화가 없도록 수정하고 싶을 때, 테스트 코드가 결과값이 일치하는지 아닌지를 보장하여 주기때문에 오히려 코드 수정이 더 쉬워지는 것이다.
또한, 테스트코드 자체가 팀원들에게 어떤 코드인지를 공유하는 문서 자체가 될 수도 있다.

## Junit과 assertJ

테스트코드는 CI/CD를 통해 배포될 때, 테스트코드를 먼저 돌려봄으로서 코드에 이상유무를 파악하는 용도로도 쓰인다. 테스트를 통과하지 못한다면 배포가 멈추는 식으로 동작이 가능하다.

Java 진영에서는 Junit이라는 것과, Junit을 조금 더 메서드 체이닝 문법을 쓰기위해서 assertJ라는 것을 많이 사용한다.

![Alt text](/image/TDD1.png)  
위 이미지를 보면 객체들이 구현된 코드들이 있고, 그 각각의 객체에 대한 테스트를 각각 작성하는 구조를 알 수 있다.

![Alt text](/image/TDD2.png)
위 이미지는 단위테스트 단위의 테스트코드가 구현된 것이다. 테스트코드위에는 @Test라는 어노테이션을 붙여서 하나의 테스트 메서드라는 것을 가르킬 수 있다.  
@DisplayName("")은 테스트코드에 이름을 붙이는 것이다.  
junit 버전 5.0부터 나온 어노테이션이라 예전 코드에는 DisPlayName 어노테이션이 없을 수 있다.  
이 어노테이션이 없을때에는 함수명에 한글로 이름을 적기도 했다고 한다.

![Alt text](/image/TDD3.png)
위 이미지의 빨간박스와 같이 Gradle을 IntelliJ IDEA로 설정을 하면 테스트를 할 때 어떤 테스트메서드가 성공하고 실패했는지 나타나게 된다.

![Alt text](/image/TDD4.png)
이렇게 나타난다. Gradle로 설정을 왼쪽 윈도우에서 나타내어주고 있는 어떤 테스트메서드가 성공했는지 안나타난다...

## DisPlayName

도메인 정책, 용어를 사용한 명확한 문장 사용하기.

DisPlayName은 이름작명을 섬세하게 하는게 좋다.  
"음료 1개 추가 테스트"라고 짓는것보다는 "음료를 1개 추가하면 주문목록에 담긴다."라고 문장형태로 짓는것이 좋다.  
테스트 행위에 대한 결과까지 기술하는 것이 좋다!!!!! 테스트가 어떤 동작을 하는지 설명할 수 있는 문장형태로 짓도록 하자!!!  
"~~~하는 테스트"라고 짓는것을 지양한다.

또한, "특정 시간 이외에 음료를 주문하면 에러코드가 발생한다."라고 짓지말고,
"영업시간 이외에 음료를 주문을 할 수 없다"라고 도메인 용어를 사용하여 한층 추상화된 내용을 담아야한다.
개발자들이 읽기보다는 클라이언트의 입장에서 문장을 작성하도록 한다.  
메서드 자체의 관점보다는 도메인 정책 관점으로 작성하면 되는 것이다.

## BDD (Behavior Driven Development)

- TDD에서 파생된 개발 방법
- 함수 단위의 테스트에 집중하기보다, 시나리오에 기반한 테스트케이스(TC) 자체에 집중하여 테스트한다.
- 개발자가 아닌 사람이 봐도 이해할 수 있을 정도의 추상화 수준(레벨)을 권장
- 결국 TDD를 할떄 쓰는 개발방법의 일종이며, Given, when, then이라는 3단계의 개발 방식을 따른다.
- BDD에는 3가지 단계가 있으며, Given/When/Then으로 나눈다.
  - Given : 시나리오 진행에 필요한 모든 준비과정(객체, 값, 상태 등)
  - When : 시나리오 행동 진행
  - Then : 시나리오 진행에 대한 결과 명시, 검증
  - 어떤 환경에서(Given) 어떤 행동을 하였을 때(When) 어떤 상태변화가 일어난다(Then)
  - 이 Given/When/Then을 DisPlayName에 나타낼 수 있다.

## IntelliJ의 LiveTemplate 설정

![Alt text](/image/TDD5.png)
위 이미지와 같이 설정에서 LiveTemplate에 들어가서 (+)버튼을 눌러 Java카테고리 밑에 test라는 라이브템플릿을 만든후에 이미지와 같이 코드를 작성하면  
test라고 작성만 해도 BDD구조의 템플릿이 작성된다. 매우매우 편하다.

## 통합테스트

- 여러 모듈이 협력하는 기능을 통합적으로 검증하는 테스트
- 일반적으로 작은 단위의 단위 테스트만으로는 기능 전체의 신뢰성을 보장할 수 없다.
- 풍부한 단위 테스트 & 큰 기능 단위를 검증하는 통합 테스트

# SpringBoot 테스트

## Persistence Layer 테스트

- Persistence Layer의 특징
  - Data Access의 역할을 한다.
  - 비즈니스 로직이 포함되어있으면 안되며, Data에 대한 CRUD에만 집중한 레이어이다.

Persistence 계층에 있는 Repository를 테스트한 코드이다.  
![Alt text](/image/TDD6.png)
![Alt text](/image/TDD7.png)

위 사진처럼 SpringBoot의 코드를 테스트하는 경우에는 @DataJpaTest나 @SpringBootTest 어노테이션을 붙인다.
@DataJpaTest는 오직 JPA 컴포넌트들만을 테스트하기 위한 어노테이션으로 JPA테스트와 연관된 config만 적용하기 때문에 가볍고 빠르다.

@SpringBootTest는 스프링 컨테이너의 모든 Bean들을 등록한다. 즉, ApplicationContext에 모든 Bean들을 등록한다.
스프링 부트를 사용해서 테스트를 한다는 것으로 실제 애플리케이션 환경과 유사한 테스트 환경을 제공한다.

@SpringBootTest를 더 많이 사용한다고 한다.

## Business(Service) Layer 테스트

- Business Layer의 특징
  - 비즈니스 로직을 구현하는 역할
  - Persistence Layer와의 상호작용(Data를 읽고 쓰는 행위)을 통해 비즈니스 로직을 전개시킨다.
  - 트랜잭션을 보장해야 한다. (작업단위의 원자성을 보장해야한다.)
