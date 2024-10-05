---
layout: post
title: DNS 설정 방법 (Name Server, 가비아)
description: 가비아로 DNS설정하였던 간단한 방법 포스팅.
date: 2024-04-10 00:00:00 +0000
categories: DevOps # Develop, Life, DevOps, Conference, BackEnd, AI, Etc
comments: true
type: done # done, writing, hide
---

가비아에서 가장 싼 500원짜리 도메인을 구입하였고, 아래 이미지에서 보는 설정 이외에 해준 것이 없다.  
서브도메인 등 다른 것들 적용하려면 설정이 더 필요하겠지만, 나는 메인도메인 하나만 설정하였다.  
서브도메인도 별거 없다..여기서는 설명안할거지만 겁먹지말자.

![image](/image/가비아DNS설정.jpg)

EC2의 IP를 적어 놓기만 하면 끝난다.  
Name Server에 적용되는데까지 시간은 약 1시간 걸린것 같다.  
이렇게 오래걸리는 이유는 전세계에 있는 NameServer에 순차적으로 도메인네임이 업데이트가 적용되기 때문이다.  
약 1시간 뒤쯤부터 도메인으로 서버 접속이 가능하기 시작했다.
