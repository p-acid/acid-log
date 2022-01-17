---
title: Axios와 친해지며 기록하기
date: "2022-01-14"
description: "Fetch와 비슷하면서도 묘하게 다른 느낌의 Axios와 친해지려 노력해봅시다."
tags: ["Axios", "Fetch", "HTTP", "async", "await"]
thumbnail: "axios_logo.svg"
---

# 개념 알아보기

---

> Axios is a promise-based HTTP Client for node.js and the browser.

**Axios**는 공식 문서에서 위와 같이 설명되어 있는데 해석하자면, **node.js 와 브라우저를 위한 프로미스 기반의 HTTP 클라이언트 라이브러리**라고 정의됩니다. 이 한 줄의 정의를 위해 다음의 개념들을 간단히 정의할 수 있습니다.

- **node.js 와 브라우저를 위한**
  - [Isomorpic(동형)](https://www.lullabot.com/articles/what-is-an-isomorphic-application): **동일한 소스 코드**로 **서버(node.js)와 클라이언트(Browser)에서 작성**하는 형태
    > Javascript was traditionally the language of the web browser, performing computations **directly on a user’s machine.** This is referred to as **“client-side” processing.** With the advent of Node.js, JavaScript has become a compelling **“server side” language** as well, which was traditionally the domain of languages like Java, Python, and PHP.
- **프로미스(Promise) 기반의**
  - 프로미스 객체란 **비동기 작업이 맞이할 미래의 완료 혹은 실패와 그 결과값**을 나타냅니다.
- **HTTP Client**
  - HTTP **요청(Request)의 주체**

위 내용을 다 알진 못해도 간단하게 **HTTP 요청을 위해 사용하는 라이브러리이며 프로미스 객체를 반환한다**고 이해할 수 있을 것 같습니다. 프로미스에 대한 개념은 `async` 와 `await` 에 대한 내용과 관련이 있기에 알아두면 좋을 것 같은 느낌입니다.

</br>

# 기능 알아보기

---

우선 설치부터 진행해봅시다. axios는 `npm` 이나 `yarn` 등을 사용하여 설치할 수 있습니다.

```sh
$ npm install axios
```

```sh
$ yarn add axios
```

axios를 사용한 간단한 `GET` 요청 예시를 확인해봅시다.

```
const axios = require('axios');

// 지정된 ID를 가진 유저에 대한 요청
axios.get('/user?ID=12345')
  .then(function (response) {
    // 성공 핸들링
    console.log(response);
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
  .then(function () {
    // 항상 실행되는 영역
  });

// 선택적으로 위의 요청은 다음과 같이 수행될 수 있습니다.
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 항상 실행되는 영역
  });

// async/await 사용을 원한다면, 함수 외부에 `async` 키워드를 추가하세요.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

공식 문서에 나타나있는 axios 예시입니다. 기본적인 사용 방법은 기존의 `fetch` 와 큰 차이점이 없어 보입니다. `then` 과 `catch` 를 통해 에러핸들링을 진행할 수 있고, 프로미스 객체를 반환하기에 `async` 와 `await` 를 활용하여 비동기 동작 관리를 할 수 있습니다.
