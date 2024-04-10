---
layout: post
title: 리눅스에 SprintBoot, React 배포되는 과정.
description: 리눅스에 SprintBoot, React 배포하기 설명 포스터
date: 2024-04-11 00:00:00 +0000
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

쉽다...겁먹지 말자

## 스프링부트로 작성한 코드의 배포 개념

스프링부트에서 작성한 코드는 Build를 하면 jar파일이라는게 나온다.
이 jar파일을 구동하면 개발자가 springBoot에서 코드를 running시키는 것과 똑같은 역할을 한다.
개발자는 스크링부트 코드를 Build하여 jar파일이 나오면 그 jar파일을 리눅스에 옮기고, 똑같은 버전의 JVM을 설치한 후, Jar파일을 실행시키기만 하면 BackEnd 코드는 배포되는 것이다.

## 프론트엔드 코드의 배포 개념

프론트엔드에서 작성한 코드는 그 코드 자체를 배포하는 것이 아니다.
프론트엔드 프레임워크의 존재이유는 프론트엔드 코드를 쉽게 만들기 위함이고, 백엔드코드처럼 백엔드코드가 직접 running되는게 아니다.  
프론트엔드 프레임워크(React, Vue 등)에서 작성한 코드들은 Build를 시키면 index.html과 그 문서에 필요한 CSS, scipt 파일, 이미지 등이 함꼐 static 파일 등이 폴더에 함께 담겨 나오게 된다.  
Build과정을 거쳐 하나의 폴더에 담긴 Static파일들을 nginx가 호스팅하는 것이다.  
다시말하면 프론트엔드코드를 배포하는 것이 아니라, 프론트엔드 프레임워크에서 작성한 코드를 Build시키면 index.html과 그 외 파일들이 함께 나오고, 이 Build되어 나온 index.html을 nginx로 배포하는 것이다.

# 스프링부트 배포방법

스프링부트에 `./gradlew clean build`라고 입력하면 build/libs에 jar 파일이 생성된다.
이 jar파일을 리눅스에서 실행시키면 배포가 되는거다.

jar파일을 리눅스의 아무 폴더에나 옮긴 후에 `java -jar 빌드파일명.jar` 라고 입력하면 실행이 된다. SpringBoot로 작성한 파일 배포 완료다.  
물론 jvm이 설치되어 있어야한다.

# 리엑트 배포방법

리엑트를 작성 후 `npm run build`를 하면 build 폴더가 생기고, 그 안에 index.html와 그 외 정적파일들이 생길거다.
이 build폴더가 통째로 필요하다.
이 build폴더를 리눅스로 옮긴 후 nginx으로 index.html을 호스팅해주면 끝이다.
여기서 Nginx를 다루지는 않겠다.
굳이 찾아보고싶다면 이 블로그에 [NGINX 리눅스 설치 및 사용법]이라는 글이 있으니 참고하기 바란다.
