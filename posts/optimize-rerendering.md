---
title: 리액트 최적화의 기본은 무엇인가
date: "2022-06-27"
description: "완벽한 최적화를 위한 코자강의 길"
tags: ["Optimization", "Re-rendering", "useMemo", "useCallback"]
thumbnail: "thumbnail.png"
---

# 들어가며 🏃

---

![데브_경수_짤](/images/posts/optimize-rerendering/dev_water.png)

> Hello World! 🙋‍♂️

어느덧 반 년의 시간이 흐르고 얼른 경력을 채우고 싶은 일개 개발자 박씨입니다.

이런 저런 핑계로 블로그 작성을 미루다가 이제야 다시 하나를 작성하는데요, 더 이상 이렇게 시간이 훅훅 지나가게 냅두면 안될 것 같아서 이렇게 한 번 정리를 해보고자 합니다.

그간 TIL에 간단히 작성한 **최적화**와 관련된 내용들이 있는데요, 아직 한참 멀었겠지만 리액트 사용에 익숙해지는 과정에서 자연스럽게 최적화라는 부분을 신경쓰게 되었던 것 같습니다. 이렇게 말했지만 그리 거창한 내용도 아니고, 단지 **리렌더링 한 번 더 줄이기**라는 하나의 주제를 갖고 몇 가지 기본적인 내용에 대해 한 번 정리해보고자 합니다.

<br/>

# 리액트 성능 최적화 ⚙️

---

리액트 성능 최적화를 생각해보면 가장 먼저 떠오르는 것이 **리렌더링**에 대한 내용일 것입니다.

리액트를 사용하는 개발자면 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)를 통해 렌더링 감지를 확인해봤을 겁니다. 저도 생각 없이 마구잡이로 개발을 진행하다 앞의 크롬 확장 프로그램을 통해 리렌더링 횟수를 확인하고 나서 경악을 금치 못했던 기억이 있는데요, 단지 제가 코드를 거지같이 짰던 것뿐인데 컴포넌트 갱신을 똑바로 못했다는 애꿎은 리액트 탓만 했던 것 같네요.

리액트는 **상태 변화를 감지하여 리렌더링을 진행**하는데, 모든 DOM 요소들이 각 상태 값 변화에 따라 변화가 이루어져야 할 부분만 알아서 리렌더링이 일어나면 좋겠지만 실제로는 그렇지 않습니다. 정확히 말하자면 손 놓고 그렇게 되기엔 어렵습니다.

![내 아이가 아닙니다](/images/posts/optimize-rerendering/not_my_baby.jpeg)

가끔씩 컴포넌트는 자신이 리렌더링이 필요하지 않은데도 리렌더링이 진행되는 경우가 있는데, 이런 부분은 리액트에게 친절하게 알려주는 것으로 해결할 수 있습니다.

> 사실 저는 컴퓨터와 대화가 가능해서 알려줄 수 있습니다 💻

그랬으면 좋겠지만, 아쉽게도 말도 안되는 헛소리기에 **리액트에서 제공하는 몇 가지 Hook**을 통해 이를 가능하게 할 수 있습니다.

> 리액트 Hook에 대한 내용은 리액트 공식 문서에서 제공하는 [Hook API Reference](https://ko.reactjs.org/docs/hooks-reference.html)에서 확인하실 수 있습니다.

몇 가지 예제를 통해 이를 확인해보겠습니다.

<br/>

# React.memo를 통해 컴포넌트 상태 기억하기 🗒️

---

유효성 검사와 관련된 라이브러리를 찾다보면 다양한 라이브러리가 존재하는데 그 중 [React Hook Form](https://react-hook-form.com/)이라는 라이브러리를 확인해보셨을 겁니다. **React Hook Form**의 장점 중 하나는 **리렌더링을 고립시키는 것**인데 예시를 확인하면 `input` 의 변화가 다른 컴포넌트에 영향을 끼치지 않는 것을 확인할 수 있습니다. 위와 같은 상태 변화를 `React.memo` 를 통해 적용할 수 있습니다.

![input_리렌더링](/images/posts/optimize-rerendering/input_rerender.gif)

> [레포지토리 링크 🔗](https://github.com/p-acid/rerender-optimization)

위 예제에서 두 가지 `form` 을 비교해서 확인해보면, 왼쪽의 경우 각 `input` 에 값의 변화가 이루어질 때마다 전체 `input` 의 리렌더링이 진행되고 오른쪽은 **값의 변화가 이루어지는 `input` 만 리렌더링이 진행되는 것**을 확인할 수 있습니다. 이 둘의 차이는 **단순히 `React.memo` 로 감싸져 있는 지에 대한 여부**로 결정됩니다.

```tsx
const CommonInput = ({ inputValue, name }: InputProps) => {
  return <StyledInput value={inputValue} name={name} autoComplete="off" />;
};

const OptimizedInput = memo(({ inputValue, name }: InputProps) => {
  return <StyledInput value={inputValue} name={name} autoComplete="off" />;
});
```

위 컴포넌트들은 각 `form` 을 구성하는 `input` 컴포넌트이며 단순히 `OptimizedInput` 이 `memo` 를 통해 감싸져 있는 것을 확인할 수 있습니다. 어떻게 이런 결과를 확인할 수 있었을까요?

`memo` 로 감싸진 컴포넌트는 받은 `props` 를 활용하여 **렌더링을 진행한 결과를 메모이징(Memoizing) 하고** 이어서 받은 `props` 가 같다면, 앞에 **메모이징 된 값을 재사용**합니다. 그래서 `OptimizedForm` 의 `input` 은 변화가 일어나는 컴포넌트 외에 나머지는 값의 변화가 없으므로 부분적인 리렌더링이 일어날 수 있었던 것입니다.

위 예시에선 `input` 을 `map` 메서드를 통해 매핑하여 렌더링했는데, `input` 외에도 **매핑이 진행되는 컴포넌트**에 위와 같은 적용을 진행해볼 수 있겠네요. 예를 들면, 다음과 같이 **리스트 업데이트**에서도 이를 적용할 수 있습니다.

### 메모이징 전

![comment_rerender_before](/images/posts/optimize-rerendering/before_memorize.gif)

### 메모이징 후

![comment_rerender_before](/images/posts/optimize-rerendering/after_memorize.gif)

<br/>

# useRef를 통해 값 핸들링 하기 ✔️

---

`input` 값을 핸들링 할 때 주로 어떤 방식을 활용하시나요? 제가 느끼기에 가장 대중적인 방식은 **`input` 의 `value` 를 `onChange` 이벤트를 통해 `state` 에 저장하여 활용하는 방식**이 아닐까 싶습니다. 앞의 예시 또한 그런 방식으로 작성되었습니다.

```tsx
const CommonForm = () => {
  const [inputValue, setInputValue] = useState<StateType>({
    id: "",
    password: "",
    email: "",
  });

  const handleInputValue = ({ target }: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StyledForm onChange={handleInputValue}>
      {inputList.map((item) => (
        <CommonInput key={item} inputValue={inputValue[item]} name={item} />
      ))}
    </StyledForm>
  );
};
```

이렇게 되면 매 입력마다 값의 변화를 감지하여 해당 `value` 값을 `state` 에 저장하면서 **동시에 리렌더링이 발생**합니다. 값을 매번 갖고 있으면서 매 변화마다 이를 핸들링 하고자 할 때 큰 문제가 되지 않을 수도 있지만, 유효성 검사와 같은 과정에서 `input` 의 `value` 가 **검사를 통과하지 못했을 때만 이를 감지해야 한다면** 다른 리렌더링은 불필요할 것입니다.

이러한 부분을 **`useRef` 훅**을 통해 개선할 수 있습니다.

![input value 최적화](/images/posts/optimize-rerendering/optimization.gif)

> [레포지토리 링크 🔗](https://github.com/p-acid/pre-assignment/blob/main/src/components/common/Form.jsx)
>
> [TIL 링크 🔗](https://github.com/p-acid/today-i-learned/blob/main/2022/06/wanted-assignment.md)

```tsx
// useSignIn.js
const useSignIn = () => {
  const [check, setCheck] = useState({ id: "", pw: "" });
  const idRef = useRef();
  const pwRef = useRef();

  ...

  return { idRef, pwRef, check, submitAccount, validateAccount, isDisabled };
};

// Form.jsx
const Form = () => {
  const { idRef, pwRef, check, submitAccount, validateAccount, isDisabled } =
    useSignIn();
  const { id, pw } = check;

  return (
    <FormWrapper onChange={validateAccount} onSubmit={submitAccount}>
      <InputField ref={idRef} check={id} name="id" />
      <InputField ref={pwRef} check={pw} name="pw" />
      <Button disabled={isDisabled}>Log-in</Button>
    </FormWrapper>
  );
};
```

위 코드를 보면 `useRef` 를 활용하여 생성한 `ref` 객체를 각 `InputField` 컴포넌트에 할당하여 값을 관리하는 것을 확인할 수 있습니다. 이렇게 할당된 `ref` 객체를 통해 **이제 `idRef` 와 `pwRef` 의 `current` 필드를 참조하여 각 DOM을 선택**할 수 있게 되었습니다.

이렇게 값 참조를 통해 `value` 값을 가져오니 굳이 `state` 에 값을 저장할 필요가 없어졌습니다. 그리고 **유효성 검사 상태만을 관리할 `check` 만 생성하여 관리하면 되고**, 해당 유효성 검사 결과 값의 변화만으로 리렌더링이 일어나는 것입니다.

추가적으로 `ref` 를 컴포넌트 `props` 로 전달하기 위해선 다음과 **같이 `forwardRef` 로 감싸 `props` 를 전달 받아야 합니다.**

```tsx
const InputField = forwardRef(({ check, name }, ref) => {
  return (
    <Label>
      <LabelText>{ACCOUNT_INFO[name].label}</LabelText>
      <Input
        ref={ref}
        type={ACCOUNT_INFO[name].type}
        name={name}
        distructure={check}
      />
      {check && <HintText>{VALIDATION_HINT_TEXT[check]}</HintText>}
    </Label>
  );
});

InputField.displayName = "InputField";

export default memo(InputField);
```

<br/>

# useMemo와 useCallback 활용하기 🖊️

---

이번 내용은 리렌더링 횟수와는 관련 없을 수 있지만 **렌더링 과정에서 생성되는 값과 함수에 대한 내용**입니다.

리액트가 리렌더링 될 때마다 이전에 사용했던 함수와 값들이 그대로일 때, 이전 값을 그대로 사용할 것이라고 기대하겠지만 실제로는 그렇지 않습니다. 실제로는 **렌더링 마다 컴포넌트는 값과 함수를 생성하고 이러한 작업이 리렌더링 마다 발생**하게 됩니다. 이때 값이나 함수를 메모이징 하여 이전 값을 그대로 사용할 수 있도록 하는 것이 `useMemo` 와 `useCallback` 입니다. `useMemo` 는 **값**을, `useCallback` 은 **함수**를 메모이징 합니다.

위 예제에서 `useCallback` 예제를 확인해봅시다.

```tsx
const handleInputValue = useCallback(
  ({ target }: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  },
  []
);
```

앞의 `React.memo` 예시에서 `OptimizedForm` 의 경우, 위와 같이 `useCallback` 으로 감싸져 있으며 첫 번째 인자로 **메모이징 할 함수**를, 두 번째 인자로는 **의존성 배열**을 받습니다. 그리고 해당 의존성 배열에 추가된 요소들이 변경될 때마다 **변화를 감지하여 함수를 재생성**합니다.

위 경우 함수 내에 **`setState` 함수**를 포함하는데, 이때 `state` 값을 직접 가져와 변경 값을 할당하는 것보다 `setState` 함수를 콜백 형식으로 작성하여 받는 인자인 **`prev` 를 통해 변경된 값을 전달**하면 의존성 배열로 빈 배열을 전달하여 `useCallback` 을 더 효과적으로 사용할 수 있습니다.

<br/>

# 마치며

---

개발을 하다보면 이런 저런 이유로 코드 품질이나 최적화에 대한 부분을 합리화하면서 미뤄두는 경향이 생기는 것 같습니다. 당장의 구현이 우선인 경우엔 테스팅이나 성능 개선에 대한 부분을 제쳐두고 현실적인 부분을 선택해야 하는 경우도 생기니 말이죠. 그래서 이런 부분은 **습관화**가 중요한 것 같습니다. 나도 모르게 **당연히 이건 이렇게 작성해야 하는 거지**라는게 확립되고 자연스럽게 행하고 있다면, 제쳐둘 이유조차 없어질테니 말이죠.

여기까지 봐주시느라 고생 많으셨습니다. 다들 즐코하십쇼 😊
