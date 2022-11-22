---
title: Next 13 신 버전 발표
date: "2022-11-07"
description: "새롭게 업데이트 된 Next.js 13 버전을 체험해봅니다."
tags: ["Review", "Next.js", "13"]
thumbnail: "thumbnail.png"
---

# 들어가며

---

![마참내 ! 두둥등장 !](/images/posts/next-13/machamnae.png)

드디어 **Next.js 신버전이 나왔습니다.** 아직 기존 내용들도 깊이 숙지되지 않은 상황에서 그리 달갑지만은 않지만 새로운 기능들을 팽개쳐버리면 언젠간 사용하지 못하는 순간까지 오겠죠? 이번 포스팅에선 변경점을 확인하고 해당 변경점을 적용해보는 시간을 갖도록 하겠습니다. 이번 변경점을 간단히 요약하면 다음과 같습니다.

- **`app` 디렉토리** (베타)
  - **`Layouts`**
  - **`React Server Components`**
  - **`Streaming`**
- **Turbopack** (알파)
- **새로운 `next/Image`**
- **새로운 `@next/font`** (베타)
- **향상된 `next/link`**

자 그럼 천천히 하나씩 건드려보도록 하겠습니다.

> ⚠️ 해당 포스팅은 **Next.js 베타 버전 문서의 내용도 포함**합니다. 추후 업데이트 될 내용과 일치하지 않을 수도 있으므로 이를 유의해주시기 바랍니다.

# `app` 디렉토리

---
