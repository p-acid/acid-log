---
title: "스벨트 기초 학습 : Animations ~ Classes"
date: "2022-03-10"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["Svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Animations

---

## The animate directive

---

- 우리는 완벽한 트랜지션을 구현하기 위해, 트랜지션이 적용되지 않은 부분에도 모션을 할당해야 합니다.
- 이를 위해, `animate` 지시문을 사용할 수 있습니다.

```tsx
import { flip } from "svelte/animate";
```

- `flip` 은 [‘First, Last, Invert, Play’](https://aerotwist.com/blog/flip-your-animations/) 를 의미합니다.
- 다음과 같이 추가할 수 있습니다.

```tsx
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip
>
```

- 이동이 느린 경우, `duration` 을 추가할 수도 있습니다.

```tsx
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip="{{duration: 200}}"
>
```

> `duration` can also be a `d => milliseconds` function, where `d` is the number of pixels the element has to travel

- `duration` 은 `d => milliseconds` 와 같은 함수가 될 수도 있으며, `d` 는 요소가 이동하는 픽셀의 수입니다.
- 모든 트랜지션 및 애니메이션은 자바스크립트가 아닌 CSS로 적용되기에 메인 쓰레드를 차단하지(또는 차단되지) 않습니다.

# Action

---

## The use directive

---

- 액션은 본질적으로 요소 수준의 생명주기 함수입니다.
- 액션은 이러한 경우에 유용합니다.
  - 서드파티 라이브러리와 인터페이싱
  - 이미지 지연 요청
  - 툴팁
  - 커스텀 이벤트 핸들러 추가
- 만약, 외부를 클릭하면 꺼지는 모달을 만든다고 가정해봅시다.
  - `outclick` 이벤트를 위한 이벤트 핸들러가 있지만, 기본 DOM 이벤트가 아닙니다.
  - 이를 직접 전달하기 위해서 다음의 과정을 거칩니다.

```tsx
import { clickOutside } from "./click_outside.js";

<div class="box" use:clickOutside on:outclick="{() => (showModal = false)}">
  Click outside me!
</div>;
```

- 그리고 이제 `./click_outside.js` 파일을 수정하여 커스텀 이벤트를 작성합시다.
- 트랜지션 함수처럼, 액션 함수는 `**node`(액션이 전달될 요소)와 추가적인 옵션\*\*을 인자로 받습니다.
- 그리고 **액션 객체**를 반환합니다.
  - 해당 객체는 요소가 사라질 때 호출되는 `destroy` 함수를 갖습니다.
- 우리는 요소 밖을 클릭했을 때, 모달이 사라지게 하고 싶기에 다음과 같이 작성할 수 있습니다.

```tsx
export function clickOutside(node) {
  const handleClick = (event) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
```

## Adding parameters

---

- 트랜지션과 애니메이션처럼, 액션은 인자를 받을 수 있으며, 액션 함수가 속한 요소와 함께 호출됩니다.
- 유저가 일정 기간 동안 버튼을 누르면 동일한 이벤트를 발생시키는 `longpress` 액션을 사용한다고 가정해봅시다.
  - 우선 해당 액션에 `duration` 을 전달하여 일정 기간을 변경할 수 있도록 해봅시다.
- 다음과 같이 액션 내에 `duration` 을 받고, `setTimeout` 에 해당 `duration` 을 할당합니다.

```tsx
export function longpress(node, duration) {
  // ...

  const handleMousedown = () => {
    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("longpress"));
    }, duration);
  };

  // ...
}
```

- 이제 해당 액션을 요소에 할당할 때, `duration` 을 할당할 수 있습니다.

```tsx
<button use:longpress={duration}
```

- 예제에선 슬라이드를 통해 `duration` 을 조절하기에, 해당 슬라이드로 변경된 `duration` 을 반영하기 위해 인자가 변경될 때마다 호출되는 `update` 함수를 활용하여 이를 업데이트 합니다.

```tsx
return {
  update(newDuration) {
    duration = newDuration;
  },
  // ...
};
```

> If you need to pass multiple arguments to an action, combine them into a single object, as in `use:longpress={{duration, spiciness}}`

- 하나의 액션에 여러가지 인자를 전달하고 싶다면, 하나의 객체로 결합하면됩니다.
  - `use:longpress={{duration, spiciness}}`

# Classes

---

## The class directive

---

- 다른 속성과 같이 자바스크립트 속성을 사용하여 클래스를 지정할 수 있습니다.

```tsx
<button
  class="{current === 'foo' ? 'selected' : ''}"
  on:click="{() => current = 'foo'}"
>
  foo
</button>
```

- 이어지는 코드는 위 방식을 단순화하기 위한 특별한 지시문을 포함하는 UI 개발의 일반적인 패턴입니다.

```tsx
<button class:selected="{current === 'foo'}" on:click="{() => current = 'foo'}">
  foo
</button>
```

- 위 경우 `current === 'foo'` 가 `true` 일 때마다 `selected` 가 추가됩니다.

## Shorthand class directive

---

- 다음과 같이 클래스 이름과 할당된 값의 이름이 같은 경우가 있습니다.

```tsx
<div class:big={big}>
	<!-- ... -->
</div>
```

- 이 경우 다음과 같이 축약해서 사용할 수 있습니다.

```tsx
<div class:big>
	<!-- ... -->
</div>
```
