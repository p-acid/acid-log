---
title: "스벨트 기초 학습 : Special elements"
date: "2022-03-15"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["Svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Special elements

---

## `<svelte:self>`

---

- `<svelte:self>` 는 재귀적으로 자신을 포함하게 만드는 기능을 갖습니다.
  - 폴더가 다른 폴더에 포함될 수 있는 폴더 트리 뷰와 같은 경우에 유용합니다.

```jsx
// Folder.svelte

{#if file.files}
	<svelte:self {...file}/>
{:else}
	<File {...file}/>
{/if}
```

- 여기서 `<svelte:self>` 는 `Folder` 컴포넌트 자신을 의미합니다.

## `<svelte:component>`

---

- 컴포넌트는 `if` 블록 대신, `<svelte:component>` 를 통해 카테고리 변경을 시도할 수 있습니다.

```jsx
<script>
	import RedThing from './RedThing.svelte';
	import GreenThing from './GreenThing.svelte';
	import BlueThing from './BlueThing.svelte';

	const options = [
		{ color: 'red',   component: RedThing   },
		{ color: 'green', component: GreenThing },
		{ color: 'blue',  component: BlueThing  },
	];

	let selected = options[0];
</script>

<svelte:component this={selected.component}/>
```

- `selected` 값에 따라, 분기가 이루어져 해당 컴포넌트를 렌더링합니다.

## `<svelte:window>`

---

- 어느 DOM 요소에도 이벤트 리스너를 추가할 수 있는 것처럼, `window` 객체에 `<svelte:window>` 를 통해 이벤트 리스너를 추가할 수 있습니다.

```jsx
<svelte:window on:keydown={handleKeydown} />
```

> As with DOM elements, you can add [event modifiers](https://svelte.dev/tutorial/event-modifiers) like `preventDefault`.

- DOM 요소와 마찬가지로 [event modifiers](https://svelte.dev/tutorial/event-modifiers) 를 추가할 수 있습니다.

## `<svelte:window>` bindings

---

- `window` 객체의 `scrollY` 와 같은 특정 프로퍼티에 바인딩을 할 수도 있습니다.

```jsx
<svelte:window bind:scrollY={y} />
```

- 바인딩 할 수 있는 프로퍼티들은 다음과 같습니다.
  - `scrollX` 와 `scrollY` 를 제외한 모든 프로퍼티는 읽기 전용입니다.

### Properties

---

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — an alias for `window.navigator.onLine`

## `<svelte:body>`

---

- `<svelte:body>` 를 사용하면 `<svelte:window>` 와 유사하게 `document.body` 에서 발생하는 이벤트를 수신할 수 있습니다.
  - 이것은 `window` 에서 실행되지 않는 `mouseenter` 및 `mouseleave` 이벤트에 유용합니다.

```jsx
<svelte:body
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave}
/>
```

`

## `<svelte:head>`

---

- `<svelte:head>` 요소는 문서의 `<head>` 태그 내 요소들을 삽입할 수 있도록 합니다.

```jsx
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```

> In server-side rendering (SSR) mode, contents of `<svelte:head>` are returned separately from the rest of your HTML.

- 서버 사이드 렌더링 모드에서의 `<svelte:head>` 내 내용은 HTML의 나머지 부분과 별도로 반환됩니다.

## `<svelte:options>`

---

- `<svelte:options>` 를 통해 컴파일러 옵션을 설정할 수 있습니다.
- 예를 들어, `<svelte:options>` 의 옵션 중, `immutable` 옵션을 활용하여 변경할 수 없는 데이터를 명시하고 해당 데이터를 예상하도록 컴포넌트에 지시할 수 있습니다.
  - 이를 통해 최적화가 가능합니다.
  - 정확히 말하자면, 변화가 일어날 때마다 직접 값을 수정하지 않고, 새로운 객체를 생성한다는 것을 의미합니다.

```jsx
<svelte:options immutable={true} />
```

> You can shorten this to `<svelte:options immutable/>` if you prefer.

- 원하는 경우 `<svelte:options immutable/>` 이와 같이 축약해서 사용할 수 있습니다.

### Options

---

- `immutable={true}` — 데이터를 변경하지 않기에, 컴파일러는 값 변경을 확인하기 위해 간단한 참조 동일 검사 등을 수행합니다.
- `immutable={false}` — 기본값으로, 객체가 변경되었는 지에 대해 더 보수적입니다
- `accessors={true}` — 컴포넌트의 `prop` 에 대한 `getter` 및 `setter` 를 추가합니다.
- `accessors={false}` — 기본값
- `namespace="..."` — 해당 컴포넌트가 사용될 네임스페이스, 일반적으로  `"svg"`
- `tag="..."` — 해당 컴포넌트를 커스텀 요소로 컴파일 할 때, 사용할 이름

> [API reference](https://svelte.dev/docs)

## `<svelte:fragment>`

---

- `<svelte:fragment>` 요소를 사용하면 컨테이너 DOM 요소에 콘텐츠를 래핑하지 않고 명명된 슬롯에 콘텐츠를 배치할 수 있습니다.
  - 이렇게 하면 문서의 레이아웃 흐름이 그대로 유지됩니다.

```jsx
<Box>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Box>

<!-- Box.svelte -->
<div class="box">
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
```

- 명명된 슬롯에 요소를 추가 함과 동시에 `flex` 의 흐름을 그대로 갖고 갑니다.
