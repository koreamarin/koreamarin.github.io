---
layout: post
title: Spring Security 6.x.x 정리
description: Spring Security 6.x.x 총 정리
date: 2024-11-27 00:00:00 +0000
categories: BackEnd # BackEnd, Life, DevOps, Conference
comments: true
type: writing # done, writing, hide
---

추 후 개발할 서비스는 보안이 중효하다.
Spring Security 6.x.x 강의를 듣고 정리한 글이다.

# 기본 설정

### build.gradle

![alt text](/image/security1.png)  
시큐리티 의존성을 추가한다.

### 시큐리티 간단 테스트

![alt text](/image/security2.png)  
간단한 컨트롤러를 만들어서 서버를 러닝시키면 아래 이미지처럼 password가 나온다. 이 password는 매번 서버가 러닝될때마다 랜덤으로 바뀐다.  
![alt text](/image/security3.png)  
브라우저로 URL을 접속하면 인증을 위한 로그인페이지로 리다이렉트 된다. 시큐리티에서 기본 제공하는 로그인 페이지이다.  
![alt text](/image/security4.png)  
아이디는 user이고, 비밀번호는 서버러닝시 나왔던 password이다. 아이디와 비밀번호를 입력하면 원하던 정보가 표시된다.  
![alt text](/image/security5.png)

### 시큐리티 config 파일 만들어서 커스텀 클래스 만들기

SecurityConfig 클래스를 만든다.  
![alt text](/image/security6.png)  
이 클래스 안에 어떻게 인증을 하고 인가를 할 것인지를 설정할 수 있다.  
위 이미지는 기본 상태로, 서버를 러닝 시켜보면 시큐리티 간단 테스트에서 했던것과 같이 시큐리티에서 password를 제공하고 id는 user인 상태가 된다.  
아무것도 설정하지 않은 기본 상태이다.

### User직접 추가해보기
User를 직접 추가하는 방법에는 2가지 방법이 있다.  
하나는 application.yml에서 user 정보를 설정하는 방법이고, 다른 하나는 SecurityConfig파일에서 userDetailsService객체를 생성해주는 방법이 있다.
#### application.yml을 이용하여 user를 추가하는 방법  
![alt text](/image/security7.png)  
위 처럼 application.yml에서 user와 password를 설정할 수 있다. roles는 user의 권한을 설정해주는 것이다.  
설정을 하고 서버를 실행시키면 매번 실행시 나오던 password가 로그에 표시되지 않는것을 볼 수 있으며, login페이지에서 직접 설정한 id와 password로 로그인이 가능하다.  

#### userDetailsService객체를 만들어서 추가하는 방법
![alt text](/image/security8.png)
securityConfig클래스에 유저객체를 직접 만들어 준 방식이다.  
유저를 여러개 만들어줄 수도 있다.  
application.yml방식과 현재 이 방식을 둘 다 적용한 경우, userDetailsService객체를 만들어서 추가하는 방법이 우선순위가 되어 이 방식만 적용이 된다.  
password앞에 {noop}이라는 문자열을 넣어줘야 한다. 비밀번호를 암호화하지 않고 평문으로 지정하겠다는 것인데 개발 환경같은데서 사용하는 방식이다.  

### 폼 인증 - formLogin
![alt text](/image/security9.png)
1. loginPage
 - 인증 실패 시 이동시킬 URL을 지정해주는 곳이다. 기본 설정은 "/login"으로 되어있으며, 이 메서드를 호출하지 않으면 기본설정이 적용된다.
2. loginProcessingUrl
- id와 password를 post방식으로 보낼 url을 지정해주는 곳이다. 기본 설정은 "/login"으로 되어있으며, 이 메서드를 호출하지 않으면 기본설정이 적용된다.
- 기본 로그인 페이지의 form의 action에 이 메서드에서 적용한 url이 바로 적용되어진다.
3. defaultSuccessUrl
  - 로그인 인증 성공 시 어떤 url로 리다이렉트 할 지 설정하는 곳이다. 두번째 인자는 true를 주면 첫번째 인자의 path로 연결시켜주고, false를 주면 인증페이지 전에 보고 있던 페이지로 이동시켜 준다.
  - 내부에서 Hanlder가 동작하고 있다. 아래에서 설명할 successHandler를 설정했다면 defaultSuccessUrl보다 SuccessHandler가 우선시 되어 SuccessHandler만 동작하게 된다.
4. failureUrl
  - 인증 실패 시 어떤 URL로 이동시켜줄 지 적용하는 메서드이다.
  - 내부에서 Hanlder가 동작하고 있다. 아래에 failureHandler를 설정했다면 failureUrl보다 failureHandler가 우선시 되어 failureHandler만 동작하게 된다.
5. usernameParameter
- form에서 읽어들일 username의 name을 다른 것으로 지정하고 싶을 때 쓰는 메서드이다. 기본은 "username"이며, 이 메서드를 통해 userId로 바꾸면 input의 name이 userId로 적용되어 있다.
6. usernameParameter
- form에서 읽어들일 password의 name을 다른 것으로 지정하고 싶을 때 쓰는 메서드이다. 기본은 "password의"이며, 이 메서드를 통해 passwd의로 바꾸면 input의 name이 passwd로 적용되어 있다.
7. successHandler
- 인증 성공 시에 실행시켜줄 코드를 넣을 수 있는 메서드이다.
8. failureHandler
- 인증 실패 시에 실행시켜줄 코드를 넣을 수 있는 메서드이다.
9. permitAll
- loginPage, loginProcessingUrl, failureUrl에 대한 접근은 인가 없이도 허용하는 메서드이다.

### 폼 안중 필터 - UsernamePasswordAuthenticationFilter
