---
title: "Redux Toolkit API 정리하기 : Reducers and Actions"
date: "2022-01-29"
description: "리덕스 툴킷을 사용하는데 있어 공식문서의 API Reference를 정독하고 정리합니다."
tags: ["Redux", "Redux-toolkit", "API", "Reference"]
thumbnail: "redux_logo.png"
---

# Reducers and Actions(리듀서와 액션)

---

**`reducer` 및 `action` 과 관련 있는 내용**으로 **`createReducer`, `createAction`, `createSlice`, `createAsyncThunk`, `createEntityAdapter`의 내용**을 포함합니다.

## [`createReducer`](https://redux-toolkit.js.org/api/createReducer)

---

> **A utility that simplifies creating Redux reducer functions.** It uses **Immer** internally to drastically **simplify immutable update logic by writing "mutative" code** in your reducers, and supports directly mapping specific action types to case reducer functions that will update the state when that action is dispatched.

**리듀서 함수를 만드는 것을 간단하게 해주는 유틸리티**입니다. 해당 함수는 내부에 **Immer 라이브러리**를 사용하여 리듀서에 **변화 가능한 코드를 작성하고**, 이를 통해 **변경 불가능한 로직 대폭 단순화 할 수 있습니다.** 또한 **특정 액션들을 상태 업데이트를 위한 리듀서 함수로 매핑**하여 `dispatch` 될 때 이를 실행할 수 있도록 합니다.

대개 리듀서 함수는 다음과 같이 생성할 수 있습니다.

```ts
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    case "decrement":
      return { ...state, value: state.value - 1 };
    case "incrementByAmount":
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}
```

위 예시의 경우 `switch` 문을 활용하여 `counterReducer` 라는 리듀서를 작성하였습니다. 이러한 경우 다음과 같은 문제를 야기할 수 있다고 합니다.

> This approach works well, but is a bit **boilerplate-y and error-prone.** For instance, it is easy to forget the `default` case or setting the initial state.

리덕스 툴킷의 필요 이유와 문맥상 **보일러플레이트 코드 측면에서의 문제와 에러를 발생시키는 경향이 있다**고 이해할 수 있을 것 같습니다. 이에 대한 예시로 **`default` 구문이나 초기값을 명시를 잊는 것**을 말할 수 있습니다.

이러한 문제를 `createReducer` 를 통해 해결할 수 있고, **두 가지(Builder callback notation, Object notation)의 리듀서 정의 방식**을 갖고 있습니다. 이 중 **Builder callback notation**이 선호됩니다.

### Builder Callback Notation

---

해당 방식은 **`builder` 라는 객체**를 인자로 받아 사용하는데, `builder` 객체는 **리듀서가 처리할 액션의 유형을 정의하기 위한 `addCase` , `addMatcher` , `addDefault` 함수를 포함**합니다. 또한 타입스크립트나 대부분의 IDE에서 효과적인데, 이는 `builder callback` 방식을 지향하는 이유 중 하나입니다.

`builder callback` 방식은 다음의 인자로 구성됩니다.

- **initialState:** **초기값을 설정**할 수 있는 영역으로, **리듀서가 처음 호출될 때 사용되는 값**입니다. 해당 인자는 `State | (() => State)` 형태를 갖는데, 후자의 경우 **초기화 지연 함수**로 사용될 수 있습니다. 해당 방식은 주로 **초기값이 `undefined` 로 할당될 때** 사용되며, `localStorage` 등에서 초기값을 읽어올 때 유용합니다.

> **lazy Initialization:** _which should **return an initial state value when called.**_
>
> - **= 초기화 지연:** 객체 생성, 값 계산, 또는 일부 기타 **비용이 많이 소모되는 과정을 필요 시점까지 지연시키는 방식**을 말합니다.

- **builderCallback:** 리듀서를 정의할 메소드를 포함한 **`builder` 객체**를 받는 함수입니다.

해당 메소드들은 다음과 같습니다.

- `builder.addCase`: **단일 액션 유형을 다루기 위한 리듀서를 추가**합니다. 해당 함수는 `builder.addMatcher` 혹은 `builder.addDefaultCase` 보다 앞에 작성해야합니다. 다음의 인자를 갖습니다.
  - **actionCreator:** 작업 유형을 결정하는 **문자열의 일반 액션 유형** 혹은 **`createAction` 에 의해 생성된 액션**이 할당됩니다.
  - **reduce:** 실제 리듀서 함수
- `builder.addMatcher`: `action.type` 이 일치하는 경우에 실행하는 것 외에 **콜백 함수의 반환 값으로** 리듀서 실행 여부를 결정할 수 있습니다. 여러 `match reducer` 가 일치하면, `case reducer` 가 이미 일치하더라도 **정의된 순서대로 실행됩니다.** `builder.addMatcher` 는 `addCase` 와 `addDefaultCase` 사이에 와야합니다. 또한, 다음의 인자를 갖습니다.
  - **matcher**: 매칭시키는 함수입니다. 타입스크립트에선 [type predicate](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) function이어야 합니다.
  - **reducer**: 실제 리듀서 함수
- `builder.addDefaultCase`: 말그대로 `default case` 를 정의합니다. 이는 **`switch` 문의 `default`** 와 같이 **어떤 리듀서와도 매칭이 되지 않았을 때, 실행되는 액션을 포함합니다.** 다음의 인자를 갖습니다.
  - **reducer**: `default case` 의 리듀서 함수입니다.

### Map Object Notation

---

`Map Object` 방식은 **`key` 가 `action.type` 이고 값이 해당 액션 타입을 다루는 리듀서 함수인 객체**를 활용합니다. 해당 방식이 보다 더 간략하지만 **타입스크립트가 아닌 자바스크립트에서만 쓸 수 있다는 점과, IDE와의 통합이 적은 이유**로 `builder callback` 방식을 지향합니다. 그리고 다음의 인자를 갖습니다.

- **initialState:** `builder callback` 방식의 인자와 동일합니다.
- **actionsMap: 액션 타입에서 리듀서 함수로 매핑되어 있는 객체** 형태의 인자입니다. 각 요소는 하나의 액션 타입을 다룹니다.
- **actionMatchers: `{matcher, reducer}` 형태로 정의된 객체 배열** 형태의 인자입니다. 일치하는 모든 리듀서는 일치 여부에 관계없이 독립적으로 순서대로 실행됩니다.
- **defaultCaseReducer: 앞의 두 유형의 리듀서가 실행되지 않은 경우 실행**되는 `default case` 리듀서입니다.

`Map Object` 방식은 다음과 같이 사용 가능합니다.

```ts
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload,
});

// Alternately, use a "lazy initializer" to provide the initial state
// (works with either form of createReducer)
const initialState = () => 0;
const counterReducer = createReducer(initialState, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload,
});
```

`createAction` 을 통해 작성된 액션은 다음과 같은 방법으로 `key` 에 대입할 수 있습니다.

```ts
const increment = createAction("increment");
const decrement = createAction("decrement");

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload,
});
```

**actionMatchers와 defaultCaseReducer** 를 추가하여 사용하는 방식은 다음과 같습니다.

```ts
const isStringPayloadAction = (action) => typeof action.payload === "string";

const lengthOfAllStringsReducer = createReducer(
  // initial state
  { strLen: 0, nonStringActions: 0 },
  // normal reducers
  {
    /*...*/
  },
  //  array of matcher reducers
  [
    {
      matcher: isStringPayloadAction,
      reducer(state, action) {
        state.strLen += action.payload.length;
      },
    },
  ],
  // default reducer
  (state) => {
    state.nonStringActions++;
  }
);
```

### Direct State Mutation

---

리덕스는 **함수가 순수해야 하고 상태가 불변해야 한다는 점**이 있습니다. 이는 **보다 더 예측 가능하고 관찰 가능한 상태**를 만드는데 필수지만, 때로는 이러한 요소가 **업데이트 구문을 어색하게 만들기도 합니다.** 아래 예시를 보면서 확인해봅시다.

```ts
const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const todo = action.payload;
      return [...state, todo];
    })
    .addCase(toggleTodo, (state, action) => {
      const index = action.payload;
      const todo = state[index];
      return [
        ...state.slice(0, index),
        { ...todo, completed: !todo.completed },
        ...state.slice(index + 1),
      ];
    });
});
```

자바스크립트 ES6 문법 중 [`spread syntax`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 를 안다면 `addTodo` 리듀서는 해석하기 쉬울 것 입니다. 하지만 `toggleTodo` 의 경우엔 좀 더 복잡한 구조 때문에 이를 이해하기엔 좀 어려움이 있을 것 같습니다.

이를 보다 편리하게 하기 위해 `createReducer` 는 내부에 [immer](https://github.com/immerjs/immer)라는 라이브러리를 통해 **상태를 직접 변경하는 방식으로 리듀서를 작성할 수 있도록 합니다.** 실제로 리듀서는 **동등한 복사 작업으로 변환하는 프록시 상태를 수신합니다.**

```ts
import { createAction, createReducer } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  completed: boolean;
}

const addTodo = createAction<Todo>("todos/add");
const toggleTodo = createAction<number>("todos/toggle");

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      // This push() operation gets translated into the same
      // extended-array creation as in the previous example.
      const todo = action.payload;
      state.push(todo);
    })
    .addCase(toggleTodo, (state, action) => {
      // The "mutating" version of this case reducer is much
      //  more direct than the explicitly pure one.
      const index = action.payload;
      const todo = state[index];
      todo.completed = !todo.completed;
    });
});
```

위 예시와 같이 **직접 상태값을 변경하는 것**으로 상태 변화를 유도할 수 있습니다. 하지만 Immer의 경우에도 간과하면 안되는 요소가 있습니다. 우리는 상태값을 변경시키거나 새 상태값을 반환 함으로서 변화를 유도할 수 있지만 **이를 동시에 진행하면 안됩니다.** 예를 들어 다음의 경우는 앞의 예외를 반영합니다.

```ts
import { createAction, createReducer } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  completed: boolean;
}

const toggleTodo = createAction<number>("todos/toggle");

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder.addCase(toggleTodo, (state, action) => {
    const index = action.payload;
    const todo = state[index];

    // This case reducer both mutates the passed-in state...
    todo.completed = !todo.completed;

    // ... and returns a new value. This will throw an
    // exception. In this example, the easiest fix is
    // to remove the `return` statement.
    return [...state.slice(0, index), todo, ...state.slice(index + 1)];
  });
});
```

### Multiple Case Reducer Execution

---

기본적으로 `createReducer` 는 **하나의 액션 타입과 단일 리듀서 케이스를 매칭시키고,** 하나의 리듀서당 하나의 액션만을 실행합니다. 하지만 **action matchers** 를 사용할 경우 **여러 matchers로 하나의 액션을 다룰 수 있습니다.**

이러한 맥락에서 액션이 디스패치 되면 다음과 같이 행동합니다.

- 액션 타입과 **정확히 일치하는게 있다면,** 대응하는 리듀서 케이스가 우선적으로 실행됩니다.
- `true` 를 반환한 **모든 matcher는 정의된 순서대로 실행됩니다.**
- `default` 리듀서 케이스가 우선적으로 제공되고, **여타 케이스 혹은 matcher 리듀서가 실행되지 않으면, 기본 리듀서가 실행됩니다.**
- 케이스 혹은 matcher 리듀서가 실행되지 않으면 **원래 기존 상태 값을 반환합니다.**

다음 예시를 보시면 이해가 더 편합니다.

```ts
import { createReducer } from "@reduxjs/toolkit";

const reducer = createReducer(0, (builder) => {
  builder
    .addCase("increment", (state) => state + 1)
    .addMatcher(
      (action) => action.type.startsWith("i"),
      (state) => state * 5
    )
    .addMatcher(
      (action) => action.type.endsWith("t"),
      (state) => state + 2
    );
});

console.log(reducer(0, { type: "increment" }));
// Returns 7, as the 'increment' case and both matchers all ran in sequence:
// - case 'increment": 0 => 1
// - matcher starts with 'i': 1 => 5
// - matcher ends with 't': 5 => 7
```

### Logging Draft State Values

---

개발 과정에서 개발자가 `console.log(state)` 를 작성하는 것은 흔한 일입니다. 그러나 브라우저는 **프록시를 어려운 형태로 보여주고,** 이는 **Immer에 기반한 상태를 콘솔을 통해 확인하는 것을 어렵게 합니다.**

이러한 맥락에서 우리가 `createSlice` 혹은 `createReducer` 를 사용할 때, **Immer 라이브러리로부터 다시 내보내기 위해 `current` 를 사용할 수 있습니다.** `current` 는 **현재 Immer 상태 값에 대한 별도 사본을 생성**하고 이를 `console.log` 등을 통해 **기록할 수 있습니다.**

```ts
import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todos",
  initialState: [{ id: 1, title: "Example todo" }],
  reducers: {
    addTodo: (state, action) => {
      console.log("before", current(state));
      state.push(action.payload);
      console.log("after", current(state));
    },
  },
});
```

## [`createAction`](https://redux-toolkit.js.org/api/createAction)

---

> A helper function for **defining a Redux action type and creator.**

리덕스 **액션 타입과 생성자를 정의해주는 함수입니다.**

```ts
function createAction(type, prepareAction?);
```

보통 리덕스에서 액션 정의는 **액션 타입을 정의한 상수와 액션 생성자 함수를 별도로 선언하는 방식**을 갖습니다.

```ts
const INCREMENT = "counter/increment"; // 액션 타입 정의 상수

// 액션 생성자 함수
function increment(amount: number) {
  return {
    type: INCREMENT,
    payload: amount,
  };
}

const action = increment(3);
// { type: 'counter/increment', payload: 3 }
```

`createAction` 함수는 이 두 선언을 결합했으며, **액션 타입을 인자로 받고 액션 생성자를 리턴합니다.** 해당 액션 생성자는 **인자 없이 호출되거나 `payload` 형태로 포함될 수 있습니다.** 또한, **문자열**로 변환될 경우(`toString()` 등에 의해) 이를 **오버라이드 할 수 있습니다.**

```ts
import { createAction } from "@reduxjs/toolkit";

const increment = createAction<number | undefined>("counter/increment");

let action = increment();
// { type: 'counter/increment' }

action = increment(3);
// returns { type: 'counter/increment', payload: 3 }

console.log(increment.toString());
// 'counter/increment'

console.log(`The action type is: ${increment}`);
// 'The action type is: counter/increment'
```

### Using Prepare Callbacks to Customize Action Contents

---

기본적으로, 생성된 **액션 생성자는 `action.payload` 형태의 단일 인자만을 허용합니다.** 이 경우 `payload` 값을 커스터마이징 하기 위해 **추가적인 로직을 작성할 수 있습니다.** 해당 로직은 `createAction` 의 **두 번째 인자로 `prepare callback` 을 받아** `payload` 값을 구성할 수 있습니다.

```ts
import { createAction, nanoid } from "@reduxjs/toolkit";

const addTodo = createAction("todos/add", function prepare(text: string) {
  return {
    payload: {
      text,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    },
  };
});

console.log(addTodo("Write more docs"));
/**
 * {
 *   type: 'todos/add',
 *   payload: {
 *     text: 'Write more docs',
 *     id: '4AJvwMSWEHCchcWYga3dj',
 *     createdAt: '2019-10-03T07:53:36.581Z'
 *   }
 * }
 **/
```

두 번째 인자가 제공되는 경우, 해당 인자는 **`prepare callback` 으로 전달**되고, 해당 콜백은 **`payload` 필드의 객채 형태를 반환합니다.**(그렇지 않으면, `undefined` 로 정의됩니다.) 또한 해당 객체는 **`meta` 혹은/그리고 `error` 필드를 가질 수 있습니다.** `meta` 필드는 **액션에 대한 추가적인 정보**를
`error` 의 경우엔 **액션 실패에 대한 세부 정보**를 포함할 수 있습니다. 위 세 가지 필드는 [Flux Standard Actions](https://github.com/redux-utilities/flux-standard-action#actions) 기준을 따른다고 합니다.

### Usage with createReducer()

---

위에서 말했듯이, 액션 생성자는 문자열 형태로 변환할 수 있기 때문에 **`createReducer` 에서 각 리듀서 케이스의 키 값으로 바로 사용할 수 있습니다.**

```ts
import { createAction, createReducer } from "@reduxjs/toolkit";

const increment = createAction<number>("counter/increment");
const decrement = createAction<number>("counter/decrement");

const counterReducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state, action) => state + action.payload);
  builder.addCase(decrement, (state, action) => state - action.payload);
});
```

### Non-String Action Types

---

원칙적으로 리덕스에선 모든 값 형태(`number` , `symbol` 등)를 액션 타입으로 사용할 수 있습니다.(하지만 최소한 직렬화 함을 권장합니다.)

그러나 리덕스 툴킷의 경우, **문자열 형태의 액션 타입을 사용**한다고 가정합니다. 만약, 다른 형태의 액션 타입을 사용할 경우 다음과 같은 상황이 발생할 수 있습니다.

```ts
const INCREMENT = Symbol("increment");
const increment = createAction(INCREMENT);

increment.toString();
// returns the string 'Symbol(increment)',
// not the INCREMENT symbol itself

increment.toString() === INCREMENT;
// false
```

그렇기에 **문자열 형태가 아닌 액션 생성자**를 `createReducer` 의 리듀서 케이스 키로 사용할 수 없습니다. 그렇기에 리덕스 툴킷에서는 **문자열 액션 타입만 사용하는 것이 좋습니다.**

```ts
const INCREMENT = Symbol("increment");
const increment = createAction(INCREMENT);

const counterReducer = createReducer(0, {
  // The following case reducer will NOT trigger for
  // increment() actions because `increment` will be
  // interpreted as a string, rather than being evaluated
  // to the INCREMENT symbol.
  [increment]: (state, action) => state + action.payload,

  // You would need to use the action type explicitly instead.
  [INCREMENT]: (state, action) => state + action.payload,
});
```

### actionCreator.match

---

`createAction` 에 의해 생성된 **모든 액션 생성자는 `.match(action)` 메소드를 갖습니다.** 해당 `.match` 메소드는 전달 받은 액션이 액션 생성자가 생성할 작업과 일치하는 타입인지 확인합니다.

#### As a TypeScript Type Guard

---

`match` 메소드는 [TypeScript type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)이며 **액션의 `payload` 의 타입을 식별하는데 사용할 수 있습니다.** 해당 작업은 **미들웨어의 커스텀이 필요할 때** 유용하게 사용할 수 있습니다.

```ts
import { createAction, Action } from "@reduxjs/toolkit";

const increment = createAction<number>("INCREMENT");

function someFunction(action: Action) {
  // accessing action.payload would result in an error here
  if (increment.match(action)) {
    // action.payload can be used as `number` here
  }
}
```

#### With redux-observable

---

또한, `match` 메소드는 **`filter` 메소드로서도 사용될 수 있으며,** redux-observable과 함께 사용할 때 유용합니다.

```ts
import { createAction, Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

const increment = createAction<number>("INCREMENT");

export const epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(increment.match),
    map((action) => {
      // action.payload can be safely used as number here (and will also be correctly inferred by TypeScript)
      // ...
    })
  );
```

## [`createSlice`](https://redux-toolkit.js.org/api/createSlice)

---

`createSlice` 는 인자로 **초기값과 리듀서 함수 객체, 슬라이스 명**을 받아 **액션 생성자와 액션 타입에 대응하는 리듀서와 상태값**들을 자동으로 생성합니다.

해당 API는 리덕스 로직 작성에서 가장 **기본적인 접근 방식**이며, 내부적으로 **`createAction` 과 `createReducer`** 를 사용하고 있기에 Immer 라이브러리 또한 활용할 수 있습니다.

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Parameters

---

`createSlice` 는 다음의 필드를 포함하는 **단일 객체 형태**의 매개변수를 받습니다.

```ts
function createSlice({
    // A name, used in action types
    name: string,
    // The initial state for the reducer
    initialState: any,
    // An object of "case reducers". Key names will be used to generate actions.
    reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
    // A "builder callback" function used to add more reducers, or
    // an additional object of "case reducers", where the keys should be other
    // action types
    extraReducers?:
    | Object<string, ReducerFunction>
    | ((builder: ActionReducerMapBuilder<State>) => void)
})
```

- `initialState`: 슬라이스의 **초기값**에 해당합니다. **초기화 지연 함수 형태**로도 할당이 가능합니다.
- `name`: 슬라이스의 이름입니다. 해당 이름은 **액션 타입의 접두사**로 활용됩니다.
- `reducers`: 리덕스 케이스 **리듀서 함수들을 포함하는 하나의 객체**입니다. 키는 앞의 `name` 과 합쳐 액션 타입 이름을 정의하는데 사용되고, 해당 타입명과 일치하는 액션이 디스패치 되면 해당하는 리듀서가 실행됩니다.
  - **Customizing Generated Action Creators:** `payload` 값 형태를 변경하고 싶다면 `prepare callback` 을 사용할 수 있습니다. 그렇게 되면 키에 해당하는 값은 객체 형태로 바뀌고 `reducer` 와 `prepare` 필드를 추가해야 합니다. 각 필드 중, `reducer` 필드에는 실행시킬 리듀서 함수를 추가하고, `prepare` 필드에는 변경될 `payload` 의 형식을 반환하는 함수를 할당합니다.

```ts
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

interface Item {
  id: string;
  text: string;
}

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Item[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => {
        const id = nanoid();
        return { payload: { id, text } };
      },
    },
  },
});
```

- `extraReducers`: 리덕스의 핵심 개념 중 하나는 각 슬라이스 리듀서가 상태 슬라이스를 **소유**하고 많은 슬라이스 리듀서가 동일한 작업 유형에 독립적으로 응답할 수 있다는 것입니다. `extraReducers` 는 **생성된 타입만이 아닌 다른 액션 타입들에 응답할 수 있도록** 합니다.
  - 해당 필드에 지정된 리듀서들은 **외부 액션의 참조**를 의미하므로, `slice.action` 에 **액션을 생성하지 않습니다.**
  - `extraReducers` 또한 `createReducer` 로 전달되기 때문에 **안전한 상태 변경이 가능합니다.**
  - 만약 `reducers` 와 `extraReducers` 필드에 같은 액션 유형이 존재하는 경우, `reducers` 필드의 함수가 이를 다룹니다.

`extraReducers` 역시 `createReducer` 에서와 마찬가지로 **Builder callback notation과 Map object notation을 활용합니다.**

### The `extraReducers` "builder callback" notation

---

`extraReducers` 를 사용하는데 있어 권장되는 방식은 **`ActionReducerMapBuilder` 인스턴스를 받는 콜백을 사용하는 것**입니다. 또한 해당 builder notation은 **matcher 와 default case 리듀서를 추가할 수 있는 유일한 방법**입니다.

리덕스 툴킷에서는 **타입스크립트 지원이 더 우수하다**는 측면에서 해당 API 사용을 권장하고 있습니다. 특히, `createAction` 혹은 `createAsyncThunk` 에 의해 생성된 액션들과 함께 사용할 때 유용합니다.

### The `extraReducers` "map object" notation

---

마찬가지로 `reducers` 와 `extraReducers` 는 리덕스 리듀서 케이스 함수를 포함하는 객체를 할당할 수 있습니다. 하지만 키는 반드시 리덕스 문자열 액션 타입이어야 하고 `createSlice` 는 해당 파라미터를 포함하는 리듀서를 위한 액션 타입이나 액션 생성자를 자동 생성하지 않습니다.

`createAction` 에 의해 생성된 액션 생성자는 **computed property syntax**를 통해 바로 키로 사용할 수 있습니다.

### Return Value

---

`createSlice` 는 다음 **객체 형태의 값을 반환합니다.**

```ts
{
    name : string,
    reducer : ReducerFunction,
    actions : Record<string, ActionCreator>,
    caseReducers: Record<string, CaseReducer>.
    getInitialState: () => State
}
```

`reducers` 인자에 정의된 각 함수엔 **해당하는 액션 생성자**가 있는데, 해당 액션 생성자는 `createAction` 에 의해 생성되고 동일한 기능(맥락상 `createAction` 을 의미하는 것 같습니다.)을 사용하여 반환 값의 `actions` 필드에 포함됩니다.

생성된 `reducer` 함수는 슬라이스 리듀서로서 리덕스의 `combineReducers` 에 전달되기에 적합합니다.

더 큰 코드 베이스에서 참조 검색을 쉽게 하기 위해 액션 생성자를 구조 분해 할당하는 것을 고려할 수 있습니다.

### Exmaples

```ts
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";

const incrementBy = createAction<number>("incrementBy");
const decrementBy = createAction<number>("decrementBy");

const counter = createSlice({
  name: "counter",
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value?: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload;
    });
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload;
    });
  },
});

const user = createSlice({
  name: "user",
  initialState: { name: "", age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload; // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    // @ts-expect-error in TypeScript, this would need to be [counter.actions.increment.type]
    [counter.actions.increment]: (
      state,
      action /* action will be inferred as "any", as the map notation does not contain type information */
    ) => {
      state.age += 1;
    },
  },
});

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
});

const store = createStore(reducer);

store.dispatch(counter.actions.increment());
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment());
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3));
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply());
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`);
// -> "counter/decrement"
store.dispatch(user.actions.setUserName("eric"));
// -> { counter: 12, user: { name: 'eric', age: 22} }
```
