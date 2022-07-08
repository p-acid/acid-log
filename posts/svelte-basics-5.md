---
title: "스벨트 기초 학습 : Stores"
date: "2022-03-08"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Stores

---

## Writable stores

---

- 모든 앱 상태가 앱 컴포넌트 계층 구조에 속하는 것은 아닙니다.
- 때로는 관련되지 않은 다수의 컴포넌트 혹은 일반적인 자바스크립트 모듈에 의해 액세스해야 하는 값들이 있습니다.
- 스벨트에선 이러한 내용을 **스토어**에서 처리 가능합니다.
- 스토어는 단순히 스토어의 값이 변할 때마다, 관련이 있는 컴포넌트에 알림을 제공하는 `subscribe` 메서드가 있는 객체입니다.
- `store.js` 파일을 보면 `writable` 스토어인 것을 확인할 수 있습니다.
  - 이는 `subscribe` 외에도 `set`, `update` 메서드를 사용할 수 있음을 의미합니다.

```tsx
import { writable } from "svelte/store";

export const count = writable(0);
```

- 각 메서드의 사용법은 다음과 같습니다.

### subscribe

---

```tsx
import { count } from "./stores.js";

let countValue;

count.subscribe((value) => {
  countValue = value;
});
```

- 컴포넌트 내 변수인 `countValue` 에 `count` 값을 **동기화 시킵니다.**
  - `count` 의 값이 변경될 때마다, `countValue` 에 변경 사항이 적용됩니다.

### update

---

```tsx
import { count } from "./stores.js";

function decrement() {
  count.update((n) => n - 1);
}
```

- **콜백**을 전달하여 스토어의 값을 수정할 수 있습니다.

### set

---

```tsx
import { count } from "./stores.js";

function reset() {
  count.set(0);
}
```

- **단일값**을 전달하여 스토어의 값을 수정할 수 있습니다.

## Auto-subscription

---

- 이전 예제에는 약간의 버그가 있습니다.
  - 스토어는 구독이 되지만, **구독이 취소되지는 않습니다.**
- 만약, 컴포넌트가 여러 번 인스턴스화 되고 소멸하면, 이에 따른 메모리 릭이 발생할 것입니다.
- 다음과 같이 `unsubscribe` 를 선언합니다.

```tsx
const unsubscribe = count.subscribe((value) => {
  countValue = value;
});
```

> Calling a `subscribe` method returns an `unsubscribe` function.

- `subscribe` 메서드를 호출하면, `unsubscribe` 함수를 반환합니다.
- 이를 `onDestroy` 생명주기 훅을 통해 활용할 수 있습니다.

```tsx
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let countValue;

	const unsubscribe = count.subscribe(value => {
		countValue = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>The count is {countValue}</h1>
```

- 특히 여러 컴포넌트가 스토어를 `subscribe` 하는 경우, 보일러플레이트를 생성하게 됩니다.
- 스벨트에선 약간의 속임수를 사용할 수 있습니다.
  - 스토어 이름에 `$` 를 붙여 스토어 값을 참조할 수 있습니다.

```tsx
<script>
	import { count } from './stores.js';
</script>

<h1>The count is {$count}</h1>
```

- 이는 **마크업 내부에서 사용하는 것에 국한되지 않고**, `<script>` 내의 **이벤트 핸들러**나, **반응형 선언**에서도 사용 가능합니다.

> Any name beginning with `$` is assumed to refer to a store value. It's effectively a reserved character — Svelte will prevent you from declaring your own variables with a `$` prefix.

- `$` 로 시작하는 모든 이름은 스토어 값을 참조하는 것으로 간주됩니다.
- 이는 사실 **예약어**입니다. 스벨트는 `$` 접두사를 사용하여 자신의 변수를 선언하는 것을 방지합니다.

## Readable stores

---

- 저장소를 참조하는 모든 것이 `writable` 한 것은 아닙니다.
- 예를 들어, **마우스의 위치**나 **유저의 지리적 위치**와 같은 값들은 **외부에서 수정하는 것이 의미가 없습니다.**
- 그러한 경우, `readable` 을 사용할 수 있습니다.

## Parameter

---

- `initialValue`(1st): 초기값을 의미합니다. 아직 없는 경우, `null` 혹은 `undefined` 등이 될 수 있습니다.
- `startFunc`(2nd): `set` 콜백을 사용하고 `stop` 함수를 반환하는 `start` 함수입니다.
  - `stop` 은 마지막 `subscribe` 가 취소될 때 호출됩니다.

```tsx
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
```

## Derived stores

---

- 하나의 혹은 `derived` 를 사용하여 스토어들에 기반한 값을 소유한 스토어를 생성할 수 있습니다.
- 예를 들어, `time` 변수에서 파생된 `elapsed` 라는 변수를 생성할 수 있습니다.

```tsx
export const elapsed = derived(time, ($time) =>
  Math.round(($time - start) / 1000)
);
```

> It's possible to derive a store from multiple inputs, and to explicitly `set` a value instead of returning it (which is useful for deriving values asynchronously). Consult the [API reference](https://svelte.dev/docs#run-time-svelte-store-derived) for more information.

- 여러 `input` 에서 스토어를 파생하고 값을 반환하는 대신, 명시적으로 값을 설정할 수 있습니다.
  - 비동기적으로 값을 파생하는데 유용합니다.
- 자세한 내용은 [API](https://svelte.dev/docs#run-time-svelte-store-derived)를 참조하세요

## Custom stores

---

- 객체가 `subscribe` 메서드를 올바르게 구현하는 한, 그것은 스토어입니다.
  - 그 이상은 무엇이든 됩니다.
- 따라서, 도메인 별 로직을 사용하여 커스텀 스토어를 만드는 것은 매우 쉽습니다.
- 예를 들어, 앞 예제의 `count` 스토어는 `increment`, `decrement` 그리고 `reset` 메서드들을 포함할 수 있고, `set` 과 `update` 에 노출되는 것을 피할 수 있습니다.

```tsx
function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}
```

## Store bindings

---

- 스토어가 `writable` 하다면, 다시 말해 `set` 메서드를 갖고 있다면, 지역 컴포넌트에 바인딩할 수 있는 것처럼 **스토어의 값을 바인딩할 수 있습니다.**
- 일반적인 바인딩 방식과 유사합니다.

```tsx
<input bind:value={$name}>
```

- 또한, 컴포넌트 내부에 값을 저장하기 위해 직접 할당할 수도 있습니다.

```tsx
<button on:click="{() => $name += '!'}">Add exclamation mark!</button>
```

- `$name += '!'` 은 `name.set($name + '!')` 에 해당합니다.
