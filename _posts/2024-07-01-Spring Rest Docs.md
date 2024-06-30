---
layout: post
title: Spring Rest Docs
description: Spring Rest Docs의 import 방법과 작성방법
date: 2024-07-01 00:00:00 +0000
categories: BackEnd # BackEnd, Life, DevOps, Conference
comments: true
type: writing # done, writing, hide
---

SpringBoot에서 API문서를 작성하는 도구는 대표적으로 Swagger와 Spring REST Docs가 있다.

이 글에서는 Spring REST Docs의 내용을 다룬다.

사전학습 : [🔗 SPRINGBOOT TESTCODE](</backend/2024/06/30/SpringBoot-TestCode-(TDD,-Junit,-assertJ,-mockito)/>)  
참고할 레포지토리 : [🔗 https://github.com/koreamarin/PracticalTestCode](https://github.com/koreamarin/PracticalTestCode)

## Swagger VS Spring REST Docs

| | REST Docs | Swagger |
|장점 | 1. 테스트를 통과해야 문서가 만들어진다. (신뢰도가 높음) | 1. 적용이 쉽다. |
| | 2. 프로덕션 코드에 비침투적이다. | 2. 문서에서 바로 API호출을 수행해볼 수 있다. |
| | | 3. 문서가 예쁘다. |
| | | |
|단점 | 1. 코드의 양이 많다. | 1. 프로덕션 코드에 침투적이다. |
| | 2. 설정이 어렵다. | 2. 테스트가 필수가 아니라 신뢰도가 상대적으로 낮다. |

## REST Docs + Swagger

설명 : Rest Docs의 장점과 Swagger의 장점을 합쳐 서로의 단점을 보완한 방식

#### 특징

- Swagger의 장점을 가져와 UI가 예쁘고, 웹사이트에서 API를 수행 테스트하는 것이 가능
- REST Docs의 장점을 가져와 프로덕션 코드에 비침투적이며, 테스트코드로 문서가 만들어져 신뢰성이 높음
- 설정이 어렵고 코드양이 많음.

## Spring REST API를 실행하기 위한 도구

1. asccidoctor : asccidoc으로 작성한 것을 html파일로 변환해주는 도구. asccidoctor까지 의존성 주입을 해야함.
2. AsciiDoc PlugIn : ascci으로 작성한 문법을 미리보기 또는 브라우저에서 보는 기능을 지원

## Spring REST API의 작동방식

1. 문서용 테스트코드를 작성한다. controller에 대한 설명, request, response에 대한 것들을 작성한다.
2. 테스트를 수행하면 테스트 결과에 대한 코드 조각 파일인 test에 대한 adoc파일이 나온다.
3. 이 test에 대한 adoc파일에는 request, response 형식과 api endpoint와 controller를 작동하기 위한 값들이 명시되어있다.
4. 이 코드 조각들을 형식에 맞게 하나로 합치는 index.adoc파일이 있다.
5. index.adoc파일을 asccidoctor가 html로 변환해준다.
6. index.html을 브라우저로 보면 문서화된 API 문서를 볼 수 있다.
7. jar파일을 실행시켜서 <http://localhost:8080/docs/index.html> 링크로 들어가서도 볼 수 있다. 배포가능한 문서인 것이다.

## Spring REST API의 import 방법

### build.gradle

```
plugins {
 id 'java'
 id 'org.springframework.boot' version '3.3.0'
 id 'io.spring.dependency-management' version '1.1.5'
 id 'org.asciidoctor.jvm.convert' version '3.3.2'  // asciidoctor에 대한 플러그인 추가
}

group = 'sample'
version = '0.0.1-SNAPSHOT'

java {
 sourceCompatibility = '17'
}

configurations {
 compileOnly {
  extendsFrom annotationProcessor
 }
 asciidoctorExt  // asciidoctor에 대한 의존성 추가
}

repositories {
 mavenCentral()
}

dependencies {
 // spring boot
 implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
 implementation 'org.springframework.boot:spring-boot-starter-web'
 implementation 'org.springframework.boot:spring-boot-starter-validation'

 // lombok
 compileOnly 'org.projectlombok:lombok'
 annotationProcessor 'org.projectlombok:lombok'

 // h2
 runtimeOnly 'com.h2database:h2'

 // test
 testImplementation 'org.springframework.boot:spring-boot-starter-test'

 // Guava
 implementation("com.google.guava:guava:33.2.1-jre")

 // RestDocs
 asciidoctorExt 'org.springframework.restdocs:spring-restdocs-asciidoctor'
 testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'
}

tasks.named('test') {
 useJUnitPlatform()
}

ext { // 전역 변수
 /*
   snippetsDir 전역 변수를 추가하여 build/generated-snippets 디렉토리를 생성.
   빌드를 실행하면 build/generated-snippets 디렉토리가 생성되고 테스트 결과 문서가 나오면 이 디렉토리에 저장됨
  */
 snippetsDir = file('build/generated-snippets')
}

test { // 테스트 실행 시 snippetsDir 디렉토리를 생성. 이 디렉토리에 테스트 결과 문서가 저장됨
 outputs.dir snippetsDir
}

asciidoctor {
 /*
  asciidoctor 작업을 실행할 때 snippetsDir 디렉토리를 참조하도록 설정
  asciidoctor 작업을 실행하면 test 작업이 먼저 실행되고, test 결과가 snippetsDir 디렉토리에 저장됨
  그리고 asciidoctor 작업이 실행되고, asciidoctor가 snippetsDir 디렉토리에 있는 테스트 결과 문서를 참조하여 문서를 생성함
  그 문서는 static/docs 디렉토리에 저장됨
  */
 inputs.dir snippetsDir
 configurations 'asciidoctorExt'

 sources { // 특정 파일만 html로 만듦. index.adoc 파일만 html로 만듦
  include("**/index.adoc")
 }
 baseDirFollowsSourceFile() // 다른 adoc 파일을 include할 때, include할 파일의 경로를 baseDir로 설정하여 include할 파일을 찾을 수 있도록 함
 dependsOn test // asciidoctor 작업은 test 작업이 선행되어야 함. test 작업이 끝나면 asciidoctor 작업이 실행됨. 의존성이 있다는 것을 명시
}

bootJar {
 dependsOn asciidoctor // asciiDoctor 작업이 선행되어야 함. asciiDoctor 작업이 끝나면 bootJar 작업이 실행됨. 의존성이 있다는 것을 명시
 from("${asciidoctor.outputDir}") {
  into 'static/docs'
 }
}
```

1. plugins에 id 'org.asciidoctor.jvm.convert' version '3.3.2' 추가
2. configurations에 asciidoctorExt 추가
3. dependencies에 asciidoctorExt 'org.springframework.restdocs:spring-restdocs-asciidoctor'추가
4. dependencies에 testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc' 추가
5. ext에 snippetsDir = file('build/generated-snippets') 추가
6. test에 outputs.dir snippetsDir 추가
7. asciidoctor에 대한 내용들 추가
8. bootJar에 대한 내용 추가

- 자세한 사항은 해당하는 주석 읽어보기

## Spring REST API의 작성 코드

- RestDocsSupport파일과 ProductControllerDocsTest파일 참고
- ProductControllerDocsTest파일은 Product Domain을 테스트한 후, API문서화용도로 만든 파일이다.
- ProductControllerDocsTest파일은 기존에 만들어뒀던 Product domain의 controllerTest파일에서 가장 기본이 되는 테스트 메서드를 가져온 것이며, 기존 테스트코드와 다른점은 response를 정의해줬다는점과, request, response에 대한 설명을 달아줬다는 점이 있다.

### ProductControllerDocsTest.java

```
package sample.cafekiosk.spring.docs.product;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import sample.cafekiosk.spring.api.controller.product.ProductController;
import sample.cafekiosk.spring.api.controller.product.request.ProductCreateRequest;
import sample.cafekiosk.spring.api.service.product.ProductService;
import sample.cafekiosk.spring.api.service.product.request.ProductCreateServiceRequest;
import sample.cafekiosk.spring.api.service.product.response.ProductResponse;
import sample.cafekiosk.spring.docs.RestDocsSupport;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static sample.cafekiosk.spring.domain.product.ProductSellingStatus.SELLING;
import static sample.cafekiosk.spring.domain.product.ProductType.HANDMADE;

public class ProductControllerDocsTest extends RestDocsSupport {

    private final ProductService productService = mock(ProductService.class);

    @Override
    protected Object initController() {
        return new ProductController(productService);
    }

    @DisplayName("신규 상품을 등록하는 API")
    @Test
    void createProduct() throws Exception {
        ProductCreateRequest request = ProductCreateRequest.builder()
                .type(HANDMADE)
                .sellingStatus(SELLING)
                .name("아메리카노")
                .price(4000)
                .build();

        given(productService.createProduct(any(ProductCreateServiceRequest.class)))
                .willReturn(ProductResponse.builder()   // 문서에서 보여주고 싶은 response 객체를 만들어줌. type에 맞는 아무 값이나 넣어도 됨.
                        .id(1L)
                        .productNumber("001")
                        .type(HANDMADE)
                        .sellingStatus(SELLING)
                        .name("아메리카노")
                        .price(4000)
                        .build()
                );

        mockMvc.perform(
                        post("/api/v1/products/new")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())       // 자세한 로그 볼때 쓰는 함수. 꼭 안써도 되긴함
                .andExpect(status().isOk())
                .andDo(document("product-create",
                        preprocessRequest(prettyPrint()),   // 문서의 request 부분을 예쁘게 출력해줌. json이 정렬되어 출력됨.
                        preprocessResponse(prettyPrint()),  // 문서의 response 부분을 예쁘게 출력해줌. json이 정렬되어 출력됨.
                        requestFields(  // request의 필드들을 문서화
                                // type 필드에 대한 문서화. type은 HANDMADE, MACHINE이라는 enum값을 가지고, STRING 타입이다.
                                fieldWithPath("type").type(JsonFieldType.STRING)
                                        .description("상품 타입"),
                                fieldWithPath("sellingStatus").type(JsonFieldType.STRING)
                                        .optional()
                                        .description("상품 판매상태"),
                                fieldWithPath("name").type(JsonFieldType.STRING)
                                        .description("상품 이름"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER)
                                        .description("상품 가격")
                        ),
                        responseFields( // response의 필드들을 문서화
                                // ApiResponse는 code, status, message, data라는 필드를 가지고 있다.
                                fieldWithPath("code").type(JsonFieldType.NUMBER)
                                        .description("코드"),
                                fieldWithPath("status").type(JsonFieldType.STRING)
                                        .description("상태"),
                                fieldWithPath("message").type(JsonFieldType.STRING)
                                        .description("메세지"),
                                fieldWithPath("data").type(JsonFieldType.OBJECT)
                                        .description("응답 데이터"),
                                fieldWithPath("data.id").type(JsonFieldType.NUMBER)
                                        .description("상품 ID"),
                                fieldWithPath("data.productNumber").type(JsonFieldType.STRING)
                                        .description("상품 번호"),
                                fieldWithPath("data.type").type(JsonFieldType.STRING)
                                        .description("상품 타입"),
                                fieldWithPath("data.sellingStatus").type(JsonFieldType.STRING)
                                        .description("상품 판매상태"),
                                fieldWithPath("data.name").type(JsonFieldType.STRING)
                                        .description("상품 이름"),
                                fieldWithPath("data.price").type(JsonFieldType.NUMBER)
                                        .description("상품 가격")
                        )
                ));
    }
}

```

## 커스텀하기 위해 설정해야할 adoc문서 파일과 snippet파일

- 레파지토리에서 index.adoc, product.adoc, request-fields.snippet, response-fields.snippet 파일 참고
- index.adoc는 root파일. asccidoctor가 index.adoc파일을 읽어서 index.html을 만들어 줆
- product.adoc는 product Domain에 관한 API가 문서화 되어있음.
- request-fields.snippet파일은 DocsTest코드 수행 시 출력되는 request-fields.adoc이 어떻게 출력되게 할 것인가를 설정해주는 커스텀 파일이다. 여기에서는 옵션 그리드를 추가하는데 사용하였다.
- response-fields.snippet파일은 DocsTest코드 수행 시 출력되는 response-fields.adoc이 어떻게 출력되게 할 것인가를 설정해주는 커스텀 파일이다. 여기에서는 옵션 그리드를 추가하는데 사용하였다.

결론 : snippet파일은 testDocs로 부터 나오는 결과물들을 커스텀하는 용도의 파일이고, adoc파일들의 조합으로 index.adoc이 만들어지며, index.adoc이 index.html이 되고, 그게 API 문서파일이 된다.

## 실행방법

### 테스트 코드 수행결과 adoc만 출력하기

- DocsTest 클래스를 실행하면 코드 수행결과인 adoc 파일이나온다. asccidoctor가 실행되지 않았으므로 index.html은 만들어지지 않는다.

### index.html파일 만들어서 API파일 완성하기

1. gradle의 build에서 clean을 한번 눌러서 build파일을 깔끔하게 한번 싹 지운다.
2. gradle의 documentation/asccidoctor 또는 build/build를 실행하면 asciidoctor가 실행되어 index.html이 나온다.
3. index.html을 직접 브라우저에서 열거나, `java -jar 파일명.jar`을 통해 jar파일을 실행시킨 후, <http://localhost:8080/docs/index.html>에 들어가서 API문서를 연다.
