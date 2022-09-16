---
title: 스터디를 공동 문서화와 함께! 도큐사우루스
date: "2022-03-27"
description: "깃허브를 통해 공동으로 사용할 수 있는 도큐사우루스 프로젝트를 만들어봅시다."
tags: ["Docusaurus", "Docs", "Study", "Vercel", "blog"]
thumbnail: "docusaurus-docs-thumbnail.png"
---

# 들어가며 🏃

---

![long-time-work](/images/posts/docusaurus-docs/long-time-work.jpeg)

> 그렇게 그에게 남은건 **하얗게 불타버린 육체**와 **재가 되어버린 주말** 뿐이었다...

방금까지 장렬하게 도큐사우루스 작업을 마치고 이렇게 **블로그를 작성하고 있는 본인**입니다. 오늘 하루를 코딩에 갈아 넣으니 뭔가 많이 한 것 같으면서도, 계획했던 내용들은 다 하지 못한 것 같아 아쉬움도 함께 남아있네요.

**문서화**라는 키워드라서 이전과 이어지는 내용인 것 같지만 아쉽게도 그렇지 않습니다. 이번 포스팅은 이번에 제가 진행하는 자바스크립트 스터디의 **문서화를 위한 활용 방법**을 소개하는 내용입니다. 제목에서 말씀드렸다시피 그 방법은 **도큐사우루스**입니다.

그래서 이번 포스팅에선 **도큐사우루스에 대한 설명**과 **이를 활용하여 간단한 프로젝트를 생성하는 방법**까지 간단하게 기술해 볼 예정입니다.

참고로 완성된 페이지 주소와 깃허브 주소는 다음과 같습니다.

- [페이지 주소](https://you-dont-know-js-study.vercel.app/)
- [깃허브 주소](https://github.com/p-acid/you-dont-know-JS-study)

# 도큐사우루스가 뭔가요? 🦖

---

도큐사우루스는 **페이스북 오픈소스 커뮤니티**에서 관리하는 **문서 웹사이트 생성 도구**이며, 간단히 말해 **리액트를 활용하여 문서화 작업을 할 수 있는 일종의 라이브러리**입니다. [공식 문서의 소개](https://docusaurus.io/ko/blog/2017/12/14/introducing-docusaurus)에 나와있는 **도큐사우루스를 만든 이유**는 다음과 같습니다.

- 웹 사이트 만들기에 대한 걱정을 덜어내고 **좋은 문서를 작성하는데 집중**할 수 있게 합니다.
- 블로그, 검색, 버전 관리 등 **오픈 소스 웹 사이트에 필요한 여러 기능을 지원**합니다.
- 업데이트, 새로운 기능, 버그 수정 등의 **프로젝트 관련 소식을 모두에게 한 번에 쉽게 전달할 수 있게 합니다.**
- 마지막으로 연관된 오픈 소스 프로젝트 모두에서 **일관성 있는 룩앤필**을 줄 수 있습니다.

개인적으로 활용하면서 **왜 저런 이유로 만들었는지 이해할 수 있는 도구**여서 정말 좋았던 것 같습니다.

개인적으로 마음에 들었던 부분은 다음과 같고, 이러한 이유로 인해 이번 스터디에서 도큐사우루스를 문서화 도구로 선택했습니다.

- **각 기능(블로그, 문서 등)별로 역할에 따른 특징들이 명확히 반영**되어 있는 것 같아 좋았습니다.
  - 그 중 **블로그 기능 내 `authors` 를 관리할 수 있는 부분**은 공동 작업에 있어 유용한 기능 같았습니다.
  - 마치 **정적 웹사이트를 소셜 기능이 추가된 웹사이트 처럼** 사용할 수 있었습니다.
- **디렉토리 구조에 따라 문서를 구별**할 수 있고, 이에 대한 셋팅을 일괄적으로 `docusaurus.config.js` 에서 처리할 수 있어 활용에 용이했습니다.
- 경우에 따라 페이지 구성을 **리액트 컴포넌트 혹은 `mdx` 등과 같은 형태**로 구성할 수 있다는 점이 커스텀에 용이했습니다.

요약하자면 **기존에 제공하는 기능도 훌륭하면서, 커스텀에도 용이한 문서 전용 라이브러리**라고 생각했던 것 같습니다.

# 그럼 어떻게 시작하는지 Araboza 👨‍💻

---

> 본 포스팅에선 도큐사우루스에 대한 모든 활용 방식에 대해 다루지 않습니다. 자세한 내용은 [공식 홈페이지](https://docusaurus.io/ko/)를 참고해주세요.

도큐사우루스 활용법은 생각보다 간단합니다. 우선 다음 명령어를 통해 **프로젝트를 생성**해줍니다.

```sh
# 생성 명령어 형식
npx create-docusaurus@latest [name] [template]

# 예시
npx create-docusaurus@latest website classic

# 타입스크립트
npx create-docusaurus@latest my-website classic --typescript
```

`name` 이나 `template` 값이 설정되지 않으면 설치 중간에 다시 되물어본다고 합니다.

저의 경우 **`classic` 템플릿을 활용하여 생성**하였고, 마이그레이션을 진행하더라도 이후에 적용하기 위해 **타입스크립트 플래그는 추가하지 않았습니다.** 필요하신 분들은 타입스크립트 형식으로 작업해보셔도 좋을 것 같습니다.

그렇게 생성이 완료되면 다음 명령어를 통해 생성한 프로젝트를 확인하실 수 있습니다.

```sh
# 프로젝트 시작
npm start

# 프로젝트 빌드
npm build
```

## config 데이터 변경하기

---

그렇다면 **프로젝트 커스텀**을 시작해봅시다. 더 많은 커스텀을 진행할 수도 있지만, 편의를 위해 간단한 프로젝트 커스텀만 진행해보겠습니다.

루트 경로 내에 `docusaurus.config.js` 파일을 확인해봅시다.

제 프로젝트 기준으로 영역별로 구분하여 간단한 셋팅 변경을 진행해봅시다.

```js
// config 최상단

title: "너는 아직 자바스크립트를 모른다 📒", // 웹 사이트 타이틀
tagline: "자바스크립트는 언제 알 수 있을까", // 웹 사이트를 설명하는 짧은 문구 (optional)
url: "https://you-dont-know-js-study.vercel.app/", // 웹사이트의 url
baseUrl: "/", // 웹 사이트의 BaseUrl
onBrokenLinks: "ignore", // 깨진 링크를 발견할 경우 처리 방식 결정 (optional)
onBrokenMarkdownLinks: "warn", // 깨진 마크다운 링크를 발견할 경우 처리 방식 (optional)
favicon: "img/logo.jpeg", // 파비콘 경로 (optional)
organizationName: "p-acid", // 레포를 소유하는 깃헙 사용자 (optional)
projectName: "you-dont-know-JS-study", // 깃헙 레포 이름 (optional)
```

`optional` 이 없다면 필수 기입 요소입니다. 기호에 따라 `optional` 은 수정하거나 제거하셔도 될 것 같습니다.

저의 경우 **`onBrokenLink` 값을 `throw` 에서 `ignore` 로 수정했습니다.** 빌드를 진행할 때, **깨진 링크가 발견되는 경우**가 생각보다 많은데 이 경우 **빌드가 실패하기도 합니다.** 그런 이유로 **이를 무시하기 위해 옵션을 변경**하였습니다.

```js
// presets 영역

presets: [
    [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        {
        docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/p-acid/you-dont-know-JS-study",
        },
        blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl: "https://github.com/p-acid/you-dont-know-JS-study",
        },
        theme: {
            customCss: require.resolve("./src/css/custom.css"),
        },
        },
    ],
],
```

공식 문서엔 자세히 나오지 않지만 **사전 설정 값**으로, 해당 영역의 **`editUrl` 을 수정하고 각 포스팅의 수정 버튼을 클릭하면 레포지토리의 해당 포스팅 링크로 이동하게됩니다.**

```js
themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        title: "You Don't Know JS Yet",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.jpeg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/p-acid/you-dont-know-JS-study",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Up & Going",
                to: "/docs/up-going/intro",
              },
            ],
          },
          {
            title: "Blog",
            items: [
              {
                label: "Samuel Park",
                href: "https://acid-log.vercel.app/",
              },
              {
                label: "Daisy Jeong",
                href: "https://github.com/Jeong-minji",
              },
              {
                label: "Hey-ho",
                href: "https://github.com/heyho-time",
              },
            ],
          },
          {
            title: "About",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/p-acid/you-dont-know-JS-study",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} You-dont-know-JS-study, Inc. Built with Docusaurus.`,
    },
```

사이트 메뉴바나 푸터 등에 사용자 지정 UI를 적용하기 위한 테마 설정 오브젝트를 설정합니다. 각 필드명을 통해 유추하여 값을 변경하고, 이를 통해 커스텀을 진행할 수 있습니다.

이렇게 `docusaurus.config.js` 를 수정하고 나면 전반적인 데이터 커스텀을 진행할 수 있습니다.

## 색상 커스텀

---

그리고 `/src/css` 디렉토리 내 `custom.css` 를 수정하여 색상 커스텀을 진행할 수 있습니다.

```css
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* You can override the default Infima variables here. */
:root {
  --ifm-color-primary: #bfc225;
  --ifm-color-primary-dark: #afad21;
  --ifm-color-primary-darker: #a59c1f;
  --ifm-color-primary-darkest: #88861a;
  --ifm-color-primary-light: #c9d529;
  --ifm-color-primary-lighter: #d5d832;
  --ifm-color-primary-lightest: #d4dd4f;
  --ifm-code-font-size: 95%;
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme="dark"] {
  --ifm-color-primary: #bfc225;
  --ifm-color-primary-dark: #afad21;
  --ifm-color-primary-darker: #a59c1f;
  --ifm-color-primary-darkest: #88861a;
  --ifm-color-primary-light: #c9d529;
  --ifm-color-primary-lighter: #d5d832;
  --ifm-color-primary-lightest: #d4dd4f;
}

.docusaurus-highlight-code-line {
  background-color: rgba(0, 0, 0, 0.1);
  display: block;
  margin: 0 calc(-1 * var(--ifm-pre-padding));
  padding: 0 var(--ifm-pre-padding);
}

[data-theme="dark"] .docusaurus-highlight-code-line {
  background-color: rgba(0, 0, 0, 0.3);
}
```

**테마별로 커스텀을 진행**할 수 있으며, 각 필드의 색상 코드 값을 변경하여 진행합니다.

이렇게 하면 어느 정도 간단한 커스텀을 진행할 수 있을 겁니다.

## 페이지 커스텀

---

앞에서 말했듯이 도큐사우루스는 **리액트**를 활용할 수 있기 때문에, 일반적인 **`jsx` 나 `tsx` 형식**으로 페이지를 구성할 수도 있고, **`mdx` 형태로 페이지**를 구성할 수도 있습니다.

`/src/pages/index.js` 페이지를 수정하여 커스텀을 진행해봅시다.

```js
import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "40vh",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
          }}
        >
          바로가기 리스트 🔖
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Link to="docs/intro" style={{ fontSize: "2rem", fontWeight: "700" }}>
            정리 내용 바로가기 📔
          </Link>
        </div>
        <Link to="blog" style={{ fontSize: "2rem", fontWeight: "700" }}>
          블로그 및 후기 보러가기 📝
        </Link>
      </div>
    </Layout>
  );
}
```

위 소스 코드를 보면, 일반적으로 활용하는 **함수형 컴포넌트 형태**의 페이지로 구성되어 있고 리액트를 활용할 때처럼 자유롭게 커스텀하시면 될 것 같습니다.

기존에 존재하는 **`module.css` 파일을 수정**하여 스타일 값을 할당해도 되지만, 저는 그냥 인라인으로 작성했습니다.

커스텀을 더 자유롭게 진행하시고 싶으시다면, [도큐사우루스 API Docs](https://docusaurus.io/ko/docs/cli)를 참고하여 추가적인 커스텀을 진행하시면 될 것 같습니다.

# 정적 웹사이트 배포하기 📤

---

정적 웹사이트 배포를 위한 다양한 플랫폼이 존재하기에 **원하시는 플랫폼을 활용하여 진행하시면 될 것 같습니다.**

저의 경우 **Vercel**을 통해 배포를 진행했습니다. Vercel은 **Next.js에서 제공하는 배포 플랫폼**입니다. 현재 활용하고 있는 해당 블로그의 배포에 있어 활용했던 플랫폼도 Vercel 이었기에 이를 한 번 더 활용하여 진행했습니다.

이외에도 정적 웹 사이트 배포를 위한 플랫폼으로 **Netlify와 Github Pages** 등이 추가적으로 있는데요, 제가 이전에 Vercel을 선택했던 이유는 **레포지토리의 변화를 감지하여 자동 배포가 이루어진다는 점**과 **CDN 서버가 우리나라에 있다는 점**이 대표적일 것 같습니다. 각 플랫폼 별 차이점을 이해하고 기호에 따라 사용하시면 될 것 같습니다.

Vercel 배포에 대한 내용은 많은 분들이 작성하셨기에 생략하도록 하겠습니다.

> 진짜 정말 쉽기에 별도로 기재하지 않겠습니다.

# 마무리 👏

---

![편-안](/images/posts/docusaurus-docs/comfortable.png)

차일피일 미뤄졌던 스터디를 이제서야 시작하게 되어 정말 편-안한 마음입니다. 그리고 이전에 개인 블로그 개설을 위해 이런 저런 라이브러리를 알아보다 발견했던 도큐사우루스를 이제서야 활용하게 되어 또 감회가 새로운 것 같습니다.

또 별개로 [블로그 리부트에 대한 생각](https://acid-log.vercel.app/log/reboot-blog-planning)을 하고 있는 도중이라 그런지, 이전엔 선택지로 생각하지 않았던 **도큐사우루스도 고민되는 선택지 중 하나가 된 것 같아 혼란스러워졌습니다.** 이전에 **포스팅 TOC나 문서의 카테고리화** 같은 부분을 구현하는데 어려움이 있어 **그냥 라이브러리를 사용하고 커스텀을 진행하는 것이 니즈에 더 맞지 않을까**라는 결론이 나오기도 했었습니다. 그런 측면에서 도큐사우루스가 제 니즈를 충분히 충족해줄만 한 라이브러리인 것 같기도 하구요.

아무튼 이걸 보시는 분들 중 **스터디를 진행할 예정이 있으시거나, 자신의 개인 블로그를 만들고 싶다라고 생각하시는 분들**은 도큐사우루스로 새로운 시도를 함께해보시는 것도 좋을 것 같다는 저의 개인적인 소견과 함께 이번 포스팅을 마무리하겠습니다.
