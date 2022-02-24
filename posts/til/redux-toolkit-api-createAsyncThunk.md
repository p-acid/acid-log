---
title: "Redux Toolkit API 정리하기 : createAsyncThunk"
date: "2022-02-24"
description: "리덕스 툴킷을 사용하는데 있어 공식문서의 API Reference를 정독하고 정리합니다."
tags: ["Redux", "Redux-toolkit", "API", "Reference"]
thumbnail: "redux_logo.png"
---

# 들어가며

---

Reducer and Actions 파트에서 `createAsyncThunk` 를 분리한 이유는 해당 메서드에 대한 내용이 많은 것이 큰 이유지만, 별도로 되새김질 해야할 필요성을 느낄 정도로 난해한 부분이라 별도로 분리를 진행했습니다.

## [`createAsyncThunk`](https://redux-toolkit.js.org/api/createAsyncThunk)

---

해당 함수는 **문자열 형태의 액션 타입과 프로미스를 반환하는 콜백 함수**를 받아서 할당한 **액션 타입 접두사를 기반**으로 **프로미스 라이프 사이클 액션 타입을 생성**하고 **프로미스 콜백을 실행시키고 반환된 프로미스에 기반한 라이프 사이클 액션을 디스패치 할 썽크(thunk) 액션 생성자**를 반환합니다.

> 이렇게 표현하니 너무 어렵네요... 😅 세 줄로 구분지어 봅시다.

- 인자로 **액션 타입(`string`)과 콜백 함수(`promise` 반환)를** 받음
- 앞의 액션 타입을 접두사로 삼아 **프로미스 라이프 사이클(`Pending`, `Fulfilled`, `Rejected`) 액션 타입 생성**
- 이후 **썽크 액션 생성자(프로미스 콜백 실행 및 프로미스 기반 라이프 사이클 액션 반환) 반환**

해당 요약은 비동기 요청 라이프 사이클을 다루는데 권장되는 표준입니다.

어떤 데이터를 가져오는지, 로딩 상태를 추적하는 방법 혹은 반환 데이터의 처리 방식을 모르기 때문에 **리듀서 함수를 생성하지 않습니다.** 당신은 로딩 상태 및 진행 로직이 당신의 앱에 적절함과 동시에 해당 액션들을 다루는 **자체적인 리듀서 로직을 작성해야 합니다.**

```ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";

// First, create the thunk
const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState: { entities: [], loading: "idle" },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload);
    });
  },
});

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123));
```

> 💡 **TIP**
>
> 리덕스 툴킷의 [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)는 리덕스 앱을 위한 데이터 요청과 캐싱 솔루션이며, 데이터 요청을 위해 **어떤 썽크나 리듀서를 작성하지 않아도 됩니다.** 리덕스 툴킷은 이것을 사용해볼 것을 권장하며, RTK Query는 당신의 앱에 있는 데이터 요청 관련 코드를 간략하게 만들 것입니다.

### Parameters

---

`createAsyncThunk` 는 세 가지 인자를 받습니다.

- **`type`(string):** 추가적인 리덕스 액션 타입 상수(비동기 요청의 라이프 사이클을 나타내는)를 만들기 위한 문자열입니다.
  - 예를 들어, `type` 이 `users/requestStatus` 일 경우 액션 타입은 다음과 같이 생성됩니다.
    - `pending`: `users/requestStatus/pending`
    - `fulfilled`: `users/requestStatus/fulfilled`
    - `rejected`: `users/requestStatus/rejected`
- **`payloadCreator`(callback):** 프로미스(비동기 로직의 결과 포함)를 반환하는 콜백입니다.
  - 오류가 있는 경우, `Error` 인스턴스 혹은 오류 메시지와 같은 일반 값을 포함하는 **rejected promise**를 반환하거나 `thunkAPI.rejectWithValue` 함수에서 반환된 `RejectWithValue` 인수를 사용하여 **resolved promise**를 반환합니다.
  - `payloadCreator` 함수엔 적절한 결과 계산을 위해 필요한 모든 로직(표준 AJAX 데이터 요청, 결과가 최종 값으로 결합된 다수의 AJAX 요청, React Native의 `AsyncStroage` 와의 상호 작용)을 포함할 수 있습니다.
  - `payloadCreator` 함수는 다음의 두 가지 인자와 함께 호출됩니다.
    - `arg`: 디스패치 될 때, **썽크 액션 생성자에 처음으로 전달되는 단일 값**입니다. 해당 인자는 **요청 일부로 필요한 아이템 ID와 같은 값**을 전달할 때 유용합니다. 다수의 값을 전달해야 하는 경우, **썽크를 디스패치 할 때 객체 형태(`dispatch(fetchUsers({status: 'active', sortBy: 'name'}))`)로 함께 전달**합니다.
    - `thunkAPI`: 객체 형태의 값으로, 리덕스 함수로 전달되는 모든 일반적인 파라미터를 포함합니다. 파라미터는 다음과 같습니다.
      - `dispatch`: 리덕스 스토어의 `dispatch` 메서드
      - `getState`: 리덕스 스토어의 `getState` 메서드
      - `extra`: 가능하면 설정 시 썽크 미들웨어에 제공되는 추가 인자
      - `requestId`: 요청 시퀀스를 식별하기 위해 자동으로 생성된 고유한 문자열 ID 값
      - `signal`: 앱 로직 내 다른 부분이 해당 비동기 요청을 취소하길 원하는 지에 사용하는 [`AbortController.signal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal) 객체입니다.
      - `rejectWithValue(value, [meta])`: `rejectWithValue` 는 기존에 정의된 페이로드 및 메타와 함께 **거절(rejected)된 응답을 반환하기 위해 `return`(또는 `throw`) 할 수 있는 유틸리티 함수**입니다. 당신이 할당하는 어떤 값이라도 전달하여 거절된 액션의 페이로드로 해당 값을 돌려줍니다. 만약 `meta` 도 전달되면, 기존의 `rejectedAction.meta` 와 병합됩니다.
      - `fulfillWithValue(value, meta)`: `fulfillWithValue` 는 `fulfilledAction.meta` 에 추가할 수 있는 기능을 갖는 값과 함께 `fulfill` 을 `return` 할 수 있는 함수입니다.
- **Options(object):** 추가적인 필드를 포함하는 객체 형식의 인자입니다.
  - `condition(arg, { getState, extra } ): boolean | Promise<boolean>`: 원한다면 페이로드 생성기와 모든 액션 디스패치의 실행을 스킵할 수 있는 콜백입니다. [`condition` 필드에 대한 자세한 내용](https://redux-toolkit.js.org/api/createAsyncThunk#canceling-before-execution)
  - `dispatchConditionRejection`: 만약 `condition()` 함수가 `false` 를 반환하면 기본값은 아무런 액션도 디스패치 되지 않는 것입니다. 해당 필드를 `true` 로 하면 썽크가 취소되었을 때 거부된 작업을 지속적으로 전달되게 할 수 있습니다.
  - `idGenerator(arg): string`: 요청 시퀀스를 위한 `requestId` 를 생성할 때 사용하는 함수입니다. 기본값은 [nanoid](https://redux-toolkit.js.org/api/other-exports/#nanoid)를 사용하는 것이지만, 별도의 아이디 생성 로직을 설정할 수도 있습니다.
  - `serializeError(error: unknown) => any`: 내부의 `miniSerializeError` 로직을 별도의 직렬화 로직으로 변경합니다.
  - `getPendingMeta({ arg, requestId }, { getState, extra }): any`: `pendingAction.meta` 필드로 병합되는 객체를 생성하는 함수입니다.

### Return Value

---

`CreateAsyncThunk` 리덕스 썽크 액션 생성자의 표준을 반환합니다. 썽크 액션 생성자 함수는 중첩 필드로 포함된 `pending`, `fulfilled` 그리고 `rejected` 케이스를 위한 일반 액션 생성자가 있습니다.

위 예시인 `fetchUserById` 를 사용하면 `CreateAsyncThunk` 는 4가지 함수를 반환합니다.

- `fetchUserById` 작성한 비동기 페이로드 콜백을 시작하는 썽크 액션 생성자
  - `fetchUserById.pending`: `users/fetchByIdStatus/pending` 액션을 디스패치 하는 액션 생성자
  - `fetchUserById.fulfilled`: `users/fetchByIdStatus/fulfilled` 액션을 디스패치 하는 액션 생성자
  - `fetchUserById.rejected`: `users/fetchByIdStatus/rejected` 액션을 디스패치 하는 액션 생성자

디스패치 되면 해당 썽크는:

- `pending` 액션이 디스패치 됩니다.
- 그리고 `payloadCreator` 콜백을 호출하고 반환된 프로미스가 완료될 때 까지 기다립니다.
- 프로미스가 완료되었을 때:
  - **프로미스가 성공적으로 해결되면,** `fulfilled` 액션을 프로미스 값인 `action.payload` 와 함께 디스패치 합니다.
  - **프로미스가 `rejectWithValue(value)` 반환값과 함께 해결되면,** `rejected` 액션을 `action.payload` 로 전달된 값과 거부됨으로 `action.error.message` 를 함께 전달합니다.
  - **프로미스가 실패했고 `rejectWithValue` 로 처리되지 않은 경우,** `rejected` 액션을 `action.error` 로서의 에러 값의 직렬화 된 버전과 함께 반환됩니다.

### Promise Lifecycle Actions

---

`createAsyncThunk` 은 **세 가지 리덕스 액션 생성자(`pending`, `fulfilled` 그리고 `rejected`)와 함께 생성**되고, 해당 생성자들은 `createAction` 을 사용합니다. 각 라이프 사이클 액션 생성자는 반환된 썽크 액션 생성자에 연결되므로, 리듀서 로직이 액션 타입을 참조하고 디스패치 될 때 해당하는 액션에 응답할 수 있습니다. 각 액션 객체는 `action.meta` 에 있는 현재 고유한 `requestId` 와 `arg` 값을 포함합니다.

해당 액션 생성자는 다음의 시그니처들을 포함합니다.

```ts
interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

interface PendingAction<ThunkArg> {
  type: string;
  payload: undefined;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

interface RejectedAction<ThunkArg> {
  type: string;
  payload: undefined;
  error: SerializedError | any;
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
    condition: boolean;
  };
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string;
  payload: RejectedValue;
  error: { message: "Rejected" };
  meta: {
    requestId: string;
    arg: ThunkArg;
    aborted: boolean;
  };
}

type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => PendingAction<ThunkArg>;

type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>;

type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => RejectedAction<ThunkArg>;

type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>;
```

해당 액션들을 리듀서에서 처리하기 위해 객체 키 표기법 혹은 빌더 콜백 표기법을 사용하는 `createReducer` 나 `createSlice` 에서 액션 생성자를 참조하세요. 만약 **타입스크립트를** 사용한다면, 타입 추론을 더욱 명확히 하기 위해 **빌더 콜백 표기법**을 사용해야합니다.

```ts
const reducer1 = createReducer(initialState, {
  [fetchUserById.fulfilled]: (state, action) => {},
});

const reducer2 = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserById.fulfilled, (state, action) => {});
});

const reducer3 = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {},
  },
});

const reducer4 = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {});
  },
});
```

### Handling Thunk Results

---

#### Unwrapping Result Actions

---

썽크는 디스패치 되면 값을 반환할 수 있습니다. 보편적인 사용 방식은 다음과 같습니다.

- 썽크로부터 프로미스 반환
- 썽크를 컴포넌트로부터 디스패치
- 다음 추가 작업을 수행하기 이전에 프로미스가 완료되는 것을 기다리는 것

```ts
const onClick = () => {
  dispatch(fetchUserById(userId)).then(() => {
    // do additional work
  });
};
```

`createAsyncThunk` 에 의해 생성된 썽크는 항상 적절하게 처리된 `fulfilled` 액션 객체 혹은 `rejected` 액션 객체를 포함한 완료된 프로미스를 반환합니다.

요청 로직은 해당 프로미스를 기존의 프로미스인 것처럼 처리할 수 있습니다. 디스패치 된 썽크에 의해 반환된 프로미스는 `unwrap` 속성을 갖습니다. `unwrap` 속성은 `fulfilled` 액션의 `payload` 룰 추출하거나, `error` 혹은 가능하다면 `rejected` 액션의 `rejectWithValue` 를 통해 생성된 `payload` 를 throw 하기 위해 호출할 수 있습니다.

```ts
// in the component

const onClick = () => {
  dispatch(fetchUserById(userId))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    });
};
```

혹은 `async`/`await` 구문과 함께

```ts
// in the component

const onClick = async () => {
  try {
    const originalPromiseResult = await dispatch(
      fetchUserById(userId)
    ).unwrap();
    // handle result here
  } catch (rejectedValueOrSerializedError) {
    // handle error here
  }
};
```

연결되어 있는 `.unwrap()` 을 선호하지만, 리덕스 툴킷은 비슷한 목적으로 사용할 수 있는 `unwrapResult` 함수도 내보냅니다.

```ts
import { unwrapResult } from "@reduxjs/toolkit";

// in the component
const onClick = () => {
  dispatch(fetchUserById(userId))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle result here
    });
};
```

`async`/`await` 구문과 함께 사용하면 다음과 같습니다.

```ts
import { unwrapResult } from "@reduxjs/toolkit";

// in the component
const onClick = async () => {
  try {
    const resultAction = await dispatch(fetchUserById(userId));
    const originalPromiseResult = unwrapResult(resultAction);
    // handle result here
  } catch (rejectedValueOrSerializedError) {
    // handle error here
  }
};
```

---

#### Checking Errors After Dispatching

---

이것은 **실패한 요청 혹은 썽크 내 에러가 거부된 프로미스를 반환하지 않는다는 것**을 의미합니다. 이 시점에서 모든 실패는 처리되지 않은 오류보다 **처리된 오류**라고 판단됩니다. 이는 디스패치의 결과를 사용하지 않는 사람들을 위해 **처리되지 않은 프로미스 rejections**를 방지하고자 함입니다.

만약 당신의 컴포넌트가 요청 실패를 알게 하고 싶다면, **\*`.unwrap` 혹은 `unwrapResult` 를 사용**하고 **다시 throw 된 오류를 적절하게 처리하세요.**

### Handling Thunk Errors

---

당신의 `payloadCreator` 가 reject 된 프로미스(`async` 함수에서 반환된 오류 등)를 반환할 때, 썽크는 `action.error` 로 에러의 자동으로 직렬화 된 버전을 포함하는 `rejected` 액션을 전달합니다. 하지만 직렬성을 보장하기 위해 `SerializedError` 인터페이스와 일치하지 않는 모든 항목이 인터페이스에서 제거됩니다.

```ts
export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
```

만약 당신이 `rejected` 액션의 내용을 커스터마이징 하고 싶다면, 스스로 에러를 잡아야하고, `thunkAPI.rejectWithValue` 를 사용하는 새로운 값을 반환해야 합니다.

`rejectWithValue` 접근 방식은 **API 응답이 "succeeds" 이지만, 리듀서가 알아야 하는 추가 오류 세부 정보가 포함된 경우**에도 사용됩니다. 이는 특히 필드 수준의 유효성 검사를 예상할 때 일반적입니다.

```ts
const updateUser = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    const { id, ...fields } = userData;
    try {
      const response = await userAPI.updateById(id, fields);
      return response.data.user;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);
```

### Cancellation

---

**Canceling Before Execution**

만약 당신이 페이로드 생성자가 호출되기 전에 썽크를 취소하고 싶다면, 옵션으로서 **페이로드 생성자 뒤에 `condition` 콜백을 제공할 수 있습니다.** 해당 콜백은 매개변수로 **썽크 인자와 `{getState, extra}` 를 포함한 객체**를 받습니다. 그리고 이를 계속 지속할 것인지 아닌 지에 대한 결정에 사용합니다.

만약 **실행이 취소되어야 한다면,** `condition` 콜백은 **리터럴 `false` 값** 혹은 **`false` 으로 resolve 되는 프로미스**를 반환해야 합니다. 만약 **프로미스가 반환된다면,** 썽크는 **`pending` 액션이 디스패치 되기 전에 `fulfilled` 될 때까지 프로미스를 기다립니다.** 그렇지 않으면 동기식으로 디스패치가 진행됩니다.

```ts
const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  },
  {
    condition: (userId, { getState, extra }) => {
      const { users } = getState();
      const fetchStatus = users.requests[userId];
      if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
  }
);
```

만약 `condition()` 이 `false` 를 반환하면, 기본 동작은 **액션이 전혀 전달되지 않는 것**입니다. 만약 썽크가 취소되었을 때 "rejected" 인 액션이 여전히 디스패치 되게 하고 싶다면, `{condition, dispatchConditionRejection: true}` 를 전달하세요.

#### Canceling While Running

---

만약 당신의 실행 중인 썽크가 마무리되기 전에 취소하고 싶다면, `dispatch(fetchUserById(userId))` 에 의해 반환되는 프로미스의 `abort` 메소드를 사용할 수 있습니다.

실제 예제는 다음과 같습니다.

```ts
import { fetchUserById } from "./slice";
import { useAppDispatch } from "./store";
import React from "react";

function MyComponent(props: { userId: string }) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // Dispatching the thunk returns a promise
    const promise = dispatch(fetchUserById(props.userId));
    return () => {
      // `createAsyncThunk` attaches an `abort()` method to the promise
      promise.abort();
    };
  }, [props.userId]);
}
```

이 방식으로 썽크가 취소된 뒤에, `error` 속성에 대한 `AbortError` 와 함께 `"thunkName/rejected"` 액션을 디스패치(그리고 반환)합니다. **썽크는 어떠한 추가 액션도 디스패치 않습니다.**

추가적으로 `payloadCreator` 는 `thunkAPI.signal` 을 통해 전달된 `AbortSignal` 을 사용하여 **비용이 많이 드는 작업을 해당 시점에서 취소할 수 있습니다.**

현대 브라우저의 `fetch` API는 **이미 `AbortSignal` 를 지원합니다.**

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId: string, thunkAPI) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      signal: thunkAPI.signal,
    });
    return await response.json();
  }
);
```

#### Checking Cancellation Status

---

#### Reading the Signal Value

---

`signal.aborted` 를 사용하여 **썽크가 중단되었는지 정기적으로 확인**하고 **높은 비용의 작업을 중단**할 수 있습니다.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";

const readStream = createAsyncThunk(
  "readStream",
  async (stream: ReadableStream, { signal }) => {
    const reader = stream.getReader();

    let done = false;
    let result = "";

    while (!done) {
      if (signal.aborted) {
        throw new Error("stop the work, this has been aborted!");
      }
      const read = await reader.read();
      result += read.value;
      done = read.done;
    }
    return result;
  }
);
```

#### Listening for Abort Events

---

또한 `signal.addEventListener('abort', callback)` 를 호출하여 `promise.abort()` 가 호출될 때 썽크 내부 로직이 알림을 받을 수 있도록 할 수 있습니다. 예를 들어, axios의 `CancelToken` 과 함께 결합하여 사용될 수 있습니다.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    const response = await axios.get(`https://reqres.in/api/users/${userId}`, {
      cancelToken: source.token,
    });
    return response.data;
  }
);
```

### Examples

---

- 한 번에 하나의 요청으로, ID를 통한 유저와 로딩 상태를 함께 요청합니다.

```ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";

const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: "idle",
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.entities.push(action.payload);
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

const UsersComponent = () => {
  const { entities, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const fetchOneUser = async (userId) => {
    try {
      const user = await dispatch(fetchUserById(userId)).unwrap();
      showToast("success", `Fetched ${user.name}`);
    } catch (err) {
      showToast("error", `Fetch failed: ${err.message}`);
    }
  };

  // render UI here
};
```

- `rejectWithValue` 를 사용하여 컴포넌트 내에서 커스텀한 `rejected payload` 접근
  - 이것은 `userAPI` 가 오직 에러만을 반환한다는 극단적인 예시입니다.

```ts
// file: user/slice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";
import { AxiosError } from "axios";

// Sample types that will be used
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

interface UpdateUserResponse {
  user: User;
  success: boolean;
}

export const updateUser = createAsyncThunk<
  User,
  { id: string } & Partial<User>,
  {
    rejectValue: ValidationErrors;
  }
>("users/update", async (userData, { rejectWithValue }) => {
  try {
    const { id, ...fields } = userData;
    const response = await userAPI.updateById<UpdateUserResponse>(id, fields);
    return response.data.user;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

interface UsersState {
  error: string | null | undefined;
  entities: Record<string, User>;
}

const initialState = {
  entities: {},
  error: null,
} as UsersState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export default usersSlice.reducer;

// file: user/UsersComponent.ts
import React from "react";
import { useAppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { User, updateUser } from "./slice";
import { FormikHelpers } from "formik";
import { showToast } from "some-toast-library";

interface FormValues extends Omit<User, "id"> {}

const UsersComponent = (props: { id: string }) => {
  const { entities, error } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  // This is an example of an onSubmit handler using Formik meant to demonstrate accessing the payload of the rejected action
  const handleUpdateUser = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const resultAction = await dispatch(
      updateUser({ id: props.id, ...values })
    );
    if (updateUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload;
      showToast("success", `Updated ${user.first_name} ${user.last_name}`);
    } else {
      if (resultAction.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
        formikHelpers.setErrors(resultAction.payload.field_errors);
      } else {
        showToast("error", `Update failed: ${resultAction.error}`);
      }
    }
  };

  // render UI here
};
```
