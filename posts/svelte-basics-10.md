---
title: "스벨트 기초 학습 : Module context ~ Debugging + Short Review"
date: "2022-03-15"
description: "핫하디 핫한 스벨트에 대해 간단히 학습해봅니다."
tags: ["svelte", "Tech", "Basics", "Review"]
thumbnail: "svelte_logo.png"
---

> 📖 스벨트 학습을 위해 스벨트 공식문서 내 튜토리얼 진행 후 내용 필기 작성

# Module context

---

## Sharing code

---

- 지금까지의 모든 예제에서 `<script>` 블록에는 컴포넌트 인스턴스가 초기화될 때 실행되는 코드가 포함되어 있습니다.
  - 대부분의 컴포넌트에는 그것이 필요한 전부입니다.
- 아주 가끔 개별 컴포넌트의 외부에서 일부 코드를 실행해야 합니다.
- 예를 들어, 여러 개의 음악 플레이어 중 하나를 실행하면, 실행 중이던 나머지 플레이어를 중지하도록 해봅시다.
  - 이를 `<script context="module">` 블록을 통해 가능합니다.
  - 이렇게 되면, 블록 내의 코드는 인스턴스화될 때가 아닌, 모듈의 첫 평가에만 실행됩니다.

```jsx
<script context="module">
	let current;
</script>

...

<script>
	function stopOthers() {
		if (current && current !== audio) current.pause();
		current = audio;
	}
</script>
```

- 이제 컴포넌트가 상태 관리 없이 서로 상호 작용할 수 있습니다.

## Exports

---

- `<script context="module">` 블록에서 `export` 된 모든 것들은 모듈 자체에서 `export` 가 됩니다.
- 가령, 위 예시에서 모든 플레이어를 중단하는 기능을 가진 버튼을 만든다고 가정해봅시다.
  - 우선, 다음과 같이 모든 플레이어를 중단하는 함수를 추가하여 `export` 해줍니다.

```jsx
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>
```

- 그렇다면, 다음과 같이 `import` 할 수 있습니다.

```jsx
<script>import AudioPlayer, {stopAll} from './AudioPlayer.svelte';</script>
```

- 이를 버튼의 `on:click` 핸들러에 추가하여 활용합니다.

```jsx
<button on:click={stopAll}>stop all audio</button>
```

> You can't have a default export, because the component *is* the default export.

- 컴포넌트 자체가 Default export 이기에, Default export 를 가질 수 없습니다.

# Debugging

---

## The @debug tag

---

- 경우에 따라, 데이터가 앱을 통과할 때마다 데이터를 검사하는 것이 좋습니다.
- 한 가지 접근 방식은 `console.log` 를 마크업 내부에서 사용하는 것입니다.
  - 만약 실행을 일시중지 하고 싶다면, 쉼표로 구분된 검사 대상 목록과 `{@debug ...}` 태그를 사용할 수 있습니다.

```jsx
{@debug user}

<h1>Hello {user.firstname}!</h1>
```

- 이제 개발자 도구를 켜고 `user` 값이 변경시키면, 이에 디버거가 트리거됩니다.

# Short review

---

2월 말부터 시작해서 간간히 자투리 시간에 진행했던 스벨트 튜토리얼의 유종의 미를 이제야 거뒀습니다. 매일 한 것은 아니지만, 이렇게 놓고 보니 그렇게 오래 걸릴 일이었나 싶다가도, 중간에 많은 일들이 있었으니 어쩌면 빨리 끝난 편이었겠다 싶기도 했습니다. 중간에 연습한다고 간단하게 토이 프로젝트랍시고 만든 것은, 모바일로 틀어보니 아주 개박살이 나있더군요. 그렇게 간단히 완성하고 난 뒤의 저의 마음은 참 허무하기 짝이 없었습니다.

그러고 나서 돌이켜보니, **확실히 제대로 공부한 내용은 그렇게 많지 않았던 것 같습니다.** 여기서 확실히 제대로 공부했다의 의미는 집요하게 파고 들었던 내용을 말합니다. 중간에 모른다고 생각이 든다면, 잠시 쉬었다가 제대로 서치를 진행해보든, 내용을 제대로 이해하고자 다시 한 번 들여다 보든 했어야 했던 것 같은데 그러지 않았던 것이 화근이 되었던 것 같습니다. 그래서 튜토리얼을 **다시금 반복하면서 예시 레포지토리**를 다시 만들까 싶습니다. 튜토리얼을 진행할 때 예시 코드 전체를 보면서 진행했다면 좀 더 스벨트의 코드 구조에 대한 이해가 잘되었을텐데, 급한 마음에 그러지 않았고 다시금 그러한 과정을 진행하려는 것입니다.

3개월 동안 근무를 하면서 학습적인 부분에 있어서도 느낀점이 참 많은 것 같습니다. 우선 습관 부분에서 **블로그 게시물 보다 공식 문서를 우선적으로 읽으려 하는 것**과 새로운 기술 스택을 배울 때, 공식 홈페이지에서 제공하는 **튜토리얼을 먼저 진행해보는 것**이 이에 해당할 것 같네요. 쉽다는 말을 너무 쉽게 맹신하지 않고 제대로 공부하는 것이 중요한 것 같다는 생각이 매 학습마다 느끼는 바입니다. 좀 더 열심히 정진해야할 것 같습니다.
