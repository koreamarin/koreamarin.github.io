---
layout: post
title: jenkins에 Node.js Flugin 설치법
description: 최근 jenkins의 node.js flugin설치 오류를 다른 방법으로 설치하는 방법
date: 2024-05-22 00:00:00 +0000
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

# 1. Plugin 설치

Jenkins 관리 > System Configuration > Plugins로 접속하여 NodeJS Plugin을 설치
한다.

# 2. NodeJS 설치

- Jenkins 관리 > System Configuration > Tools로 접속하여 NodeJS installation의
  블록으로 이동한다.
- Add Installer를 눌러 Extract _.zip/_.tar.gz로 옵션을 변경한다.
- 이후 내용을 아래와 같이 작성한다.
  - Name : 사용자가 NodeJS를 사용하고자 할 때 호출할 이름을 작성한다.
    가급적 영어로 띄어쓰기 없이 작성한다.
  - Download URL for binary archive : 사용하는 Node 버전의 링크를 입력한다.
    - 🔗 [Node version List](https://nodejs.org/dist/)
    - 위 링크를 통해 접속하여 버전을 클릭한 후 개발 환경에 맞는 파일을 링크를 복사한다.
    - OS는 linux-x64로 확장자는 .tar.gz의 파일을 오른쪽 마우스를 눌러 링크를 복사한다.
      ![image](/image/젠킨스노드1.jpg)
      ![image](/image/젠킨스노드2.jpg)

# 3. 환경변수 등록

- Jenkins 관리 > System Configuration > System으로 접속하여 Global properties
  블록으로 이동한다.
- Environment variable에서 키-값을 아래와 같이 등록한다.
  - Key : PATH+NODE
  - Value :  
    /var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/{위
    에서 지정한 NodeJS 이름}/{NodeJS파일 이름}/bin/
    ![image](/image/젠킨스노드3.jpg)
