---
title: node_modules를 지워라, Yarn Berry
date: "2022-04-13"
description: "Yarn Berry에 대해 알아보고 적용해보기."
tags: ["Yarn", "Yarn Berry", "node_modules", "dependencies"]
thumbnail: "yarn-berry.png"
---

# 들어가며 🏃

---

이번 포스팅은 Yarn의 두 번째 버전에 해당하는 **_Yarn Berry_**에 대해서 다뤄볼 예정입니다. 이전에 회사 동료분을 통해 알았던 내용이었는데, 이번에 **사내 프로젝트 중 하나에 적용해볼 기회가 생겨** 이를 즉각적으로 적용하게 되었습니다. 그래서 해당 포스팅은 **이에 대한 후기**와 비슷한 내용이 될 것 같습니다.

워낙 다른 포스팅들에 설명이 잘 되어 있어 대부분의 내용들이 링크로 생략될 예정입니다. 워낙 잘 정리해놓으신 내용들을 **다시금 재가공해서 올리는 것보다 해당 포스팅을 다시금 보는 것이 더 도움이 될 것 같아** 그렇게 하기로 했습니다. 물론, **간단한 요약** 정도는 진행할 예정입니다.

# Yarn Berry, 넌 누구냐 🐈‍⬛

---

Yarn Berry를 사용하기 위해선 **Yarn Berry가 무엇인지, 왜 등장했는지에 대한 내용**을 간단히 알아볼 필요가 있습니다. 앞에서 말씀드렸다시피 **관련 링크의 언급과 간단한 요약**을 진행하도록 하겠습니다.

> **관련 링크 🔖**
>
> [🔗 Plug'n'Play : Yarn](https://yarnpkg.com/features/pnp)
>
> [🔗 node_modules로부터 우리를 구원해 줄 Yarn Berry : Tosstech](https://toss.tech/article/node-modules-and-yarn-berry)

앞의 포스팅은 **Yarn 공식 문서 내 Plug'n'Play에 대한 내용**이고 **기존 `node_modules` 가 갖는 문제점**에 관한 내용들이 포함되어있습니다. 해당 부분에 대해 간단히 요약하자면 다음과 같습니다.

- `yarn install` 을 실행할 때 Yarn은 **`node_modules` 디렉토리를 생성**하고 내장된 [Node Resolution Algorithm](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)을 통해 사용할 수 있습니다.
- 이러한 맥락에서 **파일 기준으로만 추론**하고, 파일 유무를 따져가며 계속해서 탐색을 진행하는 프로세스를 거쳤습니다.
- 이러한 부분은 다음과 같은 이유로 **비효율적**이라고 판단되었습니다.
  - `node_modules` 디렉토리 내에는 일반적으로 엄청난 양의 파일이 포함됩니다. 또한 기존 설치가 저장된 상태로 진행되지 않기 때문에, **이를 생성하는 것이 `yarn install` 실행의 70% 이상을 차지하게 되는 결과**를 야기했습니다.
  - `node_modules` 생성은 **I/O(Input/Output)가 많은 작업**이었기에 패키지 관리자는 단순한 파일 복사 수행 이상으로 **최적화할 수 있는 여유가 없었습니다.**
    - 디스크 조작을 위한 시스템 호출을 하기 이전에 **파일 시스템의 현재 상태를 비교해야했기 때문**입니다.
  - Node는 **패키지 개념이 없었기에**, 파일에 액세스해야 하는지 여부도 알지 못했습니다.
    - 이는 `package.json` 에 종속성 하나를 기입하지 않아, 배포 이후에 갑자기 동작하지 않는 경우를 발생시키기도 합니다.
  - **런타임**시에도 Node Resolution은 **모든 단일 필수 파일을 로드할 위치를 파악하기 위해 `stat` 과 `readdir` 호출을 수행**해야 했습니다.
    - 이는 낭비이며 노드 애플리케이션의 부팅 시간을 늦추는 원인 중 하나였습니다.
  - `node_modules` 폴더 디자인은 **패키지 관리자가 패키지 중복을 적절하게 제거할 수 없다는 점**에서 실용적이지 않습니다.
    - 이 부분은 [위 토스테크 포스팅의 유령 의존성 부분](https://toss.tech/article/node-modules-and-yarn-berry)을 참고하시면 이해하기 쉽습니다.

[yarn berry 적용법 : zigae](https://www.zigae.com/yarn2/)

[yarn berry yml : yarn dev team github](https://github.com/yarnpkg/berry/blob/master/.yarnrc.yml)

[Typescript + PnP](https://yarnpkg.com/getting-started/recipes#typescript--pnp-quick-start)
