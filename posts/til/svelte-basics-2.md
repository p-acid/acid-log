---
title: "스벨트 기초 학습 : Logic ~ Props"
date: "2022-03-05"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["Svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Logic

---

## If blocks

---

```jsx
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
<button on:click={toggle}>
	Log out
</button>
{/if}

{#if !user.loggedIn}
<button on:click={toggle}>
	Log in
</button>
{/if}
```

- HTML은 반복문과 조건문 같은 로직을 표현할 방법이 없지만, 스벨트는 가능합니다.
- `if` 블럭을 활용하여 조건부로 마크업을 렌더링 해봅시다.

## Else-if blocks

---

```jsx
<script>
	let x = 11;
</script>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

- `else if` 구문을 활용하여 다수의 조건을 연결할 수 있습니다.

## Each blocks

---

```jsx
<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>
```

- 데이터의 리스트를 순회하고 싶다면, `each` 블록을 사용합니다.

> The expression (`cats`, in this case) can be any array or array-like object (i.e. it has a `length` property). You can loop over generic iterables with `each [...iterable]`.

- 해당 표현식(이 경우, `cats`)은 배열 혹은 유사 배열 객체일 수 있습니다. 일반적인 `interable` 이라면 순환할 수 있습니다.

```jsx
// using index
{#each cats as cat, i}
	...
{/each}

// Destructuring
{#each cats as {id, name}}
	...
{/each}
```

- 또한, **순환하는 요소의 인덱스 값**을 받아올 수도 있고, 구조 분해 할당을 할 수도 있습니다.

## Keyed each blocks

---

```jsx
// App.svelte

<script>
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' },
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}>
	Remove first thing
</button>

{#each things as thing}
	<Thing name={thing.name}/>
{/each}
```

```jsx
// Thing.svelte

<script>
	const emojis = {
        apple: "🍎",
        banana: "🍌",
        carrot: "🥕",
        doughnut: "🍩",
        egg: "🥚"
	}

	// the name is updated whenever the prop value changes...
	export let name;

	// ...but the "emoji" variable is fixed upon initialisation of the component
	const emoji = emojis[name];
</script>

<p>
	<span>The emoji for { name } is { emoji }</span>
</p>

<style>
	p {
		margin: 0.8em 0;
	}
	span {
		display: inline-block;
		padding: 0.2em 1em 0.3em;
		text-align: center;
		border-radius: 0.2em;
		background-color: #FFDFD3;
	}
</style>
```

- 기본적으로 `each` 블록의 값을 수정하고자 할 때 블록의 끝에 아이템이 생성되고 제거될 것이며, 업데이트 되어 값이 변경될 것입니다.
  - 아마 그것은 당신이 원하는 것이 아닐 수도 있습니다.
- 위 코드를 실행하고 `Remove first thing` 버튼을 누른다면, 첫 번째 `<Thing>` 컴포넌트를 제거하지만, 마지막 DOM 노드를 제거하는 것을 확인할 수 있습니다.
- 그리고 나머지 `name` 값을 업데이트 하지만, 이모지는 업데이트 하지 않습니다.
- 첫 번째`<Thing>` 컴포넌트와 해당하는 DOM 노드만 제거하고, 다른 부분에 영향을 주고 싶지 않다면, `(thing.id)` 를 활용할 수 있습니다.

```jsx
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

- 위와 같이 `each` 블록에 고유한 식별자(혹은 `key`)를 지정할 수 있습니다.
- 해당 `(thing.id)` 는 **키**로서, 스벨트에게 **컴포넌트가 업데이트 될 때 변경시킬 DOM 노드를 찾도록** 알려줍니다.

> You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.

- 스벨트는 `**Map` 을 내부적으로 사용**하기 때문에, 모든 객체를 키로 사용할 수 있습니다. 이 말은 `**(thing.id)`대신에`thing` 을 사용할 수 있다는 것\*\*을 의미합니다.
- 그러나, **문자열이나 숫자**를 사용하는 것이 일반적으로 안전합니다.
  - 예를 들어, API 서버에서 최신 데이터로 업데이트 할 때, **참조 동등성 없이 ID가 유지된다는 의미**이기 때문입니다.

## Await blocks

---

```jsx
<script>
	async function getRandomNumber() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	let promise = getRandomNumber();

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate random number
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

- 언젠간 대부분의 웹 어플리케이션들은 비동기 데이터를 다루어야 합니다. 스벨트는 `await` 를 통해 프로미스 값을 마크업에 직관적으로 만들 수 있습니다.

> Only the most recent `promise` is considered, meaning you don't need to worry about race conditions.

- 가장 최근의 `promise` 만이 고려되므로, 경쟁 상태를 고려할 필요가 없습니다.
  - **경쟁 상태(race condition)**: 둘 이상의 입력 또는 조작의 타이밍이나 순서 등이 결과값에 영향을 줄 수 있는 상태
- 만약 프로미스가 `rejected` 되지 않는다는 것을 알고 있다면, `catch` 블록을 생략할 수 있습니다.

```jsx
{#await promise then value}
	<p>the value is {value}</p>
{/await}
```

- 또한, 프로미스가 `resolved` 될 때까지 아무 것도 보여주고 싶지 않다면 첫 번째 블록을 생략할 수도 있습니다.

# Events

---

## DOM Events

---

```jsx
<div on:mousemove={handleMousemove}>
  The mouse position is {m.x} x {m.y}
</div>
```

- `:on` 을 통해, 요소에 직접 이벤트를 수신하도록 할 수 있습니다.

## Inline handlers

---

```jsx
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
  The mouse position is {m.x} x {m.y}
</div>
```

- 또한, **인라인으로 이벤트를 선언**할 수 있습니다.
- 따옴표(`”`, `'`)는 옵션이지만, 일부 환경에서 **구문 강조에 유리합니다.**

> In some frameworks you may see recommendations to avoid inline event handlers for performance reasons, particularly inside loops. That advice doesn't apply to Svelte — the compiler will always do the right thing, whichever form you choose.

- 일부 프레임워크에서, 특히 루프 내부와 같은 성능상의 이유로 **인라인 이벤트 핸들러를 지양하라는 권장사항**을 확인할 수 있을 것입니다.
- **해당 조언은 스벨트에 적용되지 않습니다.** 어떤 형태를 선택하든 컴파일러는 언제나 정확하게 동작할 것입니다.

## Event modifiers

---

```jsx
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

- DOM 이벤트 핸들러는 그들의 동작을 바꿀 **수정자**를 가질 수 있습니다.
- 예를 들어, 위의 경우 `once` 수정자와 함께한 핸들러는 한 번만 실행됩니다.

### Modifiers

---

- `preventDefault`: `event.preventDefault()`
  - **핸들러 동작 전**에 호출됩니다.
  - 예를 들어, 클라이언트 측 `form` 을 다룰 때 유용합니다.
- `stopPropagation`: `event.stopPropagation()`
  - **이벤트가 다음 요소에 전달되는 것을 방지**합니다.
- `passive`
  - 터치나 휠 이벤트에 대한 스크롤 기능을 향상시킵니다.
  - 스벨트는 이것을 자동으로 안전한 곳에 추가합니다.
- `nonpassive`
  - 명시적으로, `passive: false` 를 표현합니다.
- `capture`
  - 핸들러를 캡쳐 단계에서 발생시킵니다.(버블링 대신)
  - [Capture : MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)
- `once`
  - 핸들러가 처음 작동한 이후, 이를 제거합니다.
- `self`
  - `event.target` 이 자신일 때만 핸들러를 실행합니다.
- `trusted`
  - `event.isTrusted` 가 `true` 일 때만, 이벤트 핸들러를 실행합니다.
  - 즉, 이벤트가 사용자 액션에 의해 트리거 된 경우만 실행합니다.

```jsx
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```

- 컴포넌트는 **이벤트를 전달할 수도 있습니다.**
- 그러기 위해, **전달자**를 만들어야 합니다.

> `createEventDispatcher`
>  must be called when the component is first instantiated — you can't do it later inside e.g. a `setTimeout`
>  callback. This links `dispatch`
>  to the component instance.

- `createEventDispatcher` 는 컴포넌트가 인스턴트화 될 때 호출되어야 합니다.
  - 이는 나중에 `setTimeout` 콜백 안에서 호출할 수 없음을 의미합니다.
- `createEventDispatcher` 은 `dispatch` 를 컴포넌트 인스턴스와 연결시킵니다.
- `App` 컴포넌트는 `on:message` 지시(directive) 덕분에 `Inner` 컴포넌트에 의해 전달된 메세지들을 수신하고 있다는 것을 압시다.
  - 이 지시는 `:on` 접두사가 붙은 속성이며, 그 뒤에 우리가 전달하는 이벤트 이름(이 경우 `message`)이 옵니다.
- 해당 속성 없이 메세지는 전달되지만, 앱은 반응하지 않습니다.

> You can also try changing the event name to something else. For instance, change `dispatch('message')`  to `dispatch('myevent')`  in `Inner.svelte`  and change the attribute name from `on:message`  to `on:myevent`  in the `App.svelte`  component.

- 또한, 이벤트 이름을 변경할 수도 있습니다.
  - 예를 들어, `dispatch('message')` 에서 `dispatch('myevent')` 로 말이죠.
- 그리고 속성명을 변경합니다.
  - `on:message`에서 `on:myevent` 로요.

## Event forwarding

---

- DOM 이벤트와 달리, **컴포넌트 이벤트는 버블링이 일어나지 않습니다.**
- 버블링(중첩된 요소에서 점차 깊게 이벤트를 전달하는 것)을 원한다면, 중간 요소가 이벤트를 **전달(forward)해야 합니다.**
- 이 경우, 앞의(바로 이전의) 예시와 파일 구성이 같지만, `<Inner/>` 를 포함하는 `Outer.svelte` 컴포넌트가 추가되었습니다.
- 하나의 해결 방법으로 `createEventDispatcher` 를 `Outer.svelte` 에 추가하고, `message` 이벤트를 수신하며, 이를 위한 핸들러를 만드는 것이 있습니다.

```jsx
<script>
	import Inner from './Inner.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<Inner on:message={forward}/>

```

- 하지만 너무 많은 코드가 쓰였습니다. 그렇기에 스벨트는 동일한 약칭을 제공합니다.
  - 값이 없는 `on:message` 이벤트 지시는 모든 `message` 이벤트를 전달하는 것을 의미합니다.

```jsx
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```

## DOM event forwarding

---

- 이벤트 전달은 DOM 이벤트에서도 작동합니다.
- 해당 예시에서 `<CustomButton>` 의 알림을 받길 원하기에, `click` 이벤트를 `CustomButton.svelte` 의 `<button>` 에 전달할 필요가 있습니다.

```jsx
<button on:click>Click me</button>
```
