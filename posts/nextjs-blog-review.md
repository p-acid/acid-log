---
title: Gatsby에서 Next.js로 블로그 전환하기
date: "2021-12-29"
description: 나는 왜 갑자기 블로그를 Next.js로 전환했는가.
tags: ["Next.js", "Blog", "Review"]
thumbnail: "change-library.png"
---

# 들어가며

---

드디어 기존 Gatsby로 구성된 블로그에서 Next.js로의 전환을 성공적으로 마쳤다. 사실 전환을 마음 먹었을 때, **왜 Next.js로 변경해야 하는 가**에 대해 되짚어 본 뒤에 진행하고자 마음 먹었기에 간단하게 이를 정리했었고, 나중에 이에 대한 이유를 나에게 물을 때 참고하기에 좋은 소재가 되지 않을까 싶기도 해서 이렇게 적어본다. 또한, 이 괴정에서 내가 겪었던 문제들에 대해 정리하며 이번 블로그 전환 과정에서도 자주 겪었던 **"아 내가 그거 어떻게 해결했지"** 모먼트를 없애기 위함도 큰 이유지 않나 싶다. 그렇다면 이유는 다음과 같이 정리할 수 있겠다.

- 나중에 이때 내가 왜 Next.js로 변경했는지 다시 물어보기 위해
- 아 그거 어떻게 해결했지, 하지 않기 위해서

# 왜 Next.js로 변경했는가

---

사실 잘 쓰고 있던 Gatsby 블로그를 구태여 Next.js로 변경할 이유를 찾는 것은 생각보다 그리 어렵지 않았다.

우선 지금 당장의 **학습 우선 순위를 매겼을 때, Next.js가 높은 순위에 해당한다.** 당장 들어갈 회사에서 Next.js를 활용하고 있고, 지금 난 Next.js에 대한 지식이 전무하기 때문에 Next.js를 학습하는 것은 당연한 수순이다. 그러면서 출근 이전에 Next.js를 활용하기 위해 별도의 프로젝트를 하는 것은 현실적으로 무리가 있다고 판단했고 현재 진행 중인 블로그 예시 프로젝트를 이어서 활용하자고 결정했다.

또한 **Gatsby를 활용하는 것이 Next.js를 학습하여 활용하는 것보다 리소스가 크다고 판단했다.** 처음 개인 블로그를 만들 때, 리액트를 베이스로 하는 프로젝트면 좋겠다는 생각이 있었고, 정적 사이트를 생성하기에 유용하다고 알려진 **Gatsby**를 선택한 기억이 있다. 실제로 `gatsby-starter-blog` 를 활용하여 블로그 제작을 진행하니 제공되는 기능들이 워낙 많아 내가 건드려야 할 부분이 크게 존재하지 않았다. 단지 Gatsby 사용법만 익힌다면 수월하게 사용할 수 있는 것이었던 것 같다.

그러나 **GraphQL**을 커스텀 하는 부분부터 진행이 많이 더뎌짐을 느꼈고, 실제로 구현하고자 했던 `log` 페이지는 미뤄두고 정체된 상황이 되었다. 그 와중에 Next.js 학습을 진행하면서 우연히 간단한 블로그를 구현하는 과정을 진행하게 되었고, 이를 활용한다면 **당장에 좀 더 자유롭게 블로그를 커스텀 할 수 있겠다는 생각이 들었다.** 그렇기에 난 블로그를 개편하게 되었고, 이유는 다음과 같이 정리할 수 있다.

- Next.js는 현재 학습 우선 순위가 높은 기술 스택이다.
- Next.js 학습보다 Gatsby 학습이 리소스가 더 크다.
  - GraphQL까지 함께 학습해야 하는게 너무 빡세다.
- 구현하고자 하는 블로그를 만들기 위해선 디렉토리 구조에 대한 이해가 많이 필요했다.
  - 일반 TIL 포스트와 log 포스트 구분하기 등

참고로 전반적인 블로그 제작 과정은 [Next.js 공식 문서 학습 과정](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)을 따라가며 진행했다.

# 문제 해결 정리하기

---

이제부터 블로그를 작성하면서 마주했던 몇 가지 문제들과 어떻게 해결했는지 정리하여 다음의 내가 비슷한 문제를 국면해도 다시 헤메지 않도록 하자.

## `Link` 컴포넌트 `prop` 이슈

---

```
Error: Failed prop type: The prop `href` expects a `string` or `object` in `<Link>`, but got `undefined` instead.
Open your browser's console to view the Component stack trace.
```

기존 리액트로 프로젝트를 진행하면서 리액트 라우터의 `Link` 컴포넌트를 자주 사용하였고, Gatsby에서의 `Link` 컴포넌트 또한 동일한 방식으로 활용했었다. 이번 블로그 이전 과정에서 일부 코드를 복붙한 경우가 있었는데, 그 과정에서 `<Link to="~">` 형태로 작성되어 있던 것이 원인이 되었다.

에러 내용을 해석하자면 `Link` 의 `prop` 에 해당하는 **`href` 의 값**은 **문자열 혹은 객체만 할당 가능하다**는 내용이고, 나의 경우에는 이를 명시하지 않았으니 `undefined` 가 할당되어 오류를 반환한 것이다. 블로그 제작 초기에 마주했던 문제였고, 아직도 에러 내용을 해석하는 것이 많이 어렵지만, 그 당시에 오히려 쉬운 문제였기에 골머리를 많이 앓았던 문제였다.

나는 위 문제는 다음과 같이 해결했다.

```jsx
// before
<Link to="/">link</Link>

// after
<Link href="/">link</Link>
```

내용을 보면 알다시피 정말 별거 아닌 것으로 애먹었다는게 참 안타까웠다. 이 포스팅을 보는 미래의 나 혹은 다른 사람들은 이 문제에 오래 묶여있지 않기를 빈다.

## `styled-component` 딜레이 이슈

---

나는 CSS를 적용하는 방법으로 `styled-component` 를 활용하는데 처음 배포를 진행하고 페이지를 들어가면 CSS가 문제 없이 잘 반영되었는데, 이후 수정 사항을 푸시하니 화면을 처음 틀거나 새로고침을 진행하면 CSS가 적용되지 않은 상태로 화면에 렌더링 되는 것을 확인할 수 있었다.

아무래도 렌더링 과정에서 `styled-component` 를 사용하기에 딜레이가 발생하는 것 같아 이를 검색하여 찾아보니 [스타일 로드 문제에 관련된 게시물](https://dev.to/rsanchezp/next-js-and-styled-components-style-loading-issue-3i68)을 확인할 수 있었다.

해결 방법을 요약하자면 `pages` 폴더에 `_document.js` 파일을 추가하고 [다음 내용](https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js)을 추가하면 된다는 것이다. 그렇다면 디렉토리 구조는 다음과 같을 것이다.

```
-__tests__
-components
-pages
   -_document.js
   -index.js
-public
```

코드 내부의 자세한 내용을 해석하기엔 무리가 있었지만, `getInitialProps` 를 활용하는 것으로 보아 초기 데이터로 `styled-component` 로 작성된 사항을 불러오는 것으로 추측할 수 있다.

암튼 해당 조치를 취하고 난 뒤에 문제 없이 작동하는 것을 확인할 수 있었다.

이외에도 간간히 문제들이 많았던 것 같은데, 가장 인상 깊었던 문제들만 작성했다.

# 마무리

---

우여곡절이 있었지만 어떻게 블로그 이사를 마무리지었다. 부트캠프를 마무리하고 어느 정도 여유가 생긴 시정에서 개인 블로그를 새로이 만들고 싶다는 생각이 있었는데, 이 시점에서 학습과 동시에 개인 블로그를 만들게 되어 숙원 사업을 끝낸 느낌이라 기분이 후련하다.

이제 이 블로그에서 앞으로 공부할 내용들을 착실히 적어가보자.
