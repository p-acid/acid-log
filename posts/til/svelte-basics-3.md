---
title: "스벨트 기초 학습 : Bindings"
date: "2022-03-06"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["Svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Bindings

---

## Text inputs

---

- 일반적으로 스벨트의 데이터 흐름은 **하향식(top-down)**
  - 상위 컴포넌트는 하위 컴포넌트에게 `props` 를 설정할 수 있지만, 반대는 아니다.
- 이를 `bind:value` 를 통해 가능케 할 수 있다.

```jsx
<input bind:value={name}>
```

- `bind:value` 의 의미는 **`name` 의 값이 변경될 때 `input` 의 값이 변하는 것 뿐만 아니라, `input` 의 값이 변할 때 `name` 의 값 또한 변함을 의미합니다.**

## Numeric inputs

---

- DOM에서 모든 것들은 문자열입니다.
  - 이러한 부분은, **숫자 형태의 입력값(`type=:”number”`, `type="range"`)들을 다룰 때** 불편하게 느껴집니다.
- 그렇기에, `input.value` 의 강제 전환을 고려해야 합니다.
- 스벨트는 `bind:value` 를 통해 이러한 부분을 고려합니다.

```jsx
<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
```

## Checkbox inputs

---

- 체크박스는 상태를 전환하는데 사용합니다.
- 이 경우 `value` 대신 `checked` 에 바인딩합니다. ⇒ `bind:checked`

```jsx
<input type=checkbox bind:checked={yes}>
```

## Group Inputs

---

- 만약, 같은 값에 대한 다양한 `input` 들이 있으면 `value` 속성과 함께 **`bind:group` 을 사용할 수 있습니다.**
  - 같은 그룹의 라디오 `input`: 상호 배타적(독립적)입니다.
  - 같은 그룹의 체크박스 `input`: 선택된 값들의 배열을 형성합니다.

```jsx
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

- **각각의 `input` 에 `bind:group` 을 추가하는 것**으로 이를 가능하게 합니다.
  - 모든 요소에 `bind:group` 을 추가하는 것이기 때문에, **`each` 블록을 통해 코드를 더 간략화 할 수도 있습니다.**

## Textarea inputs

---

- `textarea` 는 `bind:value` 를 사용하는 텍스트 `input` 과 비슷하게 동작합니다.

```jsx
<textarea bind:value={value}></textarea>
```

- 위와 같이 `value` 와 이름이 맞을 때, 이를 생략할 수도 있습니다.

```jsx
<textarea bind:value></textarea>
```

- 이것은 `textarea` 가 아닌 모든 바인딩에 적용됩니다.

## Select bindings

---

- 또한, `<select>` 와 함께 `bind:value` 를 사용할 수 있습니다.

```jsx
<select bind:value={selected} on:change="{() => answer = ''}">
```

- `<option>` 값은 문자열이 아니라 객체입니다.
  - 스벨트는 이를 신경쓰지 않습니다.

> Because we haven't set an initial value of `selected` , the binding will set it to the default value (the first in the list) automatically. Be careful though — until the binding is initialised, `selected` remains undefined, so we can't blindly reference e.g. `selected.id` in the template.

- (예시의) `selected` 의 초기값을 설정하지 않았기에, 바인딩은 자동으로 디폴트 값(리스트의 첫 번째)으로 정해집니다.
- 그래도 바인딩이 초기화 되기 전에 `selected` 는 `undefined` 로 남아있기에, 이를 참조하는 것에 주의합니다.

## Select bindings

---

- `select` 는 `multiple` 속성을 가질 수 있으므로, 이 경우 단일 값을 선택하는 대신 배열을 채웁니다.

```jsx
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

> Press and hold the `control` key (or the `command` key on MacOS) for selecting multiple options.

- `control` (MacOS의 경우 `command` 키)키를 누른 상태로, 여러 옵션을 선택할 수 있습니다.

## Contenteditable bindings

---

- `contenteditable="true"` 속성이 있는 요소들은 `textContent` 와 `innerHTML` 을 바인딩하도록 돕습니다.

```jsx
<div contenteditable="true" bind:innerHTML={html}></div>
```

## Each block bindings

---

- 또한 `each` 블록 내의 요소들도 바인딩 할 수 있습니다.

```jsx
{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}
```

> Note that interacting with these `<input>` elements will mutate the array. If you prefer to work with immutable data, you should avoid these bindings and use event handlers instead.

- 해당 `input` 요소들과 상호 작용하는 것은 배열을 변형시킵니다.
- 만약, 변경할 수 없는 데이터로 작업하고자 하는 경우, 이러한 바인딩을 지양하고 이벤트 핸들러를 사용해야 합니다.

## Media elements

---

- `audio` 및 `video` 요소에는 바인딩할 수 있는 여러 속성이 있습니다. 이 예시는 그 중 몇 가지를 보여줍니다.

```jsx
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
	bind:currentTime={time}
	bind:duration // Same with bind:duration={duration}
	bind:paused>
	<track kind="captions">
</video>
```

- 이제 비디오를 클릭하면 `time`, `duration`, `paused` 를 적절하게 업데이트 합니다.
  - 이것은 우리가 커스텀 된 컨트롤을 구축할 수 있음을 의미합니다.

> Ordinarily on the web, you would track `currentTime` by listening for `timeupdate` events. But these events fire too infrequently, resulting in choppy UI. Svelte does better — it checks `currentTime` using `requestAnimationFrame`.

- 일반적으로 웹에서 `currentTime` 을 `timeupdate` 이벤트를 수신하는 것으로 추적할 수 있습니다.
- 하지만 해당 이벤트는 드물게 실행되어, UI를 자주 변하게 만듭니다.
- 스벨트는 `requestAnimationFrame` 를 통해 `currentTime` 을 체크하여 이러한 문제를 해결합니다.

### The complete set of bindings for `<audio>` and `<video>`

---

- **Readonly bindings - Six**
  - `duration`: 영상의 총 길이, 초 단위
  - `buffered`: `{start, end}` 객체들의 배열
  - `seekable`: 마찬가지
  - `played`: 마찬가지
  - `seeking`: `boolean`
  - `ended`: `boolean`
- **Two-way bindings - Five**
  - `currentTime`: 영상의 현재 지점, 초 단위
  - `playbackRate`: 영상의 실행 속도, `1`이 보통
  - `paused`: 말그대로 정지
  - `volume`: 0과 1 사이의 값
  - `muted`: `true` 일 때 음소거

> 비디오는 추가적으로 읽기 전용인 `videoWidth` 값과 `videoHeight` 바인딩을 갖습니다.

## Dimensions

---

- 모든 블록 레벨의 요소들은 `clientWidth`, `clientHeight`, `offsetWidth`, `offsetHeight` 값을 갖습니다.

```jsx
<div bind:clientWidth={w} bind:clientHeight={h}>
  <span style="font-size: {size}px">{text}</span>
</div>
```

- 해당 바인딩들은 읽기 전용입니다.
  - `w` 와 `h` 를 변경하더라도, 아무런 효과가 없다는 것을 의미합니다.

> Elements are measured using a technique similar to [this one](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/). There is some overhead involved, so it's not recommended to use this for large numbers of elements.

`display: inline` elements cannot be measured with this approach; nor can elements that can't contain other elements (such as `<canvas>`). In these cases you will need to measure a wrapper element instead.

>

- 요소들은 [다음](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)과 유사한 기술을 사용하여 측정됩니다.
  - 약간의 오버헤드가 수반되기에, 많은 요소에 이를 사용하는 것을 권장하지 않습니다.
- `display: inline` 요소들은 이런 접근을 통해 측정되지 않습니다.
  - 다른 요소를 포함할 수 없는 요소(`<canvas>` 등)도 마찬가지입니다.
  - 이러한 경우 대신 감싸는 요소를 측정해야 합니다.

## This

---

- 읽기 전용인 `this` 바인딩은 모든 요소(그리고 컴포넌트)에 할당하고, 요소를 렌더링 할 수 있는 참조를 얻을 수 있습니다

```jsx
<canvas bind:this={canvas} width={32} height={32}></canvas>
```

- 컴포넌트가 마운트 될 때까지 `canvas` 의 `value` 는 `undefined` 이기에, `onMount` [라이프사이클 함수](https://svelte.dev/tutorial/onmount)를 내부에 추가합니다.

## Component bindings

---

- DOM 요소의 프로퍼티에 바인딩할 수 있는 것처럼, 컴포넌트의 `props` 에도 바인딩할 수 있습니다.
- 예를 들어, 우리는 `<Keypad>` 컴포넌트가 `form` 요소인 것처럼, 해당 컴포넌트의 `value` prop에 바인딩할 수 있습니다.

```jsx
<Keypad bind:value={pin} on:submit={handleSubmit} />
```

> Use component bindings sparingly. It can be difficult to track the flow of data around your application if you have too many of them, especially if there is no 'single source of truth'.

- 컴포넌트 바인딩은 드물게 사용합니다.
- 이것을 많이 사용하면, 특히 “소스의 단일 원천”이 없는 경우 앱 내 데이터의 흐름을 추적하기 어렵습니다.

## Binding to component instances

---

- DOM 요소에 바인딩할 수 있듯이, 컴포넌트 인스턴스 자신에게도 바인딩할 수 있습니다.
- 예를 들어, DOM 요소를 바인딩할 때와 동일한 방식으로 `<InputField>` 의 인스턴스를 `field` 변수에 바인딩할 수 있습니다.

```jsx
<script>
	let field;
</script>

<InputField bind:this={field} />
```

- 이제 `field` 를 사용하여 해당 컴포넌트와 프로그래밍적으로 상호 작용할 수 있습니다.

> Note that we can't do `{field.focus}` since field is undefined when the button is first rendered and throws an error.

- 버튼이 처음 렌더링 되고 에러를 반환했을 때, `field` 가 `undefined` 이기에 `{field.focus}` 를 사용할 수 없습니다.
