---
title: 타입스크립트 기초 쌓기
date: "2022-01-11"
description: "타입스크립트의 기초를 탄탄하게 다져봅시다."
tags: ["TypeScript", "TIL", "Basics"]
thumbnail: "typeScript_logo.png"
---

> 해당 포스팅은 [타입스크립트 핸드북](https://typescript-kr.github.io/)을 참고하여 정리한 내용입니다.

# 들어가며

---

앞의 포스팅에서 작성했던 타입스크립트에 대한 내용을 기반으로 타입스크립트 사용에 있어 숙지해야 할 기본적인 내용을 학습해보려 합니다.

## 기본 타입

---

타입스크립트는 자바스크립트와 거의 동일한 데이터 타입을 지원하며, **열거 타입**을 통해 더 편리하게 사용할 수 있습니다. 원시 타입에 해당하는 아래 데이터 타입은 다음과 같이 타입을 표기할 수 있습니다.

```ts
// 불리언(boolean)
let isDone: boolean = false;

// 숫자(Number)
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 문자열(String)
let color: string = "blue";
color = "red";

let fullName1: string = `Bob Bobbington`;
let fullName2: string = "Bob" + "Bobbington";
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

위 데이터 타입들은 **비교적 간단하게 데이터 타입을 명시할 수 있거나, 부가적으로 작성할 내용이 비교적 적은 내용에 속하여** 별도로 간략하게 나열하였습니다. 앞의 의견은 지극히 개인적인 의견이니 조금 더 자세한 내용들은 [타입스크립트 핸드북](https://typescript-kr.github.io/)을 참고하시면 됩니다.

이어서 작성할 내용은 부가적으로 학습이 필요한 내용들입니다.

### 배열(Array)

---

배열 타입을 명시하는 방법은 두 가지가 있습니다.

- 배열 요소들을 나타내는 타입 뒤에 `[]` 작성
- 제네릭 배열 타입 사용

```ts
// elemType[]
let list: number[] = [1, 2, 3];

// Generic : Array<elemType>
let list: Array<number> = [1, 2, 3];
```

### 튜플(Tuple)

---

요소의 타입과 개수가 고정된 배열을 표현하는 방식입니다. **요소들 타입이 같을 필요는 없으며, 해당 인덱스 위치의 타입이 존재**하고 인덱스를 잘못 접근하면 오류를 발생시킵니다.

```ts
// 튜플 타입으로 선언
let x: [string, number];
// 초기화
x = ["hello", 10]; // 성공
// 잘못된 초기화
x = [10, "hello"]; // 오류

console.log(x[0].substring(1)); // 성공
console.log(x[1].substring(1)); // 오류, 'number'에는 'substring' 이 없습니다.

x[3] = "world"; // 오류, '[string, number]' 타입에는 프로퍼티 '3'이 없습니다.

console.log(x[5].toString()); // '[string, number]' 타입에는 프로퍼티 '5'가 없습니다.
```

### 열거

---

자바스크립트 표준 자료형을 활용하여 사용할 수 있는 자료형입니다. `enum` 을 통해 상수 데이터에 식별자를 추가할 수 있습니다.

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

`enum` 은 **`0` 부터 시작하여 각 식별자에 값을 부여**하고, **시작 번호를 변경**할 수도 있으며, **모든 값을 수동으로 설정**할 수도 있습니다.

```ts
// 시작 번호 변경
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;

// 모든 값을 수동으로 설정
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

또한 `enum` 은 해당 상수를 통해 `enum` 멤버의 식별자를 알아낼 수 있습니다.

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력됩니다.
```

### Any

---
