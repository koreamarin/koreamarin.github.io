---
layout: post
title: git & github 설치 및 사용방법
description: git & github 설치 및 사용방법에 대해 알아보는 글
date: 2024-01-08 00:00:00 +0900
categories: Git # Develop, Life, DevOps, Conference
comments: true
type: done # done, writing, hide
---

깃 설치방법 및 깃 관련명령어에 대해 알아보는 글

# 깃 설치방법

### Windows에 설치하기

- [https://git-scm.com/](https://git-scm.com/)에 들어가서 Download for Windows 버튼 클릭  
  ![image](/image/git & github 설치 및 사용방법1.png)
- 사용자 컴퓨터에 맞춰 Git Setup 파일 다운  
  ![image](/image/git & github 설치 및 사용방법2.png)
- 따라 설치하기  
  ![image](/image/git & github 설치 및 사용방법3.png)
  ![image](/image/git & github 설치 및 사용방법4.png)
  ![image](/image/git & github 설치 및 사용방법5.png)
  ![image](/image/git & github 설치 및 사용방법6.png)
  ![image](/image/git & github 설치 및 사용방법7.png)
  ![image](/image/git & github 설치 및 사용방법8.png)
  ![image](/image/git & github 설치 및 사용방법9.png)
  ![image](/image/git & github 설치 및 사용방법10.png)
  ![image](/image/git & github 설치 및 사용방법11.png)
  ![image](/image/git & github 설치 및 사용방법12.png)
  ![image](/image/git & github 설치 및 사용방법13.png)
  ![image](/image/git & github 설치 및 사용방법14.png)
  ![image](/image/git & github 설치 및 사용방법15.png)
  ![image](/image/git & github 설치 및 사용방법16.png)
  ![image](/image/git & github 설치 및 사용방법17.png)
  ![image](/image/git & github 설치 및 사용방법18.png)

- 커멘트창에 `git --version` 입력하여 버전이 확인되면 설치 완료  
  ![image](/image/git & github 설치 및 사용방법19.png)

### Linux에 설치하기

- `sudo apt update` 입력
- `sudo apt install git` 입력
- 커멘트창에 `git --version` 입력하여 버전이 확인되면 설치 완료

# Git 구성하기

- 사용자 이름 설정하기
  {% highlight ruby %}
  git config --global user.name [MyName]
  ex) git config --global user.name koreamarin
  {% endhighlight %}

- 사용자 이메일 설정하기
  {% highlight ruby %}
  git config --global user.name [MyEmail]
  ex) git config --global user.email awldnjs2@gmail.com
  {% endhighlight %}

- 기본 브랜치명 변경 (main으로 기본 브랜치를 변경할 때)
  {% highlight ruby %}
  git config --global init.defaultBranch main
  {% endhighlight %}

- 잘 입력 됐는지 확인하기
  {% highlight ruby %}
  git config --list
  {% endhighlight %}

# 깃에서 관리되지 않는 파일/폴더 설정하기

- 1. .gitignore 파일을 만든다.
- 2. .gitignore 파일 내용에 포함을 원치않는 파일명을 넣는다. 여러개일 경우에는 엔터를 눌러 한칸을 띄움으로서 나눠서 입력한다.
- 파일을 무시하고 싶을 때는 [파일명.확장자명]으로 작성 ex) text.txt
- 확장자를 무시하고 싶을 때는 [*.확장자명]으로 작성 ex) \*.txt
- 폴더를 무시하고 싶을 때는 [폴더명/]으로 작성 ex) conding_folder/
- 무시된 확장자지만 무시하고 싶지 않은 파일 ex) !text.txt
- logs란 이름의 파일 또는 폴더와 그 내용들 ex) logs
- logs란 이름의 폴더와 그 내용들 ex) logs/
- logs 폴더바로 안의 debug.log파일 무시 ex) logs/debug.log
- logs 폴더 안, 더 깊은 폴더안의 debug.log 파일 무시 ex) logs/\*\*/debug.log

# Git 명령어

- `git init` : 깃 레포지토리를 생성하여 깃 시작하기
- `git status` : 깃의 현재 상태 보여주기. 수정된 파일들이 커밋됐는지, 스테이징 되었는지 등의 상태를 보여줌.
- `git add text.txt` : text.txt파일을 스테이징하기
- `git add .` : 모든 파일 스테이징하기
- `git reset text.txt` : text.txt파일 스테이징 취소하기
- `git reset` : 모든 스테이징된 파일 스테이징 취소하기
- `git commit -m "commit message"` : 스테이징된 파일들을 커밋하면서 커밋메세지로 "commit message"라고 입력하기
- `git log` : 커밋된 내용들 최근 순서부터 확인하기. 종료는 q를 누르면 됨.

#### 과거로 돌아가기 깃 코드 (복구코드)

- `git reset --hard [되돌아갈 커밋 해시]` : 되돌아갈 커밋구간으로 되돌아가며, 그 때의 파일 상태로 되돌아간다.
  `git log`를 사용했을 때 볼 수 있는 commit 해시코드를 사용하여 되돌아간다.  
  해시코드는 전부를 입력하지 않아도 되고, 6~7글자정도만 입력하여도 된다.  
  다만, 되돌아간 커밋 이후의 커밋들은 삭제되어버린다.  
  따라서, 협업시 다른사람들과 공유되어 있는 경우 큰 충돌이 일어날 수 있으므로 주의해야 한다.  
  혼자 사용할 때 잘 못 커밋했을 때만 사용해야하는 명령어이다.  
  되돌리기를 취소하기가 어려우므로 조심해야하는 명령어이다.
- `git revert` [이전 커밋 해시] : 이전 커밋의 내용을 반대로 다시 커밋하는 명령어이다.  
  되돌리고싶은 이전 커밋이 text.txt 파일을 생성했던 내용이라면, revert를 사용하면 text.txt파일이 삭제되는 것이다.  
  즉, revert는 이전 커밋을 반대로 시행한다.
  revert 명령어 사용 시 vim으로 이동하여 `:wq`를 사용하여 vim을 나오면 된다.  
  revert 명령어 사용 시 커밋관리에 따라 충돌되는 파일이 나타날 수 있다.  
  이때에는 revert가 일시 중지되고, 파일을 삭제해야할지, 추가해야할지 물어보는 명령어가 나올 수 있다.  
  주로 파일을 수정하는 내역에 대해서 충돌이 일어나서 그 파일을 추가할지 삭제할지를 사용자한테 물어보곤 한다.  
  revert는 파일 수정내역에서는 되돌아가기가 잘 안되며, 파일추가, 삭제 내역을 되돌아갈때에는 잘 작동한다.  
  만약 삭제해야할 시에는 `git rm text.txt`를 하면 되며, 추가해야할 때에는 `git add test.txt`를 하면 된다.
  그 후 `git revert --continue`를 입력하면 일시중지되었던 revert가 계속 진행되어 완료된다.
- `git restore` : 특정시점으로 파일 하나를 되돌리는데 쓰는 명령어.  
  `git reset`은 이전 커밋시점으로 전체 변환되어버리는데 반해 `git restore`은 파일 하나를 커밋시점으로 되돌리는 역할을 한다.
  - 사용방법 :
    - `git restore [파일명]` : 최근 commit된 상태로 파일을 되돌린다.
    - `git restore --source [커밋해쉬명] [파일명]` : 파일을 특정 커밋해쉬명을 가진 커밋 시점으로 복구.

##### Tip

- 예전에는 `git checkout`이라는 명령어가 `git restore`과 `git switch`를 합친 명령어였다고 한다.  
  지금은 사용하지 않는 것을 권고하는 편이다.

#### Branch(분기) 만들기

- `git branch` : 현재 생성되어있는 로컬branch들 보기.
- `git branch -a` : 현재 생성되어있는 로컬 branch + 원격 branch들 보기
- `git branch develop` : 브랜치명이 develop인 브랜치 생성하기
- `git switch develop` : 브랜치명이 develop인 브랜치로 스위칭하기.(develop 브랜치로 이동.)
- `git switch -c develop` : 브랜치명이 develop인 브랜치를 생성하면서 스위칭(이동)까지 같이 하기.
- `git branch -d develop` : 브랜치명이 develop인 브랜치를 삭제한다.  
  다만, 커밋내용이 로컷저장소에만 있고 원격저장소에는 있지않다면 삭제가 불가능하다.
- `git branch -D develop` : 브랜치명이 develop인 브랜치를 강제삭제한다.  
  커밋내용이 원격저장소에 있지않고 로컬저장소에만 있는 상태이더라도 삭제가 가능하다.

#### Branch 합치기

- `git merge develop` : develop 브랜치를 main으로 합치고싶을 때 main 브랜치로 스위칭한 상태로  
   해당 명령어를 입력하면 develop브랜치를 main브랜치로 합침. 협업할 때 많이 사용됨.
  ![image](/image/git & github 설치 및 사용방법20.png)

- `git rebase main` : 현재 있는 브랜치를 main브랜치 뒤에 붙여버릴 떄 사용. (main 브랜치 아니여도 사용가능하며 main은 예시임)  
  예를 들어 develop 브랜치를 main브랜치에 뒤에 붙이고 싶을떄 develop 브랜치로 이동 후 해당명령어 뒤에 붙이고싶은 브랜치를 입력.  
  merge와의 차이점은 분기가 붙이는 브랜치 뒤에 통째로 붙어버려 분기되었던 브랜치 내역이 남지 않게 됨.  
  협업에서는 잘 쓰이지 않고, 만약 썼을 경우 깃이 꼬일 수 있으므로 혼자 Flow를 고칠때 사용하는 편이 좋음.  
  merge와는 현재 브랜치와 명령어에 들어가는 브랜치명이 반대로 쓰이므로 주의하기!!  
  브랜치가 main 뒤에 통째로 붙어버리고 브랜치가 삭제되지는 않음.  
  main 뒤에 붙이고 나서 main과 붙힌 브랜치를 merge해주어 main을 최신화시켜주고 붙혔던 브랜치는 필요가 없어졌으므로 주로 삭제시킴.  
  ![image](/image/git & github 설치 및 사용방법21.png)

#### Branch 충돌 해결하기

서로 다른 분기에서 같은 파일의 같은 줄에 수정내용이 있다면 컴퓨터는 어떤 것을 채택할지 모르므로 사람에게 충돌내용을 보여주며 넘기게 된다.
merge를 하여 충돌이 발생했을때 나타나는 메세지 중에서 Head는 현재 브랜치의 내용, incoming은 추가된 브랜치의 내용이다.

- `git merge --abort` : 충돌 내용이 손쓸수 없이 많아서 merge를 중단하고 싶을 때 사용하는 명령어. merge를 중단한다.

- `git rebase --abord` : rebase를 했을 때 충돌 내용이 손쓸수 없이 많아서 rebase를 중단하고 싶을 경우 쓰는 명령어.
- `git rebase --continue` : rebase의 충돌을 해결 한 후 쓰는 명령어.  
  충돌을 해결하고 난 후에는 `git add .`을 먼저 써서 스테이징한 후 `git rebase --continue`를 사용한다.  
  하지만 다시 충돌이 나타날 수도 있다.

#### 다른 Branch를 가져와서 내 Branch에 적용시키기(cherry pick)

다른 사람이 개발한 내역을 내 Branch에 적용해야하는 상황이 올 수 있다.  
이 때 다른 Branch의 커밋내역을 선택적으로 복사하여 내 Branch에 붙여넣는 명령어가 cherry pick이다.  
아래 이미지를 예시로 들겠다.  
아래 그림과 같은 상황이 만들어진다.  
![image](/image/git & github 설치 및 사용방법22.png)  
![image](/image/git & github 설치 및 사용방법23.png)  
그림과 같이 [76ae30ef]와 [13af32cc]를 가져와서 커밋내역을 붙여넣은 상황이다.
<br><br>
사용방법은 아래와 같다.

- 붙여넣고싶은 브랜치로 이동한다. (git switch BranchX)
- `git cherry-pick [커밋해쉬명]`을 입력한다. ex) `git cherry-pick 76ae30ef 13af332cc` 입력

##### cherry-pick 충돌 발생 시

체리픽도 병합의 과정이다보니 충돌이 발생할 수 있다.  
해결을 한 후 `git cherry-pick --continue`를 사용하여 계속 진행시키거나  
`git cherry-pick --abort`명령어로 체리픽을 하기 전으로 되돌리는 것으로 체리픽을 중단시킬 수 있다.
<br><br>

##### Tip

- 다 사용한 Branch는 `git branch -d [branchName]`을 이용해서 지워줘야 깔끔하게 사용할 수 있음.

### GitHub 관련 명령어 (원격저장소 관련 명령어)

- `git remote add [origin] [원격저장소 주소]` : 로컬의 git과 원격저장소 github와 연결하는 명령어.
  origin은 원격 저장소이름이고 다른이름으로도 사용 가능하나 흔히 origin으로 많이 사용됨.
  여러 원격저장소를 연결가능함.

- `git remote` : 현재 로컬저장소에 연결되어있는 원격저장소들의 이름을 볼 수 있음.
- `git remote -v` : 현재 로컬저장소에 연결되어있는 원격저장소들의 이름, 주소, 상태를 볼 수 있음.

- `git branch -M [main]` : GitHub 권장 - 현재 브랜치명을 main으로 바꿈. (원격저장소 관련된 명령어는 아님)

- `git clone [원격저장소 주소]` : 현재 위치에 원격저장소에 있는 레포지토리를 로컬로 불러옴.

- `git push` : 그냥 다 갖다 푸쉬해버리는거. 로컬에 있는 것들을 원격저장소로 밀어 넣는 것.(전송)
- `git push -u [origin] [main]` : 현재 로컬저장소의 브랜치를 origin 원격저장소의 main브랜치에 푸쉬하는 명령어.
- `git push --force` : 강제푸쉬. 원격과의 충돌이 일어나면 push는 안되는 것이 원칙이지만, 원격이 잘 못 되어있는 상황이라면  
  로컬의 내용을 강제 적용해버리기 위해 강제푸쉬를 사용할 수 있다. 협업간에서는 협의후에 사용해야하는 명령어이다.

- `git pull` : 원격에 있는 것들을 로컬로 당겨오는것(가져오는것).

##### Tip : 원격저장소와 로컬저장소의 충돌 발생 해결방법

- 만약 원격저장소의 text.txt파일내용과 나의 로컬 저장소의 text.txt파일내용이 동시에 바뀌어있어서 충돌이 있는 상태라면 push가 되지않는다.
- 이런 충돌이 발생했을 때에는 먼저 원격에서 pull를 해서 로컬에서 충돌을 해결한 후 push를 해 주어야 한다.
- 이 때 pull을 하려면 아래 명령어가 필요하다
- `git pull --no-rebase` : merge 방식으로 pull을 하는 방식이다.
  로컬저장소와 원격저장소가 서로 분기되어 충돌 해결 후 merge되는 방식이다.  
  ![image](/image/git & github 설치 및 사용방법24.png)
- `git pull --rebase` : rebase 방식으로 pull을 하는 방식이다.
  원격저장소를 우선적으로 채택한 후, 그 원격저장소 뒤에 나의 로컬저장소 분기를 rebase 형태로 붙여버리는 방식이다.  
  `git rebase`를 협업상황에서 사용하지 말라고 한적이 있는데, 그건 이미 공유된 상황인 branch를 rebase로 붙이지 말란 말이였고,
  pull을 할때의 rebase는 협업상황에서도 사용해도 된다고 함.  
  ![image](/image/git & github 설치 및 사용방법25.png)
- 충돌이 해결되었다면 `git push`를 하여 푸쉬한다.

#### 로컬의 서브 브랜치를 만들어서 원격저장소에 push하는방법

로컬에서 develop 브랜치를 만든 후, 원격저장소에 `git push`를 하면 오류메세지가 뜬다.
원격저장소에는 develop 브랜치가 없는데, 로컬의 develop브랜치를 원격의 어느 브랜치에 push해야할 지 모르겠다는 메세지이다.
이 때 사용하는 push명령어는 `git push -u [origin] [develop]`이다.

#### 원격의 서브 브랜치를 로컬저장소에 가져오는 방법

로컬에는 main 브랜치밖에 없고, 원격저장소에는 develop 브랜치가 생겼는데 로컬에 그 develop 브랜치를 가져오고 싶을 때 다음과 같이 사용한다.

- `git fetch` : 해당 명령어를 사용하면 원격저장소의 변경내용을 로컬로 불러와서 내용이 갱신되게 된다.
- `git switch -t [origin/develop]` : origin/develop 브랜치로 변경하겠다는 뜻인데 이와 동시에 로컬의 develop 브랜치도 생기게 된다.
  -t 옵셥이 붙으면 로컬의 develop브랜치와 원격의 develop 브랜치를 계속 서로 연결하겠다는 뜻이다.

#### 원격 브랜치 삭제

`git push [origin] --delete [원격브랜치명]` : 원격 브랜치를 삭제한다.
