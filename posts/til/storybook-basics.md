---
title: 스토리북 사용법 학습
date: "2022-02-18"
description: "개발자를 위한 디자인 시스템, 스토리북에 대해 공부해봅시다."
tags: ["Storybook", "Tool", "UI", "Basics"]
thumbnail: "storybook_logo.jpeg"
---

# 들어가며 🏃

---

스토리북은 공식 문서에서 다음과 같이 소개되고 있습니다.

> **Storybook** is a **tool for UI development.** It makes development **faster and easier by isolating components.**

해석하면 **스토리북은 UI 개발을 위한 도구이며, 컴포넌트 분리를 통해 개발을 빠르고 더 쉽게 만든다**고 합니다. 공식 문서에서는 스토리북을 사용하기 위한 다섯 단계의 튜토리얼을 제공하고 있습니다. 우선 인트로 부터 차근차근 알아봅시다.

# 시작하기 🚩

---

저는 주로 리액트를 사용해왔고, 요즘은 주로 Next.js를 사용하고 있으니 **리액트 플로우**를 중심으로 진행해보도록 하겠습니다.

우선 **CRA**를 통해 새로운 리액트 앱을 생성하고 **해당 앱에 스토리북을 추가**합니다.

```sh
# Create our application:
npx create-react-app taskbox

cd taskbox

# Add Storybook:
npx -p @storybook/cli sb init
```

정상적으로 설치와 추가가 이루어졌으면 다음 각각의 명령어를 통해 빠르게 확인할 수 있습니다.

```sh
# Run the test runner (Jest) in a terminal:
yarn test --watchAll

# Start the component explorer on port 6006:
yarn storybook

# Run the frontend app proper on port 3000:
yarn start
```

그렇게 프론트엔드 앱의 **3가지 양상(자동화 된 테스트 (Jest), 컴포넌트 개발 (Storybook), 그리고 앱 그 자체)을 확인할 수 있습니다.**

# 간단한 컴포넌트 만들기 🧱

---

간단한 컴포넌트를 독립적으로 만들어봅시다.

[컴포넌트 기반 개발](https://www.componentdriven.org/) 방법론에 따라 UI를 만들어 볼 것이고, 이는 컴포넌트부터 시작하여 마지막 화면에 이르기까지 **상향적으로 UI를 개발하는 과정**을 의미합니다. CDD는 UI를 구축할 때 직면하는 **규모의 복잡성을 해결하는데 도움이 된다**고 합니다.

스토리북은 **컴포넌트와 그 하위 스토리의 두 가지 기본 단계**로 구성되어 있습니다. **각 스토리는 상위 컴포넌트에 대응**하고 필요한 만큼 **스토리를 컴포넌트별로 작성할 수 있습니다.**

- **컴포넌트**
  - 스토리
  - 스토리
  - 스토리

예를 들어, **`Task.js` 라는 컴포넌트**가 존재한다면 해당 컴포넌트의 **스토리들을 작성한 `Task.stories.js` 가 존재**할 것입니다. 그렇다면 예시와 함께 **스토리 기본 구조**에 대해 알아봅시다.

```js
// src/components/Task.stories.js

import React from "react";

import Task from "./Task";

// default 구문
export default {
  component: Task,
  title: "Task",
};

// Template 구문
const Template = (args) => <Task {...args} />;

// 스토리 구문
export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};
```

위 예시는 `Task.js` 컴포넌트의 스토리가 담긴 `Task.stories.js` 의 예시입니다. 스토리는 **Default exports, Template, Named story exports**으로 구성됩니다.

## Default exports

---

**Default exports**는 `component` 에 대한 **메타데이터**를 정의합니다.
