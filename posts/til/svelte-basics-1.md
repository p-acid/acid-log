---
title: "스벨트 기초 학습 : Introduction ~ Props"
date: "2022-02-26"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["Svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Basics

---

## Definition

---

> **Svelte** is a tool for **building fast web applications.**

- 스벨트는 **빠르게 웹 애플리케이션을 만들기 위한 도구**입니다.
- **리액트**와 **뷰** 같은 자바스크립트 프레임워크들과 유사합니다.

## Difference

---

> But there's a crucial difference: Svelte converts your app into ideal JavaScript **at build time\***
> , rather than interpreting your application code **at run time**.

- 스벨트는 앱을 **런타임 단계에서 해석하지 않고**, **빌드 시에 자바스크립트로 변환합니다.**

> This means you **don't pay the performance cost of the framework's abstractions**, and you **don't incur a penalty when your app first loads.**

- 즉, 프레임워크 **추상화에 추가적인 비용이 없으며**, 앱 **초기 로드에 패널티가 없습니다.**

## Feature

---

> You **can build your entire app** with Svelte, or you **can add it incrementally** to an existing codebase.

- 전체 앱 빌드와 점진적인 추가가 둘 다 가능합니다. ⇒ **선택적입니다.**

> You can also ship components **as standalone packages** that work anywhere, **without the overhead of a dependency** on a conventional framework.

- 또한 기존 프레임워크의 **의존성 오버헤드 없이**, 어디서나 작동하는 **독립성 패키지로 제공 가능**합니다.

# Introduction

---

## Basic Stucture

---

```tsx
<script>
	let name = 'world';
</script>

<h1>Hello {name}</h1>

<style>
	h1 {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
```

- **`<script>` 태그 내** 자바스크립트 코드를 작성하고, **중괄호(`{}`)를** 통해 컴포넌트 내 추가 가능합니다.
- **`<style>` 태그 내** CSS 정보를 추가할 수 있습니다.
  - 해당 CSS 내용의 범위는 **컴포넌트**이기에, 다른 컴포넌트의 스타일을 변경하지 않습니다.

## Dynamic Attributes

---

```tsx
<img src={src}>
```

- 중괄호를 활용하여 **동적으로 요소 할당 가능**

### Consideration for Accessibility

---

```tsx
// if you don't add the "alt" prop in img tag

A11y: <img> element should have an alt attribute
```

> Accessibility (shortened to a11y) isn't always easy to get right, but Svelte **will help by warning you if you write inaccessible markup.**

- 웹 접근성을 고려하여, 스벨트는 당신에게 경고를 제공합니다. 그것이 매번 옳지 않을 수도 있지만.

## Nested components

---

```tsx
<script>
	import Nested from './Nested.svelte';
</script>

<p>This is a paragraph.</p>
<Nested/>
```

- 전체 앱을 하나의 컴포넌트에 담는 것은 비현실적이기 때문에, 위와 같이 다른 파일에서 컴포넌트를 불러와 사용할 수 있습니다.

## HTML tags

---

```tsx
<script>
	let string = 'this string contains some <strong>HTML!!!</strong>';
</script>

<p>{@html string}</p>
```

> But sometimes you need **to render HTML directly** into a component.

- HTML 요소로 바로 렌더링 하고 싶을 땐, `@html` 을 사용할 수 있습니다.

## Add Event handler

---

```tsx
<script>
	let count = 0;

	function incrementCount() {
		count += 1;
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

# Reactivity

---

## Assignments & Declaration

---

```tsx
<script>
	let count = 0;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

- 스벨트는 **컴포넌트의 상태가 변경**되면, **자동으로 상태값을 업데이트** 합니다.
  - 종종 컴포넌트 내 상태 일부는 **다른 부분에 의해 계산되기에 변경될 때마다 다시 계산**해야 합니다.
- 이를 위해 **반응형 선언**이 있습니다.
  - 물론 위의 경우 `{ count * 2 }` 로 활용해도 됩니다.
  - 반응형 선언은 **여러 번 참조가 진행**되거나, **다른 반응성 값에 의존하는 값이 있는 경우** 유용합니다.

## Statements

```tsx
<script>
	let count = 0;

	// 반응형을 구문으로 작성 가능합니다.
	$: console.log('the count is ' + count);

	// if 문과 함께 활용하거나, 중괄호로 묶어 구문을 그룹화 할 수 있습니다.
	$: if (count >= 10) {
		alert('count is dangerously high!');
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

- 반응형 선언은 값에 국한되어 있지 않습니다.
  - 위와 같이 구문 형태로 작성할 수도 있습니다.

## Updating arrays and objects

---

```tsx
<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		numbers.push(numbers.length + 1);
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>
```

- 스벨트의 반응성은 할당에 의해 트리거되기 때문에, 배열에서 **`push` 혹은 `splice` 와 같은 메소드를 사용하면 자동으로 업데이트를 발생시키지 않습니다.**
  - 위 예시에서 버튼을 클릭했을 때, 아무런 변화가 없을 것입니다.

```tsx
function addNumber() {
  numbers.push(numbers.length + 1);
  numbers = numbers;
}
```

- 이러한 문제를 해결하기 위해 위와 같이 **중복되는 할당을 추가**할 수 있습니다.

```tsx
function addNumber() {
  numbers = [...numbers, numbers.length + 1];
}
```

- 하지만 관용적으로 이러한 방식(`spread operator`)를 사용하기도 합니다.
- 이런 방식으로 `pop`, `shift`, `unshift`, `splice` 와 같은 메서드를 똑같이 대체할 수 있습니다.

```tsx
function addNumber() {
  numbers[numbers.length] = numbers.length + 1;
}
```

- 배열 및 객체의 속성에 대한 할당은 **값 자체에 대한 할당과 동일한 방식**으로 작동합니다.

```tsx
const foo = obj.foo;
foo.bar = "baz";
```

- 업데이트 된 변수의 이름은 할당의 왼쪽에 나타나야 합니다.
- 위 경우 `obj = obj` 가 존재하지 않으면, `obj.foo.bar` 에 대한 반응성은 작동하지 않습니다.

## Declaring props

---

> So far, we've dealt **exclusively with internal state** — that is to say, the values are only **accessible within a given component.**

- 우리는 지금까지 **컴포넌트 내부의 상태만을** 다뤘습니다.
  - 즉, **값은 해당하는 컴포넌트 내에서만 다룰 수 있다는 것**입니다.

```tsx
<script>export let answer;</script>
```

- 실제 앱에서는 경우에 따라 **하나의 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 필요**가 있습니다.
- 이런 경우를 위해 스벨트에선 `export` 키워드를 통해 전달한 `prop` 을 받을 수 있습니다.

```tsx
// Nested.svelte
<script>
	export let answer = 'a mystery';
</script>

// App.svelte
<Nested answer={42}/>
<Nested/>
```

- 위와 같이 **기본값을 설정할 수도 있습니다.**
  - 이제 별도의 `prop` 할당 없이 `<Nested/>` 로 사용 가능합니다.

## Spread props

---

```tsx
<Info {...pkg} />
```

- 만약 객체 형태의 `props` 를 넘기고 싶다면, 각 속성을 지정하는 대신 `spread` 할 수 있습니다.

> Conversely, if you need to reference all the props that were passed into a component, including ones that weren't declared with `export`, you can do so by accessing `$$props` directly. It's not generally recommended, as it's difficult for Svelte to optimise, but it's useful in rare cases.

- 반대로 **`export` 로 선언되지 않았거나** 컴포넌트에 전달된 **모든 `props` 를 참조해야 하는 경우, `$$props` 에 직접 액세스하여 참조**할 수 있습니다.
- 일반적으로 권장되진 않지만, 드문 경우에 유용합니다.
