---
layout: post
title: 손글씨 인식 API (Myscript)
description: 손글씨 인식 API (Myscript)에 대한 소개
date: 2024-03-10 00:00:00 +0000
categories: AI # Develop, Life, DevOps, Conference, BackEnd, AI, Etc
comments: true
type: done # done, writing, hide
---

한줄설명 : Myscript라는 회사에서 제공하는 API이며, handwriting text를 text로 변환시켜주는 API이다.

- API Document : [https://developer.myscript.com/](https://developer.myscript.com/)
- Myscript의 참고용 github : [https://github.com/MyScript/iinkTS?tab=readme-ov-file](https://github.com/MyScript/iinkTS?tab=readme-ov-file)
- 손글씨 인식 서버 : [https://cloud.myscript.com/](https://cloud.myscript.com/)

### 내용 정리

- **모델 설명**
  - Myscript라는 회사에서 제공하는 API이며, handwriting text를 text로 변환시켜주는 API이다.
  - 다른 모델과의 다른점은 다른 모델은 글 쓰기를 모두 완료한 이미지를 전송하여 text를 추출하였다면, Mysciprt 모델은 글쓰기를 완료한 이미지를 인식하는 것이 아닌, 글쓰기를 하는 도중에 글씨를 인식한다.
- 모델의 방식
  - 여러 플랫폼에서 동작하지만 Web에 대한 설명만 기술함.
  - 클라이언트에서 손글씨를 작성하면 손글씨의 연속된 좌표값들이 Myscript Cloud Server에 전송된다.
  - Myscript Cloud Server에서는 클라이언트에게 받은 좌표값들을 토대로 손글씨를 인식하고, 인식된 Text를 Client에 반환한다.
  - Myscript Cloud Server와 통신하는 방식은 총 2가지로, Web socket 방식과 REST API 방식이 있다.
  - Web socket 방식은 원할한 데이터전송으로 인식 응답 속도가 높다. 다만 좋은 네트워크환경이 필요하다.
- 사용방법
  - https://developer.myscript.com/getting-started 사이트에서 Myscript Cloud Server에 접근하기위한 인증키를 발급받는다.
  - [Myscript API Document](https://developer.myscript.com/docs/interactive-ink/2.3/overview/about/)와 예시 코드가 있지만 너무 잘 작동이 안되어서, 내게 필요한 element만 남긴 예시코드를 만들었다.
  - 내가 만든 예시코드 : [https://github.com/koreamarin/Myscript_handwritingTotextAPI.git](https://github.com/koreamarin/Myscript_handwritingTotextAPI.git)
  - 예시코드를 다운받고 index.html에 발급받은 Key를 입력한다.
  - Live server를 통해 실행시키고, 브라우저에 손글씨를 입력하면 잘 작동한다. 내가 만든 예시코드에서는 영어만되며, 실제로는 다른 언어로 설정이 가능하다.
  - 다른 색상, 노트 라인 등의 커스텀이 가능하다. API문서를 참고하기 바란다.
