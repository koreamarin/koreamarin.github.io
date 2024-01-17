---
layout: post
title: Windows에 Linux설치하기
description: Windows에 가상머신을 만들어 Linux를 설치하고, 네트워크를 설정하기
date: 2024-01-01 00:00:00 +0900
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

VirtualBox라는 프로그램을 설치하여 Windows OS에 가상머신을 만들고, 그 가상환경에 Ubuntu를 설치하는 포스팅입니다.
추가로 가상머신의 우분투에 네트워크 연결 설정을 하고, 많이 사용하는 네트워크 방식에 대해 알아본다.

---

## 1. VirtualBox 설치하기

- VirtualBox는 가상머신을 만들어 가상머신 내에 리눅스를 설치할 수 있도록 해주므로 VirtualBox를 설치해야한다.
- [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)에 접속하여 VirtualBox를 설치한다.  
  ![image](/image/Windows에 Linux설치하기01.png)
- 아래 이미지의 빨간 박스가 있는 버튼을 눌러 설치한다.  
  ![image](/image/Windows에 Linux설치하기02.png)
  ![image](/image/Windows에 Linux설치하기03.png)
  ![image](/image/Windows에 Linux설치하기04.png)
  ![image](/image/Windows에 Linux설치하기05.png)
  ![image](/image/Windows에 Linux설치하기06.png)
  ![image](/image/Windows에 Linux설치하기07.png)
  ![image](/image/Windows에 Linux설치하기08.png)

## 2. Ubuntu 이미지 다운받기

- 우분투를 설치할 이미지파일을 아래 설명을 따라 다운받는다.
- [https://ubuntu.com/download/desktop](https://ubuntu.com/download/desktop) 링크를 타고 이동하여 우분투를 설치한다.  
  ![image](/image/Windows에 Linux설치하기09.png)

## 3. VirtualBox에 Ubuntu가 설치된 가상머신 생성하기

- 새로만들기를 누른다.  
  ![image](/image/Windows에 Linux설치하기10.jpg)
- 이름에 ubuntu를 입력한다. 이름에 ubuntu를 입력하면 종류와 버전이 자동으로 설정된다.
- ISO이미지 선택바에서 기타를 눌러서 다운받았던 ubuntu 이미지를 선택한다.
- 무인설치 건너뛰기를 하면 무인설치가 되는데, 이 포스트에서는 무인 설치를 하지 않을 것이므로 무인설치 건너뛰기를 체크한다.
- 다음 버튼을 누른다.  
  ![image](/image/Windows에 Linux설치하기11.jpg)
- 가상머신의 성능을 조절할 수 있는 창이 나타나게 되는데, 이 포스팅에서는 메모리를 4096MB으로 설정하여 진행한다.
  ![image](/image/Windows에 Linux설치하기12.jpg)
- 가상 하드 디스크 설정하기. 25GB에서 건드리지 않고 다음을 누른다.
  ![image](/image/Windows에 Linux설치하기13.jpg)
- 완료 버튼을 누른다.
  ![image](/image/Windows에 Linux설치하기14.jpg)
- 가상머신이 생성되었다!!
  ![image](/image/Windows에 Linux설치하기15.jpg)
- 가상머신 실행을 위해 시작 버튼을 살펴보자.
- 일반 시작은 GUI 모드로 시작하는 것이고, 헤드리스 시작은 CLI로 실행하는 것이다.
- 이 포스팅에서는 일단 우분투 설치를 위해 일반 시작을 클릭한다.
  ![image](/image/Windows에 Linux설치하기16.jpg)
- 가상머신 화면이 뜨면 Try or install ubuntu를 선택하여 우분투를 설치한다.
  ![image](/image/Windows에 Linux설치하기17.jpg)
- ubuntu가 실행되면 설치 세팅화면이 나오는데 웬만하면 영어가 좋다. 한글로 하고싶으면 해도 되는데, 추 후 인코딩문제 책임안진다.
- 언어 선택 후 install ubuntu를 클릭한다.
  ![image](/image/Windows에 Linux설치하기18.jpg)
- 키보드 레이아웃 선택 후 continue를 클릭한다.
  ![image](/image/Windows에 Linux설치하기19.jpg)
- 노말 설치는 웹 브라우저, 오피스, 소프트웨어, 게임, 미디어 플레이어를 설치하는데 필요없으니 최소설치(Minimal installation)을 선택한다.
- 버전 업데이트는 필요없으므로 Download updates while installing Ubuntu를 체크 해제한다.
- Continue를 누른다.
  ![image](/image/Windows에 Linux설치하기20.jpg)
- 디스크를 지우고 ubuntu설치(Erase disk and install Ubuntu)를 선택하고 지금설치(Install Now)를 선택한다.
  ![image](/image/Windows에 Linux설치하기21.jpg)
- Continue를 눌러 계속 설치를 한다.
  ![image](/image/Windows에 Linux설치하기22.jpg)
- 지역이 아마 Seoul로 잡혀있을 것이다. Seoul로 설정한 후 계속한다.  
  ![image](/image/Windows에 Linux설치하기23.jpg)
- 이름과 패스워드를 입력한다. 이름을 입력하면 컴퓨터 이름과 닉네임은 자동으로 입력된다.
- 자동로그인과 로그인할때마다 패스워드 입력하는 라디오 버튼 중에서 알아서 선택한다. 이 포스트에서는 비밀번호 입력 필수를 선택한다.  
  ![image](/image/Windows에 Linux설치하기24.jpg)
- 설치가 시작되니 기다린다!!
  ![image](/image/Windows에 Linux설치하기25.jpg)

## 4. 네트워크 방식 알아보기

- 우분투가 설치되면 일단 인터넷은 된다. 하지만 네트워크 방식에 대해서 알아보자.
- VirtualBox에서 설정에 들어간다.
  ![image](/image/Windows에 Linux설치하기26.jpg)
- 설정 창이 열리면 네트워크 탭에 들어가서 "다음에 연결됨"을 열어본다.
  ![image](/image/Windows에 Linux설치하기27.jpg)

### 용어

- 호스트 : 내 Windows 컴퓨터
- 게스트 : 가상머신에서 만들어진 Linux 컴퓨터

#### NAT(Network Address Traslation / 네트워크 주소 변환)

- 내부 네트워크에서 외부 네트워크로 단방향 연결. host 내부 네트워크와 통신 불가.
- 호스트와 내부 게스트간 통신을 하려면 포트포워딩을 해야 함.
- 게스트들은 아이피가 모두 같음.
- 여러 가상머신을 만들어 사용할 때에는 적합하지 않음.

#### 어댑터에 브리지

- 외부 라우터에서 IP주소를 직접 받아옴. 즉, 실제 사용되는 공유기에서 192.168.0.??? 주소를 직접 받아옴.
- 가장 마음 편한 방식. 공유기(라우터)에서 바로 IP를 할당해 주므로 따로 포트포워딩이 필요 없음.
- 다만 virtualBOX 내부의 네트워크 환경을 사용하는 것이 아니라는 것이 단점.

#### NAT Network

- NAT 방식과 비슷하지만 NAT Network는 내부 네트워크의 게스트간에 통신이 가능함.
- NAT 방식과 다르게 게스트들간의 IP가 다르게 할당되어 있음.
- DHCP에 의해 IP address를 자동으로 할당 받음. DHCP는 ip를 자동으로 할당, 관리하기 위한 통신 규약이다.
- NAT와 마찬가지로 포트포워딩은 필요함.

#### 호스트 전용 어댑터

- 호스트와 게스트간 통신은 되지만 외부 인터넷은 안됨

#### 내부 네트워크

- 게스트간 통신만 가능
- 호스트와 게스트간의 통신은 불가능. 인터넷 안됨
