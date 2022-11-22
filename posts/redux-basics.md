---
title: 리덕스 시작하기
date: "2022-01-17"
description: "바쁘디 바쁜 현대 사회에서 호다닥 리덕스 기초를 정리해봅시다."
tags: ["Redux", "TIL", "Basics"]
thumbnail: "redux_logo.png"
---

> 본 포스팅은 [리덕스 공식문서](https://ko.redux.js.org/)의 [리덕스 튜토리얼](https://ko.redux.js.org/tutorials/essentials/part-1-overview-concepts)을 참고하여 작성하였습니다.

# 들어가며

---

리덕스 시작하기를 들어가면 리덕스에 대해서 다음과 같이 설명하고 있습니다.

> **Redux**는 자바스크립트 앱을 위한 **예측 가능한 상태 컨테이너**입니다.

이는 상태 값들을 **일괄적으로 `store` 에서 관리**하여 이를 **`action`** 이라는 이벤트를 사용하여 **애플리케이션의 상태를 관리하고 업데이트를 진행한다는** 것을 의미합니다.

그렇기에 리덕스는 **여러 컴포넌트에 다양한 상태 값이 존재**하고 이러한 상태가 **자주 업데이트 되며**, 대량의 **코드 베이스를 공동으로 관리할 때** 유용하게 사용할 수 있는 라이브러리라고 할 수 있습니다.

또한 자바스크립트 라이브러리인 리덕스는 다음의 패키지들과 함께 사용됩니다.

- **React-Redux**
- **Redux Toolkit**
- **Redux DevTools Extension**

# 리덕스 용어 및 개념

---

실제 코드를 살펴보기에 앞서 리덕스와 관련된 용어와 개념에 대한 이해를 돕고 시작하도록 하겠습니다.

## 상태 관리(State Management)

---

```ts
function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0);

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  );
}
```

위 `Counter` 컴포넌트는 버튼을 클릭할 때마다 `counter` 라는 상태 값을 1씩 증가시키는 일반적인 예시입니다. 해당 컴포넌트는 다음과 같이 구성됩니다.

- **상태(state)**: 앱을 작동시키는 소스
- **뷰(view)**: 현재 상태에 기반한 UI 내용
- **액션(action)**: 사용자 입력을 기반으로 한 이벤트 및 트리거 업데이트

이를 **단방향 데이터 흐름**으로 보면 렌더링은 다음과 같이 진행됩니다.

- **초기 상태를 기반**으로 UI가 **렌더링**
- 위 경우 사용자가 **버튼을 클릭**할 때, **상태의 업데이트 발생**
- **새 상태를 기반**으로 UI는 **재렌더링**

위 흐름의 경우 문제가 없어 보이지만, 해당 **상태를 공유하여 여러 컴포넌트에서 사용해야 하는 경우**에는 내용이 달라질 수 있습니다. 이를 해결하기 위한 방도로 상위 컴포넌트로 **상태를 끌어올리는** 방법을 선택하기도 하지만 이로 인해 **굉장히 복잡한 코드**가 만들어 질 수도 있습니다.

이를 위한 리덕스의 기본 아이디어는 **뷰와 상태 관리를 구분**하여 **상태 관리를 일괄적으로 단일 위치(store)에서 진행**하는 패턴입니다.

## 용어

---

리덕스 학습을 위해 숙지해야 할 몇 가지 용어들에 대해 알아봅시다.

### 액션(Action)

---

자바스크립트 객체 형태인 **액션**은 `type` 필드를 가지며 앱에서 일어난 일들에 대해 설명하는 것이라고 이해할 수 있습니다. 일반적으로 액션은 다음과 같은 구조를 갖습니다.

```ts
const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};
```

`type` 은 **문자열** 값을 가지며 대개 `domain/eventName` 으로 구성되어 있습니다. 추가적으로 `payload` 필드가 포함될 수 있는데, 해당 영역은 **추가적인 정보**를 담을 수 있는 필드입니다.

이러한 액션을 수기로 작성하여 만들 수도 있지만, 다음과 같이 **생성 함수**를 만들어 활용할 수 있습니다.

```ts
const addTodo = (text) => {
  return {
    type: "todos/todoAdded",
    payload: text,
  };
};
```

### 리듀서(Reducer)

---

**리듀서**는 현재 **상태 값**과 **액션 객체**를 받아 상태 업데이트 방식을 결정하고 **새로운 상태를 반환하는 기능**을 가지며, 일반적으로 다음과 같은 형태를 갖습니다.

- `(state, action) => newState`

그리고 리듀서는 다음의 원칙을 따릅니다.

- **상태와 액션에 기반**하여 새 상태 값을 계산해야합니다.
- **기존 상태 값을 변경하지 않으며**, 복사된 값을 통해 새로운 값으로 변경합니다.
- **비동기 로직 실행, 랜덤 값 계산 그리고 사이드 이펙트**를 야기하지 않습니다.

**기존 상태 값을 변경하지 않는다는 것**은 우리가 기존에 리액트에서 유지해왔던 **불변성**에 대한 사항과 유사해보입니다. 리듀서는 다음의 절차를 통해 새로운 값을 반환합니다.

- 리듀서가 **특정 액션에 관심이 있는 지(번역상 표현인데 액션에 해당하는 지를 의미하는 것 같습니다)를 파악**합니다.
  - 그렇다면 **상태 복사본을 만들어 새로운 값을 반환**합니다.
- 그렇지 않으면 **기존 값을 반환**합니다.

다음의 간단한 예시를 통해 리듀서가 어떻게 동작하는 지 파악할 수 있습니다.

```typescript
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "counter/increment") {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}
```

리듀서는 위와 같이 **논리 연산(`if/else` , `switch` 등)을 통해** 새로운 상태를 반환할 수 있습니다.

### 스토어(Store)

---

위에서도 언급했지만, **스토어(Store)는 앱의 상태를 보관하는 객체**입니다. 스토어는 **리듀서를 전달 받아 생성**되며 **`getState` 메서드를 통해 현재 상태 값을 반환**할 수 있습니다.

```ts
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}
```

### 디스패치(`dispatch`)

---

또한 `dispatch` 메서드를 통해 **상태 업데이트를 진행할 수도 있습니다.** 상태 업데이트를 위한 유일한 방법인 `dispatch` 는 `store.dispatch` 를 통해 **액션 객체를 호출하여 전달합니다.**

```ts
store.dispatch({ type: "counter/increment" });

console.log(store.getState());
// {value: 1}
```

**호출된 액션 객체가 관련이 있다면 이를 통해 상태를 업데이트**하고, 주로 액션 객체는 생성 함수를 통해 전달됩니다.

```ts
const increment = () => {
  return {
    type: "counter/increment",
  };
};

store.dispatch(increment());

console.log(store.getState());
// {value: 2}
```

### 셀렉터(Selectors)

---

**셀렉터(Selectors)는 상태의 특정 정보를 추출하기 위한 함수입니다.** 앱이 커짐에 따라 **다른 컴포넌트에서 동일한 데이터를 요청해야하는 경우**가 생기고 이를 위해 **반복을 방지**할 수 있습니다.

```ts
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
// 2
```

## 리덕스 앱의 데이터 흐름

---

이렇게 용어에 대해 간단히 알아봤으니, 리덕스 내에서 데이터 흐름은 어떻게 진행되는 지에 대해 알아봅시다.

위에서 언급했던 단방향 데이터 흐름의 단계는 리덕스의 경우 더 자세히 나눌 수 있습니다.

- **초기 설정**
  - **리듀서**를 기반으로 **스토어**가 생성됩니다.
  - 스토어는 기반 리듀서를 **한 번 호출하여 반환 값을 초기 값으로 저장**합니다.
  - UI의 첫 렌더링에서 **UI 컴포넌트는 리덕스 스토어의 현재 상태에 엑세스**하고 **데이터를 활용하여 렌더링 할 컴포넌트를 결정**합니다. 이를 통해 향후 **스토어 업데이트를 참조하여 상태 변경사항을 확인**합니다.
- **업데이트**
  - 애플리케이션에서 버튼 클릭과 같은 **이벤트가 발생**합니다.
  - 애플리케이션 코드는 **`dispatch` 를 통해 액션을 스토어에 전달**합니다.
  - 스토어는 **이전 상태 값과 액션 객체를 활용**하여 **새로운 상태 값을 반환**합니다.
  - 스토어는 **모든 UI 컴포넌트에게 업데이트 사항을 전달합니다.**
  - 해당하는 **UI 컴포넌트는 상태 변경을 확인**합니다.
  - 데이터 변경이 이루어진 컴포넌트는 **새롭게 렌더링되어 화면에 반영**됩니다.

금일 학습한 내용을 요약하면 다음과 같습니다.

- **리덕스는 애플리케이션의 전역 상태를 관리하기 위한 라이브러리입니다.**
  - 리덕스는 일반적으로 리덕스와 리액트를 함께 통합하기 위해 `React-Redux` 라이브러리와 함께 사용됩니다.
  - `Redux Toolkit` 은 리덕스 로직을 작성하는 데 권장되는 방법입니다.
- 리덕스는 단방향 데이터 흐름 앱 구조를 사용합니다.
  - 상태는 특정 시점에서 앱의 상태를 설명하고 UI는 해당 상태를 기반으로 렌더링됩니다.
  - 앱에서 문제가 발생하면
    - UI가 작업을 전달합니다.
    - 스토어는 리듀서를 실행하고 상태는 발생한 액션에 따라 업데이트됩니다.
    - 스토어는 상태가 변경되었음을 UI에 알립니다.
  - UI는 새 상태를 기반으로 다시 렌더링됩니다.
- 리덕스는 여러 유형의 코드를 사용합니다.
  - 액션은 `type` 필드가 있는 일반 객체이며 앱에서 발생한 액션을 설명합니다.
  - 리듀서는 이전 상태와 액션을 기반으로 새로운 상태 값을 계산하는 함수입니다.
  - 리덕스 스토어는 액션이 전달 될 때마다 기반 리듀서를 실행합니다.

# 실습 진행하기

---

그렇다면 앞에서 배운 내용을 통해 **간단한 리덕스 앱**을 만들어 연습해봅시다.

프로젝트 시작은 [CRA 프로젝트용 공식 리덕스 템플릿](https://github.com/reduxjs/cra-template-redux)을 사용하여 시작하겠습니다. 명령어는 다음과 같습니다.

```sh
npx create-react-app my-app --template redux

# or

yarn create react-app my-app --template redux
```

그렇게 설치가 완료되고 프로젝트를 확인하면 기존 CRA 프로젝트 구조에 `Redux Toolkit` 을 활용하여 리덕스 스토어와 로직이 있고, `React-Redux` 를 사용하여 리덕스 스토어와 리액트 컴포넌트를 연결하는 구조로 구성되어있습니다.

그러면 프로젝트를 실행시켜봅시다.

![redux](https://user-images.githubusercontent.com/87939521/149271926-c0976cee-cebd-4de6-b33a-766bc921a132.PNG)

`npm start` 로 프로젝트를 실행시키면 다음과 같은 화면이 나타납니다.

그렇다면 미리 설치했던 [크롬 리덕스 개발자 도구 확장 프로그램](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko)을 통해 해당 프로젝트 내 리덕스가 어떻게 실행되고 있는 지에 대해 파악할 수 있습니다. 자세한 툴 화면 캡쳐는 생략하고 이를 확인할 수 있다는 전제 하에 진행해보겠습니다.

우선적으로 눈에 띄는 건 `+` , `-` 버튼입니다. 해당 버튼을 입력하면 현재 상태 값이 1씩 증가하거나 감소하는 것을 알 수 있습니다. 예를 들어 처음 `+` 버튼을 눌렀을 때, 다음과 같이 상태 값이 변화하고 `counter/increment` 액션이 전달된 것을 확인할 수 있습니다.

```ts
// 업데이트 후 상태 값
{
  counter: {
    value: 1;
  }
}

// 액션 형식
{
  type: 'counter/increment',
}
```

다음으로 `Add Amount` 버튼을 클릭하여 상태 값을 업데이트 해봅시다. 해당 버튼을 클릭하면 입력란에 있는 숫자만큼 이전 상태 값에 더해집니다. 그리고

```ts
{
  type: 'counter/incrementByAmount',
  payload: 2
}
```

이전의 액션 형식과 비교하면 `payload` 라는 필드가 새롭게 생겨났습니다. 이렇게 `payload` 필드를 통해 데이터 업데이트를 위한 부가적인 사항을 전달할 수 있습니다.

나머지 두 가지 버튼인 `Add Async` 와 `Add If Odd` 는 코드 분석과 동시에 진행하도록하겠습니다.

## 어플리케이션 구조

---

위 프로젝트의 주요 구조는 다음과 같습니다.

- `/src`
  - `index.js`: 앱의 시작점
  - `App.js`: 최상위 리액트 컴포넌트
  - `/app`
    - `store.js`: Redux 스토어 인스턴스를 생성
  - `/features`
  - `/counter`
    - `Counter.js`: 카운터 기능의 UI를 보여주는 리액트 컴포넌트
    - `counterSlice.js`: 카운터 기능을 위한 리덕스 로직

우선 **스토어 생성**부터 알아보도록 합시다.

### 스토어 생성

---

스토어는 **리듀서를 기반으로 생성**된다고 이전에 배운 바가 있습니다. 해당 프로젝트의 `app/store.js` 를 확인하면 다음의 코드를 확인할 수 있습니다.

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

`Redux Toolkit` 의 `configureStore` 메서드를 통해 다음과 같이 `reducer` 필드에 리듀서를 전달하여 생성할 수 있습니다.

하나의 어플리케이션은 다양한 기능으로 구성되며, 각 기능은 리듀서를 포함할 것입니다. 우리는 `configureStore` 메서드를 통해 이를 추가할 수 있고, 해당 **객체의 키 값은 상태 값의 키로 정의됩니다.** 위 경우 `counterReducer` 의 상태 값은 `counter` 에 해당합니다.

- 🚀 [`configureStore` 에 대한 자세한 사항](https://redux-toolkit.js.org/api/configureStore)

그렇다면 위에서 기반이 된 리듀서인 `counterReducer` 의 출처를 찾아가 알아봅시다.

### 슬라이스 리듀서 및 액션 생성

---

`counterReducer` 의 출처인 `app/features/counterSlice.js` 를 확인하면 비동기 요청과 조건부 요청을 제외하고 다음의 코드를 확인할 수 있습니다.

```ts
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

우선 해당 코드에서 눈에 띄는 것으로 `createSlice` 라는 메서드를 확인할 수 있습니다. `createSlice` 는 **슬라이스 명, 초기 상태 값, 리듀서 함수 객체 등을 인자**로 받아 **리듀서 및 상태에 해당하는 액션 생성자와 유형을 자동으로 생성**해주는 함수입니다.

- 🚀 [`createSlice` 에 대한 자세한 사항](https://redux-toolkit.js.org/api/createslice)

간단히 말하자면 `type` 과 `payload` 등을 갖는 액션 객체를 자동으로 만들어주는 함수입니다. 이전 액션 유형에서 `counter/~` 형식으로 되어있는 것을 확인하면 `sliceName/reducerName` 으로 구성 됨을 유추할 수 있을 것입니다.

`reducers` 필드의 객체 메서드를 자세히 살펴보면 인자로 `(state, action)` 을 받아오는 것을 확인할 수 있습니다. 위 경우 초기 상태 값을 `{ value: 0 }` 로 설정했기에 `state.value` 를 통해 값에 접근할 수 있고, 마지막 메서드인 `incrementByAmount` 의 경우엔 `action` 의 `payload` 값을 참조하여 상태 값을 업데이트 시킵니다.

앞서 **리듀서를 사용할 때 유의해야 할 점(불변성, 비동기 로직 사용 금지 등)을** 언급한 적이 있습니다. 그에 대한 이유를 설명하면 다음과 같습니다.

- 리덕스의 목표 중 하나는 **예측 가능한 코드**를 만드는 것이고, 함수 출력이 입력 인수에서 계산되는 것은 작동 방식을 좀 더 이해하기 쉽게 만듭니다.
- 반면 함수가 **외부 변수에 의존**하거나 **무작위로 동작하는 경우** 이를 예측하기 어려워집니다.
- 또한 함수가 **인수를 포함한 다른 값을 수정**한다면, 상태가 업데이트 되었는데 UI가 업데이트 되지 않는 등의 오류를 나타낼 수 있습니다.

요컨데 **불확실한 요소**는 **예측 가능한 코드**를 해치는 요인이고 **불변성을 유지할 필요**가 있기 때문에, 이를 지양하자는 말입니다.

### 리듀서의 불변성

---

리덕스에서 **불변성을 유지해야 하는 이유**를 간단하게 정리하면 다음과 같습니다.

- **최신 상태 값에 따라 UI가 업데이트 되지 않는 등의 버그**가 발생할 수 있습니다.
- 상태 업데이트에 대한 **방법이나 이유를 알기 힘듭니다.**
- 테스트 작성이 어려워집니다.

이를 위해 자바스크립트의 `spread operator` 를 사용하여 깊은 복사를 진행할 수 있지만, 이는 상당히 복잡한 코드 구조를 갖게 만들면서 아래와 강티 직관적으로 이해하기 힘들게 만듭니다.

```ts
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue,
        },
      },
    },
  };
}
```

이를 위해 `createSlice` 는 **[Immer](https://immerjs.github.io/immer/) inside** 라는 라이브러리를 사용하고, 이를 통해 위 코드는 다음과 같이 바뀔 수 있습니다.

```ts
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue;
}
```

허나 이러한 부분은 `createSlice` 와 `createReducer` 와 같은 해당 내부 라이브러리에만 적용 가능하므로 이를 혼돈하지 않는 것이 좋습니다.

### Thunk로 비동기 로직 작성하기

---

앞의 모든 함수는 동기식으로 처리되는 함수였고, 이제 **비동기식 로직을 사용**하여 코드를 작성해봅시다. 이를 위해 **Thunk** 라는 비동기 생성을 위한 리덕스 함수를 사용할 것입니다. 해당 함수는 다음 두 가지 기능을 포함합니다.

- `dispatch` 및 `getState` 로 받는 **내부 Thunk 함수**
- Thunk 함수를 생성하고 반환하는 **외부 생성자 함수**

Thunk 함수는 다음과 같이 활용할 수 있습니다.

```ts
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
```

`createAsyncThunk` 은 **액션 객체의 타입(문자열)과 프로미스를 반환하는 콜백 함수**를 받아, 프로미스 생명주기 액션 타입과 **Thunk action creator**를 생성합니다.

- **Thunk action creator**: 프로미스 콜백을 실행하고 프로미스를 기반으로 라이프사이클 액션을 디스패치합니다.

이는 어떤 데이터를 가져오는지, 로드 상태를 추적하는 방법 및 반환 데이터의 처리에 대해 모르기 때문에 **리듀서 함수를 생성하지 않고**, `extraReducers` 필드를 통해 이를 추가해야 합니다.

- 🚀 [`createAsyncThunk` 에 대한 자세한 사항](https://redux-toolkit.js.org/api/createAsyncThunk)

해당 프로젝트의 경우 `extraReducer` 를 다음과 같이 관리합니다.

```ts
extraReducers: (builder) => {
  builder
    .addCase(incrementAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(incrementAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value += action.payload;
    });
},
```

해당 비동기 요청이 `pending` 상태일 경우와 `fulfilled` 일 경우를 명시하여, 경우에 따라 상태 값의 `state.status` 와 `state.value` 가 업데이트 됩니다.
