---
title: "스벨트 기초 학습 : Component composition ~ Context API"
date: "2022-03-13"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Component composition

---

## Slots

---

- 대개 요소들은 `children` 을 가질 수 있습니다.
- 컴포넌트도 그렇습니다. 컴포넌트가 `children` 을 받기 전에, 이를 어디로 받을 지 정해주어야 합니다.
  - 스벨트에서 이러한 부분을 `<slot>` 을 통해 가능케합니다.

```tsx
<div class="box">
  <slot></slot>
</div>
```

- 그렇다면, 다음과 같이 입력한 내용들이 `<slot>` 으로 지정한 곳에 위치할 것입니다.

```tsx
<Box>
  <h2>Hello!</h2>
  <p>This is a box. It can contain anything.</p>
</Box>
```

## Slot fallbacks

---

- 컴포넌트 내에 `children` 으로 활용되는 입력값이 없는 경우에 기본적인 값을 추가할 수 있습니다.
  - 이를 `<slot>` 요소 내부에 값을 입력하는 것으로 가능하게 할 수 있습니다.

```tsx
<div class="box">
  <slot>
    <em>no content was provided</em>
  </slot>
</div>
```

## Named slots

---

- 때로는 여러 `<slot>` 을 구분지어 사용해야 하는 경우가 있습니다.
- 이러한 경우, 명명된 `<slot>` 으로 활용 가능합니다.

```tsx
<article class="contact-card">
  <h2>
    <slot name="name">
      <span class="missing">Unknown name</span>
    </slot>
  </h2>

  <div class="address">
    <slot name="address">
      <span class="missing">Unknown address</span>
    </slot>
  </div>

  <div class="email">
    <slot name="email">
      <span class="missing">Unknown email</span>
    </slot>
  </div>
</article>
```

- 각각의 슬롯에 `name` 속성이 구분되어 들어가 있는 것을 확인할 수 있습니다.
- 이후, `children` 을 추가할 때 각 `children` 에 `slot="..."` 을 통해 할당할 수 있습니다.

```tsx
<ContactCard>
	<span slot="name">
		P. Sherman
	</span>

	<span slot="address">
		42 Wallaby Way<br>
		Sydney
	</span>
</ContactCard>
```

## Checking for slot content

---

- 특정 `slot` 에 대한 콘텐츠가 전달되는 지의 여부, `slot` 이 있는 지 여부에 따라 렌더링을 조건부로 진행한다던가, 클래스 적용 여부를 결정하고 싶을 때가 있을 것입니다.
  - 이때, `$$slot` 속성을 확인하여 이를 수행할 수 있습니다.
- `$$slot` 은 키가 전달된 `slot` 의 이름으로 구성된 객체입니다.
- 특정 `slot` 을 비워두면, 해당 `slot` 에 대한 항목이 없을 것입니다.
- 아래의 코드는 `comments` 라는 이름을 갖는 `slot` 의 존재 여부에 따라 클래스명이 할당됩니다.

```tsx
<article class:has-discussion={$$slots.comments}>
```

- 또한, 아래의 코드는 위 조건에 따라 요소를 조건부 렌더링합니다.

```tsx
{#if $$slots.comments}
	<div class="discussion">
		<h3>Comments</h3>
		<slot name="comments"></slot>
	</div>
{/if}
```

## Slot props

---

- 마우스가 해당 요소 위에 있는 지 여부를 추적하는`<Hoverable>` 이라는 컴포넌트가 있다고 가정해봅시다.
- `slot` 의 내용을 업데이트 하기 위해선, 그 부모에 데이터를 전달할 필요가 있습니다.
- 이를 위해, **`slot` 의 props**를 활용할 수 있습니다.
  - 우선, `Hoverable.svelte` 내의 `slot` 에 `hovering` props를 추가합니다.

```tsx
<div on:mouseenter={enter} on:mouseleave={leave}>
  <slot hovering={hovering}></slot>
</div>
```

> Remember you can also use the `{hovering}` shorthand, if you prefer.

- 경우에 따라, 요약해서 `{hovering}` 으로 사용할 수 있습니다.
- 그리고 컴포넌트의 `hovering` 을 받게 하기 위해, `<Hoveralbe>` 컴포넌트에 `let` 지시문을 사용합니다.

```tsx
<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

- 변수명이 약간 어색한 것 같습니다. 이를 `active` 로 수정해봅시다.

```tsx
<Hoverable let:hovering={active}>
	<div class:active> // === class:active={active}
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

- 이러한 컴포넌트를 원하는 만큼 가질 수 있으며, `slot` 이 있는 prop은 선언된 컴포넌트에 지역적으로 유지됩니다.

> Named slots can also have props; use the `let` directive on an element with a `slot="..."` attribute, instead of on the component itself.

- 명명된 `slot` 은 prop도 포함될 수 있습니다. 컴포넌트 자체 대신 `slot="..."` 속성이 있는 요소에 `let` 지시문을 사용합니다.

# Context API

---

## setContext and getContext

---

- **Context API**는 데이터와 함수를 prop으로 전달하거나, 많은 이벤트를 전달하지 않고 컴포넌트가 서로 대화(교류)할 수 있는 메커니즘을 제공합니다. 고급 기능이지만 유용한 기능입니다.
- 해당 예시에서는 [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/guides/)의 지도를 사용합니다.
- `<MapMarker>` 를 활용하여 지도에 마커를 표시하고 싶은데, 기본 Mapbox 인스턴스에 대한 참조를 각 컴포넌트의 prop으로 전달하고 싶지 않습니다.
- Context API는 `setContext`, `getContext` 로 두 가지가 있습니다.
  - 컴포넌트가 `setContext(key, context)` 를 호출하면, 모든 자식 컴포넌트 `const context = getContext(key)` 를 활용하여 컨텍스트를 검색할 수 있습니다.
- `svelte` 에서 `setContext` 를 호출하고, `mapbox.js` 에서 `key` 를 호출하여 context를 할당해봅시다.

```tsx
import { onDestroy, setContext } from "svelte";
import { mapbox, key } from "./mapbox.js";

setContext(key, {
  getMap: () => map,
});
```

- Context 객체는 원하는 모든 것이든 될 수 있습니다.
- [생명주기 함수](https://svelte.dev/tutorial/onmount)처럼, `setContext` 와 `getContext` 는 컴포넌트 초기화 단계에서 호출되어야 합니다.
  - 이를 나중에 호출하면, 예를 들어 `onMount` 내부에서 문제가 발생합니다.
- 해당 예시에선 `map` 은 컴포넌트가 마운트 되기 전에는 생성되지 않기에, Context 객체에는 `map` 자체가 아닌 `getMap` 함수를 포함합니다.
- 이제 방정식의 반대편인 `MapMarker.svelte` 에서 `Mapbox` 인스턴스에 대한 참조를 얻을 수 있습니다.

```tsx
import { getContext } from "svelte";
import { mapbox, key } from "./mapbox.js";

const { getMap } = getContext(key);
const map = getMap();
```

> A more finished version of `<MapMarker>` would also handle removal and prop changes, but we're only demonstrating context here.

- 보다 더 완성된 버전의 `<MapMarker>` 는 제거 혹은 prop 변경 등을 다룰 수 있지만, 여기선 context만 보여줍니다.

## Context keys

---

- `mapbox.js` 파일을 보면 다음의 코드를 확인할 수 있습니다.

```tsx
const key = Symbol();
```

- 기술적으로는, 어떤 값이든 `key` 로 사용할 수 있습니다.
  - 예시에서 `setContext('mapbox', ...)` 를 사용할 수 있듯이
- `string` 타입 사용의 단점은 다른 컴포넌트 라이브러리가 실수로 같은 것을 사용할 수 있다는 점입니다.
  - 반면에 `Symbol` 을 사용할 때에는, `Symbol` 이 본질적으로 고유한 식별자라는 특징을 이해해야 합니다.
  - 그렇다면, 많은 컴포넌트 계층에서 작동하는 여러개의 다른 context가 있는 경우에도 `key` 가 어떤 상황에서도 충돌하지 않는다는 것을 의미합니다.

## Contexts vs stores

---

- 컨텍스트(contexts)와 저장소(stores)는 유사해보입니다.
  - 저장소는 앱의 모든 부분에서 사용할 수 있습니다.
  - 반면에, 컨텍스트는 컴포넌트와 해당 하위 항목들에서만 사용할 수 있다는 점에서 다릅니다.
- 이것은 한 상태가 다른 상태를 방해하지 않고 컴포넌트의 여러 인스턴스를 사용하려는 경우에 유용할 수 있습니다.
- 사실 두 가지를 함께 사용할 수 있습니다.
  - 컨텍스트는 반응하지 않으므로, **시간이 지남에 따라 변동되는 값은 저장소**로 표시해야 합니다.

```tsx
const { these, are, stores } = getContext(...);
```
