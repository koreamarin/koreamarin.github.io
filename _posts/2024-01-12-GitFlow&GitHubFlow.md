---
layout: post
title: GitFlow & GitHubFlow
description: GitFlow와 gitHubFlow에 대해 알아보는 글
date: 2024-01-12 00:00:00 +0900
categories: DevOps # Develop, Life, DevOps, Conference
comments: true
type: writing # done, writing, hide
---

gitFlow는 git branch 관리 방법이다.

branch 관리 방법으로 자주쓰이는 2가지 방법이 있는데 GitFlow와 GitHubFlow이다.
이 두가지 방법에 대해 알아보는 글을 작성하겠다.

## GitFlow

![image](https://github.com/koreamarin/koreamarin.github.io/assets/110477854/76e6f2b4-e766-4745-a759-20fa2284d4f6)

- ### 설명 : gitFlow는 5개의 주요브랜치를 사용한다.
- <span class='highlight'>main(master)</span> : 메인 브렌치이다. 상용서버로 사용하며 CI/CD환경으로 설정해두어 서비스하는데에 사용한다.
- <span class='highlight'>develop</span> : 다음 출시 버전을 개발하는 용도의 브랜치이다. 개발을 위해 상용용 브랜치인 main브랜치와 isolation을 하기 위해 사용하는 브랜치이다. develop 브랜치에서 바로 수정을 진행하진 않으며, feature 브랜치로 분기하여 feature 브랜치에서 개발을 하고, 개발된 내역을 develop 브랜치에 merge하는 형식으로 개발이 진행된다. 그리고 통합 개발이 완료되면 release브랜치에 merge시켜서 QA(Quality Assuranc, 품질검사)를
- <span class='highlight'>feature</span> : 단위 기능 개발용 브랜치이다. develop 브랜치에서 분기하여 feature 브랜치에서 단위 기능들을 개발하곤 한다. feature브랜치의 이름은 `feature/{개발하는단위기능}` 형식으로 이름을 짓는다. 단위기능개발 완료 시 develop 브랜치에 merge한다.
- <span class='highlight'>release</span> : develop에서 main 브랜치로 통합하기 전 QA(품질검사)를 진행하는 용도의 브랜치이다. develop에서 개발을 완료하면 release 브런치에 merge하여 release 브런치에서 QA를 진행한다. 그 후, 이상이 없으면 release 브런치에서 main 브런치로 marge 한다.
- <span class='highlight'>hotfixes</span> : main에서 큰 오류가 발생됐을 때, 빨리 수정하기 위한 브랜치로 사용된다. 원래 개발방식은 develop브랜치로 분기하고 feature로 분기하여 수정을 하고 release에서 QA를 거쳐 main에 통합하는 과정인데, 상용 서비스를 진행하는 main브랜치에서 심각한 오류가 발생했을 때에는 이러한 과정을 거치기에는 오류 개선과정이 너무 느리므로 빠르게 오류수정을 진행하기 위해서 hotfix브런치에서 바로 고치고 main으로 통합하는 방식으로 오류수정을 진행한다.

## GitHubFlow
