---
title: 블로그 리메이킹 후기
date: "2022-07-17"
description: "기존 블로그 부수고 새 블로그 다시 짓기"
tags: ["typescript", "remake", "blog"]
thumbnail: "thumbnail.mp4"
---

# 들어가며

---

![대충 리메이크를 결심하던 때의 나](/images/posts/blog-remaking-review/fire.jpeg)

드디어 [미루고 미루던 블로그 리메이킹](https://www.acidlog.today/post/remake-blog-planning)이 마무리 되었습니다. 고쳐 쓰고 싶을땐 의욕이 넘치다 못해 폭발해버렸는데 그것도 잠시고 텐션이 팍 죽는게 개선할 부분이 많아 막막했습니다. 그러다 사내 동료분이 자체 블로그를 제작하신다는 말에 숨겨져 있던 의욕들이 스물스물 올라와 이렇게 2주 동안 거사를 치르게 되었습니다.

중간 중간에 그만두고 싶다는 생각도 절실했고 괜히 시작했다는 생각도 드문드문 들었지만 어찌저찌 해내고 나니 속이 시원하네요. 자 그럼 바로 리메이크 후기 시작하겠습니다.

# 왜 리메이크?

---

![아 그냥 별로라고. 그렇다면 그런줄 아세요](/images/posts/blog-remaking-review/nope.jpeg)

원래 어제 만들었던 코드가 오늘 다시 보면 누가 이렇게 싸질러놨나 싶을 정도로 별로인게 어제의 나인데요, 블로그 디자인도 마찬가지인 것 같습니다. 처음 만들땐 여기저기 기웃거리며 이 디자인도 마음에 들고, 저 디자인도 마음에 들어 몽땅 갖다 붙여놓고 다시 돌아보니 어느새 **굉장히 조잡한 형태가 되버렸다** 싶었습니다. 그러다 [토스 피드](https://blog.toss.im/)의 디자인을 보게 되었고 순간 마음에 쏙 들어버린 저는 언젠간 내 블로그도 저렇게 바꾸어 놓으리라고 생각한지 어언 약 4개월이 되어버린 것이었습니다.

그리고 **타입스크립트가 필요했던 점**도 한 부분 차지하는 것 같습니다. 이게 막상 타입스크립트를 쓰다보면 자바스크립트에 그냥 타입 추가해서 몇 가지 얹는 것 뿐이라고만 생각이 들었는데, 다시 자바스크립트로 넘어오니 타입스크립트로 미연에 방지할 수 있었던 오류들이 터지면서 당황의 연속이었습니다. 그러다 보니 타입스크립트 마이그레이션도 진행하면서, 저는 블로그 리메이킹을 시작했습니다.

# 그래서 뭐했냐고 물으신다면

---

![히히 ! 신난다 ! 리메이크 !](/images/posts/blog-remaking-review/v_reverse.jpeg)

우선 시작은 **타입스크립트 마이그레이션**부터 시작했습니다. 그냥 냅다 타입스크립트 설치하고 `tsconfig.json` 파일 추가하니 어느새 타입스크립트 마이그레이션은 끝이 난 것 같았습니다(?).

아무튼 그런줄 알고 깃허브에 냅다 `push` 하고 나니 자동으로 배포가 되어야 할 블로그가 정상적으로 자동 배포되지 않았습니다. 그래서 [Vercel 웹페이지](https://vercel.com/)에 접속해 무슨 일인지 알아보니 아래와 같은 빌드 에러가 뜨는게 아닙니까.

![무슨 억하심정으로 제게 이러시는겁니까 Vercel boy...](/images/posts/blog-remaking-review/type_error.png)

제가 타입스크립트 마이그레이션에 미숙해서 당연히 빌드 에러가 발생할거라고 생각했지만 이렇게 금방 발생하니 괜히 애꿎은 Vercel만 미워집니다. 여튼 해당 에러는 **리액트 타입과 관련된 문제**로 판명났습니다.

![방심하지 마라 휴먼 ! 정답은 하이라이팅 하지 않겠다 !](/images/posts/blog-remaking-review/type_error_solve.png)

> 여러분들은 타입스크립트 마이그레이션 할 때 **리액트 타입**을 까먹지 마세요... **사전 빌드 체크**도요...

빌드 에러를 해결하고 난 뒤 정상적으로 자동 배포가 진행되는 것을 확인한 후, 각 페이지 작업을 시작했습니다. 우선 메인 페이지는 토스 피드와 마찬가지로 **3분할로 영역을 분리**하여 스크롤을 각 영역에서 가능하도록 만들었습니다.

![주인장의 오마카세까지 즐겨보세요](/images/posts/blog-remaking-review/main_page.mp4)

메인 페이지는 왼쪽부터 **카테고리 별 포스팅, 전체 포스팅, 추천 포스팅**으로 구성되어있습니다. **카테고리 별 포스팅**은 기존에 사용하던 **`tags` 데이터**를 활용하여 **동일한 태그를 갖는 포스팅들을 필터링**하여 보여줍니다.

```ts
/*
  카테고리 분류를 위한 데이터 목록
  tag 필드의 문자열과 일치하는 태그를 갖는 포스팅이 필터링되며,
  title, thumbnail, infoBackground와 필터링 된 포스팅 갯수를 활용
*/

// postConfig.ts
export const CATEGORIES = {
  svelte: {
    tag: "svelte",
    title: "스벨트 시리즈",
    description:
      "아직도 스벨트 맛을 못 봤다구요? \n리액트와는 다른 매력이 있는 스벨트를 공식 홈페이지 튜토리얼과 함께 진행해봅시다!",
    thumbnail: "svelte_logo.png",
    infoBackground: "orange",
  },
  "redux-toolkit": {
    tag: "redux-toolkit",
    title: "리덕스 툴킷 시리즈",
    description: "리덕스 툴킷 공식 홈페이지를 통해 기초를 다집니다.",
    thumbnail: "redux_logo.png",
    infoBackground: "purple",
  },
};

// post.ts
export const getCategoryPosts = (posts: Post[]): Category[] => {
  return Object.values(CATEGORIES).map(
    ({ tag, infoBackground, ...restProps }) => ({
      tag: tag,
      infoBackground: infoBackground as Category["infoBackground"],
      postIdList: posts
        .filter(({ tags }) => tags.includes(tag))
        .map((post) => post.id),
      ...restProps,
    })
  );
};
```

마찬가지로 **추천 포스팅** 목록도 기존 `config` 파일에 작성된 `RECOMMEND_POST_LIST` 를 기반으로 필터링하여 보여줍니다.

```ts
// postConfig.ts
export const RECOMMEND_POST_LIST = [
  "optimize-rerendering",
  "yarn-berry",
  "tree-shaking",
  "storybook-docs",
];

// post.ts
export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id));
};
```

그렇게 메인 페이지를 얼추 마무리하고 나서 새롭게 추가되는 **카테고리 상세 페이지** 작업을 시작했습니다. 카테고리 상세 페이지는 기존 포스팅 상세 페이지와 유사하게 구성했으며, `categoryId` 를 통해 필터링 된 포스팅 목록을 받아오도록 구성하였습니다.

![카테고리에 해당하는 포스팅으로 바로 접근 가능](/images/posts/blog-remaking-review/category_detail.mp4)

이후 [Sanity](https://www.sanity.io/)도 붙여 볼까 싶어 이런 저런 수정을 거치다, 새로운 빌드 에러를 마주하게됩니다.

![대충 `pages` 디렉토리 내에 부적절한 파일이 있다는 뜻](/images/posts/blog-remaking-review/prerenderer_error.png)

에러의 원인을 알고 나서 천천히 점진적 수정을 거쳤던 **`pages` 내 미작업 영역을 전부 지워버리고 작업을 재개**했습니다.

그리고 이어서 진행한 작업은 **포스팅 상세 페이지** 작업입니다. 사실 포스팅 상세 페이지를 제작할 때 기존에 사용하던 마크다운 렌더링 방식이 마음에 들지 않아 **새로운 마크다운 렌더러**에 대한 리서치를 진행했습니다. 결론적으로 리액트에서 활용하는 마크다운 렌더러 라이브러리 중 사용량이 가장 높은 [`react-markdown`](https://openbase.com/js/react-markdown)을 선택했습니다.

기존엔 리액트 내에서 지원하는 **[`dangerouslysetinnerhtml`](https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) 속성**을 통해 브라우저 DOM에서 `innerHTML` 을 사용하여 이를 반영했습니다. 이렇게 렌더링을 진행하면서 `styled-component` 를 활용하려면 제 지식 선에선 **네스팅(Nesting)을 통해서 스타일링**하는 방식을 채택해야만 했습니다.

```ts
/*
    Contents 컴포넌트의 dangerouslysetinnerhtml prop에
    HTML을 할당하고 아래와 같이 네스팅을 통해 스타일링
*/

const Contents = styled.div`
  h1 {
    padding: 3rem 0 0;
    font-size: 2.4rem;
    font-weight: bold;
    code {
      font-size: inherit;
    }
  }
  h2 {
    padding: 2rem 0 0;
    font-size: 2rem;
    font-weight: bold;
    code {
      font-size: inherit;
    }
  }

...

`;
```

이렇게 되니 주기적으로 스타일링 수정을 진행할 때마다 **낮은 가독성** 때문에 어려움이 있었고, **코드 블럭 하이라이팅**에 대한 방안도 찾기 힘들었습니다. 그런 문제점을 `react-markdown` 을 통해 해결하고자 했습니다.

```tsx
const postSyntaxStyler = {
  code({ node, inline, className, children, ...props }) { // 코드 블럭 하이라이팅
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? ( // 일반 인라인 코드 블럭과 분기
      <ReactSyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  hr: ({ className, ...props }) => (  // 스타일링을 진행할 태그를 필드명으로 지정
    <HeadingRow className={className} {...props} /> // 렌더링하고자 하는 컴포넌트를 작성
  ),
  h1: ({ className, children, ...props }) => (
    <HeadingFirst className={className} {...props}>
      {children}
    </HeadingFirst>
  ),

...

}
```

해당 코드는 라이브러리 내 커스터마이징 옵션을 작성한 것입니다. 앞의 네스팅 방식과 다르게 **`key-value` 형식**의 직관적인 작성 방식을 채택합니다. 또한 **컴포넌트를 렌더링**하는 방식으로 **자유롭게 DOM 렌더링 방식을 선택하여 활용**할 수 있습니다. 이를 통해 다음과 같이 `img` 태그 렌더링의 경우 `alt` 속성 내용을 그대로 렌더링 하는 것도 가능하게 되었습니다.

```html
<!-- 아래 코드와 같은 img 태그는 다음과 같이 렌더링된다. -->

<img
  class="css-1yjsz30"
  src="/images/posts/blog-remaking-review/v_reverse.jpeg"
  alt="히히 ! 신난다 ! 리메이크 !"
/>
```

![개인적으로 진짜 구현하고 싶었던 부분](/images/posts/blog-remaking-review/awesome.png)

그렇게 신나게 포스팅 상세 페이지 영역을 작업하고 나니, 나름 만족스러운 결과물을 얻을 수 있었습니다. 참고로 코드 하이라이팅에 대한 내용은 [`react-markdown` 깃허브 레포지토리 리드미](https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight)를 참고했습니다.

해당 페이지 마무리를 하고 새로고침을 하며 모든 요소들이 잘 렌더링 되는지 테스트해보고 있었는데, 새로고침을 하니 순간 **`<img>` 태그에 이어지는 `<p>` 태그가 제대로 스타일링 되지 않은 상태로 렌더링되는 것**을 확인할 수 있었습니다. 앞전에도 스타일드 컴포넌트를 활용하면서 SSR 관련된 이슈가 있었는데 해당 문제와 관련된 것 같아 싶어 Next.js의 [**Dynamic Import**](https://nextjs.org/docs/advanced-features/dynamic-import)를 활용하여 **SSR 옵션을 해제**하는 것으로 당장은 해결할 수 있었습니다.

```tsx
const DynamicPostMain = dynamic(
  () => import("../../container/pages/PostMain/PostMain"),
  {
    ssr: false,
  }
);
```

그렇지만 SSR을 끄는 것이 딱히 좋은 방법이라고 생각이 들지는 않아 추후에 재수정을 진행할 예정입니다.

마지막으로 **짧은 기록**들을 담는 별도 페이지를 추가했습니다. 해당 부분은 [정원희님의 개인 블로그](https://wonny.space/)를 참고하다 추가하게 되었습니다. 사실 기록을 남길 때 잘 정리되지 않은 말들을 정리할 시간이 없다는 이유로 무작정 팽개쳐두곤 해서 다시 기억하려고 하면 아쉬워지는 경우가 많았습니다. 그런 부분을 수시로 기록하고자 해당 페이지를 제작하게 되었고, 해당 페이지는 다른 페이지와 달리 **마크다운 작성 내용을 바로 렌더링해야 하는 부분**에서 차이가 있었습니다.

그래서 루트 경로의 `logs` 디렉토리 내 파일들을 매핑하며 파일 내 마크다운 내용을 렌더링하고자 했는데 마크다운 내용이 정상적으로 렌더링되지 않고 **프로미스 객체를 반환**하고 있었습니다. 아무래도 `map` 메서드 내에서 비동기 구문이 제대로 동작하지 않는 것 같아 이를 찾아보니 다음과 같이 해결할 수 있었습니다.

```ts
const allLogsData = await Promise.all(
  fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(logRoute, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(remarkHtml as any)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  })
);
```

위와 같이 [`Promise.all`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) 메서드를 통해 순회 가능한 객체(`iterable` 한 객체)에 전체 프로미스가 이행된 이후에 이를 반환하도록 하였습니다. `Promise.all` 메서드로 감싸진 매핑 로직은 **이제 완전히 프로미스가 이행된 상태 혹은 에러를 반환한 상태**로만 화면에 반영됩니다. 그렇게 짧은 기록 페이지는 완성되었습니다.

![매일은 아니어도 필요할 때마다 기록합시다](/images/posts/blog-remaking-review/short_log.png)

# 마무리

---

![아주 개운해서 미쳐버릴 것 같아요](/images/posts/blog-remaking-review/heaven.png)

미루고 미루던 블로그 리메이킹이었지만 막상 해놓고 나니 보기 참 좋다는 생각이 볼 때마다 듭니다. 이전에 해야지 해야지 하다가 결국 계속 미루게 되었는데, 역시 주변 사람들과 함께 시작하는 것은 큰 추진력을 준다는 것을 다시 한 번 깨닫게 되었습니다.

혹시 자체 블로그를 새롭게 만들고 싶다거나 블로그 디자인이 실증나서 고치고 싶다라는 생각이 든다면 **바로 만들거나 뜯어 고치는 것을 해봅시다.** 그렇지 않으면 볼 때마다 신경쓰이는 것 때문에 쓸데없는 핑계만 늘어날 수도 있으니깐요.
