---
title: "트리 쉐이킹(Tree shaking) 알아보기"
date: "2022-03-16"
description: "트리 쉐이킹 학습하고 라이브러리에 적용하여 해결책 찾아보기!"
tags: ["Tree-shaking", "Javascript", "Performance"]
thumbnail: "shake-tree.gif"
---

# 들어가며 🏃

---

최근에 사내 디자인 시스템 제작 스프린트에 참여하게 되면서 맹렬히 스토리북에 익숙해지고 있었는데요, 그러기 이전에 저희 디자인 시스템을 이용하면서 컴포넌트를 `import` 할 때마다 [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) 익스텐션을 통해 용량을 확인하면, **뭔가 페이로드에서 상당히 비효율적인 부분이 있는 것 같았습니다.** 여타 라이브러리를 사용할 때에는 용량 크기를 나타내는 텍스트가 빨간색이었던 경우가 없었는데, 저희 라이브러리 내에서 두 가지 혹은 세 가지의 컴포넌트를 동시에 불러오는 경우에도 금세 용량 텍스트가 빨간색으로 변하는 것을 확인했기 때문이죠.

원래 이런건가 싶기도 하고, 그 당시 제가 주담당이 아니기도 했으니 문제를 해결하고자 하는 것은 담당자에게 부담이겠구나 싶어 넘어간 바가 있습니다. 그런데 지금은 제가 해당 프로젝트를 진행하고 있는 스프린트의 담당자이기도 하고, 팀 리더분께서 **이 부분(페이로드가 큰 부분)에 대해 언급을 하시며 트리 쉐이킹에 대해 알아보라고 떠 먹여 주셨으니** 안 할 이유가 없겠죠. 조만간 자바스크립트 스터디를 다시 시작할 예정인데, 그 전에 이 부분에 대해 학습하고 적용해볼 수 있는 기회가 생겼으면 좋겠다 싶어 이렇게 학습하게 되었습니다. 그렇기에 해당 포스팅의 완성은 **트리 쉐이킹의 적용 후 결과까지**일 것 같습니다.

# TL;DR 📋

---

> 막상 저도 포스팅을 다시 볼 때 드는 생각인데, 그대로 다른 포스팅을 옮겨 적으면 무슨 의미가 있나 싶어 주된 해결 및 실습과 같은 내용 외에 이론적인 부분들은 이렇게 간단히 정리할까 싶습니다. **TL;DR**의 어원을 알고 싶으신 분은 [다음 링크](https://ko.wikipedia.org/wiki/TL;DR)에서 확인해주세요.

## Why Tree shaking 🌳

---

- 자바스크립트는 **네트워크 전송될 때 주로 압축**되고, **파싱과 컴파일 및 실행의 과정을 거치면 그 크기가 증가**합니다.
- 성능 개선을 위한 기술 중, [코드 스플리팅(Code Splitting)](https://webpack.js.org/guides/code-splitting/)이라는 기술이 있습니다.
  - 간단히 말해, **자바스크립트 청크로 애플리케이션을 분할**하고, **청크를 필요로 하는 애플리케이션 경로에만 청크들을 배분하여 성능을 개선**하는 기술입니다.
  - 그러나 이 기술을 사용해도 무거운 자바스크립트 애플리케이션의 일반적 문제를 해결할 수 없고, 이에 대한 해답으로 **트리 쉐이킹(Tree shaking)이 있습니다.**

## What is the Tree shaking 🌳

---

- 간단히 말해, **사용하지 않는 코드를 제거하는 방식**입니다.

> In computing, **tree shaking** is **a dead code elimination technique** that is applied when optimizing code. Often contrasted with traditional single-library dead code elimination techniques common to minifiers, **tree shaking eliminates unused functions from across the bundle by starting at the entry point and only including functions that may be executed.**

- 최신 앱에서는 [정적 `import` 구문](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)을 통해 디펜던시들을 가져올 수 있습니다.
- **앱 제작 초기**엔 **비교적 적은 양의 디펜던시**를 가지고 **추가된 디펜던시 대부분을 사용하지만,** 앱 제작이 오래될 수록 **더 많은 디펜던시가 추가**되고, 복잡한 문제를 위해 디펜던시는 빠지지만, **코드에서는 제거되지 못하는 경우**가 존재합니다.
  - 이런 경우 사용하지 않은 대량의 자바스크립트 코드와 함께 앱이 끝나게 됩니다.
- 트리 쉐이킹은 **정적 ES6 모듈의 특정 부분을 가져오는 `import` 구문을 사용**하여 문제를 해결할 수 있습니다.
  - 말 그대로, 필요한 부분만 가져온다는 것입니다.

# How to Tree shaking? 🤔

---

> 이 부분부터는 참고한 사이트 별로 요약을 진행하겠습니다. 요약은 제 기준 **실제 프로젝트에 적용에 있어 문제 없을 정도로만** 진행할 예정입니다.

## TOAST UI : 트리 쉐이킹으로 자바스크립트 페이로드 줄이기

---

해당 내용의 목차는 다음과 같습니다.

- 트리 쉐이킹 할 수 있는 지점 찾기
- Babel로 ES6 모듈이 CommonJS 모듈로 변환되는 것 막기
- 사이드 이펙트 고려하기
- 원하는 것만 가져오기
- 잘 되지 않을 때

### 트리 쉐이킹 할 수 있는 지점 찾기

---

- 앱에서 트리 쉐이킹 할 수 있는 지점을 찾는 것은 **정적 `import` 구문을 찾는 것입니다.**

```js
import * as utils from "../../utils/utils";
```

- 위 `import` 구문은 **`utils` 모듈로부터 모든 것을 `import` 해 `utils` 네임스페이스에 추가하라는 것**을 의미합니다.
  - 모든 것들을 사용한다면 다행이지만, 그렇지 않은 경우에는 **특정 함수만을 실행하기 위해 비효율을 발생시키는 일**일 것입니다.

### Babel로 ES6 모듈이 CommonJS 모듈로 변환되는 것 막기

---

- [Babel](https://babeljs.io/)은 많은 앱에 없어선 안되는 도구이지만, Babel의 특정 기능 때문에 **트리 쉐이킹 같은 간단한 작업을 어렵게 만들 수 있습니다.**
- [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/)를 사용하면 **ES6 모듈(`import`)을 CommonJS 모듈(`require`)로 변환**해줍니다.
  - 트리 쉐이킹은 CommonJS 모듈에서 하기 어렵고, webpack은 사용하려는 번들에서 무엇을 제거해야할지 모릅니다.
  - 이를 위해 **ES6 모듈만 남도록 `babel-preset-env` 를 설정합니다.**

```ts
{
  "presets": [
    ["env", {
      "modules": false
    }]
  ]
}
```

### 사이드 이펙트 고려하기

---

- 앱에서 사용하지 않는 디펜던시를 제거할 때 고려할 점은 **프로젝트 모듈들이 사이드 이펙트를 발생시키는지 여부**입니다.
  - 이에 대한 하나의 예시로 특정 함수가 스코프 밖 요소를 변경하는 것이 있습니다.
- 사이드 이펙트는 ES6 모듈에서도 적용되며, **트리 쉐이킹의 컨텍스트에서 문제**가 됩니다.
  - **예측 가능한 입력을 가지고 사이드 이펙트 없이 예측 가능한 결과를 반환하는 모듈**이 안전하게 트리 쉐이킹을 할 수 있는 디펜던시입니다.
- webpack에서 고려할 부분은 **`package.json` 파일에서 `"sideEffects": false` 로 설정**하면 패키지와 디펜던시들이 사이드 이펙트를 발생하지 않는다는 것입니다.

```ts
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": false
}
```

- 선택적으로, **사이드 이펙트의 영향을 받지 않을 특정 파일들을 지정**할 수도 있습니다.

```ts
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": [
    "./src/utils/utils.js"
  ]
}
```

### 원하는 것만 가져오기

---

```ts
// before
import * as utils from "../../utils/utils";
```

```ts
// after
import { simpleSort } from "../../utils/utils";
```

- 정적 `import` 구문을 통해 다음과 같이 **부분적으로 가져올 수 있습니다.**

### 잘 되지 않을 때

---

- 항상 **예외는 있습니다.** 다음의 [Lodash](https://lodash.com/) 예시와 같이 트리 쉐이킹이 잘 동작하지 않는 경우도 있습니다.

```ts
// 설정이 잘 되어있어도 lodash 모든 것들을 가져온다.
import { sortBy } from "lodash";

// sortBy 경로에서 가져온다.
import sortBy from "lodash-es/sortBy";
```

- 실행한 라이브러리가 트리 쉐이킹에 반응하지 않는다면, **ES6 구문을 사용하여 메서드를 내보내는지 확인해봅시다.**

### 참고

---

- [TOAST UI : 트리 쉐이킹으로 자바스크립트 페이로드 줄이기](https://ui.toast.com/weekly-pick/ko_20180716)
- [Web.dev : Reduce JavaScript payloads with tree shaking(원본)](https://web.dev/reduce-javascript-payloads-with-tree-shaking/#go_shake_some_trees)
