---
title: 타입스크립트란 무엇인가
date: "2022-01-11"
description: "앞으로 많이 사용할 타입스크립트에 대해서 간략하게 알아봅시다."
tags: ["TypeScript", "TIL", "Basics"]
thumbnail: "typeScript_logo.png"
---

> 해당 포스팅은 [타입스크립트 핸드북](https://typescript-kr.github.io/)을 참고하여 정리한 내용입니다.

# 개념 알아보기

---

**타입스크립트(TypeScript)** 는 기본적으로 다음과 같이 설명할 수 있습니다.

- 타입스크립트란 말 그대로 **자바스크립트에 타입을 부여한 언어**입니다.
- 기존 자바스크립트와 달리 브라우저에서 실행하기 위해서 **컴파일(compile)** 과정을 거쳐야 합니다.
- 타입스크립트는 **정적 검사**를 진행합니다.
  - 정적 검사란 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 의미합니다.

또한 타입스크립트는 자바스크립트의 **상위 집합**으로도 정의되는데 둘 사이의 관계를 **구문**, **타입**, **런타임 특성**, **삭제된 타입** 등에 대한 내용을 중심으로 알아봅시다.

<br/>

## 구문(Syntax)

---

타입스크립트는 **자바스크립트의 구문이 허용되는 언어**입니다.

- **구문**은 **프로그램을 만들기 위해 코드를 작성하는 방법**입니다.

```ts
// @errors: 1005
let a = (4
```

위 예시의 경우 `)` 가 없기에 구문 오류를 반환합니다.

<br/>

## 타입(Types)

---

```ts
// @errors: 2551
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
```

위 코드의 경우 자바스크립트에선 `NaN` 을 반환하지만, 타입스크립트에선 앞서 본 구문 오류가 아닌 **`obj` 의 타입으로 인한 에러**가 발생합니다. 또한 다음의 경우도 그렇습니다.

```ts
// @errors: 2363
console.log(4 / []);
```

해당 구문의 경우에도 위와 같은 결과를 반영하게됩니다. 이렇게 기존 자바스크립트에서 작성했던 코드를 타입스크립트에 옮기면 **타입 오류**를 확인할 수 있습니다. 그 문제는 **코드 상의 오류일 수도 있으며, 지나친 타입스크립트의 보수성**으로 인한 사항일 수도 있습니다. 위와 같은 오류를 제거하기 위해 **다양한 타입스크립트 구문을 추가할 수 있습니다.**

<br/>

## 런타임 특성(Runtime Behavior)

---

타입스크립트는 **자바스크립트의 런타임 특성을 가진 프로그래밍 언어**입니다.

- 런타임(Runtime)이란 **프로그래밍 언어가 구동되는 환경**을 의미합니다.

이는 타입스크립트와 자바스크립트 사이의 프로그램 작동 중단을 야기할 미묘한 차이를 걱정하지 않고 언어 전환을 보다 더 쉽게 할 수 있도록 만드는 타입스크립트의 기본적인 약속이라고 합니다.

<br/>

## 삭제된 타입(Erased Types)

---

타입스크립트를 통해 **컴파일 된 결과(자바스크립트 코드)는 타입 정보를 갖지 않습니다.** 이는 타입스크립트가 추론한 타입에 따라 프로그램 특성을 변화시키지 않겠다는 것을 의미합니다. 즉 다시 말하면, 컴파일 중에 발생한 타입 오류로 인해 프로그램 실행에서의 작동 방식에 영향을 끼치지 않는다는 것을 의미합니다.

<br/>

# 타입 시스템 알아보기

---

이어서 타입스크립트가 갖고 있는 **타입 시스템**에 대해 알아봅시다.

</br>

## 타입 추론(Types by Inference)

---

타입스크립트는 자바스크립트 기반 언어이기에 대부분의 경우 타입을 추론하여 생성해줍니다. 예를 들어 변수 생성과 할당이 동시에 이루어지는 경우에 해당 변수의 값이 타입으로 정해집니다.

```ts
let helloWorld = "hellow, world";
```

위 경우엔 `helloWorld` 변수는 자동으로 `string` 타입을 갖게 될 것입니다. 이처럼 타입스크립트는 타입 명시를 위한 추가적인 문자의 사용을 줄여줍니다.

<br/>

## 타입 정의하기(Defining Types)

---

자바스크립트는 다양한 디자인 패턴을 사용하는 언어이기에 **자동으로 타입을 제공하기 힘든 경우**(동적 프로그래밍을 사용하는 등)가 있습니다. 그러한 경우에 타입스크립트는 별도로 **타입을 명시할 수 있는 기능을 제공합니다.**

```ts
const user = {
  name: "Hayes",
  id: 0,
};
```

위 객체 형태를 명시적으로 나타내기 위해서 다음과 같이 명시할 수 있습니다.

```ts
interface User {
  name: string;
  id: number;
}
```

`User` 라고 정의된 인터페이스는 위 변수 `user` 와 같은 구조로 되어있는 것을 확인할 수 있습니다. 이처럼 객체의 형태를 명시적으로 나타내기 위하여 `interface` 로 선언하여 사용합니다. 해당 `interface` 를 설정하고 일치하지 않는 형태의 객체를 생성하면 타입스크립트는 경고를 줍니다.

```ts
// @errors: 2322

const user: User = {
  username: "Hayes", // username 정의되지 않음
  id: 0,
};
```

인터페이스는 **함수 내 매개변수와 반환 값**을 명시하는데 사용하기도 합니다.

```ts
const getUser = (arg: ArgType): ReturnType => {
  // ...
};
```

자바스크립트는 이미 몇 가지의 원시 타입을 갖고 있고, 타입스크립트는 여기에 **몇 가지를 추가하여 목록을 확장하였습니다.**

- **기존 원시 타입**은 `boolean` , `bigint` , `null` , `number` , `string` , `symbol` , `object` 와 `undefined` 등이 있습니다.
- **추가된 목록**은 `any`(무엇이든 허용) , `unknown`(타입 사용자가 타입 선언을 확인하라) , `never`(이 타입은 발생될 수 없다) , `void`(`undefined` 혹은 리턴 값이 없음) 등이 있습니다.

타입 구축을 위한 구문으로 두 가지 구문(`type` 과 `interface`)이 있습니다. 이는 **확장과 관련된 내용 등**으로 인해 `interface` 사용을 권장한다고 보편적으로 나와있습니다.

<br/>

## 타입 구성(Composing Types)

---

여러가지 타입을 이용하여 새 타입을 작성하기 위해 일반적으로 가장 많이 사용되는 코드인 **유니언과 제네릭**이 있습니다.

<br/>

### 유니언(Union)

---

유니언은 **여러 타입 중 하나일 수 있음을 선언하는 방법**입니다. 이는 자바스크립트의 **논리연산자(`|` , `&`)를** 통해 가능합니다.

가장 많이 사용되는 경우로는 `string` 또는 `number` 의 리터럴 집합을 설명하는 것입니다.

```ts
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

또한 다양한 타입의 변수를 처리하는 것에도 사용할 수 있습니다.

```ts
function getLength(obj: string | string[]) {
  return obj.length;
}
```

위 경우에 인자 값은 `string` 혹은 `array` 로 구성될 수 있습니다.

<br/>

### 제네릭(Generic)

---

제네릭에 대해 간단히 설명하자면 **타입에 변수를 제공하는 방식**이라고 말할 수 있습니다.

**배열**이 일반적인 예시이며 제네릭이 있는 배열은 **배열 내부 값을 설명할 수 있습니다.**

```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

또한 제네릭을 사용하는 고유 타입을 선언할 수 있습니다.

```ts
// @errors: 2345
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// 이 줄은 TypeScript에 `backpack`이라는 상수가 있음을 알리는 지름길이며
// const backpack: Backpack<string>이 어디서 왔는지 걱정할 필요가 없습니다.
declare const backpack: Backpack<string>;

// 위에서 Backpack의 변수 부분으로 선언해서, object는 string입니다.
const object = backpack.get();

// backpack 변수가 string이므로, add 함수에 number를 전달할 수 없습니다.
backpack.add(23);
```

<br/>

## 구조적 타입 시스템

---

타입스크립트는 타입 검사를 **값이 있는 형태에 집중한다**는 원칙을 갖고 있습니다. 그렇기에 구조적으로 두 객체가 같은 형태를 가지면 같은 것으로 간주합니다.

```ts
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// "12, 26"를 출력합니다
const point = { x: 12, y: 26 };
printPoint(point);
```

변수 `point` 의 타입을 `Point` 로 선언하지 않았지만, 구조 형태가 같기에 통과가 됩니다. 또한, 형태 일치에는 **일치시킬 객체 필드의 하위 집합만을** 필요로 합니다.

```ts
// @errors: 2345
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
// ---cut---
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };

printPoint(color);
```
