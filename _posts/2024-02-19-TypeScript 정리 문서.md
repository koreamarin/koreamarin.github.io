---
layout: post
title: TypeScript 정리 문서
description: TypeScript를 공부한 내용을 정리한 문서
date: 2024-02-19 00:00:00 +0900
categories: FrontEnd
comments: true
type: done
---

TypeScript를 공부한 내용을 정리한 글 입니다.

참고 사이트 1: [https://www.opentutorials.org/course/5080](https://www.opentutorials.org/course/5080)

참고 사이트 2: [https://nomadcoders.co/typescript-for-beginners](https://nomadcoders.co/typescript-for-beginners)

- 타입스크립트는 자바스크립트에서 일어나는 버그들을 보완한 언어이다.
- 타입스크립트는 자바스크립트가 잡아내지 못하는 오류들을 상당 부분 잡아주어 개발에 도움을 준다.
- 타입스크립트를 컴파일하면 오류가 없는 자바스크립트 코드가 나온다.
- 타입스크립트를 컴파일하면 어셈블리언어나 2진코드가 나오지 않고, 자바스크립트가 나오는 이유는 타입스크립트는 애초에 자바스크립트의 안정성과 디버깅 성능 보완하기 위해 만들어졌고, 브라우저가 자바스크립트 코드밖에 읽을 수 없기 때문에 오류가 없는 자바스크립트 코드를 주는 것이다.

---

# 데이터 타입

### **기본 데이터 타입**

- `number`: 숫자 타입으로, 정수와 실수를 포함합니다.
- `string`: 문자열 타입입니다.
- `boolean`: 참(true)과 거짓(false)을 나타내는 불리언 타입입니다.
- `null`: 값이 없음을 나타내는 타입입니다.
- `undefined`: 값이 할당되지 않은 변수의 기본값인 타입입니다.

### **객체 타입**

- `object`: 객체를 나타내는 타입입니다.
- `array`: 동일한 타입의 요소를 가진 배열을 나타내는 타입입니다.
- `tuple`: 각 요소가 다른 타입을 가질 수 있는 배열을 나타내는 타입입니다. (TS 전용)

### **특수 타입**

- `any`: 어떠한 타입이든 할당될 수 있는 타입입니다. (TS 전용)
- `unknown`: 타입을 미리 알 수 없는 경우에 사용되는 타입입니다. 이 타입은 안전한 타입 검사를 위해 사용됩니다. (TS 전용)
- `never`: 절대 발생하지 않는 값의 타입을 나타냅니다. 예를 들어, 함수가 항상 예외를 발생시키거나 무한 루프를 실행할 때 이 타입을 사용할 수 있습니다. (TS 전용)
  ```tsx
  function hello(): never {
    throw new Error("xxx");
  }
  ```
- `void` : 함수가 아무것도 반환하지 않을때 쓰는 타입.
  ```tsx
  function hello(): void {
    console.log("a");
  }
  ```

---

# 변수

- 타입스크립트는 변수에 대한 타입을 지정해 줄 수 있어 오류해결에 도움을 줄 수 있다.
  꼭 타입을 지정해줄 필요는 없으며, 타입을 지정해주지 않아도 알아서 타입을 추정한다.

  ````tsx
  let a : number = 1;
  let b : string = "ㅎㅇ"
  let c : boolean = true

  // array
  let A : number[] = [1,2]
  let B : string[] = ["ㅎㅇ", "ㅂㅇ"]
  let C : boolean[] = [true, false]
  ```

  ````

- 해쉬맵(딕셔너리 비슷한거)

  ```tsx
  // alias 쓴거
  type Words = {
    [key: string]: string;
  };

  let dict: Words = {
    potato: "food",
  };

  // alias 안쓴거
  let dict2: {
    [key: string]: string;
  } = {
    potato: "food",
  };
  ```

---

# 객체타입

- 오브젝트를 생성하여 내부에 변수의 타입을 지정해 줄 때는 아래와 같이 작성하여 타입을 지정한다.
  ```tsx
  const player: {
    name: string;
    age: number;
  } = {
    name: "nico",
    age: 10,
  };
  ```
- 오브젝트 내부에 변수의 타입만 지정해주고 값을 지정해주지 않을 때에는 변수명 뒤에
  물음표(?)를 붙여준다. 해당 변수를 지정해주거나 지정해주지 않아도 되는 옵션형태가 되는 것이다.
  `tsx
const player : {
    name : string,
    age? : number
} = {
    name : "nico"
}
`
- 만약 타입구조가 똑같은 오브젝트를 만들때에는 아래와 같이 객체 타입을 따로 작성하여 타구조가 똑같은 오브젝트를 여러번 만들 수 있다.

  ```tsx
  // 비효율적인 작성 방식

  const playerNico: {
    name: string;
    age?: number;
  } = {
    name: "nico",
  };

  const playerLynn: {
    name: string;
    age?: number;
  } = {
    name: "Lynn",
  };
  ```

  ```tsx
  // 효율적인 작성 방식 (객체 타입을 따로 지정) - Type aliases라고 한다.

  type Player = {
    // 객체 타입을 선언할 떄에는 맨 앞글자가 대문자이어야함.
    name: string;
    age?: number;
  };

  const nico: Player = {
    // 변수의 타입이 Player 타입이다.
    name: "nico",
  };

  const lynn: Player = {
    name: "Lynn",
    age: 12,
  };
  ```

---

# 함수 사용법

### 1. 매개변수와 반환 값의 데이터 타입 지정

- 매개변수의 타입과 반환값의 타입을 지정할 때 사용하는 방식.

```tsx
function add(a: number, b: number): number {
  return a + b;
}
```

### **2. 선택적 매개변수 사용하기**

- 매개변수를 선택적으로 받을 수 있게 만들고 싶을 떄에는 매개변수 뒤에 ‘?’를 사용한다.
- 아래 코드는 매개변수를 name 한개만 써도 되는 것이다.

```tsx
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  } else {
    return `Hello, ${name}!`;
  }
}

greet("gd");
```

### 3. Allow 함수

```tsx
const PlayerMaker = (name: string): number => 1;
```

---

# Call Signatures

```tsx
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

### Overloading

- Call Signatures가 여러개일 때 타입과 인자, 리턴 타입이 다를때의 경우에 따라 함수를 다르게 사용할 수 있다.

```tsx
type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};
```

```tsx
type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path, config.state);
  }
};
```

```tsx
type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add: Add = (a, b, c?) => {
  if (c) return a + b + c;
  return a + b;
};

add(1, 2);
add(1, 2, 3);
```

---

# 타입의 사용법

## **Type Aliases**

- 타입에 별칭을 붙여 사용할 수도 있다. 구조가 복잡한 변수의 경우 커스텀된 변수지정도 가능하다.

### **1. 원시 데이터 타입의 별칭**

```tsx
type Age = number;
const myAge: Age = 30;
```

### **2. Array와 Tuple, 객체, 함수에 적용한 사례**

```tsx
// Array
type Names = string[];
const myFriends: Names = ["Alice", "Bob", "Charlie"];

// Tuple
type Coordinates = [number, number];
const myLocation: Coordinates = [37.7749, -122.4194];

// 객체
type User = {
  id: string;
  name: string;
  age: number;
};
const user: User = { id: "1", name: "John Doe", age: 28 };

// 함수
type GreetingFunction = (name: string) => string;
const greet: GreetingFunction = (name) => `Hello, ${name}!`;
```

### **3. 좀 더 복잡한 형태 (굳이 이렇게까지 복잡하게 사용하진 않는다)**

```tsx
type UserID = string;
type UserName = string;
type Age = number;

type User = {
  id: UserID;
  name: UserName;
  age: Age;
};

const user: User = { id: "1", name: "John Doe", age: 28 };
```

## 타입의 또 다른 사용법

- 아래와 같이 타입에 변수타입을 지정하지 않고 값을 넣고 사용할 수도 있다.
- 아래와 같은 경우에서는 Team type을 사용하는 변수는 red, blue, yellow밖에 사용하지 못한다.
  Health type을 사용하는 변수는 1,5,10으로만 값을 가질 수 있다.

```tsx
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

type Player = {
  nickname: string;
  team: Team;
  health: Health;
};

const nico: Player = {
  nickname: "nico",
  team: "red",
  health: 10,
};
```

## ReadOnly

- readOnly속성을 부여하면 그 변수는 읽기만 가능하고, 값을 바꾸려고 할 때 Typescript가 막아준다.

```tsx
type Player = {
	readonly name:string,
	age?:number
}

---------

const numbers: readonly number[] = [1];
```

## Polymorphism(다형성)

제네릭은 React.js에서 많이 사용된다고 한다.

- Generics : 매개변수와 리턴타입에 선언하면 알아서 타입찾아줌.

  ```tsx
  type SuperPrint = {
    <T>(arr: T[]): T;
  };

  const superPrint: SuperPrint = (arr) => arr[0];

  const a = superPrint([1, 2, 3, 4]);
  const b = superPrint([true, false, true]);
  superPrint(["a", "b", "c"]);
  superPrint([1, 2, true, false]);
  superPrint([1, 2, true, false, "hello"]);
  ```

- 매개변수가 여러개라면 아래와 같이 제네릭을 여러개 쓰면 된다.

  ```tsx
  type SuperPrint = {
    <T, M>(arr: T[], b: M): T;
  };

  const superPrint: SuperPrint = (arr) => arr[0];

  const a = superPrint([1, 2, 3, 4], "X");
  const b = superPrint([true, false, true], true);
  superPrint(["a", "b", "c"]);
  superPrint([1, 2, true, false]);
  superPrint([1, 2, true, false, "hello"]);
  ```

- alias를 쓰지않고 그냥 함수로만으로도 쓸 수 있다.

  ```tsx
  function superPrint<T>(a: T[]): T {
    return a[0];
  }

  const a = superPrint([1, 2, 3, 4]);
  const b = superPrint([true, false, true]);
  superPrint(["a", "b", "c"]);
  superPrint([1, 2, true, false]);
  superPrint([1, 2, true, false, "hello1"]);
  ```

---

# Classes(객체지향 코드 작성)

## 기본적인 작성 방법 및 추상클래스(abstract)

아래 코드는 추상클래스와 상속받은 모습, 인스턴스 생성방법등을 보여주고 있다.

- public : 어디에서나 호출 가능
- private : 선언한 클래스 내부 이외에서는 호출 불가.
- protected : 선언한 클래스와 그 클래스를 상속받은 클래스에서만 사용 가능.

- 클래스 작성 예

  ```tsx
  abstract class User {
    // 추상클래스.
    constructor(
      // 추상메서드 선언 시 필요한 매개변수 구조 선언
      private firstName: string,
      protected lastName: string,
      public nickname: string
    ) {}

    // 추상메서드. 추상메서드는 상속받은 클래스에서 반드시 구현해야함.
    abstract getNickName(): void;

    getFullName() {
      // 메서드는 private로 외부에서 호출불가.
      return "${this.firstName} ${this.lastName}";
    }
  }

  class Player extends User {
    // User 추상클래스를 상속받은 클래스.
    getNickName() {
      // 추상메서드는 반드시 구현해야하므로 구현함.
      console.log(this.lastName);
    }
  }

  const nico = new Player("nico", "las", "니꼬"); // 클래스 생성.

  nico.getFullName(); // 메서드가 public이므로 접근 가능.
  ```

- 다른 예

  ```tsx
  type Words = {
    [key: string]: string;
  };

  class Dict {
    private words: Words;
    constructor() {
      this.words = {};
    }
    add(word: Word) {
      // 클래스를 타입처럼 사용할 수 있음. word는 Word클래스의 인스턴스가 됨.
      if (this.words[word.term] === undefined) {
        this.words[word.term] = word.def;
      }
    }
    def(term: string) {
      return this.words[term];
    }
  }

  class Word {
    constructor(public term: string, public def: string) {}
  }

  const kimchi = new Word("kimchi", "한국의 음식");

  const dict = new Dict();

  dict.add(kimchi);
  dict.def("kimchi");
  ```

- 추상 클래스와 추상클라스를 상속받아 사용하는 클래스의 다른 예

  ```tsx
  abstract class User {
    constructor(protected firstName: string, protected lastName: string) {}
    abstract sayHi(name: string): string;
    abstract fullName(): string;
  }

  class Player extends User {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }
  ```

## Interface (인터페이스)

### interface와 type의 차이점에 대해 알아보기

인터페이스는 객체의 형태를 정해주는 것이다. 타입도 변수들의 타입을 정해주는 역할을 하는데 인터페이스와 타입이 뭐가 다른지 알아보자.

아래의 Player type을 인터페이스 형태로 바꿀 수 있다.

```tsx
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

type Player = {
  // type을 사용하여 객체의 형태를 지정하는 코드
  nickname: string;
  team: Team;
  health: Health;
};

const nico: Player = {
  nickname: "nico",
  team: "red",
  health: 10,
};
```

```tsx
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

interface Player {
  // 인터페이스를 사용하여 객체의 형태를 지정하는 코드
  nickname: string;
  team: Team;
  health: Health;
}

const nico: Player = {
  nickname: "nico",
  team: "red",
  health: 10,
};
```

인터페이스는 오브젝트의 모양을 특정해주기 위한 용도로 사용된다.

React.js에서 많이 사용된다고 한다.

타입을 지정해주기 위한 용도로는 type 형태가 할 수 있는 것이 더 많으며,

인터페이스는 오로지 오브젝트의 모양을 특정해누는 역할로만 사용되는 것이다.

인터페이스는 아래와 같은 것들은 못 하는 것이다.

```tsx
type Team = "red" | "blue" | "yellow"
type Health = 1 | 5 | 10
type name = string

// 타입을 인터페이스로 바꿈. 근데 인터페이스는 위에것들 못함

interface Team { "red" | "blue" | "yellow" }   // 인터페이스는 이런거 못함
interface Health { 1 | 5 | 10 }                // 인터페이스는 이런거 못함
interface name { string }                      // 인터페이스는 이런거 못함
```

인터페이스 to type 의 형태중에서 아래 코드도 참고하길 바란다. 이런식으로도 바꾸기가 가능하다.

```tsx
// 인터페이스를 상속받는 인터페이스를 상속받는 객체
interface User {
  name: string;
}

interface Player extends User {}

const nico: Player = {
  name: "nico",
};

// 아래와 같이 타입으로 바꾸기도 가능
// 타입값을 받아 타입을 앤드연산자로 합쳐서 사용하는 타입을 사용하는 객체
type User = {
  name: string;
};

type Player = User & {};

const nico: Player = {
  name: "nico",
};
```

인터페이스는 여러개의 같은 이름을 가진 인터페이스가 있을 때 타입스크립트가 하나로 합쳐주므로 상속받는 객체는 인터페이스에 사용되는 형태를 모두 만족해야 한다.

```tsx
interface User {
  name: string;
}

interface User {
  lastName: string;
}

interface User {
  health: string;
}

const nico: User = {
  name: "nico",
  lastName: "rara",
  health: "good",
};
```

### 결론 : 객체의 형태를 다룰때에는 타입이나 인터페이스 둘 다 사용 가능하나, 객체의 형태를 다를때에는 인터페이스를 사용하는게 더 깔끔해 보인다고 한다!

### 인터페이스 사용방법

아래 코드는 추상클래스를 인터페이스로 바꾸는 방법을 예를들어서 인터페이스 사용방법을 설명한다.
인터페이스를 상속받을때에는 extends가 아니라 implements를 사용한다.

- 추상메서드에서는 변수를 protedted 또는 private로 사용할 수 있는데, 인터페이스에서는 public으로밖에 사용하지 못한다.

  ```tsx
  // 추상클래스
  abstract class User {
    constructor(protected firstName: string, protected lastName: string) {}
    abstract sayHi(name: string): string;
    abstract fullName(): string;
  }

  class Player extends User {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }
  ```

  ````

  ```tsx
  interface User {
      firstName:string,
      lastName : string,
      sayHi(name:string):string,
      fullName():string
  }

  class Player implements User {
      constructor(
          public firstName:string,
          public lastName:string
      ){}
      fullName(){
          return `${this.firstName} ${this.lastName}`
      }

      sayHi(name:string) {
          return `Hello ${name}. My name is ${this.fullName()}`
      }

  }
  ````

- 인터페이스 2개 이상을 동시에 상속받을 때

  ```tsx
  interface User {
    firstName: string;
    lastName: string;
    sayHi(name: string): string;
    fullName(): string;
  }
  interface Human {
    health: number;
  }

  class Player implements User, Human {
    constructor(public firstName: string, public lastName: string, public health: number) {}
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    sayHi(name: string) {
      return `Hello ${name}. My name is ${this.fullName()}`;
    }
  }
  ```

- 이미 앞서 한번 본 형태이지만 다시 한번 언급한다.
  인터페이스는 클래스가 상속받는 형식으로도 사용할 수 있고, 객체변수의 type을 지정하는형태로도 사용 가능하다.

  ````tsx
  interface User {
  firstName:string,
  lastName : string,
  sayHi(name:string):string,
  fullName():string
  }
  interface Human {
  health:number
  }

      // 함수의 인자 타입을 User 인터페이스로 지정.
      // 반환 타입도 User 인터페이스로 지정.
      function makeUser(user:User) : User{
          return {    // 반환타입이 User 인터페이스 형태가 되게끔 반환.
              firstName:"nico",
              lastName:"las",
              fullName: () => "x",
              sayHi: (name) => "string"
          }
      }

      // 함수의 인자 타입이 User 인터페이스이므로, 형태에 맞게 작성
      makeUser({
          firstName:"nico",
          lastName:"las",
          fullName: () => "x",
          sayHi: (name) => "string"
      })

      // 객체형태의 변수에 User 인터페이스를 타입으로 지정
      const asdf : User = {
          firstName:"nico",
          lastName:"las",
          fullName: () => "x",
          sayHi: (name) => "string"
      }
      ```
  ````

---

# Polymorphism, Generic, Class, Interface를 모두 합친 형태

```tsx
interface SStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();
stringsStorage.get("key");
stringsStorage.set("hello", "how are you");

const booleansStorage = new LocalStorage<boolean>();
booleansStorage.get("xxx");
booleansStorage.set("hello", true);
```

---

# node.js에서 Typescript

## node.js에서 Typescript 시작하기

1. cmd에 `npm init -y`을 입력하면 node.js프로젝트가 시작되며 package.json 파일이 생성됨.
   - package.json (아래와 같이 입력하기, 버전은 2번을 거친 후 알아서)
     ```json
     {
       "name": "typescript-practice",
       "version": "1.0.0",
       "description": "",
       "scripts": {
         "build": "tsc",
         "start": "node build/index.js"
       },
       "keywords": [],
       "author": "",
       "license": "ISC",
       "devDependencies": {
         "typescript": "^5.3.3"
       }
     }
     ```
     - `"build": "tsc"` : `npm run build` 명령어를 사용하면 컴파일러 `tsc`를 실행하여 ts코드를 js코드로 변환함
     - `"start": "node build/index.js"` : npm start 명령어를 사용하면 build 폴더의 index.js 파일을 시작함.
2. `npm i -D typescript`를 입력하여 타입스크립트를 설치.
3. `touch tsconfig.json`를 입력하여 아래 파일을 생성함.
   - tsconfig.json
     ```json
     {
         "include": ["src"],      => src 폴더에 빌드할 파일들이 있다는 것을 알려줌.
         "compilerOptions": {     => 컴파일 옵셜. 어떻게 컴파일 할 것인가를 설정함
             "outDir": "build",   => 컴파일된 파일을 어디에 저장할 것인지 설정.
             "esModuleInterop":true,
     				"target": "ES6",     => 어떤 버전으로 컴파일 할 것인지 설정
             "lib": ["ES6", "dom"],=> 컴파일러가 어떤 버전을 읽을 수 있게할 것인지 설정.
     				"strict": true     => 더욱 타입스크립트가 오류를 잘 잡아줌. 성가시기도 함.
     			  "allowJs":true   => 컴파일러가 JS코드를 읽게 할 것인지 설정.
     		}
     }
     ```
4. `npm run build` 를 하면 src폴더 안에 있는 .ts파일이 build폴더안에 .js파일로 변환된다.

## Declaration Files (JS 라이브러리를 TS에서 사용하는 방법)

타입스크립트에서 자바스크립트의 라이브러리를 사용하기 위해서는
자바스크립트 라이브러리 안에 있는 함수들의 인자 타입과 return 타입이 무엇인지 정의해야한다.
이것을 정의한 파일이 `.d.ts` 파일이다.
많은 자바스크립트 라이브러리는 이미 정의되어있으며, 사용자가 직접만든 자바라이브러리 파일을 타입스크립트에서 사용하기 위해서는 직접 `.d.ts` 파일을 만들어 사용해야한다.

아래와 같은 구조가 필요하다.

- index.ts (자바스크립트 라이브러리를 사용하려는 ts파일)

  ```tsx
  import { init, exit } from "myPackage";

  init({
    url: "true",
  });

  exit(1);
  ```

- myPackage.js (사용자 정의 자바스크립트 라이브러리)

  ```jsx
  export function init(config) {
    return;
  }

  export function exit(code) {
    return code + 1;
  }
  ```

- myPackage.d.ts (자바스크립트 라이브러리의 타입을 정의한 파일)

  ```jsx
  interface Config {
      url: string;
  }

  declare module "myPackage" {
      function init(config: Config): boolean;
      function exit(code: number): number;
  }
  ```

## JSDoc

- JSDoc을 사용하면 자바스크립트파일에 타입을 지정하여 타입스크립트가 오류 문법은 없는지 확인해준다. 또한 JSDoc이 명시된 자바스크립트파일은 타입이 지정되어 있기에 타입스크립트가 Declaration File없이 사용할 수 있다.
- 주석을 사용하여 타입을 지정해주기 때문에 브라우저에서도 잘 돌아가는 코드이며, node.js 상에서는 타입스크립트의 보호를 받는 코드가 된다.
- **핵심은 세가지이다. `allowJs":true` 와 `// @ts-check` 와 `함수 위 코멘트` 이다.**

1. tsconfig.json 파일에 `"allowJs":true` 를 추가한다. 타입스크립트에서 자바스크립트를 읽겠다는 뜻이다.

   ```json
   {
       "include": ["src"],      => src 폴더에 빌드할 파일들이 있다는 것을 알려줌.
       "compilerOptions": {     => 컴파일 옵셜. 어떻게 컴파일 할 것인가를 설정함
           "outDir": "build",   => 컴파일된 파일을 어디에 저장할 것인지 설정.
           "esModuleInterop":true,
           "target": "ES6",     => 어떤 버전으로 컴파일 할 것인지 설정
           "lib": ["ES6", "dom"],=> 컴파일러가 어떤 버전을 읽을 수 있게할 것인지 설정.
           "strict": true     => 더욱 타입스크립트가 오류를 잘 잡아줌. 성가시기도 함.
           "allowJs":true   => 컴파일러가 JS코드를 읽게 할 것인지 설정.
   	}
   }
   ```

2. index.ts 파일을 “myPackage”가 아닌 “./myPackage”로 수정한다.

   ```jsx
   import { init, exit } from "./myPackage";
   ```

3. myPackge.js파일을 수정한다.

   1. myPackage.js 수정 전

      ```jsx
      export function init(config) {
        return;
      }

      export function exit(code) {
        return code + 1;
      }
      ```

   2. myPackage.js 수정 후 (JSDoc 사용)

      ```
      // @ts-check

      /**
       * Initializes the project
       * @param {object} config
       * @param {boolean} config.debug
       * @param {string} config.url
       * @returns {void}
       */
      export function init(config) {
          return;
      }

      /**
       * Exits the program
       * @param {number} code
       * @returns {number}
       */

      export function exit(code) {
          return code + 1;
      }
      ```

      - `// @ts-check`는 자바스크립트 파일을 타입스크립트가 확인을 한다는 뜻이다. 자바스크립트 파일에 잘못된 문법은 없는지 타입스크립트가 확인해준다.
      - 각 함수 위에 있는 주석은 함수에 대한 설명과 인자에 대한 type 지정, return type 지정을 의미한다. 이러한 문법을 **JSDoc**이라고 한다
      - 주석 맨 위의 `Initializes the project` 부분은 함수에 대한 설명이다.
      - `@param {object} cinfig` 와 같이 `@param` 뒤에 들어가는 것들은 파라메타의 타입과 파라메타명을 의미한다.
      - `@return {void}` 와 같이 `@return` 뒤에 들어가는 것은 해당 함수의 return 타입을 의미한다.
