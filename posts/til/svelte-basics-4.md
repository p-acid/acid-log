---
title: "스벨트 기초 학습 : Lifecycle"
date: "2022-03-07"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Lifecycle

---

## onMount

---

- 모든 컴포넌트는 생성되기 시작하고, 사라지는 마무리 순간까지의 **생명 주기(Lifecycle)를 갖습니다.**
  - 해당 생명주기의 순간에 사용할 수 있는 몇 가지 함수들이 있습니다.
- 그 중 자주 사용할 하나는 **DOM에 컴포넌트가 처음 렌더링 되었을 때**인 `onMount` 입니다.
- 네트워크를 통해 불러오는 일부 데이터들에 `onMount` 를 추가할 수 있습니다.
- 콜백이 컴포넌트 인스턴스에 바인딩되도록 컴포넌트가 초기화 될 때, 생명주기 함수를 호출해야 합니다.
- 만약, `onMount` 콜백이 함수를 반환한다면, 그 함수는 컴포넌트가 사라질 때 호출됩니다.

```jsx
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

> It's recommended to put the `fetch` in `onMount` rather than at the top level of the `<script>` because of server-side rendering (SSR). With the exception of `onDestroy`, lifecycle functions don't run during SSR, which means we can avoid fetching data that should be loaded lazily once the component has been mounted in the DOM.

- SSR 때문에, `fetch` 를 `<script>` 최상단에 추가하는 것보다 `onMount` 에 추가하는 것을 권장합니다.
- `onDestroy` 를 제외하고 생명주기 함수는 SSR 동안 실행되지 않습니다.
  - 즉, 구성 요소가 DOM에 마운트 된 후 느리게 로드되어야 하는 데이터를 가져오는 것을 피할 수 있습니다.

## onDestroy

---

- **컴포넌트가 파괴될 때 코드를 실행**하고 싶다면, `onDestroy` 를 사용합니다.
- 예를 들어, `setInterval` 함수를 컴포넌트를 초기화 할 때 추가하고, 이를 연관이 없을 때 제거하고자 할 때 사용할 수 있습니다.
  - 이를 통해 메모리 누수(memory leaks)를 방지할 수 있습니다.

```tsx
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

- `onMount` 에서 말했듯이, 생명주기 함수는 컴포넌트 초기화 단계에 호출해야 하지만 **`onDestroy` 의 호출 위치는 중요하지 않습니다.**
  - 그렇기에, 원하는 경우 위 인터벌 로직을 헬퍼 함수로 추상화 할 수 있습니다.

```tsx
import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
```

- 이렇게 구성한 함수는 컴포넌트로 가져올 수 있습니다.

```tsx
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

## beforeUpdate and afterUpdate

---

- `beforeUpdate` 함수는 DOM이 업데이트가 되기 직전에 실행됩니다.
- `afterUpdate` 함수는 DOM이 데이터와 동기화 되면 코드를 실행하는데 사용됩니다.
- 함께 사용하면 **요소의 스크롤 위치 업데이트**와 같이 순수한 상태 기반 방식으로 달성하기 어려운 작업을 수행하는데 유용합니다.

```tsx
let div;
let autoscroll;

beforeUpdate(() => {
  autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
});

afterUpdate(() => {
  if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
```

- `beforeUpdate` 는 컴포넌트가 마운트 되기 전에 먼저 실행되므로, 해당 프로퍼티를 읽기 전에 `div` 의 존재 여부를 확인해야 합니다.

## tick

---

- `tick` 함수는 여타 생명주기 함수와는 첫 초기화 때뿐만 아니라 언제든지 호출할 수 있다는 점에서 다릅니다.
- 이는 `pending` 중인 상태 변경 사항이 DOM에 적용되는 즉시(혹은 `pending` 중인 상태 변경 사항이 없는 경우 즉시) `resolve` 되는 프로미스를 반환합니다.
- 스벨트에서 컴포넌트 상태를 업데이트 하면 DOM이 즉시 업데이트 되지 않습니다.
- 대신 다른 컴포넌트를 포함하여 적용해야 하는 다른 변경 사항이 있는지, 확인하기 위해 다음 microtask 까지 대기합니다.
  - 그렇게 하면 불필요한 작업(렌더링)을 피할 수 있고 브라우저가 일을 더 효율적으로 일괄 처리할 수 있습니다.

```tsx
import { tick } from "svelte";
```

```tsx
await tick();
this.selectionStart = selectionStart;
this.selectionEnd = selectionEnd;
```

- `handleKeydown` 의 끝에서 `this.selectionStart` 및 `this.selectionEnd`를 설정하기 직전에 실행합니다.
