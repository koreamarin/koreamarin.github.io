---
layout: post
title: MQTT Protocol
description: MQTT Protocol에 관한 이론 및 구현 코드 정리
date: 2024-10-05 00:00:00 +0000
categories: BackEnd # BackEnd, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

회사에서 MQTT프로토콜이란 것을 사용하는 프로젝트를 맡게 되었다.
민감한 내용은 생략하고, MQTT 프로토콜에 대한 이론적인 내용과 아두이노, SpringBoot server를 이용하여 MQTT 통신하는 방법에 대해 기술하는 포스터이다.

## 1. MQTT 특징

- 저대역폭 환경에서 M2M(machine to machine) 원격 측정을 위해 설계된 발행-구독 메시징 프로토콜
- 헤더가 작게는 2byte일 정도로 작아 IOT통신에 적합하다.
- TCP/IP 프로토콜을 사용하여 Wifi 환경에서도 통신이 가능하다.
- 웹통신에서 Client와 Server간의 통신을 하듯, MQTT통신에는 Client와 Broker가 서로 통신을 한다.
- Client들은 Publisher와 Subscriber로 나뉜다. 하나의 디바이스가 Publisher와 Subscriber을 동시에 수행할 수도 있다.
- 통신을 할 때 '토픽'이라는 개념을 사용한다.
- Topic을 구독하는 Device를 Subscriber라고 하고, Topic에 메시지를 게시하는 Device를 Publisher라고 한다.
- Subscriber가 "KBS뉴스"라는 토픽을 구독한다고 가정하자. 어떤 다른 Publisher가 "KBS뉴스"라는 토픽에 메시지를 게시하면 그 토픽을 구독하고 있는 모든 Subscriber는 메시지를 전달받게 된다.
- 클라이언트간의 통신은 ‘브로커’라고 불리는 서버에 의해 중계된다.
- Publisher나 Subscriber는 모두 브로커를 바라보고 있으며, Broker를 통해 Topic과 메시지가 중계된다.

- 예시) 유튜브 서버는 Broker이다. KBS뉴스 채널의 관리자는 Publisher이고, KBS뉴스의 구독자들은 Subscriber이다. KBS 뉴스의 관리자(Publisher)가 유튜브(Broker)에 영상을 게시하면 KBS뉴스 채널을 구독하고 있는 구독자들(Subscriber)은 모두 알람(Message)을 받게 된다. -> 이런 개념으로 이해하면 됩니당

## 2. MQTT 통신 기본 구조

- Topic을 Fire라고 하고, Fire 토픽에 메세지를 발행하는 Publisher와 Fire토픽을 구독하는 Subscriber 3개가 있는 모습이다.
- Device간의 통신을 Broker라는 MQTT Server가 관리하고 있다.
- Publisher가 화재를 감지하여 Fire라는 Topic에 true라는 메세지를 게시하면, Fire토픽을 구독하고 있는 Subscriber들은 True라는 메세지를 받게되고, Subscriber들은 건물의 각 공간에 경보를 울리는 식으로 작동하는 모습을 생각하면 된다.
- true라는 메세지를 주고받는 것으로 묘사되었는데, 실제 boolean값을 통신하지는 않고 문자열을 전송하게된다. 문자열 통신을 하므로 json형식으로 주로 통신을 한다. 여기서는 예시상황을 들기위해 true을 주고받았다고 표현하였다.

![image](/image/MQTT프로토콜1.png)

## 3. Qos(Queality Of Service)제어

- MQTT 통신에는 Qos라는 개념이 있다.
- Qos-0, Qos-1, Qos-2가 있는데, 숫자가 높아질수록 더 높은 수준의 통신서비스를 제공한다.

  ![image](/image/MQTT프로토콜2.png)

## 4. MQTT Broker 종류

- MQTT의 Broker를 만들기 위해서는 Broker프로그램을 설치하면 된다.
- 시장에는 여러 Broker가 있는데, 나는 Mosquitto라는 Broker를 사용하였다.
- ISO 표준이 MQTT v3.1.1버전이라고 한다. Mosquitto는 3.1.1버전을 지원하며, 가장 많이 쓰이는 broker이고, 오픈소스라서 무료이다.
- [Mosquitto 다운로드 링크는 여기](https://mosquitto.org/download/)
- 아래 이미지의 내용을 참고하여 다른 Broker도 참고하도록!
  ![image](/image/MQTT프로토콜3.png)

## 5. Broker viewer (MQTT.fx)

- MQTT Broker의 토픽 송신 수신 상황을 GUI형태로 볼 수 있는 프로그램 MQTT.fx를 추천한다. 사실 이거 밖에 안써봐서 잘 모르긴한데 사용하는데 불편함 없고 좋았다.
- [MQTT.fx 다운로드 링크](https://www.softblade.de/)
- 일종의 MQTT Client 프로그램이다. Broker에 연결해서 쓰면 된다.
- Broker에 연결해서 Topic을 구독하여 데이터가 잘 들어오고 나가는지 모니터링할 수도 있고, 데이터를 Publishing 할 수도 있다.

## 6. Topic Level

- Topic에는 계층이 존재한다. 단일 Topic으로 발행할수도 있고, 슬래시(/)를 사용하여 계층적인 구조의 Topic을 사용할 수도 있다.
- Topic이름은 대소문자를 구문한다. home/temperature와 home/Temperature은 서로 다른 토픽이다.
- 빈 레벨은 존재하지 않는다. home//temperature와 같이 빈 레벨은 유효하지 않다.

  ![image](/image/MQTT프로토콜4.png)

- ### 와일드카드

  - 구독자는 Topic Filter를 사용하여 Topic을 구독하는데, Wildcard를 사용할 수 있다.
  - Wildcard 문자는 2가지 종류가 있다. '#'과 '+'이다.
    <br><br>

  - #### Multi Level Wildcard (\#)

    - 여러 단계의 Topic Level을 대체할 수 있다. 해당 Level의 모든 Topic을 수신가능하게 하는 와일드 카드이다.
    - Multi Level wildcard는 단독으로 쓰이거나 Topic Filter의 마지막 Level에 위치 가능하다.
    - 예시) "sport/tennis/#" : sport/tennis 밑의 모든 Topic의 메세지를 수신한다.
    - 잘못된 예시1) "sport/tennis#" : 잘못된 예시이다.
    - 잘못된 예시2) "sport/tennis/#/ranking" : 중간 Level에 사용불가하다. 단독으로 쓰이거나 마지막 Level에 위치해야한다.
      <br><br>

  - #### Single Level Wildcard (+)

    - 한 단계의 Topic Level을 대체할 수 있다.
    - Single Level Wildcard는 단독으로 쓰이거나 특정 Topic Level에 위치 가능하다.
    - 예시1) "+" : 한 단계로 구성된 Topic을 구독 가능. "sport"은 구독가능하다 "sport/tennis"는 구독 불가하다.
    - 예시2) "sport/+/player1" : 이와 같이 중간 Level에 사용 가능하다.
    - 예시3) "+/tennis/#" : Multi Level Wildcard (\#)와 같이 사용 가능하다.
    - 잘못된 예시1) "sport+" : 슬래시(/)뒤에 있어야 유효하다. 잘못된 예시이다.

## 7. Arduino, SpringBoot 예시 상황

- 예시 코드를 보기 전 어떤 인프라 구조인지, 어떤 상황인지 먼저 설명하겠다.
  ![image](/image/MQTT프로토콜5.png)

  - 데이터센터가 있다고 가정하자. 데이터센터는 온도 관리가 중요하고, 냉방을 잘 해줘야한다. 여기에 온도 감지 모니터링 시스템이 설치되어 있다고 가정하자.

  - Arduino는 건물 내부의 온도를 탐지하고, 10초에 한번씩 Broker에 temp라는 Topic으로 현재 온도 데이터를 발행한다.
  - Server는 Broker로부터 Temp라는 Topic을 구독하고 있다. artuino가 temp 토픽에 데이터를 발행하면 server는 이 데이터를 받게된다. 이 온도 데이터를 시간별로 DB에 저장하여 기록을 남긴다.
  - Server가 Topic을 발행하여 Arduino가 데이터를 받도록 만들 수도 있다. Server로부터 메세지를 받으면 Arduino가 air conditioner을 켜는 식으로 동작이 가능하다.

  코드는 공유하지 않는다. 깃허브에 private로, MQTT Protocol Basic Code라는 레파지토리로 올려놨어.
