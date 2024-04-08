---
layout: post
title: 리눅스에 SprintBoot, React 배포하기
description: 리눅스에 SprintBoot, React 배포하기 설명 포스터
date: 2024-04-11 00:00:00 +0900
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

진짜 쉽다...겁먹지 말자

# 스프링부트 배포방법

스프링부트에 `./gradlew clean build`라고 입력하면 build/libs에 jar 파일이 생성된다.
이 jar파일을 리눅스에서 실행시키면 배포가 되는거다.

jar파일을 리눅스의 아무 폴더에나 옮긴 후에 `java -jar 빌드파일명.jar` 라고 입력하면 실행이 된다. SpringBoot로 작성한 파일 배포 완료다.  
물론 jvm이 설치되어 있어야한다.

# 리엑트 배포방법

리엑트를 작성 후 `npm run build`를 하면 build 폴더가 생기고, 그 안에 index.html와 그 외 정적파일들이 생길거다.
이 build폴더가 통째로 필요하다.
이 build폴더를 리눅스로 옮긴 후 nginx으로 index.html을 호스팅해주면 끝이다.

# 참 쉽죠?
