---
title: Next.js 첫 걸음 떼어보기
date: "2021-12-18T02:06:03.284Z"
description: "입사 전에 Next.js에 대한 전반적인 내용을 톺아보며 기본기를 다져보자."
tags: ["Next.js", "TIL", "Basics"]
---

# 개념 알아보기

---

**Next.js**는 Node.js 기반으로 구축된 오픈 소스 개발 프레임워크로, 공식 문서에서는 짧게 프로덕션을 위한 리액트 프레임워크라고 정의되어있다. Next.js와 관련된 개념 중 <strong>SSR(Server-Side Rendering)</strong>에 대한 내용이 자주 나오는데, 이에 대한 내용을 간단히 알아보자.

</br>

## SSR(Server-Side Rendering)

---

**서버 측 렌더링**은 말 그대로 **서버 측에서 렌더링을 진행하는 것**이다. 렌더링은 간단하게 말해 서버에서 받은 내용을 브라우저 화면에 반영하는 것이라고 할 수 있는데 SSR의 경우 이를 서버 측에서 진행하는 것이고 반대 의미를 갖는 <strong>CSR(Client-Side Rendering)</strong>은 클라이언트 측에서 진행하는 것을 의미한다.

리액트에 SSR을 적용하면 <strong>검색엔진 최적화(SEO)</strong>와 초기 렌더링 성능 개선을 이점으로 가질 수 있다.

</br>

# 공식 문서 따라가기

---

공식 문서에서 제공하는 가이드라인을 따라가면서 Next.js 프로젝트를 만들어 보자. 프로젝트의 최종 결과물은 간단한 블로그 앱이다.

## 프로젝트 생성

---

우선 다음의 명령어를 입력하여 새로운 프로젝트를 생성한다.

```sh
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

생성이 완료된 후, 다음 명령어를 통해 해당 폴더로 VS Code를 실행시키고 VS Code 내장 터미널에서 `npm run dev` 명령어를 입력하면 다음과 같은 화면이 나타난다.

```sh
code ./nextjs-blog

npm run dev
```

<img width="100%" alt="first-render" src="https://user-images.githubusercontent.com/87939521/146668038-1b119b34-2a61-4bdd-a7d0-1bec869cf681.png" />

</br>

다음과 같은 화면이 렌더링 되면 정상으로 작동하는 것이다.

간단히 헤더 텍스트를 수정하고 저장하면 새로고침을 진행하지 않아도 편집 사항에 대해 즉각적인 반영이 이루어진다. 해당 기능은 Next.js의 **[Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh)** 기능을 통해 가능하다고 한다.

</br>

## 라우팅

---

지금 생성한 Next.js 앱은 페이지가 하나인 SPA 형식이기 때문에 여러 페이지를 추가하기 위해서는 **라우팅**에 대한 내용을 알아야한다.

Next.js에서 페이지 구조는 `pages` 디렉토리에 있는 폴더 구조를 그대로 따른다.

- `pages/index.js` 는 `/` 에 대응한다.
- `pages/posts/first-post.js` 는 `/posts/first-post` 에 대응한다.

이를 활용하여 `pages` 폴더를 생성하고 그 안에 `first-post` 를 생성하여 다음과 같은 코드를 작성하였다.

```jsx
import React from "react";

const firstPost = (props) => {
  return <div>First Post</div>;
};

export default firstPost;
```

이후 해당 루트로 진입하면 다음과 같은 화면이 반영되며 라우팅이 정상적으로 작동하는 것을 확인할 수 있다.

<img width="100%" alt="routing-test" src="https://user-images.githubusercontent.com/87939521/146669033-60541bf1-257a-4ace-8e68-aca0ef46cb01.png" />

</br>

### 링크 컴포넌트

---

페이지 이동을 위해 Next.js에서도 **링크 컴포넌트**를 사용할 수 있다. 우선 `Link` 컴포넌트를 `import` 구문을 통해 가져온다.

```javascript
import Link from "next/link";
```

이후에 리액트 라우터를 사용했던 것처럼 사용하는데, `to` 대신에 `href` 라는 `prop` 에 경로를 할당한다. 그렇다면 기존 `title` 영역을 수정하여 다음과 같은 코드로 바꿔준다.

```jsx
<h1 className="title">
  <Link href="/posts/first-post">Go to First Post</Link>
</h1>
```

또한, `first-post` 페이지에서 다시 이동을 진행할 코드도 작성해준다.

```jsx
<>
  <div>First Post</div>
  <Link href="/">Go to Main</Link>
</>
```

그렇다면 다음과 같이 정상 작동하는 것을 확인할 수 있다.

<img src="https://user-images.githubusercontent.com/87939521/146669980-e0762ce5-70e1-4ae4-af45-7fe56c873461.gif" />

</br>

Next.js에서 `Link` 컴포넌트는 <strong>client-side navigation</strong>을 가능하게 한다. client-side navigation에 대해 이해하고자 공식 문서와 블로그를 참고하여 이해한 내용은 다음과 같다.

- Next.js는 <strong>코드 스플리팅(code splitting)</strong>을 진행하여 각 페이지에서 필요한 내용만 로드하기 때문에, 홈페이지가 렌더링될 때 다른 페이지의 코드를 요청하지 않는다.
  - 그렇기에, 홈페이지를 빠르게 로드하고, 특정 페이지에 오류가 발생해도 나머지 애플리케이션은 정상 작동한다.
- 뷰포트에 `Link` 컴포넌트가 존재한다면, 연결된 페이지에 대한 데이터를 prefetching 한다.
  - prefetching은 연결된 페이지의 **js 파일**을 미리 불러오는 것을 말한다.
  - prefetching에 대한 여부를 `prefetch: false` 를 통해 비활성화 할 수도 있다.

결론적으로, 이러한 기능을 통해 애플리케이션을 자동으로 최적화한다는 것이 결론이며 별도의 라우팅 라이브러리를 필요로 하지 않는다.

</br>

## 정적 데이터와 메타데이터 및 CSS

---

Next.js에서 정적 데이터는 `public` 디렉토리를 통해 접근 가능하다. 그렇게 이미지를 추가하기 위해 `public` 디렉토리에 `images` 디렉토리를 만들고, 그 안에 `profile.jpg` 이미지를 저장했다고 가정하자.

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

다음과 같은 코드를 통해 이미지 파일을 추가할 수 있다. 그러나 이 경우 수동적으로 처리해야 할 사항이 몇 가지 있다.

- 다양한 화면 크기에서 이미지 반응 여부 확인
- 타사 도구 및 라이브러리로 이미지 최적화
- 뷰포트에 들어갈 때만 이미지 로드

이러한 부분을 Next.js에서는 `Image` 컴포넌트를 통해 해결할 수 있다.

</br>

### `Image` 컴포넌트

---

`Image` 컴포넌트를 사용하면 이미지 최적화를 **Ondemand**로 진행한다. 해당 방식은 **이미지 로딩 시 필요할 때만 해상도 또는 렌더링하여 문제를 해결**하는 것이다. 그렇기에 많은 이미지를 전송하여도 빌드 시간이 증가하지 않는다. `Image` 컴포넌트는 다음과 같이 사용할 수 있다.

```jsx
import Image from "next/image";

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);
```

</br>

## 메타데이터 변경

---

Next.js 앱에서 메타데이터를 수정하는 것은 `pages` 디렉토리의 `index.js` 에서 직접 수정할 수 있다. `index.js` 에는 `Head` 컴포넌트가 존재하는데, 이는 HTML 문서의 `head` 부분을 수정할 수있다.

```jsx
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```

마찬가지로, `first-post.js` 의 경우에도 `Head` 컴포넌트를 다음과 같이 추가할 수 있다.

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

</br>

## CSS 스타일링

---

Next.js에는 [styled-jsx](https://github.com/vercel/styled-jsx)라는 라이브러리가 내장되어 있기에 이를 사용해도 되지만 [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)와 [Emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion) 같은 다른 CSS-in-JS 라이브러리를 활용할 수도 있다.

본인은 **styled-component**를 활용할 예정이라 [CSS-in-CSS](https://nextjs.org/learn/basics/assets-metadata-css/layout-component)을 활용할 경우 다음 링크를 참조하자.

</br>

## 사전 렌더링 및 데이터 요청

---

Next.js는 모든 페이지를 <strong>사전 렌더링(pre-rendering)</strong>을 진행하는데, 이러한 사전 렌더링은 **더 나은 성능**과 **SEO**를 적용할 수 있는 장점이 있다. 여기서 말하는 사전 렌더링에 대해 간단히 알아보자.

</br>

### 사전 렌더링

---

우선 **사전 렌더링**은 각 **페이지들을 사전에 HTML 문서로 생성하여 저장해놓는 것**을 말한다. 이를 CSR과 비교하여 다음의 그림으로 설명할 수 있다.

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png" />
<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png" />

</br>

기존 리액트의 CSR 방식은 번들링 된 자바스크립트를 클라이언트 단에서 렌더링을 담당하여 진행하기에 애플리케이션은 초기에 아무 것도 렌더링 하지 않는다. 하지만 Next.js의 경우 기존에 사전 렌더링을 진행하여 HTML을 미리 생성해놓고, 상호 작용을 위한 부분이 존재한다면 자바스크립트를 별도로 로드한다. 그리고 Next.js에는 **Static-Generation**과 **Server-Side Rendering**의 두 가지 사전 렌더링 형식이 있다.

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/static-generation.png" />

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png" />

</br>

- Static-Generation(권장): HTML은 **빌드 시**에 생성되고 요청마다 재사용된다.
- Server-Side Rendering: HTML은 **각 요청**에 대해 생성된다.

Next.js를 활용하면 각 페이지마다 <strong>렌더링 방식을 선택할 수 있다.</strong> 그리고 Static-Generation 방식이 모든 요청에 대해 서버가 페이지를 렌더링 하는 것보다 빠르기 때문에 이를 권장한다. 공식 문서에는 사용 방식 구분하기 위해 <strong>"사용자 요청에 앞서 해당 페이지를 미리 렌더링 할 수 있는가?"</strong>와 같은 자문을 해보라고 나와있다.

- [사전 렌더링에 대한 자세한 내용](https://nextjs.org/docs/basic-features/pages#pre-rendering)

추가적으로 사전 렌더링을 확인하는 것은 크롬 개발자 도구를 통해 확인할 수 있다.

- 개발자 도구 열기
- `cmd` + `shift` + `p` 를 통해 명령어 입력 모드 열기
- `Disable Javascript` 선택

해당 과정 이후에, 어플리케이션을 실행하면 해당 어플리케이션이 자바스크립트 없이 렌더링 되는 지를 확인할 수 있다.

이어서 데이터 유무에 따른 Static-Generation에 대해 알아보자.

</br>

### Static-Generation(정적 생성)

---

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/static-generation-without-data.png" />
<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png" />

</br>

**외부 데이터가 필요 없는 경우**엔 앱이 **빌드될 때** 자동으로 **정적 생성**을 한다. 그러나 외부 데이터 없이 HTML 렌더링을 진행할 수 없는 경우가 있는데, 이때 Next.js는 **데이터를 사용한 정적 생성**을 지원한다.

이를 위해 `async` 와 `getStaticProps` 를 다음과 같이 사용한다.

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

해당 코드를 간단히 해석해보면 `async` 키워드와 작성된 `getStaticProps` 함수는 내부에서 비동기 데이터 요청을 진행하고, 해당 값을 `key` 값이 `props` 인 객체로 반환하여 페이지 컴포넌트의 `props` 로 전달한다. 위 코드의 경우에는 `Home` 컴포넌트의 `props` 로 전달된다.

이어서 해당 코드를 활용한 [실습](https://nextjs.org/learn/basics/data-fetching/blog-data)을 진행해본다.

우선 `posts` 라는 새로운 최상위 디렉토리를 만들고 안에 `pre-rendering.md` 와 `ssg-ssr.md` 파일을 생성한다. 자세한 내용은 위 실습 링크를 참고한다.

이후 해당 마크다운 파일 데이터를 분석할 라이브러리로 [gray-matter](https://github.com/jonschlinkert/gray-matter)를 활용한다.

```sh
$ npm install --save gray-matter
```

해당 명령어를 통해 설치한 뒤 사용할 수 있고, 다음과 같이 마크다운 파일을 변환한다.

```markdown
---
title: Hello
slug: home
---

<h1>Hello world!</h1>
```

```javascript
{
  content: '<h1>Hello world!</h1>',
  data: {
    title: 'Hello',
    slug: 'home'
  }
}
```

이제 해당 마크다운 데이터를 `getStaticProps()` 를 통해 불러와 `title` , `date` , 파일 이름에 대한 내용을 가져오고 데이터를 나열하면 된다. 그러기 위해 파일 시스템에서 데이터를 가져오기 위한 라이브러리를 생성한다.

</br>

```javascript
import fs from "fs"; // 자바스크립트의 파일 시스템 라이브러리
import path from "path"; // 자바스크립트의 디렉토리 및 파일 경로 작업 라이브러리
import matter from "gray-matter"; // 마크다운 파일 리더 라이브러리

// posts 디렉토리 경로 찾기
const postsDirectory = path.join(process.cwd(), "posts");
// path.join(): 여러 경로를 하나의 경로로 결합하는 메서드
// process.cwd(): 현재 작업 디렉토리 반환(node 명령을 호출한 디렉토리).
// 위 경우 현재_작업_디렉토리/posts 로 반환

export function getSortedPostsData() {
  // /posts 디렉토리의 파일 이름 읽어오기
  const fileNames = fs.readdirSync(postsDirectory);
  // readdirSync(dirName, [option]): dirName에 [option]을 적용하여 디렉토리 내 모든 파일 이름 또는 배열을 반환

  // 마크다운 파일 데이터 일괄 수정 by map method
  const allPostsData = fileNames.map((fileName) => {
    // id 값으로 사용할 파일 이름에서 ".md" 제거
    const id = fileName.replace(/\.md$/, "");
    // 정규 표현식 해석: 문자열의 끝 부분($)에 대응하는 ".md" 부분

    // 마크다운 파일 문자열로 가져오기
    const fullPath = path.join(postsDirectory, fileName);
    // 해당 파일 경로 만들기 = 디렉토리_경로/파일_이름

    const fileContents = fs.readFileSync(fullPath, "utf8");
    // readFileSync(fileName, [option]): fileName에 [option]을 적용하여 문자열 반환

    // 마크다운 데이터(문자열) gray-matter 라이브러리로 해석
    const matterResult = matter(fileContents);

    // 데이터 결합
    return {
      id,
      ...matterResult.data,
    };
  });
  // 날짜 기준으로 정렬
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
```

- 추가 학습 내용: [`process.cwd()` 와 `__dirname` 의 차이점](http://daplus.net/node-js-process-cwd-%EC%99%80-__dirname%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9E%85%EB%8B%88%EA%B9%8C/)
  - 간단 정리 ❕
    - `process` 는 `node` 전역 객체이며 `cwd()` 는 노드가 실행 중인 위치를 반환한다.
    - `__dirname` 은 현재 스크립트의 디렉토리 이름이다.

</br>

코드 흐름에 따른 전체적인 프로세스는 다음과 같다.

- `posts` 디렉토리의 경로를 탐색하여 **디렉토리 내 파일 이름 리스트 받아오기**
- 해당 파일 리스트에 `map` 메서드 사용하여 **각 파일의 이름(`id`), 마크다운 데이터(`matterResult`) 추출 및 반환**
- 마지막으로 **날짜 순으로 정렬**하여 리스트 반환

그리고 다시 `index.js` 파일로 넘어가 `getStaticProps()` 구문을 작성한다.

```jsx
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
```

이후 해당 데이터를 `console.log()` 로 확인하면 다음과 같이 게시물에 대한 정보가 담긴 배열을 반환하는 것을 확인할 수 있다.

<img width="100%" src="https://user-images.githubusercontent.com/87939521/147207056-6b4f562e-0383-46ec-acdd-3d8c4e1e1f0d.png" />

</br>

이렇게 반환된 리스트를 활용하여 뷰포트에 게시물 목록을 렌더링 할 수 있다.

그리고 앞에서 언급했듯이 요청에 대응하여 데이터를 가져오는 경우 정적 생성은 좋은 방안이 아니기에 **서버 측 렌더링**을 시도하는 것이 좋을 수 있다. 그렇다면 서버 측 렌더링을 시도하는 방법에 대해 알아보자.

</br>

### Server-Side Rendering(서버 측 렌더링)

---

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/server-side-rendering-with-data.png" />

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

서버 측 렌더링의 경우 `getStaticProps` 대신 **`getServerSideProps`** 를 활용한다. `getServerSideProps` 의 경우 요청에 대응하여 호출되기 때문에, 요청별 매개변수(`context`)를 갖는다.

또한, 앞에서도 언급했지만 **데이터 요청이 존재**하고 이에 대해 **페이지를 미리 렌더링해야하는 경우**에만 `getServerSideProps` 를 사용하는 것이 권장된다.

- 이에 대한 이유를 번역하자면, 서버가 모든 요청에 대해 결과를 계산하고, 추가 구성 없이 CDN에서 결과를 캐시할 수 없기 때문에 TTFB(Time to First byte)는 `getStaticProps` 보다 느리다고 한다.

</br>

### Client-Side Rendering(클라이언트 측 렌더링)

---

사전 렌더링이 필요 없는 경우, **클라이언트 측 렌더링**을 고려해 볼 수도 있다. 이때 정적 생성과 클라이언트 측 데이터 요청이 함께 사용된다.

<img width="100%" src="https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png" />

</br>

- **외부 데이터가 필요 없는 부분**을 정적 생성(사전 렌더링)한다.
- 페이지가 로드되면 **클라이언트 측**에서 **자바스크립트**를 통해 외부 데이터를 가져와 나머지 부분을 채운다.

해당 방식은 대시보드와 같은 페이지에 유리한데 그 이유는 다음과 같다.

- 사용자 별로 나타나는 비공개 페이지(Private page)
- SEO 적용이 필요 없는 페이지
- 사전 렌더링이 필요 없는 페이지

</br>

### SWR

---

[**SWR**](https://swr.vercel.app/ko)은 Next.js 팀에서 데이터 요청을 위해 만든 **React Hook**이다. 공식 문서에 따르면, 해당 기능은 **클라이언트 측 렌더링**의 경우에 권장한다고 한다.

```jsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

SWR Hook은 위와 같이 활용할 수 있다.

</br>

## 동적 라우팅

---

이제 블로그 내 개별 페이지를 만들기 위한 **동적 라우팅**에 대한 내용을 알아보자. 페이지 URL을 통해 블로그 내 각 게시물들의 데이터를 불러올 것이다.

<img width="100%" src="https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png" />

</br>

블로그에서 각 포스팅에 대한 페이지를 렌더링한다면 다음과 같이 구현할 수 있다.

- 각 게시물의 경로는 `/posts/<id>` 가 되고 `<id>` 는 최상위 `post` 디렉토리 내 마크다운 파일 이름이다.

이를 위해 우리는 이전에 배웠던 `getStaticProps` 와 새롭게 배울 `getStaticPaths` 를 활용할 것이다. 우선 파일 설정을 진행한다.

- 기존 `pages/posts` 경로 내부에 `[id].js` 파일을 생성하고 `first-post.js` 를 제거한다.

`[]` 형태로 파일명을 작성하여 **동적 페이지** 형태로 지정할 수 있다. 그렇게 파일 설정을 진행했으면, `lib/posts.js` 에 새로운 함수를 추가한다.

```javascript
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
```

우선 첫 번째 함수인 `getAllPostIds` 는 `getStaticPaths` 를 위한 함수다. 동적 라우팅을 사용하면서 `getStaticProps` 를 사용하는 경우, 빌드 타임에 정적으로 렌더링 할 경로의 리스트를 명시해주어야 하는데 이를 위한 함수라고 할 수 있다.

그렇다면 두 번째 함수인 `getPostData` 는 `getStaticProps` 를 위한 함수라고 유추할 수 있다. 경로를 통해 해당하는 게시물의 데이터를 갖고 오는 함수이다.

이렇게 `lib/posts.js` 파일의 작업이 마무리되었다면 `[id].js` 파일을 수정해보도록 하자. 해당 파일의 기존 내용에 다음 코드를 추가한다.

```javascript
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

우선 `lib/posts.js` 로부터 앞에서 작성한 함수를 불러오고, 각각 두 가지 함수를 사용하여 값을 변수에 저장한다. `getStaticPaths` 내에서 `getAllPostIds` 를 통해 모든 경로와 `fallback` 값을 반환한다.

- `fallback`: 간단히 말하자면 `path` 속성에서 반환된 페이지만 표시하는 지의 여부이다.

그리고 `getStaticProps` 매개 변수의 프로퍼티로 `params` 를 받아 `params.id` 를 활용하여 해당하는 포스팅의 데이터를 반환한다.

- [`params`](https://nextjs.org/docs/basic-features/data-fetching): 동적 라우팅을 사용하는 페이지 대해 경로 매개 변수를 포함한다고 나타나있다.

마지막으로 화면에 반영하기 위해 `Post` 컴포넌트를 수정해준다.

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```

이렇게 진행하면 동적 라우팅 성공적으로 생성될 것이다. 위 과정을 **다이어그램**으로 표현한 이미지를 보면서 다시 한 번 되짚자.

<img width="100%" src="https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png" />

</br>

### 마크다운 렌더링

---

성공적으로 동적 라우팅을 생성하였으면, 이제 완벽한 마무리를 위해 **마크다운 렌더링**을 해결해보도록 한다. 이를 위해 다음 라이브러리를 설치한다.

```sh
npm install remark remark-html
```

그런 다음 `lib/post.js` 에서 위 라이브러리를 호출한다.

```javascript
import { remark } from "remark";
import html from "remark-html";
```

이어서 해당 파일의 `getPostData()` 함수를 수정한다.

```jsx
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

야기서 중요한 부분은 `remark()` 함수에 **`await`** 키워드가 들어가기 위해 `async` 키워드가 `getPostData()` 함수에 추가되었다는 점이다.

이것은 우리가 `[id].js` 의 `getPostData()` 함수 호출에서 `await` 를 추가해야할 것을 의미한다. 그렇기에 `[id].js` 파일을 다음과 같이 수정해준다.

```jsx
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  // ...
}
```

그리고 마지막으로 `Post` 컴포넌트를 수정함으로 이를 마무리한다.

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
```

</br>

### 페이지 다듬기

---

앞에서 배운 내용을 활용하여 페이지를 다듬을건데, 우선 게시물 이름으로 **페이지 타이틀**을 변경해보자. 페이지 타이틀을 변경하려면 `Head` 컴포넌트를 활용하여 `<title>` 태그의 내용을 변경해야 한다.

그렇기에 `[id].js` 파일의 내용을 다음과 같이 수정할 수 있다.

```jsx
// Add this import
import Head from "next/head";

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

또한, 날짜 데이터를 받기 때문에 **날짜 형식**을 지정해줄 수 있다. 이를 위해 공식 문서에서는 다음 라이브러리를 활용하였다.

```sh
npm install date-fns
```

- `date-fns` 자바스크립트에서 날짜 데이터를 조작하기 위한 기능들을 제공하는 라이브러리다.

그렇게 설치가 끝났으면 `components/date.js` 파일을 생성하고 `Date` 컴포넌트를 다음과 같이 생성한다.

```jsx
import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
f;
```

컴포넌트를 생성하고 `[id].js` 파일에 해당 컴포넌트를 호출하여 추가하면 마무리된다.

```jsx
// Add this import
import Date from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

위 진행 과정을 마찬가지로 `index.js` 페이지도 적용한다면 어느 정도 괜찮은 블로그의 구색을 갖춘다.

</br>

# 마무리

---

여기까지 배포 이전의 모든 작업을 공식 문서 기초 학습 과정을 따라 진행해보았다. 간단히 후기를 말하자면 사실 공식 문서는 많은 정보 전달을 하기 때문에 다소 불친절할 수도 있다는 생각을 많이 했던 것 같은데, 해당 기초 교육 과정은 적당히 흥미를 잃지 않을 만큼의 난이도로 Next.js 입문에 아주 효과적이었다고 생각했다.

그리고 해당 과정을 진행하면서, 기존 Gatsby를 활용하여 생성한 블로그를 다시금 Next.js로 변경하고자는 생각이 들었다. 사실 당장은 Gatsby와 Next.js의 효용성 차이를 이해하기 어렵지만, 당장에 Next.js에 익숙해지기 위해서 나름 효과적일 수 있겠다는 생각이 들었다.

그래서 아마 다음 포스팅은 새롭게 빌드한 Next.js 블로그를 통해 보여줄 것이고 구상 중인 추가적인 기능 또한 구현할 예정이다.

</br>

🔖 **참고 링크**

- [Next.js 공식 문서 : 학습하기](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)
- [[FE] SSR(Server-Side-Rendering) 그리고 SSG(Static-Site-Generation) (feat. NEXT를 중심으로)](https://velog.io/@longroadhome/FE-SSRServer-Side-Rendering-%EA%B7%B8%EB%A6%AC%EA%B3%A0-SSGStatic-Site-Generation-feat.-NEXT%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C)
