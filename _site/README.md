## [Blog Link](https://koreamarin.github.io/)

Jeklly 블로그 프레임워크를 사용한 개인 블로그.

---

### 테스트

1. 루비설치파일을 다운받는다. [https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)

2. 루비 설치파일을 실행하여 설치한다.

3. 설치가 다 되면 cmd installer가 뜬다. 엔터를 누르면 무언가가 설치된다.
   ![image](https://github.com/koreamarin/koreamarin.github.io/assets/110477854/db073b5b-4fc5-4a7f-84c9-4959945f5da5)

4. 레포지토리에 들어가서 CLI에서 아래 명령어 입력하여 지킬을 설치한다.

   ```
   gem install bundler jekyll
   ```

5. `bundle install` 명령어를 CLI에 입력한다.

6. CLI에 아래 명령어를 입력하면 로컬서버가 실행된다.

   ```
   bundle exec jekyll serve
   ```

   ```
   ## 자동 새로그침 기능이 있는 모드 (개발용)
   bundle exec jekyll serve --livereload
   ```

7. `localhost:4000` 으로 접속하여 로컬서버로 접속한다.

---

### 규칙

- post 파일 이름 : 연도-월-일-제목 (파일 이름은 반드시 영어로.) ex)2024-01-01-test.md
- 띄어쓰기는 공백 두개 만든 뒤 엔터.

---
