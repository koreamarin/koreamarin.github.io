---
layout: post
title: JENKINS와 CICD구성과정 내용정리 [Jenkins, Docker, 서버구성]
description: 특화프로젝트를 진행하며 JENKINS로 CI/CD 환경을 구성했던 과정을 정리한 포스터입니다.
date: 2024-04-07 00:00:00 +0900
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

특화프로젝트에서 CI/CD 시스템을 구성하는 임무를 맡게되었다.  
그 과정에서 BackEnd와 FrontEnd의 서버구성도를 설계하게 되었으며,  
Jenkins과 Docker이미지를 사용하였다.
처음 하는 CI/CD라서 어려웠고, 어디서 오류가 난지도 잘 나오지 않아 참 헷갈렸었다.  
테스트와 무중단배포도 구성하고 싶었는데, 시간상 목표치를 전부는 이루지 못하고 CI/CD정도만 구성하였다는 아쉬운 점도 남아있다.  
하지만 첫 시작으로 나쁘지 않은 정도였으며, 다음에 더 발전된 지속 통합,배포 환경을 만들기 위해 이번 프로젝트 CI/CD내용을 포스터로 남긴다.

# Jenkins란?

소프트웨어 개발 시 지속적으로 통합 서비스를 제공하는 툴이다.
개발자들이 하나의 프로그램을 협업하는 방식으로 개발을 할 때, 각 개발자가 커밋을 하면 젠킨스는 코드를 지속적으로 build하고 배포하여준다.  
테스트코드 작성 시 개발자들이 올린 코드에 오류는 없는지 테스트도 자동으로 제공할 수 있으며,  
빌드를 하고 나온 배포파일을 배포까지 해줄 수 있다.

그러나 Jenkins를 설치했으니 테스트, 빌드, 배포까지 그냥 뚝딱 되는것은 아니고, PipeLine이라는 것을 작성해야한다.
PipeLine에 어떤 코드를 가져오고, 어떤 테스트를 거치고, 어떻게 빌드할 것이며, 어떤 서버에 배포할 것인지 작성해주어야 한다.

# Jenkins 빌드 배포 과정

나의 프로젝트에서는 테스트과정을 제외하였다.
그리고 빌드파일을 만들어서 docker로 이미지화 하여 각 커밋된 코드들마다 이미지로 남겼다.
왜 이런 방식을 사용했냐하면, 각 코드들마다 docker로 이미지화 하여 dockerHub에 커밋해두면 각 빌드파일들이 dockerHub에 남게된다.
내가 진행했던 CI/CD과정에서는 테스트과정이 없었기 때문에 잘못된 코드가 빌드될 수 있다.
잘못된 코드가 빌드되어서 배포되었을 때, dockerHub에 푸쉬되어있던 이전 버전의 코드를 가져와서 내가 직접 재배포시킬 수 있기 때문에  
코드들을 빌드한 후 docker로 이미지화 시키는 과정을 수행하게 되었다.

## [이미지삽입 예정]

# 서버구성

## [이미지삽입 예정]

# 1. Jenkins 설치

JenKins를 리눅스에 설치하는 방법은 2가지가 있다.

**하나는** Jenkins를 리눅스에 직접 설치하는 방법이다. 이 방법을 사용하려면 JAVA11 JDK를 설치해야한다.

**또 다른 방법은** Docker를 설치하여 Jenkins 공식 이미지를 받아서 running 시키는 방법이 있다.

이 방법을 이용하면 설치가 쉽다. 이 단원에서는 Docker의 Jenkins 이미지를 활용한 설치방법을 다루고 있으며, Docker를 이용한 Jenkins 설치와 Port 설정, 미러사이트 변경 내용을 다루고 있다.

먼저 Docker를 설치해야하는 Docker 설치 방법은 이 포스팅을 참고 바란다. [DOCKER란? 도커 총 정리 및 실습하기](/devops/2024/04/06/Docker/)

## jenkins 설치과정 [아래 순서대로 따라치면 설치됨]

- `cd /home/ubuntu && mkdir jenkins-data`
  - Docker 컨테이너와 서버의 폴더를 연결할 수 있다. 이것을 마운트하다 라고 한다.  
    이제부터 Jenkins 컨테이너를 만들 예정인데, 아직 만들기 전에 Jenkins 컨테이너와 ES2서버의 폴더를 연결하기 위해서 ES2서버의 내부에 `jenkins-data` 라는 폴더를 만드는 것이다.
    <br><br>
- `sudo ufw allow 9999/tcp`  
  우분투의 UFW(방화벽)에 9999포트의 TCP트래픽을 수신할 수있도록 규칙을 추가하는 명령어  
  다른 포트로하고싶다면 해도 상관없다. 여기에서는 9999번으로 하겠다.  
  왜냐하면 8080포트는 BackEnd 포트로 8080을 사용할 예정인데, 젠킨스가 8080을 쓰면 안되기 때문에 젠킨스 포트는 9999로 하겠다.
  <br><br>
- `sudo ufw reload`  
  현재 설정된 방화벽 규칙을 다시로드하여 새로운 설정을 적용하는 명령어
  <br><br>
- `sudo ufw status`  
  현재 UFW의 상태를 확인하는 명령어. 이 명령어를 사용하면 현재 활성화된 방화벽 규칙과 정책을 확인할 수 있다.
  <br><br>
- `sudo docker run -d -p 9999:8080 -v /home/ubuntu/jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /home/ubuntu/share_dir:/var/share_dir --name jenkins -u root jenkins/jenkins`  
  도커 이미지를 실행하여 컨테이너로 실행하는 명령어. 이미지가 로컬에 없으면 자동으로 Docker Hub에서 다운로드됨.  
  `-d` : 컨테이너를 백그라운드에서 실행하는 옵션  
  `-p 9999:8080` : 호스트의 8080포트를 컨테이너의 9999포트로 포트포워딩함. 젠킨스가 기본적으로 8080포트로 열리는데, 컨테이너 외부에서는 9999포트로 접근하면 젠킨스의 포트 8080으로 매칭되어 접근할 수 있는 것임.  
  `-v /home/ubuntu/jenkins-data:/var/jenkins_home` : 호스트의 `/home/ubuntu/jenkins-data` 디렉터리를 컨테이너 내부의 `/var/jenkins_home` 디렉터리에 연결(마운트)한다.  
  어느 한쪽에 파일이 있다면 다른 한쪽에도 파일이 복제되어 공유하는것이다.  
  용량이 2배로 낭비될 수 있지만 파일을 공유할수있다는 장점이 있어서 사용한다.  
  만약 플러그인 설치가 안된다면 lts 설치를 하지말고  
  `sudo docker run -d -p 9999:8080 -v /home/ubuntu/jenkins-data:/var/jenkins_home --name jenkins jenkins/jenkins:latest` 를 한다.  
  요즘 버전 문제가 있어서 lts버전에서 플러그인이 설치되지 않는 문제가 있었다.
  <br><br>
- `sudo docker logs jenkins`  
  해당 컨테이너의 구동 상태를 보기 위해 사용하는 도커 명령어.  
  중간에 출력되는 초기 패스워드는 조금 이따 쓰이므로 필수로 기록해둔다.
  <br><br>
- `sudo docker stop jenkins`  
  해당 컨테이너를 중지하기 위해 사용하는 도커 명령어.
  <br><br>
- `sudo docker ps -a`  
  sudo docker ps는 현재 실행되고 있는 컨테이너 목록을 보여주는 명령어이다.
  -a를 붙이면 모든 컨테이너들을 보여주며, 중지된 컨테이너도 보여준다.
  따라서 모든 컨테이너들을 볼 수 있다.
  <br><br>
- `cd /home/ubuntu/jenkins-data`  
  젠킨스 데이터 폴더로 이동하는 리눅스 명령어
  <br><br>
- `mkdir update-center-rootCAs`  
  현재 디렉토리에 update-conter-rootCAs 디렉토리 만듦.
  <br><br>
- `wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O ./update-center-rootCAs/update-center.crt`
  - **`wget`**을 사용하여 특정 URL에서 파일을 다운로드하고, 다운로드한 파일을 **`./update-center-rootCAs/update-center.crt`** 경로에 저장하는 명령어
  - **`wget`**: URL에서 파일을 다운로드하는 명령입니다.
  - **`https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt`**: 다운로드할 파일의 URL입니다.
  - `**-O**` : 다운로드한 파일의 저장 경로를 지정하는 옵션입니다.
  - **`./update-center-rootCAs/update-center.crt`**: 다운로드한 파일을 저장할 경로입니다.
    <br><br>
- `sudo sed -i 's#https://updates.jenkins.io/update-center.json#https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json#' ./hudson.model.UpdateCenter.xml`
  - **`sed`**를 사용하여 특정 파일(**`./hudson.model.UpdateCenter.xml`**) 내에서 특정 패턴(**`https://updates.jenkins.io/update-center.json`**)을 다른 패턴(**`https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json`**)으로 교체하는 명령어
  - **`sed`**: 텍스트 파일에서 특정 패턴을 검색하고, 해당 패턴을 다른 패턴으로 교체하는 명령입니다.
  - **`i`**: 원본 파일을 직접 수정하도록 지정하는 옵션입니다. 즉, 인라인 모드로 작동합니다.
  - **`'s#https://updates.jenkins.io/update-center.json#https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json#'`**: 검색할 패턴과 교체할 패턴을 지정하는 **`sed`**의 스크립트입니다. 여기서 **`s`**는 "substitute"를 의미하고, **`#`**는 패턴과 패턴 사이를 구분하는 구분자입니다.
  - 따라서 이 명령을 실행하면 **`./hudson.model.UpdateCenter.xml`** 파일에서 **`https://updates.jenkins.io/update-center.json`**이라는 패턴이 **`https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json`**으로 교체됨
  - 이 명령어를 수행하는 이유는 Default설정되어있던 **`https://updates.jenkins.io/update-center.json`** 에서
    다른 URL **`https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json`** 로 URL을 옮기는 것인데,
    이렇게 하면 jenkins 플러그인이나 빌드 도구와 같은 소프트자원을 다운로드할 서버를 지정해줄 수 있는 것이다. 속도향상이나 안정성 문제등의 이유로 미러사이트를 바꾸고는 한다.
    <br><br>
- `sudo docker restart jenkins`  
   설정을 바꿨으므로 젠킨스 컨테이너를 리스타트하기 위해서 사용하는 코드.
  <br><br>
- 여기까지 완료되었으면 브라우저의 링크창에 [설치서버url:젠킨스포트]를 입력하여 젠킨스로 접속이 되는지 확인한다.
- 패스워드 입력창이 뜨는데, `sudo docker logs jenkins` 에서 보았던 초기 password를 입력한다.
- install 창이 뜨는데, 커스텀할거 아니면 install suggested plugins를 누른다.
- 뭔가 많이 설치된다. pipeline과 젠킨스에 필요한 플러그인들 등등..
- admin 계정을 만든다. 계정명과 암호, 이름 등은 알아서 설정한다.
- 외부접속 URL을 설정한다. 여기서는 9999를 사용하였다.

# 2. 젠킨스 사용법 및 설정법

젠킨스는 pipeline을 작성하여 어떻게 젠킨스가 실행될 것인지에 대해 정의할 수 있다.

Webhook이 들어오면 어떤 것들을 빌드해라 라는 명령을 내릴 수 있는 것이다.

PipeLine에는 두가지 작성방법이 있다.

첫번째는 젠킨스 자체에 PipeLine을 적용하는 것이고,

두번째는 git에 jenkins(pipeline 정의파일) file을 같이 올려서 버전별로 pipeline을 정의하는 것이다.

### Gradle 설정하기

- gradle을 사용할 때에는 jenkins Web페이지에서 gradle을 설치하고 전역변수로 설정해줘야 한다.
  - Jenkins관리 - Tools - Gradle installations에서 Gradle installations버튼을 누르고, 전역변수로 사용할 name을 입력하고, install automatically를 체크한 후 저장한다.
  - 나는 전역변수로 사용할 네임을 gradle로 하였다.

### 젠킨스에 Git 설정하기

깃에 대한 정보를 입력해줘야 한다. 아이디, 엑세서 토큰 등 깃허브 또는 깃랩에 접근하기 위한 설정을 하는 것이다.

- jenkins관리 클릭 - Credential 클릭 - System클릭 - Global credentials 클릭 - Add domain 클릭
- kind ⇒ Username with password
- Scope ⇒ Global
- Username ⇒ 자신의 gitlab 이메일주소
- Password⇒ 자신의 AccessToken
- ID ⇒ 자신의 이메일 주소로 해도되고, 비워놔도 된다.
- Save 클릭
- PipeLine에 git Clone시에 아래와 같은 형식으로 입력하면 된다.
  - 브랜치는 clone하고싶은 브랜치명을, credentialsId는 위에서 Username에 썼던 이메일주소를, url은 git Clone을 할 레포지토리 주소를 입력하면 된다.
  ```
  git branch: 'develop', credentialsId: 'email@domain.com', url: 'https://github.com/***********************'
  ```

---

## 번외 필요한 내용들을 따로 정리..

개인적으로 참고하기 위한 내용들이다.

- 젠킨스 이미지 run 명령어
  ```
  sudo docker run -d -p 9999:8080 -v /home/ubuntu/jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /home/ubuntu/share_dir:/var/share_dir --name jenkins -u root jenkins/jenkins
  ```

## PlugIn

![image](/image/Jenkins_PlugIn.jpg)

## Credentials

![image](/image/Jenkins_Credentials.jpg)

## System

![image](/image/Jenkins_System_SSH_KEY.jpg)

## 젠킨스 BE용 PipeLine

- 젠킨스 SpringBoot_Build Pipeline

  ```
  pipeline {
      environment {
          repository = "be-img"  //docker hub id와 repository 이름
          DOCKERHUB_CREDENTIALS = credentials('dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
          dockerImage = ''
      }
      agent any

      stages {
          stage('Git Clone') {
              steps {
                  git branch: 'BE_develop', credentialsId: 'awldnjs2@naver.com', url: 'https://lab.???????.com/??????????/?????????.git'
              }
          }

          stage('BE_Build') {
              steps {
                  dir("./BE/src/main/resources") {
                      sh 'cp /var/share_dir/secret/application.yml .' // application.yml을 볼륨컨테이너에서 레파지토리 폴더로 복사
                  }
                  dir("./BE") {
                      sh "chmod +x gradlew"
                      sh "./gradlew clean build"      // 빌드
                  }
              }
          }

          stage('image_build') {
              steps {
                  dir("./BE/build/libs") {            // 빌드 전 dockerfile과 jar파일 복사
                      sh 'cp /var/share_dir/BE/dockerfile /var/jenkins_home/workspace/img_build/BE/dockerfile'        // 볼륨마운트 폴더에서 docker파일을 img_docker디렉터리로 복사
                      sh 'cp ./kkirikkiri-0.0.1-SNAPSHOT.jar /var/jenkins_home/workspace/img_build/BE/BEimg.jar'      // 같은 폴더에 jar파일을 복사
                  }

                  script {
                      dir("/var/jenkins_home/workspace/img_build/BE/") {
                          sh 'ls'
                          docker.build repository + ":$BUILD_NUMBER"    // 이미지 빌드
                      }
                  }
              }
          }

          stage('image_push') {
              steps {
                  sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                  sh 'docker tag $repository:$BUILD_NUMBER $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER'
                  sh 'docker push $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER' //docker push
                  sh "docker rmi $repository:$BUILD_NUMBER $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER" // 로컬에서 docker image 제거
                  sh "docker system prune -f -a --filter until=12h"
              }
          }

          // EC2에서 기존 이미지 중단, 삭제 후 새로운 이미지 run
          stage('image_pull&deploy') {
              steps {
                  script {
                      sshPublisher(
                          continueOnError: false,
                          failOnError: true,
                          publishers: [
                              sshPublisherDesc(
                                  configName: 'ubuntu', // SSH 설정 이름
                                  verbose: true,
                                  transfers: [
                                      sshTransfer(
                                          execCommand: "docker stop ${repository}; docker rm ${repository}; docker run -d -p 8080:8080 --name ${repository} ${DOCKERHUB_CREDENTIALS_USR}/${repository}:${BUILD_NUMBER};"
                                      )
                                  ]
                              )
                          ]
                      )
                  }
              }
          }
      }
  }
  ```

## 젠킨스 FE용 PipeLine

- 젠킨스 React_Build Pipeline

  ```
  pipeline {
      environment {
          repository = "fe-img"  //docker hub id와 repository 이름
          DOCKERHUB_CREDENTIALS = credentials('dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
          dockerImage = ''
      }
      agent any

      stages {
          stage('Git Clone') {
              steps {
                  git branch: 'FE_develop', credentialsId: 'awldnjs2@naver.com', url: 'https://lab.???????.com/??????????/?????????.git'
              }
          }

          stage('image_build') {      // 이미지 빌드시키면서 build도 시키고, nginx도 돌리고 하기....
              steps {
                  dir("./FE") {
                      sh 'cp /var/share_dir/FE/dockerfile /var/jenkins_home/workspace/img_build/FE/dockerfile'        // 볼륨마운트 폴더에서 dockerfile을 img_docker디렉터리로 복사
                      sh 'cp /var/share_dir/FE/nginx.conf /var/jenkins_home/workspace/img_build/FE/nginx.conf'        // 볼륨마운트 폴더에서 nginx.conf을 img_docker디렉터리로 복사
                      sh 'cp -r ./frontend /var/jenkins_home/workspace/img_build/FE'      // 같은 폴더에 jar파일을 복사
                  }

                  script {
                      dir("/var/jenkins_home/workspace/img_build/FE/") {
                          sh 'ls'
                          sh 'docker build --no-cache -t $repository:$BUILD_NUMBER .'    // 이미지 빌드
                      }
                  }
              }
          }

          // 로그인 후 이미지 푸쉬
          stage('image_push') {
              steps {
                  sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                  sh 'docker tag $repository:$BUILD_NUMBER $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER'
                  sh 'docker push $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER' //docker push
                  sh "docker rmi $repository:$BUILD_NUMBER $DOCKERHUB_CREDENTIALS_USR/$repository:$BUILD_NUMBER" // 로컬에서 docker image 제거
                  sh "docker system prune -f -a --filter until=12h"
              }
          }

          // EC2에서 기존 이미지 중단, 삭제 후 새로운 이미지 run
          stage('image_pull&deploy') {
              steps {
                  script {
                      sshPublisher(
                          continueOnError: false,
                          failOnError: true,
                          publishers: [
                              sshPublisherDesc(
                                  configName: 'ubuntu', // SSH 설정 이름
                                  verbose: true,
                                  transfers: [
                                      sshTransfer(
                                          execCommand: "docker stop ${repository}; docker rm ${repository}; docker run -d -p 3000:3000 --name ${repository} ${DOCKERHUB_CREDENTIALS_USR}/${repository}:${BUILD_NUMBER};"
                                      )
                                  ]
                              )
                          ]
                      )
                  }
              }
          }
      }
  }
  ```
