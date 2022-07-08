---
title: "스벨트 기초 학습 : Motion ~ Transitions"
date: "2022-03-09"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["svelte", "Tech", "Basics"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Motion

---

## Tweened

---

- 스벨트에선 애니메이션을 사용하여 변경 사항을 전달하여 매끄러운 유저 인터페이스를 구축하는데 도움이 되는 도구들이 있습니다.
- 그 중, `tweened` 를 활용하여 애니메이션을 추가해보겠습니다.

```tsx
<script>
  import {tweened} from 'svelte/motion'; const progress = tweened(0);
</script>
```

- 애니메이션이 추가되긴 했지만 자연스럽지 않은 것 같습니다.
- 이를 위해, 추가할 수 있는 기능들이 몇 가지 더 있습니다.

```tsx
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>
```

> The `svelte/easing` module contains the [Penner easing equations](https://web.archive.org/web/20190805215728/http://robertpenner.com/easing/), or you can supply your own `p => t` function where `p` and `t` are both values between 0 and 1.

- `svelte/easing` 모듈은 [Penner easing equations](https://web.archive.org/web/20190805215728/http://robertpenner.com/easing/)를 포함하거나, 모두 0과 1 사이의 값인 고유한 `p => t` 함수를 제공할 수 있습니다.

### Parameters of Tweened

---

- `delay`: 트위닝이 시작하기 전 대기 시간
- `duration`: 트위닝의 지속시간
  - `milliseconds` 혹은 `(from, to) => milliseconds` 함수
    - **(예시)** 함수의 경우, 값의 더 큰 변화에 대해 더 긴 트위닝을 제공할 수 있는 함수
- `easing`: `p => t` 함수
- `interpolate`: 임의의 값 사이를 보간하기 위한 커스텀 `(from, to) => t => value` 함수
  - 기본적으로 숫자, 날짜, 동일한 모양의 배열과 객체 사이를 보간합니다
    - 숫자와 날짜 또는 기타 유효한 배열과 객체만 포함하는 한
  - **(예를 들어)** 색상 문자열이나 변환 행렬을 보간하려면 사용자 정의 보간기를 제공하십시오.

> **보간**(Interpolation)
> 인접한 데이터 점에 적합한 함수(일반적으로 다항식) 조각을 맞추어 **데이터의 중간 값을 찾는 프로세스**

- 또한, `progress.set` 과 `progress.update` 를 두 번째 인자로 전달할 수 있습니다.
  - 이 경우, 기본값을 무시합니다.
  - `set` 및 `update` 메서드는 모두 트위닝이 완료될 때, `resolved` 되는 프로미스를 반환합니다.

## Spring

---

- `spring` 함수는 자주 변경하는 값에 대해 더 잘 작동할 수 있도록 만들 수 있는 `tweened` 의 대안입니다.
- 예를 들어, **원의 좌표를 나타내는 값**과 **원의 크기를 나타내는 값이 있다고 가정합니다.**

```tsx
<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 });
	let size = spring(10);
</script>
```

- 이를 다음과 같이 `spring` 함수를 통해 값을 할당하면, 두 가지 값 모두 다 `stiffness` 와 `damping` 을 활용하여 탄력성을 조절할 수 있습니다.

```tsx
let coords = spring(
  { x: 50, y: 50 },
  {
    stiffness: 0.1,
    damping: 0.25,
  }
);
```

- 위와 같이 초깃값을 설정할 수도 있습니다.

# Transitions

---

## Adding parameters

---

- **트랜지션 함수**는 인자를 받을 수 있습니다.

```tsx
<script>import {fly} from 'svelte/transition'; let visible = true;</script>
```

- 위와 같이 `fly` 트랜지션을 `import` 하고, 다음과 같이 옵션을 추가합니다.

```tsx
<p transition:fly="{{ y: 200, duration: 2000 }}">Flies in and out</p>
```

- 트랜지션은 **되돌릴 수 있습니다.** ⇒ **Reversible 합니다.**
- 또한, 전환되는 시점은 시작과 끝이 아닌 **현재 시점입니다.**

## In and out

---

- `transition` 지시문을 사용하는 것 대신, `in`, `out` 지시문을 사용할 수 있습니다.
  - `in`, `out` 지시문은 둘 다 있을 수도 있고, 하나만 있을 수도 있습니다.
- 다음의 예시에선, 들어갈 땐(도입엔) `fade` 를 사용하고, 나올 땐(퇴장엔) `fly` 를 사용하도록 합니다.

```tsx
<p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
  Flies in, fades out
</p>
```

- 이 경우엔 `transtion` 이 Reversible 하지 않습니다.

## Custom CSS transitions

---

- `svelte/transition` 모듈에는 몇 가지 내장 트랜지션이 존재하지만, 커스텀 트랜지션을 만드는 것은 매우 쉽습니다.
- 다음의 예시는 `fade` 트랜지션의 소스입니다.

```tsx
function fade(node, { delay = 0, duration = 400 }) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: (t) => `opacity: ${t * o}`,
  };
}
```

- 이 함수는 두 가지 인수(트랜지션이 적용되는 노드와 전달된 매개변수)를 받고, 다음의 속성을 가질 수 있는 트랜지션 객체를 반환합니다.
  - `delay`
  - `duration`
  - `easing`: `p => t` 함수
  - `css`: `(t, u) => css` ⇒ CSS의 변화
    - 여기서 `u === 1 - t`
  - `tick`: `(t, u) => {...}`
    - 노드에 영향을 주는 함수
- `t` 값은 인트로의 시작 혹은 아웃트로의 끝인 `0` 과 인트로의 끝 혹은 아웃트로의 시작인 `1` 에 있습니다.
- 가능한 버벅거림을 방지하기 위해 CSS 애니메이션이 기본 쓰레드에서 실행되므로, 대부분 `tick` 속성이 아닌 `css` 속성을 반환해야 합니다.
- 스벨트는 트랜지션을 **시뮬레이션** 하고, CSS 애니메이션을 구성한 다음 실행할 수 있습니다.
- 예를 들어, `fade` 트랜지션은 다음과 같은 CSS 애니메이션을 생성합니다.

```tsx
0 % { opacity: 0 };
10 % { opacity: 0.1 };
20 % { opacity: 0.2 };
/* ... */
100 % { opacity: 1 };
```

- 이를 다음과 같이 변경할 수도 있습니다.

```tsx
<script>
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = true;

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}
</script>
```

## Custom JS transitions

---

- 일반적으로 트랜지션에는 CSS를 최대한 많이 사용해야 하지만, 타자기 효과와 같이 자바스크립트 없이는 얻을 수 없는 몇 가지 효과가 있습니다.

```tsx
function typewriter(node, { speed = 1 }) {
  const valid =
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
}
```

## Transition events

---

- 트랜지션이 언제 시작하고, 끝나는 지 알 수 있을 때 좋은 순간이 있습니다.
- 스벨트는 다른 DOM 이벤트처럼 전달받을 수 있는 이벤트들을 전달합니다.

```tsx
<p
  transition:fly="{{ y: 200, duration: 2000 }}"
  on:introstart="{() => status = 'intro started'}"
  on:outrostart="{() => status = 'outro started'}"
  on:introend="{() => status = 'intro ended'}"
  on:outroend="{() => status = 'outro ended'}"
>
  Flies in and out
</p>
```

## Local Transitions

---

- 일반적으로 컨테이너 블록이 추가되거나 제거되면 요소에 트랜지션이 실행됩니다.
- 이때, **부분적인 트랜지션 적용**을 원하는 경우가 있습니다.
- 이를 `|local` 트랜지션을 통해 해결할 수 있습니다.

```tsx
<div transition:slide|local>
	{item}
</div>
```

## Deferred transitions

---

- 특히, 스벨트 트랜지션 엔진의 강력한 기능은 **트랜지션을 연기(지연)**하여 여러 요소 간에 조정할 수 있다는 점입니다.
- `send` 와 `receive` 라고 불리는 한 쌍의 트랜지션들을 생성하는 `crossfade` 함수를 사용하여 이 효과를 얻을 수 있습니다.
  - 요소가 전송되었을 때, 수신되는 해당 요소를 찾고, 상대방의 위치로 변환하고, 페이드 아웃하는 트랜지션을 생성합니다.
  - 요소가 수신되면 반대 상황이 발생합니다.
  - 상대가 없으면, `fallback` 트랜지션이 발생합니다.
- 다음과 같이 `send` 와 `receive` 를 추가합니다.

```tsx
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
>
```

## Key blocks

---

- `#key` 블록은 표현식의 값이 변경할 때 내용을 파괴하고 다시 재생성합니다.

```tsx
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

- 이는 요소가 DOM에 들어오거나 나갈 때 말고도, 값이 변경될 때마다 요소가 트랜지션을 실행하도록 할 때 유용합니다.
