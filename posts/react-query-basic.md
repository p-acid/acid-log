---
title: 리액트 쿼리를 왜 사용하는가
date: "2022-09-20"
description: 비동기 상태 관리를 효과적으로 하는 리액트 쿼리에 대해 되짚어봅니다.
tags: ["react-query", "library", "asynchronous", "state", "management"]
thumbnail: "thumbnail.png"
---

# 들어가며

---

![나라를 지키고 돌아왔다](/images/posts/react-query-basic/mudo_can_everything.jpeg)

지금 뭐든지 할 수 있을 것 같은 블로그 주인장입니다. 오늘 예비군을 하고 와서 그런가 축 처지는 것만 같은 기분인데요, 그래도 이렇게 게을리 살다보면 밑도 끝도 없이 게을러지기 때문에 한 글자라도 적어보고자 합니다.

이전에 회사에서 백엔드 쪽 기술 스택 변경 및 전면적인 개편이 들어가면서 작성해둔 기존 API 로직들이 아닌 새로운 API를 작성해야 하는 상황에 놓인 적이 있었습니다. 그때 아예 **상태 관리 라이브러리를 바꿔보자**는 의견이 있었고 확인해보니 [**리덕스(Redux)**](https://ko.redux.js.org/introduction/getting-started/)를 활용하여 **전적으로 클라이언트 전역 상태 관리를 위해 사용하는 경우가 적다**고 판단되어 이를 [**리코일(Recoil)**](https://recoiljs.org/ko/docs/introduction/getting-started/)과 [**리액트 쿼리(React Query)**](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)를 함께 활용하는 방식으로 변경하게 되었습니다.

당시에는 이게 어떤 큰 변화인지 인지하기도 전에 기술 스택 전환을 시작한 것이었어서 어떤 방식인지에 대한 이해가 잘 되지 않은 상태였는데 활용하면서 점차 이해의 수준이 높아지면서 **아예 잘못 이해하고 있었다**는 생각이 드는 것 같습니다. 리코일과 리액트 쿼리 두 가지를 사용하면서 각각 느끼는 바가 있지만 일단은 **리액트 쿼리**에 대해서만 작성해보고자 합니다. 사실 그렇다고 해도 엄청 대단한 수준도 아니지만요.

그렇다면 포스팅 시작하겠습니다.

# 리액트 쿼리가 뭐에요

---

당연한 이야기지만 **리액트 쿼리가 무엇인지**에 대해서 먼저 짚고 넘어가야겠죠. 공식 홈페이지에서는 리액트 쿼리에 대해 다음과 같은 슬로건을 내세우고 있습니다.

> **Powerful asynchronous state management** for TS/JS, React, Solid, Vue and Svelte

**강력한 비동기 상태 관리**라고 정의하고 있는데요 저는 지금은 이 부분을 **서버 데이터를 `useState` 를 활용하는 것처럼 관리하기**라고 간단하게 이해해봤습니다. 리액트 쿼리를 사용하면 강력한 **캐싱** 기능을 통해 **중복 요청을 방지**하거나 이를 **수정(낙관적인 업데이트)하여 마치 재요청을 한 듯한 화면**을 보여줄 수 있기 때문입니다.

이를 더 쉽게 이해하기 위해 캐싱과 관련된 몇 가지 API 들을 함께 알아보도록 하겠습니다.

```tsx
import { useQueryClient } from "@tanstack/react-query";

const Component = () => {
  const queryClient = useQueryClient(); // 햔재 QueryCLient 인스턴스 생성

  // query-key 라는 쿼리 키와 매칭되는 캐싱 데이터를 가져온다.
  const cachedData = queryClient.getQueryData(["query-key"]);

  // query-key 라는 쿼리 키와 매칭되는 캐싱 데이터를 수정한다.
  queryClient.setQueryData(["query-key"], (prev) => ({
    ...prev,
    count: prev.count + 1,
  }));

  return <Wrapper>{/* Dom Element... */}</Wrapper>;
};

export default Component;
```

위 예시를 보면 **`QueryClient`** 라는 것이 있는데 이는 리액트 쿼리에서 **캐싱 데이터와 상호작용 하는데 사용되는 것**이라고 이해하면 될 것 같습니다. 우리는 이러한 `QueryClient` Provider를 통해 추가하고 `useQueryClient` 와 같은 훅을 활용하여 캐싱 데이터를 다루는데 사용할 수 있습니다. 그래서 위 예제에선 `queryClient` 인스턴스의 `getQueryData` 메서드를 통해 캐싱 데이터를 가져오고 `setQueryData` 를 통해 해당 캐싱 데이터를 수정할 수 있습니다. 이렇게 되면 서버에 요청을 보낼 때, 실제 DB 데이터가 변경되는 순간 **마치 새롭게 요청을 한 것처럼 화면에 변경 사항을 반영**할 수 있습니다.

그렇다면 왜 굳이 재요청을 보내지 않고 캐싱 데이터를 수정해야 할까요?

![혼자 가고 싶어요... 이러지 말아주세요](/images/posts/react-query-basic/many_fetching_data.png)

서버에 요청을 보내면 당연히도 해당 **요청에 대한 정보 전체**를 보내줍니다. 그 중 실제로 변동이 되지 않은 데이터도 포함되어 있을 것입니다. 만약 단순히 `true` 값을 `false` 로 바꾸거나 기존 값에 `1` 을 더하는 등 간단한 연산인 경우에 이를 다시 요청하는 것은 다소 불필요할 수 있을 것입니다. 우리는 이미 변동될 데이터들이 **어떻게 바뀔 지 예측 가능하기 때문이죠.** 이렇게 실제 값의 변화를 예측하고 캐싱 데이터를 수정하는 것을 **낙관적 업데이트**라고 합니다. 그리고 낙관적 업데이트를 진행하면 우리는 한 번의 서버 요청을 줄일 수 있는 것입니다.

![다 저장해서 캐시로 만들거야!](/images/posts/react-query-basic/save_save.jpeg)

그래서 앞에서 언급했듯이 리액트 쿼리를 사용하면 비동기 요청을 통한 값을 더욱 효과적으로 관리할 수 있는 것입니다. 이외에도 **캐시 키**를 기준으로 하는 **중복 데이터 요청 방지**와 **`stale`** 을 기준으로 **데이터의 업데이트 기준 확보**와 같은 장점들이 있습니다.

# 리액트 쿼리로 바꾸면 뭐가 좋을까

---

그렇다면 리덕스에서 리코일과 리액트 쿼리로 전환하고 난 뒤의 느낀 점에 대해 간단히 적어보겠습니다.

기존에 저희는 리덕스 툴킷과 RTK Query를 사용하면서 비동기 요청 상태 관리를 진행하고 있었습니다. 그 당시에 리덕스 툴킷과 RTK Query에 대한 이해가 많이 부족해서인지 이를 **능숙하게 활용하기 위한 지식 수준까지 끌어올리는 것이 다소 어렵다**는 생각이 들었습니다. 또한, 리덕스 자체는 훌륭한 라이브러리이지만 알다시피 리덕스로 전역 상태를 관리하면 순수한 클라이언트 전역 상태와 비동기 요청을 저장한 전역 상태를 함께 리덕스를 통해 관리하게됩니다. 근데 당시에 저희는 실질적으로 순수 클라이언트 전역 상태를 관리하게 되는 상황이 그다지 많지 않았고 **주로 비동기 요청을 관리하기 위한 용도**로서 리덕스가 사용되고 있었습니다. 마지막으로 리덕스 자체가 갖고 있는 **다양한 사전 설정 내용 및 미들웨어**들은 이를 유지보수하기 위해 뛰어든 저를 아주 괴롭게 만들었죠.

![아... 아... 아... 👻](/images/posts/react-query-basic/lonely_state.jpeg)

이를 리코일과 리액트 쿼리를 활용하여 어느 정도 해소할 수 있었다고 생각합니다. 우선 상대적으로 낮은 러닝 커브로 인해 이를 활용함에 있어 생기는 어려움을 많이 줄일 수 있었습니다. 그리고 클라이언트 전역 상태를 리코일에서 관리하고 리액트 쿼리를 통해 비동기 요청 상태를 관리하여 목적에 따라 명확히 구분할 수 있다는 점도 좋았습니다. 물론 줄어든 사전 설정 내용들도요.

현재까지의 느낀 바는 이렇습니다. 물론 이외에도 다양한 이점들이 많고 단점 또한 많습니다. 그런 부분들은 다른 분들의 블로그에 더 명확히 잘 기재되어있다고 판단되니 이는 생략하겠습니다.

# 리액트 쿼리 사용하기 전에 알았으면 좋았을 것들

---

리액트 쿼리를 적용하면서 충분한 학습이 부족했던 것인지 이후에 알았으면 좋았다 싶은 내용들이 몇 가지 있었습니다.

## 리액트 쿼리는 캐싱이 가능합니다

---

이게 무슨 말이냐면 놀랍게도 저는 리액트 쿼리의 캐싱 기능에 대한 깊은 이해가 없던 상황에서 시작하였고, 개발 초반부에 특정 요청이 발생할 경우 이와 관계된 데이터를 수정하고자 할 때 **`refetch` 로 데이터를 업데이트** 시키곤 했습니다. 그 중에서 위에서 언급했던 단순 연산도 포함되어 있겠죠. 지금 생각해보면 이럴꺼면 대체 리액트 쿼리를 왜 사용하는가 생각해보게 되고 단순히 비동기 데이터를 저장하고 사용하는데에 국한되어 있었던 것 같습니다.

## 저장되는 캐싱 데이터에 불필요한 참조를 제거하자

---

이건 지금 수정할 생각을 하면, 정말 아찔해지는 내용 중 하나입니다. 요청에 대한 결과 값을 리액트 쿼리를 통해 캐싱 데이터로 저장하게 되는데, 캐싱된 데이터가 `axios` 리턴 값 그대로라면 믿으시겠습니까. 실수라면 큰 실수를 저질러버린 저는 캐싱 데이터를 수정하는 로직을 작성할 때마다 이러한 과오를 지우는 벌을 받게 됩니다. 예를 들어 요청 값으로 다음과 같은 값이 넘어온다고 생각해봅시다.

```json
{
    "data": {
        "data": {
            ...
        }
    }
}
```

그리고 위 형태의 데이터를 그대로 리액트 쿼리를 통해 저장했다고 가정하면 우리는 캐싱 데이터를 수정하기 위해 해당 참조를 계속해서 참조해야 하는 것입니다. 그렇기에 `useQuery` 혹은 `useMutation` 등으로 저장되는 값들이 나중에 캐싱을 진행한다는 가정 하에 최종 값이 저장되어야 한다는 사실을 명심해두면 좋을 것 같습니다.

![정말 돌아가고 싶습니다.](/images/posts/react-query-basic/stop_please.mp4)

# 마무리

---

지금까지 리액트 쿼리를 사용하면서 알아봤던 정보들이나 생각했던 내용들을 간단하게 정리해봤습니다. 급하게 배운 기술 스택이었지만 차차 활용을 하면서 숙련도를 쌓아가는 느낌이 현재까지는 좋은 기분으로 변하게되는 것 같습니다. 그럼 포스팅 마치겠습니다.
