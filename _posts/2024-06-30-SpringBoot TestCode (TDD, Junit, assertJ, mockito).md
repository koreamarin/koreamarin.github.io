---
layout: post
title: SpringBoot TestCode (TDD, Junit, assertJ, mockito)
description: SpringBoot TestCode작성에 대한 정리
date: 2024-06-30 00:00:00 +0000
categories: BackEnd # BackEnd, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

SpringBoot Test에 대한 설명들을 정리해놓았다.

참고할 레포지토리 : [https://github.com/koreamarin/PracticalTestCode](https://github.com/koreamarin/PracticalTestCode)  
아래 모든 설명에 대한 코드 예시는 위 레포지토리에 있습니다.

TDD란 테스트 주도 개발(Test driven development)의 약자로 소프트웨어 개발 방법론중에 하나이다.
선 개발 후 테스트 방식이 아닌, 선 테스트 후 개발 방식의 프로그래밍 방법을 말한다.

TDD를 왜 하는걸까? 그냥 눈으로 검토하면 되는데 라고 생각할 수 있지만, 프로젝트의 규모가 커질수록 테스트 코드의 중요성은 점점 상승한다.

단점부터 살펴보자면 귀찮다는 점이다. 실제 사용되는 프로덕션 코드도 아닌데, 테스트를 위한 여러 케이스들을 만들어 작성해야 한다.  
이번엔 장점을 보자면 테스트 코드를 작성해두면 리펙토링이 아주 편해진다.  
예를 들어 어떤 코드를 결과값은 변화가 없도록 하고, 코드의 내용은 개선하고 싶을 때, 테스트 코드를 작성해 두지 않았다면 코드 수정 후 일일히 직접 확인해야한다. 그런데 테스트 코드가 작성되어 있었다면 테스트 코드가 결과의 변경이 없음을 보장해주므로 코드 수정이 더 쉬워지는 것이다.

프로젝트가 더 커질수록, 결합도가 강할수록 테스트코드를 작성해 두었다면 훨씬 편해지게 된다.
또한, 테스트코드 자체가 팀원들에게 어떤 코드인지를 공유하는 문서 자체가 될 수도 있다. 테스트 코드 자체로 input값과 output을 알려주는 문서가 되기도 하며, 테스트 코드로 Spring Rest Docs라는 API문서를 만들 수도 있다.

## Junit과 assertJ

테스트코드는 CI/CD를 통해 배포될 때, 테스트코드를 먼저 돌려봄으로서 코드에 이상유무를 파악하는 용도로도 쓰인다. 테스트를 통과하지 못한다면 배포가 멈추는 식으로도 응용하여 동작이 가능하다.

Java 진영에서는 Junit이라는 것과, Junit을 메서드 체이닝 문법으로 사용하기 위해서 assertJ라는 것을 사용한다.

![Alt text](/image/TDD1.png)  
위 이미지를 보면 프러덕션 코드와, 그 각각의 프러덕션 코드에 대응하는 테스트 코드를 작성했음을 알 수 있다.

![Alt text](/image/TDD2.png)
위 이미지는 단위테스트 단위의 테스트코드가 구현된 것이다. 테스트코드위에는 @Test라는 어노테이션을 붙여서 하나의 테스트 메서드라는 것을 가르킬 수 있다.  
@DisplayName("")은 테스트코드에 이름을 붙이는 것이다.
junit 버전 5.0부터 나온 어노테이션이라 예전 코드에는 DisPlayName 어노테이션이 없을 수 있다.  
이 어노테이션이 없을때에는 함수명을 한글로 지었다고 한다.

![Alt text](/image/TDD3.png)
위 이미지의 빨간박스와 같이 Gradle을 IntelliJ IDEA로 설정을 하면 테스트를 할 때 어떤 테스트메서드가 성공하고 실패했는지 나타나게 된다.
위 작업은 실행의 주체를 IntelliJ IDEA에서 할 것인지, Gradle에서 할 것인지를 선택하는 것이다. Gradle에서 하면 실제 운영환경에서 러닝시키는 것과 동일하고, 추후 Jenkins에서 테스트코드를 러닝 시킬때에도 Gradle환경에서 러닝이 된다.
실행의 IntelliJ IDEA로 하게 되면, IntelliJ가 테스트 코드 수행에 관한 여러가지 지원을 해 준다. 예를 들어 어떤 테스트 클래스와 어떤 테스트 메서드가 성공했는지 실패했는지를 나타내어 준다.

![Alt text](/image/TDD4.png)
테스트 코드 실행 주체를 IntelliJ IDEA로 설정하면 이렇게 메서드별로 테스트의 성공여부를 나타내어준다. Gradle로 설정을 하면 테스트의 성공여부만을 나타내주어 테스트 실패시 어떤 테스트가 실패하였는지 구분이 되지 않는다.

## DisPlayName

도메인 정책, 용어를 사용한 명확한 문장 사용하라.

DisPlayName은 이름 작명을 섬세하게 하는게 좋다.  
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

<br><br><br>

# SpringBoot 테스트

## 클래스에 붙는 Test Annotation

### @WebMvcTest

Presentation Test에서는 @WebMvcTest를 사용한다. 로직(Service Layer)의 검증 없이 Controller만 테스트를 수행하기 위한 어노테이션이다.
Controller만 테스트를 수행하기 위해, Controller만 주입하고, Service와 리포지토리는 주입해주지 않는다.
Service는 주입해주지 않는 대신, Service 객체를 가짜로 있다고 가정해 주는 모의 객체인 Mock객체를 생성해야 한다.
또한, WebMvcTest는 controller테스트시에 필요한 MockMvc라는 객체를 주입해주기도 한다.
MockMvc는 Get, Post, put, delete 등의 요청을 만들어 보내어 controller를 테스트할 수 있는 수단이다.
Service에 대한 Mock객체을 만들어 Service는 정상적으로 동작한다고 가정하고, Controller만을 테스트하여 단위테스트를 수행한다.

### @SpringBootTest

Business Layer와 Persistence Layer에서는 @SpringBootTest를 사용한다.  
Persistence Layer에서 @DataJpaTest를 수행하지 않는 이유는, 테스트 클래스를 통합하여 테스트 환경을 통합함으로써 SpringBoot가 여러번 재실행되는 횟수를 줄일 수 있기 때문이다.  
@SpringBootTest는 스프링 컨테이너의 모든 Bean들을 등록한다. 즉, ApplicationContext에 모든 Bean들을 등록한다.
여기에서는 Service Layer + persistence Layer를 테스트하는 통합테스트의 목적으로 사용되었다.  
스프링 부트를 사용해서 테스트를 한다는 것으로 실제 애플리케이션 환경과 유사한 테스트 환경을 제공한다.  
DataJpaTest와 달리 RollBack이 자동으로 되지 않아서 @AfterEach를 통해 초기화 메서드를 만들면 매 테스트메서드 실행 후에 Repository를 초기화 해주어야 독립적으로 테스트 사용이 가능하다.

### @DataJpaTest

persistence Layer를 테스트하기 위한 어노테이션이다.
JPA관련된 객체만을 가져와 SpringBootTest보다 가볍고 빠르다.
@DataJpaTest는 오직 JPA 컴포넌트들만을 테스트하기 위한 어노테이션으로 JPA테스트와 연관된 Bean만 주입하기 때문에 가볍고 빠르다.
또한, 각 메서드마다 RollBack이 되어서 데이터가 뒤섞이지 않고 테스트 메서드가 독립적으로 작동한다.

## SpringBoot 테스트 종류

Presentation Test, Business Layer Test, Persistence Layer Test 총 3가지에 대한 설명이다.
<br>

### Persistence Layer Test

- Persistence Layer의 특징
  - Data Access의 역할을 한다.
  - 비즈니스 로직이 포함되어있으면 안되며, Data에 대한 CRUD에만 집중한 레이어이다.

Persistence 계층에 있는 Repository를 테스트한 코드이다.  
persistence Layer만을 테스트하기 때문에 단위테스트이다.  
![Alt text](/image/TDD6.png)
![Alt text](/image/TDD7.png)

위 사진처럼 SpringBoot의 코드를 테스트하는 경우에는 @DataJpaTest나 @SpringBootTest 어노테이션을 붙인다.
SpringBootTest를 사용하면 테스트 클래스 위에 @Transactional 어노테이션을 붙여야지 매 테스트 메서드마다 롤백되어 독립적인 테스트가 가능하다.
하지만 @Transactional은 test코드에 붙이는 것을 지양해야한다.  
@Transactional Service에 붙어있어야 하는데 service에 붙어있지않고,  
Test코드에 @Transactional가 붙어있으면, Service에서 @Transactional이 붙어서 작동하는 것처럼 보이기 떄문이다.

그리고, @DataJpaTest보다는 @SpringBootTest를 더 많이 사용한다.

### Business(Service) Layer 테스트

- Business Layer의 특징
  - 비즈니스 로직을 구현하는 역할
  - Persistence Layer와의 상호작용(Data를 읽고 쓰는 행위)을 통해 비즈니스 로직을 전개시킨다.
  - 트랜잭션을 보장해야 한다. (작업단위의 원자성을 보장해야한다.)

주로, SpringBootTest 어노테이션을 사용하며, Business Layer와 Persistence Layer를 통합하여 로직 자체가 잘 수행되는지를 테스트한다.

### Presentation Layer 테스트

- WebMvcTest 어노테이션을 사용한다.
- MockMvc라는 객체를 주입받아 controller테스트에 사용된다.
- Service객체는 Mock객체로 생성하여 service의 동작상태를 가정하고 controller만을 테스트한다.

### Mockito

Mockito는 Mock객체를 만들기 Java진영의 테스트 프레임워크로 Mockito를 통해 어떤 메서드나 클라이언트가 어떻게 동작할 것인지, 어떻게 결과를 줄 것인지를 지정할 수 있다. 가짜로 상황을 만들어 주는 것이며 이 과정을 stubbing이라고 한다.
Stub : 테스트에 필요한 호출에 대해 미리 준비된 답을 제공하는 객체. dummy 객체라고 보면된다.

#### Mock

- Presentation Layer만 테스트하고 싶은경우 Business Layer와 Persistance Layer를 같이 테스트해야한다.
- 결국 통합테스트가 되어버리는데 Presentation Layer만 단위 테스트하고 싶은 경우 Mocking이라는 것을 해야한다.
- Presentation Layer 뒷단에 있는 Layer들을 Mocking 처리하여 가짜 객체로 대신하여서 잘 동작한다고 가정을 하고 Presentation Layer만 테스트하는 것이다.

#### 어노테이션

@MockBean : mock객체를 생성한다. springTest에서 지원하는 어노테이션이다. 스프링 컨텍스트에 생성한다. 실제 객체의 bean이 아닌, MockBean을 등록하는 것이다. 관련된 객체와 연결하여 통합테스트를 수행할 때 사용된다.  
@Mock : mock객체를 생성한다. 단위테스트에서 사용된다.  
@InjectMocks : @Mock이 붙은 목객체를 @InjectMocks이 붙은 객체에 주입시킨다. @InjectMocks는 Service에, @Mock은 DAO에 많이 사용한다.

### Test Double의 5가지 종류

TestDouble 설명 : 테스트를 진행하기 어려운 경우 이를 대신해 테스트를 진행할 수 있도록 만들어주는 객체

- Dummy : 아무 것도 하지 않는 깡통 객체
- Fake : 단순한 형태로 동일한 기능은 수행하나, 프로덕션에서 쓰기에는 부족한 객체 (ex. FakeRepository)
- Stub : 테스트에서 요청한 것에 대해 미리 준비한 결과를 제공하는 객체. 그 외에는 응답하지 않는다. 상태 검증을 목적으로 함
- Spy : Stub이긴 stub인데 호출된 내용을 기록하여 보여줄 수 있는 객체. 일부는 실제 객체처럼 동작시키고 일부만 Stubbing할 수 있다.
- Mock : 행위에 대한 기대를 명세하고, 그에 따라 동작하도록 만들어진 객체. 행위 검증을 목적으로 함

##### Mock, Spy가 주로 쓰이며 많이 쓰인다. 아래는 활용 예시이다

1. 테스트해야할 메소드의 validation을 무시하도록 할 수 있다.
2. 외부 API와 연동할 필요 없이 테스트를 수행할 수 있다. 외부 API는 검증이 불가능할 뿐더러, 테스트 수행에 긴 시간이 필요하므로 Mocking처리를 많이한다.
3. DB에 데이터 입력 없이 테스트를 수행하도록 할 수 있다.
4. 불필요한 필드 데이터는 채우지 않고 테스트를 수행하도록 할 수 있다.

### BDDMockito

Mock객체에 대한 동작을 정의할 때 기존의 문법을 사용하면 when이라는 문법이 BDD의 given에 들어간다.  
이는 BDD에는 when절도 있는데, mock을 정의하는 문법 when이 given에 들어가 있는 이 자체가 혼란을 야기할 수 있으므로, BDDMockito라는 BDD문법에 맞는 mock객체 생성 문법이 새로 만들어진 것이다.  
BDDMockito는 기존의 Mockito를 상속받은 것이라서 차이가 거의 없으며 Mcok객체 생성 문법만 바뀐것이다.

```
// given
// when(mailSendClient.sendEmail(anyString(), anyString(), anyString(), anyString())).thenReturn(true);

// Mock객체를 정의하는 위 문법이 아래 문법으로 바뀜. given절인데 문법에 when이 들어가서 헷갈릴 수 있으므로 아래 문법으로 바뀐 것이다.
BDDMockito.given(mailSendClient.sendEmail(anyString(), anyString(), anyString(), anyString())).willReturn(true);
```

### Classicist VS Mockist

Mockist : 보장된것들은 빨리 쳐 내고 머킹처리해서 테스트할 부분만 빠르고 간단하게 테스트하자는 입장의 진영

Classicist : 실제 프러덕션 코드에서는 객체들이 협업하며 러닝되는데, 다 머킹처리해버리면 어떻게 보장할거냐. 머킹은 최소화하고 실제 객체로 최대한 통합테스트를 해야한다는 입장의 진영. 외부 시스템에 대해서는 보장이 안되어있기 때문에 외부시스템(외부 API등)에 대해서는 mocking처리를 하는 것이 좋다고 함.

나는? : 나는 classicist의 입장이다. 조금 비용을 더 들여서라도 통합테스트를 하면 완전히 보장이 될 뿐더러, Mocking자체에 대한 것도 사람이 만들어 진행하기 떄문에 실수가 있을 수 있다고 본다.
그래서 나는 비용이 더 들더라도 실제 객체의 입장에서 프러덕션을 더욱 깊히 보장하는 classicist의 입장을 가지고 있다.

### 테스트 코드 작성을 위한 조언

1. 하나의 테스트에는 하나의 주제만을 테스트하라.
2. 완벽한 제어를 하라. 예를 들어 LocalDateTime.now()같은 것은 테스트코드에 쓰는것을 지양한다. 테스트 결과가 그때그때 달라질수 있기 때문에, 고정된 날짜와 시간을 부여하여 테스트하도록 하자. 완벽하게 제어되는 코드를 써라
3. 테스트 환경의 독립성을 보장하자, 테스트 간 독립성을 보장하자. 공유 변수나 테스트끼리 연관되어지는 결합도 있는 테스트코드는 피하자.
4. if문, for문과 같은 읽는 사람의 생각을 요하는 로직들은 지양하도록 한다.
5. 테스트만를 위한 메서드는 만들어도 된다. 다만, 꼭 무엇을 위한 코드인지를 명확히하고, 많이 만들지 않도록 노력해야한다.
6. private 메서드는 테스트할 필요가 없다. 테스트해야한다는 욕망이 강하게 든다면 객체분리의 신호로 봐야한다.  
   -> private는 그 메서드를 사용하는 public메서드에서 같이 테스트가 수행되고 증명되므로 private 메서드는 테스트할 필요가 없다. 하지만, private를 테스트를 해야한다고 느낀다면, 그 메서드가 너무 규모가 커져서 따로 객체를 생성해야하는 것은 아닌지 생각해보자. 맞다면 private 메서드는 객체로 만들어서 그 객체에 대한 test코드를 작성한다. (private해야할 부분을은 private 처리하고 test하면됨)

### 테스트 환경 통합으로 테스트 러닝 속도 높이기

@ActiveProfiles("test")와 같은 어노테이션으로 test에 해당하는 환경으로 실행했었다.  
만약 이런 것들을 지정해주지 않아 환경이 다르다면 테스트마다 SpringBoot가 계속 재 실행될 것인데, 이러면 test의 러닝속도를 느리게 하는 요인이 된다.  
따라서 @ActiveProfiles("test")를 모두 지정해 두던가, 아니면 @ActiveProfiles("test")를 상속받는 IntegrationTestSupport와 같은 추상 클래스를 만들어 모든 테스트 클래스가 이 추상클래스를 상속받게 만들면 된다.  
Mocking이 걸려있거나 하는 등의 환경이 다르면 새로운 springBoot환경으로 테스트가 러닝된다. mock을 추상클래스 내부에 넣어서 통합을 해줘도 되고, 같은 mock을 쓰는 것끼리 새로운 추상클래스를 만들어도 된다.  
DataJpaTest도 새로운 환경에서 running이 될텐데, 굳이 DataJpaTest를 써야할 떄가 아니라면, 그냥 SpringBootTest에 통합하여 사용하면 여러번 SpringBoot가 실행되는 것을 줄일 수 있다.  
@WebMvcTest도 동일하게 통합할 수 있다.  
다만, Service와 Controller는 서로 통합하기가 좀 어렵다 그래서 @WebMvcTest와 @SpringBootTest는 통합하지 않고 따로 테스트한다.

## 그 외 배운것들

### Transactional에 대한 설명

@Transactional(readOnly = true) : 읽기 전용으로 한다.  
이 것을 하면 읽기전용으로 트랜잭션을 만들게 된다. 이로써 데이터를 조회하는 SELECT 쿼리(Read)만을 실행할 수 있고, CUD작업은 허용되지 않는다.  
이로써 JPA에서 성능 이점이 생기게 된다.  
JPA에서 CUD를 하도록 하면 스냅샷 저장과 변경감지등의 커밋을 하게되는데, readOnly = true를 하면 이런 롤백에 대한 커밋, save를 하지 않아 성능이 향상된다.

CQRS 패턴에서 사용한다.  
CQRS는 Command Query Responsibility Segregation의 약자로, 명령과 조회를 분리한다는 의미이다.  
CQRS 패턴은 명령을 처리하는 부분(Command)과 조회를 처리하는 부분(Query)을 분리함으로써 서비스의 성능을 향상시킬 수 있다.  
서비스를 할 때 Command보다 Query가 훨씬 많기 떄문에, Query를 더 빠르게 처리하기 위해 사용한다.

결론 : readOnly = true를 사용하면 쿼리용 서비스와 커맨드용 서비스를 분리할 수 있어 성능향상에 도움을 줄 수 있다.

ps1 : @Transactional의 Default값은 readOnly = false이다.

ps2 : 클래스에 @Transactional(readOnly = true)를 걸어버리면 클래스 내의 모든 메서드가 readOnly = true가 된다.
커맨드 작업이 필요한 메서드는 @Transactional을 붙여서 readOnly = false로 해줘야 한다.
이렇게 하면 일단 모든 메서드에서 ReadOnly가 적용되어 성능이 향상되고, 커맨드 작업이 필요한 메서드에서는 readOnly = false를 붙여
커맨드 작업을 함으로써, ReadOnly가 적용되지 않아 성능이 떨어지는 것을 방지할 수 있다.

ps3 : 메서드안에 네트워크를 타거나 하는 등의 러닝타임이 긴 메서드에는 @Transactional을 붙이지 않는 것이 좋다. 트랜잭션 잠금 기간이 증가할 수 있고, 데드락 가능성이 증가하며, 트랜잭션 타임아웃이 발생할수 있고, 리소스 소비의 증가의 요인이 될 수 있기 때문이다.

### Service Request Dto

controller에서 request를 Service reuqest에 바로 보내지 않고, service용 request dto를 따로 만들어 보내는 형식도 좋은 방식이다. service와 controller 간의 의존성을 낮추고 책임을 분리하는 방법이다.  
money라는 객체가 양수값을 갖는지를 검증할 때, controller에서 양수에 대한 beanValidation을 체크한다면 나중에 판매채널이 늘어났을 때 (키오스크, 포스기, 사이트 주문 등), 모든 채널에서는 controller가 어떤 validation을 체크하는지에 대해 알고있어야 한다.  
또한, money 객체가 양수값을 가져야한다는 것은 money라는 객체가 자체적으로 주도권을 갖고 자기 자신에 대한 도메인 규칙들을 검사할 수 있어야 더 응집력 있고 이해도 높은 Object-Oriented 구조가 될 것이다.  
따라서, 나중에 채널들이 늘어날 것을 대비하여, controller에서는 requestDto에 null, 공백문자, 빈문자에 대한 validation만을 갖고, 나머지는 serviceDto나 객체 자체에 대해서 validation을 넘긴다면 범용성 높은 request를 가지게 될 것이다.

### Request에 대한 valid 수행

#### validation import 방법

gradle에 implementation 'org.springframework.boot:spring-boot-starter-validation'를 추가하면 Request에 대한 검증을 할 수 있다.  
또한, 컨트롤러의 메소드 안에 arg부분의 request에는 @Valid를 붙여야 한다.

```
@PostMapping("/api/v1/products/new")
    public void createProduct(@Valid @RequestBody ProductCreateRequest request) {
        productService.createProduct(request);
    }
```

그리고 RequestDto에는 각 타입에 어떤 형식의 검증할 것인지 어노테이션을 붙여야 한다.

```
public class ProductCreateRequest {
@NotNull
private ProductType type;

    @NotBlank
    @Max(20)
    private String name;

    @NotEmpty
    @Positive
    private int price;
}
```

<br>

##### Spring bean validation

@NotNull : null이 아닌지 검증, NULL이면 통과를 안시킴, 빈문자열("")과 공백( " ")은 통과 됨.  
@NotEmpty : empty가 아니면 괜찮. null과 빈문자열("")은 통과 안됨. 공백(" ")은 통과 됨.  
@NotBlank : 공백도 안되고 null도 안되고, 빈문자열도 통과 안됨. 많이 쓰임.  
@Positive : 양수인지 검증, 이건 서비스 DTO에서 검증하는게 맞을 것 같다.
@Max(20) : 문자열 길이 20자 제한, 이건 서비스 DTO에서 검증하는게 맞을 것 같다.
등....

### 그 외 키워드들

@RestControllerAdvice : // 해당 클래스가 컨트롤러에서 발생하는 예외를 잡아서 처리하는 클래스임을 명시  
@ExceiptionHandler : // BindException 예외가 발생하면 해당 메서드를 실행  
ObjectMapper : 객체로부터 Json 형태의 문자열을 만들어내는 직렬화 기능을 수행해준다.
