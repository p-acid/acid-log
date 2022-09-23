---
title: 리액트 포탈 간단하게 활용하기
date: "2022-09-17"
description: "리액트 포탈을 이용하여 다른 차원에서 돔을 생성해봅시다."
tags: ["portal", "react", "recoil"]
thumbnail: "thumbnail.mp4"
---

# 들어가며

---

이번에도 너무나도 오랜만의 포스팅입니다. 최근 사내 서비스 개발에 박차를 가하고 있어 블로그를 자주 만지지는 못했는데 간간히 수정을 진행하다 이러다가는 블로그가 아니라 유사 프로모션 페이지가 되어버릴 것 같아 포스팅을 채워야겠다는 생각이 들었습니다.

이번 포스팅에서 다룰 내용은 리액트 [**포탈**](https://ko.reactjs.org/docs/portals.html)입니다. 이전에 모달이라는 개념을 구현하고자 할 때 **CSS 상속 문제**로 인해 곤란했던 경험이 있었는데, 포탈은 이를 편리하게 해결할 수 있는 방법 중 하나입니다. 간단하게 **포탈의 개념과 동작 구조**를 알아보고 **어떻게 적용하는 지**에 대해 알아보도록 하겠습니다.

# 포탈이란

---

> **Portal**은 **부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링**하는 최고의 방법을 제공합니다.
>
> 출처 : [React Docs](https://ko.reactjs.org/docs/portals.html)

닥터 스트레인지는 게이트웨이를 통해 먼 곳을 순식간에 이동하곤 합니다. 게이트웨이를 만들게 되면 걸어가기만 했음에도 불구하고 일반적으로 도착했어야 할 위치가 아니라 아예 다른 위치로 이동하게 되죠. **포탈**도 이와 마찬가지로 원래 위치해야 할 DOM 노드가 아닌 다른 DOM 노드로 요소를 렌더링 할 수 있도록 하는 방법입니다.

사실 원리만 보면 포탈을 어디에 사용해야 하는 지에 대해서는 직관적인 이해가 어렵습니다. 그럼 대표적인 UI 요소로서 **모달**을 한 번 생각해봅시다. 모달은 일반적으로 화면의 한 단계 위에 위치하며 이는 `z-index` 등으로 두드러지게 표현할 수 있는데, 이를 가장 효과적으로 반영할 수 있는 방법이 포탈입니다. 기본적으로 화면을 렌더링 하는 `app-root` 와 동등한 위치에 있기에 상대적인 관계를 보다 덜 신경쓸 수 있기 때문입니다.

그러나 포탈을 통해 이동시킨 것들도 여전히 리액트 트리 안에 존재하기 때문에 **`context`** 와 같은 기능은 여전히 동작합니다. **이벤트 버블링**의 경우에도 마찬가지입니다.

이정도면 간단하게 포탈에 대해 알아본 것 같습니다. 그렇다면 **포탈을 적용하는 방법**에 대해서 알아보도록 합시다.

# 한 층을 더 얹어보자

---

![포탈을 활용하여 만든 메뉴](/images/posts/react-portal/portal-menu.gif)

제 블로그는 화면이 일정 크기로 줄어들 때 네비게이션 메뉴들이 햄버거 메뉴로 변경되면서 해당 버튼을 누르게 되면 위와 같이 페이지를 이동할 수 있는 메뉴가 나타나게 됩니다. 사실 포탈을 활용하지 않아도 가능할 부분이기도 하겠지만, 이번 포탈 포스팅을 작성하면서 다시금 복습하고자 한 번 만들어보았습니다. 보시면 위 메뉴는 아예 **다른 층**으로 구성된 것 같이 보입니다. 그건 포탈을 사용하여 `<NavMenu />` 컴포넌트를 다른 DOM 노드로 이동시켰기 때문입니다.

시작하기에 앞서 저는 **Next.js**를 사용하여 적용하였다는 점 알고 시작하시면 좋을 것 같습니다. 일반적인 CRA로 구성된 리액트 프로젝트와 Next.js 프로젝트의 구조는 약간 차이가 있기에 중간 중간에 이에 대한 내용을 언급하겠지만 완벽하지 않을 수도 있다는 점 알아주시면 감사하겠습니다.

우선 컴포넌트를 다른 DOM 노드에 렌더링시키기 위해 `_document` 파일에 **다른 DOM 노드를 생성**합니다. 리액트의 경우 HTML 파일에 직접적으로 작성해주시면 될 것 같습니다.

```tsx
// _document.tsx

import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body>
        {/* 이렇게 id 값을 추가하여 작성해주시면 됩니다. */}
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
```

그렇게 작성을 완료했다면 다른 DOM 노드로 이동시킬 컴포넌트를 작성해줍니다.

```tsx
import { useRecoilState } from "recoil";
import { createPortal } from "react-dom";

const NavMenu = () => {
  const [{ isOpen }, setNavMenu] = useRecoilState(navMenu);

  ...

  const element =
    typeof window !== "undefined" && document.querySelector("#portal");

  ...

  // NavMenuContainer 위치에 렌더링하고자 하는 컴포넌트를 추가합니다.
  return element && isOpen ? createPortal(<NavMenuContainer />, element) : null;
};

export default NavMenu;
```

위 코드에서 보면 **`createPortal`** 이라는 리액트 메서드를 활용하고 있는 것을 확인할 수 있습니다. `createPortal` 의 사용 방법은 다음과 같습니다.

```ts
ReactDOM.createPortal(child, container);
```

첫 번째 `child` 인자에 **렌더링 하고 싶은 컴포넌트**를 추가하고, 두 번째 `container` 인자에 **렌더링 할 위치가 되는 DOM 노드**를 추가하는 것으로 간단하게 사용할 수 있습니다. 그렇기에 `element` 변수의 출처를 보면 `querySelector` 를 통해 `id` 가 `portal` 인 DOM 노드를 참조하는 것을 알 수 있습니다.

> 💡 `typeof window !== "undefined"` 부분은 `window` 객체인 `querySelector` 를 사용하기 전에 SSR을 통한 참조 오류가 발생하지 않도록 하기 위함입니다.

그렇다면 일단 포탈과 관련된 로직은 완성입니다. 정말 간단하죠? 저는 추가적으로 이를 켜고 끄는 동작을 하기 위하여 `isOpen` 값을 `recoil` 에 저장하여 활용하였습니다. 관련된 로직을 확인하고 싶으신 분들은 제 [블로그 소스 코드](https://github.com/p-acid/acid-log)를 참고해주시면 감사하겠습니다.

# 결론

---

이번 시간을 통해 간단하게 포탈을 활용해보면서 다시금 정리하게 되는 시간이었습니다. 이전에 포탈의 존재를 알지 못하고 CSS 상속 문제로 모달 제작에 큰 어려움이 있었던 적이 있는데, 알게 되고 난 뒤 사용하고 나서도 제대로 내용을 정리해보지 못한 것 같아 매번 다시 참고하는 것이 아쉬워서 작성하게 된 것 같습니다.

그러면 이렇게 포스팅 마무리하도록 하겠습니다. 감사합니다.
