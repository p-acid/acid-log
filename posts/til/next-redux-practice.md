---
title: Next.js & Redux로 API 통신 연습하기
date: "2022-01-17"
description: "Next.js에서 Redux를 활용할 때 next-redux-wrapper를 활용하는 법을 알아봅시다."
tags: ["Next.js", "Redux", "next-redux-wrapper", "Axios"]
thumbnail: "hotel-go.gif"
---

> 🔗 **[GitHub link](https://github.com/p-acid/nextjs-redux-practice)**

# 들어가며

---

이번에 리덕스를 공부하면서 Next.js에 적용할 때 **`getStaticProps`, `getServerSideProps` 등의 메서드에서 스토어에 접근하기 위해 부가적인 요소가 필요하다는 것**을 알았습니다. 현재 주어진 과제를 해결하기 위해선 필수적이진 않을 수 있지만, 장기적인 측면에서 Next.js를 사용할 때 해당 메서드를 사용하는 것은 불가피한 것이라 판단했기 때문에 먼저 짚고 가자는 생각으로 시작했습니다.

전반적으로 [유튜브 강의 영상](https://www.youtube.com/watch?v=HC5zazD92ps)을 따라가면서 진행했고 소스 코드는 상단의 깃허브 링크에서 참고하실 수 있습니다.

# 프로젝트 시작하기

---

그럼 본격적으로 프로젝트를 시작해보겠습니다. 클론을 진행하지 않고 시작한다는 가정으로 **프로젝트 구조, 프로젝트 진행**의 내용 순서로 진행하겠습니다.

우선 프로젝트 시작 전 설치해야 할 패키지는 다음과 같습니다.

```sh
npm i redux --save

or

npm i @reduxjs/toolkit --save
```

```sh
npm i redux-thunk redux-devtools-extension react-redux next-redux-wrapper --save
```

예시 영상에서는 `redux` 를 사용하였고 이를 `redux toolit` 대체하셔도 됩니다. 실제로 제 소스 코드에는 `redux toolit` 으로 대체되어있습니다.

## 프로젝트 구조

---

프로젝트 내 `redux` 디렉토리의 구조는 다음과 같습니다.

```sh
redux
├── store.js
├── actions
    └── roomActions.js
├── constants
    └── roomConstants.js
└── reducers
    └── reducers.js
    └── roomReducers.js

```

해당 프로젝트는 주로 **리덕스**에 대한 내용이기 때문에 리덕스 관련 디렉토리를 중심으로 보겠습니다.

우선적으로 **`store.js` 와 `actions` , `constants` , `reducers` 디렉토리**로 구성되어 있습니다. 각 디렉토리의 **`room` 이라는 키워드가 포함된 파일**들은 해당 카테고리와 관련된 데이터들을 포함하고 있습니다. 그리고 `reducers` 디렉토리 내 `reducers.js` 파일은 스토어에 할당할 모든 리듀서들을 결합하는 내용이 포함됩니다.

프로젝트 진행을 위해(레이아웃 관련 내용 제외) 위와 같은 구조의 디렉토리를 구성하고 시작하면 될 것 같습니다.

## 프로젝트 진행 과정

---

우선적으로 작성할 파일은 **`store.js` 파일**입니다. 소스 코드와 함께 진행하겠습니다.

```js
import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
```

먼저 **미들웨어**와 관련된 내용입니다. `bindMiddleware` 함수를 보면 낯설은 다음의 세 부분을 확인할 수 있습니다.

- `process.env.NODE_ENV !== "production"`
- `composeWithDevTools`
- `applyMiddleware`

순서대로 간단하게 알아보겠습니다.

우선 `if` 문의 조건으로 들어가있는 **`process.env.NODE_ENV !== "production"`** 부분은 **배포 모드와 개발 모드를 구분하여 번들링하고 실행시키기 위한 것**입니다. 리액트 개발 모드는 오류가 될 만할 부분을 경고하는 **검증 코드**를 포함하고 있다는데, 개발 모드의 경우 이러한 부분이 상관 없지만 배포 모드의 경우엔 **앱 속도를 느리게 하는 원인**이 될 수 있다고 합니다. 위 경우엔 **배포 모드에서 Redux DevTools를 미들웨어와 함께 사용하기 위해** 이를 구분하였습니다.

> 🔖 [개발(Development) 모드는 어떻게 작동할까?](https://ui.toast.com/weekly-pick/ko_20191212)

다음의 `composeWithDevTools` 는 앞에서 미리 말했듯이 **Redux DevTools를 미들웨어와 함께 사용하기 위해** 작성한 부분입니다. 이를 활용하면 Redux DevTool를 미들웨어와 함께 원활하게 사용할 수 있습니다.

> 🔖 [Redux DevTools Extension's helper](https://www.npmjs.com/package/redux-devtools-extension#usage)

마지막으로 `applyMiddleware` 부분입니다. 해당 구문을 통해 **미들웨어를 사용할 수 있습니다.**

> 🔖 [`applyMiddleware(...middleware)`](https://redux.js.org/api/applymiddleware)
