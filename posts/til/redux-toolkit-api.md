---
title: Redux Toolkit API 정리하기
date: "2022-01-18"
description: "리덕스 툴킷을 사용하는데 있어 공식문서의 API Reference를 정독하고 정리합니다."
tags: ["Redux", "Redux-toolkit", "API", "Reference"]
thumbnail: "redux_logo.png"
---

# 들어가며

---

**Redux Toolkit** 패키지는 다음과 같은 이유를 해결하기 위해 만들어졌습니다.

- 리덕스 **저장소(store) 구성이 너무 복잡**합니다.
- 리덕스에서 유용한 작업을 수행하기 위해 **여러 패키지를 추가해야 합니다.**
- 리덕스는 **많은 [보일러플레이트 코드](https://en.wikipedia.org/wiki/Boilerplate_code)를 요구합니다.**

이를 보면 Redux Toolkit은 **리덕스 사용에 있어 편의를 위해 만들어진 패키지라는 것**을 대략적으로 알 수 있습니다. 그렇기에 리덕스 툴킷은 앞으로의 프로젝트에 있어 유용히 사용할 예정에 있기 때문에 이를 학습할 필요성이 있습니다.

그러한 연유로 [리덕스 툴킷 공식문서](https://redux-toolkit.js.org/introduction/getting-started)의 **API Reference**를 참고하여 **각 API의 사용 이유와 활용법**에 대해 간단히 숙지할 예정입니다.

# API Reference

---

공식문서에서 API Reference는 **크게 저장소 설정 관련, 리듀서 및 액션 관련 그리고 나머지로 구분됩니다.** 해당 포스팅의 순서 또한 이를 따라갈 것이며 **번역과 동시에 요약을 진행합니다.**

## Store Setup(저장소 설정)

---

**초기 저장소(store) 설정**과 관련된 내용으로 **`configureStore`, `getDefaultMiddleware`, Immutability Middleware, Serializability Middleware**의 내용을 포함합니다.

### [`configureStore`](https://redux-toolkit.js.org/api/configureStore)

---

> A friendly abstraction over the standard **Redux `createStore` function** that adds good defaults to the store setup for a better development experience.

리덕스 표준에서 **[`createStore`](https://redux.js.org/api/createstore) 함수**로 익숙한 기능입니다. 보다 좋은 개발 경험을 위해 **저장소 설정에 있어 기본 값을 제공합니다.**

#### Parameters

---

`configureStore` 는 **단일 객체 형태**를 인자로 받으며, 다음 **5개의 필드를 갖습니다.**

- `reducer`: 저장소에 할당할 **리듀서에 대한 인자**입니다.
  - **단일 리듀서 함수**의 경우 이를 **루트 리듀서**로 활용합니다.
  - **슬라이스 리듀서 객체**의 경우 **[`combineReducers`](https://redux.js.org/api/combinereducers) 에 자동으로 전달**하여 루트 리듀서를 생성합니다.
- `middleware`: **리덕스 미들웨어 함수의 선택적 배열 인자**입니다.
  - 인자를 추가하면 **추가하고자 하는 미들웨어 함수를 자동으로 [`applyMiddleware`](https://redux.js.org/api/applymiddleware)로 넘겨서 이를 추가합니다.**
  - 인자가 없으면 **`getDefaultMiddleware` 에서 반환하는 미들웨어 함수를 적용**합니다.
- `devTools`: **Redux Devtools Extension에 대한 내용을 포함하는 인자**이며 기본값은 `true` 입니다.
  - `boolean` 값이 들어올 경우, **Extension에 대한 지원 활성화 여부를 판단**하는데 사용합니다.
  - 객체일 경우 **Extension은 활성화** 되고 **options 객체가 `composeWithDevtools()` 로 전달**됩니다.
- `preloadedState`: `createStore` 함수에 전달되는 **선택적 초기 상태 값**입니다.
- `enhancers`: **[Store Enhancer](https://redux.js.org/understanding/thinking-in-redux/glossary#store-enhancer)와 관련된 내용을 포함하는 인자**입니다.
  - 배열로 할당하면 **[`compose`](https://redux.js.org/api/compose) 함수에 의해 결합**되어 `createStore` 에 전달됩니다.
  - 콜백 함수일 경우, **인자가 기존 Enhancers 배열로 호출되며 새로운 Enhancer 배열을 반환**해야합니다.

#### Example

---

```ts
// Basic

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
```

### [`getDefaultMiddleware`](https://redux-toolkit.js.org/api/getDefaultMiddleware)

---

> By default, `configureStore` **adds some middleware** to the Redux store setup **automatically.**

**미들웨어의 기본 값 목록**을 반환하는 함수로 **리덕스 저장소 설정에서 일부 미들웨어를 자동으로 추가합니다.**

`configureStore` 에서 `middleware` 필드에 나열된 미들웨어 외에는 추가하지 않기에 모든 `middleware` 를 정의해야합니다. 그런 의미에서 해당 함수는 **기본 미들웨어와 커스텀 미들웨어를 함께 추가하고자 할 때** 유용합니다.

예시를 보시면 이해가 더 쉽습니다.

#### Example

---

```ts
import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Store has all of the default middleware added, _plus_ the logger middleware
```

`middleware` 필드의 값으로 **`getDefaultMiddleware` 함수를 인자로 받는 콜백 함수**를 할당하고 `getDefaultMiddleware()` 함수를 통해 **기본 미들웨어**를 반환하고 해당 미들웨어 목록에 **`concat` 메소드**를 통해 `logger` 라는 미들웨어를 결합하였습니다. 이렇게 기존 미들웨어와 추가하고자 하는 미들웨어를 결합하여 반환할 수 있습니다.

주의할 점은 결합에 있어 **[`.concat(...)`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 과 [`.prepend(...)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend) 메서드를 지향**하고 [`spread operator`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 방식을 지양하는 것입니다. 이는 상황에 따라 후자는 형식 정보를 잃을 수 있기 때문이라고 합니다.

#### Included Default Middleware

---

그렇다면 위 `getDefaultMiddleware` 가 반환하는 **기본 미들웨어**는 어떤 것인지에 대해 알아봅시다. 이를 위해 잠시 리덕스 툴킷의 목표 중 하나를 간단하게 알아보고 넘어가겠습니다.

리덕스 툴킷은 고정된 **기본 값을 제공하여 일반적인 실수를 방지하고자 하는 것**을 목표 중 하나로 갖고 있습니다. 이를 위해 **개발 모드와 배포 모드를 구분**지어 기본 미들웨어를 다르게 제공합니다. **개발 모드**의 경우 **런타임 검사를 위해 제공되는 추가되는 다음의 일부 미들웨어를 포함한 상태로 반환합니다.**

- [Immutability check middleware](https://redux-toolkit.js.org/api/immutabilityMiddleware)
- [Serializability check middleware](https://redux-toolkit.js.org/api/serializabilityMiddleware)

그러므로 최종적으로 반환되는 기본 미들웨어는 다음과 같습니다.

```ts
// In Development mode
const middleware = [thunk, immutableStateInvariant, serializableStateInvariant];

// In Production mode
const middleware = [thunk];
```

#### Customizing the Included Middleware

---

제공되는 기본 미들웨어를 다음의 **두 가지 방법으로 커스터마이징**을 진행할 수도 있습니다. 해당 방법들은 **`getDefaultMiddleware` 함수의 객체 인자로서 제공**되며 객체 내부 필드에 값을 할당하는 것으로 가능합니다.

- 특정 미들웨어 필드에 **`false` 값을 할당하여 반환 배열에서 제외**할 수 있습니다.
- 특정 미들웨어 필드에 **객체 형태의 옵션 값을 할당하여 커스터마이징 된 옵션을 적용**할 수 있습니다.

위 커스터마이징은 다음과 같이 사용 가능합니다.

```ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { myCustomApiService } from "./api";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService, // option 제공
      },
      serializableCheck: false, // 비활성화
    }),
});
```

### [Immutability Middleware](https://redux-toolkit.js.org/api/immutabilityMiddleware)

---

> A port of the [`redux-immutable-state-invariant`](https://github.com/leoasis/redux-immutable-state-invariant) middleware, customized for use with Redux Toolkit. Any detected mutations will be thrown as errors.

이전 `getDefaultMiddleware` 부분에서 언급된 `default middleware` 와 관련된 내용입니다. **`redux-immutable-state-invariant` 미들웨어의 포트**이며 리덕스 툴킷에서 사용하기 위해 커스터마이징 되었습니다.

> **포트**란 컴퓨터에서 외부의 다른 장비와 접속하기 위한 플러그를 의미한다는데 이러한 맥락에서 **해당 미들웨어를 불러오기 위한 것**이라고 해석했습니다.

위에서 봤듯이 `configureStore` 와 `getDefaultMiddleware` 에 의해 기본 미들웨어로 추가될 수 있고, 다음과 같은 형식의 **옵션**을 통해 **미들웨어의 동작을 커스터마이징** 할 수도 있습니다.

```ts
type IsImmutableFunc = (value: any) => boolean;

interface ImmutableStateInvariantMiddlewareOptions {
  isImmutable?: IsImmutableFunc;

  ignoredPaths?: string[];

  warnAfter?: number;

  ignore?: string[];
}
```

#### Exports

---

`createImmutableStateInvariantMiddleware` 를 통해 **인스턴스를 별도로 생성**하고 옵션을 추가할 수도 있습니다. 이는 대개 `getDefaultMiddleware` 가 이를 진행하기에 불필요할 것입니다.

```ts
// file: exampleSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  name: "example",
  initialState: {
    user: "will track changes",
    ignoredPath: "single level",
    ignoredNested: {
      one: "one",
      two: "two",
    },
  },
  reducers: {},
});

export default exampleSlice.reducer;

// file: store.ts
import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";

import exampleSliceReducer from "./exampleSlice";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ["ignoredPath", "ignoredNested.one", "ignoredNested.two"],
});

const store = configureStore({
  reducer: exampleSliceReducer,
  // Note that this will replace all default middleware
  middleware: [immutableInvariantMiddleware],
});
```

위 예시를 `getDefaultMiddleware` 를 활용하여 다른 미들웨어를 제거하지 않고 동일하게 진행할 수 있습니다.

```ts
import { configureStore } from "@reduxjs/toolkit";

import exampleSliceReducer from "./exampleSlice";

const store = configureStore({
  reducer: exampleSliceReducer,
  // This replaces the original default middleware with the customized versions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ["ignoredPath", "ignoredNested.one", "ignoredNested.two"],
      },
    }),
});
```

그리고 **특정 값을 변경할 수 없는 가에 대한 기본적인 사항**은 다음과 같습니다.

```ts
return (
  typeof value !== "object" || value === null || typeof value === "undefined"
);
```

이는 **원시 타입**에 대해 `true` 를 반환합니다.

### Serializability Middleware

---

> A custom middleware that detects if any non-serializable values have been included in state or dispatched actions, modeled after `redux-immutable-state-invariant`. Any detected non-serializable values will be logged to the console.

**직렬화 되지 않는 값이 `state` 혹은 `dispatch` 된 `action` 에 포함되어 있는 지에 대한 내용**을 감지하고 `console` 에 기록합니다.

마찬가지로 `default middleware` 중 하나이며, `configureStore` 와 `getDefaultMiddleware` 에 의해 기본 미들웨어로 추가되고 커스터마이징 또한 가능합니다.

```ts
interface SerializableStateInvariantMiddlewareOptions {
  isSerializable?: (value: any) => boolean;

  getEntries?: (value: any) => [string, any][];

  ignoredActions?: string[];

  ignoredActionPaths?: string[];

  ignoredPaths?: string[];

  warnAfter?: number;

  ignoreState?: boolean;
}
```

#### `createSerializableStateInvariantMiddleware​`

---

위와 동일합니다. 해당 미들웨어의 인스턴스를 만들 수 있으며, `getDefaultMiddleware` 에서 이미 호출하고 있기에 직접 호출할 필요는 없습니다.

```ts
import { Iterable } from "immutable";
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";
import reducer from "./reducer";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
  Iterable.isIterable(value) || isPlain(value);

const getEntries = (value: any) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

const store = configureStore({
  reducer,
  middleware: [serializableMiddleware],
});
```

#### `isPlain`

---

주어지는 값이 **`plain value`으로 간주되는 지에 대한 여부**를 판단합니다.

```ts
import isPlainObject from "./isPlainObject";

export function isPlain(val: any) {
  return (
    typeof val === "undefined" ||
    val === null ||
    typeof val === "string" ||
    typeof val === "boolean" ||
    typeof val === "number" ||
    Array.isArray(val) ||
    isPlainObject(val)
  );
}
```

## Reducers and Actions(리듀서와 액션)

---

**`reducer` 및 `action` 과 관련 있는 내용**으로 **`createReducer`, `createAction`, `createSlice`, `createAsyncThunk`, `createEntityAdapter`의 내용**을 포함합니다.

### [`createReducer`](https://redux-toolkit.js.org/api/createReducer)

---

> **A utility that simplifies creating Redux reducer functions.** It uses **Immer** internally to drastically **simplify immutable update logic by writing "mutative" code** in your reducers, and supports directly mapping specific action types to case reducer functions that will update the state when that action is dispatched.

**리듀서 함수를 만드는 것을 간단하게 해주는 유틸리티**입니다. 해당 함수는 내부에 **Immer 라이브러리**를 사용하여 리듀서에 **변화 가능한 코드를 작성하고**, 이를 통해 **변경 불가능한 로직 대폭 단순화 할 수 있습니다.** 또한 **특정 액션들을 상태 업데이트를 위한 리듀서 함수로 매핑**하여 `dispatch` 될 때 이를 실행할 수 있도록 합니다.

대개 리듀서 함수는 다음과 같이 생성할 수 있습니다.
