---
title: 리덕스 시작하기
date: "2022-01-13"
description: "바쁘디 바쁜 현대 사회에서 호다닥 리덕스 기초를 정리해봅시다."
tags: ["Redux", "TIL", "Basics"]
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

- **상태(state)** : 앱을 작동시키는 소스
- **뷰(view)** : 현재 상태에 기반한 UI 내용
- **액션(action)** : 사용자 입력을 기반으로 한 이벤트 및 트리거 업데이트

이를 **단방향 데이터 흐름**으로 보면 렌더링은 다음과 같이 진행됩니다.

- 상태를 기준으로 UI가 렌더링
- 위 경우 사용자가 버튼을 클릭할 때, 상태의 업데이트 발생
- 새 상태를 기반으로 UI는 재렌더링

위 흐름의 경우 문제가 없어 보이지만, 해당 **상태를 공유하여 여러 컴포넌트에서 사용해야 하는 경우**에는 내용이 달라질 수 있습니다. 이를 해결하기 위한 방도로 상위 컴포넌트로 **상태를 끌어올리는** 방법을 선택하기도 하지만 이로 인해 굉장히 복잡한 코드가 만들어 질 수도 있습니다.

이를 위한 리덕스의 기본 아이디어는 뷰와 상태 관리를 구분하여 **상태 관리를 일괄적으로 단일 위치에서 진행**하는 패턴입니다.

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

**리듀서**는 현재 **상태 값**과 **액션 객체**를 받아 상태 업데이트 방식을 결정하고 새로운 상태를 반환하는 기능을 가지며, 일반적으로 다음과 같은 형태를 갖습니다.

- `(state, action) => newState`

그리고 리듀서는 다음의 원칙을 따릅니다.

- **상태와 액션에 기반**하여 새 상태 값을 계산해야합니다.
- **기존 상태 값을 변경하지 않으며**, 복사된 값을 통해 새로운 값으로 변경합니다.
- 비동기 로직 실행, 랜덤 값 계산 그리고 사이드 이펙트를 야기하지 않습니다.

기존 상태 값을 변경하지 않는다는 것은 우리가 기존에 리액트에서 유지해왔던 **불변성**에 대한 사항과 유사해보입니다. 리듀서는 다음의 절차를 통해 새로운 값을 반환합니다.

- 리듀서가 특정 액션에 관심이 있는 지(번역상 표현인데 액션에 해당하는 지를 의미하는 것 같습니다)를 파악합니다.
  - 그렇다면 상태 복사본을 만들어 새로운 값을 반환합니다.
- 그렇지 않으면 기존 값을 반환합니다.

다음의 간단한 예시를 통해 리듀서가 어떻게 동작하는 지 파악할 수 있습니다.

```ts
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

호출된 액션 객체가 **관련이 있다면 이를 통해 상태를 업데이트**하고, 주로 액션 객체는 생성 함수를 통해 전달됩니다.

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

**셀렉터(Selectors)는 상태의 특정 정보를 추출하기 위한 함수입니다.** 앱이 커짐에 따라 다른 컴포넌트에서 동일한 데이터를 요청해야하는 경우가 생기고 이를 위해 반복을 방지할 수 있습니다.

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

위와 같은 과정을 아래와 같이 표현할 수 있습니다.

![redux_data_flow](https://ko.redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

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
