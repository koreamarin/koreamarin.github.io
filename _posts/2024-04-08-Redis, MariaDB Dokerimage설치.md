---
layout: post
title: Docker를 이용한 Redis, MariaDB 설치
description: Docker를 이용한 Redis, MariaDB 설치를 다룬 내용입니다.
date: 2024-04-08 00:00:00 +0000
categories: DevOps # Develop, Life, DevOps, Conference, BackEnd, AI, Etc
comments: true
type: done # done, writing, hide
---

Docker를 이용한 Redis, MariaDB 설치를 다룬 포스터입니다.

# Redis 설치

`sudo docker pull redis` : redis의 이미지를 docker hub에서 다운받음

`sudo docker run -d -p 6379:6379 --name redis redis` : 6379 포트를 포트포워딩으로 연결하여 redis이미지를 실행하여 컨테이너 running.

**프로젝트에서 설치한 Redis 버전 : 7.2.4**

```
sudo docker pull redis:7.2.4
sudo docker run -d -p 6379:6379 --name redis redis:7.2.4
```

# MariaDB 설치

`sudo docker pull mariadb` : mariadb의 이미지를 docker hub에서 다운받음

`sudo docker run -p 3306:3306 --name mariadb -e MARIADB_ROOT_PASSWORD=****** -d mariadb` : 3306 포트를 포트포워딩으로 연결하여 mariadb 이미지를 실행하여 컨테이너 running. -e 옵션은 비번설정

### 벌써 설치 끝!! 이제 WorkBench에서 접속해보자!!

![image](/image/mariaDB_image.jpg)

# 끝!
